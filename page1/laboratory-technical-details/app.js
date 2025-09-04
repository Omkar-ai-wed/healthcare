// Laboratory Testing Technical Details Center JavaScript

// Global application state and technical data
const techLabApp = {
    // Technical laboratory data from the provided JSON
    technicalData: {
        overview: {
            mission: "Laboratory testing employs diverse analytical techniques to measure biological markers with precision and accuracy. Each method is selected based on analyte characteristics, required sensitivity, and clinical application.",
            keyCapabilities: [
                "Advanced analytical instrumentation with state-of-the-art technology",
                "Comprehensive quality control and assurance programs", 
                "Regulatory compliance with CLIA, CAP, ISO, and FDA standards",
                "Automated workflow systems for optimal efficiency",
                "Real-time performance monitoring and optimization"
            ],
            technicalStatistics: {
                analyticalMethods: "50+ different analytical techniques available",
                instrumentCapacity: "Up to 9,000 tests per hour throughput",
                qualityMetrics: "<0.5% analytical error rate",
                turnaroundTime: "95% of routine tests within 4 hours",
                automationLevel: "85% automated analytical processes"
            }
        },
        
        analyticalTechniques: {
            spectrophotometry: {
                category: "Spectrophotometry & Photometry",
                description: "Light-based analytical methods for quantitative analysis",
                methods: [
                    {
                        name: "UV-Visible Spectrophotometry",
                        principle: "Measures light absorption at specific wavelengths (200-800 nm)",
                        applications: ["Enzyme assays", "Protein quantification", "Drug levels"],
                        sensitivity: "μg/mL to mg/mL range",
                        precision: "CV <2%"
                    },
                    {
                        name: "Fluorescence Spectroscopy", 
                        principle: "Detects fluorescent emissions for enhanced sensitivity",
                        applications: ["Immunoassays", "Nucleic acid detection", "Enzyme activity"],
                        sensitivity: "ng/mL to μg/mL range",
                        precision: "CV <3%"
                    },
                    {
                        name: "Atomic Absorption Spectroscopy",
                        principle: "Quantifies trace metals and elements",
                        applications: ["Trace metals", "Toxicology", "Nutritional assessment"],
                        sensitivity: "ng/mL to μg/mL range",
                        precision: "CV <5%"
                    },
                    {
                        name: "Nephelometry/Turbidimetry",
                        principle: "Measures light scattering for protein analysis",
                        applications: ["Immunoglobulins", "Complement", "CRP"],
                        sensitivity: "mg/L range",
                        precision: "CV <4%"
                    }
                ]
            },
            
            chromatography: {
                category: "Chromatographic Techniques", 
                description: "Separation-based analytical methods for complex mixtures",
                methods: [
                    {
                        name: "High-Performance Liquid Chromatography (HPLC)",
                        principle: "Separates compounds based on chemical properties",
                        applications: ["Drug monitoring", "Vitamin analysis", "Hormone quantification"],
                        sensitivity: "ng/mL to μg/mL range",
                        precision: "CV <3%",
                        runtime: "5-30 minutes per sample"
                    },
                    {
                        name: "Gas Chromatography (GC)",
                        principle: "Volatile compound separation and analysis",
                        applications: ["Fatty acids", "Organic acids", "Drug screening"],
                        sensitivity: "ng/mL to μg/mL range",
                        precision: "CV <5%",
                        runtime: "10-60 minutes per sample"
                    },
                    {
                        name: "Mass Spectrometry (LC-MS/MS, GC-MS)",
                        principle: "Molecular identification and quantification",
                        applications: ["Therapeutic drug monitoring", "Toxicology", "Endocrinology"],
                        sensitivity: "pg/mL to ng/mL range",
                        precision: "CV <10%",
                        runtime: "2-15 minutes per sample"
                    },
                    {
                        name: "Ion Chromatography",
                        principle: "Ionic compound separation",
                        applications: ["Organic acids", "Amino acids", "Carbohydrates"],
                        sensitivity: "mg/L range",
                        precision: "CV <5%",
                        runtime: "15-45 minutes per sample"
                    }
                ]
            },
            
            immunoassays: {
                category: "Immunoassay Technologies",
                description: "Antigen-antibody binding-based analytical methods",
                methods: [
                    {
                        name: "Enzyme-Linked Immunosorbent Assay (ELISA)",
                        principle: "Antigen-antibody binding with enzymatic detection",
                        applications: ["Infectious disease markers", "Hormones", "Tumor markers"],
                        sensitivity: "pg/mL to ng/mL range",
                        precision: "CV <10%",
                        runtime: "2-4 hours"
                    },
                    {
                        name: "Chemiluminescent Immunoassays (CLIA)",
                        principle: "Light-based signal detection from immune complexes",
                        applications: ["Cardiac markers", "Thyroid function", "Fertility hormones"],
                        sensitivity: "pg/mL to ng/mL range",
                        precision: "CV <5%",
                        runtime: "18-30 minutes"
                    },
                    {
                        name: "Fluorescence Polarization Immunoassay (FPIA)",
                        principle: "Competitive binding with fluorescence detection",
                        applications: ["Therapeutic drug monitoring", "Drugs of abuse"],
                        sensitivity: "ng/mL to μg/mL range",
                        precision: "CV <8%",
                        runtime: "1-5 minutes"
                    },
                    {
                        name: "Radioimmunoassay (RIA)",
                        principle: "Radioactive tracer-based quantification",
                        applications: ["Hormones", "Vitamins", "Specialized proteins"],
                        sensitivity: "pg/mL range",
                        precision: "CV <10%",
                        runtime: "24-48 hours"
                    }
                ]
            },
            
            electrochemical: {
                category: "Electrochemical Methods",
                description: "Electrical signal-based analytical techniques",
                methods: [
                    {
                        name: "Ion-Selective Electrodes (ISE)",
                        principle: "Direct ion measurement through selective membranes",
                        applications: ["Electrolytes (Na, K, Cl)", "pH", "Blood gases"],
                        sensitivity: "mmol/L range",
                        precision: "CV <2%",
                        runtime: "1-2 minutes"
                    },
                    {
                        name: "Potentiometry",
                        principle: "Voltage-based concentration determination",
                        applications: ["Blood gases", "Electrolytes", "pH measurement"],
                        sensitivity: "mmol/L range",
                        precision: "CV <3%",
                        runtime: "30 seconds - 2 minutes"
                    },
                    {
                        name: "Amperometry",
                        principle: "Current measurement for analyte detection",
                        applications: ["Glucose", "Lactate", "Oxygen electrodes"],
                        sensitivity: "mg/dL to g/L range",
                        precision: "CV <3%",
                        runtime: "30 seconds - 1 minute"
                    },
                    {
                        name: "Coulometry",
                        principle: "Charge-based quantification",
                        applications: ["Chloride", "Specialized electrolytes"],
                        sensitivity: "mmol/L range",
                        precision: "CV <2%",
                        runtime: "1-3 minutes"
                    }
                ]
            }
        },
        
        methodRecommendations: {
            proteins: {
                high: ["Fluorescence Spectroscopy", "ELISA", "CLIA"],
                medium: ["UV-Visible Spectrophotometry", "Nephelometry"],
                low: ["UV-Visible Spectrophotometry", "Nephelometry"]
            },
            enzymes: {
                high: ["Fluorescence Spectroscopy", "CLIA"],
                medium: ["UV-Visible Spectrophotometry"],
                low: ["UV-Visible Spectrophotometry"]
            },
            hormones: {
                high: ["CLIA", "RIA", "LC-MS/MS"],
                medium: ["ELISA", "CLIA"],
                low: ["ELISA"]
            },
            drugs: {
                high: ["LC-MS/MS", "GC-MS"],
                medium: ["HPLC", "FPIA"],
                low: ["FPIA", "ELISA"]
            },
            electrolytes: {
                high: ["Ion-Selective Electrodes"],
                medium: ["Ion-Selective Electrodes", "Potentiometry"],
                low: ["Ion-Selective Electrodes", "Potentiometry"]
            },
            glucose: {
                high: ["Amperometry", "UV-Visible Spectrophotometry"],
                medium: ["Amperometry", "UV-Visible Spectrophotometry"],
                low: ["UV-Visible Spectrophotometry"]
            },
            lipids: {
                high: ["LC-MS/MS"],
                medium: ["HPLC", "UV-Visible Spectrophotometry"],
                low: ["UV-Visible Spectrophotometry"]
            }
        },
        
        qualityControl: {
            westgardRules: [
                {
                    rule: "1-2s",
                    description: "One control exceeds 2 standard deviations",
                    action: "Warning - investigate if pattern develops"
                },
                {
                    rule: "1-3s", 
                    description: "One control exceeds 3 standard deviations",
                    action: "Reject run - investigate and correct"
                },
                {
                    rule: "2-2s",
                    description: "Two consecutive controls exceed 2s on same side",
                    action: "Reject run - indicates systematic error"
                },
                {
                    rule: "R-4s",
                    description: "Range between two controls exceeds 4s",
                    action: "Reject run - indicates random error"
                },
                {
                    rule: "4-1s",
                    description: "Four consecutive controls exceed 1s on same side", 
                    action: "Reject run - indicates systematic drift"
                },
                {
                    rule: "10x",
                    description: "Ten consecutive controls on same side of mean",
                    action: "Reject run - indicates calibration shift"
                }
            ]
        }
    },
    
    // Application state
    currentTechnique: 'spectrophotometry',
    currentQCCategory: 'internal',
    activeModal: null,
    calculatorResults: {}
};

// Utility Functions
function formatTechnicalMessage(message, type = 'info') {
    const iconMap = {
        info: '🔬',
        success: '✅',
        warning: '⚠️',
        error: '❌',
        calculation: '🧮'
    };
    return `${iconMap[type]} ${message}`;
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
    console.log('Scrolling to technical section:', sectionId);
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
        console.error('Technical section not found:', sectionId);
        showTechnicalNotification(`Section ${sectionId} not found`, 'error');
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
function showTechnique(techniqueType) {
    console.log('Show technique type called:', techniqueType);
    
    // Update tab buttons - remove active from all
    document.querySelectorAll('.technique-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    event.target.classList.add('active');
    
    // Show/hide technique categories - hide all first
    document.querySelectorAll('.technique-category').forEach(category => {
        category.classList.remove('active');
    });
    
    // Show the selected category
    const targetCategory = document.getElementById(`${techniqueType}-tech`);
    if (targetCategory) {
        targetCategory.classList.add('active');
        techLabApp.currentTechnique = techniqueType;
        showTechnicalNotification(`Switched to ${formatTechniqueName(techniqueType)} methods`, 'info');
    } else {
        console.error('Technique category not found:', techniqueType);
    }
}

function showQCCategory(qcType) {
    console.log('Show QC category called:', qcType);
    
    // Update tab buttons - remove active from all
    document.querySelectorAll('.qc-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    event.target.classList.add('active');
    
    // Show/hide QC categories - hide all first
    document.querySelectorAll('.qc-category').forEach(category => {
        category.classList.remove('active');
    });
    
    // Show the selected category
    const targetCategory = document.getElementById(`${qcType}-qc`);
    if (targetCategory) {
        targetCategory.classList.add('active');
        techLabApp.currentQCCategory = qcType;
        showTechnicalNotification(`Switched to ${formatQCTypeName(qcType)} quality control`, 'info');
    } else {
        console.error('QC category not found:', qcType);
    }
}

function formatTechniqueName(techniqueType) {
    const names = {
        'spectrophotometry': 'Spectrophotometry',
        'chromatography': 'Chromatography', 
        'immunoassays': 'Immunoassays',
        'electrochemical': 'Electrochemical'
    };
    return names[techniqueType] || techniqueType;
}

function formatQCTypeName(qcType) {
    const names = {
        'internal': 'Internal QC',
        'external': 'External QA',
        'validation': 'Method Validation',
        'calibration': 'Calibration'
    };
    return names[qcType] || qcType;
}

// Modal Management Functions - Fixed
function showModal(modalId) {
    console.log('Show technical modal called:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        techLabApp.activeModal = modalId;
        
        // Focus management for accessibility
        setTimeout(() => {
            const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }, 100);
        
        showTechnicalNotification('Technical interface opened', 'info');
    } else {
        console.error('Technical modal not found:', modalId);
        showTechnicalNotification(`Modal ${modalId} not found`, 'error');
    }
}

function closeModal(modalId) {
    console.log('Close technical modal called:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        techLabApp.activeModal = null;
        showTechnicalNotification('Technical interface closed', 'info');
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
    techLabApp.activeModal = null;
}

// Technical Tools Functions - Fixed
function showTechnicalTools() {
    console.log('Show technical tools called');
    showModal('technical-tools-modal');
    showTechnicalNotification('Technical tools interface opened', 'success');
}

function showMethodSelector() {
    console.log('Show method selector called');
    showModal('method-selector-modal');
    showTechnicalNotification('Method selector opened', 'success');
}

function showPerformanceCalculator() {
    console.log('Show performance calculator called');
    showTechnicalNotification('Performance calculator activated', 'calculation');
    createPerformanceCalculatorModal();
}

function showQCEvaluator() {
    console.log('Show QC evaluator called');
    showTechnicalNotification('QC rule evaluator activated', 'calculation');
    createQCEvaluatorModal();
}

function showReferenceIntervalTool() {
    console.log('Show reference interval tool called');
    showTechnicalNotification('Reference interval calculator activated', 'calculation');
    createReferenceIntervalModal();
}

function showMethodComparison() {
    console.log('Show method comparison called');
    showTechnicalNotification('Method comparison tool activated', 'info');
    createMethodComparisonModal();
}

function showValidationProtocol() {
    console.log('Show validation protocol called');
    showTechnicalNotification('Validation protocol generator activated', 'info');
    createValidationProtocolModal();
}

function showTroubleshootingGuide() {
    console.log('Show troubleshooting guide called');
    showTechnicalNotification('Troubleshooting guide activated', 'info');
    createTroubleshootingModal();
}

// Method Recommendation Functions - Fixed
function updateMethodRecommendations() {
    const analyteSelect = document.getElementById('analyte-select');
    const sensitivitySelect = document.getElementById('sensitivity-select');
    const recommendationsDiv = document.getElementById('method-recommendations');
    
    if (!analyteSelect || !sensitivitySelect || !recommendationsDiv) {
        console.error('Method recommendation elements not found');
        return;
    }
    
    const analyte = analyteSelect.value;
    const sensitivity = sensitivitySelect.value;
    
    if (!analyte || !sensitivity) {
        recommendationsDiv.innerHTML = '<p>Select analyte type and sensitivity to see recommended methods</p>';
        return;
    }
    
    const recommendations = techLabApp.technicalData.methodRecommendations[analyte]?.[sensitivity];
    
    if (recommendations && recommendations.length > 0) {
        let html = '<h4>Recommended Methods:</h4>';
        recommendations.forEach((method, index) => {
            const score = Math.max(95 - (index * 5), 75); // Scoring system
            html += `
                <div class="recommended-method">
                    <h5>${method} <span class="method-score">${score}% match</span></h5>
                    <p>Optimal method for ${analyte} analysis at ${sensitivity} sensitivity level</p>
                </div>
            `;
        });
        recommendationsDiv.innerHTML = html;
    } else {
        recommendationsDiv.innerHTML = '<p>No specific recommendations available for this combination. Consult technical documentation.</p>';
    }
    
    showTechnicalNotification(`Method recommendations updated for ${analyte}`, 'info');
}

function findRecommendedMethods() {
    const analyteType = document.getElementById('analyte-type')?.value;
    const concentrationRange = document.getElementById('concentration-range')?.value;
    const sampleType = document.getElementById('sample-type')?.value;
    const turnaround = document.getElementById('turnaround')?.value;
    
    const resultsDiv = document.getElementById('method-results');
    if (!resultsDiv) return;
    
    if (!analyteType || !concentrationRange) {
        resultsDiv.innerHTML = '<p>Please select analyte type and concentration range</p>';
        return;
    }
    
    // Convert concentration range to sensitivity level
    let sensitivityLevel = 'medium';
    if (concentrationRange === 'pg-ng') sensitivityLevel = 'high';
    else if (concentrationRange === 'mg-g') sensitivityLevel = 'low';
    
    const recommendations = techLabApp.technicalData.methodRecommendations[analyteType]?.[sensitivityLevel] || [];
    
    if (recommendations.length > 0) {
        let html = '<h4>Method Recommendations:</h4>';
        recommendations.forEach((method, index) => {
            const score = calculateMethodScore(method, concentrationRange, turnaround);
            html += `
                <div class="method-result-item">
                    <h5>${method} <span class="method-score">${score}% compatibility</span></h5>
                    <p><strong>Analyte:</strong> ${analyteType} | <strong>Range:</strong> ${concentrationRange} | <strong>Sample:</strong> ${sampleType || 'Various'}</p>
                    <p><strong>Expected Performance:</strong> ${getMethodPerformance(method)}</p>
                </div>
            `;
        });
        resultsDiv.innerHTML = html;
    } else {
        resultsDiv.innerHTML = '<p>No suitable methods found for the specified criteria. Please adjust parameters or consult technical support.</p>';
    }
    
    showTechnicalNotification(`Method search completed for ${analyteType}`, 'calculation');
}

function calculateMethodScore(method, concentrationRange, turnaround) {
    let score = 85; // Base score
    
    // Adjust based on method sensitivity match
    if (method.includes('MS') && concentrationRange === 'pg-ng') score += 10;
    if (method.includes('Spectrophotometry') && concentrationRange === 'mg-g') score += 10;
    if (method.includes('Electrodes') && concentrationRange === 'mg-g') score += 15;
    
    // Adjust based on turnaround requirements
    if (turnaround === 'stat' && (method.includes('Electrodes') || method.includes('Amperometry'))) score += 10;
    if (turnaround === 'batch' && method.includes('MS')) score += 5;
    
    return Math.min(score, 98);
}

function getMethodPerformance(method) {
    const performances = {
        'LC-MS/MS': 'High sensitivity and specificity, excellent precision',
        'CLIA': 'Rapid turnaround, good sensitivity, automated processing',
        'UV-Visible Spectrophotometry': 'Cost-effective, reliable, routine automation',
        'Ion-Selective Electrodes': 'Real-time results, excellent for electrolytes',
        'HPLC': 'Good separation, quantitative accuracy',
        'ELISA': 'High throughput, well-established protocols',
        'Fluorescence Spectroscopy': 'Enhanced sensitivity, selective detection'
    };
    
    return performances[method] || 'Established analytical method with validated performance';
}

// Dynamic Modal Creation Functions
function createPerformanceCalculatorModal() {
    const modalHTML = `
        <div id="performance-calculator-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('performance-calculator-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3>Analytical Performance Calculator</h3>
                    <button class="modal-close" onclick="closeModal('performance-calculator-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="performance-calculator">
                        <div class="calculator-tabs">
                            <div class="tab-navigation">
                                <button class="tab-btn active" onclick="showCalculatorTab('precision')">Precision</button>
                                <button class="tab-btn" onclick="showCalculatorTab('accuracy')">Accuracy</button>
                                <button class="tab-btn" onclick="showCalculatorTab('uncertainty')">Uncertainty</button>
                            </div>
                            
                            <div id="precision-calc" class="calc-tab active">
                                <h4>Precision Calculation (CV%)</h4>
                                <div class="calc-inputs">
                                    <div class="input-group">
                                        <label for="precision-values">Enter Values (comma-separated):</label>
                                        <textarea id="precision-values" class="form-control" placeholder="12.5, 12.3, 12.7, 12.4, 12.6"></textarea>
                                    </div>
                                    <button class="btn btn--primary" onclick="calculatePrecision()">Calculate Precision</button>
                                </div>
                                <div id="precision-results" class="calc-results"></div>
                            </div>
                            
                            <div id="accuracy-calc" class="calc-tab">
                                <h4>Accuracy Assessment (Bias%)</h4>
                                <div class="calc-inputs">
                                    <div class="input-group">
                                        <label for="measured-value">Measured Value:</label>
                                        <input type="number" id="measured-value" class="form-control" step="0.01">
                                    </div>
                                    <div class="input-group">
                                        <label for="expected-value">Expected Value:</label>
                                        <input type="number" id="expected-value" class="form-control" step="0.01">
                                    </div>
                                    <button class="btn btn--primary" onclick="calculateAccuracy()">Calculate Bias</button>
                                </div>
                                <div id="accuracy-results" class="calc-results"></div>
                            </div>
                            
                            <div id="uncertainty-calc" class="calc-tab">
                                <h4>Measurement Uncertainty</h4>
                                <div class="calc-inputs">
                                    <div class="input-group">
                                        <label for="precision-uncertainty">Precision Component (%):</label>
                                        <input type="number" id="precision-uncertainty" class="form-control" step="0.01">
                                    </div>
                                    <div class="input-group">
                                        <label for="bias-uncertainty">Bias Component (%):</label>
                                        <input type="number" id="bias-uncertainty" class="form-control" step="0.01">
                                    </div>
                                    <div class="input-group">
                                        <label for="coverage-factor">Coverage Factor (k):</label>
                                        <select id="coverage-factor" class="form-control">
                                            <option value="2">2 (95% confidence)</option>
                                            <option value="1.96">1.96 (95% normal distribution)</option>
                                            <option value="3">3 (99.7% confidence)</option>
                                        </select>
                                    </div>
                                    <button class="btn btn--primary" onclick="calculateUncertainty()">Calculate Uncertainty</button>
                                </div>
                                <div id="uncertainty-results" class="calc-results"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('performance-calculator-modal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('performance-calculator-modal');
}

function createQCEvaluatorModal() {
    const modalHTML = `
        <div id="qc-evaluator-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('qc-evaluator-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3>Westgard QC Rule Evaluator</h3>
                    <button class="modal-close" onclick="closeModal('qc-evaluator-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="qc-evaluator">
                        <h4>Quality Control Rule Assessment</h4>
                        
                        <div class="qc-rules-reference">
                            <h5>Westgard Rules Reference</h5>
                            <div class="rules-grid">
                                ${techLabApp.technicalData.qualityControl.westgardRules.map(rule => `
                                    <div class="rule-card">
                                        <h6>${rule.rule}</h6>
                                        <p><strong>Condition:</strong> ${rule.description}</p>
                                        <p><strong>Action:</strong> ${rule.action}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="qc-input-section">
                            <h5>Evaluate QC Data</h5>
                            <div class="qc-inputs">
                                <div class="input-group">
                                    <label for="qc-mean">Target Mean:</label>
                                    <input type="number" id="qc-mean" class="form-control" step="0.01">
                                </div>
                                <div class="input-group">
                                    <label for="qc-sd">Standard Deviation:</label>
                                    <input type="number" id="qc-sd" class="form-control" step="0.01">
                                </div>
                                <div class="input-group">
                                    <label for="qc-values">QC Values (comma-separated):</label>
                                    <textarea id="qc-values" class="form-control" placeholder="12.5, 12.8, 11.9, 13.2"></textarea>
                                </div>
                                <button class="btn btn--primary" onclick="evaluateQCRules()">Evaluate Rules</button>
                            </div>
                            <div id="qc-evaluation-results" class="qc-results"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('qc-evaluator-modal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('qc-evaluator-modal');
}

function createReferenceIntervalModal() {
    const modalHTML = `
        <div id="reference-interval-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('reference-interval-modal')"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Reference Interval Calculator</h3>
                    <button class="modal-close" onclick="closeModal('reference-interval-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="reference-interval-tool">
                        <h4>Calculate 95% Reference Intervals</h4>
                        <p>Enter at least 120 healthy reference values for statistical validity</p>
                        
                        <div class="ri-inputs">
                            <div class="input-group">
                                <label for="ri-values">Reference Values (comma-separated):</label>
                                <textarea id="ri-values" class="form-control" rows="6" placeholder="Enter healthy population values..."></textarea>
                            </div>
                            <div class="input-options">
                                <div class="input-group">
                                    <label for="ri-method">Calculation Method:</label>
                                    <select id="ri-method" class="form-control">
                                        <option value="percentile">Non-parametric (2.5th-97.5th percentile)</option>
                                        <option value="parametric">Parametric (Mean ± 1.96 SD)</option>
                                    </select>
                                </div>
                            </div>
                            <button class="btn btn--primary" onclick="calculateReferenceInterval()">Calculate Intervals</button>
                        </div>
                        
                        <div id="ri-results" class="ri-results"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('reference-interval-modal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('reference-interval-modal');
}

function createMethodComparisonModal() {
    const modalHTML = `
        <div id="method-comparison-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('method-comparison-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3>Analytical Method Comparison</h3>
                    <button class="modal-close" onclick="closeModal('method-comparison-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="method-comparison-tool">
                        <h4>Compare Analytical Methods</h4>
                        
                        <div class="comparison-table">
                            <table class="tech-table">
                                <thead>
                                    <tr>
                                        <th>Method</th>
                                        <th>Sensitivity</th>
                                        <th>Precision (CV%)</th>
                                        <th>Runtime</th>
                                        <th>Throughput</th>
                                        <th>Applications</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${generateMethodComparisonTable()}
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="comparison-selector">
                            <h5>Select Methods to Compare</h5>
                            <div class="method-checkboxes">
                                <label class="checkbox-label">
                                    <input type="checkbox" value="UV-Visible Spectrophotometry"> UV-Visible Spectrophotometry
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="HPLC"> HPLC
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="LC-MS/MS"> LC-MS/MS
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="CLIA"> CLIA
                                </label>
                            </div>
                            <button class="btn btn--primary" onclick="generateComparisonChart()">Generate Comparison</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('method-comparison-modal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('method-comparison-modal');
}

function createValidationProtocolModal() {
    const modalHTML = `
        <div id="validation-protocol-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('validation-protocol-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3>Method Validation Protocol Generator</h3>
                    <button class="modal-close" onclick="closeModal('validation-protocol-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="validation-protocol-tool">
                        <h4>Generate Method Validation Protocol</h4>
                        
                        <div class="protocol-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="method-name">Method Name:</label>
                                    <input type="text" id="method-name" class="form-control" placeholder="e.g., Glucose by Hexokinase">
                                </div>
                                <div class="form-group">
                                    <label for="analyte-name">Analyte:</label>
                                    <input type="text" id="analyte-name" class="form-control" placeholder="e.g., Glucose">
                                </div>
                            </div>
                            
                            <div class="validation-parameters">
                                <h5>Select Validation Parameters</h5>
                                <div class="parameter-grid">
                                    <label class="checkbox-label">
                                        <input type="checkbox" value="accuracy" checked> Accuracy/Bias
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" value="precision" checked> Precision (Repeatability/Reproducibility)
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" value="linearity" checked> Linearity/AMR
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" value="lod" checked> Limit of Detection
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" value="loq"> Limit of Quantification
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" value="interference" checked> Interference Studies
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" value="stability"> Sample Stability
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" value="reference-intervals"> Reference Intervals
                                    </label>
                                </div>
                            </div>
                            
                            <button class="btn btn--primary btn--full-width" onclick="generateValidationProtocol()">Generate Protocol</button>
                        </div>
                        
                        <div id="validation-protocol-output" class="protocol-output"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('validation-protocol-modal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('validation-protocol-modal');
}

function createTroubleshootingModal() {
    const modalHTML = `
        <div id="troubleshooting-modal" class="modal" role="dialog">
            <div class="modal-backdrop" onclick="closeModal('troubleshooting-modal')"></div>
            <div class="modal-content modal-content--large">
                <div class="modal-header">
                    <h3>Analytical Troubleshooting Guide</h3>
                    <button class="modal-close" onclick="closeModal('troubleshooting-modal')" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="troubleshooting-tool">
                        <h4>Interactive Troubleshooting Assistant</h4>
                        
                        <div class="troubleshooting-flow">
                            <div class="problem-category">
                                <h5>Select Problem Category</h5>
                                <div class="category-buttons">
                                    <button class="btn btn--outline" onclick="showTroubleshootingCategory('precision')">Poor Precision</button>
                                    <button class="btn btn--outline" onclick="showTroubleshootingCategory('accuracy')">Accuracy Issues</button>
                                    <button class="btn btn--outline" onclick="showTroubleshootingCategory('calibration')">Calibration Problems</button>
                                    <button class="btn btn--outline" onclick="showTroubleshootingCategory('qc-failures')">QC Failures</button>
                                    <button class="btn btn--outline" onclick="showTroubleshootingCategory('instrument')">Instrument Issues</button>
                                </div>
                            </div>
                            
                            <div id="troubleshooting-steps" class="troubleshooting-steps">
                                <p>Select a problem category above to see troubleshooting steps</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const existingModal = document.getElementById('troubleshooting-modal');
    if (existingModal) existingModal.remove();
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    showModal('troubleshooting-modal');
}

// Calculator Functions
function showCalculatorTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.calc-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}-calc`).classList.add('active');
    
    // Update tab buttons
    document.querySelectorAll('.calculator-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function calculatePrecision() {
    const valuesText = document.getElementById('precision-values').value;
    const resultsDiv = document.getElementById('precision-results');
    
    if (!valuesText.trim()) {
        resultsDiv.innerHTML = '<p class="error">Please enter values</p>';
        return;
    }
    
    const values = valuesText.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    
    if (values.length < 3) {
        resultsDiv.innerHTML = '<p class="error">Need at least 3 values</p>';
        return;
    }
    
    const n = values.length;
    const mean = values.reduce((sum, val) => sum + val, 0) / n;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
    const sd = Math.sqrt(variance);
    const cv = (sd / mean) * 100;
    
    const html = `
        <div class="calc-result">
            <h5>Precision Results</h5>
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-label">n:</span>
                    <span class="result-value">${n}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Mean:</span>
                    <span class="result-value">${mean.toFixed(3)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">SD:</span>
                    <span class="result-value">${sd.toFixed(4)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">CV (%):</span>
                    <span class="result-value">${cv.toFixed(2)}%</span>
                </div>
            </div>
            <div class="interpretation">
                <h6>Interpretation:</h6>
                <p>${cv < 5 ? 'Excellent precision (CV < 5%)' : cv < 10 ? 'Good precision (CV < 10%)' : cv < 15 ? 'Acceptable precision (CV < 15%)' : 'Poor precision (CV ≥ 15%) - investigation needed'}</p>
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    showTechnicalNotification('Precision calculation completed', 'calculation');
}

function calculateAccuracy() {
    const measured = parseFloat(document.getElementById('measured-value').value);
    const expected = parseFloat(document.getElementById('expected-value').value);
    const resultsDiv = document.getElementById('accuracy-results');
    
    if (isNaN(measured) || isNaN(expected) || expected === 0) {
        resultsDiv.innerHTML = '<p class="error">Please enter valid values</p>';
        return;
    }
    
    const bias = ((measured - expected) / expected) * 100;
    const absBias = Math.abs(bias);
    
    const html = `
        <div class="calc-result">
            <h5>Accuracy Results</h5>
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-label">Measured:</span>
                    <span class="result-value">${measured}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Expected:</span>
                    <span class="result-value">${expected}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Bias:</span>
                    <span class="result-value">${bias.toFixed(2)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Absolute Bias:</span>
                    <span class="result-value">${absBias.toFixed(2)}%</span>
                </div>
            </div>
            <div class="interpretation">
                <h6>Interpretation:</h6>
                <p>${absBias < 5 ? 'Excellent accuracy (bias < 5%)' : absBias < 10 ? 'Good accuracy (bias < 10%)' : absBias < 15 ? 'Acceptable accuracy (bias < 15%)' : 'Poor accuracy (bias ≥ 15%) - calibration needed'}</p>
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    showTechnicalNotification('Accuracy calculation completed', 'calculation');
}

function calculateUncertainty() {
    const precision = parseFloat(document.getElementById('precision-uncertainty').value);
    const bias = parseFloat(document.getElementById('bias-uncertainty').value);
    const k = parseFloat(document.getElementById('coverage-factor').value);
    const resultsDiv = document.getElementById('uncertainty-results');
    
    if (isNaN(precision) || isNaN(bias)) {
        resultsDiv.innerHTML = '<p class="error">Please enter valid uncertainty components</p>';
        return;
    }
    
    const combinedUncertainty = Math.sqrt(Math.pow(precision, 2) + Math.pow(bias, 2));
    const expandedUncertainty = combinedUncertainty * k;
    
    const html = `
        <div class="calc-result">
            <h5>Measurement Uncertainty Results</h5>
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-label">Precision Component:</span>
                    <span class="result-value">${precision}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Bias Component:</span>
                    <span class="result-value">${bias}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Combined Uncertainty (uc):</span>
                    <span class="result-value">${combinedUncertainty.toFixed(2)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Expanded Uncertainty (U):</span>
                    <span class="result-value">±${expandedUncertainty.toFixed(2)}% (k=${k})</span>
                </div>
            </div>
            <div class="interpretation">
                <h6>Reporting:</h6>
                <p>Measurement uncertainty: ±${expandedUncertainty.toFixed(2)}% (coverage factor k=${k}, approximately ${k === 2 ? '95%' : k === 1.96 ? '95%' : '99.7%'} confidence level)</p>
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    showTechnicalNotification('Uncertainty calculation completed', 'calculation');
}

function evaluateQCRules() {
    const mean = parseFloat(document.getElementById('qc-mean').value);
    const sd = parseFloat(document.getElementById('qc-sd').value);
    const valuesText = document.getElementById('qc-values').value;
    const resultsDiv = document.getElementById('qc-evaluation-results');
    
    if (isNaN(mean) || isNaN(sd) || !valuesText.trim()) {
        resultsDiv.innerHTML = '<p class="error">Please enter all required values</p>';
        return;
    }
    
    const values = valuesText.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    const zScores = values.map(v => (v - mean) / sd);
    
    let ruleViolations = [];
    
    // Check each Westgard rule
    zScores.forEach((z, i) => {
        if (Math.abs(z) > 3) ruleViolations.push(`1-3s violation at position ${i+1} (z=${z.toFixed(2)})`);
        if (Math.abs(z) > 2) {
            // Check for 2-2s (consecutive)
            if (i > 0 && Math.abs(zScores[i-1]) > 2 && Math.sign(z) === Math.sign(zScores[i-1])) {
                ruleViolations.push(`2-2s violation at positions ${i} and ${i+1}`);
            }
        }
    });
    
    // Check R-4s (range between consecutive controls > 4s)
    for (let i = 1; i < zScores.length; i++) {
        const range = Math.abs(zScores[i] - zScores[i-1]);
        if (range > 4) {
            ruleViolations.push(`R-4s violation between positions ${i} and ${i+1} (range=${range.toFixed(2)}s)`);
        }
    }
    
    const html = `
        <div class="qc-result">
            <h5>QC Rule Evaluation Results</h5>
            <div class="qc-summary">
                <p><strong>Number of QC values:</strong> ${values.length}</p>
                <p><strong>Mean:</strong> ${mean} | <strong>SD:</strong> ${sd}</p>
            </div>
            <div class="z-scores">
                <h6>Z-Scores:</h6>
                <div class="z-score-grid">
                    ${zScores.map((z, i) => `
                        <div class="z-score-item ${Math.abs(z) > 2 ? 'warning' : ''}">
                            <span>Value ${i+1}:</span>
                            <span>${values[i]} (z=${z.toFixed(2)})</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="rule-violations">
                <h6>Rule Violations:</h6>
                ${ruleViolations.length > 0 ? 
                    `<div class="violations-list">
                        ${ruleViolations.map(violation => `<div class="violation-item">❌ ${violation}</div>`).join('')}
                        <p class="action-required"><strong>Action Required:</strong> Investigate and take corrective action before releasing results</p>
                    </div>` : 
                    '<div class="no-violations">✅ No Westgard rule violations detected</div>'
                }
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    showTechnicalNotification('QC evaluation completed', 'calculation');
}

function calculateReferenceInterval() {
    const valuesText = document.getElementById('ri-values').value;
    const method = document.getElementById('ri-method').value;
    const resultsDiv = document.getElementById('ri-results');
    
    if (!valuesText.trim()) {
        resultsDiv.innerHTML = '<p class="error">Please enter reference values</p>';
        return;
    }
    
    const values = valuesText.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    
    if (values.length < 120) {
        resultsDiv.innerHTML = '<p class="warning">Warning: Less than 120 values. Results may not be statistically valid.</p>';
    }
    
    values.sort((a, b) => a - b);
    const n = values.length;
    
    let lowerLimit, upperLimit, mean, sd;
    
    if (method === 'percentile') {
        const lowerIndex = Math.floor((2.5 / 100) * n);
        const upperIndex = Math.floor((97.5 / 100) * n);
        lowerLimit = values[lowerIndex];
        upperLimit = values[upperIndex];
    } else {
        mean = values.reduce((sum, val) => sum + val, 0) / n;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
        sd = Math.sqrt(variance);
        lowerLimit = mean - (1.96 * sd);
        upperLimit = mean + (1.96 * sd);
    }
    
    const html = `
        <div class="ri-result">
            <h5>Reference Interval Results</h5>
            <div class="ri-summary">
                <div class="result-item">
                    <span class="result-label">Sample Size (n):</span>
                    <span class="result-value">${n}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Method:</span>
                    <span class="result-value">${method === 'percentile' ? 'Non-parametric' : 'Parametric'}</span>
                </div>
                <div class="result-item major">
                    <span class="result-label">Reference Interval:</span>
                    <span class="result-value">${lowerLimit.toFixed(2)} - ${upperLimit.toFixed(2)}</span>
                </div>
                ${method === 'parametric' ? `
                    <div class="result-item">
                        <span class="result-label">Mean:</span>
                        <span class="result-value">${mean.toFixed(2)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Standard Deviation:</span>
                        <span class="result-value">${sd.toFixed(2)}</span>
                    </div>
                ` : ''}
            </div>
            <div class="ri-validation">
                <h6>Validation Notes:</h6>
                <ul>
                    <li>${n >= 120 ? '✅' : '⚠️'} Sample size ${n >= 120 ? 'meets' : 'does not meet'} CLSI EP28-A3c recommendation (n≥120)</li>
                    <li>Reference interval represents central 95% of healthy population</li>
                    <li>Verify with independent validation set before implementation</li>
                    <li>Consider age, gender, and population-specific factors</li>
                </ul>
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    showTechnicalNotification('Reference interval calculation completed', 'calculation');
}

// Helper Functions
function generateMethodComparisonTable() {
    const methods = [
        { name: 'UV-Visible Spectrophotometry', sensitivity: 'μg/mL - mg/mL', precision: '<2%', runtime: '1-5 min', throughput: 'High', applications: 'Enzymes, Proteins' },
        { name: 'HPLC', sensitivity: 'ng/mL - μg/mL', precision: '<3%', runtime: '5-30 min', throughput: 'Medium', applications: 'Drugs, Vitamins' },
        { name: 'LC-MS/MS', sensitivity: 'pg/mL - ng/mL', precision: '<10%', runtime: '2-15 min', throughput: 'Medium', applications: 'TDM, Toxicology' },
        { name: 'CLIA', sensitivity: 'pg/mL - ng/mL', precision: '<5%', runtime: '18-30 min', throughput: 'High', applications: 'Hormones, Cardiac' },
        { name: 'ISE', sensitivity: 'mmol/L', precision: '<2%', runtime: '1-2 min', throughput: 'Very High', applications: 'Electrolytes' }
    ];
    
    return methods.map(method => `
        <tr>
            <td>${method.name}</td>
            <td>${method.sensitivity}</td>
            <td>${method.precision}</td>
            <td>${method.runtime}</td>
            <td>${method.throughput}</td>
            <td>${method.applications}</td>
        </tr>
    `).join('');
}

function generateValidationProtocol() {
    const methodName = document.getElementById('method-name').value;
    const analyteName = document.getElementById('analyte-name').value;
    const outputDiv = document.getElementById('validation-protocol-output');
    
    if (!methodName || !analyteName) {
        outputDiv.innerHTML = '<p class="error">Please enter method and analyte names</p>';
        return;
    }
    
    const selectedParams = Array.from(document.querySelectorAll('.validation-protocol-tool input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    let protocolHTML = `
        <div class="validation-protocol">
            <h4>Method Validation Protocol: ${methodName}</h4>
            <div class="protocol-header">
                <p><strong>Analyte:</strong> ${analyteName}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Parameters to Validate:</strong> ${selectedParams.join(', ')}</p>
            </div>
            
            <div class="protocol-sections">
    `;
    
    if (selectedParams.includes('accuracy')) {
        protocolHTML += `
            <div class="protocol-section">
                <h5>1. Accuracy/Bias Assessment</h5>
                <ul>
                    <li>Test certified reference materials (minimum 5 different concentrations)</li>
                    <li>Perform recovery studies with spiked patient samples</li>
                    <li>Compare with reference method (if available)</li>
                    <li>Calculate bias: (Measured - Expected)/Expected × 100</li>
                    <li>Acceptance criteria: Bias ≤ ±10% (adjust based on analytical goals)</li>
                </ul>
            </div>
        `;
    }
    
    if (selectedParams.includes('precision')) {
        protocolHTML += `
            <div class="protocol-section">
                <h5>2. Precision Studies</h5>
                <ul>
                    <li>Repeatability: 20 replicates, same conditions, same day</li>
                    <li>Intermediate precision: 20 replicates over 20 days</li>
                    <li>Test at least 3 concentration levels</li>
                    <li>Calculate CV% for each level</li>
                    <li>Acceptance criteria: CV ≤ 15% (adjust based on concentration)</li>
                </ul>
            </div>
        `;
    }
    
    if (selectedParams.includes('linearity')) {
        protocolHTML += `
            <div class="protocol-section">
                <h5>3. Linearity/Analytical Measurement Range (AMR)</h5>
                <ul>
                    <li>Prepare minimum 5 concentrations across expected range</li>
                    <li>Test in duplicate on multiple days</li>
                    <li>Plot measured vs. expected concentrations</li>
                    <li>Calculate correlation coefficient (r)</li>
                    <li>Acceptance criteria: r ≥ 0.995, slope 0.95-1.05</li>
                </ul>
            </div>
        `;
    }
    
    if (selectedParams.includes('interference')) {
        protocolHTML += `
            <div class="protocol-section">
                <h5>4. Interference Studies</h5>
                <ul>
                    <li>Hemolysis: Test hemoglobin concentrations 0.5, 2.5, 5.0 g/L</li>
                    <li>Lipemia: Test triglyceride concentrations 3.4, 11.3 mmol/L</li>
                    <li>Icterus: Test bilirubin concentrations 200, 500 μmol/L</li>
                    <li>Common drugs: Test therapeutic concentrations</li>
                    <li>Acceptance criteria: <10% interference at specified levels</li>
                </ul>
            </div>
        `;
    }
    
    protocolHTML += `
            </div>
            
            <div class="protocol-footer">
                <h5>Documentation Requirements</h5>
                <ul>
                    <li>Complete validation report with all data and calculations</li>
                    <li>Statistical analysis and acceptance criteria evaluation</li>
                    <li>Risk assessment and method limitations</li>
                    <li>Validation conclusion and method approval</li>
                </ul>
            </div>
        </div>
    `;
    
    outputDiv.innerHTML = protocolHTML;
    showTechnicalNotification(`Validation protocol generated for ${methodName}`, 'success');
}

function showTroubleshootingCategory(category) {
    const stepsDiv = document.getElementById('troubleshooting-steps');
    
    const troubleshootingSteps = {
        precision: [
            "Check QC materials for contamination or degradation",
            "Verify reagent lot consistency and expiration dates", 
            "Review pipetting technique and calibration",
            "Examine temperature stability during analysis",
            "Assess timing consistency in manual steps",
            "Check for air bubbles in sample or reagent lines",
            "Verify mixing adequacy and incubation times"
        ],
        accuracy: [
            "Verify calibrator values and traceability",
            "Check for systematic pipetting errors",
            "Review calibration curve linearity and fit",
            "Examine sample matrix effects",
            "Assess interferent levels (hemolysis, lipemia, icterus)",
            "Verify reference method comparison data",
            "Check for temperature-dependent bias"
        ],
        calibration: [
            "Verify calibrator preparation and storage",
            "Check pipetting accuracy for calibrators",
            "Review calibration curve acceptance criteria",
            "Examine baseline stability and drift",
            "Assess reagent blank values",
            "Verify calibrator reconstitution procedures",
            "Check for calibrator contamination"
        ],
        "qc-failures": [
            "Review recent QC trends and patterns",
            "Check Westgard rule violations systematically",
            "Verify QC material storage and handling",
            "Examine recent maintenance activities",
            "Review reagent lot changes",
            "Assess environmental conditions",
            "Check for systematic vs. random error patterns"
        ],
        instrument: [
            "Check lamp intensity and wavelength accuracy",
            "Verify optical path cleanliness",
            "Examine pump flow rates and precision",
            "Check temperature control stability",
            "Review error logs and diagnostics",
            "Verify electrical connections",
            "Assess mechanical wear and alignment"
        ]
    };
    
    const steps = troubleshootingSteps[category] || [];
    
    let html = `<h5>${category.replace('-', ' ').toUpperCase()} Troubleshooting Steps</h5>`;
    if (steps.length > 0) {
        html += '<ol class="troubleshooting-list">';
        steps.forEach(step => {
            html += `<li class="troubleshooting-step">${step}</li>`;
        });
        html += '</ol>';
        html += `
            <div class="troubleshooting-notes">
                <h6>Additional Considerations:</h6>
                <ul>
                    <li>Document all troubleshooting steps and findings</li>
                    <li>Verify corrective actions with QC testing</li>
                    <li>Consider contacting technical support for persistent issues</li>
                    <li>Review manufacturer's troubleshooting guides</li>
                </ul>
            </div>
        `;
    }
    
    stepsDiv.innerHTML = html;
    showTechnicalNotification(`Troubleshooting guide loaded for ${category}`, 'info');
}

// Event Listeners Setup - Fixed
function setupTechnicalEventListeners() {
    console.log('Setting up technical event listeners...');
    
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
                techLabApp.activeModal = null;
            }
        }
    });
    
    // Method selector changes - Fixed to handle when elements exist
    document.addEventListener('change', (e) => {
        if (e.target.id === 'analyte-select' || e.target.id === 'sensitivity-select') {
            updateMethodRecommendations();
        }
    });
    
    console.log('Technical event listeners set up successfully');
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

// Notification System
function showTechnicalNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `tech-notification tech-notification--${type}`;
    
    const iconMap = {
        info: '🔬',
        success: '✅',
        warning: '⚠️',
        error: '❌',
        calculation: '🧮'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${iconMap[type] || '🔬'}</span>
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
        border: 2px solid var(--color-tech-blue);
        border-radius: var(--tech-border-radius);
        padding: var(--space-12) var(--space-16);
        box-shadow: var(--tech-shadow);
        max-width: 400px;
        animation: slideInTech 0.3s ease-out;
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

// Technical Data Display Functions
function displayTechnicalOverview() {
    const overview = techLabApp.technicalData.overview;
    
    console.log('Technical Laboratory Overview:', {
        mission: overview.mission,
        capabilities: overview.keyCapabilities.length + ' key capabilities',
        statistics: Object.keys(overview.technicalStatistics).length + ' metrics'
    });
}

function displayAnalyticalTechniques() {
    const techniques = techLabApp.technicalData.analyticalTechniques;
    
    console.log('Analytical Techniques:', {
        spectrophotometry: techniques.spectrophotometry.methods.length + ' methods',
        chromatography: techniques.chromatography.methods.length + ' methods', 
        immunoassays: techniques.immunoassays.methods.length + ' methods',
        electrochemical: techniques.electrochemical.methods.length + ' methods'
    });
}

// Technical Statistics Display
function displayTechnicalStats() {
    const totalMethods = Object.values(techLabApp.technicalData.analyticalTechniques)
        .reduce((sum, category) => sum + category.methods.length, 0);
    
    const stats = {
        totalAnalyticalMethods: totalMethods,
        techniqueCategories: Object.keys(techLabApp.technicalData.analyticalTechniques).length,
        westgardRules: techLabApp.technicalData.qualityControl.westgardRules.length,
        methodRecommendations: Object.keys(techLabApp.technicalData.methodRecommendations).length
    };
    
    console.log('Technical Statistics:', stats);
}

// Validation Functions
function validateTechnicalData() {
    const data = techLabApp.technicalData;
    
    // Validate overview data
    const hasMission = data.overview.mission && data.overview.mission.length > 0;
    const hasCapabilities = data.overview.keyCapabilities && data.overview.keyCapabilities.length > 0;
    const hasStatistics = data.overview.technicalStatistics && Object.keys(data.overview.technicalStatistics).length > 0;
    
    // Validate analytical techniques
    const hasSpectro = data.analyticalTechniques.spectrophotometry && data.analyticalTechniques.spectrophotometry.methods.length > 0;
    const hasChromatography = data.analyticalTechniques.chromatography && data.analyticalTechniques.chromatography.methods.length > 0;
    const hasImmuno = data.analyticalTechniques.immunoassays && data.analyticalTechniques.immunoassays.methods.length > 0;
    const hasElectro = data.analyticalTechniques.electrochemical && data.analyticalTechniques.electrochemical.methods.length > 0;
    
    console.log('Technical Data Validation:', {
        hasMission: hasMission ? '✅' : '❌',
        hasCapabilities: hasCapabilities ? '✅' : '❌', 
        hasStatistics: hasStatistics ? '✅' : '❌',
        hasSpectro: hasSpectro ? '✅' : '❌',
        hasChromatography: hasChromatography ? '✅' : '❌',
        hasImmuno: hasImmuno ? '✅' : '❌',
        hasElectro: hasElectro ? '✅' : '❌'
    });
    
    return hasMission && hasCapabilities && hasStatistics && hasSpectro && hasChromatography && hasImmuno && hasElectro;
}

// Performance monitoring
function initializeTechnicalPerformanceMonitoring() {
    // Monitor feature loading performance
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.name.includes('tech') || entry.name.includes('analytical')) {
                console.log(`Technical feature rendering: ${entry.duration.toFixed(2)}ms`);
            }
        }
    });
    
    if (typeof PerformanceObserver !== 'undefined') {
        observer.observe({ entryTypes: ['measure'] });
    }
}

// Initialize the technical application
function initializeTechnicalLabApp() {
    console.log('Initializing Laboratory Testing Technical Details Center...');
    
    // Validate technical data
    const isDataValid = validateTechnicalData();
    if (!isDataValid) {
        console.warn('Technical data validation failed - please review');
    }
    
    // Set up event listeners
    setupTechnicalEventListeners();
    
    // Display technical data overview
    displayTechnicalOverview();
    displayAnalyticalTechniques();
    
    // Display statistics
    displayTechnicalStats();
    
    // Set up performance monitoring
    initializeTechnicalPerformanceMonitoring();
    
    console.log('Laboratory Testing Technical Details Center initialized successfully');
}

// Scroll listener for navigation highlighting
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavOnScroll, 100);
});

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Technical Lab App Error:', event.error);
    showTechnicalNotification('A technical error occurred. Laboratory data remains valid. Please refresh if problems persist.', 'error');
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Laboratory Testing Technical Details Center loaded in ${loadTime.toFixed(2)}ms`);
    
    // Show welcome notification after load
    setTimeout(() => {
        showTechnicalNotification('🔬 Technical Details Center loaded. Advanced analytical resources ready.', 'success');
    }, 1000);
    
    // Ensure all technical features are working
    const techFeaturesCheck = {
        navigationWorking: document.querySelectorAll('.nav-section').length > 0,
        modalsAvailable: document.querySelectorAll('.modal').length > 0,
        tabsReady: document.querySelectorAll('.tab-btn').length > 0,
        technicalDataLoaded: techLabApp.technicalData.overview.mission.length > 0,
        calculatorsReady: typeof calculatePrecision === 'function'
    };
    
    console.log('Technical Features Status:', techFeaturesCheck);
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Technical Details Center...');
    initializeTechnicalLabApp();
});

// Export functions to global scope for onclick handlers
window.scrollToSection = scrollToSection;
window.showTechnique = showTechnique;
window.showQCCategory = showQCCategory;
window.showTechnicalTools = showTechnicalTools;
window.showMethodSelector = showMethodSelector;
window.showPerformanceCalculator = showPerformanceCalculator;
window.showQCEvaluator = showQCEvaluator;
window.showReferenceIntervalTool = showReferenceIntervalTool;
window.showMethodComparison = showMethodComparison;
window.showValidationProtocol = showValidationProtocol;
window.showTroubleshootingGuide = showTroubleshootingGuide;
window.showModal = showModal;
window.closeModal = closeModal;
window.updateMethodRecommendations = updateMethodRecommendations;
window.findRecommendedMethods = findRecommendedMethods;
window.showCalculatorTab = showCalculatorTab;
window.calculatePrecision = calculatePrecision;
window.calculateAccuracy = calculateAccuracy;
window.calculateUncertainty = calculateUncertainty;
window.evaluateQCRules = evaluateQCRules;
window.calculateReferenceInterval = calculateReferenceInterval;
window.generateValidationProtocol = generateValidationProtocol;
window.showTroubleshootingCategory = showTroubleshootingCategory;

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
    
    .calc-result,
    .qc-result,
    .ri-result {
        background: var(--color-tech-bg-1);
        border-radius: var(--tech-border-radius);
        padding: var(--space-16);
        margin-top: var(--space-16);
        border-left: 4px solid var(--color-tech-blue);
    }
    
    .result-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: var(--space-12);
        margin-bottom: var(--space-16);
    }
    
    .result-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--color-surface);
        padding: var(--space-8);
        border-radius: var(--radius-sm);
    }
    
    .result-item.major {
        grid-column: 1 / -1;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        background: var(--color-tech-accent);
        color: white;
    }
    
    .result-label {
        font-weight: var(--font-weight-semibold);
        color: var(--color-text);
    }
    
    .result-value {
        font-weight: var(--font-weight-bold);
        color: var(--color-tech-blue);
        font-family: var(--font-family-mono);
    }
    
    .interpretation,
    .ri-validation {
        background: var(--color-surface);
        padding: var(--space-12);
        border-radius: var(--radius-base);
        border-left: 3px solid var(--color-tech-accent);
    }
    
    .interpretation h6,
    .ri-validation h6 {
        color: var(--color-tech-blue);
        margin: 0 0 var(--space-8) 0;
        font-size: var(--font-size-sm);
    }
    
    .tech-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: var(--space-20);
    }
    
    .tech-table th,
    .tech-table td {
        padding: var(--space-8) var(--space-12);
        text-align: left;
        border-bottom: 1px solid var(--color-border);
    }
    
    .tech-table th {
        background: var(--color-tech-bg-1);
        font-weight: var(--font-weight-semibold);
        color: var(--color-tech-blue);
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: var(--space-8);
        margin-bottom: var(--space-8);
        cursor: pointer;
    }
    
    .method-checkboxes {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-8);
        margin-bottom: var(--space-16);
    }
    
    .parameter-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-8);
        margin-bottom: var(--space-16);
    }
    
    .protocol-sections {
        display: flex;
        flex-direction: column;
        gap: var(--space-16);
    }
    
    .protocol-section {
        background: var(--color-tech-bg-1);
        padding: var(--space-16);
        border-radius: var(--radius-base);
        border-left: 4px solid var(--color-tech-blue);
    }
    
    .protocol-section h5 {
        color: var(--color-tech-blue);
        margin: 0 0 var(--space-12) 0;
        font-size: var(--font-size-base);
    }
    
    .troubleshooting-list {
        counter-reset: step-counter;
        list-style: none;
        padding-left: 0;
    }
    
    .troubleshooting-step {
        counter-increment: step-counter;
        margin-bottom: var(--space-12);
        padding: var(--space-12);
        background: var(--color-surface);
        border-radius: var(--radius-base);
        position: relative;
        padding-left: var(--space-32);
    }
    
    .troubleshooting-step::before {
        content: counter(step-counter);
        position: absolute;
        left: var(--space-8);
        top: var(--space-8);
        background: var(--color-tech-blue);
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-bold);
    }
    
    .z-score-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: var(--space-8);
        margin-bottom: var(--space-16);
    }
    
    .z-score-item {
        display: flex;
        justify-content: space-between;
        padding: var(--space-6);
        background: var(--color-surface);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-sm);
        font-family: var(--font-family-mono);
    }
    
    .z-score-item.warning {
        background: rgba(var(--color-warning-rgb), 0.1);
        border-left: 3px solid var(--color-warning);
    }
    
    .violation-item {
        background: rgba(var(--color-error-rgb), 0.1);
        padding: var(--space-8);
        border-radius: var(--radius-sm);
        margin-bottom: var(--space-8);
        border-left: 3px solid var(--color-error);
    }
    
    .no-violations {
        background: rgba(var(--color-success-rgb), 0.1);
        padding: var(--space-12);
        border-radius: var(--radius-base);
        text-align: center;
        font-weight: var(--font-weight-semibold);
        color: var(--color-success);
    }
    
    .category-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-12);
        margin-bottom: var(--space-20);
    }
    
    .error {
        color: var(--color-error);
        font-style: italic;
        text-align: center;
        padding: var(--space-12);
        background: rgba(var(--color-error-rgb), 0.1);
        border-radius: var(--radius-base);
    }
    
    .warning {
        color: var(--color-warning);
        font-style: italic;
        text-align: center;
        padding: var(--space-12);
        background: rgba(var(--color-warning-rgb), 0.1);
        border-radius: var(--radius-base);
    }
`;
document.head.appendChild(techStyle);

console.log('Laboratory Testing Technical Details Center JavaScript loaded successfully 🔬📊⚙️');