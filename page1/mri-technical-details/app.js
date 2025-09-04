// MRI Technical Details Center JavaScript

// Global application state and technical data
const mriTechApp = {
    // Technical specifications from provided data
    technicalData: {
        magneticField: {
            fieldStrengths: {
                lowField: {
                    strength: "0.2-0.5 Tesla",
                    frequency: "8.5-21.3 MHz",
                    applications: "Open MRI, claustrophobic patients",
                    advantages: "Lower cost, open design",
                    limitations: "Lower SNR, limited sequences"
                },
                standardField: {
                    strength: "1.5 Tesla",
                    frequency: "63.9 MHz",
                    applications: "Clinical imaging standard",
                    advantages: "Optimal balance of SNR and safety",
                    specifications: {
                        homogeneity: "<10 ppm over 40 cm DSV",
                        stability: "<0.1 ppm/hour",
                        heliumCapacity: "1500-2000 liters"
                    }
                },
                highField: {
                    strength: "3.0 Tesla",
                    frequency: "127.8 MHz",
                    applications: "Advanced clinical, research",
                    advantages: "Higher SNR, improved resolution",
                    specifications: {
                        homogeneity: "<5 ppm over 40 cm DSV",
                        stability: "<0.05 ppm/hour",
                        heliumCapacity: "2000-2500 liters"
                    }
                },
                ultraHighField: {
                    strength: "7+ Tesla",
                    frequency: "298+ MHz",
                    applications: "Research applications",
                    advantages: "Ultra-high resolution, spectroscopy",
                    limitations: "Research only, SAR limitations"
                }
            },
            magnetTypes: {
                superconducting: {
                    technology: "Niobium-titanium coils in liquid helium",
                    advantages: "Stable field, high homogeneity",
                    requirements: "Cryogenic cooling, quench protection",
                    boilOffRate: "<0.1% per day"
                },
                permanent: {
                    technology: "Rare earth magnet materials",
                    advantages: "No power required, no quench risk",
                    limitations: "Limited to low field strength",
                    fieldStrength: "0.2-0.4 Tesla maximum"
                },
                electromagnet: {
                    technology: "Resistive coils with power supply",
                    advantages: "Adjustable field strength",
                    limitations: "High power consumption, heating",
                    applications: "Rarely used clinically"
                }
            }
        },
        
        rfSystems: {
            hardware: {
                transmitCoils: {
                    bodyCoil: "Integrated cylindrical coil",
                    volumeCoils: "Head, knee, extremity coils",
                    powerRequirement: "10-35 kW peak power",
                    efficiency: "85-95% power efficiency"
                },
                receiveCoils: {
                    surfaceCoils: "Single-channel receiver coils",
                    phasedArrays: "8-32 channel coil arrays",
                    parallelImaging: "2-6× acceleration capability",
                    snrImprovement: "2-10× SNR enhancement"
                },
                amplifiers: {
                    peakPower: "10-35 kW peak RF power",
                    averagePower: "1-10 kW continuous power",
                    efficiency: ">90% amplifier efficiency",
                    bandwidth: "±100 kHz operating range"
                }
            },
            frequencies: {
                "0.2T": 8.5,
                "1.5T": 63.9,
                "3.0T": 127.8,
                "7.0T": 298
            },
            safety: {
                sarLimits: {
                    wholeBody: 2.0,      // W/kg
                    headNeck: 3.2,       // W/kg
                    localSAR: 10.0       // W/kg (10g tissue)
                },
                monitoring: "Real-time SAR calculation",
                safetyFeatures: "Automatic power reduction, sequence termination",
                temperatureRise: "<1°C core body temperature"
            }
        },
        
        gradientSystems: {
            specifications: {
                axes: ["X (readout)", "Y (phase)", "Z (slice)"],
                maxAmplitude: [20, 80],  // mT/m range
                slewRate: [100, 200],    // mT/m/ms range
                linearity: "<5% over 40 cm DSV",
                thermalManagement: "Water cooling required"
            },
            performance: {
                riseTime: [0.1, 0.5],   // ms range
                dutyCycle: "100% continuous operation",
                acousticNoise: [95, 110], // dB range
                eddyCurrents: "Active shielding compensation",
                powerRequirement: [50, 100] // kVA range
            }
        },
        
        imageAcquisition: {
            dataAcquisition: {
                adcResolution: [16, 24],        // bit range
                samplingRate: 1000000,          // Hz (1 MHz)
                matrixSizes: [[64, 64], [1024, 1024]],
                sliceThickness: [0.5, 10],      // mm range
                fieldOfView: [10, 50]           // cm range
            },
            reconstruction: {
                algorithms: ["FFT", "parallel imaging", "compressed sensing"],
                processingTime: "<1 second per image",
                parallelAcceleration: [2, 6],
                iterativeReconstruction: "Advanced noise reduction",
                realTimeProcessing: "Interactive scanning capability"
            },
            imageQuality: {
                spatialResolution: [0.5, 2.0],    // mm range
                temporalResolution: [50, 500],     // ms range
                contrastResolution: [1, 2],        // % signal difference
                snrRatio: ">100:1",
                dynamicRange: [12, 16]             // bit grayscale
            }
        }
    },
    
    // Application state
    currentCalculator: 'sar',
    currentChart: null,
    
    // Constants for calculations
    constants: {
        gyromagneticRatio: {
            hydrogen: 42.58,      // MHz/T
            carbon13: 10.71,      // MHz/T
            phosphorus31: 17.25,  // MHz/T
            sodium23: 4.31        // MHz/T
        },
        physicsConstants: {
            planck: 6.626e-34,    // J⋅s
            boltzmann: 1.381e-23, // J/K
            mu0: 4 * Math.PI * 1e-7 // H/m
        }
    }
};

// Utility Functions
function formatNumber(value, decimals = 2) {
    if (typeof value !== 'number' || isNaN(value)) return 'Invalid';
    return value.toFixed(decimals);
}

function formatScientific(value, decimals = 2) {
    if (typeof value !== 'number' || isNaN(value)) return 'Invalid';
    return value.toExponential(decimals);
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
    console.log('Scrolling to section:', sectionId);
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
        showTechnicalNotification(`Navigated to: ${formatSectionName(sectionId)}`, 'info');
    } else {
        console.error('Section not found:', sectionId);
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
    console.log('Show modal called:', modalId);
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
        
        showTechnicalNotification('Technical interface opened', 'info');
    } else {
        console.error('Modal not found:', modalId);
    }
}

function closeModal(modalId) {
    console.log('Close modal called:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        showTechnicalNotification('Interface closed', 'info');
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
}

// Technical Calculator Functions
function showTechnicalCalculator() {
    console.log('Show technical calculator called');
    showModal('calculator-modal');
}

function showCalculator(calculatorType) {
    console.log(`Showing calculator: ${calculatorType}`);
    
    // Update active tab
    document.querySelectorAll('.calc-tab-btn').forEach(btn => {
        btn.classList.remove('calc-tab-btn--active');
    });
    
    // Find and activate the correct tab
    const tabButtons = document.querySelectorAll('.calc-tab-btn');
    tabButtons.forEach(btn => {
        const btnText = btn.textContent.toLowerCase();
        let shouldActivate = false;
        
        switch (calculatorType) {
            case 'sar':
                shouldActivate = btnText.includes('sar');
                break;
            case 'snr':
                shouldActivate = btnText.includes('snr');
                break;
            case 'gradient':
                shouldActivate = btnText.includes('gradient');
                break;
            case 'frequency':
                shouldActivate = btnText.includes('frequency');
                break;
        }
        
        if (shouldActivate) {
            btn.classList.add('calc-tab-btn--active');
        }
    });
    
    // Show/hide calculator content
    document.querySelectorAll('.calculator-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    const targetContent = document.getElementById(`${calculatorType}-calculator`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
        mriTechApp.currentCalculator = calculatorType;
        showTechnicalNotification(`${formatSectionName(calculatorType)} calculator activated`, 'success');
    }
}

// SAR Calculator
function calculateSAR() {
    console.log('Calculate SAR called');
    const rfPower = parseFloat(document.getElementById('rf-power').value);
    const bodyMass = parseFloat(document.getElementById('body-mass').value);
    const dutyCycle = parseFloat(document.getElementById('duty-cycle').value);
    
    if (isNaN(rfPower) || isNaN(bodyMass) || isNaN(dutyCycle)) {
        displayCalculationResult('sar-result', 'Please enter valid numbers for all fields.', 'error');
        return;
    }
    
    if (dutyCycle > 100 || dutyCycle < 0) {
        displayCalculationResult('sar-result', 'Duty cycle must be between 0 and 100%.', 'error');
        return;
    }
    
    // SAR = (RF Power × Duty Cycle) / Body Mass
    const averagePower = rfPower * (dutyCycle / 100);
    const sarValue = averagePower / bodyMass;
    
    // Check against safety limits
    const limits = mriTechApp.technicalData.rfSystems.safety.sarLimits;
    let safetyStatus = 'safe';
    let limitExceeded = '';
    
    if (sarValue > limits.wholeBody) {
        safetyStatus = 'warning';
        limitExceeded = `Exceeds whole body limit (${limits.wholeBody} W/kg)`;
    }
    
    const resultHTML = `
        <div class="sar-calculation-result">
            <h5>SAR Calculation Result</h5>
            <div class="calc-main-result ${safetyStatus}">
                <strong>SAR: ${formatNumber(sarValue, 3)} W/kg</strong>
            </div>
            <div class="calc-details">
                <p>Average Power: ${formatNumber(averagePower, 1)} W</p>
                <p>Body Mass: ${bodyMass} kg</p>
                <p>Duty Cycle: ${dutyCycle}%</p>
                ${limitExceeded ? `<p class="safety-warning">⚠️ ${limitExceeded}</p>` : '<p class="safety-ok">✅ Within safety limits</p>'}
            </div>
            <div class="safety-limits-ref">
                <small>
                    <strong>Safety Limits:</strong><br>
                    Whole Body: ${limits.wholeBody} W/kg<br>
                    Head/Neck: ${limits.headNeck} W/kg<br>
                    Local (10g): ${limits.localSAR} W/kg
                </small>
            </div>
        </div>
    `;
    
    displayCalculationResult('sar-result', resultHTML, safetyStatus);
    showTechnicalNotification(`SAR calculated: ${formatNumber(sarValue, 3)} W/kg`, safetyStatus === 'warning' ? 'warning' : 'success');
}

// SNR Calculator
function calculateSNR() {
    console.log('Calculate SNR called');
    const fieldStrength = parseFloat(document.getElementById('field-strength').value);
    const voxelVolume = parseFloat(document.getElementById('voxel-volume').value);
    const acqTime = parseFloat(document.getElementById('acq-time').value);
    
    if (isNaN(fieldStrength) || isNaN(voxelVolume) || isNaN(acqTime)) {
        displayCalculationResult('snr-result', 'Please enter valid numbers for all fields.', 'error');
        return;
    }
    
    // Simplified SNR estimation: SNR ∝ B₀ × √(voxel_volume × acquisition_time)
    const baseSnr = 100; // Reference SNR at 1.5T, 1mm³, 1s
    const fieldRatio = fieldStrength / 1.5;
    const volumeRatio = voxelVolume / 1.0;
    const timeRatio = acqTime / 1.0;
    
    const estimatedSnr = baseSnr * fieldRatio * Math.sqrt(volumeRatio * timeRatio);
    
    // Calculate noise level (arbitrary units)
    const noiseLevel = 1000 / estimatedSnr;
    
    // Performance assessment
    let performance = 'excellent';
    let performanceNote = 'Excellent diagnostic quality';
    
    if (estimatedSnr < 50) {
        performance = 'poor';
        performanceNote = 'May need optimization';
    } else if (estimatedSnr < 100) {
        performance = 'adequate';
        performanceNote = 'Adequate for most applications';
    } else if (estimatedSnr < 200) {
        performance = 'good';
        performanceNote = 'Good diagnostic quality';
    }
    
    const resultHTML = `
        <div class="snr-calculation-result">
            <h5>SNR Estimation Result</h5>
            <div class="calc-main-result ${performance}">
                <strong>Estimated SNR: ${formatNumber(estimatedSnr, 1)}:1</strong>
            </div>
            <div class="calc-details">
                <p>Field Strength: ${fieldStrength} T</p>
                <p>Voxel Volume: ${voxelVolume} mm³</p>
                <p>Acquisition Time: ${acqTime} s</p>
                <p>Noise Level: ${formatNumber(noiseLevel, 2)} (a.u.)</p>
            </div>
            <div class="performance-assessment">
                <p class="performance-${performance}"><strong>${performanceNote}</strong></p>
                <small>
                    Note: This is a simplified estimation. Actual SNR depends on many factors including coil design, 
                    pulse sequence, and tissue properties.
                </small>
            </div>
        </div>
    `;
    
    displayCalculationResult('snr-result', resultHTML, performance);
    showTechnicalNotification(`SNR estimated: ${formatNumber(estimatedSnr, 1)}:1`, 'success');
}

// Gradient Performance Calculator
function calculateGradient() {
    console.log('Calculate gradient performance called');
    const maxGradient = parseFloat(document.getElementById('max-gradient').value);
    const slewRate = parseFloat(document.getElementById('slew-rate').value);
    const fov = parseFloat(document.getElementById('fov').value);
    
    if (isNaN(maxGradient) || isNaN(slewRate) || isNaN(fov)) {
        displayCalculationResult('gradient-result', 'Please enter valid numbers for all fields.', 'error');
        return;
    }
    
    // Calculate performance parameters
    const riseTime = maxGradient / slewRate; // ms
    const minTe = riseTime * 2; // Minimum TE for gradient echo
    const maxBandwidth = 42.58 * maxGradient * fov / 100; // kHz (simplified)
    const minSliceThickness = fov * 10 / maxGradient; // mm (simplified)
    
    // Power calculation (simplified)
    const estimatedPower = Math.pow(maxGradient / 40, 2) * Math.pow(slewRate / 100, 1.5) * 50; // kVA
    
    // Performance rating
    let performance = 'standard';
    let performanceNote = 'Standard clinical performance';
    
    if (maxGradient >= 60 && slewRate >= 180) {
        performance = 'high';
        performanceNote = 'High-performance system';
    } else if (maxGradient >= 40 && slewRate >= 120) {
        performance = 'good';
        performanceNote = 'Good clinical performance';
    } else if (maxGradient < 30 || slewRate < 100) {
        performance = 'basic';
        performanceNote = 'Basic performance system';
    }
    
    const resultHTML = `
        <div class="gradient-calculation-result">
            <h5>Gradient Performance Analysis</h5>
            <div class="calc-main-result ${performance}">
                <strong>${performanceNote}</strong>
            </div>
            <div class="calc-details">
                <p>Rise Time: ${formatNumber(riseTime, 2)} ms</p>
                <p>Min TE (GRE): ${formatNumber(minTe, 2)} ms</p>
                <p>Max Bandwidth: ${formatNumber(maxBandwidth, 1)} kHz</p>
                <p>Min Slice Thickness: ${formatNumber(minSliceThickness, 2)} mm</p>
                <p>Estimated Power: ${formatNumber(estimatedPower, 1)} kVA</p>
            </div>
            <div class="performance-capabilities">
                <h6>Imaging Capabilities:</h6>
                <ul>
                    <li>${maxBandwidth > 100 ? '✅' : '⚠️'} High bandwidth imaging</li>
                    <li>${minTe < 5 ? '✅' : '⚠️'} Short TE sequences</li>
                    <li>${slewRate > 150 ? '✅' : '⚠️'} Fast gradient switching</li>
                    <li>${maxGradient > 50 ? '✅' : '⚠️'} High resolution capability</li>
                </ul>
            </div>
        </div>
    `;
    
    displayCalculationResult('gradient-result', resultHTML, performance);
    showTechnicalNotification(`Gradient performance: ${performanceNote}`, 'success');
}

// Frequency Calculator
function calculateFrequency() {
    console.log('Calculate frequency called');
    const magneticField = parseFloat(document.getElementById('magnetic-field').value);
    const nucleusType = parseFloat(document.getElementById('nucleus-type').value);
    
    if (isNaN(magneticField) || isNaN(nucleusType)) {
        displayCalculationResult('frequency-result', 'Please enter valid numbers for all fields.', 'error');
        return;
    }
    
    // Larmor frequency calculation: f = γ × B₀
    const frequency = nucleusType * magneticField; // MHz
    const frequencyHz = frequency * 1e6; // Hz
    const wavelength = 299792458 / frequencyHz; // meters (c/f)
    
    // Find nucleus name
    let nucleusName = 'Unknown';
    const constants = mriTechApp.constants.gyromagneticRatio;
    Object.keys(constants).forEach(key => {
        if (Math.abs(constants[key] - nucleusType) < 0.01) {
            nucleusName = key.replace(/([A-Z])/g, ' $1').replace(/^\s/, '').toUpperCase();
        }
    });
    
    // Calculate some related parameters
    const period = 1 / frequencyHz * 1e9; // nanoseconds
    const angularFrequency = 2 * Math.PI * frequencyHz; // rad/s
    
    const resultHTML = `
        <div class="frequency-calculation-result">
            <h5>Larmor Frequency Calculation</h5>
            <div class="calc-main-result">
                <strong>Frequency: ${formatNumber(frequency, 2)} MHz</strong>
            </div>
            <div class="calc-details">
                <p>Nucleus: ${nucleusName}</p>
                <p>Magnetic Field: ${magneticField} T</p>
                <p>Frequency (Hz): ${formatScientific(frequencyHz)} Hz</p>
                <p>Wavelength: ${formatNumber(wavelength, 2)} m</p>
                <p>Period: ${formatNumber(period, 2)} ns</p>
                <p>Angular Frequency: ${formatScientific(angularFrequency)} rad/s</p>
            </div>
            <div class="frequency-applications">
                <h6>Technical Applications:</h6>
                <ul>
                    <li>RF transmitter frequency setting</li>
                    <li>Receiver bandwidth optimization</li>
                    <li>Chemical shift calculation</li>
                    <li>SAR calculation input</li>
                </ul>
            </div>
        </div>
    `;
    
    displayCalculationResult('frequency-result', resultHTML, 'success');
    showTechnicalNotification(`Larmor frequency: ${formatNumber(frequency, 2)} MHz`, 'success');
}

// Calculation Result Display
function displayCalculationResult(elementId, content, status = 'info') {
    const resultElement = document.getElementById(elementId);
    if (!resultElement) return;
    
    resultElement.innerHTML = content;
    resultElement.className = `calc-result calc-result--${status}`;
}

// Chart Functions
function initializeGradientChart() {
    console.log('Initializing gradient chart');
    const ctx = document.getElementById('gradientChart');
    if (!ctx) {
        console.error('Gradient chart canvas not found');
        return;
    }
    
    // Destroy existing chart if it exists
    if (mriTechApp.currentChart) {
        mriTechApp.currentChart.destroy();
    }
    
    // Gradient performance data
    const gradientData = {
        labels: ['X-Axis', 'Y-Axis', 'Z-Axis'],
        datasets: [
            {
                label: 'Max Amplitude (mT/m)',
                data: [40, 40, 40],
                backgroundColor: '#1FB8CD',
                borderColor: '#1FB8CD',
                borderWidth: 2
            },
            {
                label: 'Slew Rate (mT/m/ms)',
                data: [150, 150, 150],
                backgroundColor: '#FFC185',
                borderColor: '#FFC185',
                borderWidth: 2
            },
            {
                label: 'Rise Time (ms × 10)',
                data: [2.7, 2.7, 2.7], // Rise time × 10 for visibility
                backgroundColor: '#B4413C',
                borderColor: '#B4413C',
                borderWidth: 2
            }
        ]
    };
    
    const config = {
        type: 'bar',
        data: gradientData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Gradient System Performance Specifications',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Performance Value'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Gradient Axis'
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    };
    
    mriTechApp.currentChart = new Chart(ctx, config);
    showTechnicalNotification('Gradient performance chart loaded', 'success');
}

// System Diagram Functions
function showSystemDiagram() {
    console.log('Show system diagram called');
    showModal('system-diagram-modal');
}

function showSpecificationComparison() {
    console.log('Show specification comparison called');
    showModal('spec-comparison-modal');
    showTechnicalNotification('MRI system specification comparison opened', 'info');
}

// Notification System
function showTechnicalNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `tech-notification tech-notification--${type}`;
    
    const iconMap = {
        info: '🔧',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${iconMap[type] || '🔧'}</span>
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
        border: 2px solid var(--color-mri-magenta);
        border-radius: var(--tech-border-radius);
        padding: var(--space-12) var(--space-16);
        box-shadow: var(--tech-shadow);
        max-width: 400px;
        animation: slideInTech 0.3s ease-out;
        font-family: var(--font-family-tech);
    `;
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutTech 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Event Listeners Setup
function setupTechnicalEventListeners() {
    console.log('Setting up technical event listeners...');
    
    // Navigation smooth scrolling
    document.querySelectorAll('.nav-section[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
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
    
    // Calculator input validation
    document.querySelectorAll('.calc-input[type="number"]').forEach(input => {
        input.addEventListener('input', debounce((e) => {
            validateTechnicalInput(e.target);
        }, 300));
    });
    
    console.log('Technical event listeners set up successfully');
}

// Input Validation
function validateTechnicalInput(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.min) || -Infinity;
    const max = parseFloat(input.max) || Infinity;
    
    input.classList.remove('input-error', 'input-warning', 'input-success');
    
    if (isNaN(value)) {
        input.classList.add('input-error');
        return false;
    } else if (value < min || value > max) {
        input.classList.add('input-warning');
        return false;
    } else {
        input.classList.add('input-success');
        return true;
    }
}

// Scroll-based navigation highlighting
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.tech-section');
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

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor chart rendering performance
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.name.includes('chart')) {
                console.log(`Chart rendering: ${entry.duration.toFixed(2)}ms`);
            }
        }
    });
    
    if (typeof PerformanceObserver !== 'undefined') {
        observer.observe({ entryTypes: ['measure'] });
    }
}

// Initialize the technical application
function initializeMRITechApp() {
    console.log('Initializing MRI Technical Details Center...');
    
    // Set up event listeners
    setupTechnicalEventListeners();
    
    // Initialize charts after DOM is ready
    setTimeout(() => {
        initializeGradientChart();
    }, 100);
    
    // Set up performance monitoring
    initializePerformanceMonitoring();
    
    // Show initial calculator
    showCalculator('sar');
    
    console.log('MRI Technical Details Center initialized successfully');
}

// Scroll listener for navigation highlighting
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavOnScroll, 100);
});

// Error Handling
window.addEventListener('error', function(event) {
    console.error('MRI Tech App Error:', event.error);
    showTechnicalNotification('A technical error occurred. Please refresh if problems persist.', 'error');
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`MRI Technical Details Center loaded in ${loadTime.toFixed(2)}ms`);
    
    // Show welcome notification after load
    setTimeout(() => {
        showTechnicalNotification('🧲 MRI Technical Details Center loaded. Professional technical resource ready.', 'success');
    }, 1000);
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing MRI Technical Details Center...');
    initializeMRITechApp();
});

// Export functions to global scope for onclick handlers
window.scrollToSection = scrollToSection;
window.showTechnicalCalculator = showTechnicalCalculator;
window.showCalculator = showCalculator;
window.calculateSAR = calculateSAR;
window.calculateSNR = calculateSNR;
window.calculateGradient = calculateGradient;
window.calculateFrequency = calculateFrequency;
window.showSystemDiagram = showSystemDiagram;
window.showSpecificationComparison = showSpecificationComparison;
window.showModal = showModal;
window.closeModal = closeModal;

// Add technical-specific CSS animations
const techStyle = document.createElement('style');
techStyle.textContent = `
    @keyframes slideInTech {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutTech {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .tech-notification {
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
        transition: all var(--duration-tech) var(--ease-tech);
    }
    
    .notification-close:hover {
        color: var(--color-text);
        background: var(--color-secondary);
    }
    
    .calc-result--success { border-left: 4px solid var(--color-success); }
    .calc-result--warning { border-left: 4px solid var(--color-warning); }
    .calc-result--error { border-left: 4px solid var(--color-error); }
    .calc-result--info { border-left: 4px solid var(--color-info); }
    
    .calc-main-result {
        text-align: center;
        margin-bottom: var(--space-16);
        padding: var(--space-12);
        border-radius: var(--radius-base);
        background: var(--color-tech-bg-1);
    }
    
    .calc-main-result.safe { border: 2px solid var(--color-success); }
    .calc-main-result.warning { border: 2px solid var(--color-warning); }
    .calc-main-result.error { border: 2px solid var(--color-error); }
    .calc-main-result.excellent { border: 2px solid var(--color-success); }
    .calc-main-result.good { border: 2px solid var(--color-engineering-green); }
    .calc-main-result.adequate { border: 2px solid var(--color-engineering-orange); }
    .calc-main-result.poor { border: 2px solid var(--color-error); }
    .calc-main-result.high { border: 2px solid var(--color-success); }
    .calc-main-result.standard { border: 2px solid var(--color-info); }
    .calc-main-result.basic { border: 2px solid var(--color-warning); }
    
    .calc-details {
        font-size: var(--font-size-sm);
        margin-bottom: var(--space-12);
    }
    
    .calc-details p {
        margin: var(--space-4) 0;
        color: var(--color-text-secondary);
    }
    
    .safety-warning {
        color: var(--color-warning) !important;
        font-weight: var(--font-weight-semibold);
    }
    
    .safety-ok {
        color: var(--color-success) !important;
        font-weight: var(--font-weight-semibold);
    }
    
    .input-error {
        border-color: var(--color-error) !important;
        box-shadow: 0 0 0 2px rgba(var(--color-error-rgb), 0.2) !important;
    }
    
    .input-warning {
        border-color: var(--color-warning) !important;
        box-shadow: 0 0 0 2px rgba(var(--color-warning-rgb), 0.2) !important;
    }
    
    .input-success {
        border-color: var(--color-success) !important;
        box-shadow: 0 0 0 2px rgba(var(--color-success-rgb), 0.2) !important;
    }
    
    .performance-capabilities ul {
        margin: var(--space-8) 0;
        padding-left: var(--space-20);
    }
    
    .performance-capabilities li {
        margin-bottom: var(--space-4);
        font-size: var(--font-size-sm);
    }
    
    .frequency-applications ul {
        margin: var(--space-8) 0;
        padding-left: var(--space-20);
    }
    
    .frequency-applications li {
        margin-bottom: var(--space-4);
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
    }
    
    .specs-comparison-table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--font-size-sm);
        margin-top: var(--space-16);
    }
    
    .specs-comparison-table th {
        background: var(--gradient-mri-tech);
        color: white;
        padding: var(--space-12);
        text-align: left;
        font-weight: var(--font-weight-semibold);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .specs-comparison-table td {
        padding: var(--space-12);
        border: 1px solid var(--color-border);
        color: var(--color-text);
        background: var(--color-surface);
    }
    
    .specs-comparison-table tr:nth-child(even) td {
        background: var(--color-tech-bg-1);
    }
    
    .specs-comparison-table td:first-child {
        font-weight: var(--font-weight-semibold);
        color: var(--color-mri-magenta);
    }
`;
document.head.appendChild(techStyle);

console.log('MRI Technical Details Center JavaScript loaded successfully 🧲⚙️');