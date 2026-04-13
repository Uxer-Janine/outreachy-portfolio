// Interactive elements and Theme Toggle logic

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Logic ---
    const html = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Sun and Moon SVG paths
    const moonPath = 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z';
    const sunPath = 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707';

    // Update Icon UI
    const updateIcon = (isDark) => {
        if (!themeIcon) return;
        const path = themeIcon.querySelector('path');
        if (isDark) {
            path.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707'); // simplified sun for JS
            // Re-use full sun path for better look
            path.setAttribute('d', 'M12 3v2m0 14v2m9-9h-2M5 12H3m14.5 5.5l-1.5-1.5M7.5 7.5L6 6m10 0l-1.5 1.5M7.5 16.5L6 18M12 7a5 5 0 100 10 5 5 0 000-10z');
        } else {
            path.setAttribute('d', moonPath);
        }
    };

    // Apply theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            html.classList.add('dark');
            updateIcon(true);
        } else {
            html.classList.remove('dark');
            updateIcon(false);
        }
        localStorage.setItem('theme', theme);
    };

    // Init theme
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark'); // Default to dark for this project
    applyTheme(savedTheme);

    // Toggle event
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            applyTheme(isDark ? 'light' : 'dark');
        });
    }


    // --- 2. Sticky Navigation ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-white/80', 'dark:bg-zinc-950/80', 'backdrop-blur-md', 'shadow-lg', 'border-zinc-200', 'dark:border-zinc-800');
            nav.classList.remove('bg-transparent', 'border-transparent');
        } else {
            nav.classList.remove('bg-white/80', 'dark:bg-zinc-950/80', 'backdrop-blur-md', 'shadow-lg', 'border-zinc-200', 'dark:border-zinc-800');
            nav.classList.add('bg-transparent', 'border-transparent');
        }
    });

    // --- 3. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, { threshold: 0.1 });
    revealElements.forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });

    // --- 4. Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
