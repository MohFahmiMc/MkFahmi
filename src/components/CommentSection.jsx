import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Calendar, ShieldAlert, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

// Daftar kata kasar / terlarang
const BAD_WORDS = ['anjing', 'babi', 'kontol', 'memek', 'asu', 'bangsat', 'taik', 'goblok', 'tolol', 'fuck', 'shit'];

export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Perangkap Bot
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Custom Toast Alert State
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: '', message: '' });
    }, 4000);
  };

  // Timer Cooldown Anti-Spam
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments');
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      // Silent error handling
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const hasBadWords = (text) => {
    const pattern = new RegExp(`\\b(${BAD_WORDS.join('|')})\\b`, 'gi');
    return pattern.test(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Deteksi Bot via Honeypot
    if (honeypot) {
      showAlert('error', 'Aktivitas mencurigakan terdeteksi.');
      return;
    }

    // 2. Cek Cooldown Anti-Spam
    if (cooldown > 0) {
      showAlert('warning', `Tunggu ${cooldown} detik sebelum milih kirim lagi.`);
      return;
    }

    const cleanName = name.trim();
    const cleanContent = content.trim();

    if (!cleanName || !cleanContent) {
      showAlert('warning', 'Nama dan komentar wajib diisi!');
      return;
    }

    // 3. Filter Kata Kasar
    if (hasBadWords(cleanName) || hasBadWords(cleanContent)) {
      showAlert('error', 'Komentar mengandung kata tidak sopan!');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, content: cleanContent })
      });

      if (res.ok) {
        setName('');
        setContent('');
        showAlert('success', 'Komentar kamu berhasil terbit!');
        setCooldown(15); // Delay 15 detik untuk pencegahan spam
        fetchComments();
      } else {
        showAlert('error', 'Gagal mengirim komentar ke server.');
      }
    } catch (err) {
      showAlert('error', 'Terjadi masalah koneksi jaringan.');
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
        showAlert('success', 'Komentar berhasil dihapus.');
        fetchComments();
      } else {
        showAlert('error', 'Akses Ditolak: Password Salah.');
      }
    } catch (err) {
      showAlert('error', 'Gagal menghapus komentar.');
    }
  };

  return (
    <section id="comments" className="mb-24 md:mb-40 relative z-10">
      {/* Brutalist Custom Alert Notification */}
      {alert.show && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 border-4 border-black font-black uppercase text-xs md:text-sm tracking-wider flex items-center gap-3 shadow-[6px_6px_0_0_#111111] animate-bounce ${
          alert.type === 'success' ? 'bg-[#00FF66] text-black' :
          alert.type === 'warning' ? 'bg-[#FFD700] text-black' : 'bg-[#FF0055] text-white'
        }`}>
          {alert.type === 'success' && <CheckCircle2 size={20} />}
          {alert.type === 'warning' && <AlertTriangle size={20} />}
          {alert.type === 'error' && <XCircle size={20} />}
          <span>{alert.message}</span>
        </div>
      )}

      <div className="brutal-box p-6 md:p-12 bg-white text-black shadow-[8px_8px_0_0_#111111] border-4 border-black">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-8 text-[#FF007F] flex items-center gap-3">
          <MessageSquare size={36} /> Umpan Balik.
        </h2>

        <form onSubmit={handleSubmit} className="mb-12 flex flex-col gap-4">
          {/* Honeypot Field (Tersembunyi untuk Penjebak Bot) */}
          <div className="hidden" aria-hidden="true">
            <input 
              type="text" 
              name="website_url" 
              tabIndex="-1" 
              value={honeypot} 
              onChange={(e) => setHoneypot(e.target.value)} 
              autoComplete="off"
            />
          </div>

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
              className="w-full p-3 border-4 border-black font-bold uppercase text-xs md:text-sm tracking-wider focus:outline-none bg-[#f4f4f0] focus:bg-white"
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
              className="w-full p-3 border-4 border-black font-bold text-xs md:text-sm tracking-wider focus:outline-none bg-[#f4f4f0] focus:bg-white"
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting || cooldown > 0}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FFD700] text-black border-4 border-black font-black uppercase text-xs md:text-sm tracking-widest shadow-[4px_4px_0_0_#111111] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#111111] transition-all disabled:opacity-50 disabled:cursor-not-allowed self-start rounded-none"
          >
            <Send size={16} /> 
            {submitting ? 'Mengirim...' : cooldown > 0 ? `Tunggu (${cooldown}s)` : 'Kirim Komentar'}
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
                <div key={comment._id} className="brutal-box p-4 bg-[#f4f4f0] border-4 border-black relative group shadow-[4px_4px_0_0_#111111]">
                  <div className="flex justify-between items-start mb-2 border-b-2 border-black/20 pb-2">
                    <span className="font-black text-xs md:text-sm uppercase tracking-wide text-[#0055FF]">
                      {comment.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[10px] uppercase text-gray-600 flex items-center gap-1">
                        <Calendar size={10} /> {new Date(comment.createdAt).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button 
                        type="button"
                        onClick={() => handleDelete(comment._id)}
                        className="w-3 h-3 border border-black bg-transparent hover:bg-red-500 cursor-pointer focus:outline-none transition-colors"
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
