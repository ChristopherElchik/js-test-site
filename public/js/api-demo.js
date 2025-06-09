// API Demo JavaScript

// Initialize API demo functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('API Demo page loaded');
});

// Local API functions
async function fetchLocalData() {
    const resultElement = document.getElementById('local-api-result');
    
    try {
        showLoading('Fetching local data...');
        const response = await fetch('/api/data');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        displayResult(resultElement, {
            success: true,
            endpoint: '/api/data',
            method: 'GET',
            data: data
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.message,
            endpoint: '/api/data'
        });
    } finally {
        hideLoading();
    }
}

async function fetchWithLoading() {
    const resultElement = document.getElementById('local-api-result');
    const loadingElement = document.getElementById('loading-indicator');
    
    try {
        loadingElement.style.display = 'block';
        loadingElement.textContent = 'Loading with progress indicator...';
        
        // Simulate longer loading time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const response = await fetch('/api/data');
        const data = await response.json();
        
        displayResult(resultElement, {
            success: true,
            endpoint: '/api/data',
            method: 'GET',
            data: data,
            note: 'This request included a loading indicator'
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.message
        });
    } finally {
        loadingElement.style.display = 'none';
    }
}

// JSONPlaceholder API functions
async function fetchPost() {
    const postId = document.getElementById('post-id').value || 1;
    const resultElement = document.getElementById('post-result');
    
    try {
        showLoading('Fetching post data...');
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        
        if (!response.ok) {
            throw new Error(`Post not found (status: ${response.status})`);
        }
        
        const post = await response.json();
        
        displayResult(resultElement, {
            success: true,
            endpoint: `https://jsonplaceholder.typicode.com/posts/${postId}`,
            method: 'GET',
            data: post
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.message,
            endpoint: `https://jsonplaceholder.typicode.com/posts/${postId}`
        });
    } finally {
        hideLoading();
    }
}

async function fetchAllPosts() {
    const resultElement = document.getElementById('post-result');
    
    try {
        showLoading('Fetching all posts...');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        
        // Show only first 5 posts for brevity
        const limitedPosts = posts.slice(0, 5);
        
        displayResult(resultElement, {
            success: true,
            endpoint: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            data: limitedPosts,
            note: `Showing first 5 of ${posts.length} total posts`
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.message
        });
    } finally {
        hideLoading();
    }
}

// Random User API functions
async function fetchRandomUser() {
    const resultElement = document.getElementById('user-result');
    
    try {
        showLoading('Fetching random user...');
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        
        const user = data.results[0];
        const userData = {
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            location: `${user.location.city}, ${user.location.country}`,
            picture: user.picture.medium,
            age: user.dob.age
        };
        
        displayResult(resultElement, {
            success: true,
            endpoint: 'https://randomuser.me/api/',
            method: 'GET',
            data: userData
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.message
        });
    } finally {
        hideLoading();
    }
}

async function fetchMultipleUsers() {
    const resultElement = document.getElementById('user-result');
    
    try {
        showLoading('Fetching multiple users...');
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json();
        
        const users = data.results.map(user => ({
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            location: `${user.location.city}, ${user.location.country}`
        }));
        
        displayResult(resultElement, {
            success: true,
            endpoint: 'https://randomuser.me/api/?results=5',
            method: 'GET',
            data: users
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.message
        });
    } finally {
        hideLoading();
    }
}

// Weather API demo (using mock data)
async function fetchWeather() {
    const cityName = document.getElementById('city-name').value || 'London';
    const resultElement = document.getElementById('weather-result');
    
    try {
        showLoading('Fetching weather data...');
        
        // Using mock weather data since most weather APIs require keys
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        const mockWeatherData = {
            city: cityName,
            temperature: Math.floor(Math.random() * 30) + 5,
            condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
            humidity: Math.floor(Math.random() * 40) + 30,
            windSpeed: Math.floor(Math.random() * 20) + 5,
            timestamp: new Date().toISOString()
        };
        
        displayResult(resultElement, {
            success: true,
            endpoint: `weather-api/${cityName}`,
            method: 'GET',
            data: mockWeatherData,
            note: 'This is mock data for demonstration purposes'
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.message
        });
    } finally {
        hideLoading();
    }
}

// Error handling demonstrations
async function fetchNonExistentEndpoint() {
    const resultElement = document.getElementById('error-result');
    
    try {
        showLoading('Attempting to fetch non-existent endpoint...');
        const response = await fetch('/api/nonexistent');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        displayResult(resultElement, {
            success: true,
            data: data
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.message,
            errorType: 'HTTP Error',
            statusCode: '404',
            explanation: 'This error is expected - the endpoint does not exist'
        });
    } finally {
        hideLoading();
    }
}

async function fetchWithNetworkError() {
    const resultElement = document.getElementById('error-result');
    
    try {
        showLoading('Simulating network error...');
        
        // Simulate network timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 100); // Very short timeout
        
        const response = await fetch('https://httpstat.us/200?sleep=5000', {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        const data = await response.text();
        
        displayResult(resultElement, {
            success: true,
            data: data
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.name === 'AbortError' ? 'Request timeout (simulated network error)' : error.message,
            errorType: 'Network Error',
            explanation: 'This demonstrates how to handle network timeouts and connection issues'
        });
    } finally {
        hideLoading();
    }
}

// Promise vs Async/Await demonstrations
function demonstratePromises() {
    const resultElement = document.getElementById('async-demo-result');
    
    showLoading('Demonstrating Promise chains...');
    
    fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(user => {
            return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        })
        .then(response => response.json())
        .then(posts => {
            displayResult(resultElement, {
                success: true,
                method: 'Promise Chain',
                data: {
                    totalPosts: posts.length,
                    firstPost: posts[0],
                    implementation: 'Using .then() chain'
                }
            });
        })
        .catch(error => {
            displayResult(resultElement, {
                success: false,
                error: error.message,
                method: 'Promise Chain'
            });
        })
        .finally(() => {
            hideLoading();
        });
}

async function demonstrateAsyncAwait() {
    const resultElement = document.getElementById('async-demo-result');
    
    try {
        showLoading('Demonstrating async/await...');
        
        const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!userResponse.ok) {
            throw new Error('Network response was not ok');
        }
        
        const user = await userResponse.json();
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        const posts = await postsResponse.json();
        
        displayResult(resultElement, {
            success: true,
            method: 'Async/Await',
            data: {
                totalPosts: posts.length,
                firstPost: posts[0],
                implementation: 'Using async/await syntax'
            }
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.message,
            method: 'Async/Await'
        });
    } finally {
        hideLoading();
    }
}

// Request configuration examples
async function fetchWithHeaders() {
    const resultElement = document.getElementById('config-result');
    
    try {
        showLoading('Fetching with custom headers...');
        
        const response = await fetch('https://httpbin.org/headers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Custom-Header': 'test-value',
                'User-Agent': 'JavaScript-Test-Site'
            }
        });
        
        const data = await response.json();
        
        displayResult(resultElement, {
            success: true,
            endpoint: 'https://httpbin.org/headers',
            method: 'GET',
            data: data.headers,
            note: 'This shows the headers that were sent with the request'
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.message
        });
    } finally {
        hideLoading();
    }
}

async function fetchWithTimeout() {
    const resultElement = document.getElementById('config-result');
    
    try {
        showLoading('Fetching with timeout...');
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch('https://httpbin.org/delay/2', {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        const data = await response.json();
        
        displayResult(resultElement, {
            success: true,
            endpoint: 'https://httpbin.org/delay/2',
            data: data,
            note: 'Request completed within timeout period (5 seconds)'
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.name === 'AbortError' ? 'Request timed out after 5 seconds' : error.message,
            note: 'This demonstrates request timeout handling'
        });
    } finally {
        hideLoading();
    }
}

async function postData() {
    const resultElement = document.getElementById('config-result');
    
    try {
        showLoading('Sending POST request...');
        
        const postData = {
            title: 'Test Post',
            body: 'This is a test post created by the JavaScript test site',
            userId: 1,
            timestamp: new Date().toISOString()
        };
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });
        
        const data = await response.json();
        
        displayResult(resultElement, {
            success: true,
            endpoint: 'https://jsonplaceholder.typicode.com/posts',
            method: 'POST',
            sentData: postData,
            receivedData: data,
            note: 'POST request sent successfully'
        });
        
    } catch (error) {
        displayResult(resultElement, {
            success: false,
            error: error.message,
            method: 'POST'
        });
    } finally {
        hideLoading();
    }
}

// Utility functions
function showLoading(message = 'Loading...') {
    console.log(message);
}

function hideLoading() {
    console.log('Loading complete');
}

function displayResult(element, result) {
    let html = '';
    
    if (result.success) {
        html = `
            <div style="color: #27ae60; font-weight: bold;">✓ Success</div>
            ${result.endpoint ? `<div><strong>Endpoint:</strong> ${result.endpoint}</div>` : ''}
            ${result.method ? `<div><strong>Method:</strong> ${result.method}</div>` : ''}
            ${result.note ? `<div><strong>Note:</strong> ${result.note}</div>` : ''}
            <div><strong>Response:</strong></div>
            <pre>${JSON.stringify(result.data, null, 2)}</pre>
            ${result.sentData ? `<div><strong>Sent Data:</strong></div><pre>${JSON.stringify(result.sentData, null, 2)}</pre>` : ''}
            ${result.receivedData ? `<div><strong>Received Data:</strong></div><pre>${JSON.stringify(result.receivedData, null, 2)}</pre>` : ''}
        `;
    } else {
        html = `
            <div style="color: #e74c3c; font-weight: bold;">✗ Error</div>
            ${result.endpoint ? `<div><strong>Endpoint:</strong> ${result.endpoint}</div>` : ''}
            ${result.method ? `<div><strong>Method:</strong> ${result.method}</div>` : ''}
            ${result.errorType ? `<div><strong>Error Type:</strong> ${result.errorType}</div>` : ''}
            ${result.statusCode ? `<div><strong>Status Code:</strong> ${result.statusCode}</div>` : ''}
            <div><strong>Error Message:</strong> ${result.error}</div>
            ${result.explanation ? `<div><strong>Explanation:</strong> ${result.explanation}</div>` : ''}
        `;
    }
    
    element.innerHTML = html;
    element.style.display = 'block';
}

console.log('API Demo page loaded successfully!'); 