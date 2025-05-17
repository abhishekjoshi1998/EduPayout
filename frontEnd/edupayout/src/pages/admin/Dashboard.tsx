import React, { useState } from 'react';
import { 
  LucideUsers, 
  LucideCalendar, 
  LucideDollarSign, 
  LucideArrowUpRight, 
  LucideArrowDownRight,
  LucideActivity
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('month'); // 'week', 'month', 'quarter', 'year'
  
  // Mock data
  const stats = {
    activeMentors: 42,
    totalSessions: 187,
    totalPayouts: 458000,
    pendingReviews: 8,
    mentorGrowth: 15,
    sessionGrowth: 23,
    payoutGrowth: -5,
  };
  
  // Mock data for recent payouts
  const recentPayouts = [
    {
      id: 'p1',
      mentorName: 'Priya Sharma',
      date: '2025-05-15',
      amount: 12500,
      status: 'paid',
    },
    {
      id: 'p2',
      mentorName: 'Rahul Verma',
      date: '2025-05-12',
      amount: 9800,
      status: 'processing',
    },
    {
      id: 'p3',
      mentorName: 'Ananya Patel',
      date: '2025-05-10',
      amount: 15200,
      status: 'paid',
    },
    {
      id: 'p4',
      mentorName: 'Arjun Mehta',
      date: '2025-05-08',
      amount: 7600,
      status: 'pending',
    },
    {
      id: 'p5',
      mentorName: 'Nisha Gupta',
      date: '2025-05-05',
      amount: 16500,
      status: 'paid',
    },
  ];
  
  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 's1',
      mentorName: 'Priya Sharma',
      type: 'live',
      date: '2025-05-20',
      time: '10:00 AM',
      duration: 60,
    },
    {
      id: 's2',
      mentorName: 'Rahul Verma',
      type: 'evaluation',
      date: '2025-05-20',
      time: '02:30 PM',
      duration: 45,
    },
    {
      id: 's3',
      mentorName: 'Ananya Patel',
      type: 'live',
      date: '2025-05-21',
      time: '11:15 AM',
      duration: 90,
    },
    {
      id: 's4',
      mentorName: 'Arjun Mehta',
      type: 'recorded',
      date: '2025-05-22',
      time: '09:00 AM',
      duration: 60,
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
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active Mentors */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <LucideUsers className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Mentors
                  </dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.activeMentors}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold">
                        <LucideArrowUpRight className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                        <span className="text-green-600 ml-1">
                          {stats.mentorGrowth}%
                        </span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Total Sessions */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <LucideCalendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Sessions
                  </dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.totalSessions}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold">
                        <LucideArrowUpRight className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                        <span className="text-green-600 ml-1">
                          {stats.sessionGrowth}%
                        </span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Total Payouts */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-teal-100 rounded-md p-3">
                <LucideDollarSign className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Payouts
                  </dt>
                  <dd>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {formatCurrency(stats.totalPayouts)}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold">
                        <LucideArrowDownRight className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                        <span className="text-red-600 ml-1">
                          {Math.abs(stats.payoutGrowth)}%
                        </span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 rounded-md p-3">
                <LucideActivity className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Reviews
                  </dt>
                  <dd>
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.pendingReviews}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent payouts and upcoming sessions */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {payout.mentorName}
                      </div>
                      <span
                        className={`ml-3 px-2 py-1 text-xs rounded-full ${getStatusColor(payout.status)}`}
                      >
                        {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(payout.amount)}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {new Date(payout.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-4 py-4 border-t border-gray-200 sm:px-6">
              <div className="text-sm">
                <a href="/admin/payouts" className="font-medium text-teal-600 hover:text-teal-500">
                  View all payouts
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Sessions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Upcoming Sessions
            </h3>
          </div>
          <div className="overflow-hidden">
            <ul role="list" className="divide-y divide-gray-200">
              {upcomingSessions.map((session) => (
                <li key={session.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {session.mentorName}
                        </div>
                        <span
                          className={`ml-3 px-2 py-1 text-xs rounded-full ${getSessionTypeColor(
                            session.type
                          )}`}
                        >
                          {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {new Date(session.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        | {session.time} | {session.duration} mins
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="px-4 py-4 border-t border-gray-200 sm:px-6">
              <div className="text-sm">
                <a href="/admin/sessions" className="font-medium text-teal-600 hover:text-teal-500">
                  View all sessions
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;