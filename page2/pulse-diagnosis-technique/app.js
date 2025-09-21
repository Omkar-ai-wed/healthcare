// Traditional Pulse Diagnosis Learning Interface - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeThemeToggle();
    initializePositionDiagram();
    initializePulseCategories();
    initializePracticeTools();
    initializeClinicalTabs();
    initializeQuiz();
    initializePulseSimulator();
    initializeAccessibility();
    initializeProgressTracking();
    loadPulseData();
});

// Pulse data from the provided JSON
const pulseData = {
    positions: {
        cun: {
            left: "Heart and Small Intestine",
            right: "Lung and Large Intestine",
            description: "The Cun (Inch) position is located closest to the wrist. It reflects the upper burner and heart-lung function.",
            clinical: "Assesses circulation, respiratory function, and emotional state."
        },
        guan: {
            left: "Liver and Gallbladder", 
            right: "Spleen and Stomach",
            description: "The Guan (Bar) position is in the middle, level with the radial styloid process. It reflects middle burner function.",
            clinical: "Evaluates digestive health, emotional regulation, and metabolic processes."
        },
        chi: {
            left: "Kidney Yin and Bladder",
            right: "Kidney Yang and Triple Heater",
            description: "The Chi (Cubit) position is furthest from the wrist. It reflects lower burner and constitutional vitality.",
            clinical: "Assesses reproductive health, constitutional strength, and fundamental essence."
        }
    },
    pulseTypes: {
        rapid: {
            chinese: "数脉",
            pinyin: "shuò mài",
            name: "Rapid Pulse",
            rate: ">90 bpm",
            characteristics: "Fast, urgent feeling",
            clinical: "Heat patterns, fever, inflammation, Yin deficiency",
            treatment: "Clear heat, cool blood, nourish Yin"
        },
        slow: {
            chinese: "迟脉",
            pinyin: "chí mài",
            name: "Slow Pulse",
            rate: "<60 bpm",
            characteristics: "Leisurely, relaxed rhythm",
            clinical: "Cold patterns, Yang deficiency, chronic conditions",
            treatment: "Warm Yang, strengthen digestive fire"
        },
        floating: {
            chinese: "浮脉",
            pinyin: "fú mài",
            name: "Floating Pulse",
            characteristics: "Strong with light pressure, weakens with deep pressure",
            clinical: "External pathogenic factors, surface conditions",
            treatment: "Release exterior, dispel pathogenic factors"
        }
    }
};

// Enhanced navigation with proper scrolling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Initializing navigation with', navLinks.length, 'links');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            console.log('Navigation clicked:', targetId);
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                console.log('Target section found:', targetSection);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight || 80;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    console.log('Scrolling to position:', targetPosition);
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link immediately
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                    
                    trackUserInteraction('navigation', targetId.substring(1));
                }
            }
        });
    });

    // Update active nav on scroll with better detection
    window.addEventListener('scroll', debounce(updateActiveNav, 100));
    
    // Set initial active state
    setTimeout(updateActiveNav, 500);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200; // Increased offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    console.log('Current section:', currentSection);
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    const currentTheme = localStorage.getItem('pulse-theme') || 'light';
    html.setAttribute('data-color-scheme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('pulse-theme', newTheme);
        
        // Add transition effect
        html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            html.style.transition = '';
        }, 300);
        
        console.log('Theme changed to:', newTheme);
        trackUserInteraction('theme_toggle', newTheme);
    });
}

// Enhanced position diagram interactions
function initializePositionDiagram() {
    const positions = document.querySelectorAll('.position');
    
    console.log('Initializing position diagram...', positions.length, 'positions found');
    
    positions.forEach(position => {
        position.addEventListener('click', function() {
            const positionType = this.getAttribute('data-position');
            console.log('Position clicked:', positionType);
            
            updatePositionDetails(positionType);
            
            // Visual feedback
            positions.forEach(pos => {
                pos.classList.remove('active');
                pos.style.transform = '';
                pos.style.boxShadow = '';
            });
            
            this.classList.add('active');
            this.style.transform = 'scale(1.15)';
            this.style.boxShadow = '0 0 20px rgba(220, 20, 60, 0.6)';
            
            trackUserInteraction('position_select', positionType);
        });
        
        // Add hover effects
        position.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 0 15px rgba(220, 20, 60, 0.4)';
            }
        });
        
        position.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
    });
    
    // Initialize with Cun position
    setTimeout(() => {
        const cunPosition = document.querySelector('.position[data-position="cun"]');
        if (cunPosition) {
            cunPosition.click();
        }
    }, 100);
}

function updatePositionDetails(positionType) {
    const positionDetails = document.getElementById('position-details');
    const positionData = pulseData.positions[positionType];
    
    if (positionDetails && positionData) {
        const chineseNames = {
            cun: '寸',
            guan: '关', 
            chi: '尺'
        };
        
        const englishNames = {
            cun: 'Inch',
            guan: 'Bar',
            chi: 'Cubit'
        };
        
        // Create enhanced content with fade animation
        const newContent = `
            <div class="position-info" style="opacity: 0; transform: translateY(10px);">
                <h4>${positionType.charAt(0).toUpperCase() + positionType.slice(1)} Position (${chineseNames[positionType]})</h4>
                <div class="position-description">
                    <p>${positionData.description}</p>
                </div>
                <div class="organ-correspondences">
                    <div class="left-hand">
                        <strong>Left Hand:</strong> ${positionData.left}
                    </div>
                    <div class="right-hand">
                        <strong>Right Hand:</strong> ${positionData.right}
                    </div>
                </div>
                <div class="clinical-notes">
                    <h5>Clinical Significance</h5>
                    <p>${positionData.clinical}</p>
                </div>
            </div>
        `;
        
        positionDetails.innerHTML = newContent;
        
        // Animate the update
        const positionInfo = positionDetails.querySelector('.position-info');
        setTimeout(() => {
            positionInfo.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            positionInfo.style.opacity = '1';
            positionInfo.style.transform = 'translateY(0)';
        }, 50);
        
        console.log('Position details updated for:', positionType);
    }
}

// Pulse category navigation
function initializePulseCategories() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const pulseCategories = document.querySelectorAll('.pulse-category');
    
    console.log('Initializing pulse categories...', categoryTabs.length, 'tabs found');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            console.log('Category tab clicked:', targetCategory);
            
            // Remove active class from all tabs and categories
            categoryTabs.forEach(categoryTab => categoryTab.classList.remove('active'));
            pulseCategories.forEach(category => {
                category.classList.remove('active');
                category.style.display = 'none';
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding category
            const targetCategoryElement = document.getElementById(targetCategory);
            if (targetCategoryElement) {
                targetCategoryElement.classList.add('active');
                targetCategoryElement.style.display = 'block';
                
                // Animate category entrance
                animateCategoryContent(targetCategoryElement);
            }
            
            trackUserInteraction('pulse_category', targetCategory);
        });
    });
    
    // Initialize pulse simulation buttons
    initializePulseSimulations();
}

function animateCategoryContent(category) {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        category.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        category.style.opacity = '1';
        category.style.transform = 'translateY(0)';
        
        // Reset transition after animation
        setTimeout(() => {
            category.style.transition = '';
        }, 400);
    }, 50);
}

// Enhanced pulse simulation functionality
function initializePulseSimulations() {
    const pulseSimButtons = document.querySelectorAll('.pulse-sim-btn');
    
    console.log('Initializing pulse simulations...', pulseSimButtons.length, 'buttons found');
    
    pulseSimButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pulseType = this.getAttribute('data-pulse');
            const pulseWave = this.querySelector('.pulse-wave');
            
            console.log('Pulse simulation started:', pulseType);
            
            // Stop any existing animation
            if (pulseWave) {
                pulseWave.style.animation = 'none';
            }
            
            // Visual feedback for button
            this.style.transform = 'scale(0.95)';
            this.style.backgroundColor = '#2E7D32';
            
            // Start new animation
            setTimeout(() => {
                if (pulseWave) {
                    switch(pulseType) {
                        case 'rapid':
                            pulseWave.style.animation = 'rapid-pulse 0.5s infinite';
                            break;
                        case 'slow':
                            pulseWave.style.animation = 'slow-pulse 1.2s infinite';
                            break;
                        case 'floating':
                            pulseWave.style.animation = 'floating-pulse 0.8s infinite';
                            break;
                        default:
                            pulseWave.style.animation = 'rapid-pulse 0.8s infinite';
                    }
                }
                
                // Reset button appearance
                this.style.transform = '';
                this.style.backgroundColor = '';
            }, 150);
            
            // Update button text temporarily
            const originalText = this.textContent;
            this.innerHTML = `<span class="pulse-wave ${pulseType}-wave"></span> Playing...`;
            
            // Stop animation and reset after 5 seconds
            setTimeout(() => {
                if (pulseWave) {
                    pulseWave.style.animation = 'none';
                }
                this.innerHTML = originalText;
            }, 5000);
            
            trackUserInteraction('pulse_simulation', pulseType);
        });
    });
}

// Enhanced practice tools functionality
function initializePracticeTools() {
    // Specific button selectors for better targeting
    const pulseSimulatorBtn = document.getElementById('pulse-simulator-btn');
    const positionGuideBtn = document.getElementById('position-guide-btn');
    const practiceTimerBtn = document.getElementById('practice-timer-btn');
    const progressTrackerBtn = document.getElementById('progress-tracker-btn');
    
    console.log('Initializing practice tools...');
    
    if (pulseSimulatorBtn) {
        pulseSimulatorBtn.addEventListener('click', function() {
            console.log('Opening pulse simulator...');
            openPulseSimulator();
            trackUserInteraction('tool_used', 'pulse-simulator');
        });
    }
    
    if (positionGuideBtn) {
        positionGuideBtn.addEventListener('click', function() {
            console.log('Opening position guide...');
            showPositionGuide();
            trackUserInteraction('tool_used', 'position-guide');
        });
    }
    
    if (practiceTimerBtn) {
        practiceTimerBtn.addEventListener('click', function() {
            console.log('Starting practice timer...');
            startPracticeTimer();
            trackUserInteraction('tool_used', 'practice-timer');
        });
    }
    
    if (progressTrackerBtn) {
        progressTrackerBtn.addEventListener('click', function() {
            console.log('Opening progress tracker...');
            showProgressTracker();
            trackUserInteraction('tool_used', 'progress-tracker');
        });
    }
}

function openPulseSimulator() {
    const modal = document.getElementById('simulator-modal');
    if (modal) {
        console.log('Opening simulator modal');
        modal.classList.remove('hidden');
        
        // Initialize modal controls
        initializeSimulatorControls();
        
        // Focus management for accessibility
        const firstInput = modal.querySelector('select, button');
        if (firstInput) {
            firstInput.focus();
        }
    } else {
        console.warn('Simulator modal not found');
    }
}

function initializeSimulatorControls() {
    const pulseSelect = document.getElementById('pulse-type-select');
    const playButton = document.getElementById('play-pulse');
    const pauseButton = document.getElementById('pause-pulse');
    const waveform = document.getElementById('pulse-waveform');
    
    if (!pulseSelect || !playButton || !pauseButton || !waveform) {
        console.warn('Some simulator controls not found');
        return;
    }
    
    const waveLine = waveform.querySelector('.wave-line');
    let isPlaying = false;
    
    // Remove existing event listeners to prevent duplicates
    const newPlayButton = playButton.cloneNode(true);
    playButton.parentNode.replaceChild(newPlayButton, playButton);
    const newPauseButton = pauseButton.cloneNode(true);
    pauseButton.parentNode.replaceChild(newPauseButton, pauseButton);
    
    newPlayButton.addEventListener('click', function() {
        if (!isPlaying) {
            const selectedPulse = pulseSelect.value;
            console.log('Starting pulse animation:', selectedPulse);
            startPulseAnimation(selectedPulse, waveLine);
            isPlaying = true;
            this.textContent = 'Playing...';
            this.disabled = true;
            newPauseButton.disabled = false;
            
            // Auto-stop after 10 seconds
            setTimeout(() => {
                if (isPlaying) {
                    newPauseButton.click();
                }
            }, 10000);
        }
    });
    
    newPauseButton.addEventListener('click', function() {
        if (isPlaying) {
            console.log('Stopping pulse animation');
            stopPulseAnimation(waveLine);
            isPlaying = false;
            newPlayButton.textContent = 'Play Pulse';
            newPlayButton.disabled = false;
            this.disabled = true;
        }
    });
    
    pulseSelect.addEventListener('change', function() {
        if (isPlaying) {
            newPauseButton.click();
        }
    });
}

function startPulseAnimation(pulseType, element) {
    if (!element) return;
    
    const animations = {
        normal: { duration: 800, pattern: 'ease-in-out' },
        rapid: { duration: 400, pattern: 'ease-in-out' },
        slow: { duration: 1200, pattern: 'ease-in-out' },
        floating: { duration: 600, pattern: 'ease-out' }
    };
    
    const animation = animations[pulseType] || animations.normal;
    
    element.style.animation = `pulse-wave-${pulseType} ${animation.duration}ms infinite ${animation.pattern}`;
    
    // Add dynamic styles for different pulse types
    const styleId = `pulse-style-${pulseType}`;
    let existingStyle = document.getElementById(styleId);
    if (!existingStyle) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes pulse-wave-${pulseType} {
                0%, 100% { 
                    transform: scaleY(1) scaleX(1); 
                    opacity: 1; 
                    background: #DC143C;
                }
                50% { 
                    transform: scaleY(${pulseType === 'floating' ? '0.3' : '2'}) scaleX(${pulseType === 'rapid' ? '1.5' : '1'}); 
                    opacity: ${pulseType === 'slow' ? '0.5' : '0.8'}; 
                    background: ${pulseType === 'rapid' ? '#FF6B6B' : '#DC143C'};
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('Pulse animation started:', pulseType);
}

function stopPulseAnimation(element) {
    if (element) {
        element.style.animation = 'none';
        console.log('Pulse animation stopped');
    }
}

function showPositionGuide() {
    // Create a simple informational modal
    const guideContent = `
        <div style="background: white; padding: 20px; border-radius: 10px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
            <h3 style="color: #8B4513; text-align: center;">Hand Position Guide</h3>
            <p><strong>Step 1:</strong> Place patient's wrist on a small pillow for support</p>
            <p><strong>Step 2:</strong> Use your index, middle, and ring fingers</p>
            <p><strong>Step 3:</strong> Position fingers over the radial artery</p>
            <p><strong>Step 4:</strong> Apply gentle pressure - feel for the pulse</p>
            <p><strong>Step 5:</strong> Assess at three pressure levels: light, moderate, deep</p>
            <button onclick="this.parentElement.remove()" style="background: #DC143C; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; display: block; margin: 20px auto 0;">Close</button>
        </div>
    `;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.5); z-index: 1000; 
        display: flex; align-items: center; justify-content: center; padding: 20px;
    `;
    overlay.innerHTML = guideContent;
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

function startPracticeTimer() {
    const duration = prompt('Enter practice duration in minutes (1-30):', '5');
    if (duration && !isNaN(duration) && duration > 0 && duration <= 30) {
        const minutes = parseInt(duration);
        startTimer(minutes);
    } else if (duration !== null) {
        alert('Please enter a valid duration between 1 and 30 minutes.');
    }
}

function startTimer(minutes) {
    const totalSeconds = minutes * 60;
    let remainingSeconds = totalSeconds;
    
    const timerDisplay = document.createElement('div');
    timerDisplay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #DC143C;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer;
        user-select: none;
    `;
    timerDisplay.title = 'Click to stop timer early';
    document.body.appendChild(timerDisplay);
    
    const interval = setInterval(() => {
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        timerDisplay.textContent = `Practice: ${mins}:${secs.toString().padStart(2, '0')}`;
        
        if (remainingSeconds <= 0) {
            clearInterval(interval);
            timerDisplay.style.background = '#00A86B';
            timerDisplay.textContent = 'Practice Complete! ✓';
            timerDisplay.style.cursor = 'default';
            
            console.log('Practice timer completed!');
            
            setTimeout(() => {
                timerDisplay.remove();
            }, 5000);
        }
        
        remainingSeconds--;
    }, 1000);
    
    // Allow manual close
    timerDisplay.addEventListener('click', () => {
        clearInterval(interval);
        timerDisplay.remove();
        console.log('Practice timer stopped manually');
    });
}

function showProgressTracker() {
    const progress = window.getProgress ? window.getProgress() : {
        completionPercentage: 0,
        totalPulseTypes: 0,
        sectionsVisited: 0
    };
    
    const progressContent = `
        <div style="background: white; padding: 20px; border-radius: 10px; max-width: 400px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
            <h3 style="color: #8B4513; text-align: center; margin-top: 0;">Learning Progress</h3>
            <div style="margin: 15px 0;">
                <strong>Course Completion:</strong> ${progress.completionPercentage}%
                <div style="background: #f0f0f0; height: 10px; border-radius: 5px; margin-top: 5px;">
                    <div style="background: #DC143C; height: 100%; width: ${progress.completionPercentage}%; border-radius: 5px;"></div>
                </div>
            </div>
            <p><strong>Pulse Types Learned:</strong> ${progress.totalPulseTypes} of 28</p>
            <p><strong>Sections Visited:</strong> ${Object.keys(progress.sectionsVisited || {}).length} of 6</p>
            <p><strong>Quiz Score:</strong> ${progress.quizScore || 0}</p>
            <button onclick="this.parentElement.remove()" style="background: #00A86B; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; display: block; margin: 20px auto 0;">Close</button>
        </div>
    `;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.5); z-index: 1000; 
        display: flex; align-items: center; justify-content: center; padding: 20px;
    `;
    overlay.innerHTML = progressContent;
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

// Clinical applications tabs
function initializeClinicalTabs() {
    const clinicalTabs = document.querySelectorAll('.clinical-tab');
    const clinicalPanels = document.querySelectorAll('.clinical-panel');
    
    console.log('Initializing clinical tabs...', clinicalTabs.length, 'tabs found');
    
    clinicalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetClinical = this.getAttribute('data-clinical');
            console.log('Clinical tab clicked:', targetClinical);
            
            // Remove active class from all tabs and panels
            clinicalTabs.forEach(clinicalTab => clinicalTab.classList.remove('active'));
            clinicalPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.display = 'none';
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(targetClinical);
            if (targetPanel) {
                targetPanel.classList.add('active');
                targetPanel.style.display = 'block';
                
                // Animate panel entrance
                animatePanel(targetPanel);
            }
            
            trackUserInteraction('clinical_tab', targetClinical);
        });
    });
}

function animatePanel(panel) {
    panel.style.opacity = '0';
    panel.style.transform = 'translateX(10px)';
    
    setTimeout(() => {
        panel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        panel.style.opacity = '1';
        panel.style.transform = 'translateX(0)';
        
        setTimeout(() => {
            panel.style.transition = '';
        }, 300);
    }, 50);
}

// Enhanced quiz functionality
function initializeQuiz() {
    const quizQuestions = [
        {
            question: "Which pulse position corresponds to the Heart and Small Intestine?",
            options: [
                { text: "A. Left Cun position", value: "a", correct: true },
                { text: "B. Left Guan position", value: "b", correct: false },
                { text: "C. Right Cun position", value: "c", correct: false },
                { text: "D. Right Chi position", value: "d", correct: false }
            ]
        },
        {
            question: "What is the normal pulse rate range?",
            options: [
                { text: "A. 50-70 bpm", value: "a", correct: false },
                { text: "B. 60-90 bpm", value: "b", correct: true },
                { text: "C. 80-100 bpm", value: "c", correct: false },
                { text: "D. 90-110 bpm", value: "d", correct: false }
            ]
        },
        {
            question: "A rapid pulse (数脉) is typically associated with which pattern?",
            options: [
                { text: "A. Cold patterns", value: "a", correct: false },
                { text: "B. Yang deficiency", value: "b", correct: false },
                { text: "C. Heat patterns", value: "c", correct: true },
                { text: "D. Dampness", value: "d", correct: false }
            ]
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    let answered = false;
    
    console.log('Initializing quiz with', quizQuestions.length, 'questions');
    
    // Initialize assessment buttons
    const assessmentButtons = document.querySelectorAll('button');
    assessmentButtons.forEach(button => {
        if (button.textContent.includes('Take Foundation Assessment') ||
            button.textContent.includes('Assessment') ||
            button.textContent.includes('Certification')) {
            button.addEventListener('click', function() {
                console.log('Assessment button clicked:', this.textContent);
                showQuizModal();
            });
        }
    });
    
    const restartButton = document.getElementById('restart-quiz');
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            console.log('Quiz restarted');
            currentQuestion = 0;
            score = 0;
            answered = false;
            showQuestion(0);
            document.getElementById('quiz-results').classList.add('hidden');
        });
    }
    
    function showQuizModal() {
        const quizModal = document.createElement('div');
        quizModal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.8); z-index: 1000; 
            display: flex; align-items: center; justify-content: center; padding: 20px;
        `;
        
        const quizContainer = document.createElement('div');
        quizContainer.style.cssText = `
            background: white; padding: 30px; border-radius: 10px; max-width: 600px; 
            width: 100%; max-height: 80vh; overflow-y: auto;
        `;
        
        quizContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="color: #8B4513; margin: 0;">Pulse Diagnosis Quiz</h3>
                <button onclick="this.closest('.quiz-modal').remove()" style="background: #DC143C; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">&times;</button>
            </div>
            <div id="quiz-content">
                <div id="question-display"></div>
                <div id="quiz-results-display" style="display: none; text-align: center;">
                    <h4>Quiz Complete!</h4>
                    <div id="score-display" style="font-size: 24px; color: #DC143C; margin: 20px 0;"></div>
                    <button onclick="restartQuizInModal()" style="background: #00A86B; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Try Again</button>
                </div>
            </div>
        `;
        
        quizModal.className = 'quiz-modal';
        quizModal.appendChild(quizContainer);
        document.body.appendChild(quizModal);
        
        // Make restart function global for the modal
        window.restartQuizInModal = function() {
            currentQuestion = 0;
            score = 0;
            answered = false;
            document.getElementById('quiz-results-display').style.display = 'none';
            showQuestion(0);
        };
        
        showQuestion(0);
    }
    
    function showQuestion(index) {
        const questionData = quizQuestions[index];
        const questionElement = document.getElementById('question-display');
        
        if (questionElement && questionData) {
            questionElement.innerHTML = `
                <h4 style="color: #8B4513;">Question ${index + 1} of ${quizQuestions.length}</h4>
                <p style="font-size: 16px; margin: 20px 0;">${questionData.question}</p>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${questionData.options.map(option => 
                        `<button class="quiz-option-btn" data-answer="${option.value}" data-correct="${option.correct}" 
                         style="background: #f5f5f5; border: 2px solid #ddd; padding: 12px; border-radius: 5px; cursor: pointer; text-align: left; transition: all 0.2s;">
                         ${option.text}</button>`
                    ).join('')}
                </div>
            `;
            
            // Add event listeners to new options
            const options = questionElement.querySelectorAll('.quiz-option-btn');
            options.forEach(option => {
                option.addEventListener('click', function() {
                    if (!answered) {
                        answered = true;
                        const isCorrect = this.getAttribute('data-correct') === 'true';
                        
                        if (isCorrect) {
                            score++;
                            this.style.background = '#4CAF50';
                            this.style.color = 'white';
                            this.style.borderColor = '#4CAF50';
                        } else {
                            this.style.background = '#f44336';
                            this.style.color = 'white';
                            this.style.borderColor = '#f44336';
                            
                            // Show correct answer
                            options.forEach(opt => {
                                if (opt.getAttribute('data-correct') === 'true') {
                                    opt.style.background = '#4CAF50';
                                    opt.style.color = 'white';
                                    opt.style.borderColor = '#4CAF50';
                                }
                            });
                        }
                        
                        // Disable all options
                        options.forEach(opt => {
                            opt.disabled = true;
                            opt.style.cursor = 'default';
                        });
                        
                        // Move to next question after delay
                        setTimeout(() => {
                            currentQuestion++;
                            answered = false;
                            
                            if (currentQuestion < quizQuestions.length) {
                                showQuestion(currentQuestion);
                            } else {
                                showResults();
                            }
                        }, 2000);
                        
                        trackUserInteraction('quiz_answer', { 
                            question: index, 
                            correct: isCorrect, 
                            answer: this.getAttribute('data-answer')
                        });
                    }
                });
                
                // Add hover effect
                option.addEventListener('mouseenter', function() {
                    if (!this.disabled) {
                        this.style.borderColor = '#DAA520';
                        this.style.background = '#fff8dc';
                    }
                });
                
                option.addEventListener('mouseleave', function() {
                    if (!this.disabled) {
                        this.style.borderColor = '#ddd';
                        this.style.background = '#f5f5f5';
                    }
                });
            });
        }
    }
    
    function showResults() {
        const questionElement = document.getElementById('question-display');
        const resultsElement = document.getElementById('quiz-results-display');
        const scoreElement = document.getElementById('score-display');
        
        questionElement.style.display = 'none';
        resultsElement.style.display = 'block';
        scoreElement.textContent = `Your Score: ${score}/${quizQuestions.length}`;
        
        // Determine performance message
        const percentage = (score / quizQuestions.length) * 100;
        let message = '';
        let messageColor = '#DC143C';
        
        if (percentage >= 90) {
            message = 'Excellent! You have a strong understanding of pulse diagnosis fundamentals.';
            messageColor = '#4CAF50';
        } else if (percentage >= 70) {
            message = 'Good work! Continue studying to deepen your knowledge.';
            messageColor = '#FF9800';
        } else {
            message = 'Keep practicing! Review the fundamentals and try again.';
            messageColor = '#DC143C';
        }
        
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.color = messageColor;
        messageElement.style.margin = '15px 0';
        resultsElement.appendChild(messageElement);
        
        // Update global progress
        if (window.updateProgress) {
            window.updateProgress('quiz_score', score);
        }
        
        trackUserInteraction('quiz_complete', { score: score, total: quizQuestions.length, percentage: percentage });
    }
}

// Modal functionality
function initializePulseSimulator() {
    const modal = document.getElementById('simulator-modal');
    const closeButton = modal?.querySelector('.modal-close');
    
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            console.log('Closing simulator modal');
            modal.classList.add('hidden');
        });
    }
    
    // Close on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal:not(.hidden), .quiz-modal');
            openModals.forEach(modal => {
                if (modal.classList.contains('quiz-modal')) {
                    modal.remove();
                } else {
                    modal.classList.add('hidden');
                }
            });
        }
    });
}

// Enhanced accessibility
function initializeAccessibility() {
    // Keyboard navigation for tabs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const target = e.target;
            
            if (target.classList.contains('category-tab') || 
                target.classList.contains('clinical-tab') ||
                target.classList.contains('position') ||
                target.classList.contains('quiz-option') ||
                target.classList.contains('quiz-option-btn')) {
                e.preventDefault();
                target.click();
            }
        }
    });
    
    // Add ARIA labels
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach((tab, index) => {
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    });
    
    const positions = document.querySelectorAll('.position');
    positions.forEach(position => {
        const positionType = position.getAttribute('data-position');
        position.setAttribute('tabindex', '0');
        position.setAttribute('role', 'button');
        position.setAttribute('aria-label', `Select ${positionType} pulse position`);
    });
    
    // Screen reader announcements
    const announceElement = document.createElement('div');
    announceElement.setAttribute('aria-live', 'polite');
    announceElement.setAttribute('aria-atomic', 'true');
    announceElement.style.position = 'absolute';
    announceElement.style.left = '-10000px';
    announceElement.style.width = '1px';
    announceElement.style.height = '1px';
    announceElement.style.overflow = 'hidden';
    document.body.appendChild(announceElement);
    
    window.announceToScreenReader = function(message) {
        announceElement.textContent = message;
        setTimeout(() => {
            announceElement.textContent = '';
        }, 1000);
    };
}

// Progress tracking with enhanced functionality
function initializeProgressTracking() {
    const progress = {
        sectionsVisited: new Set(),
        quizScore: 0,
        practiceTime: 0,
        pulseTypesLearned: new Set(),
        startTime: Date.now()
    };
    
    // Load saved progress
    const savedProgress = localStorage.getItem('pulse-learning-progress');
    if (savedProgress) {
        try {
            const parsed = JSON.parse(savedProgress);
            Object.assign(progress, {
                ...parsed,
                sectionsVisited: new Set(parsed.sectionsVisited || []),
                pulseTypesLearned: new Set(parsed.pulseTypesLearned || [])
            });
        } catch (e) {
            console.warn('Error loading saved progress:', e);
        }
    }
    
    // Track section visits with intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId && !progress.sectionsVisited.has(sectionId)) {
                    progress.sectionsVisited.add(sectionId);
                    console.log('Section visited:', sectionId);
                    saveProgress();
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-50px'
    });
    
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
    
    function saveProgress() {
        const progressToSave = {
            ...progress,
            sectionsVisited: Array.from(progress.sectionsVisited),
            pulseTypesLearned: Array.from(progress.pulseTypesLearned),
            lastActivity: Date.now()
        };
        localStorage.setItem('pulse-learning-progress', JSON.stringify(progressToSave));
    }
    
    // Expose progress functions globally
    window.updateProgress = function(type, value) {
        switch(type) {
            case 'quiz_score':
                progress.quizScore = Math.max(progress.quizScore, value);
                break;
            case 'practice_time':
                progress.practiceTime += value;
                break;
            case 'pulse_learned':
                progress.pulseTypesLearned.add(value);
                break;
        }
        saveProgress();
        console.log('Progress updated:', type, value);
    };
    
    window.getProgress = function() {
        const totalSections = 6;
        const completionPercentage = Math.round((progress.sectionsVisited.size / totalSections) * 100);
        
        return {
            ...progress,
            sectionsVisited: progress.sectionsVisited,
            completionPercentage,
            totalPulseTypes: progress.pulseTypesLearned.size,
            timeSpent: Date.now() - (progress.startTime || Date.now())
        };
    };
}

// Load and display pulse data
function loadPulseData() {
    console.log('Pulse data loaded successfully:', Object.keys(pulseData));
    trackUserInteraction('data_loaded', 'pulse_types');
}

// Utility functions
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

function trackUserInteraction(action, data) {
    const interaction = {
        action,
        data,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent.substring(0, 100)
    };
    
    console.log('User interaction tracked:', interaction);
    
    // Store interactions locally
    try {
        const interactions = JSON.parse(localStorage.getItem('pulse-interactions') || '[]');
        interactions.push(interaction);
        
        // Keep only last 50 interactions to save space
        if (interactions.length > 50) {
            interactions.splice(0, interactions.length - 50);
        }
        
        localStorage.setItem('pulse-interactions', JSON.stringify(interactions));
    } catch (e) {
        console.warn('Error saving interaction:', e);
    }
    
    // Update progress based on interaction
    if (action === 'quiz_complete' && data.score !== undefined) {
        window.updateProgress('quiz_score', data.score);
    } else if (action === 'pulse_simulation') {
        window.updateProgress('pulse_learned', data);
    }
}

// Error handling with better logging
window.addEventListener('error', function(e) {
    console.error('Application Error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
    
    trackUserInteraction('error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// Performance optimization
function optimizePerformance() {
    // Lazy load heavy content
    const lazyElements = document.querySelectorAll('.pulse-card, .fundamental-card, .pathway-stage');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '100px'
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
    
    // Preload critical resources
    const criticalResources = [
        // Add any critical resources here
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
optimizePerformance();

// Scroll animations with better performance
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.fundamental-card, .pulse-card, .pathway-stage, .tool-card, .certification-level'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations
setTimeout(initializeScrollAnimations, 500);

// Export functions for testing and external use
window.pulseApp = {
    // Core functions
    initializeNavigation,
    initializePositionDiagram,
    initializePulseCategories,
    initializeQuiz,
    
    // Utility functions
    trackUserInteraction,
    updateProgress: window.updateProgress,
    getProgress: window.getProgress,
    
    // Data
    pulseData,
    
    // Debug functions
    testNavigation: () => {
        console.log('Testing navigation...');
        const firstLink = document.querySelector('.nav-link');
        if (firstLink) firstLink.click();
    },
    
    testModal: () => {
        console.log('Testing modal...');
        openPulseSimulator();
    }
};

console.log('Traditional Pulse Diagnosis Learning Interface initialized successfully');

// Welcome message for first-time visitors
if (!localStorage.getItem('pulse-learning-visited')) {
    setTimeout(() => {
        console.log('Welcome to Traditional Pulse Diagnosis Learning Interface');
        if (window.announceToScreenReader) {
            window.announceToScreenReader('Welcome to Traditional Pulse Diagnosis Learning Interface. Navigate through the sections to master the ancient art of pulse diagnosis.');
        }
        localStorage.setItem('pulse-learning-visited', 'true');
        trackUserInteraction('first_visit', { timestamp: Date.now() });
    }, 2000);
}