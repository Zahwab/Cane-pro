import React, { useState, useEffect } from 'react';
import { Truck, MapPin, DownloadCloud } from 'lucide-react';
import './SpatialTracking.css';

const INITIAL_TRUCKS = [
    { id: 'TRK-9021', farm: 'North Sector A', quality: 'Excellent', brix: 19.2, eta: 1 },
    { id: 'TRK-4432', farm: 'West Valley', quality: 'Warning', brix: 17.5, eta: 5 },
    { id: 'TRK-1100', farm: 'East Ridge', quality: 'Optimal', brix: 18.8, eta: 12 },
    { id: 'TRK-7654', farm: 'South Basin', quality: 'Poor', brix: 16.1, eta: 25 },
];

export const SpatialTracking: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [trucks, setTrucks] = useState(INITIAL_TRUCKS);

    useEffect(() => {
        // Truck ETA simulation
        const truckInterval = setInterval(() => {
            setTrucks(prev => prev.map(truck => {
                if (truck.eta <= 0) {
                    // Truck arrived, replace with a new one
                    return {
                        id: `TRK-${Math.floor(Math.random() * 9000) + 1000}`,
                        farm: ['North Sector B', 'East Ridge', 'South Basin', 'River Farm'][Math.floor(Math.random() * 4)],
                        quality: ['Excellent', 'Optimal', 'Warning', 'Poor'][Math.floor(Math.random() * 4)],
                        brix: Number((Math.random() * 4 + 16).toFixed(1)),
                        eta: Math.floor(Math.random() * 30) + 15
                    };
                }
                // Decrease ETA
                return { ...truck, eta: truck.eta - 1 };
            }).sort((a, b) => a.eta - b.eta));
        }, 3000); // every 3 seconds, simulate 1 minute passing for visual speed

        // Logs simulation
        const payloads = [
            `[SYS_PLC] Data packet sent: {"pol":14.62,"brix":18.4}`,
            `[AI_VISION] Trash ratio nominal (2.1%). No action req.`,
            `[SYS_PLC] Acknowledged. Imbibition water holding.`,
            `[SYS_PLC] Data packet sent: {"pol":14.41,"brix":18.1,"fiber":14.2}`,
            `[AI_VISION] Recommendation: Increase wash water by 2% due to high fiber.`,
            `[SYS_PLC] Acknowledged. Adjusting valve V-104.`
        ];
        let i = 0;
        const logInt = setInterval(() => {
            setLogs(prev => [payloads[i % payloads.length], ...prev].slice(0, 8));
            i++;
        }, 4000);

        return () => { clearInterval(truckInterval); clearInterval(logInt); };
    }, []);

    return (
        <div className="spatial-container">
            <div className="header-actions">
                <h2>Integration Flow & Spatial Origin</h2>
            </div>

            <div className="spatial-grid">
                <div className="glass-panel map-panel">
                    <h3><MapPin size={18} /> Live Queue Origins</h3>
                    <div className="truck-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Truck ID</th>
                                    <th>Origin Field</th>
                                    <th>Predicted Brix</th>
                                    <th>Status/ETA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trucks.map(truck => (
                                    <tr key={truck.id}>
                                        <td className="flex-center gap-2 justify-start"><Truck size={16} /> {truck.id}</td>
                                        <td>{truck.farm}</td>
                                        <td className="neon-text">{truck.brix}%</td>
                                        <td>
                                            <span className={`status-pill ${truck.quality.toLowerCase()}`}>
                                                {truck.eta <= 0 ? 'Arriving' : `${truck.eta} min`}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="glass-panel terminal-panel">
                    <h3 className="flex-center gap-2"><DownloadCloud size={18} /> Live PLC Integration Log</h3>
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <span className="dot bg-danger"></span>
                            <span className="dot bg-warning"></span>
                            <span className="dot bg-success"></span>
                        </div>
                        <div className="terminal-body">
                            {logs.map((log, idx) => (
                                <div key={idx} className={`log-line ${log.includes('AI_VISION') ? 'text-primary' : ''}`}>
                                    <span className="timestamp">{new Date().toISOString().substring(11, 19)}</span>
                                    <span className="message">{log}</span>
                                </div>
                            ))}
                            <div className="log-line typing">
                                <span>awaiting data stream...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

