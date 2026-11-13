import { createPageScope } from "./page-scope.ts";
type ContactField = HTMLInputElement | HTMLTextAreaElement;

/** Mirrors the server's rules in `src/server/contact.mjs`, so a message the
 *  form accepts is one the endpoint will accept. Returns '' when valid. */
export function fieldError(name: string, value: string) {
  const text = value.trim();
  if (!text) return name === 'name' ? 'Please enter your name.' : name === 'email' ? 'Please enter your email address.' : 'Please write a message.';
  if (name === 'email' && (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(text) || text.length > 254)) return 'Enter a complete email address, such as you@example.com.';
  if (name === 'name' && (text.length > 100 || /[\r\n]/.test(text))) return 'Use a name under 100 characters on one line.';
  if (name === 'message' && text.length > 5000) return 'Keep your message under 5,000 characters.';
  return '';
}

/** What to tell the visitor when a send fails. An HTTP status means the server
 *  answered and refused; no status means the outcome is unknown. */
export function failureMessage(status?: number, timedOut = false) {
  if (status === 429) return 'Too many attempts. Please wait a minute and try again.';
  if (status) return 'Your message wasn’t sent. It is still here; try again or use the email link.';
  if (timedOut) return 'Delivery couldn’t be confirmed. Your message is still here; you can email me directly.';
  return 'Delivery couldn’t be confirmed. Your message is still here. Try again or use the email link.';
}

const TIMEOUT = 30000;

/** Validates on blur and submit, posts JSON, and reports progress through
 *  `form.dataset.state` (idle, loading, success, error) and the status line.
 *  Without this script the form posts normally and the server answers with a page. */
export function setupContactForm() {
  const scope = createPageScope();
  let disposed = false;
  const requests = new Set<AbortController>();
  scope.add(() => { disposed = true; requests.forEach(request => request.abort()); });
  document.querySelectorAll<HTMLFormElement>('.contact-form').forEach(form => {
    const fields = Array.from(form.querySelectorAll<ContactField>('input, textarea'));
    const button = form.querySelector<HTMLButtonElement>('[type="submit"]');
    const status = form.querySelector<HTMLElement>('.contact-status');
    if (!button || !status) return;
    // The label is swapped on its own so the button keeps its icon.
    const label = button.querySelector<HTMLElement>('[data-label]') ?? button;
    const idleLabel = label.textContent ?? 'Send message';
    const touched = new Set<ContactField>();
    let submitting = false;
    const errorFor = (field: ContactField) => form.querySelector<HTMLElement>(`#${field.id}-error`);
    const validate = (field: ContactField) => {
      const error = fieldError(field.name, field.value);
      field.setAttribute('aria-invalid', String(Boolean(error)));
      const slot = errorFor(field);
      if (slot) slot.textContent = error;
      return !error;
    };
    // Native bubbles give way to the inline messages.
    form.noValidate = true;
    form.dataset.state = 'idle';
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
      // Busy rather than disabled, so keyboard focus stays on the button.
      button.setAttribute('aria-disabled', 'true');
      button.setAttribute('aria-busy', 'true');
      label.textContent = 'Sending…';
      form.dataset.state = 'loading';
      status.textContent = 'Sending your message…';
      const request = new AbortController();
      requests.add(request);
      let timedOut = false;
      const timer = window.setTimeout(() => { timedOut = true; request.abort(); }, TIMEOUT);
      let responseStatus: number | undefined;
      try {
        const response = await fetch(form.action, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload), signal: request.signal,
        });
        if (!response.ok) { responseStatus = response.status; throw new Error('Refused'); }
        const data = await response.json();
        if (disposed) return;
        if (data?.success !== true) throw new Error('Unconfirmed');
        // Preserve anything the visitor typed while the request was in flight.
        fields.forEach(field => {
          if (field.value.trim() === payload[field.name]) field.value = '';
          field.removeAttribute('aria-invalid');
          const slot = errorFor(field);
          if (slot) slot.textContent = '';
        });
        touched.clear();
        form.dataset.state = 'success';
        status.textContent = 'Message sent. Thank you for getting in touch.';
      } catch {
        if (disposed) return;
        form.dataset.state = 'error';
        status.textContent = failureMessage(responseStatus, timedOut);
      } finally {
        clearTimeout(timer);
        requests.delete(request);
        submitting = false;
        button.removeAttribute('aria-disabled');
        button.removeAttribute('aria-busy');
        label.textContent = idleLabel;
      }
    });
  });
}
