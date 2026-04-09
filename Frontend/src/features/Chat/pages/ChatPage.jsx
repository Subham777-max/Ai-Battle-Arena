import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PromptInput from '../components/PromptInput';
import ModelSolution from '../components/ModelSolution';
import JudgeOpinion from '../components/JudgeOpinion';
import MessageInput from '../components/MessageInput';
import MobileHeader from '../../Theme/MobileHeader';
import useIsMobile from '../../../hooks/useIsMobile';
import { useChats } from '../hooks/useChats';
import { Sparkles, Terminal, Activity, Zap, Loader2 } from 'lucide-react';

const ChatPage = ({ onMenuClick }) => {
  const isMobile = useIsMobile(1024);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const { currentChat, loading, invokeChat } = useChats();

  const handleSend = (value) => {
    setCurrentPrompt(value);
    invokeChat(value);
  };

  return (
    <div className="min-h-screen flex flex-col pb-32">
      <MobileHeader onMenuClick={onMenuClick} />
      
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full flex-1 space-y-8">
        {/* Top Banner - Compact (Desktop) */}
        <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/10">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tighter text-foreground uppercase leading-none">
                The Observatory
              </h1>
              <span className="text-[9px] font-bold text-primary uppercase tracking-[0.3em] mt-1.5 flex items-center gap-1.5 opacity-80">
                <Activity className="w-2.5 h-2.5" />
                Live Arena Duel
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white/5 border border-border/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <div className="w-4 h-4 rounded-full bg-blue-500 border border-background shadow-sm" />
                <div className="w-4 h-4 rounded-full bg-purple-500 border border-background shadow-sm" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-none">Cluster: Alpha-7</span>
            </div>
            <div className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-3 h-3 fill-primary" />
              v3.1 Stable
            </div>
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="space-y-10">
          {currentPrompt && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <PromptInput promptText={currentChat?.problem} />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 space-y-4"
              >
                <div className="relative">
                    <div className="absolute -inset-4 bg-primary/20 blur-xl animate-pulse rounded-full" />
                    <Loader2 className="w-10 h-10 text-primary animate-spin relative" />
                </div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] animate-pulse">
                  Analyzing architectural vectors...
                </p>
              </motion.div>
            ) : currentChat?.solution_1 && currentChat?.solution_2 ? (
              <motion.div 
                key="arena"
                className="space-y-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Duel Grid */}
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} items-stretch max-w-6xl mx-auto`}>
                  <ModelSolution title="Mistral" solution={currentChat.solution_1} />
                  <ModelSolution title="Cohere" solution={currentChat.solution_2} />
                </div>

                {/* Judge Section */}
                <JudgeOpinion judge={currentChat.judge} />
              </motion.div>
            ) : !currentChat?.problem ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center mb-2">
                  <Terminal className="w-8 h-8 text-muted-foreground/30" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-foreground/50 uppercase tracking-tighter">Awaiting Observation</h2>
                  <p className="text-xs text-muted-foreground/30 max-w-xs mx-auto font-medium">Input a technical query below to initiate a dual-model performance benchmark.</p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Persistent Message Input */}
      <MessageInput onSend={handleSend} disabled={loading} />
    </div>
  );
};

export default ChatPage;
