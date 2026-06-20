import { useState } from "react";
import { Copy, CheckSquare, FileText, Download, Award, ShieldAlert } from "lucide-react";

interface MarkdownCopierProps {
  personalInfo: {
    name: string;
    title: string;
    tagline: string;
    description: string;
    email: string;
    linkedin: string;
  };
}

export default function MarkdownCopier({ personalInfo }: MarkdownCopierProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const getFullMarkdown = () => {
    return `# PORTFOLIO: ${personalInfo.name.toUpperCase()}
## ${personalInfo.title.toUpperCase()}
*${personalInfo.tagline}*

---

## PROFESSIONAL SUMMARY
${personalInfo.description}

- **Experience**: 5+ Years Technical Track Record
- **Email**: ${personalInfo.email}
- **LinkedIn**: [${personalInfo.linkedin}](https://${personalInfo.linkedin})

---

## CORE COMPETENCIES

### 1. IT Infrastructure & Security
- **IT Infrastructure Design**: Designing corporate networks, setting up off-site storage pipelines, and managing server clusters.
- **Security & Endpoint Protection**: Implementing firewall policies, managing automated antivirus rollouts, and carrying out security audits.
- **Disaster Recovery Planning**: Authoring RPO/RTO goals, establishing routine backups, and simulating failovers.
- **Virtualization & Cloud Hosting**: Managing VPS hosting platforms, container setups, and virtual server machines.

### 2. Technical Support & Troubleshooting
- **Advanced Hard/Soft Troubleshooting**: Tech support resolving complex OS configurations, hardware bottlenecks, and routing bugs.
- **Helpdesk & SLA Administration**: Managing ticket responses, user support, and escalating issues efficiently.
- **Patch Management & Compliance**: Automated distribution of updates to OS, third-party software, and physical assets.

### 3. Administration & Content Management
- **WordPress & CMS Administration**: Managing site structures, installing updates, database tuning, and speed optimization.
- **Digital Media Scheduling**: Creating calendar frameworks, setting up automated postings, and analyzing engagement metrics.
- **High-Privacy Data Integrity**: Maintaining strict compliance with PII records and managing sensitive data pipelines safely.

### 4. Team Leadership & Vendor Management
- **IT Team Leadership**: Mentoring junior technicians, managing shift rosters, and overseeing team operations.
- **Vendor SLA Management**: Auditing multi-party contracts, evaluating ISP lines, and optimizing licensing budgets.

---

## CASE STUDIES (STAR METHOD)

### Case Study 1 (IT Infrastructure & Leadership): Tristellar Trading
- **Situation**: Tristellar Trading suffered from recurrent network outages, unpatched security vulnerabilities on active client servers, and uncoordinated third-party vendor contracts. This severely impacted physical and digital trading operations, exposing the business to major SLA failures and security sweeps.
- **Task**: Standardize the company's IT infrastructure, establish dynamic disaster recovery pipelines, enforce server security policies across 12+ offices, and consolidate vendor SLAs to reduce unscheduled critical downtime.
- **Action**: Drafted and audited comprehensive security policies; designed automatic offsite incremental backups with a **4-hour Recovery Time Objective (RTO)**; negotiated high-availability redundant contracts with key ISPs; deployed automated endpoint patch management systems on **150+ corporate devices**.
- **Result**: Reduced unscheduled downtime from **48 hours annually to under 4 hours (99.95% uptime achievement)**; achieved **100% patch compliance within 30 days**; saved **$15,000 in redundant licenses** and vendor fees through strategic supplier consolidation; secured all physical network gateways reducing vulnerability sweeps to **0**.
- **Tech Stack**: *Endpoint Patch Management, Disaster Recovery Backup Solutions, VPS Architecture, SLA Negotiation, Network Firewall Administration*

---

### Case Study 2 (Digital Marketing & Virtual Assistance): Brown County Vacation Rental
- **Situation**: The portfolio of premium properties suffered from low direct booking ratios, outdated web listings, and static social media profiles, limiting organic online guest acquisition and increasing dependency on high-fee third-party hosting platforms.
- **Task**: Refresh the WordPress content layout, optimize loading speeds on image-heavy listings, curate an optimized, high-velocity 90-day multi-channel digital media calendar, and deploy local SEO tactics.
- **Action**: Implemented an intuitive WordPress UI restructure, reducing pageload speed by **1.8 seconds** through selective asset caching and media optimization; engineered a highly structured visual content pipeline on Instagram, Pinterest, and Facebook; researched and integrated high-intent regional keywords.
- **Result**: Boosted overall organic engagement by **25.3%**, driving a **14% increase in direct, commission-free guest bookings** within the first quarter; automated email newsletters reaching a **38% reader open rate** (exceeding industry averages by 16%); eliminated double-bookings entirely through integrated PMS channel managers.
- **Tech Stack**: *WordPress CMS Optimization, Digital Content Pipelines, Local SEO & Keyword Research, PMS Channel Integration, Email Automation Marketing*

---

### Case Study 3 (Data & Content Integrity): Appen Services (Tech ML Analytics)
- **Situation**: Complex, multi-faceted machine learning search pipelines and social feeds required ultra-high precision, low-latency evaluation under strict federal and corporate non-disclosure restrictions.
- **Task**: Maintain exhaustive quality standards, achieve a **98%+ evaluation consistency rating**, and lead strict operational compliance for sensitive PII (Personally Identifiable Information) databases.
- **Action**: Formulated an internal documentation audit checklist; evaluated and classified **12,000+ complex raw query tasks**; conducted bi-weekly cross-calibration peer calls; strictly maintained offline, encrypted sandbox environments for all test evaluations.
- **Result**: Consistently exceeded the corporate benchmark by delivering **99.4% evaluation accuracy** (QA standard deviation < 0.5); trained 4 onboarding recruits, lifting the squad's average QA score by **8.2%**; achieved **0 compliance incidents** over a 2-year campaign.
- **Tech Stack**: *PII Security Protocols, Data Quality Assurance, Compliance Standards, ML Training Annotation, Team Skills Onboarding*

---

## PROFESSIONAL WORKFLOWS & AUTO-PROCESSES
- **SLA Inquiries Response Goal**: < 1 Hour Initial Review
- **Tools Environment**: Active on terminal Unix command scripts, WordPress Database, PMS syncs, Google Cloud services, and strict encrypted sandboxes.

---

## CONNECT
Ready to optimize your IT infrastructure or automate administrative workflows? Let's discuss your targets.
- **Email**: ${personalInfo.email}
- **LinkedIn**: https://${personalInfo.linkedin}
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([getFullMarkdown()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${personalInfo.name.toLowerCase().replace(/\s+/g, "_")}_portfolio_profile.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="markdown-copier-container" className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-5">
      <div id="markdown-copier-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 id="markdown-copier-title" className="text-2xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            Portfolio Copywriter &amp; Export Hub
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Copy-paste this professionally structured, high-scannability content straight to Upwork, LinkedIn, or PDF.
          </p>
        </div>

        <div id="markdown-copier-actions" className="flex items-center gap-2">
          {/* Download btn */}
          <button
            id="download-md-file-btn"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-850 hover:text-slate-950 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 transition-colors"
            title="Download as Markdown file"
          >
            <Download className="h-4.5 w-4.5" />
            Download .MD Document
          </button>

          {/* Master Copy btn */}
          <button
            id="master-copy-md-btn"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            {copied ? (
              <>
                <CheckSquare className="h-4.5 w-4.5 text-emerald-400" />
                Copied Full Portfolio!
              </>
            ) : (
              <>
                <Copy className="h-4.5 w-4.5" />
                Copy Full Portfolio
              </>
            )}
          </button>
        </div>
      </div>

      <div id="markdown-alert-note" className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl text-xs text-blue-700 font-medium">
        <span className="font-bold">Portfolio Strategist Note:</span> This copy incorporates bold metrics, standard markdown syntax headings, horizontal rule split sections, and clean bullet indicators.
      </div>

      {/* Code Area View */}
      <div id="markdown-text-preview" className="relative group">
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            id="hover-copy-md"
            onClick={handleCopy}
            className="p-1 px-2.5 bg-slate-800 text-white hover:bg-slate-700 text-xxs font-bold rounded-lg border border-slate-700 flex items-center gap-1"
          >
            <Copy className="h-3 w-3" />
            {copied ? "Copied" : "Quick Copy"}
          </button>
        </div>
        <pre 
          id="raw-markdown-code-block"
          className="bg-slate-955 bg-slate-950 text-slate-100 p-5 md:p-6 rounded-2xl overflow-x-auto text-xs md:text-sm font-mono max-h-[460px] leading-relaxed shadow-inner border border-slate-900 scrollbar-thin"
        >
          {getFullMarkdown()}
        </pre>
      </div>

      <div className="flex items-center gap-2 justify-center text-xs text-slate-400 font-medium mt-1">
        <Award className="h-4 w-4 text-emerald-500" />
        Formulating high-conversion tech portfolios utilizing professional COPYWRITING frameworks.
      </div>
    </div>
  );
}
