/* ================================
   Hidden Joy - JavaScript Functions
   Organized and optimized
   ================================ */

// 📌 Cart Management Functions
// ============================

/**
 * Update the cart display with current items from localStorage
 */
function updateCart() {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let cartTable = document.querySelector(".cart tbody");
  let totalElement = document.getElementById("cart-total");

  if (!cartTable) return;

  cartTable.innerHTML = "";
  let total = 0;

  cartItems.forEach((item, index) => {
    let row = document.createElement("tr");
    let subtotal = item.price * (item.quantity || 1);
    total += subtotal;

    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}" width="50"></td>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.quantity || 1}" 
          data-index="${index}" class="form-control quantity">
      </td>
      <td>$${subtotal.toFixed(2)}</td>
      <td><button class="btn btn-danger btn-sm remove">X</button></td>
    `;
    cartTable.appendChild(row);
  });

  if (totalElement) totalElement.textContent = total.toFixed(2);
}

/**
 * Add a product to the cart
 * @param {string} productName - Name of the product
 * @param {string} productPrice - Price of the product (with $ symbol)
 * @param {string} productImg - Image URL of the product
 */
function addToCart(productName, productPrice, productImg) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let existing = cartItems.find(item => item.name === productName);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cartItems.push({
      name: productName,
      price: parseFloat(productPrice.replace("$", "")),
      image: productImg,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCart();
}

/**
 * Remove an item from the cart
 * @param {number} index - Index of the item to remove
 */
function removeFromCart(index) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCart();
}

// 📌 Authentication Functions
// ===========================

/**
 * Initialize login form functionality
 */
function initLoginForm() {
  let loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = loginForm.querySelector("#email").value;
    let password = loginForm.querySelector("#password").value;

    let storedEmail = localStorage.getItem("hiddenJoyUser_email");
    let storedPassword = localStorage.getItem("hiddenJoyUser_password");

    if (email === storedEmail && password === storedPassword) {
      alert("✅ Login successful!");
      window.location.href = "home.html";
    } else {
      alert("❌ Invalid email or password!");
    }
  });
}

/**
 * Initialize registration form functionality
 */
function initRegistrationForm() {
  let regForm = document.getElementById("registrationForm");
  if (!regForm) return;

  regForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = regForm.querySelector("#email").value;
    let password = regForm.querySelector("#password").value;

    localStorage.setItem("hiddenJoyUser_email", email);
    localStorage.setItem("hiddenJoyUser_password", password);

    alert("✅ Registration successful!");
    window.location.href = "signin.html";
  });
}

// 📌 Countdown Timer Functions
// ============================

/**
 * Initialize the 24-hour countdown timer
 */
function initCountdown() {
  const timerElement = document.getElementById("countdown");
  if (!timerElement) return;

  const countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000;

  let countdownFunction = setInterval(() => {
    let now = new Date().getTime();
    let distance = countdownDate - now;

    if (distance < 0) {
      clearInterval(countdownFunction);
      timerElement.textContent = "Expired";
      return;
    }

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}



// 📌 Map Functions
// ================

/**
 * Initialize the store location map
 */
function initMap() {
  const mapElement = document.getElementById("mapid");
  if (!mapElement) return;

  var map = L.map("mapid").setView([26.297, 50.197], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([26.297, 50.197])
    .addTo(map)
    .bindPopup("📍 Hidden Joy Store")
    .openPopup();
}

// 📌 Utility Functions
// ====================

/**
 * Fake email sender for newsletter subscription
 */
function fakeSend() {
  let input = document.getElementById("emailInput");
  if (input && input.value.trim() !== "") {
    alert("✅ You have been notified");
    input.value = "";
  } else {
    alert("⚠️ Write something before submitting!");
  }
}

/**
 * Initialize animations for elements
 */
function initAnimations() {
  // Add animation to elements with data-animate attribute
  const animateElements = document.querySelectorAll('[data-animate]');
  animateElements.forEach(el => {
    const animation = el.getAttribute('data-animate');
    el.classList.add('animate__animated', `animate__${animation}`);
  });
}

/**
 * Update cart count display
 */
function updateCartCount() {
  // This would typically come from your cart system
  // For demo purposes, we'll set a random number
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartCountElement = document.getElementById('cart-count');
  
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

/**
 * Initialize Bootstrap tooltips
 */
function initTooltips() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

/**
 * Validate newsletter subscription form
 */
function validateNewsletterForm() {
  const emailInput = document.getElementById('newsletterEmail');
  const email = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    emailInput.focus();
    return false;
  }
  
  // Here you would typically send the data to your server
  alert('Thank you for subscribing to our newsletter!');
  emailInput.value = '';
  return true;
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Initialize search functionality
 */
function initSearch() {
  const searchForm = document.querySelector('#templatemo_search form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchInput = this.querySelector('input[type="text"]');
      const searchTerm = searchInput.value.trim();
      
      if (searchTerm) {
        // Here you would typically redirect to search results page
        alert(`Searching for: ${searchTerm}`);
        searchInput.value = '';
        // Close the search modal
        const searchModal = bootstrap.Modal.getInstance(document.getElementById('templatemo_search'));
        if (searchModal) searchModal.hide();
      }
    });
  }
}

/**
 * Initialize image lazy loading
 */
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// 📌 Event Listeners Setup
// ========================

/**
 * Set up all event listeners for cart functionality
 */
function setupCartEventListeners() {
  // Cart events
  let cartTable = document.querySelector(".cart tbody");
  if (cartTable) {
    cartTable.addEventListener("input", (e) => {
      if (e.target.classList.contains("quantity")) {
        let index = e.target.dataset.index;
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems[index].quantity = parseInt(e.target.value) || 1;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCart();
      }
    });

    cartTable.addEventListener("click", (e) => {
      if (e.target.closest(".remove")) {
        const row = e.target.closest("tr");
        const index = row.rowIndex - 1;
        removeFromCart(index);
      }
    });
  }

  // Add-to-cart buttons
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productName = btn.getAttribute("data-name");
      const productPrice = btn.getAttribute("data-price");
      const productImg = btn.getAttribute("data-img");
      addToCart(productName, productPrice, productImg);
    });
  });
}

// 📌 About Page Specific Functions
// ================================

/**
 * Initialize animations for the about page
 */
function initAboutAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });
}

/**
 * Initialize animated counters for statistics
 */
function initAboutCounters() {
  const counterElements = [
    { element: document.getElementById("counter1"), target: 10000 },
    { element: document.getElementById("counter2"), target: 8500 },
    { element: document.getElementById("counter3"), target: 5000 },
    { element: document.getElementById("counter4"), target: 50 }
  ];
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counterElements.forEach(counter => {
          animateCounter(counter.element, counter.target);
        });
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  if (counterElements[0].element) {
    counterObserver.observe(counterElements[0].element);
  }
  
  function animateCounter(element, target) {
    const duration = 2000;
    const interval = 30;
    const steps = duration / interval;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      element.textContent = Math.round(current).toLocaleString();
    }, interval);
  }
}

/**
 * Subscribe to newsletter
 */
function subscribeNewsletter() {
  const emailInput = document.getElementById("emailInput");
  if (emailInput && emailInput.value.trim() !== "") {
    alert("✅ Thank you for subscribing to our newsletter!");
    emailInput.value = "";
  } else {
    alert("⚠️ Please enter a valid email address!");
  }
}

// 📌 Main Initialization
// ======================

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  // Authentication
  initLoginForm();
  initRegistrationForm();
  
  // Countdown timers
  initCountdown();
  initDetailedCountdown();
  
  // Map
  initMap();
  
  // Cart
  updateCart();
  updateCartCount();
  setupCartEventListeners();
  
  // UI Enhancements
  initAnimations();
  initTooltips();
  initSmoothScrolling();
  initSearch();
  initLazyLoading();
  
  // About page specific
  initAboutAnimations();
  initAboutCounters();
});
// Add to Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    let cart = JSON.parse(localStorage.getItem('hiddenJoyCart')) || [];

    const productCard = this.closest('.card'); // الكارد كامل
    const productId = this.getAttribute('data-id');
    const productName = this.getAttribute('data-name');
    const productPrice = parseFloat(this.getAttribute('data-price'));
    const productImage = productCard.querySelector('img').getAttribute('src'); // ناخذ الصورة من الـ img

    let existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage, // هنا تجي الصورة الصح
        quantity: 1
      });
    }

    localStorage.setItem('hiddenJoyCart', JSON.stringify(cart));
    updateCart();
  });
});
