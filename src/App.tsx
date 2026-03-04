import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Overview } from './components/Overview';
import { UnifiedStream } from './components/UnifiedStream';
import { SensorTwin } from './components/SensorTwin';
import { CalibrationManager } from './components/CalibrationManager';
import { SpatialTracking } from './components/SpatialTracking';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on tab change (useful for mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'unified': return <UnifiedStream />;
      case 'diagnostics': return <SensorTwin />;
      case 'calibration': return <CalibrationManager />;
      case 'spatial': return <SpatialTracking />;
      default: return <Overview />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="main-wrapper">
        <TopNav toggleSidebar={toggleSidebar} />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
