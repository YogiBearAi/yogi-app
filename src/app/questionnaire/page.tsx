'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Audio feedback system - moved to a custom hook
const useAudioFeedback = () => {
  const [audioFeedback, setAudioFeedback] = useState<{
    answerSelect: HTMLAudioElement | null;
    sectionComplete: HTMLAudioElement | null;
    finalReview: HTMLAudioElement | null;
  }>({
    answerSelect: null,
    sectionComplete: null,
    finalReview: null
  });

  useEffect(() => {
    // Initialize audio only on client side
    setAudioFeedback({
      answerSelect: new Audio('/sounds/answer-select.mp3'),
      sectionComplete: new Audio('/sounds/section-complete.mp3'),
      finalReview: new Audio('/sounds/final-review.mp3')
    });
  }, []);

  const playSound = (type: 'answerSelect' | 'sectionComplete' | 'finalReview') => {
    if (audioFeedback[type]) {
      audioFeedback[type]?.play().catch(() => {
        // Ignore errors if audio fails to play
      });
    }
  };

  return { playSound };
};

// Haptic feedback function
const triggerHapticFeedback = () => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(30);
  }
};

// Category colors for XP animations
const categoryColors = {
  Mental: '#3B82F6', // Blue
  Physical: '#10B981', // Green
  Financial: '#F59E0B', // Gold
  Spiritual: '#8B5CF6' // Purple
};

// Define question types and structure
type QuestionCategory = 'Mental' | 'Physical' | 'Spiritual' | 'Financial';

interface Question {
  id: number;
  category: QuestionCategory;
  text: string;
  options: string[];
}

interface UserResponse {
  questionId: number;
  answer: string;
}

interface UserInfo {
  firstName: string;
  lastName: string;
  age: number;
  height: {
    feet: number;
    inches: number;
  };
  weight: {
    value: number;
    unit: 'lbs' | 'kg';
  };
  bodyFat: number;
  incomeLevel: string;
  isStudent: boolean;
  workStatus: string;
  educationLevel?: 'high-school' | 'college';
  yearInSchool?: string;
  fieldOfStudy?: string;
}

// Update questions array
const questions: Question[] = [
  // Mental Health Questions
  {
    id: 1,
    category: 'Mental',
    text: 'How often do you read books or consume high-quality educational content?',
    options: ['Daily', '3-5 times per week', '1-2 times per week', 'Rarely']
  },
  {
    id: 2,
    category: 'Mental',
    text: 'Do you have a structured daily routine or morning/evening ritual?',
    options: ['Yes, every day', 'Somewhat, but inconsistent', 'No, but I try', 'No structure at all']
  },
  {
    id: 3,
    category: 'Mental',
    text: 'How often do you write down your goals or track your progress?',
    options: ['Daily', 'Weekly', 'Occasionally', 'Never']
  },
  {
    id: 4,
    category: 'Mental',
    text: 'Do you actively limit distractions (e.g., social media, phone notifications) during deep work?',
    options: ['Yes, I block distractions daily', 'Sometimes, but not consistently', 'No, but I know I should', 'I struggle to focus']
  },
  
  // Physical Health Questions
  {
    id: 5,
    category: 'Physical',
    text: 'How many times per week do you engage in structured exercise?',
    options: ['5+ times', '3-4 times', '1-2 times', 'Rarely or never']
  },
  {
    id: 6,
    category: 'Physical',
    text: 'How many hours of quality sleep do you get per night?',
    options: ['7+ hours', '6 hours', '4-5 hours', 'Less than 4 hours']
  },
  {
    id: 7,
    category: 'Physical',
    text: 'Do you regularly eat whole, nutrient-dense foods instead of processed junk?',
    options: ['Yes, most of my meals are clean', 'I try, but struggle with consistency', 'No, but I want to improve', 'My diet is poor']
  },
  {
    id: 8,
    category: 'Physical',
    text: 'Do you take cold showers, stretch, or engage in recovery practices?',
    options: ['Yes, daily', 'A few times per week', 'Rarely', 'Never']
  },
  
  // Spiritual Health Questions
  {
    id: 9,
    category: 'Spiritual',
    text: 'Do you practice meditation, prayer, or focused breathing?',
    options: ['Daily', 'Occasionally', 'Rarely', 'Never']
  },
  {
    id: 10,
    category: 'Spiritual',
    text: 'How often do you take time to reflect on your actions and decisions?',
    options: ['Every day', 'Weekly', 'Occasionally', 'Almost never']
  },
  {
    id: 11,
    category: 'Spiritual',
    text: "Do you actively practice gratitude (writing down or verbalizing what you're grateful for)?",
    options: ['Daily', 'Occasionally', 'Rarely', 'Never']
  },
  
  // Financial Health Questions
  {
    id: 12,
    category: 'Financial',
    text: 'Do you track your income and expenses?',
    options: ['Yes, in detail', 'I have a general idea', 'No, I just check my balance sometimes', 'No, I avoid looking at my finances']
  },
  {
    id: 13,
    category: 'Financial',
    text: 'How much do you save or invest each month?',
    options: ['20%+ of my income', '10-19%', 'Less than 10%', "I don't save or invest"]
  },
  {
    id: 14,
    category: 'Financial',
    text: 'How often do you spend money on unnecessary purchases?',
    options: ['Rarely, I\'m disciplined', 'Occasionally, but I budget for it', 'Often, but I know I need to change', 'I constantly overspend']
  }
];

// Add education options
const educationOptions = {
  'high-school': {
    label: 'High School',
    years: [
      { value: 'freshman', label: 'Freshman (9th Grade)' },
      { value: 'sophomore', label: 'Sophomore (10th Grade)' },
      { value: 'junior', label: 'Junior (11th Grade)' },
      { value: 'senior', label: 'Senior (12th Grade)' }
    ]
  },
  'college': {
    label: 'College/University',
    years: [
      { value: 'freshman', label: 'Freshman' },
      { value: 'sophomore', label: 'Sophomore' },
      { value: 'junior', label: 'Junior' },
      { value: 'senior', label: 'Senior' },
      { value: 'graduate', label: 'Graduate Student' }
    ]
  }
};

const collegeMajors = {
  'business': {
    label: 'Business & Economics',
    options: [
      'Accounting',
      'Business Administration',
      'Economics',
      'Finance',
      'Marketing',
      'Management'
    ]
  },
  'stem': {
    label: 'STEM',
    options: [
      'Computer Science',
      'Data Science',
      'Software Engineering',
      'Mechanical Engineering',
      'Electrical Engineering',
      'Civil Engineering',
      'Biology',
      'Chemistry',
      'Physics',
      'Mathematics',
      'Cybersecurity',
      'Artificial Intelligence'
    ]
  },
  'health': {
    label: 'Health & Medicine',
    options: [
      'Nursing',
      'Pre-Med',
      'Pharmacy',
      'Public Health',
      'Physical Therapy',
      'Nutrition'
    ]
  },
  'social': {
    label: 'Social Sciences & Humanities',
    options: [
      'Psychology',
      'Sociology',
      'Political Science',
      'History',
      'International Relations',
      'Communications',
      'Journalism'
    ]
  },
  'arts': {
    label: 'Arts & Design',
    options: [
      'Graphic Design',
      'Fine Arts',
      'Music',
      'Film & Media',
      'Performing Arts'
    ]
  },
  'trades': {
    label: 'Trades & Technical Fields',
    options: [
      'Culinary Arts',
      'Automotive Engineering',
      'Aviation',
      'Construction Management',
      'Electrical Technology'
    ]
  }
};

// Add feedback messages mapping
const feedbackMessages: Record<number, Record<string, string>> = {
  // Mental Health Questions
  1: {
    'Daily': "Writing your goals daily keeps them at the forefront of your mind. Consistency compounds results.",
    '3-5 times per week': "Even weekly goal tracking puts you ahead of most people. Stay consistent.",
    '1-2 times per week': "You have a vision, but tracking it consistently will help turn it into reality.",
    'Rarely': "A goal without tracking is just a wish. Start small—write down one goal today."
  },
  2: {
    'Yes, every day': "Discipline over distraction is a superpower. Stay focused.",
    'Somewhat, but inconsistent': "You know the key—now make it a habit.",
    'No, but I try': "You already see the problem. Try a 1-hour focused work session today.",
    'No structure at all': "Even 5 minutes of deep work is a win. Start small."
  },
  3: {
    'Daily': "Writing your goals daily keeps them at the forefront of your mind. Consistency compounds results.",
    'Weekly': "Even weekly goal tracking puts you ahead of most people. Stay consistent.",
    'Occasionally': "You have a vision, but tracking it consistently will help turn it into reality.",
    'Never': "A goal without tracking is just a wish. Start small—write down one goal today."
  },
  4: {
    'Yes, I block distractions daily': "Discipline over distraction is a superpower. Stay focused.",
    'Sometimes, but not consistently': "You know the key—now make it a habit.",
    'No, but I know I should': "You already see the problem. Try a 1-hour focused work session today.",
    'I struggle to focus': "Even 5 minutes of deep work is a win. Start small."
  },
  
  // Physical Health Questions
  5: {
    '5+ times': "You're building a body built for longevity. Keep pushing.",
    '3-4 times': "You've built momentum—now take it to the next level.",
    '1-2 times': "Some movement is better than none. Try adding one more workout this week.",
    'Rarely or never': "Your body is your foundation. Even a 10-minute walk today is a step forward."
  },
  6: {
    '7+ hours': "Optimal recovery fuels peak performance. Keep prioritizing rest.",
    '6 hours': "Decent, but improving sleep quality could be a game-changer.",
    '4-5 hours': "Lack of sleep weakens mental & physical strength. Start by adjusting your bedtime.",
    'Less than 4 hours': "Chronic sleep deprivation wrecks health. A small habit change tonight could help."
  },
  7: {
    'Yes, most of my meals are clean': "Clean eating is a cornerstone of health. Keep making those good choices.",
    'I try, but struggle with consistency': "Progress over perfection. Focus on one meal at a time.",
    'No, but I want to improve': "Awareness is the first step. Start with one healthy meal today.",
    'My diet is poor': "Small changes compound. Try adding one vegetable to your next meal."
  },
  8: {
    'Yes, daily': "Recovery is as important as training. You're building sustainable habits.",
    'A few times per week': "Good start! Try adding one more recovery session this week.",
    'Rarely': "Recovery prevents burnout. Start with a 5-minute stretch routine.",
    'Never': "Even a 2-minute stretch break can help. Try it now."
  },
  
  // Spiritual Health Questions
  9: {
    'Daily': "Inner clarity leads to outer success. Keep the practice going.",
    'Occasionally': "Some mindfulness is better than none—keep integrating it.",
    'Rarely': "Even one deep breath right now can bring awareness. Try it.",
    'Never': "Self-awareness is power. Start with just 1 minute of stillness today."
  },
  10: {
    'Every day': "Reflection sharpens intuition. This is a rare, powerful habit.",
    'Weekly': "Weekly reflection keeps you grounded and growing.",
    'Occasionally': "Try setting a weekly check-in with yourself. You'll see progress.",
    'Almost never': "Journaling one lesson a day can change everything. Give it a try."
  },
  11: {
    'Daily': "Gratitude is a superpower. You're building a positive mindset.",
    'Occasionally': "Gratitude grows with practice. Try noting one thing daily.",
    'Rarely': "Start with one grateful thought each morning.",
    'Never': "Gratitude transforms perspective. Try saying 'thank you' for one thing today."
  },
  
  // Financial Health Questions
  12: {
    'Yes, in detail': "You're treating your finances like a business—this will pay off.",
    'I have a general idea': "Even a simple tracking habit can unlock massive control.",
    'No, I just check my balance sometimes': "Knowing where your money goes is the first step toward financial freedom.",
    'No, I avoid looking at my finances': "Avoidance creates more stress. Take one small step today."
  },
  13: {
    '20%+ of my income': "You're building wealth systematically. This is powerful.",
    '10-19%': "You're saving more than most. Keep growing this habit.",
    'Less than 10%': "Start small—try increasing your savings by 1% this month.",
    "I don't save or invest": "The best time to start saving was yesterday. The second best time is now."
  },
  14: {
    'Rarely, I\'m disciplined': "Controlled spending creates financial power. Keep stacking your wins.",
    'Occasionally, but I budget for it': "Smart spending is about control, not deprivation. Good work.",
    'Often, but I know I need to change': "Awareness is the first step. Set a small spending limit this week.",
    'I constantly overspend': "Tracking your purchases for just one week could change your financial game."
  }
};

// Add category icons mapping
const categoryIcons = {
  Mental: '💡',
  Physical: '🏋️',
  Spiritual: '🧘',
  Financial: '💰'
};

// Add XP mapping for answers
const xpMapping: Record<number, Record<string, number>> = {
  // Mental Health Questions
  1: {
    'Daily': 10,
    '3-5 times per week': 7,
    '1-2 times per week': 4,
    'Rarely': 1
  },
  2: {
    'Yes, every day': 10,
    'Somewhat, but inconsistent': 7,
    'No, but I try': 4,
    'No structure at all': 1
  },
  3: {
    'Daily': 10,
    'Weekly': 7,
    'Occasionally': 4,
    'Never': 1
  },
  4: {
    'Yes, I block distractions daily': 10,
    'Sometimes, but not consistently': 7,
    'No, but I know I should': 4,
    'I struggle to focus': 1
  },
  
  // Physical Health Questions
  5: {
    '5+ times': 10,
    '3-4 times': 7,
    '1-2 times': 4,
    'Rarely or never': 1
  },
  6: {
    '7+ hours': 10,
    '6 hours': 7,
    '4-5 hours': 4,
    'Less than 4 hours': 1
  },
  7: {
    'Yes, most of my meals are clean': 10,
    'I try, but struggle with consistency': 7,
    'No, but I want to improve': 4,
    'My diet is poor': 1
  },
  8: {
    'Yes, daily': 10,
    'A few times per week': 7,
    'Rarely': 4,
    'Never': 1
  },
  
  // Spiritual Health Questions
  9: {
    'Daily': 10,
    'Occasionally': 7,
    'Rarely': 4,
    'Never': 1
  },
  10: {
    'Every day': 10,
    'Weekly': 7,
    'Occasionally': 4,
    'Almost never': 1
  },
  11: {
    'Daily': 10,
    'Occasionally': 7,
    'Rarely': 4,
    'Never': 1
  },
  
  // Financial Health Questions
  12: {
    'Yes, in detail': 10,
    'I have a general idea': 7,
    'No, I just check my balance sometimes': 4,
    'No, I avoid looking at my finances': 1
  },
  13: {
    '20%+ of my income': 10,
    '10-19%': 7,
    'Less than 10%': 4,
    "I don't save or invest": 1
  },
  14: {
    'Rarely, I\'m disciplined': 10,
    'Occasionally, but I budget for it': 7,
    'Often, but I know I need to change': 4,
    'I constantly overspend': 1
  }
};

export default function Questionnaire() {
  // State management
  const [currentStep, setCurrentStep] = useState<'stats' | 'assessment-intro' | 'intro' | 'section-intro' | 'questions' | 'section-transition' | 'completion'>('stats');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState<QuestionCategory>('Mental');
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [showTransition, setShowTransition] = useState(false);
  const { playSound } = useAudioFeedback();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    age: 0,
    height: { feet: 0, inches: 0 },
    weight: { value: 0, unit: 'lbs' },
    bodyFat: 0,
    incomeLevel: '',
    isStudent: false,
    workStatus: '',
    educationLevel: undefined,
    yearInSchool: undefined,
    fieldOfStudy: undefined
  });
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  
  // Add XP tracking state
  const [xp, setXp] = useState({
    Mental: 0,
    Physical: 0,
    Spiritual: 0,
    Financial: 0
  });
  const [showXpAnimation, setShowXpAnimation] = useState<{ questionId: number; xp: number; color: string } | null>(null);
  
  // Add useEffect to handle initial navigation
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window !== 'undefined') {
      // You can add any initialization logic here if needed
    }
  }, []);
  
  // Calculate progress percentage
  const progressPercentage = Math.round((responses.length / questions.length) * 100);
  
  // Add section introductions
  const sectionIntros = {
    Mental: {
      quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
      author: "James Clear",
      intro: "Your mindset is the foundation of everything. Let's measure how disciplined your thinking is."
    },
    Physical: {
      quote: "Take care of your body. It's the only place you have to live.",
      author: "Jim Rohn",
      intro: "Discipline in fitness carries over into all areas of life. Let's see how well you take care of yourself."
    },
    Spiritual: {
      quote: "When there is no enemy within, the enemy outside can do you no harm.",
      author: "African Proverb",
      intro: "Clarity, peace, and purpose come from within. Let's see how aligned you are."
    },
    Financial: {
      quote: "If you cannot control your emotions, you cannot control your money.",
      author: "Warren Buffett",
      intro: "Financial discipline determines your freedom. Let's evaluate where you stand."
    }
  };

  // Add section transitions
  const sectionTransitions = {
    Mental: "Your mindset is your operating system. Now, let's see how well you take care of your body.",
    Physical: "Your body is a tool—now, let's evaluate your inner discipline and mindfulness.",
    Spiritual: "Inner strength is key—but financial stability also plays a role in your freedom. Let's analyze that next.",
    Financial: "You've completed all sections! Let's review your responses and create your personalized plan."
  };

  // Get questions for current section
  const getCurrentSectionQuestions = () => {
    return questions.filter(q => q.category === currentSection);
  };

  // Check if current section is complete
  const isCurrentSectionComplete = () => {
    const sectionQuestions = getCurrentSectionQuestions();
    return sectionQuestions.every(q => responses.some(r => r.questionId === q.id));
  };

  // Handle section completion
  const handleSectionComplete = () => {
    // Play section complete sound
    playSound('sectionComplete');
    
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
      const categories: QuestionCategory[] = ['Mental', 'Physical', 'Spiritual', 'Financial'];
      const currentIndex = categories.indexOf(currentSection);
      
      if (currentIndex < categories.length - 1) {
        const nextSection = categories[currentIndex + 1];
        setCurrentSection(nextSection);
        // Find the first question of the next section
        const nextSectionQuestions = questions.filter(q => q.category === nextSection);
        setCurrentQuestionIndex(questions.findIndex(q => q.id === nextSectionQuestions[0].id));
        setCurrentStep('section-intro');
      } else {
        // Play final review sound when completing all sections
        playSound('finalReview');
        setCurrentStep('completion');
      }
    }, 1000);
  };

  // Calculate discipline score and level
  const calculateDisciplineScore = () => {
    const totalXP = Object.values(xp).reduce((sum, categoryXP) => sum + categoryXP, 0);
    const maxPossibleXP = questions.length * 10;
    const percentage = Math.round((totalXP / maxPossibleXP) * 100);
    
    // Calculate level based on percentage
    let level = 1;
    if (percentage >= 90) level = 5;
    else if (percentage >= 75) level = 4;
    else if (percentage >= 60) level = 3;
    else if (percentage >= 45) level = 2;
    
    return { percentage, level, totalXP, maxPossibleXP };
  };

  // Get category percentage
  const getCategoryPercentage = (category: QuestionCategory) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const maxPossibleXP = categoryQuestions.length * 10;
    return Math.round((xp[category] / maxPossibleXP) * 100);
  };

  // Get strongest and weakest categories
  const getCategoryInsights = () => {
    const categories = Object.entries(xp);
    const strongest = categories.reduce((max, current) => 
      current[1] > max[1] ? current : max
    );
    const weakest = categories.reduce((min, current) => 
      current[1] < min[1] ? current : min
    );
    return { strongest, weakest };
  };

  // Update handleAnswerSelect to include XP and feedback
  const handleAnswerSelect = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Play audio feedback
    playSound('answerSelect');
    
    // Trigger haptic feedback
    triggerHapticFeedback();
    
    // Update responses
    setResponses(prev => {
      const existingResponseIndex = prev.findIndex(r => r.questionId === currentQuestion.id);
      
      if (existingResponseIndex >= 0) {
        const newResponses = [...prev];
        newResponses[existingResponseIndex] = { questionId: currentQuestion.id, answer };
        return newResponses;
      } else {
        return [...prev, { questionId: currentQuestion.id, answer }];
      }
    });

    // Award XP
    const xpEarned = xpMapping[currentQuestion.id][answer];
    setXp(prev => ({
      ...prev,
      [currentQuestion.category]: prev[currentQuestion.category] + xpEarned
    }));

    // Show XP animation with category color
    setShowXpAnimation({ 
      questionId: currentQuestion.id, 
      xp: xpEarned,
      color: categoryColors[currentQuestion.category]
    });
    setTimeout(() => setShowXpAnimation(null), 1500);

    // Set feedback message
    setFeedbackMessage(feedbackMessages[currentQuestion.id][answer]);
  };
  
  // Handle navigation
  const handleNext = () => {
    if (currentStep === 'intro') {
      setCurrentStep('section-intro');
    } else if (currentStep === 'section-intro') {
      setCurrentStep('questions');
    } else if (currentStep === 'questions') {
      const sectionQuestions = getCurrentSectionQuestions();
      const currentSectionIndex = sectionQuestions.findIndex(q => q.id === currentQuestion.id);
      
      if (currentSectionIndex < sectionQuestions.length - 1) {
        // Move to next question in current section
        setCurrentQuestionIndex(questions.findIndex(q => q.id === sectionQuestions[currentSectionIndex + 1].id));
        setFeedbackMessage(null); // Clear feedback when moving to next question
      } else if (isCurrentSectionComplete()) {
        handleSectionComplete();
      }
    }
  };
  
  const handleBack = () => {
    if (currentStep === 'section-intro') {
      setCurrentStep('intro');
    } else if (currentStep === 'questions') {
      const sectionQuestions = getCurrentSectionQuestions();
      const currentSectionIndex = sectionQuestions.findIndex(q => q.id === currentQuestion.id);
      
      if (currentSectionIndex > 0) {
        setCurrentQuestionIndex(questions.findIndex(q => q.id === sectionQuestions[currentSectionIndex - 1].id));
        setFeedbackMessage(null); // Clear feedback when moving to previous question
      }
    }
  };
  
  // Handle user info changes
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setUserInfo(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
      return;
    }

    if (name === 'weightValue') {
      setUserInfo(prev => ({
        ...prev,
        weight: {
          ...prev.weight,
          value: Number(value)
        }
      }));
      return;
    }

    if (name === 'heightFeet' || name === 'heightInches') {
      setUserInfo(prev => ({
        ...prev,
        height: {
          ...prev.height,
          [name === 'heightFeet' ? 'feet' : 'inches']: Number(value)
        }
      }));
      return;
    }

    if (name === 'educationLevel') {
      setUserInfo(prev => ({
        ...prev,
        educationLevel: value as 'high-school' | 'college',
        yearInSchool: undefined,
        fieldOfStudy: undefined
      }));
      return;
    }

    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Check if all required fields are filled
  const isStatsFormComplete = () => {
    const requiredFields: Record<string, boolean> = {
      firstName: userInfo.firstName.trim() !== '',
      lastName: userInfo.lastName.trim() !== '',
      age: userInfo.age > 0,
      height: userInfo.height.feet >= 0 && userInfo.height.inches >= 0 && userInfo.height.inches < 12,
      weight: userInfo.weight.value > 0,
      incomeLevel: userInfo.incomeLevel !== '',
      workStatus: userInfo.workStatus !== ''
    };

    // If user is a student, validate student-specific fields
    if (userInfo.isStudent) {
      requiredFields.educationLevel = userInfo.educationLevel !== undefined;
      requiredFields.yearInSchool = userInfo.yearInSchool !== undefined;
      if (userInfo.educationLevel === 'college') {
        requiredFields.fieldOfStudy = userInfo.fieldOfStudy !== undefined;
      }
    }

    return Object.values(requiredFields).every(Boolean);
  };
  
  // Handle final submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the data to your backend here
    console.log('User Info:', userInfo);
    console.log('Responses:', responses);
    
    // For now, just show an alert
    alert('Thank you for completing the assessment! Your responses have been recorded.');
  };
  
  // Render stats form
  if (currentStep === 'stats') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Your Stats: Let's see where you are at</h1>
          <p className="text-center text-gray-600 mb-8 italic">
            "Nothing Counted but Thoroughness and Honesty" - Bill W
          </p>
          <p className="text-center text-gray-600 mb-8">
            We'll collect some basic information to help assess your current standing and provide personalized insights.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={userInfo.firstName}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={userInfo.lastName}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  min="1"
                  value={userInfo.age}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <select
                      id="heightFeet"
                      name="heightFeet"
                      required
                      value={userInfo.height.feet}
                      onChange={handleUserInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Feet</option>
                      {[...Array(8)].map((_, i) => (
                        <option key={i} value={i}>
                          {i} ft
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <select
                      id="heightInches"
                      name="heightInches"
                      required
                      value={userInfo.height.inches}
                      onChange={handleUserInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Inches</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={i}>
                          {i} in
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="weightValue"
                    name="weightValue"
                    required
                    min="1"
                    value={userInfo.weight.value || ''}
                    onChange={handleUserInfoChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter weight (lbs)"
                  />
                  <span className="text-gray-500">lbs</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <label htmlFor="bodyFat" className="block text-sm font-medium text-gray-700">
                    Estimated Body Fat %
                  </label>
                  <div className="group relative">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      aria-label="Body fat percentage guide"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <div className="absolute z-10 hidden group-hover:block w-64 p-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-800 mb-2">Body Fat Percentage Guide</h3>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p><span className="font-medium">2-5%</span> (Essential Fat): Extremely shredded with no visible fat, deep muscle striations, and vascularity.</p>
                        <p><span className="font-medium">6-10%</span> (Very Lean): Visible striations, ab vascularity, and a sculpted look.</p>
                        <p><span className="font-medium">11-15%</span> (Athletic): Defined abs, moderate vascularity, and a lean, muscular build.</p>
                        <p><span className="font-medium">16-17%</span> (Healthy): Toned physique, minimal vascularity, balanced and sustainable leanness.</p>
                        <p><span className="font-medium">18-24%</span> (Average): Softer appearance, some visible fat around the stomach.</p>
                        <p><span className="font-medium">25%+</span> (Obese): Excess fat, no muscle definition, potential health concerns.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  id="bodyFat"
                  name="bodyFat"
                  value={userInfo.bodyFat}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Don't worry if you do not know this yet!"
                />
              </div>

              <div>
                <label htmlFor="incomeLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Income Level
                </label>
                <select
                  id="incomeLevel"
                  name="incomeLevel"
                  required
                  value={userInfo.incomeLevel}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select income level</option>
                  <option value="less-than-25k">Less than $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-75k">$50,000 - $75,000</option>
                  <option value="75k-100k">$75,000 - $100,000</option>
                  <option value="100k-150k">$100,000 - $150,000</option>
                  <option value="150k-250k">$150,000 - $250,000</option>
                  <option value="250k-plus">$250,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="workStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Status
                </label>
                <select
                  id="workStatus"
                  name="workStatus"
                  required
                  value={userInfo.workStatus}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select work status</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                  <option value="self-employed">Self-Employed</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isStudent"
                  name="isStudent"
                  checked={userInfo.isStudent}
                  onChange={handleUserInfoChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isStudent" className="ml-2 block text-sm text-gray-700">
                  I am a student
                </label>
              </div>

              {userInfo.isStudent && (
                <div className="space-y-4 pl-6 border-l-2 border-indigo-100">
                  <div>
                    <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-1">
                      Education Level
                    </label>
                    <select
                      id="educationLevel"
                      name="educationLevel"
                      required
                      value={userInfo.educationLevel || ''}
                      onChange={handleUserInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select education level</option>
                      {Object.entries(educationOptions).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {userInfo.educationLevel && (
                    <div>
                      <label htmlFor="yearInSchool" className="block text-sm font-medium text-gray-700 mb-1">
                        Year in School
                      </label>
                      <select
                        id="yearInSchool"
                        name="yearInSchool"
                        required
                        value={userInfo.yearInSchool || ''}
                        onChange={handleUserInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select year</option>
                        {educationOptions[userInfo.educationLevel].years.map((year) => (
                          <option key={year.value} value={year.value}>
                            {year.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {userInfo.educationLevel === 'college' && (
                    <div>
                      <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
                        Field of Study
                      </label>
                      <select
                        id="fieldOfStudy"
                        name="fieldOfStudy"
                        required
                        value={userInfo.fieldOfStudy || ''}
                        onChange={handleUserInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select field of study</option>
                        {Object.entries(collegeMajors).map(([category, data]) => (
                          <optgroup key={category} label={data.label}>
                            {data.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep('assessment-intro')}
                disabled={!isStatsFormComplete()}
                className={`px-8 py-4 font-medium rounded-lg shadow-md transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                  isStatsFormComplete()
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Assessment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  // Add new assessment introduction step
  if (currentStep === 'assessment-intro') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-4">
          <div className="space-y-8">
            {/* First Quote Section */}
            <div className="text-center">
              <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-4 italic">
                "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
              </blockquote>
              <p className="text-gray-600 text-lg">
                – Aristotle
              </p>
              <p className="mt-4 text-gray-700">
                This assessment is designed to give you a clear, honest picture of where you stand. Your habits, routines, and decisions shape your reality—this is your chance to see where you are and how to improve.
              </p>
            </div>

            {/* Second Quote Section */}
            <div className="text-center">
              <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-4 italic">
                "The curious paradox is that when I accept myself just as I am, then I can change."
              </blockquote>
              <p className="text-gray-600 text-lg">
                – Carl Rogers
              </p>
              <p className="mt-4 text-gray-700">
                This assessment only works if you are completely honest with yourself. True self-improvement begins with self-acceptance. Take a deep breath, answer truthfully, and let's begin.
              </p>
            </div>

            {/* Continue Button */}
            <div className="text-center pt-4">
              <button
                onClick={() => setCurrentStep('intro')}
                className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Begin Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Render intro screen
  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Yogi Self-Assessment</h1>
          <p className="text-center text-gray-600 mb-8 italic">
            "Nothing counted but thoroughness and honesty."
          </p>
          <div className="text-center">
            <button
              onClick={() => setCurrentStep('questions')}
              className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Begin Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Render completion screen
  if (currentStep === 'completion') {
    const { percentage, level, totalXP, maxPossibleXP } = calculateDisciplineScore();
    const { strongest, weakest } = getCategoryInsights();
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-4"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Discipline Assessment Results</h1>
          
          {/* Overall Score and Level */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <motion.circle
                    className="text-indigo-600"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: percentage / 100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
                  <span className="text-sm text-gray-600">Level {level}</span>
                </div>
              </div>
            </motion.div>
            <div className="mt-4 text-gray-600">
              Total XP: {totalXP} / {maxPossibleXP}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-6 mb-8">
            {Object.entries(xp).map(([category, categoryXp], index) => {
              const categoryPercentage = getCategoryPercentage(category as QuestionCategory);
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{categoryIcons[category as QuestionCategory]}</span>
                      <span className="font-medium text-gray-700">{category} Health</span>
                    </div>
                    <div className="text-right">
                      <span className="text-indigo-600 font-semibold">{categoryXp} XP</span>
                      <span className="text-sm text-gray-500 ml-2">({categoryPercentage}%)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-indigo-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${categoryPercentage}%` }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Insights */}
          <div className="bg-indigo-50 rounded-lg p-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">Your Insights</h3>
              <p className="text-indigo-700">
                <span className="font-medium">Biggest Strength:</span> {strongest[0]} Health {categoryIcons[strongest[0] as QuestionCategory]}
              </p>
              <p className="text-indigo-700">
                <span className="font-medium">Area to Improve:</span> {weakest[0]} Health {categoryIcons[weakest[0] as QuestionCategory]}
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email address"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="text-center pt-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Submit & Save Progress
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }
  
  // Render section introduction screen
  if (currentStep === 'section-intro') {
    const sectionIntro = sectionIntros[currentSection];
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-4"
        >
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-3xl">{categoryIcons[currentSection]}</span>
                <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-lg font-medium">
                  Current Focus: {currentSection} Discipline
                </span>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Section Overview</h3>
                <p className="text-indigo-700">
                  {sectionIntro.intro}
                </p>
              </div>

              <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-4 italic">
                "{sectionIntro.quote}"
              </blockquote>
              <p className="text-gray-600 text-lg mb-6">
                – {sectionIntro.author}
              </p>
            </div>

            <div className="text-center pt-4">
              <motion.button
                onClick={() => setCurrentStep('questions')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Begin {currentSection} Performance Review
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render section transition screen
  if (currentStep === 'section-transition' && showTransition) {
    const transitionMessage = sectionTransitions[currentSection];
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-4 text-center"
        >
          <p className="text-xl text-gray-700 mb-4">
            {transitionMessage}
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </motion.div>
      </div>
    );
  }
  
  // Render questions screen
  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswered = responses.some(r => r.questionId === currentQuestion.id);
  const selectedAnswer = responses.find(r => r.questionId === currentQuestion.id)?.answer;
  const sectionQuestions = getCurrentSectionQuestions();
  const currentSectionIndex = sectionQuestions.findIndex(q => q.id === currentQuestion.id);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-grow flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{categoryIcons[currentSection]}</span>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    {currentSection} Discipline Review
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Checkpoint {currentSectionIndex + 1} of {sectionQuestions.length}
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                  Evaluating: {currentQuestion.text}
                </h3>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 relative ${
                      selectedAnswer === option
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
                        : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    {option}
                    {showXpAnimation?.questionId === currentQuestion.id && selectedAnswer === option && (
                      <motion.span
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 0, y: -20 }}
                        transition={{ duration: 1.5 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold"
                        style={{ color: showXpAnimation.color }}
                      >
                        +{showXpAnimation.xp} XP
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Feedback Message */}
              <AnimatePresence>
                {feedbackMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg"
                  >
                    <p className="text-sm text-indigo-700 italic">
                      {feedbackMessage}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex justify-between">
              <motion.button
                onClick={handleBack}
                disabled={currentSectionIndex === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentSectionIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous Checkpoint
              </motion.button>
              
              <motion.button
                onClick={handleNext}
                disabled={!hasAnswered}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  !hasAnswered
                    ? 'bg-indigo-300 text-white cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Next Checkpoint
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Progress Ring */}
      <motion.div 
        className="bg-white shadow-md py-4 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-gray-200"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="28"
                cx="32"
                cy="32"
              />
              <motion.circle
                className="text-indigo-600"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="28"
                cx="32"
                cy="32"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progressPercentage / 100 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {progressPercentage}%
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-600">
              Overall Progress: {currentSection} Discipline Review
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 