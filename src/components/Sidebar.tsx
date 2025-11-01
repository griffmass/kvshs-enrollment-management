import { LayoutDashboard, UserPlus, BookOpen, GraduationCap, User } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ currentPage, onNavigate, onLogout }: SidebarProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'regular-student', label: 'Regular Students', icon: GraduationCap },
    { id: 'als-student', label: 'ALS Students', icon: BookOpen },
    { id: 'als-new-enrollees', label: 'ALS New Enrollees', icon: UserPlus },
    { id: 'new-student', label: 'New Enrollees', icon: UserPlus },
    { id: 'app-users', label: 'AppUsers', icon: User },
  ];


  return (
    <aside className="w-64 h-[90vh] fixed left-0 top-0 flex flex-col rounded-2xl bg-white shadow-lg ml-4 mt-10 mb-10">
      <div className="flex items-center justify-center gap-2 p-6">
        <img src="/src/assets/Logo.png" alt="KVSHS Logo" className="h-10 w-10" />
        <span className="text-lg font-bold text-gray-700">KVSHS Admin</span>
      </div>

      <hr className="mx-6 border-t-2 border-gray-100" />

      <nav className="flex-1 space-y-2 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-link w-full flex items-center rounded-xl px-4 py-2.5 text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600 ${
                isActive ? 'bg-blue-500/80 text-white' : ''
              }`}
            >
              <Icon size={24} />
              <span className="ml-3 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-4">
        <button
          onClick={handleLogoutClick}
          className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
        >
          Log out
        </button>
      </div>

      <div className="p-3 text-xs text-slate-400 text-center">
        <p>@2025, developed by SIRIUS</p>
        <p>for a better desktop.</p>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex space-x-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
