import React, { useState } from 'react';
import { 
  LucideFilter, 
  LucideSearch, 
  LucideDownload,
  LucideFileText,
  LucideExternalLink
} from 'lucide-react';
import type { Payout } from '../../types';

// Mock data for payouts
const mockPayouts: Payout[] = [
  {
    id: 'p1',
    mentorId: 'm2',
    mentorName: 'Jane Smith',
    dateRange: {
      from: '2025-04-01',
      to: '2025-04-15',
    },
    sessions: ['s1', 's2', 's3'],
    basePayout: 14000,
    breakdown: [
      { amount: 8000, description: '2 Live Sessions' },
      { amount: 6000, description: '2 Evaluations' },
    ],
    taxes: [
      { type: 'GST', rate: 5, amount: 700 },
    ],
    platformFee: 1400,
    finalAmount: 11900,
    status: 'paid',
    paymentDate: '2025-04-20',
    receiptId: 'r1',
  },
  {
    id: 'p2',
    mentorId: 'm2',
    mentorName: 'Jane Smith',
    dateRange: {
      from: '2025-04-16',
      to: '2025-04-30',
    },
    sessions: ['s4', 's5', 's6'],
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
    paymentDate: '2025-05-05',
    receiptId: 'r2',
  },
  {
    id: 'p3',
    mentorId: 'm2',
    mentorName: 'Jane Smith',
    dateRange: {
      from: '2025-05-01',
      to: '2025-05-15',
    },
    sessions: ['s7', 's8', 's9', 's10'],
    basePayout: 15000,
    breakdown: [
      { amount: 8000, description: '2 Live Sessions' },
      { amount: 4000, description: '1 Recorded Review' },
      { amount: 3000, description: '1 Evaluation' },
    ],
    taxes: [
      { type: 'GST', rate: 5, amount: 750 },
    ],
    platformFee: 1500,
    finalAmount: 12750,
    status: 'processing',
  },
];

const MentorPayouts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: '',
    to: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentPayout, setCurrentPayout] = useState<Payout | null>(null);
  
  // Filter payouts based on search and filters
  const filteredPayouts = mockPayouts.filter((payout) => {
    // Search term filter
    const matchesSearch =
      searchTerm === '' ||
      payout.dateRange.from.includes(searchTerm) ||
      payout.dateRange.to.includes(searchTerm) ||
      payout.status.toLowerCase().includes(searchTerm.toLowerCase());
    
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
  
  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus(null);
    setDateRange({ from: '', to: '' });
  };
  
  // Calculate total earnings
  const totalEarnings = mockPayouts.reduce((sum, payout) => {
    if (payout.status === 'paid' || payout.status === 'processing') {
      return sum + payout.finalAmount;
    }
    return sum;
  }, 0);
  
  // Calculate pending earnings
  const pendingEarnings = mockPayouts.reduce((sum, payout) => {
    if (payout.status === 'processing' || payout.status === 'pending') {
      return sum + payout.finalAmount;
    }
    return sum;
  }, 0);
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Payouts</h1>
          <p className="mt-2 text-sm text-gray-700">
            View your payment history, download receipts, and track pending payouts.
          </p>
        </div>
      </div>
      
      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Earnings (Year-to-date)
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {formatCurrency(totalEarnings)}
              </dd>
            </dl>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                Pending Payments
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {formatCurrency(pendingEarnings)}
              </dd>
            </dl>
          </div>
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
            placeholder="Search payments"
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
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Payment for {new Date(payout.dateRange.from).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })} - {new Date(payout.dateRange.to).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            payout.status
                          )}`}
                        >
                          {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                        </span>
                        
                        {payout.paymentDate && (
                          <span className="ml-2 text-sm text-gray-500">
                            Paid on {new Date(payout.paymentDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="text-xl font-bold text-gray-900 mr-8">
                        {formatCurrency(payout.finalAmount)}
                      </div>
                      
                      <div className="flex space-x-3">
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
                        
                        {payout.receiptId && (
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                          >
                            <LucideDownload className="-ml-0.5 mr-1 h-4 w-4" />
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Breakdown</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {payout.breakdown.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md">
                          <div className="text-sm font-medium text-gray-900">{item.description}</div>
                          <div className="text-sm text-gray-500">{formatCurrency(item.amount)}</div>
                        </div>
                      ))}
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
      
      {/* Receipt Modal */}
      {showReceiptModal && currentPayout && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="bg-white p-6">
                <div className="border-b border-gray-200 pb-4 mb-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Payment Receipt</h2>
                    <p className="text-sm text-gray-500">Receipt ID: {currentPayout.receiptId}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowReceiptModal(false);
                        setCurrentPayout(null);
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
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
                    Questions about this payout? Contact admin via chat.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => window.location.href = '/mentor/chat'}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none"
                    >
                      <LucideExternalLink className="mr-2 h-4 w-4" />
                      Chat with Admin
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
      )}
    </div>
  );
};

export default MentorPayouts;