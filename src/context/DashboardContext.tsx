import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateRandomWalk, generateTrendData } from '../utils/dataGenerators';

interface DashboardState {
    overallQualityScore: number;
    economicImpact: number;
    activeAlerts: Alert[];
    trucksProcessed: number;
    dailyTrends: { time: string; value: number }[];
}

interface Alert {
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    timestamp: string;
}

const initialState: DashboardState = {
    overallQualityScore: 92.4,
    economicImpact: 142500,
    activeAlerts: [
        { id: '1', type: 'critical', message: 'NIR Sensor #4 out of calibration (Shift > 2%)', timestamp: '2m ago' },
        { id: '2', type: 'warning', message: 'Camera Stream B experiencing high latency', timestamp: '15m ago' },
    ],
    trucksProcessed: 142,
    dailyTrends: generateTrendData(8, 90, 85, 98, 0.5)
};

const DashboardContext = createContext<DashboardState>(initialState);

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<DashboardState>(initialState);

    useEffect(() => {
        const interval = setInterval(() => {
            setState(prev => {
                const newScore = generateRandomWalk(prev.overallQualityScore, 88, 96, 0.2);

                // Occasionally generate new alerts
                let newAlerts = [...prev.activeAlerts];
                if (Math.random() > 0.95 && newAlerts.length < 5) {
                    newAlerts.unshift({
                        id: Math.random().toString(),
                        type: Math.random() > 0.8 ? 'critical' : 'warning',
                        message: `Simulated anomaly detected in processing line ${Math.floor(Math.random() * 3) + 1}`,
                        timestamp: 'just now'
                    });
                }
                // Remove old alerts
                if (newAlerts.length > 4) {
                    newAlerts.pop();
                }

                return {
                    ...prev,
                    overallQualityScore: newScore,
                    economicImpact: prev.economicImpact + Math.floor(Math.random() * 50),
                    trucksProcessed: Math.random() > 0.9 ? prev.trucksProcessed + 1 : prev.trucksProcessed,
                    activeAlerts: newAlerts,
                    // Update the last trend point slightly
                    dailyTrends: prev.dailyTrends.map((point, index) =>
                        index === prev.dailyTrends.length - 1
                            ? { ...point, value: generateRandomWalk(point.value, 85, 98, 0.5) }
                            : point
                    )
                };
            });
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <DashboardContext.Provider value={state}>
            {children}
        </DashboardContext.Provider>
    );
};
