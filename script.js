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
    const currentLang = document.documentElement.getAttribute('lang') || 'ar';
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    try {
        localStorage.setItem('sqr_site_lang', nextLang);
    } catch (e) {}
    applyLanguage(nextLang);
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const savedLang = localStorage.getItem('sqr_site_lang');
        if (savedLang) {
            applyLanguage(savedLang);
        }
    } catch (e) {}
});