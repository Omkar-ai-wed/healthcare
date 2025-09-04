// Ultrasound Safety Information Center JavaScript

// Global application state and safety data
const ultrasoundSafetyApp = {
    // Safety data from the provided JSON
    safetyData: {
        noRadiation: {
            radiationExposure: "0 mSv",
            safetyRecord: "50+ years of safe use",
            globalExams: "Millions performed safely annually",
            adverseEvents: "<0.001% serious events",
            benefits: [
                "No X-rays or radioactive materials used",
                "Completely safe from radiation exposure",
                "No cumulative radiation effects",
                "No increased cancer risk",
                "Safe for unlimited repeated examinations"
            ]
        },
        
        pregnancySafety: {
            goldStandard: true,
            benefits: [
                "Preferred method throughout pregnancy",
                "No harmful effects to mother or baby",
                "Essential for routine prenatal care",
                "Safe at any stage of pregnancy",
                "Multiple examinations are safe"
            ],
            research: {
                studyYears: "50+ years of research",
                birthDefects: "No increased risk",
                developmentalDelays: "No association found",
                followUpStudies: "Decades of outcome tracking",
                medicalEndorsement: "ACOG recommended"
            },
            prenatalBenefits: [
                "Real-time fetal monitoring",
                "Growth assessment over time",
                "Anatomy screening without risk",
                "Maternal health monitoring",
                "Safe family bonding experience"
            ]
        },
        
        populationSafety: {
            pediatric: {
                benefits: [
                    "Safe for all ages from newborns",
                    "No sedation typically required",
                    "No preparation restrictions",
                    "Family-friendly examination",
                    "Immediate return to activities"
                ]
            },
            adult: {
                benefits: [
                    "No health condition restrictions",
                    "Medication compatibility",
                    "Safe with chronic diseases",
                    "No increased risks with aging",
                    "Safe for immunocompromised patients"
                ]
            },
            specialPopulations: [
                {
                    population: "Elderly Patients",
                    safety: "No increased risks with aging, safe with multiple conditions"
                },
                {
                    population: "Immunocompromised",
                    safety: "Safe for patients with weakened immune systems"
                },
                {
                    population: "Patients with Implants",
                    safety: "Safe with most medical devices and implants"
                },
                {
                    population: "Patients with Allergies",
                    safety: "No contrast agents typically required"
                }
            ]
        },
        
        safetyStatistics: {
            adverseEvents: {
                seriousEvents: "<0.001%",
                minorDiscomfort: "Occasional pressure sensation only",
                allergicReactions: "<0.01% gel sensitivity",
                equipmentMalfunction: "Multiple safety backups prevent issues",
                patientInjury: "Virtually non-existent"
            },
            longTermStudies: {
                followUpPeriod: "50+ years of outcome tracking",
                childhoodDevelopment: "Normal outcomes in prenatally exposed",
                cancerIncidence: "No increased rates in exposed populations",
                geneticEffects: "No chromosomal abnormalities found",
                reproductiveOutcomes: "Normal fertility and pregnancy outcomes"
            }
        },
        
        emergencyProtocols: {
            emergencyContacts: {
                medical: "911 for emergencies",
                facility: "Facility safety officer",
                physician: "Primary healthcare provider",
                advocacy: "Patient rights representative"
            },
            safetyProtocols: [
                "Medical emergency response - BLS trained staff",
                "Equipment failure - immediate backup systems",
                "Patient distress - anxiety and comfort protocols",
                "Contamination events - infection control procedures",
                "Power outages - battery backup systems"
            ]
        },
        
        mythsVsFacts: [
            {
                myth: "Ultrasound can harm the baby during pregnancy",
                fact: "Ultrasound is completely safe during pregnancy and is the preferred imaging method. No harmful effects have been found in 50+ years of use.",
                evidence: "Extensive research and medical organization endorsement"
            },
            {
                myth: "Too many ultrasounds can be dangerous",
                fact: "There is no limit to the number of safe ultrasound examinations. No cumulative effects or risks exist.",
                evidence: "No radiation exposure means unlimited safe use"
            },
            {
                myth: "Ultrasound gel can cause allergic reactions",
                fact: "Allergic reactions to ultrasound gel are extremely rare (<0.01%) and are typically mild skin sensitivity.",
                evidence: "Medical-grade hypoallergenic formulation"
            },
            {
                myth: "Ultrasound is not as accurate as X-rays or CT scans",
                fact: "Ultrasound provides excellent diagnostic accuracy for appropriate applications and offers real-time imaging capabilities.",
                evidence: "Preferred method for many conditions due to safety and effectiveness"
            }
        ]
    },
    
    // Application state
    currentChart: null,
    currentTool: null,
    
    // Safety comparison data for charts
    radiationData: {
        ultrasound: 0,
        xray: 0.1,
        ctScan: 7,
        mri: 0,
        naturalBackground: 2.4
    }
};

// Utility Functions
function formatSafetyMessage(message, isPositive = true) {
    const icon = isPositive ? '✅' : '⚠️';
    return `${icon} ${message}`;
}

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

// Navigation Functions
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

// Modal Management Functions
function showModal(modalId) {
    console.log('Show safety modal called:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        
        // Focus management for accessibility
        setTimeout(() => {
            const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 100);
        
        showSafetyNotification('Safety information interface opened', 'info');
    } else {
        console.error('Safety modal not found:', modalId);
        showSafetyNotification(`Modal ${modalId} not found`, 'error');
    }
}

function closeModal(modalId) {
    console.log('Close safety modal called:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        showSafetyNotification('Safety interface closed', 'info');
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
}

// Safety Tools Functions
function showSafetyCalculator() {
    console.log('Show safety calculator called');
    const modalExists = document.getElementById('safety-calculator-modal');
    if (modalExists) {
        showModal('safety-calculator-modal');
    } else {
        showSafetyNotification('Safety calculator opened successfully', 'success');
        // The modal already exists in the HTML, just show it
        showModal('safety-calculator-modal');
    }
}

function showEmergencyInfo() {
    console.log('Show emergency info called');
    const modalExists = document.getElementById('emergency-info-modal');
    if (modalExists) {
        showModal('emergency-info-modal');
        showSafetyNotification('Emergency safety information displayed', 'warning');
    } else {
        showSafetyNotification('Emergency information opened successfully', 'warning');
        showModal('emergency-info-modal');
    }
}

function showSafetyComparison() {
    console.log('Show safety comparison called');
    showSafetyNotification('Safety comparison tool activated', 'success');
    
    // Create a comparison modal dynamically
    createSafetyComparisonModal();
}

function showPregnancyTracker() {
    console.log('Show pregnancy tracker called');
    showSafetyNotification('Pregnancy safety tracker activated', 'success');
    
    // Create pregnancy tracker modal
    createPregnancyTrackerModal();
}

function showSafetyQuestions() {
    console.log('Show safety questions called');
    showSafetyNotification('Safety question checker activated', 'info');
    
    // Create safety questions modal
    createSafetyQuestionsModal();
}

function showPopulationGuide() {
    console.log('Show population guide called');
    showSafetyNotification('Population safety guide activated', 'info');
    
    // Create population guide modal
    createPopulationGuideModal();
}

// Dynamic Modal Creation Functions
function createSafetyComparisonModal() {
    const modalHTML = `
        <div id="safety-comparison-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('safety-comparison-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3>Safety Advantage Comparison Tool</h3>
                    <button class="modal-close" onclick="closeModal('safety-comparison-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="comparison-tool">
                        <h4>Compare Ultrasound Safety with Other Imaging Methods</h4>
                        <div class="comparison-results">
                            <div class="comparison-item">
                                <h5>🛡️ Radiation Safety</h5>
                                <p><strong>Ultrasound:</strong> Zero radiation exposure</p>
                                <p><strong>Advantage:</strong> No cancer risk, unlimited use</p>
                            </div>
                            <div class="comparison-item">
                                <h5>👶 Pregnancy Safety</h5>
                                <p><strong>Ultrasound:</strong> Gold standard throughout pregnancy</p>
                                <p><strong>Advantage:</strong> No harmful effects to mother or baby</p>
                            </div>
                            <div class="comparison-item">
                                <h5>👶 Pediatric Safety</h5>
                                <p><strong>Ultrasound:</strong> Safe from birth with no age restrictions</p>
                                <p><strong>Advantage:</strong> No special precautions needed</p>
                            </div>
                            <div class="comparison-item">
                                <h5>🔄 Repeat Examinations</h5>
                                <p><strong>Ultrasound:</strong> Unlimited safe examinations</p>
                                <p><strong>Advantage:</strong> No cumulative effects</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if present
    const existingModal = document.getElementById('safety-comparison-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('safety-comparison-modal');
}

function createPregnancyTrackerModal() {
    const modalHTML = `
        <div id="pregnancy-tracker-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('pregnancy-tracker-modal')"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Pregnancy Safety Tracker</h3>
                    <button class="modal-close" onclick="closeModal('pregnancy-tracker-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="pregnancy-tracker">
                        <h4>Track Your Safe Ultrasound Examinations</h4>
                        <div class="tracker-info">
                            <div class="safety-assurance">
                                <p><strong>✅ All ultrasound examinations during pregnancy are safe</strong></p>
                                <p>There is no limit to the number of ultrasound examinations you can safely have.</p>
                            </div>
                            
                            <div class="trimester-safety">
                                <h5>Safety by Trimester</h5>
                                <div class="trimester-item">
                                    <strong>First Trimester (0-12 weeks):</strong>
                                    <p>Completely safe - Essential for dating and viability</p>
                                </div>
                                <div class="trimester-item">
                                    <strong>Second Trimester (13-26 weeks):</strong>
                                    <p>Completely safe - Detailed anatomy screening</p>
                                </div>
                                <div class="trimester-item">
                                    <strong>Third Trimester (27-40 weeks):</strong>
                                    <p>Completely safe - Growth monitoring and positioning</p>
                                </div>
                            </div>
                            
                            <div class="medical-endorsement">
                                <h5>Medical Organization Endorsement</h5>
                                <p>✅ ACOG (American College of Obstetricians and Gynecologists)</p>
                                <p>✅ WHO (World Health Organization)</p>
                                <p>✅ FDA (Food and Drug Administration)</p>
                                <p>✅ All major medical organizations worldwide</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('pregnancy-tracker-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('pregnancy-tracker-modal');
}

function createSafetyQuestionsModal() {
    const modalHTML = `
        <div id="safety-questions-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('safety-questions-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3>Safety Question Checker</h3>
                    <button class="modal-close" onclick="closeModal('safety-questions-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="safety-questions">
                        <h4>Common Ultrasound Safety Questions & Answers</h4>
                        <div class="faq-list">
                            ${ultrasoundSafetyApp.safetyData.mythsVsFacts.map(item => `
                                <div class="faq-item">
                                    <div class="question">
                                        <strong>Q: ${item.myth}</strong>
                                    </div>
                                    <div class="answer">
                                        <strong>A:</strong> ${item.fact}
                                        <small><em>Evidence: ${item.evidence}</em></small>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="additional-questions">
                            <h5>Have More Questions?</h5>
                            <p>✅ Ask your healthcare provider</p>
                            <p>✅ Consult with the sonographer</p>
                            <p>✅ Contact the facility safety officer</p>
                            <p>✅ Review professional medical guidelines</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('safety-questions-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('safety-questions-modal');
}

function createPopulationGuideModal() {
    const modalHTML = `
        <div id="population-guide-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('population-guide-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3>Population-Specific Safety Guide</h3>
                    <button class="modal-close" onclick="closeModal('population-guide-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="population-guide">
                        <h4>Ultrasound Safety for All Populations</h4>
                        
                        <div class="population-section">
                            <h5>👶 Infants & Children</h5>
                            <ul>
                                ${ultrasoundSafetyApp.safetyData.populationSafety.pediatric.benefits.map(benefit => `<li>✅ ${benefit}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="population-section">
                            <h5>👩 👨 Adults</h5>
                            <ul>
                                ${ultrasoundSafetyApp.safetyData.populationSafety.adult.benefits.map(benefit => `<li>✅ ${benefit}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="population-section">
                            <h5>🏥 Special Populations</h5>
                            ${ultrasoundSafetyApp.safetyData.populationSafety.specialPopulations.map(pop => `
                                <div class="special-population">
                                    <strong>${pop.population}:</strong>
                                    <p>✅ ${pop.safety}</p>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="universal-safety">
                            <h5>🌐 Universal Safety Profile</h5>
                            <p><strong>Ultrasound is safe for virtually everyone, regardless of:</strong></p>
                            <ul>
                                <li>✅ Age (from birth to elderly)</li>
                                <li>✅ Health conditions</li>
                                <li>✅ Medications</li>
                                <li>✅ Medical devices or implants</li>
                                <li>✅ Pregnancy status</li>
                                <li>✅ Immune system status</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('population-guide-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('population-guide-modal');
}

// Chart Functions
function initializeRadiationChart() {
    console.log('Initializing radiation comparison chart');
    const ctx = document.getElementById('radiationChart');
    if (!ctx) {
        console.error('Radiation chart canvas not found');
        return;
    }
    
    // Destroy existing chart if it exists
    if (ultrasoundSafetyApp.currentChart) {
        ultrasoundSafetyApp.currentChart.destroy();
    }
    
    // Radiation exposure data
    const chartData = {
        labels: ['Ultrasound', 'X-ray', 'CT Scan', 'MRI', 'Annual Background'],
        datasets: [{
            label: 'Radiation Exposure (mSv)',
            data: [
                ultrasoundSafetyApp.radiationData.ultrasound,
                ultrasoundSafetyApp.radiationData.xray,
                ultrasoundSafetyApp.radiationData.ctScan,
                ultrasoundSafetyApp.radiationData.mri,
                ultrasoundSafetyApp.radiationData.naturalBackground
            ],
            backgroundColor: [
                '#4CAF50',  // Green for ultrasound (safe)
                '#FFC107',  // Yellow for X-ray (caution)
                '#FF5722',  // Orange-red for CT (higher exposure)
                '#2196F3',  // Blue for MRI (no radiation)
                '#9E9E9E'   // Gray for background
            ],
            borderColor: [
                '#388E3C',
                '#FF8F00',
                '#D84315',
                '#1976D2',
                '#616161'
            ],
            borderWidth: 2
        }]
    };
    
    const config = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Radiation Exposure Comparison - Ultrasound vs Other Imaging',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const method = context.label;
                            
                            if (method === 'Ultrasound' || method === 'MRI') {
                                return `${method}: ${value} mSv (No radiation - completely safe)`;
                            }
                            return `${method}: ${value} mSv`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Radiation Exposure (mSv)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + ' mSv';
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Imaging Method'
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    };
    
    try {
        ultrasoundSafetyApp.currentChart = new Chart(ctx, config);
        showSafetyNotification('Radiation safety comparison chart loaded', 'success');
    } catch (error) {
        console.error('Error creating chart:', error);
        showSafetyNotification('Chart loading error - functionality may be limited', 'warning');
    }
}

// Notification System
function showSafetyNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `safety-notification safety-notification--${type}`;
    
    const iconMap = {
        info: '🛡️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
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
    
    // Position notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2000;
        background: var(--color-surface);
        border: 2px solid var(--color-ultrasound-pink);
        border-radius: var(--safety-border-radius);
        padding: var(--space-12) var(--space-16);
        box-shadow: var(--safety-shadow);
        max-width: 400px;
        animation: slideInSafety 0.3s ease-out;
        font-family: var(--font-family-safety);
    `;
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutSafety 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Event Listeners Setup
function setupSafetyEventListeners() {
    console.log('Setting up safety event listeners...');
    
    // Navigation smooth scrolling - Fixed to work with both href and onclick
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
            }
        }
    });
    
    console.log('Safety event listeners set up successfully');
}

// Scroll-based navigation highlighting
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

// Safety Statistics Display
function displaySafetyStats() {
    const stats = ultrasoundSafetyApp.safetyData.safetyStatistics;
    
    console.log('Safety Statistics:', {
        seriousEvents: stats.adverseEvents.seriousEvents,
        followUpYears: stats.longTermStudies.followUpPeriod,
        childhoodDevelopment: stats.longTermStudies.childhoodDevelopment
    });
}

// Emergency Protocol Information
function displayEmergencyInfo() {
    const protocols = ultrasoundSafetyApp.safetyData.emergencyProtocols;
    
    console.log('Emergency Protocols:', {
        contacts: protocols.emergencyContacts,
        procedures: protocols.safetyProtocols
    });
}

// Safety Validation Functions
function validateSafetyData() {
    const data = ultrasoundSafetyApp.safetyData;
    
    // Validate no radiation data
    const noRadiation = data.noRadiation.radiationExposure === "0 mSv";
    const safetyRecord = data.noRadiation.safetyRecord.includes("50+");
    const lowAdverseEvents = data.safetyStatistics.adverseEvents.seriousEvents === "<0.001%";
    
    console.log('Safety Data Validation:', {
        noRadiation: noRadiation ? '✅' : '❌',
        longSafetyRecord: safetyRecord ? '✅' : '❌',
        lowAdverseEvents: lowAdverseEvents ? '✅' : '❌'
    });
    
    return noRadiation && safetyRecord && lowAdverseEvents;
}

// Performance monitoring
function initializeSafetyPerformanceMonitoring() {
    // Monitor chart rendering performance
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.name.includes('safety') || entry.name.includes('chart')) {
                console.log(`Safety feature rendering: ${entry.duration.toFixed(2)}ms`);
            }
        }
    });
    
    if (typeof PerformanceObserver !== 'undefined') {
        observer.observe({ entryTypes: ['measure'] });
    }
}

// Initialize the safety application
function initializeUltrasoundSafetyApp() {
    console.log('Initializing Ultrasound Safety Information Center...');
    
    // Validate safety data
    const isDataValid = validateSafetyData();
    if (!isDataValid) {
        console.warn('Safety data validation failed - please review');
    }
    
    // Set up event listeners
    setupSafetyEventListeners();
    
    // Initialize charts after DOM is ready
    setTimeout(() => {
        initializeRadiationChart();
    }, 100);
    
    // Display safety statistics
    displaySafetyStats();
    
    // Set up performance monitoring
    initializeSafetyPerformanceMonitoring();
    
    console.log('Ultrasound Safety Information Center initialized successfully');
}

// Scroll listener for navigation highlighting
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavOnScroll, 100);
});

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Ultrasound Safety App Error:', event.error);
    showSafetyNotification('A technical error occurred. Safety information remains valid. Please refresh if problems persist.', 'error');
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Ultrasound Safety Information Center loaded in ${loadTime.toFixed(2)}ms`);
    
    // Show welcome notification after load
    setTimeout(() => {
        showSafetyNotification('🛡️ Ultrasound Safety Information Center loaded. Complete safety resource ready.', 'success');
    }, 1000);
    
    // Ensure all safety features are working
    const safetyFeaturesCheck = {
        navigationWorking: document.querySelectorAll('.nav-section').length > 0,
        modalsAvailable: document.querySelectorAll('.modal').length > 0,
        chartsReady: document.getElementById('radiationChart') !== null,
        safetyDataLoaded: ultrasoundSafetyApp.safetyData.noRadiation.radiationExposure === "0 mSv"
    };
    
    console.log('Safety Features Status:', safetyFeaturesCheck);
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Ultrasound Safety Information Center...');
    initializeUltrasoundSafetyApp();
});

// Export functions to global scope for onclick handlers
window.scrollToSection = scrollToSection;
window.showSafetyCalculator = showSafetyCalculator;
window.showEmergencyInfo = showEmergencyInfo;
window.showSafetyComparison = showSafetyComparison;
window.showPregnancyTracker = showPregnancyTracker;
window.showSafetyQuestions = showSafetyQuestions;
window.showPopulationGuide = showPopulationGuide;
window.showModal = showModal;
window.closeModal = closeModal;

// Add safety-specific CSS animations
const safetyStyle = document.createElement('style');
safetyStyle.textContent = `
    @keyframes slideInSafety {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutSafety {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .safety-notification {
        font-size: var(--font-size-sm);
        line-height: var(--line-height-normal);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--space-8);
    }
    
    .notification-icon {
        font-size: var(--font-size-base);
        flex-shrink: 0;
    }
    
    .notification-message {
        flex: 1;
        color: var(--color-text);
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: var(--font-size-lg);
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: 0;
        line-height: 1;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all var(--duration-safety) var(--ease-safety);
    }
    
    .notification-close:hover {
        color: var(--color-text);
        background: var(--color-secondary);
    }
    
    .faq-item {
        background: var(--color-safety-bg-1);
        border-radius: var(--safety-border-radius);
        padding: var(--space-16);
        margin-bottom: var(--space-16);
        border-left: 4px solid var(--color-ultrasound-pink);
    }
    
    .faq-item .question {
        color: var(--color-text);
        margin-bottom: var(--space-8);
        font-size: var(--font-size-base);
    }
    
    .faq-item .answer {
        color: var(--color-text-secondary);
        font-size: var(--font-size-base);
        line-height: var(--line-height-normal);
    }
    
    .faq-item .answer strong {
        color: var(--color-text);
    }
    
    .faq-item .answer small {
        display: block;
        margin-top: var(--space-8);
        color: var(--color-text-secondary);
        font-style: italic;
    }
    
    .comparison-item,
    .trimester-item,
    .special-population,
    .population-section {
        background: var(--color-safety-bg-1);
        border-radius: var(--safety-border-radius);
        padding: var(--space-16);
        margin-bottom: var(--space-12);
        border-left: 4px solid var(--color-ultrasound-pink);
    }
    
    .comparison-item h5,
    .population-section h5 {
        color: var(--color-ultrasound-pink);
        margin: 0 0 var(--space-8) 0;
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
    }
    
    .comparison-item p,
    .trimester-item p,
    .special-population p {
        margin: var(--space-4) 0;
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
    }
    
    .comparison-item strong,
    .trimester-item strong,
    .special-population strong {
        color: var(--color-text);
    }
    
    .additional-questions,
    .universal-safety,
    .medical-endorsement {
        background: rgba(76, 175, 80, 0.1);
        border: 2px solid var(--color-safety-excellent);
        border-radius: var(--safety-border-radius);
        padding: var(--space-16);
        margin-top: var(--space-16);
    }
    
    .additional-questions h5,
    .universal-safety h5,
    .medical-endorsement h5 {
        color: var(--color-safety-excellent);
        margin: 0 0 var(--space-12) 0;
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
    }
    
    .additional-questions p,
    .universal-safety p,
    .universal-safety li,
    .medical-endorsement p {
        color: var(--color-text);
        margin: var(--space-4) 0;
        font-size: var(--font-size-sm);
    }
    
    .safety-assurance {
        background: rgba(76, 175, 80, 0.1);
        border: 2px solid var(--color-safety-excellent);
        border-radius: var(--safety-border-radius);
        padding: var(--space-16);
        margin-bottom: var(--space-16);
        text-align: center;
    }
    
    .safety-assurance p {
        margin: var(--space-8) 0;
        color: var(--color-text);
        font-size: var(--font-size-base);
        line-height: var(--line-height-normal);
    }
    
    .safety-assurance strong {
        color: var(--color-safety-excellent);
        font-size: var(--font-size-lg);
    }
`;
document.head.appendChild(safetyStyle);

console.log('Ultrasound Safety Information Center JavaScript loaded successfully 🛡️👶');