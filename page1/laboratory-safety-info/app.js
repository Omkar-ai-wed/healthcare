// Laboratory Testing Safety Information Center - Interactive Safety Features

// Global state management for safety interface
const laboratorySafety = {
    currentProtocolTab: 'quality',
    currentRiskTab: 'factors',
    currentHomeTab: 'mobile',
    activeModal: null,
    safetyTools: {
        checklist: false,
        emergency: false,
        reporting: false
    },
    navigationHistory: [],
    safetyAlerts: [],
    currentSection: 'hero'
};

// Safety data for interactive features
const SAFETY_DATA = {
    emergencyContacts: {
        medical: { number: '911', description: 'Immediate medical emergencies', availability: '24/7' },
        labSafety: { number: 'Laboratory Safety Officer', description: 'Safety incidents and concerns', availability: '24/7 On-call' },
        patientAdvocate: { number: 'Patient Rights Representative', description: 'Patient concerns and advocacy', availability: 'Business hours' },
        regulatory: { number: 'State Health Department', description: 'Regulatory compliance concerns', availability: 'Business hours' }
    },
    safetyChecklist: [
        'Verify patient identification with multiple methods',
        'Confirm any allergies or medical conditions',
        'Review current medications and supplements',
        'Assess bleeding risk and clotting history',
        'Ensure proper fasting if required',
        'Explain procedure and obtain consent',
        'Prepare sterile collection environment',
        'Use appropriate safety equipment and PPE',
        'Follow universal precautions protocols',
        'Document all safety measures taken'
    ],
    reportingCategories: [
        'Safety incident or near miss',
        'Equipment malfunction or failure',
        'Infection control concern',
        'Patient complaint or concern',
        'Staff safety issue',
        'Regulatory compliance question',
        'Emergency procedure activation',
        'Quality assurance finding'
    ]
};

// DOM Elements
let navbar, navToggle, navMenu, safetyModal;

// Initialize the safety interface
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    navbar = document.querySelector('.navbar');
    navToggle = document.querySelector('.navbar__toggle');
    navMenu = document.querySelector('.navbar__menu');
    safetyModal = document.getElementById('safety-modal');

    // Initialize all safety features
    initializeNavigation();
    initializeSmoothScrolling();
    initializeProtocolTabs();
    initializeRiskTabs();
    initializeHomeTabs();
    initializeSafetyTools();
    initializeHeroButtons();
    initializeAccessibility();
    initializeSafetyMonitoring();
    
    console.log('Laboratory Testing Safety Information Center initialized successfully');
    
    // Welcome message for patients and families
    setTimeout(() => {
        showSafetyNotification('Welcome to the Laboratory Testing Safety Information Center - Your safety is our top priority.', 'info');
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
        updateActiveSafetyNavLink(sectionId);
        
        // Track navigation history
        laboratorySafety.navigationHistory.push({
            section: sectionId,
            timestamp: new Date().toISOString()
        });
        laboratorySafety.currentSection = sectionId;
        
        console.log(`Navigated to safety section: ${sectionId}`);
    }
}

function updateActiveSafetyNavLink(activeId) {
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
        }
    });
}

// Protocol Tabs Functionality
function initializeProtocolTabs() {
    const protocolTabBtns = document.querySelectorAll('.protocol-tab-btn');
    const protocolPanels = document.querySelectorAll('.protocol-panel');

    protocolTabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tab = this.dataset.protocolTab;
            switchProtocolTab(tab);
        });
    });
}

function switchProtocolTab(tab) {
    laboratorySafety.currentProtocolTab = tab;
    
    // Update button states
    const protocolTabBtns = document.querySelectorAll('.protocol-tab-btn');
    protocolTabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.protocolTab === tab) {
            btn.classList.add('active');
        }
    });
    
    // Update panels
    const protocolPanels = document.querySelectorAll('.protocol-panel');
    protocolPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.protocolPanel === tab) {
            panel.classList.add('active');
            panel.classList.add('fade-in');
        }
    });
    
    console.log(`Switched to protocol tab: ${tab}`);
    showSafetyNotification(`Viewing ${tab} safety protocols`, 'info', 2000);
}

// Risk Management Tabs Functionality
function initializeRiskTabs() {
    const riskTabBtns = document.querySelectorAll('.risk-tab-btn');
    const riskPanels = document.querySelectorAll('.risk-panel');

    riskTabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tab = this.dataset.riskTab;
            switchRiskTab(tab);
        });
    });
}

function switchRiskTab(tab) {
    laboratorySafety.currentRiskTab = tab;
    
    // Update button states
    const riskTabBtns = document.querySelectorAll('.risk-tab-btn');
    riskTabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.riskTab === tab) {
            btn.classList.add('active');
        }
    });
    
    // Update panels
    const riskPanels = document.querySelectorAll('.risk-panel');
    riskPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.riskPanel === tab) {
            panel.classList.add('active');
            panel.classList.add('slide-up');
        }
    });
    
    console.log(`Switched to risk management tab: ${tab}`);
    showSafetyNotification(`Viewing risk ${tab} information`, 'info', 2000);
}

// Home Collection Tabs Functionality
function initializeHomeTabs() {
    const homeTabBtns = document.querySelectorAll('.home-tab-btn');
    const homePanels = document.querySelectorAll('.home-panel');

    homeTabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tab = this.dataset.homeTab;
            switchHomeTab(tab);
        });
    });
}

function switchHomeTab(tab) {
    laboratorySafety.currentHomeTab = tab;
    
    // Update button states
    const homeTabBtns = document.querySelectorAll('.home-tab-btn');
    homeTabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.homeTab === tab) {
            btn.classList.add('active');
        }
    });
    
    // Update panels
    const homePanels = document.querySelectorAll('.home-panel');
    homePanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.dataset.homePanel === tab) {
            panel.classList.add('active');
            panel.classList.add('fade-in');
        }
    });
    
    console.log(`Switched to home collection tab: ${tab}`);
    showSafetyNotification(`Viewing ${tab} collection information`, 'info', 2000);
}

// Safety Tools Functionality
function initializeSafetyTools() {
    // Make safety tool functions globally available
    window.showSafetyChecklist = showSafetyChecklist;
    window.showEmergencyContacts = showEmergencyContacts;
    window.showReportingForm = showReportingForm;
    
    // Add click handlers for floating buttons
    const safetyToolBtns = document.querySelectorAll('.safety-tool-btn');
    safetyToolBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                eval(onclick);
            }
        });
    });
}

function showSafetyChecklist() {
    laboratorySafety.safetyTools.checklist = true;
    
    const checklistHTML = `
        <div class="safety-checklist">
            <div class="checklist-intro">
                <p>Use this comprehensive pre-procedure safety checklist to ensure all safety measures are followed:</p>
            </div>
            <div class="checklist-items">
                ${SAFETY_DATA.safetyChecklist.map((item, index) => `
                    <div class="checklist-item">
                        <input type="checkbox" id="check-${index}" class="checklist-checkbox">
                        <label for="check-${index}" class="checklist-label">${item}</label>
                    </div>
                `).join('')}
            </div>
            <div class="checklist-actions">
                <button class="btn btn--primary" onclick="printSafetyChecklist()">🖨️ Print Checklist</button>
                <button class="btn btn--secondary" onclick="resetSafetyChecklist()">🔄 Reset</button>
            </div>
        </div>
    `;
    
    showSafetyModal('Safety Checklist', checklistHTML);
    console.log('Safety checklist displayed');
}

function showEmergencyContacts() {
    laboratorySafety.safetyTools.emergency = true;
    
    const emergencyHTML = `
        <div class="emergency-contacts">
            <div class="emergency-alert">
                <div class="alert-icon">🚨</div>
                <div class="alert-text">
                    <strong>For immediate medical emergencies, call 911</strong>
                </div>
            </div>
            <div class="contact-list">
                ${Object.entries(SAFETY_DATA.emergencyContacts).map(([key, contact]) => `
                    <div class="emergency-contact-item">
                        <div class="contact-icon">
                            ${key === 'medical' ? '🚑' : key === 'labSafety' ? '🔬' : key === 'patientAdvocate' ? '👤' : '🏛️'}
                        </div>
                        <div class="contact-details">
                            <div class="contact-title">${contact.number}</div>
                            <div class="contact-description">${contact.description}</div>
                            <div class="contact-availability">${contact.availability}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="emergency-actions">
                <button class="btn btn--primary" onclick="callEmergencyServices()">📞 Call 911</button>
                <button class="btn btn--secondary" onclick="contactLabSafety()">🔬 Lab Safety</button>
            </div>
        </div>
    `;
    
    showSafetyModal('Emergency Contacts', emergencyHTML);
    console.log('Emergency contacts displayed');
}

function showReportingForm() {
    laboratorySafety.safetyTools.reporting = true;
    
    const reportingHTML = `
        <div class="safety-reporting-form">
            <div class="reporting-intro">
                <p>Report safety concerns, incidents, or suggestions to help us maintain the highest safety standards.</p>
            </div>
            <form class="reporting-form" onsubmit="submitSafetyReport(event)">
                <div class="form-group">
                    <label for="report-category" class="form-label">Type of Report:</label>
                    <select id="report-category" class="form-control" required>
                        <option value="">Select category...</option>
                        ${SAFETY_DATA.reportingCategories.map(category => `
                            <option value="${category}">${category}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="report-description" class="form-label">Description:</label>
                    <textarea id="report-description" class="form-control" rows="4" 
                        placeholder="Please provide detailed information about the safety concern or incident..." required></textarea>
                </div>
                <div class="form-group">
                    <label for="report-location" class="form-label">Location (if applicable):</label>
                    <input type="text" id="report-location" class="form-control" placeholder="Department, room, or area">
                </div>
                <div class="form-group">
                    <label for="report-urgency" class="form-label">Urgency Level:</label>
                    <select id="report-urgency" class="form-control" required>
                        <option value="">Select urgency...</option>
                        <option value="low">Low - General concern or suggestion</option>
                        <option value="medium">Medium - Should be addressed soon</option>
                        <option value="high">High - Immediate attention needed</option>
                        <option value="critical">Critical - Emergency situation</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="report-contact" class="form-label">Contact Information (optional):</label>
                    <input type="text" id="report-contact" class="form-control" 
                        placeholder="Name and phone/email for follow-up">
                </div>
                <div class="reporting-actions">
                    <button type="submit" class="btn btn--primary">📤 Submit Report</button>
                    <button type="button" class="btn btn--secondary" onclick="clearReportingForm()">🗑️ Clear Form</button>
                </div>
            </form>
        </div>
    `;
    
    showSafetyModal('Safety Reporting', reportingHTML);
    console.log('Safety reporting form displayed');
}

function showSafetyModal(title, content) {
    if (!safetyModal) return;
    
    const modalTitle = safetyModal.querySelector('#modal-title');
    const modalBody = safetyModal.querySelector('#modal-body');
    
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = content;
    
    safetyModal.classList.remove('hidden');
    safetyModal.setAttribute('aria-hidden', 'false');
    
    // Focus management
    const firstFocusable = safetyModal.querySelector('input, button, select, textarea');
    if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
    }
    
    laboratorySafety.activeModal = title.toLowerCase().replace(/\s+/g, '-');
    
    // Add modal-specific styles if not already added
    if (!document.getElementById('modal-specific-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-specific-styles';
        modalStyles.textContent = `
            .safety-checklist {
                max-height: 60vh;
                overflow-y: auto;
            }
            
            .checklist-intro {
                margin-bottom: var(--space-16);
                padding: var(--space-12);
                background: var(--color-safety-bg-1);
                border-radius: var(--radius-base);
                border-left: 4px solid var(--color-safety-primary);
            }
            
            .checklist-items {
                margin-bottom: var(--space-16);
            }
            
            .checklist-item {
                display: flex;
                align-items: flex-start;
                gap: var(--space-8);
                padding: var(--space-8);
                margin-bottom: var(--space-4);
                background: var(--color-surface);
                border-radius: var(--radius-sm);
                border: 1px solid var(--color-card-border);
                transition: all var(--duration-fast) var(--ease-standard);
            }
            
            .checklist-item:hover {
                background: var(--color-safety-bg-1);
            }
            
            .checklist-checkbox {
                margin: 0;
                flex-shrink: 0;
                cursor: pointer;
            }
            
            .checklist-label {
                cursor: pointer;
                font-size: var(--font-size-sm);
                color: var(--color-text);
                line-height: var(--line-height-normal);
                margin: 0;
            }
            
            .checklist-actions {
                display: flex;
                gap: var(--space-8);
                justify-content: center;
                padding-top: var(--space-16);
                border-top: 1px solid var(--color-card-border);
            }
            
            .emergency-contacts {
                max-height: 60vh;
                overflow-y: auto;
            }
            
            .emergency-alert {
                background: var(--color-safety-bg-emergency);
                border: 2px solid var(--color-safety-error);
                border-radius: var(--radius-base);
                padding: var(--space-12);
                margin-bottom: var(--space-16);
                display: flex;
                align-items: center;
                gap: var(--space-8);
            }
            
            .emergency-alert .alert-icon {
                font-size: var(--font-size-lg);
                color: var(--color-safety-error);
                animation: emergency-pulse 1s ease-in-out infinite alternate;
            }
            
            .emergency-alert .alert-text {
                color: var(--color-text);
                font-weight: var(--font-weight-bold);
            }
            
            .contact-list {
                margin-bottom: var(--space-16);
            }
            
            .emergency-contact-item {
                display: flex;
                align-items: flex-start;
                gap: var(--space-12);
                padding: var(--space-12);
                margin-bottom: var(--space-8);
                background: var(--color-safety-bg-1);
                border-radius: var(--radius-base);
                border-left: 4px solid var(--color-safety-error);
            }
            
            .emergency-contact-item .contact-icon {
                font-size: var(--font-size-lg);
                color: var(--color-safety-error);
                flex-shrink: 0;
            }
            
            .emergency-contact-item .contact-title {
                font-weight: var(--font-weight-bold);
                color: var(--color-safety-error);
                margin-bottom: var(--space-4);
                font-size: var(--font-size-sm);
            }
            
            .emergency-contact-item .contact-description {
                font-size: var(--font-size-sm);
                color: var(--color-text);
                margin-bottom: var(--space-2);
            }
            
            .emergency-contact-item .contact-availability {
                font-size: var(--font-size-xs);
                color: var(--color-safety-primary);
                font-style: italic;
            }
            
            .emergency-actions {
                display: flex;
                gap: var(--space-8);
                justify-content: center;
                padding-top: var(--space-16);
                border-top: 1px solid var(--color-card-border);
            }
            
            .safety-reporting-form {
                max-height: 70vh;
                overflow-y: auto;
            }
            
            .reporting-intro {
                margin-bottom: var(--space-16);
                padding: var(--space-12);
                background: var(--color-safety-bg-1);
                border-radius: var(--radius-base);
                border-left: 4px solid var(--color-safety-primary);
            }
            
            .reporting-form .form-group {
                margin-bottom: var(--space-16);
            }
            
            .reporting-actions {
                display: flex;
                gap: var(--space-8);
                justify-content: center;
                padding-top: var(--space-16);
                border-top: 1px solid var(--color-card-border);
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

function closeSafetyModal() {
    if (!safetyModal) return;
    
    safetyModal.classList.add('hidden');
    safetyModal.setAttribute('aria-hidden', 'true');
    
    // Reset safety tools state
    laboratorySafety.safetyTools = {
        checklist: false,
        emergency: false,
        reporting: false
    };
    
    laboratorySafety.activeModal = null;
    
    console.log('Safety modal closed');
}

// Safety tool helper functions
function printSafetyChecklist() {
    const checkedItems = document.querySelectorAll('.checklist-checkbox:checked');
    const totalItems = document.querySelectorAll('.checklist-checkbox').length;
    
    showSafetyNotification(`Safety checklist: ${checkedItems.length}/${totalItems} items completed`, 'info');
    
    // Create print-friendly version
    const printContent = `
        <h2>Laboratory Testing Safety Checklist</h2>
        <p>Completed: ${checkedItems.length}/${totalItems} items</p>
        <ul>
            ${SAFETY_DATA.safetyChecklist.map((item, index) => {
                const isChecked = document.getElementById(`check-${index}`)?.checked;
                return `<li style="margin-bottom: 8px;">
                    <strong>[${isChecked ? '✓' : '□'}]</strong> ${item}
                </li>`;
            }).join('')}
        </ul>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
            Generated on: ${new Date().toLocaleString()}<br>
            Laboratory Testing Safety Information Center
        </p>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(`
            <html>
                <head>
                    <title>Safety Checklist</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                        h2 { color: #2196f3; border-bottom: 2px solid #2196f3; padding-bottom: 10px; }
                        ul { list-style: none; padding: 0; }
                        li { margin-bottom: 8px; padding: 8px; background: #f5f5f5; border-radius: 4px; }
                    </style>
                </head>
                <body>${printContent}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }
}

function resetSafetyChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    showSafetyNotification('Safety checklist reset', 'info');
}

function callEmergencyServices() {
    showSafetyNotification('For medical emergencies, please call 911 immediately', 'error', 5000);
    console.log('Emergency services contact initiated');
}

function contactLabSafety() {
    showSafetyNotification('Contacting Laboratory Safety Officer...', 'info');
    console.log('Laboratory safety contact initiated');
}

function submitSafetyReport(event) {
    event.preventDefault();
    
    const formData = {
        category: document.getElementById('report-category').value,
        description: document.getElementById('report-description').value,
        location: document.getElementById('report-location').value,
        urgency: document.getElementById('report-urgency').value,
        contact: document.getElementById('report-contact').value,
        timestamp: new Date().toISOString()
    };
    
    // Simulate report submission
    showSafetyNotification('Safety report submitted successfully. Thank you for helping us maintain safety standards.', 'success', 5000);
    
    console.log('Safety report submitted:', formData);
    
    // Close modal after successful submission
    setTimeout(() => {
        closeSafetyModal();
    }, 2000);
}

function clearReportingForm() {
    const form = document.querySelector('.reporting-form');
    if (form) {
        form.reset();
        showSafetyNotification('Form cleared', 'info');
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

    // Modal keyboard navigation
    document.addEventListener('keydown', function(event) {
        // Escape key handling
        if (event.key === 'Escape') {
            if (laboratorySafety.activeModal) {
                closeSafetyModal();
            } else if (navMenu && navMenu.classList.contains('active')) {
                navToggle.click();
            }
        }
        
        // Alt + S for safety tools
        if (event.altKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            const firstSafetyTool = document.querySelector('.safety-tool-btn');
            if (firstSafetyTool) {
                firstSafetyTool.focus();
            }
        }
        
        // Alt + E for emergency
        if (event.altKey && event.key.toLowerCase() === 'e') {
            event.preventDefault();
            showEmergencyContacts();
        }
    });

    // Modal click outside to close
    if (safetyModal) {
        safetyModal.addEventListener('click', function(event) {
            if (event.target === safetyModal || event.target.classList.contains('modal__overlay')) {
                closeSafetyModal();
            }
        });
    }
}

// Safety Monitoring
function initializeSafetyMonitoring() {
    // Monitor section viewing for safety analytics
    if ('IntersectionObserver' in window) {
        const safetyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    if (sectionId) {
                        updateActiveSafetyNavLink(sectionId);
                        laboratorySafety.currentSection = sectionId;
                        console.log(`Safety section viewed: ${sectionId}`);
                    }
                }
            });
        }, { threshold: 0.5 });

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            safetyObserver.observe(section);
        });
    }
}

// Safety Notifications
function showSafetyNotification(message, type = 'info', duration = 4000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `safety-notification safety-notification--${type}`;
    
    // Add safety icons based on type
    const icons = {
        'info': '🔵',
        'success': '✅',
        'warning': '⚠️',
        'error': '🚨'
    };
    
    notification.innerHTML = `
        <div class="safety-notification__content">
            <div class="safety-notification__icon">${icons[type] || '🔵'}</div>
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
                z-index: 1100;
                background: var(--color-surface);
                padding: var(--space-16);
                border-radius: var(--radius-base);
                box-shadow: var(--shadow-lg);
                border-left: 4px solid var(--color-safety-primary);
                max-width: 400px;
                animation: slideInSafetyNotification 0.3s ease-out;
                border: 1px solid var(--color-card-border);
                font-family: var(--font-family-base);
            }
            
            .safety-notification--info {
                border-left-color: var(--color-safety-info);
            }
            
            .safety-notification--success {
                border-left-color: var(--color-safety-success);
            }
            
            .safety-notification--warning {
                border-left-color: var(--color-safety-warning);
            }
            
            .safety-notification--error {
                border-left-color: var(--color-safety-error);
            }
            
            .safety-notification__content {
                display: flex;
                align-items: flex-start;
                gap: var(--space-8);
            }
            
            .safety-notification__icon {
                font-size: var(--font-size-lg);
                flex-shrink: 0;
            }
            
            .safety-notification__content p {
                margin: 0;
                color: var(--color-text);
                font-size: var(--font-size-sm);
                line-height: var(--line-height-normal);
                flex: 1;
            }
            
            .safety-notification__close {
                background: none;
                border: none;
                font-size: var(--font-size-lg);
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: 0;
                font-family: var(--font-family-mono);
                flex-shrink: 0;
            }
            
            .safety-notification__close:hover {
                color: var(--color-text);
            }
            
            @keyframes slideInSafetyNotification {
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
            notification.style.animation = 'slideOutSafetyNotification 0.3s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, duration);
    
    // Add safety alert to history
    laboratorySafety.safetyAlerts.push({
        message,
        type,
        timestamp: new Date().toISOString()
    });
    
    console.log(`Safety notification: ${message}`);
}

function closeSafetyNotification(button) {
    const notification = button.closest('.safety-notification');
    if (notification && notification.parentNode) {
        notification.style.animation = 'slideOutSafetyNotification 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Footer Functions
function downloadSafetyResources() {
    showSafetyNotification('Preparing safety resources for download...', 'info', 2000);
    
    setTimeout(() => {
        const safetyResources = {
            title: "Laboratory Testing Safety Resources",
            downloadDate: new Date().toISOString(),
            safetyOverview: {
                mission: "Laboratory testing prioritizes patient safety through comprehensive protocols, quality assurance measures, and regulatory compliance",
                coreSafetyPrinciples: [
                    "Patient-first approach - All procedures designed with patient safety as top priority",
                    "Zero harm tolerance - Comprehensive risk prevention and mitigation strategies",
                    "Quality assurance - Multiple verification steps ensure accurate results",
                    "Regulatory compliance - Adherence to all federal, state, and local safety requirements",
                    "Continuous improvement - Ongoing safety monitoring and protocol enhancement"
                ]
            },
            safetyStatistics: {
                adverseEventRate: "<0.1% of all procedures",
                infectionRate: "<0.01% healthcare-associated infections",
                errorRate: "<0.5% laboratory errors",
                patientSatisfaction: ">95% satisfaction with safety measures",
                regulatoryCompliance: "100% compliance with all safety regulations"
            },
            emergencyContacts: SAFETY_DATA.emergencyContacts,
            safetyChecklist: SAFETY_DATA.safetyChecklist,
            navigationHistory: laboratorySafety.navigationHistory,
            userSession: {
                sessionStart: new Date().toISOString(),
                sectionsViewed: laboratorySafety.currentSection,
                alertsReceived: laboratorySafety.safetyAlerts.length
            }
        };
        
        const dataStr = JSON.stringify(safetyResources, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `laboratory-safety-resources-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        showSafetyNotification('Safety resources downloaded successfully!', 'success');
    }, 500);
}

function printSafetyInfo() {
    showSafetyNotification('Preparing safety information for printing...', 'info', 2000);
    
    setTimeout(() => {
        const printContent = generateSafetyPrintContent();
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            
            showSafetyNotification('Safety information prepared for printing.', 'success');
        } else {
            showSafetyNotification('Pop-up blocked. Please allow pop-ups and try again.', 'warning');
        }
    }, 500);
}

function accessPatientPortal() {
    showSafetyNotification('Redirecting to patient portal...', 'info', 2000);
    
    setTimeout(() => {
        // Simulate patient portal access
        showSafetyNotification('Patient portal access feature coming soon. Contact your healthcare provider for current portal access.', 'info', 5000);
    }, 500);
}

// Generate print-friendly safety content
function generateSafetyPrintContent() {
    const currentDate = new Date().toLocaleDateString();
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Laboratory Testing Safety Information - Print Version</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    line-height: 1.4; 
                    color: #333; 
                    font-size: 11px;
                    margin: 15px;
                }
                .header { 
                    border-bottom: 3px solid #2196f3; 
                    padding-bottom: 15px; 
                    margin-bottom: 20px; 
                    text-align: center;
                }
                .section { 
                    margin-bottom: 20px; 
                    page-break-inside: avoid; 
                }
                .section-title { 
                    color: #2196f3; 
                    border-bottom: 2px solid #2196f3; 
                    padding-bottom: 5px; 
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .safety-table { 
                    width: 100%;
                    border-collapse: collapse;
                    margin: 10px 0;
                }
                .safety-table th, .safety-table td {
                    border: 1px solid #ddd;
                    padding: 6px;
                    text-align: left;
                    font-size: 10px;
                }
                .safety-table th {
                    background: #e3f2fd;
                    font-weight: bold;
                    color: #2196f3;
                }
                .safety-box { 
                    background: #f8f9fa;
                    padding: 10px;
                    margin: 8px 0;
                    border-left: 4px solid #2196f3;
                }
                .print-note { 
                    font-style: italic; 
                    color: #666; 
                    margin-top: 15px; 
                    font-size: 9px;
                }
                .emergency-highlight {
                    background: #ffebee;
                    border: 2px solid #f44336;
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 4px;
                }
                .checklist {
                    list-style: none;
                    padding: 0;
                }
                .checklist li {
                    margin: 5px 0;
                    padding: 5px;
                    background: #f5f5f5;
                    border-radius: 3px;
                }
                .checklist li:before {
                    content: "✓ ";
                    color: #4caf50;
                    font-weight: bold;
                }
                @media print { 
                    body { font-size: 9px; }
                    .section { page-break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🧪 Laboratory Testing Safety Information Center</h1>
                <p>Comprehensive Safety Resource for Patients and Families</p>
                <p class="print-note">Generated on: ${currentDate}</p>
            </div>
            
            <div class="emergency-highlight">
                <h2>🚨 Emergency Information</h2>
                <p><strong>For immediate medical emergencies, call 911</strong></p>
                <p>Laboratory Safety Officer: Available 24/7 for safety concerns</p>
                <p>Patient Advocate: Available during business hours for patient concerns</p>
            </div>
            
            <div class="section">
                <h2 class="section-title">🛡️ Core Safety Principles</h2>
                <ul class="checklist">
                    <li>Patient-first approach - All procedures designed with patient safety as top priority</li>
                    <li>Zero harm tolerance - Comprehensive risk prevention and mitigation strategies</li>
                    <li>Quality assurance - Multiple verification steps ensure accurate results</li>
                    <li>Regulatory compliance - Adherence to all federal, state, and local safety requirements</li>
                    <li>Continuous improvement - Ongoing safety monitoring and protocol enhancement</li>
                </ul>
            </div>
            
            <div class="section">
                <h2 class="section-title">📊 Safety Statistics</h2>
                <table class="safety-table">
                    <tr><th>Safety Metric</th><th>Performance</th><th>Standard</th></tr>
                    <tr><td>Adverse Event Rate</td><td>&lt;0.1%</td><td>All procedures</td></tr>
                    <tr><td>Infection Rate</td><td>&lt;0.01%</td><td>Healthcare-associated infections</td></tr>
                    <tr><td>Laboratory Error Rate</td><td>&lt;0.5%</td><td>Well below industry standards</td></tr>
                    <tr><td>Patient Satisfaction</td><td>&gt;95%</td><td>Safety measures satisfaction</td></tr>
                    <tr><td>Regulatory Compliance</td><td>100%</td><td>All safety regulations</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h2 class="section-title">💉 Sample Collection Safety</h2>
                <div class="safety-box">
                    <strong>Professional Standards:</strong>
                    <ul>
                        <li>Trained phlebotomists - Certified professionals perform all blood draws</li>
                        <li>Sterile technique - Single-use, sterile equipment for every patient</li>
                        <li>Universal precautions - Standard safety protocols for all patients</li>
                        <li>Patient identification - Multiple verification steps prevent sample mix-ups</li>
                        <li>Comfort measures - Techniques to minimize discomfort and anxiety</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">🦠 Infection Control & Prevention</h2>
                <table class="safety-table">
                    <tr><th>Control Measure</th><th>Implementation</th></tr>
                    <tr><td>Hand Hygiene</td><td>Strict handwashing protocols between all patients</td></tr>
                    <tr><td>Personal Protective Equipment</td><td>Appropriate PPE for all staff</td></tr>
                    <tr><td>Environmental Cleaning</td><td>Regular disinfection of all surfaces</td></tr>
                    <tr><td>Waste Management</td><td>Safe disposal of all biological materials</td></tr>
                    <tr><td>Air Quality Control</td><td>Proper ventilation and air filtration systems</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h2 class="section-title">🔒 Privacy & Confidentiality</h2>
                <div class="safety-box">
                    <strong>HIPAA Compliance:</strong>
                    <ul>
                        <li>Protected Health Info - All results strictly confidential</li>
                        <li>Authorized Access Only - Results released only to authorized individuals</li>
                        <li>Secure Transmission - Encrypted communication of all results</li>
                        <li>Audit Trails - Complete tracking of who accesses patient information</li>
                        <li>Privacy Training - All staff trained in privacy protection</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">📋 Pre-Procedure Safety Checklist</h2>
                <ul class="checklist">
                    ${SAFETY_DATA.safetyChecklist.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="section">
                <h2 class="section-title">📋 Regulatory Compliance</h2>
                <table class="safety-table">
                    <tr><th>Regulation/Accreditation</th><th>Status</th><th>Description</th></tr>
                    <tr><td>CLIA Compliance</td><td>Current</td><td>Clinical Laboratory Improvement Amendments</td></tr>
                    <tr><td>CAP Accreditation</td><td>Accredited</td><td>College of American Pathologists</td></tr>
                    <tr><td>Joint Commission</td><td>Accredited</td><td>Healthcare organization accreditation</td></tr>
                    <tr><td>ISO Certification</td><td>Certified</td><td>International quality management standards</td></tr>
                    <tr><td>FDA Oversight</td><td>Compliant</td><td>Food and Drug Administration regulations</td></tr>
                    <tr><td>OSHA Standards</td><td>Compliant</td><td>Occupational Safety and Health Administration</td></tr>
                </table>
            </div>
            
            <p class="print-note">
                This safety information document provides comprehensive guidance for laboratory testing safety. 
                All information is current as of the print date and reflects our commitment to patient safety excellence.
                For the most current information, visit our Laboratory Testing Safety Information Center online.
                <br><br>
                Laboratory Testing Safety Information Center - Your safety is our top priority.
                <br>
                For questions or concerns, contact our Patient Safety team or your healthcare provider.
            </p>
        </body>
        </html>
    `;
}

// Make functions globally available
window.scrollToSection = scrollToSection;
window.switchProtocolTab = switchProtocolTab;
window.switchRiskTab = switchRiskTab;
window.switchHomeTab = switchHomeTab;
window.showSafetyChecklist = showSafetyChecklist;
window.showEmergencyContacts = showEmergencyContacts;
window.showReportingForm = showReportingForm;
window.closeSafetyModal = closeSafetyModal;
window.printSafetyChecklist = printSafetyChecklist;
window.resetSafetyChecklist = resetSafetyChecklist;
window.callEmergencyServices = callEmergencyServices;
window.contactLabSafety = contactLabSafety;
window.submitSafetyReport = submitSafetyReport;
window.clearReportingForm = clearReportingForm;
window.downloadSafetyResources = downloadSafetyResources;
window.printSafetyInfo = printSafetyInfo;
window.accessPatientPortal = accessPatientPortal;
window.closeSafetyNotification = closeSafetyNotification;

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Safety Interface Error:', event.error);
    showSafetyNotification('A system error occurred. Please refresh if problems persist.', 'error');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Safety interface loaded in ${loadTime.toFixed(2)}ms`);
    
    if (loadTime > 3000) {
        showSafetyNotification('Loading took longer than expected. All safety features are available.', 'warning');
    }
});

// Responsive behavior
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navToggle.click();
    }
});

// Safety session monitoring
function monitorSafetySession() {
    const sessionMetrics = {
        sessionDuration: performance.now(),
        sectionsViewed: laboratorySafety.navigationHistory.length,
        currentSection: laboratorySafety.currentSection,
        safetyToolsUsed: Object.values(laboratorySafety.safetyTools).filter(Boolean).length,
        alertsReceived: laboratorySafety.safetyAlerts.length,
        timestamp: new Date().toISOString()
    };
    
    console.log('Safety session metrics:', sessionMetrics);
    return sessionMetrics;
}

// Auto-save safety session periodically
setInterval(() => {
    if (laboratorySafety.navigationHistory.length > 0) {
        try {
            const safetySession = {
                navigationHistory: laboratorySafety.navigationHistory,
                safetyAlerts: laboratorySafety.safetyAlerts,
                currentSection: laboratorySafety.currentSection,
                sessionTimestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            };
            console.log('Safety session data updated');
        } catch (error) {
            console.log('Unable to save safety session data');
        }
    }
}, 60000); // Save every minute

// Safety keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case '1':
                event.preventDefault();
                scrollToSection('excellence');
                break;
            case '2':
                event.preventDefault();
                scrollToSection('collection');
                break;
            case '3':
                event.preventDefault();
                scrollToSection('emergency');
                break;
            case 's':
                event.preventDefault();
                showSafetyChecklist();
                break;
            case 'e':
                event.preventDefault();
                showEmergencyContacts();
                break;
            case 'r':
                event.preventDefault();
                showReportingForm();
                break;
            case 'p':
                event.preventDefault();
                printSafetyInfo();
                break;
        }
    }
});

// Export for global access
window.laboratorySafety = laboratorySafety;

console.log('Laboratory Testing Safety Information Center v1.0 - Patient Safety Excellence loaded 🧪🛡️');

// Advanced safety features
if ('IntersectionObserver' in window) {
    console.log('Advanced safety monitoring enabled');
}

// Safety compliance check on initialization
setTimeout(() => {
    const complianceCheck = {
        navigationReady: typeof scrollToSection === 'function',
        safetyToolsReady: typeof showSafetyChecklist === 'function',
        emergencyReady: typeof showEmergencyContacts === 'function',
        reportingReady: typeof showReportingForm === 'function',
        modalReady: safetyModal !== null,
        accessibilityReady: document.querySelector('a[href="#main-content"]') !== null
    };
    
    const allSystemsReady = Object.values(complianceCheck).every(Boolean);
    
    if (allSystemsReady) {
        console.log('✅ All safety systems operational');
        showSafetyNotification('All safety systems are operational and ready to assist you.', 'success', 3000);
    } else {
        console.warn('⚠️ Some safety systems need attention:', complianceCheck);
        showSafetyNotification('Some safety features may be limited. Please refresh if you experience issues.', 'warning');
    }
}, 2000);

console.log('Safety keyboard shortcuts enabled: Ctrl+1-3 for sections, Ctrl+S for checklist, Ctrl+E for emergency, Ctrl+R for reporting, Ctrl+P for print');