import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Auth
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';

// Layouts
import AdminLayout from './components/layout/AdminLayout';
import MentorLayout from './components/layout/MentorLayout';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminSessions from './pages/admin/Sessions';
import AdminPayouts from './pages/admin/Payouts';
import AdminReceipts from './pages/admin/Receipts';
import AdminMentors from './pages/admin/Mentors';
import AdminSettings from './pages/admin/Settings';

// Mentor Pages
import MentorDashboard from './pages/mentor/Dashboard';
import MentorSessions from './pages/mentor/Sessions';
import MentorPayouts from './pages/mentor/Payouts';
import MentorProfile from './pages/mentor/Profile';

// Chat
import ChatPage from './pages/ChatPage';

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
              <Route path="mentors" element={<AdminMentors />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="chat/:mentorId" element={<ChatPage role="admin" />} />
            </Route>
            
            {/* Mentor routes */}
            <Route path="/mentor" element={<ProtectedRoute role="mentor"><MentorLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/mentor/dashboard" replace />} />
              <Route path="dashboard" element={<MentorDashboard />} />
              <Route path="sessions" element={<MentorSessions />} />
              <Route path="payouts" element={<MentorPayouts />} />
              <Route path="profile" element={<MentorProfile />} />
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