'use client';

import { Bell, Search, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA800] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {user?.prenom} {user?.nom}
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <Link
              href="/admin/profile"
              className="w-10 h-10 bg-[#FFA800] rounded-full flex items-center justify-center text-gray-900 font-bold hover:bg-[#E69500] transition-colors"
            >
              {user?.prenom.charAt(0).toUpperCase()}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


