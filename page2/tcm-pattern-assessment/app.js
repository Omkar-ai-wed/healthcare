// TCM Pattern Recognition Assessment - Interactive Application

// Assessment Data and State Management
class TCMAssessment {
    constructor() {
        this.currentQuestionIndex = 0;
        this.responses = {};
        this.scores = {
            yin: 0,
            yang: 0,
            balanced: 0,
            elements: {
                wood: { dominant: 0, deficient: 0, balanced: 0 },
                fire: { dominant: 0, deficient: 0, balanced: 0 },
                earth: { dominant: 0, deficient: 0, balanced: 0 },
                metal: { dominant: 0, deficient: 0, balanced: 0 },
                water: { dominant: 0, deficient: 0, balanced: 0 }
            },
            qi: { stagnant: 0, deficient: 0, balanced: 0 },
            traditional: { imbalanced: 0, balanced: 0 },
            lifestyle: { stressed: 0, balanced: 0 }
        };
        
        this.allQuestions = this.initializeQuestions();
        this.currentSection = 'yinyang';
        this.sectionQuestionCounts = {
            yinyang: 15,
            elements: 25,
            traditional: 10,
            qi: 10,
            lifestyle: 10
        };
    }

    init() {
        console.log('Initializing TCM Assessment...');
        this.initializeNavigation();
        this.initializeAssessment();
        this.initializeResultsTabs();
        this.initializeEventListeners();
        this.initializeLiveAnalysis();
        console.log('TCM Assessment initialized successfully');
    }

    initializeQuestions() {
        // Comprehensive TCM Assessment Questions based on the provided data
        return [
            // Yin/Yang Balance Questions (15 questions)
            {
                id: 'overall_energy',
                section: 'yinyang',
                question: 'How would you describe your overall energy pattern throughout life?',
                options: {
                    yang: 'High energy, always active, warm, outgoing, prefer constant activity',
                    yin: 'Lower energy, quiet, cool, introspective, prefer rest and contemplation',
                    balanced: 'Moderate energy with natural rhythms, adaptable to situations'
                }
            },
            {
                id: 'temperature_preference',
                section: 'yinyang',
                question: 'What are your natural body temperature preferences?',
                options: {
                    yang: 'Always warm, prefer cool environments, dislike cold weather',
                    yin: 'Often feel cold, seek warmth, comfortable in warm environments',
                    balanced: 'Adapt well to temperature changes, moderate preferences'
                }
            },
            {
                id: 'activity_motivation',
                section: 'yinyang',
                question: 'How do you approach physical activity and motivation?',
                options: {
                    yang: 'High activity levels, restless, always moving, driven personality',
                    yin: 'Prefer quiet activities, contemplative, slower-paced lifestyle',
                    balanced: 'Active when needed, restful when appropriate'
                }
            },
            {
                id: 'social_energy',
                section: 'yinyang',
                question: 'How do you typically interact in social situations?',
                options: {
                    yang: 'Outgoing, social, speak loudly, enjoy large groups',
                    yin: 'Introverted, quiet, speak softly, prefer small gatherings',
                    balanced: 'Socially adaptable, comfortable in various settings'
                }
            },
            {
                id: 'sleep_patterns',
                section: 'yinyang',
                question: 'What describes your natural sleep and rest patterns?',
                options: {
                    yang: 'Light sleeper, need less sleep, wake early, active dreams',
                    yin: 'Deep sleeper, need more sleep, slow to wake, peaceful sleep',
                    balanced: 'Regular sleep patterns, refreshed upon waking'
                }
            },
            {
                id: 'emotional_expression',
                section: 'yinyang',
                question: 'How do you typically express emotions?',
                options: {
                    yang: 'Expressive, quick emotions, outward expression, dramatic',
                    yin: 'Reserved, deep emotions, inward processing, subtle',
                    balanced: 'Appropriate emotional expression for situations'
                }
            },
            {
                id: 'mental_processing',
                section: 'yinyang',
                question: 'How does your mind typically process information?',
                options: {
                    yang: 'Quick thinking, decisive, active mind, external focus',
                    yin: 'Slower processing, contemplative, intuitive, internal focus',
                    balanced: 'Thoughtful decision-making with appropriate timing'
                }
            },
            {
                id: 'physical_build',
                section: 'yinyang',
                question: 'How would you describe your natural physical build and movement?',
                options: {
                    yang: 'Lean, active, quick movements, strong muscle tone',
                    yin: 'Softer build, slower movements, more rounded features',
                    balanced: 'Proportionate build with coordinated movement'
                }
            },
            {
                id: 'digestive_appetite',
                section: 'yinyang',
                question: 'What describes your natural appetite and digestive patterns?',
                options: {
                    yang: 'Strong appetite, prefer cold foods, fast metabolism',
                    yin: 'Variable appetite, prefer warm foods, slower metabolism',
                    balanced: 'Regular appetite with seasonal adjustments'
                }
            },
            {
                id: 'stress_response',
                section: 'yinyang',
                question: 'How do you typically respond to stress and pressure?',
                options: {
                    yang: 'Become hyperactive, agitated, angry, overheated',
                    yin: 'Withdraw, become depressed, tired, feel cold',
                    balanced: 'Manage stress with appropriate coping strategies'
                }
            },
            {
                id: 'seasonal_preference',
                section: 'yinyang',
                question: 'Which seasons do you naturally prefer?',
                options: {
                    yang: 'Prefer cooler seasons, dislike heat and humidity',
                    yin: 'Prefer warmer seasons, uncomfortable in cold weather',
                    balanced: 'Enjoy all seasons with appropriate adjustments'
                }
            },
            {
                id: 'voice_communication',
                section: 'yinyang',
                question: 'How would others describe your voice and communication style?',
                options: {
                    yang: 'Loud voice, rapid speech, assertive communication',
                    yin: 'Soft voice, slower speech, gentle communication',
                    balanced: 'Clear communication adapted to situation'
                }
            },
            {
                id: 'fluid_hydration',
                section: 'yinyang',
                question: 'What are your natural hydration and fluid preferences?',
                options: {
                    yang: 'Strong thirst, prefer cold drinks, drink large amounts',
                    yin: 'Low thirst, prefer warm drinks, sip throughout day',
                    balanced: 'Drink according to body needs and season'
                }
            },
            {
                id: 'exercise_intensity',
                section: 'yinyang',
                question: 'What type of exercise do you naturally gravitate toward?',
                options: {
                    yang: 'Vigorous exercise, competitive sports, high intensity',
                    yin: 'Gentle exercise, yoga, walking, low intensity',
                    balanced: 'Vary exercise intensity based on energy and season'
                }
            },
            {
                id: 'healing_recovery',
                section: 'yinyang',
                question: 'How do you typically recover from illness or fatigue?',
                options: {
                    yang: 'Quick recovery from illness, high immune response',
                    yin: 'Slower recovery, need more rest, gentle healing process',
                    balanced: 'Appropriate healing time with good recuperation'
                }
            },

            // Five Elements Questions (25 questions - 5 per element)
            // Wood Element Questions
            {
                id: 'wood_emotional',
                section: 'elements',
                element: 'wood',
                question: 'How do you typically handle anger and frustration?',
                options: {
                    dominant: 'Quick to anger, frustrated easily, impatient, very assertive',
                    deficient: 'Lack assertiveness, difficulty making decisions, passive',
                    balanced: 'Healthy assertiveness with emotional flexibility'
                }
            },
            {
                id: 'wood_physical',
                section: 'elements',
                element: 'wood',
                question: 'What describes your physical build and muscle tone?',
                options: {
                    dominant: 'Strong muscle tone, flexible, prominent veins, athletic build',
                    deficient: 'Weak muscle tone, poor flexibility, stiff joints',
                    balanced: 'Good muscle tone with healthy flexibility'
                }
            },
            {
                id: 'wood_vision',
                section: 'elements',
                element: 'wood',
                question: 'How is your eye health and visual acuity?',
                options: {
                    dominant: 'Strong vision, bright eyes, may have eye strain from overuse',
                    deficient: 'Poor vision, dry eyes, light sensitivity, night blindness',
                    balanced: 'Clear vision with healthy eye comfort'
                }
            },
            {
                id: 'wood_planning',
                section: 'elements',
                element: 'wood',
                question: 'How do you approach planning and organization?',
                options: {
                    dominant: 'Excellent planner, very organized, strategic thinking, controlling',
                    deficient: 'Poor planning abilities, disorganized, lack direction',
                    balanced: 'Good planning abilities with healthy flexibility'
                }
            },
            {
                id: 'wood_stress',
                section: 'elements',
                element: 'wood',
                question: 'How does stress typically manifest in your body?',
                options: {
                    dominant: 'Tension headaches, neck/shoulder tightness, jaw clenching',
                    deficient: 'Feel defeated, give up easily, muscle weakness',
                    balanced: 'Handle stress with appropriate action and flexibility'
                }
            },

            // Fire Element Questions
            {
                id: 'fire_social',
                section: 'elements',
                element: 'fire',
                question: 'How do you typically engage in social situations?',
                options: {
                    dominant: 'Very social, talkative, charismatic, need attention and stimulation',
                    deficient: 'Shy, withdrawn, difficulty communicating, feel isolated',
                    balanced: 'Warm, appropriate social interaction with genuine connections'
                }
            },
            {
                id: 'fire_joy',
                section: 'elements',
                element: 'fire',
                question: 'How do you experience and express joy and excitement?',
                options: {
                    dominant: 'Easily excited, laugh frequently, dramatic emotions, manic tendencies',
                    deficient: 'Difficulty experiencing joy, flat emotions, tendency toward depression',
                    balanced: 'Natural joy and appropriate emotional expression'
                }
            },
            {
                id: 'fire_circulation',
                section: 'elements',
                element: 'fire',
                question: 'How is your circulation and heart health?',
                options: {
                    dominant: 'Strong circulation, warm hands/feet, may have palpitations or high blood pressure',
                    deficient: 'Poor circulation, cold extremities, weak pulse, low blood pressure',
                    balanced: 'Good circulation with regular heart rhythm'
                }
            },
            {
                id: 'fire_sleep',
                section: 'elements',
                element: 'fire',
                question: 'What describes your sleep patterns and dream activity?',
                options: {
                    dominant: 'Difficulty falling asleep, vivid dreams, restless sleep, mind races',
                    deficient: 'Sleep too much, no dreams remembered, difficulty waking',
                    balanced: 'Restful sleep with peaceful, meaningful dreams'
                }
            },
            {
                id: 'fire_mental',
                section: 'elements',
                element: 'fire',
                question: 'How would you describe your mental clarity and focus?',
                options: {
                    dominant: 'Sharp mind but scattered, very creative, highly intuitive, hyperactive',
                    deficient: 'Mental fog, poor concentration, lack inspiration, apathy',
                    balanced: 'Clear thinking with creative insights and good focus'
                }
            },

            // Earth Element Questions
            {
                id: 'earth_digestion',
                section: 'elements',
                element: 'earth',
                question: 'How would you describe your digestive patterns and appetite?',
                options: {
                    dominant: 'Strong appetite, good digestion initially, tendency to overeat',
                    deficient: 'Poor appetite, weak digestion, bloating, fatigue after eating',
                    balanced: 'Regular appetite with efficient, comfortable digestion'
                }
            },
            {
                id: 'earth_worry',
                section: 'elements',
                element: 'earth',
                question: 'How do you handle worry and overthinking?',
                options: {
                    dominant: 'Tendency to worry excessively, overthinking, rumination, anxiety',
                    deficient: 'Lack appropriate concern, poor memory, difficulty concentrating',
                    balanced: 'Appropriate concern with clear, focused thinking'
                }
            },
            {
                id: 'earth_build',
                section: 'elements',
                element: 'earth',
                question: 'What describes your natural body build and weight patterns?',
                options: {
                    dominant: 'Tendency toward fullness, soft build, gain weight easily',
                    deficient: 'Thin build, difficulty gaining weight, weak muscle development',
                    balanced: 'Stable weight with good muscle tone and proportion'
                }
            },
            {
                id: 'earth_nurturing',
                section: 'elements',
                element: 'earth',
                question: 'How do you approach caring for others and nurturing?',
                options: {
                    dominant: 'Strong nurturing instinct, caretaking, may be codependent',
                    deficient: 'Difficulty caring for others, lack empathy or concern',
                    balanced: 'Healthy caring for self and others with appropriate boundaries'
                }
            },
            {
                id: 'earth_stability',
                section: 'elements',
                element: 'earth',
                question: 'How do you handle change and seek stability?',
                options: {
                    dominant: 'Strongly seek security, resistant to change, very stable emotions',
                    deficient: 'Feel ungrounded, anxious, lack emotional stability',
                    balanced: 'Stable foundation with healthy adaptability to change'
                }
            },

            // Metal Element Questions
            {
                id: 'metal_breathing',
                section: 'elements',
                element: 'metal',
                question: 'How would you describe your respiratory health and breathing?',
                options: {
                    dominant: 'Strong breathing capacity, clear voice, may have dryness issues',
                    deficient: 'Weak breathing, soft voice, frequent respiratory problems',
                    balanced: 'Deep, regular breathing with clear, strong voice'
                }
            },
            {
                id: 'metal_grief',
                section: 'elements',
                element: 'metal',
                question: 'How do you process grief and letting go of the past?',
                options: {
                    dominant: 'Difficulty releasing and letting go, hold onto past, melancholic',
                    deficient: 'Difficulty processing grief appropriately, emotional numbness',
                    balanced: 'Healthy processing of loss and ability to move forward'
                }
            },
            {
                id: 'metal_perfectionism',
                section: 'elements',
                element: 'metal',
                question: 'How do you approach attention to detail and standards?',
                options: {
                    dominant: 'Strong perfectionist, highly organized, very high standards, critical',
                    deficient: 'Disorganized, low standards, lack discrimination or quality focus',
                    balanced: 'Appropriate attention to quality and detail without obsession'
                }
            },
            {
                id: 'metal_skin',
                section: 'elements',
                element: 'metal',
                question: 'How would you describe your skin health and appearance?',
                options: {
                    dominant: 'Dry skin, sensitive skin, skin conditions, pale complexion',
                    deficient: 'Dull skin, poor healing capacity, lacks natural luster',
                    balanced: 'Healthy skin with good moisture balance and natural glow'
                }
            },
            {
                id: 'metal_inspiration',
                section: 'elements',
                element: 'metal',
                question: 'How do you connect with inspiration and higher values?',
                options: {
                    dominant: 'Deep spiritual connection, inspirational, refined tastes, rigid values',
                    deficient: 'Lack inspiration, overly materialistic, shallow interests',
                    balanced: 'Healthy spiritual connection with practical grounding'
                }
            },

            // Water Element Questions
            {
                id: 'water_vitality',
                section: 'elements',
                element: 'water',
                question: 'How would you describe your overall energy reserves and vitality?',
                options: {
                    dominant: 'Strong constitution, excellent endurance, may store too much energy',
                    deficient: 'Low energy reserves, chronic fatigue, age quickly',
                    balanced: 'Steady energy with good reserves and appropriate recovery'
                }
            },
            {
                id: 'water_fear',
                section: 'elements',
                element: 'water',
                question: 'How do you handle fear and approach challenges?',
                options: {
                    dominant: 'Overly cautious, fearful, timid, avoid challenges and risks',
                    deficient: 'Reckless behavior, lack healthy caution, poor judgment',
                    balanced: 'Appropriate courage with healthy caution and wisdom'
                }
            },
            {
                id: 'water_bones',
                section: 'elements',
                element: 'water',
                question: 'How would you describe your bone health and physical structure?',
                options: {
                    dominant: 'Strong bones, excellent posture, may have joint stiffness',
                    deficient: 'Weak bones, poor posture, frequent injuries or breaks',
                    balanced: 'Strong, flexible skeletal structure with good posture'
                }
            },
            {
                id: 'water_reproduction',
                section: 'elements',
                element: 'water',
                question: 'How would you describe your sexual energy and reproductive health?',
                options: {
                    dominant: 'Strong libido, high fertility, may be excessive',
                    deficient: 'Low libido, fertility issues, lack of sexual interest',
                    balanced: 'Healthy sexual energy and normal reproductive function'
                }
            },
            {
                id: 'water_willpower',
                section: 'elements',
                element: 'water',
                question: 'How do you approach willpower and determination?',
                options: {
                    dominant: 'Very strong will, extremely determined, may be stubborn',
                    deficient: 'Lack willpower, give up easily, indecisive nature',
                    balanced: 'Persistent with healthy flexibility and adaptability'
                }
            },

            // Traditional Diagnostics Questions (10 questions)
            {
                id: 'tongue_appearance',
                section: 'traditional',
                question: 'How would you describe your tongue appearance (look in mirror)?',
                options: {
                    imbalanced: 'Pale, light pink, or deep red tongue color',
                    balanced: 'Normal healthy pink color'
                }
            },
            {
                id: 'tongue_coating',
                section: 'traditional',
                question: 'What type of coating do you typically observe on your tongue?',
                options: {
                    imbalanced: 'Thick white, yellow, or no coating on tongue',
                    balanced: 'Thin, clear, normal coating'
                }
            },
            {
                id: 'pulse_quality',
                section: 'traditional',
                question: 'How would you describe your pulse quality (check at wrist)?',
                options: {
                    imbalanced: 'Very fast, very slow, or irregular pulse rhythm',
                    balanced: 'Regular, steady pulse rhythm'
                }
            },
            {
                id: 'complexion',
                section: 'traditional',
                question: 'What best describes your natural facial complexion?',
                options: {
                    imbalanced: 'Very pale, wan, or frequently flushed complexion',
                    balanced: 'Healthy, natural color with good circulation'
                }
            },
            {
                id: 'daily_energy',
                section: 'traditional',
                question: 'When do you typically have the most energy throughout the day?',
                options: {
                    imbalanced: 'Energy very low in morning or crashes in afternoon',
                    balanced: 'Natural energy rhythms that support daily activities'
                }
            },
            {
                id: 'emotional_stability',
                section: 'traditional',
                question: 'How would you describe your general emotional stability?',
                options: {
                    imbalanced: 'Emotions fluctuate significantly or feel very flat',
                    balanced: 'Generally balanced with normal emotional variations'
                }
            },
            {
                id: 'weather_sensitivity',
                section: 'traditional',
                question: 'How do you typically respond to weather changes?',
                options: {
                    imbalanced: 'Very sensitive to hot or cold weather changes',
                    balanced: 'Adapt well to weather changes with minor adjustments'
                }
            },
            {
                id: 'urination_patterns',
                section: 'traditional',
                question: 'What describes your typical urination patterns?',
                options: {
                    imbalanced: 'Very frequent and clear, or dark and infrequent urination',
                    balanced: 'Normal frequency and color throughout the day'
                }
            },
            {
                id: 'bowel_movements',
                section: 'traditional',
                question: 'How would you describe your typical bowel movements?',
                options: {
                    imbalanced: 'Consistently loose and unformed, or dry and constipated',
                    balanced: 'Regular, well-formed movements with good consistency'
                }
            },
            {
                id: 'hair_health',
                section: 'traditional',
                question: 'How would you describe your hair health and quality?',
                options: {
                    imbalanced: 'Very dry and brittle, or excessively oily hair',
                    balanced: 'Healthy, lustrous hair with normal oil balance'
                }
            },

            // Qi Circulation Questions (10 questions)
            {
                id: 'overall_qi_flow',
                section: 'qi',
                question: 'How would you describe your overall sense of energy flow?',
                options: {
                    stagnant: 'Feel stuck, areas of chronic tension, emotional blockages',
                    deficient: 'Low overall energy, weak voice, need frequent rest',
                    balanced: 'Good energy flow, emotional flexibility, natural circulation'
                }
            },
            {
                id: 'qi_direction',
                section: 'qi',
                question: 'Do you notice energy moving in inappropriate directions?',
                options: {
                    stagnant: 'Energy feels stuck or blocked in certain body areas',
                    deficient: 'Energy feels depleted or sinking downward',
                    balanced: 'Energy flows in appropriate directions naturally'
                }
            },
            {
                id: 'defensive_qi',
                section: 'qi',
                question: 'How would you describe your defensive energy and immunity?',
                options: {
                    stagnant: 'Get sick often but recover slowly, lingering symptoms',
                    deficient: 'Very weak immunity, catch everything, slow recovery',
                    balanced: 'Appropriate immune response with good recovery'
                }
            },
            {
                id: 'emotional_qi',
                section: 'qi',
                question: 'How do emotions typically affect your physical energy?',
                options: {
                    stagnant: 'Emotions get stuck - frustration, mood swings, frequent sighing',
                    deficient: 'Emotions drain energy - feel depleted after emotional experiences',
                    balanced: 'Emotions flow appropriately without disrupting physical energy'
                }
            },
            {
                id: 'physical_qi',
                section: 'qi',
                question: 'Do you have areas of chronic physical tension?',
                options: {
                    stagnant: 'Chronic tension in specific areas, knots, restricted movement',
                    deficient: 'General weakness and fatigue, everything feels heavy',
                    balanced: 'No areas of chronic tension, energy moves freely'
                }
            },
            {
                id: 'mental_qi',
                section: 'qi',
                question: 'How would you describe your mental energy and clarity?',
                options: {
                    stagnant: 'Mental fog, difficulty concentrating, thoughts feel stuck',
                    deficient: 'Poor concentration, mental fatigue, forgetfulness',
                    balanced: 'Clear thinking, good focus, mental energy flows smoothly'
                }
            },
            {
                id: 'seasonal_qi',
                section: 'qi',
                question: 'How does your energy change with the seasons?',
                options: {
                    stagnant: 'Energy gets stuck in certain seasons, same problems yearly',
                    deficient: 'Energy drops significantly in certain seasons',
                    balanced: 'Energy adjusts appropriately to seasonal changes'
                }
            },
            {
                id: 'daily_qi_rhythm',
                section: 'qi',
                question: 'How does your energy flow throughout a typical day?',
                options: {
                    stagnant: 'Energy blocks at certain times, erratic patterns',
                    deficient: 'Energy steadily decreases, crashes throughout day',
                    balanced: 'Natural energy rhythms that support daily activities'
                }
            },
            {
                id: 'stress_qi_response',
                section: 'qi',
                question: 'How does stress typically affect your energy circulation?',
                options: {
                    stagnant: 'Stress creates obvious energy blockages and physical tension',
                    deficient: 'Stress rapidly depletes energy reserves, exhaustion',
                    balanced: 'Maintain good energy circulation during stress'
                }
            },
            {
                id: 'recovery_qi',
                section: 'qi',
                question: 'How well does your energy recover after exertion?',
                options: {
                    stagnant: 'Recovery is inconsistent, some areas don\'t recover',
                    deficient: 'Very slow recovery, never feel fully restored',
                    balanced: 'Energy recovers efficiently with appropriate rest'
                }
            },

            // Environmental & Lifestyle Questions (10 questions)
            {
                id: 'climate_preference',
                section: 'lifestyle',
                question: 'What climate conditions do you naturally prefer?',
                options: {
                    stressed: 'Need very specific climate conditions, sensitive to changes',
                    balanced: 'Adapt well to various climates with seasonal adjustments'
                }
            },
            {
                id: 'exercise_response',
                section: 'lifestyle',
                question: 'How does your body respond to different types of exercise?',
                options: {
                    stressed: 'Very specific exercise needs, problems with many activities',
                    balanced: 'Exercise needs vary appropriately by season and energy'
                }
            },
            {
                id: 'work_style',
                section: 'lifestyle',
                question: 'What work environment suits you best?',
                options: {
                    stressed: 'Very specific work environment needs, struggle in many settings',
                    balanced: 'Adaptable to various work environments with adjustments'
                }
            },
            {
                id: 'relationship_patterns',
                section: 'lifestyle',
                question: 'What relationship patterns feel most natural?',
                options: {
                    stressed: 'Relationship difficulties, extreme patterns of connection',
                    balanced: 'Healthy relationship patterns with appropriate boundaries'
                }
            },
            {
                id: 'stress_manifestation',
                section: 'lifestyle',
                question: 'How does chronic stress manifest in your body?',
                options: {
                    stressed: 'Stress creates significant physical and mental symptoms',
                    balanced: 'Handle stress with appropriate coping strategies'
                }
            },
            {
                id: 'food_cravings',
                section: 'lifestyle',
                question: 'What types of foods do you naturally crave?',
                options: {
                    stressed: 'Crave extreme foods, very hot/cold, unhealthy patterns',
                    balanced: 'Crave seasonally appropriate foods, balanced preferences'
                }
            },
            {
                id: 'sleep_environment',
                section: 'lifestyle',
                question: 'What sleep environment helps you rest most deeply?',
                options: {
                    stressed: 'Need very specific sleep conditions, sensitive to changes',
                    balanced: 'Adaptable sleep needs with basic comfort requirements'
                }
            },
            {
                id: 'creative_expression',
                section: 'lifestyle',
                question: 'How do you naturally express creativity?',
                options: {
                    stressed: 'Blocked creativity or compulsive creative expression',
                    balanced: 'Creative expression varies naturally based on inspiration'
                }
            },
            {
                id: 'conflict_resolution',
                section: 'lifestyle',
                question: 'How do you typically handle conflict?',
                options: {
                    stressed: 'Extreme conflict patterns - avoid completely or overly aggressive',
                    balanced: 'Handle conflict appropriately based on situation'
                }
            },
            {
                id: 'change_adaptation',
                section: 'lifestyle',
                question: 'How do you typically adapt to major life changes?',
                options: {
                    stressed: 'Very difficult time with changes, extreme resistance or anxiety',
                    balanced: 'Adapt to changes with appropriate time and support'
                }
            }
        ];
    }

    initializeNavigation() {
        console.log('Initializing navigation...');
        // Smooth scrolling navigation
        const navLinks = document.querySelectorAll('.nav-link');
        console.log(`Found ${navLinks.length} navigation links`);
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigation link clicked:', link.getAttribute('href'));
                
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    console.log(`Scrolling to section: ${targetId}, position: ${targetPosition}`);
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    link.classList.add('active');
                } else {
                    console.error(`Target section not found: ${targetId}`);
                }
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', this.debounce(() => this.updateActiveNav(), 100));
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    initializeAssessment() {
        console.log('Initializing assessment...');
        
        // Start assessment button
        const startBtn = document.getElementById('startAssessmentBtn');
        console.log('Start button found:', !!startBtn);
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                console.log('Start assessment button clicked');
                this.startAssessment();
            });
        } else {
            console.error('Start assessment button not found');
        }

        // Assessment navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        console.log('Previous button found:', !!prevBtn);
        console.log('Next button found:', !!nextBtn);
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousQuestion());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
    }

    initializeLiveAnalysis() {
        console.log('Initializing live analysis...');
        
        // Create elements bars for Five Elements
        const elementsBars = document.getElementById('elementsBars');
        if (elementsBars) {
            const elements = ['wood', 'fire', 'earth', 'metal', 'water'];
            elementsBars.innerHTML = elements.map(element => `
                <div class="element-bar-item">
                    <span style="min-width: 40px; font-size: 10px;">${element.charAt(0).toUpperCase() + element.slice(1)}</span>
                    <div class="element-bar">
                        <div class="element-fill ${element}" id="${element}Fill"></div>
                    </div>
                    <span id="${element}Percentage" style="min-width: 30px; font-size: 10px;">0%</span>
                </div>
            `).join('');
            console.log('Elements bars initialized');
        } else {
            console.log('Elements bars container not found');
        }
    }

    initializeResultsTabs() {
        const tabButtons = document.querySelectorAll('.results .tab-btn');
        console.log(`Found ${tabButtons.length} results tab buttons`);
        
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                this.switchResultsTab(targetTab);
            });
        });
    }

    switchResultsTab(targetTab) {
        console.log('Switching to results tab:', targetTab);
        
        // Remove active class from all buttons and panels
        const tabButtons = document.querySelectorAll('.results .tab-btn');
        const tabPanels = document.querySelectorAll('.results .tab-panel');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to target button and panel
        const targetButton = document.querySelector(`.results .tab-btn[data-tab="${targetTab}"]`);
        const targetPanel = document.getElementById(targetTab);
        
        if (targetButton) targetButton.classList.add('active');
        if (targetPanel) targetPanel.classList.add('active');
    }

    initializeEventListeners() {
        console.log('Initializing event listeners...');
        
        // Download results
        const downloadBtn = document.getElementById('downloadResults');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadResults());
        }

        // Restart assessment
        const restartBtn = document.getElementById('restartAssessment');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartAssessment());
        }

        // Find practitioner
        const practitionerBtn = document.getElementById('findPractitioner');
        if (practitionerBtn) {
            practitionerBtn.addEventListener('click', () => this.findPractitioner());
        }
    }

    startAssessment() {
        console.log('Starting assessment...');
        
        // Hide instructions, show assessment
        const instructionsSection = document.getElementById('instructions');
        const assessmentSection = document.getElementById('assessment');
        
        console.log('Instructions section found:', !!instructionsSection);
        console.log('Assessment section found:', !!assessmentSection);
        
        if (instructionsSection) {
            instructionsSection.classList.add('hidden');
            console.log('Instructions section hidden');
        }
        
        if (assessmentSection) {
            assessmentSection.classList.remove('hidden');
            console.log('Assessment section shown');
        }
        
        // Initialize first question
        this.currentQuestionIndex = 0;
        this.displayQuestion();
        this.updateProgress();
        this.updateSectionProgress();
        
        // Scroll to assessment
        if (assessmentSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            window.scrollTo({
                top: assessmentSection.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        }
    }

    displayQuestion() {
        const question = this.allQuestions[this.currentQuestionIndex];
        if (!question) {
            console.error('Question not found at index:', this.currentQuestionIndex);
            return;
        }

        console.log('Displaying question:', question.id);

        // Update question content
        const questionTitle = document.getElementById('questionTitle');
        const questionOptions = document.getElementById('questionOptions');
        
        if (questionTitle) {
            questionTitle.textContent = question.question;
        } else {
            console.error('Question title element not found');
        }
        
        if (questionOptions) {
            questionOptions.innerHTML = Object.entries(question.options).map(([key, value]) => `
                <div class="option-item" data-value="${key}" data-question="${question.id}">
                    ${value}
                </div>
            `).join('');

            // Add click handlers to options
            const options = questionOptions.querySelectorAll('.option-item');
            console.log(`Added ${options.length} option handlers`);
            
            options.forEach(option => {
                option.addEventListener('click', () => this.selectOption(option));
            });

            // Restore previous selection if exists
            if (this.responses[question.id]) {
                const selectedOption = questionOptions.querySelector(`[data-value="${this.responses[question.id]}"]`);
                if (selectedOption) {
                    selectedOption.classList.add('selected');
                    this.updateNavigationState();
                }
            }
        } else {
            console.error('Question options element not found');
        }

        // Update section indicator
        this.updateSectionIndicator();
    }

    selectOption(optionElement) {
        const questionId = optionElement.getAttribute('data-question');
        const value = optionElement.getAttribute('data-value');

        console.log('Option selected:', questionId, value);

        // Remove selection from siblings
        const siblings = optionElement.parentElement.querySelectorAll('.option-item');
        siblings.forEach(sibling => sibling.classList.remove('selected'));

        // Add selection to clicked option
        optionElement.classList.add('selected');

        // Store response
        this.responses[questionId] = value;

        // Update scores
        this.updateScores(questionId, value);

        // Update navigation state
        this.updateNavigationState();

        // Update live analysis
        this.updateLiveAnalysis();
    }

    updateScores(questionId, value) {
        const question = this.allQuestions.find(q => q.id === questionId);
        if (!question) return;

        console.log('Updating scores for:', questionId, value, question.section);

        switch (question.section) {
            case 'yinyang':
                if (value === 'yin') this.scores.yin++;
                else if (value === 'yang') this.scores.yang++;
                else if (value === 'balanced') this.scores.balanced++;
                break;

            case 'elements':
                if (question.element && this.scores.elements[question.element]) {
                    this.scores.elements[question.element][value]++;
                }
                break;

            case 'traditional':
                if (value === 'imbalanced') this.scores.traditional.imbalanced++;
                else if (value === 'balanced') this.scores.traditional.balanced++;
                break;

            case 'qi':
                if (this.scores.qi[value] !== undefined) this.scores.qi[value]++;
                break;

            case 'lifestyle':
                if (value === 'stressed') this.scores.lifestyle.stressed++;
                else if (value === 'balanced') this.scores.lifestyle.balanced++;
                break;
        }

        console.log('Updated scores:', this.scores);
    }

    updateLiveAnalysis() {
        console.log('Updating live analysis');
        
        // Update Yin/Yang balance
        const totalYinYang = this.scores.yin + this.scores.yang + this.scores.balanced;
        if (totalYinYang > 0) {
            const yinPercent = Math.round((this.scores.yin / totalYinYang) * 100);
            const yangPercent = Math.round((this.scores.yang / totalYinYang) * 100);

            const yinFill = document.getElementById('yinFill');
            const yangFill = document.getElementById('yangFill');
            const yinPercentage = document.getElementById('yinPercentage');
            const yangPercentage = document.getElementById('yangPercentage');

            if (yinFill) yinFill.style.width = `${yinPercent}%`;
            if (yangFill) yangFill.style.width = `${yangPercent}%`;
            if (yinPercentage) yinPercentage.textContent = `${yinPercent}%`;
            if (yangPercentage) yangPercentage.textContent = `${yangPercent}%`;
            
            console.log('Yin/Yang updated:', yinPercent, yangPercent);
        }

        // Update Elements analysis
        Object.entries(this.scores.elements).forEach(([element, scores]) => {
            const total = scores.dominant + scores.deficient + scores.balanced;
            if (total > 0) {
                const dominantPercent = Math.round((scores.dominant / total) * 100);
                const fillElement = document.getElementById(`${element}Fill`);
                const percentageElement = document.getElementById(`${element}Percentage`);
                
                if (fillElement) fillElement.style.width = `${dominantPercent}%`;
                if (percentageElement) percentageElement.textContent = `${dominantPercent}%`;
                
                console.log(`${element} updated:`, dominantPercent);
            }
        });
    }

    updateSectionIndicator() {
        const question = this.allQuestions[this.currentQuestionIndex];
        const sectionIndicator = document.getElementById('sectionIndicator');
        
        const sectionNames = {
            yinyang: 'Yin/Yang Constitutional Balance',
            elements: 'Five Elements Analysis',
            traditional: 'Traditional Diagnostic Indicators',
            qi: 'Qi Circulation Patterns',
            lifestyle: 'Environmental & Lifestyle Patterns'
        };

        if (sectionIndicator && question) {
            sectionIndicator.textContent = `Section ${this.getCurrentSectionNumber()}: ${sectionNames[question.section]}`;
        }
    }

    getCurrentSectionNumber() {
        const question = this.allQuestions[this.currentQuestionIndex];
        const sections = ['yinyang', 'elements', 'traditional', 'qi', 'lifestyle'];
        return sections.indexOf(question.section) + 1;
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const currentQuestion = document.getElementById('currentQuestion');
        const totalQuestions = document.getElementById('totalQuestions');

        const progressPercent = ((this.currentQuestionIndex + 1) / this.allQuestions.length) * 100;
        
        if (progressFill) progressFill.style.width = `${progressPercent}%`;
        if (currentQuestion) currentQuestion.textContent = this.currentQuestionIndex + 1;
        if (totalQuestions) totalQuestions.textContent = this.allQuestions.length;
        
        console.log('Progress updated:', progressPercent);
    }

    updateSectionProgress() {
        // Update section progress in sidebar
        const sections = ['yinyang', 'elements', 'traditional', 'qi', 'lifestyle'];
        const sectionItems = document.querySelectorAll('.section-item');

        sections.forEach((section, index) => {
            const sectionQuestions = this.allQuestions.filter(q => q.section === section);
            const answeredQuestions = sectionQuestions.filter(q => this.responses[q.id]);
            const sectionItem = sectionItems[index];
            
            if (sectionItem) {
                const progressText = sectionItem.querySelector('.section-progress-text');
                if (progressText) {
                    progressText.textContent = `${answeredQuestions.length}/${sectionQuestions.length}`;
                }

                // Update section status
                sectionItem.classList.remove('active', 'completed');
                if (answeredQuestions.length === sectionQuestions.length) {
                    sectionItem.classList.add('completed');
                } else if (this.allQuestions[this.currentQuestionIndex].section === section) {
                    sectionItem.classList.add('active');
                }
            }
        });
    }

    updateNavigationState() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const currentQuestion = this.allQuestions[this.currentQuestionIndex];

        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
        }

        if (nextBtn) {
            const hasAnswer = this.responses[currentQuestion.id];
            nextBtn.disabled = !hasAnswer;
            
            if (this.currentQuestionIndex === this.allQuestions.length - 1) {
                nextBtn.textContent = hasAnswer ? 'Complete Assessment' : 'Complete Assessment';
            } else {
                nextBtn.textContent = 'Next';
            }
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
            this.updateProgress();
            this.updateSectionProgress();
            console.log('Previous question:', this.currentQuestionIndex);
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.allQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
            this.updateProgress();
            this.updateSectionProgress();
            console.log('Next question:', this.currentQuestionIndex);
        } else {
            // Complete assessment
            this.completeAssessment();
        }
    }

    completeAssessment() {
        console.log('Completing assessment...');
        
        // Calculate final results
        this.calculateFinalResults();
        
        // Hide assessment, show results
        const assessmentSection = document.getElementById('assessment');
        const resultsSection = document.getElementById('results');
        
        if (assessmentSection) assessmentSection.classList.add('hidden');
        if (resultsSection) resultsSection.classList.remove('hidden');
        
        // Display results
        this.displayResults();
        
        // Scroll to results
        if (resultsSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            window.scrollTo({
                top: resultsSection.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        }
    }

    calculateFinalResults() {
        console.log('Calculating final results...');
        
        // Calculate final percentages and interpretations
        this.finalResults = {
            yinYang: this.calculateYinYangResults(),
            elements: this.calculateElementsResults(),
            qi: this.calculateQiResults(),
            constitutional: this.determineConstitutionalType()
        };
        
        console.log('Final results:', this.finalResults);
    }

    calculateYinYangResults() {
        const total = this.scores.yin + this.scores.yang + this.scores.balanced;
        if (total === 0) return { yin: 0, yang: 0, balanced: 0, interpretation: 'No responses recorded' };

        const yinPercent = Math.round((this.scores.yin / total) * 100);
        const yangPercent = Math.round((this.scores.yang / total) * 100);
        const balancedPercent = Math.round((this.scores.balanced / total) * 100);

        let interpretation = '';
        if (yinPercent >= 60) {
            interpretation = 'Yin Dominant Constitution: Lower energy, cool constitution, introspective nature. Strengths include deep wisdom and emotional stability. Focus on warming foods and gentle movement.';
        } else if (yangPercent >= 60) {
            interpretation = 'Yang Dominant Constitution: High energy, warm constitution, active personality. Strengths include strong vitality and leadership. Focus on cooling practices and stress management.';
        } else {
            interpretation = 'Balanced Constitution: Adaptable constitution with moderate temperament. Good adaptability and seasonal awareness. Maintain balance through seasonal adjustments.';
        }

        return { yin: yinPercent, yang: yangPercent, balanced: balancedPercent, interpretation };
    }

    calculateElementsResults() {
        const results = {};
        let dominantElement = '';
        let maxScore = 0;

        Object.entries(this.scores.elements).forEach(([element, scores]) => {
            const total = scores.dominant + scores.deficient + scores.balanced;
            if (total > 0) {
                const dominantPercent = Math.round((scores.dominant / total) * 100);
                const deficientPercent = Math.round((scores.deficient / total) * 100);
                const balancedPercent = Math.round((scores.balanced / total) * 100);
                
                results[element] = { 
                    dominant: dominantPercent, 
                    deficient: deficientPercent, 
                    balanced: balancedPercent 
                };

                if (dominantPercent > maxScore) {
                    maxScore = dominantPercent;
                    dominantElement = element;
                }
            }
        });

        // Generate interpretation
        const elementInfo = {
            wood: 'Wood Element (Liver/Gallbladder): Planning, flexibility, vision. Season: Spring. Emotion: Anger/Frustration.',
            fire: 'Fire Element (Heart/Small Intestine): Joy, communication, circulation. Season: Summer. Emotion: Joy/Excitement.',
            earth: 'Earth Element (Spleen/Stomach): Digestion, nurturing, stability. Season: Late Summer. Emotion: Worry/Pensiveness.',
            metal: 'Metal Element (Lung/Large Intestine): Breathing, letting go, inspiration. Season: Autumn. Emotion: Grief/Sadness.',
            water: 'Water Element (Kidney/Bladder): Vitality, willpower, bones. Season: Winter. Emotion: Fear/Fright.'
        };

        const interpretation = dominantElement ? 
            `Your dominant element is ${dominantElement.toUpperCase()}. ${elementInfo[dominantElement]}` :
            'No clear dominant element - this suggests a balanced five elements constitution.';

        return { elements: results, dominantElement, interpretation };
    }

    calculateQiResults() {
        const total = this.scores.qi.stagnant + this.scores.qi.deficient + this.scores.qi.balanced;
        if (total === 0) return { interpretation: 'No Qi circulation responses recorded' };

        const stagnantPercent = Math.round((this.scores.qi.stagnant / total) * 100);
        const deficientPercent = Math.round((this.scores.qi.deficient / total) * 100);
        const balancedPercent = Math.round((this.scores.qi.balanced / total) * 100);

        let interpretation = '';
        if (stagnantPercent >= 50) {
            interpretation = 'Qi Stagnation Pattern: Energy feels stuck or blocked. Focus on movement, emotional release, and circulation-promoting activities.';
        } else if (deficientPercent >= 50) {
            interpretation = 'Qi Deficiency Pattern: Low overall energy and depletion. Focus on building energy through rest, nourishing foods, and gentle tonifying practices.';
        } else {
            interpretation = 'Balanced Qi Circulation: Good energy flow with appropriate circulation. Maintain through seasonal awareness and balanced lifestyle.';
        }

        return { stagnant: stagnantPercent, deficient: deficientPercent, balanced: balancedPercent, interpretation };
    }

    determineConstitutionalType() {
        const yinYang = this.finalResults?.yinYang || this.calculateYinYangResults();
        const elements = this.finalResults?.elements || this.calculateElementsResults();
        
        let type = '';
        if (yinYang.yin >= 60) {
            type = `Yin-${elements.dominantElement ? elements.dominantElement.charAt(0).toUpperCase() + elements.dominantElement.slice(1) : 'Balanced'}`;
        } else if (yinYang.yang >= 60) {
            type = `Yang-${elements.dominantElement ? elements.dominantElement.charAt(0).toUpperCase() + elements.dominantElement.slice(1) : 'Balanced'}`;
        } else {
            type = `Balanced-${elements.dominantElement ? elements.dominantElement.charAt(0).toUpperCase() + elements.dominantElement.slice(1) : 'Constitutional'}`;
        }

        const description = `Your constitutional pattern combines ${yinYang.yin >= 60 ? 'Yin' : yinYang.yang >= 60 ? 'Yang' : 'Balanced'} energetics with ${elements.dominantElement ? elements.dominantElement + ' element' : 'balanced elemental'} characteristics.`;

        return { type, description };
    }

    displayResults() {
        console.log('Displaying results...');
        
        // Update constitutional summary
        const constitutionalType = document.getElementById('constitutionalType');
        const constitutionalDescription = document.getElementById('constitutionalDescription');
        
        if (constitutionalType) constitutionalType.textContent = this.finalResults.constitutional.type;
        if (constitutionalDescription) constitutionalDescription.textContent = this.finalResults.constitutional.description;

        // Display Yin/Yang results
        this.displayYinYangResults();
        
        // Display Elements results
        this.displayElementsResults();
        
        // Display Qi results
        this.displayQiResults();
        
        // Generate recommendations
        this.generateRecommendations();
    }

    displayYinYangResults() {
        const yinPercent = document.getElementById('finalYinPercent');
        const yangPercent = document.getElementById('finalYangPercent');
        const balanceInterpretation = document.getElementById('balanceInterpretation');

        if (yinPercent) yinPercent.textContent = `${this.finalResults.yinYang.yin}%`;
        if (yangPercent) yangPercent.textContent = `${this.finalResults.yinYang.yang}%`;
        if (balanceInterpretation) balanceInterpretation.innerHTML = `<p>${this.finalResults.yinYang.interpretation}</p>`;
    }

    displayElementsResults() {
        const elementsInterpretation = document.getElementById('elementsInterpretation');
        
        if (elementsInterpretation) {
            elementsInterpretation.innerHTML = `<p>${this.finalResults.elements.interpretation}</p>`;
        }

        // Update elements wheel
        Object.entries(this.finalResults.elements.elements).forEach(([element, scores]) => {
            const elementPercent = document.getElementById(`${element}Percent`);
            
            if (elementPercent) {
                elementPercent.textContent = `${scores.dominant}%`;
            }
        });
    }

    displayQiResults() {
        const qiAnalysis = document.getElementById('qiAnalysis');
        
        if (qiAnalysis) {
            qiAnalysis.innerHTML = `
                <div class="qi-patterns">
                    <h5>Qi Circulation Patterns</h5>
                    <div class="qi-pattern-item">
                        <span>Stagnation: ${this.finalResults.qi.stagnant}%</span>
                        <div class="qi-bar">
                            <div class="qi-fill stagnant" style="width: ${this.finalResults.qi.stagnant}%"></div>
                        </div>
                    </div>
                    <div class="qi-pattern-item">
                        <span>Deficiency: ${this.finalResults.qi.deficient}%</span>
                        <div class="qi-bar">
                            <div class="qi-fill deficient" style="width: ${this.finalResults.qi.deficient}%"></div>
                        </div>
                    </div>
                    <div class="qi-pattern-item">
                        <span>Balanced: ${this.finalResults.qi.balanced}%</span>
                        <div class="qi-bar">
                            <div class="qi-fill balanced" style="width: ${this.finalResults.qi.balanced}%"></div>
                        </div>
                    </div>
                    <div class="qi-interpretation">
                        <p>${this.finalResults.qi.interpretation}</p>
                    </div>
                </div>
            `;

            // Add CSS for Qi bars
            if (!document.getElementById('qi-styles')) {
                const qiStyle = document.createElement('style');
                qiStyle.id = 'qi-styles';
                qiStyle.textContent = `
                    .qi-patterns { background: var(--color-secondary); padding: var(--space-16); border-radius: var(--radius-base); }
                    .qi-pattern-item { display: flex; align-items: center; gap: var(--space-8); margin-bottom: var(--space-8); font-size: var(--font-size-sm); }
                    .qi-bar { flex: 1; height: 12px; background: var(--color-surface); border-radius: var(--radius-full); overflow: hidden; }
                    .qi-fill { height: 100%; transition: width var(--duration-normal) var(--ease-standard); }
                    .qi-fill.stagnant { background: var(--tcm-crimson); }
                    .qi-fill.deficient { background: var(--tcm-ink); }
                    .qi-fill.balanced { background: var(--tcm-jade); }
                    .qi-interpretation { margin-top: var(--space-12); padding-top: var(--space-12); border-top: 1px solid var(--color-border); }
                `;
                document.head.appendChild(qiStyle);
            }
        }
    }

    generateRecommendations() {
        const dietRecs = document.getElementById('dietRecommendations');
        const lifestyleRecs = document.getElementById('lifestyleRecommendations');
        const exerciseRecs = document.getElementById('exerciseRecommendations');
        const seasonalRecs = document.getElementById('seasonalRecommendations');

        // Generate recommendations based on constitution
        const dietRecommendations = this.getDietRecommendations();
        const lifestyleRecommendations = this.getLifestyleRecommendations();
        const exerciseRecommendations = this.getExerciseRecommendations();
        const seasonalRecommendations = this.getSeasonalRecommendations();

        if (dietRecs) {
            dietRecs.innerHTML = dietRecommendations.map(rec => 
                `<div class="recommendation-item">${rec}</div>`
            ).join('');
        }

        if (lifestyleRecs) {
            lifestyleRecs.innerHTML = lifestyleRecommendations.map(rec => 
                `<div class="recommendation-item">${rec}</div>`
            ).join('');
        }

        if (exerciseRecs) {
            exerciseRecs.innerHTML = exerciseRecommendations.map(rec => 
                `<div class="recommendation-item">${rec}</div>`
            ).join('');
        }

        if (seasonalRecs) {
            seasonalRecs.innerHTML = seasonalRecommendations.map(rec => 
                `<div class="recommendation-item">${rec}</div>`
            ).join('');
        }
    }

    getDietRecommendations() {
        const recommendations = [];
        const yinYang = this.finalResults.yinYang;
        const dominantElement = this.finalResults.elements.dominantElement;

        if (yinYang.yin >= 60) {
            recommendations.push('Favor warm, cooked foods and avoid cold, raw foods');
            recommendations.push('Include warming spices like ginger, cinnamon, and cloves');
            recommendations.push('Drink warm beverages throughout the day');
        } else if (yinYang.yang >= 60) {
            recommendations.push('Choose cooling foods like leafy greens and fruits');
            recommendations.push('Avoid spicy, heating foods and excessive red meat');
            recommendations.push('Include plenty of fresh vegetables and cooling herbs');
        }

        // Element-specific recommendations
        switch (dominantElement) {
            case 'wood':
                recommendations.push('Support liver health with green vegetables and sour flavors');
                recommendations.push('Avoid excessive alcohol and fried foods');
                break;
            case 'fire':
                recommendations.push('Support heart health with red foods and bitter flavors');
                recommendations.push('Include cooling foods to balance fire energy');
                break;
            case 'earth':
                recommendations.push('Support digestion with sweet, warming foods');
                recommendations.push('Eat regular meals and avoid overeating');
                break;
            case 'metal':
                recommendations.push('Support lung health with white foods and pungent flavors');
                recommendations.push('Include foods that moisten the lungs');
                break;
            case 'water':
                recommendations.push('Support kidney health with black foods and salty flavors');
                recommendations.push('Include bone broths and nourishing foods');
                break;
        }

        return recommendations.length > 0 ? recommendations : ['Follow a balanced, seasonal diet appropriate for your constitution'];
    }

    getLifestyleRecommendations() {
        const recommendations = [];
        const yinYang = this.finalResults.yinYang;
        const qi = this.finalResults.qi;

        if (yinYang.yin >= 60) {
            recommendations.push('Maintain regular sleep schedule with adequate rest');
            recommendations.push('Create warm, comfortable living environments');
            recommendations.push('Practice gentle, grounding activities like meditation');
        } else if (yinYang.yang >= 60) {
            recommendations.push('Balance activity with adequate cooling and rest');
            recommendations.push('Avoid overheating and excessive stimulation');
            recommendations.push('Practice calming activities to balance high energy');
        }

        if (qi.stagnant >= 50) {
            recommendations.push('Engage in activities that promote circulation');
            recommendations.push('Practice emotional release techniques');
            recommendations.push('Avoid prolonged sitting or static positions');
        } else if (qi.deficient >= 50) {
            recommendations.push('Prioritize rest and energy-building activities');
            recommendations.push('Avoid overexertion and energy-depleting activities');
            recommendations.push('Practice energy cultivation techniques like Qi Gong');
        }

        return recommendations.length > 0 ? recommendations : ['Maintain balanced lifestyle with appropriate rest and activity'];
    }

    getExerciseRecommendations() {
        const recommendations = [];
        const yinYang = this.finalResults.yinYang;
        const dominantElement = this.finalResults.elements.dominantElement;

        if (yinYang.yin >= 60) {
            recommendations.push('Gentle exercises like yoga, walking, and stretching');
            recommendations.push('Avoid excessive or high-impact exercise');
            recommendations.push('Focus on flexibility and coordination');
        } else if (yinYang.yang >= 60) {
            recommendations.push('Moderate to vigorous exercise to release excess energy');
            recommendations.push('Include competitive or challenging activities');
            recommendations.push('Balance intensity with cooling and recovery');
        }

        // Element-specific exercise recommendations
        switch (dominantElement) {
            case 'wood':
                recommendations.push('Flexibility training and activities that promote smooth movement');
                break;
            case 'fire':
                recommendations.push('Social and joyful forms of exercise');
                break;
            case 'earth':
                recommendations.push('Grounding exercises and steady, rhythmic activities');
                break;
            case 'metal':
                recommendations.push('Breathing exercises and activities that strengthen the lungs');
                break;
            case 'water':
                recommendations.push('Activities that build strength and endurance');
                break;
        }

        return recommendations.length > 0 ? recommendations : ['Choose exercise appropriate for your energy levels and constitution'];
    }

    getSeasonalRecommendations() {
        const recommendations = [];
        const dominantElement = this.finalResults.elements.dominantElement;

        recommendations.push('Adjust diet and lifestyle according to seasonal changes');
        
        switch (dominantElement) {
            case 'wood':
                recommendations.push('Spring: Focus on gentle detox and new beginnings');
                recommendations.push('Support liver function during spring season');
                break;
            case 'fire':
                recommendations.push('Summer: Balance joy and excitement with cooling practices');
                recommendations.push('Support heart health during summer heat');
                break;
            case 'earth':
                recommendations.push('Late Summer: Focus on grounding and centering practices');
                recommendations.push('Support digestive health during seasonal transitions');
                break;
            case 'metal':
                recommendations.push('Autumn: Practice letting go and preparing for winter');
                recommendations.push('Support respiratory health during dry autumn weather');
                break;
            case 'water':
                recommendations.push('Winter: Focus on conservation and kidney nourishment');
                recommendations.push('Build energy reserves during winter months');
                break;
        }

        recommendations.push('Adapt clothing, food temperature, and activities to seasonal energy');

        return recommendations;
    }

    downloadResults() {
        // Create downloadable results report
        const results = this.generateReportContent();
        const blob = new Blob([results], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'TCM_Constitutional_Assessment_Results.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    generateReportContent() {
        const date = new Date().toLocaleDateString();
        return `
TCM PATTERN RECOGNITION ASSESSMENT RESULTS
Generated on: ${date}

CONSTITUTIONAL TYPE: ${this.finalResults.constitutional.type}
${this.finalResults.constitutional.description}

YIN/YANG BALANCE:
- Yin: ${this.finalResults.yinYang.yin}%
- Yang: ${this.finalResults.yinYang.yang}%
- Balanced: ${this.finalResults.yinYang.balanced}%

Interpretation: ${this.finalResults.yinYang.interpretation}

FIVE ELEMENTS ANALYSIS:
Dominant Element: ${this.finalResults.elements.dominantElement || 'None clearly dominant'}
${this.finalResults.elements.interpretation}

Element Percentages:
${Object.entries(this.finalResults.elements.elements).map(([element, scores]) => 
    `- ${element.charAt(0).toUpperCase() + element.slice(1)}: ${scores.dominant}% dominant, ${scores.deficient}% deficient, ${scores.balanced}% balanced`
).join('\n')}

QI CIRCULATION PATTERNS:
- Stagnation: ${this.finalResults.qi.stagnant}%
- Deficiency: ${this.finalResults.qi.deficient}%
- Balanced: ${this.finalResults.qi.balanced}%

Interpretation: ${this.finalResults.qi.interpretation}

RECOMMENDATIONS:

Dietary Therapy:
${this.getDietRecommendations().map(rec => `- ${rec}`).join('\n')}

Lifestyle Modifications:
${this.getLifestyleRecommendations().map(rec => `- ${rec}`).join('\n')}

Exercise & Movement:
${this.getExerciseRecommendations().map(rec => `- ${rec}`).join('\n')}

Seasonal Adjustments:
${this.getSeasonalRecommendations().map(rec => `- ${rec}`).join('\n')}

DISCLAIMER:
This assessment is for educational purposes only and does not replace professional medical advice. Please consult qualified TCM practitioners for personalized treatment recommendations.
        `;
    }

    restartAssessment() {
        console.log('Restarting assessment...');
        
        // Reset all data
        this.currentQuestionIndex = 0;
        this.responses = {};
        this.scores = {
            yin: 0,
            yang: 0,
            balanced: 0,
            elements: {
                wood: { dominant: 0, deficient: 0, balanced: 0 },
                fire: { dominant: 0, deficient: 0, balanced: 0 },
                earth: { dominant: 0, deficient: 0, balanced: 0 },
                metal: { dominant: 0, deficient: 0, balanced: 0 },
                water: { dominant: 0, deficient: 0, balanced: 0 }
            },
            qi: { stagnant: 0, deficient: 0, balanced: 0 },
            traditional: { imbalanced: 0, balanced: 0 },
            lifestyle: { stressed: 0, balanced: 0 }
        };

        // Show instructions, hide results
        const resultsSection = document.getElementById('results');
        const instructionsSection = document.getElementById('instructions');
        
        if (resultsSection) resultsSection.classList.add('hidden');
        if (instructionsSection) instructionsSection.classList.remove('hidden');

        // Reset live analysis
        this.resetLiveAnalysis();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    resetLiveAnalysis() {
        // Reset Yin/Yang display
        const yinFill = document.getElementById('yinFill');
        const yangFill = document.getElementById('yangFill');
        const yinPercentage = document.getElementById('yinPercentage');
        const yangPercentage = document.getElementById('yangPercentage');

        if (yinFill) yinFill.style.width = '0%';
        if (yangFill) yangFill.style.width = '0%';
        if (yinPercentage) yinPercentage.textContent = '0%';
        if (yangPercentage) yangPercentage.textContent = '0%';

        // Reset elements display
        const elements = ['wood', 'fire', 'earth', 'metal', 'water'];
        elements.forEach(element => {
            const fillElement = document.getElementById(`${element}Fill`);
            const percentageElement = document.getElementById(`${element}Percentage`);
            
            if (fillElement) fillElement.style.width = '0%';
            if (percentageElement) percentageElement.textContent = '0%';
        });
    }

    findPractitioner() {
        // Open new tab with information about finding TCM practitioners
        const practitionerInfo = `
            <h3>Finding Qualified TCM Practitioners</h3>
            <p>To find qualified Traditional Chinese Medicine practitioners in your area:</p>
            <ul>
                <li>Search for licensed acupuncturists and TCM doctors</li>
                <li>Check professional associations and licensing boards</li>
                <li>Look for practitioners with constitutional assessment experience</li>
                <li>Consider practitioners who integrate traditional and modern approaches</li>
                <li>Verify credentials and training background</li>
            </ul>
            <p>Professional TCM consultation is recommended for complex constitutional patterns, chronic health conditions, and personalized treatment plans.</p>
        `;
        
        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.write(`
                <html>
                    <head><title>Finding TCM Practitioners</title></head>
                    <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                        ${practitionerInfo}
                    </body>
                </html>
            `);
        }
    }

    // Utility function
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

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing TCM Assessment');
    const tcmApp = new TCMAssessment();
    tcmApp.init();
    
    // Make available globally for debugging
    window.tcmApp = tcmApp;
});

// Export for testing if needed
window.TCMAssessment = TCMAssessment;