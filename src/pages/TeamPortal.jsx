import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Copy,
  RefreshCcw,
  Loader2,
  FileText,
  Image,
  MessageSquare,
  Share2,
  Zap,
  ArrowLeft,
  ArrowRight,
  Database,
  Mail,
  Brain,
  Filter,
  FileEdit,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { generateContent } from '../services/api';
import WorkflowAnimation from '../components/ui/WorkflowAnimation';

// --- Result Card ---
const ResultCard = ({ title, icon: Icon, content, color, onCopy }) => {
  const colorMap = {
    indigo: { bg: '#eef2ff', text: '#6366f1', border: '#e0e7ff' },
    blue: { bg: '#eff6ff', text: '#3b82f6', border: '#dbeafe' },
    pink: { bg: '#fdf2f8', text: '#ec4899', border: '#fce7f3' },
    sky: { bg: '#f0f9ff', text: '#0ea5e9', border: '#e0f2fe' },
  };
  const c = colorMap[color] || colorMap.indigo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="portal-result-card"
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: c.text }}>
          <Icon size={18} />
          <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</span>
        </div>
        <button
          onClick={onCopy}
          style={{
            padding: '0.5rem',
            borderRadius: '0.5rem',
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            color: '#6b7280',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          title="Copy"
        >
          <Copy size={14} />
        </button>
      </div>
      <div style={{
        flex: 1,
        minHeight: '150px',
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '0.75rem',
        padding: '1rem',
        color: '#374151',
        fontSize: '0.875rem',
        lineHeight: 1.7,
        overflowY: 'auto',
        whiteSpace: 'pre-wrap',
      }}>
        {content}
      </div>
    </motion.div>
  );
};

// --- Workflow Step Component ---
const WorkflowStep = ({ icon: Icon, label, color, isLast }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.35rem',
      minWidth: '80px',
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '0.75rem',
        background: color + '15',
        border: `1.5px solid ${color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
      }}>
        <Icon size={20} />
      </div>
      <span style={{
        fontSize: '0.55rem',
        fontWeight: 700,
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        textAlign: 'center',
        lineHeight: 1.3,
        maxWidth: '80px',
      }}>{label}</span>
    </div>
    {!isLast && (
      <div style={{ display: 'flex', alignItems: 'center', margin: '0 0.25rem', marginBottom: '1.25rem' }}>
        <ArrowRight size={14} style={{ color: '#d1d5db' }} />
      </div>
    )}
  </div>
);

// --- Main Portal ---
const TeamPortal = () => {
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

  const handleReset = () => {
    setShowResults(false);
    setGeneratedResults(null);
    setFormData({ topic: '', audience: '', platform: 'LinkedIn', tone: '' });
  };

  const inputStyle = {
    width: '100%',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    color: '#1f2937',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.65rem',
    fontWeight: 800,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '0.5rem',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)', fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: '12px', background: '#fff', color: '#1f2937', border: '1px solid #e5e7eb' },
        }}
      />

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#6b7280',
                fontSize: '0.75rem',
                fontWeight: 700,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'color 0.2s',
              }}
            >
              <ArrowLeft size={16} />
              Back to Site
            </a>
            <div style={{ width: '1px', height: '24px', background: '#e5e7eb' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: '#6366f1',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
              }}>
                <Zap size={18} fill="currentColor" />
              </div>
              <div>
                <span style={{ fontSize: '1rem', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.02em' }}>
                  LeadGen<span style={{ color: '#6366f1' }}>.ai</span>
                </span>
                <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.15em', marginLeft: '0.5rem', background: '#eef2ff', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                  Team Portal
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Status</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#22c55e' }}>Online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* N8N Workflow Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}
        >
          {/* Pipeline 1: Lead Management */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <Suspense fallback={null}>
              <WorkflowAnimation color="#ef4444" style={{ opacity: 0.4 }} />
            </Suspense>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0.75rem',
                  background: '#fef2f2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444',
                }}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>Lead Management Pipeline</h3>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Pipeline 1 · Automated Scoring & Routing</p>
                </div>
              </div>
              <p style={{ fontSize: '0.825rem', color: '#6b7280', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Triggers when a new lead is submitted via Google Form. The AI scores each lead (0–100), auto-replies via Gmail, logs data to Google Sheets, and sends priority alerts for high-value leads.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0',
                overflowX: 'auto',
                padding: '0.5rem 0',
              }}>
                <WorkflowStep icon={Database} label="Google Sheets Trigger" color="#22c55e" />
                <WorkflowStep icon={FileEdit} label="Extract Latest Row" color="#8b5cf6" />
                <WorkflowStep icon={Brain} label="Groq LLM Scoring" color="#6366f1" />
                <WorkflowStep icon={Filter} label="Score > 80?" color="#f59e0b" />
                <WorkflowStep icon={Mail} label="Auto Email & Alert" color="#ef4444" isLast />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {['Groq LLM', 'Google Sheets', 'Gmail', 'Structured JSON'].map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    color: '#6366f1',
                    background: '#eef2ff',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Pipeline 2: Content Generation */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <Suspense fallback={null}>
              <WorkflowAnimation color="#6366f1" style={{ opacity: 0.4 }} />
            </Suspense>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0.75rem',
                  background: '#eef2ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6366f1',
                }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>Content Generation Pipeline</h3>
                  <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Pipeline 2 · AI Multi-Platform Content</p>
                </div>
              </div>
              <p style={{ fontSize: '0.825rem', color: '#6b7280', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Accepts a content request via form, runs it through Groq Llama-3.1 to generate a blog post, LinkedIn caption, Instagram caption, and Twitter caption — then saves everything to a Google Doc.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0',
                overflowX: 'auto',
                padding: '0.5rem 0',
              }}>
                <WorkflowStep icon={FileText} label="Form Submission" color="#3b82f6" />
                <WorkflowStep icon={Brain} label="Groq Llama-3.1" color="#6366f1" />
                <WorkflowStep icon={FileEdit} label="Parse JSON" color="#8b5cf6" />
                <WorkflowStep icon={CheckCircle2} label="Save to Google Doc" color="#22c55e" isLast />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {['Llama 3.1', 'Google Docs', 'n8n Form', 'JSON Parse'].map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    color: '#6366f1',
                    background: '#eef2ff',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Generator — Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ maxWidth: '640px', margin: '0 auto' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
              Content <span style={{ color: '#6366f1' }}>Generator</span>
            </h1>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
              Harness Groq Llama-3.1 to synthesize multi-platform content.
            </p>
          </div>

          {/* Form Card */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            marginBottom: '2rem',
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} style={{ color: '#6366f1' }} />
              Generation Parameters
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Content Topic</label>
                  <input
                    type="text"
                    required
                    style={inputStyle}
                    placeholder="e.g. Future of AI Automation"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Target Audience</label>
                  <input
                    type="text"
                    required
                    style={inputStyle}
                    placeholder="e.g. Tech Founders"
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Primary Platform</label>
                  <select
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  >
                    <option>LinkedIn</option>
                    <option>Instagram</option>
                    <option>Twitter</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Tone of Voice</label>
                  <input
                    type="text"
                    required
                    style={inputStyle}
                    placeholder="e.g. Professional, Witty"
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  borderRadius: '0.75rem',
                  background: isGenerating ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem',
                  transition: 'all 0.2s',
                  boxShadow: isGenerating ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)',
                }}
              >
                {isGenerating ? (
                  <><Loader2 size={18} className="animate-spin" /> Synthesizing...</>
                ) : (
                  <><Sparkles size={18} /> Generate Content</>
                )}
              </button>

              {showResults && (
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    background: '#f3f4f6',
                    color: '#6b7280',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                  }}
                >
                  <RefreshCcw size={14} /> Reset & Generate New
                </button>
              )}
            </form>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '2.5rem',
                  background: '#eef2ff',
                  border: '1px solid #e0e7ff',
                  borderRadius: '1.5rem',
                }}
              >
                <div style={{ position: 'relative', marginBottom: '2rem' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '4px solid #e0e7ff',
                    borderTopColor: '#6366f1',
                    animation: 'spin 1s linear infinite',
                  }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1a1a1a', marginBottom: '0.5rem' }}>AI is generating your content...</h3>
                <p style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  Accessing Groq Llama-3.1-8b-instant
                </p>

                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['Analyzing Topic', 'Structuring Blog Post', 'Optimizing Social Hooks', 'Finalizing Output'].map((step, i) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: i < 2 ? '#6366f1' : '#d1d5db',
                        boxShadow: i < 2 ? '0 0 8px rgba(99,102,241,0.5)' : 'none',
                      }} />
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em',
                        color: i < 2 ? '#6366f1' : '#9ca3af',
                      }}>{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {showResults && generatedResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}
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
        </motion.div>
      </main>

      {/* Portal-specific styles */}
      <style>{`
        .portal-result-card:hover {
          border-color: #c7d2fe !important;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.08) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 640px) {
          .portal-grid-form {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamPortal;
