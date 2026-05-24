"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  useEffect(() => {
    const handleScroll = () => {
      const mockup = document.querySelector('.mockup-container') as HTMLElement;
      if (!mockup) return;
      const rect = mockup.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      
      if (rect.top <= viewHeight && rect.bottom >= 0) {
        mockup.style.transform = 'translateY(' + Math.max(0, 100 - (viewHeight - rect.top) * 0.1) + 'px)';
        mockup.style.opacity = Math.min(1, (viewHeight - rect.top) * 0.002).toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize state
    const mockup = document.querySelector('.mockup-container') as HTMLElement;
    if (mockup) {
      mockup.style.transition = 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1s ease';
      mockup.style.transform = 'translateY(50px)';
      mockup.style.opacity = '0';
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDemo = () => {
    const mockup = document.querySelector('.mockup-container') as HTMLElement;
    if (mockup) {
      mockup.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-ld-surface text-ld-on-surface font-ld-body-md selection:bg-ld-primary-fixed selection:text-ld-on-primary-fixed min-h-screen">
      
{/**/}
<nav className="bg-ld-surface/80 dark:bg-ld-surface-container/80 backdrop-blur-md sticky top-0 z-50 border-b border-ld-outline-variant/30">
<div className="flex justify-between items-center px-ld-gutter py-4 max-w-ld-container-max mx-auto">
<Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
<img alt="VedaAI Logo" className="h-10 w-10 object-contain rounded-lg" src="https://res.cloudinary.com/dgqapabyw/image/upload/v1779559976/ChatGPT_Image_May_23_2026_11_41_50_PM_knbyae.png"/>
<span className="text-ld-headline-md font-ld-headline-md font-bold text-ld-on-surface dark:text-ld-inverse-on-surface">VedaAI</span>
</Link>
<div className="hidden md:flex items-center gap-8">
<Link className="font-ld-label-md text-ld-label-md text-ld-primary dark:text-ld-primary-fixed font-bold border-b-2 border-ld-primary" href="/dashboard">Home</Link>
<Link className="font-ld-label-md text-ld-label-md text-ld-on-surface-variant hover:text-ld-primary transition-all duration-200" href="/dashboard">Solutions</Link>
<Link className="font-ld-label-md text-ld-label-md text-ld-on-surface-variant hover:text-ld-primary transition-all duration-200" href="/dashboard">Teachers</Link>
<Link className="font-ld-label-md text-ld-label-md text-ld-on-surface-variant hover:text-ld-primary transition-all duration-200" href="/dashboard">About Us</Link>
<Link className="font-ld-label-md text-ld-label-md text-ld-on-surface-variant hover:text-ld-primary transition-all duration-200" href="/dashboard">Careers</Link>
</div>
<button className="bg-ld-inverse-surface text-ld-inverse-on-surface px-6 py-2.5 rounded-full font-ld-label-md text-ld-label-md hover:scale-[0.98] transition-transform duration-200">
                Contact Us
            </button>
</div>
</nav>
<main className="overflow-x-hidden">
{/**/}
<section className="relative pt-20 pb-32 px-ld-gutter">
{/**/}
<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-20 pointer-events-none">
<div className="absolute top-20 left-10 w-72 h-72 bg-ld-primary-container rounded-full blur-[120px]"></div>
<div className="absolute bottom-40 right-10 w-96 h-96 bg-ld-surface-container-high rounded-full blur-[100px]"></div>
</div>
<div className="max-w-ld-container-max mx-auto text-center flex flex-col items-center">
{/**/}
<div className="inline-flex items-center gap-2 px-4 py-1.5 bg-ld-surface-container-high border border-ld-outline-variant/30 rounded-full mb-8 hover:bg-ld-surface-variant transition-colors cursor-default">
<span className="material-symbols-outlined text-[18px] text-ld-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
<span className="font-ld-label-sm text-ld-label-sm uppercase tracking-wider text-ld-on-surface-variant">AI-Powered Academic Workflow Platform</span>
</div>
{/**/}
<h1 className="font-ld-display-lg text-ld-display-lg max-w-4xl mb-6 text-ld-on-surface">
                    AI Assessment Creation &amp; 
                    <span className="inline-block mt-2 px-6 py-2 bg-[#FFE6D6] text-ld-primary rounded-full border border-[#FFCCB4]">
                        Intelligence Platform
                    </span>
</h1>
{/**/}
<p className="font-ld-body-lg text-ld-body-lg text-ld-on-surface-variant max-w-2xl mb-12">
                    Generate structured, curriculum-ready assessments with AI-powered workflows designed for modern educators and institutions.
                </p>
{/**/}
<div className="flex flex-col sm:flex-row gap-4 items-center">
<Link href="/dashboard" className="bg-ld-primary text-ld-on-primary px-8 py-4 rounded-xl font-ld-label-md text-ld-label-md flex items-center gap-2 hover:bg-ld-primary/90 transition-all shadow-lg shadow-ld-primary/20">
                        Launch Dashboard
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</Link>
<button className="bg-ld-surface border border-ld-outline px-8 py-4 rounded-xl font-ld-label-md text-ld-label-md hover:bg-ld-surface-container-low transition-all">
                        View Demo
                    </button>
</div>
{/**/}
<div className="mt-20 relative w-full max-w-5xl mx-auto group mockup-container">
{/**/}
<div className="absolute inset-0 bg-ld-primary/10 blur-[100px] -z-10 rounded-full scale-90 group-hover:scale-100 transition-transform duration-700"></div>
<div className="bg-ld-surface-container-lowest p-4 rounded-[32px] border border-ld-outline-variant/40 brand-shadow">
<div className="bg-ld-surface-container rounded-[24px] overflow-hidden border border-ld-outline-variant/20 flex min-h-[600px]">
{/**/}
<aside className="w-64 bg-ld-surface-container-lowest border-r border-ld-outline-variant/20 p-6 flex flex-col">
<div className="flex items-center gap-3 mb-10">
<img alt="Logo" className="h-8 w-8" src="https://res.cloudinary.com/dgqapabyw/image/upload/v1779559976/ChatGPT_Image_May_23_2026_11_41_50_PM_knbyae.png"/>
<span className="font-ld-headline-md text-ld-headline-md text-ld-on-surface font-bold text-lg">VedaAI</span>
</div>
<button className="w-full bg-ld-on-surface text-ld-surface py-3 rounded-xl flex items-center justify-center gap-2 mb-8 font-ld-label-md text-ld-label-md hover:opacity-90">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
                                    Create Assignment
                                </button>
<nav className="space-y-1">
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-ld-on-surface-variant hover:bg-ld-surface-container-low" href="/dashboard">
<span className="material-symbols-outlined">grid_view</span>
<span className="font-ld-label-md text-ld-label-md">Home</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-ld-on-surface-variant hover:bg-ld-surface-container-low" href="/dashboard">
<span className="material-symbols-outlined">group</span>
<span className="font-ld-label-md text-ld-label-md">My Groups</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg bg-ld-primary-container/10 text-ld-primary border-l-4 border-ld-primary" href="/dashboard">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>assignment</span>
<span className="font-ld-label-md text-ld-label-md font-bold">Assignments</span>
<span className="ml-auto bg-ld-primary text-ld-on-primary px-2 py-0.5 rounded-full text-[10px]">10</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-ld-on-surface-variant hover:bg-ld-surface-container-low" href="/dashboard">
<span className="material-symbols-outlined">school</span>
<span className="font-ld-label-md text-ld-label-md">AI Toolkit</span>
</Link>
</nav>
</aside>
{/**/}
<main className="flex-1 p-8 bg-ld-surface/40">
<header className="flex justify-between items-center mb-10">
<div>
<h2 className="font-ld-headline-md text-ld-headline-md text-ld-on-surface">Assignments</h2>
<p className="font-ld-body-md text-ld-body-md text-ld-on-surface-variant">Manage and create assessments for your classes.</p>
</div>
<div className="flex items-center gap-4">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ld-on-surface-variant">search</span>
<input className="pl-10 pr-4 py-2 bg-ld-surface-container-lowest border border-ld-outline-variant/30 rounded-full w-64 focus:outline-none focus:border-ld-primary" placeholder="Search..." type="text"/>
</div>
<div className="h-10 w-10 rounded-full bg-ld-secondary-container flex items-center justify-center overflow-hidden">
<img alt="Profile" className="w-full h-full object-cover" data-alt="A professional headshot of a friendly educator wearing glasses and a smart casual blazer, set against a clean, softly lit academic office background. High-key lighting highlights the professional yet approachable atmosphere of the VedaAI platform interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSnBqyTnSwxs5QHsAIrOHOcOyQ2J7vKbMSdBpNUoedCOjqAi7RQ9egjzw0Ft90KeNeDIEV01T41YcitIYb3qkzXUPQqPMeyXEVxsdF-Fjju0_6kGcY2z9o6RpbOV8H1cWnyTLPrM9leZL2pZwKv0uFYNKKNJy8RLpPB8juQrO5c_yWA6Yjkhzt5XKFrwVEY4AgTNnVTzVYSwn6KW1_7NkZoq91l2v9fFIsoYESA7gFZpYLh7ihiEjFhHqWjAqUyc5aY_k5K0rkDaE"/>
</div>
</div>
</header>
{/**/}
<div className="bg-ld-primary/5 border-l-4 border-ld-primary p-4 rounded-r-xl mb-8 flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-8 h-8 flex items-center justify-center bg-ld-primary rounded-full animate-pulse">
<span className="material-symbols-outlined text-ld-on-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
</div>
<div>
<p className="font-ld-label-md text-ld-label-md text-ld-on-surface">AI is generating "Physics Finals - Set B"</p>
<div className="w-48 h-1 bg-ld-outline-variant/30 rounded-full mt-1 overflow-hidden">
<div className="h-full bg-ld-primary w-[75%] rounded-full"></div>
</div>
</div>
</div>
<span className="font-ld-label-sm text-ld-label-sm text-ld-primary font-bold">75% Complete</span>
</div>
{/**/}
<div className="grid grid-cols-2 gap-4">
<div className="bg-ld-surface-container-lowest p-6 rounded-2xl border border-ld-outline-variant/20 hover:shadow-lg transition-shadow">
<div className="flex justify-between items-start mb-4">
<h3 className="font-ld-headline-md text-[18px] text-ld-on-surface">Quiz on Electricity</h3>
<span className="material-symbols-outlined text-ld-on-surface-variant cursor-pointer">more_vert</span>
</div>
<div className="space-y-2 mb-6">
<div className="flex items-center gap-2 text-ld-on-surface-variant font-ld-label-sm text-ld-label-sm">
<span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                                Assigned on: 20-06-2025
                                            </div>
<div className="flex items-center gap-2 text-ld-on-surface-variant font-ld-label-sm text-ld-label-sm">
<span className="material-symbols-outlined text-[16px]">schedule</span>
                                                Due: 21-06-2025
                                            </div>
</div>
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full border-2 border-ld-surface-container-lowest bg-slate-200"></div>
<div className="w-8 h-8 rounded-full border-2 border-ld-surface-container-lowest bg-slate-300"></div>
<div className="w-8 h-8 rounded-full border-2 border-ld-surface-container-lowest bg-slate-400 flex items-center justify-center text-[10px] text-ld-on-surface font-bold">+24</div>
</div>
</div>
<div className="bg-ld-surface-container-lowest p-6 rounded-2xl border border-ld-outline-variant/20 hover:shadow-lg transition-shadow relative overflow-hidden">
{/**/}
<div className="absolute inset-0 bg-ld-on-surface/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
<div className="bg-ld-surface-container-lowest p-2 rounded-xl border border-ld-outline-variant/30 flex flex-col gap-1 w-40 brand-shadow">
<button className="text-left px-3 py-2 hover:bg-ld-surface-container-low rounded-lg font-ld-label-md text-ld-label-md text-ld-on-surface">View Assignment</button>
<button className="text-left px-3 py-2 hover:bg-ld-error-container text-ld-error rounded-lg font-ld-label-md text-ld-label-md">Delete</button>
</div>
</div>
<div className="flex justify-between items-start mb-4">
<h3 className="font-ld-headline-md text-[18px] text-ld-on-surface">Organic Chemistry I</h3>
<span className="material-symbols-outlined text-ld-on-surface-variant">more_vert</span>
</div>
<div className="space-y-2 mb-6">
<div className="flex items-center gap-2 text-ld-on-surface-variant font-ld-label-sm text-ld-label-sm">
<span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                                Assigned on: 18-06-2025
                                            </div>
<div className="flex items-center gap-2 text-ld-on-surface-variant font-ld-label-sm text-ld-label-sm">
<span className="material-symbols-outlined text-[16px]">schedule</span>
                                                Due: 25-06-2025
                                            </div>
</div>
<div className="flex items-center gap-2">
<span className="px-2 py-1 bg-ld-primary-container/20 text-ld-primary rounded-md text-[10px] font-bold">ACTIVE</span>
<span className="px-2 py-1 bg-ld-surface-container-high text-ld-on-surface-variant rounded-md text-[10px] font-bold">120 MINS</span>
</div>
</div>
</div>
</main>
</div>
</div>
{/**/}
<div className="absolute -top-10 -right-12 w-64 bg-white p-5 rounded-2xl border border-ld-outline-variant/30 brand-shadow hidden lg:block transform hover:translate-y-[-4px] transition-transform">
<div className="flex items-center gap-3 mb-4">
<div className="p-2 bg-ld-primary/10 rounded-lg">
<span className="material-symbols-outlined text-ld-primary">analytics</span>
</div>
<span className="font-ld-label-md text-ld-label-md text-ld-on-surface font-bold">Insights</span>
</div>
<p className="font-ld-body-md text-[13px] text-ld-on-surface-variant leading-relaxed">
                            Learning gap detected in <span className="text-ld-primary font-bold">Ohm's Law Application</span>. 23% of students missed this concept.
                        </p>
</div>
<div className="absolute -bottom-10 -left-12 w-56 bg-white p-5 rounded-2xl border border-ld-outline-variant/30 brand-shadow hidden lg:block transform hover:translate-y-[-4px] transition-transform">
<div className="flex items-center justify-between mb-4">
<span className="font-ld-label-sm text-ld-label-sm text-ld-on-surface-variant">Completion Rate</span>
<span className="text-ld-primary font-bold">95%</span>
</div>
<div className="w-full h-2 bg-ld-outline-variant/20 rounded-full overflow-hidden">
<div className="h-full bg-ld-primary w-[95%]"></div>
</div>
</div>
</div>
</div>
</section>
{/**/}
<section className="py-12 border-y border-ld-outline-variant/20 bg-ld-surface-container-low/30 overflow-hidden">
<div className="max-w-ld-container-max mx-auto px-ld-gutter text-center">
<p className="font-ld-label-sm text-ld-label-sm text-ld-on-surface-variant/60 uppercase tracking-widest mb-8">Trusted &amp; Incubated By</p>
<div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-full bg-ld-error/10 flex items-center justify-center">
<span className="material-symbols-outlined text-ld-error text-[20px]">school</span>
</div>
<span className="font-ld-headline-md text-ld-on-surface">IIM Bangalore</span>
</div>
<div className="font-ld-display-lg text-[24px] text-ld-on-surface-variant font-bold tracking-tighter italic">ED-TECH ACCELERATOR</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-ld-on-surface">verified_user</span>
<span className="font-ld-headline-md text-ld-on-surface">CBSE Compliance Hub</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-ld-on-surface">language</span>
<span className="font-ld-headline-md text-ld-on-surface">Global Edu Standards</span>
</div>
</div>
</div>
</section>
</main>
{/**/}
<footer className="bg-ld-surface border-t border-ld-outline-variant/20">
<div className="flex flex-col md:flex-row justify-between items-center px-ld-gutter py-8 max-w-ld-container-max mx-auto">
<div className="flex items-center gap-3 mb-6 md:mb-0">
<img alt="Logo" className="h-8 w-8" src="https://res.cloudinary.com/dgqapabyw/image/upload/v1779559976/ChatGPT_Image_May_23_2026_11_41_50_PM_knbyae.png"/>
<span className="text-ld-headline-md font-ld-headline-md font-bold text-ld-on-surface">VedaAI</span>
</div>
<div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
<Link className="font-ld-label-sm text-ld-label-sm text-ld-on-surface-variant hover:underline hover:text-ld-primary transition-all" href="/dashboard">Privacy Policy</Link>
<Link className="font-ld-label-sm text-ld-label-sm text-ld-on-surface-variant hover:underline hover:text-ld-primary transition-all" href="/dashboard">Terms of Service</Link>
<Link className="font-ld-label-sm text-ld-label-sm text-ld-on-surface-variant hover:underline hover:text-ld-primary transition-all" href="/dashboard">Contact</Link>
<Link className="font-ld-label-sm text-ld-label-sm text-ld-on-surface-variant hover:underline hover:text-ld-primary transition-all" href="/dashboard">Cookie Policy</Link>
</div>
<p className="font-ld-body-md text-[13px] text-ld-on-surface-variant/60">
                © 2024 VedaAI. All rights reserved.
            </p>
</div>
</footer>

    </div>
  );
}
