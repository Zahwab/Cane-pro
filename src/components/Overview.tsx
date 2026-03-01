import React, { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, YAxis } from 'recharts';
import { useDashboard } from '../context/DashboardContext';
import './Overview.css';

const generateMockData = () => Array.from({ length: 40 }, (_, i) => ({
    time: i,
    pol: 14.5 + Math.random() * 0.4 - 0.2,
    brix: 18.2 + Math.random() * 0.5,
}));

export const Overview: React.FC = () => {
    const { overallQualityScore, economicImpact, activeAlerts, trucksProcessed } = useDashboard();
    const [chartData, setChartData] = useState(generateMockData());

    useEffect(() => {
        const interval = setInterval(() => {
            setChartData(prev => {
                const newData = [...prev.slice(1), {
                    time: prev[prev.length - 1].time + 1,
                    pol: 14.5 + Math.random() * 0.4 - 0.2,
                    brix: 18.2 + Math.random() * 0.5,
                }];
                return newData;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const latestPol = chartData[chartData.length - 1].pol.toFixed(2);
    const latestBrix = chartData[chartData.length - 1].brix.toFixed(2);
    const targetPol = 14.6;
    const isSubOptimal = Number(latestPol) < targetPol;

    return (
        <div className="overview-container stagger-animate">
            <div className="header-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2>Live Assessment Overview</h2>
                    <p className="text-muted">Real-time factory performance and yield impact.</p>
                </div>

                <div className="economic-ticker glass-panel" style={{ minWidth: '300px' }}>
                    <div className="ticker-label">Cumulative Yield Valuation Impact</div>
                    <div className="ticker-value text-success">
                        <TrendingUp size={24} />
                        ${economicImpact.toLocaleString()}
                    </div>
                    {activeAlerts.length > 0 ? (
                        <div className="ticker-alert flex-center gap-2" style={{ color: 'var(--warning)', marginTop: '8px', fontSize: '14px' }}>
                            <AlertTriangle size={14} /> {activeAlerts.length} Active System Alerts
                        </div>
                    ) : (
                        <div className="ticker-alert flex-center gap-2" style={{ color: 'var(--success)', marginTop: '8px', fontSize: '14px' }}>
                            <CheckCircle size={14} /> Optimal Processing
                        </div>
                    )}
                </div>
            </div>

            <div className="metrics-grid" style={{ marginTop: '24px' }}>
                <div className="glass-panel metric-card">
                    <div className="metric-label">Overall Quality Score</div>
                    <div className={`metric-value ${overallQualityScore > 90 ? 'text-success' : 'text-warning'}`}>
                        {overallQualityScore.toFixed(1)}/100
                    </div>
                    <div className="metric-footer text-muted flex-center gap-1">
                        AI Composite Index
                    </div>
                </div>
                <div className="glass-panel metric-card">
                    <div className="metric-label">Current Pol %</div>
                    <div className={`metric-value ${isSubOptimal ? 'text-warning' : 'text-gradient'}`}>{latestPol}%</div>
                    <div className={`${isSubOptimal ? 'text-warning' : 'text-success'} metric-footer flex-center gap-1`}>
                        {isSubOptimal ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                        {isSubOptimal ? 'Below target' : 'Optimal range'}
                    </div>
                </div>
                <div className="glass-panel metric-card">
                    <div className="metric-label">Current Brix %</div>
                    <div className="metric-value neon-text">{latestBrix}%</div>
                    <div className="metric-footer text-muted">Stable</div>
                </div>
                <div className="glass-panel metric-card">
                    <div className="metric-label">Processed Today</div>
                    <div className="metric-value">{trucksProcessed} Truckloads</div>
                    <div className="metric-footer text-muted flex-center gap-1">
                        Origin tracking active
                    </div>
                </div>
            </div>

            <div className="charts-section glass-panel" style={{ marginTop: '24px' }}>
                <div className="chart-header flex-between">
                    <h3>High-Precision Pol Trend (Real-time)</h3>
                    <span className="text-muted text-sm">Live Feed</span>
                </div>
                <div className="chart-wrapper" style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorPol" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary-glow)" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="var(--primary-glow)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <YAxis domain={['dataMin - 0.2', 'dataMax + 0.2']} hide />
                            <Tooltip
                                contentStyle={{ background: 'var(--bg-panel)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}
                                itemStyle={{ color: 'var(--primary-glow)' }}
                                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                            />
                            <Area type="monotone" dataKey="pol" stroke="var(--primary-glow)" strokeWidth={3} fillOpacity={1} fill="url(#colorPol)" isAnimationActive={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="active-alerts-section" style={{ marginTop: '24px' }}>
                <h3>System Anomalies & Alerts</h3>
                <div className="alerts-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                    {activeAlerts.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '16px', color: 'var(--text-muted)' }}>No active alerts.</div>
                    ) : (
                        activeAlerts.map(alert => (
                            <div key={alert.id} className="glass-panel flex-between" style={{ padding: '16px', borderLeft: `4px solid var(--${alert.type === 'critical' ? 'danger' : 'warning'})` }}>
                                <div className="flex-center gap-3">
                                    <AlertTriangle className={`text-${alert.type === 'critical' ? 'danger' : 'warning'}`} size={20} />
                                    <span>{alert.message}</span>
                                </div>
                                <span className="text-muted text-sm">{alert.timestamp}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
