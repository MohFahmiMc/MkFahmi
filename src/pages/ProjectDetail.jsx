import React from 'react';
import { ArrowLeft, Globe, ExternalLink, Calendar } from 'lucide-react';
import { projectsData } from '../data/projectsData';

export default function ProjectDetail({ projectId, navigate }) {
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f4f4f0] flex flex-col items-center justify-center p-5">
        <div className="brutal-box p-8 bg-white text-center max-w-md">
          <h1 className="text-2xl font-black uppercase mb-4 text-black">Project Tidak Ditemukan</h1>
          <button onClick={() => navigate('/project')} className="brutal-btn px-6 py-2 rounded-lg font-black uppercase text-xs">
            Kembali ke Daftar Project
          </button>
        </div>
      </div>
    );
  }

  const formatTanggal = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f0] bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:32px_32px] pt-8 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Bagian Tombol Navigasi Atas */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <button 
            onClick={() => navigate('/project')}
            className="inline-flex items-center gap-2 px-5 py-2.5 brutal-box bg-white text-black font-black uppercase text-xs tracking-widest rounded-full"
          >
            <ArrowLeft size={16} /> Kembali ke Arsip
          </button>
          
          {/* PERBAIKAN: Mengubah bg-black text-white menjadi bg-white text-black agar tulisan hitam terlihat jelas */}
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 brutal-box bg-white text-black font-black uppercase text-xs tracking-widest rounded-full"
          >
            Beranda Utama
          </button>
        </div>

        {/* Konten Utama Detail Project */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
          
          {/* Panel Informasi Kiri */}
          <div className="lg:col-span-1 brutal-box p-6 md:p-8 bg-white shadow-[6px_6px_0_0_#111111]">
            <div className="flex items-center gap-2 text-xs font-black text-gray-600 uppercase mb-3">
              <Calendar size={14} className="text-[#FF007F]" />
              <span>{formatTanggal(project.date)}</span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-black mb-4 leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tags.map((tag, i) => (
                <span key={i} className={`px-2.5 py-0.5 border-2 border-black font-black text-[9px] uppercase tracking-wider ${tag.color}`}>
                  {tag.name}
                </span>
              ))}
            </div>
            <div className="border-t-2 border-black pt-4 font-bold text-xs md:text-sm text-black/90 leading-relaxed">
              <p className="mb-4 text-black font-black uppercase text-[11px] tracking-wider text-gray-500">Intisari:</p>
              <p className="mb-6">{project.descShort}</p>
              <p className="mb-4 text-black font-black uppercase text-[11px] tracking-wider text-gray-500">Spesifikasi Arsitektur:</p>
              <p className="font-medium bg-gray-50 p-4 border-2 border-dashed border-black/30 rounded-lg">{project.descLong}</p>
            </div>
          </div>

          {/* Panel Live Preview (Iframe) Kanan */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="w-full brutal-box p-0 overflow-hidden bg-white shadow-[8px_8px_0_0_#111111] h-[450px] md:h-[650px]">
              {/* Header ala Browser Window */}
              <div className="w-full h-11 bg-white border-b-4 border-black flex items-center px-4 md:px-6 justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-3 h-3 rounded-full border-2 border-black bg-[#FF007F]"></div>
                  <div className="w-3 h-3 rounded-full border-2 border-black bg-[#FFD700]"></div>
                  <div className="w-3 h-3 rounded-full border-2 border-black bg-[#0055FF]"></div>
                  <div className="ml-2 md:ml-4 text-[10px] md:text-xs font-black tracking-widest uppercase border-l-2 border-black pl-2 md:pl-4 text-black max-w-[180px] md:max-w-xs truncate">
                    {project.url.replace('https://', '')}
                  </div>
                </div>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 font-black text-[10px] uppercase border-2 border-black bg-[#FFD700] px-2 py-0.5 rounded shadow-[2px_2px_0_0_#111111]"
                >
                  Buka Tab Baru <ExternalLink size={10} />
                </a>
              </div>
              {/* Iframe Website */}
              <iframe 
                src={project.url} 
                className="w-full h-[calc(100%-2.75rem)] border-none bg-gray-100" 
                title={project.title}
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
