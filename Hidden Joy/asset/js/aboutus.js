    // Scroll animations
    document.addEventListener('DOMContentLoaded', function() {
        // Fade in elements on scroll
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeInOnScroll = function() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
            
            // Back to top button visibility
            const backToTopButton = document.getElementById('backToTop');
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };
        
        window.addEventListener('scroll', fadeInOnScroll);
        fadeInOnScroll(); // Initial check
        
        // Counter animation
        const counters = document.querySelectorAll('.counter-number');
        const speed = 200;
        
        const updateCount = () => {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target') || 
                    (counter.id === 'counter1' ? 1250 :
                     counter.id === 'counter2' ? 980 :
                     counter.id === 'counter3' ? 350 :
                     counter.id === 'counter4' ? 24 : 0));
                
                const count = parseInt(counter.innerText);
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            });
        };
        
        // Start counters when they become visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.counter-number').forEach(counter => {
            observer.observe(counter);
        });
        
        // Set initial counter values and data targets
        document.getElementById('counter1').setAttribute('data-target', '1250');
        document.getElementById('counter2').setAttribute('data-target', '980');
        document.getElementById('counter3').setAttribute('data-target', '350');
        document.getElementById('counter4').setAttribute('data-target', '24');
        
        // Back to top functionality
        document.getElementById('backToTop').addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Newsletter subscription
        window.subscribeNewsletter = function() {
            const emailInput = document.getElementById('emailInput');
            if (emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter your email address.');
            }
        };
        
        // Update cart count from localStorage
        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('hiddenJoyCart')) || [];
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cart-count').textContent = totalItems;
        }
        
        updateCartCount();
    });
