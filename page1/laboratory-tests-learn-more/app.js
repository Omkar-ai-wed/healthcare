// Laboratory Tests Complete Guide JavaScript

// Global application state and laboratory data
const labTestsApp = {
    // Laboratory testing data from the provided JSON
    labData: {
        overview: {
            definition: "Medical procedures that analyze samples of blood, urine, saliva, stool, or other body fluids and tissues to help diagnose diseases, monitor health conditions, assess organ function, and guide treatment decisions",
            keyBenefits: [
                "Early disease detection and prevention",
                "Accurate diagnosis and treatment planning",
                "Monitoring of chronic conditions",
                "Assessment of organ function",
                "Medication effectiveness evaluation",
                "Health screening and wellness checks"
            ],
            howItWorks: [
                {
                    step: 1,
                    title: "Sample Collection",
                    description: "Healthcare provider collects specimen using sterile technique",
                    details: "Professional collection ensures proper specimen quality and patient safety"
                },
                {
                    step: 2,
                    title: "Laboratory Processing",
                    description: "Samples analyzed using specialized equipment and methods",
                    details: "Advanced technology and trained technologists perform precise analyses"
                },
                {
                    step: 3,
                    title: "Quality Control",
                    description: "Multiple checks ensure accurate and reliable results",
                    details: "Rigorous quality assurance protocols verify result accuracy"
                },
                {
                    step: 4,
                    title: "Results Interpretation",
                    description: "Healthcare providers analyze findings in clinical context",
                    details: "Medical professionals correlate results with symptoms and medical history"
                },
                {
                    step: 5,
                    title: "Patient Communication",
                    description: "Results explained and next steps discussed",
                    details: "Clear communication of findings and recommended follow-up care"
                }
            ]
        },
        
        testTypes: {
            bloodTests: [
                {
                    name: "Complete Blood Count (CBC)",
                    purpose: "Evaluates blood cells, detects anemia, infection, blood disorders",
                    sampleType: "Blood",
                    fastingRequired: false,
                    commonUses: ["Anemia diagnosis", "Infection detection", "Blood disorder screening"]
                },
                {
                    name: "Basic Metabolic Panel (BMP)",
                    purpose: "Checks kidney function, blood sugar, electrolytes",
                    sampleType: "Blood",
                    fastingRequired: true,
                    commonUses: ["Kidney function", "Diabetes screening", "Electrolyte balance"]
                },
                {
                    name: "Comprehensive Metabolic Panel (CMP)",
                    purpose: "Includes liver function, protein levels, electrolytes",
                    sampleType: "Blood",
                    fastingRequired: true,
                    commonUses: ["Liver function", "Kidney function", "Protein status"]
                },
                {
                    name: "Lipid Panel",
                    purpose: "Cholesterol and triglycerides for heart disease risk",
                    sampleType: "Blood",
                    fastingRequired: true,
                    commonUses: ["Heart disease risk", "Cholesterol monitoring", "Treatment effectiveness"]
                },
                {
                    name: "Hemoglobin A1C",
                    purpose: "Average blood sugar over 2-3 months (diabetes management)",
                    sampleType: "Blood",
                    fastingRequired: false,
                    commonUses: ["Diabetes diagnosis", "Diabetes monitoring", "Treatment adjustment"]
                }
            ],
            
            urineTests: [
                {
                    name: "Urinalysis",
                    purpose: "Detects kidney disease, diabetes, urinary tract infections",
                    sampleType: "Urine",
                    fastingRequired: false,
                    commonUses: ["UTI detection", "Kidney disease", "Diabetes screening"]
                },
                {
                    name: "Urine Culture",
                    purpose: "Identifies specific bacteria causing infections",
                    sampleType: "Urine",
                    fastingRequired: false,
                    commonUses: ["UTI diagnosis", "Antibiotic selection", "Treatment monitoring"]
                },
                {
                    name: "24-Hour Urine Collection",
                    purpose: "Comprehensive kidney function assessment",
                    sampleType: "24-hour urine",
                    fastingRequired: false,
                    commonUses: ["Kidney function", "Hormone levels", "Protein excretion"]
                },
                {
                    name: "Drug Screening",
                    purpose: "Detects presence of medications or substances",
                    sampleType: "Urine",
                    fastingRequired: false,
                    commonUses: ["Employment screening", "Treatment monitoring", "Legal requirements"]
                }
            ],
            
            specializedTests: [
                {
                    name: "Cardiac Markers",
                    purpose: "Troponin, CK-MB for heart attack diagnosis",
                    sampleType: "Blood",
                    fastingRequired: false,
                    commonUses: ["Heart attack diagnosis", "Chest pain evaluation", "Cardiac monitoring"]
                },
                {
                    name: "Tumor Markers",
                    purpose: "PSA, CEA, CA-125 for cancer screening/monitoring",
                    sampleType: "Blood",
                    fastingRequired: false,
                    commonUses: ["Cancer screening", "Treatment monitoring", "Recurrence detection"]
                },
                {
                    name: "Hormone Tests",
                    purpose: "Testosterone, estrogen, cortisol, insulin levels",
                    sampleType: "Blood",
                    fastingRequired: "varies",
                    commonUses: ["Hormone disorders", "Fertility evaluation", "Endocrine function"]
                },
                {
                    name: "Infectious Disease Testing",
                    purpose: "HIV, hepatitis, COVID-19, strep throat detection",
                    sampleType: "Blood/Throat swab",
                    fastingRequired: false,
                    commonUses: ["Infection diagnosis", "Disease screening", "Public health monitoring"]
                }
            ]
        },
        
        commonPanels: {
            annualPhysical: {
                name: "Annual Physical Exam Panel",
                description: "Comprehensive screening for routine health assessment",
                tests: [
                    "Complete Blood Count (CBC)",
                    "Comprehensive Metabolic Panel (CMP)",
                    "Lipid Panel",
                    "Thyroid Stimulating Hormone (TSH)",
                    "Urinalysis",
                    "Hemoglobin A1C (if diabetic risk factors)"
                ],
                fastingRequired: true,
                frequency: "Annually",
                purpose: "Overall health screening and early disease detection"
            },
            cardiacRisk: {
                name: "Cardiac Risk Assessment",
                description: "Evaluation of cardiovascular disease risk factors",
                tests: [
                    "Total Cholesterol, HDL, LDL, Triglycerides",
                    "C-Reactive Protein (CRP)",
                    "Homocysteine",
                    "Lipoprotein(a)"
                ],
                fastingRequired: true,
                frequency: "Every 5 years or as recommended",
                purpose: "Heart disease risk assessment and prevention"
            },
            diabetesManagement: {
                name: "Diabetes Management Panel",
                description: "Monitoring and management of diabetes",
                tests: [
                    "Fasting Glucose",
                    "Hemoglobin A1C",
                    "Microalbumin (urine)",
                    "Lipid Panel"
                ],
                fastingRequired: true,
                frequency: "Every 3-6 months",
                purpose: "Diabetes monitoring and complication prevention"
            },
            kidneyFunction: {
                name: "Kidney Function Panel",
                description: "Assessment of kidney health and function",
                tests: [
                    "Blood Urea Nitrogen (BUN)",
                    "Creatinine",
                    "Estimated Glomerular Filtration Rate (eGFR)",
                    "Urinalysis",
                    "Albumin-to-Creatinine Ratio"
                ],
                fastingRequired: false,
                frequency: "As recommended by physician",
                purpose: "Kidney disease detection and monitoring"
            }
        },
        
        faq: [
            {
                question: "How long do I need to fast before my blood test?",
                answer: "Fasting requirements vary by test. Most fasting tests require 8-12 hours without food or drinks (except water). Common fasting tests include lipid panels, glucose, and comprehensive metabolic panels. Always follow your specific instructions."
            },
            {
                question: "Can I take my medications before fasting blood work?",
                answer: "Generally, yes - take your essential medications with a small sip of water unless specifically instructed otherwise. However, inform your healthcare provider about all medications and supplements, as some may affect test results."
            },
            {
                question: "Why do I need to provide multiple tubes of blood?",
                answer: "Different tests require different collection tubes with specific additives or no additives. Each tube is designed for particular types of testing to ensure accurate results."
            },
            {
                question: "What should I do if I feel dizzy during or after blood collection?",
                answer: "Inform the staff immediately. They will have you sit or lie down, provide water if appropriate, and monitor you until you feel better. This is a normal reaction for some people."
            },
            {
                question: "How accurate are laboratory tests?",
                answer: "Laboratory tests are highly accurate when performed in accredited facilities. However, no test is 100% perfect. This is why providers interpret results in context with your symptoms and medical history."
            },
            {
                question: "Why might my test need to be repeated?",
                answer: "Tests may be repeated to confirm unexpected results, monitor changes over time, check response to treatment, or if there were collection or processing issues with the original sample."
            },
            {
                question: "Can I exercise before my lab tests?",
                answer: "Avoid vigorous exercise 24 hours before testing, as it can temporarily affect certain results like muscle enzymes. Light activity is usually fine, but follow your specific preparation instructions."
            },
            {
                question: "What if my results are outside the normal range?",
                answer: "Abnormal results don't always indicate a serious problem. Your healthcare provider will interpret results in context with your symptoms, medical history, and other factors to determine if treatment or further testing is needed."
            }
        ]
    },
    
    // Application state
    currentTab: 'blood',
    currentPrepTab: 'fasting',
    activeModal: null
};

// Utility Functions
function formatLabMessage(message, isPositive = true) {
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
    console.log('Scrolling to lab section:', sectionId);
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
        showLabNotification(`Navigated to: ${formatSectionName(sectionId)}`, 'info');
    } else {
        console.error('Lab section not found:', sectionId);
        showLabNotification(`Section ${sectionId} not found`, 'error');
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

// Tab Management Functions
function showTestType(testType) {
    console.log('Show test type called:', testType);
    
    // Update tab buttons
    document.querySelectorAll('.test-types-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the correct button
    const activeButton = Array.from(document.querySelectorAll('.test-types-tabs .tab-btn')).find(btn => 
        btn.onclick && btn.onclick.toString().includes(testType)
    );
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Show/hide test categories
    document.querySelectorAll('.test-category').forEach(category => {
        category.classList.remove('active');
    });
    
    const targetCategory = document.getElementById(`${testType}-tests`);
    if (targetCategory) {
        targetCategory.classList.add('active');
        labTestsApp.currentTab = testType;
        showLabNotification(`Switched to ${formatTestTypeName(testType)} tests`, 'info');
    }
}

function showPreparation(prepType) {
    console.log('Show preparation type called:', prepType);
    
    // Update tab buttons
    document.querySelectorAll('.preparation-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Find and activate the correct button
    const activeButton = Array.from(document.querySelectorAll('.preparation-tabs .tab-btn')).find(btn => 
        btn.onclick && btn.onclick.toString().includes(prepType)
    );
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Show/hide preparation categories
    document.querySelectorAll('.prep-category').forEach(category => {
        category.classList.remove('active');
    });
    
    const targetCategory = document.getElementById(`${prepType}-prep`);
    if (targetCategory) {
        targetCategory.classList.add('active');
        labTestsApp.currentPrepTab = prepType;
        showLabNotification(`Switched to ${formatPrepTypeName(prepType)} preparation`, 'info');
    }
}

function formatTestTypeName(testType) {
    const names = {
        'blood': 'Blood',
        'urine': 'Urine',
        'specialized': 'Specialized'
    };
    return names[testType] || testType;
}

function formatPrepTypeName(prepType) {
    const names = {
        'fasting': 'Fasting',
        'medications': 'Medication',
        'special': 'Special'
    };
    return names[prepType] || prepType;
}

// Modal Management Functions
function showModal(modalId) {
    console.log('Show lab modal called:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        labTestsApp.activeModal = modalId;
        
        // Focus management for accessibility
        setTimeout(() => {
            const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 100);
        
        showLabNotification('Laboratory tool interface opened', 'info');
    } else {
        console.error('Lab modal not found:', modalId);
        showLabNotification(`Modal ${modalId} not found`, 'error');
    }
}

function closeModal(modalId) {
    console.log('Close lab modal called:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        labTestsApp.activeModal = null;
        showLabNotification('Laboratory interface closed', 'info');
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
    labTestsApp.activeModal = null;
}

// Laboratory Tools Functions
function showLabTools() {
    console.log('Show lab tools called');
    showModal('lab-tools-modal');
    showLabNotification('Laboratory tools opened successfully', 'success');
}

function showPreparationChecker() {
    console.log('Show preparation checker called');
    showModal('prep-checker-modal');
    // Initialize the status after modal opens
    setTimeout(() => {
        updatePreparationStatus();
    }, 100);
    showLabNotification('Preparation checker opened successfully', 'success');
}

function showTestSelector() {
    console.log('Show test selector called');
    showLabNotification('Test selector tool activated', 'success');
    
    // Create test selector modal dynamically
    createTestSelectorModal();
}

function showPanelComparison() {
    console.log('Show panel comparison called');
    showLabNotification('Panel comparison tool activated', 'success');
    
    // Create panel comparison modal
    createPanelComparisonModal();
}

function showResultsInterpreter() {
    console.log('Show results interpreter called');
    showLabNotification('Results interpreter tool activated', 'info');
    
    // Create results interpreter modal
    createResultsInterpreterModal();
}

function showCostEstimator() {
    console.log('Show cost estimator called');
    showLabNotification('Cost estimator tool activated', 'info');
    
    // Create cost estimator modal
    createCostEstimatorModal();
}

// Dynamic Modal Creation Functions
function createTestSelectorModal() {
    const modalHTML = `
        <div id="test-selector-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('test-selector-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3>Test Type Selector</h3>
                    <button class="modal-close" onclick="closeModal('test-selector-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="test-selector">
                        <h4>Explore Different Laboratory Tests</h4>
                        <div class="test-categories">
                            <div class="category-selector">
                                <h5>🩸 Blood Tests</h5>
                                <div class="test-list">
                                    ${labTestsApp.labData.testTypes.bloodTests.map(test => `
                                        <div class="test-selector-item">
                                            <h6>${test.name}</h6>
                                            <p><strong>Purpose:</strong> ${test.purpose}</p>
                                            <p><strong>Fasting:</strong> ${test.fastingRequired ? 'Required' : 'Not Required'}</p>
                                            <div class="test-uses">
                                                <strong>Common Uses:</strong>
                                                <ul>
                                                    ${test.commonUses.map(use => `<li>${use}</li>`).join('')}
                                                </ul>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="category-selector">
                                <h5>🧪 Urine Tests</h5>
                                <div class="test-list">
                                    ${labTestsApp.labData.testTypes.urineTests.map(test => `
                                        <div class="test-selector-item">
                                            <h6>${test.name}</h6>
                                            <p><strong>Purpose:</strong> ${test.purpose}</p>
                                            <p><strong>Fasting:</strong> ${test.fastingRequired ? 'Required' : 'Not Required'}</p>
                                            <div class="test-uses">
                                                <strong>Common Uses:</strong>
                                                <ul>
                                                    ${test.commonUses.map(use => `<li>${use}</li>`).join('')}
                                                </ul>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="category-selector">
                                <h5>🔬 Specialized Tests</h5>
                                <div class="test-list">
                                    ${labTestsApp.labData.testTypes.specializedTests.map(test => `
                                        <div class="test-selector-item">
                                            <h6>${test.name}</h6>
                                            <p><strong>Purpose:</strong> ${test.purpose}</p>
                                            <p><strong>Fasting:</strong> ${test.fastingRequired === 'varies' ? 'Varies by test' : (test.fastingRequired ? 'Required' : 'Not Required')}</p>
                                            <div class="test-uses">
                                                <strong>Common Uses:</strong>
                                                <ul>
                                                    ${test.commonUses.map(use => `<li>${use}</li>`).join('')}
                                                </ul>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if present
    const existingModal = document.getElementById('test-selector-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('test-selector-modal');
}

function createPanelComparisonModal() {
    const modalHTML = `
        <div id="panel-comparison-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('panel-comparison-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3>Laboratory Panel Comparison</h3>
                    <button class="modal-close" onclick="closeModal('panel-comparison-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="panel-comparison">
                        <h4>Compare Common Laboratory Panels</h4>
                        <div class="panels-comparison-grid">
                            ${Object.values(labTestsApp.labData.commonPanels).map(panel => `
                                <div class="panel-comparison-item">
                                    <h5>${panel.name}</h5>
                                    <p class="panel-desc">${panel.description}</p>
                                    <div class="panel-details">
                                        <p><strong>Fasting:</strong> ${panel.fastingRequired ? 'Required' : 'Not Required'}</p>
                                        <p><strong>Frequency:</strong> ${panel.frequency}</p>
                                        <p><strong>Purpose:</strong> ${panel.purpose}</p>
                                    </div>
                                    <div class="panel-tests">
                                        <strong>Tests Included:</strong>
                                        <ul>
                                            ${panel.tests.map(test => `<li>${test}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="panel-selection-guide">
                            <h5>Panel Selection Guide</h5>
                            <div class="selection-items">
                                <div class="selection-item">
                                    <strong>Annual Physical:</strong> Comprehensive health screening for routine care
                                </div>
                                <div class="selection-item">
                                    <strong>Cardiac Risk:</strong> Heart disease prevention and risk assessment
                                </div>
                                <div class="selection-item">
                                    <strong>Diabetes Management:</strong> Ongoing monitoring for diabetic patients
                                </div>
                                <div class="selection-item">
                                    <strong>Kidney Function:</strong> Kidney health assessment and monitoring
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('panel-comparison-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('panel-comparison-modal');
}

function createResultsInterpreterModal() {
    const modalHTML = `
        <div id="results-interpreter-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('results-interpreter-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3>Results Interpretation Guide</h3>
                    <button class="modal-close" onclick="closeModal('results-interpreter-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="results-interpreter">
                        <h4>Understanding Your Laboratory Results</h4>
                        
                        <div class="interpretation-sections">
                            <div class="interpretation-section">
                                <h5>📊 Reference Ranges</h5>
                                <p>Normal ranges represent values for 95% of healthy individuals. Results outside these ranges don't always indicate a problem.</p>
                                <div class="range-factors">
                                    <strong>Factors affecting ranges:</strong>
                                    <ul>
                                        <li>Age and gender variations</li>
                                        <li>Individual baseline differences</li>
                                        <li>Laboratory method variations</li>
                                        <li>Population demographics</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="interpretation-section">
                                <h5>🎯 Result Categories</h5>
                                <div class="result-categories">
                                    <div class="result-category normal">
                                        <h6>Normal Results</h6>
                                        <p>Results fall within expected healthy range</p>
                                        <p><strong>Action:</strong> Continue routine monitoring</p>
                                    </div>
                                    <div class="result-category slight">
                                        <h6>Slightly Abnormal</h6>
                                        <p>Results outside normal range but not critical</p>
                                        <p><strong>Action:</strong> Discuss with provider</p>
                                    </div>
                                    <div class="result-category significant">
                                        <h6>Significantly Abnormal</h6>
                                        <p>Results requiring investigation</p>
                                        <p><strong>Action:</strong> Follow-up likely needed</p>
                                    </div>
                                    <div class="result-category critical">
                                        <h6>Critical Values</h6>
                                        <p>Immediately dangerous values</p>
                                        <p><strong>Action:</strong> Urgent medical attention</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="interpretation-section">
                                <h5>⚠️ Important Reminders</h5>
                                <div class="reminders">
                                    <p>✅ No test is 100% perfect</p>
                                    <p>✅ Results must be interpreted in clinical context</p>
                                    <p>✅ Multiple factors can affect results</p>
                                    <p>✅ Always discuss results with your healthcare provider</p>
                                    <p>✅ Abnormal doesn't always mean serious problem</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('results-interpreter-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('results-interpreter-modal');
}

function createCostEstimatorModal() {
    const modalHTML = `
        <div id="cost-estimator-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('cost-estimator-modal')"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Laboratory Test Cost Estimator</h3>
                    <button class="modal-close" onclick="closeModal('cost-estimator-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="cost-estimator">
                        <h4>Understanding Laboratory Testing Costs</h4>
                        
                        <div class="cost-categories">
                            <div class="cost-category">
                                <h5>💚 Preventive Testing</h5>
                                <div class="cost-info">
                                    <div class="coverage-rate">Often covered 100%</div>
                                    <p><strong>Examples:</strong> Annual physical panels, routine screenings</p>
                                    <p><strong>Insurance:</strong> Usually no out-of-pocket cost</p>
                                </div>
                            </div>
                            
                            <div class="cost-category">
                                <h5>💙 Diagnostic Testing</h5>
                                <div class="cost-info">
                                    <div class="coverage-rate">Covered with copay/deductible</div>
                                    <p><strong>Examples:</strong> Infection testing, organ function tests</p>
                                    <p><strong>Insurance:</strong> Subject to plan terms</p>
                                </div>
                            </div>
                            
                            <div class="cost-category">
                                <h5>💜 Specialized Testing</h5>
                                <div class="cost-info">
                                    <div class="coverage-rate">May require pre-authorization</div>
                                    <p><strong>Examples:</strong> Genetic testing, specialized markers</p>
                                    <p><strong>Insurance:</strong> Variable coverage</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="cost-factors">
                            <h5>Factors Affecting Cost</h5>
                            <div class="factors-list">
                                <div class="factor-item">🔬 Test complexity and technology</div>
                                <div class="factor-item">📋 Number of tests ordered</div>
                                <div class="factor-item">⚡ Urgent vs routine processing</div>
                                <div class="factor-item">🏥 In-network vs out-of-network</div>
                                <div class="factor-item">📍 Geographic location</div>
                            </div>
                        </div>
                        
                        <div class="cost-tips">
                            <h5>💡 Cost-Saving Tips</h5>
                            <ul>
                                <li>Use in-network laboratories</li>
                                <li>Ask about preventive test coverage</li>
                                <li>Inquire about payment plans</li>
                                <li>Consider timing for deductible planning</li>
                                <li>Ask for cost estimates upfront</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('cost-estimator-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('cost-estimator-modal');
}

// FAQ Functions
function toggleFAQ(element) {
    console.log('Toggle FAQ called');
    const faqQuestion = element;
    const faqAnswer = faqQuestion.nextElementSibling;
    const faqIcon = faqQuestion.querySelector('.faq-icon');
    
    // Toggle active state
    const isActive = faqQuestion.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        if (q.nextElementSibling) {
            q.nextElementSibling.classList.remove('active');
        }
        const icon = q.querySelector('.faq-icon');
        if (icon) {
            icon.textContent = '+';
        }
    });
    
    // Toggle current FAQ
    if (!isActive) {
        faqQuestion.classList.add('active');
        if (faqAnswer) {
            faqAnswer.classList.add('active');
        }
        if (faqIcon) {
            faqIcon.textContent = '×';
        }
        showLabNotification('FAQ expanded', 'info');
    } else {
        faqQuestion.classList.remove('active');
        if (faqAnswer) {
            faqAnswer.classList.remove('active');
        }
        if (faqIcon) {
            faqIcon.textContent = '+';
        }
        showLabNotification('FAQ collapsed', 'info');
    }
}

// Preparation Checker Functions
function updatePreparationStatus() {
    const checkboxes = document.querySelectorAll('.prep-checkbox');
    const statusElement = document.getElementById('prep-status');
    
    if (!statusElement) return;
    
    const totalItems = checkboxes.length;
    const checkedItems = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percentage = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
    
    let statusMessage = '';
    let statusClass = '';
    
    if (percentage === 100) {
        statusMessage = '✅ Excellent! You are fully prepared for your laboratory tests.';
        statusClass = 'prep-ready';
    } else if (percentage >= 75) {
        statusMessage = '👍 Good preparation! Review any unchecked items.';
        statusClass = 'prep-good';
    } else if (percentage >= 50) {
        statusMessage = '⚠️ Some preparation needed. Please review the requirements.';
        statusClass = 'prep-partial';
    } else {
        statusMessage = '❌ More preparation required. Please complete the checklist.';
        statusClass = 'prep-incomplete';
    }
    
    statusElement.innerHTML = `<p class="${statusClass}">${statusMessage}</p>`;
    
    // Add progress indicator
    const progressHTML = `
        <div class="prep-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <span class="progress-text">${checkedItems}/${totalItems} items completed (${percentage}%)</span>
        </div>
    `;
    
    statusElement.insertAdjacentHTML('beforeend', progressHTML);
}

// Event Listeners Setup
function setupLabEventListeners() {
    console.log('Setting up laboratory event listeners...');
    
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
                labTestsApp.activeModal = null;
            }
        }
    });
    
    // Preparation checker checkboxes
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('prep-checkbox')) {
            updatePreparationStatus();
        }
    });
    
    console.log('Laboratory event listeners set up successfully');
}

// Scroll-based navigation highlighting
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.lab-section');
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

// Notification System
function showLabNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `lab-notification lab-notification--${type}`;
    
    const iconMap = {
        info: '🧪',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${iconMap[type] || '🧪'}</span>
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
        border: 2px solid var(--color-lab-blue);
        border-radius: var(--lab-border-radius);
        padding: var(--space-12) var(--space-16);
        box-shadow: var(--lab-shadow);
        max-width: 400px;
        animation: slideInLab 0.3s ease-out;
    `;
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutLab 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Laboratory Data Display Functions
function displayLabOverview() {
    const overview = labTestsApp.labData.overview;
    
    console.log('Laboratory Testing Overview:', {
        definition: overview.definition,
        keyBenefits: overview.keyBenefits.length + ' benefits',
        processSteps: overview.howItWorks.length + ' steps'
    });
}

function displayTestTypesData() {
    const testTypes = labTestsApp.labData.testTypes;
    
    console.log('Test Types Data:', {
        bloodTests: testTypes.bloodTests.length + ' tests',
        urineTests: testTypes.urineTests.length + ' tests',
        specializedTests: testTypes.specializedTests.length + ' tests'
    });
}

// Laboratory Statistics Display
function displayLabStats() {
    const stats = {
        totalTestTypes: Object.values(labTestsApp.labData.testTypes).flat().length,
        totalPanels: Object.keys(labTestsApp.labData.commonPanels).length,
        totalFAQs: labTestsApp.labData.faq.length,
        fastingTests: Object.values(labTestsApp.labData.testTypes).flat().filter(test => test.fastingRequired === true).length
    };
    
    console.log('Laboratory Statistics:', stats);
}

// Validation Functions
function validateLabData() {
    const data = labTestsApp.labData;
    
    // Validate overview data
    const hasDefinition = data.overview.definition && data.overview.definition.length > 0;
    const hasBenefits = data.overview.keyBenefits && data.overview.keyBenefits.length > 0;
    const hasProcess = data.overview.howItWorks && data.overview.howItWorks.length === 5;
    
    // Validate test types
    const hasBloodTests = data.testTypes.bloodTests && data.testTypes.bloodTests.length > 0;
    const hasUrineTests = data.testTypes.urineTests && data.testTypes.urineTests.length > 0;
    const hasSpecializedTests = data.testTypes.specializedTests && data.testTypes.specializedTests.length > 0;
    
    console.log('Laboratory Data Validation:', {
        hasDefinition: hasDefinition ? '✅' : '❌',
        hasBenefits: hasBenefits ? '✅' : '❌',
        hasProcess: hasProcess ? '✅' : '❌',
        hasBloodTests: hasBloodTests ? '✅' : '❌',
        hasUrineTests: hasUrineTests ? '✅' : '❌',
        hasSpecializedTests: hasSpecializedTests ? '✅' : '❌'
    });
    
    return hasDefinition && hasBenefits && hasProcess && hasBloodTests && hasUrineTests && hasSpecializedTests;
}

// Performance monitoring
function initializeLabPerformanceMonitoring() {
    // Monitor feature loading performance
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.name.includes('lab') || entry.name.includes('test')) {
                console.log(`Laboratory feature rendering: ${entry.duration.toFixed(2)}ms`);
            }
        }
    });
    
    if (typeof PerformanceObserver !== 'undefined') {
        observer.observe({ entryTypes: ['measure'] });
    }
}

// Initialize the laboratory application
function initializeLaboratoryTestsApp() {
    console.log('Initializing Laboratory Tests Complete Guide...');
    
    // Validate laboratory data
    const isDataValid = validateLabData();
    if (!isDataValid) {
        console.warn('Laboratory data validation failed - please review');
    }
    
    // Set up event listeners
    setupLabEventListeners();
    
    // Display laboratory data overview
    displayLabOverview();
    displayTestTypesData();
    
    // Display statistics
    displayLabStats();
    
    // Set up performance monitoring
    initializeLabPerformanceMonitoring();
    
    console.log('Laboratory Tests Complete Guide initialized successfully');
}

// Scroll listener for navigation highlighting
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavOnScroll, 100);
});

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Laboratory Tests App Error:', event.error);
    showLabNotification('A technical error occurred. Laboratory information remains valid. Please refresh if problems persist.', 'error');
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Laboratory Tests Complete Guide loaded in ${loadTime.toFixed(2)}ms`);
    
    // Show welcome notification after load
    setTimeout(() => {
        showLabNotification('🧪 Laboratory Tests Complete Guide loaded. Comprehensive testing resource ready.', 'success');
    }, 1000);
    
    // Ensure all laboratory features are working
    const labFeaturesCheck = {
        navigationWorking: document.querySelectorAll('.nav-section').length > 0,
        modalsAvailable: document.querySelectorAll('.modal').length > 0,
        tabsReady: document.querySelectorAll('.tab-btn').length > 0,
        faqReady: document.querySelectorAll('.faq-item').length > 0,
        labDataLoaded: labTestsApp.labData.overview.definition.length > 0
    };
    
    console.log('Laboratory Features Status:', labFeaturesCheck);
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Laboratory Tests Complete Guide...');
    initializeLaboratoryTestsApp();
});

// Export functions to global scope for onclick handlers
window.scrollToSection = scrollToSection;
window.showTestType = showTestType;
window.showPreparation = showPreparation;
window.showLabTools = showLabTools;
window.showPreparationChecker = showPreparationChecker;
window.showTestSelector = showTestSelector;
window.showPanelComparison = showPanelComparison;
window.showResultsInterpreter = showResultsInterpreter;
window.showCostEstimator = showCostEstimator;
window.showModal = showModal;
window.closeModal = closeModal;
window.toggleFAQ = toggleFAQ;
window.updatePreparationStatus = updatePreparationStatus;

// Add laboratory-specific CSS animations
const labStyle = document.createElement('style');
labStyle.textContent = `
    @keyframes slideInLab {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutLab {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .lab-notification {
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
        transition: all var(--duration-lab) var(--ease-lab);
    }
    
    .notification-close:hover {
        color: var(--color-text);
        background: var(--color-secondary);
    }
    
    .test-selector-item,
    .panel-comparison-item {
        background: var(--color-lab-bg-1);
        border-radius: var(--lab-border-radius);
        padding: var(--space-16);
        margin-bottom: var(--space-16);
        border-left: 4px solid var(--color-lab-blue);
    }
    
    .test-selector-item h6,
    .panel-comparison-item h5 {
        color: var(--color-lab-blue);
        margin: 0 0 var(--space-8) 0;
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
    }
    
    .test-selector-item p,
    .panel-comparison-item p {
        margin: var(--space-4) 0;
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
    }
    
    .test-selector-item strong,
    .panel-comparison-item strong {
        color: var(--color-text);
    }
    
    .test-uses ul,
    .panel-tests ul {
        margin: var(--space-8) 0 0 var(--space-16);
        padding: 0;
    }
    
    .test-uses li,
    .panel-tests li {
        margin-bottom: var(--space-4);
        color: var(--color-text-secondary);
        font-size: var(--font-size-xs);
    }
    
    .category-selector {
        margin-bottom: var(--space-24);
    }
    
    .category-selector h5 {
        color: var(--color-lab-green);
        margin-bottom: var(--space-16);
        font-size: var(--font-size-lg);
        text-align: center;
        padding: var(--space-12);
        background: var(--color-lab-bg-1);
        border-radius: var(--radius-base);
    }
    
    .panels-comparison-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-20);
        margin-bottom: var(--space-24);
    }
    
    .panel-selection-guide,
    .interpretation-sections,
    .cost-categories {
        background: var(--color-lab-bg-1);
        border-radius: var(--lab-border-radius);
        padding: var(--space-20);
        margin-top: var(--space-20);
    }
    
    .panel-selection-guide h5,
    .interpretation-section h5,
    .cost-categories h5 {
        color: var(--color-lab-green);
        margin: 0 0 var(--space-16) 0;
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
        text-align: center;
    }
    
    .selection-items,
    .result-categories {
        display: flex;
        flex-direction: column;
        gap: var(--space-12);
    }
    
    .selection-item,
    .result-category {
        background: var(--color-surface);
        padding: var(--space-12);
        border-radius: var(--radius-base);
        border-left: 3px solid var(--color-lab-blue);
    }
    
    .result-category.normal { border-left-color: var(--color-result-normal); }
    .result-category.slight { border-left-color: var(--color-result-slight); }
    .result-category.significant { border-left-color: var(--color-result-significant); }
    .result-category.critical { border-left-color: var(--color-result-critical); }
    
    .result-category h6 {
        margin: 0 0 var(--space-8) 0;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
    }
    
    .result-category.normal h6 { color: var(--color-result-normal); }
    .result-category.slight h6 { color: var(--color-result-slight); }
    .result-category.significant h6 { color: var(--color-result-significant); }
    .result-category.critical h6 { color: var(--color-result-critical); }
    
    .result-category p {
        margin: var(--space-4) 0;
        color: var(--color-text-secondary);
        font-size: var(--font-size-xs);
    }
    
    .reminders {
        display: flex;
        flex-direction: column;
        gap: var(--space-8);
    }
    
    .reminders p {
        margin: 0;
        color: var(--color-text);
        font-size: var(--font-size-sm);
        padding: var(--space-8);
        background: var(--color-surface);
        border-radius: var(--radius-base);
    }
    
    .cost-category {
        background: var(--color-surface);
        border-radius: var(--lab-border-radius);
        padding: var(--space-16);
        margin-bottom: var(--space-16);
        border-left: 4px solid var(--color-lab-blue);
    }
    
    .coverage-rate {
        background: var(--color-lab-bg-2);
        color: var(--color-lab-blue);
        padding: var(--space-8);
        border-radius: var(--radius-base);
        text-align: center;
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-12);
    }
    
    .factors-list,
    .cost-tips ul {
        display: flex;
        flex-direction: column;
        gap: var(--space-8);
    }
    
    .factor-item {
        background: var(--color-lab-bg-1);
        padding: var(--space-8);
        border-radius: var(--radius-base);
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
    }
    
    .cost-tips {
        background: rgba(var(--color-lab-green), 0.1);
        border-radius: var(--lab-border-radius);
        padding: var(--space-16);
        margin-top: var(--space-16);
    }
    
    .cost-tips h5 {
        color: var(--color-lab-green);
        margin: 0 0 var(--space-12) 0;
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
    }
    
    .cost-tips ul {
        margin: 0;
        padding-left: var(--space-20);
    }
    
    .cost-tips li {
        margin-bottom: var(--space-8);
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
    }
    
    .prep-progress {
        margin-top: var(--space-12);
        text-align: center;
    }
    
    .progress-bar {
        width: 100%;
        height: 20px;
        background: var(--color-lab-bg-2);
        border-radius: var(--radius-full);
        overflow: hidden;
        margin-bottom: var(--space-8);
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--color-lab-green), var(--color-lab-blue));
        transition: width var(--duration-lab) var(--ease-lab);
    }
    
    .progress-text {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        font-weight: var(--font-weight-medium);
    }
    
    .prep-ready { color: var(--color-lab-green); }
    .prep-good { color: var(--color-lab-blue); }
    .prep-partial { color: var(--color-fasting-varies); }
    .prep-incomplete { color: var(--color-fasting-required); }
`;
document.head.appendChild(labStyle);

console.log('Laboratory Tests Complete Guide JavaScript loaded successfully 🧪📊');