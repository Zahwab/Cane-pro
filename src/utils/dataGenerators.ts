export const generateRandomWalk = (current: number, min: number, max: number, volatility: number = 0.5) => {
    const change = (Math.random() - 0.5) * volatility;
    let newValue = current + change;
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;
    return Number(newValue.toFixed(2));
};

export const generateTrendData = (points: number, start: number, min: number, max: number, trend: number = 0) => {
    const data = [];
    let current = start;
    for (let i = 0; i < points; i++) {
        data.push({
            time: `${10 + i}:00`,
            value: current
        });
        current = generateRandomWalk(current + trend, min, max, 1.0);
    }
    return data;
};

export const generateCameraStats = () => {
    return {
        fps: Math.round(generateRandomWalk(24, 20, 30, 2)),
        trashDetected: Number(generateRandomWalk(2.5, 0.5, 5.0, 0.5).toFixed(1)),
        damageDetected: Number(generateRandomWalk(1.2, 0.1, 3.0, 0.3).toFixed(1)),
    };
};

export const generateSensorData = (baseline: number, variance: number) => {
    return generateRandomWalk(baseline, baseline - variance, baseline + variance, variance * 0.2);
};
