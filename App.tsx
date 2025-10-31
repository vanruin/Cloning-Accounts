import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { StatusBar } from './components/StatusBar';
import { ControlPanel } from './components/ControlPanel';
import { ResultsPanel } from './components/ResultsPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { Footer } from './components/Footer';
import { LogEntry, LogType, CloningMethod } from './types';
import { APPROVED_KEYS } from './constants';

type Tab = 'control' | 'results' | 'settings';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('control');
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("🟢 Ready to start cloning session");

    // Stats
    const [oks, setOks] = useState<number>(0);
    const [cps, setCps] = useState<number>(0);
    const [loop, setLoop] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // Config
    const [cloningMethod, setCloningMethod] = useState<CloningMethod>('old_one');
    const [idCount, setIdCount] = useState<number>(1000);
    const [threadCount, setThreadCount] = useState<number>(25);

    const startTimeRef = useRef<number>(0);
    // FIX: Replaced `NodeJS.Timeout` with `ReturnType<typeof setInterval>` to fix namespace error.
    const simulationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const addLog = useCallback((message: string, type: LogType) => {
        const newLog: LogEntry = {
            id: crypto.randomUUID(),
            timestamp: new Date().toLocaleTimeString(),
            message,
            type,
        };
        setLogs(prevLogs => [...prevLogs, newLog]);
    }, []);
    
    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now();
            simulationIntervalRef.current = setInterval(() => {
                setLoop(prevLoop => {
                    const newLoop = prevLoop + 1;
                    if (newLoop >= idCount) {
                        setIsRunning(false);
                        setStatusMessage("✅ Cloning session completed!");
                        if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
                        return newLoop;
                    }

                    // Simulation logic
                    const rand = Math.random();
                    if (rand < 0.02) { // 2% chance for OK
                        setOks(prev => prev + 1);
                        const uid = `10000${Math.floor(100000000 + Math.random() * 900000000)}`;
                        const pw = ['123456', '12345678', 'password'][Math.floor(Math.random() * 3)];
                        addLog(`OK → ${uid} | ${pw}`, LogType.OK);
                    } else if (rand < 0.07) { // 5% chance for CP
                        setCps(prev => prev + 1);
                        const uid = `10000${Math.floor(100000000 + Math.random() * 900000000)}`;
                        const pw = ['123123', '112233'][Math.floor(Math.random() * 2)];
                        addLog(`CP → ${uid} | ${pw}`, LogType.CP);
                    }

                    const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
                    setSpeed(elapsedTime > 0 ? newLoop / elapsedTime : 0);
                    setProgress(idCount > 0 ? (newLoop / idCount) * 100 : 0);
                    
                    return newLoop;
                });
            }, 1000 / threadCount); // Simulate based on threads
        } else {
            if (simulationIntervalRef.current) {
                clearInterval(simulationIntervalRef.current);
            }
        }

        return () => {
            if (simulationIntervalRef.current) {
                clearInterval(simulationIntervalRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning, idCount, threadCount, addLog]);


    const handleVerifyKey = (key: string) => {
        if (APPROVED_KEYS.includes(key)) {
            setIsVerified(true);
            setStatusMessage("🎉 License verified! Ready to start cloning.");
            addLog("Premium License Activated", LogType.INFO);
            return true;
        } else {
            setIsVerified(false);
            setStatusMessage("❌ Invalid License Key");
            addLog("Invalid license key entered", LogType.ERROR);
            return false;
        }
    };
    
    const handleStart = () => {
        if (!isVerified) {
            addLog("Cannot start: License not verified.", LogType.ERROR);
            return;
        }
        setLogs([]);
        setOks(0);
        setCps(0);
        setLoop(0);
        setSpeed(0);
        setProgress(0);
        addLog(`Starting ${cloningMethod} with ${idCount} IDs, ${threadCount} threads...`, LogType.INFO);
        setStatusMessage("🚀 Cloning session started...");
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
        setStatusMessage("🛑 Cloning session stopped");
        addLog("Cloning session stopped by user.", LogType.INFO);
    };

    const handleClearResults = () => {
        setLogs([]);
        addLog("Results cleared.", LogType.INFO);
    };

    const TabButton: React.FC<{tabId: Tab; label: string}> = ({tabId, label}) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`px-6 py-2 text-sm font-bold rounded-t-lg transition-all duration-300 focus:outline-none ${
                activeTab === tabId 
                ? 'bg-primary text-black shadow-lg' 
                : 'bg-surface text-gray-300 hover:bg-gray-700'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-background text-gray-200 font-sans p-4 flex flex-col">
            <div className="bg-surface rounded-xl shadow-2xl border border-gray-800 flex flex-col flex-grow">
                <Header />
                <StatusBar oks={oks} cps={cps} total={loop} speed={speed} progress={progress} />

                <main className="flex-grow p-4 md:p-6 flex flex-col">
                    <div className="border-b border-gray-700">
                        <nav className="-mb-px flex space-x-2" aria-label="Tabs">
                            <TabButton tabId="control" label="🎮 Main Control" />
                            <TabButton tabId="results" label="📊 Results" />
                            <TabButton tabId="settings" label="⚙️ Settings" />
                        </nav>
                    </div>
                    <div className="flex-grow mt-4">
                        {activeTab === 'control' && (
                            <ControlPanel
                                isVerified={isVerified}
                                isRunning={isRunning}
                                onVerifyKey={handleVerifyKey}
                                onStart={handleStart}
                                onStop={handleStop}
                                cloningMethod={cloningMethod}
                                setCloningMethod={setCloningMethod}
                                idCount={idCount}
                                setIdCount={setIdCount}
                                threadCount={threadCount}
                                setThreadCount={setThreadCount}
                            />
                        )}
                        {activeTab === 'results' && <ResultsPanel logs={logs} onClear={handleClearResults} />}
                        {activeTab === 'settings' && <SettingsPanel />}
                    </div>
                </main>

                <Footer statusMessage={statusMessage} />
            </div>
        </div>
    );
};

export default App;