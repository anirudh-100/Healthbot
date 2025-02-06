'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // For error messages
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Store token in localStorage or cookie
      localStorage.setItem('token', data.token);
      
      router.push('/dashboard'); // Redirect after login
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96 z-10">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error message */}

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full mt-2 px-4 py-3 border rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full mt-2 px-4 py-3 border rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Login
        </button>
      </form>
    </div>
  );
}
