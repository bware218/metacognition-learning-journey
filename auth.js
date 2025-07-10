// Authentication JavaScript

// Configuration
const AUTH_CONFIG = {
    GOOGLE_CLIENT_ID: 'your-google-client-id.apps.googleusercontent.com', // Replace with your actual Google Client ID
    STORAGE_KEY: 'metacognition_user',
    GUEST_KEY: 'metacognition_guest'
};

// User state management
class UserManager {
    constructor() {
        this.user = null;
        this.isGuest = false;
        this.init();
    }

    init() {
        // Check if user is already authenticated
        const savedUser = localStorage.getItem(AUTH_CONFIG.STORAGE_KEY);
        const isGuest = localStorage.getItem(AUTH_CONFIG.GUEST_KEY);
        
        if (savedUser) {
            this.user = JSON.parse(savedUser);
            this.redirectToApp();
        } else if (isGuest) {
            this.isGuest = true;
            this.redirectToApp();
        }
    }

    setUser(userData) {
        this.user = userData;
        localStorage.setItem(AUTH_CONFIG.STORAGE_KEY, JSON.stringify(userData));
        localStorage.removeItem(AUTH_CONFIG.GUEST_KEY);
        this.redirectToApp();
    }

    setGuest() {
        this.isGuest = true;
        localStorage.setItem(AUTH_CONFIG.GUEST_KEY, 'true');
        localStorage.removeItem(AUTH_CONFIG.STORAGE_KEY);
        this.redirectToApp();
    }

    logout() {
        this.user = null;
        this.isGuest = false;
        localStorage.removeItem(AUTH_CONFIG.STORAGE_KEY);
        localStorage.removeItem(AUTH_CONFIG.GUEST_KEY);
        // Clear any progress data
        this.clearProgressData();
    }

    clearProgressData() {
        // Clear activity completion data
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('activity-') || key.startsWith('week-progress-')) {
                localStorage.removeItem(key);
            }
        });
    }

    redirectToApp() {
        // Add a small delay for smooth transition
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }

    getCurrentUser() {
        return this.user;
    }

    isAuthenticated() {
        return this.user !== null || this.isGuest;
    }
}

// Initialize user manager
const userManager = new UserManager();

// Google Sign-In handling
function initializeGoogleSignIn() {
    // Note: In a real implementation, you would need to:
    // 1. Set up Google Cloud Console project
    // 2. Enable Google Sign-In API
    // 3. Get your client ID
    // 4. Replace the placeholder client ID above
    
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
            client_id: AUTH_CONFIG.GOOGLE_CLIENT_ID,
            callback: handleGoogleSignIn,
            auto_select: false,
            cancel_on_tap_outside: true
        });
    }
}

function handleGoogleSignIn(response) {
    try {
        // Decode the JWT token (in production, verify this server-side)
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        
        const userData = {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            signInMethod: 'google',
            signInTime: new Date().toISOString()
        };

        userManager.setUser(userData);
    } catch (error) {
        console.error('Error handling Google sign-in:', error);
        showError('Failed to sign in with Google. Please try again.');
    }
}

// UI Event Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Google Sign-In
    initializeGoogleSignIn();

    // Google Sign-In button
    const googleSignInBtn = document.getElementById('google-signin');
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', function() {
            this.classList.add('loading');
            this.disabled = true;
            
            // For demo purposes, simulate Google sign-in
            // In production, this would trigger the actual Google sign-in flow
            simulateGoogleSignIn();
        });
    }

    // Guest continue button
    const guestBtn = document.getElementById('guest-continue');
    if (guestBtn) {
        guestBtn.addEventListener('click', function() {
            this.classList.add('loading');
            this.disabled = true;
            
            // Small delay for UX
            setTimeout(() => {
                userManager.setGuest();
            }, 800);
        });
    }

    // Add smooth entrance animation
    setTimeout(() => {
        document.querySelector('.auth-card').style.opacity = '1';
        document.querySelector('.preview-card').style.opacity = '1';
    }, 100);
});

// Demo function - replace with actual Google Sign-In in production
function simulateGoogleSignIn() {
    // This is just for demo purposes
    // In production, remove this and use the actual Google Sign-In API
    setTimeout(() => {
        const demoUser = {
            id: 'demo_' + Date.now(),
            name: 'Demo User',
            email: 'demo@example.com',
            picture: 'https://via.placeholder.com/100x100/60a5fa/ffffff?text=DU',
            signInMethod: 'google_demo',
            signInTime: new Date().toISOString()
        };
        
        userManager.setUser(demoUser);
    }, 1500);
}

// Utility functions
function showError(message) {
    // Create a simple error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(239, 68, 68, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(16, 185, 129, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .auth-card,
    .preview-card {
        opacity: 0;
        transition: opacity 0.6s ease;
    }
`;
document.head.appendChild(notificationStyles);

// Export for use in other files
window.UserManager = UserManager;
window.userManager = userManager;