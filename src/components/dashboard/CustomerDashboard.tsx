import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChatProvider } from '../../contexts/ChatContext';
import DashboardLayout from './DashboardLayout';
import DashboardHome from './DashboardHome';
import CustomerServices from './CustomerServices';
import ServiceRequests from './ServiceRequests';
import Invoices from './Invoices';
import InvoiceDetails from './InvoiceDetails';
import SupportChat from './SupportChat';
import CustomerSettings from './CustomerSettings';
import DocumentManager from '../documents/DocumentManager';

export default function CustomerDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="services" element={<CustomerServices />} />
        <Route path="requests" element={<ServiceRequests />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="invoices/:id" element={<InvoiceDetails />} />
        <Route path="support" element={
          <ChatProvider>
            <SupportChat />
          </ChatProvider>
        } />
        <Route path="documents" element={<DocumentManager />} />
        <Route path="settings" element={<CustomerSettings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}