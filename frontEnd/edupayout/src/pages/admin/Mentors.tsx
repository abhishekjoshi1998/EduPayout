import React, { useState } from 'react';
import { 
  LucideFilter, 
  LucidePlus, 
  LucideSearch, 
  LucideDownload,
  LucideEdit,
  LucideTrash,
  LucideX,
  LucideCheck,
  LucideMessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Mentor } from '../../types';

// Mock data for mentors
const mockMentors: Mentor[] = [
  {
    id: 'm1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    joinedDate: '2024-01-15',
    specialization: 'React, Node.js',
    hourlyRate: 4000,
    totalSessions: 48,
    totalEarnings: 192000,
    status: 'active',
  },
  {
    id: 'm2',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91 98765 43211',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    joinedDate: '2024-02-01',
    specialization: 'Python, Data Science',
    hourlyRate: 3500,
    totalSessions: 36,
    totalEarnings: 126000,
    status: 'active',
  },
  {
    id: 'm3',
    name: 'Ananya Patel',
    email: 'ananya.patel@example.com',
    phone: '+91 98765 43212',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    joinedDate: '2024-01-20',
    specialization: 'UI/UX Design',
    hourlyRate: 4500,
    totalSessions: 42,
    totalEarnings: 189000,
    status: 'active',
  },
  {
    id: 'm4',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@example.com',
    phone: '+91 98765 43213',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    joinedDate: '2024-02-10',
    specialization: 'DevOps, Cloud',
    hourlyRate: 5000,
    totalSessions: 24,
    totalEarnings: 120000,
    status: 'inactive',
  },
  {
    id: 'm5',
    name: 'Nisha Gupta',
    email: 'nisha.gupta@example.com',
    phone: '+91 98765 43214',
    avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
    joinedDate: '2024-01-25',
    specialization: 'Mobile Development',
    hourlyRate: 4200,
    totalSessions: 38,
    totalEarnings: 159600,
    status: 'active',
  },
];

const AdminMentors: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>(mockMentors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentMentor, setCurrentMentor] = useState<Mentor | null>(null);
  
  const navigate = useNavigate();
  
  // Filter mentors based on search and filters
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      searchTerm === '' ||
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === null || mentor.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
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
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle mentor form submission
  const handleMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMentor) {
      if (currentMentor.id) {
        // Update existing mentor
        setMentors(mentors.map(m => m.id === currentMentor.id ? currentMentor : m));
      } else {
        // Add new mentor
        const newMentor = {
          ...currentMentor,
          id: `m${Date.now()}`,
          joinedDate: new Date().toISOString().split('T')[0],
          totalSessions: 0,
          totalEarnings: 0,
          status: 'active',
        };
        setMentors([...mentors, newMentor]);
      }
    }
    setShowModal(false);
    setCurrentMentor(null);
  };
  
  // Handle mentor deletion
  const handleDeleteMentor = (id: string) => {
    if (confirm('Are you sure you want to delete this mentor?')) {
      setMentors(mentors.filter(mentor => mentor.id !== id));
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus(null);
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Mentors</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage mentors, their profiles, and track their performance.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => {
              setCurrentMentor({
                id: '',
                name: '',
                email: '',
                specialization: '',
                hourlyRate: 0,
                joinedDate: '',
                totalSessions: 0,
                totalEarnings: 0,
                status: 'active',
              });
              setShowModal(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <LucidePlus className="-ml-1 mr-2 h-5 w-5" />
            Add Mentor
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
            placeholder="Search mentors"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
      
      {/* Mentors list */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <ul role="list" className="divide-y divide-gray-200">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <li key={mentor.id} className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {mentor.avatar ? (
                        <img
                          className="h-12 w-12 rounded-full"
                          src={mentor.avatar}
                          alt={mentor.name}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium text-lg">
                            {mentor.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{mentor.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500">{mentor.email}</span>
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                            mentor.status
                          )}`}
                        >
                          {mentor.status.charAt(0).toUpperCase() + mentor.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        Specialization: {mentor.specialization}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-sm text-gray-500 mr-8 text-right">
                      <div className="mb-1">
                        Rate: <span className="font-medium text-gray-900">{formatCurrency(mentor.hourlyRate)}/hour</span>
                      </div>
                      <div>
                        Total Sessions: <span className="font-medium text-gray-900">{mentor.totalSessions}</span>
                      </div>
                      <div>
                        Total Earnings: <span className="font-medium text-gray-900">{formatCurrency(mentor.totalEarnings)}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/chat/${mentor.id}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        title="Chat"
                      >
                        <LucideMessageSquare className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentMentor(mentor);
                          setShowModal(true);
                        }}
                        className="p-2 text-teal-600 hover:text-teal-900 focus:outline-none"
                        title="Edit"
                      >
                        <LucideEdit className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMentor(mentor.id)}
                        className="p-2 text-red-600 hover:text-red-900 focus:outline-none"
                        title="Delete"
                      >
                        <LucideTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-5 text-center sm:px-6">
              <p className="text-gray-500">No mentors found matching your criteria.</p>
            </li>
          )}
        </ul>
      </div>
      
      {/* Add/Edit Mentor Modal */}
      {showModal && currentMentor && (
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
                    setCurrentMentor(null);
                  }}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <LucideX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-3 sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {currentMentor.id ? 'Edit Mentor' : 'Add New Mentor'}
                </h3>
                
                <form onSubmit={handleMentorSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={currentMentor.name}
                      onChange={(e) => setCurrentMentor({ ...currentMentor, name: e.target.value })}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={currentMentor.email}
                      onChange={(e) => setCurrentMentor({ ...currentMentor, email: e.target.value })}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={currentMentor.phone || ''}
                      onChange={(e) => setCurrentMentor({ ...currentMentor, phone: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                      Specialization
                    </label>
                    <input
                      type="text"
                      id="specialization"
                      value={currentMentor.specialization}
                      onChange={(e) => setCurrentMentor({ ...currentMentor, specialization: e.target.value })}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="e.g., React, Node.js, Python"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                      Hourly Rate (₹)
                    </label>
                    <input
                      type="number"
                      id="hourlyRate"
                      value={currentMentor.hourlyRate}
                      onChange={(e) => setCurrentMentor({ ...currentMentor, hourlyRate: parseInt(e.target.value) })}
                      required
                      min="0"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                  </div>
                  
                  {currentMentor.id && (
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        value={currentMentor.status}
                        onChange={(e) => setCurrentMentor({ ...currentMentor, status: e.target.value as 'active' | 'inactive' })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  )}
                  
                  <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {currentMentor.id ? 'Update Mentor' : 'Add Mentor'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setCurrentMentor(null);
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

export default AdminMentors;