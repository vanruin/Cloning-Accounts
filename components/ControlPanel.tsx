
import React, { useState } from 'react';
import type { CloningMethod } from '../types';

interface ControlPanelProps {
    isVerified: boolean;
    isRunning: boolean;
    onVerifyKey: (key: string) => boolean;
    onStart: () => void;
    onStop: () => void;
    cloningMethod: CloningMethod;
    setCloningMethod: (method: CloningMethod) => void;
    idCount: number;
    setIdCount: (count: number) => void;
    threadCount: number;
    setThreadCount: (count: number) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-background rounded-lg p-6 border border-gray-800 shadow-lg">
        <h3 className="text-lg font-bold text-secondary mb-4 border-b border-gray-700 pb-2">{title}</h3>
        {children}
    </div>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({
    isVerified,
    isRunning,
    onVerifyKey,
    onStart,
    onStop,
    cloningMethod,
    setCloningMethod,
    idCount,
    setIdCount,
    threadCount,
    setThreadCount,
}) => {
    const [key, setKey] = useState('');
    const [verificationStatus, setVerificationStatus] = useState<'unverified' | 'success' | 'error'>('unverified');

    const handleVerifyClick = () => {
        const success = onVerifyKey(key);
        setVerificationStatus(success ? 'success' : 'error');
    };

    const getVerificationMessage = () => {
        if (verificationStatus === 'success') {
            return <p className="text-sm text-ok font-bold mt-2">✅ Premium License Activated</p>;
        }
        if (verificationStatus === 'error') {
            return <p className="text-sm text-error font-bold mt-2">❌ Invalid License Key</p>;
        }
        return <p className="text-sm text-gray-400 mt-2">License not verified.</p>;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-[fadeIn_0.5s_ease-in-out]">
            <div className="flex flex-col gap-6">
                <Section title="🔑 License Verification">
                    <label htmlFor="license-key" className="block text-sm font-medium text-gray-300 mb-2">Enter Premium License Key:</label>
                    <div className="flex gap-2">
                        <input
                            id="license-key"
                            type="text"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="flex-grow bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                            placeholder="KING-JOVAN-..."
                            disabled={isVerified}
                        />
                        <button
                            onClick={handleVerifyClick}
                            disabled={isVerified}
                            className="bg-primary text-black font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            Verify
                        </button>
                    </div>
                    {getVerificationMessage()}
                </Section>
                <Section title="🛠️ Cloning Method">
                    <div className="space-y-3">
                        {(['old_one', 'old_tow', 'old_tree'] as CloningMethod[]).map((method) => (
                            <label key={method} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="cloningMethod"
                                    value={method}
                                    checked={cloningMethod === method}
                                    onChange={() => setCloningMethod(method)}
                                    className="h-4 w-4 text-primary bg-gray-700 border-gray-600 focus:ring-primary"
                                    disabled={isRunning}
                                />
                                <span className="text-gray-300">{method.replace('_', ' ').replace('one', '(2010-2014)').replace('tow', '2010-2014 w/ Prefix').replace('tree', '2009-2010 Vintage')}</span>
                            </label>
                        ))}
                    </div>
                </Section>
            </div>
            <div className="flex flex-col gap-6">
                 <Section title="⚙️ Parameters">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="id-count" className="block text-sm font-medium text-gray-300">Number of IDs</label>
                            <input
                                id="id-count"
                                type="number"
                                step="100"
                                min="100"
                                max="10000"
                                value={idCount}
                                onChange={(e) => setIdCount(Number(e.target.value))}
                                className="mt-1 w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                                disabled={isRunning}
                            />
                        </div>
                        <div>
                            <label htmlFor="thread-count" className="block text-sm font-medium text-gray-300">Threads</label>
                            <select
                                id="thread-count"
                                value={threadCount}
                                onChange={(e) => setThreadCount(Number(e.target.value))}
                                className="mt-1 w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                                disabled={isRunning}
                            >
                                {[5, 10, 15, 20, 25, 30, 50].map(val => <option key={val} value={val}>{val}</option>)}
                            </select>
                        </div>
                    </div>
                </Section>
                <div className="bg-background rounded-lg p-6 border border-gray-800 shadow-lg flex flex-col items-center gap-4">
                     <button
                        onClick={onStart}
                        disabled={!isVerified || isRunning}
                        className="w-full bg-green-500 text-black font-bold py-3 px-6 rounded-md text-lg hover:bg-green-400 transition transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        🚀 START CLONING
                    </button>
                    <button
                        onClick={onStop}
                        disabled={!isRunning}
                        className="w-full bg-accent text-white font-bold py-3 px-6 rounded-md hover:bg-red-500 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        🛑 STOP
                    </button>
                </div>
            </div>
        </div>
    );
};
