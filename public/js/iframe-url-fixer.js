// Iframe URL Fixer - Automatically converts relative URLs to full URLs
(function() {
    'use strict';
    
    // Get the current domain and protocol
    const currentDomain = window.location.origin;
    
    // Function to convert relative URLs to absolute URLs
    function fixIframeUrls() {
        const iframes = document.querySelectorAll('iframe[src^="/"]');
        
        iframes.forEach(iframe => {
            const relativeSrc = iframe.getAttribute('src');
            if (relativeSrc && relativeSrc.startsWith('/')) {
                const absoluteSrc = currentDomain + relativeSrc;
                iframe.setAttribute('src', absoluteSrc);
                console.log(`Fixed iframe URL: ${relativeSrc} -> ${absoluteSrc}`);
            }
        });
        
        // Also fix any data URIs that contain relative URLs
        const dataUriIframes = document.querySelectorAll('iframe[src^="data:text/html"]');
        dataUriIframes.forEach(iframe => {
            const dataUri = iframe.getAttribute('src');
            if (dataUri && dataUri.includes("src='/'")) {
                const fixedDataUri = dataUri.replace("src='/'", `src='${currentDomain}/'`);
                iframe.setAttribute('src', fixedDataUri);
                console.log('Fixed nested iframe URL in data URI');
            }
        });
    }
    
    // Run immediately if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixIframeUrls);
    } else {
        fixIframeUrls();
    }
    
    // Also run when new iframes are added dynamically
    function setupObserver() {
        if (document.body) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(function(node) {
                            if (node.nodeType === 1) { // Element node
                                if (node.tagName === 'IFRAME') {
                                    fixIframeUrls();
                                } else if (node.querySelectorAll) {
                                    const iframes = node.querySelectorAll('iframe[src^="/"]');
                                    if (iframes.length > 0) {
                                        fixIframeUrls();
                                    }
                                }
                            }
                        });
                    }
                });
            });
            
            // Start observing
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // Setup observer when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupObserver);
    } else {
        setupObserver();
    }
    
    // Export function for manual use
    window.fixIframeUrls = fixIframeUrls;
    
    console.log('Iframe URL Fixer loaded. Current domain:', currentDomain);
})(); 