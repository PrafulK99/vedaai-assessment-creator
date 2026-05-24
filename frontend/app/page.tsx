"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effect for the background blurs
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const scrollToDemo = () => {
    const mockup = document.querySelector('.mockup-container') as HTMLElement;
    if (mockup) {
      mockup.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Common staggered variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="bg-[#FAFAFA] text-ld-on-surface font-ld-body-md selection:bg-orange-100 selection:text-orange-900 min-h-screen font-sans" ref={containerRef}>
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200/60"
      >
        <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img alt="VedaAI Logo" className="h-9 w-9 object-contain rounded-[10px] shadow-sm border border-gray-100" src="https://res.cloudinary.com/dgqapabyw/image/upload/v1779559976/ChatGPT_Image_May_23_2026_11_41_50_PM_knbyae.png"/>
            <span className="text-[20px] font-extrabold text-gray-900 tracking-tight">VedaAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-semibold text-gray-900" href="/dashboard">Home</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/dashboard">Solutions</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/dashboard">Teachers</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/dashboard">About Us</Link>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-black transition-colors"
          >
            Contact Us
          </motion.button>
        </div>
      </motion.nav>

      <main className="overflow-x-hidden">
        <section className="relative pt-24 md:pt-32 pb-32 px-6 md:px-12">
          {/* Background Ambient Glows */}
          <motion.div 
            style={{ y: bgY }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-40 pointer-events-none"
          >
            <div className="absolute top-0 left-10 w-[400px] h-[400px] bg-orange-100/60 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-[120px]"></div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200/60 rounded-full mb-8 shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-orange-500">auto_awesome</span>
              <span className="text-[13px] font-bold text-gray-600 tracking-wide uppercase">AI-Powered Workflow</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-[48px] sm:text-[64px] lg:text-[76px] leading-[1.05] font-extrabold mb-6 text-gray-900 tracking-tight">
              AI Assessment Creation &amp; <br />
              <span className="inline-block mt-2 px-5 py-2 bg-orange-50/80 text-orange-500 rounded-[2rem] border border-orange-100 shadow-sm relative">
                Intelligence Platform
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[18px] sm:text-[20px] text-gray-500 max-w-2xl mb-12 leading-relaxed font-medium">
              Generate structured, curriculum-ready assessments with AI workflows designed for modern educators and institutions.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center">
              <Link href="/dashboard">
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-orange-500 text-white px-8 py-4 rounded-2xl text-[16px] font-bold flex items-center gap-2 shadow-[0_8px_30px_rgb(249,115,22,0.3)] hover:shadow-[0_8px_40px_rgb(249,115,22,0.4)] transition-shadow relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative z-10">Launch Dashboard</span>
                  <span className="material-symbols-outlined text-[20px] relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </motion.button>
              </Link>
              <motion.button 
                onClick={scrollToDemo}
                whileHover={{ scale: 1.02, backgroundColor: "#F3F4F6" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white border border-gray-200 px-8 py-4 rounded-2xl text-[16px] font-bold text-gray-700 shadow-sm transition-colors"
              >
                View Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Dashboard Mockup Component */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-28 relative w-full max-w-5xl mx-auto group mockup-container perspective-[2000px] z-10"
          >
            <div className="absolute inset-0 bg-orange-500/5 blur-[100px] -z-10 rounded-full scale-90 group-hover:scale-105 transition-transform duration-1000"></div>
            
            <div className="bg-white/40 backdrop-blur-2xl p-3 sm:p-4 rounded-[36px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/60 relative transform-gpu hover:rotate-x-1 hover:-translate-y-2 transition-all duration-700 ease-out">
              {/* Fake Mac Buttons */}
              <div className="absolute top-8 left-8 flex gap-2 z-20">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
              </div>

              <div className="bg-white rounded-[24px] overflow-hidden border border-gray-200/60 flex min-h-[650px] shadow-[inset_0_1px_0_rgba(255,255,255,1)] relative z-10">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-50/50 border-r border-gray-100 p-6 flex flex-col relative z-20">
                  <div className="flex items-center gap-3 mb-12 pl-6 mt-1">
                    <img alt="Logo" className="h-8 w-8 shadow-sm rounded-md object-contain border border-gray-100 bg-white" src="https://res.cloudinary.com/dgqapabyw/image/upload/v1779559976/ChatGPT_Image_May_23_2026_11_41_50_PM_knbyae.png"/>
                    <span className="text-[18px] text-gray-900 font-extrabold tracking-tight">VedaAI</span>
                  </div>
                  <button className="w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white py-3 rounded-[14px] flex items-center justify-center gap-2 mb-8 text-sm font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] hover:from-gray-700 hover:to-gray-800 transition-all">
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    Create Assignment
                  </button>
                  <nav className="space-y-1.5">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100/50 transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">grid_view</span>
                      <span className="text-sm font-semibold">Home</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100/50 transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">group</span>
                      <span className="text-sm font-semibold">My Groups</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50/80 text-orange-600 transition-colors shadow-[inset_2px_0_0_var(--color-orange-500)] cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>assignment</span>
                      <span className="text-sm font-bold">Assignments</span>
                      <span className="ml-auto bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm">10</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100/50 transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]">school</span>
                      <span className="text-sm font-semibold">AI Toolkit</span>
                    </div>
                  </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-10 bg-white">
                  <header className="flex justify-between items-center mb-12">
                    <div>
                      <h2 className="text-[26px] font-extrabold text-gray-900 tracking-tight">Assignments</h2>
                      <p className="text-[15px] text-gray-500 mt-1 font-medium">Manage and create assessments for your classes.</p>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
                        <input className="pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-full w-64 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm shadow-sm font-medium text-gray-700" placeholder="Search..." type="text" readOnly />
                      </div>
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
                        <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSnBqyTnSwxs5QHsAIrOHOcOyQ2J7vKbMSdBpNUoedCOjqAi7RQ9egjzw0Ft90KeNeDIEV01T41YcitIYb3qkzXUPQqPMeyXEVxsdF-Fjju0_6kGcY2z9o6RpbOV8H1cWnyTLPrM9leZL2pZwKv0uFYNKKNJy8RLpPB8juQrO5c_yWA6Yjkhzt5XKFrwVEY4AgTNnVTzVYSwn6KW1_7NkZoq91l2v9fFIsoYESA7gFZpYLh7ihiEjFhHqWjAqUyc5aY_k5K0rkDaE"/>
                      </div>
                    </div>
                  </header>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white border border-gray-100 p-5 rounded-2xl mb-8 flex items-center justify-between shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)] relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-orange-500"></div>
                    <div className="flex items-center gap-4 pl-2">
                      <div className="w-10 h-10 flex items-center justify-center bg-orange-50 rounded-full">
                        <span className="material-symbols-outlined text-orange-500 text-[20px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-gray-900">AI is generating "Physics Finals - Set B"</p>
                        <div className="w-64 h-1.5 bg-gray-100 rounded-full mt-2.5 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "75%" }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
                            className="h-full bg-orange-500 rounded-full relative"
                          >
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-[shimmer_2s_infinite]"></div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <span className="text-[13px] text-orange-600 font-bold bg-orange-50 px-3 py-1.5 rounded-full">75% Complete</span>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { title: "Quiz on Electricity", assigned: "20-06-2025", due: "21-06-2025" },
                      { title: "Organic Chemistry I", assigned: "18-06-2025", due: "25-06-2025", active: true }
                    ].map((card, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="bg-white p-7 rounded-[20px] border border-gray-100 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.02)] cursor-pointer group hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.06)] hover:border-gray-200/60 transition-all flex flex-col h-full"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <h3 className="text-[19px] font-extrabold text-gray-900 tracking-tight group-hover:text-orange-500 transition-colors">{card.title}</h3>
                          <span className="material-symbols-outlined text-gray-300 hover:text-gray-500 transition-colors">more_vert</span>
                        </div>
                        <div className="space-y-3 mb-8">
                          <div className="flex items-center gap-2.5 text-gray-500 font-semibold text-[13px]">
                            <span className="material-symbols-outlined text-[16px] text-gray-400">calendar_today</span>
                            Assigned on: <span className="text-gray-900">{card.assigned}</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-gray-500 font-semibold text-[13px]">
                            <span className="material-symbols-outlined text-[16px] text-gray-400">schedule</span>
                            Due: <span className="text-gray-900">{card.due}</span>
                          </div>
                        </div>
                        
                        {card.active ? (
                          <div className="flex items-center gap-2 mt-auto">
                            <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-lg text-[11px] font-bold tracking-wide">ACTIVE</span>
                            <span className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-[11px] font-bold tracking-wide">120 MINS</span>
                          </div>
                        ) : (
                          <div className="flex -space-x-2 mt-auto">
                            <div className="w-9 h-9 rounded-full border-[3px] border-white bg-slate-100 shadow-sm"></div>
                            <div className="w-9 h-9 rounded-full border-[3px] border-white bg-slate-200 shadow-sm"></div>
                            <div className="w-9 h-9 rounded-full border-[3px] border-white bg-slate-300 flex items-center justify-center text-[11px] text-gray-900 font-bold shadow-sm">+24</div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </main>
              </div>

              {/* Decorative Insights Popup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.8, type: "spring", bounce: 0.4 }}
                className="absolute -top-8 -right-12 w-[280px] bg-white/95 backdrop-blur-xl p-6 rounded-[24px] border border-gray-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hidden lg:block z-30 group-hover:translate-y-[-8px] group-hover:shadow-[0_30px_50px_-10px_rgba(0,0,0,0.15)] transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-orange-50 rounded-xl">
                    <span className="material-symbols-outlined text-orange-500 text-[20px]">analytics</span>
                  </div>
                  <span className="text-[15px] text-gray-900 font-extrabold tracking-tight">Smart Insights</span>
                </div>
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
                  Learning gap detected in <span className="text-orange-600 font-bold">Ohm's Law</span>. 23% of students missed this concept.
                </p>
              </motion.div>
              
              {/* Decorative Completion Popup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.9, type: "spring", bounce: 0.4 }}
                className="absolute -bottom-6 -left-14 w-[240px] bg-white/95 backdrop-blur-xl p-6 rounded-[24px] border border-gray-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hidden lg:block z-30 group-hover:translate-y-[4px] group-hover:shadow-[0_30px_50px_-10px_rgba(0,0,0,0.15)] transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] font-extrabold text-gray-400 uppercase tracking-widest">Completion Rate</span>
                  <span className="text-orange-500 font-extrabold text-[16px]">95%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                    className="h-full bg-orange-500 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </section>

        {/* Footer Logos */}
        <section className="py-16 border-y border-gray-200/60 bg-gray-50/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <p className="text-[12px] text-gray-400 uppercase tracking-[0.2em] font-extrabold mb-10">Trusted &amp; Incubated By</p>
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-500 text-[20px]">school</span>
                </div>
                <span className="text-[18px] font-extrabold text-gray-900 tracking-tight">IIM Bangalore</span>
              </div>
              <div className="text-[22px] text-gray-400 font-black tracking-tighter italic">ED-TECH ACCELERATOR</div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-gray-500">verified_user</span>
                <span className="text-[18px] font-extrabold text-gray-900 tracking-tight">CBSE Hub</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-gray-500">language</span>
                <span className="text-[18px] font-extrabold text-gray-900 tracking-tight">Global Edu Standards</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200/60">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <img alt="Logo" className="h-8 w-8 shadow-sm rounded-md border border-gray-100" src="https://res.cloudinary.com/dgqapabyw/image/upload/v1779559976/ChatGPT_Image_May_23_2026_11_41_50_PM_knbyae.png"/>
            <span className="text-[18px] font-extrabold text-gray-900 tracking-tight">VedaAI</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
            <Link className="text-[14px] font-semibold text-gray-500 hover:text-orange-500 transition-colors" href="/dashboard">Privacy Policy</Link>
            <Link className="text-[14px] font-semibold text-gray-500 hover:text-orange-500 transition-colors" href="/dashboard">Terms of Service</Link>
            <Link className="text-[14px] font-semibold text-gray-500 hover:text-orange-500 transition-colors" href="/dashboard">Contact</Link>
          </div>
          <p className="text-[13px] font-medium text-gray-400">
            © 2026 VedaAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
