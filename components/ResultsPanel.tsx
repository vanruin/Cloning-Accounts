import React, { useEffect, useRef } from 'react';
// FIX: Changed import for LogType to a value import since it's an enum used at runtime.
import { type LogEntry, LogType } from '../types';

interface ResultsPanelProps {
    logs: LogEntry[];
    onClear: () => void;
}

const LOG_TYPE_CLASSES: Record<LogType, string> = {
    [LogType.OK]: 'text-ok',
    [LogType.CP]: 'text-cp',
    [LogType.INFO]: 'text-info',
    [LogType.ERROR]: 'text-error',
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ logs, onClear }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="flex flex-col h-full bg-background rounded-lg border border-gray-800 p-4 animate-[fadeIn_0.5s_ease-in-out]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-secondary">Live Results Feed</h3>
                <button 
                    onClick={onClear}
                    className="bg-gray-700 text-white font-bold py-1 px-3 rounded-md hover:bg-gray-600 transition text-sm"
                >
                    Clear Results
                </button>
            </div>
            <div ref={scrollRef} className="flex-grow bg-black p-3 rounded-md overflow-y-auto font-mono text-sm leading-6">
                {logs.map(log => (
                    <div key={log.id} className="flex">
                        <span className="text-gray-500 mr-3">{log.timestamp}</span>
                        <p className={`${LOG_TYPE_CLASSES[log.type]} whitespace-pre-wrap break-all`}>
                            {log.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};