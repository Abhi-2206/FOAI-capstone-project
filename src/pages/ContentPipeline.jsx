import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  Copy, 
  RefreshCcw, 
  Save, 
  FileText, 
  Image, 
  MessageSquare,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { generateContent } from '../services/api';

const ContentPipeline = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    audience: '',
    platform: 'LinkedIn',
    tone: ''
  });

  const [generatedResults, setGeneratedResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      const response = await generateContent(formData);
      setGeneratedResults(response);
      setIsGenerating(false);
      setShowResults(true);
      toast.success('Content generated successfully!');
    } catch (error) {
      setIsGenerating(false);
      toast.error('AI Synthesis Failed. Please try again.');
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  // Mock data moved to api.js fallback

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-text-primary font-heading tracking-tight">
            Content <span className="text-indigo-500">Generator</span>
          </h1>
          <p className="text-text-muted mt-2 font-body">Harness Groq Llama-3.1 to synthesize multi-platform content.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <div className="glass-card p-8 sticky top-28">
            <h3 className="text-lg font-bold text-text-primary font-heading mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-indigo-500" />
              Generation Parameters
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Content Topic</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-border-subtle/50 border border-border-subtle rounded-xl px-4 py-3 text-text-secondary text-sm focus:border-indigo-500/50 focus:ring-0 transition-all placeholder:text-text-muted/40"
                  placeholder="e.g. Future of AI Automation"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Target Audience</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-border-subtle/50 border border-border-subtle rounded-xl px-4 py-3 text-text-secondary text-sm focus:border-indigo-500/50 focus:ring-0 transition-all placeholder:text-text-muted/40"
                  placeholder="e.g. Tech Founders"
                  value={formData.audience}
                  onChange={(e) => setFormData({...formData, audience: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Primary Platform</label>
                <select 
                  className="w-full bg-border-subtle/50 border border-border-subtle rounded-xl px-4 py-3 text-text-secondary text-sm focus:border-indigo-500/50 focus:ring-0 transition-all appearance-none"
                  value={formData.platform}
                  onChange={(e) => setFormData({...formData, platform: e.target.value})}
                >
                  <option className="bg-card-bg">LinkedIn</option>
                  <option className="bg-card-bg">Instagram</option>
                  <option className="bg-card-bg">Twitter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Tone of Voice</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-border-subtle/50 border border-border-subtle rounded-xl px-4 py-3 text-text-secondary text-sm focus:border-indigo-500/50 focus:ring-0 transition-all placeholder:text-text-muted/40"
                  placeholder="e.g. Professional, Witty"
                  value={formData.tone}
                  onChange={(e) => setFormData({...formData, tone: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                disabled={isGenerating}
                className="btn-primary w-full justify-center py-4 mt-4"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Synthesizing...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Content
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!showResults && !isGenerating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-white/5 rounded-[2.5rem]"
              >
                <div className="w-20 h-20 rounded-full bg-border-subtle flex items-center justify-center mb-6">
                  <Sparkles size={32} className="text-text-muted opacity-30" />
                </div>
                <h3 className="text-xl font-bold text-text-primary font-heading">Ready for Synthesis</h3>
                <p className="text-text-muted mt-2 max-w-sm">Fill in the parameters on the left to generate high-conversion content across 4 platforms simultaneously.</p>
              </motion.div>
            )}

            {isGenerating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-10 bg-indigo-500/5 border border-indigo-500/10 rounded-[2.5rem]"
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu size={32} className="text-indigo-500 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-text-primary font-heading">AI is generating your content...</h3>
                <p className="text-indigo-400 mt-4 font-mono text-xs uppercase tracking-[4px]">Accessing Groq Llama-3.1-8b-instant</p>
                
                <div className="mt-10 w-full max-w-xs space-y-3">
                  {['Analyzing Topic', 'Structuring Blog Post', 'Optimizing Social Hooks', 'Finalizing Meta Tags'].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${i < 2 ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-text-muted opacity-20'}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${i < 2 ? 'text-indigo-500' : 'text-text-muted'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {showResults && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <ResultCard 
                  title="Blog Post" 
                  icon={FileText} 
                  content={generatedResults?.blog} 
                  color="indigo" 
                  onCopy={() => handleCopy(generatedResults?.blog)}
                />
                <ResultCard 
                  title="LinkedIn Caption" 
                  icon={Share2} 
                  content={generatedResults?.linkedin} 
                  color="blue" 
                  onCopy={() => handleCopy(generatedResults?.linkedin)}
                />
                <ResultCard 
                  title="Instagram Caption" 
                  icon={Image} 
                  content={generatedResults?.instagram} 
                  color="pink" 
                  onCopy={() => handleCopy(generatedResults?.instagram)}
                />
                <ResultCard 
                  title="Twitter Caption" 
                  icon={MessageSquare} 
                  content={generatedResults?.twitter} 
                  color="sky" 
                  onCopy={() => handleCopy(generatedResults?.twitter)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ResultCard = ({ title, icon: Icon, content, color, onCopy }) => {
  return (
    <div className="glass-card p-6 flex flex-col h-full group">
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 text-${color}-400`}>
          <Icon size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">{title}</span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={onCopy}
            className="p-2 rounded-lg bg-border-subtle border border-border-subtle text-text-muted hover:text-text-primary hover:bg-border-subtle transition-all"
            title="Copy"
          >
            <Copy size={14} />
          </button>
          <button className="p-2 rounded-lg bg-border-subtle border border-border-subtle text-text-muted hover:text-text-primary hover:bg-border-subtle transition-all" title="Regenerate">
            <RefreshCcw size={14} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-[150px] bg-border-subtle rounded-xl p-4 text-text-secondary text-sm leading-relaxed overflow-y-auto">
        {content}
      </div>

      <button className="w-full mt-4 py-3 rounded-xl bg-border-subtle border border-border-subtle text-text-muted text-[10px] font-bold uppercase tracking-widest hover:bg-border-subtle hover:text-text-primary transition-all flex items-center justify-center gap-2">
        <Save size={14} />
        Save to Google Doc
      </button>
    </div>
  );
};

export default ContentPipeline;
