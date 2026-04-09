import React, { useState } from 'react';
import { Send, Command } from 'lucide-react';
import { cn } from '../../../utils/cn';

const MessageInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 md:left-64 right-0 p-6 bg-linear-to-t from-background via-background/90 to-transparent pointer-events-none">
      <div className="max-w-4xl mx-auto w-full pointer-events-auto">
        <form 
          onSubmit={handleSubmit}
          className="glass-dark rounded-2xl p-2 flex items-end gap-3 border-white/10 hover:border-primary/40 focus-within:border-primary/50 transition-all shadow-[0_-20px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="flex-1 min-w-0 py-2 px-3">
            <textarea
              rows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Query the Observatory arenas..."
              className="w-full bg-transparent border-none focus:outline-none text-sm text-foreground placeholder:text-muted-foreground resize-none py-1 custom-scrollbar max-h-32"
              style={{ height: 'auto' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
          
          <div className="flex items-center gap-2 p-1">
            <div className="hidden md:flex items-center gap-1.5 px-2 text-[10px] font-bold text-muted-foreground opacity-50 uppercase tracking-widest">
              <Command className="w-3 h-3" />
              <span>Enter</span>
            </div>
            <button
              type="submit"
              disabled={!value.trim() || disabled}
              className={cn(
                "p-2.5 rounded-xl transition-all active:scale-90 flex items-center justify-center shrink-0",
                value.trim() && !disabled
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  : "bg-white/5 text-muted-foreground cursor-not-allowed"
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
        <p className="text-[10px] text-center mt-3 text-muted-foreground font-bold tracking-[0.2em] opacity-30">
          PROPRIETARY ARENA ACCESS • V.4.2 PREMIUM
        </p>
      </div>
    </div>
  );
};

export default MessageInput;
