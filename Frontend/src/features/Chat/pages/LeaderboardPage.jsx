import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, TrendingUp, Zap, Activity, Award, Target } from 'lucide-react';
import MobileHeader from '../../Theme/MobileHeader';
import { useChats } from '../hooks/useChats';
import { cn } from '../../../utils/cn';

const calculateWinStats = (chats) => {
  let mistralWins = 0;
  let cohereWins = 0;
  let ties = 0;

  chats.forEach(chat => {
    const score1 = chat.judge?.solution_1_score || 0;
    const score2 = chat.judge?.solution_2_score || 0;
    
    if (score1 > score2) mistralWins++;
    else if (score2 > score1) cohereWins++;
    else ties++;
  });

  return { mistralWins, cohereWins, ties, total: chats.length };
};

const ModelCard = ({ rank, name, wins, totalMatches, isTop, icon: Icon }) => {
  const winRate = totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(1) : 0;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative group overflow-hidden rounded-2xl transition-all duration-300",
        isTop ? "md:col-span-1 lg:col-span-2" : "md:col-span-1"
      )}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10",
        isTop ? "from-primary/20 via-accent/20 to-primary/20" : "from-primary/10 to-accent/10"
      )} />
      
      <div className={cn(
        "relative glass-dark rounded-2xl p-6 md:p-8 border-white/5 group-hover:border-primary/30 transition-all",
        isTop && "bg-gradient-to-br from-primary/10 via-black/40 to-black/40"
      )}>
        {/* Rank Badge */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <div className={cn(
            "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center border font-black text-sm md:text-base",
            rank === 1 ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-400" :
            rank === 2 ? "bg-gray-400/20 border-gray-400/40 text-gray-300" :
            "bg-orange-600/20 border-orange-600/40 text-orange-400"
          )}>
            #{rank}
          </div>
        </div>

        {/* Top Badge */}
        {isTop && (
          <div className="absolute -top-1 -left-1">
            <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-br-lg">
              <Crown className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-[9px] font-black text-yellow-400 uppercase tracking-widest">Leader</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 md:gap-4 mb-6">
          <div className={cn(
            "flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center border",
            isTop ? "bg-primary/20 border-primary/40" : "bg-white/5 border-white/10"
          )}>
            <Icon className={cn(
              "w-6 h-6 md:w-7 md:h-7",
              isTop ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-black tracking-tighter uppercase truncate",
              isTop ? "text-xl md:text-2xl text-foreground" : "text-lg md:text-xl text-foreground/80"
            )}>
              {name}
            </h3>
            <p className="text-[10px] md:text-[11px] text-muted-foreground/60 font-medium uppercase tracking-widest">
              AI Model
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="space-y-1">
            <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.1em]">Wins</div>
            <div className={cn(
              "text-2xl md:text-3xl font-black tracking-tighter",
              wins > 5 ? "text-judge-good" : wins > 2 ? "text-judge-neutral" : "text-judge-bad"
            )}>
              {wins}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.1em]">Win Rate</div>
            <div className="text-2xl md:text-3xl font-black tracking-tighter text-primary">
              {winRate}%
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.1em]">Matches</div>
            <div className="text-2xl md:text-3xl font-black tracking-tighter text-muted-foreground">
              {totalMatches}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${winRate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={cn(
                "h-full rounded-full transition-all",
                wins > 5 ? "bg-judge-good/70" : wins > 2 ? "bg-judge-neutral/70" : "bg-judge-bad/70"
              )}
            />
          </div>
          <div className="text-[9px] text-muted-foreground/50 font-medium">Performance Index</div>
        </div>
      </div>
    </motion.div>
  );
};

const LeaderboardPage = ({ onMenuClick }) => {
  const { chats, fetchAllChats } = useChats();
  const [stats, setStats] = useState({ mistralWins: 0, cohereWins: 0, ties: 0, total: 0 });

  useEffect(() => {
    fetchAllChats();
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      setStats(calculateWinStats(chats));
    }
  }, [chats]);

  const leaderboard = [
    {
      rank: stats.mistralWins > stats.cohereWins ? 1 : 2,
      name: 'Mistral',
      wins: stats.mistralWins,
      totalMatches: stats.total,
      icon: TrendingUp
    },
    {
      rank: stats.cohereWins > stats.mistralWins ? 1 : 2,
      name: 'Cohere',
      wins: stats.cohereWins,
      totalMatches: stats.total,
      icon: Target
    }
  ].sort((a, b) => b.wins - a.wins);

  const topModel = leaderboard[0];

  return (
    <div className="min-h-screen flex flex-col">
      <MobileHeader onMenuClick={onMenuClick} />
      
      <div className="p-6 md:p-8 max-w-6xl mx-auto w-full space-y-8 flex-1">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter text-foreground uppercase">
                  Leaderboard
                </h1>
                <p className="text-[11px] text-muted-foreground font-medium opacity-60 uppercase tracking-widest flex items-center gap-1.5">
                  <Activity className="w-3 h-3" />
                  {stats.total} Total Matches
                </p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="flex items-center gap-4 flex-wrap justify-end">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                <div className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest">Ties</div>
                <div className="text-lg font-black text-muted-foreground">{stats.ties}</div>
              </div>
              <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-lg">
                <div className="text-[9px] text-primary/60 font-bold uppercase tracking-widest">Leader</div>
                <div className="text-lg font-black text-primary">{topModel.name}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max">
          {leaderboard.map((model, idx) => (
            <ModelCard
              key={model.name}
              rank={model.rank}
              name={model.name}
              wins={model.wins}
              totalMatches={model.totalMatches}
              isTop={idx === 0}
              icon={model.icon}
            />
          ))}
        </div>

        {/* Info Section */}
        {stats.total === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center mb-4 opacity-50">
              <Award className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground/40">No Matches Yet</h3>
            <p className="text-sm text-muted-foreground/40 mt-2">Complete some battles to see the leaderboard</p>
          </motion.div>
        )}

        {/* Footer */}
        <div className="pt-8 flex items-center justify-center">
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">
            Real-time Rankings • V.4.2
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
