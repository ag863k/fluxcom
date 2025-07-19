import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const AuthPage = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false); // New state for success message

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSignupSuccess(false);
        setLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
        try {
            const response = await axios.post(`${API_URL}${endpoint}`, { username, password });
            if (isLogin) {
                onLoginSuccess(response.data.jwt, username);
            } else {
                // On successful signup, show success message and clear form
                setSignupSuccess(true);
                setUsername('');
                setPassword('');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setUsername('');
        setPassword('');
        setSignupSuccess(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-dark-gray rounded-lg shadow-lg border border-gray-700">
                <div>
                    <h2 className="text-center text-3xl font-extrabold">
                        {isLogin ? 'Sign in to Fluxcom' : 'Create your account'}
                    </h2>
                </div>

                {/* Signup Success Message */}
                {signupSuccess && (
                    <div className="bg-green-900 border border-green-500 text-green-200 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Success! </strong>
                        <span className="block sm:inline">Your account has been created. Please sign in.</span>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-600 bg-medium-gray placeholder-gray-400 focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm rounded-t-md"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-600 bg-medium-gray placeholder-gray-400 focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm rounded-b-md"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-accent hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-gray focus:ring-brand-accent disabled:bg-gray-500"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <button onClick={switchMode} className="font-medium text-brand-accent hover:text-blue-400">
                        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;