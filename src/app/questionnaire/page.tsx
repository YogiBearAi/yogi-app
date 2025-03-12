'use client';

import Link from 'next/link';

export default function QuestionnairePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Yogi Self-Assessment
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Test page
        </p>
        <div className="text-center">
          <Link 
            href="/"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
} 