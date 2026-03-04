import React from 'react';
import { Bell, User, Search, Menu } from 'lucide-react';
import './TopNav.css';

interface TopNavProps {
    toggleSidebar?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ toggleSidebar }) => {
    return (
        <header className="top-nav glass-panel">
            <div className="nav-left">
                {toggleSidebar && (
                    <button className="menu-btn icon-btn" onClick={toggleSidebar}>
                        <Menu size={24} />
                    </button>
                )}
                <div className="search-bar">
                    <Search size={18} className="text-muted" />
                    <input type="text" placeholder="Search parameters or logs..." />
                </div>
            </div>
            <div className="nav-actions">
                <button className="icon-btn">
                    <div className="notification-dot"></div>
                    <Bell size={20} />
                </button>
                <div className="user-profile">
                    <div className="avatar">
                        <User size={18} />
                    </div>
                    <div className="user-info">
                        <span className="name">Mill Supervisor</span>
                        <span className="role">Shift A</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
