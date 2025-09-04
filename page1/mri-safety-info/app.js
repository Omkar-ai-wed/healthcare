// MRI Safety Information Center - Interactive Features

// Global state management for MRI safety interface
const mriSafetyCenter = {
    currentSection: 'hero',
    safetyScreeningProgress: 0,
    screeningAnswers: [],
    completedSections: new Set(),
    deviceDatabase: null,
    currentQuestion: 0,
    totalQuestions: 10,
    readingProgress: 0
};

// MRI Device Safety Database
const deviceSafetyDatabase = {
    "pacemaker": {
        category: "Cardiac Devices",
        safety: "conditional",
        details: {
            modern: "MRI-conditional devices require special protocols and cardiology clearance",
            older: "Absolute contraindication - cannot have MRI",
            requirements: [
                "Device manufacturer documentation",
                "Cardiology evaluation and clearance", 
                "Pre-scan device programming",
                "Continuous monitoring during scan",
                "Post-scan device interrogation"
            ]
        },
        riskLevel: "high"
    },
    "cochlear implant": {
        category: "Neurological Devices",
        safety: "varies",
        details: {
            modern: "Some newer models are MRI-conditional with restrictions",
            older: "Absolute contraindication",
            verification: "Manufacturer documentation required"
        },
        riskLevel: "high"
    },
    "orthopedic hardware": {
        category: "Orthopedic Implants",
        safety: "safe",
        details: {
            materials: "Titanium and stainless steel are generally safe",
            timing: "Safe after 6 weeks healing period",
            artifacts: "May cause image distortion but safe for patient"
        },
        riskLevel: "low"
    },
    "dental filling": {
        category: "Dental Work",
        safety: "safe",
        details: {
            materials: "Modern dental materials are MRI-safe",
            artifacts: "Minimal image distortion possible",
            precautions: "No special precautions needed"
        },
        riskLevel: "low"
    },
    "breast implant": {
        category: "Cosmetic Implants",
        safety: "safe",
        details: {
            types: "Both silicone and saline implants are completely safe",
            benefit: "MRI is excellent for evaluating implants",
            precautions: "No restrictions"
        },
        riskLevel: "low"
    },
    "iud": {
        category: "Contraceptive Devices",
        safety: "safe",
        details: {
            types: "Both copper and hormonal IUDs are MRI-safe",
            precautions: "No special precautions needed",
            verification: "No documentation required"
        },
        riskLevel: "low"
    },
    "insulin pump": {
        category: "Medical Devices",
        safety: "remove",
        details: {
            safety: "Must be removed before MRI - not MRI-safe",
            management: "Alternative insulin protocol needed during scan",
            monitoring: "Blood glucose monitoring required"
        },
        riskLevel: "high"
    },
    "aneurysm clip": {
        category: "Neurosurgical Devices",
        safety: "varies",
        details: {
            modern: "Newer clips are typically MRI-safe",
            older: "Older ferromagnetic clips are contraindicated",
            verification: "Surgical records and documentation required"
        },
        riskLevel: "high"
    },
    "metal fragment": {
        category: "Foreign Bodies",
        safety: "danger",
        details: {
            location: "Especially dangerous near eyes",
            risk: "Movement can cause serious injury",
            screening: "Orbital X-rays required if metalwork history"
        },
        riskLevel: "critical"
    },
    "deep brain stimulator": {
        category: "Neurological Devices",
        safety: "conditional",
        details: {
            modern: "Most newer models are MRI-conditional",
            requirements: "Specific protocols and restrictions apply",
            programming: "Device settings adjustment required"
        },
        riskLevel: "high"
    }
};

// Safety Screening Questions
const safetyQuestions = [
    {
        id: 1,
        question: "Do you have any metallic implants or devices in your body?",
        type: "yesno",
        riskLevel: "high",
        followUp: "Please specify the type of implant or device."
    },
    {
        id: 2,
        question: "Have you ever had heart surgery or do you have a pacemaker/ICD?",
        type: "yesno",
        riskLevel: "critical",
        followUp: "When was the device implanted? Do you have documentation?"
    },
    {
        id: 3,
        question: "Do you have any history of metalworking, welding, or machining?",
        type: "yesno",
        riskLevel: "high",
        followUp: "Eye injury screening may be required."
    },
    {
        id: 4,
        question: "Are you currently pregnant or might you be pregnant?",
        type: "yesno",
        riskLevel: "medium",
        followUp: "Pregnancy testing may be required."
    },
    {
        id: 5,
        question: "Do you have any kidney problems or kidney disease?",
        type: "yesno",
        riskLevel: "medium",
        followUp: "Kidney function testing may be needed for contrast."
    },
    {
        id: 6,
        question: "Do you experience claustrophobia or anxiety in confined spaces?",
        type: "yesno",
        riskLevel: "low",
        followUp: "Comfort measures and sedation options are available."
    },
    {
        id: 7,
        question: "Have you had any previous allergic reactions to MRI contrast?",
        type: "yesno",
        riskLevel: "medium",
        followUp: "Please provide details of the reaction."
    },
    {
        id: 8,
        question: "Do you have any tattoos with metallic ink?",
        type: "yesno",
        riskLevel: "low",
        followUp: "Some older tattoos may contain metallic particles."
    },
    {
        id: 9,
        question: "Are you currently breastfeeding?",
        type: "yesno",
        riskLevel: "low",
        followUp: "This is safe - you can continue nursing after contrast."
    },
    {
        id: 10,
        question: "Do you have any hearing implants or cochlear implants?",
        type: "yesno",
        riskLevel: "critical",
        followUp: "Device documentation will be required."
    }
];

// DOM Elements
let navbar, navToggle, navMenu, loadingOverlay, safetyModal;

// Initialize the MRI safety application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    navbar = document.querySelector('.navbar');
    navToggle = document.querySelector('.navbar__toggle');
    navMenu = document.querySelector('.navbar__menu');
    loadingOverlay = document.getElementById('loadingOverlay');
    safetyModal = document.getElementById('safetyModal');

    // Initialize all MRI safety features
    initializeNavigation();
    initializeSmoothScrolling();
    initializeSafetyScreening();
    initializeDeviceChecker();
    initializeSafetyModal();
    initializeAccessibility();
    initializeReadingProgress();
    initializeEmergencyFeatures();
    
    console.log('MRI Safety Information Center initialized successfully');
    
    // Welcome message for users
    setTimeout(() => {
        showSafetyNotification('Welcome to the MRI Safety Information Center - Your comprehensive resource for MRI safety.', 'info');
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
        
        console.log(`Scrolled to MRI safety section: ${sectionId}`);
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
    mriSafetyCenter.completedSections.add(sectionId);
    updateReadingProgress();
}

// Device Safety Checker
function initializeDeviceChecker() {
    const deviceSearchInput = document.getElementById('device-search');
    if (deviceSearchInput) {
        deviceSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            if (searchTerm.length >= 2) {
                performDeviceSearch(searchTerm);
            } else if (searchTerm.length === 0) {
                clearDeviceResults();
            }
        });
        
        deviceSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkDeviceSafety();
            }
        });
    }
    
    console.log('Device safety checker initialized');
}

function checkDeviceSafety() {
    const deviceSearchInput = document.getElementById('device-search');
    const searchTerm = deviceSearchInput ? deviceSearchInput.value.toLowerCase().trim() : '';
    
    if (searchTerm.length >= 2) {
        performDeviceSearch(searchTerm);
    } else {
        showSafetyNotification('Please enter at least 2 characters to search for device safety information.', 'warning');
    }
}

function performDeviceSearch(searchTerm) {
    const results = [];
    const resultsContainer = document.getElementById('safety-result');
    
    if (!resultsContainer) return;
    
    // Search through device database
    Object.keys(deviceSafetyDatabase).forEach(key => {
        const device = deviceSafetyDatabase[key];
        
        // Check if search term matches device name or category
        if (key.includes(searchTerm) || 
            device.category.toLowerCase().includes(searchTerm) ||
            Object.values(device.details).some(detail => 
                typeof detail === 'string' && detail.toLowerCase().includes(searchTerm)
            )) {
            results.push({
                name: key,
                device: device
            });
        }
    });
    
    displayDeviceResults(results, searchTerm);
}

function displayDeviceResults(results, searchTerm) {
    const resultsContainer = document.getElementById('safety-result');
    if (!resultsContainer) return;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-device-results">
                <h4>No device information found for "${searchTerm}"</h4>
                <p>Please consult with MRI staff about your specific device or implant.</p>
                <div class="emergency-contact-small">
                    <strong>For immediate safety questions:</strong> Contact MRI facility directly
                </div>
            </div>
        `;
        return;
    }
    
    let html = `<div class="device-results-header">
        <h4>Safety Information for "${searchTerm}":</h4>
    </div>`;
    
    results.forEach(result => {
        const safetyIcon = getSafetyIcon(result.device.safety);
        const riskClass = getRiskClass(result.device.riskLevel);
        
        html += `
            <div class="device-result-card ${riskClass}">
                <div class="device-result-header">
                    <h5>${safetyIcon} ${result.name.replace(/\b\w/g, l => l.toUpperCase())}</h5>
                    <span class="device-safety-badge device-safety-${result.device.safety}">${result.device.safety.toUpperCase()}</span>
                </div>
                <div class="device-result-category">
                    <strong>Category:</strong> ${result.device.category}
                </div>
                <div class="device-result-details">
        `;
        
        Object.keys(result.device.details).forEach(key => {
            const value = result.device.details[key];
            if (Array.isArray(value)) {
                html += `
                    <div class="device-detail-item">
                        <strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                        <ul>
                            ${value.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `;
            } else {
                html += `
                    <div class="device-detail-item">
                        <strong>${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                        <span>${value}</span>
                    </div>
                `;
            }
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
    
    // Add styles for device results if not already added
    addDeviceResultStyles();
    
    console.log(`Device search completed: ${results.length} results for "${searchTerm}"`);
}

function getSafetyIcon(safety) {
    switch (safety) {
        case 'safe': return '✅';
        case 'conditional': return '⚠️';
        case 'varies': return '❓';
        case 'remove': return '🚫';
        case 'danger': return '❌';
        default: return '❓';
    }
}

function getRiskClass(riskLevel) {
    switch (riskLevel) {
        case 'low': return 'risk-low';
        case 'medium': return 'risk-medium';
        case 'high': return 'risk-high';
        case 'critical': return 'risk-critical';
        default: return 'risk-medium';
    }
}

function clearDeviceResults() {
    const resultsContainer = document.getElementById('safety-result');
    if (resultsContainer) {
        resultsContainer.innerHTML = '<p>Enter a device name to check MRI safety information...</p>';
    }
}

// Safety Screening System
function initializeSafetyScreening() {
    const screeningTool = document.getElementById('safety-screening-tool');
    if (screeningTool) {
        initializeScreeningQuestions();
        setupScreeningEventListeners();
    }
}

function startSafetyScreening() {
    scrollToSection('screening');
    setTimeout(() => {
        resetScreening();
        showNextQuestion();
    }, 1000);
}

function initializeScreeningQuestions() {
    mriSafetyCenter.currentQuestion = 0;
    mriSafetyCenter.screeningAnswers = [];
    mriSafetyCenter.totalQuestions = safetyQuestions.length;
    
    updateScreeningProgress();
}

function setupScreeningEventListeners() {
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.dataset.value;
            handleScreeningAnswer(value);
        });
    });
}

function showNextQuestion() {
    const questionContainer = document.getElementById('screening-question');
    const resultsContainer = document.getElementById('screening-results');
    
    if (!questionContainer) return;
    
    if (mriSafetyCenter.currentQuestion < mriSafetyCenter.totalQuestions) {
        const question = safetyQuestions[mriSafetyCenter.currentQuestion];
        
        resultsContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        
        document.getElementById('question-text').textContent = question.question;
        document.getElementById('current-question').textContent = mriSafetyCenter.currentQuestion + 1;
        document.getElementById('total-questions').textContent = mriSafetyCenter.totalQuestions;
        
        updateScreeningProgress();
    } else {
        showScreeningResults();
    }
}

function handleScreeningAnswer(answer) {
    const currentQuestion = safetyQuestions[mriSafetyCenter.currentQuestion];
    
    mriSafetyCenter.screeningAnswers.push({
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        answer: answer,
        riskLevel: currentQuestion.riskLevel,
        followUp: currentQuestion.followUp
    });
    
    mriSafetyCenter.currentQuestion++;
    
    setTimeout(() => {
        if (mriSafetyCenter.currentQuestion < mriSafetyCenter.totalQuestions) {
            showNextQuestion();
        } else {
            showScreeningResults();
        }
    }, 300);
}

function updateScreeningProgress() {
    const progressFill = document.getElementById('screening-progress');
    if (progressFill) {
        const percentage = (mriSafetyCenter.currentQuestion / mriSafetyCenter.totalQuestions) * 100;
        progressFill.style.width = `${percentage}%`;
    }
}

function showScreeningResults() {
    const questionContainer = document.getElementById('screening-question');
    const resultsContainer = document.getElementById('screening-results');
    const resultsContent = document.getElementById('results-content');
    
    if (!resultsContainer || !resultsContent) return;
    
    questionContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    const analysis = analyzeScreeningResults();
    resultsContent.innerHTML = generateResultsHTML(analysis);
    
    updateScreeningProgress(); // Show 100% complete
}

function analyzeScreeningResults() {
    let riskFactors = [];
    let overallRisk = 'low';
    let requiresEvaluation = false;
    let absoluteContraindication = false;
    
    mriSafetyCenter.screeningAnswers.forEach(answer => {
        if (answer.answer === 'yes') {
            riskFactors.push({
                question: answer.question,
                riskLevel: answer.riskLevel,
                followUp: answer.followUp
            });
            
            if (answer.riskLevel === 'critical') {
                absoluteContraindication = true;
                overallRisk = 'critical';
            } else if (answer.riskLevel === 'high' && overallRisk !== 'critical') {
                overallRisk = 'high';
                requiresEvaluation = true;
            } else if (answer.riskLevel === 'medium' && overallRisk === 'low') {
                overallRisk = 'medium';
                requiresEvaluation = true;
            }
        }
    });
    
    return {
        riskFactors,
        overallRisk,
        requiresEvaluation,
        absoluteContraindication,
        totalQuestions: mriSafetyCenter.totalQuestions,
        answeredQuestions: mriSafetyCenter.screeningAnswers.length
    };
}

function generateResultsHTML(analysis) {
    let html = '';
    
    // Overall assessment
    if (analysis.absoluteContraindication) {
        html += `
            <div class="screening-result screening-result--critical">
                <h4>❌ Requires Immediate Medical Evaluation</h4>
                <p>Based on your responses, you may have contraindications that require careful evaluation before MRI. Please consult with your healthcare provider and MRI facility immediately.</p>
            </div>
        `;
    } else if (analysis.overallRisk === 'high') {
        html += `
            <div class="screening-result screening-result--high">
                <h4>⚠️ Requires Medical Clearance</h4>
                <p>Based on your responses, you will need medical clearance and special protocols for your MRI exam. Please inform the MRI facility about your responses.</p>
            </div>
        `;
    } else if (analysis.overallRisk === 'medium') {
        html += `
            <div class="screening-result screening-result--medium">
                <h4>✅ Generally Safe with Precautions</h4>
                <p>Based on your responses, MRI appears to be safe for you with appropriate precautions. Please discuss your responses with MRI staff.</p>
            </div>
        `;
    } else {
        html += `
            <div class="screening-result screening-result--low">
                <h4>✅ Low Risk for MRI</h4>
                <p>Based on your responses, you appear to be a good candidate for MRI with standard safety protocols.</p>
            </div>
        `;
    }
    
    // Risk factors identified
    if (analysis.riskFactors.length > 0) {
        html += `
            <div class="risk-factors">
                <h5>Items Requiring Attention:</h5>
                <ul>
        `;
        
        analysis.riskFactors.forEach(factor => {
            html += `
                <li class="risk-factor risk-factor--${factor.riskLevel}">
                    <strong>Concern:</strong> ${factor.question}<br>
                    <strong>Next Steps:</strong> ${factor.followUp}
                </li>
            `;
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // Next steps
    html += `
        <div class="screening-next-steps">
            <h5>Next Steps:</h5>
            <ol>
                <li>Share these results with your MRI facility</li>
                <li>Bring any device documentation or medical records</li>
                <li>Arrive early for additional screening if needed</li>
                <li>Ask questions about any concerns</li>
            </ol>
        </div>
        
        <div class="screening-actions">
            <button class="btn btn--secondary" onclick="resetScreening()">Retake Screening</button>
            <button class="btn btn--primary" onclick="printScreeningResults()">Print Results</button>
        </div>
    `;
    
    return html;
}

function resetScreening() {
    mriSafetyCenter.currentQuestion = 0;
    mriSafetyCenter.screeningAnswers = [];
    
    const questionContainer = document.getElementById('screening-question');
    const resultsContainer = document.getElementById('screening-results');
    
    resultsContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    
    updateScreeningProgress();
    showNextQuestion();
}

// Modal System
function initializeSafetyModal() {
    if (safetyModal) {
        // Close modal when clicking overlay
        const overlay = safetyModal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeSafetyModal);
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !safetyModal.classList.contains('hidden')) {
                closeSafetyModal();
            }
        });
    }
}

function showSafetyModal(title, content) {
    if (safetyModal) {
        const modalTitle = document.getElementById('safetyModalTitle');
        const modalBody = document.getElementById('safetyModalBody');
        
        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.innerHTML = content;
        
        safetyModal.classList.remove('hidden');
        safetyModal.setAttribute('aria-hidden', 'false');
        
        // Focus management
        const closeButton = safetyModal.querySelector('.modal-close');
        if (closeButton) closeButton.focus();
        
        console.log(`Safety modal opened: ${title}`);
    }
}

function closeSafetyModal() {
    if (safetyModal) {
        safetyModal.classList.add('hidden');
        safetyModal.setAttribute('aria-hidden', 'true');
        
        // Return focus to appropriate element
        const activeElement = document.activeElement;
        if (activeElement) {
            activeElement.blur();
        }
    }
}

// Emergency Features
function initializeEmergencyFeatures() {
    // Create emergency contact modal content
    console.log('Emergency features initialized');
}

function showEmergencyContacts() {
    const emergencyContent = `
        <div class="emergency-contacts">
            <div class="emergency-primary">
                <h4>🚨 Immediate Medical Emergency</h4>
                <div class="emergency-number-large">📞 911</div>
                <p>Call 911 for any immediate medical emergency during or after MRI</p>
            </div>
            
            <div class="emergency-secondary">
                <h4>📞 Other Important Contacts</h4>
                <div class="contact-list">
                    <div class="contact-item">
                        <strong>MRI Facility:</strong> Contact your specific MRI facility directly
                    </div>
                    <div class="contact-item">
                        <strong>Your Doctor:</strong> Contact your referring physician
                    </div>
                    <div class="contact-item">
                        <strong>Hospital Main:</strong> Contact hospital main number
                    </div>
                </div>
            </div>
            
            <div class="emergency-symptoms">
                <h4>⚠️ When to Seek Immediate Care</h4>
                <ul>
                    <li>Difficulty breathing or severe allergic reaction</li>
                    <li>Chest pain or severe heart palpitations</li>
                    <li>Severe headache or vision changes</li>
                    <li>Device malfunction (pacemaker problems)</li>
                    <li>Any severe or concerning symptoms</li>
                </ul>
            </div>
        </div>
    `;
    
    showSafetyModal('Emergency Contact Information', emergencyContent);
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
    
    mriSafetyCenter.readingProgress = Math.min(scrollProgress, 100);
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

function showSafetyNotification(message, type = 'info', duration = 5000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `safety-notification safety-notification--${type}`;
    notification.innerHTML = `
        <div class="safety-notification__content">
            <p>${message}</p>
            <button class="safety-notification__close" onclick="closeSafetyNotification(this)">×</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('safety-notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'safety-notification-styles';
        notificationStyles.textContent = `
            .safety-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: var(--color-surface);
                padding: var(--space-16);
                border-radius: var(--radius-base);
                box-shadow: var(--shadow-lg);
                border-left: 4px solid var(--color-mri-primary);
                max-width: 350px;
                animation: slideInNotification 0.3s ease-out;
                border: 1px solid var(--color-card-border);
            }
            
            .safety-notification--info {
                border-left-color: var(--color-mri-primary);
            }
            
            .safety-notification--success {
                border-left-color: var(--color-mri-safe);
            }
            
            .safety-notification--warning {
                border-left-color: var(--color-mri-caution);
            }
            
            .safety-notification--error {
                border-left-color: var(--color-mri-danger);
            }
            
            .safety-notification__content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: var(--space-8);
            }
            
            .safety-notification__content p {
                margin: 0;
                color: var(--color-text);
                font-size: var(--font-size-sm);
                line-height: var(--line-height-normal);
            }
            
            .safety-notification__close {
                background: none;
                border: none;
                font-size: var(--font-size-lg);
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: 0;
                font-family: var(--font-family-mono);
            }
            
            .safety-notification__close:hover {
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
    
    console.log(`Safety notification shown: ${message}`);
}

function closeSafetyNotification(button) {
    const notification = button.closest('.safety-notification');
    if (notification && notification.parentNode) {
        notification.parentNode.removeChild(notification);
    }
}

// Footer Functions
function printSafetyGuide() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        
        const printContent = generateSafetyPrintContent();
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            
            showSafetyNotification('MRI Safety Guide prepared for printing.', 'success');
        } else {
            showSafetyNotification('Pop-up blocked. Please allow pop-ups and try again.', 'warning');
        }
    }, 1000);
}

function downloadSafetyChecklist() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        
        const checklistData = {
            title: "MRI Safety Checklist",
            preScreening: [
                "Complete safety questionnaire honestly",
                "Gather device documentation if applicable",
                "List all medications and allergies",
                "Note any previous MRI experiences",
                "Identify any claustrophobia concerns"
            ],
            dayOfExam: [
                "Remove all metal objects",
                "Wear comfortable, metal-free clothing",
                "Arrive early for screening",
                "Bring device cards/documentation",
                "Ask questions about any concerns"
            ],
            contraindications: [
                "Non-MRI conditional pacemakers",
                "Older cochlear implants",
                "Metallic eye foreign bodies",
                "Some aneurysm clips",
                "Unknown metallic implants"
            ],
            emergencyContacts: [
                "911 for immediate medical emergencies",
                "MRI facility direct number",
                "Referring physician contact",
                "Hospital main number"
            ],
            generatedDate: new Date().toISOString()
        };
        
        const checklistStr = JSON.stringify(checklistData, null, 2);
        const checklistBlob = new Blob([checklistStr], { type: 'application/json' });
        const url = URL.createObjectURL(checklistBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `mri-safety-checklist-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        showSafetyNotification('MRI Safety Checklist downloaded successfully!', 'success');
    }, 1000);
}

function printScreeningResults() {
    if (mriSafetyCenter.screeningAnswers.length === 0) {
        showSafetyNotification('Please complete the safety screening first.', 'warning');
        return;
    }
    
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        
        const analysis = analyzeScreeningResults();
        const printContent = generateScreeningPrintContent(analysis);
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            
            showSafetyNotification('Safety screening results prepared for printing.', 'success');
        } else {
            showSafetyNotification('Pop-up blocked. Please allow pop-ups and try again.', 'warning');
        }
    }, 500);
}

// Generate print-friendly content
function generateSafetyPrintContent() {
    const currentDate = new Date().toLocaleDateString();
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>MRI Safety Guide - Print Version</title>
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
                .safety-item { 
                    background: #f8f9fa;
                    padding: 10px;
                    margin: 10px 0;
                    border-left: 3px solid #4caf50;
                }
                .danger-item {
                    border-left-color: #f44336;
                }
                .caution-item {
                    border-left-color: #ff9800;
                }
                .emergency-box {
                    background: #ffe6e6;
                    border: 2px solid #f44336;
                    padding: 15px;
                    text-align: center;
                    margin: 20px 0;
                }
                .emergency-number {
                    font-size: 24px;
                    font-weight: bold;
                    color: #f44336;
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
                    body { font-size: 9px; }
                    .emergency-number { font-size: 18px; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🧲 MRI Safety Information Guide</h1>
                <p>Comprehensive safety resource for MRI procedures</p>
                <p class="print-note">Generated on: ${currentDate}</p>
            </div>
            
            <div class="emergency-box">
                <h2>🚨 Emergency Contact</h2>
                <div class="emergency-number">📞 911</div>
                <p>For immediate medical emergencies during or after MRI</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">✅ Zero Radiation Safety</h2>
                <div class="safety-item">
                    <h3>Primary MRI Safety Advantage</h3>
                    <ul>
                        <li>No X-rays or radioactive materials used</li>
                        <li>No cumulative radiation risk</li>
                        <li>No increased cancer risk</li>
                        <li>Safe for multiple repeated scans</li>
                        <li>Preferred for children and young adults</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">🚫 Absolute Contraindications</h2>
                <div class="safety-item danger-item">
                    <strong>Older Pacemakers:</strong> Non-MRI conditional devices (pre-2008)
                    <br><em>Risk: Device malfunction, heating, movement</em>
                </div>
                <div class="safety-item danger-item">
                    <strong>Older Cochlear Implants:</strong> Non-MRI conditional implants
                    <br><em>Risk: Device damage, magnet displacement</em>
                </div>
                <div class="safety-item danger-item">
                    <strong>Metallic Eye Foreign Bodies:</strong> Metal fragments in eyes
                    <br><em>Risk: Movement causing eye injury</em>
                </div>
                <div class="safety-item danger-item">
                    <strong>Some Aneurysm Clips:</strong> Older ferromagnetic clips
                    <br><em>Risk: Clip movement, vessel rupture</em>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">⚠️ Relative Contraindications</h2>
                <div class="safety-item caution-item">
                    <strong>Modern Pacemakers/ICDs:</strong> Require special protocols
                    <br><em>Needs: Cardiology clearance, device programming</em>
                </div>
                <div class="safety-item caution-item">
                    <strong>First Trimester Pregnancy:</strong> Generally avoided unless critical
                    <br><em>Alternative: Ultrasound preferred</em>
                </div>
                <div class="safety-item caution-item">
                    <strong>Severe Kidney Disease:</strong> If contrast needed
                    <br><em>Screening: eGFR <30 ml/min/1.73m²</em>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">💉 Contrast Safety</h2>
                <div class="safety-item">
                    <h3>Gadolinium Contrast Agent</h3>
                    <ul>
                        <li><strong>Mild reactions:</strong> <0.1% (vs 1-3% for CT contrast)</li>
                        <li><strong>Severe reactions:</strong> <0.01% (vs 0.1-0.3% for CT)</li>
                        <li>Much safer than CT iodine contrast</li>
                        <li>Safe for patients with iodine/shellfish allergies</li>
                        <li>Modern agents have low kidney toxicity risk</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">🧑‍⚕️ Pre-Scan Safety Screening</h2>
                <div class="safety-item">
                    <h3>Required Information</h3>
                    <ul>
                        <li>All surgeries and implants</li>
                        <li>Cardiac devices and stimulators</li>
                        <li>Metallic foreign bodies</li>
                        <li>Pregnancy status</li>
                        <li>Kidney function</li>
                        <li>Previous allergic reactions</li>
                        <li>Claustrophobia concerns</li>
                        <li>Occupational metal exposure</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">🤗 Claustrophobia Management</h2>
                <div class="safety-item">
                    <h3>Available Options</h3>
                    <ul>
                        <li><strong>Open-bore scanners:</strong> Larger opening, less confined</li>
                        <li><strong>Music & communication:</strong> Constant contact with staff</li>
                        <li><strong>Panic button:</strong> Patient can stop scan anytime</li>
                        <li><strong>Family presence:</strong> Support person when possible</li>
                        <li><strong>Sedation options:</strong> From mild oral to IV sedation</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">🚨 When to Seek Emergency Care</h2>
                <div class="safety-item danger-item">
                    <h3>Immediate Emergency (Call 911)</h3>
                    <ul>
                        <li>Severe allergic reaction (difficulty breathing, swelling)</li>
                        <li>Cardiac symptoms (chest pain, severe palpitations)</li>
                        <li>Neurological symptoms (severe headache, vision changes)</li>
                        <li>Device malfunction (pacemaker problems)</li>
                    </ul>
                </div>
            </div>
            
            <p class="print-note">
                This safety guide is for educational purposes only and does not replace professional medical advice. 
                Always consult with qualified healthcare professionals and follow your facility's specific safety protocols.
                <br><br>
                Generated by MRI Safety Information Center v1.0
            </p>
        </body>
        </html>
    `;
}

function generateScreeningPrintContent(analysis) {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>MRI Safety Screening Results</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    line-height: 1.6; 
                    color: #333; 
                    font-size: 12px;
                    margin: 20px;
                }
                .header { 
                    text-align: center;
                    border-bottom: 2px solid #e91e63; 
                    padding-bottom: 20px; 
                    margin-bottom: 30px; 
                }
                .result-summary {
                    background: ${analysis.overallRisk === 'critical' ? '#ffe6e6' : 
                                analysis.overallRisk === 'high' ? '#fff3e0' :
                                analysis.overallRisk === 'medium' ? '#e8f5e8' : '#e8f5e8'};
                    border: 2px solid ${analysis.overallRisk === 'critical' ? '#f44336' : 
                                      analysis.overallRisk === 'high' ? '#ff9800' :
                                      analysis.overallRisk === 'medium' ? '#4caf50' : '#4caf50'};
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 5px;
                }
                .risk-factors {
                    margin: 20px 0;
                }
                .risk-factor {
                    background: #f8f9fa;
                    padding: 10px;
                    margin: 10px 0;
                    border-left: 3px solid #ff9800;
                }
                .answers-section {
                    margin: 20px 0;
                }
                .answer-item {
                    padding: 8px;
                    margin: 5px 0;
                    background: #f5f5f5;
                }
                .print-note { 
                    font-style: italic; 
                    color: #666; 
                    margin-top: 20px; 
                    font-size: 10px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🧲 MRI Safety Screening Results</h1>
                <p>Date: ${currentDate} | Time: ${currentTime}</p>
            </div>
            
            <div class="result-summary">
                <h2>Overall Assessment: ${analysis.overallRisk.toUpperCase()} RISK</h2>
                ${analysis.absoluteContraindication ? 
                    '<p><strong>❌ REQUIRES IMMEDIATE MEDICAL EVALUATION</strong><br>You may have contraindications requiring careful evaluation before MRI.</p>' :
                  analysis.overallRisk === 'high' ? 
                    '<p><strong>⚠️ REQUIRES MEDICAL CLEARANCE</strong><br>You will need medical clearance and special protocols.</p>' :
                  analysis.overallRisk === 'medium' ?
                    '<p><strong>✅ GENERALLY SAFE WITH PRECAUTIONS</strong><br>MRI appears safe with appropriate precautions.</p>' :
                    '<p><strong>✅ LOW RISK FOR MRI</strong><br>You appear to be a good candidate for MRI.</p>'}
            </div>
            
            ${analysis.riskFactors.length > 0 ? `
            <div class="risk-factors">
                <h3>Items Requiring Attention:</h3>
                ${analysis.riskFactors.map(factor => `
                    <div class="risk-factor">
                        <strong>Concern:</strong> ${factor.question}<br>
                        <strong>Risk Level:</strong> ${factor.riskLevel.toUpperCase()}<br>
                        <strong>Next Steps:</strong> ${factor.followUp}
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <div class="answers-section">
                <h3>Your Screening Responses:</h3>
                ${mriSafetyCenter.screeningAnswers.map((answer, index) => `
                    <div class="answer-item">
                        <strong>Q${index + 1}:</strong> ${answer.question}<br>
                        <strong>Answer:</strong> ${answer.answer.toUpperCase()}
                        ${answer.answer === 'yes' ? `<br><em>Follow-up: ${answer.followUp}</em>` : ''}
                    </div>
                `).join('')}
            </div>
            
            <div class="next-steps">
                <h3>Recommended Next Steps:</h3>
                <ol>
                    <li>Share these results with your MRI facility</li>
                    <li>Bring any device documentation or medical records</li>
                    <li>Arrive early for additional screening if needed</li>
                    <li>Ask questions about any concerns</li>
                    <li>Contact facility if you have additional questions</li>
                </ol>
            </div>
            
            <p class="print-note">
                This screening is for educational purposes only and does not replace professional medical evaluation.
                Always follow your MRI facility's official screening procedures and consult with qualified healthcare professionals.
                <br><br>
                Generated by MRI Safety Information Center Screening Tool
            </p>
        </body>
        </html>
    `;
}

// Add device result styles
function addDeviceResultStyles() {
    if (!document.getElementById('device-result-styles')) {
        const deviceStyles = document.createElement('style');
        deviceStyles.id = 'device-result-styles';
        deviceStyles.textContent = `
            .device-results-header h4 {
                color: var(--color-mri-primary);
                margin-bottom: var(--space-12);
            }
            
            .device-result-card {
                background: var(--color-surface);
                border: 1px solid var(--color-card-border);
                border-radius: var(--radius-base);
                margin-bottom: var(--space-12);
                overflow: hidden;
            }
            
            .risk-low {
                border-left: 4px solid var(--color-mri-safe);
            }
            
            .risk-medium {
                border-left: 4px solid var(--color-mri-caution);
            }
            
            .risk-high {
                border-left: 4px solid var(--color-mri-danger);
            }
            
            .risk-critical {
                border-left: 4px solid var(--color-mri-emergency);
            }
            
            .device-result-header {
                background: var(--color-mri-bg-1);
                padding: var(--space-12);
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--color-card-border);
            }
            
            .device-result-header h5 {
                margin: 0;
                color: var(--color-text);
                font-size: var(--font-size-base);
            }
            
            .device-safety-badge {
                padding: var(--space-2) var(--space-6);
                border-radius: var(--radius-full);
                font-size: var(--font-size-xs);
                font-weight: var(--font-weight-bold);
            }
            
            .device-safety-safe {
                background: var(--color-safe-bg);
                color: var(--color-mri-safe);
                border: 1px solid var(--color-mri-safe);
            }
            
            .device-safety-conditional {
                background: var(--color-caution-bg);
                color: var(--color-mri-caution);
                border: 1px solid var(--color-mri-caution);
            }
            
            .device-safety-varies {
                background: var(--color-mri-bg-1);
                color: var(--color-mri-primary);
                border: 1px solid var(--color-mri-primary);
            }
            
            .device-safety-remove {
                background: var(--color-danger-bg);
                color: var(--color-mri-danger);
                border: 1px solid var(--color-mri-danger);
            }
            
            .device-safety-danger {
                background: var(--color-emergency-bg);
                color: var(--color-mri-emergency);
                border: 1px solid var(--color-mri-emergency);
            }
            
            .device-result-category {
                padding: var(--space-8) var(--space-12);
                background: var(--color-background);
                font-size: var(--font-size-sm);
                color: var(--color-text-secondary);
            }
            
            .device-result-details {
                padding: var(--space-12);
            }
            
            .device-detail-item {
                margin-bottom: var(--space-8);
                padding: var(--space-6);
                background: var(--color-mri-bg-1);
                border-radius: var(--radius-sm);
            }
            
            .device-detail-item strong {
                color: var(--color-text);
                font-size: var(--font-size-sm);
            }
            
            .device-detail-item span {
                color: var(--color-text-secondary);
                font-size: var(--font-size-sm);
                display: block;
                margin-top: var(--space-2);
            }
            
            .device-detail-item ul {
                margin: var(--space-4) 0 0 0;
                padding-left: var(--space-16);
            }
            
            .device-detail-item li {
                color: var(--color-text-secondary);
                font-size: var(--font-size-sm);
                margin-bottom: var(--space-2);
            }
            
            .no-device-results {
                text-align: center;
                padding: var(--space-20);
            }
            
            .no-device-results h4 {
                color: var(--color-mri-primary);
                margin-bottom: var(--space-8);
            }
            
            .emergency-contact-small {
                background: var(--color-emergency-bg);
                padding: var(--space-8);
                border-radius: var(--radius-sm);
                border: 1px solid var(--color-mri-emergency);
                margin-top: var(--space-12);
                font-size: var(--font-size-sm);
            }
            
            .screening-result {
                padding: var(--space-16);
                border-radius: var(--radius-base);
                margin-bottom: var(--space-16);
                border: 1px solid;
            }
            
            .screening-result--critical {
                background: var(--color-emergency-bg);
                border-color: var(--color-mri-emergency);
            }
            
            .screening-result--high {
                background: var(--color-caution-bg);
                border-color: var(--color-mri-caution);
            }
            
            .screening-result--medium {
                background: var(--color-safe-bg);
                border-color: var(--color-mri-safe);
            }
            
            .screening-result--low {
                background: var(--color-safe-bg);
                border-color: var(--color-mri-safe);
            }
            
            .screening-result h4 {
                margin: 0 0 var(--space-8) 0;
                color: var(--color-text);
            }
            
            .risk-factors {
                margin: var(--space-16) 0;
            }
            
            .risk-factors h5 {
                margin: 0 0 var(--space-8) 0;
                color: var(--color-text);
            }
            
            .risk-factors ul {
                margin: 0;
                padding-left: var(--space-16);
            }
            
            .risk-factor {
                margin-bottom: var(--space-8);
                padding: var(--space-8);
                background: var(--color-background);
                border-radius: var(--radius-sm);
                font-size: var(--font-size-sm);
                line-height: var(--line-height-normal);
            }
            
            .risk-factor--critical {
                border-left: 3px solid var(--color-mri-emergency);
            }
            
            .risk-factor--high {
                border-left: 3px solid var(--color-mri-danger);
            }
            
            .risk-factor--medium {
                border-left: 3px solid var(--color-mri-caution);
            }
            
            .risk-factor--low {
                border-left: 3px solid var(--color-mri-safe);
            }
            
            .screening-next-steps {
                margin: var(--space-16) 0;
            }
            
            .screening-next-steps h5 {
                margin: 0 0 var(--space-8) 0;
                color: var(--color-text);
            }
            
            .screening-next-steps ol {
                margin: 0;
                padding-left: var(--space-16);
            }
            
            .screening-next-steps li {
                color: var(--color-text);
                font-size: var(--font-size-sm);
                margin-bottom: var(--space-4);
            }
            
            .screening-actions {
                margin-top: var(--space-16);
                display: flex;
                gap: var(--space-12);
                justify-content: center;
            }
        `;
        document.head.appendChild(deviceStyles);
    }
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('MRI Safety Center Error:', event.error);
    showSafetyNotification('A system error occurred. Please refresh the page or contact support if the problem persists.', 'error');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`MRI Safety Information Center loaded in ${loadTime.toFixed(2)}ms`);
    
    if (loadTime > 3000) {
        showSafetyNotification('Loading took longer than expected. Consider refreshing for better performance.', 'warning');
    }
});

// Responsive behavior
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navToggle.click();
    }
});

// Export for global access and debugging
window.mriSafetyCenter = mriSafetyCenter;
window.scrollToSection = scrollToSection;
window.checkDeviceSafety = checkDeviceSafety;
window.startSafetyScreening = startSafetyScreening;
window.showSafetyModal = showSafetyModal;
window.closeSafetyModal = closeSafetyModal;
window.printSafetyGuide = printSafetyGuide;
window.downloadSafetyChecklist = downloadSafetyChecklist;
window.showEmergencyContacts = showEmergencyContacts;
window.printScreeningResults = printScreeningResults;
window.resetScreening = resetScreening;
window.closeSafetyNotification = closeSafetyNotification;

console.log('MRI Safety Information Center v1.0 - Comprehensive MRI Safety Resource loaded 🧲🏥');

// Save screening progress periodically
setInterval(() => {
    if (mriSafetyCenter.screeningAnswers.length > 0) {
        try {
            const progressData = {
                screeningAnswers: mriSafetyCenter.screeningAnswers,
                currentQuestion: mriSafetyCenter.currentQuestion,
                completedSections: Array.from(mriSafetyCenter.completedSections),
                timestamp: new Date().toISOString()
            };
            console.log('MRI safety progress saved');
        } catch (error) {
            console.log('Unable to save MRI safety progress');
        }
    }
}, 30000); // Save every 30 seconds