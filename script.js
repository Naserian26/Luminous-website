/**
 * Main Controller & Partials Loader
 */

function loadPartial(id, file, callback) {
    var element = document.getElementById(id);
    if (!element) {
        console.warn("Placeholder #" + id + " not found in index.html.");
        return Promise.resolve();
    }
    return fetch(file)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("HTTP error! status=" + response.status + " for " + file);
            }
            return response.text();
        })
        .then(function(data) {
            element.innerHTML = data;
            if (callback) {
                try {
                    callback();
                } catch(e) {
                    console.error("Error in callback for " + file, e);
                }
            }
        })
        .catch(function(error) {
            console.error("Error loading partial " + file, error);
            element.innerHTML = "<div class='container' style='padding:20px;color:red;'>Error loading content. Please refresh.</div>";
        });
}

function initGlobalScripts() {
    var scrollTopBtn = document.getElementById('scrollTopBtn');

    // Scroll to Top visibility
    function handleScrollTopVisibility() {
        if (window.scrollY > 500) { 
            scrollTopBtn.classList.add('visible'); 
        } else { 
            scrollTopBtn.classList.remove('visible'); 
        }
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () { 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        });
    }

    // Scroll listener for top visibility and global optimizations
    var scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(function () {
            if (scrollTopBtn) handleScrollTopVisibility();
            scrollTimeout = null;
        }, 16);
    }, { passive: true });

    if (scrollTopBtn) handleScrollTopVisibility();

    // Reveal animations on scroll
    var revealElements = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) { 
                entry.target.classList.add('visible'); 
                revealObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function (el) {
        var parent = el.parentElement;
        if (parent) {
            var siblings = parent.querySelectorAll(':scope > .reveal');
            if (siblings.length > 1) {
                var idx = Array.prototype.indexOf.call(siblings, el);
                el.style.transitionDelay = (idx * 0.08) + 's';
            }
        }
        revealObserver.observe(el);
    });

    // Stats counter animations
    var statNumbers = document.querySelectorAll('.stat-number[data-count]');
    var countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;
        statNumbers.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-count'), 10);
            var duration = 2000;
            var startTime = null;
            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
                counter.textContent = Math.floor(eased * target);
                if (progress < 1) { 
                    requestAnimationFrame(step); 
                } else { 
                    counter.textContent = target; 
                }
            }
            requestAnimationFrame(step);
        });
        countersStarted = true;
    }

    var heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        var statsObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) { 
                animateCounters(); 
                statsObserver.unobserve(heroStats); 
            }
        }, { threshold: 0.5 });
        statsObserver.observe(heroStats);
    }
}

// Load all partials and then initialize global features
document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
        loadPartial('navbar-placeholder', 'partials/navbar.html', window.initNavbar),
        loadPartial('hero-placeholder', 'partials/hero.html'),
        loadPartial('about-placeholder', 'partials/about.html'),
        loadPartial('values-placeholder', 'partials/values.html'),
        loadPartial('goals-placeholder', 'partials/goals.html'),
        loadPartial('business-placeholder', 'partials/business.html'),
        loadPartial('services-placeholder', 'partials/services.html'),
        loadPartial('why-us-placeholder', 'partials/why_us.html'),
        loadPartial('structure-placeholder', 'partials/structure.html'),
        loadPartial('statutory-placeholder', 'partials/statutory.html', window.initLightbox),
        loadPartial('contact-placeholder', 'partials/contact.html', window.initContact),
        loadPartial('footer-placeholder', 'partials/footer.html')
    ]).then(function() {
        initGlobalScripts();
    });
});