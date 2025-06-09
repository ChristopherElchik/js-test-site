# JavaScript Test Website

A comprehensive test website showcasing various JavaScript features and functionality. This website includes multiple pages demonstrating DOM manipulation, forms, API calls, animations, and local storage.

## Features

### 🏠 **Homepage** (`/`)
- **Dynamic Clock Display** - Real-time clock with date that updates every second using setInterval
- **Theme Toggle** - Switch between light and dark themes with localStorage persistence
- **Interactive Elements** - Buttons that show random alert messages and create dynamic content cards
- **ES6+ Features** - Demonstrates arrow functions, template literals, destructuring, and async/await patterns
- **Event Handling** - Keyboard shortcuts (Ctrl+K detection) and mouse position tracking examples
- **Card Generation** - Dynamically create animated cards with random colors, titles, and content

### 🎛️ **DOM Manipulation** (`/dom-manipulation`)
- **Element Creation & Modification** - Dynamically create, modify, and remove HTML elements with animations
- **Event Handling Showcase** - Click counters, hover effects, double-click interactions with visual feedback
- **Dynamic List Management** - Add/remove list items with smooth slide animations and Enter key support
- **CSS Class Manipulation** - Toggle highlights, apply random gradient colors, dynamic style changes
- **Element Selection Examples** - Demonstrate getElementById, getElementsByTagName, getElementsByClassName
- **Real-time Event Logging** - Live event log showing timestamps and descriptions of all user interactions
- **Interactive Playground** - Sandbox area where users can experiment with DOM manipulation techniques

### 📝 **Forms & Validation** (`/forms`)
- **Complete Contact Form** - Multi-field form with name, email, phone, age, country selection, and message
- **Real-time Validation** - Instant feedback as users type with success/error styling and messages
- **Password Strength Checker** - Dynamic strength indicator showing missing requirements (length, cases, numbers, symbols)
- **Password Confirmation** - Real-time password matching validation with visual feedback
- **Dynamic Form Fields** - Add and remove form input fields on the fly with smooth animations
- **Form Data Processing** - Display and validate all form data in formatted JSON with error handling
- **Input Sanitization** - Examples of cleaning and validating user input to prevent XSS attacks
- **Advanced Validation** - Email regex, phone formatting, age limits, and required field checking

### 🌐 **API Demo** (`/api-demo`)
- **Local API Endpoint** - Test the built-in `/api/data` endpoint with loading states and error handling
- **Public API Integration** - JSONPlaceholder for posts, Random User API for realistic user data
- **Mock Weather API** - Simulated weather data demonstrating API response patterns and data formatting
- **Comprehensive Error Handling** - 404 errors, network timeouts, connection failures with user-friendly messages
- **Async Patterns Comparison** - Side-by-side examples of Promise chains vs async/await syntax
- **Request Configuration** - Custom headers, request timeouts, POST requests with JSON payload
- **Loading States & UX** - Progress indicators, loading messages, and user feedback during API calls
- **Response Processing** - Data transformation, error parsing, and result display formatting

### 🎨 **Animations** (`/animations`)
- **CSS Animation Controls** - Toggle bounce, spin, pulse, and shake animations with class manipulation
- **JavaScript Animations** - Programmatic movement, scaling, color transitions, and opacity changes using requestAnimationFrame
- **Interactive Particle System** - Click-to-create particle effects with realistic physics (gravity, velocity, lifespan)
- **Progress Bar Animations** - Smooth progress indicators with various easing functions and random values
- **Scroll-triggered Animations** - Elements that animate into view using Intersection Observer API
- **Animation Easing Demonstrations** - Visual examples of ease, linear, ease-in, ease-out, and custom cubic-bezier curves
- **Animation Controls Panel** - Play, pause, and stop all animations simultaneously with status feedback
- **Performance Monitoring** - Console logging and timing of animation performance metrics

### 💾 **Local Storage** (`/local-storage`)
- **Basic Storage Operations** - Set, get, remove, and clear localStorage items with error handling
- **User Preferences System** - Theme, font size, and notification settings that persist across sessions
- **Full-featured Todo Application** - Add, toggle completion, delete todos with localStorage persistence
- **Session vs Local Storage** - Live comparison showing data lifespan differences between storage types
- **Complex Data Storage** - Store and retrieve JavaScript objects (user profiles) with JSON serialization
- **Storage Information Dashboard** - Real-time view of storage usage, item count, and browser support status
- **Cross-tab Storage Events** - Real-time updates when storage changes in other browser tabs or windows
- **Data Management Tools** - View all stored items, storage quotas, and cleanup utilities

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Website

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3001
   ```

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-restart (requires nodemon)

## Project Structure

```
├── server.js              # Express server configuration
├── package.json           # Project dependencies and scripts
├── public/                # Static files
│   ├── index.html         # Homepage
│   ├── dom-manipulation.html
│   ├── forms.html
│   ├── api-demo.html
│   ├── animations.html
│   ├── local-storage.html
│   ├── css/
│   │   └── styles.css     # Main stylesheet
│   └── js/
│       ├── main.js        # Homepage functionality
│       ├── dom-manipulation.js
│       ├── forms.js
│       ├── api-demo.js
│       ├── animations.js
│       └── local-storage.js
└── README.md
```

## API Endpoints

The server provides the following API endpoints:

- `GET /api/data` - Returns sample JSON data with timestamp and random number

## Browser Compatibility

This website uses modern JavaScript features and is compatible with:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **APIs:** Fetch API, Local Storage API, Session Storage API
- **Features:** CSS Grid/Flexbox, CSS Animations, Intersection Observer

## Learning Objectives

This project demonstrates:

1. **Modern JavaScript Concepts:**
   - ES6+ syntax (arrow functions, template literals, destructuring)
   - Async/await and Promises
   - Event handling and DOM manipulation
   - Local and session storage

2. **Web APIs:**
   - Fetch API for HTTP requests
   - Intersection Observer for scroll animations
   - Storage API for data persistence

3. **CSS Techniques:**
   - CSS Grid and Flexbox layouts
   - CSS animations and transitions
   - Responsive design principles
   - Modern CSS features (backdrop-filter, gradients)

4. **Best Practices:**
   - Error handling
   - Input validation and sanitization
   - Code organization and modularity
   - Performance considerations

## Testing the Features

### DOM Manipulation
- Click buttons to create, modify, and remove elements
- Test event handlers (hover, click, double-click)
- Add and remove list items dynamically

### Forms & Validation
- Fill out the contact form to see real-time validation
- Test password strength indicator
- Try creating dynamic form fields

### API Demo
- Test local API endpoint
- Fetch data from public APIs
- Observe error handling with invalid requests

### Animations
- Toggle CSS animations
- Try JavaScript-powered animations
- Click in the particle area to create effects

### Local Storage
- Save and retrieve data
- Test user preferences persistence
- Try the todo list functionality

## Contributing

This is a demonstration project. Feel free to:
- Add new features or pages
- Improve existing functionality
- Enhance the styling
- Add more JavaScript examples

## License

This project is open source and available under the MIT License. 