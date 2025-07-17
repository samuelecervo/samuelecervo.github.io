const slides = document.querySelectorAll('.slide');
let current = 0;

function showNextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}

setInterval(showNextSlide, 3000);

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next-btn');
  const prevButton = document.querySelector('.prev-btn');
  let slideWidth = slides[0].getBoundingClientRect().width;

  // Posiziona i video uno accanto all'altro
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);

  let currentIndex = 0;

  // Funzione per spostare la track
    const moveToSlide = (index) => {
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    };


  // Aggiorna la larghezza e riposiziona tutto al resize
  const updateSlideWidth = () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach(setSlidePosition);
    moveToSlide(currentIndex);
  };

  // Gestione automatico
  let autoSlideInterval = setInterval(() => {
    if (currentIndex < slides.length - 3) { // considera 3 video visibili
      currentIndex++;
    } else {
      currentIndex = 0; // torna all'inizio
    }
    moveToSlide(currentIndex);
  }, 6000); 

  // Funzione per resettare l'intervallo (pausa e riavvio)
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

  // Eventi frecce
  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 3) {
      currentIndex++;
      moveToSlide(currentIndex);
      resetAutoSlide();
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      moveToSlide(currentIndex);
      resetAutoSlide();
    }
  });

  window.addEventListener('resize', updateSlideWidth);

  updateSlideWidth();
});
