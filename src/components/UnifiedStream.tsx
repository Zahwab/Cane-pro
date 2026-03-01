import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Maximize, Camera, Crosshair } from 'lucide-react';
import { generateCameraStats } from '../utils/dataGenerators';
import './UnifiedStream.css';

const generateAccuracyData = () => Array.from({ length: 15 }, (_, i) => {
    const base = 14.5 + Math.random() * 0.4;
    return {
        time: `10:${i.toString().padStart(2, '0')}`,
        aiPrediction: base,
        upperBound: base + 0.2,
        lowerBound: base - 0.2,
        labResult: Math.random() > 0.8 ? base + (Math.random() * 0.1 - 0.05) : null,
    };
});

export const UnifiedStream: React.FC = () => {
    const [chartData, setChartData] = useState(generateAccuracyData());
    const [boxes, setBoxes] = useState<any[]>([]);
    const [stats, setStats] = useState(generateCameraStats());

    useEffect(() => {
        const dataInterval = setInterval(() => {
            setChartData(prev => {
                const base = prev[prev.length - 1].aiPrediction + (Math.random() * 0.2 - 0.1);
                const newData = [...prev.slice(1), {
                    time: `10:${(prev.length + Math.floor(Math.random() * 10)).toString().padStart(2, '0')}`,
                    aiPrediction: base,
                    upperBound: base + 0.2,
                    lowerBound: base - 0.2,
                    labResult: Math.random() > 0.9 ? base + (Math.random() * 0.1 - 0.05) : null,
                }];
                return newData;
            });
        }, 3000);

        const visionInterval = setInterval(() => {
            const newBoxes = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
                id: Math.random(),
                x: Math.random() * 80 + 10,
                y: Math.random() * 80 + 10,
                width: Math.random() * 15 + 10,
                height: Math.random() * 10 + 5,
                type: Math.random() > 0.5 ? 'Trash' : 'Damaged',
                confidence: (Math.random() * 0.2 + 0.7).toFixed(2)
            }));
            setBoxes(newBoxes);
            setStats(generateCameraStats());
        }, 1500);

        return () => { clearInterval(dataInterval); clearInterval(visionInterval); };
    }, []);

    return (
        <div className="unified-container">
            <div className="header-actions">
                <h2>Unified Quality Stream <span className="badge">Category Killer</span></h2>
                <p className="text-muted">Fusing high-precision NIR chemical data perfectly with physical YOLOV10 computer vision.</p>
            </div>

            <div className="stream-grid">
                {/* Chemical Graph */}
                <div className="glass-panel chart-panel">
                    <div className="panel-header flex-between">
                        <h3 className="flex-center gap-2"><Crosshair size={18} /> High-Precision Pol Accuracy (±0.2)</h3>
                        <div className="legend">
                            <span className="legend-item"><div className="blob bg-primary"></div> AI Prediction</span>
                            <span className="legend-item"><div className="blob bg-success"></div> Lab Verified</span>
                            <span className="legend-item"><div className="blob bg-muted"></div> Error Band</span>
                        </div>
                    </div>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                <CartesianGrid stroke="var(--border-subtle)" strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}
                                />
                                <Area type="monotone" dataKey="upperBound" stroke="none" fill="var(--border-subtle)" fillOpacity={0.2} />
                                <Area type="monotone" dataKey="lowerBound" stroke="none" fill="var(--bg-dark)" fillOpacity={0.8} />
                                <Line type="monotone" dataKey="aiPrediction" stroke="var(--primary-accent)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: 'var(--primary-glow)' }} isAnimationActive={false} />
                                <Line type="monotone" dataKey="labResult" stroke="var(--success)" strokeWidth={0} dot={{ r: 5, fill: 'var(--success)', strokeWidth: 2, stroke: '#fff' }} isAnimationActive={false} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Physical Vision Feed */}
                <div className="glass-panel vision-panel">
                    <div className="panel-header flex-between">
                        <h3 className="flex-center gap-2"><Camera size={18} /> Live Conveyor Feed ({stats.fps} FPS)</h3>
                        <button className="icon-btn"><Maximize size={16} /></button>
                    </div>
                    <div className="feed-container">
                        <div className="feed-overlay">
                            <div className="scan-line"></div>
                            {boxes.map(box => (
                                <div
                                    key={box.id}
                                    className={`bounding-box ${box.type.toLowerCase()}`}
                                    style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.width}%`, height: `${box.height}%`, transition: 'all 0.3s ease-in-out' }}
                                >
                                    <span className="box-label">{box.type} ({box.confidence})</span>
                                </div>
                            ))}
                        </div>
                        <div className="feed-stats">
                            <div className="stat"><span>Trash Index:</span> <strong className={stats.trashDetected > 4 ? "text-danger" : "text-warning"}>{stats.trashDetected}%</strong></div>
                            <div className="stat"><span>Damage:</span> <strong className={stats.damageDetected > 2 ? "text-danger" : "text-warning"}>{stats.damageDetected}%</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
