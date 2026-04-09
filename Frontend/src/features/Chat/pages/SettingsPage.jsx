import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Palette, 
  Zap, 
  Terminal, 
  Bell, 
  Eye, 
  Volume2,
  Info,
  Code,
  GitBranch,
  Users,
  BarChart3
} from 'lucide-react';
import MobileHeader from '../../Theme/MobileHeader';
import { cn } from '../../../utils/cn';

const SettingGroup = ({ icon: Icon, title, description, children }) => (
  <div className="glass-dark rounded-2xl p-6 border-white/5 hover:border-white/10 transition-all">
    <div className="flex items-start gap-4 mb-6">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-black text-lg text-foreground uppercase tracking-tight">{title}</h3>
        <p className="text-xs text-muted-foreground/60 mt-1">{description}</p>
      </div>
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const ToggleSetting = ({ label, description, enabled = true }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all">
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      {description && <p className="text-xs text-muted-foreground/60 mt-0.5">{description}</p>}
    </div>
    <div className={cn(
      "w-10 h-6 rounded-full flex items-center transition-colors flex-shrink-0",
      enabled ? "bg-primary" : "bg-white/10"
    )}>
      <div className={cn(
        "w-5 h-5 rounded-full bg-white transition-transform",
        enabled ? "translate-x-4.5" : "translate-x-0.5"
      )} />
    </div>
  </div>
);

const SelectSetting = ({ label, value, options }) => (
  <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all">
    <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
    <div className="flex items-center gap-2">
      <div className="h-8 px-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center text-xs font-bold text-primary truncate">
        {value}
      </div>
    </div>
  </div>
);

const SliderSetting = ({ label, value, min = 0, max = 100, unit = '%' }) => (
  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <span className="text-xs font-bold text-primary">{value}{unit}</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
      />
    </div>
  </div>
);

const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
      <span className="text-xs font-semibold text-muted-foreground/70">{label}</span>
    </div>
    <span className="text-xs font-bold text-foreground">{value}</span>
  </div>
);

const SettingsPage = ({ onMenuClick }) => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <MobileHeader onMenuClick={onMenuClick} />
      
      <div className="p-6 md:p-8 max-w-6xl mx-auto w-full space-y-8 flex-1">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-foreground uppercase">
                Preferences
              </h1>
              <p className="text-[11px] text-muted-foreground font-medium opacity-60 uppercase tracking-widest">
                Customize Your Experience
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all border text-xs font-bold uppercase tracking-widest",
                  activeTab === tab.id
                    ? "bg-primary text-white border-primary"
                    : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
                )}
              >
                <TabIcon className="w-4 h-4 flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <SettingGroup
                icon={Terminal}
                title="Battle Settings"
                description="Control how your battles are conducted"
              >
                <ToggleSetting label="Auto-save Results" description="Automatically save battle results" />
                <ToggleSetting label="Notifications" description="Get notified when battles complete" />
                <SelectSetting label="Default Model Pair" value="Mistral vs Cohere" options={[]} />
              </SettingGroup>

              <SettingGroup
                icon={Bell}
                title="Notifications"
                description="Manage notification preferences"
              >
                <ToggleSetting label="Battle Completion" enabled={true} />
                <ToggleSetting label="New Benchmarks" enabled={true} />
                <ToggleSetting label="Leader Changes" enabled={false} />
                <ToggleSetting label="Email Digest" enabled={false} />
              </SettingGroup>

              <SettingGroup
                icon={Users}
                title="Data & Privacy"
                description="Manage your data and privacy settings"
              >
                <ToggleSetting label="Data Collection" description="Help improve models with anonymized data" />
                <ToggleSetting label="Public Profile" description="Show your statistics publicly" enabled={false} />
              </SettingGroup>
            </motion.div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <SettingGroup
                icon={Palette}
                title="Theme"
                description="Customize the visual appearance"
              >
                <SelectSetting label="Color Scheme" value="Dark Mode" options={['Dark Mode', 'Light Mode', 'Auto']} />
                <SelectSetting label="Accent Color" value="Blue" options={['Blue', 'Purple', 'Green']} />
              </SettingGroup>

              <SettingGroup
                icon={Eye}
                title="Display"
                description="Adjust display preferences"
              >
                <ToggleSetting label="Animations" description="Enable smooth animations and transitions" />
                <ToggleSetting label="Reduced Motion" description="Minimize animation effects" enabled={false} />
                <ToggleSetting label="High Contrast" description="Increase visual contrast for accessibility" enabled={false} />
              </SettingGroup>

              <SettingGroup
                icon={Volume2}
                title="Media"
                description="Audio and visual feedback settings"
              >
                <ToggleSetting label="Sound Effects" description="Enable notification sounds" enabled={false} />
                <SliderSetting label="Volume Level" value={75} min={0} max={100} unit="%" />
              </SettingGroup>
            </motion.div>
          )}

          {/* Performance Settings */}
          {activeTab === 'performance' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <SettingGroup
                icon={Zap}
                title="Request Optimization"
                description="Optimize network and response settings"
              >
                <SelectSetting label="Request Timeout" value="30 seconds" options={['15s', '30s', '60s']} />
                <SliderSetting label="Retry Attempts" value={3} min={1} max={5} unit="" />
              </SettingGroup>

              <SettingGroup
                icon={Code}
                title="Cache & Storage"
                description="Manage local caching behavior"
              >
                <ToggleSetting label="Cache Results" description="Store results locally for faster access" />
                <ToggleSetting label="Auto Clear Cache" description="Clear cache weekly" />
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-center">
                  <p className="text-xs font-semibold text-muted-foreground/60">Cache Size: 2.4 MB</p>
                </div>
              </SettingGroup>

              <SettingGroup
                icon={BarChart3}
                title="Analytics"
                description="Control analytics and tracking"
              >
                <ToggleSetting label="Usage Analytics" description="Help improve the platform" />
                <ToggleSetting label="Error Reporting" description="Automatically report errors" />
              </SettingGroup>
            </motion.div>
          )}

          {/* About Settings */}
          {activeTab === 'about' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <SettingGroup
                icon={Info}
                title="About Arena"
                description="Product information and credits"
              >
                <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <p className="text-sm text-foreground font-semibold mb-2">AI Battle Arena</p>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">
                    A cutting-edge platform for benchmarking and comparing state-of-the-art AI models in real-time battles. Compare solutions, evaluate performance, and discover the best model for your use case.
                  </p>
                </div>
              </SettingGroup>

              <SettingGroup
                icon={GitBranch}
                title="Version Info"
                description="Current build and system information"
              >
                <InfoCard icon={Settings} label="Application Version" value="4.2.0" />
                <InfoCard icon={Code} label="API Version" value="v1.0" />
                <InfoCard icon={BarChart3} label="Build Number" value="2024.094" />
                <InfoCard icon={GitBranch} label="Last Updated" value="Apr 9, 2026" />
              </SettingGroup>

              <SettingGroup
                icon={Users}
                title="Credits & Attribution"
                description="Built with open-source technologies"
              >
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <p className="text-xs font-semibold text-foreground/70">React & Vite</p>
                    <p className="text-[10px] text-muted-foreground/50 mt-1">Frontend framework & build tool</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <p className="text-xs font-semibold text-foreground/70">Tailwind CSS & Framer Motion</p>
                    <p className="text-[10px] text-muted-foreground/50 mt-1">Styling and animation libraries</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <p className="text-xs font-semibold text-foreground/70">LangChain & Graph StateEngine</p>
                    <p className="text-[10px] text-muted-foreground/50 mt-1">Backend AI orchestration</p>
                  </div>
                </div>
              </SettingGroup>

              <SettingGroup
                icon={Terminal}
                title="Support"
                description="Get help and report issues"
              >
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground">
                    Documentation
                  </button>
                  <button className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground">
                    Report Issue
                  </button>
                </div>
              </SettingGroup>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-8 flex items-center justify-center">
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">
            Settings • Read Only Mode • V.4.2
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
