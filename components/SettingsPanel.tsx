
import React from 'react';

const SettingsCheckbox: React.FC<{ label: string; defaultChecked?: boolean }> = ({ label, defaultChecked = false }) => (
    <label className="flex items-center space-x-3 cursor-pointer">
        <input
            type="checkbox"
            defaultChecked={defaultChecked}
            className="h-4 w-4 text-primary bg-gray-700 border-gray-600 focus:ring-primary rounded"
        />
        <span className="text-gray-300">{label}</span>
    </label>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-background rounded-lg p-6 border border-gray-800 shadow-lg">
        <h3 className="text-lg font-bold text-secondary mb-4 border-b border-gray-700 pb-2">{title}</h3>
        <div className="space-y-3">{children}</div>
    </div>
);

export const SettingsPanel: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto space-y-6 w-full animate-[fadeIn_0.5s_ease-in-out]">
            <Section title="🔌 Proxy Settings">
                <SettingsCheckbox label="Enable Proxy Rotation" />
                <div className="pl-7">
                    <label htmlFor="proxy-list" className="text-sm text-gray-400">Proxy List URL:</label>
                    <input id="proxy-list" type="text" className="mt-1 w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary" placeholder="http://..."/>
                </div>
            </Section>
            <Section title="🔧 Advanced Options">
                <SettingsCheckbox label="Enable Delay Between Requests" />
                <SettingsCheckbox label="Auto-save Results Every 5 Minutes" defaultChecked />
                <SettingsCheckbox label="Show Detailed Debug Info" />
            </Section>
        </div>
    );
};
