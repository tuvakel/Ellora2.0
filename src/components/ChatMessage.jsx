import React from 'react';
import { useTypingEffect } from '../utils/useTypingEffect';

export default function ChatMessage({ msg }) {
  const typedText = useTypingEffect(msg.message, 50);
  const displayText = msg.sender === 'ai' ? typedText : msg.message;

  return (
    <div
      key={msg.id}
      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          msg.sender === 'user'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
            : 'bg-slate-800/50 backdrop-blur-md border border-slate-700/50 text-slate-200'
        }`}
      >
        <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{displayText}</p>
        <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
      </div>
    </div>
  );
}
