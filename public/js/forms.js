// Forms and Validation JavaScript

let dynamicFieldCount = 0;

// Initialize form functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeFormHandlers();
    setupRealTimeValidation();
});

// Initialize all form event handlers
function initializeFormHandlers() {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation for specific fields
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const ageField = document.getElementById('age');
    
    emailField.addEventListener('blur', () => validateEmail(emailField.value));
    phoneField.addEventListener('blur', () => validatePhone(phoneField.value));
    ageField.addEventListener('blur', () => validateAge(ageField.value));
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate all fields
    const isValid = validateAllFields();
    
    if (isValid) {
        displayFormResult({
            success: true,
            message: 'Form submitted successfully!',
            data: data,
            timestamp: new Date().toISOString()
        });
        
        // Simulate form processing
        setTimeout(() => {
            alert('Form would be sent to server in a real application!');
        }, 1000);
    } else {
        displayFormResult({
            success: false,
            message: 'Please fix the errors below before submitting.',
            errors: getFormErrors()
        });
    }
}

// Individual field validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.getElementById('email-error');
    
    if (!email) {
        showError(errorElement, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(errorElement, 'Please enter a valid email address');
        return false;
    } else {
        showSuccess(errorElement, 'Valid email address');
        return true;
    }
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const errorElement = document.getElementById('phone-error');
    
    if (phone && !phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        showError(errorElement, 'Please enter a valid phone number');
        return false;
    } else if (phone) {
        showSuccess(errorElement, 'Valid phone number');
        return true;
    } else {
        clearValidation(errorElement);
        return true;
    }
}

function validateAge(age) {
    const errorElement = document.getElementById('age-error');
    
    if (age && (age < 0 || age > 120)) {
        showError(errorElement, 'Age must be between 0 and 120');
        return false;
    } else if (age) {
        showSuccess(errorElement, 'Valid age');
        return true;
    } else {
        clearValidation(errorElement);
        return true;
    }
}

function validateName(name) {
    const errorElement = document.getElementById('name-error');
    
    if (!name || name.trim().length < 2) {
        showError(errorElement, 'Name must be at least 2 characters long');
        return false;
    } else {
        showSuccess(errorElement, 'Valid name');
        return true;
    }
}

function validateMessage(message) {
    const errorElement = document.getElementById('message-error');
    
    if (!message || message.trim().length < 10) {
        showError(errorElement, 'Message must be at least 10 characters long');
        return false;
    } else {
        showSuccess(errorElement, 'Valid message');
        return true;
    }
}

// Validation helper functions
function showError(element, message) {
    element.textContent = message;
    element.className = 'error';
    element.style.display = 'block';
}

function showSuccess(element, message) {
    element.textContent = message;
    element.className = 'success';
    element.style.display = 'block';
}

function clearValidation(element) {
    element.textContent = '';
    element.style.display = 'none';
}

// Validate all fields function
function validateAllFields() {
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const phoneValue = document.getElementById('phone').value;
    const ageValue = document.getElementById('age').value;
    const messageValue = document.getElementById('message').value;
    
    const nameValid = validateName(nameValue);
    const emailValid = validateEmail(emailValue);
    const phoneValid = validatePhone(phoneValue);
    const ageValid = validateAge(ageValue);
    const messageValid = validateMessage(messageValue);
    
    return nameValid && emailValid && phoneValid && ageValid && messageValid;
}

// Get form errors
function getFormErrors() {
    const errors = [];
    const errorElements = document.querySelectorAll('.error');
    
    errorElements.forEach(element => {
        if (element.style.display !== 'none' && element.textContent) {
            errors.push(element.textContent);
        }
    });
    
    return errors;
}

// Real-time password validation
function setupRealTimeValidation() {
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const strengthIndicator = document.getElementById('password-strength');
    const matchIndicator = document.getElementById('password-match');
    
    passwordField.addEventListener('input', function() {
        const strength = checkPasswordStrength(this.value);
        displayPasswordStrength(strength, strengthIndicator);
        checkPasswordMatch(passwordField.value, confirmPasswordField.value, matchIndicator);
    });
    
    confirmPasswordField.addEventListener('input', function() {
        checkPasswordMatch(passwordField.value, this.value, matchIndicator);
    });
}

function checkPasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) {
        score += 1;
    } else {
        feedback.push('At least 8 characters');
    }
    
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Lowercase letter');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Uppercase letter');
    
    if (/\d/.test(password)) score += 1;
    else feedback.push('Number');
    
    if (/[^a-zA-Z\d]/.test(password)) score += 1;
    else feedback.push('Special character');
    
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#e74c3c', '#e67e22', '#f39c12', '#2ecc71', '#27ae60'];
    
    return {
        score,
        level: levels[score] || 'Very Weak',
        color: colors[score] || '#e74c3c',
        feedback: feedback
    };
}

function displayPasswordStrength(strength, element) {
    element.innerHTML = `
        <div style="color: ${strength.color}; font-weight: bold;">
            Password Strength: ${strength.level} (${strength.score}/5)
        </div>
        ${strength.feedback.length > 0 ? `<div style="font-size: 0.8em; margin-top: 5px;">Missing: ${strength.feedback.join(', ')}</div>` : ''}
    `;
}

function checkPasswordMatch(password, confirmPassword, element) {
    if (!confirmPassword) {
        element.textContent = 'Please confirm your password';
        element.style.color = '#666';
        return;
    }
    
    if (password === confirmPassword) {
        element.textContent = '✓ Passwords match';
        element.style.color = '#27ae60';
    } else {
        element.textContent = '✗ Passwords do not match';
        element.style.color = '#e74c3c';
    }
}

// Dynamic form fields
function addInputField() {
    dynamicFieldCount++;
    const dynamicForm = document.getElementById('dynamic-form');
    
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'form-group fade-in';
    fieldContainer.innerHTML = `
        <label for="dynamic-field-${dynamicFieldCount}">Dynamic Field ${dynamicFieldCount}:</label>
        <input type="text" id="dynamic-field-${dynamicFieldCount}" name="dynamic-field-${dynamicFieldCount}" placeholder="Enter value for field ${dynamicFieldCount}">
        <button type="button" onclick="removeDynamicField(this)" style="margin-left: 10px; padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 3px; cursor: pointer;">Remove</button>
    `;
    
    dynamicForm.appendChild(fieldContainer);
}

function removeLastField() {
    const dynamicForm = document.getElementById('dynamic-form');
    const lastField = dynamicForm.lastElementChild;
    
    if (lastField) {
        lastField.style.opacity = '0';
        lastField.style.transform = 'translateY(-10px)';
        setTimeout(() => lastField.remove(), 300);
    }
}

function removeDynamicField(button) {
    const fieldContainer = button.parentElement;
    fieldContainer.style.opacity = '0';
    fieldContainer.style.transform = 'translateX(-100%)';
    setTimeout(() => fieldContainer.remove(), 300);
}

// Form data processing
function showFormData() {
    const contactForm = document.getElementById('contact-form');
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Include dynamic fields
    const dynamicFields = document.querySelectorAll('[id^="dynamic-field-"]');
    dynamicFields.forEach(field => {
        if (field.value) {
            data[field.name] = field.value;
        }
    });
    
    const display = document.getElementById('form-data-display');
    display.innerHTML = `
        <h4>Current Form Data:</h4>
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
    display.style.display = 'block';
}

// Clear form
function clearForm() {
    const contactForm = document.getElementById('contact-form');
    contactForm.reset();
    
    // Clear all validation messages
    const errorElements = document.querySelectorAll('.error, .success');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    // Clear password indicators
    document.getElementById('password-strength').textContent = 'Password strength will appear here...';
    document.getElementById('password-match').textContent = 'Password match status will appear here...';
    
    // Hide result displays
    document.getElementById('form-result').style.display = 'none';
    document.getElementById('form-data-display').style.display = 'none';
}

// Display form result
function displayFormResult(result) {
    const resultElement = document.getElementById('form-result');
    
    if (result.success) {
        resultElement.innerHTML = `
            <h4 style="color: #27ae60;">✓ ${result.message}</h4>
            <p><strong>Submitted at:</strong> ${new Date(result.timestamp).toLocaleString()}</p>
            <details>
                <summary>Form data submitted:</summary>
                <pre>${JSON.stringify(result.data, null, 2)}</pre>
            </details>
        `;
        resultElement.style.background = '#d5f4e6';
        resultElement.style.borderColor = '#27ae60';
    } else {
        resultElement.innerHTML = `
            <h4 style="color: #e74c3c;">✗ ${result.message}</h4>
            <ul>
                ${result.errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;
        resultElement.style.background = '#fdf2f2';
        resultElement.style.borderColor = '#e74c3c';
    }
    
    resultElement.style.display = 'block';
}

// Input sanitization example
function sanitizeInput(input) {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// Form validation utilities
const FormValidator = {
    required: (value) => value && value.trim().length > 0,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    minLength: (value, length) => value && value.length >= length,
    maxLength: (value, length) => value && value.length <= length,
    numeric: (value) => !isNaN(value) && !isNaN(parseFloat(value)),
    url: (value) => {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    }
};

// Initialize page
console.log('Forms page loaded successfully!'); 