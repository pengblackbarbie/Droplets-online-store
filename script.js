document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  toggleBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});

// Cart counter
let cartCount = 0;
const cartCounter = document.getElementById("cart-count");

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    cartCount++;
    cartCounter.textContent = cartCount;
  });
});

// Hero slider rotation
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function rotateSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === currentSlide) slide.classList.add("active");
  });
  currentSlide = (currentSlide + 1) % slides.length;
}



if (slides.length > 0) {
  rotateSlides();
  setInterval(rotateSlides, 4000); // Change slide every 4 seconds
}

// Newsletter form
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thanks for subscribing! Your R50 coupon is on its way.");
    newsletterForm.reset();
  });
}
