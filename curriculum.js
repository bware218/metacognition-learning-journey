// Curriculum page specific JavaScript

// Authentication check for curriculum page
function checkAuthentication() {
    const savedUser = localStorage.getItem('metacognition_user');
    const isGuest = localStorage.getItem('metacognition_guest');
    
    if (!savedUser && !isGuest) {
        window.location.href = 'auth.html';
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    if (!checkAuthentication()) {
        return;
    }
    // Mobile navigation (reuse from main script)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Week navigation and progress tracking
    const weekDetails = document.querySelectorAll('.week-detail');
    const progressContainer = createProgressIndicator();
    
    function createProgressIndicator() {
        const container = document.createElement('div');
        container.className = 'week-progress';
        container.innerHTML = '<h4 style="margin-bottom: 1rem; font-size: 0.9rem; color: #2d3748;">Progress</h4>';
        
        for (let i = 1; i <= 12; i++) {
            const item = document.createElement('div');
            item.className = 'progress-item';
            item.innerHTML = `
                <div class="progress-dot" data-week="${i}"></div>
                <span>Week ${i}</span>
            `;
            container.appendChild(item);
        }
        
        document.body.appendChild(container);
        return container;
    }

    // Scroll spy for progress indicator
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const weekId = entry.target.id;
                const weekNumber = weekId.split('-')[1];
                updateProgressIndicator(weekNumber);
            }
        });
    }, observerOptions);

    weekDetails.forEach(week => {
        scrollObserver.observe(week);
    });

    function updateProgressIndicator(activeWeek) {
        const dots = document.querySelectorAll('.progress-dot');
        dots.forEach(dot => {
            const weekNum = dot.dataset.week;
            if (weekNum <= activeWeek) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for week navigation
    document.addEventListener('click', function(e) {
        if (e.target.closest('.progress-item')) {
            const weekNum = e.target.closest('.progress-item').querySelector('.progress-dot').dataset.week;
            const targetWeek = document.getElementById(`week-${weekNum}`);
            if (targetWeek) {
                targetWeek.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Expandable week content (for mobile)
    if (window.innerWidth <= 768) {
        weekDetails.forEach(week => {
            const header = week.querySelector('.week-header');
            const content = week.querySelector('.week-content');
            
            header.style.cursor = 'pointer';
            content.style.display = 'none';
            
            header.addEventListener('click', function() {
                const isExpanded = content.style.display === 'block';
                
                // Close all other weeks
                weekDetails.forEach(otherWeek => {
                    if (otherWeek !== week) {
                        otherWeek.querySelector('.week-content').style.display = 'none';
                        otherWeek.classList.remove('expanded');
                    }
                });
                
                // Toggle current week
                if (isExpanded) {
                    content.style.display = 'none';
                    week.classList.remove('expanded');
                } else {
                    content.style.display = 'block';
                    week.classList.add('expanded');
                }
            });
        });
    }

    // Activity completion tracking (local storage)
    const activities = document.querySelectorAll('.activity');
    activities.forEach((activity, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'activity-checkbox';
        checkbox.id = `activity-${index}`;
        
        // Load saved state
        const saved = localStorage.getItem(`activity-${index}`);
        if (saved === 'true') {
            checkbox.checked = true;
            activity.classList.add('completed');
        }
        
        // Save state on change
        checkbox.addEventListener('change', function() {
            localStorage.setItem(`activity-${index}`, this.checked);
            if (this.checked) {
                activity.classList.add('completed');
            } else {
                activity.classList.remove('completed');
            }
        });
        
        activity.insertBefore(checkbox, activity.firstChild);
    });

    // Reflection questions toggle
    const reflectionSections = document.querySelectorAll('.reflection-questions');
    reflectionSections.forEach(section => {
        const questions = section.querySelectorAll('li');
        questions.forEach(question => {
            question.addEventListener('click', function() {
                this.classList.toggle('pondered');
            });
        });
    });

    // Add completion tracking styles
    const style = document.createElement('style');
    style.textContent = `
        .activity {
            position: relative;
        }
        
        .activity-checkbox {
            margin-right: 1rem;
            transform: scale(1.2);
        }
        
        .activity.completed {
            opacity: 0.7;
            background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
        }
        
        .activity.completed::after {
            content: "✓ Completed";
            position: absolute;
            top: 10px;
            right: 15px;
            background: #48bb78;
            color: white;
            padding: 0.2rem 0.5rem;
            border-radius: 10px;
            font-size: 0.7rem;
            font-weight: 600;
        }
        
        .reflection-questions li {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .reflection-questions li:hover {
            background: rgba(102, 126, 234, 0.1);
            padding-left: 2.5rem;
            border-radius: 5px;
        }
        
        .reflection-questions li.pondered {
            background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
            padding-left: 2.5rem;
            border-radius: 5px;
        }
        
        .reflection-questions li.pondered::after {
            content: " 💭";
        }
        
        .week-detail.expanded .week-header {
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        }
        
        @media (max-width: 768px) {
            .week-progress {
                display: none;
            }
            
            .week-content {
                transition: all 0.3s ease;
            }
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

    // Auto-scroll to specific week if URL hash is present
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Expand on mobile
                if (window.innerWidth <= 768) {
                    const content = target.querySelector('.week-content');
                    if (content) {
                        content.style.display = 'block';
                        target.classList.add('expanded');
                    }
                }
            }
        }, 500);
    }

    // Print-friendly version toggle
    const printButton = document.createElement('button');
    printButton.textContent = '📄 Print Version';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        border: none;
        padding: 1rem;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 1000;
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
});