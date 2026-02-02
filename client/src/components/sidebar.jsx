// src/components/Sidebar.jsx   (or wherever your sidebar lives)
// Adjust import paths based on your project structure

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';   // assuming you're using react-router
import {
  LayoutDashboard,
  Ticket,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  // Add more icons as needed from lucide-react or heroicons/react
} from 'lucide-react';   // ← install if needed: npm install lucide-react

// Optional: if you use @heroicons/react/24/outline instead
// import { HomeIcon, TicketIcon, ... } from '@heroicons/react/24/outline';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/tickets', label: 'Tickets', icon: Ticket },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/help', label: 'Help', icon: HelpCircle },
  // Add your actual routes here
];

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  // You can later add persisted collapsed state with localStorage if wanted
  // For now: always collapsed until hover

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30
        flex flex-col
        bg-white/10 dark:bg-black/20
        backdrop-blur-xl backdrop-saturate-150
        border-r border-white/10 dark:border-white/5
        shadow-2xl shadow-black/10 dark:shadow-black/30
        rounded-r-3xl overflow-hidden
        transition-all duration-400 ease-out
        ${isHovered ? 'w-64' : 'w-16'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo / Brand area */}
      <div className="flex items-center justify-center h-16 border-b border-white/10 dark:border-white/5">
        <div className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 w-0'}`}>
          <span className="text-xl font-bold text-white tracking-tight">iT Hub</span>
        </div>
        <HelpCircle className={`text-blue-400 transition-all ${isHovered ? 'ml-3' : 'mx-auto'}`} size={28} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-x-3 px-3 py-3 rounded-xl text-gray-200 hover:text-white transition-colors
                ${isActive
                  ? 'bg-white/15 text-white shadow-inner'
                  : 'hover:bg-white/10'
                }`
              }
            >
              <Icon size={24} className="min-w-[24px]" strokeWidth={isHovered ? 2 : 2.2} />

              {/* Label - hidden when not hovered */}
              <span
                className={`
                  whitespace-nowrap transition-all duration-300 font-medium
                  ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 pointer-events-none'}
                `}
              >
                {item.label}
              </span>

              {/* Optional tooltip when collapsed */}
              {!isHovered && (
                <div className="
                  absolute left-full ml-3 px-4 py-2 bg-gray-900/90 text-white text-sm rounded-lg
                  opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity
                  whitespace-nowrap shadow-lg border border-gray-700/50
                ">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section - Logout example */}
      <div className="p-4 border-t border-white/10 dark:border-white/5">
        <button
          className="group relative flex items-center gap-x-3 px-3 py-3 rounded-xl text-gray-200 hover:text-red-300 hover:bg-white/10 w-full transition-colors"
        >
          <LogOut size={24} className="min-w-[24px]" />

          <span
            className={`
              whitespace-nowrap transition-all duration-300 font-medium
              ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 pointer-events-none'}
            `}
          >
            Logout
          </span>

          {!isHovered && (
            <div className="
              absolute left-full ml-3 px-4 py-2 bg-gray-900/90 text-white text-sm rounded-lg
              opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity
              whitespace-nowrap shadow-lg border border-gray-700/50
            ">
              Logout
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;