/**
 * Lightbox Module for Statutory Certificates
 */
function initLightbox() {
    var certCards = document.querySelectorAll('.cert-card');
    if (certCards.length === 0) return;

    // Create lightbox elements dynamically
    var lightboxOverlay = document.createElement('div');
    lightboxOverlay.id = 'lightboxOverlay';
    lightboxOverlay.style.position = 'fixed';
    lightboxOverlay.style.inset = '0';
    lightboxOverlay.style.backgroundColor = 'rgba(15, 23, 42, 0.9)'; // Sleek navy dark overlay
    lightboxOverlay.style.backdropFilter = 'blur(10px)';
    lightboxOverlay.style.zIndex = '2000';
    lightboxOverlay.style.display = 'none';
    lightboxOverlay.style.alignItems = 'center';
    lightboxOverlay.style.justifyContent = 'center';
    lightboxOverlay.style.opacity = '0';
    lightboxOverlay.style.transition = 'opacity 0.3s ease';

    var lightboxContainer = document.createElement('div');
    lightboxContainer.style.position = 'relative';
    lightboxContainer.style.maxWidth = '90%';
    lightboxContainer.style.maxHeight = '90%';
    lightboxContainer.style.transform = 'scale(0.9)';
    lightboxContainer.style.transition = 'transform 0.3s ease';

    var lightboxImg = document.createElement('img');
    lightboxImg.style.maxWidth = '100%';
    lightboxImg.style.maxHeight = '80vh';
    lightboxImg.style.borderRadius = '12px';
    lightboxImg.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
    lightboxImg.style.display = 'block';

    var lightboxCaption = document.createElement('div');
    lightboxCaption.style.color = '#fff';
    lightboxCaption.style.textAlign = 'center';
    lightboxCaption.style.marginTop = '15px';
    lightboxCaption.style.fontFamily = 'var(--font-heading, Poppins, sans-serif)';
    lightboxCaption.style.fontSize = '18px';
    lightboxCaption.style.fontWeight = '600';

    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '-40px';
    closeBtn.style.right = '0';
    closeBtn.style.color = '#fff';
    closeBtn.style.fontSize = '36px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '0';
    closeBtn.style.lineHeight = '1';

    lightboxContainer.appendChild(closeBtn);
    lightboxContainer.appendChild(lightboxImg);
    lightboxContainer.appendChild(lightboxCaption);
    lightboxOverlay.appendChild(lightboxContainer);
    document.body.appendChild(lightboxOverlay);

    function openLightbox(imgSrc, captionText) {
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = captionText;
        lightboxOverlay.style.display = 'flex';
        // Force reflow
        lightboxOverlay.offsetHeight;
        lightboxOverlay.style.opacity = '1';
        lightboxContainer.style.transform = 'scale(1)';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxOverlay.style.opacity = '0';
        lightboxContainer.style.transform = 'scale(0.9)';
        setTimeout(function() {
            lightboxOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    certCards.forEach(function(card) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            e.preventDefault();
            var img = card.querySelector('img');
            var title = card.querySelector('h4');
            if (img && title) {
                openLightbox(img.src, title.textContent);
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxOverlay.style.display === 'flex') {
            closeLightbox();
        }
    });
}
window.initLightbox = initLightbox;
