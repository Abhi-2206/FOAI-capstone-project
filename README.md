# LeadGen AI | Premium SaaS Frontend

A modern, high-performance lead management and content generation frontend built with React, Tailwind CSS, and Framer Motion. This project is designed to integrate seamlessly with **n8n** automation workflows via REST API webhooks.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Rename `.env.example` to `.env` and add your n8n webhook URL:
   ```env
   VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🏗️ Technical Architecture

- **Logic**: React 19 + Functional Components + Custom Hooks.
- **Styling**: Tailwind CSS v4 (Modern, utility-first approach with CSS variables).
- **Animations**: Framer Motion for orchestral staggered entrance and exit transitions.
- **Data Flow**: Axios-based service layer (`src/services/api.js`) for centralized webhook management.
- **UI Components**: Atomic design structure using reusable UI primitives in `src/components/ui`.

## 🛠️ Key Modules

- **Dashboard**: High-level telemetry with Recharts for acquisition visualization.
- **Intelligence Hub**: Sophisticated lead table with priority scoring and detailed side-panels.
- **Campaign Form**: Lead generation entry point with integrated loading/success states.
- **Synthetic Grid**: Card-based repository for AI-generated marketing assets.

## 🎨 Design Principles

- **Precision**: Pixel-perfect spacing and consistent component sizing.
- **Elegance**: A refined dark theme with subtle glassmorphism and depth.
- **Speed**: Skeleton loaders and optimized Framer Motion variants for a "zero-latency" feel.

---
Built with ❤️ for High-Performance SaaS Teams.
