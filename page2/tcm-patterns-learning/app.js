// TCM Patterns Learning Website - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeThemeToggle();
    initializeYinYangPatterns();
    initializeFiveElementsWheel();
    initializePathogenicFactors();
    initializeDiagnosticAccordion();
    initializePracticalApplications();
    initializeFAQAccordion();
    initializeQiBloodChart();
    initializeScrollAnimations();
    initializeScrollBehavior();
    initializeAccessibility();
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

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-color-scheme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition effect
        html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            html.style.transition = '';
        }, 300);
        
        trackUserInteraction('theme_toggle', newTheme);
    });
}

// Yin-Yang pattern navigation
function initializeYinYangPatterns() {
    const patternBtns = document.querySelectorAll('.pattern-btn');
    const patternPanels = document.querySelectorAll('.pattern-panel');
    
    console.log('Initializing Yin-Yang patterns...', patternBtns.length, 'buttons found');
    
    patternBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetPattern = this.getAttribute('data-pattern');
            console.log('Switching to pattern:', targetPattern);
            
            // Remove active class from all buttons and panels
            patternBtns.forEach(button => button.classList.remove('active'));
            patternPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.display = 'none';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(`${targetPattern}-pattern`);
            console.log('Target panel element:', targetPanel);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.style.display = 'block';
                
                // Animate panel entrance
                animatePatternPanel(targetPanel);
            }
            
            trackUserInteraction('yinyang_pattern', targetPattern);
        });
    });
    
    // Ensure the first pattern (balanced) is active by default
    const firstButton = document.querySelector('.pattern-btn[data-pattern="balanced"]');
    const firstPanel = document.getElementById('balanced-pattern');
    
    if (firstButton && firstPanel) {
        firstButton.classList.add('active');
        firstPanel.classList.add('active');
        firstPanel.style.display = 'block';
        
        // Hide other panels initially
        patternPanels.forEach(panel => {
            if (panel.id !== 'balanced-pattern') {
                panel.style.display = 'none';
            }
        });
    }
}

function animatePatternPanel(panel) {
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        panel.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
    }, 50);
}

// Five Elements wheel interaction
function initializeFiveElementsWheel() {
    const segments = document.querySelectorAll('.segment');
    const elementContents = document.querySelectorAll('.element-content');
    const selectedElement = document.getElementById('selected-element');
    
    console.log('Initializing Five Elements wheel...', segments.length, 'segments found');
    
    segments.forEach(segment => {
        segment.addEventListener('click', function() {
            const targetElement = this.getAttribute('data-element');
            console.log('Switching to element:', targetElement);
            
            // Remove active class from all segments and contents
            segments.forEach(seg => seg.classList.remove('active'));
            elementContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Add active class to clicked segment
            this.classList.add('active');
            
            // Update center display
            updateSelectedElement(targetElement);
            
            // Show corresponding content
            const targetContent = document.getElementById(`${targetElement}-details`);
            console.log('Target element content:', targetContent);
            
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
                
                // Animate content entrance
                animateElementContent(targetContent);
            }
            
            trackUserInteraction('element_selection', targetElement);
        });
        
        // Add hover effects
        segment.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        segment.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
    
    // Ensure the first element (wood) is active by default
    const firstSegment = document.querySelector('.segment[data-element="wood"]');
    const firstContent = document.getElementById('wood-details');
    
    if (firstSegment && firstContent) {
        firstSegment.classList.add('active');
        firstContent.classList.add('active');
        firstContent.style.display = 'block';
        
        // Hide other contents initially
        elementContents.forEach(content => {
            if (content.id !== 'wood-details') {
                content.style.display = 'none';
            }
        });
    }
}

function updateSelectedElement(element) {
    const selectedElement = document.getElementById('selected-element');
    const elementData = {
        wood: { icon: '🌱', name: 'Wood' },
        fire: { icon: '🔥', name: 'Fire' },
        earth: { icon: '🏔️', name: 'Earth' },
        metal: { icon: '⚪', name: 'Metal' },
        water: { icon: '💧', name: 'Water' }
    };
    
    if (selectedElement && elementData[element]) {
        const iconElement = selectedElement.querySelector('.element-icon');
        const nameElement = selectedElement.querySelector('h3');
        
        if (iconElement && nameElement) {
            iconElement.textContent = elementData[element].icon;
            nameElement.textContent = elementData[element].name;
            
            // Add animation effect
            selectedElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                selectedElement.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

function animateElementContent(content) {
    content.style.opacity = '0';
    content.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        content.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateX(0)';
    }, 50);
}

// Pathogenic factors tabs
function initializePathogenicFactors() {
    const factorTabs = document.querySelectorAll('.factor-tab');
    const factorPanels = document.querySelectorAll('.factor-panel');
    
    console.log('Initializing pathogenic factors...', factorTabs.length, 'tabs found');
    
    factorTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetFactor = this.getAttribute('data-factor');
            console.log('Switching to factor:', targetFactor);
            
            // Remove active class from all tabs and panels
            factorTabs.forEach(factorTab => factorTab.classList.remove('active'));
            factorPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.display = 'none';
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(`${targetFactor}-content`);
            console.log('Target factor panel:', targetPanel);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.style.display = 'block';
                
                // Animate panel entrance
                animateFactorPanel(targetPanel);
            }
            
            trackUserInteraction('pathogenic_factor', targetFactor);
        });
    });
    
    // Ensure the first factor (heat-cold) is active by default
    const firstTab = document.querySelector('.factor-tab[data-factor="heat-cold"]');
    const firstPanel = document.getElementById('heat-cold-content');
    
    if (firstTab && firstPanel) {
        firstTab.classList.add('active');
        firstPanel.classList.add('active');
        firstPanel.style.display = 'block';
        
        // Hide other panels initially
        factorPanels.forEach(panel => {
            if (panel.id !== 'heat-cold-content') {
                panel.style.display = 'none';
            }
        });
    }
}

function animateFactorPanel(panel) {
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
        panel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
    }, 50);
}

// Diagnostic methods accordion
function initializeDiagnosticAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    console.log('Initializing diagnostic accordion...', accordionHeaders.length, 'headers found');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const isActive = this.classList.contains('active');
            
            console.log('Toggling accordion:', targetId, 'Currently active:', isActive);
            
            // Close all other accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.classList.remove('active');
                    const otherId = otherHeader.getAttribute('data-target');
                    const otherContent = document.getElementById(otherId);
                    if (otherContent) {
                        otherContent.classList.remove('active');
                    }
                }
            });
            
            // Toggle current accordion
            if (isActive) {
                this.classList.remove('active');
                if (targetContent) {
                    targetContent.classList.remove('active');
                }
            } else {
                this.classList.add('active');
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }
            
            trackUserInteraction('diagnostic_accordion', targetId);
        });
    });
}

// Practical applications tabs
function initializePracticalApplications() {
    const appTabs = document.querySelectorAll('.app-tab');
    const appPanels = document.querySelectorAll('.app-panel');
    
    console.log('Initializing practical applications...', appTabs.length, 'tabs found');
    
    appTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetApp = this.getAttribute('data-app');
            console.log('Switching to application:', targetApp);
            
            // Remove active class from all tabs and panels
            appTabs.forEach(appTab => appTab.classList.remove('active'));
            appPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.display = 'none';
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(`${targetApp}-content`);
            console.log('Target application panel:', targetPanel);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.style.display = 'block';
                
                // Animate panel entrance
                animateAppPanel(targetPanel);
            }
            
            trackUserInteraction('practical_application', targetApp);
        });
    });
    
    // Ensure the first application (diet) is active by default
    const firstTab = document.querySelector('.app-tab[data-app="diet"]');
    const firstPanel = document.getElementById('diet-content');
    
    if (firstTab && firstPanel) {
        firstTab.classList.add('active');
        firstPanel.classList.add('active');
        firstPanel.style.display = 'block';
        
        // Hide other panels initially
        appPanels.forEach(panel => {
            if (panel.id !== 'diet-content') {
                panel.style.display = 'none';
            }
        });
    }
}

function animateAppPanel(panel) {
    panel.style.opacity = '0';
    panel.style.transform = 'translateX(10px)';
    
    setTimeout(() => {
        panel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        panel.style.opacity = '1';
        panel.style.transform = 'translateX(0)';
    }, 50);
}

// FAQ accordion
function initializeFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    console.log('Initializing FAQ accordion...', faqQuestions.length, 'questions found');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetAnswer = document.getElementById(targetId);
            const isActive = this.classList.contains('active');
            
            console.log('Toggling FAQ:', targetId, 'Currently active:', isActive);
            
            // Close all other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.classList.remove('active');
                    const otherId = otherQuestion.getAttribute('data-target');
                    const otherAnswer = document.getElementById(otherId);
                    if (otherAnswer) {
                        otherAnswer.classList.remove('active');
                    }
                }
            });
            
            // Toggle current FAQ
            if (isActive) {
                this.classList.remove('active');
                if (targetAnswer) {
                    targetAnswer.classList.remove('active');
                }
            } else {
                this.classList.add('active');
                if (targetAnswer) {
                    targetAnswer.classList.add('active');
                }
            }
            
            trackUserInteraction('faq_toggle', targetId);
        });
    });
}

// Qi & Blood chart using Chart.js
function initializeQiBloodChart() {
    const canvas = document.getElementById('qiBloodChart');
    if (!canvas) {
        console.log('Qi Blood chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    const chartData = {
        labels: ['Qi Deficiency', 'Qi Stagnation', 'Blood Deficiency', 'Blood Stasis'],
        datasets: [{
            label: 'Common Symptoms Count',
            data: [8, 6, 7, 5],
            backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
            borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
            borderWidth: 2
        }]
    };
    
    new Chart(ctx, {
        type: 'radar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Qi & Blood Pattern Comparison',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
    
    console.log('Qi Blood chart initialized successfully');
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleScrollAnimation, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.pattern-symbol, .qi-blood-card, .organ-card, ' +
        '.lifestyle-card, .acupoint-item, .principle-card'
    );
    
    animatedElements.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

function handleScrollAnimation(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}

// Enhanced scroll behavior
function initializeScrollBehavior() {
    // Smooth scroll for hash links
    const hashLinks = document.querySelectorAll('a[href^="#"]');
    hashLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header visibility on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', debounce(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 100));
}

// Accessibility enhancements
function initializeAccessibility() {
    // Keyboard navigation for tabs and accordions
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const target = e.target;
            
            // Handle tab navigation
            if (target.classList.contains('pattern-btn') || 
                target.classList.contains('factor-tab') || 
                target.classList.contains('app-tab')) {
                e.preventDefault();
                target.click();
            }
            
            // Handle accordion navigation
            if (target.classList.contains('accordion-header') || 
                target.classList.contains('faq-question')) {
                e.preventDefault();
                target.click();
            }
        }
        
        // Arrow key navigation for element wheel
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeSegment = document.querySelector('.segment.active');
            if (activeSegment && document.activeElement === activeSegment) {
                e.preventDefault();
                const segments = Array.from(document.querySelectorAll('.segment'));
                const currentIndex = segments.indexOf(activeSegment);
                
                let newIndex;
                if (e.key === 'ArrowLeft') {
                    newIndex = currentIndex > 0 ? currentIndex - 1 : segments.length - 1;
                } else {
                    newIndex = currentIndex < segments.length - 1 ? currentIndex + 1 : 0;
                }
                
                segments[newIndex].click();
                segments[newIndex].focus();
            }
        }
    });
    
    // Focus management for accordions
    const accordionHeaders = document.querySelectorAll('.accordion-header, .faq-question');
    accordionHeaders.forEach(header => {
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        
        header.addEventListener('click', function() {
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded.toString());
        });
    });
    
    // Add ARIA labels to interactive elements
    const segments = document.querySelectorAll('.segment');
    segments.forEach(segment => {
        const element = segment.getAttribute('data-element');
        segment.setAttribute('tabindex', '0');
        segment.setAttribute('role', 'button');
        segment.setAttribute('aria-label', `Select ${element} element`);
    });
}

// Touch and mobile support
function initializeTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Swipe navigation for element wheel
    const elementWheel = document.querySelector('.element-wheel');
    if (elementWheel) {
        elementWheel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        elementWheel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleElementSwipe();
        });
    }
    
    function handleElementSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const activeSegment = document.querySelector('.segment.active');
            const segments = Array.from(document.querySelectorAll('.segment'));
            const currentIndex = segments.indexOf(activeSegment);
            
            if (diff > 0 && currentIndex < segments.length - 1) {
                // Swipe left - next element
                segments[currentIndex + 1].click();
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous element
                segments[currentIndex - 1].click();
            }
        }
    }
}

// Initialize mobile enhancements
initializeTouchSupport();

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

// Performance optimizations
function optimizePerformance() {
    // Lazy load non-critical content
    const lazyElements = document.querySelectorAll('.qi-blood-card, .organ-card, .acupoint-item');
    
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
    
    // Preload critical fonts
    const fontPreloads = [
        'https://r2cdn.perplexity.ai/fonts/FKGroteskNeue.woff2'
    ];
    
    fontPreloads.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
optimizePerformance();

// Analytics and user interaction tracking
function trackUserInteraction(action, element) {
    // This would integrate with analytics services
    console.log(`User interaction: ${action} on ${element}`);
    
    // Example: Send to analytics service
    // analytics.track(action, { element: element, timestamp: Date.now() });
}

// Error handling
window.addEventListener('error', function(e) {
    console.warn('TCM Learning App Error:', e.error);
    // Gracefully handle errors without breaking the experience
});

// Handle Chart.js loading errors
window.addEventListener('load', function() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js failed to load, chart functionality disabled');
        const chartContainer = document.querySelector('.qi-blood-chart');
        if (chartContainer) {
            chartContainer.innerHTML = '<p>Chart visualization temporarily unavailable</p>';
        }
    }
});

// Service worker registration for offline capability (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you want to add offline capability
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Add click tracking to major elements
document.addEventListener('click', function(e) {
    if (e.target.matches('.pattern-btn')) {
        trackUserInteraction('yinyang_pattern_click', e.target.getAttribute('data-pattern'));
    } else if (e.target.matches('.segment')) {
        trackUserInteraction('element_click', e.target.getAttribute('data-element'));
    } else if (e.target.matches('.factor-tab')) {
        trackUserInteraction('pathogenic_factor_click', e.target.getAttribute('data-factor'));
    } else if (e.target.matches('.app-tab')) {
        trackUserInteraction('application_tab_click', e.target.getAttribute('data-app'));
    } else if (e.target.matches('.accordion-header')) {
        trackUserInteraction('diagnostic_accordion_click', e.target.getAttribute('data-target'));
    } else if (e.target.matches('.faq-question')) {
        trackUserInteraction('faq_click', e.target.getAttribute('data-target'));
    }
});

// Export functions for testing (if needed)
window.tcmApp = {
    initializeNavigation,
    initializeYinYangPatterns,
    initializeFiveElementsWheel,
    initializePathogenicFactors,
    initializeDiagnosticAccordion,
    initializePracticalApplications,
    initializeFAQAccordion,
    updateActiveNav,
    trackUserInteraction
};

// Initialize everything when DOM is ready
console.log('TCM Patterns Learning Website initialized successfully');