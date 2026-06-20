import { useState } from "react";
import { Mail, Sparkles, Send, CheckSquare, Plus, Check } from "lucide-react";

interface InquiryGeneratorProps {
  email: string;
}

export default function InquiryGenerator({ email }: InquiryGeneratorProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(["WordPress Speed Opt"]);
  const [timeline, setTimeline] = useState<string>("Continuous Retainer");
  const [hoursBudget, setHoursBudget] = useState<number>(20); // hours per week

  const servicesList = [
    { id: "WordPress Speed Opt", label: "WordPress Speed Tuning & SEO", category: "admin" },
    { id: "Disaster Recovery", label: "Disaster Recovery & Redundancy Backup Setup", category: "infrastructure" },
    { id: "Endpoint Protection", label: "Automated Laptop/Device Security Policy", category: "infrastructure" },
    { id: "Social Media Scheduling", label: "Digital Marketing Scheduler", category: "admin" },
    { id: "Data Quality Auditing", label: "High-Accuracy Data & Content Integrity Audit", category: "compliance" },
    { id: "Full-Time Operations", label: "Ongoing IT Supervision & Support Desk Management", category: "support" }
  ];

  const handleToggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(s => s !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const getEstimatedAutomationImpact = () => {
    let baseTimeSaved = 0;
    let downtimeRiskReduction = "90%";
    
    if (selectedServices.includes("WordPress Speed Opt")) {
      baseTimeSaved += 4;
    }
    if (selectedServices.includes("Disaster Recovery")) {
      baseTimeSaved += 8;
      downtimeRiskReduction = "99.95%";
    }
    if (selectedServices.includes("Endpoint Protection")) {
      baseTimeSaved += 5;
    }
    if (selectedServices.includes("Social Media Scheduling")) {
      baseTimeSaved += 6;
    }
    if (selectedServices.includes("Data Quality Auditing")) {
      baseTimeSaved += 10;
    }
    if (selectedServices.includes("Full-Time Operations")) {
      baseTimeSaved += 15;
    }

    return {
      hoursSaved: baseTimeSaved,
      uptimeGuarantee: downtimeRiskReduction
    };
  };

  const getGeneratedEmailContent = () => {
    const servicesText = selectedServices.length > 0 
      ? selectedServices.map(s => ` - ${s}`).join("\n")
      : " - General IT Support and Technical Virtual Assistance";

    const subject = `Inquiry: Tech VA & IT Supervision Services Collaboration`;
    const body = `Hi April,

I reviewed your portfolio showcasing your technical projects. I am interested in collaborating with you on the following customized scope:

${servicesText}

Timeline Preference: ${timeline}
Expected Collaboration Model: ~${hoursBudget} Hours per Week

Could you please share your availability for a brief 15-minute discovery call next week? We would love to discuss standardizing our setup and leverage your automated workflows (like your ${hoursBudget > 20 ? 'IT Supervisor' : 'Technical VA'} case studies).

Looking forward to speaking soon!

Best regards,
[Name]
[Company / Project]`;

    return { subject, body };
  };

  const handleSendEmail = () => {
    const { subject, body } = getGeneratedEmailContent();
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const impactMetrics = getEstimatedAutomationImpact();

  return (
    <div id="inquiry-generator-container" className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      <div id="inquiry-header">
        <h2 id="inquiry-title" className="text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-blue-600 fill-blue-500/10" />
          Interactive Collaboration Builder
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Select your corporate bottlenecks below to build a customized support inquiry with instant efficiency projections.
        </p>
      </div>

      <div id="inquiry-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Selection Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Services selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Select Requirements (Select All That Apply)
            </label>
            <div id="services-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {servicesList.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <button
                    id={`service-toggle-${service.id.replace(/\s+/g, "_")}`}
                    key={service.id}
                    onClick={() => handleToggleService(service.id)}
                    className={`p-3 text-left rounded-xl border text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 border-blue-300 text-blue-700 shadow-xxs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div className={`h-4.5 w-4.5 rounded-md flex items-center justify-center border ${
                      isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white"
                    }`}>
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>
                    <span>{service.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Timeline Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                2. Target Timeline
              </label>
              <select
                id="timeline-dropdown"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="Urgent Assignment">Urgent (&lt; 2 Weeks)</option>
                <option value="1 - 3 Months Project">Short-Term Project (1-3 Mo)</option>
                <option value="Continuous Retainer">Long-Term Retainer (Ongoing)</option>
              </select>
            </div>

            {/* Budget/Hours */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                3. Desired Allocation
              </label>
              <div className="flex items-center justify-between gap-2.5">
                <input
                  id="hours-slider-input"
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={hoursBudget}
                  onChange={(e) => setHoursBudget(Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-xs font-mono font-bold text-slate-850 shrink-0 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                  {hoursBudget} hrs/wk
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Projections Column */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-950 text-white p-5 rounded-2xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest bg-blue-950/50 border border-blue-900/40 px-2 py-0.5 rounded-md">
              Customized Projection Output
            </span>

            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium">Est. Weekly Administrative Time Saved:</span>
                <span className="text-sm font-mono font-extrabold text-teal-400">~{impactMetrics.hoursSaved} Hours</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium">Infrastructure Downtime Risk Mitigated:</span>
                <span className="text-sm font-mono font-extrabold text-blue-400">To {impactMetrics.uptimeGuarantee} standard</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium">Operational Security Enforcement:</span>
                <span className="text-sm font-mono font-extrabold text-emerald-400">100% SLA Compliant</span>
              </div>
            </div>

            {/* Simulated scope pitch */}
            <p className="text-slate-400 text-xs leading-relaxed italic">
              &ldquo;With {hoursBudget} hours weekly allocated over the &apos;{timeline}&apos; track, April Shyne Palacios can fully transition operational backups, patch updates, and database tuning to robust automated controls.&rdquo;
            </p>
          </div>

          <button
            id="shoot-email-btn"
            onClick={handleSendEmail}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
          >
            <Send className="h-4 w-4" />
            Launch Email Proposal to April
          </button>
        </div>
      </div>
    </div>
  );
}
