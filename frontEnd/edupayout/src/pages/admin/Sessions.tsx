import React, { useState } from 'react';
import { 
  LucideFilter, 
  LucidePlus, 
  LucideSearch, 
  LucideDownload,
  LucideTrash,
  LucideEdit,
  LucideCalendar,
  LucideClock,
  LucideX
} from 'lucide-react';
import type { Session } from '../../types/index';

// Mock data for sessions
const mockSessions: Session[] = [
  {
    id: '1',
    mentorId: 'm1',
    mentorName: 'Priya Sharma',
    sessionType: 'live',
    date: '2025-05-18',
    startTime: '10:00',
    endTime: '11:00',
    duration: 60,
    rate: 4000,
    status: 'completed',
    notes: 'Advanced React concepts for senior developers',
  },
  {
    id: '2',
    mentorId: 'm2',
    mentorName: 'Rahul Verma',
    sessionType: 'evaluation',
    date: '2025-05-19',
    startTime: '14:30',
    endTime: '15:15',
    duration: 45,
    rate: 3000,
    status: 'scheduled',
    notes: 'Project evaluation for final submission',
  },
  {
    id: '3',
    mentorId: 'm3',
    mentorName: 'Ananya Patel',
    sessionType: 'recorded',
    date: '2025-05-17',
    startTime: '11:15',
    endTime: '12:45',
    duration: 90,
    rate: 6000,
    status: 'completed',
    notes: 'Recorded feedback on UI/UX design principles',
  },
  {
    id: '4',
    mentorId: 'm4',
    mentorName: 'Arjun Mehta',
    sessionType: 'live',
    date: '2025-05-20',
    startTime: '09:00',
    endTime: '10:00',
    duration: 60,
    rate: 4000,
    status: 'scheduled',
  },
  {
    id: '5',
    mentorId: 'm1',
    mentorName: 'Priya Sharma',
    sessionType: 'live',
    date: '2025-05-16',
    startTime: '16:00',
    endTime: '17:00',
    duration: 60,
    rate: 4000,
    status: 'cancelled',
    notes: 'Cancelled due to mentor illness',
  },
  {
    id: '6',
    mentorId: 'm5',
    mentorName: 'Nisha Gupta',
    sessionType: 'evaluation',
    date: '2025-05-21',
    startTime: '13:00',
    endTime: '14:00',
    duration: 60,
    rate: 4500,
    status: 'scheduled',
    notes: 'Final project evaluation and grading',
  },
  {
    id: '7',
    mentorId: 'm2',
    mentorName: 'Rahul Verma',
    sessionType: 'recorded',
    date: '2025-05-15',
    startTime: '10:30',
    endTime: '11:30',
    duration: 60,
    rate: 4000,
    status: 'completed',
  },
];

const AdminSessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: '',
    to: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  
  // Filter sessions based on search and filters
  const filteredSessions = sessions.filter((session) => {
    // Search term filter
    const matchesSearch =
      searchTerm === '' ||
      session.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.sessionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Session type filter
    const matchesType = selectedType === null || session.sessionType === selectedType;
    
    // Status filter
    const matchesStatus = selectedStatus === null || session.status === selectedStatus;
    
    // Date range filter
    const sessionDate = new Date(session.date);
    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;
    
    const matchesDateRange =
      (fromDate === null || sessionDate >= fromDate) &&
      (toDate === null || sessionDate <= toDate);
    
    return matchesSearch && matchesType && matchesStatus && matchesDateRange;
  });
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get session type color
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
  
  // Handle adding or editing session
  const handleSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the backend
    // For now, we're just updating the local state
    
    if (currentSession) {
      if (currentSession.id) {
        // Editing existing session
        setSessions(sessions.map(s => s.id === currentSession.id ? currentSession : s));
      } else {
        // Adding new session
        const newSession = {
          ...currentSession,
          id: `${Date.now()}`, // generate a temporary id
        };
        setSessions([...sessions, newSession]);
      }
    }
    
    setShowModal(false);
    setCurrentSession(null);
  };
  
  // Handle session deletion
  const handleDeleteSession = (id: string) => {
    // In a real app, this would call the backend API
    setSessions(sessions.filter(session => session.id !== id));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType(null);
    setSelectedStatus(null);
    setDateRange({ from: '', to: '' });
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sessions</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage all sessions, including upcoming, completed, and cancelled sessions.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => {
              setCurrentSession({
                id: '',
                mentorId: '',
                mentorName: '',
                sessionType: 'live',
                date: '',
                startTime: '',
                endTime: '',
                duration: 60,
                rate: 4000,
                status: 'scheduled',
              });
              setShowModal(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <LucidePlus className="-ml-1 mr-2 h-5 w-5" />
            Add Session
          </button>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="mt-6 sm:flex sm:items-center">
        <div className="relative flex-grow max-w-lg">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <LucideSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            placeholder="Search sessions"
          />
        </div>
        
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <LucideFilter className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Filters
          </button>
        </div>
        
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <LucideDownload className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
            Export
          </button>
        </div>
      </div>
      
      {/* Expanded filters */}
      {showFilters && (
        <div className="mt-4 bg-white shadow rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="session-type" className="block text-sm font-medium text-gray-700">
                Session Type
              </label>
              <select
                id="session-type"
                value={selectedType || ''}
                onChange={(e) => setSelectedType(e.target.value || null)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              >
                <option value="">All Types</option>
                <option value="live">Live</option>
                <option value="recorded">Recorded</option>
                <option value="evaluation">Evaluation</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                value={selectedStatus || ''}
                onChange={(e) => setSelectedStatus(e.target.value || null)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="from-date" className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                id="from-date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="to-date" className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                id="to-date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Sessions list */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <li key={session.id}>
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {session.mentorName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{session.mentorName}</h3>
                        <div className="flex items-center mt-1">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getSessionTypeColor(
                              session.sessionType
                            )}`}
                          >
                            {session.sessionType.charAt(0).toUpperCase() + session.sessionType.slice(1)}
                          </span>
                          <span
                            className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                              session.status
                            )}`}
                          >
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="text-sm text-gray-500 mr-8 text-right">
                        <div className="flex items-center justify-end mb-1">
                          <LucideCalendar className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(session.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center justify-end">
                          <LucideClock className="h-4 w-4 mr-1" />
                          <span>
                            {session.startTime} - {session.endTime} ({session.duration} mins)
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-base font-medium text-gray-900 mr-8">
                        {formatCurrency(session.rate)}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentSession(session);
                            setShowModal(true);
                          }}
                          className="p-2 text-teal-600 hover:text-teal-900 focus:outline-none"
                        >
                          <LucideEdit className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSession(session.id)}
                          className="p-2 text-red-600 hover:text-red-900 focus:outline-none"
                        >
                          <LucideTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {session.notes && (
                    <div className="mt-3 text-sm text-gray-500 border-t border-gray-100 pt-3">
                      <p>{session.notes}</p>
                    </div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-5 text-center sm:px-6">
              <p className="text-gray-500">No sessions found matching your criteria.</p>
            </li>
          )}
        </ul>
      </div>
      
      {/* Add/Edit Session Modal */}
      {showModal && currentSession && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setCurrentSession(null);
                  }}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <LucideX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-3 sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {currentSession.id ? 'Edit Session' : 'Add New Session'}
                </h3>
                
                <form onSubmit={handleSessionSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="mentor-name" className="block text-sm font-medium text-gray-700">
                      Mentor Name
                    </label>
                    <input
                      type="text"
                      id="mentor-name"
                      value={currentSession.mentorName}
                      onChange={(e) => setCurrentSession({ ...currentSession, mentorName: e.target.value })}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="session-type" className="block text-sm font-medium text-gray-700">
                      Session Type
                    </label>
                    <select
                      id="session-type"
                      value={currentSession.sessionType}
                      onChange={(e) => setCurrentSession({ ...currentSession, sessionType: e.target.value as 'live' | 'recorded' | 'evaluation' })}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="live">Live</option>
                      <option value="recorded">Recorded</option>
                      <option value="evaluation">Evaluation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={currentSession.date}
                      onChange={(e) => setCurrentSession({ ...currentSession, date: e.target.value })}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">
                        Start Time
                      </label>
                      <input
                        type="time"
                        id="start-time"
                        value={currentSession.startTime}
                        onChange={(e) => setCurrentSession({ ...currentSession, startTime: e.target.value })}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">
                        End Time
                      </label>
                      <input
                        type="time"
                        id="end-time"
                        value={currentSession.endTime}
                        onChange={(e) => setCurrentSession({ ...currentSession, endTime: e.target.value })}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      id="duration"
                      value={currentSession.duration}
                      onChange={(e) => setCurrentSession({ ...currentSession, duration: parseInt(e.target.value) })}
                      required
                      min="1"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
                      Rate (₹)
                    </label>
                    <input
                      type="number"
                      id="rate"
                      value={currentSession.rate}
                      onChange={(e) => setCurrentSession({ ...currentSession, rate: parseInt(e.target.value) })}
                      required
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      value={currentSession.status}
                      onChange={(e) => setCurrentSession({ ...currentSession, status: e.target.value as 'scheduled' | 'completed' | 'cancelled' })}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      value={currentSession.notes || ''}
                      onChange={(e) => setCurrentSession({ ...currentSession, notes: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    ></textarea>
                  </div>
                  
                  <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {currentSession.id ? 'Update Session' : 'Add Session'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setCurrentSession(null);
                      }}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSessions;