import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Calendar, ShieldAlert } from 'lucide-react';

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments');
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Gagal memuat komentar", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setSubmitting(true);
    setMessage('');

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content })
      });

      if (res.ok) {
        setName('');
        setContent('');
        fetchComments();
      } else {
        setMessage('Gagal mengirim komentar.');
      }
    } catch (err) {
      setMessage('Terjadi kesalahan jaringan.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const password = window.prompt("Masukkan Password Akses Root:");
    if (!password) return;

    try {
      const res = await fetch('/api/comments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password })
      });

      if (res.ok) {
        fetchComments();
      } else {
        alert("Akses ditolak: Password salah.");
      }
    } catch (err) {
      alert("Gagal menghapus komentar.");
    }
  };

  return (
    <section id="comments" className="mb-24 md:mb-40 relative z-10">
      <div className="brutal-box p-6 md:p-12 bg-white text-black shadow-[8px_8px_0_0_#111111]">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-8 text-[#FF007F] flex items-center gap-3">
          <MessageSquare size={36} /> Umpan Balik.
        </h2>

        <form onSubmit={handleSubmit} className="mb-12 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-black text-xs md:text-sm uppercase tracking-wider text-black flex items-center gap-2">
              <User size={14} /> Nama / Samaran
            </label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama kamu..."
              maxLength={50}
              required
              className="w-full p-3 border-4 border-black font-bold uppercase text-xs md:text-sm tracking-wider focus:outline-none bg-[#f4f4f0]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-black text-xs md:text-sm uppercase tracking-wider text-black flex items-center gap-2">
              <MessageSquare size={14} /> Isi Komentar
            </label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis pesan atau masukan di sini..."
              rows={4}
              maxLength={500}
              required
              className="w-full p-3 border-4 border-black font-bold text-xs md:text-sm tracking-wider focus:outline-none bg-[#f4f4f0]"
            />
          </div>

          {message && (
            <p className="text-xs font-black uppercase text-red-600 bg-red-100 p-2 border-2 border-black inline-block self-start">
              {message}
            </p>
          )}

          <button 
            type="submit" 
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFD700] text-black border-4 border-black font-black uppercase text-xs md:text-sm tracking-widest shadow-[4px_4px_0_0_#111111] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#111111] transition-all disabled:opacity-50 self-start rounded-md"
          >
            <Send size={16} /> {submitting ? 'Mengirim...' : 'Kirim Komentar'}
          </button>
        </form>

        <div className="border-t-4 border-black pt-8">
          <h3 className="font-black text-lg md:text-xl uppercase mb-6 text-black underline decoration-4 decoration-[#0055FF]">
            Semua Komentar ({comments.length})
          </h3>

          {loading ? (
            <p className="font-black text-xs uppercase text-gray-500 animate-pulse">Memuat data log database...</p>
          ) : comments.length === 0 ? (
            <p className="font-bold text-xs md:text-sm uppercase text-gray-400 italic">Belum ada komentar di sini. Jadilah yang pertama.</p>
          ) : (
            <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {comments.map((comment) => (
                <div key={comment._id} className="brutal-box p-4 bg-[#f4f4f0] border-2 border-black relative group">
                  <div className="flex justify-between items-start mb-2 border-b-2 border-black/10 pb-1">
                    <span className="font-black text-xs md:text-sm uppercase tracking-wide text-[#0055FF]">
                      {comment.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[10px] uppercase text-gray-500 flex items-center gap-1">
                        <Calendar size={10} /> {new Date(comment.createdAt).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button 
                        type="button"
                        onClick={() => handleDelete(comment._id)}
                        className="w-2 h-2 rounded-full bg-transparent hover:bg-red-500/20 cursor-default select-none focus:outline-none"
                        title="System Node Control"
                      />
                    </div>
                  </div>
                  <p className="font-medium text-xs md:text-sm text-black whitespace-pre-wrap break-words leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
