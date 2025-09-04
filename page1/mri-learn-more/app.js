// MRI Complete Guide JavaScript - Fixed Version

// Global application state and data
const mriApp = {
    // MRI technology data from the provided JSON
    mriData: {
        howItWorks: {
            steps: [
                {
                    step: 1,
                    title: "Magnetic Field Alignment",
                    description: "Strong magnetic field (1.5-3 Tesla) aligns hydrogen atoms (protons) in your body",
                    detail: "The MRI scanner creates a powerful magnetic field thousands of times stronger than Earth's magnetic field"
                },
                {
                    step: 2,
                    title: "Radio Wave Pulse",
                    description: "Radio waves are pulsed through the body, disturbing the alignment of protons",
                    detail: "These radio frequency pulses are specific to hydrogen atoms and cause them to absorb energy"
                },
                {
                    step: 3,
                    title: "Signal Detection",
                    description: "As protons return to alignment, they release energy that is detected by receiver coils",
                    detail: "Different tissues release energy at different rates, creating tissue-specific signals"
                },
                {
                    step: 4,
                    title: "Image Reconstruction",
                    description: "Computer processes signals and converts them into detailed cross-sectional images",
                    detail: "Advanced algorithms create high-resolution images showing anatomy and pathology"
                }
            ]
        },
        
        medicalApplications: {
            neurological: {
                title: "Brain & Spine Imaging",
                icon: "🧠",
                applications: [
                    "Stroke diagnosis and monitoring",
                    "Brain tumors and masses",
                    "Multiple sclerosis",
                    "Epilepsy evaluation",
                    "Dementia and memory disorders",
                    "Spinal cord injuries",
                    "Herniated discs",
                    "Spinal stenosis"
                ],
                advantages: "Exceptional detail of brain tissue, white matter, and spinal cord structures"
            },
            musculoskeletal: {
                title: "Joints & Soft Tissues",
                icon: "🦴",
                applications: [
                    "Sports injuries (ACL, rotator cuff)",
                    "Joint cartilage evaluation",
                    "Ligament and tendon tears",
                    "Soft tissue masses",
                    "Arthritis assessment",
                    "Bone infections",
                    "Muscle disorders",
                    "Joint replacement evaluation"
                ],
                advantages: "Superior visualization of cartilage, ligaments, and soft tissues not visible on X-rays"
            },
            abdominal: {
                title: "Abdomen & Pelvis",
                icon: "🫁",
                applications: [
                    "Liver tumors and cirrhosis",
                    "Kidney masses and stones",
                    "Pancreatic disorders",
                    "Uterine fibroids",
                    "Ovarian cysts",
                    "Prostate evaluation",
                    "Inflammatory bowel disease",
                    "Adrenal gland disorders"
                ],
                advantages: "Excellent soft tissue contrast without radiation, ideal for serial monitoring"
            },
            cardiac: {
                title: "Heart & Blood Vessels",
                icon: "❤️",
                applications: [
                    "Heart muscle damage assessment",
                    "Congenital heart disease",
                    "Aortic aneurysms",
                    "Heart valve function",
                    "Cardiomyopathy",
                    "Cardiac masses",
                    "Pericardial disease",
                    "Vascular malformations"
                ],
                advantages: "Comprehensive cardiac function assessment without radiation or invasive procedures"
            },
            breast: {
                title: "Breast Imaging",
                icon: "🎗️",
                applications: [
                    "High-risk screening (BRCA carriers)",
                    "Dense breast tissue evaluation",
                    "Cancer extent assessment",
                    "Treatment response monitoring",
                    "Implant evaluation",
                    "Silicone leak detection",
                    "Occult primary cancer",
                    "Pre-surgical planning"
                ],
                advantages: "Most sensitive method for breast cancer detection, especially in dense tissue"
            }
        },

        imagingComparison: {
            methods: {
                mri: {
                    name: "MRI",
                    radiation: "None",
                    softTissueDetail: "Excellent",
                    boneDetail: "Good",
                    timeRequired: "30-90 minutes",
                    cost: "Higher",
                    claustrophobia: "Possible",
                    metalRestrictions: "Yes",
                    bestFor: "Soft tissues, brain, joints, spine"
                },
                ct: {
                    name: "CT Scan",
                    radiation: "Yes",
                    softTissueDetail: "Good",
                    boneDetail: "Excellent",
                    timeRequired: "5-30 minutes",
                    cost: "Moderate",
                    claustrophobia: "Minimal",
                    metalRestrictions: "No",
                    bestFor: "Trauma, chest, bones, emergency"
                },
                xray: {
                    name: "X-Ray",
                    radiation: "Yes (low)",
                    softTissueDetail: "Poor",
                    boneDetail: "Excellent",
                    timeRequired: "1-5 minutes",
                    cost: "Low",
                    claustrophobia: "None",
                    metalRestrictions: "No",
                    bestFor: "Bones, chest, quick screening"
                },
                ultrasound: {
                    name: "Ultrasound",
                    radiation: "None",
                    softTissueDetail: "Good",
                    boneDetail: "Poor",
                    timeRequired: "15-45 minutes",
                    cost: "Low",
                    claustrophobia: "None",
                    metalRestrictions: "No",
                    bestFor: "Pregnancy, heart, blood flow"
                }
            }
        },

        faq: [
            {
                question: "Is MRI safe?",
                answer: "MRI is very safe with no ionizing radiation. The magnetic fields and radio waves used have no known harmful effects. Millions of MRI scans are performed safely each year."
            },
            {
                question: "What if I'm claustrophobic?",
                answer: "Many options are available including open-bore scanners, sedation, music, and support from our staff. Most patients complete their exam successfully even with claustrophobia."
            },
            {
                question: "Can I have an MRI with metal implants?",
                answer: "Many implants are MRI-safe, especially newer ones. We'll review your specific implants and may need documentation from your doctor or the device manufacturer."
            },
            {
                question: "How long does an MRI take?",
                answer: "Most MRI exams take 30-90 minutes, depending on the body part being imaged and the number of sequences needed. You'll know the expected time before your exam."
            },
            {
                question: "Do I need contrast for my MRI?",
                answer: "Contrast is used in about 30% of MRI exams to enhance certain structures or detect specific conditions. Your doctor will determine if contrast is needed for your particular study."
            },
            {
                question: "Can I eat before my MRI?",
                answer: "For most MRI exams, you can eat normally. However, some abdominal studies may require fasting. You'll receive specific instructions when you schedule your exam."
            }
        ]
    },

    // Application state
    currentApplication: 'neurological',
    currentMRIType: 'standard',
    searchResults: [],
    
    // Search index for quick searching
    searchIndex: [
        { term: 'how mri works', section: 'how-it-works' },
        { term: 'medical applications', section: 'applications' },
        { term: 'brain imaging', section: 'applications' },
        { term: 'spine imaging', section: 'applications' },
        { term: 'joint imaging', section: 'applications' },
        { term: 'heart imaging', section: 'applications' },
        { term: 'what to expect', section: 'what-to-expect' },
        { term: 'preparation', section: 'preparation' },
        { term: 'preparation checklist', section: 'preparation' },
        { term: 'safety information', section: 'safety' },
        { term: 'metal safety', section: 'safety' },
        { term: 'contrast safety', section: 'safety' },
        { term: 'no radiation', section: 'safety' },
        { term: 'mri vs ct scan', section: 'comparison' },
        { term: 'mri vs xray', section: 'comparison' },
        { term: 'imaging comparison', section: 'comparison' },
        { term: 'types of mri', section: 'types' },
        { term: 't1 weighted', section: 'types' },
        { term: 't2 weighted', section: 'types' },
        { term: 'contrast studies', section: 'types' },
        { term: 'understanding results', section: 'results' },
        { term: 'frequently asked questions', section: 'faq' },
        { term: 'claustrophobia', section: 'faq' },
        { term: 'magnetic field', section: 'how-it-works' },
        { term: 'radio waves', section: 'how-it-works' }
    ]
};

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
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Visual feedback
        showNotification(`Navigated to: ${sectionId.replace('-', ' ')}`, 'success');
    } else {
        console.error('Section not found:', sectionId);
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
            const searchInput = document.getElementById('mri-search');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
            showNotification('Search activated. Type to find MRI information.', 'info');
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
    const searchInput = document.getElementById('mri-search');
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
    const results = mriApp.searchIndex.filter(item => 
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
                <p>No results found for "${query}". Try terms like "safety", "preparation", "applications", or "how mri works".</p>
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
    showNotification(`Found: ${term}`, 'success');
}

function clearSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
    }
}

// Application Tab Functions
function showApplication(applicationType) {
    console.log(`Showing application: ${applicationType}`);
    
    // Update active tab
    document.querySelectorAll('.applications-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('tab-btn--active');
    });
    
    // Find and activate the correct tab
    const tabButtons = document.querySelectorAll('.applications-tabs .tab-btn');
    tabButtons.forEach(btn => {
        const btnText = btn.textContent.toLowerCase();
        let shouldActivate = false;
        
        switch (applicationType) {
            case 'neurological':
                shouldActivate = btnText.includes('brain') || btnText.includes('spine');
                break;
            case 'musculoskeletal':
                shouldActivate = btnText.includes('joint') || btnText.includes('muscle');
                break;
            case 'abdominal':
                shouldActivate = btnText.includes('abdomen') || btnText.includes('pelvis');
                break;
            case 'cardiac':
                shouldActivate = btnText.includes('heart') || btnText.includes('vessel');
                break;
            case 'breast':
                shouldActivate = btnText.includes('breast');
                break;
        }
        
        if (shouldActivate) {
            btn.classList.add('tab-btn--active');
        }
    });
    
    // Show/hide content
    document.querySelectorAll('.application-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    const targetContent = document.getElementById(`${applicationType}-content`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
        mriApp.currentApplication = applicationType;
        
        // Get application data
        const appData = mriApp.mriData.medicalApplications[applicationType];
        if (appData) {
            showNotification(`Showing ${appData.title} applications`, 'success');
        }
    }
}

// MRI Types Tab Functions
function showMRIType(mriType) {
    console.log(`Showing MRI type: ${mriType}`);
    
    // Update active tab
    document.querySelectorAll('.mri-types-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('tab-btn--active');
    });
    
    // Find and activate the correct tab
    const tabButtons = document.querySelectorAll('.mri-types-tabs .tab-btn');
    tabButtons.forEach(btn => {
        const btnText = btn.textContent.toLowerCase();
        let shouldActivate = false;
        
        switch (mriType) {
            case 'standard':
                shouldActivate = btnText.includes('standard');
                break;
            case 'specialized':
                shouldActivate = btnText.includes('specialized');
                break;
            case 'contrast':
                shouldActivate = btnText.includes('contrast');
                break;
        }
        
        if (shouldActivate) {
            btn.classList.add('tab-btn--active');
        }
    });
    
    // Show/hide content
    document.querySelectorAll('.mri-type-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    const targetContent = document.getElementById(`${mriType}-content`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
        mriApp.currentMRIType = mriType;
        showNotification(`Showing ${mriType} MRI information`, 'success');
    }
}

// Comparison Tool Functions
function initializeComparisonTable() {
    console.log('Initializing comparison table');
    updateComparison();
}

function updateComparison() {
    console.log('Update comparison called');
    const checkedMethods = [];
    
    // Get checked methods
    document.querySelectorAll('.method-checkboxes input[type="checkbox"]:checked').forEach(checkbox => {
        checkedMethods.push(checkbox.value);
    });
    
    console.log('Checked methods:', checkedMethods);
    
    if (checkedMethods.length === 0) {
        showNotification('Please select at least one imaging method to compare', 'warning');
        return;
    }
    
    // Update table
    const tableBody = document.getElementById('comparison-table-body');
    if (!tableBody) {
        console.error('Comparison table body not found');
        return;
    }
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add rows for each checked method
    checkedMethods.forEach(methodKey => {
        const method = mriApp.mriData.imagingComparison.methods[methodKey];
        if (method) {
            const row = document.createElement('tr');
            row.setAttribute('data-method', methodKey);
            
            row.innerHTML = `
                <td><strong>${method.name}</strong></td>
                <td>${method.radiation}</td>
                <td>${method.softTissueDetail}</td>
                <td>${method.boneDetail}</td>
                <td>${method.timeRequired}</td>
                <td>${method.cost}</td>
                <td>${method.bestFor}</td>
            `;
            
            tableBody.appendChild(row);
        }
    });
    
    showNotification('Comparison table updated', 'success');
}

// Interactive Body Map Functions
function showInteractiveBody() {
    console.log('Show interactive body map called');
    showModal('body-map-modal');
}

function showBodyRegionInfo(region) {
    console.log('Show body region info:', region);
    const regionInfo = document.getElementById('region-info');
    if (!regionInfo) return;
    
    let regionData = {};
    
    switch (region) {
        case 'head':
            regionData = {
                title: 'Brain & Head MRI',
                description: 'MRI provides exceptional detail of brain tissue, allowing doctors to diagnose strokes, tumors, multiple sclerosis, and other neurological conditions.',
                applications: [
                    'Stroke evaluation',
                    'Brain tumors',
                    'Multiple sclerosis',
                    'Epilepsy',
                    'Memory disorders'
                ]
            };
            break;
        case 'spine':
            regionData = {
                title: 'Spine MRI',
                description: 'Excellent visualization of spinal cord, discs, and surrounding soft tissues without radiation exposure.',
                applications: [
                    'Herniated discs',
                    'Spinal stenosis',
                    'Spinal cord injuries',
                    'Spinal tumors',
                    'Inflammatory conditions'
                ]
            };
            break;
        case 'chest':
            regionData = {
                title: 'Chest & Cardiac MRI',
                description: 'Comprehensive evaluation of heart structure and function, plus detailed lung and chest imaging.',
                applications: [
                    'Heart function assessment',
                    'Congenital heart disease',
                    'Cardiac masses',
                    'Aortic conditions',
                    'Lung masses'
                ]
            };
            break;
        case 'abdomen':
            regionData = {
                title: 'Abdominal MRI',
                description: 'Superior soft tissue contrast for evaluating liver, kidneys, pancreas, and other abdominal organs.',
                applications: [
                    'Liver tumors',
                    'Kidney masses',
                    'Pancreatic disorders',
                    'Adrenal glands',
                    'Inflammatory bowel disease'
                ]
            };
            break;
        case 'joints':
            regionData = {
                title: 'Joint & Musculoskeletal MRI',
                description: 'Unparalleled visualization of cartilage, ligaments, tendons, and soft tissues around joints.',
                applications: [
                    'Sports injuries',
                    'Arthritis evaluation',
                    'Ligament tears',
                    'Cartilage assessment',
                    'Soft tissue masses'
                ]
            };
            break;
        default:
            regionData = {
                title: 'Select a Region',
                description: 'Click on any highlighted body region to learn about MRI applications for that area.',
                applications: []
            };
    }
    
    regionInfo.innerHTML = `
        <h4>${regionData.title}</h4>
        <p>${regionData.description}</p>
        ${regionData.applications.length > 0 ? `
            <h5>Common Applications:</h5>
            <ul>
                ${regionData.applications.map(app => `<li>${app}</li>`).join('')}
            </ul>
        ` : ''}
    `;
    
    // Highlight the selected region
    document.querySelectorAll('.body-region').forEach(region => {
        region.classList.remove('selected');
    });
    
    const selectedRegion = document.querySelector(`[data-region="${region}"]`);
    if (selectedRegion) {
        selectedRegion.classList.add('selected');
    }
    
    showNotification(`Showing information for: ${regionData.title}`, 'info');
}

// Preparation Functions
function showPreparationChecklist() {
    console.log('Show preparation checklist called');
    showModal('preparation-modal');
}

function checkPreparation() {
    console.log('Check preparation called');
    const checkedItems = document.querySelectorAll('.interactive-checkbox input[type="checkbox"]:checked');
    const totalItems = document.querySelectorAll('.interactive-checkbox input[type="checkbox"]');
    
    const completedCount = checkedItems.length;
    const totalCount = totalItems.length;
    const completionPercentage = Math.round((completedCount / totalCount) * 100);
    
    console.log(`Preparation check: ${completedCount}/${totalCount} (${completionPercentage}%)`);
    
    const resultsElement = document.getElementById('preparation-results');
    if (!resultsElement) return;
    
    let resultClass = 'preparation-incomplete';
    let resultMessage = '';
    let recommendations = [];
    
    if (completionPercentage === 100) {
        resultClass = 'preparation-complete';
        resultMessage = '🎉 You\'re fully prepared for your MRI!';
        recommendations.push('Arrive 30 minutes early for check-in');
        recommendations.push('Bring a book or music for waiting time');
        recommendations.push('Ask any remaining questions when you arrive');
    } else if (completionPercentage >= 75) {
        resultClass = 'preparation-mostly-complete';
        resultMessage = '✅ You\'re almost ready for your MRI!';
        recommendations.push('Review the remaining unchecked items');
        recommendations.push('Complete any missing preparations');
        recommendations.push('Contact the facility if you have questions');
    } else {
        resultClass = 'preparation-incomplete';
        resultMessage = '⚠️ Please complete more preparation steps';
        recommendations.push('Review all unchecked items carefully');
        recommendations.push('Gather required documents and information');
        recommendations.push('Call the facility if you need clarification');
    }
    
    resultsElement.innerHTML = `
        <div class="preparation-analysis ${resultClass}">
            <div class="analysis-header">
                <h4>Preparation Assessment</h4>
                <div class="completion-indicator">
                    <div class="completion-bar">
                        <div class="completion-fill" style="width: ${completionPercentage}%"></div>
                    </div>
                    <span class="completion-text">${completionPercentage}% Complete</span>
                </div>
            </div>
            
            <div class="result-message">
                <p><strong>${resultMessage}</strong></p>
            </div>
            
            <div class="recommendations-section">
                <h5>Next Steps:</h5>
                <ul class="recommendations-list">
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            
            <div class="preparation-actions">
                <button class="btn btn--outline btn--sm" onclick="printChecklist()">Print Checklist</button>
                <button class="btn btn--outline btn--sm" onclick="emailChecklist()">Email Checklist</button>
            </div>
        </div>
    `;
    
    resultsElement.classList.remove('hidden');
    showNotification(`Preparation assessment: ${completionPercentage}% complete`, 'info');
}

function printChecklist() {
    const printContent = `
        <html>
        <head>
            <title>MRI Preparation Checklist</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #E91E63; }
                .checklist-item { margin: 10px 0; display: flex; align-items: center; }
                .checkbox { margin-right: 10px; }
                .section { margin: 20px 0; }
                .section h3 { color: #9C27B0; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            </style>
        </head>
        <body>
            <h1>🧲 MRI Preparation Checklist</h1>
            
            <div class="section">
                <h3>Personal Preparation</h3>
                <div class="checklist-item">
                    <input type="checkbox" class="checkbox"> I have removed all jewelry and metal objects
                </div>
                <div class="checklist-item">
                    <input type="checkbox" class="checkbox"> I am wearing clothing without metal fasteners
                </div>
                <div class="checklist-item">
                    <input type="checkbox" class="checkbox"> I have my insurance cards and identification
                </div>
            </div>
            
            <div class="section">
                <h3>Medical Information</h3>
                <div class="checklist-item">
                    <input type="checkbox" class="checkbox"> I have informed staff of any implants or devices
                </div>
                <div class="checklist-item">
                    <input type="checkbox" class="checkbox"> I have disclosed all allergies and medications
                </div>
                <div class="checklist-item">
                    <input type="checkbox" class="checkbox"> I have reported any claustrophobia concerns
                </div>
            </div>
            
            <div class="section">
                <h3>Important Reminders</h3>
                <ul>
                    <li>Arrive 30 minutes early for check-in</li>
                    <li>Bring insurance cards and photo ID</li>
                    <li>Inform staff of any medical implants</li>
                    <li>Let us know about claustrophobia or anxiety</li>
                    <li>Ask questions - we're here to help!</li>
                </ul>
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

function emailChecklist() {
    showNotification('Email functionality would be implemented in a full system', 'info');
}

function printPreparationGuide() {
    printChecklist(); // Use the same print function
}

// Accordion Functions
function toggleAccordion(accordionItem) {
    const isActive = accordionItem.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        accordionItem.classList.add('active');
    }
}

// FAQ Functions
function toggleFAQ(faqItem) {
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items in the same category
    const category = faqItem.closest('.faq-category');
    if (category) {
        category.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
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
        border-radius: var(--mri-border-radius);
        padding: var(--space-12) var(--space-16);
        box-shadow: var(--mri-shadow);
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
        border-left: 4px solid var(--color-mri-primary);
    `;
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 4000);
}

// Event Listeners Setup
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Navigation smooth scrolling
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
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
    
    // Search functionality
    const searchInput = document.getElementById('mri-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Modal close handlers
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Comparison checkboxes
    document.querySelectorAll('.method-checkboxes input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateComparison);
    });
    
    console.log('Event listeners set up successfully');
}

// Initialize the application
function initializeMRIApp() {
    console.log('Initializing MRI Complete Guide...');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize interactive components
    initializeComparisonTable();
    
    // Show initial application content
    showApplication('neurological');
    showMRIType('standard');
    
    console.log('MRI Complete Guide initialized successfully');
}

// Scroll-based navigation highlighting
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
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

// Add scroll listener for navigation highlighting
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavOnScroll, 100);
});

// Error Handling
window.addEventListener('error', function(event) {
    console.error('MRI App Error:', event.error);
    showNotification('An error occurred. Please refresh the page if problems persist.', 'error');
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`MRI Complete Guide loaded in ${loadTime.toFixed(2)}ms`);
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing MRI Complete Guide...');
    initializeMRIApp();
    
    // Welcome message
    setTimeout(() => {
        showNotification('🧲 Welcome to the MRI Complete Guide! Your comprehensive resource for understanding MRI.', 'info');
    }, 1000);
});

// Export functions to global scope for onclick handlers
window.scrollToSection = scrollToSection;
window.toggleSearch = toggleSearch;
window.performSearch = performSearch;
window.showApplication = showApplication;
window.showMRIType = showMRIType;
window.updateComparison = updateComparison;
window.showInteractiveBody = showInteractiveBody;
window.showBodyRegionInfo = showBodyRegionInfo;
window.showPreparationChecklist = showPreparationChecklist;
window.checkPreparation = checkPreparation;
window.printChecklist = printChecklist;
window.emailChecklist = emailChecklist;
window.printPreparationGuide = printPreparationGuide;
window.toggleAccordion = toggleAccordion;
window.toggleFAQ = toggleFAQ;
window.showModal = showModal;
window.closeModal = closeModal;
window.handleSearchResult = handleSearchResult;

// CSS animations for notifications and other dynamic styles
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
        background: var(--color-mri-bg-1);
    }
    
    .search-result:last-child {
        border-bottom: none;
    }
    
    .body-region.selected {
        background: var(--color-mri-bg-2) !important;
        border-color: var(--color-mri-primary-dark) !important;
        transform: scale(1.1) !important;
    }
    
    .preparation-complete {
        background: rgba(76, 175, 80, 0.1);
        border-left: 4px solid #4CAF50;
        padding: var(--space-16);
        border-radius: var(--mri-border-radius);
    }
    
    .preparation-mostly-complete {
        background: rgba(255, 152, 0, 0.1);
        border-left: 4px solid #FF9800;
        padding: var(--space-16);
        border-radius: var(--mri-border-radius);
    }
    
    .preparation-incomplete {
        background: var(--color-mri-bg-1);
        border-left: 4px solid var(--color-mri-primary);
        padding: var(--space-16);
        border-radius: var(--mri-border-radius);
    }
    
    .completion-indicator {
        display: flex;
        align-items: center;
        gap: var(--space-8);
        margin-top: var(--space-8);
    }
    
    .completion-bar {
        background: var(--color-border);
        height: 8px;
        border-radius: var(--radius-full);
        overflow: hidden;
        flex: 1;
        max-width: 200px;
    }
    
    .completion-fill {
        background: var(--gradient-mri);
        height: 100%;
        transition: width var(--duration-normal) var(--ease-standard);
    }
    
    .completion-text {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        color: var(--color-mri-primary);
    }
    
    .analysis-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-16);
    }
    
    .result-message {
        margin-bottom: var(--space-16);
        padding: var(--space-12);
        background: var(--color-mri-bg-2);
        border-radius: var(--radius-base);
        text-align: center;
    }
    
    .recommendations-section h5 {
        color: var(--color-mri-primary);
        margin-bottom: var(--space-8);
    }
    
    .recommendations-list {
        margin: 0;
        padding-left: var(--space-20);
    }
    
    .recommendations-list li {
        margin-bottom: var(--space-4);
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
    }
    
    .preparation-actions {
        display: flex;
        gap: var(--space-8);
        justify-content: center;
        margin-top: var(--space-16);
    }
`;
document.head.appendChild(style);

console.log('MRI Complete Guide JavaScript loaded successfully 🧲');