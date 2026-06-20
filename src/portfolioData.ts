import { PortfolioData } from "./types";

export const initialPortfolioData: PortfolioData = {
  personalInfo: {
    name: "April Shyne Palacios",
    title: "Technical Virtual Assistant & IT Specialist",
    tagline: "Bridging the Gap Between Administrative Excellence and Robust IT Infrastructure Modernization",
    description: "Results-driven IT Specialist & Technical Virtual Assistant with over 5 years of experience leading technical task execution, maintaining network infrastructure integrity, and streamlining digital administrative workflows. Adept at transforming chaotic business and technical operations into optimized, high-performing environments with a strict focus on system security, SLA fulfillment, and process automation.",
    experience: "5+ Years",
    email: "vhonho28@gmail.com",
    linkedin: "linkedin.com/in/april-shyne-palacios",
    phone: "+63 (9xx) xxx-xxxx",
  },
  competencies: [
    {
      name: "IT Infrastructure Design",
      rating: 5,
      category: "infrastructure",
      description: "Designing corporate networks, setting up off-site storage pipelines, and managing server clusters."
    },
    {
      name: "Security & Endpoint Protection",
      rating: 5,
      category: "infrastructure",
      description: "Implementing firewall policies, managing automated antivirus rollouts, and carrying out security audits."
    },
    {
      name: "Disaster Recovery Planning",
      rating: 5,
      category: "infrastructure",
      description: "Authoring RPO/RTO goals, establishing routine backups, and simulating failovers."
    },
    {
      name: "Virtualization & Cloud Hosting",
      rating: 4,
      category: "infrastructure",
      description: "Managing VPS hosting platforms, container setups, and virtual server machines."
    },
    {
      name: "Advanced Hard/Soft Troubleshooting",
      rating: 5,
      category: "support",
      description: "Resolving complex OS configurations, hardware bottlenecks, and routing bugs."
    },
    {
      name: "Helpdesk & SLA Administration",
      rating: 5,
      category: "support",
      description: "Managing ticket responses, user support, and escalating issues efficiently."
    },
    {
      name: "Patch Management & Compliance",
      rating: 4,
      category: "support",
      description: "Automated distribution of updates to OS, third-party software, and physical assets."
    },
    {
      name: "WordPress & CMS Administration",
      rating: 5,
      category: "admin",
      description: "Managing site structures, installing updates, database tuning, and speed optimization."
    },
    {
      name: "Digital Media Scheduling",
      rating: 4,
      category: "admin",
      description: "Creating calendar frameworks, setting up automated postings, and analyzing engagement metrics."
    },
    {
      name: "High-Privacy Data Integrity",
      rating: 5,
      category: "admin",
      description: "Maintaining strict compliance with PII records and managing sensitive data pipelines safely."
    },
    {
      name: "IT Team Leadership",
      rating: 4,
      category: "leadership",
      description: "Mentoring junior technicians, managing shift rosters, and overseeing team operations."
    },
    {
      name: "Vendor SLA Management",
      rating: 5,
      category: "leadership",
      description: "Auditing multi-party contracts, evaluating ISP lines, and optimizing licensing budgets."
    }
  ],
  caseStudies: [
    {
      id: "case-1",
      title: "Consolidating IT Infrastructure & Maximizing Enterprise Network Uptime",
      subtitle: "Securing the operations of a fast-growing trading firm against costly cascading network outages.",
      company: "Tristellar Trading",
      role: "IT Supervisor",
      period: "2021 - Present",
      category: "infrastructure",
      situation: "Tristellar Trading suffered from recurrent network outages, unpatched security vulnerabilities on active client servers, and uncoordinated third-party vendor contracts. This severely impacted physical and digital trading operations, exposing the business to major SLA failures and security sweeps.",
      task: "Standardize the company's IT infrastructure, establish dynamic disaster recovery pipelines, enforce server security policies across 12+ local offices, and consolidate vendor SLAs to reduce unscheduled critical downtime.",
      action: "Drafted and audited comprehensive security policies; designed automatic offsite incremental backups with a 4-hour Recovery Time Objective (RTO); negotiated high-availability redundant contracts with key ISPs; deployed automated endpoint patch management systems on 150+ corporate devices.",
      result: "Reduced unscheduled downtime from 48 hours annually to under 4 hours, representing a 99.95% uptime achievement. Achieved 100% patch compliance within 30 days, saved $15,000 in redundant licenses and vendor fees through strategic supplier consolidation, and secured physical network gateways, reducing vulnerability sweeps to 0.",
      techStack: ["Endpoint Patch Management", "Disaster Recovery Backup Solutions", "VPS Architecture", "SLA Negotiation", "Network Firewall Administration"],
      metrics: [
        { label: "Annual Uptime", value: "99.95%", detail: "Increased from ~94% downtime state" },
        { label: "Downtime Reduced", value: "< 4 Hrs/Yr", detail: "Down from 48 hours of annual outages" },
        { label: "Saved Licenses", value: "$15K+", detail: "Consolidated duplicates under custom SLAs" },
        { label: "Patch Compliance", value: "100%", detail: "Achieved on 150+ devices in 30 days" }
      ]
    },
    {
      id: "case-2",
      title: "Revitalizing Guest Bookings & Optimizing Web Presence",
      subtitle: "Driving direct bookings and audience engagement through standard SEO processes and automated CMS strategies.",
      company: "Brown County Vacation Rental",
      role: "SEO & Digital Assistant Specialist",
      period: "2019 - 2021",
      category: "marketing",
      situation: "The portfolio of premium vacation properties suffered from low direct booking ratios, outdated web listings, and static social media profiles, limiting organic online guest acquisition and increasing dependency on high-fee third-party hosting platforms.",
      task: "Refresh the WordPress content layout, optimize loading speeds on image-heavy listings, curate an optimized 90-day multi-channel digital media calendar, and deploy local SEO tactics.",
      action: "Implemented an intuitive WordPress UI restructure, reducing pageload speed by 1.8 seconds through selective asset caching and media optimization; engineered a highly structured visual content pipeline on Instagram, Pinterest, and Facebook; researched and integrated high-intent regional keywords.",
      result: "Boosted overall organic engagement by 25.3%, driving a 14% increase in direct, commission-free guest bookings within the first quarter; automated email newsletters reaching a 38% open rate; eliminated double-bookings entirely through a centralized property management system (PMS) channel manager.",
      techStack: ["WordPress CMS Optimization", "Digital Content Pipelines", "Local SEO & Keyword Research", "PMS Channel Integration", "Email Automation Marketing"],
      metrics: [
        { label: "Organic Engagement", value: "+ 25%", detail: "Steady growth of social & web actions" },
        { label: "Direct Bookings", value: "+ 14%", detail: "More direct revenue, fewer service fees" },
        { label: "Web Pageload", value: "-1.8s", detail: "Fast loading speed optimized for mobile" },
        { label: "Email Open Rate", value: "38%", detail: "Nearly double the travel sector average" }
      ]
    },
    {
      id: "case-3",
      title: "Data Quality Assurance & Rigid Compliance Moderation",
      subtitle: "Conducting data operations with 99.4% accuracy for sensitive machine learning pipelines.",
      company: "Appen Services",
      role: "Data QA & Content Moderation Lead",
      period: "2018 - 2019",
      category: "compliance",
      situation: "Complex, multi-faceted machine learning search pipelines and social feeds required ultra-high precision, low-latency evaluation under strict federal and corporate non-disclosure restrictions.",
      task: "Maintain exhaustive quality standards, achieve a 98%+ evaluation consistency rating, and lead strict operational compliance for sensitive PII (Personally Identifiable Information) databases.",
      action: "Formulated an internal documentation audit checklist; evaluated and classified 12,000+ complex raw query tasks; conducted bi-weekly cross-calibration peer calls; strictly maintained offline, encrypted sandbox environments for all test evaluations.",
      result: "Consistently exceeded the corporate benchmark by delivering 99.4% evaluation accuracy (QA standard deviation < 0.5); trained 4 onboarding recruits, lifting the squad's average QA score by 8.2%; achieved zero compliance incidents over a 2-year campaign.",
      techStack: ["PII Security Protocols", "Data Quality Assurance", "Compliance Standards", "ML Training Annotation", "Team Skills Onboarding"],
      metrics: [
        { label: "QA Accuracy Rate", value: "99.4%", detail: "Surpassed the 98% enterprise SLA barrier" },
        { label: "Evaluated Items", value: "12,000+", detail: "Complex queries classified accurately" },
        { label: "Team Onboarding", value: "+8.2%", detail: "Boosted performance scores of recruits" },
        { label: "Compliance Incidents", value: "0", detail: "Flawless audit trail throughout the project" }
      ]
    }
  ]
};
