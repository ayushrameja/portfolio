/** Where a refresh of the home page left off: a `#section` (as its element)
 *  or a scroll position, as recorded by the layout's head script. Puts back
 *  the hash the head script took off, and clears both records. */
export function introReturnTarget() {
  const root = document.documentElement;
  const { introReturn: value, introHash: hash } = root.dataset;
  delete root.dataset.introReturn;
  delete root.dataset.introHash;
  if (hash) history.replaceState(history.state, '', hash);
  if (!value) return null;
  if (value.startsWith('#')) return document.getElementById(decodeURIComponent(value.slice(1)));
  const y = Number(value);
  return Number.isFinite(y) && y > 0 ? y : null;
}
