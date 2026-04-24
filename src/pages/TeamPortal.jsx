import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
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
  FileText,
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import WorkflowAnimation from '../components/ui/WorkflowAnimation.jsx';



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
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScTo-ZELvdYppbRBxRITsI47AYbNepFrNVEwLi5DhZIdiONlQ/viewform?usp=dialog";



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

        {/* Content Generator Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.04em', marginBottom: '0.75rem' }}>
              Content <span style={{ color: '#6366f1' }}>Generator</span>
            </h1>
            <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
              Harness Groq Llama-3.1 to synthesize multi-platform content. Click below to start the generation process.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(GOOGLE_FORM_URL, '_blank')}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '1.25rem',
              borderRadius: '1.25rem',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              fontWeight: 800,
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              boxShadow: '0 12px 30px -10px rgba(99, 102, 241, 0.5)',
              transition: 'all 0.3s ease',
            }}
          >
            <Sparkles size={22} />
            Generate content
          </motion.button>

          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af' }}>
              <CheckCircle2 size={16} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Multi-Platform</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af' }}>
              <Zap size={16} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Instant AI</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af' }}>
              <FileText size={16} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Google Doc Export</span>
            </div>
          </div>
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
