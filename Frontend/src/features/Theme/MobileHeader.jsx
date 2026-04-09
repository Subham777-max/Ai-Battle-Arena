import React from 'react';
import { Menu, Activity, Shield } from 'lucide-react';

const MobileHeader = ({ onMenuClick }) => {
  return (
    <header className="md:hidden sticky top-0 z-40 w-full h-16 bg-sidebar/80 backdrop-blur-xl border-b border-border px-4 flex items-center justify-between">
      {/* <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
          <Activity className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="font-black text-lg tracking-tighter text-foreground uppercase">Arena</span>
      </div> */}
      
      <button 
        onClick={onMenuClick}
        className="p-2 hover:bg-white/5 rounded-xl text-muted-foreground transition-all active:scale-90"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};

export default MobileHeader;
