const fs = require('fs');

const rawHtml = `<!DOCTYPE html>
<html class="scroll-smooth" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>VedaAI | AI Assessment Creation &amp; Intelligence Platform</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "secondary-fixed": "#e5e2e1",
                    "primary-fixed": "#ffdcc3",
                    "tertiary-fixed-dim": "#c5c7c8",
                    "outline-variant": "#dac2b2",
                    "on-secondary-fixed": "#1c1b1b",
                    "on-surface-variant": "#544337",
                    "on-error-container": "#93000a",
                    "surface-container-low": "#f0f3ff",
                    "surface-container-lowest": "#ffffff",
                    "surface-tint": "#914d00",
                    "secondary-fixed-dim": "#c8c6c5",
                    "on-tertiary-fixed": "#191c1d",
                    "on-secondary": "#ffffff",
                    "on-background": "#151c27",
                    "surface-container-high": "#e2e8f8",
                    "surface": "#f9f9ff",
                    "error": "#ba1a1a",
                    "tertiary-fixed": "#e1e3e4",
                    "primary-container": "#e88d3b",
                    "inverse-primary": "#ffb77e",
                    "on-surface": "#151c27",
                    "primary": "#914d00",
                    "secondary": "#5f5e5e",
                    "secondary-container": "#e2dfde",
                    "on-primary-fixed": "#2f1500",
                    "background": "#f9f9ff",
                    "surface-bright": "#f9f9ff",
                    "tertiary": "#5c5f60",
                    "surface-dim": "#d3daea",
                    "on-tertiary": "#ffffff",
                    "error-container": "#ffdad6",
                    "surface-container-highest": "#dce2f3",
                    "on-tertiary-fixed-variant": "#454748",
                    "inverse-surface": "#2a313d",
                    "outline": "#877365",
                    "on-tertiary-container": "#37393b",
                    "surface-variant": "#dce2f3",
                    "inverse-on-surface": "#ebf1ff",
                    "on-primary": "#ffffff",
                    "tertiary-container": "#a1a3a4",
                    "surface-container": "#e7eefe",
                    "primary-fixed-dim": "#ffb77e",
                    "on-secondary-container": "#636262",
                    "on-error": "#ffffff",
                    "on-primary-fixed-variant": "#6e3900",
                    "on-secondary-fixed-variant": "#474746",
                    "on-primary-container": "#5a2e00"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "gutter": "24px",
                    "container-max": "1280px",
                    "base": "8px",
                    "margin-desktop": "40px",
                    "margin-mobile": "16px"
            },
            "fontFamily": {
                    "label-md": ["Inter"],
                    "headline-lg-mobile": ["Inter"],
                    "display-lg": ["Inter"],
                    "label-sm": ["Inter"],
                    "headline-lg": ["Inter"],
                    "headline-md": ["Inter"],
                    "body-lg": ["Inter"],
                    "body-md": ["Inter"]
            },
            "fontSize": {
                    "label-md": ["14px", {"lineHeight": "20px", "fontWeight": "500"}],
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "600"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        vertical-align: middle;
      }
      .academic-glass {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(229, 231, 235, 0.5);
      }
      .brand-shadow {
        box-shadow: 0px 4px 12px rgba(0,0,0,0.05);
      }
      .active-nav-underline {
        position: relative;
      }
      .active-nav-underline::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--tw-color-primary);
      }
    </style>
</head>
<body class="bg-surface text-on-surface font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
<!-- TopNavBar -->
<nav class="bg-surface/80 dark:bg-surface-container/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30">
<div class="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
<div class="flex items-center gap-3">
<img alt="VedaAI Logo" class="h-10 w-10 object-contain rounded-lg" src="https://lh3.googleusercontent.com/aida/ADBb0ujpMltwFMoGDcqi3dyYotRHUwCTcx-QZOkq8yx92Bav62uUggE88zHogEj7kLNe4z9n8l75ktGp72o_hjIpnB6gBwDImZ8eZpoFP6wh6OVw02wI10lZQ5m6peUUsSXvD8Ss1gY7OeKFdUY6o4KImRLDWkUNROIZjgL2hhQGRyz-LnS5BQbxJigbV9w7AXIbGBTau1DFRbHO1lJwEdRNH29nhXccg_eNCUAR-wTEj69l9DUNn2ON3hwsZ6A"/>
<span class="text-headline-md font-headline-md font-bold text-on-surface dark:text-inverse-on-surface">VedaAI</span>
</div>
<div class="hidden md:flex items-center gap-8">
<a class="font-label-md text-label-md text-primary dark:text-primary-fixed font-bold border-b-2 border-primary" href="#">Home</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all duration-200" href="#">Solutions</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all duration-200" href="#">Teachers</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all duration-200" href="#">About Us</a>
<a class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-all duration-200" href="#">Careers</a>
</div>
<button class="bg-inverse-surface text-inverse-on-surface px-6 py-2.5 rounded-full font-label-md text-label-md hover:scale-[0.98] transition-transform duration-200">
                Contact Us
            </button>
</div>
</nav>
<main class="overflow-x-hidden">
<!-- Hero Section -->
<section class="relative pt-20 pb-32 px-gutter">
<!-- Decorative Background Elements -->
<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-20 pointer-events-none">
<div class="absolute top-20 left-10 w-72 h-72 bg-primary-container rounded-full blur-[120px]"></div>
<div class="absolute bottom-40 right-10 w-96 h-96 bg-surface-container-high rounded-full blur-[100px]"></div>
</div>
<div class="max-w-container-max mx-auto text-center flex flex-col items-center">
<!-- Top Badge -->
<div class="inline-flex items-center gap-2 px-4 py-1.5 bg-surface-container-high border border-outline-variant/30 rounded-full mb-8 hover:bg-surface-variant transition-colors cursor-default">
<span class="material-symbols-outlined text-[18px] text-primary" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">AI-Powered Academic Workflow Platform</span>
</div>
<!-- Headline -->
<h1 class="font-display-lg text-display-lg max-w-4xl mb-6 text-on-surface">
                    AI Assessment Creation &amp; 
                    <span class="inline-block mt-2 px-6 py-2 bg-[#FFE6D6] text-primary rounded-full border border-[#FFCCB4]">
                        Intelligence Platform
                    </span>
</h1>
<!-- Subheading -->
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
                    Generate structured, curriculum-ready assessments with AI-powered workflows designed for modern educators and institutions.
                </p>
<!-- CTAs -->
<div class="flex flex-col sm:flex-row gap-4 items-center">
<button class="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-md text-label-md flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        Launch Dashboard
                        <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
<button class="bg-surface border border-outline px-8 py-4 rounded-xl font-label-md text-label-md hover:bg-surface-container-low transition-all">
                        View Demo
                    </button>
</div>
<!-- Dashboard Preview Mockup -->
<div class="mt-20 relative w-full max-w-5xl mx-auto group">
<!-- Glow effect behind mockup -->
<div class="absolute inset-0 bg-primary/10 blur-[100px] -z-10 rounded-full scale-90 group-hover:scale-100 transition-transform duration-700"></div>
<div class="bg-surface-container-lowest p-4 rounded-[32px] border border-outline-variant/40 brand-shadow">
<div class="bg-surface-container rounded-[24px] overflow-hidden border border-outline-variant/20 flex min-h-[600px]">
<!-- Mock Sidebar -->
<aside class="w-64 bg-surface-container-lowest border-r border-outline-variant/20 p-6 flex flex-col">
<div class="flex items-center gap-3 mb-10">
<img alt="Logo" class="h-8 w-8" src="https://lh3.googleusercontent.com/aida/ADBb0ujpMltwFMoGDcqi3dyYotRHUwCTcx-QZOkq8yx92Bav62uUggE88zHogEj7kLNe4z9n8l75ktGp72o_hjIpnB6gBwDImZ8eZpoFP6wh6OVw02wI10lZQ5m6peUUsSXvD8Ss1gY7OeKFdUY6o4KImRLDWkUNROIZjgL2hhQGRyz-LnS5BQbxJigbV9w7AXIbGBTau1DFRbHO1lJwEdRNH29nhXccg_eNCUAR-wTEj69l9DUNn2ON3hwsZ6A"/>
<span class="font-headline-md text-headline-md text-on-surface font-bold text-lg">VedaAI</span>
</div>
<button class="w-full bg-on-surface text-surface py-3 rounded-xl flex items-center justify-center gap-2 mb-8 font-label-md text-label-md hover:opacity-90">
<span class="material-symbols-outlined text-[18px]">add_circle</span>
                                    Create Assignment
                                </button>
<nav class="space-y-1">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low" href="#">
<span class="material-symbols-outlined">grid_view</span>
<span class="font-label-md text-label-md">Home</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low" href="#">
<span class="material-symbols-outlined">group</span>
<span class="font-label-md text-label-md">My Groups</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-container/10 text-primary border-l-4 border-primary" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">assignment</span>
<span class="font-label-md text-label-md font-bold">Assignments</span>
<span class="ml-auto bg-primary text-on-primary px-2 py-0.5 rounded-full text-[10px]">10</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low" href="#">
<span class="material-symbols-outlined">school</span>
<span class="font-label-md text-label-md">AI Toolkit</span>
</a>
</nav>
</aside>
<!-- Mock Content -->
<main class="flex-1 p-8 bg-surface/40">
<header class="flex justify-between items-center mb-10">
<div>
<h2 class="font-headline-md text-headline-md text-on-surface">Assignments</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Manage and create assessments for your classes.</p>
</div>
<div class="flex items-center gap-4">
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-full w-64 focus:outline-none focus:border-primary" placeholder="Search..." type="text"/>
</div>
<div class="h-10 w-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
<img alt="Profile" class="w-full h-full object-cover" data-alt="A professional headshot of a friendly educator wearing glasses and a smart casual blazer, set against a clean, softly lit academic office background. High-key lighting highlights the professional yet approachable atmosphere of the VedaAI platform interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSnBqyTnSwxs5QHsAIrOHOcOyQ2J7vKbMSdBpNUoedCOjqAi7RQ9egjzw0Ft90KeNeDIEV01T41YcitIYb3qkzXUPQqPMeyXEVxsdF-Fjju0_6kGcY2z9o6RpbOV8H1cWnyTLPrM9leZL2pZwKv0uFYNKKNJy8RLpPB8juQrO5c_yWA6Yjkhzt5XKFrwVEY4AgTNnVTzVYSwn6KW1_7NkZoq91l2v9fFIsoYESA7gFZpYLh7ihiEjFhHqWjAqUyc5aY_k5K0rkDaE"/>
</div>
</div>
</header>
<!-- AI Generation Indicator -->
<div class="bg-primary/5 border-l-4 border-primary p-4 rounded-r-xl mb-8 flex items-center justify-between">
<div class="flex items-center gap-4">
<div class="w-8 h-8 flex items-center justify-center bg-primary rounded-full animate-pulse">
<span class="material-symbols-outlined text-on-primary text-[16px]" style="font-variation-settings: 'FILL' 1;">bolt</span>
</div>
<div>
<p class="font-label-md text-label-md text-on-surface">AI is generating "Physics Finals - Set B"</p>
<div class="w-48 h-1 bg-outline-variant/30 rounded-full mt-1 overflow-hidden">
<div class="h-full bg-primary w-[75%] rounded-full"></div>
</div>
</div>
</div>
<span class="font-label-sm text-label-sm text-primary font-bold">75% Complete</span>
</div>
<!-- Bento Grid of Assignments -->
<div class="grid grid-cols-2 gap-4">
<div class="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 hover:shadow-lg transition-shadow">
<div class="flex justify-between items-start mb-4">
<h3 class="font-headline-md text-[18px] text-on-surface">Quiz on Electricity</h3>
<span class="material-symbols-outlined text-on-surface-variant cursor-pointer">more_vert</span>
</div>
<div class="space-y-2 mb-6">
<div class="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">calendar_today</span>
                                                Assigned on: 20-06-2025
                                            </div>
<div class="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">schedule</span>
                                                Due: 21-06-2025
                                            </div>
</div>
<div class="flex -space-x-2">
<div class="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-slate-200"></div>
<div class="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-slate-300"></div>
<div class="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-slate-400 flex items-center justify-center text-[10px] text-on-surface font-bold">+24</div>
</div>
</div>
<div class="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 hover:shadow-lg transition-shadow relative overflow-hidden">
<!-- Overlay for focused action -->
<div class="absolute inset-0 bg-on-surface/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
<div class="bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/30 flex flex-col gap-1 w-40 brand-shadow">
<button class="text-left px-3 py-2 hover:bg-surface-container-low rounded-lg font-label-md text-label-md text-on-surface">View Assignment</button>
<button class="text-left px-3 py-2 hover:bg-error-container text-error rounded-lg font-label-md text-label-md">Delete</button>
</div>
</div>
<div class="flex justify-between items-start mb-4">
<h3 class="font-headline-md text-[18px] text-on-surface">Organic Chemistry I</h3>
<span class="material-symbols-outlined text-on-surface-variant">more_vert</span>
</div>
<div class="space-y-2 mb-6">
<div class="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">calendar_today</span>
                                                Assigned on: 18-06-2025
                                            </div>
<div class="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">schedule</span>
                                                Due: 25-06-2025
                                            </div>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-1 bg-primary-container/20 text-primary rounded-md text-[10px] font-bold">ACTIVE</span>
<span class="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded-md text-[10px] font-bold">120 MINS</span>
</div>
</div>
</div>
</main>
</div>
</div>
<!-- Floating decorative UI cards -->
<div class="absolute -top-10 -right-12 w-64 bg-white p-5 rounded-2xl border border-outline-variant/30 brand-shadow hidden lg:block transform hover:translate-y-[-4px] transition-transform">
<div class="flex items-center gap-3 mb-4">
<div class="p-2 bg-primary/10 rounded-lg">
<span class="material-symbols-outlined text-primary">analytics</span>
</div>
<span class="font-label-md text-label-md text-on-surface font-bold">Insights</span>
</div>
<p class="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                            Learning gap detected in <span class="text-primary font-bold">Ohm's Law Application</span>. 23% of students missed this concept.
                        </p>
</div>
<div class="absolute -bottom-10 -left-12 w-56 bg-white p-5 rounded-2xl border border-outline-variant/30 brand-shadow hidden lg:block transform hover:translate-y-[-4px] transition-transform">
<div class="flex items-center justify-between mb-4">
<span class="font-label-sm text-label-sm text-on-surface-variant">Completion Rate</span>
<span class="text-primary font-bold">95%</span>
</div>
<div class="w-full h-2 bg-outline-variant/20 rounded-full overflow-hidden">
<div class="h-full bg-primary w-[95%]"></div>
</div>
</div>
</div>
</div>
</section>
<!-- Academic Trust/Incubation Banner -->
<section class="py-12 border-y border-outline-variant/20 bg-surface-container-low/30 overflow-hidden">
<div class="max-w-container-max mx-auto px-gutter text-center">
<p class="font-label-sm text-label-sm text-on-surface-variant/60 uppercase tracking-widest mb-8">Trusted &amp; Incubated By</p>
<div class="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
<div class="flex items-center gap-2">
<div class="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
<span class="material-symbols-outlined text-error text-[20px]">school</span>
</div>
<span class="font-headline-md text-on-surface">IIM Bangalore</span>
</div>
<div class="font-display-lg text-[24px] text-on-surface-variant font-bold tracking-tighter italic">ED-TECH ACCELERATOR</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-on-surface">verified_user</span>
<span class="font-headline-md text-on-surface">CBSE Compliance Hub</span>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-on-surface">language</span>
<span class="font-headline-md text-on-surface">Global Edu Standards</span>
</div>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-surface border-t border-outline-variant/20">
<div class="flex flex-col md:flex-row justify-between items-center px-gutter py-8 max-w-container-max mx-auto">
<div class="flex items-center gap-3 mb-6 md:mb-0">
<img alt="Logo" class="h-8 w-8" src="https://lh3.googleusercontent.com/aida/ADBb0ujpMltwFMoGDcqi3dyYotRHUwCTcx-QZOkq8yx92Bav62uUggE88zHogEj7kLNe4z9n8l75ktGp72o_hjIpnB6gBwDImZ8eZpoFP6wh6OVw02wI10lZQ5m6peUUsSXvD8Ss1gY7OeKFdUY6o4KImRLDWkUNROIZjgL2hhQGRyz-LnS5BQbxJigbV9w7AXIbGBTau1DFRbHO1lJwEdRNH29nhXccg_eNCUAR-wTEj69l9DUNn2ON3hwsZ6A"/>
<span class="text-headline-md font-headline-md font-bold text-on-surface">VedaAI</span>
</div>
<div class="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
<a class="font-label-sm text-label-sm text-on-surface-variant hover:underline hover:text-primary transition-all" href="#">Privacy Policy</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:underline hover:text-primary transition-all" href="#">Terms of Service</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:underline hover:text-primary transition-all" href="#">Contact</a>
<a class="font-label-sm text-label-sm text-on-surface-variant hover:underline hover:text-primary transition-all" href="#">Cookie Policy</a>
</div>
<p class="font-body-md text-[13px] text-on-surface-variant/60">
                © 2024 VedaAI. All rights reserved.
            </p>
</div>
</footer>
</body></html>
`;

// Prefix lists
const prefixColor = [
  'secondary-fixed', 'primary-fixed', 'tertiary-fixed-dim', 'outline-variant', 'on-secondary-fixed', 
  'on-surface-variant', 'on-error-container', 'surface-container-low', 'surface-container-lowest', 
  'surface-tint', 'secondary-fixed-dim', 'on-tertiary-fixed', 'on-secondary', 'on-background', 
  'surface-container-high', 'surface', 'error', 'tertiary-fixed', 'primary-container', 'inverse-primary', 
  'on-surface', 'primary', 'secondary', 'secondary-container', 'on-primary-fixed', 'background', 
  'surface-bright', 'tertiary', 'surface-dim', 'on-tertiary', 'error-container', 'surface-container-highest', 
  'on-tertiary-fixed-variant', 'inverse-surface', 'outline', 'on-tertiary-container', 'surface-variant', 
  'inverse-on-surface', 'on-primary', 'tertiary-container', 'surface-container', 'primary-fixed-dim', 
  'on-secondary-container', 'on-error', 'on-primary-fixed-variant', 'on-secondary-fixed-variant', 'on-primary-container'
];

const prefixSpacing = ['gutter', 'container-max', 'base', 'margin-desktop', 'margin-mobile'];
const prefixText = ['label-md', 'headline-lg-mobile', 'display-lg', 'label-sm', 'headline-lg', 'headline-md', 'body-lg', 'body-md'];

let processedHtml = rawHtml;

// Replace class -> className
processedHtml = processedHtml.replace(/class="/g, 'className="');

// Fix closing tags
processedHtml = processedHtml.replace(/<img([^>]*[^\/])>/g, '<img$1 />');
processedHtml = processedHtml.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
processedHtml = processedHtml.replace(/<meta([^>]*[^\/])>/g, '<meta$1 />');
processedHtml = processedHtml.replace(/<link([^>]*[^\/])>/g, '<link$1 />');
processedHtml = processedHtml.replace(/style="([^"]*)"/g, (match, styleStr) => {
    if (styleStr.includes('font-variation-settings')) {
        return 'style={{ fontVariationSettings: "\'FILL\' 1" }}';
    }
    return match;
});

// Rename custom classes
prefixColor.forEach(c => {
    const regex = new RegExp('className="([^"]*)\\\\b(bg|text|border|shadow|from|to|fill|stroke)-(' + c + ')\\\\b([^"]*)"', 'g');
    processedHtml = processedHtml.replace(regex, 'className="$1$2-ld-$3$4"');
    processedHtml = processedHtml.replace(regex, 'className="$1$2-ld-$3$4"');
    processedHtml = processedHtml.replace(regex, 'className="$1$2-ld-$3$4"');
});

prefixSpacing.forEach(s => {
    const regex = new RegExp('className="([^"]*)\\\\b(p|m|px|py|mx|my|pt|pb|pl|pr|mt|mb|ml|mr|gap|w|h|max-w)-(' + s + ')\\\\b([^"]*)"', 'g');
    processedHtml = processedHtml.replace(regex, 'className="$1$2-ld-$3$4"');
    processedHtml = processedHtml.replace(regex, 'className="$1$2-ld-$3$4"');
    processedHtml = processedHtml.replace(regex, 'className="$1$2-ld-$3$4"');
});

prefixText.forEach(t => {
    const regex = new RegExp('className="([^"]*)\\\\b(text|font)-(' + t + ')\\\\b([^"]*)"', 'g');
    processedHtml = processedHtml.replace(regex, 'className="$1$2-ld-$3$4"');
    processedHtml = processedHtml.replace(regex, 'className="$1$2-ld-$3$4"');
    processedHtml = processedHtml.replace(regex, 'className="$1$2-ld-$3$4"');
});

// Specific replacements based on requested CTA
processedHtml = processedHtml.replace(
    /className="bg-ld-primary text-on-ld-primary px-8 py-4 rounded-xl font-label-md text-ld-label-md flex items-center gap-2 hover:bg-ld-primary\/90 transition-all shadow-lg shadow-ld-primary\/20"/g,
    'className="bg-ld-primary text-ld-on-primary px-8 py-4 rounded-xl font-ld-label-md text-ld-label-md flex items-center gap-2 hover:bg-ld-primary/90 transition-all shadow-lg shadow-ld-primary/20"'
);

prefixColor.forEach(c => {
    const regex = new RegExp('className="([^"]*)\\\\b(selection:bg|selection:text)-(' + c + ')\\\\b([^"]*)"', 'g');
    processedHtml = processedHtml.replace(regex, 'className="$1$2-ld-$3$4"');
});

// Add next/link
processedHtml = processedHtml.replace(/<a([^>]*)href="#"([^>]*)>/g, '<Link$1href="/dashboard"$2>');
processedHtml = processedHtml.replace(/<\/a>/g, '</Link>');

// Navbar logo route to /
processedHtml = processedHtml.replace(/<div className="flex items-center gap-3">\n<img([^>]*)alt="VedaAI Logo"([^>]*)>\n<span([^>]*)>VedaAI<\/span>\n<\/div>/, 
    '<Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">\n<img$1alt="VedaAI Logo"$2>\n<span$3>VedaAI</span>\n</Link>'
);

// The Launch Dashboard button to link
processedHtml = processedHtml.replace(/<button className="bg-ld-primary([^>]*)>\n([^<]*)Launch Dashboard\n([^<]*)<span([^>]*)>arrow_forward<\/span>\n<\/button>/g, 
    '<Link href="/dashboard" className="bg-ld-primary$1>\n$2Launch Dashboard\n$3<span$4>arrow_forward</span>\n</Link>'
);

processedHtml = processedHtml.replace(/<button([^>]*)>(\s*)Launch Dashboard([\s\S]*?)<\/button>/g, '<Link href="/dashboard"$1>$2Launch Dashboard$3</Link>');

// Extract body content
const bodyMatch = processedHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let bodyContent = bodyMatch ? bodyMatch[1] : '';

bodyContent = bodyContent.replace(/<script>[\s\S]*?<\/script>/, '');

const componentCode = `"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  useEffect(() => {
    const handleScroll = () => {
      const mockup = document.querySelector('.mockup-container');
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
    const mockup = document.querySelector('.mockup-container');
    if (mockup) {
      mockup.style.transition = 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1s ease';
      mockup.style.transform = 'translateY(50px)';
      mockup.style.opacity = '0';
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDemo = () => {
    const mockup = document.querySelector('.mockup-container');
    if (mockup) {
      mockup.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-ld-surface text-ld-on-surface font-ld-body-md selection:bg-ld-primary-fixed selection:text-ld-on-primary-fixed min-h-screen">
      ` + bodyContent.replace(/className="mt-20 relative w-full max-w-5xl mx-auto group"/, 'className="mt-20 relative w-full max-w-5xl mx-auto group mockup-container"').replace(/<button className="bg-ld-surface border border-ld-outline px-8 py-4 rounded-xl font-ld-label-md text-ld-label-md hover:bg-ld-surface-container-low transition-all">\s*View Demo\s*<\/button>/, '<button onClick={scrollToDemo} className="bg-ld-surface border border-ld-outline px-8 py-4 rounded-xl font-ld-label-md text-ld-label-md hover:bg-ld-surface-container-low transition-all">View Demo</button>') + `
    </div>
  );
}
`;

fs.writeFileSync('frontend/app/page.tsx', componentCode);
console.log('Successfully generated app/page.tsx');

// Extract config using regex
const configMatch = rawHtml.match(/tailwind\.config\s*=\s*({[\s\S]*?})\s*<\/script>/);
let cssOverrides = '\n/* Landing Page Theme Variables */\n@theme inline {\n';
let fontUtilities = '\n/* Landing Page Font Utilities */\n@layer utilities {\n';

if (configMatch) {
  const configStr = configMatch[1];
  const config = eval('(' + configStr + ')');
  const { colors, spacing, fontSize } = config.theme.extend;
  
  for (const [key, val] of Object.entries(colors)) {
    cssOverrides += '  --color-ld-' + key + ': ' + val + ';\n';
  }
  for (const [key, val] of Object.entries(spacing)) {
    cssOverrides += '  --spacing-ld-' + key + ': ' + val + ';\n';
  }
  for (const [key, val] of Object.entries(fontSize)) {
    cssOverrides += '  --text-ld-' + key + ': ' + val[0] + ';\n';
    
    fontUtilities += '  .text-ld-' + key + ' {\n    font-size: ' + val[0] + ';\n    line-height: ' + val[1].lineHeight + ';\n    font-weight: ' + (val[1].fontWeight || 'normal') + ';\n';
    if (val[1].letterSpacing) {
      fontUtilities += '    letter-spacing: ' + val[1].letterSpacing + ';\n';
    }
    fontUtilities += '  }\n';
  }
}
cssOverrides += '}\n';
fontUtilities += '}\n';

fs.writeFileSync('scratch/cssvars.txt', cssOverrides + fontUtilities);
console.log('Successfully generated css variables.');
