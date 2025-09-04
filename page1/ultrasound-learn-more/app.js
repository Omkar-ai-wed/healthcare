// Ultrasound Complete Guide - Interactive Features

// Global state management for ultrasound guide
const ultrasoundGuide = {
    currentApplication: 'pregnancy',
    currentTimeline: 'before',
    currentPreparation: 'general',
    completedSections: new Set(),
    readingProgress: 0,
    comparisonFilter: 'all'
};

// DOM Elements
let navbar, navToggle, navMenu;

// Initialize the ultrasound guide application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    navbar = document.querySelector('.navbar');
    navToggle = document.querySelector('.navbar__toggle');
    navMenu = document.querySelector('.navbar__menu');

    // Initialize all features
    initializeNavigation();
    initializeSmoothScrolling();
    initializeApplicationTabs();
    initializeTimelineTabs();
    initializePreparationTabs();
    initializeComparisonTool();
    initializeFAQ();
    initializeHeroButtons();
    initializeAccessibility();
    initializeReadingProgress();
    
    console.log('Ultrasound Complete Guide initialized successfully');
    
    // Welcome message
    setTimeout(() => {
        showNotification('Welcome to the Ultrasound Complete Guide - Your comprehensive educational resource.', 'info');
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
    // Add event listeners to hero buttons
    const heroButtons = document.querySelectorAll('.hero__actions .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                // Extract section name from onclick attribute
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
        markSectionAsCompleted(sectionId);
        
        console.log(`Scrolled to ultrasound section: ${sectionId}`);
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

function markSectionAsCompleted(sectionId) {
    ultrasoundGuide.completedSections.add(sectionId);
    updateReadingProgress();
}

// Application Tabs Functionality
function initializeApplicationTabs() {
    const appTabBtns = document.querySelectorAll('.app-tab-btn');
    const appPanels = document.querySelectorAll('.application-panel');

    appTabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const application = this.dataset.application;
            switchApplicationTab(application);
        });
    });
}

function switchApplicationTab(application) {
    ultrasoundGuide.currentApplication = application;
    
    // Update button states
    const appTabBtns = document.querySelectorAll('.app-tab-btn');
    appTabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.application === application) {
            btn.classList.add('active');
        }
    });
    
    // Update panels
    const appPanels = document.querySelectorAll('.application-panel');
    appPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.panel === application) {
            panel.classList.add('active');
            panel.classList.add('fade-in');
        }
    });
    
    console.log(`Switched to application: ${application}`);
}

// Timeline Tabs Functionality
function initializeTimelineTabs() {
    const timelineBtns = document.querySelectorAll('.timeline-btn');
    const timelinePanels = document.querySelectorAll('.timeline-panel');

    timelineBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const timeline = this.dataset.timeline;
            switchTimelineTab(timeline);
        });
    });
}

function switchTimelineTab(timeline) {
    ultrasoundGuide.currentTimeline = timeline;
    
    // Update button states
    const timelineBtns = document.querySelectorAll('.timeline-btn');
    timelineBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.timeline === timeline) {
            btn.classList.add('active');
        }
    });
    
    // Update panels
    const timelinePanels = document.querySelectorAll('.timeline-panel');
    timelinePanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.panel === timeline) {
            panel.classList.add('active');
            panel.classList.add('slide-up');
        }
    });
    
    console.log(`Switched to timeline: ${timeline}`);
}

// Preparation Tabs Functionality
function initializePreparationTabs() {
    const prepTabBtns = document.querySelectorAll('.prep-tab-btn');
    const prepPanels = document.querySelectorAll('.prep-panel');

    prepTabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const preparation = this.dataset.prep;
            switchPreparationTab(preparation);
        });
    });
}

function switchPreparationTab(preparation) {
    ultrasoundGuide.currentPreparation = preparation;
    
    // Update button states
    const prepTabBtns = document.querySelectorAll('.prep-tab-btn');
    prepTabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.prep === preparation) {
            btn.classList.add('active');
        }
    });
    
    // Update panels
    const prepPanels = document.querySelectorAll('.prep-panel');
    prepPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.panel === preparation) {
            panel.classList.add('active');
            panel.classList.add('fade-in');
        }
    });
    
    console.log(`Switched to preparation: ${preparation}`);
}

// Comparison Tool Functionality
function initializeComparisonTool() {
    const comparisonSelect = document.getElementById('comparison-select');
    if (comparisonSelect) {
        comparisonSelect.addEventListener('change', function(e) {
            const filter = this.value;
            filterComparisonTable(filter);
        });
    }
}

function filterComparisonTable(filter) {
    ultrasoundGuide.comparisonFilter = filter;
    
    const table = document.querySelector('.comparison-table');
    if (!table) return;
    
    const columns = table.querySelectorAll('th, td');
    
    // Show/hide columns based on filter
    columns.forEach(cell => {
        const isUltrasound = cell.classList.contains('ultrasound-column');
        const isXray = cell.classList.contains('xray-column');
        const isCT = cell.classList.contains('ct-column');
        const isMRI = cell.classList.contains('mri-column');
        const isFeature = cell.classList.contains('feature-name');
        
        if (filter === 'all') {
            cell.style.display = '';
        } else if (filter === 'xray') {
            cell.style.display = (isUltrasound || isXray || isFeature) ? '' : 'none';
        } else if (filter === 'ct') {
            cell.style.display = (isUltrasound || isCT || isFeature) ? '' : 'none';
        } else if (filter === 'mri') {
            cell.style.display = (isUltrasound || isMRI || isFeature) ? '' : 'none';
        }
    });
    
    showNotification(`Comparison filtered to show: ${filter === 'all' ? 'All Methods' : filter.toUpperCase()}`, 'info', 2000);
    console.log(`Filtered comparison table: ${filter}`);
}

// FAQ Functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            e.preventDefault();
            const faqItem = this.closest('.faq-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    const otherItem = otherQuestion.closest('.faq-item');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            this.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                faqAnswer.classList.add('active');
                faqAnswer.classList.add('slide-up');
            } else {
                faqAnswer.classList.remove('active');
            }
            
            console.log(`FAQ toggled: ${this.querySelector('span').textContent.trim()}`);
        });
    });
}

// Reading Progress Tracking
function initializeReadingProgress() {
    // Initialize Intersection Observer for section tracking
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                updateActiveNavLink(sectionId);
                markSectionAsCompleted(sectionId);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Track scroll progress
    window.addEventListener('scroll', updateReadingProgress);
}

function updateReadingProgress() {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.pageYOffset / documentHeight) * 100;
    
    ultrasoundGuide.readingProgress = Math.min(scrollProgress, 100);
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
    });
}

// Utility Functions
function showNotification(message, type = 'info', duration = 5000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `ultrasound-notification ultrasound-notification--${type}`;
    notification.innerHTML = `
        <div class="ultrasound-notification__content">
            <p>${message}</p>
            <button class="ultrasound-notification__close" onclick="closeNotification(this)">×</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('ultrasound-notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'ultrasound-notification-styles';
        notificationStyles.textContent = `
            .ultrasound-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: var(--color-surface);
                padding: var(--space-16);
                border-radius: var(--radius-base);
                box-shadow: var(--shadow-lg);
                border-left: 4px solid var(--color-ultrasound-primary);
                max-width: 350px;
                animation: slideInNotification 0.3s ease-out;
                border: 1px solid var(--color-card-border);
            }
            
            .ultrasound-notification--info {
                border-left-color: var(--color-ultrasound-info);
            }
            
            .ultrasound-notification--success {
                border-left-color: var(--color-ultrasound-safe);
            }
            
            .ultrasound-notification--warning {
                border-left-color: var(--color-ultrasound-caution);
            }
            
            .ultrasound-notification--error {
                border-left-color: #f44336;
            }
            
            .ultrasound-notification__content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: var(--space-8);
            }
            
            .ultrasound-notification__content p {
                margin: 0;
                color: var(--color-text);
                font-size: var(--font-size-sm);
                line-height: var(--line-height-normal);
            }
            
            .ultrasound-notification__close {
                background: none;
                border: none;
                font-size: var(--font-size-lg);
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: 0;
                font-family: var(--font-family-mono);
            }
            
            .ultrasound-notification__close:hover {
                color: var(--color-text);
            }
            
            @keyframes slideInNotification {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, duration);
    
    console.log(`Notification shown: ${message}`);
}

function closeNotification(button) {
    const notification = button.closest('.ultrasound-notification');
    if (notification && notification.parentNode) {
        notification.parentNode.removeChild(notification);
    }
}

// Footer Functions
function printUltrasoundGuide() {
    showNotification('Preparing ultrasound guide for printing...', 'info', 2000);
    
    setTimeout(() => {
        const printContent = generateUltrasoundPrintContent();
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            
            showNotification('Ultrasound Guide prepared for printing.', 'success');
        } else {
            showNotification('Pop-up blocked. Please allow pop-ups and try again.', 'warning');
        }
    }, 500);
}

function downloadInfo() {
    showNotification('Preparing ultrasound information for download...', 'info', 2000);
    
    setTimeout(() => {
        const ultrasoundInfo = {
            title: "Ultrasound Complete Guide Information",
            keyAdvantages: [
                "No ionizing radiation exposure",
                "Real-time, live imaging capability",
                "Safe during pregnancy",
                "Portable and widely available",
                "Cost-effective imaging solution",
                "Shows blood flow and organ function"
            ],
            applications: {
                pregnancy: "Fetal development monitoring, dating pregnancy, anatomy screening",
                abdominal: "Liver, gallbladder, kidney, pancreas evaluation",
                cardiac: "Heart function assessment, valve evaluation",
                vascular: "Blood flow assessment, clot detection",
                musculoskeletal: "Tendon, muscle, joint evaluation",
                gynecological: "Pelvic imaging, ovarian and uterine assessment"
            },
            examTypes: [
                "Transabdominal - External probe on skin",
                "Transvaginal - Internal probe for detailed pelvic imaging",
                "Transrectal - Specialized probe for prostate evaluation",
                "Doppler - Measures blood flow speed and direction",
                "3D/4D - Three-dimensional imaging with real-time motion"
            ],
            safetyInfo: {
                radiation: "Zero ionizing radiation exposure",
                pregnancySafety: "Preferred imaging method throughout pregnancy",
                safetyRecord: "50+ years of safe clinical use",
                limitations: "Limited by gas and bone, operator-dependent quality"
            },
            generatedDate: new Date().toISOString()
        };
        
        const infoStr = JSON.stringify(ultrasoundInfo, null, 2);
        const infoBlob = new Blob([infoStr], { type: 'application/json' });
        const url = URL.createObjectURL(infoBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `ultrasound-guide-info-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        showNotification('Ultrasound information downloaded successfully!', 'success');
    }, 500);
}

function scheduleExam() {
    showNotification('Redirecting to exam scheduling...', 'info', 2000);
    
    setTimeout(() => {
        showNotification('Please contact your healthcare provider or imaging facility to schedule your ultrasound exam.', 'info', 7000);
        console.log('Schedule exam clicked - redirect to facility contact');
    }, 1000);
}

// Generate print-friendly content
function generateUltrasoundPrintContent() {
    const currentDate = new Date().toLocaleDateString();
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Ultrasound Complete Guide - Print Version</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    line-height: 1.6; 
                    color: #333; 
                    font-size: 11px;
                    margin: 20px;
                }
                .header { 
                    border-bottom: 2px solid #e91e63; 
                    padding-bottom: 20px; 
                    margin-bottom: 30px; 
                    text-align: center;
                }
                .section { 
                    margin-bottom: 25px; 
                    page-break-inside: avoid; 
                }
                .section-title { 
                    color: #e91e63; 
                    border-bottom: 1px solid #e91e63; 
                    padding-bottom: 5px; 
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 15px;
                }
                .advantage-item { 
                    background: #f8f9fa;
                    padding: 10px;
                    margin: 10px 0;
                    border-left: 3px solid #e91e63;
                }
                ul { 
                    margin: 8px 0; 
                    padding-left: 15px; 
                }
                .print-note { 
                    font-style: italic; 
                    color: #666; 
                    margin-top: 20px; 
                    font-size: 9px;
                }
                .safety-highlight {
                    background: #e8f5e8;
                    border: 2px solid #4caf50;
                    padding: 15px;
                    text-align: center;
                    margin: 20px 0;
                }
                @media print { 
                    body { font-size: 9px; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🩻 Ultrasound Complete Guide</h1>
                <p>Comprehensive educational resource for ultrasound imaging</p>
                <p class="print-note">Generated on: ${currentDate}</p>
            </div>
            
            <div class="safety-highlight">
                <h2>🛡️ Zero Radiation Safety</h2>
                <p><strong>Ultrasound uses sound waves, not ionizing radiation</strong></p>
                <p>Completely safe for all patients including pregnant women and children</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">🔬 How Ultrasound Works</h2>
                <div class="advantage-item">
                    <h3>Step 1: Sound Wave Transmission</h3>
                    <p>Transducer sends high-frequency sound waves (2-18 MHz) into the body</p>
                </div>
                <div class="advantage-item">
                    <h3>Step 2: Echo Reflection</h3>
                    <p>Sound waves bounce back from different tissues at varying speeds</p>
                </div>
                <div class="advantage-item">
                    <h3>Step 3: Signal Processing</h3>
                    <p>Computer analyzes returning echoes to create images</p>
                </div>
                <div class="advantage-item">
                    <h3>Step 4: Real-time Display</h3>
                    <p>Creates live, moving images displayed instantly</p>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">🫀 Medical Applications</h2>
                <div class="advantage-item">
                    <strong>🤰 Pregnancy & Obstetrics:</strong> Fetal development monitoring, dating pregnancy, anatomy screening
                </div>
                <div class="advantage-item">
                    <strong>🫄 Abdominal Imaging:</strong> Liver, gallbladder, kidney, pancreas evaluation
                </div>
                <div class="advantage-item">
                    <strong>❤️ Heart Imaging:</strong> Heart function assessment, valve evaluation
                </div>
                <div class="advantage-item">
                    <strong>🩸 Vascular Imaging:</strong> Blood flow assessment, clot detection
                </div>
                <div class="advantage-item">
                    <strong>🦴 Musculoskeletal:</strong> Tendon, muscle, joint evaluation
                </div>
                <div class="advantage-item">
                    <strong>👩‍⚕️ Women's Health:</strong> Pelvic imaging, ovarian and uterine assessment
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">🔍 Types of Ultrasound Exams</h2>
                <ul>
                    <li><strong>Transabdominal:</strong> External probe on skin surface</li>
                    <li><strong>Transvaginal:</strong> Internal probe for detailed pelvic imaging</li>
                    <li><strong>Transrectal:</strong> Specialized probe for prostate evaluation</li>
                    <li><strong>Doppler:</strong> Measures blood flow speed and direction</li>
                    <li><strong>3D/4D:</strong> Three-dimensional imaging with real-time motion</li>
                </ul>
            </div>
            
            <div class="section">
                <h2 class="section-title">📋 General Preparation</h2>
                <ul>
                    <li>Wear comfortable, loose-fitting clothing</li>
                    <li>Remove jewelry from examination area</li>
                    <li>Bring insurance cards and identification</li>
                    <li>List current medications and allergies</li>
                    <li>Arrive 15 minutes before appointment</li>
                </ul>
            </div>
            
            <div class="section">
                <h2 class="section-title">⚖️ Ultrasound vs Other Imaging</h2>
                <div class="advantage-item">
                    <strong>Ultrasound Advantages:</strong>
                    <ul>
                        <li>No radiation exposure</li>
                        <li>Real-time imaging</li>
                        <li>Low cost</li>
                        <li>Widely available</li>
                        <li>Pregnancy safe</li>
                        <li>Shows blood flow</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">🛡️ Safety Information</h2>
                <ul>
                    <li><strong>No Radiation:</strong> Zero ionizing radiation exposure</li>
                    <li><strong>Pregnancy Safe:</strong> Preferred method throughout pregnancy</li>
                    <li><strong>Safety Record:</strong> 50+ years of safe clinical use</li>
                    <li><strong>No Side Effects:</strong> No known harmful effects</li>
                    <li><strong>Repeatable:</strong> Safe for multiple examinations</li>
                </ul>
            </div>
            
            <p class="print-note">
                This guide is for educational purposes only and does not replace professional medical advice. 
                Always consult with qualified healthcare professionals for medical decisions.
                <br><br>
                Generated by Ultrasound Complete Guide v1.0
            </p>
        </body>
        </html>
    `;
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Ultrasound Guide Error:', event.error);
    showNotification('A system error occurred. Please refresh the page if problems persist.', 'error');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Ultrasound Complete Guide loaded in ${loadTime.toFixed(2)}ms`);
    
    if (loadTime > 3000) {
        showNotification('Loading took longer than expected. Consider refreshing for better performance.', 'warning');
    }
});

// Responsive behavior
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navToggle.click();
    }
});

// Export for global access and debugging
window.ultrasoundGuide = ultrasoundGuide;
window.scrollToSection = scrollToSection;
window.switchApplicationTab = switchApplicationTab;
window.switchTimelineTab = switchTimelineTab;
window.switchPreparationTab = switchPreparationTab;
window.filterComparisonTable = filterComparisonTable;
window.printUltrasoundGuide = printUltrasoundGuide;
window.downloadInfo = downloadInfo;
window.scheduleExam = scheduleExam;
window.closeNotification = closeNotification;

console.log('Ultrasound Complete Guide v1.0 - Comprehensive Educational Resource loaded 🩻📚');

// Progressive enhancement - add advanced features if supported
if ('IntersectionObserver' in window) {
    console.log('IntersectionObserver supported - enabling advanced scroll tracking');
} else {
    console.log('IntersectionObserver not supported - using fallback scroll tracking');
}

// Service worker registration for offline functionality (if available)
if ('serviceWorker' in navigator) {
    console.log('Service Worker supported - offline functionality available');
} else {
    console.log('Service Worker not supported - online only');
}

// Save reading progress periodically
setInterval(() => {
    if (ultrasoundGuide.completedSections.size > 0) {
        try {
            const progressData = {
                completedSections: Array.from(ultrasoundGuide.completedSections),
                readingProgress: ultrasoundGuide.readingProgress,
                currentApplication: ultrasoundGuide.currentApplication,
                currentTimeline: ultrasoundGuide.currentTimeline,
                currentPreparation: ultrasoundGuide.currentPreparation,
                timestamp: new Date().toISOString()
            };
            console.log('Ultrasound guide progress saved');
        } catch (error) {
            console.log('Unable to save ultrasound guide progress');
        }
    }
}, 30000); // Save every 30 seconds