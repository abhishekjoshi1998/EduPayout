import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Auth
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/mentor/LoginPage';

// Layouts
import AdminLayout from './components/layout/AdminRoute';
import MentorLayout from './components/layout/MentorLayout';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminSessions from './pages/admin/Sessions';
import AdminPayouts from './pages/admin/Payout';
import AdminReceipts from './pages/admin/Receipts';


// Mentor Pages
import MentorDashboard from './pages/mentor/Dashboard';

import MentorPayouts from './pages/mentor/Payout';


// Chat
import ChatPage from './pages/mentor/ChatPage';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="sessions" element={<AdminSessions />} />
              <Route path="payouts" element={<AdminPayouts />} />
              <Route path="receipts" element={<AdminReceipts />} />
            
              <Route path="chat/:mentorId" element={<ChatPage role="admin" />} />
            </Route>
            
            {/* Mentor routes */}
            <Route path="/mentor" element={<ProtectedRoute role="mentor"><MentorLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/mentor/dashboard" replace />} />
              <Route path="dashboard" element={<MentorDashboard />} />
            
              <Route path="payouts" element={<MentorPayouts />} />
             
              <Route path="chat" element={<ChatPage role="mentor" />} />
            </Route>
            
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch all - replace with a 404 page if desired */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;