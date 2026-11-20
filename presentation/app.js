/* These controls explain illustrative states; no product transaction is sent. */
if (!document.body.classList.contains('print-document')) {
  document.body.classList.add('enhanced');
  function tabGroup(selector, select) {
    const buttons = [...document.querySelectorAll(selector)];
    function choose(button, focus = false) {
      buttons.forEach(item => { const active = item === button; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
      select(button);
      if (focus) button.focus();
    }
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => choose(button));
      button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        if (next !== undefined) { event.preventDefault(); choose(buttons[next], true); }
      });
    });
    if (buttons.length) choose(buttons[0]);
  }
  tabGroup('.guidance-tabs [role=tab]', selected => document.querySelectorAll('.owner-panel').forEach(panel => { panel.hidden = panel.id !== selected.getAttribute('aria-controls'); }));
  tabGroup('.sponsor-switch [role=tab]', selected => document.querySelectorAll('.business-context').forEach(context => { context.hidden = context.dataset.sponsor !== (selected.id === 'business-issuer' ? 'issuer' : 'platform'); }));
}
// Native details keeps the full chapter menu usable without scripting.
const chapterMenu = document.querySelector('.chapter-menu');
if (chapterMenu) {
  chapterMenu.open = false;
  chapterMenu.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { chapterMenu.open = false; }));
  chapterMenu.addEventListener('keydown', event => { if (event.key === 'Escape') { chapterMenu.open = false; chapterMenu.querySelector('summary').focus(); } });
  document.addEventListener('click', event => { if (!chapterMenu.contains(event.target)) chapterMenu.open = false; });
}
