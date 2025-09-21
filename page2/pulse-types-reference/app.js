// TCM Pulse Types Reference System - Interactive Application

class TCMPulseReference {
    constructor() {
        this.pulseData = {
            "rateRhythm": {
                "name": "Rate & Rhythm Pulses",
                "chinese": "频率脉",
                "pulses": [
                    {
                        "id": "rapid",
                        "chinese": "数脉",
                        "pinyin": "shuò mài",
                        "name": "Rapid Pulse",
                        "rate": ">90 bpm (>5 beats per breath)",
                        "characteristics": "Fast, urgent, pressing sensation",
                        "description": "Like rapid drumbeats, hasty and impatient",
                        "clinical": "Heat patterns, fever, inflammation, Yin deficiency",
                        "conditions": ["High fever and acute infections", "Hyperthyroidism", "Anxiety and emotional agitation", "Yin deficiency with internal heat", "Inflammatory conditions"],
                        "treatment": "Clear heat, cool blood, nourish Yin, calm the mind",
                        "herbs": "Heat-clearing formulas, Yin-nourishing herbs",
                        "lifestyle": "Cooling foods, stress reduction, adequate rest"
                    },
                    {
                        "id": "slow",
                        "chinese": "迟脉",
                        "pinyin": "chí mài", 
                        "name": "Slow Pulse",
                        "rate": "<60 bpm (<4 beats per breath)",
                        "characteristics": "Leisurely, relaxed, unhurried rhythm",
                        "description": "Like a slow, steady walk, calm and measured",
                        "clinical": "Cold patterns, Yang deficiency, chronic conditions",
                        "conditions": ["Hypothyroidism", "Chronic fatigue", "Digestive weakness", "Depression", "Chronic kidney conditions"],
                        "treatment": "Warm Yang, strengthen digestive fire, tonify Qi",
                        "herbs": "Yang-warming formulas, digestive tonics",
                        "lifestyle": "Warming foods, gentle exercise, adequate warmth"
                    },
                    {
                        "id": "moderate",
                        "chinese": "缓脉",
                        "pinyin": "huǎn mài",
                        "name": "Moderate Pulse", 
                        "rate": "60-70 bpm (4 beats per breath)",
                        "characteristics": "Relaxed, gentle, slightly slow but steady",
                        "description": "Like gentle waves, soft and flowing",
                        "clinical": "Dampness, Spleen deficiency, chronic fatigue",
                        "conditions": ["Chronic digestive issues", "Water retention", "Chronic fatigue syndrome", "Post-illness recovery"],
                        "treatment": "Strengthen Spleen, transform dampness, support digestion",
                        "herbs": "Spleen-tonifying formulas, dampness-transforming herbs"
                    },
                    {
                        "id": "racing",
                        "chinese": "疾脉",
                        "pinyin": "jí mài",
                        "name": "Racing Pulse",
                        "rate": ">120 bpm (>7 beats per breath)",
                        "characteristics": "Extremely fast, almost chaotic rhythm",
                        "description": "Like galloping horses, urgent and forceful",
                        "clinical": "Extreme heat, critical conditions, Yang excess",
                        "conditions": ["High fever", "Hypertensive crisis", "Panic attacks", "Drug intoxication", "Critical illness"],
                        "treatment": "Emergency cooling, calm Yang, protect Yin"
                    },
                    {
                        "id": "irregular",
                        "chinese": "结脉",
                        "pinyin": "jié mài",
                        "name": "Irregular Pulse",
                        "characteristics": "Skipped beats, uneven rhythm, intermittent pauses",
                        "description": "Like stuttering speech, interrupted flow",
                        "clinical": "Qi stagnation, Blood stasis, emotional stress",
                        "conditions": ["Cardiac arrhythmias", "Emotional stress", "Circulation problems", "Liver Qi stagnation"],
                        "treatment": "Regulate Qi, move Blood, calm mind, harmonize rhythm"
                    }
                ]
            },
            "depthStrength": {
                "name": "Depth & Strength Pulses",
                "chinese": "深浅脉",
                "pulses": [
                    {
                        "id": "floating",
                        "chinese": "浮脉",
                        "pinyin": "fú mài",
                        "name": "Floating Pulse",
                        "characteristics": "Strong with light pressure, weakens with deep pressure",
                        "description": "Like wood floating on water, superficial but clear",
                        "clinical": "External pathogenic factors, surface conditions",
                        "conditions": ["Common cold and flu", "Early-stage infections", "Skin conditions", "External wind invasion"],
                        "treatment": "Release exterior, dispel pathogenic factors"
                    },
                    {
                        "id": "deep",
                        "chinese": "沉脉", 
                        "pinyin": "chén mài",
                        "name": "Deep Pulse",
                        "characteristics": "Only felt with heavy pressure, hidden beneath surface",
                        "description": "Like a stone sinking in deep water, profound and hidden",
                        "clinical": "Internal conditions, organ weakness, chronic disease",
                        "conditions": ["Internal organ dysfunction", "Chronic kidney conditions", "Constitutional weakness"],
                        "treatment": "Warm interior, strengthen organs, tonify constitution"
                    },
                    {
                        "id": "weak",
                        "chinese": "弱脉",
                        "pinyin": "ruò mài",
                        "name": "Weak Pulse",
                        "characteristics": "Soft, feeble, lacks strength at all pressure levels",
                        "description": "Like a gentle breeze, barely perceptible",
                        "clinical": "Qi and Blood deficiency, constitutional weakness",
                        "conditions": ["Chronic illness", "Post-surgical recovery", "Anemia", "Elderly frailty"],
                        "treatment": "Tonify Qi and Blood, strengthen constitution"
                    },
                    {
                        "id": "strong",
                        "chinese": "实脉",
                        "pinyin": "shí mài",
                        "name": "Strong Pulse",
                        "characteristics": "Forceful, powerful, strong at all pressure levels", 
                        "description": "Like rushing river, forceful and abundant",
                        "clinical": "Excess patterns, strong constitution, acute conditions",
                        "conditions": ["High blood pressure", "Acute inflammation", "Stress", "Yang excess patterns"],
                        "treatment": "Clear excess, calm hyperactivity, moderate strength"
                    },
                    {
                        "id": "hidden",
                        "chinese": "伏脉",
                        "pinyin": "fú mài",
                        "name": "Hidden Pulse",
                        "characteristics": "Extremely deep, almost imperceptible even with heavy pressure",
                        "description": "Like treasure buried deep underground",
                        "clinical": "Severe internal conditions, critical deficiency",
                        "conditions": ["Critical illness", "Severe organ failure", "Shock", "Terminal illness"],
                        "treatment": "Emergency tonification, life-saving measures"
                    }
                ]
            },
            "qualityTexture": {
                "name": "Quality & Texture Pulses",
                "chinese": "质地脉",
                "pulses": [
                    {
                        "id": "slippery",
                        "chinese": "滑脉",
                        "pinyin": "huá mài",
                        "name": "Slippery Pulse",
                        "characteristics": "Smooth, flowing like pearls rolling, easy to feel",
                        "description": "Like smooth jade beads, flowing effortlessly",
                        "clinical": "Phlegm, dampness, pregnancy, good circulation",
                        "conditions": ["Pregnancy (normal)", "Digestive congestion", "Phlegm accumulation", "Robust health"],
                        "treatment": "Transform phlegm, resolve dampness (if pathological)"
                    },
                    {
                        "id": "rough",
                        "chinese": "涩脉",
                        "pinyin": "sè mài",
                        "name": "Rough Pulse",
                        "characteristics": "Irregular, choppy, like scraping bamboo",
                        "description": "Like sandpaper texture, uneven and resistant",
                        "clinical": "Blood stasis, dryness, insufficient Blood",
                        "conditions": ["Blood circulation problems", "Chronic pain", "Menstrual irregularities", "Skin dryness"],
                        "treatment": "Nourish Blood, move circulation, moisten dryness"
                    },
                    {
                        "id": "wiry",
                        "chinese": "弦脉",
                        "pinyin": "xián mài",
                        "name": "Wiry Pulse",
                        "characteristics": "Taut, tight like a guitar string, resistant to pressure",
                        "description": "Like a tightly stretched wire, inflexible",
                        "clinical": "Liver Qi stagnation, emotional stress, pain",
                        "conditions": ["Stress and tension", "Chronic headaches", "PMS", "Hypertension"],
                        "treatment": "Soothe Liver Qi, regulate emotions, reduce stress"
                    },
                    {
                        "id": "tight",
                        "chinese": "紧脉",
                        "pinyin": "jǐn mài",
                        "name": "Tight Pulse",
                        "characteristics": "Tense, constricted, like a rope twisted tightly",
                        "description": "Like twisted rope, bound and restricted",
                        "clinical": "Cold, pain, external pathogenic invasion",
                        "conditions": ["Acute pain", "Cold conditions", "Muscular tension", "External invasions"],
                        "treatment": "Warm and dispel cold, relieve tension, move Qi"
                    },
                    {
                        "id": "soggy",
                        "chinese": "濡脉",
                        "pinyin": "rú mài",
                        "name": "Soggy Pulse",
                        "characteristics": "Soft, floating, fine, like cotton floating on water",
                        "description": "Like wet cotton, soft but insubstantial",
                        "clinical": "Dampness, Qi deficiency, chronic weakness",
                        "conditions": ["Chronic digestive weakness", "Dampness", "Chronic fatigue", "Elderly weakness"],
                        "treatment": "Dry dampness, strengthen Spleen, tonify Qi"
                    }
                ]
            }
        };

        this.currentFilter = 'all';
        this.searchTerm = '';
        this.compactView = false;
        this.bookmarkedPulses = [];
        this.currentPulse = null;
        this.comparisonList = [];
        this.audioContext = null;
        this.isInitialized = false;
    }

    init() {
        console.log('Initializing TCM Pulse Reference System...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            setTimeout(() => this.initializeComponents(), 100);
        }
    }

    initializeComponents() {
        if (this.isInitialized) {
            console.log('Already initialized, skipping...');
            return;
        }
        
        console.log('Setting up components...');
        
        // Ensure all modals are closed on initialization
        this.closeAllModals();
        
        this.initializeSearch();
        this.initializeFilters();
        this.initializeViewToggle();
        this.initializeThemeToggle();
        this.initializeModals();
        this.initializeHeroActions();
        this.initializeReferenceCards();
        this.initializeAccessibility();
        this.loadBookmarks();
        this.renderPulseGrid();
        this.updateResultsCount();
        this.isInitialized = true;
        
        console.log('TCM Pulse Reference System initialized successfully');
    }

    closeAllModals() {
        // Force close all modals on initialization
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
        });
        document.body.style.overflow = '';
    }

    initializeSearch() {
        const searchInput = document.getElementById('pulseSearch');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase().trim();
                this.debounce(() => {
                    this.filterAndRender();
                    this.announceToScreenReader(`Search results updated for "${this.searchTerm}"`);
                }, 300)();
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.filterAndRender();
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.filterAndRender();
            });
        }
    }

    initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const clearFiltersBtn = document.getElementById('clearFilters');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setActiveFilter(btn);
                const category = btn.getAttribute('data-category');
                this.currentFilter = category;
                this.filterAndRender();
                this.announceToScreenReader(`Filter changed to ${btn.textContent.split('\n')[0]}`);
            });
        });

        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
    }

    setActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    clearAllFilters() {
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        const searchInput = document.getElementById('pulseSearch');
        if (searchInput) {
            searchInput.value = '';
        }
        
        this.setActiveFilter(document.querySelector('.filter-btn[data-category="all"]'));
        this.filterAndRender();
        this.announceToScreenReader('All filters cleared');
    }

    initializeViewToggle() {
        const viewToggle = document.getElementById('viewToggle');
        const viewIcon = document.getElementById('viewIcon');
        
        if (viewToggle) {
            viewToggle.addEventListener('click', () => {
                this.compactView = !this.compactView;
                this.toggleGridView();
                
                if (viewIcon) {
                    viewIcon.textContent = this.compactView ? '📄' : '📋';
                }
                
                viewToggle.setAttribute('aria-label', 
                    this.compactView ? 'Switch to detailed view' : 'Switch to compact view'
                );
                
                this.announceToScreenReader(
                    `Switched to ${this.compactView ? 'compact' : 'detailed'} view`
                );
            });
        }
    }

    toggleGridView() {
        const pulseGrid = document.getElementById('pulseGrid');
        const pulseCards = document.querySelectorAll('.pulse-card');
        
        if (pulseGrid) {
            pulseGrid.classList.toggle('compact', this.compactView);
        }
        
        pulseCards.forEach(card => {
            card.classList.toggle('compact', this.compactView);
        });
    }

    initializeThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (themeToggle) {
            const savedTheme = 'light'; // Simplified for demo
            this.setTheme(savedTheme);
            
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
            });
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    initializeModals() {
        // Pulse detail modal
        const pulseModalClose = document.getElementById('pulseModalClose');
        const pulseModalOverlay = document.getElementById('pulseModalOverlay');
        
        if (pulseModalClose) {
            pulseModalClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal('pulseModal');
            });
        }
        
        if (pulseModalOverlay) {
            pulseModalOverlay.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal('pulseModal');
            });
        }

        // Comparison modal
        const comparisonModalClose = document.getElementById('comparisonModalClose');
        if (comparisonModalClose) {
            comparisonModalClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal('comparisonModal');
            });
        }

        // Add overlay click handlers for comparison modal
        setTimeout(() => {
            const comparisonModal = document.getElementById('comparisonModal');
            if (comparisonModal) {
                const overlay = comparisonModal.querySelector('.modal-overlay');
                if (overlay) {
                    overlay.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.closeModal('comparisonModal');
                    });
                }
            }
        }, 100);

        // Modal action buttons
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        const audioSimBtn = document.getElementById('audioSimBtn');
        const compareBtn = document.getElementById('compareBtn');
        
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', () => this.toggleBookmark());
        }
        
        if (audioSimBtn) {
            audioSimBtn.addEventListener('click', () => this.playAudioSimulation());
        }
        
        if (compareBtn) {
            compareBtn.addEventListener('click', () => this.addToComparison());
        }

        // Escape key handler with priority
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                
                // Close any open modal
                const openModals = document.querySelectorAll('.modal:not(.hidden)');
                if (openModals.length > 0) {
                    const lastModal = openModals[openModals.length - 1];
                    this.closeModal(lastModal.id);
                }
            }
        }, true); // Use capture phase
    }

    initializeHeroActions() {
        const searchPulsesBtn = document.getElementById('searchPulsesBtn');
        const filterCategoryBtn = document.getElementById('filterCategoryBtn');
        const audioGuideBtn = document.getElementById('audioGuideBtn');
        
        if (searchPulsesBtn) {
            searchPulsesBtn.addEventListener('click', () => {
                const searchInput = document.getElementById('pulseSearch');
                if (searchInput) {
                    searchInput.focus();
                    this.scrollToSection('pulse-types-section');
                }
            });
        }
        
        if (filterCategoryBtn) {
            filterCategoryBtn.addEventListener('click', () => {
                this.scrollToSection('filters-section');
            });
        }
        
        if (audioGuideBtn) {
            audioGuideBtn.addEventListener('click', () => {
                this.startAudioGuide();
            });
        }
    }

    initializeReferenceCards() {
        const viewChartBtn = document.getElementById('viewChartBtn');
        const viewTextsBtn = document.getElementById('viewTextsBtn');
        const viewResearchBtn = document.getElementById('viewResearchBtn');
        const startQuizBtn = document.getElementById('startQuizBtn');
        
        if (viewChartBtn) {
            viewChartBtn.addEventListener('click', () => {
                this.showComparisonChart();
            });
        }
        
        if (viewTextsBtn) {
            viewTextsBtn.addEventListener('click', () => {
                this.showClassicalTexts();
            });
        }
        
        if (viewResearchBtn) {
            viewResearchBtn.addEventListener('click', () => {
                this.showModernResearch();
            });
        }
        
        if (startQuizBtn) {
            startQuizBtn.addEventListener('click', () => {
                this.startPracticeQuiz();
            });
        }

        // Reset search button
        const resetSearchBtn = document.getElementById('resetSearch');
        if (resetSearchBtn) {
            resetSearchBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
    }

    initializeAccessibility() {
        // Create live region for announcements if not exists
        let liveRegion = document.getElementById('ariaLive');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'ariaLive';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            document.body.appendChild(liveRegion);
        }

        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeyboard(e);
        });
    }

    getAllPulses() {
        const allPulses = [];
        Object.entries(this.pulseData).forEach(([categoryKey, categoryData]) => {
            categoryData.pulses.forEach(pulse => {
                allPulses.push({
                    ...pulse,
                    category: categoryKey,
                    categoryName: categoryData.name,
                    categoryChinese: categoryData.chinese
                });
            });
        });
        return allPulses;
    }

    filterPulses() {
        const allPulses = this.getAllPulses();
        
        let filtered = allPulses;
        
        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(pulse => pulse.category === this.currentFilter);
        }
        
        // Apply search filter
        if (this.searchTerm) {
            filtered = filtered.filter(pulse => {
                const searchableText = [
                    pulse.name,
                    pulse.chinese,
                    pulse.pinyin,
                    pulse.characteristics,
                    pulse.clinical,
                    pulse.description,
                    ...(pulse.conditions || [])
                ].join(' ').toLowerCase();
                
                return searchableText.includes(this.searchTerm);
            });
        }
        
        return filtered;
    }

    renderPulseGrid() {
        const pulseGrid = document.getElementById('pulseGrid');
        const noResults = document.getElementById('noResults');
        
        if (!pulseGrid) return;
        
        const filteredPulses = this.filterPulses();
        
        if (filteredPulses.length === 0) {
            pulseGrid.style.display = 'none';
            if (noResults) {
                noResults.classList.remove('hidden');
            }
            return;
        }
        
        pulseGrid.style.display = 'grid';
        if (noResults) {
            noResults.classList.add('hidden');
        }
        
        pulseGrid.innerHTML = filteredPulses.map(pulse => this.createPulseCard(pulse)).join('');
        
        // Apply compact view if active
        if (this.compactView) {
            this.toggleGridView();
        }
        
        // Initialize card click handlers
        this.initializePulseCards();
    }

    createPulseCard(pulse) {
        const conditionsPreview = pulse.conditions ? pulse.conditions.slice(0, 3) : [];
        const hasMoreConditions = pulse.conditions && pulse.conditions.length > 3;
        
        return `
            <div class="pulse-card" data-pulse-id="${pulse.id}" data-category="${pulse.category}" 
                 role="button" tabindex="0" aria-label="View details for ${pulse.name}">
                <div class="pulse-card-header">
                    <div class="pulse-chinese">${pulse.chinese}</div>
                    <div class="pulse-pinyin">${pulse.pinyin}</div>
                    <div class="pulse-english">${pulse.name}</div>
                </div>
                <div class="pulse-card-body">
                    ${pulse.rate ? `<div class="pulse-rate">${pulse.rate}</div>` : ''}
                    <div class="pulse-characteristics">${pulse.characteristics}</div>
                    <div class="pulse-description">${pulse.description}</div>
                    <div class="pulse-clinical">
                        <strong>Clinical:</strong> ${pulse.clinical}
                    </div>
                    ${conditionsPreview.length > 0 ? `
                        <div class="conditions-preview">
                            <strong>Conditions:</strong>
                            <ul class="conditions-list">
                                ${conditionsPreview.map(condition => `<li>${condition}</li>`).join('')}
                                ${hasMoreConditions ? `<li><em>and ${pulse.conditions.length - 3} more...</em></li>` : ''}
                            </ul>
                        </div>
                    ` : ''}
                </div>
                <div class="pulse-card-footer">
                    <div class="pulse-actions">
                        <button class="pulse-action-btn" onclick="event.stopPropagation(); window.tcmPulseRef.playPulseAudio('${pulse.id}')" 
                                aria-label="Play audio simulation for ${pulse.name}">🎵</button>
                        <button class="pulse-action-btn" onclick="event.stopPropagation(); window.tcmPulseRef.togglePulseBookmark('${pulse.id}')"
                                aria-label="Bookmark ${pulse.name}">🔖</button>
                    </div>
                    <div class="pulse-category-tag">${pulse.categoryName}</div>
                </div>
            </div>
        `;
    }

    initializePulseCards() {
        const pulseCards = document.querySelectorAll('.pulse-card');
        pulseCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('pulse-action-btn')) return;
                this.showPulseDetail(card.getAttribute('data-pulse-id'));
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (e.target.classList.contains('pulse-action-btn')) return;
                    this.showPulseDetail(card.getAttribute('data-pulse-id'));
                }
            });
        });
    }

    showPulseDetail(pulseId) {
        const pulse = this.findPulseById(pulseId);
        if (!pulse) return;

        this.currentPulse = pulse;
        
        const modalTitle = document.getElementById('pulseModalTitle');
        const modalBody = document.getElementById('pulseModalBody');
        
        if (modalTitle) {
            modalTitle.textContent = `${pulse.chinese} - ${pulse.name}`;
        }
        
        if (modalBody) {
            modalBody.innerHTML = this.createPulseDetailContent(pulse);
        }
        
        this.showModal('pulseModal');
        this.announceToScreenReader(`Opened details for ${pulse.name}`);
    }

    createPulseDetailContent(pulse) {
        return `
            <div class="pulse-detail">
                <div class="pulse-detail-header">
                    <div class="pulse-detail-chinese">${pulse.chinese}</div>
                    <div class="pulse-detail-pinyin">${pulse.pinyin}</div>
                    <div class="pulse-detail-english">${pulse.name}</div>
                </div>
                
                <div class="pulse-detail-section">
                    <h4>Characteristics</h4>
                    <p>${pulse.characteristics}</p>
                    ${pulse.rate ? `<p><strong>Rate:</strong> ${pulse.rate}</p>` : ''}
                    <p><em>${pulse.description}</em></p>
                </div>
                
                <div class="pulse-detail-section">
                    <h4>Clinical Significance</h4>
                    <p>${pulse.clinical}</p>
                    ${pulse.treatment ? `<p><strong>Treatment:</strong> ${pulse.treatment}</p>` : ''}
                </div>
                
                ${pulse.conditions ? `
                    <div class="pulse-detail-section">
                        <h4>Associated Conditions</h4>
                        <ul class="conditions-list">
                            ${pulse.conditions.map(condition => `<li>${condition}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${pulse.herbs || pulse.lifestyle ? `
                    <div class="pulse-detail-section">
                        <h4>Treatment Approaches</h4>
                        ${pulse.herbs ? `<p><strong>Herbal Medicine:</strong> ${pulse.herbs}</p>` : ''}
                        ${pulse.lifestyle ? `<p><strong>Lifestyle:</strong> ${pulse.lifestyle}</p>` : ''}
                    </div>
                ` : ''}
                
                <div class="pulse-detail-section">
                    <h4>Category</h4>
                    <p>${pulse.categoryName} (${pulse.categoryChinese})</p>
                </div>
            </div>
        `;
    }

    findPulseById(pulseId) {
        const allPulses = this.getAllPulses();
        return allPulses.find(pulse => pulse.id === pulseId);
    }

    filterAndRender() {
        this.renderPulseGrid();
        this.updateResultsCount();
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (!resultsCount) return;
        
        const filteredPulses = this.filterPulses();
        const total = this.getAllPulses().length;
        
        if (this.currentFilter === 'all' && !this.searchTerm) {
            resultsCount.textContent = `Showing all ${total} pulse types`;
        } else {
            const filterText = this.currentFilter !== 'all' ? 
                ` in ${this.getCategoryDisplayName(this.currentFilter)}` : '';
            const searchText = this.searchTerm ? ` matching "${this.searchTerm}"` : '';
            resultsCount.textContent = `Showing ${filteredPulses.length} of ${total} pulse types${filterText}${searchText}`;
        }
    }

    getCategoryDisplayName(categoryKey) {
        const categoryMap = {
            'rateRhythm': 'Rate & Rhythm',
            'depthStrength': 'Depth & Strength', 
            'qualityTexture': 'Quality & Texture',
            'specialized': 'Specialized',
            'combined': 'Combined'
        };
        return categoryMap[categoryKey] || categoryKey;
    }

    // Modal Management
    showModal(modalId) {
        console.log('Opening modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');
            
            // Focus management
            const firstFocusable = modal.querySelector('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }
            
            document.body.style.overflow = 'hidden';
            console.log('Modal opened successfully:', modalId);
        }
    }

    closeModal(modalId) {
        console.log('Closing modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            console.log('Modal closed successfully:', modalId);
        }
    }

    // Audio Simulation
    playPulseAudio(pulseId) {
        const pulse = this.findPulseById(pulseId);
        if (!pulse) return;
        
        this.currentPulse = pulse;
        this.showAudioPlayer(pulse);
        this.announceToScreenReader(`Playing audio simulation for ${pulse.name}`);
    }

    playAudioSimulation() {
        if (this.currentPulse) {
            this.playPulseAudio(this.currentPulse.id);
        }
    }

    showAudioPlayer(pulse) {
        let audioPlayer = document.getElementById('audioPlayer');
        
        if (!audioPlayer) {
            this.createAudioPlayer();
            audioPlayer = document.getElementById('audioPlayer');
        }
        
        const audioTitle = document.getElementById('audioTitle');
        if (audioTitle) {
            audioTitle.textContent = `${pulse.name} (${pulse.chinese}) Simulation`;
        }
        
        audioPlayer.classList.remove('hidden');
        
        // Simulate audio playback
        this.simulateAudioForPulse(pulse);
        this.announceToScreenReader(`Playing ${pulse.name} audio simulation`);
    }

    createAudioPlayer() {
        const audioPlayerHTML = `
            <div id="audioPlayer" class="audio-player hidden">
                <div class="audio-controls">
                    <button class="audio-btn" id="playPauseBtn" onclick="window.tcmPulseRef.toggleAudioPlayback()">▶️</button>
                    <div class="audio-info">
                        <div class="audio-title" id="audioTitle">Pulse Audio Simulation</div>
                        <div class="audio-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" id="audioProgress"></div>
                            </div>
                        </div>
                    </div>
                    <button class="audio-btn" id="closeAudioBtn" onclick="window.tcmPulseRef.hideAudioPlayer()">✖️</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', audioPlayerHTML);
    }

    simulateAudioForPulse(pulse) {
        // Reset progress
        const progressFill = document.getElementById('audioProgress');
        if (progressFill) {
            progressFill.style.width = '0%';
        }
        
        // Start progress animation
        this.animateAudioProgress(10000); // 10 second simulation
        
        // Simulate pulse rhythm with visual feedback
        this.startPulseSimulation(pulse);
    }

    startPulseSimulation(pulse) {
        const audioPatterns = {
            'rapid': { interval: 500 },
            'slow': { interval: 1200 },
            'racing': { interval: 300 },
            'irregular': { interval: 800 },
            'floating': { interval: 800 },
            'deep': { interval: 900 },
            'weak': { interval: 1000 },
            'strong': { interval: 750 },
            'hidden': { interval: 1500 },
            'slippery': { interval: 770 },
            'rough': { interval: 850 },
            'wiry': { interval: 730 },
            'tight': { interval: 700 },
            'soggy': { interval: 1100 }
        };
        
        const pattern = audioPatterns[pulse.id] || { interval: 800 };
        
        this.currentAudioInterval = setInterval(() => {
            this.visualPulseIndicator();
        }, pattern.interval);
        
        // Auto-stop after 10 seconds
        setTimeout(() => {
            this.stopAudioPlayback();
        }, 10000);
    }

    visualPulseIndicator() {
        const audioPlayer = document.getElementById('audioPlayer');
        if (audioPlayer) {
            audioPlayer.style.transform = 'scale(1.02)';
            setTimeout(() => {
                audioPlayer.style.transform = 'scale(1)';
            }, 100);
        }
    }

    animateAudioProgress(duration) {
        const progressFill = document.getElementById('audioProgress');
        if (!progressFill) return;
        
        let progress = 0;
        const increment = 100 / (duration / 100);
        
        this.currentProgressInterval = setInterval(() => {
            progress += increment;
            progressFill.style.width = `${Math.min(progress, 100)}%`;
            
            if (progress >= 100) {
                clearInterval(this.currentProgressInterval);
                this.stopAudioPlayback();
            }
        }, 100);
    }

    toggleAudioPlayback() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (!playPauseBtn) return;
        
        const isPlaying = playPauseBtn.textContent === '⏸️';
        
        if (isPlaying) {
            this.pauseAudioPlayback();
        } else {
            this.resumeAudioPlayback();
        }
    }

    pauseAudioPlayback() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.textContent = '▶️';
        }
        
        if (this.currentAudioInterval) {
            clearInterval(this.currentAudioInterval);
        }
        if (this.currentProgressInterval) {
            clearInterval(this.currentProgressInterval);
        }
    }

    resumeAudioPlayback() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.textContent = '⏸️';
        }
        
        // Resume from current position
        if (this.currentPulse) {
            this.startPulseSimulation(this.currentPulse);
        }
    }

    stopAudioPlayback() {
        this.pauseAudioPlayback();
        
        const progressFill = document.getElementById('audioProgress');
        if (progressFill) {
            progressFill.style.width = '0%';
        }
        
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.textContent = '▶️';
        }
    }

    hideAudioPlayer() {
        const audioPlayer = document.getElementById('audioPlayer');
        if (audioPlayer) {
            audioPlayer.classList.add('hidden');
        }
        this.stopAudioPlayback();
    }

    // Bookmarking
    toggleBookmark() {
        if (!this.currentPulse) return;
        
        const pulseId = this.currentPulse.id;
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        
        if (this.bookmarkedPulses.includes(pulseId)) {
            this.bookmarkedPulses = this.bookmarkedPulses.filter(id => id !== pulseId);
            if (bookmarkBtn) bookmarkBtn.textContent = 'Bookmark';
            this.announceToScreenReader(`Removed ${this.currentPulse.name} from bookmarks`);
        } else {
            this.bookmarkedPulses.push(pulseId);
            if (bookmarkBtn) bookmarkBtn.textContent = '✓ Bookmarked';
            this.announceToScreenReader(`Added ${this.currentPulse.name} to bookmarks`);
        }
        
        this.saveBookmarks();
    }

    togglePulseBookmark(pulseId) {
        const pulse = this.findPulseById(pulseId);
        if (!pulse) return;
        
        if (this.bookmarkedPulses.includes(pulseId)) {
            this.bookmarkedPulses = this.bookmarkedPulses.filter(id => id !== pulseId);
            this.announceToScreenReader(`Removed ${pulse.name} from bookmarks`);
        } else {
            this.bookmarkedPulses.push(pulseId);
            this.announceToScreenReader(`Added ${pulse.name} to bookmarks`);
        }
        
        this.saveBookmarks();
    }

    saveBookmarks() {
        try {
            localStorage.setItem('tcm-pulse-bookmarks', JSON.stringify(this.bookmarkedPulses));
        } catch (e) {
            console.warn('Could not save bookmarks to localStorage:', e);
        }
    }

    loadBookmarks() {
        try {
            const saved = localStorage.getItem('tcm-pulse-bookmarks');
            if (saved) {
                this.bookmarkedPulses = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load bookmarks from localStorage:', e);
        }
    }

    // Comparison
    addToComparison() {
        if (!this.currentPulse) return;
        
        if (!this.comparisonList.find(p => p.id === this.currentPulse.id)) {
            this.comparisonList.push(this.currentPulse);
            this.announceToScreenReader(`Added ${this.currentPulse.name} to comparison`);
            
            // Don't auto-open comparison modal
            if (this.comparisonList.length >= 2) {
                this.announceToScreenReader(`${this.comparisonList.length} pulse types ready for comparison`);
            }
        } else {
            this.announceToScreenReader(`${this.currentPulse.name} is already in comparison`);
        }
    }

    // Reference Features
    showComparisonChart() {
        alert('Comprehensive pulse chart table feature would open here. This would show a detailed comparison matrix of all 28 pulse types with their characteristics, rates, and clinical applications.');
    }

    showClassicalTexts() {
        alert('Classical texts feature would open here. This would display excerpts from traditional TCM literature like the Nei Jing and Mai Jing with translations and commentary.');
    }

    showModernResearch() {
        alert('Modern research feature would open here. This would show contemporary studies, clinical correlations, and scientific research on pulse diagnosis validation.');
    }

    startPracticeQuiz() {
        alert('Practice quiz feature would open here. This would provide an interactive quiz to test pulse identification skills with audio simulations and clinical scenarios.');
    }

    startAudioGuide() {
        alert('Audio guide feature would start here. This would provide narrated guidance through pulse types with pronunciation help and clinical explanations.');
    }

    // Utility Functions
    scrollToSection(sectionClass) {
        const section = document.querySelector(`.${sectionClass}`);
        if (section) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('ariaLive');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    handleGlobalKeyboard(e) {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'f':
                case 'F':
                    e.preventDefault();
                    const searchInput = document.getElementById('pulseSearch');
                    if (searchInput) {
                        searchInput.focus();
                        searchInput.select();
                    }
                    break;
                case 'k':
                case 'K':
                    e.preventDefault();
                    this.clearAllFilters();
                    break;
            }
        }
    }

    debounce(func, wait) {
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
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing TCM Pulse Reference System');
    const pulseReference = new TCMPulseReference();
    pulseReference.init();
    
    // Make available globally
    window.tcmPulseRef = pulseReference;
});

// Fallback initialization
if (document.readyState !== 'loading') {
    console.log('DOM already loaded - Initializing TCM Pulse Reference System immediately');
    setTimeout(() => {
        if (!window.tcmPulseRef) {
            const pulseReference = new TCMPulseReference();
            pulseReference.init();
            window.tcmPulseRef = pulseReference;
        }
    }, 100);
}

// Export for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TCMPulseReference;
}