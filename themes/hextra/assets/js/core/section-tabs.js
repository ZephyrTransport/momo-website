// Icon tab strips (see layouts/shortcodes/sectiontabs.html).
//
// The tabs are real anchors, so without JS every panel is visible and the links
// simply jump to them. Here we hide the inactive panels and keep the URL hash in
// sync, so /2027/#agenda deep-links to a tab and back/forward works.
(function () {
  'use strict';

  function initTabGroup(group) {
    const tabs = Array.from(group.querySelectorAll('.momo-tab'));
    const panels = Array.from(group.querySelectorAll('.momo-panel'));
    if (!tabs.length || tabs.length !== panels.length) return;

    // Panels are only hidden once we know JS is running.
    group.classList.add('momo-tabs-js');

    function indexOfHash(hash) {
      return panels.findIndex(panel => '#' + panel.id === hash);
    }

    function activate(index, { focus = false } = {}) {
      if (index < 0 || index >= tabs.length) return;

      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.classList.toggle('is-active', selected);
        tab.setAttribute('aria-selected', selected ? 'true' : 'false');
        tab.tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
      });

      if (focus) tabs[index].focus();
    }

    function syncFromHash() {
      const index = indexOfHash(window.location.hash);
      if (index >= 0) activate(index);
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', event => {
        // Default anchor behavior would scroll the panel to the top of the
        // viewport; pushState updates the URL bar without the jump.
        event.preventDefault();
        activate(i);
        if (window.location.hash !== tab.hash) {
          history.pushState(null, '', tab.hash);
        }
      });

      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;

        event.preventDefault();
        activate(next, { focus: true });
        history.replaceState(null, '', tabs[next].hash);
      });
    });

    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('popstate', syncFromHash);

    // Honor a hash the page was loaded with; otherwise the first tab stays active.
    activate(Math.max(indexOfHash(window.location.hash), 0));
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-momo-tabs]').forEach(initTabGroup);
  });
})();
