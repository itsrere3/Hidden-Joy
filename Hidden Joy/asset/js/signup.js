
  // Toggle password visibility
  document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('regpassword');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });
  
  // Toggle confirm password visibility
  document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
    const confirmPasswordInput = document.getElementById('confirmpassword');
    const icon = this.querySelector('i');
    
    if (confirmPasswordInput.type === 'password') {
      confirmPasswordInput.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      confirmPasswordInput.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });
  
  // Password strength checker
  document.getElementById('regpassword').addEventListener('input', function() {
    const password = this.value;
    const strengthBar = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');
    
    // Reset
    strengthBar.className = 'password-strength';
    strengthText.textContent = 'Password strength';
    
    if (password.length === 0) return;
    
    // Calculate strength
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Contains numbers
    if (/[0-9]/.test(password)) strength += 1;
    
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Update UI based on strength
    if (strength <= 2) {
      strengthBar.classList.add('strength-weak');
      strengthText.textContent = 'Weak password';
    } else if (strength === 3) {
      strengthBar.classList.add('strength-fair');
      strengthText.textContent = 'Fair password';
    } else if (strength === 4) {
      strengthBar.classList.add('strength-good');
      strengthText.textContent = 'Good password';
    } else {
      strengthBar.classList.add('strength-strong');
      strengthText.textContent = 'Strong password';
    }
  });
  
  // Confirm password validation
  document.getElementById('confirmpassword').addEventListener('input', function() {
    const password = document.getElementById('regpassword').value;
    const confirmPassword = this.value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      this.setCustomValidity("Passwords don't match");
      confirmPasswordError.textContent = "Passwords don't match";
    } else {
      this.setCustomValidity("");
    }
  });
  
  // Form validation
  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            // If form is valid, show success message
            event.preventDefault();
            alert('Welcome to Hidden Joy! Your account has been created successfully.');
            // In a real application, you would submit the form here
            // form.submit();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
  