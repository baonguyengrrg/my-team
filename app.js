// ===== PassoCrafto SPA Router =====

const navbar = document.getElementById('navbar');
const pages = {
    splash:   document.getElementById('page-splash'),
    home:     document.getElementById('page-home'),
    members:  document.getElementById('page-members'),
    projects: document.getElementById('page-projects'),
};

// Map data-nav values to page IDs
const NAV_MAP = {
    splash:   'splash',
    home:     'home',
    members:  'members',
    projects: 'projects',
};

// Pages that should show the navbar
const WITH_NAVBAR = new Set(['home', 'members', 'projects']);

/**
 * Navigate to a named page.
 * @param {string} target  – one of the keys in NAV_MAP
 */
function navigate(target) {
    const pageKey = NAV_MAP[target] ?? 'splash';

    // Hide all pages
    Object.values(pages).forEach(p => p.classList.remove('active'));

    // Show target page
    const el = pages[pageKey];
    if (el) el.classList.add('active');

    // Toggle navbar
    if (WITH_NAVBAR.has(pageKey)) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    // Update active link in navbar
    document.querySelectorAll('.nav-menu a').forEach(a => {
        a.classList.toggle('active', a.dataset.page === pageKey);
    });

    // Scroll to top on page change
    window.scrollTo(0, 0);

    // Persist in URL hash so back/forward works
    history.pushState({ page: pageKey }, '', `#${pageKey}`);
}

// ===== Event delegation for all [data-nav] links =====
document.addEventListener('click', e => {
    const link = e.target.closest('[data-nav]');
    if (!link) return;
    e.preventDefault();
    navigate(link.dataset.nav);
});

// ===== Browser back / forward =====
window.addEventListener('popstate', e => {
    const page = e.state?.page ?? 'splash';
    navigate(page);
});

// ===== Initial load: read hash or default to splash =====
(function init() {
    const hash = location.hash.replace('#', '');
    const startPage = NAV_MAP[hash] ? hash : 'splash';
    navigate(startPage);
})();