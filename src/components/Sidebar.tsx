import React from 'react';
import { Activity, Camera, Map, TrendingUp, Settings, HardHat, X } from 'lucide-react';
import { clsx } from 'clsx';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'unified', label: 'Unified Stream', icon: Camera },
    { id: 'diagnostics', label: 'Sensor Digital Twin', icon: HardHat },
    { id: 'calibration', label: 'Predictive Calibration', icon: TrendingUp },
    { id: 'spatial', label: 'Spatial Tracking', icon: Map },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={clsx("sidebar glass-panel", isOpen && "open")}>
      <div className="sidebar-header">
        <div className="flex-center gap-3">
          <div className="logo-icon"></div>
          <h2 className="neon-text" style={{ margin: 0, border: 'none' }}>Cane-pro AI</h2>
        </div>
        {onClose && (
          <button className="close-btn mobile-only" onClick={onClose}>
            <X size={24} />
          </button>
        )}
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
