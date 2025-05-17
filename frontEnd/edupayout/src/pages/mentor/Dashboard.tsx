import React, { useState } from 'react';
import { 
  LucideCalendar, 
  LucideDollarSign, 
  LucideFileText, 
  LucideChevronRight,
  LucideCheckCircle,
  LucideAlertCircle
} from 'lucide-react';

const MentorDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('month'); // 'week', 'month', 'quarter', 'year'
  
  // Mock data
  const mentorStats = {
    totalSessions: 28,
    completedSessions: 24,
    upcomingSessions: 4,
    currentMonthEarnings: 36000,
    pendingPayouts: 15000,
    lifetimeEarnings: 245000,
  };
  
  // Mock data for recent sessions
  const recentSessions = [
    {
      id: 's1',
      type: 'live',
      date: '2025-05-15',
      time: '10:00 AM',
      duration: 60,
      status: 'completed',
      earnings: 4000,
    },
    {
      id: 's2',
      type: 'evaluation',
      date: '2025-05-12',
      time: '02:30 PM',
      duration: 45,
      status: 'completed',
      earnings: 3000,
    },
    {
      id: 's3',
      type: 'recorded',
      date: '2025-05-10',
      time: '11:15 AM',
      duration: 90,
      status: 'completed',
      earnings: 6000,
    },
    {
      id: 's4',
      type: 'live',
      date: '2025-05-22',
      time: '09:00 AM',
      duration: 60,
      status: 'upcoming',
      earnings: 4000,
    },
  ];
  
  // Mock data for recent payouts
  const recentPayouts = [
    {
      id: 'p1',
      dateRange: 'Apr 1 - Apr 15, 2025',
      amount: 22500,
      status: 'paid',
      date: '2025-04-20',
    },
    {
      id: 'p2',
      dateRange: 'Apr 16 - Apr 30, 2025',
      amount: 18000,
      status: 'processing',
      date: '2025-05-05',
    },
    {
      id: 'p3',
      dateRange: 'May 1 - May 15, 2025',
      amount: 15000,
      status: 'pending',
      date: '2025-05-20',
    },
  ];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'live':
        return 'bg-indigo-100 text-indigo-800';
      case 'recorded':
        return 'bg-purple-100 text-purple-800';
      case 'evaluation':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        <div className="mt-3 sm:mt-0">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setDateRange('week')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                dateRange === 'week'
                  ? 'bg-teal-50 text-teal-700 border border-teal-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setDateRange('month')}
              className={`px-4 py-2 text-sm font-medium ${
                dateRange === 'month'
                  ? 'bg-teal-50 text-teal-700 border border-teal-300'
                  : 'bg-white text-gray-700 border-t border-b border-gray-300 hover:bg-gray-50'
              }`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => setDateRange('quarter')}
              className={`px-4 py-2 text-sm font-medium ${
                dateRange === 'quarter'
                  ? 'bg-teal-50 text-teal-700 border border-teal-300'
                  : 'bg-white text-gray-700 border-t border-b border-gray-300 hover:bg-gray-50'
              }`}
            >
              Quarter
            </button>
            <button
              type="button"
              onClick={() => setDateRange('year')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                dateRange === 'year'
                  ? 'bg-teal-50 text-teal-700 border border-teal-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Year
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Current Month Earnings */}
        <div className="bg-gradient-to-br from-teal-500 to-blue-600 overflow-hidden shadow rounded-lg text-white">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-md p-3">
                <LucideDollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-white text-opacity-80 truncate">
                    Current Month Earnings
                  </dt>
                  <dd>
                    <div className="text-2xl font-semibold text-white">
                      {formatCurrency(mentorStats.currentMonthEarnings)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                <LucideAlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Payouts
                  </dt>
                  <dd>
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(mentorStats.pendingPayouts)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Lifetime Earnings */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <LucideFileText className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Lifetime Earnings
                  </dt>
                  <dd>
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(mentorStats.lifetimeEarnings)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sessions and Payouts */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Sessions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Recent & Upcoming Sessions
            </h3>
          </div>
          <div className="overflow-hidden">
            <ul role="list" className="divide-y divide-gray-200">
              {recentSessions.map((session) => (
                <li key={session.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getSessionTypeColor(
                            session.type
                          )}`}
                        >
                          {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                        </span>
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                            session.status
                          )}`}
                        >
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-900">
                        {new Date(session.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        | {session.time} | {session.duration} mins
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(session.earnings)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-4 py-4 border-t border-gray-200 sm:px-6">
              <div className="text-sm">
                <a href="/mentor/sessions" className="font-medium text-teal-600 hover:text-teal-500">
                  View all sessions
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Payouts */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Recent Payouts
            </h3>
          </div>
          <div className="overflow-hidden">
            <ul role="list" className="divide-y divide-gray-200">
              {recentPayouts.map((payout) => (
                <li key={payout.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {payout.dateRange}
                        </div>
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                            payout.status
                          )}`}
                        >
                          {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {payout.status === 'paid'
                          ? `Paid on ${new Date(payout.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}`
                          : `Expected on ${new Date(payout.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}`}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(payout.amount)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-4 py-4 border-t border-gray-200 sm:px-6">
              <div className="text-sm">
                <a href="/mentor/payouts" className="font-medium text-teal-600 hover:text-teal-500">
                  View all payouts
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="/mentor/sessions"
                className="block p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                    <LucideCalendar className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">View All Sessions</p>
                    <p className="mt-1 text-sm text-gray-500">Check your schedule and history</p>
                  </div>
                  <LucideChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                </div>
              </a>
              <a
                href="/mentor/payouts"
                className="block p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-teal-100 rounded-md p-3">
                    <LucideDollarSign className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Payment History</p>
                    <p className="mt-1 text-sm text-gray-500">Review all your payments</p>
                  </div>
                  <LucideChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                </div>
              </a>
              <a
                href="/mentor/chat"
                className="block p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <LucideFileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900">Contact Admin</p>
                    <p className="mt-1 text-sm text-gray-500">Chat with organization</p>
                  </div>
                  <LucideChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;