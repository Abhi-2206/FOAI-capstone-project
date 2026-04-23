import axios from 'axios';

const LEAD_WEBHOOK_URL = import.meta.env.VITE_N8N_LEAD_WEBHOOK_URL;
const CONTENT_WEBHOOK_URL = import.meta.env.VITE_N8N_CONTENT_WEBHOOK_URL;

export const submitLead = async (leadData) => {
  const formData = new URLSearchParams();
  formData.append("Full Name : ", leadData.fullName);
  formData.append("Email Address :", leadData.email);
  formData.append("Company Name : ", leadData.company);
  formData.append("Message", leadData.message);

  if (!LEAD_WEBHOOK_URL) {
    console.warn('VITE_N8N_LEAD_WEBHOOK_URL is not defined. Falling back to simulation.');
    await new Promise(r => setTimeout(r, 2000));
    return {
      score: 94,
      reason: "Fortune 500 company representative with high intent and specific technical requirements."
    };
  }

  try {
    const response = await axios.post(import.meta.env.VITE_N8N_LEAD_WEBHOOK_URL, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    // Handle n8n Form Trigger HTML response
    if (typeof response.data === 'string' && (response.data.includes('<!DOCTYPE html>') || response.data.includes('<html'))) {
      return {
        score: 'A+',
        reason: "Your lead was successfully injected into the AI pipeline. Our agents are analyzing it now.",
        status: 'Sent'
      };
    }

    return response.data;
  } catch (error) {
    console.error('Error submitting lead to n8n:', error);
    throw error;
  }
};

export const generateContent = async (params) => {
  const formData = new URLSearchParams();
  formData.append("Content Topic", params.topic);
  formData.append("Target Audience", params.audience);
  formData.append("Platform", params.platform);
  formData.append("Tone", params.tone);

  if (!CONTENT_WEBHOOK_URL) {
    console.warn('VITE_N8N_CONTENT_WEBHOOK_URL is not defined. Falling back to simulation.');
    await new Promise(r => setTimeout(r, 3000));
    return {
      blog: "## The Future of AI Automation\n\nArtificial Intelligence is no longer a futuristic concept...",
      linkedin: "🚀 AI is transforming the game!",
      instagram: "Visualizing the future of work with AI. ✨",
      twitter: "AI-powered workflows are the secret sauce for scaling in 2024."
    };
  }

  try {
    const response = await axios.post(import.meta.env.VITE_N8N_CONTENT_WEBHOOK_URL, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    // Handle n8n Form Trigger HTML response
    if (typeof response.data === 'string' && (response.data.includes('<!DOCTYPE html>') || response.data.includes('<html'))) {
      return {
        blog: "Synthesis in progress! Your content is being generated and will be updated in your Google Doc.",
        linkedin: "Check your LinkedIn automation queue for the latest draft.",
        instagram: "Instagram assets are being prepared.",
        twitter: "Threads are being optimized."
      };
    }

    return response.data;
  } catch (error) {
    console.error('Error generating content via n8n:', error);
    throw error;
  }
};
