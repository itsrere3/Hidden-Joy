// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('hiddenJoyCart')) || [];
    updateCartCount();
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
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
            
            // Update cart count
            updateCartCount();
            
            // Show success message
            showAddedToCartMessage(productName);
            
            // Visual feedback on button
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
            this.classList.add('added');
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('added');
            }, 2000);
        });
    });
    
    // Sort functionality - FIXED VERSION
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            
            // Sort boxes
            sortProductSection('box', sortValue);
            
            // Sort stickers
            sortProductSection('sticker', sortValue);
        });
    }
    
    function sortProductSection(category, sortValue) {
        const productItems = document.querySelectorAll(`.product-item[data-category="${category}"]`);
        const productsArray = Array.from(productItems);
        
        productsArray.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            
            if (sortValue === 'asc') {
                return priceA - priceB;
            } else if (sortValue === 'desc') {
                return priceB - priceA;
            } else {
                // Default order - use original order from data-id
                const idA = parseInt(a.querySelector('.add-to-cart').getAttribute('data-id'));
                const idB = parseInt(b.querySelector('.add-to-cart').getAttribute('data-id'));
                return idA - idB;
            }
        });
        
        // Re-append sorted products to their respective containers
        const container = category === 'box' 
            ? document.getElementById('product-list')
            : document.querySelector('.container.my-5:last-child .row');
        
        if (container) {
            productsArray.forEach(item => {
                container.appendChild(item);
            });
        }
    }
    
    // Update cart count in navbar
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }
    
    // Show added to cart message
    function showAddedToCartMessage(productName) {
        const toastElement = document.getElementById('addedToCartToast');
        if (toastElement) {
            const toast = new bootstrap.Toast(toastElement);
            const toastBody = toastElement.querySelector('.toast-body');
            if (toastBody) {
                toastBody.innerHTML = `<i class="fas fa-check-circle me-2"></i> ${productName} added to cart!`;
            }
            toast.show();
        }
    }
    
    // Fake function for newsletter subscription
    window.fakeSend = function() {
        const emailInput = document.getElementById('emailInput');
        if (emailInput && emailInput.value) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter your email address.');
        }
    };
});