# Metacognition Mastery - 12-Week Learning Journey

A comprehensive web-based program designed to help high school and college students develop metacognitive skills through systematic learning and practice.

## Features

### 🧠 **Comprehensive Curriculum**
- 12-week structured learning journey
- 5 core areas: Self-awareness, Strategic Planning, Cognitive Biases, Learning Mastery, and Systems Thinking
- Interactive activities and reflection exercises
- Progress tracking and completion certificates

### 🎨 **Modern Design**
- Sleek dark theme inspired by modern web applications
- Glassmorphism effects with backdrop blur
- Responsive design that works on all devices
- Smooth animations and interactive elements

### 🔐 **Authentication System**
- **Google Sign-In**: Save progress across devices with Google account
- **Guest Mode**: Start learning immediately without account creation
- **Progress Persistence**: Authenticated users can track completion across sessions

### 📱 **Interactive Features**
- Activity completion tracking
- Reflection question pondering system
- Week-by-week progress indicator
- Mobile-friendly expandable content
- Print-friendly curriculum pages

## Getting Started

### For Users
1. Visit the website
2. Choose to sign in with Google or continue as guest
3. Begin your 12-week metacognitive journey
4. Complete activities and reflect on questions
5. Track your progress through the comprehensive curriculum

### For Developers

#### Authentication Setup
To enable Google Sign-In functionality:

1. **Google Cloud Console Setup**:
   - Create a new project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Google Sign-In API
   - Create OAuth 2.0 credentials
   - Add your domain to authorized origins

2. **Update Configuration**:
   - Replace `your-google-client-id.apps.googleusercontent.com` in `auth.js` with your actual Google Client ID
   - Update the `AUTH_CONFIG.GOOGLE_CLIENT_ID` value

3. **Demo Mode**:
   - The current implementation includes a demo mode for testing
   - Remove the `simulateGoogleSignIn()` function for production use

#### File Structure
```
├── index.html          # Main landing page
├── auth.html           # Authentication page
├── curriculum.html     # Detailed 12-week curriculum
├── styles.css          # Main stylesheet
├── auth.css           # Authentication page styles
├── curriculum.css     # Curriculum page styles
├── script.js          # Main JavaScript functionality
├── auth.js            # Authentication handling
├── curriculum.js      # Curriculum page functionality
└── README.md          # This file
```

## Curriculum Overview

### Weeks 1-3: Self-Awareness Foundation
- Introduction to Metacognition
- Knowing Your Mind
- The Planning Mind

### Weeks 4-6: Strategic Development
- Monitoring Your Progress
- Problem-Solving Strategies
- Decision-Making Excellence

### Weeks 7-9: Cognitive Mastery
- Recognizing Cognitive Biases
- Overcoming Thinking Traps
- Empathetic Systems Thinking

### Weeks 10-12: Advanced Integration
- Learning How to Learn
- Mastering Mental Models
- Integration and Lifelong Practice

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with glassmorphism effects
- **Authentication**: Google Sign-In API
- **Storage**: LocalStorage for progress tracking
- **Fonts**: Inter font family
- **Icons**: Font Awesome 6

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This project is designed as an educational resource. Contributions for improvements, bug fixes, or additional content are welcome.

## License

This educational resource is provided for learning and development purposes.

---

**Start your metacognitive journey today and transform how you think, learn, and solve problems!**