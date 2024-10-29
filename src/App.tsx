import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ServiceProvider } from './contexts/ServiceContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { AdminProvider } from './contexts/AdminContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { DocumentProvider } from './contexts/DocumentContext';
import { InvoiceProvider } from './contexts/InvoiceContext';
import { BlogProvider } from './contexts/BlogContext';
import { SecurityProvider } from './contexts/SecurityContext';
import { AIProvider } from './contexts/AIContext';
import { ConfigProvider } from './contexts/ConfigContext';
import ErrorBoundary from './components/ErrorBoundary';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Blog from './components/Blog';
import ContactForm from './components/ContactForm';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import AdminLogin from './components/auth/AdminLogin';
import CustomerDashboard from './components/dashboard/CustomerDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = ['/login', '/admin/login'].includes(location.pathname);
  const isDashboardPage = location.pathname.includes('/dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {!isAuthPage && !isDashboardPage && <Navbar />}
      <Routes>
        {/* Public Home Page */}
        <Route
          path="/"
          element={
            <main className="flex-1">
              <Hero />
              <Services />
              <Blog />
              <ContactForm />
              <Chatbot />
              <Footer />
            </main>
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Customer Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute requiredRoles={['customer_company', 'customer_employee']}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ConfigProvider>
        <AuthProvider>
          <DashboardProvider>
            <ServiceProvider>
              <AdminProvider>
                <SettingsProvider>
                  <DocumentProvider>
                    <InvoiceProvider>
                      <BlogProvider>
                        <SecurityProvider>
                          <AIProvider>
                            <AppRoutes />
                          </AIProvider>
                        </SecurityProvider>
                      </BlogProvider>
                    </InvoiceProvider>
                  </DocumentProvider>
                </SettingsProvider>
              </AdminProvider>
            </ServiceProvider>
          </DashboardProvider>
        </AuthProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}