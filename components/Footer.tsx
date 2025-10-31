
import React from 'react';

interface FooterProps {
    statusMessage: string;
}

export const Footer: React.FC<FooterProps> = ({ statusMessage }) => {
    const getStatusColor = () => {
        if (statusMessage.includes('✅') || statusMessage.includes('🎉')) return 'text-ok';
        if (statusMessage.includes('❌') || statusMessage.includes('🛑')) return 'text-error';
        if (statusMessage.includes('🚀')) return 'text-info';
        return 'text-green-400';
    };

    return (
        <footer className="px-6 py-3 border-t border-gray-800 mt-auto flex justify-between items-center text-xs">
            <p className={`font-mono transition-colors duration-300 ${getStatusColor()}`}>{statusMessage}</p>
            <p className="text-gray-500">
                v2.1.0 | KING INNOCENT © 2024
            </p>
        </footer>
    );
};
