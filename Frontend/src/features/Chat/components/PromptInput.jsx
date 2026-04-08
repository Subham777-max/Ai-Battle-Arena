import React from 'react';
import { User, Sparkles } from 'lucide-react';
import { cn } from '../../../utils/cn';

const PromptInput = ({ promptText }) => {
  if (!promptText) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mb-10 px-4">
      <div className="flex items-start gap-4 group">
        {/* User Icon */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-lg border border-white/10 group-hover:scale-105 transition-transform">
          <User className="w-5 h-5 text-white" />
        </div>
        
        {/* Text Area */}
        <div className="flex-1 space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles className="w-3 h-3 animate-pulse" />
              Researcher Intelligence
            </h3>
            <span className="text-[10px] text-muted-foreground/50 font-medium">Just now</span>
          </div>
          
          <div className="glass-dark rounded-2xl rounded-tl-none p-5 border-white/5 group-hover:border-primary/20 transition-colors shadow-xl">
            <p className="text-[15px] font-medium text-foreground/90 leading-relaxed tracking-tight">
              {promptText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
