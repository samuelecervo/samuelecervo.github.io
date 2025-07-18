document.addEventListener('DOMContentLoaded', () => {
  // === SLIDER HERO (immagini a rotazione automatica) ===
  const slides = document.querySelectorAll('.slide');
  let current = 0;

  function showNextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  setInterval(showNextSlide, 3000);

  // === HAMBURGER MENU ===
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');

    });
  }

  // === CAROUSEL VIDEO ===
  const track = document.querySelector('.carousel-track');
  if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    let slideWidth = slides[0].getBoundingClientRect().width;

    const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    let currentIndex = 0;

    const moveToSlide = (index) => {
      track.style.transform = `translateX(-${slideWidth * index}px)`;
    };

    const updateSlideWidth = () => {
      slideWidth = slides[0].getBoundingClientRect().width;
      slides.forEach(setSlidePosition);
      moveToSlide(currentIndex);
    };

    let autoSlideInterval = setInterval(() => {
      if (currentIndex < slides.length - 3) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      moveToSlide(currentIndex);
    }, 6000);

    const resetAutoSlide = () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        if (currentIndex < slides.length - 3) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        moveToSlide(currentIndex);
      }, 6000);
    };

    nextButton?.addEventListener('click', () => {
      if (currentIndex < slides.length - 3) {
        currentIndex++;
        moveToSlide(currentIndex);
        resetAutoSlide();
      }
    });

    prevButton?.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        moveToSlide(currentIndex);
        resetAutoSlide();
      }
    });

    window.addEventListener('resize', updateSlideWidth);
    updateSlideWidth();
  }
});
