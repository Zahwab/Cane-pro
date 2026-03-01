import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, AlertCircle, Droplets } from 'lucide-react';
import { generateSensorData } from '../utils/dataGenerators';
import './SensorTwin.css';

export const SensorTwin: React.FC = () => {
    const [diagnostics, setDiagnostics] = useState({
        lensDust: 12,
        vibration: 2.4,
        temp: 45,
        humidity: 62
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setDiagnostics(prev => ({
                lensDust: Math.min(100, generateSensorData(prev.lensDust + 0.1, 2)),
                vibration: generateSensorData(2.4, 0.8),
                temp: generateSensorData(45, 4),
                humidity: generateSensorData(62, 5)
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="twin-container">
            <div className="header-actions">
                <h2>Sensor Digital Twin Diagnostics <span className="badge">Category Killer</span></h2>
                <p className="text-muted">Interactive 2D mapping of the physical sensor rig for granular maintenance insights.</p>
            </div>

            <div className="twin-grid">
                <div className="glass-panel rig-visualizer">
                    <div className="conveyor-belt">
                        <div className="cane-flow"></div>
                    </div>

                    <div className="sensor-rig">
                        <div className="main-housing">
                            <div className="cooling-jacket" style={{
                                borderColor: diagnostics.temp > 48 ? 'var(--warning)' : 'var(--success)'
                            }}>
                                <Thermometer size={16} />
                            </div>
                            <div className="core-processor">
                                <Activity size={24} className={diagnostics.vibration > 2.8 ? 'text-warning' : 'text-success'} style={{ animation: `pulseGlow ${3 - diagnostics.vibration}s infinite` }} />
                            </div>
                            <div className="lens-array">
                                <div className="lens" style={{ opacity: 1 - (diagnostics.lensDust / 100) }}></div>
                                <div className="dust-overlay flex-center" style={{ opacity: diagnostics.lensDust / 100 * 2 }}>
                                    <AlertCircle size={14} className="text-warning" />
                                </div>
                            </div>
                        </div>
                        <div className="connection-cables"></div>
                    </div>
                </div>

                <div className="diagnostics-panel flex-col gap-4">
                    <div className="glass-panel diag-card">
                        <div className="diag-header">
                            <Thermometer className="text-muted" size={20} />
                            <span>Enclosure Temp</span>
                        </div>
                        <div className={`diag-value ${diagnostics.temp > 48 ? 'text-warning' : ''}`}>
                            {diagnostics.temp.toFixed(1)}°C
                        </div>
                        <div className="progress-bar">
                            <div className="fill" style={{ width: `${(diagnostics.temp / 80) * 100}%`, background: diagnostics.temp > 48 ? 'var(--warning)' : 'var(--primary-glow)' }}></div>
                        </div>
                    </div>

                    <div className="glass-panel diag-card">
                        <div className="diag-header">
                            <AlertCircle className="text-muted" size={20} />
                            <span>Lens Obscuration (Dust)</span>
                        </div>
                        <div className={`diag-value ${diagnostics.lensDust > 30 ? 'text-warning' : ''}`}>
                            {diagnostics.lensDust.toFixed(1)}%
                        </div>
                        <div className="progress-bar">
                            <div className="fill" style={{ width: `${diagnostics.lensDust}%`, background: diagnostics.lensDust > 30 ? 'var(--warning)' : 'var(--primary-glow)' }}></div>
                        </div>
                    </div>

                    <div className="glass-panel diag-card">
                        <div className="diag-header">
                            <Activity className="text-muted" size={20} />
                            <span>Mount Vibration</span>
                        </div>
                        <div className={`diag-value ${diagnostics.vibration > 2.8 ? 'text-warning' : ''}`}>
                            {diagnostics.vibration.toFixed(2)} Gs
                        </div>
                        <div className="progress-bar">
                            <div className="fill" style={{ width: `${(diagnostics.vibration / 5) * 100}%`, background: diagnostics.vibration > 2.8 ? 'var(--warning)' : 'var(--primary-glow)' }}></div>
                        </div>
                    </div>

                    <div className="glass-panel diag-card">
                        <div className="diag-header">
                            <Droplets className="text-muted" size={20} />
                            <span>Internal Humidity</span>
                        </div>
                        <div className="diag-value">
                            {diagnostics.humidity.toFixed(1)}%
                        </div>
                        <div className="progress-bar">
                            <div className="fill" style={{ width: `${diagnostics.humidity}%`, background: 'var(--primary-glow)' }}></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
