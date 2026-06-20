import { motion } from "motion/react";
import { Mail, Linkedin, MapPin, CheckCircle, ShieldCheck, Clock, Users } from "lucide-react";
import { PortfolioData } from "../types";
import avatarImg from "../assets/images/tech_va_avatar_1781914999006.jpg";
import bannerImg from "../assets/images/cloud_infra_banner_1781915018851.jpg";

interface PortfolioHeaderProps {
  personalInfo: PortfolioData["personalInfo"];
}

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PortfolioHeader({ personalInfo }: PortfolioHeaderProps) {
  return (
    <motion.header 
      id="portfolio-header-container"
      className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Visual Tech Background Banner Banner */}
      <div id="header-visual-banner" className="h-44 md:h-56 relative w-full overflow-hidden">
        <img 
          src={bannerImg} 
          alt="Cloud Infrastructure Banner" 
          className="w-full h-full object-cover blur-[1px] brightness-90 saturate-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
        <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
          ACTIVE &amp; AVAILABLE FOR CONTRACTS
        </div>
      </div>

      {/* Main Persona Card */}
      <div id="header-persona-card" className="relative px-6 pb-8 pt-0 md:px-10 flex flex-col md:flex-row items-start gap-6 md:gap-8 -mt-16 md:-mt-20">
        <motion.div 
          id="avatar-image-wrapper"
          className="relative h-28 w-28 md:h-36 md:w-36 rounded-2xl md:rounded-3xl border-4 border-white overflow-hidden shadow-lg bg-slate-100 flex-shrink-0"
          variants={itemVariants}
        >
          <img 
            src={avatarImg} 
            alt="April Shyne Palacios Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div id="persona-details" className="flex-1 space-y-3 pt-8 md:pt-20">
          <motion.div variants={itemVariants} className="space-y-1">
            <h1 id="author-name" className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {personalInfo.name}
            </h1>
            <p id="author-headline" className="text-lg md:text-xl font-semibold text-blue-600 tracking-tight flex items-center gap-2">
              {personalInfo.title}
            </p>
          </motion.div>

          <motion.p id="author-tagline" variants={itemVariants} className="text-slate-500 text-sm md:text-base font-medium max-w-3xl leading-relaxed">
            {personalInfo.tagline}
          </motion.p>

          <motion.div id="author-badges" variants={itemVariants} className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span>Manila, Philippines (UTC+8)</span>
            </div>
            <div className="hidden sm:block h-4 w-[1px] bg-slate-200 align-middle self-center" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>5+ Years Technical Experience</span>
            </div>
            <div className="hidden sm:block h-4 w-[1px] bg-slate-200 align-middle self-center" />
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-blue-500" />
              <span>STAR Portfolio Certified</span>
            </div>
          </motion.div>

          {/* Social and Reach CTA Buttons */}
          <motion.div id="header-contact-actions" variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
            <a 
              id="cta-email-btn"
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition duration-200 shadow-sm"
            >
              <Mail className="h-4 w-4" />
              Email Me &mdash; {personalInfo.email}
            </a>
            <a 
              id="cta-linkedin-btn"
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-sm font-semibold px-4 py-2.5 rounded-xl transition duration-200"
            >
              <Linkedin className="h-4 w-4 text-blue-600" />
              LinkedIn Profile
            </a>
          </motion.div>
        </div>
      </div>

      {/* Trust Counters / Key Performance Indicators */}
      <div id="header-trust-kpi" className="grid grid-cols-2 md:grid-cols-4 border-t border-slate-100 bg-slate-50/50 divides bg-slate-50 divide-x divide-y md:divide-y-0 divide-slate-100">
        <div className="p-5 text-center">
          <p id="kpi-score-experience" className="text-2xl md:text-3xl font-extrabold text-slate-850 font-mono">5+</p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Years Professional Experience</p>
        </div>
        <div className="p-5 text-center">
          <p id="kpi-score-uptime" className="text-2xl md:text-3xl font-extrabold text-blue-600 font-mono">99.95%</p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">IT Server SLA Achieved</p>
        </div>
        <div className="p-5 text-center">
          <p id="kpi-score-accuracy" className="text-2xl md:text-3xl font-extrabold text-emerald-600 font-mono">99.4%</p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">ML Annotation Accuracy</p>
        </div>
        <div className="p-5 text-center">
          <p id="kpi-score-engagement" className="text-2xl md:text-3xl font-extrabold text-slate-800 font-mono">+25.3%</p>
          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Avg Organic Growth</p>
        </div>
      </div>
    </motion.header>
  );
}
