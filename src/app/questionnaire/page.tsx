'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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

// Add category quotes
const categoryQuotes = {
  Mental: {
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    author: "James Clear"
  },
  Physical: {
    quote: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn"
  },
  Spiritual: {
    quote: "When there is no enemy within, the enemy outside can do you no harm.",
    author: "African Proverb"
  },
  Financial: {
    quote: "If you cannot control your emotions, you cannot control your money.",
    author: "Warren Buffett"
  }
};

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

export default function Questionnaire() {
  // State management
  const [currentStep, setCurrentStep] = useState<'stats' | 'assessment-intro' | 'intro' | 'questions' | 'completion'>('stats');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
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
  
  // Add useEffect to handle initial navigation
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window !== 'undefined') {
      // You can add any initialization logic here if needed
    }
  }, []);
  
  // Calculate progress percentage
  const progressPercentage = Math.round((responses.length / questions.length) * 100);
  
  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update responses
    setResponses(prev => {
      // Check if we already have a response for this question
      const existingResponseIndex = prev.findIndex(r => r.questionId === currentQuestion.id);
      
      if (existingResponseIndex >= 0) {
        // Update existing response
        const newResponses = [...prev];
        newResponses[existingResponseIndex] = { questionId: currentQuestion.id, answer };
        return newResponses;
      } else {
        // Add new response
        return [...prev, { questionId: currentQuestion.id, answer }];
      }
    });
    
    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentStep('completion');
      }
    }, 300);
  };
  
  // Handle navigation
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep('completion');
    }
  };
  
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Thank You!</h1>
          <p className="text-center text-gray-600 mb-8">
            You've completed the Yogi Self-Assessment. Please provide your contact information below.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <button
                type="submit"
                className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  // Render questions screen
  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswered = responses.some(r => r.questionId === currentQuestion.id);
  const selectedAnswer = responses.find(r => r.questionId === currentQuestion.id)?.answer;
  const categoryQuote = categoryQuotes[currentQuestion.category];
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-grow flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full"
          >
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {currentQuestion.category} Health
              </span>
              <div className="mt-4 text-center">
                <blockquote className="text-xl font-medium text-gray-800 italic mb-2">
                  "{categoryQuote.quote}"
                </blockquote>
                <p className="text-gray-600">– {categoryQuote.author}</p>
              </div>
              <h2 className="text-xl font-semibold mt-6 text-gray-800">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
            </div>
            
            <div className="mb-8">
              <p className="text-lg text-gray-700 mb-6">{currentQuestion.text}</p>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 transform hover:-translate-y-0.5 ${
                      selectedAnswer === option
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <motion.button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Back
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
                Next
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Progress bar */}
      <motion.div 
        className="bg-white shadow-md py-4 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progressPercentage}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              className="bg-indigo-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
} 