import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Overview } from './components/Overview';
import { UnifiedStream } from './components/UnifiedStream';
import { SensorTwin } from './components/SensorTwin';
import { CalibrationManager } from './components/CalibrationManager';
import { SpatialTracking } from './components/SpatialTracking';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

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

  return (
    <div className="dashboard-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <TopNav />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
