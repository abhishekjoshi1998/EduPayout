import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LucideSend, 
  LucidePaperclip, 
  LucideMoreVertical,
  LucideClock
} from 'lucide-react';
import { Message } from '../types';

interface ChatPageProps {
  role: 'admin' | 'mentor';
}

// Mock data for messages
const initialMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Admin User',
    senderRole: 'admin',
    senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'Hello! I wanted to follow up on your payout for April 15-30. Did you receive the receipt?',
    timestamp: '2025-05-15T10:30:00',
    isRead: true,
  },
  {
    id: '2',
    senderId: '2',
    senderName: 'Jane Smith',
    senderRole: 'mentor',
    senderAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: 'Hi! Yes, I received it, but I had a question about the platform fee calculation. It seems higher than usual.',
    timestamp: '2025-05-15T10:32:00',
    isRead: true,
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Admin User',
    senderRole: 'admin',
    senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'You\'re right. There was a temporary increase in the platform fee due to payment gateway changes. It will go back to normal from the next cycle.',
    timestamp: '2025-05-15T10:35:00',
    isRead: true,
  },
  {
    id: '4',
    senderId: '2',
    senderName: 'Jane Smith',
    senderRole: 'mentor',
    senderAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: 'Thanks for clarifying. Also, I noticed that one of my evaluation sessions from April 28 is missing from the breakdown.',
    timestamp: '2025-05-15T10:37:00',
    isRead: true,
  },
  {
    id: '5',
    senderId: '1',
    senderName: 'Admin User',
    senderRole: 'admin',
    senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'Let me check that for you. Can you provide the student name and time slot?',
    timestamp: '2025-05-15T10:40:00',
    isRead: true,
  },
];

const ChatPage: React.FC<ChatPageProps> = ({ role }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { mentorId } = useParams<{ mentorId?: string }>();
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message: Message = {
      id: `${Date.now()}`,
      senderId: user?.id || '',
      senderName: user?.name || '',
      senderRole: role,
      senderAvatar: user?.avatar,
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  // Format timestamp to readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Check if date changed between messages
  const dateChanged = (current: string, previous: string | undefined) => {
    if (!previous) return true;
    
    const currentDate = new Date(current).toLocaleDateString();
    const previousDate = new Date(previous).toLocaleDateString();
    
    return currentDate !== previousDate;
  };
  
  // Format date for date headers
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    }
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 h-[calc(100vh-7rem)] flex flex-col">
      <div className="bg-white shadow rounded-t-lg flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {role === 'admin' ? (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium">
                  {messages[0]?.senderName.charAt(0)}
                </span>
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium">A</span>
              </div>
            )}
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-medium text-gray-900">
              {role === 'admin' ? messages[0]?.senderName : 'Admin Support'}
            </h2>
            <span className="text-sm text-green-500 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              Online
            </span>
          </div>
        </div>
        <button
          type="button"
          className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <LucideMoreVertical className="h-6 w-6" />
        </button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const showDate = dateChanged(
              message.timestamp,
              index > 0 ? messages[index - 1].timestamp : undefined
            );
            
            return (
              <React.Fragment key={message.id}>
                {showDate && (
                  <div className="flex justify-center my-4">
                    <div className="bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                      {formatDate(message.timestamp)}
                    </div>
                  </div>
                )}
                
                <div
                  className={`flex ${
                    message.senderRole === role ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex max-w-xs lg:max-w-md ${
                      message.senderRole === role ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {message.senderRole !== role && (
                      <div className="flex-shrink-0 mr-3">
                        {message.senderAvatar ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={message.senderAvatar}
                            alt={message.senderName}
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-medium text-xs">
                              {message.senderName.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div
                      className={`px-4 py-3 rounded-lg ${
                        message.senderRole === role
                          ? 'bg-teal-500 text-white mr-3'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={`text-xs mt-1 flex items-center ${
                          message.senderRole === role ? 'text-teal-100 justify-end' : 'text-gray-500'
                        }`}
                      >
                        <LucideClock className="h-3 w-3 mr-1" />
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input */}
      <div className="bg-white rounded-b-lg shadow-lg p-4 border-t border-gray-200">
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <LucidePaperclip className="h-5 w-5" />
          </button>
          <div className="flex-1 mx-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ''}
            className={`p-2 rounded-full ${
              newMessage.trim() === ''
                ? 'text-gray-400 bg-gray-100'
                : 'text-white bg-teal-500 hover:bg-teal-600'
            } focus:outline-none`}
          >
            <LucideSend className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;