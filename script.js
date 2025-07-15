document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  const cartCounter = document.getElementById("cart-count");

  // Utilities
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    if (cartCounter) {
      const cart = getCart();
      cartCounter.textContent = cart.length;
    }
  }

  updateCartCount();

  // Add to Cart buttons
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const item = {
        name: button.dataset.name,
        price: parseFloat(button.dataset.price),
        image: button.dataset.image
      };

      const cart = getCart();
      cart.push(item);
      saveCart(cart);
      updateCartCount();
      alert(`${item.name} added to cart!`);
    });
  });

  // === COLLECTION PAGE FILTER/SORT ===
  const sortSelect = document.getElementById("sortSelect");
  const categorySelect = document.getElementById("categorySelect");
  const productGrid = document.querySelector(".tile-grid");

  if (sortSelect && categorySelect && productGrid) {
    const allTiles = Array.from(productGrid.children);

    function applyFiltersAndSort() {
      const selectedSort = sortSelect.value;
      const selectedCategory = categorySelect.value;

      let filteredTiles = [...allTiles];

      // Filter
      if (selectedCategory !== "all") {
        filteredTiles = filteredTiles.filter(tile => tile.dataset.category === selectedCategory);
      }

      // Sort
      if (selectedSort === "price-low") {
        filteredTiles.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
      } else if (selectedSort === "price-high") {
        filteredTiles.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
      }

      // Update DOM
      productGrid.innerHTML = "";
      filteredTiles.forEach(tile => productGrid.appendChild(tile));
    }

    sortSelect.addEventListener("change", applyFiltersAndSort);
    categorySelect.addEventListener("change", applyFiltersAndSort);
  }

  // === CHECKOUT PAGE ===
  const checkoutContainer = document.querySelector(".checkout-container");
  const subtotalDisplay = document.getElementById("subtotal");

  if (checkoutContainer && subtotalDisplay) {
    const cart = getCart();
    let subtotal = 0;

    cart.forEach((item, index) => {
      subtotal += item.price;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("checkout-item");

      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>R${item.price.toFixed(2)}</p>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;

      checkoutContainer.appendChild(itemDiv);
    });

    subtotalDisplay.textContent = `R${subtotal.toFixed(2)}`;

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = parseInt(this.dataset.index);
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        location.reload();
      });
    });
  }

  // === NEWSLETTER ===
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thanks for subscribing! Your R50 coupon is on its way.");
      newsletterForm.reset();
    });
  }
});
