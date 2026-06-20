import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Calendar, Star, CheckSquare, Settings, Sliders, Copy, CheckCircle2, Zap } from "lucide-react";
import { CaseStudy } from "../types";

interface CaseStudiesViewProps {
  initialCaseStudies: CaseStudy[];
}

export default function CaseStudiesView({ initialCaseStudies }: CaseStudiesViewProps) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [activeTab, setActiveTab] = useState<string>("case-1");
  const [isEditingMetrics, setIsEditingMetrics] = useState<boolean>(false);
  const [copiedState, setCopiedState] = useState<string | null>(null);

  // Editable parameters states for dynamic copy live updates
  const [downTimeHours, setDownTimeHours] = useState<number>(4); // default for Tristellar
  const [engagementRate, setEngagementRate] = useState<number>(25.3); // default for Rental
  const [webSpeed, setWebSpeed] = useState<number>(1.8); // default speed reduction
  const [qaAccuracyValue, setQaAccuracyValue] = useState<number>(99.4); // default for Appen

  const handleCopyText = (textToCopy: string, id: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedState(id);
    setTimeout(() => setCopiedState(null), 2500);
  };

  // Helper to dynamically inject modified metrics into copying layouts or active rendering copy
  const getDynamicValue = (caseId: string, itemType: "situation" | "task" | "action" | "result") => {
    const original = caseStudies.find(c => c.id === caseId);
    if (!original) return "";

    if (caseId === "case-1") {
      if (itemType === "result") {
        return `Weekly server backups and strategic consolidation allowed me to reduce unscheduled critical network downtime from 48 hours annually to under ${downTimeHours} hours, achieving a ${(100 - (downTimeHours / 87.6)).toFixed(3)}% uptime across all active physical gateways. Standardized automated installations on 150+ employee setups led to 100% security system protection policy compliance and eliminated $15,000 in redundant licenses.`;
      }
    } else if (caseId === "case-2") {
      if (itemType === "action") {
        return `Engineered a direct, high-speed WordPress layout adjustment reducing baseline pageload speeds by ${webSpeed} seconds via custom caching protocols, managed a dynamic 90-day Instagram and Pinterest scheduling dashboard, and integrated regional tourist keyword indicators.`;
      }
      if (itemType === "result") {
        return `Achieved a ${engagementRate}% organic guest interaction expansion rate which directly fueled a 14% increment in direct commission-free property web bookings. Additionally, automated localized newsletter delivery models pushed a 38% reader open rate and cleared booking collisions.`;
      }
    } else if (caseId === "case-3") {
      if (itemType === "result") {
        return `Consistently exceeded core deliverables to hit a validated ${qaAccuracyValue}% database tag accuracy rate (exceeding standard 98% quality bars) across 12,000+ distinct evaluation routines. Initiated onboarding checklists that boosted candidate productivity scores by 8.2%, recording zero security or PII leakage issues.`;
      }
    }

    // Default back to original
    return original[itemType];
  };

  const getSTARMarkdownString = (study: CaseStudy) => {
    const sit = getDynamicValue(study.id, "situation");
    const tsk = getDynamicValue(study.id, "task");
    const act = getDynamicValue(study.id, "action");
    const res = getDynamicValue(study.id, "result");
    
    return `### CASE STUDY: ${study.title}
**Role**: ${study.role} at **${study.company}** | **Period**: ${study.period}
**Tech Stack**: ${study.techStack.join(", ")}

#### STAR Breakdown:
- **Situation**: ${sit}
- **Task**: ${tsk}
- **Action**: ${act}
- **Result**: ${res}

---`;
  };

  const currentStudy = caseStudies.find(c => c.id === activeTab) || caseStudies[0];

  return (
    <div id="case-studies-container" className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      <div id="case-studies-header" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 id="case-studies-title" className="text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            STAR Case Studies &amp; Projects
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Proven professional track records demonstrating technical administration and automation.
          </p>
        </div>

        {/* Live Customize Toggle */}
        <button
          id="customize-metrics-toggle"
          onClick={() => setIsEditingMetrics(!isEditingMetrics)}
          className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all border ${
            isEditingMetrics 
              ? "bg-blue-600 border-blue-600 text-white shadow-sm hover:bg-blue-700"
              : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-950"
          }`}
        >
          <Sliders className="h-3.5 w-3.5" />
          {isEditingMetrics ? "Lock Metrics Settings" : "Tweak Metrics Live"}
        </button>
      </div>

      {/* Case Tabs Selector */}
      <div id="case-study-tabs" className="flex flex-col sm:flex-row border-b border-slate-100 pb-2 gap-2">
        {caseStudies.map((study) => (
          <button
            id={`tab-select-${study.id}`}
            key={study.id}
            onClick={() => setActiveTab(study.id)}
            className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold text-left transition-all flex items-center gap-2 ${
              activeTab === study.id
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <div className="flex flex-col">
              <span className="font-extrabold">{study.company}</span>
              <span className="text-[10px] opacity-80 font-normal">{study.role}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Dynamic Tweak Controls Panel */}
      <AnimatePresence>
        {isEditingMetrics && (
          <motion.div
            id="tweaker-panel-overlay"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <Settings className="h-4 w-4 text-blue-500" />
                Live Copy &amp; Metrics Customizer Engine
              </span>
              <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">
                Active &amp; Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Slider 1 */}
              <div id="metric-slider-uptime" className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-150 shadow-xs">
                <label className="block text-xs font-bold text-slate-700">Tristellar Outage Target</label>
                <div className="flex items-center justify-between">
                  <span className="text-xxs text-slate-400">Hours Allowed</span>
                  <span className="text-xs font-mono font-bold text-blue-600">{downTimeHours} hrs/yr</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  step="1"
                  value={downTimeHours} 
                  onChange={(e) => setDownTimeHours(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                />
                <p className="text-[9px] text-slate-400">Uptime translates dynamically in output text</p>
              </div>

              {/* Slider 2 */}
              <div id="metric-slider-speed" className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-150 shadow-xs">
                <label className="block text-xs font-bold text-slate-700">WordPress Load Optimized</label>
                <div className="flex items-center justify-between">
                  <span className="text-xxs text-slate-400">Time Reduction</span>
                  <span className="text-xs font-mono font-bold text-teal-600">-{webSpeed} seconds</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="4.0" 
                  step="0.1"
                  value={webSpeed} 
                  onChange={(e) => setWebSpeed(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                />
                <p className="text-[9px] text-slate-400">Page load speed reduction trigger value</p>
              </div>

              {/* Slider 3 */}
              <div id="metric-slider-engagement" className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-150 shadow-xs">
                <label className="block text-xs font-bold text-slate-700">Digital Marketing Growth</label>
                <div className="flex items-center justify-between">
                  <span className="text-xxs text-slate-400">Engagement</span>
                  <span className="text-xs font-mono font-bold text-amber-600">+{engagementRate}% Engagement</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="60" 
                  step="0.5"
                  value={engagementRate} 
                  onChange={(e) => setEngagementRate(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                />
                <p className="text-[9px] text-slate-400">Organic and direct reservation ratios</p>
              </div>

              {/* Slider 4 */}
              <div id="metric-slider-compliance" className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-150 shadow-xs">
                <label className="block text-xs font-bold text-slate-700">Appen Data Quality QA</label>
                <div className="flex items-center justify-between">
                  <span className="text-xxs text-slate-400">Accuracy Rated</span>
                  <span className="text-xs font-mono font-bold text-purple-600">{qaAccuracyValue}% Score</span>
                </div>
                <input 
                  type="range" 
                  min="95" 
                  max="100" 
                  step="0.1"
                  value={qaAccuracyValue} 
                  onChange={(e) => setQaAccuracyValue(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
                />
                <p className="text-[9px] text-slate-400">Strict machine learning schema compliance</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Representation */}
      <motion.div
        key={currentStudy.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div id="study-headline-card" className="border-b border-slate-100 pb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <span id="study-badge-category" className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                <Star className="h-3 w-3 fill-blue-500 text-blue-500" />
                {currentStudy.company} &mdash; Featured Case
              </span>
              <h3 id="study-full-title" className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-2.5">
                {currentStudy.title}
              </h3>
            </div>
            <div className="text-left md:text-right flex-shrink-0">
              <p id="study-role-txt" className="text-sm font-bold text-slate-800">{currentStudy.role}</p>
              <p className="text-xs text-slate-500 flex items-center md:justify-end gap-1 font-mono mt-0.5">
                <Calendar className="h-3 w-3" />
                {currentStudy.period}
              </p>
            </div>
          </div>
          <p id="study-subtitle-txt" className="text-slate-500 text-xs md:text-sm italic mt-2.5">
            &ldquo;{currentStudy.subtitle}&rdquo;
          </p>
        </div>

        {/* Dynamic Metric Badges */}
        <div id="study-metrics-row" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {currentStudy.metrics.map((metric, i) => {
            // Apply corresponding reactive state values if customizer is active
            let displayVal = metric.value;
            let displayDetail = metric.detail;
            if (currentStudy.id === "case-1") {
              if (metric.label === "Downtime Reduced") {
                displayVal = `< ${downTimeHours} Hrs/Yr`;
              }
              if (metric.label === "Annual Uptime") {
                displayVal = `${(100 - (downTimeHours / 87.6)).toFixed(3)}%`;
              }
            } else if (currentStudy.id === "case-2") {
              if (metric.label === "Organic Engagement") {
                displayVal = `+ ${Math.round(engagementRate)}%`;
              }
              if (metric.label === "Web Pageload") {
                displayVal = `-${webSpeed}s`;
              }
            } else if (currentStudy.id === "case-3") {
              if (metric.label === "QA Accuracy Rate") {
                displayVal = `${qaAccuracyValue}%`;
              }
            }

            return (
              <div id={`study-metric-card-${i}`} key={metric.label} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{metric.label}</span>
                  <p id={`metric-val-num-${i}`} className="text-xl md:text-2xl font-black text-slate-900 mt-1 font-mono">{displayVal}</p>
                </div>
                <p className="text-[11px] text-slate-500 font-medium mt-1 leading-normal">{displayDetail}</p>
              </div>
            );
          })}
        </div>

        {/* STAR formatted timeline blocks */}
        <div id="star-blocks-stack" className="space-y-4">
          {/* Situation */}
          <div className="group flex items-start gap-4 p-4.5 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50/20 transition-all">
            <span className="h-7 w-7 text-xs font-black text-rose-600 bg-rose-50 flex items-center justify-center rounded-lg mt-0.5 flex-shrink-0">S</span>
            <div>
              <h4 id="block-label-s" className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">SITUATION</h4>
              <p id="block-value-s" className="text-slate-700 text-sm mt-1 leading-relaxed">
                {getDynamicValue(currentStudy.id, "situation")}
              </p>
            </div>
          </div>

          {/* Task */}
          <div className="group flex items-start gap-4 p-4.5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50/20 transition-all">
            <span className="h-7 w-7 text-xs font-black text-indigo-600 bg-indigo-50 flex items-center justify-center rounded-lg mt-0.5 flex-shrink-0">T</span>
            <div>
              <h4 id="block-label-t" className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">TASK STATEMENT</h4>
              <p id="block-value-t" className="text-slate-700 text-sm mt-1 leading-relaxed">
                {getDynamicValue(currentStudy.id, "task")}
              </p>
            </div>
          </div>

          {/* Action */}
          <div className="group flex items-start gap-4 p-4.5 rounded-2xl border border-slate-200 bg-white hover:border-amber-200 hover:bg-slate-50/20 transition-all">
            <span className="h-7 w-7 text-xs font-black text-amber-600 bg-amber-50 flex items-center justify-center rounded-lg mt-0.5 flex-shrink-0">A</span>
            <div>
              <h4 id="block-label-a" className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">ACTIONS EXECUTED</h4>
              <p id="block-value-a" className="text-slate-700 text-sm mt-1 leading-relaxed font-sans">
                {getDynamicValue(currentStudy.id, "action")}
              </p>
            </div>
          </div>

          {/* Result */}
          <div className="group flex items-start gap-4 p-4.5 rounded-2xl border border-emerald-300 bg-emerald-50/10 hover:bg-emerald-50/25 transition-all">
            <span className="h-7 w-7 text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 flex items-center justify-center rounded-lg mt-0.5 flex-shrink-0">R</span>
            <div>
              <h4 id="block-label-r" className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">RESULTS &amp; OUTCOMES (METRIC COMPLIANT)</h4>
              <p id="block-value-r" className="text-slate-700 text-sm mt-1 font-sans font-medium leading-relaxed">
                {getDynamicValue(currentStudy.id, "result")}
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack List */}
        <div id="study-tech-tags" className="bg-slate-50 rounded-2xl p-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-extrabold text-slate-450 uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Zap className="h-3.5 w-3.5 text-blue-500 fill-blue-500/20" />
            CORE ENVIRONMENT &amp; PROCESS:
          </span>
          {currentStudy.techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 font-mono shadow-xxs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Copy Case Copy Trigger */}
        <div id="copy-case-study" className="flex justify-end pt-2">
          <button
            id="copy-formatted-case-button"
            onClick={() => handleCopyText(getSTARMarkdownString(currentStudy), currentStudy.id)}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition duration-200"
          >
            {copiedState === currentStudy.id ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Copied Formatted Case Study!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy Styled STAR Text (Markdown)
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
