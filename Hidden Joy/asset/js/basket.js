// Cart functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('hiddenJoyCart')) || [];
    
    // Update cart display
    updateCartDisplay();
    
    // Add to cart from recommended products
    const addToCartButtons = document.querySelectorAll('.add-to-cart-recommended');
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));
        const productImage = this.getAttribute('data-image');
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
          });
        }
        
        // Save to localStorage
        localStorage.setItem('hiddenJoyCart', JSON.stringify(cart));
        
        // Update cart display
        updateCartDisplay();
        
        // Show success message
        showAddedToCartMessage(productName);
      });
    });
    
    // Update cart display function
    function updateCartDisplay() {
      const cartCount = document.getElementById('cart-count');
      const emptyCart = document.getElementById('empty-cart');
      const cartItemsContainer = document.getElementById('cart-items-container');
      const cartItemsList = document.getElementById('cart-items-list');
      const cartItemsCount = document.getElementById('cart-items-count');
      const subtotalItems = document.getElementById('subtotal-items');
      
      // Update cart count in navbar
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
      
      // Show/hide empty cart or cart items
      if (cart.length === 0) {
        emptyCart.classList.remove('d-none');
        cartItemsContainer.classList.add('d-none');
      } else {
        emptyCart.classList.add('d-none');
        cartItemsContainer.classList.remove('d-none');
        
        // Update cart items count
        cartItemsCount.textContent = `Your Items (${totalItems})`;
        subtotalItems.textContent = totalItems;
        
        // Clear cart items list
        cartItemsList.innerHTML = '';
        
        // Add cart items to the list
        cart.forEach((item, index) => {
          const itemTotal = item.price * item.quantity;
          const cartItemHTML = `
            <div class="cart-item p-4 ${index < cart.length - 1 ? 'border-bottom' : ''}" data-id="${item.id}">
              <div class="row align-items-center">
                <div class="col-md-2 col-3">
                  <img src="${item.image}" alt="${item.name}" class="rounded img-fluid" style="width: 80px;">
                </div>
                <div class="col-md-4 col-9">
                  <h6 class="mb-1">${item.name}</h6>
                  <p class="text-muted small mb-0">A surprise selection of curated items</p>
                </div>
                <div class="col-md-2 col-4 text-md-center mt-3 mt-md-0">
                  <span class="price fw-bold text-burgundy">$${item.price.toFixed(2)}</span>
                </div>
                <div class="col-md-2 col-4 mt-3 mt-md-0">
                  <div class="input-group input-group-sm">
                    <button class="btn btn-outline-secondary decrement" type="button">-</button>
                    <input type="number" class="form-control text-center quantity" value="${item.quantity}" min="1">
                    <button class="btn btn-outline-secondary increment" type="button">+</button>
                  </div>
                </div>
                <div class="col-md-2 col-4 text-md-center mt-3 mt-md-0">
                  <span class="total fw-bold">$${itemTotal.toFixed(2)}</span>
                  <button class="btn btn-sm btn-outline-danger remove-btn ms-2" title="Remove item">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          `;
          
          cartItemsList.innerHTML += cartItemHTML;
        });
        
        // Add event listeners to quantity controls and remove buttons
        addCartItemEventListeners();
        
        // Update totals
        updateTotals();
      }
    }
    
    // Add event listeners to cart items
    function addCartItemEventListeners() {
      // Quantity controls
      const incrementButtons = document.querySelectorAll('.increment');
      const decrementButtons = document.querySelectorAll('.decrement');
      const quantityInputs = document.querySelectorAll('.quantity');
      const removeButtons = document.querySelectorAll('.remove-btn');
      
      // Increment quantity
      incrementButtons.forEach(button => {
        button.addEventListener('click', function() {
          const input = this.parentNode.querySelector('.quantity');
          const cartItem = this.closest('.cart-item');
          const itemId = cartItem.getAttribute('data-id');
          
          // Update cart in localStorage
          const item = cart.find(item => item.id === itemId);
          if (item) {
            item.quantity = parseInt(input.value) + 1;
            localStorage.setItem('hiddenJoyCart', JSON.stringify(cart));
            updateCartDisplay();
          }
        });
      });
      
      // Decrement quantity
      decrementButtons.forEach(button => {
        button.addEventListener('click', function() {
          const input = this.parentNode.querySelector('.quantity');
          const cartItem = this.closest('.cart-item');
          const itemId = cartItem.getAttribute('data-id');
          
          if (parseInt(input.value) > 1) {
            // Update cart in localStorage
            const item = cart.find(item => item.id === itemId);
            if (item) {
              item.quantity = parseInt(input.value) - 1;
              localStorage.setItem('hiddenJoyCart', JSON.stringify(cart));
              updateCartDisplay();
            }
          }
        });
      });
      
      // Quantity input change
      quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
          const cartItem = this.closest('.cart-item');
          const itemId = cartItem.getAttribute('data-id');
          
          if (parseInt(this.value) < 1) {
            this.value = 1;
          }
          
          // Update cart in localStorage
          const item = cart.find(item => item.id === itemId);
          if (item) {
            item.quantity = parseInt(this.value);
            localStorage.setItem('hiddenJoyCart', JSON.stringify(cart));
            updateCartDisplay();
          }
        });
      });
      
      // Remove item
      removeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const cartItem = this.closest('.cart-item');
          const itemId = cartItem.getAttribute('data-id');
          
          // Remove from cart in localStorage
          cart = cart.filter(item => item.id !== itemId);
          localStorage.setItem('hiddenJoyCart', JSON.stringify(cart));
          
          // Update cart display
          updateCartDisplay();
        });
      });
    }
    
    // Update totals function
    function updateTotals() {
      let subtotal = 0;
      
      // Calculate subtotal
      cart.forEach(item => {
        subtotal += item.price * item.quantity;
      });
      
      // Update summary
      document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
      
      const shipping = subtotal > 0 ? 10.00 : 0.00;
      const tax = subtotal * 0.05; // 5% tax
      const grandTotal = subtotal + shipping + tax;
      
      document.getElementById('shipping').textContent = '$' + shipping.toFixed(2);
      document.getElementById('tax').textContent = '$' + tax.toFixed(2);
      document.getElementById('grandTotal').textContent = '$' + grandTotal.toFixed(2);
    }
    
    // Show added to cart message
    function showAddedToCartMessage(productName) {
      // Create a simple alert for now
      alert(`${productName} added to cart!`);
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', function() {
      if (cart.length === 0) {
        alert('Your cart is empty. Please add some items before checkout.');
      } else {
        alert('Proceeding to checkout...');
        // In a real application, you would redirect to a checkout page
        // window.location.href = 'checkout.html';
      }
    });
  });
  
