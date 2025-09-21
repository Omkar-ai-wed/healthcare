// Ayurveda Dosha Assessment Application

// Global application state
const ayurvedaAssessment = {
    // Assessment data from provided JSON
    assessmentData: {
        overview: {
            title: "Ayurveda Dosha Assessment",
            subtitle: "Discover your unique constitution through Vata, Pitta, Kapha analysis",
            purpose: "This comprehensive assessment will help you understand your Ayurvedic constitutional type (Prakriti) and current state (Vikriti) through detailed analysis of your physical, mental, and lifestyle characteristics.",
            instructions: [
                "Answer questions based on your natural, lifelong tendencies",
                "Consider patterns from childhood and throughout your life",
                "Choose the option that describes you most of the time",
                "Be honest - there are no right or wrong answers",
                "Take your time and reflect on each question carefully"
            ],
            totalQuestions: 55,
            estimatedTime: "15-20 minutes"
        },

        sections: {
            physical: {
                title: "Physical Characteristics",
                description: "Questions about your body type, appearance, and physical traits",
                questions: [
                    {
                        id: "body_frame",
                        question: "How would you describe your body frame?",
                        options: {
                            vata: "Thin, light frame with prominent bones, naturally underweight",
                            pitta: "Medium build, well-proportioned with moderate muscle development",
                            kapha: "Large frame, solid build, naturally strong and heavy"
                        }
                    },
                    {
                        id: "height",
                        question: "What is your height pattern?",
                        options: {
                            vata: "Very tall or very short, unusual proportions",
                            pitta: "Average to tall height, well-proportioned",
                            kapha: "Average to short, stocky build"
                        }
                    },
                    {
                        id: "weight_patterns",
                        question: "How does your weight typically behave?",
                        options: {
                            vata: "Difficulty gaining weight, loses weight easily, fluctuates",
                            pitta: "Gains and loses weight relatively easily, stable when balanced",
                            kapha: "Gains weight easily, difficulty losing weight, tends to be overweight"
                        }
                    },
                    {
                        id: "skin_quality",
                        question: "What best describes your skin?",
                        options: {
                            vata: "Dry, rough, cool to touch, prone to wrinkles and dryness",
                            pitta: "Soft, warm, fair, prone to freckles, moles, rashes, sensitive",
                            kapha: "Thick, soft, smooth, cool, pale, well-hydrated, rarely dry"
                        }
                    },
                    {
                        id: "hair_characteristics",
                        question: "How would you describe your hair?",
                        options: {
                            vata: "Dry, frizzy, coarse, prone to split ends, brittle",
                            pitta: "Fine, soft, straight, early graying or balding, oily roots",
                            kapha: "Thick, wavy, lustrous, oily, strong, dark colored"
                        }
                    },
                    {
                        id: "eyes",
                        question: "What describes your eyes?",
                        options: {
                            vata: "Small, dark, active, darting movement, dry",
                            pitta: "Medium size, penetrating gaze, light colored (green, blue, hazel), intense",
                            kapha: "Large, beautiful, calm expression, thick lashes, moist"
                        }
                    },
                    {
                        id: "voice_quality",
                        question: "How would others describe your voice?",
                        options: {
                            vata: "High-pitched, talks fast, animated, variable volume",
                            pitta: "Medium pitch, sharp, clear, articulate, penetrating",
                            kapha: "Deep, slow, melodious, soft, pleasant tone"
                        }
                    },
                    {
                        id: "physical_strength",
                        question: "What describes your physical strength and endurance?",
                        options: {
                            vata: "Low endurance, quick bursts of energy, easily fatigued",
                            pitta: "Medium strength, good endurance when motivated, overheats easily",
                            kapha: "High strength and endurance, steady energy, dislikes exertion"
                        }
                    },
                    {
                        id: "body_temperature",
                        question: "How is your body temperature regulation?",
                        options: {
                            vata: "Cold hands and feet, prefers warm weather, feels cold easily",
                            pitta: "Warm body, prefers cool weather, overheats easily, good circulation",
                            kapha: "Cool body temperature, tolerates cold well, slow to warm up"
                        }
                    },
                    {
                        id: "perspiration",
                        question: "How do you typically perspire?",
                        options: {
                            vata: "Minimal sweating, no strong odor",
                            pitta: "Profuse sweating, strong odor, sweats easily",
                            kapha: "Moderate sweating, pleasant odor, sweats with exertion"
                        }
                    },
                    {
                        id: "walking_style",
                        question: "How would you describe your walking style?",
                        options: {
                            vata: "Quick, irregular pace, light steps, restless movement",
                            pitta: "Determined, purposeful stride, medium pace, goal-oriented",
                            kapha: "Slow, steady, graceful movement, heavy steps"
                        }
                    },
                    {
                        id: "joint_flexibility",
                        question: "How are your joints?",
                        options: {
                            vata: "Very flexible, hypermobile, joints crack and pop",
                            pitta: "Medium flexibility, normal range of motion",
                            kapha: "Less flexible, joints feel tight and stable"
                        }
                    },
                    {
                        id: "nails",
                        question: "What describes your nails?",
                        options: {
                            vata: "Dry, rough, brittle, break easily, ridged",
                            pitta: "Soft, pink, medium thickness, flexible",
                            kapha: "Thick, strong, smooth, well-formed, hard to break"
                        }
                    },
                    {
                        id: "hand_characteristics",
                        question: "How would you describe your hands?",
                        options: {
                            vata: "Dry, rough, cold, thin fingers, prominent veins",
                            pitta: "Warm, soft, pink, medium fingers, good circulation",
                            kapha: "Cool, smooth, thick fingers, firm grip, well-padded palms"
                        }
                    },
                    {
                        id: "physical_impression",
                        question: "What overall physical impression do you give?",
                        options: {
                            vata: "Delicate, ethereal, changeable appearance",
                            pitta: "Sharp features, intense presence, athletic appearance",
                            kapha: "Soft features, calm presence, solid appearance"
                        }
                    }
                ]
            },
            mental: {
                title: "Mental & Emotional Patterns",
                description: "Questions about your personality, thinking patterns, and emotional responses",
                questions: [
                    {
                        id: "learning_style",
                        question: "How do you typically learn new information?",
                        options: {
                            vata: "Quick to learn, quick to forget, grasps concepts rapidly",
                            pitta: "Focused learner, good retention, likes to understand thoroughly",
                            kapha: "Slow to learn but excellent long-term retention, methodical"
                        }
                    },
                    {
                        id: "memory_patterns",
                        question: "How is your memory?",
                        options: {
                            vata: "Recent memory good, long-term memory poor, forgetful",
                            pitta: "Sharp memory, good recall, remembers details well",
                            kapha: "Slow to remember initially, but once learned, never forgets"
                        }
                    },
                    {
                        id: "decision_making",
                        question: "How do you make decisions?",
                        options: {
                            vata: "Changes mind frequently, difficulty making decisions, impulsive",
                            pitta: "Quick, decisive, determined, sticks to decisions",
                            kapha: "Takes time to decide, but once decided, very firm"
                        }
                    },
                    {
                        id: "communication_style",
                        question: "How do you typically communicate?",
                        options: {
                            vata: "Talks fast, animated, jumps between topics, expressive",
                            pitta: "Articulate, persuasive, direct, sometimes sharp or critical",
                            kapha: "Slow, thoughtful speech, good listener, diplomatic"
                        }
                    },
                    {
                        id: "emotional_responses",
                        question: "How do you typically respond emotionally?",
                        options: {
                            vata: "Emotions change quickly, sensitive, excitable, anxious when stressed",
                            pitta: "Intense emotions, passionate, irritable when stressed",
                            kapha: "Steady emotions, calm, possessive when stressed"
                        }
                    },
                    {
                        id: "stress_response",
                        question: "How do you typically respond to stress?",
                        options: {
                            vata: "Becomes anxious, worried, scattered, overwhelmed",
                            pitta: "Becomes angry, irritable, critical, impatient",
                            kapha: "Withdraws, becomes stubborn, depressed, or lethargic"
                        }
                    },
                    {
                        id: "work_style",
                        question: "What describes your work style?",
                        options: {
                            vata: "Creative bursts, easily distracted, works in spurts",
                            pitta: "Focused, goal-oriented, works intensely, natural leader",
                            kapha: "Steady, methodical, dislikes pressure, prefers routine"
                        }
                    },
                    {
                        id: "social_preferences",
                        question: "What describes your social preferences?",
                        options: {
                            vata: "Enjoys variety in relationships, makes friends easily, changeable",
                            pitta: "Selective in relationships, enjoys intellectual discussions",
                            kapha: "Few close friends, loyal, supportive, family-oriented"
                        }
                    },
                    {
                        id: "mental_activity",
                        question: "How would you describe your mental activity?",
                        options: {
                            vata: "Mind always active, many thoughts, creative, restless",
                            pitta: "Sharp, focused thinking, good concentration, analytical",
                            kapha: "Calm mind, steady thoughts, difficulty with change"
                        }
                    },
                    {
                        id: "change_response",
                        question: "How do you respond to change?",
                        options: {
                            vata: "Loves change and variety, adapts quickly, thrives on new experiences",
                            pitta: "Adapts well when it serves their goals, likes controlled change",
                            kapha: "Dislikes change, prefers routine and stability, slow to adapt"
                        }
                    },
                    {
                        id: "motivation_patterns",
                        question: "What typically motivates you?",
                        options: {
                            vata: "Motivated by enthusiasm and inspiration, loses interest quickly",
                            pitta: "Motivated by challenges and achievement, competitive",
                            kapha: "Motivated by security and comfort, needs encouragement"
                        }
                    },
                    {
                        id: "creativity_expression",
                        question: "How do you express creativity?",
                        options: {
                            vata: "Highly creative, artistic, imaginative, innovative",
                            pitta: "Creative in practical ways, good at organizing and planning",
                            kapha: "Creative in nurturing ways, traditional arts, patient craftsmanship"
                        }
                    },
                    {
                        id: "attention_span",
                        question: "How is your attention span?",
                        options: {
                            vata: "Short attention span, easily distracted, multitasks",
                            pitta: "Good focus when interested, single-minded concentration",
                            kapha: "Long attention span, steady focus, methodical approach"
                        }
                    },
                    {
                        id: "risk_taking",
                        question: "How do you approach risk-taking?",
                        options: {
                            vata: "Takes risks impulsively, adventurous, experimental",
                            pitta: "Takes calculated risks, brave when pursuing goals",
                            kapha: "Risk-averse, cautious, prefers security and safety"
                        }
                    },
                    {
                        id: "mental_energy",
                        question: "How is your mental energy throughout the day?",
                        options: {
                            vata: "Mental energy fluctuates, periods of high activity then exhaustion",
                            pitta: "Intense mental energy, burns bright, can burn out",
                            kapha: "Steady mental energy, slow starter, sustained endurance"
                        }
                    }
                ]
            },
            digestive: {
                title: "Digestive Patterns",
                description: "Questions about your appetite, digestion, and eating habits",
                questions: [
                    {
                        id: "appetite_patterns",
                        question: "How would you describe your appetite?",
                        options: {
                            vata: "Variable appetite, irregular, often forgets to eat",
                            pitta: "Strong, regular appetite, becomes irritable when hungry",
                            kapha: "Slow, steady appetite, can skip meals without discomfort"
                        }
                    },
                    {
                        id: "digestion_quality",
                        question: "How is your digestion?",
                        options: {
                            vata: "Irregular digestion, gas, bloating, alternating constipation/diarrhea",
                            pitta: "Strong digestion, rarely indigestion, efficient metabolism",
                            kapha: "Slow but steady digestion, feels heavy after eating"
                        }
                    },
                    {
                        id: "food_preferences",
                        question: "What types of foods do you naturally prefer?",
                        options: {
                            vata: "Prefers warm, moist, grounding foods, sweet and salty tastes",
                            pitta: "Prefers cool, refreshing foods, sweet and bitter tastes",
                            kapha: "Prefers light, warm, spicy foods, pungent and bitter tastes"
                        }
                    },
                    {
                        id: "eating_habits",
                        question: "What describes your eating habits?",
                        options: {
                            vata: "Eats irregularly, snacks frequently, easily distracted while eating",
                            pitta: "Eats regularly, focused eating, dislikes missing meals",
                            kapha: "Eats slowly, enjoys food, tendency to overeat"
                        }
                    },
                    {
                        id: "thirst_patterns",
                        question: "How is your thirst?",
                        options: {
                            vata: "Variable thirst, prefers warm drinks, often dehydrated",
                            pitta: "Strong thirst, prefers cold drinks, drinks large quantities",
                            kapha: "Low thirst, satisfied with small amounts of liquid"
                        }
                    },
                    {
                        id: "bowel_movements",
                        question: "How are your bowel movements?",
                        options: {
                            vata: "Irregular, dry, hard, constipation tendency, gas",
                            pitta: "Regular, soft, loose tendency, 2-3 times daily",
                            kapha: "Regular but sluggish, heavy, once daily, mucus"
                        }
                    },
                    {
                        id: "weight_management",
                        question: "How do you manage weight?",
                        options: {
                            vata: "Difficulty gaining weight, loses weight when stressed",
                            pitta: "Maintains weight easily when balanced, gains muscle easily",
                            kapha: "Gains weight easily, holds onto weight, slow metabolism"
                        }
                    },
                    {
                        id: "food_reactions",
                        question: "How do you react to different foods?",
                        options: {
                            vata: "Sensitive to cold, dry, raw foods, needs regular meals",
                            pitta: "Sensitive to spicy, hot, oily foods, prefers cooling foods",
                            kapha: "Sensitive to heavy, cold, dairy foods, needs light foods"
                        }
                    },
                    {
                        id: "eating_speed",
                        question: "How fast do you typically eat?",
                        options: {
                            vata: "Eats quickly, often while multitasking, irregular timing",
                            pitta: "Eats at moderate pace, focused on food, regular timing",
                            kapha: "Eats slowly, savors food, enjoys the eating experience"
                        }
                    },
                    {
                        id: "post_meal_energy",
                        question: "How do you feel after eating?",
                        options: {
                            vata: "Energy fluctuates after eating, sometimes tired, sometimes energized",
                            pitta: "Energized after eating, ready for activity, strong metabolism",
                            kapha: "Sleepy after eating, needs time to digest, feels heavy"
                        }
                    }
                ]
            },
            sleep: {
                title: "Sleep & Energy Patterns",
                description: "Questions about your sleep quality, energy levels, and daily rhythms",
                questions: [
                    {
                        id: "sleep_quality",
                        question: "How would you describe your sleep?",
                        options: {
                            vata: "Light sleeper, difficulty falling asleep, easily disturbed",
                            pitta: "Sound sleeper, falls asleep easily, moderate sleep needs",
                            kapha: "Deep sleeper, loves to sleep, difficulty waking up"
                        }
                    },
                    {
                        id: "sleep_duration",
                        question: "How much sleep do you typically need?",
                        options: {
                            vata: "Needs 7-8 hours but often gets less, restless sleep",
                            pitta: "Needs 6-8 hours, efficient sleep, refreshed upon waking",
                            kapha: "Needs 8+ hours, loves long sleep, groggy if awakened early"
                        }
                    },
                    {
                        id: "dreams",
                        question: "What are your dreams typically like?",
                        options: {
                            vata: "Vivid, active dreams, flying, running, fearful themes",
                            pitta: "Colorful, intense dreams, adventures, conflicts, problem-solving",
                            kapha: "Few remembered dreams, peaceful, romantic, or water themes"
                        }
                    },
                    {
                        id: "daily_energy",
                        question: "How is your energy throughout the day?",
                        options: {
                            vata: "Energy fluctuates, bursts of activity then fatigue, afternoon slump",
                            pitta: "Consistent energy, peak in midday, prefers structured schedule",
                            kapha: "Slow to start, steady energy once going, evening energy"
                        }
                    },
                    {
                        id: "sleep_position",
                        question: "What is your preferred sleep position?",
                        options: {
                            vata: "Changes positions frequently, sleeps on side or stomach",
                            pitta: "Sleeps on back or side, moderate movement, kicks off covers",
                            kapha: "Sleeps on back or side, doesn't move much, likes heavy covers"
                        }
                    },
                    {
                        id: "sleep_loss_response",
                        question: "How do you respond to lack of sleep?",
                        options: {
                            vata: "Very affected by lack of sleep, becomes anxious and scattered",
                            pitta: "Moderately affected, becomes irritable and impatient",
                            kapha: "Less affected initially, but accumulates sleep debt"
                        }
                    },
                    {
                        id: "best_time_of_day",
                        question: "When is your best time of day?",
                        options: {
                            vata: "Variable, often evening person, creativity peaks at unusual hours",
                            pitta: "Morning to midday person, most productive 10am-2pm",
                            kapha: "Slow mornings, better in evening, needs time to wake up"
                        }
                    },
                    {
                        id: "seasonal_energy",
                        question: "How does your energy change with seasons?",
                        options: {
                            vata: "Lower energy in fall/winter (Vata season), better in spring/summer",
                            pitta: "Lower energy in summer (Pitta season), better in fall/winter",
                            kapha: "Lower energy in spring (Kapha season), better in summer/fall"
                        }
                    }
                ]
            },
            lifestyle: {
                title: "Environmental & Lifestyle Preferences",
                description: "Questions about your preferences for weather, activities, and lifestyle",
                questions: [
                    {
                        id: "weather_preferences",
                        question: "What weather do you prefer?",
                        options: {
                            vata: "Prefers warm, humid weather, dislikes cold and wind",
                            pitta: "Prefers cool, dry weather, dislikes heat and humidity",
                            kapha: "Prefers warm, dry weather, dislikes cold and dampness"
                        }
                    },
                    {
                        id: "exercise_preferences",
                        question: "What type of exercise do you prefer?",
                        options: {
                            vata: "Enjoys gentle, flowing exercises like yoga, walking, dancing",
                            pitta: "Enjoys competitive sports, moderate intensity, swimming",
                            kapha: "Prefers vigorous exercise once motivated, strength training"
                        }
                    },
                    {
                        id: "activity_levels",
                        question: "What describes your activity levels?",
                        options: {
                            vata: "Bursts of activity followed by rest, easily overexerted",
                            pitta: "Moderate, consistent activity, goal-oriented exercise",
                            kapha: "Low activity preference, needs motivation, high endurance"
                        }
                    },
                    {
                        id: "travel_response",
                        question: "How do you respond to travel?",
                        options: {
                            vata: "Loves travel but easily exhausted by it, jet lag sensitive",
                            pitta: "Enjoys travel when well-planned, adapts moderately well",
                            kapha: "Prefers familiar places, dislikes disruption of routine"
                        }
                    },
                    {
                        id: "spending_habits",
                        question: "What describes your spending habits?",
                        options: {
                            vata: "Impulsive spending, often on small items, poor money management",
                            pitta: "Spends on quality items, planned purchases, luxury items",
                            kapha: "Conservative spending, saves money, spends on comfort/security"
                        }
                    },
                    {
                        id: "home_environment",
                        question: "What type of home environment do you prefer?",
                        options: {
                            vata: "Prefers warm, cozy spaces, eclectic décor, dislikes clutter",
                            pitta: "Prefers organized, functional spaces, quality furnishings",
                            kapha: "Prefers comfortable, stable spaces, sentimental items"
                        }
                    },
                    {
                        id: "routine_response",
                        question: "How do you respond to routine?",
                        options: {
                            vata: "Dislikes rigid routine, needs variety and flexibility",
                            pitta: "Likes structured routine that supports goals, efficient scheduling",
                            kapha: "Loves routine and ritual, dislikes unexpected changes"
                        }
                    }
                ]
            }
        },

        doshaCharacteristics: {
            vata: {
                name: "Vata",
                elements: "Air + Space",
                symbol: "💨",
                description: "The energy of movement and communication",
                qualities: ["Light", "Dry", "Cold", "Rough", "Subtle", "Mobile"],
                whenBalanced: [
                    "Creative and artistic expression flows naturally",
                    "Mental alertness and quick comprehension",
                    "Regular elimination and healthy circulation",
                    "Enthusiasm and joy in daily activities",
                    "Flexible and adaptable to change"
                ],
                whenImbalanced: [
                    "Anxiety, worry, racing thoughts",
                    "Constipation, dry skin, joint pain",
                    "Difficulty concentrating, scattered mind",
                    "Insomnia, restless sleep",
                    "Fear, nervousness, feeling overwhelmed"
                ]
            },
            pitta: {
                name: "Pitta",
                elements: "Fire + Water",
                symbol: "🔥",
                description: "The energy of transformation and metabolism",
                qualities: ["Hot", "Sharp", "Light", "Oily", "Liquid", "Mobile"],
                whenBalanced: [
                    "Sharp intellect and strong comprehension",
                    "Efficient digestion and robust appetite",
                    "Natural leadership and confidence",
                    "Healthy competitive spirit",
                    "Radiant complexion and strong immunity"
                ],
                whenImbalanced: [
                    "Anger, irritability, criticism",
                    "Acid reflux, skin rashes, inflammation",
                    "Impatience, perfectionism",
                    "Excessive sweating, overheating",
                    "Judgmental attitude, workaholic tendencies"
                ]
            },
            kapha: {
                name: "Kapha",
                elements: "Earth + Water",
                symbol: "🌍",
                description: "The energy of structure and stability",
                qualities: ["Heavy", "Cold", "Moist", "Oily", "Smooth", "Static"],
                whenBalanced: [
                    "Strong immunity and rarely gets sick",
                    "Loving, compassionate, and supportive nature",
                    "Steady energy and endurance",
                    "Excellent long-term memory",
                    "Natural strength and stability"
                ],
                whenImbalanced: [
                    "Weight gain, sluggish metabolism",
                    "Congestion, excessive mucus",
                    "Mental fog, depression, lethargy",
                    "Attachment, possessiveness",
                    "Resistance to change, stubbornness"
                ]
            }
        },

        recommendations: {
            dietary: {
                vata: [
                    "Favor warm, moist, grounding foods",
                    "Include sweet, sour, and salty tastes",
                    "Eat regular meals at consistent times",
                    "Avoid cold, dry, raw foods",
                    "Use warming spices like ginger, cinnamon, cardamom"
                ],
                pitta: [
                    "Favor cool, refreshing foods",
                    "Include sweet, bitter, and astringent tastes",
                    "Avoid spicy, sour, and salty foods",
                    "Eat regularly but avoid overeating",
                    "Use cooling spices like coriander, fennel, mint"
                ],
                kapha: [
                    "Favor light, warm, spicy foods",
                    "Include pungent, bitter, and astringent tastes",
                    "Avoid heavy, cold, and oily foods",
                    "Eat smaller, more frequent meals",
                    "Use heating spices like black pepper, ginger, turmeric"
                ]
            },
            lifestyle: {
                vata: [
                    "Maintain regular daily routine",
                    "Practice gentle, grounding exercises",
                    "Get adequate rest and avoid overexertion",
                    "Stay warm and avoid cold, windy weather",
                    "Practice calming activities like meditation"
                ],
                pitta: [
                    "Avoid overheating and excessive sun",
                    "Practice moderate, non-competitive exercise",
                    "Take time to cool down and relax",
                    "Avoid skipping meals",
                    "Practice cooling activities like moonlight walks"
                ],
                kapha: [
                    "Stay active and avoid sedentary lifestyle",
                    "Practice vigorous, energizing exercises",
                    "Wake up early and avoid oversleeping",
                    "Seek stimulating and varied activities",
                    "Avoid heavy, cold, and damp environments"
                ]
            },
            exercise: {
                vata: [
                    "Yoga, walking, tai chi, swimming",
                    "Gentle, flowing movements",
                    "Regular but not excessive",
                    "Avoid high-impact activities",
                    "Focus on flexibility and balance"
                ],
                pitta: [
                    "Swimming, cycling, winter sports",
                    "Moderate intensity activities",
                    "Avoid exercising in hot weather",
                    "Team sports with friendly competition",
                    "Moon salutations instead of sun salutations"
                ],
                kapha: [
                    "Running, aerobics, weight training",
                    "Vigorous, energizing activities",
                    "Competitive sports for motivation",
                    "Morning exercise preferred",
                    "Vary routine to maintain interest"
                ]
            }
        }
    },

    // Application state
    currentSection: 'hero',
    currentSectionIndex: 0,
    currentQuestionIndex: 0,
    answers: {},
    scores: { vata: 0, pitta: 0, kapha: 0 },
    sectionScores: {},
    totalAnswers: 0,
    doshaChart: null
};

// Utility Functions
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
    document.querySelectorAll('.hero-section, .assessment-section, .results-section').forEach(section => {
        section.classList.remove('active-section');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active-section');
        ayurvedaAssessment.currentSection = sectionName;
        
        // Update progress nav visibility
        const progressNav = document.querySelector('.progress-nav');
        if (sectionName === 'assessment') {
            progressNav.classList.remove('hidden');
        } else {
            progressNav.classList.add('hidden');
        }
        
        showNotification(`Navigated to ${sectionName} section`, 'info');
    }
}

function startAssessment() {
    console.log('Starting Ayurveda assessment');
    showSection('assessment');
    initializeAssessment();
    showNotification('Assessment started - answer honestly based on lifelong patterns', 'success');
}

// Assessment Initialization
function initializeAssessment() {
    console.log('Initializing assessment');
    
    // Reset assessment state
    ayurvedaAssessment.currentSectionIndex = 0;
    ayurvedaAssessment.currentQuestionIndex = 0;
    ayurvedaAssessment.answers = {};
    ayurvedaAssessment.scores = { vata: 0, pitta: 0, kapha: 0 };
    ayurvedaAssessment.sectionScores = {};
    ayurvedaAssessment.totalAnswers = 0;
    
    // Initialize section scores
    Object.keys(ayurvedaAssessment.assessmentData.sections).forEach(sectionKey => {
        ayurvedaAssessment.sectionScores[sectionKey] = { vata: 0, pitta: 0, kapha: 0 };
    });
    
    loadCurrentQuestion();
    updateProgressDisplay();
}

// Question Management
function loadCurrentQuestion() {
    const sections = Object.keys(ayurvedaAssessment.assessmentData.sections);
    const currentSectionKey = sections[ayurvedaAssessment.currentSectionIndex];
    const currentSection = ayurvedaAssessment.assessmentData.sections[currentSectionKey];
    const currentQuestion = currentSection.questions[ayurvedaAssessment.currentQuestionIndex];
    
    console.log('Loading question:', currentQuestion.id);
    
    // Update section info
    document.querySelector('.section-title').textContent = currentSection.title;
    document.querySelector('.section-description').textContent = currentSection.description;
    
    // Update question counter
    document.querySelector('.current-q').textContent = ayurvedaAssessment.currentQuestionIndex + 1;
    document.querySelector('.total-q').textContent = currentSection.questions.length;
    
    // Update question text
    document.querySelector('.question-text').textContent = currentQuestion.question;
    
    // Update options
    document.querySelector('#option-vata + label .option-text').textContent = currentQuestion.options.vata;
    document.querySelector('#option-pitta + label .option-text').textContent = currentQuestion.options.pitta;
    document.querySelector('#option-kapha + label .option-text').textContent = currentQuestion.options.kapha;
    
    // Clear previous selection
    document.querySelectorAll('input[name="current-question"]').forEach(input => {
        input.checked = false;
    });
    
    // Check if this question was already answered
    if (ayurvedaAssessment.answers[currentQuestion.id]) {
        const previousAnswer = ayurvedaAssessment.answers[currentQuestion.id];
        document.querySelector(`input[value="${previousAnswer}"]`).checked = true;
    }
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Add event listeners to options
    document.querySelectorAll('input[name="current-question"]').forEach(input => {
        input.addEventListener('change', handleAnswerSelect);
    });
}

function handleAnswerSelect(event) {
    const sections = Object.keys(ayurvedaAssessment.assessmentData.sections);
    const currentSectionKey = sections[ayurvedaAssessment.currentSectionIndex];
    const currentSection = ayurvedaAssessment.assessmentData.sections[currentSectionKey];
    const currentQuestion = currentSection.questions[ayurvedaAssessment.currentQuestionIndex];
    
    const selectedDosha = event.target.value;
    const previousAnswer = ayurvedaAssessment.answers[currentQuestion.id];
    
    console.log('Answer selected:', selectedDosha, 'for question:', currentQuestion.id);
    
    // Remove previous answer from scores if it exists
    if (previousAnswer) {
        ayurvedaAssessment.scores[previousAnswer]--;
        ayurvedaAssessment.sectionScores[currentSectionKey][previousAnswer]--;
        ayurvedaAssessment.totalAnswers--;
    }
    
    // Add new answer to scores
    ayurvedaAssessment.answers[currentQuestion.id] = selectedDosha;
    ayurvedaAssessment.scores[selectedDosha]++;
    ayurvedaAssessment.sectionScores[currentSectionKey][selectedDosha]++;
    ayurvedaAssessment.totalAnswers++;
    
    // Update displays
    updateScoreDisplay();
    updateProgressDisplay();
    updateNavigationButtons();
    
    showNotification(`Answer recorded for ${currentQuestion.id.replace('_', ' ')}`, 'success');
}

function updateScoreDisplay() {
    const total = Math.max(ayurvedaAssessment.totalAnswers, 1); // Prevent division by zero
    const vataPercentage = Math.round((ayurvedaAssessment.scores.vata / total) * 100);
    const pittaPercentage = Math.round((ayurvedaAssessment.scores.pitta / total) * 100);
    const kaphaPercentage = Math.round((ayurvedaAssessment.scores.kapha / total) * 100);
    
    // Update score bars and percentages
    document.querySelector('[data-dosha="vata"] .score-fill').style.width = `${vataPercentage}%`;
    document.querySelector('[data-dosha="vata"] .score-percentage').textContent = `${vataPercentage}%`;
    
    document.querySelector('[data-dosha="pitta"] .score-fill').style.width = `${pittaPercentage}%`;
    document.querySelector('[data-dosha="pitta"] .score-percentage').textContent = `${pittaPercentage}%`;
    
    document.querySelector('[data-dosha="kapha"] .score-fill').style.width = `${kaphaPercentage}%`;
    document.querySelector('[data-dosha="kapha"] .score-percentage').textContent = `${kaphaPercentage}%`;
    
    // Update primary dosha display
    const doshas = [
        { name: 'Vata', symbol: '💨', percentage: vataPercentage, key: 'vata' },
        { name: 'Pitta', symbol: '🔥', percentage: pittaPercentage, key: 'pitta' },
        { name: 'Kapha', symbol: '🌍', percentage: kaphaPercentage, key: 'kapha' }
    ];
    
    const primaryDosha = doshas.sort((a, b) => b.percentage - a.percentage)[0];
    
    document.querySelector('.primary-symbol').textContent = primaryDosha.symbol;
    document.querySelector('.primary-name').textContent = primaryDosha.name;
    document.querySelector('.primary-percentage').textContent = `${primaryDosha.percentage}%`;
}

function updateProgressDisplay() {
    // Update overall progress bar
    const totalQuestions = ayurvedaAssessment.assessmentData.overview.totalQuestions;
    const progressPercentage = (ayurvedaAssessment.totalAnswers / totalQuestions) * 100;
    
    document.querySelector('.progress-fill').style.width = `${progressPercentage}%`;
    document.querySelector('.progress-text').textContent = `${ayurvedaAssessment.totalAnswers} / ${totalQuestions} Complete`;
    
    // Update section progress
    Object.keys(ayurvedaAssessment.assessmentData.sections).forEach((sectionKey, index) => {
        const section = ayurvedaAssessment.assessmentData.sections[sectionKey];
        const sectionAnswers = Object.keys(ayurvedaAssessment.answers).filter(questionId => {
            return section.questions.some(q => q.id === questionId);
        }).length;
        
        const sectionElement = document.querySelector(`[data-section="${sectionKey}"] .section-progress`);
        if (sectionElement) {
            sectionElement.textContent = `${sectionAnswers}/${section.questions.length}`;
        }
        
        // Update section breakdown in scoring panel
        const sectionScoreElement = document.querySelectorAll('.section-score')[index];
        if (sectionScoreElement) {
            sectionScoreElement.querySelector('.section-status').textContent = `${sectionAnswers}/${section.questions.length}`;
        }
        
        // Update active section in progress nav
        const progressSection = document.querySelector(`[data-section="${sectionKey}"]`);
        if (progressSection) {
            if (index === ayurvedaAssessment.currentSectionIndex) {
                progressSection.classList.add('active');
            } else {
                progressSection.classList.remove('active');
            }
        }
    });
}

function updateNavigationButtons() {
    const sections = Object.keys(ayurvedaAssessment.assessmentData.sections);
    const currentSection = ayurvedaAssessment.assessmentData.sections[sections[ayurvedaAssessment.currentSectionIndex]];
    const isFirstQuestion = ayurvedaAssessment.currentSectionIndex === 0 && ayurvedaAssessment.currentQuestionIndex === 0;
    const isLastSection = ayurvedaAssessment.currentSectionIndex === sections.length - 1;
    const isLastQuestion = ayurvedaAssessment.currentQuestionIndex === currentSection.questions.length - 1;
    const hasAnswer = document.querySelector('input[name="current-question"]:checked');
    
    // Previous button
    document.getElementById('prev-btn').disabled = isFirstQuestion;
    
    // Next button vs Complete button
    if (isLastSection && isLastQuestion) {
        document.getElementById('next-btn').classList.add('hidden');
        document.getElementById('complete-btn').classList.remove('hidden');
        document.getElementById('complete-btn').disabled = !hasAnswer;
    } else {
        document.getElementById('next-btn').classList.remove('hidden');
        document.getElementById('complete-btn').classList.add('hidden');
        document.getElementById('next-btn').disabled = !hasAnswer;
    }
}

// Navigation Functions
function nextQuestion() {
    const sections = Object.keys(ayurvedaAssessment.assessmentData.sections);
    const currentSection = ayurvedaAssessment.assessmentData.sections[sections[ayurvedaAssessment.currentSectionIndex]];
    
    if (ayurvedaAssessment.currentQuestionIndex < currentSection.questions.length - 1) {
        ayurvedaAssessment.currentQuestionIndex++;
    } else if (ayurvedaAssessment.currentSectionIndex < sections.length - 1) {
        ayurvedaAssessment.currentSectionIndex++;
        ayurvedaAssessment.currentQuestionIndex = 0;
    }
    
    loadCurrentQuestion();
    updateProgressDisplay();
    showNotification('Next question loaded', 'info');
}

function previousQuestion() {
    if (ayurvedaAssessment.currentQuestionIndex > 0) {
        ayurvedaAssessment.currentQuestionIndex--;
    } else if (ayurvedaAssessment.currentSectionIndex > 0) {
        ayurvedaAssessment.currentSectionIndex--;
        const sections = Object.keys(ayurvedaAssessment.assessmentData.sections);
        const previousSection = ayurvedaAssessment.assessmentData.sections[sections[ayurvedaAssessment.currentSectionIndex]];
        ayurvedaAssessment.currentQuestionIndex = previousSection.questions.length - 1;
    }
    
    loadCurrentQuestion();
    updateProgressDisplay();
    showNotification('Previous question loaded', 'info');
}

function completeAssessment() {
    console.log('Completing assessment');
    generateResults();
    showSection('results');
    showNotification('Assessment complete! View your personalized results below', 'success');
}

// Results Generation
function generateResults() {
    console.log('Generating assessment results');
    
    const total = ayurvedaAssessment.totalAnswers;
    const vataPercentage = Math.round((ayurvedaAssessment.scores.vata / total) * 100);
    const pittaPercentage = Math.round((ayurvedaAssessment.scores.pitta / total) * 100);
    const kaphaPercentage = Math.round((ayurvedaAssessment.scores.kapha / total) * 100);
    
    // Determine primary dosha
    const doshas = [
        { name: 'Vata', symbol: '💨', percentage: vataPercentage, key: 'vata' },
        { name: 'Pitta', symbol: '🔥', percentage: pittaPercentage, key: 'pitta' },
        { name: 'Kapha', symbol: '🌍', percentage: kaphaPercentage, key: 'kapha' }
    ];
    
    const sortedDoshas = doshas.sort((a, b) => b.percentage - a.percentage);
    const primaryDosha = sortedDoshas[0];
    
    // Update primary constitution display
    updatePrimaryConstitutionDisplay(primaryDosha);
    
    // Generate chart
    generateDoshaChart(vataPercentage, pittaPercentage, kaphaPercentage);
    
    // Update characteristics and recommendations
    updateCharacteristicsDisplay(primaryDosha.key);
    updateRecommendationsDisplay(primaryDosha.key);
    
    console.log('Results generated for primary dosha:', primaryDosha.name);
}

function updatePrimaryConstitutionDisplay(primaryDosha) {
    const constitutionCard = document.querySelector('.constitution-card');
    const characteristics = ayurvedaAssessment.assessmentData.doshaCharacteristics[primaryDosha.key];
    
    // Update header
    constitutionCard.querySelector('.constitution-symbol').textContent = primaryDosha.symbol;
    constitutionCard.querySelector('.constitution-name').textContent = `Primary: ${primaryDosha.name}`;
    constitutionCard.querySelector('.constitution-percentage').textContent = `${primaryDosha.percentage}%`;
    
    // Update description
    const descriptionDiv = constitutionCard.querySelector('.constitution-description');
    descriptionDiv.innerHTML = `
        <p><strong>Elements:</strong> ${characteristics.elements}</p>
        <p><strong>Energy:</strong> ${characteristics.description}</p>
        <p>You have a predominantly ${primaryDosha.name} constitution, ${characteristics.description.toLowerCase()}.</p>
    `;
    
    // Update border color
    const colorMap = {
        vata: '--color-vata',
        pitta: '--color-pitta',
        kapha: '--color-kapha'
    };
    constitutionCard.style.borderLeftColor = `var(${colorMap[primaryDosha.key]})`;
}

function generateDoshaChart(vata, pitta, kapha) {
    const ctx = document.getElementById('doshaChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (ayurvedaAssessment.doshaChart) {
        ayurvedaAssessment.doshaChart.destroy();
    }
    
    ayurvedaAssessment.doshaChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Vata (Air + Space)', 'Pitta (Fire + Water)', 'Kapha (Earth + Water)'],
            datasets: [{
                data: [vata, pitta, kapha],
                backgroundColor: ['#87CEEB', '#FF6347', '#9ACD32'],
                borderColor: ['#4682B4', '#DC143C', '#6B8E23'],
                borderWidth: 3,
                hoverBorderWidth: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                duration: 2000
            }
        }
    });
    
    console.log('Dosha chart generated');
}

function updateCharacteristicsDisplay(primaryDoshaKey) {
    const characteristics = ayurvedaAssessment.assessmentData.doshaCharacteristics[primaryDoshaKey];
    
    // Update balanced characteristics
    const balancedTab = document.getElementById('balanced-tab');
    balancedTab.innerHTML = '<div class="characteristics-list">' +
        characteristics.whenBalanced.map(characteristic => 
            `<div class="characteristic-item">
                <span class="characteristic-icon">✨</span>
                <span class="characteristic-text">${characteristic}</span>
            </div>`
        ).join('') + '</div>';
    
    // Update imbalanced characteristics
    const imbalancedTab = document.getElementById('imbalanced-tab');
    imbalancedTab.innerHTML = '<div class="characteristics-list">' +
        characteristics.whenImbalanced.map(characteristic => 
            `<div class="characteristic-item warning">
                <span class="characteristic-icon">⚠️</span>
                <span class="characteristic-text">${characteristic}</span>
            </div>`
        ).join('') + '</div>';
    
    // Update qualities
    const qualitiesTab = document.getElementById('qualities-tab');
    qualitiesTab.innerHTML = '<div class="qualities-grid">' +
        characteristics.qualities.map(quality => 
            `<div class="quality-item">${quality}</div>`
        ).join('') + '</div>';
}

function updateRecommendationsDisplay(primaryDoshaKey) {
    const recommendations = ayurvedaAssessment.assessmentData.recommendations;
    
    // Update dietary recommendations
    const dietaryTab = document.getElementById('dietary-tab');
    dietaryTab.innerHTML = '<div class="recommendation-list">' +
        recommendations.dietary[primaryDoshaKey].map(rec => 
            `<div class="recommendation-item">
                <span class="rec-icon">✅</span>
                <span class="rec-text">${rec}</span>
            </div>`
        ).join('') + '</div>';
    
    // Update lifestyle recommendations
    const lifestyleTab = document.getElementById('lifestyle-tab');
    lifestyleTab.innerHTML = '<div class="recommendation-list">' +
        recommendations.lifestyle[primaryDoshaKey].map(rec => 
            `<div class="recommendation-item">
                <span class="rec-icon">🧘</span>
                <span class="rec-text">${rec}</span>
            </div>`
        ).join('') + '</div>';
    
    // Update exercise recommendations
    const exerciseTab = document.getElementById('exercise-tab');
    exerciseTab.innerHTML = '<div class="recommendation-list">' +
        recommendations.exercise[primaryDoshaKey].map(rec => 
            `<div class="recommendation-item">
                <span class="rec-icon">💪</span>
                <span class="rec-text">${rec}</span>
            </div>`
        ).join('') + '</div>';
}

// Tab Management
function showCharacteristicTab(tabName) {
    // Remove active from all tabs and panels
    document.querySelectorAll('.characteristics-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.characteristics-tabs .tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Add active to selected tab and panel
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    showNotification(`Viewing ${tabName} characteristics`, 'info');
}

function showRecommendationTab(tabName) {
    // Remove active from all tabs and panels
    document.querySelectorAll('.recommendations-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.recommendations-tabs .tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Add active to selected tab and panel
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    showNotification(`Viewing ${tabName} recommendations`, 'info');
}

// Results Management Functions
function downloadResults() {
    console.log('Downloading assessment results');
    
    const total = ayurvedaAssessment.totalAnswers;
    const vataPercentage = Math.round((ayurvedaAssessment.scores.vata / total) * 100);
    const pittaPercentage = Math.round((ayurvedaAssessment.scores.pitta / total) * 100);
    const kaphaPercentage = Math.round((ayurvedaAssessment.scores.kapha / total) * 100);
    
    const doshas = [
        { name: 'Vata', percentage: vataPercentage },
        { name: 'Pitta', percentage: pittaPercentage },
        { name: 'Kapha', percentage: kaphaPercentage }
    ];
    
    const primaryDosha = doshas.sort((a, b) => b.percentage - a.percentage)[0];
    
    const reportContent = `
AYURVEDA DOSHA ASSESSMENT RESULTS
=================================

Assessment Date: ${new Date().toLocaleDateString()}

CONSTITUTIONAL ANALYSIS:
- Vata: ${vataPercentage}%
- Pitta: ${pittaPercentage}%
- Kapha: ${kaphaPercentage}%

PRIMARY DOSHA: ${primaryDosha.name} (${primaryDosha.percentage}%)

This assessment is for educational purposes only. 
Consult qualified Ayurvedic practitioners for personalized guidance.

Visit our platform for detailed recommendations and professional consultations.
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'ayurveda-dosha-assessment-results.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    showNotification('Assessment results downloaded successfully', 'success');
}

function emailResults() {
    console.log('Emailing assessment results');
    
    const total = ayurvedaAssessment.totalAnswers;
    const vataPercentage = Math.round((ayurvedaAssessment.scores.vata / total) * 100);
    const pittaPercentage = Math.round((ayurvedaAssessment.scores.pitta / total) * 100);
    const kaphaPercentage = Math.round((ayurvedaAssessment.scores.kapha / total) * 100);
    
    const doshas = [
        { name: 'Vata', percentage: vataPercentage },
        { name: 'Pitta', percentage: pittaPercentage },
        { name: 'Kapha', percentage: kaphaPercentage }
    ];
    
    const primaryDosha = doshas.sort((a, b) => b.percentage - a.percentage)[0];
    
    const subject = 'My Ayurveda Dosha Assessment Results';
    const body = `Hello,

I completed an Ayurvedic constitutional assessment with the following results:

Constitutional Analysis:
- Vata: ${vataPercentage}%
- Pitta: ${pittaPercentage}%
- Kapha: ${kaphaPercentage}%

Primary Dosha: ${primaryDosha.name} (${primaryDosha.percentage}%)

This assessment helps understand my unique constitutional type for better health and wellness decisions.

Best regards`;
    
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    showNotification('Email client opened with assessment results', 'success');
}

function startNewAssessment() {
    console.log('Starting new assessment');
    
    if (confirm('Are you sure you want to start a new assessment? This will clear all current answers.')) {
        ayurvedaAssessment.currentSection = 'hero';
        showSection('hero');
        showNotification('Ready to start a new assessment', 'info');
    }
}

// Professional Services Functions
function findPractitioner() {
    console.log('Finding Ayurvedic practitioners');
    showNotification('Practitioner finder would open here (demo functionality)', 'info');
}

function showResources() {
    console.log('Showing educational resources');
    showNotification('Educational resources would open here (demo functionality)', 'info');
}

function showProducts() {
    console.log('Showing recommended products');
    showNotification('Product recommendations would open here (demo functionality)', 'info');
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
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutAyurveda 0.4s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }
    }, 4000);
}

// Initialize Application
function initializeAyurvedaAssessment() {
    console.log('Initializing Ayurveda Dosha Assessment...');
    
    // Display assessment overview
    console.log('Assessment Overview:', {
        title: ayurvedaAssessment.assessmentData.overview.title,
        totalQuestions: ayurvedaAssessment.assessmentData.overview.totalQuestions,
        sections: Object.keys(ayurvedaAssessment.assessmentData.sections).length,
        estimatedTime: ayurvedaAssessment.assessmentData.overview.estimatedTime
    });
    
    // Set up progress section navigation
    document.querySelectorAll('.progress-section').forEach(section => {
        section.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            showNotification(`Section navigation: ${targetSection} (demo)`, 'info');
        });
    });
    
    console.log('Ayurveda Dosha Assessment initialized successfully');
}

// Global function exports for onclick handlers
window.startAssessment = startAssessment;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.completeAssessment = completeAssessment;
window.showCharacteristicTab = showCharacteristicTab;
window.showRecommendationTab = showRecommendationTab;
window.downloadResults = downloadResults;
window.emailResults = emailResults;
window.startNewAssessment = startNewAssessment;
window.findPractitioner = findPractitioner;
window.showResources = showResources;
window.showProducts = showProducts;

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Ayurveda Assessment...');
    initializeAyurvedaAssessment();
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Ayurveda Assessment loaded in ${loadTime.toFixed(2)}ms`);
    
    // Welcome notification
    setTimeout(() => {
        showNotification('🕉️ Welcome to the Ayurveda Dosha Assessment. Discover your unique constitution through ancient wisdom.', 'success');
    }, 1000);
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('Ayurveda Assessment Error:', event.error);
    showNotification('A system error occurred. Assessment functionality remains available. Please refresh if problems persist.', 'error');
});

// Add notification styles
const assessmentStyle = document.createElement('style');
assessmentStyle.textContent = `
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
`;
document.head.appendChild(assessmentStyle);

console.log('Ayurveda Dosha Assessment JavaScript loaded successfully 🕉️💫🌱');