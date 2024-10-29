import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(credentials.email, credentials.password);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleDemoLogin = async () => {
    const demoCredentials = {
      email: 'customer@example.com',
      password: 'Customer123!'
    };
    setCredentials(demoCredentials);
    try {
      await login(demoCredentials.email, demoCredentials.password);
    } catch (err) {
      setError('Failed to log in with demo credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-cyan-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Customer Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Access your CyberAllStars services
          </p>
          {/* Clickable demo credentials */}
          {import.meta.env.DEV && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 text-center">Demo Credentials:</p>
              <button
                onClick={handleDemoLogin}
                className="w-full mt-1 text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                customer@example.com / Customer123!
              </button>
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-700 rounded bg-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-cyan-500 hover:text-cyan-400">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <Link to="/admin/login" className="text-sm text-cyan-500 hover:text-cyan-400">
              Admin Portal →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}