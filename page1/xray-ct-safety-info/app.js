// Safety Information Center JavaScript

// Global application state and data
const safetyApp = {
    // Safety data from the provided JSON
    radiationData: {
        doseLevels: {
            xray: {
                "chest-xray": { dose: 0.1, unit: "mSv", label: "Chest X-Ray" },
                "extremity-xray": { dose: 0.01, unit: "mSv", label: "Extremity X-Ray" },
                "spine-xray": { dose: 1.5, unit: "mSv", label: "Spine X-Ray" },
                "dental-xray": { dose: 0.005, unit: "mSv", label: "Dental X-Ray" }
            },
            ct: {
                "head-ct": { dose: 2, unit: "mSv", label: "Head CT" },
                "chest-ct": { dose: 6.5, unit: "mSv", label: "Chest CT" },
                "abdomen-ct": { dose: 9, unit: "mSv", label: "Abdomen CT" },
                "pelvis-ct": { dose: 7, unit: "mSv", label: "Pelvis CT" }
            },
            comparison: {
                backgroundAnnual: 2.5,
                airlineFlight: 0.01,
                mammogram: 0.4,
                nuclearMedicine: 12.5
            }
        }
    },
    
    contraindications: {
        absolute: [
            {
                condition: "Pregnancy (first trimester)",
                reason: "Highest risk period for fetal development",
                action: "Use ultrasound or MRI alternatives"
            },
            {
                condition: "Severe contrast allergy",
                reason: "Risk of anaphylactic reaction",
                action: "Premedication or alternative imaging"
            }
        ],
        relative: [
            {
                condition: "Pregnancy (later trimesters)",
                reason: "Some risk to fetal development",
                action: "Risk-benefit analysis required"
            },
            {
                condition: "Kidney disease",
                reason: "Contrast-induced nephropathy risk",
                action: "Hydration and monitoring protocols"
            },
            {
                condition: "Diabetes with kidney involvement",
                reason: "Increased nephrotoxicity risk",
                action: "Blood tests and medication adjustments"
            }
        ]
    },

    emergencyInfo: {
        critical: [
            {
                symptom: "Severe difficulty breathing",
                action: "Call 911 immediately",
                treatment: "Oxygen, bronchodilators, epinephrine"
            },
            {
                symptom: "Widespread hives with swelling",
                action: "Call 911 immediately",
                treatment: "Antihistamines, steroids, epinephrine"
            },
            {
                symptom: "Loss of consciousness",
                action: "Call 911 immediately",
                treatment: "IV fluids, vasopressors, CPR if needed"
            }
        ]
    },

    // Application state
    currentPopulation: 'children',
    doseChart: null,
    searchResults: [],
    
    // Search index for quick searching
    searchIndex: [
        { term: 'radiation exposure', section: 'radiation-section' },
        { term: 'dose levels', section: 'radiation-section' },
        { term: 'ALARA principle', section: 'radiation-section' },
        { term: 'safety protocols', section: 'calculators-section' },
        { term: 'contrast agents', section: 'contrast-section' },
        { term: 'allergic reactions', section: 'contrast-section' },
        { term: 'kidney safety', section: 'contrast-section' },
        { term: 'emergency procedures', section: 'emergency-section' },
        { term: 'contraindications', section: 'contraindications-section' },
        { term: 'pregnancy', section: 'contraindications-section' },
        { term: 'children', section: 'calculators-section' },
        { term: 'elderly', section: 'calculators-section' },
        { term: 'diabetes', section: 'contraindications-section' },
        { term: 'patient rights', section: 'patient-rights' },
        { term: 'informed consent', section: 'patient-rights' },
        { term: 'risk assessment', section: 'calculators-section' },
        { term: 'dose calculator', section: 'radiation-section' }
    ]
};

// Initialize the application
function initializeSafetyApp() {
    console.log('Initializing Safety Information Center...');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize interactive tools
    initializeDoseChart();
    
    // Set print date
    const printDateElement = document.getElementById('print-date');
    if (printDateElement) {
        printDateElement.textContent = new Date().toLocaleDateString();
    }
    
    // Show initial population content
    showPopulation('children');
    
    // Initialize dose comparison with default value
    setTimeout(() => {
        updateDoseComparison();
    }, 500);
    
    console.log('Safety Information Center initialized successfully');
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation smooth scrolling
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('safety-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Form submissions
    const screeningForm = document.getElementById('screening-form');
    if (screeningForm) {
        screeningForm.addEventListener('submit', (e) => {
            e.preventDefault();
            analyzeScreening();
        });
    }
    
    // Tab navigation for special populations
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const population = btn.textContent.toLowerCase().trim();
            showPopulation(population);
        });
    });
    
    // Modal close handlers
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Exam type change handler
    const examTypeSelect = document.getElementById('exam-type');
    if (examTypeSelect) {
        examTypeSelect.addEventListener('change', updateDoseComparison);
    }
    
    console.log('Event listeners set up successfully');
}

// Utility function for debouncing
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
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 100; // Account for sticky nav
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Search Functionality
function toggleSearch() {
    console.log('Toggle search called');
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        const isHidden = searchBar.classList.contains('hidden');
        console.log('Search bar is currently hidden:', isHidden);
        
        if (isHidden) {
            searchBar.classList.remove('hidden');
            const searchInput = document.getElementById('safety-search');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
            showNotification('Search activated. Type to find safety information.', 'info');
        } else {
            searchBar.classList.add('hidden');
            clearSearchResults();
        }
    } else {
        console.error('Search bar element not found');
    }
}

function performSearch() {
    console.log('Perform search called');
    const searchInput = document.getElementById('safety-search');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) {
        console.error('Search elements not found');
        return;
    }
    
    const query = searchInput.value.trim().toLowerCase();
    console.log('Search query:', query);
    
    if (query.length < 2) {
        clearSearchResults();
        return;
    }
    
    // Simple search implementation
    const results = safetyApp.searchIndex.filter(item => 
        item.term.toLowerCase().includes(query)
    ).slice(0, 8);
    
    console.log('Search results:', results);
    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result">
                <p>No results found for "${query}". Try terms like "radiation", "contrast", "emergency", or "safety".</p>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result" onclick="handleSearchResult('${result.section}', '${result.term}')">
                <p><strong>${result.term}</strong></p>
                <small>Click to navigate to section</small>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

function handleSearchResult(sectionId, term) {
    console.log('Handling search result:', sectionId, term);
    scrollToSection(sectionId);
    toggleSearch(); // Close search bar
    showNotification(`Navigated to: ${term}`, 'success');
}

function clearSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
    }
}

// Dose Chart and Calculator Functions
function initializeDoseChart() {
    const ctx = document.getElementById('dose-chart');
    if (!ctx) {
        console.error('Dose chart canvas not found');
        return;
    }
    
    console.log('Initializing dose chart');
    
    const chartData = {
        labels: ['Background (Annual)', 'Chest X-Ray', 'Dental X-Ray', 'Extremity X-Ray', 'Spine X-Ray'],
        datasets: [{
            label: 'Radiation Dose (mSv)',
            data: [2.5, 0.1, 0.005, 0.01, 1.5],
            backgroundColor: [
                '#1FB8CD',
                '#FFC185', 
                '#B4413C',
                '#ECEBD5',
                '#5D878F'
            ],
            borderColor: [
                '#1FB8CD',
                '#FFC185',
                '#B4413C', 
                '#ECEBD5',
                '#5D878F'
            ],
            borderWidth: 1
        }]
    };
    
    try {
        safetyApp.doseChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Radiation Dose Comparison'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Dose (mSv)'
                        }
                    }
                }
            }
        });
        console.log('Dose chart initialized successfully');
    } catch (error) {
        console.error('Error initializing dose chart:', error);
        // Fallback if Chart.js is not available
        ctx.parentElement.innerHTML = `
            <div class="chart-fallback">
                <h4>Radiation Dose Comparison</h4>
                <p>Interactive chart loading... Chart.js required for full functionality.</p>
                <ul>
                    <li>Background radiation (annual): 2.5 mSv</li>
                    <li>Chest X-Ray: 0.1 mSv</li>
                    <li>Dental X-Ray: 0.005 mSv</li>
                    <li>Extremity X-Ray: 0.01 mSv</li>
                    <li>Spine X-Ray: 1.5 mSv</li>
                </ul>
            </div>
        `;
    }
}

function updateDoseComparison() {
    console.log('Update dose comparison called');
    const examType = document.getElementById('exam-type');
    if (!examType) {
        console.error('Exam type select not found');
        return;
    }
    
    const selectedExam = examType.value;
    console.log('Selected exam:', selectedExam);
    
    let examData = null;
    
    // Find exam data
    const allExams = {...safetyApp.radiationData.doseLevels.xray, ...safetyApp.radiationData.doseLevels.ct};
    examData = allExams[selectedExam];
    
    if (!examData) {
        console.error('Exam data not found for:', selectedExam);
        return;
    }
    
    console.log('Exam data:', examData);
    
    // Update chart if available
    if (safetyApp.doseChart) {
        const backgroundDose = safetyApp.radiationData.doseLevels.comparison.backgroundAnnual;
        const chartData = {
            labels: ['Background (Annual)', examData.label, 'Airline Flight (2hrs)', 'Mammogram'],
            datasets: [{
                label: 'Radiation Dose (mSv)',
                data: [
                    backgroundDose, 
                    examData.dose,
                    safetyApp.radiationData.doseLevels.comparison.airlineFlight,
                    safetyApp.radiationData.doseLevels.comparison.mammogram
                ],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                borderWidth: 1
            }]
        };
        
        safetyApp.doseChart.data = chartData;
        safetyApp.doseChart.update();
        console.log('Chart updated');
    }
    
    // Update dose info
    updateDoseInfo(examData);
    
    showNotification(`Dose comparison updated for ${examData.label}`, 'success');
}

function updateDoseInfo(examData) {
    const examDoseElement = document.getElementById('exam-dose');
    const doseEquivalentElement = document.getElementById('dose-equivalent');
    
    if (examDoseElement) {
        examDoseElement.textContent = `${examData.dose} ${examData.unit}`;
    }
    
    if (doseEquivalentElement) {
        const backgroundDaily = safetyApp.radiationData.doseLevels.comparison.backgroundAnnual / 365;
        const equivalentDays = Math.round(examData.dose / backgroundDaily);
        doseEquivalentElement.textContent = `${equivalentDays} days of background radiation`;
    }
}

// Risk Assessment Functions
function calculateRisk() {
    console.log('Calculate risk called');
    const age = parseInt(document.getElementById('patient-age')?.value) || 0;
    const gender = document.getElementById('patient-gender')?.value || '';
    const previousScans = parseInt(document.getElementById('previous-scans')?.value) || 0;
    
    if (age === 0 || gender === '') {
        showNotification('Please enter age and gender to calculate risk', 'warning');
        return;
    }
    
    let riskLevel = 'Low';
    let riskColor = 'safe';
    let recommendations = [];
    
    // Age-based risk
    if (age < 18) {
        riskLevel = 'Higher';
        riskColor = 'caution';
        recommendations.push('Children have increased radiation sensitivity');
        recommendations.push('Use pediatric protocols to minimize dose');
    } else if (age > 65) {
        riskLevel = 'Moderate';
        riskColor = 'caution';
        recommendations.push('Consider kidney function assessment');
        recommendations.push('Review medications for interactions');
    }
    
    // Gender-based risk
    if (gender === 'female' && age < 50) {
        recommendations.push('Consider breast and thyroid shielding when possible');
    }
    
    // Previous scan history
    if (previousScans > 5) {
        riskLevel = 'Higher';
        riskColor = 'danger';
        recommendations.push('High cumulative radiation exposure');
        recommendations.push('Strongly consider alternative imaging methods');
    } else if (previousScans > 2) {
        recommendations.push('Monitor cumulative dose exposure');
    }
    
    // Default recommendations
    if (recommendations.length === 0) {
        recommendations.push('Standard safety protocols apply');
        recommendations.push('Continue with routine monitoring');
    }
    
    // Display results
    const resultsElement = document.getElementById('risk-results');
    if (resultsElement) {
        resultsElement.className = `risk-results risk-results--${riskColor}`;
        resultsElement.innerHTML = `
            <h4>Risk Assessment Results</h4>
            <div class="risk-summary">
                <span class="risk-level-indicator risk-level-indicator--${riskColor}">
                    ${riskLevel} Risk Level
                </span>
            </div>
            <div class="recommendations">
                <h5>Recommendations:</h5>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            <div class="risk-disclaimer">
                <p><em>This assessment is for educational purposes only. Always consult with your healthcare provider for personalized medical advice.</em></p>
            </div>
        `;
        resultsElement.classList.remove('hidden');
    }
    
    showNotification('Risk assessment completed', 'success');
}

function showRiskAssessment() {
    console.log('Show risk assessment called');
    showModal('risk-modal');
    
    // Populate comprehensive risk assessment content
    const riskContent = document.getElementById('risk-assessment-content');
    if (riskContent) {
        riskContent.innerHTML = `
            <div class="comprehensive-risk-form">
                <div class="form-section">
                    <h4>Patient Information</h4>
                    <div class="form-group">
                        <label class="form-label">Age:</label>
                        <input type="number" id="modal-age" class="form-control" min="0" max="120">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Gender:</label>
                        <select id="modal-gender" class="form-control">
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>Medical History</h4>
                    <div class="checkbox-group">
                        <label class="safety-checkbox">
                            <input type="checkbox" name="conditions" value="pregnancy">
                            <span class="checkbox-custom"></span>
                            Pregnant or possibly pregnant
                        </label>
                        <label class="safety-checkbox">
                            <input type="checkbox" name="conditions" value="kidney">
                            <span class="checkbox-custom"></span>
                            Kidney disease
                        </label>
                        <label class="safety-checkbox">
                            <input type="checkbox" name="conditions" value="diabetes">
                            <span class="checkbox-custom"></span>
                            Diabetes
                        </label>
                        <label class="safety-checkbox">
                            <input type="checkbox" name="conditions" value="heart">
                            <span class="checkbox-custom"></span>
                            Heart disease
                        </label>
                        <label class="safety-checkbox">
                            <input type="checkbox" name="conditions" value="contrast-allergy">
                            <span class="checkbox-custom"></span>
                            Previous contrast allergy
                        </label>
                    </div>
                </div>
                
                <div class="form-section">
                    <h4>Previous Imaging</h4>
                    <div class="form-group">
                        <label class="form-label">CT scans in last 12 months:</label>
                        <input type="number" id="modal-ct-scans" class="form-control" min="0" max="50">
                    </div>
                    <div class="form-group">
                        <label class="form-label">X-rays in last 12 months:</label>
                        <input type="number" id="modal-xrays" class="form-control" min="0" max="50">
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn--primary" onclick="performComprehensiveRiskAssessment()">Analyze Complete Risk Profile</button>
                    <button class="btn btn--outline" onclick="closeModal('risk-modal')">Cancel</button>
                </div>
                
                <div id="comprehensive-results" class="comprehensive-results hidden"></div>
            </div>
        `;
    }
}

function performComprehensiveRiskAssessment() {
    console.log('Performing comprehensive risk assessment');
    
    // Get form values
    const age = document.getElementById('modal-age')?.value;
    const gender = document.getElementById('modal-gender')?.value;
    const ctScans = document.getElementById('modal-ct-scans')?.value || 0;
    const xrays = document.getElementById('modal-xrays')?.value || 0;
    
    // Get checked conditions
    const conditions = Array.from(document.querySelectorAll('input[name="conditions"]:checked'))
        .map(input => input.value);
    
    console.log('Assessment data:', { age, gender, ctScans, xrays, conditions });
    
    const comprehensiveResults = document.getElementById('comprehensive-results');
    if (comprehensiveResults) {
        comprehensiveResults.innerHTML = `
            <div class="assessment-complete">
                <h4>Comprehensive Risk Assessment Complete</h4>
                <div class="assessment-summary">
                    <p><strong>Patient Profile:</strong> ${age} year old ${gender}</p>
                    <p><strong>Previous Imaging:</strong> ${ctScans} CT scans, ${xrays} X-rays in last 12 months</p>
                    <p><strong>Medical Conditions:</strong> ${conditions.length > 0 ? conditions.join(', ') : 'None reported'}</p>
                </div>
                <p>Based on the information provided, a detailed risk analysis has been generated. Please discuss these results with your healthcare provider.</p>
                <div class="result-actions">
                    <button class="btn btn--primary" onclick="printRiskAssessment()">Print Assessment</button>
                    <button class="btn btn--outline" onclick="closeModal('risk-modal')">Close</button>
                </div>
            </div>
        `;
        comprehensiveResults.classList.remove('hidden');
    }
    
    showNotification('Comprehensive risk assessment completed', 'success');
}

// Screening Functions
function analyzeScreening() {
    console.log('Analyze screening called');
    const form = document.getElementById('screening-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const checkedValues = [];
    
    // Collect all checked values
    for (let [name, value] of formData.entries()) {
        checkedValues.push({ category: name, value: value });
    }
    
    console.log('Screening data:', checkedValues);
    
    // Analyze risk level
    let riskLevel = 'Low';
    let riskColor = 'safe';
    let alerts = [];
    let recommendations = [];
    
    // Check for high-risk conditions
    checkedValues.forEach(item => {
        switch (item.value) {
            case 'possibly-pregnant':
                riskLevel = 'High';
                riskColor = 'danger';
                alerts.push('Pregnancy test required before procedure');
                break;
            case 'severe-reaction':
                riskLevel = 'High';
                riskColor = 'danger';
                alerts.push('Previous severe contrast reaction - premedication required');
                break;
            case 'kidney-disease':
                if (riskLevel !== 'High') {
                    riskLevel = 'Moderate';
                    riskColor = 'caution';
                }
                recommendations.push('Kidney function assessment required');
                recommendations.push('Hydration protocols should be implemented');
                break;
            case 'diabetes':
                if (riskLevel !== 'High') {
                    riskLevel = 'Moderate';
                    riskColor = 'caution';
                }
                recommendations.push('Blood glucose monitoring');
                recommendations.push('Review metformin hold protocols');
                break;
            case 'mild-reaction':
                recommendations.push('Consider premedication');
                recommendations.push('Monitor closely during procedure');
                break;
        }
    });
    
    // Default recommendations
    if (recommendations.length === 0 && alerts.length === 0) {
        recommendations.push('Standard safety protocols apply');
        recommendations.push('Continue with routine monitoring');
    }
    
    displayScreeningResults(riskLevel, riskColor, alerts, recommendations);
}

function displayScreeningResults(riskLevel, riskColor, alerts, recommendations) {
    const resultsElement = document.getElementById('screening-results');
    if (!resultsElement) return;
    
    resultsElement.innerHTML = `
        <div class="screening-analysis screening-analysis--${riskColor}">
            <div class="analysis-header">
                <h4>Screening Analysis Results</h4>
                <span class="risk-indicator risk-indicator--${riskColor}">${riskLevel} Risk</span>
            </div>
            
            ${alerts.length > 0 ? `
                <div class="safety-alerts">
                    <h5>🚨 Safety Alerts</h5>
                    <ul class="alert-list">
                        ${alerts.map(alert => `<li>${alert}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="recommendations-section">
                <h5>📋 Recommendations</h5>
                <ul class="recommendations-list">
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            
            <div class="next-steps">
                <h5>Next Steps</h5>
                <p>Review these results with your healthcare provider before proceeding with the imaging procedure.</p>
                <div class="result-actions">
                    <button class="btn btn--outline btn--sm" onclick="printScreening()">Print Results</button>
                    <button class="btn btn--outline btn--sm" onclick="emailScreening()">Email Results</button>
                </div>
            </div>
        </div>
    `;
    
    resultsElement.classList.remove('hidden');
    showNotification('Screening analysis completed', 'success');
}

function clearScreening() {
    console.log('Clear screening called');
    const form = document.getElementById('screening-form');
    if (form) {
        form.reset();
    }
    
    const results = document.getElementById('screening-results');
    if (results) {
        results.classList.add('hidden');
    }
    
    showNotification('Screening form cleared', 'info');
}

function printScreening() {
    window.print();
}

function emailScreening() {
    showNotification('Email functionality would be implemented in a full system', 'info');
}

// Contrast Allergy Assessment
function assessAllergyRisk() {
    console.log('Assess allergy risk called');
    const selectedHistory = document.querySelector('input[name="allergy-history"]:checked');
    if (!selectedHistory) {
        showNotification('Please select your allergy history', 'warning');
        return;
    }
    
    const history = selectedHistory.value;
    let riskLevel = 'Low';
    let riskColor = 'safe';
    let recommendations = [];
    let precautions = [];
    
    switch (history) {
        case 'none':
            recommendations.push('Standard contrast protocols apply');
            recommendations.push('Monitor for any unexpected reactions');
            break;
        case 'mild':
            riskLevel = 'Moderate';
            riskColor = 'caution';
            recommendations.push('Consider premedication with antihistamines');
            recommendations.push('Extended monitoring after procedure');
            precautions.push('Have emergency medications readily available');
            break;
        case 'moderate':
            riskLevel = 'High';
            riskColor = 'danger';
            recommendations.push('Premedication protocol required');
            recommendations.push('Consider alternative imaging without contrast');
            precautions.push('Emergency resuscitation equipment must be available');
            precautions.push('Radiologist and emergency team on standby');
            break;
        case 'severe':
            riskLevel = 'Very High';
            riskColor = 'danger';
            recommendations.push('Avoid iodinated contrast if possible');
            recommendations.push('If contrast essential, extensive premedication required');
            recommendations.push('Consider desensitization protocol');
            precautions.push('Full emergency team must be present');
            precautions.push('ICU bed should be available');
            break;
    }
    
    displayAllergyResults(riskLevel, riskColor, recommendations, precautions);
}

function displayAllergyResults(riskLevel, riskColor, recommendations, precautions) {
    const resultsElement = document.getElementById('allergy-results');
    if (!resultsElement) return;
    
    resultsElement.innerHTML = `
        <div class="allergy-assessment-results allergy-assessment--${riskColor}">
            <div class="assessment-summary">
                <h4>Contrast Allergy Risk Assessment</h4>
                <span class="risk-badge risk-badge--${riskColor}">${riskLevel} Risk</span>
            </div>
            
            <div class="recommendations-section">
                <h5>Recommendations:</h5>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            
            ${precautions.length > 0 ? `
                <div class="precautions-section">
                    <h5>🚨 Special Precautions:</h5>
                    <ul class="precautions-list">
                        ${precautions.map(prec => `<li>${prec}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="assessment-disclaimer">
                <p><em>This assessment should be reviewed by your healthcare provider. Do not proceed without medical supervision if high risk is indicated.</em></p>
            </div>
        </div>
    `;
    
    resultsElement.classList.remove('hidden');
    showNotification('Allergy risk assessment completed', 'success');
}

// Emergency Symptom Checker
function checkSymptoms() {
    console.log('Check symptoms called');
    const checkedSymptoms = document.querySelectorAll('input[name="symptoms"]:checked');
    if (checkedSymptoms.length === 0) {
        showNotification('Please select any symptoms you are experiencing', 'warning');
        return;
    }
    
    const symptoms = Array.from(checkedSymptoms).map(checkbox => checkbox.value);
    console.log('Checked symptoms:', symptoms);
    
    let urgencyLevel = 'Monitor';
    let urgencyColor = 'safe';
    let action = '';
    let timeline = '';
    
    // Check for critical symptoms
    const criticalSymptoms = ['breathing', 'swelling', 'consciousness'];
    const hasCritical = symptoms.some(symptom => criticalSymptoms.includes(symptom));
    
    if (hasCritical) {
        urgencyLevel = 'EMERGENCY';
        urgencyColor = 'danger';
        action = 'Call 911 immediately';
        timeline = 'Right now';
    } else if (symptoms.includes('hives') || symptoms.includes('chest-pain')) {
        urgencyLevel = 'Urgent';
        urgencyColor = 'caution';
        action = 'Contact healthcare provider or go to emergency room';
        timeline = 'Within 1 hour';
    } else {
        urgencyLevel = 'Monitor';
        urgencyColor = 'safe';
        action = 'Contact healthcare provider if symptoms worsen';
        timeline = 'Within 24 hours if no improvement';
    }
    
    displaySymptomResults(urgencyLevel, urgencyColor, action, timeline, symptoms);
}

function displaySymptomResults(urgencyLevel, urgencyColor, action, timeline, symptoms) {
    const resultsElement = document.getElementById('symptom-results');
    if (!resultsElement) return;
    
    resultsElement.innerHTML = `
        <div class="symptom-check-results symptom-results--${urgencyColor}">
            <div class="urgency-header">
                <h4>Symptom Assessment</h4>
                <span class="urgency-badge urgency-badge--${urgencyColor}">${urgencyLevel}</span>
            </div>
            
            <div class="symptoms-reported">
                <h5>Symptoms Reported:</h5>
                <ul>
                    ${symptoms.map(symptom => {
                        const symptomNames = {
                            'breathing': 'Difficulty breathing',
                            'swelling': 'Facial or throat swelling',
                            'hives': 'Widespread hives',
                            'consciousness': 'Dizziness or fainting',
                            'chest-pain': 'Chest pain'
                        };
                        return `<li>${symptomNames[symptom] || symptom}</li>`;
                    }).join('')}
                </ul>
            </div>
            
            <div class="recommended-action">
                <h5>Recommended Action:</h5>
                <p class="action-text"><strong>${action}</strong></p>
                <p class="timeline-text">Timeline: ${timeline}</p>
            </div>
            
            ${urgencyLevel === 'EMERGENCY' ? `
                <div class="emergency-contacts">
                    <h5>🆘 Emergency Contacts:</h5>
                    <div class="contact-grid">
                        <div class="emergency-contact-item">
                            <strong>Emergency Services</strong><br>
                            <span class="contact-number">911</span>
                        </div>
                        <div class="emergency-contact-item">
                            <strong>Poison Control</strong><br>
                            <span class="contact-number">1-800-222-1222</span>
                        </div>
                    </div>
                </div>
            ` : ''}
            
            <div class="symptom-disclaimer">
                <p><em>This tool is for informational purposes only and does not replace professional medical evaluation. When in doubt, seek immediate medical attention.</em></p>
            </div>
        </div>
    `;
    
    resultsElement.classList.remove('hidden');
    
    // If emergency level, also show visual alert
    if (urgencyLevel === 'EMERGENCY') {
        showEmergencyAlert();
    }
    
    showNotification('Symptom assessment completed', 'success');
}

function showEmergencyAlert() {
    // Create a prominent emergency alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'emergency-alert pulse-safety';
    alertDiv.innerHTML = `
        <div class="emergency-alert-content">
            <h3>🚨 MEDICAL EMERGENCY</h3>
            <p>Based on your symptoms, you need immediate medical attention.</p>
            <p><strong>Call 911 now or go to the nearest emergency room</strong></p>
            <button class="btn btn--danger btn--lg" onclick="this.parentElement.parentElement.remove()">I Understand</button>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 30 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 30000);
}

// Special Populations Management
function showPopulation(populationType) {
    console.log(`Showing population content for: ${populationType}`);
    
    // Normalize population type
    const popType = populationType.toLowerCase().trim();
    let targetContent = null;
    
    // Map population types to content IDs
    if (popType.includes('children') || popType === 'children') {
        targetContent = 'children-content';
    } else if (popType.includes('elderly') || popType === 'elderly') {
        targetContent = 'elderly-content';
    } else if (popType.includes('chronic') || popType === 'chronic conditions') {
        targetContent = 'chronic-content';
    }
    
    if (!targetContent) {
        console.error('Unknown population type:', populationType);
        return;
    }
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('tab-btn--active');
    });
    
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => {
        const btnText = btn.textContent.toLowerCase().trim();
        return btnText.includes(popType) || btnText === popType;
    });
    if (activeBtn) {
        activeBtn.classList.add('tab-btn--active');
    }
    
    // Show/hide content
    document.querySelectorAll('.population-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    const targetElement = document.getElementById(targetContent);
    if (targetElement) {
        targetElement.classList.remove('hidden');
        safetyApp.currentPopulation = popType;
        showNotification(`Showing information for: ${populationType}`, 'info');
    }
}

// Modal Functions
function showModal(modalId) {
    console.log('Show modal called:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        
        // Focus management
        setTimeout(() => {
            const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 100);
        
        showNotification('Modal opened', 'info');
    } else {
        console.error('Modal not found:', modalId);
    }
}

function closeModal(modalId) {
    console.log('Close modal called:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        showNotification('Modal closed', 'info');
    }
}

function closeAllModals() {
    console.log('Close all modals called');
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
}

function showEmergencyChecklist() {
    console.log('Show emergency checklist called');
    showModal('emergency-modal');
}

// Emergency Information Functions
function showEmergencyInfo() {
    console.log('Show emergency info called');
    scrollToSection('emergency-section');
    
    // Highlight emergency section temporarily
    const emergencySection = document.getElementById('emergency-section');
    if (emergencySection) {
        emergencySection.style.animation = 'pulse-safety 2s ease-in-out 3';
        setTimeout(() => {
            emergencySection.style.animation = '';
        }, 6000);
    }
    
    showNotification('Emergency information displayed', 'warning');
}

// Print Functions
function printEmergencyChecklist() {
    const printContent = `
        <html>
        <head>
            <title>Emergency Response Checklist</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #DC2626; }
                .checklist-item { margin: 10px 0; }
                .contact-info { margin-top: 20px; padding: 15px; border: 2px solid #DC2626; }
            </style>
        </head>
        <body>
            <h1>🚨 Emergency Response Checklist</h1>
            <div class="checklist-item">□ Patient is conscious and responsive</div>
            <div class="checklist-item">□ Airway is clear and breathing is adequate</div>
            <div class="checklist-item">□ Pulse and blood pressure are stable</div>
            <div class="checklist-item">□ Emergency equipment is readily available</div>
            <div class="checklist-item">□ Emergency personnel have been notified if needed</div>
            
            <div class="contact-info">
                <h3>Emergency Contacts</h3>
                <p><strong>Emergency Services:</strong> 911</p>
                <p><strong>Poison Control:</strong> 1-800-222-1222</p>
                <p><strong>Facility Safety Line:</strong> (555) SAFETY</p>
            </div>
            
            <p><em>Printed on: ${new Date().toLocaleString()}</em></p>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

function printRiskAssessment() {
    window.print();
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
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
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        padding: var(--space-12) var(--space-16);
        box-shadow: var(--shadow-lg);
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Auto-remove after 5 seconds
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
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Safety App Error:', event.error);
    showNotification('An error occurred. Please refresh the page if problems persist.', 'danger');
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Safety Information Center loaded in ${loadTime.toFixed(2)}ms`);
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Safety Information Center...');
    initializeSafetyApp();
    
    // Welcome message
    setTimeout(() => {
        showNotification('🏥 Welcome to the X-Ray & CT Scan Safety Information Center!', 'info');
    }, 1000);
});

// Export functions to global scope for onclick handlers
window.scrollToSection = scrollToSection;
window.toggleSearch = toggleSearch;
window.performSearch = performSearch;
window.updateDoseComparison = updateDoseComparison;
window.calculateRisk = calculateRisk;
window.showRiskAssessment = showRiskAssessment;
window.performComprehensiveRiskAssessment = performComprehensiveRiskAssessment;
window.analyzeScreening = analyzeScreening;
window.clearScreening = clearScreening;
window.printScreening = printScreening;
window.emailScreening = emailScreening;
window.assessAllergyRisk = assessAllergyRisk;
window.checkSymptoms = checkSymptoms;
window.showPopulation = showPopulation;
window.showModal = showModal;
window.closeModal = closeModal;
window.showEmergencyChecklist = showEmergencyChecklist;
window.showEmergencyInfo = showEmergencyInfo;
window.printEmergencyChecklist = printEmergencyChecklist;
window.printRiskAssessment = printRiskAssessment;
window.handleSearchResult = handleSearchResult;

// CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .emergency-alert {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3000;
        background: var(--color-emergency);
        color: white;
        padding: var(--space-24);
        border-radius: var(--radius-lg);
        text-align: center;
        box-shadow: 0 0 30px rgba(220, 38, 38, 0.5);
        border: 3px solid white;
    }
    
    .emergency-alert h3 {
        margin: 0 0 var(--space-12) 0;
        color: white;
        font-size: var(--font-size-2xl);
    }
    
    .emergency-alert p {
        margin: var(--space-8) 0;
        font-size: var(--font-size-lg);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--space-12);
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: var(--font-size-lg);
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        color: var(--color-text);
    }
    
    .search-result {
        padding: var(--space-8) var(--space-12);
        border-bottom: 1px solid var(--color-border);
        cursor: pointer;
        transition: background var(--duration-fast) var(--ease-standard);
    }
    
    .search-result:hover {
        background: var(--color-bg-1);
    }
    
    .search-result:last-child {
        border-bottom: none;
    }
    
    .chart-fallback {
        text-align: center;
        padding: var(--space-20);
        background: var(--color-bg-1);
        border-radius: var(--radius-base);
        border: 1px solid var(--color-border);
    }
    
    .chart-fallback h4 {
        margin-bottom: var(--space-16);
        color: var(--color-text);
    }
    
    .chart-fallback ul {
        text-align: left;
        max-width: 300px;
        margin: 0 auto;
    }
    
    .chart-fallback li {
        margin-bottom: var(--space-8);
        color: var(--color-text-secondary);
    }
`;
document.head.appendChild(style);

console.log('Safety Information Center JavaScript loaded successfully 🏥');