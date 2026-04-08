import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Bot, Copy, Check, Terminal, Activity } from 'lucide-react';
import { cn } from '../../../utils/cn';
import 'highlight.js/styles/github-dark.css'; // Standard highlight theme

const ModelSolution = ({ title, solution }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(solution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full glass rounded-xl overflow-hidden group transition-all duration-300 hover:border-primary/20 bg-background/20">
      {/* Header */}
      <div className="bg-white/5 px-4 py-2.5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center border border-primary/20">
            <Bot className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-[13px] text-foreground tracking-tight">{title}</h2>
          </div>
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 hover:bg-white/10 rounded-md text-muted-foreground transition-all active:scale-95"
          title="Copy"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-judge-good" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 overflow-auto custom-scrollbar prose prose-invert prose-slate max-w-none">
        <style dangerouslySetInnerHTML={{ __html: `
          .markdown-container pre {
            background-color: rgba(0, 0, 0, 0.4) !important;
            border: 1px solid rgba(255, 255, 255, 0.03);
            border-radius: 8px;
            padding: 0.75rem;
            margin: 1rem 0;
          }
          .markdown-container code {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85em;
          }
          .markdown-container p, .markdown-container li {
            font-size: 13.5px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.85);
          }
          .markdown-container h3 {
            font-size: 15px;
            margin-top: 1.25rem;
            margin-bottom: 0.5rem;
            color: var(--primary);
            font-weight: 700;
          }
        ` }} />
        <div className="markdown-container">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {solution}
          </ReactMarkdown>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="px-4 py-2 border-t border-border/30 bg-black/10 flex items-center justify-between text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3 h-3" />
          <span>v18.x Runtime</span>
        </div>
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3" />
          <span>1.2s</span>
        </div>
      </div>
    </div>
  );
};

export default ModelSolution;
