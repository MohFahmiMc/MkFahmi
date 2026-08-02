import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Terminal as TerminalIcon, Cpu, HardDrive, 
  Wifi, Battery, Power, ArrowLeft, Server, Activity, ShieldCheck,
  Volume2, VolumeX, Camera, Calculator, Settings, MessageSquare, 
  Image, Zap, Sun, Moon, Lock, Unlock, Send, Sparkles, BatteryCharging,
  RefreshCw, Play, Square, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveDevice() {
  // State Daya & Layar Utama
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home'); 

  // Real-time Clock & Date
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Status Baterai & Senter
  const [batteryLevel, setBatteryLevel] = useState(88);
  const [isCharging, setIsCharging] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);

  // Volume Toast State
  const [volume, setVolume] = useState(80);
  const [showVolumeToast, setShowVolumeToast] = useState(false);

  // Wallpaper State
  const [wallpaper, setWallpaper] = useState('from-slate-950 via-slate-900 to-black');

  // App States: Calculator
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  // App States: Discord Bot Control
  const [botStatus, setBotStatus] = useState('online');
  const [botUptime, setBotUptime] = useState(1420);

  // App States: Kamera
  const [photoCount, setPhotoCount] = useState(0);
  const [isCameraFlashing, setIsCameraFlashing] = useState(false);

  // App States: Chat
  const [chatMessages, setChatMessages] = useState([
    { sender: 'fahmi', text: 'Halo! Ada proyek bot Discord atau web yang mau dibuat?' }
  ]);
  const [inputChat, setInputChat] = useState('');

  // Update Realtime Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      const dateString = now.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Timer Uptime Bot Discord
  useEffect(() => {
    let interval;
    if (botStatus === 'online') {
      interval = setInterval(() => {
        setBotUptime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [botStatus]);

  // Handler Power Button
  const handlePowerClick = () => {
    if (!isPoweredOn) {
      setIsPoweredOn(true);
      setIsLocked(true);
    } else if (isLocked) {
      setIsPoweredOn(false);
    } else {
      setIsLocked(true);
    }
  };

  // Handler Volume Buttons
  const handleVolumeChange = (delta) => {
    if (!isPoweredOn) return;
    setVolume(prev => {
      const newVol = Math.min(100, Math.max(0, prev + delta));
      return newVol;
    });
    setShowVolumeToast(true);
    setTimeout(() => setShowVolumeToast(false), 2000);
  };

  // Handler Calculator
  const handleCalcBtn = (val) => {
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === '=') {
      try {
        // Safe basic math evaluator
        const sanitized = calcInput.replace(/×/g, '*').replace(/÷/g, '/');
        const res = Function(`'use strict'; return (${sanitized})`)();
        setCalcResult(String(res));
      } catch {
        setCalcResult('Error');
      }
    } else {
      setCalcInput(prev => prev + val);
    }
  };

  // Handler Snap Photo
  const handleSnapPhoto = () => {
    setIsCameraFlashing(true);
    setTimeout(() => setIsCameraFlashing(false), 150);
    setPhotoCount(prev => prev + 1);
  };

  // Handler Chat Send
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    const userMsg = inputChat;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputChat('');

    setTimeout(() => {
      let reply = 'Terima kasih sudah menghubungi! Kamu bisa konsultasi via WhatsApp / Discord resmi.';
      if (userMsg.toLowerCase().includes('harga') || userMsg.toLowerCase().includes('jasa')) {
        reply = 'Untuk pricelist jasa bot Discord & web dev bisa cek halaman /service ya!';
      } else if (userMsg.toLowerCase().includes('siapa') || userMsg.toLowerCase().includes('fahmi')) {
        reply = 'Aku Fahmi, Software & Prompt Engineer otodidak dari Indramayu!';
      }
      setChatMessages(prev => [...prev, { sender: 'fahmi', text: reply }]);
    }, 1000);
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      
      {/* PETUNJUK INTERAKTIF */}
      <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 bg-black text-[#FFD700] border-2 border-black rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_0_#FF007F] animate-pulse">
        <Smartphone className="w-3.5 h-3.5" /> Vivo Y12 Simulator • Klik Tombol & Layar
      </div>

      {/* FRAME SMARTPHONE VIVO Y12 */}
      <div className={`relative w-[270px] sm:w-[300px] h-[520px] sm:h-[560px] bg-slate-900 rounded-[40px] border-4 border-black p-2.5 shadow-[8px_8px_0_0_#111111] transition-all ${isFlashlightOn ? 'ring-4 ring-yellow-300' : ''}`}>
        
        {/* TOMBOL FISIK SAMPING */}
        {/* Volume Up */}
        <button 
          onClick={() => handleVolumeChange(10)}
          title="Volume Up"
          className="absolute -right-2 top-16 w-1.5 h-8 bg-slate-800 rounded-r-md active:bg-blue-500 cursor-pointer transition-colors"
        />
        {/* Volume Down */}
        <button 
          onClick={() => handleVolumeChange(-10)}
          title="Volume Down"
          className="absolute -right-2 top-26 w-1.5 h-8 bg-slate-800 rounded-r-md active:bg-blue-500 cursor-pointer transition-colors"
        />
        {/* Power Button */}
        <button 
          onClick={handlePowerClick}
          title="Tombol Power ON/OFF"
          className="absolute -right-2 top-38 w-1.5 h-10 bg-[#FF007F] rounded-r-md active:bg-yellow-400 cursor-pointer transition-colors"
        />

        {/* LAYAR INTERIOR */}
        <div className="relative w-full h-full bg-slate-950 rounded-[32px] overflow-hidden border-2 border-slate-800 flex flex-col justify-between">
          
          {/* NOTCH WATERDROP VIVO Y12 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-b-xl z-50 flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-700"></div>
            <div className="w-1.5 h-1.5 bg-blue-900 rounded-full"></div>
          </div>

          {/* SENTER FLASHLIGHT OVERLAY EFFECT */}
          {isFlashlightOn && (
            <div className="absolute inset-0 bg-yellow-200/10 pointer-events-none z-30 animate-pulse"></div>
          )}

          {/* VOLUME TOAST OVERLAY */}
          <AnimatePresence>
            {showVolumeToast && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-6 right-3 bg-black/80 backdrop-blur-md text-white text-[9px] px-2.5 py-1 rounded-full z-50 flex items-center gap-1.5 border border-slate-700"
              >
                {volume === 0 ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3 text-blue-400" />}
                <span className="font-mono">{volume}%</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SENSOR / SCREEN STATE */}
          {!isPoweredOn ? (
            /* LAYAR MATI / OFF STATE */
            <div className="w-full h-full bg-black flex flex-col items-center justify-center gap-3 text-slate-700">
              <Power className="w-10 h-10 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Layar Mati</span>
              <button 
                onClick={handlePowerClick}
                className="mt-2 text-[9px] px-3 py-1 bg-slate-800 text-slate-300 rounded-full font-bold border border-slate-700 hover:bg-slate-700"
              >
                Tekan Tombol Power
              </button>
            </div>
          ) : isLocked ? (
            /* LOCK SCREEN */
            <div className={`w-full h-full bg-gradient-to-b ${wallpaper} text-white flex flex-col justify-between pt-6 pb-6 px-4 relative`}>
              <div className="text-center pt-4">
                <div className="text-3xl font-black tracking-tight">{currentTime}</div>
                <div className="text-[10px] font-medium text-slate-300 mt-0.5">{currentDate}</div>
              </div>

              {/* Notifikasi Lockscreen */}
              <div className="space-y-2 my-auto">
                <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl border border-slate-700/60 text-[9px]">
                  <div className="flex items-center justify-between text-yellow-400 font-bold mb-0.5">
                    <span className="flex items-center gap-1"><TerminalIcon className="w-3 h-3" /> Termux Server</span>
                    <span className="text-[7px] text-slate-400">Sekarang</span>
                  </div>
                  <p className="text-slate-200">PM2 Process `discord-bot-main` running online.</p>
                </div>
              </div>

              {/* Unlock Action */}
              <button 
                onClick={() => setIsLocked(false)}
                className="w-full py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold text-center flex items-center justify-center gap-1.5 animate-bounce"
              >
                <Unlock className="w-3 h-3 text-[#FFD700]" /> Ketuk untuk Buka Layar
              </button>
            </div>
          ) : (
            /* LAYAR UTAMA (HOMESCREEN & APPS) */
            <div className={`w-full h-full flex flex-col justify-between pt-5 pb-2 px-2.5 bg-gradient-to-b ${wallpaper} text-white relative`}>
              
              {/* STATUS BAR */}
              <div className="flex justify-between items-center text-[9px] font-bold text-slate-300 px-1 pt-0.5 z-40">
                <span>{currentTime}</span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Wifi className="w-3 h-3 text-[#0055FF]" />
                  <span className="text-[8px] text-emerald-400 font-mono">4G+</span>
                  
                  {/* Baterai Interaktif */}
                  <button 
                    onClick={() => setIsCharging(!isCharging)}
                    title="Klik untuk cas HP"
                    className="flex items-center gap-0.5 hover:opacity-80 cursor-pointer"
                  >
                    <span className="text-[8px]">{batteryLevel}%</span>
                    {isCharging ? (
                      <BatteryCharging className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                    ) : (
                      <Battery className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/30" />
                    )}
                  </button>
                </div>
              </div>

              {/* KONTEN APLIKASI SMARTPHONE */}
              <div className="flex-1 my-2 relative overflow-hidden rounded-xl bg-slate-900/70 backdrop-blur-sm border border-slate-800/80 p-2">
                <AnimatePresence mode="wait">
                  
                  {/* 1. HOME SCREEN */}
                  {activeScreen === 'home' && (
                    <motion.div 
                      key="home"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="h-full flex flex-col justify-between overflow-y-auto"
                    >
                      {/* Widget Jam & Lokasi */}
                      <div className="text-center pt-1">
                        <div className="text-2xl font-black tracking-tight text-white drop-shadow-md">{currentTime}</div>
                        <div className="text-[8px] font-bold text-yellow-400 uppercase tracking-widest">Vivo Y12 • Indramayu OS</div>
                      </div>

                      {/* Card Banner Server */}
                      <div className="brutal-box p-2 bg-gradient-to-r from-pink-600 to-purple-600 border border-black rounded-lg text-white my-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-black uppercase tracking-wider">Core Engine Status</span>
                          <span className="text-[7px] bg-black/40 px-1 py-0.5 rounded font-mono text-green-300 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span> ONLINE
                          </span>
                        </div>
                        <p className="text-[9px] font-bold mt-1 leading-tight">Server Otomasi & Backend Bot Discord Active</p>
                      </div>

                      {/* GRID 8 APLIKASI INTERAKTIF */}
                      <div className="grid grid-cols-4 gap-1.5 py-1">
                        
                        {/* App 1: Termux */}
                        <button 
                          onClick={() => setActiveScreen('termux')}
                          className="flex flex-col items-center justify-center p-1.5 bg-black/80 border border-slate-700 rounded-xl hover:border-[#FFD700] active:scale-95 transition-all group"
                        >
                          <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700 group-hover:border-[#FFD700]">
                            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <span className="text-[8px] font-bold mt-1 text-slate-300 truncate w-full text-center">Termux</span>
                        </button>

                        {/* App 2: Spek HP */}
                        <button 
                          onClick={() => setActiveScreen('specs')}
                          className="flex flex-col items-center justify-center p-1.5 bg-slate-900/80 border border-slate-700 rounded-xl hover:border-[#FF007F] active:scale-95 transition-all group"
                        >
                          <div className="w-7 h-7 bg-pink-950/50 rounded-lg flex items-center justify-center border border-pink-700 group-hover:border-[#FF007F]">
                            <Cpu className="w-3.5 h-3.5 text-[#FF007F]" />
                          </div>
                          <span className="text-[8px] font-bold mt-1 text-slate-300 truncate w-full text-center">Spek Y12</span>
                        </button>

                        {/* App 3: Discord Control */}
                        <button 
                          onClick={() => setActiveScreen('discord')}
                          className="flex flex-col items-center justify-center p-1.5 bg-indigo-950/80 border border-indigo-700 rounded-xl hover:border-indigo-400 active:scale-95 transition-all group"
                        >
                          <div className="w-7 h-7 bg-indigo-900/50 rounded-lg flex items-center justify-center border border-indigo-600">
                            <Server className="w-3.5 h-3.5 text-indigo-300" />
                          </div>
                          <span className="text-[8px] font-bold mt-1 text-slate-300 truncate w-full text-center">Bot Mon</span>
                        </button>

                        {/* App 4: Kamera */}
                        <button 
                          onClick={() => setActiveScreen('camera')}
                          className="flex flex-col items-center justify-center p-1.5 bg-slate-900/80 border border-slate-700 rounded-xl hover:border-blue-400 active:scale-95 transition-all group"
                        >
                          <div className="w-7 h-7 bg-blue-950/50 rounded-lg flex items-center justify-center border border-blue-700">
                            <Camera className="w-3.5 h-3.5 text-blue-400" />
                          </div>
                          <span className="text-[8px] font-bold mt-1 text-slate-300 truncate w-full text-center">Kamera</span>
                        </button>

                        {/* App 5: Kalkulator */}
                        <button 
                          onClick={() => setActiveScreen('calculator')}
                          className="flex flex-col items-center justify-center p-1.5 bg-slate-900/80 border border-slate-700 rounded-xl hover:border-yellow-400 active:scale-95 transition-all group"
                        >
                          <div className="w-7 h-7 bg-yellow-950/50 rounded-lg flex items-center justify-center border border-yellow-700">
                            <Calculator className="w-3.5 h-3.5 text-yellow-400" />
                          </div>
                          <span className="text-[8px] font-bold mt-1 text-slate-300 truncate w-full text-center">Hitung</span>
                        </button>

                        {/* App 6: Chat AI */}
                        <button 
                          onClick={() => setActiveScreen('chat')}
                          className="flex flex-col items-center justify-center p-1.5 bg-emerald-950/80 border border-emerald-700 rounded-xl hover:border-emerald-400 active:scale-95 transition-all group"
                        >
                          <div className="w-7 h-7 bg-emerald-900/50 rounded-lg flex items-center justify-center border border-emerald-600">
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <span className="text-[8px] font-bold mt-1 text-slate-300 truncate w-full text-center">Chat WA</span>
                        </button>

                        {/* App 7: Settings */}
                        <button 
                          onClick={() => setActiveScreen('settings')}
                          className="flex flex-col items-center justify-center p-1.5 bg-slate-900/80 border border-slate-700 rounded-xl hover:border-gray-300 active:scale-95 transition-all group"
                        >
                          <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-600">
                            <Settings className="w-3.5 h-3.5 text-slate-200" />
                          </div>
                          <span className="text-[8px] font-bold mt-1 text-slate-300 truncate w-full text-center">Setelan</span>
                        </button>

                        {/* App 8: Galeri */}
                        <button 
                          onClick={() => setActiveScreen('gallery')}
                          className="flex flex-col items-center justify-center p-1.5 bg-purple-950/80 border border-purple-700 rounded-xl hover:border-purple-400 active:scale-95 transition-all group"
                        >
                          <div className="w-7 h-7 bg-purple-900/50 rounded-lg flex items-center justify-center border border-purple-600">
                            <Image className="w-3.5 h-3.5 text-purple-300" />
                          </div>
                          <span className="text-[8px] font-bold mt-1 text-slate-300 truncate w-full text-center">Galeri</span>
                        </button>

                      </div>
                    </motion.div>
                  )}

                  {/* 2. TERMUX TERMINAL SCREEN */}
                  {activeScreen === 'termux' && (
                    <motion.div 
                      key="termux"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full bg-black rounded-lg p-2 font-mono text-[8px] flex flex-col justify-between border border-emerald-900/50 text-emerald-400"
                    >
                      <div className="space-y-1 overflow-y-auto leading-tight pr-1">
                        <div className="text-slate-400 border-b border-slate-800 pb-1 flex justify-between items-center">
                          <span>$ termux-info</span>
                          <span className="text-[7px] bg-emerald-950 text-emerald-300 px-1 rounded">Bash v5.2</span>
                        </div>
                        <p className="text-yellow-400 font-bold">$ node -v</p>
                        <p className="text-slate-300">v20.11.0 (LTS)</p>
                        <p className="text-yellow-400 font-bold">$ pm2 status</p>
                        <p className="text-emerald-300">● discord-bot-main [online]</p>
                        <p className="text-emerald-300">● web-server-api [online]</p>
                        <p className="text-yellow-400 font-bold">$ neofetch</p>
                        <p className="text-blue-400">OS: Android 11 (Termux)</p>
                        <p className="text-blue-400">Host: Vivo Y12 (V1901)</p>
                        <p className="text-blue-400">Uptime: {Math.floor(botUptime / 60)}m {botUptime % 60}s</p>
                        <p className="text-slate-400 text-[7px] mt-1 animate-pulse">&gt; Compiling latest scripts...</p>
                      </div>

                      <button 
                        onClick={() => setActiveScreen('home')}
                        className="mt-1.5 w-full py-1 bg-slate-900 text-slate-300 rounded border border-slate-700 flex items-center justify-center gap-1 text-[8px] font-sans font-bold hover:bg-slate-800"
                      >
                        <ArrowLeft className="w-3 h-3" /> Kembali ke Home
                      </button>
                    </motion.div>
                  )}

                  {/* 3. HARDWARE SPECS SCREEN */}
                  {activeScreen === 'specs' && (
                    <motion.div 
                      key="specs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full flex flex-col justify-between text-slate-200"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-1.5">
                          <span className="text-[9px] font-black uppercase text-[#FFD700] flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-[#FF007F]" /> Vivo Y12 Specs
                          </span>
                          <span className="text-[7px] bg-blue-900/60 text-blue-300 px-1 py-0.5 rounded font-bold">V1901</span>
                        </div>

                        <div className="space-y-1 text-[8px]">
                          <div className="bg-slate-900 p-1 rounded border border-slate-800 flex items-center justify-between">
                            <span className="text-slate-400 flex items-center gap-1"><Cpu className="w-2.5 h-2.5 text-[#0055FF]" /> RAM</span>
                            <span className="font-black text-white">3 GB LPDDR3</span>
                          </div>

                          <div className="bg-slate-900 p-1 rounded border border-slate-800 flex items-center justify-between">
                            <span className="text-slate-400 flex items-center gap-1"><HardDrive className="w-2.5 h-2.5 text-[#FF007F]" /> Internal ROM</span>
                            <span className="font-black text-white">32 GB eMMC</span>
                          </div>

                          <div className="bg-slate-900 p-1 rounded border border-slate-800 flex items-center justify-between">
                            <span className="text-slate-400 flex items-center gap-1"><Activity className="w-2.5 h-2.5 text-emerald-400" /> Chipset</span>
                            <span className="font-black text-white">Helio P22 Octa-Core</span>
                          </div>

                          <div className="bg-slate-900 p-1 rounded border border-slate-800 flex items-center justify-between">
                            <span className="text-slate-400 flex items-center gap-1"><Battery className="w-2.5 h-2.5 text-yellow-400" /> Baterai</span>
                            <span className="font-black text-white">5000 mAh</span>
                          </div>

                          <div className="bg-slate-950 p-1 rounded border border-pink-900/50 text-[7.5px] text-pink-300 leading-tight">
                            <b>Peran Utama:</b> Server lokal Termux 24/7 untuk kompilasi kode & host bot Discord.
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveScreen('home')}
                        className="w-full py-1 bg-slate-900 text-slate-300 rounded border border-slate-700 flex items-center justify-center gap-1 text-[8px] font-sans font-bold hover:bg-slate-800"
                      >
                        <ArrowLeft className="w-3 h-3" /> Kembali ke Home
                      </button>
                    </motion.div>
                  )}

                  {/* 4. DISCORD BOT MONITOR APP */}
                  {activeScreen === 'discord' && (
                    <motion.div 
                      key="discord"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full flex flex-col justify-between text-white"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-indigo-800 pb-1 mb-1.5">
                          <span className="text-[9px] font-black uppercase text-indigo-400 flex items-center gap-1">
                            <Server className="w-3 h-3" /> Bot Manager
                          </span>
                          <span className={`text-[7px] px-1 py-0.5 rounded font-bold uppercase ${botStatus === 'online' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                            {botStatus}
                          </span>
                        </div>

                        <div className="bg-indigo-950/60 p-1.5 rounded-lg border border-indigo-800/80 mb-2 space-y-1 text-[8px]">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Process Name:</span>
                            <span className="font-mono text-indigo-300">mkf-bot-v2</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Memory Usage:</span>
                            <span className="font-mono text-emerald-300">42.8 MB / 3GB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Active Uptime:</span>
                            <span className="font-mono text-yellow-300">{Math.floor(botUptime / 60)}m {botUptime % 60}s</span>
                          </div>
                        </div>

                        {/* Action Control Buttons */}
                        <div className="grid grid-cols-3 gap-1">
                          <button 
                            onClick={() => setBotStatus('online')}
                            className="py-1 bg-green-900/60 hover:bg-green-800 text-green-300 rounded text-[7px] font-bold flex items-center justify-center gap-1 border border-green-700"
                          >
                            <Play className="w-2.5 h-2.5" /> Start
                          </button>
                          <button 
                            onClick={() => { setBotStatus('restarting'); setTimeout(() => setBotStatus('online'), 1500); }}
                            className="py-1 bg-yellow-900/60 hover:bg-yellow-800 text-yellow-300 rounded text-[7px] font-bold flex items-center justify-center gap-1 border border-yellow-700"
                          >
                            <RefreshCw className="w-2.5 h-2.5" /> Restart
                          </button>
                          <button 
                            onClick={() => setBotStatus('stopped')}
                            className="py-1 bg-red-900/60 hover:bg-red-800 text-red-300 rounded text-[7px] font-bold flex items-center justify-center gap-1 border border-red-700"
                          >
                            <Square className="w-2.5 h-2.5" /> Stop
                          </button>
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveScreen('home')}
                        className="w-full py-1 bg-slate-900 text-slate-300 rounded border border-slate-700 flex items-center justify-center gap-1 text-[8px] font-sans font-bold hover:bg-slate-800"
                      >
                        <ArrowLeft className="w-3 h-3" /> Kembali ke Home
                      </button>
                    </motion.div>
                  )}

                  {/* 5. KAMERA APP */}
                  {activeScreen === 'camera' && (
                    <motion.div 
                      key="camera"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col justify-between bg-black rounded-lg p-1 relative overflow-hidden"
                    >
                      {/* Flash animation */}
                      {isCameraFlashing && <div className="absolute inset-0 bg-white z-50"></div>}

                      {/* Viewfinder Header */}
                      <div className="flex justify-between items-center text-[8px] text-white/80 z-10 px-1 pt-0.5">
                        <span className="font-mono">F/1.8 • ISO100</span>
                        <span className="bg-red-600 px-1 rounded text-[7px] font-bold">REC {photoCount}</span>
                      </div>

                      {/* Simulated Camera Viewfinder Grid */}
                      <div className="relative my-auto w-full h-32 border border-white/20 rounded flex items-center justify-center bg-slate-900/40">
                        <div className="w-12 h-12 border border-yellow-400/60 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                        </div>
                        <span className="absolute bottom-1 right-1 text-[7px] text-slate-400 font-mono">Vivo AI Camera</span>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-around pb-1">
                        <span className="text-[8px] text-slate-400 font-bold">Foto: {photoCount}</span>
                        <button 
                          onClick={handleSnapPhoto}
                          className="w-8 h-8 rounded-full border-2 border-white bg-red-600 active:scale-90 transition-transform flex items-center justify-center shadow-lg"
                        >
                          <div className="w-6 h-6 rounded-full border border-black/40"></div>
                        </button>
                        <button 
                          onClick={() => setActiveScreen('home')}
                          className="text-[8px] text-slate-300 hover:text-white"
                        >
                          Keluar
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* 6. KALKULATOR APP */}
                  {activeScreen === 'calculator' && (
                    <motion.div 
                      key="calculator"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full flex flex-col justify-between"
                    >
                      {/* Display Screen */}
                      <div className="bg-black/90 p-1.5 rounded-lg border border-slate-800 text-right font-mono">
                        <div className="text-[9px] text-slate-400 h-3 overflow-hidden">{calcInput || '0'}</div>
                        <div className="text-sm font-bold text-yellow-400 h-5 overflow-hidden">{calcResult || '0'}</div>
                      </div>

                      {/* Button Grid */}
                      <div className="grid grid-cols-4 gap-1 text-[9px] font-bold my-1">
                        {['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn, i) => (
                          <button
                            key={i}
                            onClick={() => handleCalcBtn(btn)}
                            className={`py-1 rounded border active:scale-95 transition-transform ${
                              btn === '=' ? 'bg-yellow-500 text-black border-yellow-400 col-span-2' :
                              ['C', '÷', '×', '-', '+'].includes(btn) ? 'bg-[#FF007F] text-white border-pink-700' :
                              'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            {btn}
                          </button>
                        ))}
                      </div>

                      <button 
                        onClick={() => setActiveScreen('home')}
                        className="w-full py-1 bg-slate-900 text-slate-300 rounded border border-slate-700 flex items-center justify-center gap-1 text-[8px] font-sans font-bold hover:bg-slate-800"
                      >
                        <ArrowLeft className="w-3 h-3" /> Kembali ke Home
                      </button>
                    </motion.div>
                  )}

                  {/* 7. SETELAN / SETTINGS APP */}
                  {activeScreen === 'settings' && (
                    <motion.div 
                      key="settings"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full flex flex-col justify-between text-slate-200"
                    >
                      <div>
                        <div className="border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase text-white flex items-center gap-1">
                            <Settings className="w-3 h-3 text-blue-400" /> Pengaturan System
                          </span>
                        </div>

                        <div className="space-y-1.5 text-[8px]">
                          {/* Senter Toggle */}
                          <div className="bg-slate-900 p-1.5 rounded border border-slate-800 flex items-center justify-between">
                            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-yellow-400" /> Senter HP</span>
                            <button 
                              onClick={() => setIsFlashlightOn(!isFlashlightOn)}
                              className={`px-2 py-0.5 rounded font-bold text-[7px] ${isFlashlightOn ? 'bg-yellow-400 text-black' : 'bg-slate-800 text-slate-400'}`}
                            >
                              {isFlashlightOn ? 'ON' : 'OFF'}
                            </button>
                          </div>

                          {/* Wallpaper Switcher */}
                          <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                            <span className="block text-slate-400 mb-1">Tema Wallpaper:</span>
                            <div className="grid grid-cols-2 gap-1">
                              <button 
                                onClick={() => setWallpaper('from-slate-950 via-slate-900 to-black')}
                                className="p-1 bg-slate-950 border border-slate-700 rounded text-[7px] font-bold text-center"
                              >
                                Cyber Dark
                              </button>
                              <button 
                                onClick={() => setWallpaper('from-pink-950 via-purple-950 to-black')}
                                className="p-1 bg-purple-950 border border-pink-700 rounded text-[7px] font-bold text-center text-pink-300"
                              >
                                Neon Pink
                              </button>
                            </div>
                          </div>

                          <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                            <span className="text-slate-400 block mb-0.5">Sistem Operasi:</span>
                            <span className="font-mono text-emerald-400">Funtouch OS / Indramayu v12.1</span>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveScreen('home')}
                        className="w-full py-1 bg-slate-900 text-slate-300 rounded border border-slate-700 flex items-center justify-center gap-1 text-[8px] font-sans font-bold hover:bg-slate-800"
                      >
                        <ArrowLeft className="w-3 h-3" /> Kembali ke Home
                      </button>
                    </motion.div>
                  )}

                  {/* 8. CHAT SIMULATOR APP */}
                  {activeScreen === 'chat' && (
                    <motion.div 
                      key="chat"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full flex flex-col justify-between bg-slate-950 rounded-lg p-1"
                    >
                      {/* Header Chat */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-1">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-[#0055FF] rounded-full flex items-center justify-center text-[7px] font-bold">F</div>
                          <div>
                            <div className="text-[8px] font-bold text-white">Mohamad Fahmi</div>
                            <div className="text-[6px] text-emerald-400">Online</div>
                          </div>
                        </div>
                        <button onClick={() => setActiveScreen('home')} className="text-slate-400 text-[8px]">
                          <ArrowLeft className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Messages Area */}
                      <div className="flex-1 overflow-y-auto space-y-1 my-1 pr-1">
                        {chatMessages.map((msg, i) => (
                          <div 
                            key={i} 
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[85%] p-1.5 rounded-lg text-[8px] leading-tight ${
                              msg.sender === 'user' ? 'bg-[#0055FF] text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Input Form */}
                      <form onSubmit={handleSendChat} className="flex gap-1 pt-1 border-t border-slate-800">
                        <input 
                          type="text" 
                          value={inputChat}
                          onChange={(e) => setInputChat(e.target.value)}
                          placeholder="Ketik pesan..."
                          className="flex-1 bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-[8px] text-white focus:outline-none focus:border-blue-500"
                        />
                        <button type="submit" className="p-1 bg-[#0055FF] text-white rounded active:scale-95">
                          <Send className="w-3 h-3" />
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* 9. GALERI APP */}
                  {activeScreen === 'gallery' && (
                    <motion.div 
                      key="gallery"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full flex flex-col justify-between text-slate-200"
                    >
                      <div>
                        <div className="border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase text-purple-300 flex items-center gap-1">
                            <Image className="w-3 h-3 text-purple-400" /> Galeri Portofolio
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-1 text-[8px]">
                          <div className="bg-purple-950/60 p-1.5 rounded border border-purple-800 flex flex-col items-center justify-center text-center">
                            <Zap className="w-4 h-4 text-yellow-400 mb-0.5" />
                            <span className="font-bold text-white">Bot Discord</span>
                            <span className="text-[7px] text-purple-300">Custom Automation</span>
                          </div>
                          <div className="bg-blue-950/60 p-1.5 rounded border border-blue-800 flex flex-col items-center justify-center text-center">
                            <Server className="w-4 h-4 text-blue-400 mb-0.5" />
                            <span className="font-bold text-white">Termux Server</span>
                            <span className="text-[7px] text-blue-300">Self-Hosted API</span>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveScreen('home')}
                        className="w-full py-1 bg-slate-900 text-slate-300 rounded border border-slate-700 flex items-center justify-center gap-1 text-[8px] font-sans font-bold hover:bg-slate-800"
                      >
                        <ArrowLeft className="w-3 h-3" /> Kembali ke Home
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* NAVIGATION BAR DIGITAL (TOMBOL BAWAH SMARTPHONE) */}
              <div className="flex justify-around items-center pt-1 border-t border-slate-800/80">
                {/* Recent Apps */}
                <button 
                  onClick={() => setActiveScreen('home')} 
                  title="Recent Apps"
                  className="p-1 hover:text-yellow-400 text-slate-400 transition-colors active:scale-90"
                >
                  <div className="w-2.5 h-2.5 border-2 border-current rotate-45"></div>
                </button>

                {/* Home Button */}
                <button 
                  onClick={() => setActiveScreen('home')} 
                  title="Tombol Utama Home"
                  className="p-1 hover:text-yellow-400 text-slate-400 transition-colors active:scale-90"
                >
                  <div className="w-3 h-3 rounded-full border-2 border-current"></div>
                </button>

                {/* Back Button */}
                <button 
                  onClick={() => setActiveScreen('home')} 
                  title="Tombol Kembali"
                  className="p-1 hover:text-yellow-400 text-slate-400 transition-colors active:scale-90"
                >
                  <div className="w-2.5 h-2.5 border-l-2 border-b-2 border-current"></div>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
