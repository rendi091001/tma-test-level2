'use client';

import { useState } from 'react';

export default function SignIn() {
    const [email, setEmail] = useState('john@mail.com');
    const [password, setPassword] = useState('changeme');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
            } else {
                window.location.href = '/dashboard'; 
            }
        } catch (err) {
            setError('Failed to fetch');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
                <h1 className="text-xl font-bold text-purple-600 mb-1">Dash UI</h1>
                <p className="text-gray-500 mb-6 text-sm">Please enter your user information.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Username or email</label>
                        <input
                            type="email"
                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" className="text-purple-600" />
                        <label htmlFor="remember" className="text-sm text-gray-600">
                            Remember me
                        </label>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md text-sm font-semibold"
                    >
                        Sign In
                    </button>
                </form>

                <div className="flex justify-between mt-4 text-sm">
                    <a href="/register" className="text-purple-600 hover:underline">
                        Create An Account
                    </a>
                    <a href="/forgot-password" className="text-gray-500 hover:underline">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    );
}
