// Healthcare Login & Authentication Interface - Interactive Features (Fixed Version)

// Global state management
const healthcareAuth = {
    selectedSystem: null,
    currentStep: 1,
    registrationData: {},
    selectedUserType: null,
    passwordStrength: 0,
    twoFactorEnabled: false,
    currentSection: 'welcome',
    notifications: [],
    emergencyContacts: {
        national: '112',
        ambulance: '108',
        poison: '1066',
        mental: '9152987821'
    }
};

// Healthcare system data
const healthcareData = {
    modern: {
        name: "Modern Healthcare",
        primaryColor: "#00bcd4",
        description: "Evidence-based medicine with advanced diagnostics and treatments",
        stats: {
            hospitals: "90% use AI tools",
            telemedicine: "340M consultations", 
            research: "FDA-approved devices"
        },
        roles: [
            {
                id: "modern-doctor",
                name: "Medical Doctor",
                specializations: ["Cardiology", "Neurology", "Oncology", "Pediatrics", "Surgery", "Internal Medicine", "Dermatology", "Radiology"]
            },
            {
                id: "modern-nurse", 
                name: "Registered Nurse",
                specializations: ["ICU", "Emergency", "Pediatric", "Surgical", "Community Health"]
            }
        ]
    },
    traditional: {
        name: "Traditional Healthcare",
        primaryColor: "#D4AF37",
        description: "Ancient wisdom systems with holistic mind-body healing approaches",
        stats: {
            ayurveda: "3000+ years",
            tcm: "2500+ years", 
            herbs: "1000+ remedies"
        },
        roles: [
            {
                id: "ayurveda-practitioner",
                name: "Ayurvedic Practitioner",
                specializations: ["Panchakarma", "Rasayana", "Kayachikitsa", "Shalakya", "Shalya", "Kaumarbhritya"]
            },
            {
                id: "tcm-practitioner",
                name: "TCM Practitioner", 
                specializations: ["Acupuncture", "Herbal Medicine", "Tuina Massage", "Cupping", "Moxibustion"]
            }
        ]
    }
};

// DOM elements
let loadingOverlay, notificationSystem, modalOverlay;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Healthcare Authentication Portal initializing...');
    
    // Get DOM elements
    loadingOverlay = document.getElementById('loading-overlay');
    notificationSystem = document.getElementById('notification-system');
    modalOverlay = document.getElementById('modal-overlay');
    
    // Setup all event listeners with explicit bindings
    setTimeout(() => {
        setupAllEventListeners();
        initializeFormValidation();
        showWelcome();
        console.log('Healthcare Authentication Portal initialized successfully');
        showNotification('Welcome to Healthcare Portal - Choose your system to continue', 'info');
    }, 100);
});

// Setup all event listeners with explicit bindings
function setupAllEventListeners() {
    console.log('Setting up event listeners...');
    
    // System selection cards
    const systemCards = document.querySelectorAll('.system-card');
    console.log('Found system cards:', systemCards.length);
    systemCards.forEach((card, index) => {
        const system = card.dataset.system;
        console.log(`Setting up system card ${index + 1}: ${system}`);
        
        // Remove existing listeners
        card.removeEventListener('click', handleSystemSelection);
        
        // Add new listeners
        card.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('System card clicked:', system);
            selectSystem(system);
        });
        
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.style.cursor = 'pointer';
    });
    
    // Emergency button - Fixed
    const emergencyBtn = document.getElementById('emergency-btn');
    if (emergencyBtn) {
        console.log('Setting up emergency button');
        emergencyBtn.removeEventListener('click', handleEmergencyClick);
        emergencyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Emergency button clicked');
            showEmergencyAccess();
        });
    }
    
    // Quick access buttons - Fixed
    setupQuickAccessButtons();
    
    // Back buttons - Fixed
    setupBackButtons();
    
    // Login form - Fixed
    setupLoginForm();
    
    // Registration forms - Fixed
    setupRegistrationForms();
    
    // Modal functionality
    setupModalFunctionality();
    
    // User role dropdown
    const userRoleSelect = document.getElementById('user-role');
    if (userRoleSelect) {
        userRoleSelect.addEventListener('change', updateRoleSpecificOptions);
    }
    
    console.log('All event listeners set up successfully');
}

function setupQuickAccessButtons() {
    const quickActions = document.querySelector('.quick-actions');
    if (quickActions) {
        const buttons = quickActions.querySelectorAll('.btn');
        buttons.forEach(btn => {
            const text = btn.textContent.toLowerCase();
            btn.removeEventListener('click', handleQuickAction);
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Quick action clicked:', text);
                
                if (text.includes('login')) {
                    showLogin();
                } else if (text.includes('registration')) {
                    showRegistration();
                } else if (text.includes('help')) {
                    showHelp();
                }
            });
        });
    }
}

function setupBackButtons() {
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(btn => {
        btn.removeEventListener('click', handleBackClick);
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Back button clicked');
            showWelcome();
        });
    });
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.removeEventListener('submit', handleLogin);
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted');
            handleLogin(e);
        });
    }
}

function setupRegistrationForms() {
    // Registration form step 1
    const regForm1 = document.getElementById('registration-form-1');
    if (regForm1) {
        regForm1.addEventListener('submit', function(e) {
            e.preventDefault();
            nextRegistrationStep(e, 2);
        });
    }
    
    // Registration form step 2
    const regForm2 = document.getElementById('registration-form-2');
    if (regForm2) {
        regForm2.addEventListener('submit', function(e) {
            e.preventDefault();
            nextRegistrationStep(e, 3);
        });
    }
    
    // Registration form step 3
    const regForm3 = document.getElementById('registration-form-3');
    if (regForm3) {
        regForm3.addEventListener('submit', function(e) {
            e.preventDefault();
            completeRegistration(e);
        });
    }
    
    // User type selection cards
    const userTypeCards = document.querySelectorAll('.user-type-card');
    userTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                const userType = radio.value;
                selectUserType(userType);
            }
        });
    });
}

function setupModalFunctionality() {
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // Modal close button
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
}

// Navigation Functions - Fixed
function showWelcome() {
    console.log('Showing welcome screen');
    hideAllSections();
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.classList.remove('hidden');
    }
    healthcareAuth.currentSection = 'welcome';
    document.body.className = '';
    healthcareAuth.selectedSystem = null;
}

function showLogin() {
    console.log('Showing login screen');
    hideAllSections();
    const loginSection = document.getElementById('login-section');
    if (loginSection) {
        loginSection.classList.remove('hidden');
    }
    healthcareAuth.currentSection = 'login';
    
    if (healthcareAuth.selectedSystem) {
        applySystemTheme(healthcareAuth.selectedSystem);
        updateLoginSystemIndicator();
    }
    
    setTimeout(() => {
        const emailField = document.getElementById('email');
        if (emailField) emailField.focus();
    }, 100);
}

function showRegistration() {
    console.log('Showing registration screen');
    hideAllSections();
    const registrationSection = document.getElementById('registration-section');
    if (registrationSection) {
        registrationSection.classList.remove('hidden');
    }
    healthcareAuth.currentSection = 'registration';
    showRegistrationStep(1);
}

function showEmergencyAccess() {
    console.log('Showing emergency access');
    hideAllSections();
    const emergencySection = document.getElementById('emergency-section');
    if (emergencySection) {
        emergencySection.classList.remove('hidden');
    }
    healthcareAuth.currentSection = 'emergency';
    showNotification('Emergency access activated. Critical healthcare resources available.', 'warning');
}

function hideAllSections() {
    const sections = ['welcome-screen', 'login-section', 'registration-section', 'forgot-password-section', 'emergency-section'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.add('hidden');
        }
    });
}

// System Selection - Fixed
function selectSystem(system) {
    console.log('Selecting system:', system);
    healthcareAuth.selectedSystem = system;
    
    const systemCards = document.querySelectorAll('.system-card');
    systemCards.forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.system === system) {
            card.classList.add('selected');
        }
    });
    
    applySystemTheme(system);
    
    setTimeout(() => {
        showLogin();
        showNotification(`${healthcareData[system].name} system selected`, 'success');
    }, 500);
}

function applySystemTheme(system) {
    const body = document.body;
    const loginSection = document.getElementById('login-section');
    
    body.classList.remove('modern-theme', 'traditional-theme');
    if (loginSection) {
        loginSection.classList.remove('modern-theme', 'traditional-theme');
    }
    
    if (system === 'modern') {
        body.classList.add('modern-theme');
        if (loginSection) loginSection.classList.add('modern-theme');
    } else if (system === 'traditional') {
        body.classList.add('traditional-theme');
        if (loginSection) loginSection.classList.add('traditional-theme');
    }
}

function updateLoginSystemIndicator() {
    const systemIcon = document.getElementById('login-system-icon');
    const systemName = document.getElementById('login-system-name');
    
    if (healthcareAuth.selectedSystem && systemIcon && systemName) {
        const systemData = healthcareData[healthcareAuth.selectedSystem];
        systemIcon.textContent = healthcareAuth.selectedSystem === 'modern' ? '🏥' : '🕉️';
        systemName.textContent = systemData.name;
    }
}

// Login Form Functions - Fixed
function handleLogin(event) {
    event.preventDefault();
    console.log('Processing login...');
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const userRole = formData.get('userRole');
    
    if (!email || !password || !userRole) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'warning');
        return;
    }
    
    const loginBtn = form.querySelector('.login-btn');
    setButtonLoading(loginBtn, true);
    
    setTimeout(() => {
        setButtonLoading(loginBtn, false);
        showNotification('Login successful! Redirecting to your dashboard...', 'success');
        
        setTimeout(() => {
            const systemName = healthcareAuth.selectedSystem ? healthcareData[healthcareAuth.selectedSystem].name : 'Healthcare';
            showNotification(`Welcome to ${systemName} Dashboard! (Demo Complete)`, 'success');
        }, 2000);
    }, 2000);
}

function updateRoleSpecificOptions() {
    const userRole = document.getElementById('user-role').value;
    const specializationGroup = document.getElementById('specialization-group');
    const specializationSelect = document.getElementById('specialization');
    
    if (!specializationGroup || !specializationSelect) return;
    
    specializationSelect.innerHTML = '<option value="">Select your specialization</option>';
    
    if (userRole && (userRole === 'doctor' || userRole === 'nurse' || userRole === 'practitioner')) {
        specializationGroup.classList.remove('hidden');
        
        let specializations = [];
        
        if (healthcareAuth.selectedSystem === 'modern') {
            if (userRole === 'doctor') {
                specializations = healthcareData.modern.roles[0].specializations;
            } else if (userRole === 'nurse') {
                specializations = healthcareData.modern.roles[1].specializations;
            }
        } else if (healthcareAuth.selectedSystem === 'traditional') {
            if (userRole === 'practitioner') {
                healthcareData.traditional.roles.forEach(role => {
                    specializations = specializations.concat(role.specializations);
                });
            }
        }
        
        specializations.forEach(spec => {
            const option = document.createElement('option');
            option.value = spec.toLowerCase().replace(/\s+/g, '-');
            option.textContent = spec;
            specializationSelect.appendChild(option);
        });
    } else {
        specializationGroup.classList.add('hidden');
    }
}

// Registration Functions
function showRegistrationStep(step) {
    const steps = document.querySelectorAll('.registration-step');
    steps.forEach(s => s.classList.remove('active'));
    
    const targetStep = document.getElementById(`registration-step-${step}`);
    if (targetStep) {
        targetStep.classList.add('active');
    }
    
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((ps, index) => {
        if (index + 1 <= step) {
            ps.classList.add('active');
        } else {
            ps.classList.remove('active');
        }
    });
    
    healthcareAuth.currentStep = step;
}

function nextRegistrationStep(event, nextStep) {
    event.preventDefault();
    console.log('Moving to registration step:', nextStep);
    
    const form = event.target;
    const formData = new FormData(form);
    
    if (!validateRegistrationStep(healthcareAuth.currentStep, formData)) {
        return;
    }
    
    for (let [key, value] of formData.entries()) {
        healthcareAuth.registrationData[key] = value;
    }
    
    showRegistrationStep(nextStep);
    showNotification(`Step ${healthcareAuth.currentStep} completed. Continue to step ${nextStep}.`, 'success');
}

function previousRegistrationStep(prevStep) {
    showRegistrationStep(prevStep);
}

function selectUserType(type) {
    console.log('Selecting user type:', type);
    healthcareAuth.selectedUserType = type;
    
    const cards = document.querySelectorAll('.user-type-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    const clickedCard = event.currentTarget;
    if (clickedCard) {
        clickedCard.classList.add('selected');
        const radio = clickedCard.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
    }
    
    const professionalCredentials = document.getElementById('professional-credentials');
    if (professionalCredentials) {
        if (type === 'healthcare-provider') {
            professionalCredentials.classList.remove('hidden');
        } else {
            professionalCredentials.classList.add('hidden');
        }
    }
    
    showNotification(`Selected user type: ${type.replace('-', ' ')}`, 'info');
}

function validateRegistrationStep(step, formData) {
    switch (step) {
        case 1:
            const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth'];
            for (let field of requiredFields) {
                if (!formData.get(field)) {
                    showNotification(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'warning');
                    return false;
                }
            }
            
            const email = formData.get('email');
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'warning');
                return false;
            }
            break;
            
        case 2:
            if (!healthcareAuth.selectedUserType) {
                showNotification('Please select your user type', 'warning');
                return false;
            }
            
            const systemPreferences = formData.getAll('systemPreference');
            if (systemPreferences.length === 0) {
                showNotification('Please select at least one healthcare system preference', 'warning');
                return false;
            }
            break;
    }
    
    return true;
}

function completeRegistration(event) {
    event.preventDefault();
    console.log('Completing registration');
    
    const form = event.target;
    const formData = new FormData(form);
    
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (!password || password.length < 8) {
        showNotification('Password must be at least 8 characters long', 'warning');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'warning');
        return;
    }
    
    if (!formData.get('termsPrivacy')) {
        showNotification('Please accept the Terms of Service and Privacy Policy', 'warning');
        return;
    }
    
    const submitBtn = form.querySelector('.registration-submit-btn');
    setButtonLoading(submitBtn, true);
    
    for (let [key, value] of formData.entries()) {
        healthcareAuth.registrationData[key] = value;
    }
    
    setTimeout(() => {
        setButtonLoading(submitBtn, false);
        
        if (healthcareAuth.selectedUserType === 'healthcare-provider') {
            showNotification('Registration submitted! Your professional credentials are being verified. You will receive an email within 5-7 business days.', 'success');
        } else {
            showNotification('Registration successful! Please check your email to verify your account.', 'success');
        }
        
        setTimeout(() => {
            showLogin();
        }, 3000);
    }, 3000);
}

// Emergency Functions - Fixed
function callEmergency(number) {
    console.log('Calling emergency number:', number);
    
    const confirmed = confirm(`Call emergency number ${number}?\n\nThis will attempt to open your phone's dialer.`);
    
    if (confirmed) {
        const link = document.createElement('a');
        link.href = `tel:${number}`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification(`Attempting to call ${number}. If your device doesn't support calling, please dial manually.`, 'info');
    }
}

function findNearestHospital() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Nearest hospital: City General Hospital, 2.3km away. Address: 123 Health Street. Phone: +91-XXXX-XXXXX', 'success');
    }, 2000);
}

function showHospitalList() {
    const hospitalList = `
        <h4>Nearby Hospitals</h4>
        <ul>
            <li><strong>City General Hospital</strong> - 2.3km - Emergency 24/7</li>
            <li><strong>Metro Medical Center</strong> - 3.1km - Multi-specialty</li>
            <li><strong>Apollo Healthcare</strong> - 4.2km - Private Hospital</li>
            <li><strong>Government Hospital</strong> - 5.0km - Public Healthcare</li>
        </ul>
    `;
    showModal('Nearby Hospitals', hospitalList);
}

// Additional emergency functions
function showPoisonInfo() {
    const poisonInfo = `
        <h4>Poison Control First Aid</h4>
        <div style="color: #dc3545; font-weight: bold; margin-bottom: 16px;">⚠️ Call Poison Control: 1066 immediately!</div>
        <ul>
            <li><strong>Do not induce vomiting</strong> unless told by poison control</li>
            <li>Remove any remaining poison from mouth</li>
            <li>If on skin, rinse with water for 15-20 minutes</li>
            <li>If in eyes, flush with clean water for 15 minutes</li>
            <li>Keep the poison container for identification</li>
            <li>Monitor breathing and pulse</li>
        </ul>
    `;
    showModal('Poison Control Information', poisonInfo);
}

function showFirstAid() {
    const firstAidInfo = `
        <h4>Basic First Aid Guidelines</h4>
        <div style="margin-bottom: 16px;"><strong>🚨 Always call emergency services for serious injuries!</strong></div>
        
        <h5>Cuts and Wounds:</h5>
        <ul>
            <li>Clean hands before treating</li>
            <li>Stop bleeding with direct pressure</li>
            <li>Clean wound with water</li>
            <li>Apply antiseptic and bandage</li>
        </ul>
        
        <h5>Burns:</h5>
        <ul>
            <li>Cool with running water for 10+ minutes</li>
            <li>Remove jewelry before swelling</li>
            <li>Cover with sterile gauze</li>
            <li>Do not break blisters</li>
        </ul>
    `;
    showModal('First Aid Guide', firstAidInfo);
}

function downloadFirstAid() {
    showNotification('First Aid PDF guide download initiated. Check your downloads folder.', 'info');
}

function findPharmacy() {
    showLoadingState();
    setTimeout(() => {
        hideLoadingState();
        showNotification('Found 3 nearby 24/7 pharmacies. Nearest: MedPlus Pharmacy, 1.1km away, Open 24 hours.', 'success');
    }, 1500);
}

function showBasicMeds() {
    const medsInfo = `
        <h4>Basic Emergency Medicines</h4>
        <div style="color: #dc3545; margin-bottom: 16px;">⚠️ Consult healthcare provider before taking any medication</div>
        
        <h5>Pain & Fever:</h5>
        <ul>
            <li><strong>Paracetamol</strong> - 500mg every 4-6 hours (max 4g/day)</li>
            <li><strong>Ibuprofen</strong> - 400mg every 6-8 hours with food</li>
        </ul>
        
        <h5>Allergic Reactions:</h5>
        <ul>
            <li><strong>Antihistamine</strong> - Follow package instructions</li>
            <li><strong>Severe allergies</strong> - Use EpiPen if prescribed</li>
        </ul>
    `;
    showModal('Basic Emergency Medicines', medsInfo);
}

// Utility and Helper Functions
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const toggle = field.nextElementSibling;
    if (!toggle) return;
    
    const icon = toggle.querySelector('.password-icon');
    if (!icon) return;
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.textContent = '🙈';
        toggle.setAttribute('aria-label', 'Hide password');
    } else {
        field.type = 'password';
        icon.textContent = '👁️';
        toggle.setAttribute('aria-label', 'Show password');
    }
}

function changeLanguage(language) {
    const languageNames = {
        en: 'English',
        hi: 'हिंदी',
        ta: 'தமிழ்',
        te: 'తెలుగు'
    };
    showNotification(`Language changed to ${languageNames[language]}`, 'info');
}

function showHelp() {
    const helpContent = `
        <h4>Healthcare Portal Help</h4>
        
        <h5>Getting Started:</h5>
        <ul>
            <li>Choose between Modern or Traditional Healthcare system</li>
            <li>Login with existing credentials or register as new user</li>
            <li>Select your role (Patient, Healthcare Provider, etc.)</li>
        </ul>
        
        <h5>Registration:</h5>
        <ul>
            <li>Complete all three steps of registration</li>
            <li>Healthcare providers need license verification</li>
            <li>Two-factor authentication recommended for security</li>
        </ul>
        
        <h5>Need Help?</h5>
        <ul>
            <li>Email: support@healthcare.gov.in</li>
            <li>Phone: 1800-XXX-XXXX (9 AM - 6 PM)</li>
            <li>Emergency Access available 24/7</li>
        </ul>
    `;
    showModal('Help & Support', helpContent);
}

function showTerms() {
    const termsContent = `
        <h4>Terms of Service</h4>
        
        <h5>Acceptance of Terms</h5>
        <p>By using this healthcare portal, you agree to these terms and conditions.</p>
        
        <h5>Medical Disclaimer</h5>
        <p>This portal provides information and tools for healthcare management. It does not provide medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals.</p>
        
        <h5>User Responsibilities</h5>
        <ul>
            <li>Provide accurate and current information</li>
            <li>Maintain confidentiality of login credentials</li>
            <li>Use the portal only for legitimate healthcare purposes</li>
            <li>Report any security vulnerabilities or issues</li>
        </ul>
    `;
    showModal('Terms of Service', termsContent);
}

function showPrivacy() {
    const privacyContent = `
        <h4>Privacy Policy</h4>
        
        <h5>Information Collection</h5>
        <p>We collect information necessary for healthcare service delivery, including personal and health information with your consent.</p>
        
        <h5>Information Use</h5>
        <ul>
            <li>Provide healthcare services and support</li>
            <li>Communicate about your healthcare</li>
            <li>Improve our services and user experience</li>
            <li>Comply with legal and regulatory requirements</li>
        </ul>
        
        <p><strong>Contact:</strong> privacy@healthcare.gov.in</p>
    `;
    showModal('Privacy Policy', privacyContent);
}

function contactSupport() {
    showNotification('Support Contact: Email: support@healthcare.gov.in | Phone: 1800-XXX-XXXX | Available 9 AM - 6 PM IST', 'info');
}

function showAccessibility() {
    showNotification('Accessibility features enabled: Keyboard navigation, screen reader support, high contrast mode available', 'info');
}

function showHIPAA() {
    const hipaaContent = `
        <h4>HIPAA Compliance</h4>
        
        <h5>Protected Health Information (PHI)</h5>
        <p>We protect your health information in accordance with HIPAA regulations and local privacy laws.</p>
        
        <h5>Security Safeguards</h5>
        <ul>
            <li><strong>Administrative:</strong> Security policies, staff training, access controls</li>
            <li><strong>Physical:</strong> Secure facilities, workstation controls, media controls</li>
            <li><strong>Technical:</strong> Encryption, access controls, audit logs, transmission security</li>
        </ul>
    `;
    showModal('HIPAA Compliance', hipaaContent);
}

function showSystemInfo() {
    const systemInfo = `
        <h4>System Information</h4>
        
        <h5>Modern Healthcare System</h5>
        <ul>
            <li>Evidence-based medicine and diagnostics</li>
            <li>AI-powered treatment recommendations</li>
            <li>Integration with modern medical devices</li>
            <li>Telemedicine and digital health tools</li>
        </ul>
        
        <h5>Traditional Healthcare System</h5>
        <ul>
            <li>Ayurveda, TCM, Unani, and Homeopathy</li>
            <li>Constitutional assessment tools</li>
            <li>Herbal medicine database</li>
            <li>Panchakarma management systems</li>
        </ul>
        
        <p><strong>System Status:</strong> All systems operational</p>
    `;
    showModal('System Information', systemInfo);
}

// Core utility functions
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

function setButtonLoading(button, loading) {
    if (!button) return;
    
    const textElement = button.querySelector('.btn-text');
    const loadingElement = button.querySelector('.btn-loading');
    
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
        if (textElement) textElement.style.display = 'none';
        if (loadingElement) loadingElement.style.display = 'inline';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        if (textElement) textElement.style.display = 'inline';
        if (loadingElement) loadingElement.style.display = 'none';
    }
}

function showNotification(message, type = 'info') {
    if (!notificationSystem) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    notification.innerHTML = `
        <div class="notification__content">
            <p>${message}</p>
            <button class="notification__close" onclick="closeNotification(this)" aria-label="Close notification">×</button>
        </div>
    `;
    
    notificationSystem.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
    
    healthcareAuth.notifications.push({
        message,
        type,
        timestamp: new Date()
    });
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification && notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

function showModal(title, content) {
    if (!modalOverlay) return;
    
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = content;
    
    modalOverlay.classList.remove('hidden');
    
    const modalContent = modalOverlay.querySelector('.modal-content');
    if (modalContent) {
        modalContent.focus();
    }
}

function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.add('hidden');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initializeFormValidation() {
    const emailFields = document.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.setCustomValidity('Please enter a valid email address');
                showNotification('Please enter a valid email address', 'warning');
            } else {
                this.setCustomValidity('');
            }
        });
    });
    
    const phoneFields = document.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        field.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
            if (this.value.length > 10) {
                this.value = this.value.substring(0, 10);
            }
        });
    });
}

// Password functions
function checkPasswordStrength() {
    const password = document.getElementById('newPassword').value;
    const strengthBar = document.querySelector('.strength-fill');
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    Object.keys(requirements).forEach(req => {
        const element = document.getElementById(`req-${req}`);
        if (element) {
            element.className = `requirement ${requirements[req] ? 'valid' : ''}`;
            element.textContent = `${requirements[req] ? '✓' : '❌'} ${element.textContent.substring(2)}`;
        }
    });
    
    const validCount = Object.values(requirements).filter(Boolean).length;
    healthcareAuth.passwordStrength = validCount;
    
    if (strengthBar) {
        const strengthClasses = ['weak', 'fair', 'good', 'strong'];
        strengthBar.className = 'strength-fill';
        if (validCount > 0) {
            strengthBar.classList.add(strengthClasses[Math.min(validCount - 1, 3)]);
        }
    }
}

function checkPasswordMatch() {
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const matchIndicator = document.getElementById('password-match');
    
    if (matchIndicator && confirmPassword.length > 0) {
        if (password === confirmPassword) {
            matchIndicator.textContent = '✓ Passwords match';
            matchIndicator.className = 'password-match valid';
        } else {
            matchIndicator.textContent = '❌ Passwords do not match';
            matchIndicator.className = 'password-match invalid';
        }
    } else if (matchIndicator) {
        matchIndicator.textContent = '';
        matchIndicator.className = 'password-match';
    }
}

function handleForgotPassword(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'warning');
        return;
    }
    
    const resetBtn = form.querySelector('.reset-btn');
    setButtonLoading(resetBtn, true);
    
    setTimeout(() => {
        setButtonLoading(resetBtn, false);
        showNotification('Password reset link sent to your email. Please check your inbox and spam folder.', 'success');
        
        setTimeout(() => {
            showLogin();
        }, 3000);
    }, 2000);
}

function showSMSRecovery() {
    showNotification('SMS recovery option will send a verification code to your registered mobile number. Contact support for assistance.', 'info');
}

function showForgotPassword() {
    console.log('Showing forgot password screen');
    hideAllSections();
    const forgotPasswordSection = document.getElementById('forgot-password-section');
    if (forgotPasswordSection) {
        forgotPasswordSection.classList.remove('hidden');
    }
    healthcareAuth.currentSection = 'forgot-password';
    
    setTimeout(() => {
        const resetEmailField = document.getElementById('reset-email');
        if (resetEmailField) resetEmailField.focus();
    }, 100);
}

function socialLogin(provider) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification(`${provider} authentication initiated. Please complete verification in popup window.`, 'info');
    }, 1500);
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (modalOverlay && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
        
        if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
            hideLoadingState();
        }
    }
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('Healthcare Auth Error:', event.error);
    showNotification('An error occurred. Please refresh the page or contact support if the issue persists.', 'error');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Healthcare Authentication Portal loaded in ${loadTime.toFixed(2)}ms`);
    
    if (loadTime > 3000) {
        showNotification('Slow loading detected. Please check your internet connection.', 'warning');
    }
});

// Export for global access and debugging
window.healthcareAuth = healthcareAuth;
window.selectSystem = selectSystem;
window.showLogin = showLogin;
window.showRegistration = showRegistration;
window.showWelcome = showWelcome;
window.showEmergencyAccess = showEmergencyAccess;

console.log('Healthcare Authentication Portal v1.0 - Ready for secure login');

// Add slideOut animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);