/** Elements marked `data-reveal` settle in when they scroll into view. Those
 *  arriving together are staggered in document order. Styles live in site.css
 *  and are armed by the `reveal-ready` class set in the layout's head. */
export function setupReveal() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!items.length) return;
  if (!document.documentElement.classList.contains('reveal-ready')) return;
  document.documentElement.setAttribute('data-reveal-live', '');
  const observer = new IntersectionObserver(entries => {
    const arriving = entries.filter(entry => entry.isIntersecting).map(entry => entry.target as HTMLElement);
    arriving.sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
    arriving.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 70}ms`);
      item.classList.add('is-revealed');
      observer.unobserve(item);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  items.forEach(item => observer.observe(item));
}
