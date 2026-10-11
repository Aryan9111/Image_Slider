// Get the parts of the page we need
let track = document.querySelector(".track");
let images = document.querySelectorAll(".track img");
let dotsBox = document.querySelector(".dots");
let nextButton = document.querySelector(".next");
let prevButton = document.querySelector(".prev");

let total = images.length;   // how many pictures
let index = 1;               // which picture is showing
let busy = false;            // true while the picture is sliding

// Make one dot for every picture
for (let i = 0; i < total; i++) {
  let dot = document.createElement("button");
  dot.className = "dot";
  dot.addEventListener("click", function () {
    show(i + 1);
  });
  dotsBox.appendChild(dot);
}
let dots = document.querySelectorAll(".dot");

// Make a copy of the last picture and put it at the start,
// and a copy of the first picture and put it at the end.
// This is what makes the slider loop.
track.appendChild(images[0].cloneNode(true));
track.insertBefore(images[total - 1].cloneNode(true), images[0]);

// Show picture number "newIndex"
function show(newIndex) {
  if (busy || newIndex === index) {
    return;                  // wait until the last slide is finished
  }
  busy = true;
  index = newIndex;
  track.style.transition = "transform 0.5s";
  track.style.transform = "translateX(" + (-index * 100) + "%)";
  updateDots();
}

// Color the dot that matches the picture
function updateDots() {
  let active = index - 1;
  if (index === 0) {
    active = total - 1;      // we are on the copy of the last picture
  }
  if (index === total + 1) {
    active = 0;              // we are on the copy of the first picture
  }
  for (let i = 0; i < total; i++) {
    dots[i].classList.remove("active");
  }
  dots[active].classList.add("active");
}

// Arrow buttons
nextButton.addEventListener("click", function () {
  show(index + 1);
});
prevButton.addEventListener("click", function () {
  show(index - 1);
});

// When the slide finishes: if we are on a copy,
// jump to the real picture (with no animation, so nobody sees it)
track.addEventListener("transitionend", function () {
  if (index === 0) {
    index = total;
  }
  if (index === total + 1) {
    index = 1;
  }
  track.style.transition = "none";
  track.style.transform = "translateX(" + (-index * 100) + "%)";
  busy = false;
});

// Start on the first picture
track.style.transition = "none";
track.style.transform = "translateX(-100%)";
updateDots();