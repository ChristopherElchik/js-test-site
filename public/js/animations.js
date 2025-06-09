// Animations JavaScript

let activeAnimations = [];
let particles = [];

// Initialize animations page
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupParticleContainer();
    console.log('Animations page loaded');
});

// CSS Animation Controls
function toggleBounce() {
    const box = document.getElementById('css-demo-box');
    box.classList.toggle('bounce');
    logAnimation('Bounce animation toggled');
}

function toggleSpin() {
    const box = document.getElementById('css-demo-box');
    box.classList.toggle('spin');
    logAnimation('Spin animation toggled');
}

function togglePulse() {
    const box = document.getElementById('css-demo-box');
    box.classList.toggle('pulse');
    logAnimation('Pulse animation toggled');
}

function triggerShake() {
    const box = document.getElementById('css-demo-box');
    box.classList.add('shake');
    setTimeout(() => box.classList.remove('shake'), 500);
    logAnimation('Shake animation triggered');
}

// JavaScript Animations
function animateMove() {
    const box = document.getElementById('js-demo-box');
    const startPos = 0;
    const endPos = 200;
    const duration = 1000;
    let startTime = null;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentPos = startPos + (endPos - startPos) * easeOut;
        
        box.style.transform = `translateX(${currentPos}px)`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Reset position after animation
            setTimeout(() => {
                box.style.transform = 'translateX(0)';
            }, 500);
        }
    }
    
    requestAnimationFrame(animate);
    logAnimation('Move animation started');
}

function animateScale() {
    const box = document.getElementById('js-demo-box');
    const startScale = 1;
    const endScale = 1.5;
    const duration = 800;
    let startTime = null;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Sine wave for smooth scaling
        const scale = startScale + (endScale - startScale) * Math.sin(progress * Math.PI);
        box.style.transform = `scale(${scale})`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            box.style.transform = 'scale(1)';
        }
    }
    
    requestAnimationFrame(animate);
    logAnimation('Scale animation started');
}

function animateColor() {
    const box = document.getElementById('js-demo-box');
    const colors = [
        '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'
    ];
    let colorIndex = 0;
    let intervalId;

    function changeColor() {
        box.style.background = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }

    intervalId = setInterval(changeColor, 200);
    
    setTimeout(() => {
        clearInterval(intervalId);
        box.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    }, 2000);
    
    logAnimation('Color animation started');
}

function animateOpacity() {
    const box = document.getElementById('js-demo-box');
    const duration = 1500;
    let startTime = null;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Fade out and in
        const opacity = 0.5 + 0.5 * Math.cos(progress * Math.PI * 2);
        box.style.opacity = opacity;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            box.style.opacity = 1;
        }
    }
    
    requestAnimationFrame(animate);
    logAnimation('Opacity animation started');
}

// Progress Bar Animations
function animateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const targetWidth = Math.floor(Math.random() * 100) + 1;
    
    animateToWidth(progressFill, targetWidth, 1500);
    logAnimation(`Progress animated to ${targetWidth}%`);
}

function resetProgress() {
    const progressFill = document.getElementById('progress-fill');
    animateToWidth(progressFill, 0, 500);
    logAnimation('Progress reset to 0%');
}

function randomProgress() {
    const progressFill = document.getElementById('progress-fill');
    const targetWidth = Math.floor(Math.random() * 100) + 1;
    
    animateToWidth(progressFill, targetWidth, 800);
    logAnimation(`Random progress: ${targetWidth}%`);
}

function animateToWidth(element, targetWidth, duration) {
    const startWidth = parseInt(element.style.width) || 0;
    let startTime = null;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeInOut = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;
            
        const currentWidth = startWidth + (targetWidth - startWidth) * easeInOut;
        element.style.width = `${currentWidth}%`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Particle System
function setupParticleContainer() {
    const container = document.getElementById('particle-container');
    
    container.addEventListener('click', function(e) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        createParticle(x, y);
    });
}

function createParticle(x, y) {
    const container = document.getElementById('particle-container');
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
    `;
    
    container.appendChild(particle);
    particles.push(particle);
    
    animateParticle(particle, x, y);
}

function animateParticle(particle, startX, startY) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 100 + 50;
    const gravity = 200;
    const life = 2000;
    
    let startTime = null;
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = elapsed / life;
        
        if (progress >= 1) {
            particle.remove();
            particles = particles.filter(p => p !== particle);
            return;
        }
        
        const t = elapsed / 1000;
        const x = startX + Math.cos(angle) * velocity * t;
        const y = startY + Math.sin(angle) * velocity * t + 0.5 * gravity * t * t;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = 1 - progress;
        
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}

function createBurst() {
    const container = document.getElementById('particle-container');
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY);
        }, i * 50);
    }
    
    logAnimation('Particle burst created');
}

function clearParticles() {
    particles.forEach(particle => {
        particle.style.transition = 'opacity 0.3s ease';
        particle.style.opacity = '0';
        setTimeout(() => particle.remove(), 300);
    });
    particles = [];
    logAnimation('All particles cleared');
}

// Animation Easing Demonstrations
function demoEasing(easingType) {
    const box = document.getElementById('easing-box');
    const container = document.getElementById('easing-demo');
    const containerWidth = container.offsetWidth - 120; // Account for box width
    
    box.style.transition = `transform 2s ${easingType}`;
    box.style.transform = `translateX(${containerWidth}px)`;
    
    setTimeout(() => {
        box.style.transform = 'translateX(0)';
    }, 2500);
    
    logAnimation(`Easing demo: ${easingType}`);
}

// Animation Controls
function playAllAnimations() {
    const cssBox = document.getElementById('css-demo-box');
    const jsBox = document.getElementById('js-demo-box');
    
    // CSS animations
    cssBox.classList.add('bounce', 'pulse');
    
    // JavaScript animations
    animateMove();
    setTimeout(() => animateScale(), 500);
    setTimeout(() => animateColor(), 1000);
    
    // Progress animation
    setTimeout(() => animateProgress(), 1500);
    
    updateAnimationStatus('All animations playing');
    
    setTimeout(() => {
        cssBox.classList.remove('bounce', 'pulse');
        updateAnimationStatus('Animations completed');
    }, 3000);
}

function pauseAllAnimations() {
    const cssBox = document.getElementById('css-demo-box');
    
    // Remove CSS animation classes
    cssBox.classList.remove('bounce', 'spin', 'pulse');
    
    // For JavaScript animations, we'd need to track and cancel RAF calls
    updateAnimationStatus('Animations paused');
}

function stopAllAnimations() {
    const cssBox = document.getElementById('css-demo-box');
    const jsBox = document.getElementById('js-demo-box');
    const progressFill = document.getElementById('progress-fill');
    
    // Stop CSS animations
    cssBox.classList.remove('bounce', 'spin', 'pulse', 'shake');
    
    // Reset JavaScript animation styles
    jsBox.style.transform = '';
    jsBox.style.opacity = '';
    jsBox.style.background = '';
    
    // Reset progress
    progressFill.style.width = '0%';
    
    // Clear particles
    clearParticles();
    
    updateAnimationStatus('All animations stopped');
}

// Scroll Animations (Intersection Observer)
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe scroll items
    const scrollItems = document.querySelectorAll('.scroll-item');
    scrollItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Utility Functions
function updateAnimationStatus(status) {
    const statusElement = document.getElementById('animation-status');
    statusElement.textContent = `Animation Status: ${status}`;
    
    // Add visual feedback
    statusElement.style.background = '#e8f5e8';
    statusElement.style.borderColor = '#4caf50';
    
    setTimeout(() => {
        statusElement.style.background = '';
        statusElement.style.borderColor = '';
    }, 1000);
}

function logAnimation(action) {
    console.log(`Animation: ${action} at ${new Date().toLocaleTimeString()}`);
}

// Performance monitoring
function measureAnimationPerformance(callback) {
    const start = performance.now();
    callback();
    const end = performance.now();
    console.log(`Animation took ${end - start} milliseconds`);
}

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    particles.forEach(particle => particle.remove());
    console.log('Animations page cleanup completed');
}); 