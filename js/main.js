const hero = document.getElementById("hero");
const dots = Array.from(document.querySelectorAll(".dot"));
const nextButton = document.getElementById("nextSlide");

const heroImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1600607687644-c94bf7f28f89?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1800&q=80",
];

let currentIndex = 0;
let autoPlay;

function renderSlide(index) {
  currentIndex = index;
  hero.style.backgroundImage = `url("${heroImages[index]}")`;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function nextSlide() {
  const nextIndex = (currentIndex + 1) % heroImages.length;
  renderSlide(nextIndex);
}

function restartAutoplay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(nextSlide, 5000);
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);
    renderSlide(index);
    restartAutoplay();
  });
});

nextButton.addEventListener("click", () => {
  nextSlide();
  restartAutoplay();
});

renderSlide(0);
restartAutoplay();
