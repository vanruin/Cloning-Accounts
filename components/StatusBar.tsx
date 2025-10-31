
import React from 'react';

interface StatusBarProps {
    oks: number;
    cps: number;
    total: number;
    speed: number;
    progress: number;
}

const StatCard: React.FC<{ label: string; value: string; color: string; emoji: string; }> = ({ label, value, color, emoji }) => (
    <div className="bg-background p-3 rounded-lg flex-1 text-center border border-gray-700 shadow-md">
        <p className="text-xs text-gray-400 font-bold">{emoji} {label}</p>
        <p className={`text-xl font-mono font-bold ${color}`}>{value}</p>
    </div>
);

export const StatusBar: React.FC<StatusBarProps> = ({ oks, cps, total, speed, progress }) => {
    return (
        <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex flex-wrap gap-4 justify-center">
                <StatCard label="OK" value={String(oks)} color="text-ok" emoji="✅"/>
                <StatCard label="CP" value={String(cps)} color="text-cp" emoji="🛡️"/>
                <StatCard label="TOTAL" value={String(total)} color="text-info" emoji="📊"/>
                <StatCard label="SPEED" value={`${speed.toFixed(1)}/sec`} color="text-purple-400" emoji="⚡"/>
                <StatCard label="PROGRESS" value={`${progress.toFixed(1)}%`} color="text-yellow-400" emoji="📈"/>
            </div>
        </div>
    );
};
