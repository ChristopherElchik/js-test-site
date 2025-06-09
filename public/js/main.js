// Main JavaScript file for homepage

let isDarkTheme = false;
let clockInterval;

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    startClock();
    loadThemePreference();
});

// Clock functionality
function startClock() {
    const clockElement = document.getElementById('current-time');
    
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const dateString = now.toLocaleDateString();
        
        clockElement.innerHTML = `
            <div style="font-size: 2rem; font-weight: bold;">${timeString}</div>
            <div style="font-size: 1rem; opacity: 0.8;">${dateString}</div>
        `;
    }
    
    // Update immediately and then every second
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
}

// Theme toggle functionality
function changeTheme() {
    isDarkTheme = !isDarkTheme;
    const body = document.body;
    
    if (isDarkTheme) {
        body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
        body.style.color = '#ecf0f1';
        localStorage.setItem('theme', 'dark');
    } else {
        body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        body.style.color = '#333';
        localStorage.setItem('theme', 'light');
    }
}

// Load theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        changeTheme();
    }
}

// Show alert functionality
function showAlert() {
    const messages = [
        'Welcome to the JavaScript test site!',
        'This is a demo alert message.',
        'JavaScript is awesome!',
        'You clicked the alert button!',
        'Hello from the frontend!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
}

// Add random card functionality
function addRandomCard() {
    const dynamicContent = document.getElementById('dynamic-content');
    
    const cardColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    const cardTitles = ['Dynamic Card', 'Random Content', 'Generated Element', 'New Card', 'Dynamic Addition'];
    const cardContents = [
        'This card was created dynamically!',
        'JavaScript can create HTML elements on the fly.',
        'This demonstrates DOM manipulation.',
        'Content generated at ' + new Date().toLocaleTimeString(),
        'Random number: ' + Math.floor(Math.random() * 1000)
    ];
    
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.style.borderLeft = `5px solid ${cardColors[Math.floor(Math.random() * cardColors.length)]}`;
    
    const title = cardTitles[Math.floor(Math.random() * cardTitles.length)];
    const content = cardContents[Math.floor(Math.random() * cardContents.length)];
    
    card.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <button class="btn" onclick="removeCard(this)" style="background: #e74c3c;">Remove Card</button>
    `;
    
    dynamicContent.appendChild(card);
    
    // Add animation
    setTimeout(() => card.classList.add('fade-in'), 10);
}

// Remove card functionality
function removeCard(button) {
    const card = button.closest('.card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(-20px)';
    setTimeout(() => card.remove(), 300);
}

// ES6+ Features demonstration
const demoArrowFunctions = () => {
    console.log('Arrow function executed!');
    return 'This is an arrow function result';
};

// Template literals
const createMessage = (name, time) => {
    return `Hello ${name}! The current time is ${time}.`;
};

// Destructuring
const demoDestructuring = () => {
    const user = { name: 'John', age: 30, city: 'New York' };
    const { name, age, city } = user;
    console.log(`Name: ${name}, Age: ${age}, City: ${city}`);
};

// Async/await example
async function demoAsyncFunction() {
    try {
        console.log('Starting async operation...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Async operation completed!');
        return 'Async result';
    } catch (error) {
        console.error('Async error:', error);
    }
}

// Modern array methods
const demoArrayMethods = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    const doubled = numbers.map(n => n * 2);
    const evens = numbers.filter(n => n % 2 === 0);
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    
    console.log('Original:', numbers);
    console.log('Doubled:', doubled);
    console.log('Evens:', evens);
    console.log('Sum:', sum);
};

// Event listener examples
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        console.log('Keyboard shortcut detected!');
    }
});

// Mouse tracking (for demonstration)
let mousePosition = { x: 0, y: 0 };
document.addEventListener('mousemove', function(event) {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    if (clockInterval) {
        clearInterval(clockInterval);
    }
}); 