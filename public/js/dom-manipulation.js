// DOM Manipulation JavaScript

let clickCount = 0;
let createdElementCount = 0;

// Initialize event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeEventHandlers();
});

// Initialize all event handlers
function initializeEventHandlers() {
    // Click counter
    const clickCounter = document.getElementById('click-counter');
    clickCounter.addEventListener('click', function() {
        clickCount++;
        this.textContent = `Click Counter: ${clickCount}`;
        logEvent(`Button clicked! Count: ${clickCount}`);
    });

    // Hover button
    const hoverBtn = document.getElementById('hover-btn');
    hoverBtn.addEventListener('mouseenter', function() {
        this.style.background = '#e74c3c';
        this.textContent = 'Mouse Over!';
        logEvent('Mouse entered hover button');
    });

    hoverBtn.addEventListener('mouseleave', function() {
        this.style.background = '';
        this.textContent = 'Hover Over Me';
        logEvent('Mouse left hover button');
    });

    // Double click button
    const doubleClickBtn = document.getElementById('double-click-btn');
    doubleClickBtn.addEventListener('dblclick', function() {
        this.style.transform = 'scale(1.2)';
        this.textContent = 'Double Clicked!';
        logEvent('Button double clicked');
        
        setTimeout(() => {
            this.style.transform = '';
            this.textContent = 'Double Click Me';
        }, 1000);
    });

    // Enter key listener for list input
    const listInput = document.getElementById('list-item-input');
    listInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addListItem();
        }
    });

    // Dynamic CSS additions
    addDynamicStyles();
}

// Element creation functions
function createElement() {
    const playground = document.getElementById('element-playground');
    createdElementCount++;
    
    const newElement = document.createElement('div');
    newElement.className = 'element-item fade-in';
    newElement.textContent = `Created Element ${createdElementCount}`;
    newElement.style.cssText = `
        padding: 10px;
        margin: 5px;
        background: linear-gradient(45deg, #3498db, #2ecc71);
        color: white;
        border-radius: 5px;
        cursor: pointer;
    `;
    
    // Add click handler to created element
    newElement.addEventListener('click', function() {
        this.style.background = 'linear-gradient(45deg, #e74c3c, #f39c12)';
        logEvent(`Created element ${createdElementCount} clicked`);
    });
    
    playground.appendChild(newElement);
    logEvent(`New element created: Element ${createdElementCount}`);
}

function modifyElements() {
    const demoText = document.getElementById('demo-text');
    const elementItems = document.querySelectorAll('.element-item');
    
    // Modify demo text
    const modifications = [
        'Text has been modified!',
        'DOM manipulation in action!',
        'This text was changed dynamically!',
        'JavaScript is powerful!',
        'Elements can be modified easily!'
    ];
    
    demoText.textContent = modifications[Math.floor(Math.random() * modifications.length)];
    demoText.style.color = '#e74c3c';
    demoText.style.fontWeight = 'bold';
    
    // Modify existing elements
    elementItems.forEach((item, index) => {
        item.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
        item.style.opacity = Math.random() * 0.5 + 0.5;
    });
    
    logEvent('Elements modified');
}

function removeElements() {
    const elementItems = document.querySelectorAll('.element-item');
    if (elementItems.length > 2) { // Keep original 2 elements
        const lastElement = elementItems[elementItems.length - 1];
        lastElement.style.opacity = '0';
        lastElement.style.transform = 'translateX(100%)';
        setTimeout(() => lastElement.remove(), 300);
        logEvent('Element removed');
    } else {
        logEvent('No more elements to remove (keeping original elements)');
    }
}

// List management functions
function addListItem() {
    const input = document.getElementById('list-item-input');
    const list = document.getElementById('dynamic-list');
    
    if (input.value.trim() === '') {
        alert('Please enter an item name');
        return;
    }
    
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        ${input.value} 
        <button onclick="removeListItem(this)" style="margin-left: 10px; padding: 2px 8px; background: #e74c3c; color: white; border: none; border-radius: 3px; cursor: pointer;">Remove</button>
    `;
    listItem.className = 'fade-in';
    
    list.appendChild(listItem);
    input.value = '';
    logEvent(`List item added: ${listItem.textContent.split(' ')[0]}`);
}

function removeListItem(button) {
    const listItem = button.parentElement;
    const itemName = listItem.textContent.split(' ')[0];
    
    listItem.style.opacity = '0';
    listItem.style.transform = 'translateX(-100%)';
    setTimeout(() => listItem.remove(), 300);
    
    logEvent(`List item removed: ${itemName}`);
}

function clearList() {
    const list = document.getElementById('dynamic-list');
    const items = list.querySelectorAll('li');
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            setTimeout(() => item.remove(), 300);
        }, index * 100);
    });
    
    logEvent('All list items cleared');
}

// CSS class manipulation
let isHighlighted = false;
function toggleHighlight() {
    const styleDemo = document.getElementById('style-demo');
    
    if (isHighlighted) {
        styleDemo.style.background = '';
        styleDemo.style.border = '';
        styleDemo.style.color = '';
        styleDemo.textContent = 'This box will change styles dynamically!';
    } else {
        styleDemo.style.background = 'linear-gradient(45deg, #f39c12, #e67e22)';
        styleDemo.style.border = '3px solid #e74c3c';
        styleDemo.style.color = 'white';
        styleDemo.textContent = 'Highlighted! Click again to remove.';
    }
    
    isHighlighted = !isHighlighted;
    logEvent(`Highlight toggled: ${isHighlighted ? 'ON' : 'OFF'}`);
}

function addRandomColor() {
    const styleDemo = document.getElementById('style-demo');
    const colors = [
        'linear-gradient(45deg, #e74c3c, #c0392b)',
        'linear-gradient(45deg, #3498db, #2980b9)',
        'linear-gradient(45deg, #2ecc71, #27ae60)',
        'linear-gradient(45deg, #f39c12, #e67e22)',
        'linear-gradient(45deg, #9b59b6, #8e44ad)'
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    styleDemo.style.background = randomColor;
    styleDemo.style.color = 'white';
    styleDemo.textContent = `Random color applied! Background: ${randomColor.split(',')[0].split('(')[2]}`;
    
    logEvent('Random color applied');
}

// Element selection examples
function selectByTag() {
    const buttons = document.getElementsByTagName('button');
    const result = document.getElementById('selection-result');
    
    result.innerHTML = `
        <h4>Selection by Tag: 'button'</h4>
        <p>Found ${buttons.length} button elements</p>
        <p>First button text: "${buttons[0].textContent}"</p>
    `;
    
    // Temporarily highlight all buttons
    Array.from(buttons).forEach(button => {
        button.style.border = '2px solid #e74c3c';
        setTimeout(() => button.style.border = '', 2000);
    });
    
    logEvent(`Selected ${buttons.length} elements by tag 'button'`);
}

function selectByClass() {
    const cards = document.getElementsByClassName('card');
    const result = document.getElementById('selection-result');
    
    result.innerHTML = `
        <h4>Selection by Class: 'card'</h4>
        <p>Found ${cards.length} elements with class 'card'</p>
    `;
    
    // Temporarily highlight all cards
    Array.from(cards).forEach(card => {
        card.style.border = '2px solid #3498db';
        setTimeout(() => card.style.border = '', 2000);
    });
    
    logEvent(`Selected ${cards.length} elements by class 'card'`);
}

function selectById() {
    const element = document.getElementById('demo-text');
    const result = document.getElementById('selection-result');
    
    result.innerHTML = `
        <h4>Selection by ID: 'demo-text'</h4>
        <p>Element found: ${element ? 'Yes' : 'No'}</p>
        <p>Current text: "${element.textContent}"</p>
        <p>Tag name: ${element.tagName}</p>
    `;
    
    // Temporarily highlight the element
    element.style.border = '2px solid #2ecc71';
    setTimeout(() => element.style.border = '', 2000);
    
    logEvent('Selected element by ID: demo-text');
}

// Event logging
function logEvent(message) {
    const eventLog = document.getElementById('event-log');
    const timestamp = new Date().toLocaleTimeString();
    
    const logEntry = document.createElement('div');
    logEntry.style.cssText = `
        padding: 5px;
        margin: 2px 0;
        background: rgba(52, 152, 219, 0.1);
        border-left: 3px solid #3498db;
        font-size: 0.9em;
    `;
    logEntry.innerHTML = `<strong>${timestamp}:</strong> ${message}`;
    
    eventLog.appendChild(logEntry);
    eventLog.scrollTop = eventLog.scrollHeight;
    
    // Keep only last 10 entries
    const entries = eventLog.children;
    if (entries.length > 10) {
        eventLog.removeChild(entries[0]);
    }
}

// Add dynamic styles
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .highlight-animation {
            animation: highlightFlash 0.6s ease-in-out;
        }
        
        @keyframes highlightFlash {
            0%, 100% { background-color: transparent; }
            50% { background-color: rgba(241, 196, 15, 0.3); }
        }
        
        .element-item:hover {
            transform: scale(1.05);
            transition: transform 0.2s ease;
        }
    `;
    document.head.appendChild(style);
}

// Cleanup function
window.addEventListener('beforeunload', function() {
    // Clean up any intervals or timeouts if needed
    console.log('DOM manipulation page unloading...');
}); 