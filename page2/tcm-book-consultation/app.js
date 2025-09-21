// TCM Consultation Booking System - Interactive Application

class TCMBookingSystem {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 6;
        this.bookingData = {
            consultationType: null,
            practitioner: null,
            date: null,
            time: null,
            patientInfo: {},
            price: 0
        };
        
        // Mock practitioner data with schedules
        this.practitioners = {
            'dr-li': {
                id: 'dr-li',
                name: 'Dr. Li Wei Chen',
                title: 'Senior TCM Practitioner',
                specialties: ['Constitutional Analysis', 'Herbal Medicine'],
                languages: ['English', 'Mandarin'],
                rating: 4.9,
                consultationTypes: ['initial', 'pattern-specific', 'herbal', 'follow-up'],
                schedule: this.generateMockSchedule()
            },
            'dr-wang': {
                id: 'dr-wang',
                name: 'Dr. Sarah Wang',
                title: 'Acupuncture & Pattern Specialist',
                specialties: ['Acupuncture', 'Five Elements'],
                languages: ['English', 'Cantonese'],
                rating: 4.8,
                consultationTypes: ['initial', 'pattern-specific', 'acupuncture', 'telehealth'],
                schedule: this.generateMockSchedule()
            },
            'dr-liu': {
                id: 'dr-liu',
                name: 'Dr. James Liu',
                title: 'Herbal Medicine Expert',
                specialties: ['Herbal Formulas', 'Telehealth'],
                languages: ['English'],
                rating: 4.9,
                consultationTypes: ['herbal', 'telehealth', 'follow-up'],
                schedule: this.generateMockSchedule()
            },
            'dr-zhang': {
                id: 'dr-zhang',
                name: 'Dr. Mei Zhang',
                title: "Women's Health & Qi Specialist",
                specialties: ["Women's Health", 'Qi Circulation'],
                languages: ['English', 'Mandarin'],
                rating: 5.0,
                consultationTypes: ['initial', 'pattern-specific', 'follow-up', 'telehealth'],
                schedule: this.generateMockSchedule()
            }
        };

        // Consultation type data
        this.consultationTypes = {
            initial: {
                name: 'Initial Comprehensive',
                duration: '90-120 minutes',
                price: { min: 180, max: 280 },
                description: 'Complete constitutional assessment with personalized treatment plan'
            },
            'pattern-specific': {
                name: 'Pattern-Specific',
                duration: '60-75 minutes',
                price: { min: 120, max: 200 },
                description: 'Focused pattern analysis for specific conditions'
            },
            herbal: {
                name: 'Herbal Medicine',
                duration: '45-60 minutes',
                price: { min: 100, max: 180 },
                description: 'Custom herbal prescriptions and consultations'
            },
            acupuncture: {
                name: 'Acupuncture Planning',
                duration: '60 minutes',
                price: { min: 150, max: 220 },
                description: 'Acupuncture treatment planning and point prescription'
            },
            'follow-up': {
                name: 'Follow-Up',
                duration: '30-45 minutes',
                price: { min: 80, max: 140 },
                description: 'Progress evaluation and treatment adjustments'
            },
            telehealth: {
                name: 'Telehealth',
                duration: '60-90 minutes',
                price: { min: 100, max: 200 },
                description: 'Remote consultation via secure video platform'
            }
        };

        this.calendar = null;
        this.isInitialized = false;
    }

    init() {
        console.log('Initializing TCM Booking System...');
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            // DOM is already loaded
            setTimeout(() => this.initializeComponents(), 100);
        }
    }

    initializeComponents() {
        if (this.isInitialized) {
            console.log('Already initialized, skipping...');
            return;
        }
        
        console.log('Initializing components...');
        this.initializeNavigation();
        this.initializeThemeToggle();
        this.initializeBookingTriggers();
        this.initializeInfoTabs();
        this.initializeContactFeatures();
        this.initializeAccessibility();
        this.isInitialized = true;
        console.log('TCM Booking System initialized successfully');
    }

    generateMockSchedule() {
        // Generate availability for next 30 days
        const schedule = {};
        const today = new Date();
        
        for (let i = 1; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Skip weekends for some variety
            if (date.getDay() === 0 || date.getDay() === 6) continue;
            
            const dateStr = date.toISOString().split('T')[0];
            const timeSlots = [];
            
            // Morning slots (9 AM - 12 PM)
            const morningSlots = ['09:00', '10:30', '11:30'];
            // Afternoon slots (2 PM - 6 PM)  
            const afternoonSlots = ['14:00', '15:30', '16:30', '17:30'];
            
            // Randomly make some slots unavailable
            [...morningSlots, ...afternoonSlots].forEach(time => {
                if (Math.random() > 0.3) { // 70% chance of availability
                    timeSlots.push({
                        time: time,
                        available: true
                    });
                }
            });
            
            if (timeSlots.length > 0) {
                schedule[dateStr] = timeSlots;
            }
        }
        
        return schedule;
    }

    initializeNavigation() {
        console.log('Initializing navigation...');
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.updateActiveNav(targetId);
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', this.debounce(() => this.updateActiveNavOnScroll(), 100));
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNav(activeId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            this.updateActiveNav(currentSection);
        }
    }

    initializeThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (themeToggle) {
            // Check saved theme preference or default to light
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

    initializeBookingTriggers() {
        console.log('Initializing booking triggers...');
        
        // Main CTA button - multiple attempts to find it
        let scheduleNowBtn = document.getElementById('scheduleNowBtn');
        
        if (!scheduleNowBtn) {
            // Try alternative selectors
            scheduleNowBtn = document.querySelector('.cta-button');
            if (!scheduleNowBtn) {
                scheduleNowBtn = document.querySelector('[id*="schedule"], [class*="schedule"], button[class*="cta"]');
            }
        }
        
        if (scheduleNowBtn) {
            console.log('Schedule Now button found, adding click listener');
            scheduleNowBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Schedule Now button clicked');
                this.startBookingProcess();
            });
        } else {
            console.error('Schedule Now button not found - will add listeners to all CTA buttons');
            // Fallback: add listeners to any button that might be a CTA
            const ctaButtons = document.querySelectorAll('button');
            ctaButtons.forEach(btn => {
                if (btn.textContent.toLowerCase().includes('schedule') || 
                    btn.textContent.toLowerCase().includes('book') ||
                    btn.classList.contains('cta-button')) {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('CTA button clicked:', btn.textContent);
                        this.startBookingProcess();
                    });
                }
            });
        }

        // Consultation select buttons
        const consultationBtns = document.querySelectorAll('.consultation-select-btn');
        console.log(`Found ${consultationBtns.length} consultation select buttons`);
        
        consultationBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const consultationType = e.target.getAttribute('data-type');
                console.log('Consultation select button clicked:', consultationType);
                this.startBookingProcess(consultationType);
            });
        });

        // Initialize booking wizard navigation
        this.initializeBookingWizard();
    }

    startBookingProcess(preselectedType = null) {
        console.log('Starting booking process with type:', preselectedType);
        
        // Check if modal exists, if not create it
        let bookingModal = document.getElementById('bookingModal');
        if (!bookingModal) {
            console.log('Booking modal not found, creating it...');
            this.createBookingModal();
            bookingModal = document.getElementById('bookingModal');
        }
        
        if (bookingModal) {
            this.startBookingWizard(preselectedType);
        } else {
            console.error('Could not create or find booking modal');
            // Fallback: use the existing booking widget
            this.useExistingBookingWidget(preselectedType);
        }
    }

    createBookingModal() {
        const modalHTML = `
            <div id="bookingModal" class="modal hidden" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <div class="modal-overlay" id="modalOverlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="modalTitle">Book Consultation</h3>
                        <button class="modal-close" id="modalClose" aria-label="Close modal">&times;</button>
                    </div>
                    <div class="modal-body" id="modalBody">
                        <!-- Booking wizard content will be inserted here -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Initialize modal handlers
        this.initializeModalHandlers();
    }

    useExistingBookingWidget(preselectedType = null) {
        console.log('Using existing booking widget');
        
        // Find the existing booking content area
        const bookingContent = document.getElementById('bookingContent');
        if (bookingContent) {
            // Reset booking data
            this.currentStep = 0;
            this.bookingData = {
                consultationType: preselectedType,
                practitioner: null,
                date: null,
                time: null,
                patientInfo: {},
                price: 0
            };
            
            // Render first step in the existing widget
            this.renderBookingStepInWidget();
            this.updateBookingProgress();
            
            // Scroll to booking section
            this.scrollToSection('schedule');
        } else {
            console.error('No booking interface found');
            alert('Booking system is currently unavailable. Please contact us directly at (555) 123-4567.');
        }
    }

    renderBookingStepInWidget() {
        const bookingContent = document.getElementById('bookingContent');
        if (!bookingContent) return;

        console.log(`Rendering step ${this.currentStep + 1} in widget`);

        let stepContent = '';
        
        switch (this.currentStep) {
            case 0:
                stepContent = this.renderConsultationTypeStep();
                break;
            case 1:
                stepContent = this.renderPractitionerStep();
                break;
            case 2:
                stepContent = this.renderDateStep();
                break;
            case 3:
                stepContent = this.renderTimeStep();
                break;
            case 4:
                stepContent = this.renderPatientInfoStep();
                break;
            case 5:
                stepContent = this.renderConfirmationStep();
                break;
        }

        bookingContent.innerHTML = stepContent;
        
        // Initialize step-specific functionality
        this.initializeCurrentStep();
        
        // Update navigation
        this.updateStepNavigation();
    }

    initializeBookingWizard() {
        console.log('Initializing booking wizard...');
        
        // Initialize booking wizard navigation
        const prevBtn = document.getElementById('prevStepBtn');
        const nextBtn = document.getElementById('nextStepBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.previousStep();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextStep();
            });
        }

        // Modal close handlers
        this.initializeModalHandlers();
    }

    initializeModalHandlers() {
        console.log('Initializing modal handlers...');
        
        // Booking modal
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.getElementById('modalOverlay');
        
        if (modalClose) {
            modalClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('bookingModal');
            });
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('bookingModal');
            });
        }

        // Confirmation modal handlers
        const confirmationClose = document.getElementById('confirmationClose');
        const downloadPrepBtn = document.getElementById('downloadPrepBtn');
        const returnDashboardBtn = document.getElementById('returnDashboardBtn');
        
        if (confirmationClose) {
            confirmationClose.addEventListener('click', () => this.closeModal('confirmationModal'));
        }
        
        if (downloadPrepBtn) {
            downloadPrepBtn.addEventListener('click', () => this.downloadPrepGuide());
        }
        
        if (returnDashboardBtn) {
            returnDashboardBtn.addEventListener('click', () => {
                this.closeModal('confirmationModal');
                this.resetBooking();
                this.scrollToSection('home');
            });
        }

        // Escape key handler for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal:not(.hidden)');
                if (openModal) {
                    this.closeModal(openModal.id);
                }
            }
        });
    }

    showModal(modalId) {
        console.log('Showing modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');
            
            // Focus management
            const firstFocusable = modal.querySelector('button, input, select, textarea, a[href]');
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            console.log('Modal shown successfully');
        } else {
            console.error('Modal not found:', modalId);
        }
    }

    closeModal(modalId) {
        console.log('Closing modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Reset booking if closing booking modal
            if (modalId === 'bookingModal') {
                this.resetBooking();
            }
            console.log('Modal closed successfully');
        }
    }

    startBookingWizard(preselectedType = null) {
        console.log('Starting booking wizard with preselected type:', preselectedType);
        
        // Reset booking data
        this.currentStep = 0;
        this.bookingData = {
            consultationType: preselectedType,
            practitioner: null,
            date: null,
            time: null,
            patientInfo: {},
            price: 0
        };

        // Check if we're using modal or widget
        const bookingModal = document.getElementById('bookingModal');
        if (bookingModal && !bookingModal.classList.contains('hidden')) {
            // Using modal
            this.renderBookingStep();
        } else {
            // Using existing widget
            this.renderBookingStepInWidget();
        }
        
        this.updateBookingProgress();
    }

    renderBookingStep() {
        const modalBody = document.getElementById('modalBody');
        if (!modalBody) {
            console.error('Modal body not found, falling back to widget');
            this.renderBookingStepInWidget();
            return;
        }

        console.log(`Rendering step ${this.currentStep + 1}`);

        let stepContent = this.getStepContent();
        modalBody.innerHTML = stepContent;
        
        // Initialize step-specific functionality
        this.initializeCurrentStep();
        
        // Update navigation
        this.updateStepNavigation();
    }

    getStepContent() {
        switch (this.currentStep) {
            case 0:
                return this.renderConsultationTypeStep();
            case 1:
                return this.renderPractitionerStep();
            case 2:
                return this.renderDateStep();
            case 3:
                return this.renderTimeStep();
            case 4:
                return this.renderPatientInfoStep();
            case 5:
                return this.renderConfirmationStep();
            default:
                return '<p>Step not found</p>';
        }
    }

    renderConsultationTypeStep() {
        const types = this.consultationTypes;
        const selectedType = this.bookingData.consultationType;
        
        return `
            <div class="booking-step active">
                <div class="step-content">
                    <h3>Choose Your Consultation Type</h3>
                    <div class="type-selection">
                        ${Object.entries(types).map(([key, type]) => `
                            <div class="type-option ${selectedType === key ? 'selected' : ''}" 
                                 data-type="${key}" 
                                 role="button" 
                                 tabindex="0"
                                 aria-pressed="${selectedType === key}">
                                <h4>${type.name}</h4>
                                <div class="duration">${type.duration}</div>
                                <div class="price">$${type.price.min}-$${type.price.max}</div>
                                <p class="description">${type.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderPractitionerStep() {
        const availablePractitioners = this.getAvailablePractitioners();
        
        return `
            <div class="booking-step active">
                <div class="step-content">
                    <h3>Select Your Practitioner</h3>
                    <div class="form-group">
                        <label for="practitionerSelect" class="form-label">Available Practitioners</label>
                        <select id="practitionerSelect" class="form-control" required>
                            <option value="">Choose a practitioner...</option>
                            ${availablePractitioners.map(p => `
                                <option value="${p.id}" ${this.bookingData.practitioner === p.id ? 'selected' : ''}>
                                    ${p.name} - ${p.title} (${p.rating}★)
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    
                    ${this.bookingData.practitioner ? this.renderPractitionerDetails() : ''}
                </div>
            </div>
        `;
    }

    renderPractitionerDetails() {
        const practitioner = this.practitioners[this.bookingData.practitioner];
        if (!practitioner) return '';
        
        return `
            <div class="practitioner-details">
                <div class="practitioner-summary">
                    <h4>${practitioner.name}</h4>
                    <p class="title">${practitioner.title}</p>
                    <div class="specialties">
                        ${practitioner.specialties.map(s => `<span class="specialty">${s}</span>`).join('')}
                    </div>
                    <div class="languages">Languages: ${practitioner.languages.join(', ')}</div>
                    <div class="rating">★★★★★ (${practitioner.rating}/5)</div>
                </div>
            </div>
        `;
    }

    renderDateStep() {
        return `
            <div class="booking-step active">
                <div class="step-content">
                    <h3>Choose Your Appointment Date</h3>
                    <div class="form-group">
                        <label for="appointmentDate" class="form-label">Select Date</label>
                        <div class="calendar-container">
                            <input type="date" id="appointmentDate" class="form-control" 
                                   min="${new Date().toISOString().split('T')[0]}"
                                   value="${this.bookingData.date || ''}">
                        </div>
                    </div>
                    <div class="availability-note">
                        <p><strong>Note:</strong> Available dates are shown. Practitioner availability varies by consultation type and schedule.</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderTimeStep() {
        const availableSlots = this.getAvailableTimeSlots();
        
        return `
            <div class="booking-step active">
                <div class="step-content">
                    <h3>Select Appointment Time</h3>
                    <div class="selected-date-info">
                        <p><strong>Selected Date:</strong> ${this.formatDate(this.bookingData.date)}</p>
                        <p><strong>Practitioner:</strong> ${this.practitioners[this.bookingData.practitioner]?.name}</p>
                    </div>
                    <div class="time-slots">
                        ${availableSlots.length > 0 ? 
                            availableSlots.map(slot => `
                                <div class="time-slot ${this.bookingData.time === slot.time ? 'selected' : ''}" 
                                     data-time="${slot.time}"
                                     role="button"
                                     tabindex="0"
                                     aria-pressed="${this.bookingData.time === slot.time}">
                                    ${this.formatTime(slot.time)}
                                </div>
                            `).join('') :
                            '<p class="no-slots">No available time slots for this date. Please select a different date.</p>'
                        }
                    </div>
                </div>
            </div>
        `;
    }

    renderPatientInfoStep() {
        return `
            <div class="booking-step active">
                <div class="step-content">
                    <h3>Patient Information</h3>
                    <form id="patientInfoForm" novalidate>
                        <div class="form-group">
                            <label for="patientName" class="form-label">Full Name *</label>
                            <input type="text" id="patientName" name="name" class="form-control" 
                                   value="${this.bookingData.patientInfo.name || ''}" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="patientEmail" class="form-label">Email Address *</label>
                            <input type="email" id="patientEmail" name="email" class="form-control" 
                                   value="${this.bookingData.patientInfo.email || ''}" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="patientPhone" class="form-label">Phone Number *</label>
                            <input type="tel" id="patientPhone" name="phone" class="form-control" 
                                   value="${this.bookingData.patientInfo.phone || ''}" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="patientTimezone" class="form-label">Timezone</label>
                            <select id="patientTimezone" name="timezone" class="form-control">
                                <option value="EST">Eastern Standard Time (EST)</option>
                                <option value="CST">Central Standard Time (CST)</option>
                                <option value="MST">Mountain Standard Time (MST)</option>
                                <option value="PST">Pacific Standard Time (PST)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="patientNotes" class="form-label">Additional Notes (Optional)</label>
                            <textarea id="patientNotes" name="notes" class="form-control" rows="3" 
                                      placeholder="Any specific concerns or questions you'd like to discuss...">${this.bookingData.patientInfo.notes || ''}</textarea>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    renderConfirmationStep() {
        const consultation = this.consultationTypes[this.bookingData.consultationType];
        const practitioner = this.practitioners[this.bookingData.practitioner];
        const estimatedPrice = Math.round((consultation.price.min + consultation.price.max) / 2);
        
        return `
            <div class="booking-step active">
                <div class="step-content">
                    <h3>Confirm Your Appointment</h3>
                    <div class="booking-summary">
                        <div class="summary-item">
                            <span>Consultation Type:</span>
                            <span>${consultation.name}</span>
                        </div>
                        <div class="summary-item">
                            <span>Duration:</span>
                            <span>${consultation.duration}</span>
                        </div>
                        <div class="summary-item">
                            <span>Practitioner:</span>
                            <span>${practitioner.name}</span>
                        </div>
                        <div class="summary-item">
                            <span>Date & Time:</span>
                            <span>${this.formatDate(this.bookingData.date)} at ${this.formatTime(this.bookingData.time)}</span>
                        </div>
                        <div class="summary-item">
                            <span>Patient:</span>
                            <span>${this.bookingData.patientInfo.name}</span>
                        </div>
                        <div class="summary-item">
                            <span>Contact:</span>
                            <span>${this.bookingData.patientInfo.email}</span>
                        </div>
                        <div class="summary-item total">
                            <span>Estimated Cost:</span>
                            <span>$${estimatedPrice}</span>
                        </div>
                    </div>
                    
                    <div class="payment-section">
                        <h4>Payment Information</h4>
                        <div class="payment-placeholder">
                            <p>🔒 Secure Payment Integration</p>
                            <p>Stripe payment processing would be implemented here</p>
                            <p>For demo purposes, payment is simulated</p>
                        </div>
                        
                        <div class="terms-agreement">
                            <label class="checkbox-label">
                                <input type="checkbox" id="termsAgreement" required>
                                I agree to the <a href="#terms" target="_blank">Terms of Service</a> and <a href="#privacy" target="_blank">Privacy Policy</a>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initializeCurrentStep() {
        switch (this.currentStep) {
            case 0:
                this.initializeConsultationTypeStep();
                break;
            case 1:
                this.initializePractitionerStep();
                break;
            case 2:
                this.initializeDateStep();
                break;
            case 3:
                this.initializeTimeStep();
                break;
            case 4:
                this.initializePatientInfoStep();
                break;
            case 5:
                this.initializeConfirmationStep();
                break;
        }
    }

    initializeConsultationTypeStep() {
        const typeOptions = document.querySelectorAll('.type-option');
        typeOptions.forEach(option => {
            option.addEventListener('click', () => this.selectConsultationType(option));
            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectConsultationType(option);
                }
            });
        });
    }

    selectConsultationType(optionElement) {
        // Remove selection from all options
        document.querySelectorAll('.type-option').forEach(opt => {
            opt.classList.remove('selected');
            opt.setAttribute('aria-pressed', 'false');
        });
        
        // Add selection to clicked option
        optionElement.classList.add('selected');
        optionElement.setAttribute('aria-pressed', 'true');
        
        // Store selection
        this.bookingData.consultationType = optionElement.getAttribute('data-type');
        
        console.log('Selected consultation type:', this.bookingData.consultationType);
        this.updateStepNavigation();
    }

    initializePractitionerStep() {
        const practitionerSelect = document.getElementById('practitionerSelect');
        if (practitionerSelect) {
            practitionerSelect.addEventListener('change', (e) => {
                this.bookingData.practitioner = e.target.value;
                console.log('Selected practitioner:', this.bookingData.practitioner);
                
                // Re-render step to show practitioner details
                if (document.getElementById('modalBody')) {
                    this.renderBookingStep();
                } else {
                    this.renderBookingStepInWidget();
                }
                this.updateStepNavigation();
            });
        }
    }

    initializeDateStep() {
        const dateInput = document.getElementById('appointmentDate');
        if (dateInput) {
            dateInput.addEventListener('change', (e) => {
                this.bookingData.date = e.target.value;
                console.log('Selected date:', this.bookingData.date);
                this.updateStepNavigation();
            });
        }
    }

    initializeTimeStep() {
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.addEventListener('click', () => this.selectTimeSlot(slot));
            slot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectTimeSlot(slot);
                }
            });
        });
    }

    selectTimeSlot(slotElement) {
        // Remove selection from all slots
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
            slot.setAttribute('aria-pressed', 'false');
        });
        
        // Add selection to clicked slot
        slotElement.classList.add('selected');
        slotElement.setAttribute('aria-pressed', 'true');
        
        // Store selection
        this.bookingData.time = slotElement.getAttribute('data-time');
        
        console.log('Selected time:', this.bookingData.time);
        this.updateStepNavigation();
    }

    initializePatientInfoStep() {
        const form = document.getElementById('patientInfoForm');
        if (form) {
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('input', () => this.validatePatientInfo());
                input.addEventListener('blur', () => this.validatePatientInfo());
            });
        }
    }

    initializeConfirmationStep() {
        const termsCheckbox = document.getElementById('termsAgreement');
        if (termsCheckbox) {
            termsCheckbox.addEventListener('change', () => this.updateStepNavigation());
        }
    }

    validatePatientInfo() {
        const form = document.getElementById('patientInfoForm');
        if (!form) return false;

        const formData = new FormData(form);
        const patientInfo = {};
        
        for (let [key, value] of formData.entries()) {
            patientInfo[key] = value.trim();
        }
        
        // Store patient info
        this.bookingData.patientInfo = patientInfo;
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'phone'];
        const isValid = requiredFields.every(field => 
            patientInfo[field] && patientInfo[field].length > 0
        );
        
        // Email validation
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientInfo.email || '');
        
        const valid = isValid && emailValid;
        this.updateStepNavigation();
        return valid;
    }

    getAvailablePractitioners() {
        if (!this.bookingData.consultationType) return Object.values(this.practitioners);
        
        return Object.values(this.practitioners).filter(p => 
            p.consultationTypes.includes(this.bookingData.consultationType)
        );
    }

    getAvailableDates() {
        if (!this.bookingData.practitioner) return [];
        
        const practitioner = this.practitioners[this.bookingData.practitioner];
        return Object.keys(practitioner.schedule);
    }

    getAvailableTimeSlots() {
        if (!this.bookingData.practitioner || !this.bookingData.date) return [];
        
        const practitioner = this.practitioners[this.bookingData.practitioner];
        return practitioner.schedule[this.bookingData.date] || [];
    }

    updateBookingProgress() {
        const progressFill = document.getElementById('bookingProgress');
        const stepIndicator = document.getElementById('stepIndicator');
        
        const progressPercent = ((this.currentStep + 1) / this.totalSteps) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${progressPercent}%`;
        }
        
        if (stepIndicator) {
            const stepNames = [
                'Choose Consultation Type',
                'Select Practitioner', 
                'Choose Date',
                'Pick Time',
                'Enter Details',
                'Confirm & Pay'
            ];
            stepIndicator.textContent = `Step ${this.currentStep + 1} of ${this.totalSteps}: ${stepNames[this.currentStep]}`;
        }
    }

    updateStepNavigation() {
        const prevBtn = document.getElementById('prevStepBtn');
        const nextBtn = document.getElementById('nextStepBtn');
        
        if (prevBtn) {
            prevBtn.style.display = this.currentStep > 0 ? 'inline-flex' : 'none';
        }
        
        if (nextBtn) {
            const canProceed = this.canProceedToNextStep();
            nextBtn.style.display = 'inline-flex';
            nextBtn.disabled = !canProceed;
            
            if (this.currentStep === this.totalSteps - 1) {
                nextBtn.textContent = 'Complete Booking';
                nextBtn.className = 'btn btn--primary';
            } else {
                nextBtn.textContent = 'Next Step';
                nextBtn.className = 'btn btn--primary';
            }
        }
    }

    canProceedToNextStep() {
        switch (this.currentStep) {
            case 0: // Consultation type
                return !!this.bookingData.consultationType;
            case 1: // Practitioner
                return !!this.bookingData.practitioner;
            case 2: // Date
                return !!this.bookingData.date;
            case 3: // Time
                return !!this.bookingData.time;
            case 4: // Patient info
                return this.validatePatientInfo();
            case 5: // Confirmation
                const termsCheckbox = document.getElementById('termsAgreement');
                return termsCheckbox?.checked || false;
            default:
                return false;
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            if (document.getElementById('modalBody')) {
                this.renderBookingStep();
            } else {
                this.renderBookingStepInWidget();
            }
            this.updateBookingProgress();
            console.log('Previous step:', this.currentStep);
        }
    }

    nextStep() {
        if (this.currentStep < this.totalSteps - 1 && this.canProceedToNextStep()) {
            this.currentStep++;
            if (document.getElementById('modalBody')) {
                this.renderBookingStep();
            } else {
                this.renderBookingStepInWidget();
            }
            this.updateBookingProgress();
            console.log('Next step:', this.currentStep);
        } else if (this.currentStep === this.totalSteps - 1 && this.canProceedToNextStep()) {
            // Complete booking
            this.completeBooking();
        }
    }

    completeBooking() {
        console.log('Completing booking...', this.bookingData);
        
        // Show success message
        const confirmationContent = `
            <div class="booking-success">
                <h3>✅ Booking Confirmed!</h3>
                <p>Your consultation has been successfully booked.</p>
                <div class="booking-details">
                    <p><strong>Type:</strong> ${this.consultationTypes[this.bookingData.consultationType].name}</p>
                    <p><strong>Practitioner:</strong> ${this.practitioners[this.bookingData.practitioner].name}</p>
                    <p><strong>Date:</strong> ${this.formatDate(this.bookingData.date)}</p>
                    <p><strong>Time:</strong> ${this.formatTime(this.bookingData.time)}</p>
                </div>
                <p>You will receive a confirmation email shortly with preparation instructions.</p>
                <button class="btn btn--primary" onclick="tcmBookingSystem.resetAndClose()">Close</button>
            </div>
        `;
        
        const bookingContent = document.getElementById('bookingContent');
        const modalBody = document.getElementById('modalBody');
        
        if (modalBody) {
            modalBody.innerHTML = confirmationContent;
        } else if (bookingContent) {
            bookingContent.innerHTML = confirmationContent;
        }
    }

    resetAndClose() {
        this.resetBooking();
        this.closeModal('bookingModal');
        this.scrollToSection('home');
    }

    resetBooking() {
        this.currentStep = 0;
        this.bookingData = {
            consultationType: null,
            practitioner: null,
            date: null,
            time: null,
            patientInfo: {},
            price: 0
        };
        
        if (this.calendar) {
            this.calendar.destroy();
            this.calendar = null;
        }
    }

    initializeInfoTabs() {
        console.log('Initializing info tabs...');
        const tabButtons = document.querySelectorAll('.info-tabs .tab-btn');
        
        console.log(`Found ${tabButtons.length} info tab buttons`);
        
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const targetTab = btn.getAttribute('data-tab');
                console.log('Info tab clicked:', targetTab);
                this.switchInfoTab(targetTab);
            });
        });
    }

    switchInfoTab(targetTab) {
        console.log('Switching info tab to:', targetTab);
        
        // Remove active class from all buttons and panels
        const tabButtons = document.querySelectorAll('.info-tabs .tab-btn');
        const tabPanels = document.querySelectorAll('.info-tabs .tab-panel');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to target button and panel
        const targetButton = document.querySelector(`.info-tabs .tab-btn[data-tab="${targetTab}"]`);
        const targetPanel = document.getElementById(targetTab);
        
        if (targetButton) {
            targetButton.classList.add('active');
            console.log('Target button activated:', targetTab);
        } else {
            console.error('Target button not found:', targetTab);
        }
        
        if (targetPanel) {
            targetPanel.classList.add('active');
            console.log('Target panel activated:', targetTab);
        } else {
            console.error('Target panel not found:', targetTab);
        }
    }

    initializeContactFeatures() {
        const liveChatBtn = document.getElementById('liveChatBtn');
        if (liveChatBtn) {
            liveChatBtn.addEventListener('click', () => {
                // Simulate live chat
                alert('Live chat would be integrated here with a customer support system like Intercom or Zendesk.');
            });
        }
    }

    initializeAccessibility() {
        // Keyboard navigation for custom elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Ensure proper tab order in modals
                this.manageFocusInModal(e);
            }
        });

        // Screen reader announcements for dynamic content
        this.setupAriaLiveRegions();
    }

    manageFocusInModal(e) {
        const openModal = document.querySelector('.modal:not(.hidden)');
        if (!openModal) return;

        const focusableElements = openModal.querySelectorAll(
            'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }

    setupAriaLiveRegions() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        document.body.appendChild(liveRegion);
    }

    downloadPrepGuide() {
        const consultation = this.consultationTypes[this.bookingData.consultationType];
        const practitioner = this.practitioners[this.bookingData.practitioner];
        
        const prepGuideContent = `
TCM CONSULTATION PREPARATION GUIDE
Appointment Date: ${this.formatDate(this.bookingData.date)} at ${this.formatTime(this.bookingData.time)}
Practitioner: ${practitioner.name}
Consultation Type: ${consultation.name}

PREPARATION CHECKLIST:
□ Complete pre-consultation health history form
□ List all current medications, supplements, and herbal remedies
□ Note specific symptoms, concerns, or health goals
□ Prepare questions about your health and treatment options
□ For telehealth: Test video/audio connection and ensure private space
□ Have pen and paper ready for notes

WHAT TO EXPECT:
- Constitutional assessment based on TCM principles
- Discussion of your health history and current concerns
- Examination of tongue, pulse, and other diagnostic indicators
- Personalized treatment recommendations
- Lifestyle and dietary guidance
- Follow-up planning if needed

AFTER YOUR CONSULTATION:
- You will receive a summary of recommendations via email
- Follow prescribed treatments and lifestyle modifications
- Schedule follow-up appointments as recommended
- Contact the practitioner with any questions

For questions or changes to your appointment, please contact:
Phone: (555) 123-4567
Email: support@tcmpattern.com

© 2025 TCM Pattern Recognition Platform
        `;
        
        const blob = new Blob([prepGuideContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `TCM_Consultation_Prep_Guide_${this.bookingData.date}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Utility functions
    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatTime(timeStr) {
        if (!timeStr) return '';
        const [hours, minutes] = timeStr.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
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

// Initialize the booking system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing TCM Booking System');
    const bookingSystem = new TCMBookingSystem();
    bookingSystem.init();
    
    // Make available globally for debugging
    window.tcmBookingSystem = bookingSystem;
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState !== 'loading') {
    console.log('DOM already loaded - Initializing TCM Booking System immediately');
    setTimeout(() => {
        if (!window.tcmBookingSystem) {
            const bookingSystem = new TCMBookingSystem();
            bookingSystem.init();
            window.tcmBookingSystem = bookingSystem;
        }
    }, 100);
}

// Export for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TCMBookingSystem;
}