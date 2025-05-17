// User types
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'mentor';
    avatar?: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  }
  
  // Session types
  export interface Session {
    id: string;
    mentorId: string;
    mentorName: string;
    sessionType: 'live' | 'recorded' | 'evaluation';
    date: string;
    startTime: string;
    endTime: string;
    duration: number; // in minutes
    rate: number;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
  }
  
  // Payout types
  export interface PayoutBreakdown {
    amount: number;
    description: string;
  }
  
  export interface TaxInfo {
    type: string;
    rate: number;
    amount: number;
  }
  
  export interface Payout {
    id: string;
    mentorId: string;
    mentorName: string;
    dateRange: {
      from: string;
      to: string;
    };
    sessions: string[]; // Array of session IDs
    basePayout: number;
    breakdown: PayoutBreakdown[];
    taxes: TaxInfo[];
    platformFee: number;
    finalAmount: number;
    status: 'pending' | 'processing' | 'paid' | 'cancelled';
    paymentDate?: string;
    receiptId?: string;
  }
  
  // Receipt types
  export interface Receipt {
    id: string;
    payoutId: string;
    mentorId: string;
    mentorName: string;
    issueDate: string;
    dateRange: {
      from: string;
      to: string;
    };
    sessions: Session[];
    breakdown: PayoutBreakdown[];
    taxes: TaxInfo[];
    platformFee: number;
    finalAmount: number;
    status: 'issued' | 'viewed' | 'downloaded';
    message?: string;
  }
  
  // Mentor types
  export interface Mentor {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    joinedDate: string;
    specialization: string;
    hourlyRate: number;
    totalSessions: number;
    totalEarnings: number;
    status: 'active' | 'inactive';
  }
  
  // Chat types
  export interface Message {
    id: string;
    senderId: string;
    senderName: string;
    senderRole: 'admin' | 'mentor';
    senderAvatar?: string;
    content: string;
    timestamp: string;
    isRead: boolean;
  }
  
  export interface ChatThread {
    id: string;
    mentorId: string;
    mentorName: string;
    mentorAvatar?: string;
    adminId: string;
    adminName: string;
    adminAvatar?: string;
    lastMessage?: Message;
    unreadCount: number;
    updatedAt: string;
  }