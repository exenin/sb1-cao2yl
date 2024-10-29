import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, LogIn } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/#home", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#blog", label: "Blog" },
    { href: "/#contact", label: "Contact" }
  ];

  const isHomePage = location.pathname === '/';

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    if (path.startsWith('#')) {
      const element = document.querySelector(path.replace('/', ''));
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-cyan-500" />
            <span className="font-bold text-xl text-white">CyberAllStars</span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="flex items-baseline space-x-4">
              {isHomePage ? (
                navLinks.map(link => (
                  <button
                    key={link.label}
                    onClick={() => handleNavigation(link.href)}
                    className="text-white hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                ))
              ) : (
                <Link
                  to="/"
                  className="text-white hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Back to Home
                </Link>
              )}
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                  className="px-4 py-2 text-black bg-cyan-500 rounded-lg hover:bg-cyan-400 transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-cyan-500 transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-black bg-cyan-500 rounded-lg hover:bg-cyan-400 transition-colors duration-300"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Customer Portal
                </Link>
                <Link
                  to="/admin/login"
                  className="text-white hover:text-cyan-500 transition-colors duration-300"
                >
                  Admin Portal
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-cyan-500 focus:outline-none transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm">
          {isHomePage ? (
            <>
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNavigation(link.href)}
                  className="text-white hover:text-cyan-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 w-full text-left"
                >
                  {link.label}
                </button>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                    className="text-white hover:text-cyan-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-cyan-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-cyan-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  >
                    Customer Portal
                  </Link>
                  <Link
                    to="/admin/login"
                    className="text-white hover:text-cyan-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  >
                    Admin Portal
                  </Link>
                </>
              )}
            </>
          ) : (
            <Link
              to="/"
              className="text-white hover:text-cyan-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}