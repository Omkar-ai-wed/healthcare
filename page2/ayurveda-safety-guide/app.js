// Ayurveda Safety Information Center JavaScript - Fixed Version

// Global application state and safety data
const ayurvedaSafetyApp = {
    // Safety data from the provided JSON
    safetyData: {
        overview: {
            mission: "Ayurvedic dosha assessment and lifestyle recommendations should always prioritize safety, medical collaboration, and informed decision-making. This safety guide ensures responsible practice while honoring traditional Ayurvedic wisdom.",
            keySafetyPrinciples: [
                "Medical collaboration - Ayurveda complements, never replaces, medical care",
                "Professional guidance - Qualified practitioners for personalized recommendations",
                "Gradual implementation - Slow, mindful changes for sustainable results", 
                "Individual responsibility - Personal accountability for health decisions",
                "Cultural respect - Honoring traditional knowledge with appropriate context"
            ],
            safetyStatistics: {
                medicalSupervision: "Required for 40+ health conditions",
                herbInteractions: "200+ documented drug-herb interactions",
                professionalConsultation: "Recommended for 60% of users",
                gradualImplementation: "Reduces adverse reactions by 80%",
                qualifiedPractitioners: "1000+ certified professionals nationwide"
            }
        },

        emergencyContacts: {
            medical: { number: "911", description: "Life-threatening emergencies", availability: "24/7" },
            poison: { number: "1-800-222-1222", description: "Herb/supplement poisoning", availability: "24/7" },
            crisis: { number: "988", description: "Suicide & Crisis Lifeline", availability: "24/7" },
            healthcare: { number: "Contact Primary Care", description: "Non-emergency medical questions", availability: "Business hours" }
        },

        drugHerbInteractions: {
            bloodThinners: {
                avoid: ["Garlic", "Ginkgo", "Turmeric in large amounts"],
                monitor: "INR levels more frequently",
                action: "Consult physician before adding any herbs"
            },
            diabetesMedications: {
                caution: ["Bitter melon", "Fenugreek", "Gymnema"],
                monitor: "Blood glucose levels closely",
                action: "Medication doses may need modification"
            },
            bloodPressureDrugs: {
                avoid: ["High sodium herbs", "Excessive licorice"],
                monitor: "Blood pressure regularly",
                action: "Coordinate with prescribing physician"
            },
            psychiatricMedications: {
                caution: ["Mood-affecting herbs like St. John's wort"],
                monitor: "Changes in mental state",
                action: "Coordinate with mental health provider"
            }
        },

        safetyAssessmentQuestions: [
            {
                question: "Do you have any chronic medical conditions?",
                type: "multiple",
                options: ["Diabetes", "Hypertension", "Heart Disease", "Autoimmune Disorder", "Liver Disease", "Kidney Disease", "None"],
                riskLevel: "high"
            },
            {
                question: "Are you currently taking any medications?",
                type: "boolean",
                riskLevel: "medium"
            },
            {
                question: "Are you pregnant or breastfeeding?",
                type: "boolean",
                riskLevel: "high"
            },
            {
                question: "Have you had any recent surgeries?",
                type: "boolean",
                riskLevel: "medium"
            },
            {
                question: "Do you have any known allergies to herbs or supplements?",
                type: "boolean",
                riskLevel: "high"
            }
        ]
    },
    
    // Application state
    currentConsultationCategory: 'immediate',
    currentHerbalCategory: 'general',
    activeModal: null,
    safetyAssessmentResults: {},
    userHealthProfile: {}
};

// Utility Functions
function formatSafetyMessage(message, type = 'info') {
    const iconMap = {
        info: '🛡️',
        success: '✅',
        warning: '⚠️',
        error: '🚨',
        emergency: '🆘',
        ayurveda: '🕉️'
    };
    return `${iconMap[type]} ${message}`;
}

// Navigation Functions - Fixed
function scrollToSection(sectionId) {
    console.log('Scrolling to safety section:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 100; // Account for sticky nav
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        
        // Update active nav link
        updateActiveNavigation(sectionId);
        showSafetyNotification(`Navigated to: ${formatSectionName(sectionId)}`, 'info');
    } else {
        console.error('Safety section not found:', sectionId);
        showSafetyNotification(`Section ${sectionId} not found`, 'error');
    }
}

function updateActiveNavigation(sectionId) {
    document.querySelectorAll('.nav-section').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function formatSectionName(sectionId) {
    return sectionId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Tab Management Functions - Fixed
function showConsultationCategory(categoryType) {
    console.log('Show consultation category called:', categoryType);
    
    // Update tab buttons - remove active from all
    document.querySelectorAll('.consultation-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Show/hide consultation categories - hide all first
    document.querySelectorAll('.consultation-category').forEach(category => {
        category.classList.remove('active');
    });
    
    // Show the selected category
    const targetCategory = document.getElementById(`${categoryType}-consultation`);
    if (targetCategory) {
        targetCategory.classList.add('active');
        ayurvedaSafetyApp.currentConsultationCategory = categoryType;
        showSafetyNotification(`Switched to ${formatConsultationName(categoryType)} guidelines`, 'info');
    } else {
        console.error('Consultation category not found:', categoryType);
    }
}

function showHerbalCategory(categoryType) {
    console.log('Show herbal category called:', categoryType);
    
    // Update tab buttons - remove active from all
    document.querySelectorAll('.herbal-safety-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Show/hide herbal categories - hide all first
    document.querySelectorAll('.herbal-category').forEach(category => {
        category.classList.remove('active');
    });
    
    // Show the selected category
    const targetCategory = document.getElementById(`${categoryType}-herbal`);
    if (targetCategory) {
        targetCategory.classList.add('active');
        ayurvedaSafetyApp.currentHerbalCategory = categoryType;
        showSafetyNotification(`Switched to ${formatHerbalCategoryName(categoryType)} safety guidelines`, 'info');
    } else {
        console.error('Herbal category not found:', categoryType);
    }
}

function formatConsultationName(categoryType) {
    const names = {
        'immediate': 'Immediate Medical Attention',
        'supervision': 'Medical Supervision Required',
        'professional': 'Professional Ayurvedic Consultation',
        'collaboration': 'Healthcare Collaboration'
    };
    return names[categoryType] || categoryType;
}

function formatHerbalCategoryName(categoryType) {
    const names = {
        'general': 'General Herbal Safety',
        'interactions': 'Drug-Herb Interactions',
        'contraindications': 'Contraindications',
        'quality': 'Quality Standards'
    };
    return names[categoryType] || categoryType;
}

// Modal Management Functions - Fixed
function showModal(modalId) {
    console.log('Show safety modal called:', modalId);
    let modal = document.getElementById(modalId);
    
    // If modal doesn't exist, create it
    if (!modal) {
        if (modalId === 'safety-tools-modal') {
            createSafetyToolsModal();
            modal = document.getElementById(modalId);
        } else if (modalId === 'emergency-contacts-modal') {
            createEmergencyContactsModal();
            modal = document.getElementById(modalId);
        }
    }
    
    if (modal) {
        modal.classList.remove('hidden');
        ayurvedaSafetyApp.activeModal = modalId;
        
        // Focus management for accessibility
        setTimeout(() => {
            const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 100);
        
        showSafetyNotification('Safety interface opened', 'ayurveda');
    } else {
        console.error('Safety modal could not be created:', modalId);
        showSafetyNotification(`Modal ${modalId} not available`, 'error');
    }
}

function closeModal(modalId) {
    console.log('Close safety modal called:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        ayurvedaSafetyApp.activeModal = null;
        showSafetyNotification('Safety interface closed', 'info');
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
    ayurvedaSafetyApp.activeModal = null;
}

// Safety Tools Functions - Fixed
function showSafetyTools() {
    console.log('Show safety tools called');
    showModal('safety-tools-modal');
    showSafetyNotification('Safety assessment tools opened', 'success');
}

function showEmergencyContacts() {
    console.log('Show emergency contacts called');
    showModal('emergency-contacts-modal');
    showSafetyNotification('Emergency contacts displayed - call immediately if needed', 'emergency');
}

// Create modals if they don't exist - Fixed
function createSafetyToolsModal() {
    const existingModal = document.getElementById('safety-tools-modal');
    if (existingModal) return;
    
    const modalHTML = `
        <div id="safety-tools-modal" class="modal hidden" role="dialog" aria-labelledby="safety-tools-title">
            <div class="modal-backdrop" onclick="closeModal('safety-tools-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3 id="safety-tools-title">🛡️ Ayurveda Safety Assessment Tools</h3>
                    <button class="modal-close" onclick="closeModal('safety-tools-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="safety-tools-grid">
                        <div class="tool-card">
                            <div class="tool-icon">🔍</div>
                            <h4>Safety Screening Questionnaire</h4>
                            <p>Assess your readiness for Ayurvedic practices and identify potential risks</p>
                            <button class="btn btn--primary" onclick="showSafetyScreening()">Start Screening</button>
                        </div>
                        
                        <div class="tool-card">
                            <div class="tool-icon">💊</div>
                            <h4>Drug-Herb Interaction Checker</h4>
                            <p>Check for potential interactions between medications and herbal supplements</p>
                            <button class="btn btn--primary" onclick="showInteractionChecker()">Check Interactions</button>
                        </div>
                        
                        <div class="tool-card">
                            <div class="tool-icon">📋</div>
                            <h4>Health Profile Assessment</h4>
                            <p>Create a comprehensive health profile for safer Ayurvedic practice</p>
                            <button class="btn btn--primary" onclick="showHealthProfile()">Create Profile</button>
                        </div>
                        
                        <div class="tool-card">
                            <div class="tool-icon">👩‍⚕️</div>
                            <h4>Professional Consultation Finder</h4>
                            <p>Find qualified Ayurvedic practitioners in your area</p>
                            <button class="btn btn--primary" onclick="showPractitionerFinder()">Find Practitioners</button>
                        </div>
                        
                        <div class="tool-card">
                            <div class="tool-icon">📈</div>
                            <h4>Progress Monitoring Tool</h4>
                            <p>Track your health changes and responses to Ayurvedic practices</p>
                            <button class="btn btn--primary" onclick="showProgressMonitor()">Start Monitoring</button>
                        </div>
                        
                        <div class="tool-card">
                            <div class="tool-icon">🚨</div>
                            <h4>Emergency Action Plan</h4>
                            <p>Create a personalized emergency plan for adverse reactions</p>
                            <button class="btn btn--primary" onclick="showEmergencyPlan()">Create Plan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function createEmergencyContactsModal() {
    const existingModal = document.getElementById('emergency-contacts-modal');
    if (existingModal) return;
    
    const modalHTML = `
        <div id="emergency-contacts-modal" class="modal hidden" role="dialog" aria-labelledby="emergency-contacts-title">
            <div class="modal-backdrop" onclick="closeModal('emergency-contacts-modal')"></div>
            <div class="modal-content">
                <div class="modal-header emergency-header">
                    <h3 id="emergency-contacts-title">🚨 Emergency Contacts</h3>
                    <button class="modal-close" onclick="closeModal('emergency-contacts-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="emergency-contacts-quick">
                        <div class="quick-contact primary-emergency">
                            <div class="contact-info">
                                <div class="contact-title">🚨 Medical Emergency</div>
                                <div class="contact-number-large">911</div>
                                <div class="contact-desc">Life-threatening emergencies</div>
                            </div>
                            <button class="btn btn--primary" onclick="callEmergency('911')">Call Now</button>
                        </div>
                        
                        <div class="quick-contact">
                            <div class="contact-info">
                                <div class="contact-title">☎️ Poison Control</div>
                                <div class="contact-number-large">1-800-222-1222</div>
                                <div class="contact-desc">Herb/supplement poisoning</div>
                            </div>
                            <button class="btn btn--outline" onclick="callEmergency('18002221222')">Call Now</button>
                        </div>
                        
                        <div class="quick-contact">
                            <div class="contact-info">
                                <div class="contact-title">💬 Crisis Support</div>
                                <div class="contact-number-large">988</div>
                                <div class="contact-desc">Suicide & Crisis Lifeline</div>
                            </div>
                            <button class="btn btn--outline" onclick="callEmergency('988')">Call Now</button>
                        </div>
                    </div>
                    
                    <div class="emergency-warning">
                        <div class="warning-icon">⚠️</div>
                        <p><strong>When to Call Emergency Services:</strong> Severe allergic reactions, difficulty breathing, chest pain, loss of consciousness, severe abdominal pain, or any life-threatening symptoms.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Emergency Contact Functions - Fixed
function callEmergency(number) {
    console.log('Emergency call initiated:', number);
    const formattedNumber = formatPhoneNumber(number);
    
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.includes('Mobile')) {
        // On mobile devices, attempt to initiate call
        try {
            window.location.href = `tel:${number}`;
        } catch (e) {
            console.error('Could not initiate call:', e);
            showSafetyNotification('Please dial the number manually if automatic calling fails', 'warning');
        }
    } else {
        // On desktop, show instructions
        showSafetyNotification(`Emergency number: ${formattedNumber}. Please dial immediately.`, 'emergency');
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(formattedNumber).then(() => {
                showSafetyNotification('Emergency number copied to clipboard', 'success');
            }).catch(() => {
                console.log('Could not copy to clipboard');
            });
        }
    }
}

function formatPhoneNumber(number) {
    // Format phone numbers for display
    if (number === '911') return '911';
    if (number === '988') return '988';
    if (number === '18002221222') return '1-800-222-1222';
    return number;
}

// Placeholder functions for additional tools
function showSafetyScreening() {
    console.log('Show safety screening called');
    showSafetyNotification('Safety screening questionnaire would open here (demo)', 'ayurveda');
    closeModal('safety-tools-modal');
}

function showInteractionChecker() {
    console.log('Show interaction checker called');
    showSafetyNotification('Drug-herb interaction checker would open here (demo)', 'warning');
    closeModal('safety-tools-modal');
}

function showHealthProfile() {
    console.log('Show health profile called');
    showSafetyNotification('Health profile assessment would open here (demo)', 'info');
    closeModal('safety-tools-modal');
}

function showPractitionerFinder() {
    console.log('Show practitioner finder called');
    showSafetyNotification('Practitioner finder would open here (demo)', 'ayurveda');
    closeModal('safety-tools-modal');
}

function showProgressMonitor() {
    console.log('Show progress monitor called');
    showSafetyNotification('Progress monitoring tool would open here (demo)', 'info');
    closeModal('safety-tools-modal');
}

function showEmergencyPlan() {
    console.log('Show emergency plan called');
    showSafetyNotification('Emergency action plan generator would open here (demo)', 'emergency');
    closeModal('safety-tools-modal');
}

// Event Listeners Setup - Fixed
function setupSafetyEventListeners() {
    console.log('Setting up safety event listeners...');
    
    // Navigation smooth scrolling
    document.querySelectorAll('.nav-section').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });
    
    // Footer links
    document.querySelectorAll('.footer-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Modal close handlers
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Click outside modal to close
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
                ayurvedaSafetyApp.activeModal = null;
            }
        }
    });
    
    console.log('Safety event listeners set up successfully');
}

// Scroll-based navigation highlighting - Fixed
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.safety-section');
    const navLinks = document.querySelectorAll('.nav-section');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Notification System - Fixed
function showSafetyNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `safety-notification safety-notification--${type}`;
    
    const iconMap = {
        info: '🛡️',
        success: '✅',
        warning: '⚠️',
        error: '🚨',
        emergency: '🆘',
        ayurveda: '🕉️'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${iconMap[type] || '🛡️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Position notification - Fixed positioning
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2000;
        background: var(--color-surface);
        border: 2px solid var(--color-saffron);
        border-radius: var(--ayurveda-border-radius, 12px);
        padding: 12px 16px;
        box-shadow: 0 4px 20px rgba(139, 69, 19, 0.15);
        max-width: 400px;
        animation: slideInAyurveda 0.4s ease-out;
        font-size: 14px;
        line-height: 1.5;
    `;
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutAyurveda 0.4s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }
    }, 5000);
}

// Initialize the safety application - Fixed
function initializeAyurvedaSafetyApp() {
    console.log('Initializing Ayurveda Safety Information Center...');
    
    // Set up event listeners
    setupSafetyEventListeners();
    
    // Display safety data overview
    console.log('Ayurveda Safety Overview loaded:', {
        mission: ayurvedaSafetyApp.safetyData.overview.mission.substring(0, 100) + '...',
        principles: ayurvedaSafetyApp.safetyData.overview.keySafetyPrinciples.length + ' key principles',
        statistics: Object.keys(ayurvedaSafetyApp.safetyData.overview.safetyStatistics).length + ' safety metrics'
    });
    
    console.log('Ayurveda Safety Information Center initialized successfully');
}

// Scroll listener for navigation highlighting
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavOnScroll, 100);
});

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Ayurveda Safety App Error:', event.error);
    showSafetyNotification('A system error occurred. Safety information remains available. Please refresh if problems persist.', 'error');
});

// Performance Monitoring and Initialization
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Ayurveda Safety Information Center loaded in ${loadTime.toFixed(2)}ms`);
    
    // Show welcome notification after load
    setTimeout(() => {
        showSafetyNotification('🕉️ Safety Information Center loaded. Your wellbeing is our priority.', 'ayurveda');
    }, 1000);
    
    // Ensure all safety features are working
    const safetyFeaturesCheck = {
        navigationWorking: document.querySelectorAll('.nav-section').length > 0,
        emergencyContactsReady: typeof callEmergency === 'function',
        modalFunctionsReady: typeof showModal === 'function',
        safetyDataLoaded: ayurvedaSafetyApp.safetyData.overview.mission.length > 0,
        scrollFunctionReady: typeof scrollToSection === 'function'
    };
    
    console.log('Safety Features Status:', safetyFeaturesCheck);
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Ayurveda Safety Center...');
    initializeAyurvedaSafetyApp();
});

// Export functions to global scope for onclick handlers - Fixed and Complete
window.scrollToSection = scrollToSection;
window.showConsultationCategory = showConsultationCategory;
window.showHerbalCategory = showHerbalCategory;
window.showSafetyTools = showSafetyTools;
window.showEmergencyContacts = showEmergencyContacts;
window.showSafetyScreening = showSafetyScreening;
window.showInteractionChecker = showInteractionChecker;
window.showHealthProfile = showHealthProfile;
window.showPractitionerFinder = showPractitionerFinder;
window.showProgressMonitor = showProgressMonitor;
window.showEmergencyPlan = showEmergencyPlan;
window.showModal = showModal;
window.closeModal = closeModal;
window.callEmergency = callEmergency;

// Add notification and animation styles
const safetyStyle = document.createElement('style');
safetyStyle.textContent = `
    @keyframes slideInAyurveda {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutAyurveda {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .safety-notification {
        font-family: var(--font-family-base, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
        color: var(--color-text, #134252);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .notification-icon {
        font-size: 16px;
        flex-shrink: 0;
    }
    
    .notification-message {
        flex: 1;
        font-size: 14px;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #777;
        padding: 0;
        line-height: 1;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }
    
    .notification-close:hover {
        color: #333;
        background: rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(safetyStyle);

console.log('Ayurveda Safety Information Center JavaScript loaded successfully 🕉️🛡️⚕️');