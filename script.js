
function applyLanguage(lang) {
    const htmlEl = document.documentElement;

    if (lang === 'en') {
        htmlEl.setAttribute('lang', 'en');
        htmlEl.setAttribute('dir', 'ltr');
    } else {
        htmlEl.setAttribute('lang', 'ar');
        htmlEl.setAttribute('dir', 'rtl');
    }
}

function toggleLanguage() {
    const currentLang =
        document.documentElement.getAttribute('lang') || 'ar';

    const nextLang = currentLang === 'ar' ? 'en' : 'ar';

    try {
        localStorage.setItem('sqr_site_lang', nextLang);
    } catch (error) {}

    applyLanguage(nextLang);
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const savedLang = localStorage.getItem('sqr_site_lang');

        if (savedLang === 'ar' || savedLang === 'en') {
            applyLanguage(savedLang);
        }
    } catch (error) {}

    const header = document.querySelector('header');
    const logo = header?.querySelector('.logo');
    const nav = header?.querySelector('.nav-links');

    if (!header || !logo || !nav) return;

    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'mobile-menu-toggle';
    button.setAttribute('aria-controls', 'site-navigation');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'فتح القائمة');
    button.innerHTML =
        '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

    nav.id = 'site-navigation';
    logo.insertAdjacentElement('afterend', button);

    function closeMenu() {
        header.classList.remove('mobile-nav-open');
        button.setAttribute('aria-expanded', 'false');

        const isEnglish =
            document.documentElement.lang === 'en';

        button.setAttribute(
            'aria-label',
            isEnglish ? 'Open menu' : 'فتح القائمة'
        );

        button.innerHTML =
            '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    }

    button.addEventListener('click', () => {
        const isOpen =
            header.classList.toggle('mobile-nav-open');

        button.setAttribute('aria-expanded', String(isOpen));

        const isEnglish =
            document.documentElement.lang === 'en';

        button.setAttribute(
            'aria-label',
            isOpen
                ? (isEnglish ? 'Close menu' : 'إغلاق القائمة')
                : (isEnglish ? 'Open menu' : 'فتح القائمة')
        );

        button.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 860) {
            closeMenu();
        }
    });
});
