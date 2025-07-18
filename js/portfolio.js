document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  const categories = {
    ritratti: 15,
    artisti: 21,
    studio: 16,
    eventi: 46,
    corporate: 20
  };

const loadImages = () => {
  for (let category in categories) {
    const count = categories[category];
    for (let i = 1; i <= count; i++) {
      const img = document.createElement("img");
      img.src = `assets/images/${category}/lq/${i}.jpg`; // immagine LQ
      img.loading = "lazy";
      img.alt = `${category} ${i}`;
      img.dataset.category = category;
      img.dataset.hqSrc = `assets/images/${category}/${i}.jpg`; // immagine HQ
      img.classList.add("gallery-item");
      gallery.appendChild(img);
    }
  }
};
  // Filtering
  document.querySelectorAll(".filter-buttons button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".filter-buttons button.active")?.classList.remove("active");
      button.classList.add("active");
      const filter = button.dataset.filter;

      document.querySelectorAll(".gallery-item").forEach(img => {
        if (filter === "all" || img.dataset.category === filter) {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });
    });
  });

  // Lightbox
  gallery.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
      const hqSrc = e.target.dataset.hqSrc;
      lightbox.style.display = "flex";
      lightboxImg.src = hqSrc;
    }
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  });

  loadImages();
});
