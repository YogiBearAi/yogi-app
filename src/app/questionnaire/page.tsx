'use client';

import { useState } from 'react';
import Link from 'next/link';

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
  name: string;
  email: string;
  phone: string;
}

// Sample questions for each category
const questions: Question[] = [
  // Mental Health Questions
  {
    id: 1,
    category: 'Mental',
    text: 'How often do you feel overwhelmed by your responsibilities?',
    options: ['Rarely', 'Sometimes', 'Often', 'Almost always']
  },
  {
    id: 2,
    category: 'Mental',
    text: 'How would you rate your ability to focus on tasks?',
    options: ['Excellent', 'Good', 'Fair', 'Poor']
  },
  {
    id: 3,
    category: 'Mental',
    text: 'How often do you experience negative thoughts?',
    options: ['Rarely', 'Sometimes', 'Often', 'Almost always']
  },
  
  // Physical Health Questions
  {
    id: 4,
    category: 'Physical',
    text: 'How would you rate your overall physical health?',
    options: ['Excellent', 'Good', 'Fair', 'Poor']
  },
  {
    id: 5,
    category: 'Physical',
    text: 'How often do you engage in physical exercise?',
    options: ['Daily', '3-5 times a week', '1-2 times a week', 'Rarely']
  },
  {
    id: 6,
    category: 'Physical',
    text: 'How would you describe your sleep quality?',
    options: ['Excellent', 'Good', 'Fair', 'Poor']
  },
  
  // Spiritual Health Questions
  {
    id: 7,
    category: 'Spiritual',
    text: 'How often do you engage in mindfulness or meditation practices?',
    options: ['Daily', 'Weekly', 'Occasionally', 'Never']
  },
  {
    id: 8,
    category: 'Spiritual',
    text: 'How connected do you feel to your purpose in life?',
    options: ['Very connected', 'Somewhat connected', 'Slightly connected', 'Not connected']
  },
  {
    id: 9,
    category: 'Spiritual',
    text: 'How often do you take time for self-reflection?',
    options: ['Daily', 'Weekly', 'Occasionally', 'Rarely']
  },
  
  // Financial Health Questions
  {
    id: 10,
    category: 'Financial',
    text: 'How would you rate your financial stability?',
    options: ['Very stable', 'Somewhat stable', 'Slightly unstable', 'Very unstable']
  },
  {
    id: 11,
    category: 'Financial',
    text: 'How confident are you in your financial future?',
    options: ['Very confident', 'Somewhat confident', 'Slightly concerned', 'Very concerned']
  },
  {
    id: 12,
    category: 'Financial',
    text: 'How often do you worry about money?',
    options: ['Rarely', 'Sometimes', 'Often', 'Almost always']
  }
];

export default function Questionnaire() {
  // State management
  const [currentStep, setCurrentStep] = useState<'intro' | 'questions' | 'completion'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '', phone: '' });
  
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
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={userInfo.name}
                onChange={handleUserInfoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={userInfo.email}
                onChange={handleUserInfoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                value={userInfo.phone}
                onChange={handleUserInfoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
              {currentQuestion.category} Health
            </span>
            <h2 className="text-xl font-semibold mt-4 text-gray-800">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
          </div>
          
          <div className="mb-8">
            <p className="text-lg text-gray-700 mb-6">{currentQuestion.text}</p>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg ${
                currentQuestionIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!hasAnswered}
              className={`px-4 py-2 rounded-lg ${
                !hasAnswered
                  ? 'bg-indigo-300 text-white cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="bg-white shadow-md py-4 px-6">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progressPercentage}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
} 