/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Code2, 
  FileText, 
  ArrowRight, 
  Mail, 
  Linkedin, 
  Layers, 
  Award, 
  Download, 
  Send, 
  Check, 
  Cpu, 
  ShieldCheck, 
  Database,
  Printer,
  FolderHeart
} from "lucide-react";
import { initialPortfolioData } from "./portfolioData";
import PortfolioHeader from "./components/PortfolioHeader";
import CompetenciesView from "./components/CompetenciesView";
import CaseStudiesView from "./components/CaseStudiesView";
import MarkdownCopier from "./components/MarkdownCopier";
import InquiryGenerator from "./components/InquiryGenerator";
import ShowcaseView from "./components/ShowcaseView";
import GmailAutomationHub from "./components/GmailAutomationHub";

export default function App() {
  const [activeTab, setActiveTab] = useState<"visual" | "showcase" | "gmail" | "copy" | "inquiry">("visual");
  const data = initialPortfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 pb-20">
      {/* Top Professional Navigation Bar */}
      <nav id="top-navbar" className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-lg tracking-wide shadow-sm">
              AP
            </div>
            <div>
              <p className="font-extrabold text-slate-900 tracking-tight text-sm leading-none">April Shyne Palacios</p>
              <p className="text-[10px] font-bold text-blue-600 font-mono tracking-widest uppercase mt-1">Tech VA &amp; IT Specialist</p>
            </div>
          </div>

          {/* Interactive Mode Select Tab Row */}
          <div className="flex items-center gap-1.5 bg-slate-100/85 p-1 rounded-2xl border border-slate-200">
            <button
              id="tab-visual-view"
              onClick={() => setActiveTab("visual")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "visual"
                  ? "bg-white text-slate-950 shadow-xs border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Layers className="h-3.5 w-3.5 text-blue-500" />
              <span className="hidden md:inline">Visual Portfolio</span> Portfolio
            </button>
            <button
              id="tab-showcase-view"
              onClick={() => setActiveTab("showcase")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "showcase"
                  ? "bg-white text-slate-950 shadow-xs border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <FolderHeart className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
              <span>Showcase Exhibits</span>
            </button>
            <button
              id="tab-copy-view"
              onClick={() => setActiveTab("copy")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "copy"
                  ? "bg-white text-slate-950 shadow-xs border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Code2 className="h-3.5 w-3.5 text-slate-700" />
              <span>Copywriter Hub</span>
            </button>
            <button
              id="tab-inquiry-view"
              onClick={() => setActiveTab("inquiry")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "inquiry"
                  ? "bg-white text-slate-950 shadow-xs border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Inquiry Builder</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Dynamic Warning Notification */}
        <div id="welcome-notification" className="bg-gradient-to-r from-slate-900 to-blue-955 text-white p-4.5 rounded-3xl border border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md bg-slate-900">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <p className="font-extrabold text-sm md:text-base tracking-tight">Technical Portfolio Strategy Activated</p>
              <p className="text-xs text-slate-350 mt-0.5">This platform integrates real, metrics-oriented copy and full export options.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("copy")}
              className="text-xs bg-white text-slate-950 font-bold px-3.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Quick Export to Upwork
            </button>
            <button
              onClick={handlePrint}
              className="p-1.5 hover:bg-white/10 text-white rounded-xl transition-colors"
              title="Print standard copy layout"
            >
              <Printer className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Tab Route Render Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            {activeTab === "visual" && (
              <>
                {/* Visual View Content */}
                <PortfolioHeader personalInfo={data.personalInfo} />

                {/* --- Section Divider --- */}
                <hr className="border-slate-200 my-8" />

                {/* Core Competencies Matrix */}
                <CompetenciesView competencies={data.competencies} />

                {/* --- Section Divider --- */}
                <hr className="border-slate-200 my-8" />

                {/* STAR Case Studies Block */}
                <CaseStudiesView initialCaseStudies={data.caseStudies} />

                {/* --- Section Divider --- */}
                <hr className="border-slate-200 my-8" />

                {/* Creative Trust / Services Section */}
                <div id="expert-services-bento" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold tracking-widest text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md uppercase">Vetted Work Methods</span>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">The Professional Standard: Combining Assistance with High-Level IT Administration</h3>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                        Modern enterprises do not just struggle with typical scheduling. They face security compliance challenges, outdated website infrastructure bottlenecking bookings, and unmonitored vendors. By acting as both an administrative lead and systems supervisor, I eliminate security risks and maximize operation speeds.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex gap-3">
                        <span className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">✓</span>
                        <div>
                          <p className="font-bold text-xs md:text-sm text-slate-800">4-Hour RTO Goals</p>
                          <p className="text-[11px] text-slate-400">Rigid incremental backups protect client operations.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">✓</span>
                        <div>
                          <p className="font-bold text-xs md:text-sm text-slate-800">WordPress Optimization</p>
                          <p className="text-[11px] text-slate-400">Speed tweaks to pull down direct reservations effortlessly.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-950 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-955/50 border border-blue-900/50 px-2 py-0.5 rounded-md">
                        Core SLA Goals
                      </span>
                      <h4 className="text-lg font-bold">Standard Operation Security SLA</h4>
                      <ul className="space-y-2 text-xs text-slate-350 font-medium">
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                          Emergency response time &lt; 30 mins
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                          Zero security leakage index policy
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                          Weekly status dashboards on assets
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                          PII &amp; compliance adherence
                        </li>
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Availability Status</p>
                        <p className="font-extrabold text-slate-100 flex items-center gap-1 mt-0.5">
                          <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                          20 Hours / Week
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("inquiry")}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center"
                        title="Open collaboration planner"
                      >
                        <ArrowRight className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* --- Section Divider --- */}
                <hr className="border-slate-200 my-8" />

                {/* CTA Sector */}
                <div id="cta-contact-block" className="relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-8 md:p-12 text-center space-y-5 shadow-sm">
                  {/* Decorative faint grid lines */}
                  <div className="absolute inset-0 bg-radial-gradient from-blue-50/10 to-transparent pointer-events-none opacity-60" />
                  
                  <div className="relative space-y-3 max-w-2xl mx-auto">
                    <span className="text-[11px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      Let&apos;s Build Success Together
                    </span>
                    <h2 id="cta-title" className="text-3xl font-black text-slate-900 tracking-tight">
                      Ready to Streamline Your Admin Workflows and Secure Your IT Infrastructure?
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                      Whether you are looking for an ongoing Technical Support Coordinator or need targeted WordPress database tuning and compliance audits, I provide reliable solutions that minimize business downtime.
                    </p>
                  </div>

                  <div id="cta-actions" className="relative flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <a
                      id="cta-footer-email"
                      href={`mailto:${data.personalInfo.email}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      <Mail className="h-5 w-5" />
                      Email April &mdash; {data.personalInfo.email}
                    </a>
                    <a
                      id="cta-footer-linkedin"
                      href={`https://${data.personalInfo.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-6 py-3 rounded-xl transition-all"
                    >
                      <Linkedin className="h-5 w-5 text-blue-600" />
                      Connect via LinkedIn
                    </a>
                  </div>
                </div>
              </>
            )}

            {activeTab === "showcase" && (
              <ShowcaseView />
            )}

            {activeTab === "gmail" && (
              <GmailAutomationHub />
            )}

            {activeTab === "copy" && (
              <MarkdownCopier personalInfo={data.personalInfo} />
            )}

            {activeTab === "inquiry" && (
              <InquiryGenerator email={data.personalInfo.email} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Structured Footer */}
      <footer id="app-footer" className="mt-20 border-t border-slate-200 bg-white py-12 text-center text-xs text-slate-400 font-sans">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-600 font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Designed &amp; Managed by April Shyne Palacios Portfolio Hub
          </div>
          <p className="max-w-md mx-auto leading-relaxed">
            Formulated utilizing STAR-based business metrics and secure administrative operational frameworks. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500">
            <a href={`mailto:${data.personalInfo.email}`} className="hover:text-blue-600">Email Direct</a>
            <span>&bull;</span>
            <a href={`https://${data.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

