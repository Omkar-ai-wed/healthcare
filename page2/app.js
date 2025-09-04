// Traditional Healthcare Dashboard Interactive Features

// Global state management
const traditionalHealthcareDashboard = {
    currentCondition: 'digestive',
    currentSystem: 'ayurveda',
    currentWisdom: 'texts',
    selectedRituals: new Set(),
    doshaAssessment: null,
    tcmAssessment: null,
    notifications: [],
    seasonalGuidance: 'autumn' // Current season
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
    initializeConstitution();
    initializeRemedies();
    initializeWisdom();
    initializeWellness();
    initializeAYUSHPrograms();
    initializeScrollSpy();
    initializeKeyboardNavigation();
    
    console.log('Traditional Healthcare Dashboard initialized successfully');
    showNotification('Traditional Healthcare Dashboard loaded - Ancient wisdom for modern wellness!', 'success');
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

// Dashboard Hero Functions
function findPractitioner() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Found 15 traditional medicine practitioners near you: 8 Ayurveda, 4 TCM, 3 Yoga therapists', 'success');
    }, 2000);
}

// Constitutional Diagnosis Functions
function initializeConstitution() {
    console.log('Constitutional diagnosis systems initialized');
}

function startDoshaAssessment() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        const doshas = ['Vata', 'Pitta', 'Kapha'];
        const dominantDosha = doshas[Math.floor(Math.random() * doshas.length)];
        
        traditionalHealthcareDashboard.doshaAssessment = {
            dominant: dominantDosha,
            date: new Date()
        };
        
        showNotification(`Dosha Assessment Complete! Your dominant constitution is ${dominantDosha}. View personalized recommendations.`, 'success');
        
        // Show dosha-specific guidance
        setTimeout(() => {
            showDoshaGuidance(dominantDosha);
        }, 2000);
    }, 3000);
}

function showDoshaDetails() {
    const doshaInfo = `
        🌬️ Vata (Air + Space): Movement, circulation, nervous system
        🔥 Pitta (Fire + Water): Digestion, metabolism, body temperature  
        🌍 Kapha (Earth + Water): Structure, immunity, lubrication
    `;
    showNotification(doshaInfo, 'info');
}

function showDoshaGuidance(dosha) {
    const guidance = {
        'Vata': 'Warm, moist foods; regular routine; oil massage. Avoid cold, dry, light foods.',
        'Pitta': 'Cool foods; moderate exercise; avoid excess heat. Focus on sweet, bitter, astringent tastes.',
        'Kapha': 'Light foods; vigorous exercise; dry heat. Emphasize pungent, bitter, astringent flavors.'
    };
    
    showNotification(`${dosha} Balance Guidance: ${guidance[dosha]}`, 'success');
}

function startTCMAssessment() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        const patterns = ['Yin Deficiency', 'Yang Deficiency', 'Qi Stagnation', 'Blood Stasis', 'Balanced'];
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        
        traditionalHealthcareDashboard.tcmAssessment = {
            pattern: pattern,
            elements: ['Wood', 'Fire', 'Earth', 'Metal', 'Water'],
            date: new Date()
        };
        
        showNotification(`TCM Assessment Complete! Pattern identified: ${pattern}. Five Elements analysis included.`, 'success');
    }, 3000);
}

function showTCMPatterns() {
    const patterns = `
        ☯️ Yin-Yang Balance: Cool/moist vs Warm/dry energies
        🌳 Wood: Liver/Gallbladder - Growth, flexibility
        🔥 Fire: Heart/Small Intestine - Joy, circulation
        🌍 Earth: Spleen/Stomach - Digestion, centering
        ⚪ Metal: Lung/Large Intestine - Breath, elimination
        💧 Water: Kidney/Bladder - Willpower, reproduction
    `;
    showNotification(patterns, 'info');
}

function learnPulseDiagnosis() {
    showNotification('Pulse diagnosis training: Learn to read 28 different pulse qualities at radial artery. 3-year traditional training recommended.', 'info');
}

function showPulseTypes() {
    showNotification('Pulse types: Floating, Deep, Slow, Rapid, Slippery, Rough, Wiry, Tight, Long, Short - each indicates different health conditions.', 'info');
}

function findPulseExpert() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Found 3 traditional pulse diagnosis experts within 25km. Average consultation: ₹800-1500', 'success');
    }, 1500);
}

function learnObservation() {
    showNotification('Observation diagnosis: Tongue coating, color, texture reveal internal health. Eye examination shows constitutional strength.', 'info');
}

function showObservationGuide() {
    const guide = `
        👅 Tongue: Pink=healthy, Pale=deficiency, Red=heat, Purple=stagnation
        👁️ Eyes: Clear=good health, Dull=fatigue, Bloodshot=excess heat
        🌈 Complexion: Rosy=vitality, Pale=anemia, Yellow=liver issues
    `;
    showNotification(guide, 'info');
}

function practiceObservation() {
    showNotification('Practice tool: Use mirror for self-examination. Best observed in natural morning light on empty stomach.', 'success');
}

function bookConsultation(system) {
    showLoadingState();
    
    const systems = {
        ayurveda: 'Ayurvedic physician consultation booked for tomorrow 2:00 PM. Consultation fee: ₹500',
        tcm: 'Traditional Chinese Medicine consultation scheduled for Friday 10:00 AM. Consultation fee: ₹800'
    };
    
    setTimeout(() => {
        hideLoadingState();
        showNotification(systems[system], 'success');
    }, 2000);
}

function compareSystemsAnalysis(system1, system2) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Systems comparison: Both Ayurveda and TCM emphasize constitutional balance, preventive care, and natural healing methods.', 'info');
    }, 1500);
}

function showConstitutionChart() {
    showNotification('Constitutional chart loaded: Visual comparison of Ayurveda doshas, TCM elements, and diagnostic methods.', 'success');
}

function integratedAssessment() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Integrated assessment combines Ayurvedic dosha analysis with TCM pattern recognition for comprehensive understanding.', 'success');
    }, 2500);
}

// Herbal Remedies Functions
function initializeRemedies() {
    selectCondition('digestive');
}

function selectCondition(condition) {
    // Update tabs
    const tabs = document.querySelectorAll('.condition-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(condition) ||
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
    
    traditionalHealthcareDashboard.currentCondition = condition;
    console.log(`Selected condition: ${condition}`);
    showNotification(`Switched to ${condition} health treatment pathways`, 'info');
}

function showDietaryGuidance(step) {
    const guidance = {
        1: 'Dietary modifications: Eat according to your dosha, avoid incompatible food combinations, mindful eating in peaceful environment.'
    };
    showNotification(`Step ${step}: ${guidance[step]}`, 'info');
    highlightTimelineStep(step);
}

function showHerbalFormulas(step) {
    const formulas = {
        2: 'Herbal formulations: Ginger for digestive fire, Triphala for overall digestion, Ajwain for gas, Hing for bloating. Take 30 min before meals.'
    };
    showNotification(`Step ${step}: ${formulas[step]}`, 'success');
    highlightTimelineStep(step);
}

function showBodyTherapies(step) {
    const therapies = {
        3: 'Body therapies: Abhyanga warm oil massage, acupuncture for digestive points, panchakarma for deep detox. 3-4 week programs available.'
    };
    showNotification(`Step ${step}: ${therapies[step]}`, 'warning');
    highlightTimelineStep(step);
}

function showMindBodyPractices(step) {
    const practices = {
        4: 'Mind-body practices: Daily meditation 20 min, pranayama breathing, yoga poses for digestion, stress reduction techniques.'
    };
    showNotification(`Step ${step}: ${practices[step]}`, 'info');
    highlightTimelineStep(step);
}

function highlightTimelineStep(step) {
    const steps = document.querySelectorAll('.timeline-step');
    steps.forEach(s => s.classList.remove('active'));
    
    const activeStep = document.querySelector(`[data-step="${step}"]`);
    if (activeStep) {
        activeStep.classList.add('active');
    }
}

function selectTreatment(treatment) {
    const treatments = {
        steam: 'Steam therapy: Inhale tulsi, eucalyptus, ginger steam for 10-15 minutes. Clears respiratory channels naturally.',
        breathing: 'Breathing practices: Pranayama strengthens lungs, Qi Gong regulates energy flow. Practice 2x daily for best results.'
    };
    
    showNotification(`Selected: ${treatments[treatment]}`, 'success');
}

function showSteamGuide() {
    showNotification('Steam guide: Add 5 drops essential oil to hot water, cover head with towel, inhale for 10-15 min. Avoid if pregnant.', 'info');
}

function showBreathingGuide() {
    showNotification('Breathing guide: Ujjayi (ocean breath), Kapalabhati (skull shining), Anulom-Vilom (alternate nostril). Start 5 min daily.', 'info');
}

function selectHerbalTreatment(herb) {
    const herbInfo = {
        turmeric: 'Turmeric therapy: Golden milk with turmeric, black pepper, ginger. Anti-inflammatory for joints. 1 cup before bed.',
        ashwagandha: 'Ashwagandha: Adaptogenic herb for strength, stress relief. 500mg twice daily with warm milk or water.',
        massage: 'Oil massage: Warm sesame oil for Vata, coconut oil for Pitta, mustard oil for Kapha. Massage 20 min before bath.',
        acupuncture: 'Acupuncture: Traditional meridian therapy for joint pain. 6-8 sessions recommended, certified practitioner essential.'
    };
    
    showNotification(`Selected: ${herbInfo[herb]}`, 'success');
}

function showHerbalDatabase() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Herbal database: 1000+ medicinal plants with uses, preparations, dosages, and safety information.', 'success');
    }, 1500);
}

function safetyChecker() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Safety checker: Always consult practitioner, check drug interactions, avoid during pregnancy unless advised.', 'warning');
    }, 1000);
}

function findHerbalist() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Found 12 qualified herbalists near you. Average consultation: ₹300-800. Herbal medicines ₹200-500/month.', 'success');
    }, 1500);
}

// Ancient Wisdom Functions
function initializeWisdom() {
    console.log('Ancient wisdom systems initialized');
}

function exploreClassicalTexts() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Classical texts: Charaka Samhita (Ayurveda internal medicine), Huang Di Nei Jing (TCM foundation). Study programs available.', 'success');
    }, 2000);
}

function showTextPrinciples() {
    const principles = `
        📚 Ayurveda: Tridosha theory, Panchamahabhuta (5 elements), disease prevention
        📚 TCM: Yin-Yang balance, Five Elements, Meridian system, Qi flow
        📚 Both: Constitutional medicine, seasonal living, mind-body unity
    `;
    showNotification(principles, 'info');
}

function learnPanchakarma() {
    showNotification('Panchakarma: 5 purification procedures - Vamana (emesis), Virechana (purgation), Basti (enemas), Nasya (nasal), Raktamokshana (bloodletting).', 'info');
}

function showPanchakarmaBenefits() {
    showNotification('Benefits: Deep detoxification, rejuvenation, immunity boost, mental clarity, chronic disease management. 21-28 day programs.', 'success');
}

function findPanchakarmaCenter() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Found 8 authentic Panchakarma centers within 50km. Cost: ₹25,000-75,000 for complete program.', 'success');
    }, 2000);
}

function exploreAcupuncture() {
    showNotification('Acupuncture: 365 classical points on 14 meridians. Treats pain, digestive issues, stress, fertility. Licensed practitioner required.', 'info');
}

function showMeridianMap() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Meridian map: 14 energy pathways connecting organs. Heart, Lung, Liver, Kidney meridians most commonly treated.', 'info');
    }, 1500);
}

function findAcupuncturist() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Found 7 licensed acupuncturists. Session cost: ₹800-2000. 6-8 sessions typical treatment course.', 'success');
    }, 1500);
}

function exploreYogaSystem() {
    showNotification('8-limbed yoga: Yama (restraints), Niyama (observances), Asana (postures), Pranayama (breath), Pratyahara (withdrawal), Dharana (concentration), Dhyana (meditation), Samadhi (union).', 'info');
}

function showYogaPractices() {
    const practices = `
        🧘‍♀️ Asana: 84 classical postures for physical health
        🫁 Pranayama: 8 breathing techniques for energy control
        🧠 Meditation: Concentration and mindfulness practices
        🌅 Daily practice: Morning sadhana for spiritual growth
    `;
    showNotification(practices, 'success');
}

function findYogaTeacher() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Found 20 certified yoga teachers. Group classes: ₹1500-3000/month. Private lessons: ₹500-1500/session.', 'success');
    }, 1500);
}

function findTraining(subject) {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        const training = {
            texts: 'Found 5 institutions offering classical text study programs. Duration: 6 months to 2 years. Fee: ₹25,000-150,000.'
        };
        showNotification(training[subject], 'success');
    }, 2000);
}

function showWisdomTimeline(period) {
    const timelines = {
        '3000bc': '3000 BCE: Early Ayurvedic knowledge in Vedic texts',
        '1500bc': '1500 BCE: Charaka Samhita composition begins',
        '500bc': '500 BCE: Traditional Chinese Medicine systematized',
        'today': 'Today: Ancient wisdom integrated with modern healthcare'
    };
    
    showNotification(`${period.toUpperCase()}: ${timelines[period]}`, 'info');
}

// Holistic Wellness Functions
function initializeWellness() {
    console.log('Holistic wellness tracking initialized');
}

function toggleRitual(ritual) {
    const checkbox = event.target;
    checkbox.classList.toggle('checked');
    
    if (checkbox.classList.contains('checked')) {
        traditionalHealthcareDashboard.selectedRituals.add(ritual);
        showNotification(`Excellent! ${ritual} practice completed for today. Building healthy traditional habits.`, 'success');
    } else {
        traditionalHealthcareDashboard.selectedRituals.delete(ritual);
        showNotification(`${ritual} practice unmarked. Complete when ready for optimal wellness.`, 'info');
    }
    
    console.log('Active rituals:', Array.from(traditionalHealthcareDashboard.selectedRituals));
}

function learnOilPulling() {
    showNotification('Oil pulling: Swish 1 tbsp sesame/coconut oil for 10-15 minutes on empty stomach. Spit out, rinse mouth. Ancient detox practice.', 'info');
}

function learnTongueCleaning() {
    showNotification('Tongue cleaning: Use copper tongue scraper from back to front 5-7 times. Removes toxins (ama), improves taste and digestion.', 'info');
}

function startMeditation() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Meditation session started: 20 minutes guided mindfulness. Find quiet space, sit comfortably, focus on breath.', 'success');
    }, 1000);
}

function learnAbhyanga() {
    showNotification('Abhyanga technique: Use warm oil (sesame/coconut), massage from head to toe in circular motions. 15-20 minutes before bath.', 'success');
}

function startBreathingExercise() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Breathing exercise started: Ujjayi pranayama - breathe slowly through nose with slight constriction in throat.', 'success');
    }, 1000);
}

function getSeasonalGuidance() {
    const seasonalAdvice = {
        autumn: 'Autumn (Vata season): Warm foods, oil massage, regular routine. Avoid cold, dry, light foods. Increase grounding practices.',
        winter: 'Winter (Kapha accumulation): Warming foods, indoor exercise, stimulating herbs like ginger. Avoid heavy, cold foods.',
        spring: 'Spring (Kapha season): Light foods, increase exercise, detoxify. Use warming spices. Avoid dairy and sweets.',
        summer: 'Summer (Pitta season): Cool foods, avoid excess sun, calm activities. Use cooling herbs like mint and aloe.'
    };
    
    const currentSeason = traditionalHealthcareDashboard.seasonalGuidance;
    showNotification(seasonalAdvice[currentSeason], 'info');
}

function viewSeasonalChart() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Seasonal chart: Visual guide showing dosha dominance, recommended foods, practices, and herbs for each season.', 'success');
    }, 1500);
}

function viewDoshaRecommendations() {
    if (traditionalHealthcareDashboard.doshaAssessment) {
        const dosha = traditionalHealthcareDashboard.doshaAssessment.dominant;
        showDoshaGuidance(dosha);
    } else {
        showNotification('Take dosha assessment first to get personalized recommendations for your constitution.', 'warning');
    }
}

function customizeRecommendations() {
    showNotification('Customization: Adjust recommendations based on age, health conditions, current season, and lifestyle factors.', 'info');
}

function logEnergyLevel() {
    const energyLevels = ['Low', 'Moderate', 'High', 'Excellent'];
    const level = energyLevels[Math.floor(Math.random() * energyLevels.length)];
    showNotification(`Energy level logged: ${level}. Track patterns to optimize daily routines and constitutional balance.`, 'info');
}

function viewEnergyTrends() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Energy trends: Morning energy highest, afternoon dip common. Seasonal variations match dosha patterns.', 'info');
    }, 1500);
}

function viewProgress(period) {
    const messages = {
        daily: 'Daily progress: 4/6 traditional rituals completed today. Excellent consistency building!',
        weekly: 'Weekly progress: 78% ritual completion rate. Strong foundation in traditional practices.',
        seasonal: 'Seasonal progress: Autumn practices well established. Body adapting to seasonal rhythms.'
    };
    
    showNotification(messages[period], 'success');
}

function exportWellnessData() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Wellness progress exported: Traditional practice data, constitutional balance trends, seasonal adjustments included.', 'success');
    }, 2000);
}

// AYUSH Programs Functions
function initializeAYUSHPrograms() {
    console.log('AYUSH programs initialized');
}

function exploreAYUSHMission() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('AYUSH Mission: ₹4,607 crores allocated for strengthening traditional medicine infrastructure, education, research, and healthcare delivery.', 'success');
    }, 2000);
}

function findAYUSHCenter() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Found 18 AYUSH centers within 30km: 12 Ayurveda, 4 Yoga, 2 Unani. Services include consultation, medicines, therapies.', 'success');
    }, 1500);
}

function applyAYUSHScheme() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('AYUSH scheme application: Subsidized treatments, free consultations for BPL families. Upload documents for verification.', 'info');
    }, 2000);
}

function viewAYUSHProgress() {
    showNotification('AYUSH progress: 12,500+ wellness centers operational, 300+ new Ayurveda colleges approved, research grants increased 40%.', 'success');
}

function findWellnessCenter() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Wellness centers found: 25 traditional therapy centers, 15 yoga centers, 8 Panchakarma facilities within 25km radius.', 'success');
    }, 1500);
}

function viewWellnessServices() {
    const services = `
        🧘 Yoga therapy: Asanas, pranayama, meditation classes
        💆 Ayurvedic treatments: Abhyanga, Shirodhara, Panchakarma
        🌿 Herbal medicines: Fresh preparations, standardized extracts
        🏥 Integrated care: Traditional + modern healthcare coordination
    `;
    showNotification(services, 'info');
}

function bookWellnessAppointment() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Wellness appointment booked: Ayurvedic consultation tomorrow 11:00 AM. Fee: ₹400. Confirmation SMS sent.', 'success');
    }, 2000);
}

function viewCertificationPrograms() {
    const programs = `
        🎓 Ayurveda: BAMS degree, PG specializations, certificate courses
        🧘‍♀️ Yoga: 200hr, 500hr teacher training, therapy certifications
        🍃 Herbalism: Traditional pharmacist courses, quality control
        ☯️ TCM: Basic acupuncture, Chinese herbs, diagnostic methods
    `;
    showNotification(programs, 'info');
}

function checkCertificationStatus() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Certification status: Yoga teacher training 60% complete. Ayurveda basic course enrollment open. TCM certification available.', 'info');
    }, 1500);
}

function findTrainingInstitute() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Training institutes: 12 government recognized institutions within 100km. Online and offline programs available.', 'success');
    }, 2000);
}

function joinCommunityProgram() {
    showNotification('Community program: Village yoga groups, herbal garden projects, traditional knowledge sharing circles. Registration open.', 'success');
}

function startHerbalGarden() {
    showNotification('Herbal garden: Start with 10 basic medicinal plants - Tulsi, Mint, Ginger, Turmeric, Neem. Seeds and guidance provided.', 'success');
}

function organizeYogaGroup() {
    showNotification('Yoga group: Minimum 10 participants needed. Free instructor provided by AYUSH department. Sessions 3x per week.', 'success');
}

function compareAllPrograms() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Program comparison: AYUSH Mission focuses on infrastructure, Wellness Centers on service delivery, Certification on quality standards.', 'info');
    }, 2000);
}

function eligibilityChecker() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Eligibility: Most AYUSH programs open to all. Some subsidies for BPL, rural populations. Age criteria for certain certifications.', 'info');
    }, 1500);
}

function getTraditionalRecommendations() {
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showNotification('Recommendations: Start with local AYUSH center consultation, join community yoga group, begin daily traditional practices.', 'success');
    }, 2000);
}

// Footer Actions
function contactTraditionalSupport() {
    showNotification('Traditional Medicine Support: Email: ayush@gov.in, Helpline: 1800-AYUSH-1 (1800-29874-1), WhatsApp support available.', 'info');
}

function provideWisdomFeedback() {
    showNotification('Wisdom sharing: Share your traditional medicine experiences, family remedies, and suggestions for community benefit.', 'info');
}

function reportTraditionalIssue() {
    showNotification('Issue reporting: Report counterfeit medicines, unqualified practitioners, or safety concerns. Anonymous reporting available.', 'warning');
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
    
    // Auto-remove after 6 seconds (longer for traditional medicine info)
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 6000);
    
    traditionalHealthcareDashboard.notifications.push({
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

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.click();
            }
            
            if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
                hideLoadingState();
            }
        }
    });
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Traditional Healthcare Dashboard Error:', event.error);
    showNotification('An error occurred. Traditional healing takes time - please refresh or contact our support.', 'error');
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
    console.log(`Traditional Healthcare Dashboard loaded in ${loadTime.toFixed(2)}ms`);
    
    if (loadTime > 3000) {
        showNotification('Loading took time, like traditional healing - patience brings wisdom.', 'warning');
    }
});

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        console.log('Service worker support detected for traditional medicine offline access');
    });
}

// Export for global access and debugging
window.traditionalHealthcareDashboard = traditionalHealthcareDashboard;
window.scrollToSection = scrollToSection;

console.log('Traditional Healthcare Dashboard v1.0 - Ancient wisdom systems operational 🕉️');

// Welcome message with traditional blessing
setTimeout(() => {
    showNotification('🙏 Welcome to Traditional Healthcare Dashboard - May ancient wisdom guide your journey to wellness!', 'success');
}, 1000);