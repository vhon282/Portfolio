import { useState } from "react";
import { motion } from "motion/react";
import { 
  FolderHeart, 
  Image as ImageIcon, 
  FileText, 
  Cpu, 
  Sparkles, 
  UploadCloud, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  Database
} from "lucide-react";

interface SampleItem {
  id: string;
  category: "marketing" | "doc" | "automation";
  title: string;
  subtitle: string;
  description: string;
  provenSkills: string[];
  placeholderLabel: string;
  placeholderInstructions: string;
  metricsLabel?: string;
  metricsValue?: string;
}

export default function ShowcaseView() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "marketing" | "doc" | "automation">("all");

  const samples: SampleItem[] = [
    // CATEGORY 1: DESIGN & MARKETING SAMPLES
    {
      id: "sample-marketing-1",
      category: "marketing",
      title: "Automated 90-Day Content & Booking Pipeline",
      subtitle: "Multi-channel scheduling blueprint engineered to minimize manual posting workloads.",
      description: "A comprehensive social media calendar structure featuring localized search keywords and scheduled assets across Instagram, Pinterest, and regional tourism campaigns. Created to transition flat guest booking volumes to commission-free direct booking conversions.",
      provenSkills: ["WordPress CMS Alignment", "Local SEO Optimization", "Automation Content Calendars", "Social Media Asset Organization"],
      placeholderLabel: "Upload Content Calendar PDF / Active Booking Feed Link",
      placeholderInstructions: "Replace with an exported PNG preview of your Airtable/Trello content pipeline or a screenshot of your active guest book channel planner.",
      metricsValue: "+25.3%",
      metricsLabel: "Direct Organic Engagement Growth"
    },
    {
      id: "sample-marketing-2",
      category: "marketing",
      title: "WordPress Layout Redesign & Speed Audits",
      subtitle: "Full-page conversion layout optimized for mobile travelers and listing speed.",
      description: "Visual wireframe blueprint and technical performance tuning. Illustrates selective asset caching, optimized media load-times, and intuitive user flows designed to decrease guest bounce rates.",
      provenSkills: ["WordPress Speed Tuning", "UX Design Audits", "Mobile Optimization", "Call-To-Action Layouts"],
      placeholderLabel: "Upload Web Design Screengrabs / GTmetrix Reports",
      placeholderInstructions: "Anchor active GTmetrix speed charts or high-resolution desktop mocks here. (Goal: < 2.5s page load).",
      metricsValue: "-1.8s",
      metricsLabel: "Base Web Pageload Reduction"
    },

    // CATEGORY 2: TECHNICAL & SYSTEM DOCUMENTATION
    {
      id: "sample-doc-1",
      category: "doc",
      title: "Enterprise Disaster Recovery & RPO/RTO Policies",
      subtitle: "Rigid standard operating policies designed for system failovers and business continuity.",
      description: "Comprehensive step-by-step documentation detailing 4-hour Recovery Time Objective (RTO) procedures, daily non-blocking incremental backups, and secondary ISP server failover setups configured for multi-branch organizations.",
      provenSkills: ["Disaster Recovery Strategy", "ITIL Compliance", "Infrastructure Redundancy", "SOP Authoring"],
      placeholderLabel: "Upload Disaster Recovery PDF / Compliance SOP Copy",
      placeholderInstructions: "Affix redacted PDF sheets of your IT backup protocols, server check list, or enterprise recovery flows.",
      metricsValue: "99.95%",
      metricsLabel: "Uptime SLA Conformance"
    },
    {
      id: "sample-doc-2",
      category: "doc",
      title: "Corporate Device Endpoint & Secure Firewall SOP",
      subtitle: "Automated patch scheduling rules and network perimeter hardening documentation.",
      description: "Security administration manual mapping automated patch rolls to 150+ corporate devices. Clarifies firewall gateway policies and localized security sweeps to reduce unauthorized vulnerability queries.",
      provenSkills: ["Endpoint Protection Policy", "Corporate Network Firewalls", "SLA Incident Response", "SOP Drafting"],
      placeholderLabel: "Upload Network Node Outline / Endpoint Checklist",
      placeholderInstructions: "Insert network architecture diagrams, routing blueprints, or redacted hardware/antivirus policies.",
      metricsValue: "100%",
      metricsLabel: "Compliance within 30 days"
    },

    // CATEGORY 3: DATA & PROCESS AUTOMATION
    {
      id: "sample-automation-1",
      category: "automation",
      title: "High-Precision ML Data Validation & QA Logs",
      subtitle: "Custom verification matrices ensuring database integrity for machine learning query schemas.",
      description: "A technical evaluation template demonstrating cross-calibration checklists, data labeling workflows, and sandbox testing protocols designed to identify and replace anomalies with minimal friction.",
      provenSkills: ["PII Confidentiality Protocols", "Data Quality Control", "Query Classification Matrices", "Verification Logs"],
      placeholderLabel: "Place Redacted Excel Database File / QA Tracker Link here",
      placeholderInstructions: "Introduce a redacted Google Sheets link or an image of your data classification performance log.",
      metricsValue: "99.4%",
      metricsLabel: "Average QA Accuracy Standard"
    },
    {
      id: "sample-automation-2",
      category: "automation",
      title: "Administrative Process Automation Pipeline",
      subtitle: "Zapier / Make custom mapping linking guest check-ins with centralized booking systems.",
      description: "A flowchart diagram mapping server hooks, property management channel synching, and instant guest communication triggers that eliminate booking collision occurrences.",
      provenSkills: ["Zapier / Make Integrations", "Channel Booking Management", "System Trigger Workflows", "Operations Automating"],
      placeholderLabel: "Upload Automated Workflow Flowchart / API Map",
      placeholderInstructions: "Attach structural screenshots of your active API webhook, Zapier loop, or PMS database configuration.",
      metricsValue: "0",
      metricsLabel: "Web Double-Bookings Detected"
    }
  ];

  const filteredSamples = selectedCategory === "all"
    ? samples
    : samples.filter(s => s.category === selectedCategory);

  return (
    <div id="showcase-view-container" className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-8">
      {/* Dynamic Header */}
      <div id="showcase-heading-sec" className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-700 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Verified Portfolio Exhibits
          </span>
          <h2 id="showcase-title" className="text-2xl md:text-3xl font-bold text-slate-950 tracking-tight flex items-center gap-2.5 mt-2">
            <FolderHeart className="h-7 w-7 text-blue-600" />
            Showcase &amp; Sample Exhibits
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl">
            A secure repository of professional deliverables. Easily replace these professional blueprint placeholders with your own live files as you customize April&apos;s portfolio.
          </p>
        </div>

        {/* Categories Navigation */}
        <div className="flex gap-2 bg-slate-50 border border-slate-200 p-1 rounded-2xl flex-wrap">
          <button
            id="cat-select-all"
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedCategory === "all"
                ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                : "border-transparent text-slate-550 hover:text-slate-900"
            }`}
          >
            All Samples
          </button>
          <button
            id="cat-select-marketing"
            onClick={() => setSelectedCategory("marketing")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedCategory === "marketing"
                ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                : "border-transparent text-slate-550 hover:text-slate-900"
            }`}
          >
            Design &amp; Marketing
          </button>
          <button
            id="cat-select-doc"
            onClick={() => setSelectedCategory("doc")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedCategory === "doc"
                ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                : "border-transparent text-slate-550 hover:text-slate-900"
            }`}
          >
            IT SOPs &amp; Documentation
          </button>
          <button
            id="cat-select-automation"
            onClick={() => setSelectedCategory("automation")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedCategory === "automation"
                ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                : "border-transparent text-slate-550 hover:text-slate-900"
            }`}
          >
            Data &amp; Automation
          </button>
        </div>
      </div>

      {/* Showcase Grid */}
      <div id="showcase-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSamples.map((sample, idx) => (
          <motion.div
            id={`sample-item-card-${sample.id}`}
            key={sample.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group flex flex-col justify-between border border-slate-200 hover:border-slate-300 rounded-2xl p-5 md:p-6 bg-slate-50/50 hover:bg-white transition-all shadow-xxs"
          >
            <div className="space-y-4">
              {/* Card Meta & Badging */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider border ${
                  sample.category === "marketing"
                    ? "bg-teal-50 text-teal-700 border-teal-200"
                    : sample.category === "doc"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-purple-50 text-purple-700 border-purple-200"
                }`}>
                  {sample.category === "marketing" && <ImageIcon className="h-3 w-3" />}
                  {sample.category === "doc" && <FileText className="h-3 w-3" />}
                  {sample.category === "automation" && <Cpu className="h-3 w-3" />}
                  {sample.category === "marketing" && "Design & Marketing Sample"}
                  {sample.category === "doc" && "IT SOP & Network Specs"}
                  {sample.category === "automation" && "Data integrity & Web Hooks"}
                </span>

                {sample.metricsValue && (
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-800 bg-white border border-slate-200 py-1 px-2.5 rounded-lg">
                    {sample.category === "marketing" && <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />}
                    {sample.category === "doc" && <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />}
                    {sample.category === "automation" && <Database className="h-3.5 w-3.5 text-purple-500" />}
                    <span>{sample.metricsValue}</span>
                    <span className="text-[10px] text-slate-400 font-normal ml-0.5">{sample.metricsLabel}</span>
                  </div>
                )}
              </div>

              {/* Title Section */}
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                  {sample.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">
                  {sample.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {sample.description}
              </p>

              {/* HIGH FIDELITY PLACEHOLDER */}
              <div className="relative border border-dashed border-slate-350 bg-white p-5 rounded-xl flex flex-col items-center justify-center text-center space-y-2 group/placeholder cursor-pointer hover:border-blue-400 hover:bg-blue-50/5 transition-all">
                <div className="h-10 w-10 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center group-hover/placeholder:scale-105 group-hover/placeholder:border-blue-300 group-hover/placeholder:text-blue-500 transition-all">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-750 group-hover/placeholder:text-blue-600 transition-colors">
                    {sample.placeholderLabel}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium max-w-sm mt-1 leading-normal">
                    {sample.placeholderInstructions}
                  </p>
                </div>
                {/* Visual hover tip */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover/placeholder:opacity-100 transition-opacity text-[9px] font-bold text-blue-500 flex items-center gap-0.5">
                  View Setup Spec
                  <ChevronRight className="h-2.5 w-2.5" />
                </div>
              </div>
            </div>

            {/* Proven Skills Section */}
            <div id="proven-skills-box" className="mt-5 pt-4 border-t border-slate-200/60">
              <p className="text-[10px] font-extrabold text-slate-450 uppercase tracking-widest mb-1.5">
                Skills Proven &mdash; STAR Competence:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {sample.provenSkills.map(skill => (
                  <span 
                    key={skill} 
                    className="text-[10px] font-bold font-mono text-slate-600 bg-white border border-slate-200 py-0.5 px-2 rounded-md"
                  >
                    ✦ {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Portfolio Showcase Guide banner */}
      <div id="showcase-instruction-banner" className="bg-slate-900 border border-slate-950 text-white rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-4.5 w-4.5 text-amber-500 fill-amber-500/15 animate-pulse" />
            Quick Customization Tip for April
          </p>
          <p className="text-xs text-slate-350 max-w-2xl leading-relaxed">
            When exporting or embedding links, you can link directly to actual hosted PDFs on cloud files (Google Drive, Dropbox) or live websites within this UI to transform it into your permanent live exhibits page!
          </p>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById("customize-metrics-toggle");
            if (el) el.click();
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-colors shrink-0"
        >
          Tweak Case Metrics
        </button>
      </div>

    </div>
  );
}
