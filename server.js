const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes for different pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dom-manipulation', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dom-manipulation.html'));
});

app.get('/forms', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'forms.html'));
});

app.get('/api-demo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'api-demo.html'));
});

app.get('/animations', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'animations.html'));
});

app.get('/local-storage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'local-storage.html'));
});

// Simple API endpoint for testing
app.get('/api/data', (req, res) => {
    res.json({
        message: 'Hello from the API!',
        timestamp: new Date().toISOString(),
        randomNumber: Math.floor(Math.random() * 100)
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available pages:');
    console.log('- Home: http://localhost:3001/');
    console.log('- DOM Manipulation: http://localhost:3001/dom-manipulation');
    console.log('- Forms: http://localhost:3001/forms');
    console.log('- API Demo: http://localhost:3001/api-demo');
    console.log('- Animations: http://localhost:3001/animations');
    console.log('- Local Storage: http://localhost:3001/local-storage');
}); 