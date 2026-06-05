/**
 * Navbar Module
 */
function initNavbar() {
    var navbar = document.getElementById('navbar');
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');
    var mobileOverlay = document.getElementById('mobileOverlay');
    var allNavLinks = document.querySelectorAll('.nav-link');
    var allSections = document.querySelectorAll('section[id]');

    if (!navbar || !navToggle || !navLinks || !mobileOverlay) {
        console.warn("Navbar elements not found in the DOM.");
        return;
    }

    function handleNavbarScroll() {
        if (window.scrollY > 50) { 
            navbar.classList.add('scrolled'); 
        } else { 
            navbar.classList.remove('scrolled'); 
        }
    }

    function openMobileMenu() {
        navToggle.classList.add('active');
        navLinks.classList.add('open');
        mobileOverlay.classList.add('active');
        mobileOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(function () {
            if (!mobileOverlay.classList.contains('active')) { 
                mobileOverlay.style.display = 'none'; 
            }
        }, 300);
    }

    navToggle.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) { 
            closeMobileMenu(); 
        } else { 
            openMobileMenu(); 
        }
    });

    mobileOverlay.addEventListener('click', closeMobileMenu);

    allNavLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navLinks.classList.contains('open')) { 
                closeMobileMenu(); 
            }
        });
    });

    function highlightActiveLink() {
        var scrollPosition = window.scrollY + 150;
        allSections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                allNavLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) { 
                        link.classList.add('active'); 
                    }
                });
            }
        });
    }

    // Scroll listener for active link and navbar background
    window.addEventListener('scroll', function () {
        handleNavbarScroll();
        highlightActiveLink();
    }, { passive: true });

    // Initial check
    handleNavbarScroll();
    highlightActiveLink();

    // Escape key listener to close menu
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) { 
            closeMobileMenu(); 
        }
    });

    // Smooth scroll for navbar links
    document.querySelectorAll('.navbar a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                var navHeight = navbar.offsetHeight;
                var targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}
window.initNavbar = initNavbar;
