"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Questionnaire() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    goals: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Head>
        <title>Self-Assessment - Yogi</title>
        <meta name="description" content="Self-improvement questionnaire." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Self-Assessment</h1>
        <p className="text-gray-600 mb-8">
          Answer a few questions to begin your journey of self-improvement.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">What are your self-improvement goals?</label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/">
            <span className="text-indigo-600 hover:underline cursor-pointer">← Back to Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
