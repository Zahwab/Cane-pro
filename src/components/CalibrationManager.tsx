import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';
import { CheckCircle2, History, AlertTriangle } from 'lucide-react';
import './CalibrationManager.css';

const generateDriftData = () => {
    return Array.from({ length: 24 }, (_, i) => ({
        hour: `-${24 - i}h`,
        confidence: 99 - (i * (Math.random() * 0.2 + 0.05)),
    }));
};

export const CalibrationManager: React.FC = () => {
    const [driftData, setDriftData] = useState(generateDriftData());
    const [labPol, setLabPol] = useState('');
    const [calibrated, setCalibrated] = useState(false);
    const [history, setHistory] = useState([
        { time: 'Yesterday, 14:30', pol: '14.52%' },
        { time: '3 Days Ago, 09:15', pol: '13.98%' }
    ]);

    useEffect(() => {
        if (!calibrated) {
            const interval = setInterval(() => {
                setDriftData(prev => {
                    const newData = [...prev];
                    const lastPoint = { ...newData[newData.length - 1] };
                    // Simulate drift downwards
                    lastPoint.confidence = Math.max(80, lastPoint.confidence - Math.random() * 0.1);
                    newData[newData.length - 1] = lastPoint;
                    return newData;
                });
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [calibrated]);

    const handleCalibrate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!labPol) return;
        setCalibrated(true);
        setDriftData(prev => [
            ...prev.slice(1),
            { hour: 'Now', confidence: 99.9 }
        ]);
        setHistory(prev => [{ time: 'Just now', pol: `${labPol}%` }, ...prev.slice(0, 1)]);

        setTimeout(() => {
            setCalibrated(false);
            setLabPol('');
        }, 3000);
    };

    const currentConfidence = driftData[driftData.length - 1].confidence;

    return (
        <div className="calib-container">
            <div className="header-actions">
                <h2>Predictive Calibration Management</h2>
                <p className="text-muted">AI tracks spectral drift and predicts exactly when manual Laboratory Verification is required.</p>
            </div>

            <div className="calib-grid">
                <div className="glass-panel drift-chart">
                    <h3>AI Confidence Drift Over Time</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={driftData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid stroke="var(--border-subtle)" strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="hour" stroke="var(--text-muted)" fontSize={12} />
                                <YAxis domain={[80, 100]} stroke="var(--text-muted)" fontSize={12} />
                                <Tooltip contentStyle={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)' }} />
                                <ReferenceLine y={90} stroke="var(--danger)" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Recalibration Threshold (90%)', fill: 'var(--danger)', fontSize: 12 }} />
                                <Line type="monotone" dataKey="confidence" stroke="var(--primary-glow)" strokeWidth={3} dot={false} isAnimationActive={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-panel calibration-form-panel">
                    <div className="status-box" style={{ background: currentConfidence > 90 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)' }}>
                        <div className="flex-between">
                            <span className="text-muted">Current Confidence</span>
                            <span className={currentConfidence > 90 ? 'text-success' : 'text-warning'}>
                                {currentConfidence > 90 ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                            </span>
                        </div>
                        <h3 className={currentConfidence > 90 ? 'text-success' : 'text-warning'} style={{ fontSize: '2.5rem', margin: '12px 0' }}>
                            {currentConfidence.toFixed(1)}%
                        </h3>
                        <p className="text-sm text-muted">
                            {currentConfidence > 90 ? 'System is optimally calibrated.' : 'Drift detected. Manual Lab Verification requested to reset AI baseline.'}
                        </p>
                    </div>

                    <form onSubmit={handleCalibrate} className="verification-form">
                        <h3>Manual Result Verification</h3>
                        <div className="input-group">
                            <label>Laboratory Pol % Reading</label>
                            <input
                                type="number"
                                step="0.01"
                                value={labPol}
                                onChange={e => setLabPol(e.target.value)}
                                placeholder="e.g. 14.65"
                                disabled={calibrated}
                            />
                        </div>
                        <button type="submit" disabled={!labPol || calibrated} className={`submit-btn ${calibrated ? 'success' : ''}`}>
                            {calibrated ? 'Calibration Synchronized' : 'Sync & Recalibrate AI'}
                        </button>
                    </form>

                    <div className="history-list">
                        <h4 className="flex-center gap-2"><History size={16} /> Recent Calibrations</h4>
                        {history.map((h, i) => (
                            <div key={i} className="history-item">
                                <span>{h.time}</span>
                                <span className="text-success">Verified: {h.pol}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
