// Local Storage JavaScript

let todos = [];

// Initialize local storage functionality
document.addEventListener('DOMContentLoaded', function() {
    loadUserPreferences();
    loadTodos();
    setupStorageEventListener();
    console.log('Local Storage page loaded');
});

// Basic Storage Operations
function setStorageItem() {
    const key = document.getElementById('storage-key').value;
    const value = document.getElementById('storage-value').value;
    const resultElement = document.getElementById('storage-result');
    
    if (!key) {
        displayStorageResult(resultElement, {
            success: false,
            message: 'Please enter a key'
        });
        return;
    }
    
    try {
        localStorage.setItem(key, value);
        displayStorageResult(resultElement, {
            success: true,
            operation: 'SET',
            key: key,
            value: value,
            message: 'Item stored successfully'
        });
    } catch (error) {
        displayStorageResult(resultElement, {
            success: false,
            message: `Error storing item: ${error.message}`
        });
    }
}

function getStorageItem() {
    const key = document.getElementById('storage-key').value;
    const resultElement = document.getElementById('storage-result');
    
    if (!key) {
        displayStorageResult(resultElement, {
            success: false,
            message: 'Please enter a key to retrieve'
        });
        return;
    }
    
    try {
        const value = localStorage.getItem(key);
        
        if (value !== null) {
            displayStorageResult(resultElement, {
                success: true,
                operation: 'GET',
                key: key,
                value: value,
                message: 'Item retrieved successfully'
            });
        } else {
            displayStorageResult(resultElement, {
                success: false,
                message: `No item found with key: ${key}`
            });
        }
    } catch (error) {
        displayStorageResult(resultElement, {
            success: false,
            message: `Error retrieving item: ${error.message}`
        });
    }
}

function removeStorageItem() {
    const key = document.getElementById('storage-key').value;
    const resultElement = document.getElementById('storage-result');
    
    if (!key) {
        displayStorageResult(resultElement, {
            success: false,
            message: 'Please enter a key to remove'
        });
        return;
    }
    
    try {
        localStorage.removeItem(key);
        displayStorageResult(resultElement, {
            success: true,
            operation: 'REMOVE',
            key: key,
            message: 'Item removed successfully'
        });
    } catch (error) {
        displayStorageResult(resultElement, {
            success: false,
            message: `Error removing item: ${error.message}`
        });
    }
}

function clearAllStorage() {
    const resultElement = document.getElementById('storage-result');
    
    try {
        const itemCount = localStorage.length;
        localStorage.clear();
        displayStorageResult(resultElement, {
            success: true,
            operation: 'CLEAR',
            message: `All ${itemCount} items cleared successfully`
        });
    } catch (error) {
        displayStorageResult(resultElement, {
            success: false,
            message: `Error clearing storage: ${error.message}`
        });
    }
}

// User Preferences
function saveThemePreference() {
    const theme = document.getElementById('theme-select').value;
    localStorage.setItem('userTheme', theme);
    applyTheme(theme);
}

function saveFontPreference() {
    const fontSize = document.getElementById('font-size').value;
    const display = document.getElementById('font-size-display');
    
    display.textContent = `${fontSize}px`;
    localStorage.setItem('userFontSize', fontSize);
    document.body.style.fontSize = `${fontSize}px`;
}

function saveNotificationPreference() {
    const notifications = document.getElementById('notifications').checked;
    localStorage.setItem('userNotifications', notifications);
}

function loadUserPreferences() {
    // Load theme
    const savedTheme = localStorage.getItem('userTheme');
    if (savedTheme) {
        document.getElementById('theme-select').value = savedTheme;
        applyTheme(savedTheme);
    }
    
    // Load font size
    const savedFontSize = localStorage.getItem('userFontSize');
    if (savedFontSize) {
        document.getElementById('font-size').value = savedFontSize;
        document.getElementById('font-size-display').textContent = `${savedFontSize}px`;
        document.body.style.fontSize = `${savedFontSize}px`;
    }
    
    // Load notifications
    const savedNotifications = localStorage.getItem('userNotifications');
    if (savedNotifications) {
        document.getElementById('notifications').checked = savedNotifications === 'true';
    }
}

function applyTheme(theme) {
    const body = document.body;
    
    switch (theme) {
        case 'dark':
            body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
            body.style.color = '#ecf0f1';
            break;
        case 'light':
            body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            body.style.color = '#333';
            break;
        case 'auto':
            // Simple auto mode - use system preference if available
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                applyTheme('dark');
            } else {
                applyTheme('light');
            }
            break;
    }
}

function resetPreferences() {
    localStorage.removeItem('userTheme');
    localStorage.removeItem('userFontSize');
    localStorage.removeItem('userNotifications');
    
    // Reset form values
    document.getElementById('theme-select').value = 'light';
    document.getElementById('font-size').value = 16;
    document.getElementById('font-size-display').textContent = '16px';
    document.getElementById('notifications').checked = false;
    
    // Apply defaults
    applyTheme('light');
    document.body.style.fontSize = '16px';
}

// Todo List with Persistence
function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    
    if (!text) {
        alert('Please enter a todo item');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.push(todo);
    saveTodos();
    renderTodos();
    input.value = '';
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function removeTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

function clearCompletedTodos() {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
}

function clearAllTodos() {
    todos = [];
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        try {
            todos = JSON.parse(savedTodos);
            renderTodos();
        } catch (error) {
            console.error('Error loading todos:', error);
            todos = [];
        }
    }
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    
    if (todos.length === 0) {
        todoList.innerHTML = '<p style="text-align: center; opacity: 0.6;">No todos yet. Add one above!</p>';
        return;
    }
    
    todoList.innerHTML = todos.map(todo => `
        <div class="todo-item" style="display: flex; align-items: center; padding: 10px; margin: 5px 0; background: ${todo.completed ? '#f0f0f0' : 'white'}; border-radius: 5px; border-left: 3px solid ${todo.completed ? '#27ae60' : '#3498db'};">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})" style="margin-right: 10px;">
            <span style="flex: 1; text-decoration: ${todo.completed ? 'line-through' : 'none'}; opacity: ${todo.completed ? '0.6' : '1'};">${todo.text}</span>
            <small style="margin-right: 10px; opacity: 0.6;">${new Date(todo.createdAt).toLocaleDateString()}</small>
            <button onclick="removeTodo(${todo.id})" style="background: #e74c3c; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer;">Delete</button>
        </div>
    `).join('');
}

// Session vs Local Storage
function saveToSession() {
    const data = document.getElementById('session-data').value;
    sessionStorage.setItem('sessionTestData', data);
    showStorageComparison();
}

function loadFromSession() {
    const data = sessionStorage.getItem('sessionTestData');
    document.getElementById('session-data').value = data || '';
    showStorageComparison();
}

function saveToLocal() {
    const data = document.getElementById('local-data').value;
    localStorage.setItem('localTestData', data);
    showStorageComparison();
}

function loadFromLocal() {
    const data = localStorage.getItem('localTestData');
    document.getElementById('local-data').value = data || '';
    showStorageComparison();
}

function showStorageComparison() {
    const display = document.getElementById('storage-comparison');
    const sessionData = sessionStorage.getItem('sessionTestData');
    const localData = localStorage.getItem('localTestData');
    
    display.innerHTML = `
        <h4>Storage Comparison:</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 10px 0;">
            <div>
                <strong>Session Storage:</strong>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 5px;">
                    ${sessionData ? `"${sessionData}"` : 'No data'}
                </div>
                <small>Persists until browser tab is closed</small>
            </div>
            <div>
                <strong>Local Storage:</strong>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 5px;">
                    ${localData ? `"${localData}"` : 'No data'}
                </div>
                <small>Persists until manually cleared</small>
            </div>
        </div>
    `;
    display.style.display = 'block';
}

// Complex Data Storage
function saveUserProfile() {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const age = document.getElementById('user-age').value;
    
    if (!name || !email) {
        alert('Name and email are required');
        return;
    }
    
    const profile = {
        name: name,
        email: email,
        age: age ? parseInt(age) : null,
        savedAt: new Date().toISOString(),
        version: '1.0'
    };
    
    try {
        localStorage.setItem('userProfile', JSON.stringify(profile));
        displayProfileResult({
            success: true,
            message: 'Profile saved successfully',
            profile: profile
        });
    } catch (error) {
        displayProfileResult({
            success: false,
            message: `Error saving profile: ${error.message}`
        });
    }
}

function loadUserProfile() {
    try {
        const profileData = localStorage.getItem('userProfile');
        
        if (profileData) {
            const profile = JSON.parse(profileData);
            
            document.getElementById('user-name').value = profile.name;
            document.getElementById('user-email').value = profile.email;
            document.getElementById('user-age').value = profile.age || '';
            
            displayProfileResult({
                success: true,
                message: 'Profile loaded successfully',
                profile: profile
            });
        } else {
            displayProfileResult({
                success: false,
                message: 'No profile found in storage'
            });
        }
    } catch (error) {
        displayProfileResult({
            success: false,
            message: `Error loading profile: ${error.message}`
        });
    }
}

function deleteUserProfile() {
    localStorage.removeItem('userProfile');
    
    // Clear form
    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';
    document.getElementById('user-age').value = '';
    
    displayProfileResult({
        success: true,
        message: 'Profile deleted successfully'
    });
}

// Storage Information
function showStorageInfo() {
    const display = document.getElementById('storage-info');
    
    // Calculate storage usage
    let localStorageSize = 0;
    let sessionStorageSize = 0;
    
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            localStorageSize += localStorage[key].length + key.length;
        }
    }
    
    for (let key in sessionStorage) {
        if (sessionStorage.hasOwnProperty(key)) {
            sessionStorageSize += sessionStorage[key].length + key.length;
        }
    }
    
    display.innerHTML = `
        <h4>Storage Information:</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <strong>Local Storage:</strong>
                <ul style="margin: 10px 0;">
                    <li>Items: ${localStorage.length}</li>
                    <li>Size: ~${localStorageSize} characters</li>
                    <li>Available: Yes</li>
                </ul>
            </div>
            <div>
                <strong>Session Storage:</strong>
                <ul style="margin: 10px 0;">
                    <li>Items: ${sessionStorage.length}</li>
                    <li>Size: ~${sessionStorageSize} characters</li>
                    <li>Available: Yes</li>
                </ul>
            </div>
        </div>
        <div style="margin-top: 15px;">
            <strong>Browser Support:</strong>
            <ul>
                <li>Local Storage: ${typeof(Storage) !== "undefined" ? '✓ Supported' : '✗ Not supported'}</li>
                <li>Session Storage: ${typeof(Storage) !== "undefined" ? '✓ Supported' : '✗ Not supported'}</li>
            </ul>
        </div>
    `;
    display.style.display = 'block';
}

function showAllStorageItems() {
    const display = document.getElementById('storage-info');
    
    const localItems = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localItems[key] = localStorage.getItem(key);
    }
    
    const sessionItems = {};
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        sessionItems[key] = sessionStorage.getItem(key);
    }
    
    display.innerHTML = `
        <h4>All Storage Items:</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <strong>Local Storage Items:</strong>
                <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; max-height: 300px; overflow-y: auto;">${JSON.stringify(localItems, null, 2)}</pre>
            </div>
            <div>
                <strong>Session Storage Items:</strong>
                <pre style="background: #f8f9fa; padding: 10px; border-radius: 5px; max-height: 300px; overflow-y: auto;">${JSON.stringify(sessionItems, null, 2)}</pre>
            </div>
        </div>
    `;
    display.style.display = 'block';
}

// Storage Events
function setupStorageEventListener() {
    window.addEventListener('storage', function(e) {
        const eventsDisplay = document.getElementById('storage-events');
        const timestamp = new Date().toLocaleTimeString();
        
        const eventInfo = `
            <div style="padding: 10px; margin: 5px 0; background: #e8f5e8; border-left: 3px solid #4caf50; border-radius: 3px;">
                <strong>${timestamp}:</strong> Storage Event Detected<br>
                <strong>Key:</strong> ${e.key}<br>
                <strong>Old Value:</strong> ${e.oldValue}<br>
                <strong>New Value:</strong> ${e.newValue}<br>
                <strong>URL:</strong> ${e.url}
            </div>
        `;
        
        eventsDisplay.innerHTML = eventInfo + eventsDisplay.innerHTML;
        
        // Keep only last 5 events
        const events = eventsDisplay.children;
        if (events.length > 5) {
            eventsDisplay.removeChild(events[events.length - 1]);
        }
    });
}

function triggerStorageEvent() {
    const timestamp = Date.now();
    localStorage.setItem('storageEventTest', `Event triggered at ${new Date().toLocaleTimeString()}`);
    
    setTimeout(() => {
        localStorage.removeItem('storageEventTest');
    }, 2000);
}

// Utility Functions
function displayStorageResult(element, result) {
    let html = '';
    
    if (result.success) {
        html = `
            <div style="color: #27ae60; font-weight: bold;">✓ ${result.message}</div>
            ${result.operation ? `<div><strong>Operation:</strong> ${result.operation}</div>` : ''}
            ${result.key ? `<div><strong>Key:</strong> ${result.key}</div>` : ''}
            ${result.value !== undefined ? `<div><strong>Value:</strong> ${result.value}</div>` : ''}
        `;
    } else {
        html = `
            <div style="color: #e74c3c; font-weight: bold;">✗ ${result.message}</div>
        `;
    }
    
    element.innerHTML = html;
    element.style.display = 'block';
}

function displayProfileResult(result) {
    const element = document.getElementById('profile-result');
    
    let html = '';
    
    if (result.success) {
        html = `
            <div style="color: #27ae60; font-weight: bold;">✓ ${result.message}</div>
            ${result.profile ? `<pre>${JSON.stringify(result.profile, null, 2)}</pre>` : ''}
        `;
    } else {
        html = `
            <div style="color: #e74c3c; font-weight: bold;">✗ ${result.message}</div>
        `;
    }
    
    element.innerHTML = html;
    element.style.display = 'block';
}

// Storage quota check
function checkStorageQuota() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        navigator.storage.estimate().then(estimate => {
            console.log('Storage quota:', estimate.quota);
            console.log('Storage usage:', estimate.usage);
        });
    }
}

// Initialize storage quota check
checkStorageQuota();

console.log('Local Storage page loaded successfully!'); 