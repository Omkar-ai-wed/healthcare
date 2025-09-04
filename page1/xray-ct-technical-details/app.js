// Technical Details Center - Medical Imaging Systems Interactive Features

// Global state management for technical interface
const technicalDetailsCenter = {
    currentParameter: 'voltage',
    currentPerformance: 'xray',
    progressPercentage: 0,
    completedSections: new Set(),
    calculatorValues: {
        mAs: { mA: 100, time: 0.1 },
        heatUnits: { kVp: 80, mAs: 10 },
        magnification: { SID: 100, SOD: 90 },
        ctDose: { CTDIvol: 10, length: 20 }
    },
    specificationDatabase: null,
    readingProgress: 0
};

// Technical specification database
const technicalSpecs = {
    "x-ray tube": {
        category: "X-Ray Technology",
        specifications: {
            "Target Material": "Tungsten (W)",
            "Anode Design": "Rotating anode",
            "Focal Spot Size": "0.6mm (fine) to 1.2mm (broad)",
            "Heat Capacity": "300-500 kHU",
            "Cooling Rate": "50-100 kHU/minute",
            "Max Power": "32-100 kW"
        }
    },
    "generator": {
        category: "X-Ray Technology",
        specifications: {
            "Type": "High-frequency",
            "Frequency": "20-150 kHz",
            "Power Rating": "32-100 kW",
            "Voltage Ripple": "<5%",
            "Efficiency": ">95%"
        }
    },
    "ct scanner": {
        category: "CT Technology",
        specifications: {
            "Gantry Design": "Slip-ring technology",
            "Detector Rows": "16-320+ rows",
            "Aperture Diameter": "70-80 cm",
            "Rotation Time": "0.28-2.0 seconds",
            "Heat Capacity": "5-8 MHU",
            "Max Table Speed": "300 mm/second"
        }
    },
    "digital detector": {
        category: "Digital Imaging",
        specifications: {
            "DQE Efficiency": "60-80%",
            "Dynamic Range": ">10,000:1",
            "Pixel Size": "100-200 micrometers",
            "Matrix Size": "2048×2048 to 4096×4096",
            "Bit Depth": "12-16 bit"
        }
    },
    "dose optimization": {
        category: "Radiation Dose",
        specifications: {
            "AEC Dose Reduction": "20-40%",
            "Iterative Reconstruction": "30-60% dose reduction",
            "CTDIvol Range": "5-25 mGy",
            "DLP Units": "mGy·cm",
            "Effective Dose": "mSv calculations"
        }
    },
    "quality assurance": {
        category: "QA/QC",
        specifications: {
            "CT Number Accuracy": "±5 HU",
            "Spatial Resolution": "0.35-0.7 mm at 50% MTF",
            "Contrast Resolution": "0.3-0.5% contrast",
            "System Uptime": ">95%",
            "MTBF": ">8760 hours"
        }
    }
};

// DOM Elements
let navbar, navToggle, navMenu, progressBar, loadingOverlay, techModal;

// Initialize the technical application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    navbar = document.querySelector('.navbar');
    navToggle = document.querySelector('.navbar__toggle');
    navMenu = document.querySelector('.navbar__menu');
    progressBar = document.querySelector('.progress-bar');
    loadingOverlay = document.getElementById('loadingOverlay');
    techModal = document.getElementById('techModal');

    // Initialize all technical features
    initializeNavigation();
    initializeSmoothScrolling();
    initializeProgressTracking();
    initializeParameterTabs();
    initializePerformanceTabs();
    initializeCalculators();
    initializeSpecificationSearch();
    initializeTechnicalModal();
    initializeAccessibility();
    initializeReadingProgress();
    
    console.log('Technical Details Center initialized successfully');
    
    // Welcome message for technical staff
    setTimeout(() => {
        showTechnicalTooltip('Welcome to the Technical Details Center - Professional medical imaging resource for technical staff.', 'success');
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
        
        console.log(`Scrolled to technical section: ${sectionId}`);
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
    technicalDetailsCenter.completedSections.add(sectionId);
    updateProgressBar();
}

function updateProgressBar() {
    const totalSections = 8; // Total number of main technical sections
    const completedCount = technicalDetailsCenter.completedSections.size;
    const percentage = Math.min((completedCount / totalSections) * 100, 100);
    
    technicalDetailsCenter.progressPercentage = percentage;
    
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
}

function updateReadingProgress() {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.pageYOffset / documentHeight) * 100;
    
    technicalDetailsCenter.readingProgress = Math.min(scrollProgress, 100);
    
    // Update progress bar to show reading progress if no sections completed yet
    if (technicalDetailsCenter.completedSections.size === 0 && progressBar) {
        progressBar.style.width = `${Math.min(scrollProgress, 100)}%`;
    }
}

// Parameter Tab Systems - FIXED
function initializeParameterTabs() {
    // Add click event listeners to all parameter tabs
    const paramTabs = document.querySelectorAll('.param-tab');
    paramTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabText = tab.textContent.toLowerCase();
            
            let paramType;
            if (tabText.includes('voltage')) {
                paramType = 'voltage';
            } else if (tabText.includes('current')) {
                paramType = 'current';
            } else if (tabText.includes('exposure')) {
                paramType = 'exposure';
            } else if (tabText.includes('image')) {
                paramType = 'image-quality';
            }
            
            if (paramType) {
                showParameters(paramType);
            }
        });
    });
    
    console.log('Parameter tab systems initialized for technical interface');
}

// Parameter tabs (X-Ray specifications section) - FIXED
function showParameters(type) {
    console.log(`Switching to parameter type: ${type}`);
    
    // Update tabs
    const tabs = document.querySelectorAll('.param-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => {
        const text = tab.textContent.toLowerCase();
        return (type === 'voltage' && text.includes('voltage')) ||
               (type === 'current' && text.includes('current')) ||
               (type === 'exposure' && text.includes('exposure')) ||
               (type === 'image-quality' && text.includes('image'));
    });
    
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Update panels
    const panels = document.querySelectorAll('.param-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    const activePanel = document.getElementById(`${type}-panel`);
    if (activePanel) {
        activePanel.classList.add('active');
        console.log(`Activated panel: ${type}-panel`);
    } else {
        console.warn(`Panel not found: ${type}-panel`);
    }
    
    technicalDetailsCenter.currentParameter = type;
    console.log(`Successfully switched to ${type} parameters`);
}

// Performance tab systems - FIXED
function initializePerformanceTabs() {
    // Add click event listeners to all performance tabs
    const perfTabs = document.querySelectorAll('.perf-btn');
    perfTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabText = tab.textContent.toLowerCase();
            
            let perfType;
            if (tabText.includes('x-ray')) {
                perfType = 'xray';
            } else if (tabText.includes('ct')) {
                perfType = 'ct';
            } else if (tabText.includes('reliability')) {
                perfType = 'reliability';
            }
            
            if (perfType) {
                showPerformance(perfType);
            }
        });
    });
    
    console.log('Performance tab systems initialized');
}

function showPerformance(type) {
    console.log(`Switching to performance type: ${type}`);
    
    // Update buttons
    const buttons = document.querySelectorAll('.perf-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = Array.from(buttons).find(btn => {
        const text = btn.textContent.toLowerCase();
        return (type === 'xray' && text.includes('x-ray')) || 
               (type === 'ct' && text.includes('ct')) ||
               (type === 'reliability' && text.includes('reliability'));
    });
    
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Update panels
    const panels = document.querySelectorAll('.perf-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    const activePanel = document.getElementById(`${type}-performance`);
    if (activePanel) {
        activePanel.classList.add('active');
        console.log(`Activated performance panel: ${type}-performance`);
    } else {
        console.warn(`Performance panel not found: ${type}-performance`);
    }
    
    technicalDetailsCenter.currentPerformance = type;
    console.log(`Successfully switched to ${type} performance metrics`);
}

// Technical Calculators
function initializeCalculators() {
    // mAs Calculator
    const mAInput = document.getElementById('mA-input');
    const timeInput = document.getElementById('time-input');
    const masResult = document.getElementById('mas-result');
    
    if (mAInput && timeInput && masResult) {
        const updateMAs = () => {
            const mA = parseFloat(mAInput.value) || 0;
            const time = parseFloat(timeInput.value) || 0;
            const result = (mA * time).toFixed(1);
            masResult.textContent = result;
            technicalDetailsCenter.calculatorValues.mAs = { mA, time };
        };
        
        mAInput.addEventListener('input', updateMAs);
        timeInput.addEventListener('input', updateMAs);
        updateMAs(); // Initial calculation
    }
    
    // Heat Unit Calculator
    const kvpInput = document.getElementById('kvp-input');
    const masInput = document.getElementById('mas-input');
    const huResult = document.getElementById('hu-result');
    
    if (kvpInput && masInput && huResult) {
        const updateHU = () => {
            const kVp = parseFloat(kvpInput.value) || 0;
            const mAs = parseFloat(masInput.value) || 0;
            const result = Math.round(kVp * mAs);
            huResult.textContent = result.toLocaleString();
            technicalDetailsCenter.calculatorValues.heatUnits = { kVp, mAs };
        };
        
        kvpInput.addEventListener('input', updateHU);
        masInput.addEventListener('input', updateHU);
        updateHU(); // Initial calculation
    }
    
    // Magnification Factor Calculator
    const sidInput = document.getElementById('sid-input');
    const sodInput = document.getElementById('sod-input');
    const magResult = document.getElementById('mag-result');
    
    if (sidInput && sodInput && magResult) {
        const updateMagnification = () => {
            const SID = parseFloat(sidInput.value) || 1;
            const SOD = parseFloat(sodInput.value) || 1;
            const result = (SID / SOD).toFixed(2);
            magResult.textContent = result;
            technicalDetailsCenter.calculatorValues.magnification = { SID, SOD };
        };
        
        sidInput.addEventListener('input', updateMagnification);
        sodInput.addEventListener('input', updateMagnification);
        updateMagnification(); // Initial calculation
    }
    
    // CT Dose Calculator
    const ctdiInput = document.getElementById('ctdi-input');
    const lengthInput = document.getElementById('length-input');
    const dlpResult = document.getElementById('dlp-result');
    
    if (ctdiInput && lengthInput && dlpResult) {
        const updateDLP = () => {
            const CTDIvol = parseFloat(ctdiInput.value) || 0;
            const length = parseFloat(lengthInput.value) || 0;
            const result = Math.round(CTDIvol * length);
            dlpResult.textContent = result.toLocaleString();
            technicalDetailsCenter.calculatorValues.ctDose = { CTDIvol, length };
        };
        
        ctdiInput.addEventListener('input', updateDLP);
        lengthInput.addEventListener('input', updateDLP);
        updateDLP(); // Initial calculation
    }
    
    console.log('Technical calculators initialized');
}

// Specification Search
function initializeSpecificationSearch() {
    const searchInput = document.getElementById('spec-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            if (searchTerm.length >= 2) {
                performSpecificationSearch(searchTerm);
            } else if (searchTerm.length === 0) {
                clearSearchResults();
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchSpecifications();
            }
        });
    }
    
    console.log('Specification search initialized');
}

function searchSpecifications() {
    const searchInput = document.getElementById('spec-search');
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    if (searchTerm.length >= 2) {
        performSpecificationSearch(searchTerm);
    } else {
        showTechnicalTooltip('Please enter at least 2 characters to search specifications.', 'warning');
    }
}

function performSpecificationSearch(searchTerm) {
    const results = [];
    const resultsContainer = document.getElementById('database-results');
    
    if (!resultsContainer) return;
    
    // Search through technical specifications
    Object.keys(technicalSpecs).forEach(key => {
        const spec = technicalSpecs[key];
        
        // Check if search term matches key or category
        if (key.includes(searchTerm) || spec.category.toLowerCase().includes(searchTerm)) {
            results.push({
                name: key,
                category: spec.category,
                specifications: spec.specifications,
                matchType: 'name'
            });
        } else {
            // Check specifications content
            Object.keys(spec.specifications).forEach(specKey => {
                const specValue = spec.specifications[specKey];
                if (specKey.toLowerCase().includes(searchTerm) || 
                    specValue.toLowerCase().includes(searchTerm)) {
                    results.push({
                        name: key,
                        category: spec.category,
                        specifications: { [specKey]: specValue },
                        matchType: 'content'
                    });
                }
            });
        }
    });
    
    // Remove duplicates
    const uniqueResults = results.filter((result, index, self) => 
        index === self.findIndex(r => r.name === result.name && r.matchType === result.matchType)
    );
    
    displaySearchResults(uniqueResults, searchTerm);
}

function displaySearchResults(results, searchTerm) {
    const resultsContainer = document.getElementById('database-results');
    if (!resultsContainer) return;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <p>No specifications found for "${searchTerm}"</p>
                <p class="search-suggestion">Try searching for: x-ray, ct scanner, detector, dose, or quality</p>
            </div>
        `;
        return;
    }
    
    let html = `<div class="search-results-header">
        <h4>Found ${results.length} specification(s) for "${searchTerm}":</h4>
    </div>`;
    
    results.forEach(result => {
        html += `
            <div class="spec-result-card">
                <div class="spec-result-header">
                    <h5>${result.name.replace(/\b\w/g, l => l.toUpperCase())}</h5>
                    <span class="spec-category">${result.category}</span>
                </div>
                <div class="spec-result-content">
        `;
        
        Object.keys(result.specifications).forEach(key => {
            html += `
                <div class="spec-result-item">
                    <span class="spec-key">${key}:</span>
                    <span class="spec-value">${result.specifications[key]}</span>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
    
    // Add styles for search results if not already added
    if (!document.getElementById('search-results-styles')) {
        const searchStyles = document.createElement('style');
        searchStyles.id = 'search-results-styles';
        searchStyles.textContent = `
            .search-results-header h4 {
                color: var(--color-tech-primary);
                margin-bottom: var(--space-12);
                font-family: var(--font-family-mono);
            }
            
            .spec-result-card {
                background: var(--color-surface);
                border: 1px solid var(--color-card-border);
                border-radius: var(--radius-base);
                margin-bottom: var(--space-12);
                overflow: hidden;
            }
            
            .spec-result-header {
                background: var(--color-tech-bg-1);
                padding: var(--space-8) var(--space-12);
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--color-card-border);
            }
            
            .spec-result-header h5 {
                margin: 0;
                color: var(--color-tech-primary);
                font-family: var(--font-family-mono);
                font-size: var(--font-size-sm);
            }
            
            .spec-category {
                background: var(--color-tech-primary);
                color: var(--color-white);
                padding: var(--space-2) var(--space-6);
                border-radius: var(--radius-full);
                font-size: var(--font-size-xs);
                font-family: var(--font-family-mono);
            }
            
            .spec-result-content {
                padding: var(--space-12);
            }
            
            .spec-result-item {
                display: flex;
                justify-content: space-between;
                padding: var(--space-4) 0;
                border-bottom: 1px solid rgba(var(--color-tech-primary-rgb, 0, 102, 204), 0.1);
            }
            
            .spec-result-item:last-child {
                border-bottom: none;
            }
            
            .spec-key {
                font-weight: var(--font-weight-medium);
                color: var(--color-text);
                font-family: var(--font-family-mono);
                font-size: var(--font-size-xs);
            }
            
            .spec-value {
                color: var(--color-text-secondary);
                font-family: var(--font-family-mono);
                font-size: var(--font-size-xs);
                text-align: right;
            }
            
            .no-results {
                text-align: center;
                padding: var(--space-20);
            }
            
            .search-suggestion {
                color: var(--color-text-secondary);
                font-size: var(--font-size-sm);
                font-style: italic;
                margin-top: var(--space-8);
            }
        `;
        document.head.appendChild(searchStyles);
    }
    
    console.log(`Search completed: ${results.length} results for "${searchTerm}"`);
}

function clearSearchResults() {
    const resultsContainer = document.getElementById('database-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = '<p>Enter search terms to find technical specifications...</p>';
    }
}

// Technical Modal System
function initializeTechnicalModal() {
    if (techModal) {
        // Close modal when clicking overlay
        const overlay = techModal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeTechModal);
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !techModal.classList.contains('hidden')) {
                closeTechModal();
            }
        });
    }
}

function showTechnicalModal(title, content) {
    if (techModal) {
        const modalTitle = document.getElementById('techModalTitle');
        const modalBody = document.getElementById('techModalBody');
        
        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.innerHTML = content;
        
        techModal.classList.remove('hidden');
        techModal.setAttribute('aria-hidden', 'false');
        
        // Focus management
        const closeButton = techModal.querySelector('.modal-close');
        if (closeButton) closeButton.focus();
        
        console.log(`Technical modal opened: ${title}`);
    }
}

function closeTechModal() {
    if (techModal) {
        techModal.classList.add('hidden');
        techModal.setAttribute('aria-hidden', 'true');
        
        // Return focus to appropriate element
        const activeElement = document.activeElement;
        if (activeElement) {
            activeElement.blur();
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
        if (event.target.classList.contains('param-tab') || 
            event.target.classList.contains('perf-btn')) {
            
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

function showTechnicalTooltip(message, type = 'info', duration = 5000) {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = `tech-tooltip tech-tooltip--${type}`;
    tooltip.innerHTML = `
        <div class="tech-tooltip__content">
            <p>${message}</p>
            <button class="tech-tooltip__close" onclick="closeTechnicalTooltip(this)">×</button>
        </div>
    `;
    
    // Add tooltip styles if not already added
    if (!document.getElementById('tech-tooltip-styles')) {
        const tooltipStyles = document.createElement('style');
        tooltipStyles.id = 'tech-tooltip-styles';
        tooltipStyles.textContent = `
            .tech-tooltip {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: var(--color-surface);
                padding: var(--space-16);
                border-radius: var(--radius-base);
                box-shadow: var(--shadow-lg);
                border-left: 4px solid var(--color-tech-primary);
                max-width: 350px;
                animation: slideInTechTooltip 0.3s ease-out;
                border: 1px solid var(--color-card-border);
            }
            
            .tech-tooltip--success {
                border-left-color: var(--color-tech-success);
            }
            
            .tech-tooltip--warning {
                border-left-color: var(--color-tech-warning);
            }
            
            .tech-tooltip--error {
                border-left-color: var(--color-tech-danger);
            }
            
            .tech-tooltip__content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: var(--space-8);
            }
            
            .tech-tooltip__content p {
                margin: 0;
                color: var(--color-text);
                font-size: var(--font-size-sm);
                line-height: var(--line-height-normal);
                font-family: var(--font-family-mono);
            }
            
            .tech-tooltip__close {
                background: none;
                border: none;
                font-size: var(--font-size-lg);
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: 0;
                line-height: 1;
                font-family: var(--font-family-mono);
            }
            
            .tech-tooltip__close:hover {
                color: var(--color-text);
            }
            
            @keyframes slideInTechTooltip {
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
    
    console.log(`Technical tooltip shown: ${message}`);
}

function closeTechnicalTooltip(button) {
    const tooltip = button.closest('.tech-tooltip');
    if (tooltip && tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
    }
}

// Footer Technical Actions
function exportTechnicalData() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        
        const technicalData = {
            specifications: technicalSpecs,
            calculatorValues: technicalDetailsCenter.calculatorValues,
            completedSections: Array.from(technicalDetailsCenter.completedSections),
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const dataStr = JSON.stringify(technicalData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `medical-imaging-technical-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        showTechnicalTooltip('Technical data exported successfully!', 'success');
    }, 1000);
}

function printSpecifications() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        
        const printContent = generateTechnicalPrintContent();
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            
            showTechnicalTooltip('Technical specifications prepared for printing.', 'success');
        } else {
            showTechnicalTooltip('Pop-up blocked. Please allow pop-ups and try again.', 'warning');
        }
    }, 1000);
}

function downloadCalculators() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        
        const calculatorData = {
            mAsCalculator: {
                formula: "mAs = mA × time (seconds)",
                currentValues: technicalDetailsCenter.calculatorValues.mAs,
                applications: "Exposure control and technique factors"
            },
            heatUnitCalculator: {
                formula: "Heat Units = kVp × mAs",
                currentValues: technicalDetailsCenter.calculatorValues.heatUnits,
                applications: "X-ray tube loading and cooling calculations"
            },
            magnificationCalculator: {
                formula: "Magnification = SID / SOD",
                currentValues: technicalDetailsCenter.calculatorValues.magnification,
                applications: "Image geometry and distortion analysis"
            },
            ctDoseCalculator: {
                formula: "DLP = CTDIvol × scan length",
                currentValues: technicalDetailsCenter.calculatorValues.ctDose,
                applications: "Patient dose monitoring and optimization"
            }
        };
        
        const calculatorStr = JSON.stringify(calculatorData, null, 2);
        const calculatorBlob = new Blob([calculatorStr], { type: 'application/json' });
        const url = URL.createObjectURL(calculatorBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `technical-calculators-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        showTechnicalTooltip('Technical calculators downloaded successfully!', 'success');
    }, 1000);
}

// Generate print-friendly technical content
function generateTechnicalPrintContent() {
    const currentDate = new Date().toLocaleDateString();
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Medical Imaging Technical Specifications - Print Version</title>
            <style>
                body { 
                    font-family: 'Courier New', monospace; 
                    line-height: 1.6; 
                    color: #333; 
                    font-size: 11px;
                }
                .header { 
                    border-bottom: 2px solid #0066cc; 
                    padding-bottom: 20px; 
                    margin-bottom: 30px; 
                }
                .section { 
                    margin-bottom: 25px; 
                    page-break-inside: avoid; 
                }
                .section-title { 
                    color: #0066cc; 
                    border-bottom: 1px solid #0066cc; 
                    padding-bottom: 5px; 
                    font-size: 14px;
                    font-weight: bold;
                }
                .spec-table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin: 15px 0; 
                    font-size: 10px;
                }
                .spec-table th, .spec-table td { 
                    border: 1px solid #ddd; 
                    padding: 6px; 
                    text-align: left; 
                }
                .spec-table th { 
                    background-color: #f2f2f2; 
                    font-weight: bold;
                }
                .calc-section {
                    background: #f8f9fa;
                    padding: 10px;
                    border-left: 3px solid #0066cc;
                    margin: 10px 0;
                }
                .formula {
                    font-weight: bold;
                    color: #0066cc;
                    font-family: 'Courier New', monospace;
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
                @media print { 
                    .no-print { display: none; } 
                    body { font-size: 9px; }
                    .spec-table { font-size: 8px; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Medical Imaging Technical Specifications</h1>
                <p>Professional technical reference for medical imaging systems</p>
                <p class="print-note">Generated on: ${currentDate}</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">X-Ray Technology Specifications</h2>
                <table class="spec-table">
                    <tr><th>Component</th><th>Parameter</th><th>Specification</th></tr>
                    <tr><td rowspan="5">X-Ray Tube</td><td>Target Material</td><td>Tungsten (W)</td></tr>
                    <tr><td>Anode Design</td><td>Rotating anode</td></tr>
                    <tr><td>Focal Spot Size</td><td>0.6mm (fine) to 1.2mm (broad)</td></tr>
                    <tr><td>Heat Capacity</td><td>300-500 kHU</td></tr>
                    <tr><td>Cooling Rate</td><td>50-100 kHU/minute</td></tr>
                    <tr><td rowspan="5">Generator</td><td>Type</td><td>High-frequency</td></tr>
                    <tr><td>Frequency</td><td>20-150 kHz</td></tr>
                    <tr><td>Power Rating</td><td>32-100 kW</td></tr>
                    <tr><td>Voltage Ripple</td><td>&lt;5%</td></tr>
                    <tr><td>Efficiency</td><td>&gt;95%</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h2 class="section-title">CT Scanner Performance</h2>
                <table class="spec-table">
                    <tr><th>Parameter</th><th>Specification</th><th>Clinical Impact</th></tr>
                    <tr><td>Spatial Resolution</td><td>0.35-0.7 mm at 50% MTF</td><td>Fine detail visualization</td></tr>
                    <tr><td>Contrast Resolution</td><td>3-5 mm at 0.3-0.5% contrast</td><td>Soft tissue differentiation</td></tr>
                    <tr><td>Temporal Resolution</td><td>75-175 ms (cardiac)</td><td>Motion artifact reduction</td></tr>
                    <tr><td>Slice Accuracy</td><td>±0.5 mm for ≥2.5 mm</td><td>Precise localization</td></tr>
                    <tr><td>Noise Level</td><td>&lt;0.5% std deviation</td><td>Image quality consistency</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h2 class="section-title">Technical Calculations</h2>
                
                <div class="calc-section">
                    <h3>mAs Calculation</h3>
                    <p class="formula">mAs = mA × time (seconds)</p>
                    <p>Controls exposure amount and image density</p>
                </div>
                
                <div class="calc-section">
                    <h3>Heat Unit Calculation</h3>
                    <p class="formula">Heat Units = kVp × mAs</p>
                    <p>X-ray tube loading and thermal management</p>
                </div>
                
                <div class="calc-section">
                    <h3>Magnification Factor</h3>
                    <p class="formula">Magnification = SID / SOD</p>
                    <p>Image geometry and distortion analysis</p>
                </div>
                
                <div class="calc-section">
                    <h3>CT Dose Calculation</h3>
                    <p class="formula">DLP = CTDIvol × scan length</p>
                    <p>Patient dose monitoring and optimization</p>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Quality Assurance Standards</h2>
                <ul>
                    <li><strong>CT Number Accuracy:</strong> ±5 HU tolerance</li>
                    <li><strong>Spatial Resolution:</strong> High-contrast phantom testing</li>
                    <li><strong>Low Contrast Detection:</strong> 0.3-0.5% contrast sensitivity</li>
                    <li><strong>System Uptime:</strong> >95% availability target</li>
                    <li><strong>MTBF:</strong> >8760 hours mean time between failures</li>
                </ul>
            </div>
            
            <div class="section">
                <h2 class="section-title">Dose Optimization Technologies</h2>
                <ul>
                    <li><strong>Automatic Exposure Control:</strong> 20-40% dose reduction</li>
                    <li><strong>Iterative Reconstruction:</strong> 30-60% dose reduction</li>
                    <li><strong>Beam Filtration:</strong> Spectral shaping optimization</li>
                    <li><strong>Dose Modulation:</strong> Real-time adjustment based on anatomy</li>
                </ul>
            </div>
            
            <p class="print-note">
                This technical reference contains typical specifications that may vary by manufacturer and model. 
                For detailed system-specific information, consult manufacturer documentation and service manuals.
                <br><br>
                Generated by Technical Details Center - Medical Imaging Systems v1.0
            </p>
        </body>
        </html>
    `;
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Technical Details Center Error:', event.error);
    showTechnicalTooltip('A technical error occurred. Please refresh the interface or contact technical support.', 'error');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Technical Details Center loaded in ${loadTime.toFixed(2)}ms`);
    
    if (loadTime > 3000) {
        showTechnicalTooltip('Loading took longer than expected. Consider refreshing for better performance.', 'warning');
    }
});

// Responsive behavior
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navToggle.click();
    }
});

// Export for global access and debugging
window.technicalDetailsCenter = technicalDetailsCenter;
window.scrollToSection = scrollToSection;
window.showParameters = showParameters;
window.showPerformance = showPerformance;
window.searchSpecifications = searchSpecifications;
window.showTechnicalModal = showTechnicalModal;
window.closeTechModal = closeTechModal;
window.exportTechnicalData = exportTechnicalData;
window.printSpecifications = printSpecifications;
window.downloadCalculators = downloadCalculators;

console.log('Technical Details Center v1.0 - Medical Imaging Systems Technical Resource loaded 🏥⚙️');

// Load any saved technical progress
try {
    const savedTechnicalData = localStorage.getItem('technicalDetailsCenterProgress');
    if (savedTechnicalData) {
        const progressData = JSON.parse(savedTechnicalData);
        if (progressData.completedSections) {
            progressData.completedSections.forEach(section => {
                technicalDetailsCenter.completedSections.add(section);
            });
            updateProgressBar();
            showTechnicalTooltip('Welcome back! Your previous technical progress has been restored.', 'success');
        }
    }
} catch (error) {
    console.log('No previous technical progress found or error loading progress');
}

// Auto-save progress periodically
setInterval(() => {
    try {
        const progressData = {
            completedSections: Array.from(technicalDetailsCenter.completedSections),
            calculatorValues: technicalDetailsCenter.calculatorValues,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('technicalDetailsCenterProgress', JSON.stringify(progressData));
    } catch (error) {
        console.log('Unable to save technical progress');
    }
}, 30000); // Save every 30 seconds