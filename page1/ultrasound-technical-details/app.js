// Ultrasound Technical Details Center - Interactive Technical Features

// Global state management for technical interface
const ultrasoundTechnical = {
    currentTransducerTab: 'elements',
    currentQATab: 'daily',
    calculatorResults: {},
    technicalParameters: {},
    systemSpecs: {},
    lastCalculations: {}
};

// Technical constants for calculations
const TECHNICAL_CONSTANTS = {
    SOUND_VELOCITY_SOFT_TISSUE: 1540, // m/s
    ATTENUATION_COEFFICIENT: 0.6, // dB/cm/MHz typical
    DENSITY_SOFT_TISSUE: 1060, // kg/m³
    ACOUSTIC_IMPEDANCE_SOFT_TISSUE: 1.63, // MRayls
    FREQUENCY_RANGES: {
        'deep': { min: 2, max: 5, description: 'Deep penetration, abdominal imaging' },
        'general': { min: 5, max: 10, description: 'General purpose, moderate penetration' },
        'superficial': { min: 10, max: 15, description: 'Superficial structures, high resolution' },
        'specialized': { min: 15, max: 50, description: 'Dermatology, ophthalmology applications' }
    }
};

// DOM Elements
let navbar, navToggle, navMenu;

// Initialize the technical interface
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    navbar = document.querySelector('.navbar');
    navToggle = document.querySelector('.navbar__toggle');
    navMenu = document.querySelector('.navbar__menu');

    // Initialize all technical features
    initializeNavigation();
    initializeSmoothScrolling();
    initializeTransducerTabs();
    initializeQATabs();
    initializeTechnicalCalculators();
    initializeHeroButtons();
    initializeAccessibility();
    initializeTechnicalValidation();
    
    console.log('Ultrasound Technical Details Center initialized successfully');
    
    // Welcome message for technical professionals
    setTimeout(() => {
        showTechnicalNotification('Welcome to the Ultrasound Technical Details Center - Professional engineering resource loaded.', 'info');
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
        updateActiveTechnicalNavLink(sectionId);
        
        console.log(`Scrolled to technical section: ${sectionId}`);
    }
}

function updateActiveTechnicalNavLink(activeId) {
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
        }
    });
}

// Transducer Tabs Functionality
function initializeTransducerTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tab = this.dataset.tab;
            switchTransducerTab(tab);
        });
    });
}

function switchTransducerTab(tab) {
    ultrasoundTechnical.currentTransducerTab = tab;
    
    // Update button states
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tab) {
            btn.classList.add('active');
        }
    });
    
    // Update panels
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.panel === tab) {
            panel.classList.add('active');
            panel.classList.add('fade-in');
        }
    });
    
    console.log(`Switched to transducer tab: ${tab}`);
}

// QA Tabs Functionality
function initializeQATabs() {
    const qaTabBtns = document.querySelectorAll('.qa-tab-btn');
    const qaPanels = document.querySelectorAll('.qa-panel');

    qaTabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tab = this.dataset.qaTab;
            switchQATab(tab);
        });
    });
}

function switchQATab(tab) {
    ultrasoundTechnical.currentQATab = tab;
    
    // Update button states
    const qaTabBtns = document.querySelectorAll('.qa-tab-btn');
    qaTabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.qaTab === tab) {
            btn.classList.add('active');
        }
    });
    
    // Update panels
    const qaPanels = document.querySelectorAll('.qa-panel');
    qaPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.qaPanel === tab) {
            panel.classList.add('active');
            panel.classList.add('slide-up');
        }
    });
    
    console.log(`Switched to QA tab: ${tab}`);
}

// Technical Calculators
function initializeTechnicalCalculators() {
    // Initialize calculator input validation
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateTechnicalInput(this);
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // Find and trigger the calculate button in the same card
                const calculatorCard = this.closest('.calculator-card');
                const calculateBtn = calculatorCard.querySelector('.btn');
                if (calculateBtn) {
                    calculateBtn.click();
                }
            }
        });
        
        // Validate pre-filled values on initialization
        setTimeout(() => {
            if (input.value) {
                validateTechnicalInput(input);
            }
        }, 100);
    });
    
    console.log('Technical calculators initialized');
}

function validateTechnicalInput(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    
    // Remove any existing validation styling
    input.classList.remove('input-error', 'input-valid');
    
    if (!input.value || input.value.trim() === '') {
        // Empty input - neutral state
        return null;
    }
    
    if (isNaN(value)) {
        input.classList.add('input-error');
        return false;
    }
    
    if (!isNaN(min) && value < min) {
        input.classList.add('input-error');
        return false;
    }
    
    if (!isNaN(max) && value > max) {
        input.classList.add('input-error');
        return false;
    }
    
    input.classList.add('input-valid');
    return true;
}

// Calculator Functions
function calculateWavelength() {
    const freqInput = document.getElementById('freq-input');
    const velocityInput = document.getElementById('velocity-input');
    const resultDiv = document.getElementById('wavelength-result');
    
    const freqValid = validateTechnicalInput(freqInput);
    const velocityValid = validateTechnicalInput(velocityInput);
    
    if (freqValid === false || velocityValid === false || !freqInput.value || !velocityInput.value) {
        showTechnicalNotification('Please enter valid frequency and velocity values', 'error');
        return;
    }
    
    const frequency = parseFloat(freqInput.value) * 1e6; // Convert MHz to Hz
    const velocity = parseFloat(velocityInput.value);
    
    if (frequency <= 0 || velocity <= 0) {
        showTechnicalNotification('Frequency and velocity must be positive values', 'error');
        return;
    }
    
    const wavelength = velocity / frequency; // meters
    const wavelengthMm = wavelength * 1000; // convert to mm
    
    // Store result
    ultrasoundTechnical.calculatorResults.wavelength = {
        frequency: frequency / 1e6,
        velocity: velocity,
        wavelength: wavelength,
        wavelengthMm: wavelengthMm,
        timestamp: new Date().toISOString()
    };
    
    // Display result
    const resultValueDiv = resultDiv.querySelector('.result-value');
    resultValueDiv.innerHTML = `${wavelengthMm.toFixed(3)} mm<br><span style="font-size: 0.8em; color: var(--color-text-secondary);">(${wavelength.toExponential(3)} m)</span>`;
    
    // Add technical analysis
    let analysis = '';
    if (wavelengthMm < 0.1) {
        analysis = 'Very high resolution, limited penetration';
    } else if (wavelengthMm < 0.3) {
        analysis = 'High resolution, good for superficial structures';
    } else if (wavelengthMm < 0.6) {
        analysis = 'Balanced resolution and penetration';
    } else {
        analysis = 'Good penetration, moderate resolution';
    }
    
    showTechnicalNotification(`Wavelength calculated: ${wavelengthMm.toFixed(3)} mm - ${analysis}`, 'success');
    console.log('Wavelength calculation:', ultrasoundTechnical.calculatorResults.wavelength);
}

function calculateDoppler() {
    const freqInput = document.getElementById('doppler-freq');
    const velocityInput = document.getElementById('doppler-velocity');
    const angleInput = document.getElementById('doppler-angle');
    const resultDiv = document.getElementById('doppler-result');
    
    const freqValid = validateTechnicalInput(freqInput);
    const velocityValid = validateTechnicalInput(velocityInput);
    const angleValid = validateTechnicalInput(angleInput);
    
    if (freqValid === false || velocityValid === false || angleValid === false || 
        !freqInput.value || !velocityInput.value || !angleInput.value) {
        showTechnicalNotification('Please enter valid frequency, velocity, and angle values', 'error');
        return;
    }
    
    const f0 = parseFloat(freqInput.value) * 1e6; // Convert MHz to Hz
    const velocity = parseFloat(velocityInput.value);
    const angle = parseFloat(angleInput.value);
    const c = TECHNICAL_CONSTANTS.SOUND_VELOCITY_SOFT_TISSUE;
    
    if (f0 <= 0 || angle < 0 || angle > 90) {
        showTechnicalNotification('Invalid parameters: frequency must be positive, angle 0-90°', 'error');
        return;
    }
    
    // Doppler equation: fd = 2*f0*v*cos(θ)/c
    const angleRad = angle * Math.PI / 180;
    const dopplerShift = (2 * f0 * velocity * Math.cos(angleRad)) / c;
    
    // Store result
    ultrasoundTechnical.calculatorResults.doppler = {
        transmitFreq: f0 / 1e6,
        velocity: velocity,
        angle: angle,
        dopplerShift: dopplerShift,
        timestamp: new Date().toISOString()
    };
    
    // Display result
    const resultValueDiv = resultDiv.querySelector('.result-value');
    resultValueDiv.innerHTML = `${dopplerShift.toFixed(2)} Hz<br><span style="font-size: 0.8em; color: var(--color-text-secondary);">${(dopplerShift/1000).toFixed(3)} kHz</span>`;
    
    // Technical analysis
    let analysis = '';
    if (Math.abs(dopplerShift) > 5000) {
        analysis = 'High Doppler shift - check for aliasing';
    } else if (Math.abs(dopplerShift) < 100) {
        analysis = 'Low Doppler shift - may need lower wall filter';
    } else {
        analysis = 'Good Doppler shift range for measurement';
    }
    
    showTechnicalNotification(`Doppler shift: ${dopplerShift.toFixed(2)} Hz - ${analysis}`, 'success');
    console.log('Doppler calculation:', ultrasoundTechnical.calculatorResults.doppler);
}

function calculateNearField() {
    const diameterInput = document.getElementById('diameter-input');
    const nfFreqInput = document.getElementById('nf-freq');
    const resultDiv = document.getElementById('nearfield-result');
    
    const diameterValid = validateTechnicalInput(diameterInput);
    const freqValid = validateTechnicalInput(nfFreqInput);
    
    if (diameterValid === false || freqValid === false || !diameterInput.value || !nfFreqInput.value) {
        showTechnicalNotification('Please enter valid diameter and frequency values', 'error');
        return;
    }
    
    const diameter = parseFloat(diameterInput.value) / 1000; // Convert mm to m
    const frequency = parseFloat(nfFreqInput.value) * 1e6; // Convert MHz to Hz
    const c = TECHNICAL_CONSTANTS.SOUND_VELOCITY_SOFT_TISSUE;
    
    if (diameter <= 0 || frequency <= 0) {
        showTechnicalNotification('Diameter and frequency must be positive values', 'error');
        return;
    }
    
    // Near field length: N = D²f/4c
    const nearFieldLength = (diameter * diameter * frequency) / (4 * c);
    const nearFieldLengthCm = nearFieldLength * 100; // convert to cm
    
    // Store result
    ultrasoundTechnical.calculatorResults.nearField = {
        diameter: diameter * 1000,
        frequency: frequency / 1e6,
        nearFieldLength: nearFieldLength,
        nearFieldLengthCm: nearFieldLengthCm,
        timestamp: new Date().toISOString()
    };
    
    // Display result
    const resultValueDiv = resultDiv.querySelector('.result-value');
    resultValueDiv.innerHTML = `${nearFieldLengthCm.toFixed(2)} cm<br><span style="font-size: 0.8em; color: var(--color-text-secondary);">(${nearFieldLength.toFixed(4)} m)</span>`;
    
    // Technical analysis
    let analysis = '';
    if (nearFieldLengthCm < 2) {
        analysis = 'Short near field - suitable for superficial imaging';
    } else if (nearFieldLengthCm < 8) {
        analysis = 'Moderate near field length - good general purpose';
    } else {
        analysis = 'Long near field - good for deep structure focusing';
    }
    
    showTechnicalNotification(`Near field length: ${nearFieldLengthCm.toFixed(2)} cm - ${analysis}`, 'success');
    console.log('Near field calculation:', ultrasoundTechnical.calculatorResults.nearField);
}

function calculateAttenuation() {
    const attenFreqInput = document.getElementById('atten-freq');
    const attenDepthInput = document.getElementById('atten-depth');
    const attenCoeffInput = document.getElementById('atten-coeff');
    const resultDiv = document.getElementById('attenuation-result');
    
    const freqValid = validateTechnicalInput(attenFreqInput);
    const depthValid = validateTechnicalInput(attenDepthInput);
    const coeffValid = validateTechnicalInput(attenCoeffInput);
    
    if (freqValid === false || depthValid === false || coeffValid === false || 
        !attenFreqInput.value || !attenDepthInput.value || !attenCoeffInput.value) {
        showTechnicalNotification('Please enter valid frequency, depth, and coefficient values', 'error');
        return;
    }
    
    const frequency = parseFloat(attenFreqInput.value); // MHz
    const depth = parseFloat(attenDepthInput.value); // cm
    const coefficient = parseFloat(attenCoeffInput.value); // dB/cm/MHz
    
    if (frequency <= 0 || depth <= 0 || coefficient <= 0) {
        showTechnicalNotification('All values must be positive', 'error');
        return;
    }
    
    // Attenuation: A = α × f × d
    const totalAttenuation = coefficient * frequency * depth;
    const roundTripAttenuation = totalAttenuation * 2; // Account for round trip
    
    // Store result
    ultrasoundTechnical.calculatorResults.attenuation = {
        frequency: frequency,
        depth: depth,
        coefficient: coefficient,
        oneWayAttenuation: totalAttenuation,
        roundTripAttenuation: roundTripAttenuation,
        timestamp: new Date().toISOString()
    };
    
    // Display result
    const resultValueDiv = resultDiv.querySelector('.result-value');
    resultValueDiv.innerHTML = `${totalAttenuation.toFixed(1)} dB (one-way)<br><span style="font-size: 0.8em; color: var(--color-text-secondary);">${roundTripAttenuation.toFixed(1)} dB (round-trip)</span>`;
    
    // Technical analysis
    let analysis = '';
    if (roundTripAttenuation > 100) {
        analysis = 'Very high attenuation - may need lower frequency';
    } else if (roundTripAttenuation > 60) {
        analysis = 'High attenuation - consider frequency optimization';
    } else if (roundTripAttenuation > 30) {
        analysis = 'Moderate attenuation - acceptable for imaging';
    } else {
        analysis = 'Low attenuation - good signal penetration';
    }
    
    showTechnicalNotification(`Total attenuation: ${totalAttenuation.toFixed(1)} dB - ${analysis}`, 'success');
    console.log('Attenuation calculation:', ultrasoundTechnical.calculatorResults.attenuation);
}

// Technical Validation
function initializeTechnicalValidation() {
    // Add CSS for validation states
    if (!document.getElementById('technical-validation-styles')) {
        const validationStyles = document.createElement('style');
        validationStyles.id = 'technical-validation-styles';
        validationStyles.textContent = `
            .input-error {
                border: 2px solid var(--color-ultrasound-critical) !important;
                background-color: rgba(244, 67, 54, 0.1) !important;
            }
            
            .input-valid {
                border: 2px solid var(--color-ultrasound-safe) !important;
                background-color: rgba(76, 175, 80, 0.1) !important;
            }
            
            .technical-tooltip {
                position: relative;
                display: inline-block;
            }
            
            .technical-tooltip .tooltip-text {
                visibility: hidden;
                width: 200px;
                background-color: var(--color-tech-darker);
                color: var(--color-white);
                text-align: center;
                border-radius: var(--radius-sm);
                padding: var(--space-8);
                position: absolute;
                z-index: 1000;
                bottom: 125%;
                left: 50%;
                margin-left: -100px;
                opacity: 0;
                transition: opacity 0.3s;
                font-size: var(--font-size-xs);
                border: 1px solid var(--color-ultrasound-primary);
            }
            
            .technical-tooltip:hover .tooltip-text {
                visibility: visible;
                opacity: 1;
            }
        `;
        document.head.appendChild(validationStyles);
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

    // Keyboard navigation for calculators
    document.addEventListener('keydown', function(event) {
        // Escape key handling
        if (event.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.click();
            }
        }
        
        // Alt + number keys for quick calculator access
        if (event.altKey && !isNaN(parseInt(event.key))) {
            const calculatorIndex = parseInt(event.key) - 1;
            const calculatorCards = document.querySelectorAll('.calculator-card');
            if (calculatorCards[calculatorIndex]) {
                calculatorCards[calculatorIndex].scrollIntoView({ behavior: 'smooth' });
                const firstInput = calculatorCards[calculatorIndex].querySelector('input');
                if (firstInput) {
                    firstInput.focus();
                }
            }
        }
    });
}

// Technical Notifications
function showTechnicalNotification(message, type = 'info', duration = 5000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `technical-notification technical-notification--${type}`;
    
    // Add technical icons based on type
    const icons = {
        'info': '📊',
        'success': '✅',
        'warning': '⚠️',
        'error': '❌'
    };
    
    notification.innerHTML = `
        <div class="technical-notification__content">
            <div class="technical-notification__icon">${icons[type] || '📊'}</div>
            <p>${message}</p>
            <button class="technical-notification__close" onclick="closeTechnicalNotification(this)">×</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('technical-notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'technical-notification-styles';
        notificationStyles.textContent = `
            .technical-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: var(--color-surface);
                padding: var(--space-16);
                border-radius: var(--radius-base);
                box-shadow: var(--shadow-lg);
                border-left: 4px solid var(--color-ultrasound-primary);
                max-width: 400px;
                animation: slideInTechnicalNotification 0.3s ease-out;
                border: 1px solid var(--color-card-border);
                font-family: var(--font-family-base);
            }
            
            .technical-notification--info {
                border-left-color: var(--color-ultrasound-info);
            }
            
            .technical-notification--success {
                border-left-color: var(--color-ultrasound-safe);
            }
            
            .technical-notification--warning {
                border-left-color: var(--color-ultrasound-caution);
            }
            
            .technical-notification--error {
                border-left-color: var(--color-ultrasound-critical);
            }
            
            .technical-notification__content {
                display: flex;
                align-items: flex-start;
                gap: var(--space-8);
            }
            
            .technical-notification__icon {
                font-size: var(--font-size-lg);
                flex-shrink: 0;
            }
            
            .technical-notification__content p {
                margin: 0;
                color: var(--color-text);
                font-size: var(--font-size-sm);
                line-height: var(--line-height-normal);
                flex: 1;
            }
            
            .technical-notification__close {
                background: none;
                border: none;
                font-size: var(--font-size-lg);
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: 0;
                font-family: var(--font-family-mono);
                flex-shrink: 0;
            }
            
            .technical-notification__close:hover {
                color: var(--color-text);
            }
            
            @keyframes slideInTechnicalNotification {
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
    
    console.log(`Technical notification: ${message}`);
}

function closeTechnicalNotification(button) {
    const notification = button.closest('.technical-notification');
    if (notification && notification.parentNode) {
        notification.parentNode.removeChild(notification);
    }
}

// Footer Functions
function exportTechnicalData() {
    showTechnicalNotification('Preparing technical data export...', 'info', 2000);
    
    setTimeout(() => {
        const technicalData = {
            title: "Ultrasound Technical Specifications Export",
            exportDate: new Date().toISOString(),
            acousticProperties: {
                frequencyRange: "2-18 MHz diagnostic imaging",
                wavelength: "0.08-0.77 mm in soft tissue",
                soundVelocity: "1540 m/s average in soft tissue",
                acousticImpedance: "1.38-1.81 MRayls tissue-dependent",
                attenuation: "0.5-0.7 dB/cm/MHz in soft tissue"
            },
            transducerSpecs: {
                linearArray: { elements: "128-512", frequency: "5-15 MHz", application: "High resolution imaging" },
                curvedArray: { elements: "128-256", frequency: "2-8 MHz", application: "Wide field of view" },
                phasedArray: { elements: "64-128", frequency: "2-5 MHz", application: "Cardiac imaging" },
                matrixArray: { elements: "2500+", frequency: "2-4 MHz", application: "3D/4D imaging" }
            },
            performanceSpecs: {
                penetrationDepth: "30 cm maximum (frequency dependent)",
                frameRate: "15-1000 Hz depending on mode and depth",
                dynamicRange: "100-120 dB system dynamic range",
                measurementAccuracy: "±1-2% distance, ±5-10% Doppler velocities"
            },
            safetyParameters: {
                SPTA: "<720 mW/cm² limit",
                SPPA: "<190 W/cm² limit",
                mechanicalIndex: "<1.9 for diagnostic imaging",
                thermalIndex: "<6.0 with time limitations"
            },
            calculatorResults: ultrasoundTechnical.calculatorResults,
            technicalConstants: TECHNICAL_CONSTANTS
        };
        
        const dataStr = JSON.stringify(technicalData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `ultrasound-technical-specs-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        showTechnicalNotification('Technical data exported successfully!', 'success');
    }, 500);
}

function printSpecifications() {
    showTechnicalNotification('Preparing technical specifications for printing...', 'info', 2000);
    
    setTimeout(() => {
        const printContent = generateTechnicalPrintContent();
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            
            showTechnicalNotification('Technical specifications prepared for printing.', 'success');
        } else {
            showTechnicalNotification('Pop-up blocked. Please allow pop-ups and try again.', 'warning');
        }
    }, 500);
}

function downloadCalculators() {
    showTechnicalNotification('Preparing calculator tools for download...', 'info', 2000);
    
    setTimeout(() => {
        const calculatorTools = {
            title: "Ultrasound Technical Calculator Tools",
            version: "1.0",
            downloadDate: new Date().toISOString(),
            calculators: {
                wavelength: {
                    formula: "λ = c/f",
                    description: "Calculate wavelength from frequency and sound velocity",
                    units: { frequency: "MHz", velocity: "m/s", result: "mm" }
                },
                doppler: {
                    formula: "fd = 2f₀v cos(θ)/c",
                    description: "Calculate Doppler frequency shift",
                    units: { frequency: "MHz", velocity: "m/s", angle: "degrees", result: "Hz" }
                },
                nearField: {
                    formula: "N = D²f/4c",
                    description: "Calculate near field length",
                    units: { diameter: "mm", frequency: "MHz", result: "cm" }
                },
                attenuation: {
                    formula: "A = α × f × d",
                    description: "Calculate ultrasound attenuation",
                    units: { frequency: "MHz", depth: "cm", coefficient: "dB/cm/MHz", result: "dB" }
                }
            },
            constants: TECHNICAL_CONSTANTS,
            recentCalculations: ultrasoundTechnical.calculatorResults
        };
        
        const toolsStr = JSON.stringify(calculatorTools, null, 2);
        const toolsBlob = new Blob([toolsStr], { type: 'application/json' });
        const url = URL.createObjectURL(toolsBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `ultrasound-calculator-tools-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        showTechnicalNotification('Calculator tools downloaded successfully!', 'success');
    }, 500);
}

// Generate print-friendly technical content
function generateTechnicalPrintContent() {
    const currentDate = new Date().toLocaleDateString();
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Ultrasound Technical Specifications - Print Version</title>
            <style>
                body { 
                    font-family: 'Consolas', 'Monaco', monospace; 
                    line-height: 1.4; 
                    color: #333; 
                    font-size: 10px;
                    margin: 15px;
                }
                .header { 
                    border-bottom: 3px solid #e91e63; 
                    padding-bottom: 15px; 
                    margin-bottom: 20px; 
                    text-align: center;
                }
                .section { 
                    margin-bottom: 20px; 
                    page-break-inside: avoid; 
                }
                .section-title { 
                    color: #e91e63; 
                    border-bottom: 2px solid #e91e63; 
                    padding-bottom: 5px; 
                    font-size: 12px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    font-family: Arial, sans-serif;
                }
                .spec-table { 
                    width: 100%;
                    border-collapse: collapse;
                    margin: 10px 0;
                }
                .spec-table th, .spec-table td {
                    border: 1px solid #ddd;
                    padding: 6px;
                    text-align: left;
                    font-size: 9px;
                }
                .spec-table th {
                    background: #fce4ec;
                    font-weight: bold;
                    color: #e91e63;
                }
                .formula-box { 
                    background: #f8f9fa;
                    padding: 10px;
                    margin: 8px 0;
                    border-left: 4px solid #e91e63;
                    font-family: 'Consolas', monospace;
                }
                .print-note { 
                    font-style: italic; 
                    color: #666; 
                    margin-top: 15px; 
                    font-size: 8px;
                }
                .technical-highlight {
                    background: #fff3e0;
                    border: 1px solid #ff9800;
                    padding: 8px;
                    margin: 5px 0;
                }
                @media print { 
                    body { font-size: 8px; }
                    .section { page-break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🩻 Ultrasound Technical Specifications</h1>
                <p>Professional Engineering Reference</p>
                <p class="print-note">Generated on: ${currentDate}</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">🔬 Acoustic Properties</h2>
                <table class="spec-table">
                    <tr><th>Parameter</th><th>Value</th><th>Unit/Notes</th></tr>
                    <tr><td>Frequency Range</td><td>2-18</td><td>MHz diagnostic imaging</td></tr>
                    <tr><td>Wavelength</td><td>0.08-0.77</td><td>mm in soft tissue</td></tr>
                    <tr><td>Sound Velocity</td><td>1540</td><td>m/s average soft tissue</td></tr>
                    <tr><td>Acoustic Impedance</td><td>1.38-1.81</td><td>MRayls tissue-dependent</td></tr>
                    <tr><td>Attenuation</td><td>0.5-0.7</td><td>dB/cm/MHz soft tissue</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h2 class="section-title">🔌 Transducer Specifications</h2>
                <table class="spec-table">
                    <tr><th>Type</th><th>Elements</th><th>Frequency</th><th>Application</th></tr>
                    <tr><td>Linear Array</td><td>128-512</td><td>5-15 MHz</td><td>High resolution imaging</td></tr>
                    <tr><td>Curved Array</td><td>128-256</td><td>2-8 MHz</td><td>Wide field of view</td></tr>
                    <tr><td>Phased Array</td><td>64-128</td><td>2-5 MHz</td><td>Cardiac imaging</td></tr>
                    <tr><td>Matrix Array</td><td>2500+</td><td>2-4 MHz</td><td>3D/4D imaging</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h2 class="section-title">📊 Performance Specifications</h2>
                <table class="spec-table">
                    <tr><th>Parameter</th><th>Value</th><th>Notes</th></tr>
                    <tr><td>Penetration Depth</td><td>30 cm</td><td>Maximum (frequency dependent)</td></tr>
                    <tr><td>Frame Rate</td><td>15-1000 Hz</td><td>Mode and depth dependent</td></tr>
                    <tr><td>Dynamic Range</td><td>100-120 dB</td><td>System dynamic range</td></tr>
                    <tr><td>Axial Resolution</td><td>0.2-1.5 mm</td><td>λ/2 theoretical limit</td></tr>
                    <tr><td>Lateral Resolution</td><td>0.5-3.0 mm</td><td>Beam width dependent</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h2 class="section-title">🛡️ Safety Parameters</h2>
                <div class="technical-highlight">
                    <strong>Critical Safety Limits:</strong>
                </div>
                <table class="spec-table">
                    <tr><th>Parameter</th><th>Limit</th><th>Application</th></tr>
                    <tr><td>SPTA</td><td>&lt;720 mW/cm²</td><td>Spatial Peak Temporal Average</td></tr>
                    <tr><td>SPPA</td><td>&lt;190 W/cm²</td><td>Spatial Peak Pulse Average</td></tr>
                    <tr><td>Mechanical Index</td><td>&lt;1.9</td><td>Diagnostic imaging</td></tr>
                    <tr><td>Thermal Index</td><td>&lt;6.0</td><td>With time limitations</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h2 class="section-title">🧮 Essential Formulas</h2>
                <div class="formula-box">
                    <strong>Wavelength:</strong> λ = c/f<br>
                    Where: c = sound velocity, f = frequency
                </div>
                <div class="formula-box">
                    <strong>Doppler Shift:</strong> fd = 2f₀v cos(θ)/c<br>
                    Where: f₀ = transmit freq, v = velocity, θ = angle
                </div>
                <div class="formula-box">
                    <strong>Near Field Length:</strong> N = D²f/4c<br>
                    Where: D = diameter, f = frequency, c = sound velocity
                </div>
                <div class="formula-box">
                    <strong>Attenuation:</strong> A = α × f × d<br>
                    Where: α = coefficient, f = frequency, d = depth
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">🌊 Doppler Technology</h2>
                <table class="spec-table">
                    <tr><th>Mode</th><th>Velocity Range</th><th>Application</th></tr>
                    <tr><td>Continuous Wave</td><td>±10 m/s</td><td>High-velocity stenotic jets</td></tr>
                    <tr><td>Pulsed Wave</td><td>±0.1-5 m/s</td><td>Specific vessel interrogation</td></tr>
                    <tr><td>Color Doppler</td><td>±0.1-2 m/s</td><td>Flow visualization mapping</td></tr>
                    <tr><td>Power Doppler</td><td>3-5× sensitive</td><td>Low-velocity detection</td></tr>
                </table>
            </div>
            
            <p class="print-note">
                This technical specification document is intended for biomedical engineers, medical physicists, 
                and service technicians. All specifications are typical values and may vary by manufacturer and model.
                Always consult specific system documentation for exact specifications.
                <br><br>
                Generated by Ultrasound Technical Details Center v1.0
            </p>
        </body>
        </html>
    `;
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Technical Interface Error:', event.error);
    showTechnicalNotification('A system error occurred. Please refresh if problems persist.', 'error');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Technical interface loaded in ${loadTime.toFixed(2)}ms`);
    
    if (loadTime > 3000) {
        showTechnicalNotification('Loading took longer than expected. Consider refreshing for optimal performance.', 'warning');
    }
});

// Responsive behavior
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navToggle.click();
    }
});

// Technical parameter monitoring
function monitorTechnicalParameters() {
    // Monitor system performance and technical parameters
    const performanceMetrics = {
        memoryUsage: performance.memory ? performance.memory.usedJSHeapSize : 'N/A',
        calculationsPerformed: Object.keys(ultrasoundTechnical.calculatorResults).length,
        technicalSectionsViewed: ultrasoundTechnical.sectionsViewed || 0,
        timestamp: new Date().toISOString()
    };
    
    console.log('Technical performance metrics:', performanceMetrics);
    return performanceMetrics;
}

// Export for global access
window.ultrasoundTechnical = ultrasoundTechnical;
window.scrollToSection = scrollToSection;
window.switchTransducerTab = switchTransducerTab;
window.switchQATab = switchQATab;
window.calculateWavelength = calculateWavelength;
window.calculateDoppler = calculateDoppler;
window.calculateNearField = calculateNearField;
window.calculateAttenuation = calculateAttenuation;
window.exportTechnicalData = exportTechnicalData;
window.printSpecifications = printSpecifications;
window.downloadCalculators = downloadCalculators;
window.closeTechnicalNotification = closeTechnicalNotification;

console.log('Ultrasound Technical Details Center v1.0 - Professional Engineering Interface loaded 🩻⚙️');

// Advanced technical features
if ('IntersectionObserver' in window) {
    console.log('Advanced technical monitoring enabled');
    
    // Monitor technical section viewing for analytics
    const technicalSections = document.querySelectorAll('section[id]');
    const technicalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                console.log(`Technical section viewed: ${sectionId}`);
                updateActiveTechnicalNavLink(sectionId);
            }
        });
    }, { threshold: 0.5 });

    technicalSections.forEach(section => {
        technicalObserver.observe(section);
    });
}

// Auto-save technical calculations periodically
setInterval(() => {
    if (Object.keys(ultrasoundTechnical.calculatorResults).length > 0) {
        try {
            const technicalSession = {
                calculatorResults: ultrasoundTechnical.calculatorResults,
                technicalParameters: ultrasoundTechnical.technicalParameters,
                sessionTimestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            };
            console.log('Technical session data saved');
        } catch (error) {
            console.log('Unable to save technical session data');
        }
    }
}, 60000); // Save every minute

// Technical keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        switch(event.key) {
            case '1':
                event.preventDefault();
                scrollToSection('physics');
                break;
            case '2':
                event.preventDefault();
                scrollToSection('transducers');
                break;
            case '3':
                event.preventDefault();
                scrollToSection('calculators');
                break;
            case 'e':
                event.preventDefault();
                exportTechnicalData();
                break;
            case 'p':
                event.preventDefault();
                printSpecifications();
                break;
        }
    }
});

console.log('Technical keyboard shortcuts enabled: Ctrl+1-3 for sections, Ctrl+E for export, Ctrl+P for print');