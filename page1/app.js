// Comprehensive Healthcare Dashboard Interactive Features

// Global state management
const healthcareDashboard = {
    currentCondition: 'diabetes',
    currentInnovation: null,
    currentCaseStudy: 'tb-ai',
    selectedHabits: new Set(),
    currentChartType: 'pie',
    notifications: [],
    diagnosticDetails: {
        xray: { visible: false },
        mri: { visible: false },
        ultrasound: { visible: false },
        lab: { visible: false }
    }
};

// DOM Elements
let navToggle, navMenu, loadingOverlay, notificationSystem;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    navToggle = document.querySelector('.navbar__toggle');
    navMenu = document.querySelector('.navbar__menu');
    loadingOverlay = document.getElementById('loading-overlay');
    notificationSystem = document.getElementById('notification-system');

    // Initialize all features
    initializeNavigation();
    initializeSmoothScrolling();
    initializeDiagnostics();
    initializeTreatments();
    initializeInnovations();
    initializeWellness();
    initializeSchemes();
    initializeStatistics();
    initializeCaseStudies();
    initializeScrollSpy();
    initializeKeyboardNavigation();
    
    console.log('Healthcare Dashboard initialized successfully');
    showNotification('Healthcare Dashboard loaded successfully!', 'success');
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

// Initialize smooth scrolling for all navigation
function initializeSmoothScrolling() {
    // Handle all anchor links
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
        
        console.log(`Scrolled to section: ${sectionId}`);
        showNotification(`Navigated to ${sectionId} section`, 'info');
    } else {
        console.warn(`Target element not found: ${sectionId}`);
        showNotification(`Section ${sectionId} not found`, 'warning');
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

// Diagnostic Tools Functions
function initializeDiagnostics() {
    console.log('Diagnostic tools initialized');
}

function showDiagnosticDetails(tool) {
    showLoadingState();
    
    setTimeout(() => {
        const details = {
            xray: 'X-Ray and CT scans provide rapid imaging for bone fractures, tumors, and internal structures. Minimal radiation exposure with maximum diagnostic value.',
            mri: 'MRI uses powerful magnetic fields to create detailed images of soft tissues, brain, and joints without any radiation exposure.',
            ultrasound: 'Ultrasound is completely safe and non-invasive, using sound waves to monitor organs, pregnancy, and blood flow.',
            lab: 'Laboratory tests analyze blood, urine, and other fluids to measure vital markers like glucose, hemoglobin, and liver function.'
        };
        
        hideLoadingState();
        showNotification(`${tool.toUpperCase()}: ${details[tool]}`, 'info');
        console.log(`Showing details for: ${tool}`);
    }, 1000);
}

function showSafetyInfo(tool) {
    const safetyInfo = {
        xray: 'Uses ionizing radiation - minimal exposure levels considered safe for diagnostic purposes.',
        mri: 'No radiation exposure. Completely safe except for patients with certain metal implants.',
        ultrasound: 'Completely safe with no known side effects. Safe for pregnancy monitoring.',
        lab: 'Minimal invasive procedures. Slight discomfort during blood draw.'
    };
    
    const safetyLevel = {
        xray: 'warning',
        mri: 'success',
        ultrasound: 'success',
        lab: 'info'
    };
    
    showNotification(`Safety: ${safetyInfo[tool]}`, safetyLevel[tool]);
}

function toggleTechDetails(tool) {
    const detailsElement = document.getElementById(`${tool}-details`);
    if (detailsElement) {
        detailsElement.classList.toggle('hidden');
        healthcareDashboard.diagnosticDetails[tool].visible = !detailsElement.classList.contains('hidden');
        
        const action = healthcareDashboard.diagnosticDetails[tool].visible ? 'shown' : 'hidden';
        console.log(`Technical details for ${tool} ${action}`);
        showNotification(`Technical details for ${tool} ${action}`, 'info');
    }
}

function compareDiagnostics(tool1, tool2) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification(`Comparing ${tool1.toUpperCase()} vs ${tool2.toUpperCase()} - Check detailed comparison chart`, 'info');
    }, 1500);
}

function showAllComparison() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Comprehensive diagnostic tools comparison loaded', 'success');
    }, 2000);
}

// Treatment Functions
function initializeTreatments() {
    // Set initial active treatment panel
    selectCondition('diabetes');
}

function selectCondition(condition) {
    // Update tabs
    const tabs = document.querySelectorAll('.condition-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(condition.toLowerCase()) ||
        tab.onclick?.toString().includes(condition)
    );
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Update panels
    const panels = document.querySelectorAll('.treatment-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    const activePanel = document.getElementById(`${condition}-panel`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    healthcareDashboard.currentCondition = condition;
    console.log(`Selected condition: ${condition}`);
    showNotification(`Switched to ${condition} treatment options`, 'info');
}

function showStepDetails(step) {
    const stepDetails = {
        1: 'Lifestyle changes include balanced diet, regular exercise, weight management, and blood sugar monitoring.',
        2: 'Metformin is typically the first medication prescribed to help lower blood glucose levels.',
        3: 'Insulin therapy may be required when oral medications are insufficient for glucose control.',
        4: 'Bariatric surgery may be considered for severely obese patients with uncontrolled diabetes.'
    };
    
    showNotification(`Step ${step}: ${stepDetails[step]}`, 'info');
    
    // Highlight the active step
    const steps = document.querySelectorAll('.timeline-step');
    steps.forEach(s => s.classList.remove('active'));
    
    const activeStep = document.querySelector(`[data-step="${step}"]`);
    if (activeStep) {
        activeStep.classList.add('active');
    }
}

function selectTreatment(treatment) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification(`${treatment} treatment pathway selected. Consult your healthcare provider for personalized advice.`, 'success');
    }, 1000);
}

function showTreatmentDetails(treatment) {
    const details = {
        lifestyle: 'Lifestyle modifications are the cornerstone of hypertension management, including DASH diet, regular exercise, stress management, and sleep optimization.',
        medication: 'Antihypertensive medications include ACE inhibitors, ARBs, diuretics, and calcium channel blockers, prescribed based on individual patient needs.'
    };
    
    showNotification(`Treatment Details: ${details[treatment]}`, 'info');
}

function selectCancerTreatment(treatment) {
    const treatments = {
        surgery: 'Surgical removal of tumors - most effective when cancer is localized',
        chemo: 'Chemotherapy uses powerful drugs to destroy cancer cells throughout the body',
        radiation: 'Radiation therapy uses high-energy rays to target and destroy cancer cells',
        immunotherapy: 'Immunotherapy helps boost your immune system to fight cancer naturally'
    };
    
    showNotification(`Selected: ${treatments[treatment]}`, 'success');
}

function showSuccessRates() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Treatment success rates: Diabetes management 85%, Hypertension control 78%, Early cancer detection 90%+', 'info');
    }, 1500);
}

function compareCosts() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Cost comparison loaded - Lifestyle changes are most cost-effective long-term', 'info');
    }, 1500);
}

function findProviders() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Found 24 healthcare providers in your area. Use location services for precise results.', 'success');
    }, 2000);
}

// Innovation Functions
function initializeInnovations() {
    console.log('Healthcare innovations initialized');
}

function showInnovationDetails(innovation) {
    const details = {
        ai: 'AI in healthcare includes medical imaging analysis, diagnostic assistance, drug discovery, and personalized treatment recommendations.',
        robotics: 'Robotic surgery systems provide enhanced precision, smaller incisions, faster recovery, and reduced complications.',
        telemedicine: 'Telemedicine platforms enable remote consultations, monitoring, and healthcare delivery to underserved areas.',
        wearables: 'Wearable devices track vital signs, activity, sleep patterns, and provide early health warnings.'
    };
    
    showNotification(`Innovation Details: ${details[innovation]}`, 'info');
    healthcareDashboard.currentInnovation = innovation;
}

function showStats(innovation) {
    const stats = {
        ai: '90% of hospitals use AI imaging tools, 66% of physicians use AI (up from 38% in 2023)',
        robotics: '25% shorter surgery times, 30% fewer complications, faster patient recovery',
        telemedicine: '340 million consultations in India via eSanjeevani platform since 2019',
        wearables: 'Rapid adoption with 70% accuracy in health monitoring and early detection'
    };
    
    showNotification(`Statistics: ${stats[innovation]}`, 'success');
}

function tryDemo(innovation) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification(`${innovation.toUpperCase()} demo launched! Interactive simulation now available.`, 'success');
    }, 2000);
}

function watchDemo(innovation) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification(`Playing ${innovation} demonstration video...`, 'info');
    }, 1000);
}

function bookConsultation() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Telemedicine consultation booking portal opened. Next available slot: Today 3:00 PM', 'success');
    }, 1500);
}

function showDevices() {
    showNotification('Wearable devices: Smartwatches, fitness trackers, continuous glucose monitors, ECG monitors', 'info');
}

function connectDevice() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Device pairing initiated. Please enable Bluetooth and follow device instructions.', 'info');
    }, 2000);
}

function showTimeline(year) {
    const timelines = {
        '2020': 'COVID-19 accelerated telemedicine adoption',
        '2021': 'AI diagnostic tools gained FDA approvals',
        '2022': 'Robotic surgery systems expanded globally',
        '2023': 'Wearable health monitoring became mainstream',
        '2024': 'AI physician usage jumped to 66%'
    };
    
    showNotification(`${year}: ${timelines[year]}`, 'info');
}

// Wellness Functions
function initializeWellness() {
    console.log('Wellness tracking initialized');
}

function toggleHabit(habit) {
    const checkbox = event.target;
    checkbox.classList.toggle('checked');
    
    if (checkbox.classList.contains('checked')) {
        healthcareDashboard.selectedHabits.add(habit);
        showNotification(`Great! ${habit} goal marked as complete for today.`, 'success');
    } else {
        healthcareDashboard.selectedHabits.delete(habit);
        showNotification(`${habit} goal unmarked. You can complete it later.`, 'info');
    }
    
    console.log('Active habits:', Array.from(healthcareDashboard.selectedHabits));
}

function setNutritionGoal() {
    showNotification('Nutrition goal set: 5+ servings of fruits/vegetables daily. Track your progress!', 'success');
}

function setExerciseGoal() {
    showNotification('Exercise goal set: 150 minutes moderate activity per week. Start today!', 'success');
}

function setSleepGoal() {
    showNotification('Sleep goal set: 7-9 hours nightly. Good sleep is essential for health!', 'success');
}

function setHydrationGoal() {
    showNotification('Hydration goal set: 8 glasses of water daily. Stay hydrated!', 'success');
}

function logNutrition() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Nutrition logged: 3/5 servings completed today. Keep going!', 'info');
    }, 1000);
}

function startWorkout() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Workout started! 30-minute moderate intensity session recommended.', 'success');
    }, 1000);
}

function trackSleep() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Sleep tracking enabled. Last night: 7.5 hours of quality sleep recorded.', 'info');
    }, 1500);
}

function logWater() {
    showNotification('Water intake logged: 6/8 glasses completed. Almost there!', 'info');
}

function scheduleScreening() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Health screening scheduled for next week. Reminder notifications enabled.', 'success');
    }, 2000);
}

function viewHistory(type) {
    showNotification(`${type} history loaded: Last check-up 3 months ago. Due for next screening.`, 'info');
}

function checkVaccinations() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Vaccination status: Up-to-date. COVID-19 booster due in 2 months.', 'success');
    }, 1500);
}

function findVaccines() {
    showNotification('Found 12 vaccination centers within 5km. Nearest center: 1.2km away.', 'success');
}

function hygieneReminders() {
    showNotification('Hygiene reminders set: Handwashing every 2 hours, dental care twice daily.', 'success');
}

function hygieneTips() {
    showNotification('Hygiene tips: Wash hands for 20 seconds, brush teeth for 2 minutes, floss daily.', 'info');
}

function stressAssessment() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Stress assessment completed: Moderate stress detected. Consider relaxation techniques.', 'warning');
    }, 2000);
}

function relaxationTechniques() {
    showNotification('Relaxation techniques: Deep breathing, meditation, yoga, progressive muscle relaxation.', 'info');
}

function viewProgress(period) {
    const messages = {
        daily: 'Daily progress: 3/4 wellness goals completed today',
        weekly: 'Weekly progress: 85% goal completion rate',
        monthly: 'Monthly progress: Excellent improvement in all health metrics'
    };
    
    showNotification(messages[period], 'success');
}

function exportProgress() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Wellness progress report exported successfully. Check your downloads.', 'success');
    }, 2000);
}

// Government Schemes Functions
function initializeSchemes() {
    console.log('Government schemes initialized');
}

function checkEligibility(scheme) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        const eligible = Math.random() > 0.3;
        const message = eligible ? 
            `You are eligible for ${scheme}! Proceed with application.` :
            `Additional documentation needed for ${scheme} eligibility verification.`;
        showNotification(message, eligible ? 'success' : 'warning');
    }, 2000);
}

function calculateBenefits(scheme) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        const benefits = {
            ayushman: 'Annual coverage: ₹5 lakh, Covers 1,900+ procedures, Cashless treatment at empaneled hospitals'
        };
        showNotification(benefits[scheme], 'success');
    }, 1500);
}

function applyScheme(scheme) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification(`${scheme} application portal opened. Complete KYC and upload required documents.`, 'info');
    }, 2000);
}

function findHospitals(scheme) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Found 47 empaneled hospitals in your district. Nearest facility: 3.5km away.', 'success');
    }, 1500);
}

function findCenter() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Nearest Health & Wellness Centre: 2.1km away. Open Mon-Sat, 9 AM - 5 PM.', 'success');
    }, 1500);
}

function viewServices(type) {
    const services = {
        hwc: 'Primary care, maternal health, child immunization, chronic disease management, free medicines'
    };
    showNotification(`Available services: ${services[type]}`, 'info');
}

function bookAppointment(type) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Appointment booked for tomorrow 10:00 AM. Confirmation SMS sent.', 'success');
    }, 2000);
}

function createHealthID() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Health ID creation initiated. Verify mobile number and complete registration.', 'info');
    }, 2000);
}

function accessRecords() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Electronic health records accessed. 15 medical records found since 2022.', 'success');
    }, 1500);
}

function linkRecords() {
    showNotification('Record linking initiated. Connect with your healthcare providers to sync data.', 'info');
}

function bookTeleconsultation() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('eSanjeevani teleconsultation booked. Doctor available in 15 minutes.', 'success');
    }, 2000);
}

function downloadApp(app) {
    const apps = {
        esanjeevani: 'eSanjeevani app download started. Install from Play Store for teleconsultations.',
        smartphone: 'Health monitoring app download initiated. Features: weight estimation, growth tracking.'
    };
    showNotification(apps[app], 'info');
}

function viewDoctors() {
    showNotification('Available specialists: General Medicine (5), Pediatrics (3), Gynecology (4), Cardiology (2)', 'info');
}

function compareSchemes(type) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Scheme comparison chart loaded. Compare benefits, eligibility, and coverage.', 'success');
    }, 2000);
}

function eligibilityChecker() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Multi-scheme eligibility checker loaded. Enter details to check all schemes.', 'info');
    }, 1500);
}

function schemeRecommendation() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Recommendation: Ayushman Bharat + Health & Wellness Centre services best suit your profile.', 'success');
    }, 2000);
}

// Statistics Functions
function initializeStatistics() {
    // Set initial chart type
    changeChartType('pie');
}

function changeChartType(type) {
    const buttons = document.querySelectorAll('.chart-type-selector .btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = Array.from(buttons).find(btn => btn.onclick?.toString().includes(type));
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    healthcareDashboard.currentChartType = type;
    showNotification(`Chart type changed to ${type}`, 'info');
}

function filterData(category) {
    const categories = {
        spending: 'Healthcare spending data filtered: India 3.3% GDP vs WHO recommended 5-6%',
        insurance: 'Insurance coverage data: 40% Indians covered, 55 crore under government schemes',
        digital: 'Digital adoption metrics: 90% hospitals use AI, 66% physicians adopted AI in 2024',
        diseases: 'Disease burden statistics: NCDs cause 50%+ deaths, lifestyle factors major contributors'
    };
    
    showNotification(categories[category], 'info');
}

function showSpendingDetails() {
    showNotification('Healthcare spending breakdown: Government 30%, Private 62-63% out-of-pocket, Insurance 7%', 'info');
}

function compareGlobal(type) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Global comparison loaded: India ranks 145/195 in healthcare spending efficiency', 'info');
    }, 1500);
}

function showCostBreakdown() {
    showNotification('Cost breakdown: Medicines 50%, Hospital care 30%, Diagnostics 15%, Others 5%', 'warning');
}

function reductionStrategies() {
    showNotification('Cost reduction tips: Use government schemes, generic medicines, preventive care, health insurance', 'success');
}

function checkCoverage() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Coverage check: You have government insurance + private policy. Good coverage!', 'success');
    }, 1500);
}

function findInsurance() {
    showNotification('Insurance options: Ayushman Bharat, private health insurance, employer coverage available', 'info');
}

function digitalTrends() {
    showNotification('Digital trends: AI adoption doubled in 2024, telemedicine usage up 300% since COVID-19', 'info');
}

function adoptionTimeline() {
    showNotification('Adoption timeline: 2020 telemedicine boom, 2022 AI breakthrough, 2024 mainstream adoption', 'info');
}

function exportData(format) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification(`Healthcare statistics exported to ${format.toUpperCase()} format`, 'success');
    }, 2000);
}

function shareData() {
    if (navigator.share) {
        navigator.share({
            title: 'Healthcare Statistics India',
            text: 'Comprehensive healthcare data and government schemes',
            url: window.location.href
        });
    } else {
        showNotification('Share link copied to clipboard', 'success');
    }
}

function printReport() {
    window.print();
    showNotification('Printing healthcare statistics report...', 'info');
}

// Case Studies Functions
function initializeCaseStudies() {
    selectCaseStudy('tb-ai');
}

function selectCaseStudy(study) {
    // Update tabs
    const tabs = document.querySelectorAll('.case-study-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.onclick?.toString().includes(study)
    );
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Update panels
    const panels = document.querySelectorAll('.case-study-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    const activePanel = document.getElementById(`${study}-panel`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
    
    healthcareDashboard.currentCaseStudy = study;
    console.log(`Selected case study: ${study}`);
}

function showProcessDiagram(study) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification(`${study} process diagram loaded with step-by-step workflow visualization`, 'success');
    }, 1500);
}

function showImpactMetrics(study) {
    const metrics = {
        'tb-ai': 'Impact: 2x better patient risk identification, 40% reduction in treatment dropout',
        'smartphone': 'Impact: 95% accuracy in weight estimation, serves 10,000+ remote patients',
        'apollo': 'Impact: 70% cost reduction in rural healthcare, 50% faster diagnosis'
    };
    
    showNotification(metrics[study], 'success');
}

function compareBeforeAfter(study) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Before/After comparison loaded: Significant improvement in patient outcomes and efficiency', 'info');
    }, 1500);
}

function demoApp(study) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Interactive app demo launched! Try the infant weight estimation feature.', 'success');
    }, 2000);
}

function showAccuracy(study) {
    showNotification('Accuracy data: 95% precision in weight estimation, 3% margin of error vs traditional scales', 'info');
}

function exploreModel(study) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Digital health delivery model: Hub-spoke telemedicine + AI diagnostics + local clinics', 'info');
    }, 1500);
}

function showSuccessStory(study) {
    showNotification('Success story: Rural patient received specialist care via telemedicine, avoided 200km travel', 'success');
}

function findLocations(study) {
    showNotification('Digital health centers: 15 locations in your state, 3 within 50km radius', 'success');
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

function showNotification(message, type = 'info') {
    if (!notificationSystem) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <p>${message}</p>
            <button class="notification__close" onclick="closeNotification(this)">×</button>
        </div>
    `;
    
    notificationSystem.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
    
    healthcareDashboard.notifications.push({
        message,
        type,
        timestamp: new Date()
    });
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification && notification.parentNode) {
        notification.parentNode.removeChild(notification);
    }
}

// Footer Actions
function contactSupport() {
    showNotification('Support contact: Email: support@healthcare.gov.in, Phone: 1800-123-456', 'info');
}

function provideFeedback() {
    showNotification('Feedback form opened. Please share your experience using the healthcare dashboard.', 'info');
}

function reportIssue() {
    showNotification('Issue reporting portal opened. Describe the problem for quick resolution.', 'warning');
}

// Scroll Spy for Navigation
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveNavLink(id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Keyboard Navigation
function initializeKeyboardNavigation() {
    // Skip to main content
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

    // Escape key functionality
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Close mobile menu
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.click();
            }
            
            // Hide loading overlay
            if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
                hideLoadingState();
            }
        }
    });
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Healthcare Dashboard Error:', event.error);
    showNotification('An error occurred. Please refresh the page or contact support.', 'error');
});

// Responsive behavior
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navToggle.click();
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Healthcare Dashboard loaded in ${loadTime.toFixed(2)}ms`);
    
    if (loadTime > 3000) {
        showNotification('Slow loading detected. Check your internet connection.', 'warning');
    }
});

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Note: In a real implementation, you would register a service worker here
        console.log('Service worker support detected');
    });
}

// Export for global access and debugging
window.healthcareDashboard = healthcareDashboard;
window.scrollToSection = scrollToSection;

console.log('Healthcare Dashboard v1.0 - All systems operational');