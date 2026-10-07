import React, { useState } from 'react';
import { TRAINING_MODULES } from '../data/modules';
import { ModuleCard } from '../components/common/ModuleCard';
import { useTrainingProgress } from '../hooks/useTrainingProgress';

export const LearnPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { isModuleCompleted, isModuleInProgress, completedModulesCount, totalModulesCount } = useTrainingProgress();

  const categories = [
    'All',
    'Fundamentals',
    'Attack Vectors',
    'Email Defense',
    'Web Defense',
    'Human Psychology',
    'Case Studies',
    'Practical Defense',
    'Remediation',
  ];

  const filteredModules = TRAINING_MODULES.filter((module) => {
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory;
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-y-space-xl">
      {/* Header */}
      <header className="flex flex-col gap-y-3 max-w-[800px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
            Course Curriculum
          </span>
        </div>
        <h1 className="font-display text-display text-on-surface tracking-tight leading-tight">
          Curriculum Syllabus &amp; Modules
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[72ch] leading-relaxed">
          Comprehensive, sequential casework organized for analytical retention. Progress through each defensive module to master threat vector inspection and forensic deconstruction.
        </p>
      </header>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-y border-outline-variant/60 py-4 bg-surface-container-low/40 px-3 rounded-lg">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="material-symbols-outlined text-[18px] text-outline mr-1 hidden sm:inline">filter_list</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 font-label-md text-label-md font-semibold rounded transition-colors cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary border-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border-outline-variant/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-outline">search</span>
          <input
            type="text"
            placeholder="Search topics or vectors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 font-label-md text-label-md rounded border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Progress Metric Line */}
      <div className="flex items-center justify-between text-outline font-label-sm text-label-sm px-1">
        <span>Showing {filteredModules.length} of {totalModulesCount} educational modules</span>
        <span>Curriculum Progress: {completedModulesCount} of {totalModulesCount} completed</span>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {filteredModules.map((module) => {
          const isCompleted = isModuleCompleted(module.id);
          const isInProgress = isModuleInProgress(module.id);

          return (
            <ModuleCard
              key={module.id}
              module={module}
              isCompleted={isCompleted}
              isInProgress={isInProgress}
              isLocked={false}
            />
          );
        })}
      </div>

      {filteredModules.length === 0 && (
        <div className="rounded-lg border border-dashed border-outline-variant p-12 text-center text-on-surface-variant font-body-md">
          No training modules match the selected filter or search query.
        </div>
      )}

      {/* Applied Forensic Laboratories Section */}
      <section className="bg-surface-container-low/60 rounded-xl p-space-md sm:p-space-lg border border-outline-variant/60 flex flex-col gap-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/40 pb-3">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Hands-On Forensic Laboratories
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Interactive sandboxes designed to reinforce analytical concepts from Modules 03 &amp; 04.
            </p>
          </div>
          <span className="font-code text-xs px-2.5 py-1 bg-surface-container rounded text-outline font-semibold">
            Reinforcing Practice · Non-Curricular Credit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/50 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">mark_email_unread</span>
                <span className="font-title text-title text-on-surface">Email Red-Flag Inspector</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                Practice analyzing display names, RFC envelope return paths, and header authentication flags across synthetic specimens.
              </p>
              <div className="text-xs text-secondary font-code mt-2">Reinforces: Module 03 (Anatomy of Phishing Emails)</div>
            </div>
            <a href="/email-analysis" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-4 py-2 rounded bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors shadow-xs cursor-pointer">
                Open Email Inspector →
              </button>
            </a>
          </div>

          <div className="p-4 rounded-lg bg-surface-container-lowest border border-outline-variant/50 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">link</span>
                <span className="font-title text-title text-on-surface">URL &amp; Domain Deconstructor</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                Practice dissecting complex URLs, distinguishing multi-label public suffixes from registered apex domains, and exposing lookalike tricks.
              </p>
              <div className="text-xs text-secondary font-code mt-2">Reinforces: Module 04 (Fake Websites &amp; Impersonation)</div>
            </div>
            <a href="/url-analysis" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-4 py-2 rounded bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-secondary/90 transition-colors shadow-xs cursor-pointer">
                Open Domain Deconstructor →
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
