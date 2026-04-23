import React, { useEffect, useState, useRef, Suspense } from 'react';
import {
  motion,
  AnimatePresence
} from 'framer-motion';
import {
  Zap,
  Target,
  MessageSquare,
  PenTool,
  Database,
  Share2,
  Bell,
  ArrowRight,
  Menu,
  X,
  User,
  ArrowUpRight,
  TrendingUp,
  Users,
  ShieldCheck,
  Globe,
  Cpu,
  Sparkles,
  Layers,
  Activity,
  Bot
} from 'lucide-react';
import Hero3D from '../components/ui/Hero3D';
import About3D from '../components/ui/About3D';
import Globe3D from '../components/ui/Globe3D';
import DataStream3D from '../components/ui/DataStream3D';



// --- Variants ---

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

// --- Components ---

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
  ];


  const handleContactClick = () => {
    window.open(import.meta.env.VITE_CONTACT_FORM_URL, '_blank');
  };

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-4 shadow-sm border-b border-gray-100' : 'bg-transparent py-8'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
          onClick={(e) => scrollToSection(e, '#home')}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
            <Zap size={22} fill="currentColor" />
          </div>
          <span className="text-xl font-black text-[#1a1a1a] tracking-tighter uppercase">LeadGen<span className="text-blue-600">.ai</span></span>
        </motion.div>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-bold text-[#1a1a1a]/60 hover:text-blue-600 transition-all uppercase tracking-widest"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleContactClick}
            className="bg-[#1a1a1a] text-white text-[10px] font-black px-8 py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95 uppercase tracking-widest"
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-[#1a1a1a]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-4 right-4 bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-[2rem] mt-4 p-8 flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-2xl font-black text-[#1a1a1a]"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-50/50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[3px] mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              v4.0 Neural Core Active
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-[110px] font-black text-[#1a1a1a] leading-[0.9] tracking-tighter mb-8"
            >
              Marketing at <br />
              <span className="text-blue-600">Intelligence Scale.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 leading-relaxed font-medium"
            >
              We deploy custom neural architectures that handle your lead generation, content creation, and scaling automatically.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(import.meta.env.VITE_CONTACT_FORM_URL, '_blank')}
                className="group relative bg-[#1a1a1a] text-white font-black px-12 py-6 rounded-2xl transition-all shadow-xl hover:shadow-blue-600/20 uppercase tracking-widest text-xs overflow-hidden text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Initiate Partnership <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>

              <div className="flex items-center gap-4 px-4 justify-center sm:justify-start border-l border-gray-100 ml-0 sm:ml-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className={`w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400`}
                    >
                      <User size={14} />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-black text-[#1a1a1a] uppercase tracking-wider">500+ Active Nodes</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SectionHeading = ({ subtitle, title, dark = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <p className={`text-[10px] font-black ${dark ? 'text-blue-400' : 'text-blue-600'} uppercase tracking-[6px] mb-4`}>
        {subtitle}
      </p>
      <h3
        className={`text-5xl lg:text-8xl font-black ${dark ? 'text-white' : 'text-[#1a1a1a]'} leading-[0.95] tracking-tighter`}
        dangerouslySetInnerHTML={{ __html: title }}
      />

    </motion.div>
  );
};

const Services = () => {
  const services = [
    { icon: Bot, title: 'Neural Scoring', desc: 'Predict lead lifetime value with 99% accuracy using our custom Llama-3 clusters.', color: 'blue' },
    { icon: Activity, title: 'Pulse Automation', desc: 'Real-time multi-channel follow-ups that sound indistinguishable from humans.', color: 'indigo' },
    { icon: Layers, title: 'Synthesis AI', desc: 'Automated content pipelines that generate high-conversion assets at scale.', color: 'purple' },
    { icon: Database, title: 'Core Connect', desc: 'Deep-level CRM architecture that synchronizes your entire business intelligence.', color: 'sky' },
    { icon: Share2, title: 'Viral Velocity', desc: 'Autonomous social engines that detect and ride trends before they peak.', color: 'pink' },
    { icon: ShieldCheck, title: 'Protocol Security', desc: 'Enterprise-grade data encryption for all your lead and customer information.', color: 'emerald' },
  ];

  return (
    <section id="services" className="py-24 lg:py-48 bg-gray-50/50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Capabilities" title="Elite Agency Infrastructure." />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
              className="bg-white p-12 rounded-[3rem] border border-gray-100 transition-all duration-500 group cursor-default"
            >
              <div className={`w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-lg shadow-blue-600/5`}>
                <service.icon size={28} />
              </div>
              <h4 className="text-2xl font-black text-[#1a1a1a] mb-4 tracking-tight">{service.title}</h4>
              <p className="text-gray-400 font-medium leading-relaxed text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: 'Ingestion', desc: 'Signals captured via form, email, or social API.', icon: Database },
    { title: 'Neural Analysis', desc: 'AI scores intent and selects the optimal path.', icon: Cpu },
    { title: 'Synthesis', desc: 'Personalized assets and replies are generated.', icon: PenTool },
    { title: 'Conversion', desc: 'Your team closes the pre-qualified opportunity.', icon: Target },
  ];

  return (
    <section id="process" className="py-24 lg:py-48 bg-[#1a1a1a] rounded-[5rem] mx-4 lg:mx-10 my-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="The Protocol" title="How We Automate Victory." dark />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-20"
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeInUp} className="relative">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 3 }}
                className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-10 relative group"
              >
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-blue-600 text-white text-[12px] font-black flex items-center justify-center">
                  0{i + 1}
                </div>
                <step.icon size={40} />
              </motion.div>
              <h4 className="text-2xl font-black text-white mb-4 tracking-tight">{step.title}</h4>
              <p className="text-white/40 font-medium text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-16 rounded-[4rem] bg-blue-600 text-white shadow-3xl shadow-blue-600/20 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          <div>
            <h4 className="text-5xl font-black mb-6 tracking-tighter leading-none">Ready for Full Deployment?</h4>
            <p className="text-white/80 text-xl font-medium">Your autonomous engine is standing by.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(import.meta.env.VITE_CONTACT_FORM_URL, '_blank')}
            className="inline-block bg-white text-[#1a1a1a] font-black px-12 py-6 rounded-2xl uppercase tracking-widest text-xs shadow-2xl whitespace-nowrap"
          >
            Initiate Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 lg:py-48 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading subtitle="System Origin" title="Engineered for <br/> Precision." />
            <p className="text-gray-400 text-xl leading-relaxed mb-12 font-medium">
              We replaced manual overhead with high-frequency neural networks to give you an unfair market advantage.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 text-center"
              >
                <p className="text-5xl font-black text-[#1a1a1a] mb-2 tracking-tighter">99.9%</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Uptime</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 text-center"
              >
                <p className="text-5xl font-black text-[#1a1a1a] mb-2 tracking-tighter">&lt; 150ms</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px]">Latency</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square rounded-[4rem] bg-[#1a1a1a] p-16 flex flex-col justify-between relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent opacity-50" />
            <div className="space-y-12 relative z-10">

              {[
                { icon: Zap, text: 'Quantum Core', color: 'blue' },
                { icon: Users, text: 'Neural Audience', color: 'indigo' },
                { icon: Activity, text: 'Pulse Feedback', color: 'purple' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500 border border-white/10">
                    <item.icon size={28} fill="currentColor" />
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">{item.text}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const team = [
    { name: 'Alex Rivera', role: 'Chief Architect', initials: 'AR' },
    { name: 'Sarah Chen', role: 'Head of AI', initials: 'SC' },
    { name: 'James Wilson', role: 'Growth Lead', initials: 'JW' },
  ];

  return (
    <section id="team" className="py-24 lg:py-48 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Council" title="Expert Intelligence." />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24"
        >
          {team.map((member, i) => (
            <motion.div key={i} variants={fadeInUp} className="text-center group">
              <div className="relative mb-10 mx-auto w-56 h-56">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.05 }}
                  className="absolute inset-0 bg-blue-100 rounded-[4rem] rotate-6 transition-transform duration-500"
                />
                <motion.div
                  whileHover={{ y: -10, x: -10 }}
                  className="absolute inset-0 bg-white border border-gray-100 rounded-[4rem] flex items-center justify-center text-5xl font-black text-[#1a1a1a] shadow-xl transition-all duration-500"
                >
                  {member.initials}
                </motion.div>
              </div>
              <h4 className="text-3xl font-black text-[#1a1a1a] mb-2 tracking-tight">{member.name}</h4>
              <p className="text-blue-600 text-[10px] font-black uppercase tracking-[4px] mb-6">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 lg:py-48 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #eef1f5 100%)' }}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-[6px] mb-6">Get In Touch</p>
          <h3 className="text-5xl lg:text-7xl font-black text-[#1a1a1a] leading-[0.95] tracking-tighter mb-8">
            Ready to Scale Your Business?
          </h3>
          <p className="text-gray-400 text-xl md:text-2xl leading-relaxed mb-14 font-medium max-w-2xl mx-auto">
            Fill out our quick form and our AI will analyze your needs and get back to you within minutes.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(import.meta.env.VITE_CONTACT_FORM_URL, '_blank')}
            className="group relative bg-[#1a1a1a] text-white font-black px-16 py-7 rounded-2xl transition-all shadow-xl hover:shadow-blue-600/20 uppercase tracking-widest text-sm overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Contact Us <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center text-white">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-black text-[#1a1a1a] tracking-tighter uppercase">LeadGen<span className="text-blue-600">.ai</span></span>
          </div>
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[4px]">© 2026 LEADGEN AI. ALL RIGHTS RESERVED.</p>
        </div>
        <div className="flex gap-10 text-[10px] font-black text-[#1a1a1a] uppercase tracking-widest">
          <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
          <a href="#process" className="hover:text-blue-600 transition-colors">Process</a>
          <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <div className="bg-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden antialiased">
      <Nav />

      <Hero />

      {/* Global Impact Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <Suspense fallback={null}>
                <Globe3D />
              </Suspense>
            </motion.div>
            <div className="order-1 lg:order-2">
              <SectionHeading subtitle="Global Scale" title="Deploying leads in <br/> every timezone." />
              <p className="text-gray-400 text-xl font-medium leading-relaxed mb-12">
                Our autonomous agents operate across a global neural network, ensuring your lead generation never sleeps.
              </p>
              <div className="flex gap-10">
                <div>
                  <p className="text-4xl font-black text-[#1a1a1a]">50+</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Active Markets</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-[#1a1a1a]">24/7</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <Process />
      <About />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};


export default LandingPage;
