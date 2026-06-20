import { useState } from "react";
import { motion } from "motion/react";
import { Search, Server, Shield, Database, Compass, Terminal, Cpu, Users, Award } from "lucide-react";
import { Competency } from "../types";

interface CompetenciesViewProps {
  competencies: Competency[];
}

const categoryMeta = {
  all: { label: "All Skills", color: "bg-slate-100 text-slate-800 border-slate-200" },
  infrastructure: { label: "IT Infrastructure & Security", color: "bg-blue-50 text-blue-700 border-blue-200" },
  support: { label: "Technical Support & Troubleshooting", color: "bg-amber-50 text-amber-700 border-amber-200" },
  admin: { label: "Administration & Content Management", color: "bg-teal-50 text-teal-700 border-teal-200" },
  leadership: { label: "Team Leadership & Vendor Management", color: "bg-purple-50 text-purple-700 border-purple-200" },
};

export default function CompetenciesView({ competencies }: CompetenciesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCompetencies = competencies.filter((skill) => {
    const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "infrastructure":
        return <Server className="h-4.5 w-4.5 text-blue-500" />;
      case "support":
        return <Terminal className="h-4.5 w-4.5 text-amber-500" />;
      case "admin":
        return <Cpu className="h-4.5 w-4.5 text-teal-500" />;
      case "leadership":
        return <Users className="h-4.5 w-4.5 text-purple-500" />;
      default:
        return <Compass className="h-4.5 w-4.5 text-slate-500" />;
    }
  };

  return (
    <div id="competencies-container-root" className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      <div id="competency-header-row" className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 id="competency-title" className="text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Core Professional Competencies
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Explore technically vetted expertise covering systems modernizing, SLA audits, and automation.
          </p>
        </div>

        {/* Search Component */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            id="competency-search-input"
            type="text"
            placeholder="Search credentials & tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div id="competency-filters" className="flex flex-wrap gap-2 pb-2 border-b border-slate-100">
        {(Object.keys(categoryMeta) as Array<keyof typeof categoryMeta>).map((catKey) => {
          const isActive = selectedCategory === catKey;
          return (
            <button
              id={`filter-btn-${catKey}`}
              key={catKey}
              onClick={() => setSelectedCategory(catKey)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isActive 
                  ? "bg-slate-900 border-slate-900 text-white shadow-sm" 
                  : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              {categoryMeta[catKey].label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div id="skills-grid-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompetencies.length > 0 ? (
          filteredCompetencies.map((skill, index) => (
            <motion.div
              id={`skill-card-${index}`}
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="group border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white p-4.5 rounded-2xl transition-all duration-250 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${categoryMeta[skill.category].color}`}>
                    {getCategoryIcon(skill.category)}
                    {skill.category === "infrastructure" && "Infrastructure"}
                    {skill.category === "support" && "Tech Support"}
                    {skill.category === "admin" && "Administration"}
                    {skill.category === "leadership" && "IT Leadership"}
                  </span>

                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-sm select-none ${i < skill.rating ? "opacity-100" : "opacity-25"}`}
                      >
                        ✦
                      </span>
                    ))}
                  </div>
                </div>

                <h3 id={`skill-name-${index}`} className="font-bold text-slate-850 group-hover:text-blue-600 transition-colors tracking-tight text-sm md:text-base">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Graphical level bar */}
              <div className="mt-4 pt-3 border-t border-slate-100/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PRO LEVEL</span>
                <span className="text-xs font-bold text-slate-700 font-mono">
                  {skill.rating === 5 ? "Expert (100%)" : "Advanced (85%)"}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div id="no-skills-found" className="col-span-full py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="font-medium text-sm">No skills found matching your parameters.</p>
            <button 
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }} 
              className="text-blue-600 text-xs font-semibold hover:underline mt-2"
            >
              Reset Search Filter
            </button>
          </div>
        )}
      </div>

      {/* Infrastructure Heatmap Callout */}
      <div id="competency-info-banner" className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-xs md:text-sm text-slate-600">
        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-700 rounded-xl font-bold">
          <Award className="h-5 w-5" />
        </div>
        <div>
          <span className="font-bold text-slate-800">Operational Methodology Note:</span> This skills matrix is configured with specific reference to systems engineering, ITIL SLA response strategies, and high-integrity compliance frameworks required for multi-site remote enterprises.
        </div>
      </div>
    </div>
  );
}
