function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setAttributes(el, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
}

function generateStar() {
  const shapes = [
    { type: "path", attributes: { d: "M208.3 0h-25.9C144.6 78.6 80.2 143.1 0 182.8v25C80.2 247.6 144.6 312 182.3 390.6h25.9c37.8-78.6 102.3-143 182.4-182.8v-25C310.5 143.1 246 78.6 208.3 0z" } },
    { type: "circle", attributes: { cx: "195.3", cy: "195.3", r: "195.3" } },
    { type: "path", attributes: { d: "M372.9 172.9H227.1V27.1C227.1 12.1 215 0 200 0c-15 0-27.1 12.1-27.1 27.1v145.8H27.1C12.1 172.9 0 185 0 200c0 15 12.1 27.1 27.1 27.1h145.8v145.8c0 15 12.1 27.1 27.1 27.1 15 0 27.1-12.1 27.1-27.1V227.1h145.8c15 0 27.1-12.1 27.1-27.1 0-15-12.1-27.1-27.1-27.1z" } }
  ];

  const randomShape = shapes[getRandomInt(0, shapes.length - 1)];
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  setAttributes(svg, { viewBox: "0 0 390.6 390.6", style: "enable-background:new 0 0 390.6 390.6", "xml:space": "preserve", "aria-hidden": "true", role: "presentation" });

  const el = document.createElementNS("http://www.w3.org/2000/svg", randomShape.type);
  setAttributes(el, randomShape.attributes);
  svg.appendChild(el);

  const sizes = ["small", "medium", "big"];
  const sizeClasses = {
    "small": "w-1 h-1",
    "medium": "w-1.5 h-1.5",
    "big": "w-2 h-2"
  };
  const randomSize = sizes[getRandomInt(0, sizes.length - 1)];
  svg.classList.add("glitter", randomSize, "fill-custom-light-purple", "absolute", "z-0", "pointer-events-none", ...sizeClasses[randomSize].split(" "));
  svg.style.top = `${getRandomInt(2, 98)}%`;
  svg.style.left = `${getRandomInt(2, 98)}%`;

  return svg;
}

function clearStars(container) {
  const stars = container.querySelectorAll('.glitter');
  stars.forEach(star => star.remove());
}

function generateStars(container, starCount) {
  clearStars(container);

  for (let i = 0; i < starCount; i++) {
    container.prepend(generateStar());
  }
}

function calculateStarCount(windowWidth) {
  if (windowWidth < 782) {
    return 50;
  } else if (windowWidth < 1280) {
    return 75;
  } else {
    return 100;
  }
}

function updateStars() {
  const container = document.querySelector('.glitter-container');
  const starCount = calculateStarCount(window.innerWidth);
  generateStars(container, starCount);
}

let resizeTimeout;

window.addEventListener('resize', function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateStars, 200);
});

window.addEventListener('load', updateStars);
