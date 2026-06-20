export interface Competency {
  name: string;
  rating: number; // 1-5 scale
  category: "infrastructure" | "support" | "admin" | "leadership";
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  role: string;
  period: string;
  category: "infrastructure" | "marketing" | "compliance";
  situation: string;
  task: string;
  action: string;
  result: string;
  techStack: string[];
  metrics: { label: string; value: string; detail: string }[];
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    description: string;
    experience: string;
    email: string;
    linkedin: string;
    phone: string;
    tagline: string;
  };
  competencies: Competency[];
  caseStudies: CaseStudy[];
}
