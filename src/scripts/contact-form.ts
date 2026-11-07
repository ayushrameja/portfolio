import { createPageScope } from "./page-scope.ts";
type ContactField = HTMLInputElement | HTMLTextAreaElement;
export function fieldError(name: string, value: string) {
  const text = value.trim();
  if (!text) return name === 'name' ? 'Please enter your name.' : name === 'email' ? 'Please enter your email address.' : 'Please write a message.';
  if (name === 'email' && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) || text.length > 254)) return 'Enter a complete email address, such as you@example.com.';
  if (name === 'name' && (text.length > 100 || /[\r\n]/.test(text))) return 'Use a name under 100 characters on one line.';
  if (name === 'message' && text.length > 5000) return 'Keep your message under 5,000 characters.';
  return '';
}
export function setupContactForm() {
  const scope = createPageScope();
  const controller = new AbortController();
  scope.add(() => controller.abort());
  document.querySelectorAll<HTMLFormElement>('.contact-form').forEach(form => {
    const fields = Array.from(form.querySelectorAll<ContactField>('input, textarea'));
    const button = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
    const status = form.querySelector<HTMLElement>('.contact-status')!;
    const touched = new Set<ContactField>();
    let submitting = false;
    const validate = (field: ContactField) => {
      const error = fieldError(field.name, field.value);
      field.setAttribute('aria-invalid', String(Boolean(error)));
      form.querySelector<HTMLElement>(`#${field.id}-error`)!.textContent = error;
      return !error;
    };
    form.noValidate = true;
    fields.forEach(field => {
      scope.listen(field, 'blur', () => { touched.add(field); validate(field); });
      scope.listen(field, 'input', () => {
        if (touched.has(field)) validate(field);
        if (!submitting) { form.dataset.state = 'idle'; status.textContent = ''; }
      });
    });
    scope.listen(form, 'submit', async event => {
      event.preventDefault();
      if (submitting) return;
      const invalid = fields.filter(field => { touched.add(field); return !validate(field); });
      if (invalid.length) { invalid[0].focus(); return; }
      const payload = Object.fromEntries(fields.map(field => [field.name, field.value.trim()]));
      submitting = true;
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.textContent = 'Sending…';
      form.dataset.state = 'loading';
      status.textContent = 'Sending your message…';
      try {
        const response = await fetch(form.action, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload), signal: AbortSignal.any([controller.signal, AbortSignal.timeout(30000)]),
        });
        const data = await response.json();
        if (controller.signal.aborted) return;
        if (!response.ok || data.success !== true) throw new Error(response.status === 429 ? 'Too many attempts. Please wait a minute and try again.' : 'Your message wasn’t sent. Please try again or use the email link.');
        // Preserve anything the visitor typed while the request was in flight.
        fields.forEach(field => {
          if (field.value.trim() === payload[field.name]) field.value = '';
          field.removeAttribute('aria-invalid');
          form.querySelector<HTMLElement>(`#${field.id}-error`)!.textContent = '';
        });
        touched.clear();
        form.dataset.state = 'success';
        status.textContent = 'Message sent. Thank you for getting in touch.';
      } catch (error) {
        if (controller.signal.aborted) return;
        form.dataset.state = 'error';
        status.textContent = error instanceof Error && error.name === 'TimeoutError'
          ? 'Delivery couldn’t be confirmed. Your message is still here; you can email me directly.'
          : error instanceof Error && error.message.startsWith('Too many') ? error.message
          : 'Delivery couldn’t be confirmed. Your message is still here. Try again or use the email link.';
      } finally {
        submitting = false;
        button.disabled = false;
        button.removeAttribute('aria-busy');
        button.textContent = 'Send message';
      }
    });
  });
}
