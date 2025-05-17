import React, { useState } from 'react';
import { 
  LucideFilter, 
  LucidePlus, 
  LucideSearch, 
  LucideDownload,
  LucideFileText,
  LucideDollarSign,
  LucideUsers,
  LucideX,
  LucideCheck,
  LucideExternalLink
} from 'lucide-react';
import { Payout, Session } from '../../types';

// Mock data for payouts
const mockPayouts: Payout[] = [
  {
    id: 'p1',
    mentorId: 'm1',
    mentorName: 'Priya Sharma',
    dateRange: {
      from: '2025-05-01',
      to: '2025-05-15',
    },
    sessions: ['s1', 's2', 's3'],
    basePayout: 12000,
    breakdown: [
      { amount: 8000, description: '2 Live Sessions' },
      { amount: 4000, description: '1 Recorded Review' },
    ],
    taxes: [
      { type: 'GST', rate: 5, amount: 600 },
    ],
    platformFee: 1200,
    finalAmount: 10200,
    status: 'paid',
    paymentDate: '2025-05-18',
    receiptId: 'r1',
  },
  {
    id: 'p2',
    mentorId: 'm2',
    mentorName: 'Rahul Verma',
    dateRange: {
      from: '2025-05-01',
      to: '2025-05-15',
    },
    sessions: ['s4', 's5'],
    basePayout: 9000,
    breakdown: [
      { amount: 6000, description: '2 Evaluation Sessions' },
      { amount: 3000, description: '1 Live Workshop' },
    ],
    taxes: [
      { type: 'GST', rate: 5, amount: 450 },
    ],
    platformFee: 900,
    finalAmount: 7650,
    status: 'processing',
  },
  {
    id: 'p3',
    mentorId: 'm3',
    mentorName: 'Ananya Patel',
    dateRange: {
      from: '2025-05-01',
      to: '2025-05-15',
    },
    sessions: ['s6', 's7', 's8', 's9'],
    basePayout: 16000,
    breakdown: [
      { amount: 10000, description: '2 Live Sessions' },
      { amount: 6000, description: '2 Recorded Reviews' },
    ],
    taxes: [
      { type: 'GST', rate: 5, amount: 800 },
    ],
    platformFee: 1600,
    finalAmount: 13600,
    status: 'paid',
    paymentDate: '2025-05-18',
    receiptId: 'r2',
  },
  {
    id: 'p4',
    mentorId: 'm4',
    mentorName: 'Arjun Mehta',
    dateRange: {
      from: '2025-04-16',
      to: '2025-04-30',
    },
    sessions: ['s10', 's11'],
    basePayout: 7000,
    breakdown: [
      { amount: 4000, description: '1 Live Session' },
      { amount: 3000, description: '1 Evaluation' },
    ],
    taxes: [
      { type: 'GST', rate: 5, amount: 350 },
    ],
    platformFee: 700,
    finalAmount: 5950,
    status: 'paid',
    paymentDate: '2025-05-05',
    receiptId: 'r3',
  },
  {
    id: 'p5',
    mentorId: 'm5',
    mentorName: 'Nisha Gupta',
    dateRange: {
      from: '2025-05-01',
      to: '2025-05-15',
    },
    sessions: ['s12', 's13', 's14'],
    basePayout: 15000,
    breakdown: [
      { amount: 8000, description: '2 Live Sessions' },
      { amount: 7000, description: '2 Evaluations' },
    ],
    taxes: [
      { type: 'GST', rate: 5, amount: 750 },
    ],
    platformFee: 1500,
    finalAmount: 12750,
    status: 'pending',
  },
];

// Mock sessions data for payout creation
const mockSessions: Session[] = [
  {
    id: 's20',
    mentorId: 'm1',
    mentorName: 'Priya Sharma',
    sessionType: 'live',
    date: '2025-05-18',
    startTime: '10:00',
    endTime: '11:00',
    duration: 60,
    rate: 4000,
    status: 'completed',
  },
  {
    id: 's21',
    mentorId: 'm1',
    mentorName: 'Priya Sharma',
    sessionType: 'live',
    date: '2025-05-20',
    startTime: '14:00',
    endTime: '15:00',
    duration: 60,
    rate: 4000,
    status: 'completed',
  },
  {
    id: 's22',
    mentorId: 'm2',
    mentorName: 'Rahul Verma',
    sessionType: 'evaluation',
    date: '2025-05-19',
    startTime: '11:00',
    endTime: '12:00',
    duration: 60,
    rate: 3000,
    status: 'completed',
  },
];

const AdminPayouts: React.FC = () => {
  const [payouts, setPayouts] = useState<Payout[]>(mockPayouts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: '',
    to: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentPayout, setCurrentPayout] = useState<Payout | null>(null);
  const [availableSessions, setAvailableSessions] = useState<Session[]>(mockSessions);
  const [selectedSessions, setSelectedSessions] = useState<Session[]>([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  
  // Filter payouts based on search and filters
  const filteredPayouts = payouts.filter((payout) => {
    // Search term filter
    const matchesSearch =
      searchTerm === '' ||
      payout.mentorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = selectedStatus === null || payout.status === selectedStatus;
    
    // Date range filter - check if payout date range overlaps with filter date range
    const payoutFromDate = new Date(payout.dateRange.from);
    const payoutToDate = new Date(payout.dateRange.to);
    const filterFromDate = dateRange.from ? new Date(dateRange.from) : null;
    const filterToDate = dateRange.to ? new Date(dateRange.to) : null;
    
    const matchesDateRange =
      (filterFromDate === null || filterToDate === null) ||
      (payoutFromDate <= (filterToDate || new Date()) && 
       payoutToDate >= (filterFromDate || new Date(0)));
    
    return matchesSearch && matchesStatus && matchesDateRange;
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
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle payout creation
  const handleCreatePayout = () => {
    // Calculate base payout
    const basePayout = selectedSessions.reduce((sum, session) => sum + session.rate, 0);
    
    // Create breakdown
    const liveSessionCount = selectedSessions.filter(s => s.sessionType === 'live').length;
    const recordedSessionCount = selectedSessions.filter(s => s.sessionType === 'recorded').length;
    const evaluationSessionCount = selectedSessions.filter(s => s.sessionType === 'evaluation').length;
    
    const breakdown = [];
    if (liveSessionCount > 0) {
      const liveAmount = selectedSessions
        .filter(s => s.sessionType === 'live')
        .reduce((sum, s) => sum + s.rate, 0);
      breakdown.push({
        amount: liveAmount,
        description: `${liveSessionCount} Live Session${liveSessionCount > 1 ? 's' : ''}`,
      });
    }
    
    if (recordedSessionCount > 0) {
      const recordedAmount = selectedSessions
        .filter(s => s.sessionType === 'recorded')
        .reduce((sum, s) => sum + s.rate, 0);
      breakdown.push({
        amount: recordedAmount,
        description: `${recordedSessionCount} Recorded Review${recordedSessionCount > 1 ? 's' : ''}`,
      });
    }
    
    if (evaluationSessionCount > 0) {
      const evalAmount = selectedSessions
        .filter(s => s.sessionType === 'evaluation')
        .reduce((sum, s) => sum + s.rate, 0);
      breakdown.push({
        amount: evalAmount,
        description: `${evaluationSessionCount} Evaluation${evaluationSessionCount > 1 ? 's' : ''}`,
      });
    }
    
    // Calculate taxes and platform fee
    const gstRate = 5;
    const platformFeeRate = 10;
    
    const gstAmount = Math.round((basePayout * gstRate) / 100);
    const platformFee = Math.round((basePayout * platformFeeRate) / 100);
    
    // Calculate final amount
    const finalAmount = basePayout - gstAmount - platformFee;
    
    // Create payout object
    const newPayout: Payout = {
      id: `p${Date.now()}`,
      mentorId: selectedSessions[0].mentorId,
      mentorName: selectedSessions[0].mentorName,
      dateRange: {
        from: selectedSessions.reduce(
          (earliest, session) => session.date < earliest ? session.date : earliest,
          selectedSessions[0].date
        ),
        to: selectedSessions.reduce(
          (latest, session) => session.date > latest ? session.date : latest,
          selectedSessions[0].date
        ),
      },
      sessions: selectedSessions.map(s => s.id),
      basePayout,
      breakdown,
      taxes: [
        { type: 'GST', rate: gstRate, amount: gstAmount },
      ],
      platformFee,
      finalAmount,
      status: 'pending',
    };
    
    // Add to payouts
    setPayouts([...payouts, newPayout]);
    
    // Close modal and reset state
    setShowModal(false);
    setSelectedSessions([]);
    setSelectedMentor('');
  };
  
  // Toggle session selection
  const toggleSessionSelection = (session: Session) => {
    if (selectedSessions.find(s => s.id === session.id)) {
      setSelectedSessions(selectedSessions.filter(s => s.id !== session.id));
    } else {
      setSelectedSessions([...selectedSessions, session]);
    }
  };
  
  // Filter sessions by selected mentor
  const filteredAvailableSessions = selectedMentor
    ? availableSessions.filter(s => s.mentorName === selectedMentor)
    : availableSessions;
  
  // Get unique mentor names
  const mentorNames = Array.from(new Set(availableSessions.map(s => s.mentorName)));
  
  // Update payout status
  const updatePayoutStatus = (id: string, status: 'pending' | 'processing' | 'paid' | 'cancelled') => {
    setPayouts(
      payouts.map(p =>
        p.id === id
          ? {
              ...p,
              status,
              paymentDate: status === 'paid' ? new Date().toISOString().split('T')[0] : p.paymentDate,
            }
          : p
      )
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus(null);
    setDateRange({ from: '', to: '' });
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Payouts</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage mentor payouts, including generation, approval, and payment tracking.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <LucidePlus className="-ml-1 mr-2 h-5 w-5" />
            Create Payout
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
            placeholder="Search by mentor name"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="paid">Paid</option>
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
      
      {/* Payouts list */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {filteredPayouts.length > 0 ? (
            filteredPayouts.map((payout) => (
              <li key={payout.id}>
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {payout.mentorName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{payout.mentorName}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-500">
                            {new Date(payout.dateRange.from).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })} - {new Date(payout.dateRange.to).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span
                            className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                              payout.status
                            )}`}
                          >
                            {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-8">
                        <div className="text-xs text-gray-500 mb-1">Base Amount</div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(payout.basePayout)}
                        </div>
                      </div>
                      
                      <div className="mr-8">
                        <div className="text-xs text-gray-500 mb-1">Final Payout</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {formatCurrency(payout.finalAmount)}
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        {payout.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => updatePayoutStatus(payout.id, 'processing')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                          >
                            Process
                          </button>
                        )}
                        
                        {payout.status === 'processing' && (
                          <button
                            type="button"
                            onClick={() => updatePayoutStatus(payout.id, 'paid')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                          >
                            <LucideCheck className="-ml-0.5 mr-1 h-4 w-4" />
                            Mark Paid
                          </button>
                        )}
                        
                        {payout.status !== 'cancelled' && payout.status !== 'paid' && (
                          <button
                            type="button"
                            onClick={() => updatePayoutStatus(payout.id, 'cancelled')}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            Cancel
                          </button>
                        )}
                        
                        {payout.receiptId && (
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentPayout(payout);
                              setShowReceiptModal(true);
                            }}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            <LucideFileText className="-ml-0.5 mr-1 h-4 w-4" />
                            View Receipt
                          </button>
                        )}
                        
                        {!payout.receiptId && payout.status !== 'cancelled' && (
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            <LucideFileText className="-ml-0.5 mr-1 h-4 w-4" />
                            Generate Receipt
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Breakdown</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {payout.breakdown.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md">
                          <div className="text-sm font-medium text-gray-900">{item.description}</div>
                          <div className="text-sm text-gray-500">{formatCurrency(item.amount)}</div>
                        </div>
                      ))}
                      
                      {payout.taxes.map((tax, index) => (
                        <div key={`tax-${index}`} className="bg-gray-50 p-3 rounded-md">
                          <div className="text-sm font-medium text-gray-900">
                            {tax.type} ({tax.rate}%)
                          </div>
                          <div className="text-sm text-red-500">-{formatCurrency(tax.amount)}</div>
                        </div>
                      ))}
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-sm font-medium text-gray-900">Platform Fee (10%)</div>
                        <div className="text-sm text-red-500">-{formatCurrency(payout.platformFee)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-5 text-center sm:px-6">
              <p className="text-gray-500">No payouts found matching your criteria.</p>
            </li>
          )}
        </ul>
      </div>
      
      {/* Create Payout Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedSessions([]);
                    setSelectedMentor('');
                  }}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <LucideX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-3 sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Create New Payout
                </h3>
                
                <div className="mt-6 space-y-6">
                  <div>
                    <label htmlFor="mentor" className="block text-sm font-medium text-gray-700">
                      Select Mentor
                    </label>
                    <select
                      id="mentor"
                      value={selectedMentor}
                      onChange={(e) => {
                        setSelectedMentor(e.target.value);
                        setSelectedSessions([]);
                      }}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="">Select a mentor</option>
                      {mentorNames.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {selectedMentor && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Select Sessions to Include
                      </h4>
                      <div className="border border-gray-200 rounded-md max-h-60 overflow-y-auto">
                        <ul className="divide-y divide-gray-200">
                          {filteredAvailableSessions.length > 0 ? (
                            filteredAvailableSessions.map((session) => (
                              <li key={session.id} className="px-4 py-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                      <input
                                        id={`session-${session.id}`}
                                        type="checkbox"
                                        checked={!!selectedSessions.find(s => s.id === session.id)}
                                        onChange={() => toggleSessionSelection(session)}
                                        className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label htmlFor={`session-${session.id}`} className="font-medium text-gray-700">
                                        {new Date(session.date).toLocaleDateString('en-US', {
                                          weekday: 'short',
                                          month: 'short',
                                          day: 'numeric',
                                        })} | {session.startTime} - {session.endTime}
                                        <span
                                          className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                            session.sessionType === 'live'
                                              ? 'bg-indigo-100 text-indigo-800'
                                              : session.sessionType === 'recorded'
                                              ? 'bg-purple-100 text-purple-800'
                                              : 'bg-teal-100 text-teal-800'
                                          }`}
                                        >
                                          {session.sessionType.charAt(0).toUpperCase() + session.sessionType.slice(1)}
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {formatCurrency(session.rate)}
                                  </div>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="px-4 py-5 text-center">
                              <p className="text-gray-500">No completed sessions found for this mentor.</p>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {selectedSessions.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Payout Summary
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Base Amount:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(selectedSessions.reduce((sum, s) => sum + s.rate, 0))}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            GST (5%):
                          </span>
                          <span className="text-sm font-medium text-red-500">
                            -{formatCurrency(Math.round((selectedSessions.reduce((sum, s) => sum + s.rate, 0) * 5) / 100))}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            Platform Fee (10%):
                          </span>
                          <span className="text-sm font-medium text-red-500">
                            -{formatCurrency(Math.round((selectedSessions.reduce((sum, s) => sum + s.rate, 0) * 10) / 100))}
                          </span>
                        </div>
                        <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">Final Payout:</span>
                          <span className="text-base font-bold text-gray-900">
                            {formatCurrency(
                              selectedSessions.reduce((sum, s) => sum + s.rate, 0) -
                                Math.round((selectedSessions.reduce((sum, s) => sum + s.rate, 0) * 5) / 100) -
                                Math.round((selectedSessions.reduce((sum, s) => sum + s.rate, 0) * 10) / 100)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={handleCreatePayout}
                      disabled={selectedSessions.length === 0}
                      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                        selectedSessions.length === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                      } text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
                    >
                      Create Payout
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setSelectedSessions([]);
                        setSelectedMentor('');
                      }}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Receipt Modal */}
      {showReceiptModal && currentPayout && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowReceiptModal(false);
                    setCurrentPayout(null);
                  }}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <LucideX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-3 sm:mt-0">
                <div className="bg-white p-6">
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Payment Receipt</h2>
                        <p className="text-sm text-gray-500">Receipt ID: {currentPayout.receiptId}</p>
                      </div>
                      <div className="flex items-center">
                        <LucideDollarSign className="h-8 w-8 text-teal-500 mr-2" />
                        <span className="text-xl font-bold text-teal-600">EdTech</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Mentor</h3>
                      <p className="mt-1 text-base font-medium text-gray-900">{currentPayout.mentorName}</p>
                      <p className="mt-1 text-sm text-gray-500">Mentor ID: {currentPayout.mentorId}</p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-sm font-medium text-gray-500">Payment Information</h3>
                      <p className="mt-1 text-base font-medium text-gray-900">
                        Status: <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(currentPayout.status)}`}>
                          {currentPayout.status.charAt(0).toUpperCase() + currentPayout.status.slice(1)}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {currentPayout.paymentDate
                          ? `Paid on ${new Date(currentPayout.paymentDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}`
                          : 'Payment Pending'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-b border-gray-200 py-4 mb-6">
                    <h3 className="text-base font-medium text-gray-900 mb-3">Payment Period</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        {new Date(currentPayout.dateRange.from).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })} - {new Date(currentPayout.dateRange.to).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-base font-medium text-gray-900 mb-3">Payment Breakdown</h3>
                    <div className="bg-gray-50 rounded-md p-4">
                      <div className="space-y-3">
                        {currentPayout.breakdown.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">{item.description}</span>
                            <span className="text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                          </div>
                        ))}
                        
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Base Payout</span>
                            <span className="text-sm font-medium text-gray-900">{formatCurrency(currentPayout.basePayout)}</span>
                          </div>
                        </div>
                        
                        {currentPayout.taxes.map((tax, index) => (
                          <div key={`tax-${index}`} className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">{tax.type} ({tax.rate}%)</span>
                            <span className="text-sm font-medium text-red-500">-{formatCurrency(tax.amount)}</span>
                          </div>
                        ))}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">Platform Fee (10%)</span>
                          <span className="text-sm font-medium text-red-500">-{formatCurrency(currentPayout.platformFee)}</span>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-base font-medium text-gray-900">Final Payout</span>
                            <span className="text-base font-bold text-gray-900">{formatCurrency(currentPayout.finalAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <p className="text-xs text-gray-500">
                      This is an electronically generated receipt and does not require a signature.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          // In a real app, this would send the receipt to the mentor
                          alert('Receipt sent to mentor!');
                        }}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none"
                      >
                        <LucideExternalLink className="mr-2 h-4 w-4" />
                        Send to Mentor
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                      >
                        <LucideDownload className="mr-2 h-4 w-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayouts;