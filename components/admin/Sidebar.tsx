'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Home,
  UserCheck,
  Zap,
  Receipt,
  CreditCard,
  Bell,
  FileText,
  Settings,
  ChevronLeft,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  path: string;
  badge?: number;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/admin' },
  { id: 'users', label: 'Utilisateurs', icon: Users, path: '/admin/users' },
  { id: 'houses', label: 'Maisons', icon: Home, path: '/admin/houses' },
  { id: 'residents', label: 'Résidents', icon: UserCheck, path: '/admin/residents' },
  { id: 'consumptions', label: 'Consommations', icon: Zap, path: '/admin/consumptions' },
  { id: 'billing', label: 'Factures', icon: Receipt, path: '/admin/billing' },
  { id: 'subscriptions', label: 'Abonnements', icon: CreditCard, path: '/admin/subscriptions' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/admin/notifications' },
  { id: 'logs', label: 'Logs', icon: FileText, path: '/admin/logs' },
  { id: 'settings', label: 'Paramètres', icon: Settings, path: '/admin/settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin' || pathname === '/admin/';
    }
    return pathname?.startsWith(path);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white z-50
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-20' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FFA800] rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-gray-900" />
              </div>
              <span className="font-bold text-lg">Ecopower</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-[#FFA800] rounded-lg flex items-center justify-center mx-auto">
              <Zap size={18} className="text-gray-900" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft
              size={18}
              className={`transition-transform ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${active
                      ? 'bg-[#FFA800] text-gray-900 font-semibold'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon size={20} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        {!collapsed && user && (
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#FFA800] rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold">
                  {user.prenom.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {user.prenom} {user.nom}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>Déconnexion</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}


