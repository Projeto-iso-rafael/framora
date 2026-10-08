// Sabores da Colônia - Scripts & Interatividade
document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
  initMobileMenu();
});

function initCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.product-card');
  const viewAllBtn = document.getElementById('viewAllBtn');
  let currentIndex = 0;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w < 640) return 1.2;
    if (w < 900) return 2.2;
    if (w < 1200) return 3.2;
    return 4.2;
  }

  function getCardWidth() {
    const card = cards[0];
    if (!card) return 240;
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.gap) || 20;
    return card.offsetWidth + gap;
  }

  window.slide = function(dir) {
    const maxIndex = Math.max(0, cards.length - Math.floor(getVisibleCount()));
    currentIndex = Math.max(0, Math.min(currentIndex + dir, maxIndex));
    track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
  };

  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      currentIndex = 0;
      track.style.transform = `translateX(0px)`;
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') window.slide(-1);
    if (e.key === 'ArrowRight') window.slide(1);
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) window.slide(1);
      else window.slide(-1);
    }
  }, { passive: true });
}

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });
  }
}
