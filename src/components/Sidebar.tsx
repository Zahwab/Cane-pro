import React from 'react';
import { Activity, Camera, Map, TrendingUp, Settings, HardHat } from 'lucide-react';
import { clsx } from 'clsx';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'unified', label: 'Unified Stream', icon: Camera },
    { id: 'diagnostics', label: 'Sensor Digital Twin', icon: HardHat },
    { id: 'calibration', label: 'Predictive Calibration', icon: TrendingUp },
    { id: 'spatial', label: 'Spatial Tracking', icon: Map },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-icon"></div>
        <h2 className="neon-text">Cane-pro AI</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={clsx('nav-item', isActive && 'active')}
            >
              <Icon size={20} className={isActive ? 'text-gradient' : 'text-muted'} />
              <span>{item.label}</span>
              {isActive && <div className="active-indicator" />}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="system-status flex-center gap-2">
          <div className="status-indicator"></div>
          <span className="text-muted text-sm">System Online</span>
        </div>
      </div>
    </aside>
  );
};
