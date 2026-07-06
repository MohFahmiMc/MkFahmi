import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EditableText({ text, setText, isEditing, setIsEditing, isRootAccess, borderColorClass = "border-black" }) {
  const [shake, setShake] = useState(false);

  const handleDoubleClick = () => {
    if (isEditing) return;
    if (!isRootAccess) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setIsEditing(true);
  };

  const renderText = () => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;

      const parts = line.split(/(secara otodidak|Fahmi|Prompt Engineer & Software Engineer|Artificial Intelligence \(AI\))/i);
      
      return (
        <p key={index} className={index > 0 ? "mt-4" : ""}>
          {parts.map((part, i) => {
            const lower = part.toLowerCase();
            if (lower === 'secara otodidak') return <span key={i} className="bg-[#FFD700] text-black px-1">{part}</span>;
            if (lower === 'fahmi') return <span key={i} className="text-white bg-[#0055FF] px-2 py-0.5 border border-black font-normal">{part}</span>;
            if (lower === 'prompt engineer & software engineer') return <strong key={i}>{part}</strong>;
            if (lower === 'artificial intelligence (ai)') return <i key={i}>{part}</i>;
            return part;
          })}
        </p>
      );
    });
  };

  if (isEditing) {
    return (
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => setIsEditing(false)}
        onKeyDown={(e) => { 
          if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setIsEditing(false);
          } 
        }}
        className="bg-[#FFD700] text-black w-full border-2 border-black outline-none font-bold p-2 shadow-[4px_4px_0_0_#111111]"
        autoFocus
        rows={text.split('\n').length + 1}
      />
    );
  }

  return (
    <motion.div 
      animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.3 }}
      onDoubleClick={handleDoubleClick} 
      className={`block border-l-4 pl-4 text-left leading-relaxed py-1 transition-colors ${isRootAccess ? 'cursor-text hover:bg-green-50 border-green-500' : `${borderColorClass} cursor-default`}`} 
      title={isRootAccess ? "Klik 2x untuk edit teks" : "Terkunci: Aktifkan Root via Navbar atau klik nama di Monitor"}
    >
      {renderText()}
    </motion.div>
  );
}
