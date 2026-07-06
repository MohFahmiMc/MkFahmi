import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { projectsData } from '../data/projectsData';

export default function AllProjects({ navigate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedProjects, setExpandedProjects] = useState({});
  
  const itemsPerPage = 3;
  const totalPages = Math.ceil(projectsData.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projectsData.slice(startIndex, startIndex + itemsPerPage);

  const toggleExpand = (id) => {
    setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTanggal = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f0] bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:32px_32px] pt-12 pb-24 px-5">
      <div className="max-w-4xl mx-auto">
        
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 brutal-box bg-white text-black font-black uppercase text-xs tracking-widest rounded-full mb-12"
        >
          <ArrowLeft size={16} /> Kembali Ke Beranda
        </button>

        <div className="mb-12 border-b-8 border-black pb-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black drop-shadow-[3px_3px_0_#FF007F]">
            Arsip Karya.
          </h1>
          <p className="font-bold text-sm md:text-base text-gray-700 mt-2 uppercase">
            Daftar seluruh infrastruktur dan arsitektur digital yang dibangun.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {currentProjects.map((project) => {
            const isExpanded = !!expandedProjects[project.id];
            return (
              <motion.div 
                key={project.id}
                layout
                className="brutal-box p-6 md:p-8 bg-white text-black shadow-[6px_6px_0_0_#111111]"
              >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-black text-gray-600 uppercase mb-2">
                      <Calendar size={14} className="text-[#FF007F]" />
                      <span>{formatTanggal(project.date)}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
                      {project.title}
                    </h2>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`px-2.5 py-0.5 border-2 border-black font-black text-[9px] uppercase tracking-wider ${tag.color}`}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="font-bold text-sm md:text-base text-black/80 leading-relaxed mb-6">
                  <p>{project.descShort}</p>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t-2 border-dashed border-black/20 text-black font-medium text-xs md:text-sm bg-gray-50 p-4 brutal-box shadow-none"
                      >
                        {project.descLong}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center border-t-2 border-black pt-4">
                  <button 
                    onClick={() => toggleExpand(project.id)}
                    className="inline-flex items-center justify-center gap-1 text-xs font-black uppercase text-gray-700 hover:text-black"
                  >
                    {isExpanded ? (
                      <>Sembunyikan Deskripsi <ChevronUp size={16} /></>
                    ) : (
                      <>Baca Deskripsi Lengkap <ChevronDown size={16} /></>
                    )}
                  </button>

                  <button 
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 brutal-btn text-xs font-black uppercase tracking-widest rounded-lg"
                  >
                    Lihat Arsitektur <ExternalLink size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="px-4 py-2 brutal-box bg-white font-black uppercase text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            <span className="font-black text-xs uppercase bg-black text-white px-3 py-2 border-2 border-black">
              Halaman {currentPage} Dari {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 brutal-box bg-white font-black uppercase text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
