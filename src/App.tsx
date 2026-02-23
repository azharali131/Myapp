import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, 
  Sun, 
  Calendar as CalendarIcon, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Clock,
  Info,
  Heart,
  Menu,
  X,
  Settings,
  Share2,
  MessageSquare,
  AlarmClock,
  BellRing,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { citiesData, RamadanDay } from './data';

export default function App() {
  const [currentCity, setCurrentCity] = useState<string>('wahi');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [azanEnabled, setAzanEnabled] = useState(true);
  const [selectedAzan, setSelectedAzan] = useState<number>(1);
  const [theme, setTheme] = useState({
    primary: '#1e4d2e',
    accent: '#d4af37',
    font: 'Inter'
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<'main' | 'settings' | 'azan' | 'alarm'>('main');
  const [isWidgetMode, setIsWidgetMode] = useState(false);
  const [widgetSize, setWidgetSize] = useState<'square' | 'wide'>('square');
  const [alarmTime, setAlarmTime] = useState<string>('04:00');
  const [beepSettings, setBeepSettings] = useState({
    oneHour: true,
    oneHourCount: 1,
    thirtyMin: true,
    thirtyMinCount: 2,
    lastTenSec: true
  });
  const [now, setNow] = useState(new Date());
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastBeepSecondRef = useRef<number | null>(null);

  // Audio Helpers
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSound = (freq: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  const playAlarmSound = () => {
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const startTime = ctx.currentTime;
      
      // A more complex "mobile-like" ringtone melody
      const melody = [
        { f: 440, d: 0.2 }, { f: 554, d: 0.2 }, { f: 659, d: 0.2 }, { f: 880, d: 0.4 },
        { f: 659, d: 0.2 }, { f: 880, d: 0.6 }
      ];

      let time = startTime;
      // Repeat the melody 4 times
      for (let r = 0; r < 4; r++) {
        melody.forEach(note => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note.f, time);
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.2, time + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, time + note.d);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(time);
          osc.stop(time + note.d);
          time += note.d + 0.05;
        });
        time += 0.5; // Pause between repeats
      }
    } catch (e) {
      console.error("Alarm error:", e);
    }
  };

  const playAzanSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    let audioPath = '';
    if (selectedAzan === 1) {
      audioPath = '/audio/azan1.mp3';
    } else if (selectedAzan === 2) {
      audioPath = '/audio/azan2.mp3';
    } else if (selectedAzan === 3) {
      audioPath = '/audio/Azan.mp3';
    } else if (selectedAzan === 4) {
      audioPath = 'https://www.islamcan.com/audio/azan/azan1.mp3';
    }

    if (audioPath) {
      if (selectedAzan === 4) {
        // Play beep before online azan
        playBeep(1);
        setTimeout(() => {
          const audio = new Audio(audioPath);
          audioRef.current = audio;
          audio.play().catch(e => console.error("Online Azan error:", e));
        }, 500);
        return;
      }

      const audio = new Audio(audioPath);
      audioRef.current = audio;
      audio.play().catch(e => {
        console.warn("Local Azan file not found, falling back to synthesized sound:", e);
        // Fallback to synthesized sound if file is missing
        playSynthesizedAzan();
      });
    }
  };

  const playSynthesizedAzan = () => {
    const notes = selectedAzan === 1 ? [440, 554, 659, 440] : 
                  selectedAzan === 2 ? [329.63, 392.00, 440.00, 329.63] : 
                  [523.25, 659.25, 783.99, 523.25];
    
    const interval = selectedAzan === 1 ? 2000 : selectedAzan === 2 ? 2500 : 1200;
    const duration = selectedAzan === 1 ? 1.5 : selectedAzan === 2 ? 2.0 : 1.0;

    notes.forEach((note, i) => {
      setTimeout(() => playSound(note, duration, 'sine'), i * interval);
    });
  };

  const playTripleBeep = () => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => playSound(1200, 0.1, 'sine'), i * 150);
    }
  };

  const playBeep = (count: number) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => playSound(1000, 0.15, 'sine'), i * 300);
    }
  };

  const toggleSound = () => {
    initAudio();
    setSoundEnabled(!soundEnabled);
  };

  // Time Helpers
  const parseTime = (timeStr: string, baseDate: Date, isPM: boolean) => {
    const [h, m] = timeStr.split(':').map(Number);
    const d = new Date(baseDate);
    let hours = h;
    if (isPM && hours < 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
    d.setHours(hours, m, 0, 0);
    return d;
  };

  const getRamadanStatus = () => {
    const start = new Date('2026-02-19T00:00:00');
    const end = new Date('2026-03-20T23:59:59');
    
    if (now < start) {
      const diff = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { status: 'before', daysLeft: diff };
    } else if (now > end) {
      return { status: 'after' };
    } else {
      const diffDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      const dayData = citiesData[currentCity].data.find(d => d.day === diffDays);
      return { status: 'during', day: diffDays, data: dayData };
    }
  };

  const status = getRamadanStatus();
  const todayData = status.status === 'during' && status.data ? status.data : citiesData[currentCity].data[0];

  const getCountdown = () => {
    if (status.status !== 'during' || !status.data) return { label: 'RAMADAN 2026', time: '00:00:00', message: 'Starts Feb 19' };

    const sehri = parseTime(status.data.hanafiS, now, false);
    const iftar = parseTime(status.data.hanafiI, now, true);

    const checkBeeps = (diff: number) => {
      if (!soundEnabled) return;
      
      // 1 Hour Beep (3600 seconds)
      if (beepSettings.oneHour && diff === 3600) {
        playBeep(beepSettings.oneHourCount);
      }
      // 30 Minutes Beep (1800 seconds)
      if (beepSettings.thirtyMin && diff === 1800) {
        playBeep(beepSettings.thirtyMinCount);
      }
      // Last 10 Seconds
      if (beepSettings.lastTenSec && diff <= 10 && diff > 0 && lastBeepSecondRef.current !== diff) {
        playTripleBeep();
        lastBeepSecondRef.current = diff;
      }
    };

    if (now < sehri) {
      const diff = Math.floor((sehri.getTime() - now.getTime()) / 1000);
      checkBeeps(diff);
      return { label: 'TO SEHRI', time: formatDiff(diff), message: `Sehri at ${status.data.hanafiS} AM`, phase: 'sehri' };
    } else if (now < iftar) {
      const diff = Math.floor((iftar.getTime() - now.getTime()) / 1000);
      checkBeeps(diff);
      return { label: 'TO IFTAR', time: formatDiff(diff), message: `Iftar at ${status.data.hanafiI} PM`, phase: 'fasting' };
    } else {
      return { label: 'IFTAR TIME', time: '00:00:00', message: 'Dua: Allahumma inni laka sumtu', phase: 'iftar' };
    }
  };

  const formatDiff = (diff: number) => {
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calculateRemainingSehriTime = () => {
    if (status.status !== 'during' || !status.data) return null;
    
    const [alarmH, alarmM] = alarmTime.split(':').map(Number);
    const wakeUpDate = new Date(now);
    wakeUpDate.setHours(alarmH, alarmM, 0, 0);
    
    const sehriEndDate = parseTime(status.data.hanafiS, now, false);
    
    const diffMs = sehriEndDate.getTime() - wakeUpDate.getTime();
    if (diffMs <= 0) return "Wake up after Sehri ends!";
    
    const diffSec = Math.floor(diffMs / 1000);
    const h = Math.floor(diffSec / 3600);
    const m = Math.floor((diffSec % 3600) / 60);
    
    return `${h}h ${m}m remaining for Sehri`;
  };

  const countdown = getCountdown();
  const remainingSehri = calculateRemainingSehriTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setNow(d);

      // Trigger Sehri Alarm
      const [alarmH, alarmM] = alarmTime.split(':').map(Number);
      if (d.getHours() === alarmH && d.getMinutes() === alarmM && d.getSeconds() === 0) {
        if (soundEnabled) {
          playAlarmSound();
        }
      }

      // Trigger Iftar Azan
      const currentStatus = getRamadanStatus();
      if (currentStatus.status === 'during' && currentStatus.data) {
        const iftar = parseTime(currentStatus.data.hanafiI, d, true);
        if (d.getHours() === iftar.getHours() && d.getMinutes() === iftar.getMinutes() && d.getSeconds() === 0) {
          if (soundEnabled && azanEnabled) {
            playAzanSound();
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [alarmTime, soundEnabled, azanEnabled, currentCity]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500"
      style={{ 
        backgroundColor: `${theme.primary}20`,
        fontFamily: theme.font === 'serif' ? 'serif' : theme.font === 'mono' ? 'monospace' : 'Inter, sans-serif'
      }}
    >
      <style>{`
        :root {
          --ramadan-green: ${theme.primary};
          --ramadan-gold: ${theme.accent};
        }
        .ramadan-card {
          border-color: ${theme.accent};
        }
        .bg-ramadan-green { background-color: ${theme.primary}; }
        .text-ramadan-gold { color: ${theme.accent}; }
        .border-ramadan-gold { border-color: ${theme.accent}; }
        .from-ramadan-green { --tw-gradient-from: ${theme.primary} !important; }
        .to-ramadan-green-light { --tw-gradient-to: ${theme.primary}dd !important; }
      `}</style>
      {/* Side Menu Overlay - Moved to top level and fixed */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-ramadan-green z-[101] shadow-2xl border-r-4 border-ramadan-gold flex flex-col"
            >
              <div className="p-6 border-b border-ramadan-gold/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {menuView !== 'main' && (
                    <button 
                      onClick={() => setMenuView('main')}
                      className="text-ramadan-gold p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X size={20} className="rotate-90" />
                    </button>
                  )}
                  <h2 className="text-ramadan-gold font-black text-lg tracking-tight uppercase">
                    {menuView === 'main' ? 'MENU' : menuView}
                  </h2>
                </div>
                <button 
                  onClick={() => { setIsMenuOpen(false); setMenuView('main'); }} 
                  className="text-ramadan-gold hover:rotate-90 transition-transform p-2"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {menuView === 'main' ? (
                  <>
                    {/* Sound Toggle */}
                    <button 
                      onClick={toggleSound}
                      className={cn(
                        "w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all shadow-md",
                        soundEnabled ? "bg-ramadan-gold text-ramadan-green" : "bg-white/5 text-ramadan-gold hover:bg-white/10"
                      )}
                    >
                      {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                      <span>{soundEnabled ? 'Sound Enabled' : 'Sound Muted'}</span>
                    </button>

                    {/* Iftari Azan Sub-menu Trigger */}
                    <button 
                      onClick={() => setMenuView('azan')}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl font-bold transition-all shadow-md bg-white/5 text-ramadan-gold hover:bg-white/10",
                        azanEnabled && "border-l-4 border-ramadan-gold"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <BellRing size={20} />
                        <span>Iftari Azan</span>
                      </div>
                      <span className="text-[10px] opacity-50">{azanEnabled ? 'ON' : 'OFF'}</span>
                    </button>

                    {/* Sehri Alarm Sub-menu Trigger */}
                    <button 
                      onClick={() => setMenuView('alarm')}
                      className="w-full flex items-center justify-between p-4 rounded-xl font-bold bg-white/5 text-ramadan-gold hover:bg-white/10 transition-all shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <AlarmClock size={20} />
                        <span>Sehri Alarm</span>
                      </div>
                      <span className="text-[10px] opacity-50">{alarmTime}</span>
                    </button>

                    {/* Widget Mode Toggle */}
                    <div className="space-y-2">
                      <button 
                        onClick={() => { setIsWidgetMode(!isWidgetMode); setIsMenuOpen(false); }}
                        className="w-full flex items-center gap-3 p-4 rounded-xl font-bold bg-white/5 text-ramadan-gold hover:bg-white/10 transition-all shadow-md"
                      >
                        {isWidgetMode ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
                        <span>{isWidgetMode ? 'Full View' : 'Widget Mode'}</span>
                      </button>
                      {isWidgetMode && (
                        <div className="flex gap-2 p-1 bg-black/20 rounded-lg">
                          <button 
                            onClick={() => setWidgetSize('square')}
                            className={cn("flex-1 py-1.5 rounded text-[10px] font-bold transition-all", widgetSize === 'square' ? "bg-ramadan-gold text-ramadan-green" : "text-ramadan-gold/50")}
                          >
                            Square
                          </button>
                          <button 
                            onClick={() => setWidgetSize('wide')}
                            className={cn("flex-1 py-1.5 rounded text-[10px] font-bold transition-all", widgetSize === 'wide' ? "bg-ramadan-gold text-ramadan-green" : "text-ramadan-gold/50")}
                          >
                            Wide
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 pb-1 px-2 text-[10px] font-bold text-ramadan-gold/50 uppercase tracking-widest">General</div>
                    
                    <button 
                      onClick={() => setMenuView('settings')}
                      className="w-full flex items-center gap-3 p-4 rounded-xl font-bold bg-white/5 text-ramadan-gold hover:bg-white/10 transition-all shadow-md"
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </button>

                    <MenuLink icon={<Share2 size={18} />} label="Share App" />
                    <MenuLink icon={<MessageSquare size={18} />} label="Feedback" />
                    <MenuLink icon={<Info size={18} />} label="About Ramadan" />
                  </>
                ) : menuView === 'azan' ? (
                  <div className="space-y-6">
                    <button 
                      onClick={() => { initAudio(); setAzanEnabled(!azanEnabled); }}
                      className={cn(
                        "w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all shadow-md",
                        azanEnabled ? "bg-ramadan-gold text-ramadan-green" : "bg-white/5 text-ramadan-gold hover:bg-white/10"
                      )}
                    >
                      <BellRing size={20} />
                      <span>{azanEnabled ? 'Iftar Azan: ON' : 'Iftar Azan: OFF'}</span>
                    </button>

                    {azanEnabled && (
                      <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-ramadan-gold/20">
                        <div className="text-ramadan-gold text-[10px] font-bold uppercase tracking-widest">Select Azan Style</div>
                        <div className="grid grid-cols-2 gap-2">
                          {[1, 2, 3, 4].map(num => (
                            <button
                              key={num}
                              onClick={() => {
                                if (audioRef.current) {
                                  audioRef.current.pause();
                                }
                                setSelectedAzan(num);
                              }}
                              className={cn(
                                "py-3 rounded-xl text-[11px] font-bold transition-all",
                                selectedAzan === num ? "bg-ramadan-gold text-ramadan-green" : "bg-white/10 text-ramadan-gold/50"
                              )}
                            >
                              {num === 4 ? 'Beep + Online' : `Azan ${num}`}
                            </button>
                          ))}
                        </div>
                        <button 
                          onClick={playAzanSound}
                          className="w-full py-3 px-4 rounded-xl bg-ramadan-gold/20 text-ramadan-gold text-xs font-bold uppercase tracking-widest hover:bg-ramadan-gold/30 transition-colors"
                        >
                          Test Selected Azan
                        </button>
                      </div>
                    )}

                    <button 
                      onClick={() => setMenuView('main')}
                      className="w-full py-3 rounded-xl bg-ramadan-gold text-ramadan-green font-bold shadow-lg"
                    >
                      Back to Menu
                    </button>
                  </div>
                ) : menuView === 'alarm' ? (
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-4 border border-ramadan-gold/20 space-y-4">
                      <div className="flex items-center gap-2 text-ramadan-gold font-black text-xs uppercase tracking-widest">
                        <AlarmClock size={16} />
                        Sehri Alarm Time
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-ramadan-cream text-[10px] font-bold uppercase opacity-50">Wake up at:</label>
                          <input 
                            type="time" 
                            value={alarmTime}
                            onChange={(e) => setAlarmTime(e.target.value)}
                            className="w-full bg-ramadan-green border-2 border-ramadan-gold text-ramadan-gold rounded-xl px-4 py-3 text-xl font-black focus:outline-none"
                          />
                        </div>
                        <button 
                          onClick={playAlarmSound}
                          className="w-full py-3 bg-ramadan-gold text-ramadan-green rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                        >
                          <Volume2 size={18} />
                          Test Alarm Sound
                        </button>
                      </div>
                    </div>

                    {remainingSehri && (
                      <div className="bg-ramadan-gold/10 rounded-2xl p-4 border border-ramadan-gold/30 text-center">
                        <div className="text-ramadan-gold text-[10px] font-bold uppercase mb-1">Time until alarm:</div>
                        <div className="text-ramadan-cream text-lg font-black">{remainingSehri}</div>
                      </div>
                    )}

                    <button 
                      onClick={() => setMenuView('main')}
                      className="w-full py-3 rounded-xl bg-ramadan-gold text-ramadan-green font-bold shadow-lg"
                    >
                      Back to Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-2xl p-4 border border-ramadan-gold/20 space-y-4">
                      <div className="text-ramadan-gold font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Settings size={14} />
                        Theme & Colors
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-ramadan-cream text-xs">Primary Color</span>
                          <input 
                            type="color" 
                            value={theme.primary}
                            onChange={(e) => setTheme(t => ({ ...t, primary: e.target.value }))}
                            className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-ramadan-cream text-xs">Accent Color</span>
                          <input 
                            type="color" 
                            value={theme.accent}
                            onChange={(e) => setTheme(t => ({ ...t, accent: e.target.value }))}
                            className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-ramadan-cream text-xs">Font Style</span>
                          <select 
                            value={theme.font}
                            onChange={(e) => setTheme(t => ({ ...t, font: e.target.value }))}
                            className="bg-ramadan-green border border-ramadan-gold text-ramadan-gold rounded px-2 py-1 text-[10px] font-bold outline-none"
                          >
                            <option value="Inter">Modern (Inter)</option>
                            <option value="serif">Classic (Serif)</option>
                            <option value="mono">Technical (Mono)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-4 border border-ramadan-gold/20 space-y-4">
                      <div className="text-ramadan-gold font-black text-xs uppercase tracking-widest mb-2">Notification Sounds</div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-ramadan-cream text-xs">1 Hour Before</span>
                          <button 
                            onClick={() => setBeepSettings(s => ({ ...s, oneHour: !s.oneHour }))}
                            className={cn("px-3 py-1 rounded-full text-[10px] font-bold transition-colors", beepSettings.oneHour ? "bg-ramadan-gold text-ramadan-green" : "bg-white/10 text-white/40")}
                          >
                            {beepSettings.oneHour ? 'ON' : 'OFF'}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-ramadan-cream text-xs">30 Min Before</span>
                          <button 
                            onClick={() => setBeepSettings(s => ({ ...s, thirtyMin: !s.thirtyMin }))}
                            className={cn("px-3 py-1 rounded-full text-[10px] font-bold transition-colors", beepSettings.thirtyMin ? "bg-ramadan-gold text-ramadan-green" : "bg-white/10 text-white/40")}
                          >
                            {beepSettings.thirtyMin ? 'ON' : 'OFF'}
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-ramadan-cream text-xs">Last 10 Seconds</span>
                          <button 
                            onClick={() => setBeepSettings(s => ({ ...s, lastTenSec: !s.lastTenSec }))}
                            className={cn("px-3 py-1 rounded-full text-[10px] font-bold transition-colors", beepSettings.lastTenSec ? "bg-ramadan-gold text-ramadan-green" : "bg-white/10 text-white/40")}
                          >
                            {beepSettings.lastTenSec ? 'ON' : 'OFF'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setMenuView('main')}
                      className="w-full py-3 rounded-xl bg-ramadan-gold text-ramadan-green font-bold shadow-lg hover:scale-[1.02] transition-transform"
                    >
                      Save & Back
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-ramadan-gold/30 text-center">
                <div className="text-ramadan-gold/50 text-[10px] font-bold mb-1 italic">Developed by</div>
                <div className="text-ramadan-gold font-black text-sm">Remember S4ever</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {isWidgetMode ? (
        <motion.div 
          layoutId="app-container"
          className={cn(
            "bg-ramadan-green rounded-[40px] shadow-2xl border-4 border-ramadan-gold overflow-hidden flex flex-col items-center justify-center relative transition-all duration-500",
            widgetSize === 'square' ? "w-72 h-72 p-6" : "w-[340px] h-44 p-4"
          )}
        >
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="absolute top-4 left-4 text-ramadan-gold/50 hover:text-ramadan-gold transition-colors p-2 z-10"
          >
            <Menu size={20} />
          </button>
          <button 
            onClick={() => setIsWidgetMode(false)}
            className="absolute top-4 right-4 text-ramadan-gold/50 hover:text-ramadan-gold transition-colors p-2 z-10"
          >
            <Maximize2 size={18} />
          </button>
          
          {widgetSize === 'square' ? (
            <>
              <div className="text-ramadan-gold text-[11px] font-black tracking-widest mb-1 uppercase opacity-70">
                {countdown.label}
              </div>
              <div className="text-white text-5xl font-black font-mono tracking-tighter mb-3">
                {countdown.time}
              </div>
              <div className="bg-ramadan-gold text-ramadan-green px-4 py-1 rounded-full text-[11px] font-black mb-6 shadow-md">
                {citiesData[currentCity].name}
              </div>
              
              <div className="flex gap-3 w-full">
                <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-ramadan-gold/20 text-center">
                  <div className="text-ramadan-gold text-[9px] font-bold uppercase mb-1">Sehri</div>
                  <div className="text-white text-sm font-black">{todayData.hanafiS}</div>
                </div>
                <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-ramadan-gold/20 text-center">
                  <div className="text-ramadan-gold text-[9px] font-bold uppercase mb-1">Iftar</div>
                  <div className="text-white text-sm font-black">{todayData.hanafiI}</div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6 w-full">
              <div className="flex-1">
                <div className="text-ramadan-gold text-[10px] font-black tracking-widest mb-1 uppercase opacity-70">
                  {countdown.label}
                </div>
                <div className="text-white text-4xl font-black font-mono tracking-tighter">
                  {countdown.time}
                </div>
                <div className="text-ramadan-gold text-[10px] font-bold mt-1">
                  {citiesData[currentCity].name}
                </div>
              </div>
              <div className="w-px h-24 bg-ramadan-gold/20" />
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-ramadan-gold text-[10px] font-bold uppercase">Sehri</span>
                  <span className="text-white text-sm font-black">{todayData.hanafiS}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-ramadan-gold text-[10px] font-bold uppercase">Iftar</span>
                  <span className="text-white text-sm font-black">{todayData.hanafiI}</span>
                </div>
                <div className="bg-ramadan-gold text-ramadan-green px-2 py-0.5 rounded text-[9px] font-black text-center">
                  DAY {status.day}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div layoutId="app-container" className="ramadan-card font-sans relative !overflow-visible">
          {/* Header */}
          <div className="bg-linear-to-br from-ramadan-green to-ramadan-green-light p-4 border-b-4 border-ramadan-gold rounded-t-[25px]">
            <div className="flex items-center justify-between mb-2">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMenuOpen(true);
                }}
                className="text-ramadan-gold hover:scale-110 transition-transform p-2 bg-black/20 rounded-full active:bg-black/40 shadow-md touch-none"
                aria-label="Open Menu"
              >
                <Menu size={28} />
              </button>
              
              <button 
                onClick={toggleSound}
                className="text-ramadan-gold hover:scale-110 transition-transform p-2 bg-black/20 rounded-full active:bg-black/40 shadow-md"
                aria-label="Toggle Sound"
              >
                {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
              </button>
            </div>

            <h1 className="text-ramadan-gold text-2xl font-extrabold tracking-wider drop-shadow-md flex items-center justify-center gap-2 mb-4">
              <span className="emoji-safe">🌙</span> RAMADAN 1447 AH
            </h1>

            <div className="flex justify-center gap-2 px-1">
              {Object.keys(citiesData).map(cityKey => (
                <button
                  key={cityKey}
                  onClick={() => setCurrentCity(cityKey)}
                  className={cn(
                    "flex-1 max-w-[100px] py-2.5 px-2 rounded-xl border-2 font-black text-[11px] uppercase tracking-wider transition-all shadow-md",
                    currentCity === cityKey 
                      ? "bg-white text-ramadan-green border-ramadan-gold scale-105 ring-4 ring-ramadan-gold/30" 
                      : "bg-black/20 text-ramadan-gold border-ramadan-gold/20 hover:bg-black/40 hover:border-ramadan-gold/50"
                  )}
                >
                  {cityKey === 'wahi' ? '🌾 Wahi' : cityKey === 'hyderabad' ? '🏙️ Hyd' : '⛏️ Lakhra'}
                </button>
              ))}
            </div>
          </div>

          {/* Current Time Strip */}
          <div className="bg-[#0f2f1e] px-4 py-2 flex justify-between items-center border-b-2 border-ramadan-gold text-white text-xs">
            <span className="font-semibold text-ramadan-cream">
              {now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <span className="bg-ramadan-gold text-ramadan-green px-3 py-1 rounded-full font-bold font-mono text-sm">
              {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          {/* Live Timer Section */}
          <div className="bg-linear-to-br from-[#1e4d2e] to-[#0f3b22] p-5 border-b-4 border-ramadan-gold text-center">
            <div className="bg-ramadan-gold text-ramadan-green px-4 py-1.5 rounded-full font-extrabold text-sm mb-4 shadow-[0_3px_0_#8b691f] inline-block">
              <span className="emoji-safe">📅</span> {status.status === 'during' ? `DAY ${status.day}` : status.status === 'before' ? `STARTS IN ${status.daysLeft}D` : 'COMPLETED'}
            </div>

            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-white/10 rounded-2xl p-3 border-2 border-ramadan-gold">
                <div className="text-ramadan-gold text-[10px] font-bold mb-1 uppercase tracking-tighter flex items-center justify-center gap-1">
                  <span className="emoji-safe">🌅</span> Sehri
                </div>
                <div className="text-white text-xl font-extrabold leading-none">{todayData.hanafiS} AM</div>
                <div className="text-ramadan-cream text-[9px] mt-1 font-medium italic">Hanafi Time</div>
              </div>
              <div className="flex-1 bg-white/10 rounded-2xl p-3 border-2 border-ramadan-gold">
                <div className="text-ramadan-gold text-[10px] font-bold mb-1 uppercase tracking-tighter flex items-center justify-center gap-1">
                  <span className="emoji-safe">🌙</span> Iftar
                </div>
                <div className="text-white text-xl font-extrabold leading-none">{todayData.hanafiI} PM</div>
                <div className="text-ramadan-cream text-[9px] mt-1 font-medium italic">Hanafi Time</div>
              </div>
            </div>

            <div className={cn(
              "rounded-[40px] p-3 transition-all duration-300 shadow-inner",
              countdown.phase === 'iftar' ? "bg-emerald-500" : "bg-ramadan-gold"
            )}>
              <div className="text-ramadan-green text-[10px] font-bold mb-1 tracking-widest">{countdown.label}</div>
              <div className="text-ramadan-green text-4xl font-black font-mono tracking-widest">{countdown.time}</div>
              <div className="text-ramadan-green text-[10px] font-bold mt-1 opacity-80">{countdown.message}</div>
            </div>

            <div className={cn(
              "inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white mt-3 shadow-sm",
              status.status === 'during' ? "bg-red-500" : "bg-zinc-500"
            )}>
              <span className="emoji-safe">🔴</span> {status.status === 'during' ? 'ACTIVE' : 'WAITING'}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 p-2 bg-ramadan-cream border-b-2 border-ramadan-gold">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-ramadan-green bg-white px-2 py-0.5 rounded-full border border-ramadan-gold">
              <span className="w-2 h-2 rounded-full bg-ramadan-gold"></span> Friday
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-ramadan-green bg-white px-2 py-0.5 rounded-full border border-ramadan-gold">
              <span className="w-2 h-2 rounded-full bg-ramadan-green"></span> Hanafi
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-ramadan-green bg-white px-2 py-0.5 rounded-full border border-ramadan-gold">
              <span className="w-2 h-2 rounded-full bg-ramadan-green-light"></span> Jafri
            </div>
          </div>

          {/* Table */}
          <div className="p-2 bg-white overflow-x-auto">
            <table className="w-full border-collapse text-[10px] border-2 border-ramadan-gold table-fixed">
              <thead>
                <tr className="bg-ramadan-green text-ramadan-gold">
                  <th className="border border-ramadan-gold p-1 w-[8%]">#</th>
                  <th className="border border-ramadan-gold p-1 w-[12%]">Day</th>
                  <th className="border border-ramadan-gold p-1 w-[15%]">Date</th>
                  <th colSpan={2} className="border border-ramadan-gold p-1">Hanafi</th>
                  <th colSpan={2} className="border border-ramadan-gold p-1">Jafri</th>
                </tr>
                <tr className="bg-ramadan-green/90 text-ramadan-gold text-[8px]">
                  <th colSpan={3}></th>
                  <th className="border border-ramadan-gold p-0.5">S</th>
                  <th className="border border-ramadan-gold p-0.5">I</th>
                  <th className="border border-ramadan-gold p-0.5">S</th>
                  <th className="border border-ramadan-gold p-0.5">I</th>
                </tr>
              </thead>
              <tbody>
                {citiesData[currentCity].data.map((day) => (
                  <tr 
                    key={day.day} 
                    className={cn(
                      "text-center border-b border-ramadan-gold/30",
                      day.weekday === 'Fri' ? "bg-ramadan-gold/20" : "",
                      status.status === 'during' && status.day === day.day ? "bg-ramadan-gold font-bold" : ""
                    )}
                  >
                    <td className="border border-ramadan-gold/30 p-1">{day.day}</td>
                    <td className="border border-ramadan-gold/30 p-1">
                      {day.weekday}
                      {day.weekday === 'Fri' && <span className="ml-1 text-[6px] bg-ramadan-gold text-ramadan-green px-0.5 rounded font-black">J</span>}
                    </td>
                    <td className="border border-ramadan-gold/30 p-1">{day.date}</td>
                    <td className="border border-ramadan-gold/30 p-1">{day.hanafiS}</td>
                    <td className="border border-ramadan-gold/30 p-1">{day.hanafiI}</td>
                    <td className="border border-ramadan-gold/30 p-1">{day.jafriS}</td>
                    <td className="border border-ramadan-gold/30 p-1">{day.jafriI}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Duas Section */}
          <div className="bg-ramadan-paper p-5 border-y-4 border-ramadan-gold">
            <h3 className="text-center text-ramadan-green text-xl font-black mb-6 flex items-center justify-center gap-2">
              <span className="emoji-safe">🤲</span> COMPLETE DUAS
            </h3>

            <div className="space-y-4">
              <DuaItem 
                label="🌅 SEHRI (INTENTION)"
                arabic="وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ"
                translation="Wa bi-sawmi ghadin nawaitu min shahri ramadan"
                meaning="I intend to keep the fast for tomorrow in the month of Ramadan"
              />
              <DuaItem 
                label="🌙 IFTAR (BREAKING)"
                arabic="اَللّٰهُمَّ اِنِّی لَکَ صُمْتُ وَبِکَ اٰمَنْتُ وَعَلَيْکَ تَوَکَّلْتُ وَعَلٰی رِزْقِکَ اَفْطَرْتُ"
                translation="Allahumma inni laka sumtu wa bika aamantu wa 'alayka tawakkaltu wa 'ala rizq-ika aftartu"
                meaning="O Allah! I fasted for You, I believe in You, I put my trust in You, and with Your sustenance, I break my fast"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-ramadan-cream p-4 text-center border-b-2 border-ramadan-gold">
            <p className="text-ramadan-green text-xs font-bold leading-relaxed">
              📢 NOTE: Timings are 99% accurate. Please verify with your local mosque.
            </p>
            <div className="mt-2 pt-2 border-t border-dashed border-ramadan-gold text-ramadan-gold font-bold text-[10px]">
              Remember S4ever • <span className="emoji-safe">🤲</span> JazakAllah Khair
            </div>
          </div>

          <footer className="bg-ramadan-green p-5 text-center border-t-4 border-ramadan-gold rounded-b-[25px]">
            <div className="text-ramadan-gold text-sm font-bold mb-2 flex items-center justify-center gap-2">
              <span className="emoji-safe">🤲</span> Remember Everyone in Your Duas
            </div>
            <div className="text-ramadan-cream text-xl font-black drop-shadow-sm">
              <span className="emoji-safe">🌙</span> Ramadan Mubarak 2026
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}

function MenuLink({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-3 rounded-xl font-bold text-ramadan-gold/80 hover:text-ramadan-gold hover:bg-white/5 transition-all text-sm">
      {icon}
      <span>{label}</span>
    </button>
  );
}

function DuaItem({ label, arabic, translation, meaning }: { label: string, arabic: string, translation: string, meaning: string }) {
  return (
    <div className="bg-ramadan-green rounded-2xl p-4 border-2 border-ramadan-gold shadow-md">
      <div className="bg-ramadan-gold text-ramadan-green px-3 py-1 rounded-full font-bold text-[10px] inline-block mb-3">
        {label}
      </div>
      <div className="dua-arabic">{arabic}</div>
      <div className="text-ramadan-gold text-xs text-center border-t border-ramadan-gold/30 pt-3 mt-2 italic font-medium">
        {translation}
      </div>
      <div className="text-ramadan-cream text-[10px] text-center mt-1 font-bold">
        "{meaning}"
      </div>
    </div>
  );
}
