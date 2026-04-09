import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Terminal, 
  History, 
  Shield, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Activity,
  X 
} from 'lucide-react';
import { cn } from '../../utils/cn';

const SidebarItem = ({ icon: Icon, label, to, onClick }) => (
  <NavLink 
    to={to}
    onClick={onClick}
    className={({ isActive }) => cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-300 group outline-none border border-transparent",
      isActive 
        ? "bg-primary/10 text-primary border-primary/20 shadow-[0_5px_15px_rgba(59,130,246,0.1)]" 
        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
    )}
  >
    <Icon className={cn("w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 shrink-0")} />
    <span className="font-semibold text-[13px] tracking-tight whitespace-nowrap overflow-hidden">{label}</span>
  </NavLink>
);

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop for Mobile */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside className={cn(
        "fixed left-0 top-0 bottom-0 z-50 border-r border-border bg-sidebar flex flex-col transition-transform duration-300 ease-in-out select-none w-60",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6 mb-4 h-20 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              <Activity className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-black text-lg tracking-tighter text-foreground uppercase">Arena</span>
          </div>

          <button 
            onClick={onClose}
            className="md:hidden p-1.5 hover:bg-white/5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          <div className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] mb-3 px-1">
            Discovery
          </div>
          
          <SidebarItem icon={Terminal} label="The Observatory" to="/" onClick={onClose} />
          <SidebarItem icon={History} label="Battle History" to="/history" onClick={onClose} />
          <SidebarItem icon={Shield} label="Leaderboard" to="/leaderboard" onClick={onClose} />
          
          <div className="pt-8">
            <div className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] mb-3 px-1">
              Configuration
            </div>
            <SidebarItem icon={LayoutDashboard} label="Model Bench" to="/models" onClick={onClose} />
            <SidebarItem icon={Settings} label="Preferences" to="/settings" onClick={onClose} />
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto px-4 py-6 border-t border-border/10">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut className="w-4.5 h-4.5 shrink-0" />
            <span className="font-semibold text-[13px] tracking-tight">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};


export default Sidebar;
