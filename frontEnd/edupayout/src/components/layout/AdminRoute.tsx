import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LucideLayoutDashboard, 
  LucideCalendar, 
  LucideDollarSign,
  LucideFileText, 
  LucideUsers,
  LucideSettings,
  LucideMenu,
  LucideX,
  LucideLogOut,
  LucideMessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const navigationItems = [
    { name: 'Dashboard', to: '/admin/dashboard', icon: LucideLayoutDashboard },
    { name: 'Sessions', to: '/admin/sessions', icon: LucideCalendar },
    { name: 'Payouts', to: '/admin/payouts', icon: LucideDollarSign },
    { name: 'Receipts', to: '/admin/receipts', icon: LucideFileText },
    { name: 'Mentors', to: '/admin/mentors', icon: LucideUsers },
    { name: 'Settings', to: '/admin/settings', icon: LucideSettings },
  ];
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-40 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            ></motion.div>
            
            <motion.div 
              className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <LucideX className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold text-gray-800">EdTech Payout</h1>
              </div>
              
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.to;
                    
                    return (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                          `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                            isActive
                              ? 'bg-teal-50 text-teal-600'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`
                        }
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className={`mr-4 h-6 w-6 ${isActive ? 'text-teal-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
                        {item.name}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
              
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      {user?.avatar ? (
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src={user.avatar}
                          alt={user?.name || ""}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium text-sm">
                            {user?.name?.charAt(0) || "A"}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        Administrator
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500"
                    >
                      <LucideLogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white border-b border-gray-200">
              <h1 className="text-lg font-bold text-gray-800">EdTech Payout</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto bg-white border-r border-gray-200">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  
                  return (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({ isActive }) =>
                        `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-teal-50 text-teal-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      <Icon className={`mr-3 h-5 w-5 ${
                        location.pathname === item.to ? 'text-teal-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`} />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
              
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      {user?.avatar ? (
                        <img
                          className="inline-block h-9 w-9 rounded-full"
                          src={user.avatar}
                          alt={user?.name || ""}
                        />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {user?.name?.charAt(0) || "A"}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        Administrator
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500"
                      title="Logout"
                    >
                      <LucideLogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 md:hidden">
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <LucideMenu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-between px-4">
            <div className="flex-1 flex items-center">
              <h1 className="text-lg font-bold text-gray-800">EdTech Payout</h1>
            </div>
          </div>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;