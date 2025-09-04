// X-Ray & CT Scan Complete Guide Interactive Features

// Global state management
const medicalImagingGuide = {
    currentExplanation: 'xray',
    currentApplication: 'orthopedic',
    currentCTApplication: 'neurological',
    currentProcedure: 'xray',
    currentComparison: 'overview',
    currentPreparation: 'xray',
    progressPercentage: 0,
    completedSections: new Set(),
    checklistItems: new Set(),
    readingProgress: 0
};

// Application data for body areas
const bodyAreaData = {
    head: {
        title: "Head & Neck Imaging",
        content: `
            <div class="medical-highlight">
                <h4>X-Ray Applications:</h4>
                <ul>
                    <li>Skull fractures and head trauma</li>
                    <li>Sinus infections and blockages</li>
                    <li>Dental and jaw problems</li>
                    <li>Neck spine alignment</li>
                </ul>
                
                <h4>CT Scan Applications:</h4>
                <ul>
                    <li>Brain tumors and masses</li>
                    <li>Stroke diagnosis and monitoring</li>
                    <li>Head trauma assessment</li>
                    <li>Aneurysm detection</li>
                    <li>Seizure cause investigation</li>
                </ul>
                
                <p class="radiation-safe"><strong>Safety Note:</strong> Head CT scans use higher radiation doses, so they're only recommended when medically necessary.</p>
            </div>
        `
    },
    chest: {
        title: "Chest Imaging",
        content: `
            <div class="medical-highlight">
                <h4>X-Ray Applications:</h4>
                <ul>
                    <li>Pneumonia and lung infections</li>
                    <li>Tuberculosis screening</li>
                    <li>Heart size assessment</li>
                    <li>Broken ribs and chest trauma</li>
                    <li>Lung fluid detection</li>
                </ul>
                
                <h4>CT Scan Applications:</h4>
                <ul>
                    <li>Lung cancer detection and staging</li>
                    <li>Pulmonary embolism diagnosis</li>
                    <li>Complex chest trauma</li>
                    <li>Detailed heart and vessel imaging</li>
                    <li>Lung nodule evaluation</li>
                </ul>
                
                <p class="radiation-safe"><strong>Preparation:</strong> Usually no special preparation required for chest imaging.</p>
            </div>
        `
    },
    abdomen: {
        title: "Abdominal Imaging",
        content: `
            <div class="medical-highlight">
                <h4>X-Ray Applications:</h4>
                <ul>
                    <li>Bowel obstruction detection</li>
                    <li>Kidney stone screening</li>
                    <li>Foreign object detection</li>
                    <li>Basic abdominal assessment</li>
                </ul>
                
                <h4>CT Scan Applications:</h4>
                <ul>
                    <li>Appendicitis diagnosis</li>
                    <li>Kidney and liver diseases</li>
                    <li>Internal bleeding detection</li>
                    <li>Abdominal cancer screening</li>
                    <li>Detailed organ evaluation</li>
                </ul>
                
                <p class="requires-caution"><strong>Preparation Required:</strong> Abdominal CT scans often require fasting and contrast dye.</p>
            </div>
        `
    },
    bones: {
        title: "Bone & Joint Imaging",
        content: `
            <div class="medical-highlight">
                <h4>X-Ray Applications (Primary Choice):</h4>
                <ul>
                    <li>Fractures and broken bones</li>
                    <li>Joint problems and arthritis</li>
                    <li>Spine alignment issues</li>
                    <li>Sports injuries</li>
                    <li>Growth plate assessment in children</li>
                </ul>
                
                <h4>CT Scan Applications:</h4>
                <ul>
                    <li>Complex fractures requiring surgery</li>
                    <li>Spine problems with nerve involvement</li>
                    <li>Joint replacement planning</li>
                    <li>Bone tumor evaluation</li>
                    <li>3D bone reconstruction</li>
                </ul>
                
                <p class="radiation-safe"><strong>Advantage:</strong> X-rays are usually sufficient and preferred for most bone imaging needs.</p>
            </div>
        `
    }
};

// DOM Elements
let navbar, navToggle, navMenu, progressBar, loadingOverlay, bodyAreaModal;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    navbar = document.querySelector('.navbar');
    navToggle = document.querySelector('.navbar__toggle');
    navMenu = document.querySelector('.navbar__menu');
    progressBar = document.querySelector('.progress-bar');
    loadingOverlay = document.getElementById('loadingOverlay');
    bodyAreaModal = document.getElementById('bodyAreaModal');

    // Initialize all features
    initializeNavigation();
    initializeSmoothScrolling();
    initializeProgressTracking();
    initializeTabSystems();
    initializeFAQ();
    initializeModal();
    initializeAccessibility();
    initializeReadingProgress();
    
    console.log('X-Ray & CT Scan Complete Guide initialized successfully');
    
    // Welcome message
    setTimeout(() => {
        showTooltip('Welcome to the comprehensive X-Ray & CT Scan educational guide!', 'success');
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
                if (navMenu.classList.contains('active')) {
                    navToggle.click();
                }
                
                // Handle navigation
                e.preventDefault();
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
        
        console.log(`Scrolled to section: ${sectionId}`);
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

// Progress Tracking
function initializeProgressTracking() {
    updateProgressBar();
    
    // Track scroll progress
    window.addEventListener('scroll', updateReadingProgress);
}

function markSectionAsCompleted(sectionId) {
    medicalImagingGuide.completedSections.add(sectionId);
    updateProgressBar();
}

function updateProgressBar() {
    const totalSections = 8; // Total number of main sections
    const completedCount = medicalImagingGuide.completedSections.size;
    const percentage = Math.min((completedCount / totalSections) * 100, 100);
    
    medicalImagingGuide.progressPercentage = percentage;
    
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
}

function updateReadingProgress() {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.pageYOffset / documentHeight) * 100;
    
    medicalImagingGuide.readingProgress = Math.min(scrollProgress, 100);
    
    // Update progress bar to show reading progress if no sections completed yet
    if (medicalImagingGuide.completedSections.size === 0 && progressBar) {
        progressBar.style.width = `${Math.min(scrollProgress, 100)}%`;
    }
}

// Tab Systems
function initializeTabSystems() {
    console.log('Tab systems initialized for medical imaging guide');
}

// Explanation tabs (Overview section)
function showExplanation(type) {
    // Update tabs
    const tabs = document.querySelectorAll('.explanation-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => {
        const text = tab.textContent.toLowerCase();
        return text.includes(type.toLowerCase()) || 
               (type === 'xray' && text.includes('x-ray')) ||
               (type === 'ct' && text.includes('ct')) ||
               (type === 'safety' && text.includes('safety'));
    });
    
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Update panels
    const panels = document.querySelectorAll('.explanation-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    const activePanel = document.getElementById(`${type}-explanation`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    medicalImagingGuide.currentExplanation = type;
    console.log(`Switched to ${type} explanation`);
}

// Body area information
function showBodyAreaInfo(area) {
    const data = bodyAreaData[area];
    if (data && bodyAreaModal) {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalBody) modalBody.innerHTML = data.content;
        
        bodyAreaModal.classList.remove('hidden');
        bodyAreaModal.setAttribute('aria-hidden', 'false');
        
        // Focus management
        const closeButton = bodyAreaModal.querySelector('.modal-close');
        if (closeButton) closeButton.focus();
        
        console.log(`Showing information for ${area}`);
    }
}

// Application tabs
function selectApplication(type) {
    // Find the correct tab container (X-Ray applications)
    const xrayCategory = document.querySelectorAll('.application-category')[0];
    if (xrayCategory) {
        const tabs = xrayCategory.querySelectorAll('.app-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        const activeTab = Array.from(tabs).find(tab => {
            const text = tab.textContent.toLowerCase();
            return text.includes(type.toLowerCase());
        });
        
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }
    
    // Update panels
    const panels = document.querySelectorAll('.app-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    const activePanel = document.getElementById(`${type}-panel`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    medicalImagingGuide.currentApplication = type;
    console.log(`Selected X-Ray application: ${type}`);
}

function selectCTApplication(type) {
    // Find the CT category (second application category)
    const ctCategory = document.querySelectorAll('.application-category')[1];
    if (ctCategory) {
        const tabs = ctCategory.querySelectorAll('.app-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        const activeTab = Array.from(tabs).find(tab => {
            const text = tab.textContent.toLowerCase();
            return text.includes(type.toLowerCase());
        });
        
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }
    
    // Update CT panels
    const panels = document.querySelectorAll('.ct-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    const activePanel = document.getElementById(`${type}-panel`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    medicalImagingGuide.currentCTApplication = type;
    console.log(`Selected CT application: ${type}`);
}

// Procedure selection - FIXED
function showProcedure(type) {
    // Update buttons
    const buttons = document.querySelectorAll('.procedure-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = Array.from(buttons).find(btn => {
        const text = btn.textContent.toLowerCase();
        return (type === 'xray' && text.includes('x-ray')) || 
               (type === 'ct' && text.includes('ct scan'));
    });
    
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Update timeline panels
    const timelines = document.querySelectorAll('.procedure-timeline');
    timelines.forEach(timeline => timeline.classList.remove('active'));
    
    const activeTimeline = document.getElementById(`${type}-procedure`);
    if (activeTimeline) {
        activeTimeline.classList.add('active');
    }
    
    medicalImagingGuide.currentProcedure = type;
    console.log(`Switched to ${type} procedure timeline`);
}

// Comparison selection
function showComparison(type) {
    // Update buttons
    const buttons = document.querySelectorAll('.comparison-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = Array.from(buttons).find(btn => {
        const text = btn.textContent.toLowerCase();
        return text.includes(type.toLowerCase());
    });
    
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Update panels
    const panels = document.querySelectorAll('.comparison-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    const activePanel = document.getElementById(`${type}-comparison`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    medicalImagingGuide.currentComparison = type;
    console.log(`Switched to ${type} comparison`);
}

// Preparation selection
function showPreparation(type) {
    // Update buttons
    const buttons = document.querySelectorAll('.prep-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = Array.from(buttons).find(btn => {
        const text = btn.textContent.toLowerCase();
        return (type === 'xray' && text.includes('x-ray')) ||
               (type === 'ct' && text.includes('ct scan')) ||
               (type === 'contrast' && text.includes('contrast'));
    });
    
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Update panels
    const panels = document.querySelectorAll('.prep-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    const activePanel = document.getElementById(`${type}-prep`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    medicalImagingGuide.currentPreparation = type;
    console.log(`Switched to ${type} preparation guide`);
}

// FAQ System - FIXED
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                toggleFAQ(this);
            });
        }
    });
}

function toggleFAQ(questionButton) {
    const faqItem = questionButton.closest('.faq-item');
    const isOpen = faqItem.classList.contains('open');
    
    // Close all FAQ items first
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.display = 'none';
        }
        const icon = item.querySelector('.faq-icon');
        if (icon) {
            icon.textContent = '+';
        }
    });
    
    // Open current item if it wasn't open
    if (!isOpen) {
        faqItem.classList.add('open');
        
        const answer = faqItem.querySelector('.faq-answer');
        if (answer) {
            answer.style.display = 'block';
        }
        
        const icon = faqItem.querySelector('.faq-icon');
        if (icon) {
            icon.textContent = '−';
        }
        
        // Track FAQ interaction
        const questionText = questionButton.querySelector('span').textContent;
        console.log(`FAQ opened: ${questionText}`);
        
        // Mark FAQ section as completed
        markSectionAsCompleted('faq');
    }
}

// Modal System
function initializeModal() {
    if (bodyAreaModal) {
        // Close modal when clicking overlay
        const overlay = bodyAreaModal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeModal);
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !bodyAreaModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
}

function closeModal() {
    if (bodyAreaModal) {
        bodyAreaModal.classList.add('hidden');
        bodyAreaModal.setAttribute('aria-hidden', 'true');
        
        // Return focus to trigger button
        const bodyAreaButtons = document.querySelectorAll('.body-area');
        if (bodyAreaButtons.length > 0) {
            bodyAreaButtons[0].focus();
        }
    }
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

    // Keyboard navigation for tabs
    document.addEventListener('keydown', function(event) {
        // Arrow key navigation for tabs
        if (event.target.classList.contains('explanation-tab') || 
            event.target.classList.contains('app-tab') ||
            event.target.classList.contains('comparison-btn') ||
            event.target.classList.contains('prep-btn')) {
            
            handleTabKeyNavigation(event);
        }
        
        // Escape key handling
        if (event.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.click();
            }
        }
    });
}

function handleTabKeyNavigation(event) {
    const tabs = event.target.parentNode.querySelectorAll(event.target.tagName);
    const currentIndex = Array.from(tabs).indexOf(event.target);
    
    let newIndex;
    switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            newIndex = (currentIndex + 1) % tabs.length;
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            break;
        default:
            return;
    }
    
    event.preventDefault();
    tabs[newIndex].focus();
    tabs[newIndex].click();
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
}

// Utility Functions
function showLoadingState() {
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
    }
}

function hideLoadingState() {
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }
}

function showTooltip(message, type = 'info', duration = 5000) {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip tooltip--${type}`;
    tooltip.innerHTML = `
        <div class="tooltip__content">
            <p>${message}</p>
            <button class="tooltip__close" onclick="closeTooltip(this)">×</button>
        </div>
    `;
    
    // Add tooltip styles if not already added
    if (!document.getElementById('tooltip-styles')) {
        const tooltipStyles = document.createElement('style');
        tooltipStyles.id = 'tooltip-styles';
        tooltipStyles.textContent = `
            .tooltip {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: var(--color-surface);
                padding: var(--space-16);
                border-radius: var(--radius-base);
                box-shadow: var(--shadow-lg);
                border-left: 4px solid var(--color-primary);
                max-width: 320px;
                animation: slideInTooltip 0.3s ease-out;
            }
            
            .tooltip--success {
                border-left-color: var(--color-success);
            }
            
            .tooltip--warning {
                border-left-color: var(--color-warning);
            }
            
            .tooltip--error {
                border-left-color: var(--color-error);
            }
            
            .tooltip__content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: var(--space-8);
            }
            
            .tooltip__content p {
                margin: 0;
                color: var(--color-text);
                font-size: var(--font-size-sm);
                line-height: var(--line-height-normal);
            }
            
            .tooltip__close {
                background: none;
                border: none;
                font-size: var(--font-size-lg);
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: 0;
                line-height: 1;
            }
            
            .tooltip__close:hover {
                color: var(--color-text);
            }
            
            @keyframes slideInTooltip {
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
        document.head.appendChild(tooltipStyles);
    }
    
    document.body.appendChild(tooltip);
    
    // Auto-remove after duration
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, duration);
    
    console.log(`Tooltip shown: ${message}`);
}

function closeTooltip(button) {
    const tooltip = button.closest('.tooltip');
    if (tooltip && tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
    }
}

// Footer Actions
function printGuide() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        
        // Create print-friendly content
        const printContent = generatePrintContent();
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            
            showTooltip('Print-friendly version prepared. Check your browser\'s print dialog.', 'success');
        } else {
            showTooltip('Pop-up blocked. Please allow pop-ups and try again.', 'warning');
        }
    }, 1000);
}

function shareGuide() {
    if (navigator.share) {
        navigator.share({
            title: 'X-Ray & CT Scan Complete Guide',
            text: 'Comprehensive educational resource about X-Ray and CT scan procedures, safety, and preparation.',
            url: window.location.href
        }).then(() => {
            showTooltip('Guide shared successfully!', 'success');
        }).catch(() => {
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    // Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
        showTooltip('Guide URL copied to clipboard!', 'success');
    }).catch(() => {
        showTooltip('Unable to share automatically. Please copy the URL from the address bar.', 'info');
    });
}

function bookmarkGuide() {
    const bookmarkData = {
        title: 'X-Ray & CT Scan Complete Guide',
        url: window.location.href,
        progress: medicalImagingGuide.progressPercentage,
        completedSections: Array.from(medicalImagingGuide.completedSections),
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    try {
        localStorage.setItem('medicalImagingGuideBookmark', JSON.stringify(bookmarkData));
        showTooltip('Guide bookmarked with your progress saved!', 'success');
    } catch (error) {
        // Fallback if localStorage is not available
        showTooltip('Bookmark saved locally for this session.', 'info');
        console.log('Bookmark data:', bookmarkData);
    }
}

// Generate print-friendly content
function generatePrintContent() {
    const currentDate = new Date().toLocaleDateString();
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>X-Ray & CT Scan Complete Guide - Print Version</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { border-bottom: 2px solid #218085; padding-bottom: 20px; margin-bottom: 30px; }
                .section { margin-bottom: 30px; page-break-inside: avoid; }
                .section-title { color: #218085; border-bottom: 1px solid #218085; padding-bottom: 5px; }
                .comparison-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                .comparison-table th, .comparison-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                .comparison-table th { background-color: #f2f2f2; }
                ul { margin: 10px 0; padding-left: 20px; }
                .print-note { font-style: italic; color: #666; margin-top: 20px; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>X-Ray & CT Scan Complete Guide</h1>
                <p>Comprehensive educational resource for diagnostic imaging</p>
                <p class="print-note">Printed on: ${currentDate}</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">Quick Reference Comparison</h2>
                <table class="comparison-table">
                    <tr><th>Feature</th><th>X-Ray</th><th>CT Scan</th></tr>
                    <tr><td>Image Type</td><td>2D flat images</td><td>3D cross-sectional</td></tr>
                    <tr><td>Duration</td><td>5-15 minutes</td><td>10-45 minutes</td></tr>
                    <tr><td>Radiation</td><td>Low (0.01-10 mSv)</td><td>Higher but safe (1-20 mSv)</td></tr>
                    <tr><td>Cost</td><td>Lower</td><td>Higher</td></tr>
                    <tr><td>Best For</td><td>Bones, lungs, basic screening</td><td>Soft tissues, complex diagnosis</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h2 class="section-title">Safety Information</h2>
                <h3>ALARA Principle</h3>
                <p>As Low As Reasonably Achievable - All medical imaging follows strict protocols to minimize radiation while maintaining diagnostic quality.</p>
                
                <h3>Important Precautions</h3>
                <ul>
                    <li><strong>Pregnancy:</strong> Always inform your doctor if pregnant or might be pregnant</li>
                    <li><strong>Allergies:</strong> Report allergies to iodine or contrast materials</li>
                    <li><strong>Medications:</strong> List all current medications and supplements</li>
                    <li><strong>Medical Conditions:</strong> Report kidney problems, diabetes, heart conditions</li>
                </ul>
            </div>
            
            <div class="section">
                <h2 class="section-title">Preparation Checklist</h2>
                <h3>X-Ray Preparation</h3>
                <ul>
                    <li>Remove jewelry and metal objects from examination area</li>
                    <li>Wear comfortable clothes without metal fasteners</li>
                    <li>Bring insurance cards and identification</li>
                    <li>No special dietary preparation needed</li>
                </ul>
                
                <h3>CT Scan Preparation</h3>
                <ul>
                    <li>Follow fasting instructions if contrast required (4-6 hours)</li>
                    <li>Continue regular medications unless instructed otherwise</li>
                    <li>Report allergies, especially to iodine</li>
                    <li>Stay well-hydrated before and after exam</li>
                    <li>Arrive early for registration</li>
                </ul>
            </div>
            
            <p class="print-note">For the complete interactive guide with detailed explanations, visit the full online version.</p>
        </body>
        </html>
    `;
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Medical Imaging Guide Error:', event.error);
    showTooltip('An error occurred. Please refresh the page or contact support.', 'error');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Medical Imaging Guide loaded in ${loadTime.toFixed(2)}ms`);
    
    if (loadTime > 3000) {
        showTooltip('Loading took longer than expected. Consider refreshing for better performance.', 'warning');
    }
});

// Responsive behavior
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navToggle.click();
    }
});

// Initialize search functionality (if search input added later)
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchContent(searchTerm);
        });
    }
}

function searchContent(searchTerm) {
    if (!searchTerm) return;
    
    const searchableElements = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
    let matches = [];
    
    searchableElements.forEach(element => {
        if (element.textContent.toLowerCase().includes(searchTerm)) {
            matches.push(element);
        }
    });
    
    if (matches.length > 0) {
        matches[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        showTooltip(`Found ${matches.length} matches for "${searchTerm}"`, 'info');
    } else {
        showTooltip(`No matches found for "${searchTerm}"`, 'warning');
    }
}

// Export for global access and debugging
window.medicalImagingGuide = medicalImagingGuide;
window.scrollToSection = scrollToSection;
window.showExplanation = showExplanation;
window.showBodyAreaInfo = showBodyAreaInfo;
window.selectApplication = selectApplication;
window.selectCTApplication = selectCTApplication;
window.showProcedure = showProcedure;
window.showComparison = showComparison;
window.showPreparation = showPreparation;
window.toggleFAQ = toggleFAQ;
window.closeModal = closeModal;
window.printGuide = printGuide;
window.shareGuide = shareGuide;
window.bookmarkGuide = bookmarkGuide;

console.log('X-Ray & CT Scan Complete Guide v1.0 - Educational diagnostic imaging resource loaded 🏥');

// Load any saved progress
try {
    const savedBookmark = localStorage.getItem('medicalImagingGuideBookmark');
    if (savedBookmark) {
        const bookmarkData = JSON.parse(savedBookmark);
        if (bookmarkData.completedSections) {
            bookmarkData.completedSections.forEach(section => {
                medicalImagingGuide.completedSections.add(section);
            });
            updateProgressBar();
            showTooltip('Welcome back! Your previous progress has been restored.', 'success');
        }
    }
} catch (error) {
    console.log('No previous bookmark found or error loading bookmark');
}