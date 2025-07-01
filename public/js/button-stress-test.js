// Button Stress Test JavaScript
let clickData = {
    totalClicks: 0,
    uniqueButtons: new Set(),
    buttonClicks: {},
    clickHistory: []
};

// Button configurations for different categories
const buttonConfigs = {
    primary: [
        'Submit', 'Save', 'Create', 'Add', 'Update', 'Delete', 'Confirm', 'Cancel',
        'Apply', 'Install', 'Download', 'Upload', 'Share', 'Like', 'Follow', 'Subscribe',
        'Purchase', 'Buy', 'Order', 'Checkout', 'Pay', 'Donate', 'Support', 'Join',
        'Register', 'Sign Up', 'Login', 'Logout', 'Profile', 'Settings', 'Preferences',
        'Search', 'Filter', 'Sort', 'Export', 'Import', 'Sync', 'Backup', 'Restore',
        'Refresh', 'Reload', 'Reset', 'Clear', 'Close', 'Open', 'Start', 'Stop',
        'Pause', 'Resume', 'Next', 'Previous', 'First', 'Last'
    ],
    secondary: [
        'View', 'Edit', 'Modify', 'Change', 'Replace', 'Move', 'Copy', 'Paste',
        'Cut', 'Duplicate', 'Clone', 'Merge', 'Split', 'Combine', 'Separate',
        'Expand', 'Collapse', 'Show', 'Hide', 'Display', 'Toggle', 'Switch',
        'Enable', 'Disable', 'Activate', 'Deactivate', 'Lock', 'Unlock',
        'Pin', 'Unpin', 'Star', 'Unstar', 'Bookmark', 'Unbookmark',
        'Archive', 'Unarchive', 'Mark as Read', 'Mark as Unread',
        'Flag', 'Unflag', 'Report', 'Block', 'Unblock', 'Mute', 'Unmute',
        'Verify', 'Validate', 'Test', 'Debug', 'Optimize', 'Compress'
    ],
    utility: [
        'Help', 'Support', 'Contact', 'Feedback', 'Report Bug', 'Feature Request',
        'Documentation', 'Tutorial', 'Guide', 'FAQ', 'Terms', 'Privacy', 'About',
        'Version', 'Changelog', 'Release Notes', 'Roadmap', 'Status', 'Health',
        'Metrics', 'Analytics', 'Dashboard', 'Reports', 'Logs', 'Console',
        'Terminal', 'Command', 'Execute', 'Run', 'Build', 'Deploy', 'Publish',
        'Release', 'Tag', 'Branch', 'Commit', 'Push', 'Pull', 'Fetch', 'Clone',
        'Fork', 'Merge', 'Rebase', 'Stash', 'Reset', 'Revert', 'Cherry-pick'
    ],
    navigation: [
        'Home', 'Dashboard', 'Overview', 'Summary', 'Details', 'Full View',
        'List View', 'Grid View', 'Table View', 'Card View', 'Timeline',
        'Calendar', 'Schedule', 'Events', 'Notifications', 'Messages',
        'Inbox', 'Sent', 'Drafts', 'Trash', 'Archive', 'Favorites',
        'Recent', 'Popular', 'Trending', 'Featured', 'Recommended',
        'Browse', 'Explore', 'Discover', 'Search Results', 'Filtered',
        'Sorted', 'Grouped', 'Categorized', 'Tagged', 'Labeled',
        'Bookmarked', 'Pinned', 'Starred', 'Flagged', 'Archived'
    ],
    dynamic: [
        'Generate', 'Create Random', 'Build', 'Assemble', 'Construct',
        'Produce', 'Manufacture', 'Fabricate', 'Craft', 'Design',
        'Develop', 'Program', 'Code', 'Script', 'Automate', 'Schedule',
        'Plan', 'Organize', 'Arrange', 'Structure', 'Format', 'Style',
        'Theme', 'Customize', 'Personalize', 'Configure', 'Setup',
        'Initialize', 'Boot', 'Launch', 'Startup', 'Warmup', 'Preload',
        'Cache', 'Buffer', 'Queue', 'Stack', 'Heap', 'Memory', 'Storage',
        'Database', 'Table', 'Record', 'Field', 'Column', 'Row', 'Cell'
    ]
};

// Generate buttons for a specific category
function generateButtons(category, containerId, startIndex) {
    const container = document.getElementById(containerId);
    const buttons = buttonConfigs[category];
    
    buttons.forEach((text, index) => {
        const buttonNumber = startIndex + index;
        const button = document.createElement('button');
        button.className = 'btn stress-btn';
        button.textContent = `${text} ${buttonNumber}`;
        button.id = `btn-${buttonNumber}`;
        
        // Add unique tracking attributes
        button.setAttribute('data-button-id', buttonNumber);
        button.setAttribute('data-category', category);
        button.setAttribute('data-action', text.toLowerCase().replace(/\s+/g, '-'));
        button.setAttribute('data-timestamp', Date.now() + index);
        button.setAttribute('data-analytics-event', `button_click_${category}_${buttonNumber}`);
        
        // Add click event listener
        button.addEventListener('click', function(e) {
            handleButtonClick(e, buttonNumber, category, text);
        });
        
        container.appendChild(button);
    });
}

// Handle button clicks
function handleButtonClick(event, buttonId, category, text) {
    const button = event.target;
    const timestamp = Date.now();
    
    // Update click data
    clickData.totalClicks++;
    clickData.uniqueButtons.add(buttonId);
    
    if (!clickData.buttonClicks[buttonId]) {
        clickData.buttonClicks[buttonId] = 0;
    }
    clickData.buttonClicks[buttonId]++;
    
    // Add to click history
    clickData.clickHistory.push({
        buttonId,
        category,
        text,
        timestamp,
        clickCount: clickData.buttonClicks[buttonId]
    });
    
    // Visual feedback
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 200);
    
    // Update counters
    updateCounters();
    
    // Track analytics event (simulate)
    trackAnalyticsEvent(buttonId, category, text);
    
    // Update analytics display
    updateAnalyticsDisplay();
}

// Update counters
function updateCounters() {
    document.getElementById('total-clicks').textContent = clickData.totalClicks;
    document.getElementById('unique-clicks').textContent = clickData.uniqueButtons.size;
}

// Track analytics event (simulate various analytics platforms)
function trackAnalyticsEvent(buttonId, category, text) {
    // Simulate Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'button_click', {
            'event_category': category,
            'event_label': `Button ${buttonId}: ${text}`,
            'value': buttonId
        });
    }
    
    // Simulate Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('Button Clicked', {
            buttonId,
            category,
            text,
            timestamp: Date.now()
        });
    }
    
    // Simulate Amplitude
    if (typeof amplitude !== 'undefined') {
        amplitude.getInstance().logEvent('Button Clicked', {
            buttonId,
            category,
            text,
            timestamp: Date.now()
        });
    }
    
    // Simulate Pendo
    if (typeof pendo !== 'undefined') {
        pendo.track('button_clicked', {
            buttonId,
            category,
            text,
            timestamp: Date.now()
        });
    }
    
    // Console log for debugging
    console.log(`Analytics Event: Button ${buttonId} (${category}) - "${text}" clicked at ${new Date().toISOString()}`);
}

// Update analytics display
function updateAnalyticsDisplay() {
    const display = document.getElementById('analytics-display');
    const recentClicks = clickData.clickHistory.slice(-10).reverse();
    
    let html = '<h3>Recent Clicks</h3>';
    html += '<div style="max-height: 300px; overflow-y: auto;">';
    
    recentClicks.forEach(click => {
        const time = new Date(click.timestamp).toLocaleTimeString();
        html += `<p><strong>${time}</strong> - Button ${click.buttonId} (${click.category}): "${click.text}" - Click #${click.clickCount}</p>`;
    });
    
    html += '</div>';
    
    // Add summary stats
    const mostClicked = Object.entries(clickData.buttonClicks)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
    
    html += '<h3>Most Clicked Buttons</h3>';
    html += '<ul>';
    mostClicked.forEach(([buttonId, clicks]) => {
        html += `<li>Button ${buttonId}: ${clicks} clicks</li>`;
    });
    html += '</ul>';
    
    display.innerHTML = html;
}

// Utility functions
function resetCounter() {
    clickData = {
        totalClicks: 0,
        uniqueButtons: new Set(),
        buttonClicks: {},
        clickHistory: []
    };
    updateCounters();
    updateAnalyticsDisplay();
}

function resetAllButtons() {
    document.querySelectorAll('.stress-btn').forEach(button => {
        button.classList.remove('clicked');
    });
    resetCounter();
}

function clickAllButtons() {
    const buttons = document.querySelectorAll('.stress-btn');
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.click();
        }, index * 50); // Stagger clicks by 50ms
    });
}

function clickRandomButtons(count) {
    const buttons = document.querySelectorAll('.stress-btn');
    const shuffled = Array.from(buttons).sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, buttons.length));
    
    selected.forEach((button, index) => {
        setTimeout(() => {
            button.click();
        }, index * 100); // Stagger clicks by 100ms
    });
}

function exportClickData() {
    const data = {
        summary: {
            totalClicks: clickData.totalClicks,
            uniqueButtons: clickData.uniqueButtons.size,
            totalButtons: document.querySelectorAll('.stress-btn').length
        },
        buttonClicks: clickData.buttonClicks,
        clickHistory: clickData.clickHistory
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `button-stress-test-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Generate all button categories
    generateButtons('primary', 'primary-buttons', 1);
    generateButtons('secondary', 'secondary-buttons', 51);
    generateButtons('utility', 'utility-buttons', 101);
    generateButtons('navigation', 'navigation-buttons', 151);
    generateButtons('dynamic', 'dynamic-buttons', 201);
    
    // Update button count
    const totalButtons = document.querySelectorAll('.stress-btn').length;
    document.getElementById('button-count').textContent = totalButtons;
    
    // Initialize counters
    updateCounters();
    updateAnalyticsDisplay();
    
    console.log(`Button Stress Test initialized with ${totalButtons} buttons`);
}); 