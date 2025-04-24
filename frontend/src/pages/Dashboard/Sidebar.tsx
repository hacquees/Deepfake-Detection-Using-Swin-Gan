import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, Settings, Shield } from 'lucide-react';

const navItems = [
  {
    label: 'Overview',
    path: '/dashboard',
    icon: <LayoutDashboard size={20} />,
    exact: true
  },
  {
    label: 'History',
    path: '/dashboard/history',
    icon: <History size={20} />,
  },
  {
    label: 'Settings',
    path: '/dashboard/settings',
    icon: <Settings size={20} />,
  }
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="card sticky top-24">
        <div className="flex items-center mb-6">
          <Shield size={24} className="text-primary-600 mr-2" />
          <h3 className="text-lg font-semibold">Dashboard</h3>
        </div>
        
        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary-100 text-primary-800' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
          <h4 className="font-semibold text-primary-800 mb-2">Pro Plan</h4>
          <p className="text-sm text-gray-600 mb-3">
            Upgrade to Pro for unlimited detections and advanced features.
          </p>
          <button className="btn btn-primary w-full py-2">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;