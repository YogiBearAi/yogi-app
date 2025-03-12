import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to Yogi
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          "Growth begins when we begin to accept our own weakness." - J. Vanier 
        </p>
        <Link 
          href="/questionnaire" 
          className="inline-block px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Self Assessment
        </Link>
      </div>
    </div>
  );
}
