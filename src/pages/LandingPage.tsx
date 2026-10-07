import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PhishGuardLogo } from '../components/common/PhishGuardLogo';
import { ThemeToggle } from '../components/common/ThemeToggle';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full h-16 shrink-0 bg-surface-container-low border-b border-outline-variant flex items-center justify-between px-space-lg shadow-xs">
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-2">
            <PhishGuardLogo size={44} />
          </div>
        </div>
        <div className="flex items-center gap-space-md">
          <Link to="/dashboard" className="hidden sm:inline font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            Explore the training
          </Link>
          <ThemeToggle />
          <button 
            onClick={handleGetStarted}
            className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-4 py-1.5 rounded transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <span>Get Started</span>
            <span className="material-symbols-outlined text-[18px] mt-0.5">arrow_forward</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-y-16">
        
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center gap-y-6 pt-8 pb-4">
          <span className="font-label-md text-label-md uppercase tracking-widest text-secondary font-bold">
            Cybersecurity Education & Awareness
          </span>
          <h1 className="font-display text-5xl sm:text-6xl text-on-surface tracking-tight leading-tight max-w-4xl">
            Recognize phishing before it becomes an incident.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[72ch] leading-relaxed mx-auto text-lg sm:text-xl">
            PhishGuard is an interactive phishing-awareness training platform designed to help learners recognize phishing emails, deceptive websites, social engineering tactics, and common warning signs before an incident occurs.
          </p>
          <button 
            onClick={handleGetStarted}
            className="mt-4 bg-primary hover:bg-primary-container text-on-primary font-title text-title font-semibold px-8 py-4 rounded-lg transition-colors shadow-sm flex items-center gap-2 cursor-pointer text-lg"
          >
            <span>Get Started</span>
            <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
          </button>
        </section>

        {/* EDUCATIONAL PURPOSE NOTICE */}
        <section className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-tertiary/40 flex flex-col gap-y-2">
          <div className="flex items-center gap-2 text-tertiary">
            <span className="material-symbols-outlined text-[24px]">school</span>
            <h2 className="font-headline-sm text-headline-sm tracking-tight font-bold">Educational Purpose</h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            PhishGuard is designed for cybersecurity awareness and training. Its examples, quizzes, and analysis tools are intended to help learners understand phishing risks and practice safer decision-making.
          </p>
        </section>

        {/* WHAT YOU WILL LEARN */}
        <section className="flex flex-col gap-y-6">
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight border-b border-outline-variant/40 pb-2">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-container-low rounded-lg p-5 border border-outline-variant/40 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-bold font-title">
                <span className="material-symbols-outlined">mark_email_unread</span>
                <h3>1. Recognize Phishing Emails</h3>
              </div>
              <p className="font-body-sm text-on-surface-variant">Identify suspicious senders, links, requests, attachments, urgency, and other warning signs.</p>
            </div>
            <div className="bg-surface-container-low rounded-lg p-5 border border-outline-variant/40 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-bold font-title">
                <span className="material-symbols-outlined">public</span>
                <h3>2. Identify Fake Websites</h3>
              </div>
              <p className="font-body-sm text-on-surface-variant">Learn how deceptive domains, impersonation, and misleading URLs can be used to steal information.</p>
            </div>
            <div className="bg-surface-container-low rounded-lg p-5 border border-outline-variant/40 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-bold font-title">
                <span className="material-symbols-outlined">psychology</span>
                <h3>3. Understand Social Engineering</h3>
              </div>
              <p className="font-body-sm text-on-surface-variant">Learn how attackers use urgency, authority, fear, trust, curiosity, and pressure to influence decisions.</p>
            </div>
            <div className="bg-surface-container-low rounded-lg p-5 border border-outline-variant/40 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-bold font-title">
                <span className="material-symbols-outlined">shield</span>
                <h3>4. Practice Prevention</h3>
              </div>
              <p className="font-body-sm text-on-surface-variant">Apply practical habits that reduce the risk of becoming a phishing victim.</p>
            </div>
            <div className="bg-surface-container-low rounded-lg p-5 border border-outline-variant/40 flex flex-col gap-2 md:col-span-2 md:max-w-xl md:mx-auto w-full">
              <div className="flex items-center gap-2 text-primary font-bold font-title">
                <span className="material-symbols-outlined">history_edu</span>
                <h3>5. Learn From Real Incidents</h3>
              </div>
              <p className="font-body-sm text-on-surface-variant">Explore real-world phishing examples and test your understanding through interactive assessments.</p>
            </div>
          </div>
        </section>

        {/* TRAINING JOURNEY & PRACTICAL LEARNING (Split view) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* TRAINING JOURNEY */}
          <section className="flex flex-col gap-y-5 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/60 shadow-sm">
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                Your Training Journey
              </h2>
            </div>
            <ul className="flex flex-col gap-2.5 font-code text-sm text-on-surface-variant">
              <li className="flex gap-3"><span className="text-secondary font-bold">01</span> Introduction to Phishing</li>
              <li className="flex gap-3"><span className="text-secondary font-bold">02</span> Types of Phishing Attacks</li>
              <li className="flex gap-3"><span className="text-secondary font-bold">03</span> Anatomy of Phishing Emails</li>
              <li className="flex gap-3"><span className="text-secondary font-bold">04</span> Fake Websites & Impersonation</li>
              <li className="flex gap-3"><span className="text-secondary font-bold">05</span> Social Engineering Psychology</li>
              <li className="flex gap-3"><span className="text-secondary font-bold">06</span> Real-World Phishing Incidents</li>
              <li className="flex gap-3"><span className="text-primary font-bold">07</span> PhishGuard Assessment</li>
              <li className="flex gap-3"><span className="text-tertiary font-bold">08</span> Defense & Prevention</li>
              <li className="flex gap-3"><span className="text-tertiary font-bold">09</span> Incident Response</li>
            </ul>
            <button 
              onClick={handleGetStarted}
              className="mt-2 text-primary font-label-md font-bold hover:text-primary-container flex items-center gap-1 transition-colors cursor-pointer w-fit"
            >
              Start Training <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </section>

          {/* PRACTICAL LEARNING */}
          <section className="flex flex-col gap-y-5 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/60 shadow-sm">
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                Learn by Practice
              </h2>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-2">
              PhishGuard includes practical educational exercises to reinforce learning. These static analysis tools simulate real-world evaluation safely.
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">mark_email_unread</span>
                <div>
                  <h4 className="font-title text-on-surface text-sm">Email Inspector</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">Analyze email headers, sender domains, and message bodies for deceptive markers.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">link</span>
                <div>
                  <h4 className="font-title text-on-surface text-sm">URL & Domain Lab</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">Deconstruct hyperlinks to identify subdomains, root domains, and lookalike techniques.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">fact_check</span>
                <div>
                  <h4 className="font-title text-on-surface text-sm">Interactive Assessment</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">Test your understanding with scenario-based knowledge checks and a final quiz.</p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* FINAL CTA */}
        <section className="flex flex-col items-center text-center gap-y-5 py-10 bg-surface-container rounded-2xl border border-outline-variant/50">
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
            Ready to test your phishing awareness?
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-lg">
            Start the PhishGuard training curriculum and learn how to recognize, avoid, and respond to phishing attacks.
          </p>
          <button 
            onClick={handleGetStarted}
            className="mt-2 bg-primary hover:bg-primary-container text-on-primary font-title font-semibold px-8 py-3 rounded-lg transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Get Started</span>
            <span className="material-symbols-outlined text-[20px] mt-0.5">arrow_forward</span>
          </button>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-low border-t border-outline-variant py-8 px-4 sm:px-6 text-center flex flex-col gap-2 mt-auto">
        <div className="font-label-md text-on-surface font-semibold">
          PhishGuard — Phishing Awareness & Cybersecurity Training
        </div>
        <div className="font-body-sm text-outline">
          Educational project for cybersecurity awareness and training.
        </div>
        <div className="font-body-xs text-outline/60 mt-1 uppercase tracking-widest text-[10px]">
          Educational use only
        </div>
      </footer>
    </div>
  );
};
