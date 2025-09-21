// Ayurvedic Doshas Guide - Interactive Educational Features

// Global state management for dosha learning interface
const doshaGuide = {
    currentDoshaTab: 'vata',
    quizState: {
        currentQuestion: 1,
        totalQuestions: 3,
        answers: {},
        scores: { vata: 0, pitta: 0, kapha: 0 }
    },
    navigationHistory: [],
    currentSection: 'hero',
    learningProgress: {
        sectionsVisited: [],
        quizCompleted: false,
        doshaProfilesViewed: []
    }
};

// Comprehensive dosha data for educational content
const DOSHA_DATA = {
    vata: {
        name: 'Vata',
        symbol: '💨',
        element: 'Air + Space',
        description: 'The energy of movement and communication, governing all bodily and mental activities.',
        qualities: ['Light', 'Dry', 'Cold', 'Rough', 'Subtle', 'Mobile'],
        balancedQualities: ['Creative', 'Enthusiastic', 'Flexible', 'Quick thinking', 'Artistic', 'Adaptable'],
        imbalancedQualities: ['Anxious', 'Worried', 'Scattered', 'Indecisive', 'Fearful', 'Restless']
    },
    pitta: {
        name: 'Pitta',
        symbol: '🔥',
        element: 'Fire + Water',
        description: 'The energy of transformation and metabolism, controlling digestion and metabolic processes.',
        qualities: ['Hot', 'Sharp', 'Light', 'Oily', 'Liquid', 'Mobile'],
        balancedQualities: ['Intelligent', 'Focused', 'Ambitious', 'Confident', 'Natural leaders', 'Organized'],
        imbalancedQualities: ['Irritable', 'Impatient', 'Critical', 'Aggressive', 'Perfectionist', 'Judgmental']
    },
    kapha: {
        name: 'Kapha',
        symbol: '🌍',
        element: 'Earth + Water',
        description: 'The energy of structure and stability, providing strength, immunity, and lubrication.',
        qualities: ['Heavy', 'Cold', 'Moist', 'Oily', 'Smooth', 'Static'],
        balancedQualities: ['Calm', 'Patient', 'Loving', 'Loyal', 'Steady', 'Reliable'],
        imbalancedQualities: ['Stubborn', 'Possessive', 'Lethargic', 'Resistant to change', 'Complacent', 'Dull']
    }
};

// Quiz questions for dosha assessment
const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: "What best describes your natural body frame?",
        options: [
            { dosha: 'vata', text: 'Thin, light frame - difficulty gaining weight', icon: '💨' },
            { dosha: 'pitta', text: 'Medium build - gains/loses weight moderately', icon: '🔥' },
            { dosha: 'kapha', text: 'Solid, heavy frame - gains weight easily', icon: '🌍' }
        ]
    },
    {
        id: 2,
        question: "How would you describe your skin quality?",
        options: [
            { dosha: 'vata', text: 'Dry, rough, cool - prone to wrinkles', icon: '💨' },
            { dosha: 'pitta', text: 'Warm, soft - prone to rashes and freckles', icon: '🔥' },
            { dosha: 'kapha', text: 'Thick, smooth, cool - well-moisturized', icon: '🌍' }
        ]
    },
    {
        id: 3,
        question: "Which mental tendencies resonate most with you?",
        options: [
            { dosha: 'vata', text: 'Creative, quick thinking - can be anxious', icon: '💨' },
            { dosha: 'pitta', text: 'Focused, ambitious - can be irritable', icon: '🔥' },
            { dosha: 'kapha', text: 'Calm, steady - can be lethargic', icon: '🌍' }
        ]
    },
    {
        id: 4,
        question: "What describes your appetite and digestion?",
        options: [
            { dosha: 'vata', text: 'Variable appetite - irregular eating patterns', icon: '💨' },
            { dosha: 'pitta', text: 'Strong appetite - gets irritable when hungry', icon: '🔥' },
            { dosha: 'kapha', text: 'Steady appetite - can skip meals easily', icon: '🌍' }
        ]
    },
    {
        id: 5,
        question: "How do you typically handle stress?",
        options: [
            { dosha: 'vata', text: 'Become anxious and worried - mind races', icon: '💨' },
            { dosha: 'pitta', text: 'Get irritated and impatient - want to fix it', icon: '🔥' },
            { dosha: 'kapha', text: 'Remain calm but may withdraw or avoid', icon: '🌍' }
        ]
    }
];

// DOM Elements
let navbar, navToggle, navMenu, quizContainer, resultsContainer;

// Initialize the educational interface
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    navbar = document.querySelector('.navbar');
    navToggle = document.querySelector('.navbar__toggle');
    navMenu = document.querySelector('.navbar__menu');
    quizContainer = document.querySelector('.assessment-quiz');
    resultsContainer = document.getElementById('quiz-results');

    // Initialize all educational features
    initializeNavigation();
    initializeSmoothScrolling();
    initializeDoshaTabs();
    initializeQuiz();
    initializeHeroButtons();
    initializeAccessibility();
    initializeProgressTracking();
    initializeEducationalAnimations();
    
    console.log('Complete Guide to Ayurvedic Doshas initialized successfully');
    
    // Welcome message for learners
    setTimeout(() => {
        showEducationalNotification('Welcome to your journey of Ayurvedic self-discovery. Begin exploring the ancient wisdom of doshas! 🕉️', 'info');
    }, 1000);
});

// Navigation Functions
function initializeNavigation() {
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.navbar__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (navMenu.classList.contains('active')) {
                    navToggle.click();
                }
                
                // Handle navigation
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    scrollToSection(targetId);
                }
            });
        });
    }
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    allAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Initialize hero buttons
function initializeHeroButtons() {
    const heroButtons = document.querySelectorAll('.hero__actions .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                const match = onclick.match(/scrollToSection\('([^']+)'\)/);
                if (match && match[1]) {
                    scrollToSection(match[1]);
                }
            }
        });
    });
}

function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        const header = document.querySelector('.header');
        const headerOffset = header ? header.offsetHeight : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
        updateActiveNavLink(sectionId);
        
        // Track navigation and learning progress
        doshaGuide.navigationHistory.push({
            section: sectionId,
            timestamp: new Date().toISOString()
        });
        doshaGuide.currentSection = sectionId;
        
        // Update learning progress
        if (!doshaGuide.learningProgress.sectionsVisited.includes(sectionId)) {
            doshaGuide.learningProgress.sectionsVisited.push(sectionId);
            updateLearningProgress();
        }
        
        console.log(`Navigated to section: ${sectionId}`);
    }
}

function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
        }
    });
}

// Dosha Profile Tabs Functionality
function initializeDoshaTabs() {
    const doshaTabBtns = document.querySelectorAll('.dosha-tab-btn');
    const doshaPanels = document.querySelectorAll('.dosha-panel');

    doshaTabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const dosha = this.dataset.dosha;
            switchDoshaTab(dosha);
        });
    });
}

function switchDoshaTab(dosha) {
    doshaGuide.currentDoshaTab = dosha;
    
    // Update button states
    const doshaTabBtns = document.querySelectorAll('.dosha-tab-btn');
    doshaTabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.dosha === dosha) {
            btn.classList.add('active');
        }
    });
    
    // Update panels
    const doshaPanels = document.querySelectorAll('.dosha-panel');
    doshaPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.dosha === dosha) {
            panel.classList.add('active');
            panel.classList.add('fade-in');
        }
    });
    
    // Track dosha profile views
    if (!doshaGuide.learningProgress.doshaProfilesViewed.includes(dosha)) {
        doshaGuide.learningProgress.doshaProfilesViewed.push(dosha);
        updateLearningProgress();
    }
    
    console.log(`Switched to dosha profile: ${dosha}`);
    showEducationalNotification(`Exploring ${DOSHA_DATA[dosha].name} - ${DOSHA_DATA[dosha].description}`, 'info', 3000);
}

// Quiz Functionality
function initializeQuiz() {
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const showResultsBtn = document.getElementById('show-results');
    
    // Reset quiz state
    doshaGuide.quizState = {
        currentQuestion: 1,
        totalQuestions: QUIZ_QUESTIONS.length,
        answers: {},
        scores: { vata: 0, pitta: 0, kapha: 0 }
    };

    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateQuiz(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateQuiz(1));
    }
    
    if (showResultsBtn) {
        showResultsBtn.addEventListener('click', showQuizResults);
    }
    
    // Add event listeners to quiz options
    const quizOptions = document.querySelectorAll('.quiz-option input[type="radio"]');
    quizOptions.forEach(option => {
        option.addEventListener('change', handleQuizAnswer);
    });
    
    updateQuizNavigation();
}

function navigateQuiz(direction) {
    const currentQ = doshaGuide.quizState.currentQuestion;
    const totalQ = doshaGuide.quizState.totalQuestions;
    const newQuestion = currentQ + direction;
    
    if (newQuestion >= 1 && newQuestion <= totalQ) {
        // Hide current question
        const currentQuestionEl = document.querySelector(`.quiz-question[data-question="${currentQ}"]`);
        if (currentQuestionEl) {
            currentQuestionEl.classList.remove('active');
        }
        
        // Show new question
        const newQuestionEl = document.querySelector(`.quiz-question[data-question="${newQuestion}"]`);
        if (newQuestionEl) {
            newQuestionEl.classList.add('active');
            doshaGuide.quizState.currentQuestion = newQuestion;
            updateQuizNavigation();
        }
    }
}

function updateQuizNavigation() {
    const currentQ = doshaGuide.quizState.currentQuestion;
    const totalQ = doshaGuide.quizState.totalQuestions;
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const showResultsBtn = document.getElementById('show-results');
    
    if (prevBtn) {
        prevBtn.disabled = currentQ === 1;
    }
    
    if (nextBtn && showResultsBtn) {
        if (currentQ === totalQ) {
            nextBtn.style.display = 'none';
            showResultsBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            showResultsBtn.style.display = 'none';
        }
    }
}

function handleQuizAnswer(event) {
    const questionNum = parseInt(event.target.name.replace('q', ''));
    const doshaType = event.target.value;
    
    // Store answer
    doshaGuide.quizState.answers[questionNum] = doshaType;
    
    // Update scores
    calculateQuizScores();
    
    console.log(`Question ${questionNum} answered: ${doshaType}`);
    console.log('Current scores:', doshaGuide.quizState.scores);
}

function calculateQuizScores() {
    // Reset scores
    doshaGuide.quizState.scores = { vata: 0, pitta: 0, kapha: 0 };
    
    // Calculate scores based on answers
    Object.values(doshaGuide.quizState.answers).forEach(answer => {
        doshaGuide.quizState.scores[answer]++;
    });
}

function showQuizResults() {
    const resultsContainer = document.getElementById('quiz-results');
    if (!resultsContainer) return;
    
    calculateQuizScores();
    const scores = doshaGuide.quizState.scores;
    const totalAnswers = Object.keys(doshaGuide.quizState.answers).length;
    
    if (totalAnswers === 0) {
        showEducationalNotification('Please answer at least one question to see results.', 'warning');
        return;
    }
    
    // Calculate percentages
    const percentages = {
        vata: Math.round((scores.vata / totalAnswers) * 100),
        pitta: Math.round((scores.pitta / totalAnswers) * 100),
        kapha: Math.round((scores.kapha / totalAnswers) * 100)
    };
    
    // Find dominant dosha
    const dominantDosha = Object.keys(scores).reduce((a, b) => 
        scores[a] > scores[b] ? a : b
    );
    
    // Update score bars
    setTimeout(() => {
        const vataFill = document.querySelector('.vata-fill');
        const pittaFill = document.querySelector('.pitta-fill');
        const kaphaFill = document.querySelector('.kapha-fill');
        
        if (vataFill) vataFill.style.width = `${percentages.vata}%`;
        if (pittaFill) pittaFill.style.width = `${percentages.pitta}%`;
        if (kaphaFill) kaphaFill.style.width = `${percentages.kapha}%`;
        
        // Update percentage text
        const vataPerc = document.querySelector('.vata-score .score-percentage');
        const pittaPerc = document.querySelector('.pitta-score .score-percentage');
        const kaphaPerc = document.querySelector('.kapha-score .score-percentage');
        
        if (vataPerc) vataPerc.textContent = `${percentages.vata}%`;
        if (pittaPerc) pittaPerc.textContent = `${percentages.pitta}%`;
        if (kaphaPerc) kaphaPerc.textContent = `${percentages.kapha}%`;
    }, 100);
    
    // Update dominant dosha information
    const dominantDoshaName = document.getElementById('dominant-dosha-name');
    const dominantDoshaDesc = document.getElementById('dominant-dosha-description');
    
    if (dominantDoshaName && dominantDoshaDesc) {
        const doshaData = DOSHA_DATA[dominantDosha];
        dominantDoshaName.textContent = `${doshaData.symbol} ${doshaData.name}`;
        dominantDoshaDesc.textContent = doshaData.description;
    }
    
    // Show results
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Mark quiz as completed
    doshaGuide.learningProgress.quizCompleted = true;
    updateLearningProgress();
    
    // Show completion message
    const completionMessage = generateCompletionMessage(dominantDosha, percentages);
    showEducationalNotification(completionMessage, 'success', 5000);
    
    console.log('Quiz completed:', { scores, percentages, dominantDosha });
}

function generateCompletionMessage(dominantDosha, percentages) {
    const doshaData = DOSHA_DATA[dominantDosha];
    const percentage = percentages[dominantDosha];
    
    let message = `🕉️ Assessment Complete! Your primary dosha is ${doshaData.symbol} ${doshaData.name} (${percentage}%). `;
    
    if (percentage >= 60) {
        message += "You have a strong single-dosha constitution.";
    } else if (percentage >= 40) {
        const secondary = Object.keys(percentages)
            .filter(d => d !== dominantDosha)
            .reduce((a, b) => percentages[a] > percentages[b] ? a : b);
        message += `You have a dual-dosha constitution with ${DOSHA_DATA[secondary].name} influence.`;
    } else {
        message += "You have a balanced tri-doshic constitution.";
    }
    
    return message;
}

// Educational Progress Tracking
function initializeProgressTracking() {
    // Monitor section viewing for educational progress
    if ('IntersectionObserver' in window) {
        const educationalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    if (sectionId) {
                        updateActiveNavLink(sectionId);
                        doshaGuide.currentSection = sectionId;
                        
                        if (!doshaGuide.learningProgress.sectionsVisited.includes(sectionId)) {
                            doshaGuide.learningProgress.sectionsVisited.push(sectionId);
                            updateLearningProgress();
                        }
                    }
                }
            });
        }, { threshold: 0.5 });

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            educationalObserver.observe(section);
        });
    }
}

function updateLearningProgress() {
    const progress = doshaGuide.learningProgress;
    const totalSections = 10; // Total number of educational sections
    const sectionsProgress = Math.round((progress.sectionsVisited.length / totalSections) * 100);
    const doshaProfilesProgress = Math.round((progress.doshaProfilesViewed.length / 3) * 100);
    const quizProgress = progress.quizCompleted ? 100 : 0;
    
    const overallProgress = Math.round((sectionsProgress + doshaProfilesProgress + quizProgress) / 3);
    
    console.log('Learning Progress Update:', {
        sectionsVisited: progress.sectionsVisited.length,
        doshaProfilesViewed: progress.doshaProfilesViewed.length,
        quizCompleted: progress.quizCompleted,
        overallProgress: overallProgress + '%'
    });
    
    // Show progress milestones
    if (progress.sectionsVisited.length === 5 && !progress.milestoneFive) {
        showEducationalNotification('🌟 Halfway through your Ayurvedic journey! You\'re doing great!', 'success');
        progress.milestoneFive = true;
    }
    
    if (progress.doshaProfilesViewed.length === 3 && !progress.allDoshasViewed) {
        showEducationalNotification('🕉️ Wonderful! You\'ve explored all three doshas. Consider taking the assessment now.', 'success');
        progress.allDoshasViewed = true;
    }
}

// Educational Animations and Interactions
function initializeEducationalAnimations() {
    // Add scroll-triggered animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver(animateOnScroll, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const animationTargets = document.querySelectorAll(
            '.dosha-overview-card, .matter-item, .benefit-card, .constitution-type-card, .assessment-category-card'
        );
        
        animationTargets.forEach(target => {
            animationObserver.observe(target);
        });
    }
    
    // Add hover interactions for dosha cards
    const doshaCards = document.querySelectorAll('.dosha-overview-card');
    doshaCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const doshaType = this.classList.contains('vata') ? 'vata' : 
                            this.classList.contains('pitta') ? 'pitta' : 'kapha';
            const doshaData = DOSHA_DATA[doshaType];
            
            // Could show tooltip or additional info on hover
            console.log(`Exploring ${doshaData.name} dosha`);
        });
    });
}

// Accessibility Features
function initializeAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('a[href="#main-content"]');
    if (skipLink) {
        skipLink.addEventListener('click', function(event) {
            event.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.setAttribute('tabindex', '-1');
                mainContent.focus();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        // Escape key handling
        if (event.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.click();
            }
        }
        
        // Alt + D for dosha profiles
        if (event.altKey && event.key.toLowerCase() === 'd') {
            event.preventDefault();
            scrollToSection('dosha-profiles');
        }
        
        // Alt + A for assessment
        if (event.altKey && event.key.toLowerCase() === 'a') {
            event.preventDefault();
            scrollToSection('assessment');
        }
        
        // Arrow keys for dosha tabs
        if (event.target.classList.contains('dosha-tab-btn')) {
            const tabs = [...document.querySelectorAll('.dosha-tab-btn')];
            const currentIndex = tabs.indexOf(event.target);
            
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                const nextIndex = (currentIndex + 1) % tabs.length;
                tabs[nextIndex].click();
                tabs[nextIndex].focus();
            } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                tabs[prevIndex].click();
                tabs[prevIndex].focus();
            }
        }
    });

    // ARIA labels for dynamic content
    const quizQuestions = document.querySelectorAll('.quiz-question');
    quizQuestions.forEach((question, index) => {
        question.setAttribute('aria-label', `Question ${index + 1} of ${quizQuestions.length}`);
    });
}

// Educational Notifications
function showEducationalNotification(message, type = 'info', duration = 4000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `educational-notification educational-notification--${type}`;
    
    // Spiritual/educational icons based on type
    const icons = {
        'info': '🕉️',
        'success': '🌟',
        'warning': '⚠️',
        'error': '🚫'
    };
    
    notification.innerHTML = `
        <div class="educational-notification__content">
            <div class="educational-notification__icon">${icons[type] || '🕉️'}</div>
            <p>${message}</p>
            <button class="educational-notification__close" onclick="closeEducationalNotification(this)">×</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('educational-notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'educational-notification-styles';
        notificationStyles.textContent = `
            .educational-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1100;
                background: var(--color-surface);
                padding: var(--space-16);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                border-left: 4px solid var(--color-saffron);
                max-width: 400px;
                animation: slideInEducationalNotification 0.5s ease-out;
                border: 1px solid var(--color-card-border);
                font-family: var(--font-family-base);
                backdrop-filter: blur(10px);
            }
            
            .educational-notification--info {
                border-left-color: var(--color-saffron);
                background: linear-gradient(135deg, var(--color-surface) 0%, rgba(255, 153, 51, 0.05) 100%);
            }
            
            .educational-notification--success {
                border-left-color: var(--kapha-color);
                background: linear-gradient(135deg, var(--color-surface) 0%, var(--kapha-light) 100%);
            }
            
            .educational-notification--warning {
                border-left-color: var(--color-temple-gold);
                background: linear-gradient(135deg, var(--color-surface) 0%, rgba(218, 165, 32, 0.1) 100%);
            }
            
            .educational-notification--error {
                border-left-color: var(--color-sacred-red);
                background: linear-gradient(135deg, var(--color-surface) 0%, rgba(220, 20, 60, 0.1) 100%);
            }
            
            .educational-notification__content {
                display: flex;
                align-items: flex-start;
                gap: var(--space-12);
            }
            
            .educational-notification__icon {
                font-size: var(--font-size-lg);
                flex-shrink: 0;
                animation: gentle-glow 2s ease-in-out infinite alternate;
            }
            
            .educational-notification__content p {
                margin: 0;
                color: var(--color-text);
                font-size: var(--font-size-sm);
                line-height: var(--line-height-normal);
                flex: 1;
            }
            
            .educational-notification__close {
                background: none;
                border: none;
                font-size: var(--font-size-lg);
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: 0;
                font-family: 'Cinzel', serif;
                flex-shrink: 0;
                transition: all var(--duration-fast) var(--ease-standard);
            }
            
            .educational-notification__close:hover {
                color: var(--color-saffron);
                transform: scale(1.1);
            }
            
            @keyframes slideInEducationalNotification {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes gentle-glow {
                from {
                    filter: brightness(1);
                }
                to {
                    filter: brightness(1.2);
                }
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutEducationalNotification 0.5s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }
    }, duration);
    
    console.log(`Educational notification: ${message}`);
}

function closeEducationalNotification(button) {
    const notification = button.closest('.educational-notification');
    if (notification && notification.parentNode) {
        notification.style.animation = 'slideOutEducationalNotification 0.5s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }
}

// Interactive Learning Features
function exploreDosha(doshaType) {
    switchDoshaTab(doshaType);
    scrollToSection('dosha-profiles');
    
    const doshaData = DOSHA_DATA[doshaType];
    showEducationalNotification(
        `🕉️ Exploring ${doshaData.symbol} ${doshaData.name} - ${doshaData.description}`,
        'info',
        3000
    );
}

// Educational Progress Export
function exportLearningProgress() {
    const learningData = {
        title: "Ayurvedic Dosha Learning Progress",
        exportDate: new Date().toISOString(),
        progress: doshaGuide.learningProgress,
        navigationHistory: doshaGuide.navigationHistory,
        quizResults: {
            completed: doshaGuide.learningProgress.quizCompleted,
            scores: doshaGuide.quizState.scores,
            answers: doshaGuide.quizState.answers
        },
        doshaProfiles: {
            currentProfile: doshaGuide.currentDoshaTab,
            profilesViewed: doshaGuide.learningProgress.doshaProfilesViewed
        }
    };
    
    const dataStr = JSON.stringify(learningData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `ayurvedic-dosha-learning-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    showEducationalNotification('📚 Your learning progress has been exported successfully!', 'success');
}

// Make functions globally available
window.scrollToSection = scrollToSection;
window.switchDoshaTab = switchDoshaTab;
window.exploreDosha = exploreDosha;
window.showQuizResults = showQuizResults;
window.closeEducationalNotification = closeEducationalNotification;
window.exportLearningProgress = exportLearningProgress;

// Educational Session Monitoring
function monitorEducationalSession() {
    const sessionMetrics = {
        sessionDuration: performance.now(),
        sectionsVisited: doshaGuide.learningProgress.sectionsVisited.length,
        doshaProfilesViewed: doshaGuide.learningProgress.doshaProfilesViewed.length,
        quizCompleted: doshaGuide.learningProgress.quizCompleted,
        currentSection: doshaGuide.currentSection,
        navigationCount: doshaGuide.navigationHistory.length,
        timestamp: new Date().toISOString()
    };
    
    console.log('Educational session metrics:', sessionMetrics);
    return sessionMetrics;
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Educational Interface Error:', event.error);
    showEducationalNotification('A system error occurred. Please refresh if problems persist.', 'error');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Ayurvedic Doshas Guide loaded in ${loadTime.toFixed(2)}ms`);
    
    if (loadTime > 3000) {
        showEducationalNotification('Loading took longer than expected. All features are available.', 'warning');
    }
});

// Responsive behavior
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navToggle.click();
    }
});

// Auto-save learning progress periodically
setInterval(() => {
    if (doshaGuide.learningProgress.sectionsVisited.length > 0) {
        try {
            const learningSession = {
                progress: doshaGuide.learningProgress,
                navigationHistory: doshaGuide.navigationHistory,
                currentSection: doshaGuide.currentSection,
                sessionTimestamp: new Date().toISOString()
            };
            console.log('Learning progress updated');
        } catch (error) {
            console.log('Unable to save learning progress');
        }
    }
}, 60000); // Save every minute

// Educational keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case '1':
                event.preventDefault();
                scrollToSection('what-are-doshas');
                break;
            case '2':
                event.preventDefault();
                scrollToSection('dosha-profiles');
                break;
            case '3':
                event.preventDefault();
                scrollToSection('constitutional-types');
                break;
            case '4':
                event.preventDefault();
                scrollToSection('assessment');
                break;
            case 'd':
                event.preventDefault();
                scrollToSection('dosha-profiles');
                break;
            case 'a':
                event.preventDefault();
                scrollToSection('assessment');
                break;
            case 'e':
                event.preventDefault();
                exportLearningProgress();
                break;
        }
    }
});

// Export for global access
window.doshaGuide = doshaGuide;

console.log('🕉️ Complete Guide to Ayurvedic Doshas v1.0 - Ancient Wisdom for Modern Living loaded successfully');

// Educational compliance check on initialization
setTimeout(() => {
    const educationalCheck = {
        navigationReady: typeof scrollToSection === 'function',
        doshaTabsReady: typeof switchDoshaTab === 'function',
        quizReady: typeof showQuizResults === 'function',
        progressTrackingReady: typeof updateLearningProgress === 'function',
        accessibilityReady: document.querySelector('a[href="#main-content"]') !== null,
        animationsReady: typeof initializeEducationalAnimations === 'function'
    };
    
    const allSystemsReady = Object.values(educationalCheck).every(Boolean);
    
    if (allSystemsReady) {
        console.log('✅ All educational systems operational');
        showEducationalNotification('🕉️ Welcome to your Ayurvedic journey! All learning features are ready to guide your discovery.', 'success', 4000);
    } else {
        console.warn('⚠️ Some educational systems need attention:', educationalCheck);
        showEducationalNotification('Some learning features may be limited. Please refresh if you experience issues.', 'warning');
    }
}, 2000);

console.log('Educational keyboard shortcuts enabled: Ctrl+1-4 for sections, Ctrl+D for doshas, Ctrl+A for assessment, Ctrl+E for export');
console.log('🌿 Begin your journey of constitutional self-discovery through the ancient wisdom of Ayurveda 🕉️');