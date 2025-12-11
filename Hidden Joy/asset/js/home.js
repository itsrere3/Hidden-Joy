// Simple Countdown Timer
function startCountdown() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    
    function update() {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) {
            document.getElementById("countdown-timer").innerHTML = "OFFER EXPIRED";
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }
    
    update();
    setInterval(update, 1000);
}

// Start when page loads
document.addEventListener('DOMContentLoaded', startCountdown);
    
    // Update cart count from localStorage
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('hiddenJoyCart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }
    
    // Initialize cart count when page loads
    document.addEventListener('DOMContentLoaded', updateCartCount);
    
    // Newsletter subscription function
    function subscribeNewsletter() {
        const emailInput = document.getElementById('newsletter-email');
        if (emailInput && emailInput.value) {
            alert('Thank you for subscribing to our newsletter! Get ready for amazing surprises!');
            emailInput.value = '';
        } else {
            alert('Please enter your email address to subscribe.');
        }
    }
    
    // Footer newsletter function
    function fakeSend() {
        const emailInput = document.getElementById('emailInput');
        if (emailInput && emailInput.value) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter your email address.');
        }
    }