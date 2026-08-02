import React, { useState } from 'react';
import { 
  Smartphone, Terminal as TerminalIcon, Cpu, HardDrive, 
  Wifi, Battery, Power, ArrowLeft, Server, Activity, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveDevice() {
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [activeScreen, setActiveScreen] = useState('home'); // 'home' | 'termux' | 'specs'

  const togglePower = () => {
    setIsPoweredOn(!isPoweredOn);
    if (!isPoweredOn) setActiveScreen('home');
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Label Petunjuk Interaktif */}
      <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 bg-black text-[#FFD700] border-2 border-black rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_0_#FF007F] animate-pulse">
        <Smartphone className="w-3.5 h-3.5" /> Klik Layar / Tombol Power untuk Interaksi
      </div>

      {/* FRAME SMARTPHONE VIVO Y12 */}
      <div className="relative w-[260px] sm:w-[290px] h-[500px] sm:h-[540px] bg-slate-900 rounded-[38px] border-4 border-black p-2.5 shadow-[6px_6px_0_0_#111111] md:shadow-[8px_8px_0_0_#111111] select-none transition-all">
        
        {/* Tombol Fisik Volume & Power (Kanan Frame) */}
        <div className="absolute -right-2 top-20 w-1.5 h-10 bg-black rounded-r-md"></div>
        <button 
          onClick={togglePower}
          title="Tombol Power ON/OFF"
          className="absolute -right-2 top-34 w-1.5 h-8 bg-[#FF007F] rounded-r-md active:bg-yellow-400 cursor-pointer transition-colors"
        />

        {/* Bodi Utama / Layar Interior */}
        <div className="relative w-full h-full bg-slate-950 rounded-[30px] overflow-hidden border-2 border-slate-800 flex flex-col justify-between">
          
          {/* NOTCH WATERDROP VIVO Y12 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-b-xl z-50 flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-700"></div>
            <div className="w-1.5 h-1.5 bg-blue-900 rounded-full"></div>
          </div>

          {/* SENSOR / SCREEN STATE */}
          {!isPoweredOn ? (
            /* LAYAR MATI / OFF STATE */
            <div className="w-full h-full bg-black flex flex-col items-center justify-center gap-3 text-slate-700">
              <Power className="w-10 h-10 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Layar Mati</span>
              <button 
                onClick={togglePower}
                className="mt-2 text-[9px] px-3 py-1 bg-slate-800 text-slate-300 rounded-full font-bold border border-slate-700 hover:bg-slate-700"
              >
                Tekan Tombol Power
              </button>
            </div>
          ) : (
            /* LAYAR HIDUP / ON STATE */
            <div className="w-full h-full flex flex-col justify-between pt-5 pb-2 px-2.5 bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white relative">
              
              {/* STATUS BAR */}
              <div className="flex justify-between items-center text-[9px] font-bold text-slate-300 px-1 pt-0.5 z-40">
                <span>21:52</span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Wifi className="w-3 h-3 text-[#0055FF]" />
                  <span className="text-[8px] text-emerald-400 font-mono">4G+</span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[8px]">88%</span>
                    <Battery className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/30" />
                  </div>
                </div>
              </div>

              {/* TAMPILAN KONTEN UTAMA SMARTPHONE */}
              <div className="flex-1 my-2 relative overflow-hidden rounded-xl bg-slate-900/60 border border-slate-800/80 p-2">
                <AnimatePresence mode="wait">
                  
                  {/* 1. HOME SCREEN */}
                  {activeScreen === 'home' && (
                    <motion.div 
                      key="home"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="h-full flex flex-col justify-between"
                    >
                      {/* Widget Jam & Header */}
                      <div className="text-center pt-2">
                        <div className="text-2xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">21:52</div>
                        <div className="text-[9px] font-bold text-yellow-400 uppercase tracking-widest">Vivo Y12 • Indramayu OS</div>
                      </div>

                      {/* Card Info Ringkas */}
                      <div className="brutal-box p-2 bg-gradient-to-r from-pink-600 to-purple-600 border border-black rounded-lg text-white my-auto">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase">Core Engine</span>
                          <span className="text-[8px] bg-black/40 px-1.5 py-0.5 rounded font-mono text-green-300">ONLINE</span>
                        </div>
                        <p className="text-[10px] font-bold mt-1 leading-tight">Mesin Utama Otomasi & Backend Bot Discord</p>
                      </div>

                      {/* Grid Aplikasi Interaktif */}
                      <div className="grid grid-cols-3 gap-2 pb-1">
                        <button 
                          onClick={() => setActiveScreen('termux')}
                          className="flex flex-col items-center justify-center p-2 bg-black border border-slate-700 rounded-xl hover:border-[#FFD700] active:scale-95 transition-all group"
                        >
                          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700 group-hover:border-[#FFD700]">
                            <TerminalIcon className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="text-[9px] font-bold mt-1 text-slate-300">Termux</span>
                        </button>

                        <button 
                          onClick={() => setActiveScreen('specs')}
                          className="flex flex-col items-center justify-center p-2 bg-slate-900 border border-slate-700 rounded-xl hover:border-[#FF007F] active:scale-95 transition-all group"
                        >
                          <div className="w-8 h-8 bg-pink-950/50 rounded-lg flex items-center justify-center border border-pink-700 group-hover:border-[#FF007F]">
                            <Cpu className="w-4 h-4 text-[#FF007F]" />
                          </div>
                          <span className="text-[9px] font-bold mt-1 text-slate-300">Spek HP</span>
                        </button>

                        <div className="flex flex-col items-center justify-center p-2 bg-slate-900/50 border border-slate-800 rounded-xl opacity-80">
                          <div className="w-8 h-8 bg-blue-950/40 rounded-lg flex items-center justify-center border border-blue-800">
                            <Server className="w-4 h-4 text-[#0055FF]" />
                          </div>
                          <span className="text-[9px] font-bold mt-1 text-slate-400">Node Server</span>
                        </div>
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
                      className="h-full bg-black rounded-lg p-2 font-mono text-[9px] flex flex-col justify-between border border-emerald-900/50 text-emerald-400"
                    >
                      <div className="space-y-1 overflow-y-auto leading-snug">
                        <div className="text-slate-400 border-b border-slate-800 pb-1 flex justify-between items-center">
                          <span>$ termux-info</span>
                          <span className="text-[8px] bg-emerald-950 text-emerald-300 px-1 rounded">Bash v5.2</span>
                        </div>
                        <p className="text-yellow-400 font-bold">$ node -v</p>
                        <p className="text-slate-300">v20.11.0 (LTS)</p>
                        <p className="text-yellow-400 font-bold">$ pm2 status</p>
                        <p className="text-emerald-300">● discord-bot-main [online]</p>
                        <p className="text-emerald-300">● web-server-api [online]</p>
                        <p className="text-slate-400 text-[8px] mt-2 animate-pulse">
                          &gt; Server berjalan lancar di Vivo Y12...
                        </p>
                      </div>

                      <button 
                        onClick={() => setActiveScreen('home')}
                        className="mt-2 w-full py-1 bg-slate-900 text-slate-300 rounded border border-slate-700 flex items-center justify-center gap-1 text-[9px] font-sans font-bold hover:bg-slate-800"
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
                        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                          <span className="text-[10px] font-black uppercase text-[#FFD700] flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-[#FF007F]" /> Vivo Y12 Specs
                          </span>
                          <span className="text-[8px] bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded font-bold">V1901</span>
                        </div>

                        <div className="space-y-1.5 text-[9px]">
                          <div className="bg-slate-900 p-1.5 rounded border border-slate-800 flex items-center justify-between">
                            <span className="text-slate-400 flex items-center gap-1"><Cpu className="w-3 h-3 text-[#0055FF]" /> RAM</span>
                            <span className="font-black text-white">3 GB LPDDR3</span>
                          </div>

                          <div className="bg-slate-900 p-1.5 rounded border border-slate-800 flex items-center justify-between">
                            <span className="text-slate-400 flex items-center gap-1"><HardDrive className="w-3 h-3 text-[#FF007F]" /> Internal ROM</span>
                            <span className="font-black text-white">32 GB eMMC</span>
                          </div>

                          <div className="bg-slate-900 p-1.5 rounded border border-slate-800 flex items-center justify-between">
                            <span className="text-slate-400 flex items-center gap-1"><Activity className="w-3 h-3 text-emerald-400" /> Chipset</span>
                            <span className="font-black text-white">Helio P22 Octa-Core</span>
                          </div>

                          <div className="bg-slate-950 p-1.5 rounded border border-pink-900/50 text-[8px] text-pink-300 leading-tight">
                            <b>Peran Utama:</b> Digunakan sebagai server lokal Termux 24/7 untuk kompilasi kode & host bot.
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveScreen('home')}
                        className="w-full py-1 bg-slate-900 text-slate-300 rounded border border-slate-700 flex items-center justify-center gap-1 text-[9px] font-sans font-bold hover:bg-slate-800"
                      >
                        <ArrowLeft className="w-3 h-3" /> Kembali ke Home
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* NAV BAR DIGITAL BAWAH (NAVIGATION BAR) */}
              <div className="flex justify-around items-center pt-1 border-t border-slate-800/80">
                <button onClick={() => setActiveScreen('home')} className="p-1 hover:text-yellow-400 text-slate-400 transition-colors">
                  <div className="w-2.5 h-2.5 border-2 border-current rotate-45"></div>
                </button>
                <button onClick={() => setActiveScreen('home')} className="p-1 hover:text-yellow-400 text-slate-400 transition-colors">
                  <div className="w-3 h-3 rounded-full border-2 border-current"></div>
                </button>
                <button onClick={() => setActiveScreen('home')} className="p-1 hover:text-yellow-400 text-slate-400 transition-colors">
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
