// Main JavaScript for Metacognition Mastery site

// Authentication check
function checkAuthentication() {
    const savedUser = localStorage.getItem('metacognition_user');
    const isGuest = localStorage.getItem('metacognition_guest');

    if (!savedUser && !isGuest) {
        // Redirect to auth page if not authenticated
        window.location.href = 'auth.html';
        return false;
    }
    return true;
}

// User info display
function displayUserInfo() {
    const savedUser = localStorage.getItem('metacognition_user');
    const isGuest = localStorage.getItem('metacognition_guest');

    if (savedUser) {
        const user = JSON.parse(savedUser);
        addUserMenu(user);
    } else if (isGuest) {
        addGuestMenu();
    }
}

function addUserMenu(user) {
    const navbar = document.querySelector('.nav-menu');
    if (navbar) {
        const userMenuItem = document.createElement('li');
        userMenuItem.innerHTML = `
            <div class="user-menu">
                <img src="${user.picture || 'https://via.placeholder.com/32x32/60a5fa/ffffff?text=' + user.name.charAt(0)}" 
                     alt="${user.name}" class="user-avatar">
                <span class="user-name">${user.name}</span>
                <div class="user-dropdown">
                    <a href="#" id="logout-btn">Sign Out</a>
                </div>
            </div>
        `;
        navbar.appendChild(userMenuItem);

        // Add logout functionality
        document.getElementById('logout-btn').addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('metacognition_user');
            localStorage.removeItem('metacognition_guest');
            window.location.href = 'auth.html';
        });
    }
}

function addGuestMenu() {
    const navbar = document.querySelector('.nav-menu');
    if (navbar) {
        const guestMenuItem = document.createElement('li');
        guestMenuItem.innerHTML = `
            <div class="guest-menu">
                <i class="fas fa-user"></i>
                <span>Guest</span>
                <div class="guest-dropdown">
                    <a href="auth.html">Sign In</a>
                </div>
            </div>
        `;
        navbar.appendChild(guestMenuItem);
    }
}

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
    // Check authentication first
    if (!checkAuthentication()) {
        return;
    }

    // Display user info
    displayUserInfo();
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Week card hover effects and interactions
    const weekCards = document.querySelectorAll('.week-card');
    weekCards.forEach(card => {
        card.addEventListener('click', function () {
            const weekNumber = this.dataset.week;
            if (weekNumber) {
                window.location.href = `curriculum.html#week-${weekNumber}`;
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.week-card, .about-card, .resource-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .week-card, .about-card, .resource-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 1rem 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Hero stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        if (finalValue !== '∞') {
            let currentValue = 0;
            const increment = parseInt(finalValue) / 30;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= parseInt(finalValue)) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue);
                }
            }, 50);
        }
    });

    // Success Stories Interactive Brain
    initializeSuccessStories();
});

// Success Stories Data
const successStories = {
    lebron: {
        name: "LeBron James",
        skill: "Strategic Planning & Self-Awareness",
        photo: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&h=200&fit=crop&crop=face",
        bio: "LeBron James transformed from a high school phenom into a billion-dollar business empire through exceptional metacognitive skills. His ability to analyze his own performance, adapt his game, and make strategic career decisions has made him one of the most successful athlete-entrepreneurs in history.",
        connection: "LeBron's success stems from his ability to think about his thinking - constantly analyzing his performance, understanding his strengths and weaknesses, and strategically planning his career moves. From 'The Decision' to building his media empire, he exemplifies metacognitive strategic planning."
    },
    oprah: {
        name: "Oprah Winfrey",
        skill: "Self-Awareness & Empathetic Systems Thinking",
        photo: "https://images.unsplash.com/photo-1494790108755-2616c9c0b8d3?w=200&h=200&fit=crop&crop=face",
        bio: "Oprah Winfrey built a media empire worth billions by mastering the art of self-reflection and understanding human psychology. Her ability to connect with people and understand complex social systems transformed her from a local news anchor into a global icon and successful entrepreneur.",
        connection: "Oprah's extraordinary success comes from her deep self-awareness and ability to understand how people think and feel. She constantly reflects on her own experiences and uses that insight to connect with millions, demonstrating the power of metacognitive empathy and systems thinking."
    },
    serena: {
        name: "Serena Williams",
        skill: "Performance Monitoring & Mental Resilience",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        bio: "Serena Williams dominated tennis for over two decades through exceptional mental game mastery and real-time performance monitoring. Beyond sports, she's built successful business ventures by applying the same metacognitive skills that made her a champion on the court.",
        connection: "Serena's dominance comes from her ability to monitor her mental state during high-pressure situations and adjust her strategy in real-time. She exemplifies metacognitive monitoring - constantly aware of her thoughts, emotions, and performance, then making immediate adjustments to optimize results."
    },
    cuban: {
        name: "Mark Cuban",
        skill: "Decision-Making & Learning from Failure",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        bio: "Mark Cuban built his billion-dollar fortune by mastering the art of decision-making under uncertainty and learning from failures. From selling garbage bags door-to-door to owning the Dallas Mavericks, his success comes from constantly analyzing his thinking processes and adapting his strategies.",
        connection: "Cuban's entrepreneurial success demonstrates metacognitive decision-making at its finest. He constantly questions his assumptions, analyzes his failures for lessons, and makes data-driven decisions while remaining aware of his cognitive biases. His approach shows how metacognition drives business success."
    },
    mayden: {
        name: "Jason Mayden",
        skill: "Creative Problem-Solving & Innovation",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        bio: "Jason Mayden revolutionized sneaker design at Nike and Jordan Brand before founding Super Heroic to create innovative children's footwear. His success comes from his ability to think about thinking in creative ways, constantly questioning design assumptions and understanding user psychology.",
        connection: "Mayden's innovative designs stem from his metacognitive approach to creativity - he constantly analyzes how people think about and interact with products. His ability to step back and examine his own creative process, combined with deep user empathy, has made him one of the most influential designers in footwear."
    }
};

// Initialize Success Stories Functionality
function initializeSuccessStories() {
    const successNodes = document.querySelectorAll('.success-node');
    const modal = document.getElementById('success-modal');
    const modalClose = document.querySelector('.modal-close');

    // Add click listeners to success nodes
    successNodes.forEach(node => {
        node.addEventListener('click', function() {
            const person = this.dataset.person;
            showSuccessStory(person);
        });

        // Add hover effect
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.boxShadow = '0 0 40px rgba(96, 165, 250, 1)';
        });

        node.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 20px rgba(96, 165, 250, 0.8)';
        });
    });

    // Modal close functionality
    modalClose.addEventListener('click', closeSuccessModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeSuccessModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeSuccessModal();
        }
    });
}

function showSuccessStory(person) {
    const story = successStories[person];
    if (!story) return;

    const modal = document.getElementById('success-modal');
    const modalPhoto = document.getElementById('modal-photo');
    const modalName = document.getElementById('modal-name');
    const modalSkill = document.getElementById('modal-skill');
    const modalBio = document.getElementById('modal-bio');
    const modalConnection = document.getElementById('modal-connection');

    // Populate modal content
    modalPhoto.src = story.photo;
    modalPhoto.alt = story.name;
    modalName.textContent = story.name;
    modalSkill.textContent = story.skill;
    modalBio.textContent = story.bio;
    modalConnection.textContent = story.connection;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Add active state to clicked node
    document.querySelectorAll('.success-node').forEach(node => {
        node.classList.remove('active');
    });
    document.querySelector(`[data-person="${person}"]`).classList.add('active');
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';

    // Remove active state from all nodes
    document.querySelectorAll('.success-node').forEach(node => {
        node.classList.remove('active');
    });
}

// Add some interactive feedback for buttons
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('cta-button') || e.target.classList.contains('secondary-button')) {
        // Create ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);