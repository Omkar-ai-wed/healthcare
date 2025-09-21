// Ayurvedic Consultation Booking Center Application

// Global application state
const ayurvedaBooking = {
    // Booking data from provided JSON
    bookingData: {
        overview: {
            title: "Ayurvedic Consultation Booking Center",
            subtitle: "Professional Guidance • Personalized Care • Ancient Wisdom",
            mission: "Connect with qualified Ayurvedic practitioners for comprehensive constitutional analysis, personalized treatment planning, and holistic wellness guidance based on authentic traditional principles integrated with modern healthcare understanding.",
            statistics: {
                qualifiedPractitioners: "25+ Certified Practitioners Available",
                consultationTypes: "5 Specialized Consultation Formats", 
                clientSatisfaction: "98% Client Satisfaction Rating",
                followUpSupport: "Comprehensive Ongoing Wellness Support",
                practitionerExperience: "5-30 Years Combined Experience",
                medicalIntegration: "Safe Medical Collaboration Protocols"
            }
        },

        consultationTypes: {
            comprehensive: {
                id: "comprehensive",
                name: "Initial Comprehensive Consultation",
                duration: "90-120 minutes",
                priceRange: "$200-$300",
                standardPrice: 250,
                shortDescription: "Complete health assessment and constitutional analysis with personalized treatment plan",
                icon: "🩺"
            },
            constitutional: {
                id: "constitutional", 
                name: "Constitutional Assessment Consultation",
                duration: "60-90 minutes",
                priceRange: "$125-$200",
                standardPrice: 150,
                shortDescription: "In-depth dosha analysis and constitutional balancing for optimal wellness",
                icon: "⚖️"
            },
            specific: {
                id: "specific",
                name: "Specific Health Concern Consultation", 
                duration: "60-75 minutes",
                priceRange: "$150-$225",
                standardPrice: 175,
                shortDescription: "Targeted assessment for specific health issues with complementary treatment approach",
                icon: "🎯"
            },
            followup: {
                id: "followup",
                name: "Follow-Up Consultation",
                duration: "30-45 minutes", 
                priceRange: "$75-$150",
                standardPrice: 100,
                shortDescription: "Progress evaluation and treatment adjustments for established clients",
                icon: "🔄"
            },
            pulse: {
                id: "pulse",
                name: "Traditional Pulse Diagnosis Consultation",
                duration: "45-60 minutes",
                priceRange: "$125-$200",
                standardPrice: 150,
                shortDescription: "Authentic Nadi Pariksha for deep constitutional insights and early imbalance detection",
                icon: "💓"
            }
        },

        practitioners: {
            "sarah-patel": {
                id: "sarah-patel",
                name: "Dr. Sarah Patel",
                credentials: "BAMS, RYT-500, NAMA Certified",
                experience: "15 years clinical practice",
                rating: 4.9,
                reviews: 127,
                specializations: [
                    "Constitutional Medicine and Dosha Balancing",
                    "Women's Health and Hormonal Balance", 
                    "Digestive Disorders and Metabolic Wellness",
                    "Stress Management and Mental Health Support"
                ],
                languages: ["English", "Hindi", "Gujarati"],
                availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                timeSlots: ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"]
            },
            "michael-thompson": {
                id: "michael-thompson",
                name: "Dr. Michael Thompson", 
                credentials: "MAMS, LAc, NAMA Board Certified",
                experience: "12 years clinical practice",
                rating: 4.8,
                reviews: 98,
                specializations: [
                    "Chronic Health Conditions and Complex Cases",
                    "Mental Health and Stress-Related Disorders",
                    "Pain Management and Musculoskeletal Wellness",
                    "Integration with Conventional Medical Care"
                ],
                languages: ["English", "Spanish"],
                availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                timeSlots: ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM"]
            },
            "priya-sharma": {
                id: "priya-sharma",
                name: "Dr. Priya Sharma",
                credentials: "BAMS, PhD, NAMA Fellow",
                experience: "20 years clinical practice and research",
                rating: 4.95,
                reviews: 156,
                specializations: [
                    "Pediatric Ayurveda and Family Wellness",
                    "Geriatric Care and Healthy Aging",
                    "Herbal Medicine and Traditional Formulations",
                    "Classical Ayurvedic Diagnostics and Pulse Reading"
                ],
                languages: ["English", "Hindi", "Sanskrit"],
                availableDays: ["Monday", "Wednesday", "Friday", "Saturday", "Sunday"],
                timeSlots: ["8:00 AM", "9:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "4:00 PM"]
            }
        }
    },

    // Application state
    currentSection: 'hero',
    currentBookingStep: 1,
    selectedConsultationType: null,
    selectedPractitioner: null,
    selectedDate: null,
    selectedTime: null,
    selectedFormat: 'in-person',
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    bookingForm: {}
};

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function formatNotification(message, type = 'info') {
    const iconMap = {
        info: '🕉️',
        success: '✅',
        warning: '⚠️',
        error: '🚨'
    };
    return `${iconMap[type]} ${message}`;
}

// Section Management
function showSection(sectionName) {
    console.log('Showing section:', sectionName);
    
    // Hide all sections
    const sections = document.querySelectorAll('.hero-section, .consultation-types-section, .booking-section, .consultation-process-section, .pricing-section, .safety-standards-section');
    sections.forEach(section => {
        section.classList.remove('active-section');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active-section');
        ayurvedaBooking.currentSection = sectionName;
        
        // Scroll to top of section
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        showNotification(`Navigated to ${sectionName} section`, 'success');
        return true;
    } else {
        console.warn('Section not found:', sectionName);
        showNotification(`Section ${sectionName} not found`, 'error');
        return false;
    }
}

function startBooking() {
    console.log('Starting booking process');
    
    if (showSection('booking')) {
        updateBookingStep(1);
        // Ensure consultation types section is also shown
        showSection('consultation-types');
        showNotification('Select a consultation type to begin booking', 'info');
    }
}

function showConsultationTypes() {
    console.log('Showing consultation types');
    showSection('consultation-types');
    showNotification('Review available consultation types and select the best option for your needs', 'info');
}

// Consultation Type Selection
function selectConsultationType(typeId) {
    console.log('Selecting consultation type:', typeId);
    
    const consultationType = ayurvedaBooking.bookingData.consultationTypes[typeId];
    if (!consultationType) {
        showNotification('Invalid consultation type selected', 'error');
        return;
    }
    
    ayurvedaBooking.selectedConsultationType = consultationType;
    
    // Update selected consultation display
    const selectedConsultationDiv = document.querySelector('.selected-consultation');
    if (selectedConsultationDiv) {
        selectedConsultationDiv.innerHTML = `
            <div class="consultation-selection-display">
                <div class="consultation-header">
                    <span class="consultation-icon">${consultationType.icon}</span>
                    <div class="consultation-details">
                        <h4>${consultationType.name}</h4>
                        <div class="consultation-meta">
                            <span class="duration">${consultationType.duration}</span>
                            <span class="price">${consultationType.priceRange}</span>
                        </div>
                    </div>
                </div>
                <p class="consultation-description">${consultationType.shortDescription}</p>
            </div>
        `;
    }
    
    // Navigate to booking if not already there
    if (ayurvedaBooking.currentSection !== 'booking') {
        showSection('booking');
    }
    
    // Move to next step
    updateBookingStep(2);
    updateBookingSummary();
    
    showNotification(`Selected: ${consultationType.name}`, 'success');
}

// Practitioner Selection
function selectPractitioner(practitionerId) {
    console.log('Selecting practitioner:', practitionerId);
    
    const practitioner = ayurvedaBooking.bookingData.practitioners[practitionerId];
    if (!practitioner) {
        showNotification('Invalid practitioner selected', 'error');
        return;
    }
    
    ayurvedaBooking.selectedPractitioner = practitioner;
    
    // Update visual selection
    document.querySelectorAll('.practitioner-card').forEach(card => {
        card.classList.remove('selected');
    });
    const selectedCard = document.querySelector(`[data-practitioner="${practitionerId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Move to next step
    updateBookingStep(3);
    generateCalendar();
    updateBookingSummary();
    
    showNotification(`Selected: ${practitioner.name}`, 'success');
}

// Booking Step Management
function updateBookingStep(stepNumber) {
    console.log('Updating to booking step:', stepNumber);
    
    ayurvedaBooking.currentBookingStep = stepNumber;
    
    // Update step indicator
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index + 1 <= stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update step content
    document.querySelectorAll('.booking-step').forEach((step, index) => {
        if (index + 1 === stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update navigation buttons
    updateBookingNavigation();
    
    // Scroll to booking section if not visible
    const bookingSection = document.getElementById('booking');
    if (bookingSection && bookingSection.classList.contains('active-section')) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateBookingNavigation() {
    const prevBtn = document.getElementById('prev-step-btn');
    const nextBtn = document.getElementById('next-step-btn');
    const confirmBtn = document.getElementById('confirm-booking-btn');
    
    if (!prevBtn || !nextBtn || !confirmBtn) {
        console.warn('Booking navigation buttons not found');
        return;
    }
    
    // Previous button
    prevBtn.disabled = ayurvedaBooking.currentBookingStep === 1;
    
    // Next/Confirm button
    if (ayurvedaBooking.currentBookingStep === 4) {
        nextBtn.style.display = 'none';
        confirmBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        confirmBtn.style.display = 'none';
        
        // Enable/disable next button based on step completion
        let canProceed = false;
        switch (ayurvedaBooking.currentBookingStep) {
            case 1:
                canProceed = ayurvedaBooking.selectedConsultationType !== null;
                break;
            case 2:
                canProceed = ayurvedaBooking.selectedPractitioner !== null;
                break;
            case 3:
                canProceed = ayurvedaBooking.selectedDate && ayurvedaBooking.selectedTime;
                break;
            default:
                canProceed = true;
        }
        nextBtn.disabled = !canProceed;
    }
}

function nextBookingStep() {
    if (ayurvedaBooking.currentBookingStep < 4) {
        updateBookingStep(ayurvedaBooking.currentBookingStep + 1);
        
        if (ayurvedaBooking.currentBookingStep === 4) {
            // Update format selection
            const formatInput = document.querySelector('input[name="format"]:checked');
            if (formatInput) {
                ayurvedaBooking.selectedFormat = formatInput.value;
            }
            updateBookingSummary();
        }
        
        showNotification('Proceeded to next step', 'info');
    }
}

function previousBookingStep() {
    if (ayurvedaBooking.currentBookingStep > 1) {
        updateBookingStep(ayurvedaBooking.currentBookingStep - 1);
        showNotification('Returned to previous step', 'info');
    }
}

// Calendar Management
function generateCalendar() {
    console.log('Generating calendar for:', ayurvedaBooking.currentMonth, ayurvedaBooking.currentYear);
    
    const calendarGrid = document.querySelector('.calendar-grid');
    const monthHeader = document.querySelector('.current-month');
    
    if (!calendarGrid || !monthHeader) {
        console.warn('Calendar elements not found');
        return;
    }
    
    // Update month header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    monthHeader.textContent = `${monthNames[ayurvedaBooking.currentMonth]} ${ayurvedaBooking.currentYear}`;
    
    // Clear existing calendar days
    const existingDays = calendarGrid.querySelectorAll('.calendar-day');
    existingDays.forEach(day => day.remove());
    
    // Get first day of month and number of days
    const firstDay = new Date(ayurvedaBooking.currentYear, ayurvedaBooking.currentMonth, 1).getDay();
    const daysInMonth = new Date(ayurvedaBooking.currentYear, ayurvedaBooking.currentMonth + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        const dayDate = new Date(ayurvedaBooking.currentYear, ayurvedaBooking.currentMonth, day);
        dayDate.setHours(0, 0, 0, 0);
        
        // Disable past dates
        if (dayDate < today) {
            dayElement.classList.add('disabled');
        } else if (isDateAvailable(dayDate)) {
            dayElement.classList.add('available');
            dayElement.addEventListener('click', () => selectDate(dayDate));
            dayElement.style.cursor = 'pointer';
        } else {
            dayElement.classList.add('disabled');
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

function isDateAvailable(date) {
    if (!ayurvedaBooking.selectedPractitioner) return false;
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return ayurvedaBooking.selectedPractitioner.availableDays.includes(dayName);
}

function selectDate(date) {
    console.log('Selecting date:', date);
    
    ayurvedaBooking.selectedDate = date;
    
    // Update visual selection
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Find and select the clicked day
    const dayElements = document.querySelectorAll('.calendar-day.available');
    dayElements.forEach(dayEl => {
        if (parseInt(dayEl.textContent) === date.getDate()) {
            dayEl.classList.add('selected');
        }
    });
    
    // Generate time slots
    generateTimeSlots();
    updateBookingNavigation();
    updateBookingSummary();
    
    showNotification(`Selected date: ${formatDate(date)}`, 'success');
}

function generateTimeSlots() {
    const timeSlotsContainer = document.querySelector('.time-slots');
    const prompt = document.querySelector('.select-date-prompt');
    
    if (!timeSlotsContainer) {
        console.warn('Time slots container not found');
        return;
    }
    
    if (!ayurvedaBooking.selectedPractitioner || !ayurvedaBooking.selectedDate) {
        return;
    }
    
    if (prompt) {
        prompt.style.display = 'none';
    }
    timeSlotsContainer.innerHTML = '';
    
    ayurvedaBooking.selectedPractitioner.timeSlots.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = time;
        timeSlot.style.cursor = 'pointer';
        timeSlot.addEventListener('click', () => selectTime(time, timeSlot));
        timeSlotsContainer.appendChild(timeSlot);
    });
    
    console.log('Generated time slots for', ayurvedaBooking.selectedPractitioner.name);
}

function selectTime(time, element) {
    console.log('Selecting time:', time);
    
    ayurvedaBooking.selectedTime = time;
    
    // Update visual selection
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    if (element) {
        element.classList.add('selected');
    }
    
    updateBookingNavigation();
    updateBookingSummary();
    
    showNotification(`Selected time: ${time}`, 'success');
}

function previousMonth() {
    if (ayurvedaBooking.currentMonth === 0) {
        ayurvedaBooking.currentMonth = 11;
        ayurvedaBooking.currentYear--;
    } else {
        ayurvedaBooking.currentMonth--;
    }
    generateCalendar();
    showNotification('Previous month', 'info');
}

function nextMonth() {
    if (ayurvedaBooking.currentMonth === 11) {
        ayurvedaBooking.currentMonth = 0;
        ayurvedaBooking.currentYear++;
    } else {
        ayurvedaBooking.currentMonth++;
    }
    generateCalendar();
    showNotification('Next month', 'info');
}

// Booking Summary Management
function updateBookingSummary() {
    console.log('Updating booking summary');
    
    // Update consultation type
    const consultationElement = document.getElementById('summary-consultation');
    if (consultationElement) {
        consultationElement.textContent = ayurvedaBooking.selectedConsultationType 
            ? ayurvedaBooking.selectedConsultationType.name 
            : 'Not selected';
    }
    
    // Update practitioner
    const practitionerElement = document.getElementById('summary-practitioner');
    if (practitionerElement) {
        practitionerElement.textContent = ayurvedaBooking.selectedPractitioner 
            ? ayurvedaBooking.selectedPractitioner.name 
            : 'Not selected';
    }
    
    // Update date and time
    const datetimeElement = document.getElementById('summary-datetime');
    if (datetimeElement) {
        if (ayurvedaBooking.selectedDate && ayurvedaBooking.selectedTime) {
            datetimeElement.textContent = `${formatDate(ayurvedaBooking.selectedDate)} at ${ayurvedaBooking.selectedTime}`;
        } else if (ayurvedaBooking.selectedDate) {
            datetimeElement.textContent = `${formatDate(ayurvedaBooking.selectedDate)} - Select time`;
        } else {
            datetimeElement.textContent = 'Not selected';
        }
    }
    
    // Update format
    const formatElement = document.getElementById('summary-format');
    if (formatElement) {
        formatElement.textContent = ayurvedaBooking.selectedFormat === 'in-person' ? 'In-Person' : 'Telemedicine';
    }
    
    // Update cost
    const costElement = document.getElementById('summary-cost');
    if (costElement) {
        if (ayurvedaBooking.selectedConsultationType) {
            costElement.textContent = formatCurrency(ayurvedaBooking.selectedConsultationType.standardPrice);
        } else {
            costElement.textContent = '$0';
        }
    }
}

// Form Management
function collectFormData() {
    const form = document.getElementById('booking-form');
    if (!form) return {};
    
    ayurvedaBooking.bookingForm = {
        firstName: document.getElementById('firstName')?.value || '',
        lastName: document.getElementById('lastName')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        healthConcerns: document.getElementById('healthConcerns')?.value || '',
        medications: document.getElementById('medications')?.value || '',
        specialNeeds: document.getElementById('specialNeeds')?.value || ''
    };
    
    return ayurvedaBooking.bookingForm;
}

function validateBookingForm() {
    const formData = collectFormData();
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    
    for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            showNotification(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`, 'warning');
            
            // Focus the field
            const fieldElement = document.getElementById(field);
            if (fieldElement) {
                fieldElement.focus();
                fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            return false;
        }
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'warning');
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.focus();
        }
        return false;
    }
    
    return true;
}

// Booking Confirmation
function confirmBooking() {
    console.log('Confirming booking');
    
    if (!validateBookingForm()) {
        return;
    }
    
    if (!ayurvedaBooking.selectedConsultationType || !ayurvedaBooking.selectedPractitioner || 
        !ayurvedaBooking.selectedDate || !ayurvedaBooking.selectedTime) {
        showNotification('Please complete all booking steps before confirming', 'warning');
        return;
    }
    
    const formData = collectFormData();
    
    // Simulate booking process
    const bookingData = {
        consultation: ayurvedaBooking.selectedConsultationType,
        practitioner: ayurvedaBooking.selectedPractitioner,
        date: ayurvedaBooking.selectedDate,
        time: ayurvedaBooking.selectedTime,
        format: ayurvedaBooking.selectedFormat,
        client: formData,
        totalCost: ayurvedaBooking.selectedConsultationType.standardPrice,
        bookingId: generateBookingId(),
        timestamp: new Date().toISOString()
    };
    
    // Show confirmation
    showBookingConfirmation(bookingData);
}

function generateBookingId() {
    return 'AYU-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

function showBookingConfirmation(bookingData) {
    const confirmationHTML = `
        <div class="booking-confirmation-modal">
            <div class="confirmation-content">
                <div class="confirmation-header">
                    <span class="confirmation-icon">✅</span>
                    <h2>Booking Confirmed!</h2>
                    <p class="booking-id">Booking ID: ${bookingData.bookingId}</p>
                </div>
                
                <div class="confirmation-details">
                    <div class="detail-item">
                        <span class="detail-label">Consultation:</span>
                        <span class="detail-value">${bookingData.consultation.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Practitioner:</span>
                        <span class="detail-value">${bookingData.practitioner.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Date & Time:</span>
                        <span class="detail-value">${formatDate(bookingData.date)} at ${bookingData.time}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Format:</span>
                        <span class="detail-value">${bookingData.format === 'in-person' ? 'In-Person' : 'Telemedicine'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Total Cost:</span>
                        <span class="detail-value">${formatCurrency(bookingData.totalCost)}</span>
                    </div>
                </div>
                
                <div class="confirmation-next-steps">
                    <h3>What's Next?</h3>
                    <ul>
                        <li>📧 Confirmation email sent to ${bookingData.client.email}</li>
                        <li>📋 Pre-consultation forms will be sent within 24 hours</li>
                        <li>📞 Practitioner will contact you 1-2 days before appointment</li>
                        <li>🕉️ Begin your Ayurvedic wellness journey!</li>
                    </ul>
                </div>
                
                <div class="confirmation-actions">
                    <button class="btn btn--primary btn--lg" onclick="closeConfirmation()">
                        Continue Exploring
                    </button>
                    <button class="btn btn--outline btn--lg" onclick="downloadConfirmation()">
                        📄 Download Confirmation
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add to page
    const modal = document.createElement('div');
    modal.className = 'booking-confirmation-overlay';
    modal.innerHTML = confirmationHTML;
    document.body.appendChild(modal);
    
    // Store booking data
    window.lastBookingData = bookingData;
    
    showNotification('Booking confirmed successfully! Check your email for details.', 'success');
}

function closeConfirmation() {
    const overlay = document.querySelector('.booking-confirmation-overlay');
    if (overlay) {
        overlay.remove();
    }
    showSection('hero');
    resetBooking();
}

function downloadConfirmation() {
    if (!window.lastBookingData) {
        showNotification('No booking data available', 'error');
        return;
    }
    
    const bookingData = window.lastBookingData;
    const confirmationText = `
AYURVEDIC CONSULTATION BOOKING CONFIRMATION
==========================================

Booking ID: ${bookingData.bookingId}
Date: ${new Date(bookingData.timestamp).toLocaleDateString()}

CONSULTATION DETAILS:
- Type: ${bookingData.consultation.name}
- Duration: ${bookingData.consultation.duration}
- Practitioner: ${bookingData.practitioner.name}
- Date: ${formatDate(bookingData.date)}
- Time: ${bookingData.time}
- Format: ${bookingData.format === 'in-person' ? 'In-Person' : 'Telemedicine'}
- Cost: ${formatCurrency(bookingData.totalCost)}

CLIENT INFORMATION:
- Name: ${bookingData.client.firstName} ${bookingData.client.lastName}
- Email: ${bookingData.client.email}
- Phone: ${bookingData.client.phone}

NEXT STEPS:
1. Watch for confirmation email within 15 minutes
2. Complete pre-consultation forms when received
3. Maintain dietary journal as requested
4. Prepare health questions and concerns
5. Arrive 15 minutes early (in-person) or test connection (telemedicine)

CONTACT INFORMATION:
Phone: (555) 123-AYUR (2987)
Email: booking@ayurvedaconsultations.com

Thank you for choosing our Ayurvedic Consultation Center!
    `;
    
    const blob = new Blob([confirmationText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `ayurveda-booking-confirmation-${bookingData.bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    showNotification('Booking confirmation downloaded', 'success');
}

function resetBooking() {
    ayurvedaBooking.selectedConsultationType = null;
    ayurvedaBooking.selectedPractitioner = null;
    ayurvedaBooking.selectedDate = null;
    ayurvedaBooking.selectedTime = null;
    ayurvedaBooking.selectedFormat = 'in-person';
    ayurvedaBooking.currentBookingStep = 1;
    ayurvedaBooking.bookingForm = {};
    
    // Reset form
    const form = document.getElementById('booking-form');
    if (form) form.reset();
    
    // Reset visual selections
    document.querySelectorAll('.selected').forEach(element => {
        element.classList.remove('selected');
    });
    
    // Reset selected consultation display
    const selectedConsultationDiv = document.querySelector('.selected-consultation');
    if (selectedConsultationDiv) {
        selectedConsultationDiv.innerHTML = `
            <p class="select-consultation-prompt">Please select a consultation type from above to continue.</p>
        `;
    }
    
    updateBookingStep(1);
    updateBookingSummary();
    console.log('Booking reset');
}

// Pricing Management
function showPricingTab(tabName) {
    // Remove active from all tabs and panels
    document.querySelectorAll('.pricing-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.pricing-tabs .tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Add active to selected tab and panel
    if (event && event.target) {
        event.target.classList.add('active');
    }
    const panel = document.getElementById(`${tabName}-tab`);
    if (panel) {
        panel.classList.add('active');
    }
    
    showNotification(`Viewing ${tabName} pricing`, 'info');
}

function selectPackage(packageType) {
    console.log('Selecting package:', packageType);
    showNotification(`Package selection: ${packageType} (demo functionality)`, 'info');
}

// Professional Services Functions
function showPractitioner(practitionerId) {
    console.log('Showing practitioner details:', practitionerId);
    const practitioner = ayurvedaBooking.bookingData.practitioners[practitionerId];
    if (practitioner) {
        showNotification(`${practitioner.name} - ${practitioner.credentials}`, 'info');
    }
}

function showBusinessHours() {
    showNotification('Business Hours: Consultations Mon-Sat 8AM-7PM, Sun 9AM-5PM | Customer Service Mon-Fri 9AM-6PM', 'info');
}

function showSupportOptions() {
    showNotification('Support: Phone (555) 123-AYUR, Email booking@ayurvedaconsultations.com, Live Chat during business hours', 'info');
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `ayurveda-notification ayurveda-notification--${type}`;
    
    const iconMap = {
        info: '🕉️',
        success: '✅',
        warning: '⚠️',
        error: '🚨'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${iconMap[type] || '🕉️'}</span>
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
        border: 2px solid var(--color-saffron);
        border-radius: var(--ayurveda-border-radius, 12px);
        padding: 12px 16px;
        box-shadow: 0 4px 20px rgba(139, 69, 19, 0.15);
        max-width: 400px;
        animation: slideInAyurveda 0.4s ease-out;
        font-size: 14px;
        line-height: 1.5;
    `;
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutAyurveda 0.4s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }
    }, 5000);
}

// Initialize Application
function initializeAyurvedaBooking() {
    console.log('Initializing Ayurvedic Consultation Booking Center...');
    
    // Display booking overview
    console.log('Booking Overview:', {
        title: ayurvedaBooking.bookingData.overview.title,
        practitioners: Object.keys(ayurvedaBooking.bookingData.practitioners).length,
        consultationTypes: Object.keys(ayurvedaBooking.bookingData.consultationTypes).length,
        mission: ayurvedaBooking.bookingData.overview.mission
    });
    
    // Initialize calendar
    generateCalendar();
    
    // Set up format change listeners
    document.querySelectorAll('input[name="format"]').forEach(input => {
        input.addEventListener('change', function() {
            ayurvedaBooking.selectedFormat = this.value;
            updateBookingSummary();
        });
    });
    
    // Update booking summary initially
    updateBookingSummary();
    updateBookingNavigation();
    
    // Ensure hero section is shown by default
    showSection('hero');
    
    console.log('Ayurvedic Consultation Booking Center initialized successfully');
}

// Global function exports for onclick handlers
window.startBooking = startBooking;
window.showConsultationTypes = showConsultationTypes;
window.selectConsultationType = selectConsultationType;
window.selectPractitioner = selectPractitioner;
window.nextBookingStep = nextBookingStep;
window.previousBookingStep = previousBookingStep;
window.previousMonth = previousMonth;
window.nextMonth = nextMonth;
window.confirmBooking = confirmBooking;
window.closeConfirmation = closeConfirmation;
window.downloadConfirmation = downloadConfirmation;
window.showPricingTab = showPricingTab;
window.selectPackage = selectPackage;
window.showPractitioner = showPractitioner;
window.showBusinessHours = showBusinessHours;
window.showSupportOptions = showSupportOptions;

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Ayurvedic Consultation Booking...');
    
    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        initializeAyurvedaBooking();
        
        // Welcome notification
        setTimeout(() => {
            showNotification('🕉️ Welcome to Ayurvedic Consultation Booking. Connect with qualified practitioners for personalized wellness guidance.', 'success');
        }, 500);
    }, 100);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Ayurvedic Consultation Booking loaded in ${loadTime.toFixed(2)}ms`);
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('Ayurvedic Booking Error:', event.error);
    showNotification('A system error occurred. Booking functionality remains available. Please refresh if problems persist.', 'error');
});

// Add notification and modal styles
const bookingStyle = document.createElement('style');
bookingStyle.textContent = `
    @keyframes slideInAyurveda {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutAyurveda {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .ayurveda-notification {
        font-family: var(--font-family-base, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
        color: var(--color-text, #134252);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .notification-icon {
        font-size: 16px;
        flex-shrink: 0;
    }
    
    .notification-message {
        flex: 1;
        font-size: 14px;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #777;
        padding: 0;
        line-height: 1;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }
    
    .notification-close:hover {
        color: #333;
        background: rgba(0, 0, 0, 0.1);
    }
    
    .booking-confirmation-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        animation: fadeIn 0.3s ease-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .booking-confirmation-modal {
        background: var(--color-surface, white);
        border-radius: var(--ayurveda-border-radius, 12px);
        padding: 32px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.4s ease-out;
    }
    
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .confirmation-header {
        text-align: center;
        margin-bottom: 24px;
        border-bottom: 2px solid var(--color-saffron, #FF9933);
        padding-bottom: 20px;
    }
    
    .confirmation-icon {
        font-size: 4rem;
        margin-bottom: 16px;
    }
    
    .confirmation-header h2 {
        color: var(--color-saffron, #FF9933);
        margin: 0 0 8px 0;
        font-size: 2rem;
    }
    
    .booking-id {
        font-family: var(--font-family-mono, monospace);
        color: var(--color-text-secondary, #626970);
        font-size: 14px;
        margin: 0;
    }
    
    .confirmation-details {
        margin-bottom: 24px;
    }
    
    .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid rgba(139, 69, 19, 0.1);
    }
    
    .detail-label {
        font-weight: 500;
        color: var(--color-text-secondary, #626970);
    }
    
    .detail-value {
        font-weight: 600;
        color: var(--color-text, #134252);
        text-align: right;
    }
    
    .confirmation-next-steps {
        background: rgba(255, 153, 51, 0.08);
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 24px;
    }
    
    .confirmation-next-steps h3 {
        color: var(--color-saffron, #FF9933);
        margin: 0 0 16px 0;
        font-size: 1.2rem;
    }
    
    .confirmation-next-steps ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .confirmation-next-steps li {
        margin-bottom: 8px;
        color: var(--color-text, #134252);
        font-size: 14px;
    }
    
    .confirmation-actions {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .consultation-selection-display {
        background: rgba(255, 153, 51, 0.08);
        border: 2px solid var(--color-saffron, #FF9933);
        border-radius: 12px;
        padding: 20px;
    }
    
    .consultation-selection-display .consultation-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 12px;
    }
    
    .consultation-selection-display .consultation-icon {
        font-size: 2.5rem;
    }
    
    .consultation-selection-display h4 {
        color: var(--color-saffron, #FF9933);
        margin: 0 0 8px 0;
        font-size: 1.2rem;
    }
    
    .consultation-selection-display .consultation-meta {
        display: flex;
        gap: 12px;
    }
    
    .consultation-selection-display .duration,
    .consultation-selection-display .price {
        background: rgba(255, 153, 51, 0.15);
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .consultation-selection-display .consultation-description {
        color: var(--color-text, #134252);
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
    }
`;
document.head.appendChild(bookingStyle);

console.log('Ayurvedic Consultation Booking Center JavaScript loaded successfully 🕉️💫🌱');