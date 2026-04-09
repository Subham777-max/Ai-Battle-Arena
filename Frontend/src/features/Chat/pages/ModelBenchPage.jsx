import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Server, Cpu, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react';
import MobileHeader from '../../Theme/MobileHeader';
import { useChats } from '../hooks/useChats';
import { cn } from '../../../utils/cn';

const ModelBench = ({ onMenuClick }) => {
  const { chats, fetchAllChats } = useChats();
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    fetchAllChats();
  }, []);

  const models = [
    {
      id: 'mistral',
      name: 'Mistral',
      version: 'v1.0',
      description: 'Advanced language model optimized for reasoning and code generation',
      specs: {
        'Parameters': '7B-12B',
        'Architecture': 'Transformer',
        'Context Window': '8K tokens',
        'Training Data': '500B tokens',
        'License': 'Open Source',
        'Type': 'Generalist'
      },
      capabilities: [
        { name: 'Code Generation', level: 90 },
        { name: 'Reasoning', level: 85 },
        { name: 'Language Understanding', level: 88 },
        { name: 'Creative Writing', level: 82 },
        { name: 'Mathematical Reasoning', level: 86 },
        { name: 'Domain Knowledge', level: 80 }
      ],
      features: [
        { icon: Zap, text: 'Fast Inference' },
        { icon: Server, text: 'Distributed Processing' },
        { icon: Cpu, text: 'GPU Optimized' },
        { icon: Clock, text: '~1.2s Response Time' }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'cohere',
      name: 'Cohere',
      version: 'v2.0',
      description: 'Enterprise-grade language model with strong semantic understanding',
      specs: {
        'Parameters': '10B-13B',
        'Architecture': 'Transformer+',
        'Context Window': '4K tokens',
        'Training Data': '450B tokens',
        'License': 'Proprietary',
        'Type': 'Generalist'
      },
      capabilities: [
        { name: 'Code Generation', level: 88 },
        { name: 'Reasoning', level: 84 },
        { name: 'Language Understanding', level: 90 },
        { name: 'Creative Writing', level: 85 },
        { name: 'Mathematical Reasoning', level: 82 },
        { name: 'Domain Knowledge', level: 85 }
      ],
      features: [
        { icon: Zap, text: 'High Throughput' },
        { icon: Server, text: 'API-First' },
        { icon: Cpu, text: 'Enterprise Grade' },
        { icon: Clock, text: '~1.5s Response Time' }
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const getBattleStats = (modelId) => {
    const isMistral = modelId === 'mistral';
    let wins = 0;
    let losses = 0;
    let averageScore = 0;
    let scores = [];

    chats.forEach(chat => {
      const score1 = chat.judge?.solution_1_score || 0;
      const score2 = chat.judge?.solution_2_score || 0;
      
      if (isMistral) {
        if (score1 > score2) wins++;
        else if (score2 > score1) losses++;
        scores.push(score1);
      } else {
        if (score2 > score1) wins++;
        else if (score1 > score2) losses++;
        scores.push(score2);
      }
    });

    if (scores.length > 0) {
      averageScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    }

    return { wins, losses, averageScore, totalMatches: chats.length };
  };

  const ModelSpecRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-b-0">
      <span className="text-sm text-muted-foreground/60 font-medium">{label}</span>
      <span className="text-sm font-black text-foreground">{value}</span>
    </div>
  );

  const CapabilityBar = ({ name, level }) => (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-xs font-medium text-muted-foreground/70">{name}</span>
        <span className="text-xs font-bold text-primary">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <MobileHeader onMenuClick={onMenuClick} />
      
      <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8 flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg">
              <Server className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-foreground uppercase">
                Model Benchmarks
              </h1>
              <p className="text-[11px] text-muted-foreground font-medium opacity-60 uppercase tracking-widest">
                Detailed Performance Analysis
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-1">
            {['overview', 'specs', 'performance'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-all",
                  selectedTab === tab
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {models.map((model, idx) => {
            const stats = getBattleStats(model.id);
            
            return (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-6"
              >
                {/* Model Card Header */}
                <div className="glass-dark rounded-2xl p-6 border-white/5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-black tracking-tighter text-foreground">{model.name}</h2>
                      <p className="text-xs text-muted-foreground/60 font-medium uppercase tracking-widest mt-1">
                        {model.version} • {model.type}
                      </p>
                    </div>
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br",
                      model.color
                    )}>
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{model.description}</p>
                </div>

                {/* Battle Stats Cards */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="glass-dark rounded-xl p-3 border-white/5 text-center">
                    <div className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest">Wins</div>
                    <div className="text-2xl font-black text-judge-good mt-1">{stats.wins}</div>
                  </div>
                  <div className="glass-dark rounded-xl p-3 border-white/5 text-center">
                    <div className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest">Losses</div>
                    <div className="text-2xl font-black text-judge-bad mt-1">{stats.losses}</div>
                  </div>
                  <div className="glass-dark rounded-xl p-3 border-white/5 text-center">
                    <div className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest">Avg Score</div>
                    <div className="text-2xl font-black text-primary mt-1">{stats.averageScore}</div>
                  </div>
                  <div className="glass-dark rounded-xl p-3 border-white/5 text-center">
                    <div className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest">Matches</div>
                    <div className="text-2xl font-black text-muted-foreground mt-1">{stats.totalMatches}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="glass-dark rounded-2xl p-6 border-white/5">
                  <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-4">Key Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {model.features.map((feature, i) => {
                      const IconComponent = feature.icon;
                      return (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5">
                          <IconComponent className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-xs font-medium text-muted-foreground/70">{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Conditional Content */}
                {selectedTab === 'specs' && (
                  <div className="glass-dark rounded-2xl p-6 border-white/5">
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-4">Specifications</h3>
                    <div className="space-y-0">
                      {Object.entries(model.specs).map(([label, value]) => (
                        <ModelSpecRow key={label} label={label} value={value} />
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === 'performance' && (
                  <div className="glass-dark rounded-2xl p-6 border-white/5">
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground mb-6">Capability Matrix</h3>
                    <div className="space-y-6">
                      {model.capabilities.map((cap, i) => (
                        <CapabilityBar key={i} name={cap.name} level={cap.level} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-8 flex items-center justify-center">
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">
            Benchmark Metrics • V.4.2 PREMIUM
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelBench;
