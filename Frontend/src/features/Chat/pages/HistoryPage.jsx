import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, History, Trash2, ChevronRight, Activity, Zap, Terminal } from 'lucide-react';
import MobileHeader from '../../Theme/MobileHeader';
import { cn } from '../../../utils/cn';
import { useChats } from '../hooks/useChats';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString();
};

const getWinner = (chat) => {
  const score1 = chat.judge?.solution_1_score || 0;
  const score2 = chat.judge?.solution_2_score || 0;
  return score1 > score2 ? 'Mistral' : score2 > score1 ? 'Cohere' : 'Tie';
};

const HistoryCard = ({ battle, onClick }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    onClick={onClick}
    className="glass-dark rounded-xl p-4 border-white/5 hover:border-primary/20 transition-all group cursor-pointer relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="w-4 h-4 text-primary" />
    </div>
    
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
        <Terminal className="w-5 h-5 text-primary" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">
            {battle.problem}
          </h3>
          <span className="text-[10px] text-muted-foreground/50 whitespace-nowrap ml-4">{battle.formattedDate}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
            Mistral vs Cohere
          </div>
          <div className="flex items-center gap-1 text-[9px] font-black text-judge-good uppercase tracking-widest">
            <Zap className="w-2.5 h-2.5 fill-judge-good" />
            <span>Winner: {battle.winner}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const HistoryPage = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { chats, fetchAllChats, setCurrentChat } = useChats();

  useEffect(() => {
    fetchAllChats();
  }, []);

  const processedChats = chats.map(chat => ({
    ...chat,
    formattedDate: formatDate(chat.createdAt),
    winner: getWinner(chat)
  }));
  
  const filteredHistory = processedChats.filter(battle => 
    battle.problem.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHistoryClick = (chat) => {
    setCurrentChat(chat);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MobileHeader onMenuClick={onMenuClick} />
      
      <div className="p-6 md:p-8 max-w-5xl mx-auto w-full space-y-8 flex-1">
        {/* Header (Desktop) */}
        <div className="hidden md:flex flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg">
              <History className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-foreground uppercase">
                Battle History
              </h1>
              <p className="text-[11px] text-muted-foreground font-medium opacity-60 uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-3 h-3" />
                {chats.length} Sessions Logged
              </p>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search battles..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/30"
            />
          </div>
        </div>

        {/* Mobile Title & Search */}
        <div className="md:hidden space-y-4">
            <h1 className="text-xl font-black tracking-tighter text-foreground uppercase">History</h1>
            <div className="relative w-full group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-muted-foreground" />
                </div>
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search archives..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-primary/50 transition-all"
                />
            </div>
        </div>

        {/* History List */}
        <div className="grid gap-4 overflow-hidden py-1">
          <AnimatePresence mode='popLayout'>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((battle, idx) => (
                <HistoryCard key={idx} battle={battle} onClick={() => handleHistoryClick(battle)} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center mb-4 opacity-50">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground/40">No entries found</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer Info */}
        <div className="pt-8 flex items-center justify-center">
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">
              End of Archive • V.4.2
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
