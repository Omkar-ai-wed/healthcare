// Ayurvedic Doshas Learning Website - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDoshaNavigation();
    initializeBalancingTabs();
    initializeRoutineSelector();
    initializeScrollBehavior();
    initializeAnimations();
});

// Smooth scrolling navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Offset for sticky header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', debounce(updateActiveNav, 100));
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Dosha navigation (Vata, Pitta, Kapha tabs)
function initializeDoshaNavigation() {
    const doshaNavBtns = document.querySelectorAll('.dosha-nav-btn');
    const doshaContents = document.querySelectorAll('.dosha-content');
    
    console.log('Initializing dosha navigation...', doshaNavBtns.length, 'buttons found');
    
    doshaNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetDosha = this.getAttribute('data-dosha');
            console.log('Switching to dosha:', targetDosha);
            
            // Remove active class from all buttons and contents
            doshaNavBtns.forEach(navBtn => navBtn.classList.remove('active'));
            doshaContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(`${targetDosha}-content`);
            console.log('Target content element:', targetContent);
            
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
                
                // Animate content entrance
                targetContent.style.opacity = '0';
                targetContent.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    targetContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                }, 50);
                
                // Reset all tabs within the dosha to first tab
                resetDoshaTabs(targetDosha);
            }
        });
    });
    
    // Ensure the first dosha (Vata) is active by default
    const firstButton = document.querySelector('.dosha-nav-btn[data-dosha="vata"]');
    const firstContent = document.getElementById('vata-content');
    
    if (firstButton && firstContent) {
        firstButton.classList.add('active');
        firstContent.classList.add('active');
        firstContent.style.display = 'block';
        
        // Hide other contents initially
        doshaContents.forEach(content => {
            if (content.id !== 'vata-content') {
                content.style.display = 'none';
            }
        });
    }
}

// Reset dosha tabs to first tab when switching doshas
function resetDoshaTabs(dosha) {
    const tabButtons = document.querySelectorAll(`#${dosha}-content .tab-btn`);
    const tabPanels = document.querySelectorAll(`#${dosha}-content .tab-panel`);
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.style.display = 'none';
    });
    
    // Activate first tab if exists
    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons[0].classList.add('active');
        tabPanels[0].classList.add('active');
        tabPanels[0].style.display = 'block';
    }
}

// Balancing guidelines tabs (Diet, Lifestyle, Herbs)
function initializeBalancingTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    console.log('Initializing balancing tabs...', tabButtons.length, 'tab buttons found');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const parentContainer = this.closest('.balancing-tabs');
            
            console.log('Switching to tab:', targetTab);
            
            if (parentContainer) {
                // Remove active class from all buttons and panels in this container
                const containerButtons = parentContainer.querySelectorAll('.tab-btn');
                const containerPanels = parentContainer.querySelectorAll('.tab-panel');
                
                containerButtons.forEach(button => button.classList.remove('active'));
                containerPanels.forEach(panel => {
                    panel.classList.remove('active');
                    panel.style.display = 'none';
                });
                
                // Add active class to clicked button and corresponding panel
                this.classList.add('active');
                const targetPanel = document.getElementById(targetTab);
                
                console.log('Target panel element:', targetPanel);
                
                if (targetPanel) {
                    targetPanel.classList.add('active');
                    targetPanel.style.display = 'block';
                    
                    // Animate panel entrance
                    animateTabPanel(targetPanel);
                }
            }
        });
    });
    
    // Initialize first tabs as active for each dosha
    ['vata', 'pitta', 'kapha'].forEach(dosha => {
        const firstTabButton = document.querySelector(`#${dosha}-content .tab-btn[data-tab="${dosha}-diet"]`);
        const firstTabPanel = document.getElementById(`${dosha}-diet`);
        
        if (firstTabButton && firstTabPanel) {
            firstTabButton.classList.add('active');
            firstTabPanel.classList.add('active');
            firstTabPanel.style.display = 'block';
            
            // Hide other panels in this dosha
            const allPanels = document.querySelectorAll(`#${dosha}-content .tab-panel`);
            allPanels.forEach(panel => {
                if (panel.id !== `${dosha}-diet`) {
                    panel.style.display = 'none';
                }
            });
        }
    });
}

function animateTabPanel(panel) {
    panel.style.opacity = '0';
    panel.style.transform = 'translateX(10px)';
    
    setTimeout(() => {
        panel.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        panel.style.opacity = '1';
        panel.style.transform = 'translateX(0)';
    }, 50);
}

// Daily routine selector
function initializeRoutineSelector() {
    const routineButtons = document.querySelectorAll('.routine-btn');
    const routinePanels = document.querySelectorAll('.routine-panel');
    
    console.log('Initializing routine selector...', routineButtons.length, 'buttons found');
    
    routineButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetRoutine = this.getAttribute('data-routine');
            console.log('Switching to routine:', targetRoutine);
            
            // Remove active class from all buttons and panels
            routineButtons.forEach(button => button.classList.remove('active'));
            routinePanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.display = 'none';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(`${targetRoutine}-routine`);
            console.log('Target routine panel:', targetPanel);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.style.display = 'block';
                
                // Animate routine schedule
                animateRoutineSchedule(targetPanel);
            }
        });
    });
    
    // Ensure the first routine (Vata) is active by default
    const firstButton = document.querySelector('.routine-btn[data-routine="vata"]');
    const firstPanel = document.getElementById('vata-routine');
    
    if (firstButton && firstPanel) {
        firstButton.classList.add('active');
        firstPanel.classList.add('active');
        firstPanel.style.display = 'block';
        
        // Hide other panels initially
        routinePanels.forEach(panel => {
            if (panel.id !== 'vata-routine') {
                panel.style.display = 'none';
            }
        });
    }
}

function animateRoutineSchedule(panel) {
    const timeBlocks = panel.querySelectorAll('.time-block');
    
    timeBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            block.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            block.style.opacity = '1';
            block.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Smooth scroll behavior and animations
function initializeScrollBehavior() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all major content sections
    const animatedElements = document.querySelectorAll(
        '.dosha-symbol, .objective, .element-card, .concept-card, .principle-item, ' +
        '.constitution-card, .season-card, .exercise-card, .herb-card'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}

// Initialize animations and interactive effects
function initializeAnimations() {
    // Add CSS for animations
    addAnimationStyles();
    
    // Dosha symbol hover effects
    initializeDoshaSymbolEffects();
    
    // Card hover effects
    initializeCardEffects();
    
    // Loading animation for content
    initializeLoadingAnimations();
}

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .dosha-symbol:hover .symbol-icon {
            transform: scale(1.1);
            transition: transform 0.3s ease;
        }
        
        .element-card:hover .element-icon {
            transform: rotateY(360deg);
            transition: transform 0.6s ease;
        }
        
        .herb-card:hover {
            transform: translateY(-2px);
            transition: transform 0.2s ease;
        }
        
        .time-block:hover {
            background-color: var(--color-primary);
            color: var(--color-btn-primary-text);
            transition: all 0.3s ease;
        }
        
        .time-block:hover .time {
            color: var(--color-btn-primary-text);
        }
        
        .constitution-card:hover {
            box-shadow: var(--shadow-lg);
            transition: box-shadow 0.3s ease;
        }
        
        .season-card:hover {
            transform: translateY(-3px);
            transition: transform 0.3s ease;
        }
        
        .loading-pulse {
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(style);
}

function initializeDoshaSymbolEffects() {
    const doshaSymbols = document.querySelectorAll('.dosha-symbol');
    
    doshaSymbols.forEach(symbol => {
        symbol.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.symbol-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        symbol.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.symbol-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

function initializeCardEffects() {
    const cards = document.querySelectorAll('.card, .element-card, .constitution-card, .herb-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-md)';
            this.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
}

function initializeLoadingAnimations() {
    // Add loading effect to Om symbols
    const omSymbols = document.querySelectorAll('.om-symbol, .om-large');
    
    omSymbols.forEach(om => {
        om.addEventListener('mouseenter', function() {
            this.classList.add('loading-pulse');
        });
        
        om.addEventListener('mouseleave', function() {
            this.classList.remove('loading-pulse');
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Tab navigation for dosha content
    if (e.key === 'Tab' && !e.shiftKey) {
        const activeDosha = document.querySelector('.dosha-nav-btn.active');
        if (activeDosha && e.target === activeDosha) {
            e.preventDefault();
            const doshaContent = document.querySelector('.dosha-content.active');
            if (doshaContent) {
                const firstFocusable = doshaContent.querySelector('button, a, input, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }
        }
    }
    
    // Arrow key navigation for dosha tabs
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeNavBtn = document.querySelector('.dosha-nav-btn.active');
        if (activeNavBtn && document.activeElement === activeNavBtn) {
            e.preventDefault();
            const navButtons = Array.from(document.querySelectorAll('.dosha-nav-btn'));
            const currentIndex = navButtons.indexOf(activeNavBtn);
            
            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : navButtons.length - 1;
            } else {
                newIndex = currentIndex < navButtons.length - 1 ? currentIndex + 1 : 0;
            }
            
            navButtons[newIndex].click();
            navButtons[newIndex].focus();
        }
    }
});

// Touch and mobile support
function initializeTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const doshaSection = document.querySelector('.doshas-section');
    if (doshaSection) {
        doshaSection.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        doshaSection.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const activeBtn = document.querySelector('.dosha-nav-btn.active');
            const navButtons = Array.from(document.querySelectorAll('.dosha-nav-btn'));
            const currentIndex = navButtons.indexOf(activeBtn);
            
            if (diff > 0 && currentIndex < navButtons.length - 1) {
                // Swipe left - next dosha
                navButtons[currentIndex + 1].click();
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous dosha
                navButtons[currentIndex - 1].click();
            }
        }
    }
}

// Initialize touch support
initializeTouchSupport();

// Performance optimization
function optimizePerformance() {
    // Lazy load content not immediately visible
    const lazyElements = document.querySelectorAll('.herb-card, .constitution-card');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// Initialize performance optimizations
optimizePerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.warn('Ayurveda Learning App Error:', e.error);
    // Gracefully handle errors without breaking the experience
});

// Analytics and user interaction tracking (placeholder)
function trackUserInteraction(action, element) {
    // This would integrate with analytics services
    console.log(`User interaction: ${action} on ${element}`);
}

// Add interaction tracking to major elements
document.addEventListener('click', function(e) {
    if (e.target.matches('.dosha-nav-btn')) {
        trackUserInteraction('dosha_navigation', e.target.getAttribute('data-dosha'));
    } else if (e.target.matches('.tab-btn')) {
        trackUserInteraction('tab_switch', e.target.getAttribute('data-tab'));
    } else if (e.target.matches('.routine-btn')) {
        trackUserInteraction('routine_selection', e.target.getAttribute('data-routine'));
    }
});

// Export functions for testing (if needed)
window.ayurvedaApp = {
    initializeNavigation,
    initializeDoshaNavigation,
    initializeBalancingTabs,
    initializeRoutineSelector,
    updateActiveNav,
    trackUserInteraction
};