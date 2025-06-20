// Iframe Test Page JavaScript
let iframeCounter = 0;
let dynamicIframeCount = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateIframeInfo();
    setupIframeEventListeners();
    
    // Add some initial dynamic iframes
    setTimeout(() => {
        addDynamicIframe();
        addDynamicIframe();
    }, 1000);
});

// Setup event listeners for all iframes
function setupIframeEventListeners() {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        // Load event
        iframe.addEventListener('load', function() {
            console.log('Iframe loaded:', iframe.src);
            updateIframeStatus(iframe, 'loaded');
        });
        
        // Error event
        iframe.addEventListener('error', function() {
            console.log('Iframe error:', iframe.src);
            updateIframeStatus(iframe, 'error');
        });
        
        // Track iframe visibility changes
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Iframe became visible:', iframe.src);
                    updateIframeStatus(iframe, 'visible');
                } else {
                    console.log('Iframe became hidden:', iframe.src);
                    updateIframeStatus(iframe, 'hidden');
                }
            });
        });
        
        observer.observe(iframe);
    });
}

// Update iframe status
function updateIframeStatus(iframe, status) {
    const statusElement = iframe.parentElement.querySelector('.iframe-status');
    if (statusElement) {
        const currentText = statusElement.textContent;
        const newText = currentText.replace(/Status: .*/, `Status: ${status}`);
        statusElement.textContent = newText;
    }
    
    // Update counters
    updateIframeInfo();
}

// Update iframe information display
function updateIframeInfo() {
    const iframes = document.querySelectorAll('iframe');
    const loadedIframes = Array.from(iframes).filter(iframe => {
        try {
            return iframe.contentWindow && iframe.contentWindow.document.readyState === 'complete';
        } catch (e) {
            return false; // Cross-origin iframe
        }
    });
    
    const failedIframes = Array.from(iframes).filter(iframe => {
        try {
            return iframe.contentWindow && iframe.contentWindow.document.readyState === 'failed';
        } catch (e) {
            return false; // Cross-origin iframe
        }
    });
    
    document.getElementById('iframe-count').textContent = iframes.length;
    document.getElementById('loaded-count').textContent = loadedIframes.length;
    document.getElementById('failed-count').textContent = failedIframes.length;
    
    // Update detailed information
    updateIframeDetails();
}

// Update detailed iframe information
function updateIframeDetails() {
    const detailsContainer = document.getElementById('iframe-details');
    const iframes = document.querySelectorAll('iframe');
    
    let detailsHTML = '<h4>Iframe Details:</h4><ul>';
    
    iframes.forEach((iframe, index) => {
        const pendoId = iframe.getAttribute('data-pendo-iframe') || `iframe-${index}`;
        const src = iframe.src.substring(0, 50) + (iframe.src.length > 50 ? '...' : '');
        const height = iframe.height;
        const width = iframe.width || '100%';
        
        let status = 'Unknown';
        try {
            if (iframe.contentWindow && iframe.contentWindow.document.readyState === 'complete') {
                status = 'Loaded';
            } else if (iframe.contentWindow && iframe.contentWindow.document.readyState === 'loading') {
                status = 'Loading';
            } else {
                status = 'Error/Blocked';
            }
        } catch (e) {
            status = 'Cross-origin';
        }
        
        detailsHTML += `
            <li>
                <strong>${pendoId}</strong><br>
                Source: ${src}<br>
                Size: ${width} x ${height}<br>
                Status: ${status}
            </li>
        `;
    });
    
    detailsHTML += '</ul>';
    detailsContainer.innerHTML = detailsHTML;
}

// Reload all iframes
function reloadAllIframes() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        const currentSrc = iframe.src;
        iframe.src = '';
        setTimeout(() => {
            iframe.src = currentSrc;
        }, 100);
    });
    
    console.log('Reloaded all iframes');
}

// Toggle iframe visibility
function toggleIframeVisibility() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        if (iframe.style.display === 'none') {
            iframe.style.display = 'block';
        } else {
            iframe.style.display = 'none';
        }
    });
    
    console.log('Toggled iframe visibility');
}

// Add a dynamic iframe
function addDynamicIframe() {
    dynamicIframeCount++;
    const container = document.getElementById('dynamic-iframes-container');
    
    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'iframe-container';
    iframeContainer.style.margin = '20px 0';
    
    const header = document.createElement('div');
    header.className = 'iframe-header';
    header.textContent = `Dynamic Iframe ${dynamicIframeCount}`;
    
    const iframe = document.createElement('iframe');
    iframe.className = 'iframe-content';
    iframe.height = '250';
    iframe.setAttribute('data-pendo-iframe', `dynamic-${dynamicIframeCount}`);
    
    // Create dynamic content
    const dynamicContent = `
        <html>
        <head>
            <title>Dynamic Iframe ${dynamicIframeCount}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; margin: 0; }
                .dynamic-content { background: #f0f8ff; padding: 15px; border-radius: 5px; }
                button { margin: 5px; padding: 8px 15px; }
                input { margin: 5px; padding: 5px; }
            </style>
        </head>
        <body>
            <div class="dynamic-content">
                <h2>Dynamic Iframe ${dynamicIframeCount}</h2>
                <p>This iframe was created dynamically at ${new Date().toLocaleTimeString()}</p>
                <input type="text" placeholder="Test input ${dynamicIframeCount}" />
                <button onclick="alert('Button clicked in iframe ${dynamicIframeCount}!')">Click Me</button>
                <button onclick="document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16)">Random Color</button>
                <div id="counter">Clicks: 0</div>
                <script>
                    let clicks = 0;
                    document.addEventListener('click', function() {
                        clicks++;
                        document.getElementById('counter').textContent = 'Clicks: ' + clicks;
                    });
                </script>
            </div>
        </body>
        </html>
    `;
    
    iframe.src = 'data:text/html,' + encodeURIComponent(dynamicContent);
    
    const status = document.createElement('div');
    status.className = 'iframe-status';
    status.textContent = 'Status: Dynamic iframe - created at ' + new Date().toLocaleTimeString();
    
    iframeContainer.appendChild(header);
    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(status);
    
    container.appendChild(iframeContainer);
    
    // Setup event listeners for the new iframe
    iframe.addEventListener('load', function() {
        updateIframeStatus(iframe, 'loaded');
    });
    
    iframe.addEventListener('error', function() {
        updateIframeStatus(iframe, 'error');
    });
    
    updateIframeInfo();
    console.log(`Added dynamic iframe ${dynamicIframeCount}`);
}

// Remove the last dynamic iframe
function removeLastIframe() {
    const container = document.getElementById('dynamic-iframes-container');
    const iframes = container.querySelectorAll('.iframe-container');
    
    if (iframes.length > 0) {
        const lastIframe = iframes[iframes.length - 1];
        container.removeChild(lastIframe);
        dynamicIframeCount = Math.max(0, dynamicIframeCount - 1);
        updateIframeInfo();
        console.log('Removed last dynamic iframe');
    }
}

// Function to test Pendo integration
function testPendoIntegration() {
    console.log('Testing Pendo integration with iframes...');
    
    // Log all iframes for Pendo debugging
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe, index) => {
        const pendoId = iframe.getAttribute('data-pendo-iframe');
        console.log(`Iframe ${index}:`, {
            pendoId: pendoId,
            src: iframe.src,
            visible: iframe.offsetParent !== null,
            size: `${iframe.offsetWidth}x${iframe.offsetHeight}`
        });
    });
    
    // Check if Pendo is available
    if (typeof window.pendo !== 'undefined') {
        console.log('Pendo is available:', window.pendo);
        
        // Try to get Pendo metadata for iframes
        iframes.forEach((iframe, index) => {
            try {
                if (iframe.contentWindow && iframe.contentWindow.pendo) {
                    console.log(`Pendo found in iframe ${index}:`, iframe.contentWindow.pendo);
                }
            } catch (e) {
                console.log(`Cannot access Pendo in iframe ${index} (cross-origin):`, e.message);
            }
        });
    } else {
        console.log('Pendo is not available in the main window');
    }
}

// Expose functions globally for button clicks
window.reloadAllIframes = reloadAllIframes;
window.toggleIframeVisibility = toggleIframeVisibility;
window.addDynamicIframe = addDynamicIframe;
window.removeLastIframe = removeLastIframe;
window.testPendoIntegration = testPendoIntegration;

// Run Pendo test after page loads
setTimeout(testPendoIntegration, 2000); 