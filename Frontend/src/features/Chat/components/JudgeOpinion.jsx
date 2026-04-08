import React from 'react';
import { Scale, Star, Zap, Info, ChevronRight } from 'lucide-react';
import { cn } from '../../../utils/cn';

const ScoreBar = ({ label, score, colorClass }) => (
  <div className="space-y-1.5 flex-1 min-w-[120px]">
    <div className="flex justify-between items-end px-0.5">
      <span className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-[0.15em]">{label}</span>
      <span className={cn("text-lg font-black tracking-tighter", colorClass)}>{score}<span className="text-[9px] text-muted-foreground ml-0.5 opacity-50">/10</span></span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
      <div 
        className={cn("h-full transition-all duration-1000 ease-out", colorClass.replace('text-', 'bg-'))}
        style={{ width: `${score * 10}%`, boxShadow: `0 0 15px rgba(59, 130, 246, 0.2)` }}
      />
    </div>
  </div>
);

const ReasonCard = ({ title, reasoning, isWinner = false }) => (
  <div className={cn(
    "p-4 rounded-xl border transition-all duration-300",
    isWinner ? "bg-primary/5 border-primary/20 shadow-md" : "bg-white/5 border-white/10"
  )}>
    <div className="flex items-center gap-2 mb-2.5">
      {isWinner ? <Star className="w-3.5 h-3.5 text-primary fill-primary" /> : <Info className="w-3.5 h-3.5 text-muted-foreground/50" />}
      <h4 className={cn("text-[10px] font-black uppercase tracking-[0.15em]", isWinner ? "text-primary" : "text-muted-foreground/60")}>
        Result: {title}
      </h4>
    </div>
    <p className="text-[13px] leading-relaxed text-foreground/80 font-medium">
      {reasoning}
    </p>
  </div>
);

const JudgeOpinion = ({ judge }) => {
  const score1 = judge.solution_1_score;
  const score2 = judge.solution_2_score;
  
  const getScoreColor = (score) => {
    if (score >= 9) return 'text-judge-good';
    if (score >= 7) return 'text-judge-neutral';
    return 'text-judge-bad';
  };

  return (
    <div className="mt-8 mb-20 relative px-4 max-w-5xl mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-xl opacity-30 pointer-events-none" />
      
      <div className="relative glass rounded-2xl overflow-hidden border-white/5">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/10 shadow-inner">
                  <Scale className="w-4.5 h-4.5 text-orange-400" />
                </div>
                <h2 className="text-lg font-black tracking-tighter text-foreground uppercase">The Verdict</h2>
              </div>
              <p className="text-[11px] text-muted-foreground font-medium opacity-70">Synthesized evaluation of architectural performance.</p>
            </div>

            <div className="flex items-center gap-8 md:min-w-[300px]">
              <ScoreBar label="Engine Alpha" score={score1} colorClass={getScoreColor(score1)} />
              <ScoreBar label="Engine Beta" score={score2} colorClass={getScoreColor(score2)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReasonCard 
              title="Model A" 
              reasoning={judge.solution_1_reasoning} 
              isWinner={score1 >= score2} 
            />
            <ReasonCard 
              title="Model B" 
              reasoning={judge.solution_2_reasoning} 
              isWinner={score2 > score1} 
            />
          </div>
        </div>

        {/* Footer Meta */}
        <div className="bg-white/5 px-6 py-2.5 border-t border-border/20 flex items-center justify-between text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-primary/60">
              <Zap className="w-2.5 h-2.5 fill-primary/40" />
              <span>JUDGE V4</span>
            </div>
            <span>450ms Verification</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors group">
            <span>Detailed Analysis</span>
            <ChevronRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeOpinion;
