const totalImages = 273;
const images = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

for (let i = 1; i <= totalImages; i++) {
  images.push(`images/image${i}.jpg`);
}

shuffle(images);

let current = 0;
let currentImageUrl = images[current];
const displayTime = 5000;
let slideshowTimer;

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const bg1 = document.querySelector(".bg1");
const bg2 = document.querySelector(".bg2");

let showingImg1 = true;
let showingBg1 = true;

// Initial load
img1.src = images[current];
img1.style.opacity = 1;
bg1.style.backgroundImage = `url(${images[current]})`;
bg1.style.opacity = 1;

function showImage(index) {
  current = (index + images.length) % images.length;
  const nextImage = images[current];
  currentImageUrl = nextImage;

  if (showingImg1) {
    img2.src = nextImage;
    img2.style.animation = "none";
    void img2.offsetWidth;
    img2.style.animation = "panzoom 5s ease-in-out forwards";

    img2.style.opacity = 1;
    img1.style.opacity = 0;
  } else {
    img1.src = nextImage;
    img1.style.animation = "none";
    void img1.offsetWidth;
    img1.style.animation = "panzoom 5s ease-in-out forwards";

    img1.style.opacity = 1;
    img2.style.opacity = 0;
  }

  if (showingBg1) {
    bg2.style.backgroundImage = `url(${nextImage})`;
    bg2.style.opacity = 1;
    bg1.style.opacity = 0;
  } else {
    bg1.style.backgroundImage = `url(${nextImage})`;
    bg1.style.opacity = 1;
    bg2.style.opacity = 0;
  }

  showingImg1 = !showingImg1;
  showingBg1 = !showingBg1;

  const progress = ((current + 1) / images.length) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;

  // document.getElementById("counter").textContent = `${current + 1} / ${
  //   images.length
  // }`;
}

function showNext() {
  showImage(current + 1);
  resetTimer();
}

function showPrev() {
  showImage(current - 1);
  resetTimer();
}

function resetTimer() {
  clearInterval(slideshowTimer);
  slideshowTimer = setInterval(showNext, displayTime);
}

document.querySelector(".right-zone").addEventListener("click", showNext);
document.querySelector(".left-zone").addEventListener("click", showPrev);

slideshowTimer = setInterval(showNext, displayTime);

document.getElementById("download-btn").addEventListener("click", (e) => {
  e.preventDefault();
  window.open(currentImageUrl, "_blank");
});
