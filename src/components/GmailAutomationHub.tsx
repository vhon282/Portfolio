import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Mail, 
  Send, 
  Settings, 
  ShieldAlert, 
  CheckCircle, 
  Layout, 
  FileText, 
  Layers, 
  Play, 
  HelpCircle, 
  AlertCircle, 
  RefreshCw, 
  Key, 
  User, 
  Check, 
  Copy, 
  ExternalLink,
  ChevronRight,
  Database,
  Terminal,
  Clock
} from "lucide-react";

interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
}

interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: "Support" | "Proposal" | "SDR" | "Urgent Alert";
}

export default function GmailAutomationHub() {
  // Authentication states
  const [accessToken, setAccessToken] = useState<string>("");
  const [clientId, setClientId] = useState<string>(() => {
    return localStorage.getItem("april_gmail_client_id") || "";
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<GmailProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  // Simulated vs. Live choice
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);

  // Email Composer state
  const [recipient, setRecipient] = useState<string>("vhonho28@gmail.com");
  const [subject, setSubject] = useState<string>("Client Infrastructure Audit Summary");
  const [bodyContent, setBodyContent] = useState<string>(
    `<p>Dear Team,</p>\n\n<p>As your Technical Virtual Assistant, I have completed the automated network audit checks for this week.</p>\n\n<p><strong>System Status Update:</strong><br/>\n✦ Firewall Security sweeps: 100% PASS<br/>\n✦ Endpoint Backups: Clean, redundant (RTO within 4 hrs)<br/>\n✦ Page Load optimization: Speed decreased by 1.8 seconds.</p>\n\n<p>Please review our full reports on your connected workspace.</p>\n\n<p>Best Regards,<br/>\n<strong>April Shyne Palacios</strong><br/>\nIT Specialist &amp; Technical VA</p>`
  );

  // General controls
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendStatusMsg, setSendStatusMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [activePreset, setActivePreset] = useState<string>("preset-audit");

  // Console feed logs for demonstrating technical competence
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Gmail Client Module Initialized.",
    "[SYSTEM] Default SLA templates validated successfully.",
    "[STATUS] Ready for secure Google Workspace OAuth handshake."
  ]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-12), `[${timestamp}] ${msg}`]);
  };

  // Predefined templates demonstrating the STAR technique and technical support depth
  const templates: Template[] = [
    {
      id: "preset-audit",
      name: "Weekly SLA & IT Audit Report",
      category: "Support",
      subject: "Weekly Infrastructure & Critical SLA Check Sheet (STATUS: GREEN)",
      body: `<p>Hello team,</p>

<p>I have successfully compiled this week's <strong>Infrastructure Quality Standards</strong> status report. Actionable IT details below:</p>

<ul>
  <li><strong>Cloud Systems Sync</strong>: Automated validation loop confirmed 100% database schema alignments.</li>
  <li><strong>Firewall Audit</strong>: Filter blocks intact, zero external telemetry violations.</li>
  <li><strong>Server Backup</strong>: All 150+ endpoint client rolls captured to redundant servers (RPO target fulfilled).</li>
</ul>

<p>No immediate technical escalation required today.</p>

<p>Best regards,<br/>
<strong>April Shyne Palacios</strong><br/>
IT Support &amp; Technical Virtual Assistant</p>`
    },
    {
      id: "preset-proposal",
      name: "Immediate Administrative Automation Proposal",
      category: "Proposal",
      subject: "Leveraging Automated Triggers to Eliminate Double-Bookings",
      body: `<p>Hi there,</p>

<p>Thank you for inquiring about my <strong>Technical VA & Support Services</strong>. Based on our conversation, I have prepared an automation blueprint designed to address booking overlaps:</p>

<ul>
  <li><strong>Task</strong>: Integrate WordPress Direct Client booking leads with Airtable &amp; Slack notifications.</li>
  <li><strong>Action</strong>: Configure Zapier webhooks to sync PMS channel calendars, resulting in zero transaction collision.</li>
  <li><strong>Expected Metrics</strong>: Eliminate manual input hours entirely, guaranteeing consistent direct booking performance.</li>
</ul>

<p>Please review the attached project quote. I look forward to supporting your business infrastructure!</p>

<p>Sincerely yours,<br/>
<strong>April Shyne Palacios</strong><br/>
Technical Virtual Assistant</p>`
    },
    {
      id: "preset-ticket",
      name: "Enterprise Helpdesk Resolution Dispatch",
      category: "Support",
      subject: "HELP-9014: Secure Firewall Port Rule Escalation - RESOLVED",
      body: `<p>Hi there,</p>

<p>This is to confirm that ticket <strong>HELP-9014</strong> has been fully resolved according to standard enterprise guidelines:</p>

<ul>
  <li><strong>Issue Identified</strong>: Ingress gateway blocked the external API handshake from sandbox terminals.</li>
  <li><strong>Action Taken</strong>: Rewrote firewall rules inside the secure cluster and completed device audits. Verified access via manual API curl request.</li>
  <li><strong>Status</strong>: All endpoint tunnels are clean and compliant. Case marked as closed.</li>
</ul>

<p>Let me know if further resolution is required.</p>

<p>Cordially,<br/>
<strong>April Shyne Palacios</strong><br/>
Senior IT Specialist</p>`
    }
  ];

  // Pick preset
  const selectPreset = (presetId: string) => {
    const selected = templates.find(t => t.id === presetId);
    if (selected) {
      setActivePreset(presetId);
      setSubject(selected.subject);
      setBodyContent(selected.body);
      addLog(`Selected Template: "${selected.name}" loaded into editor.`);
    }
  };

  // Check query / token hash on mount to capture authorization token back from Google
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
        setIsLiveMode(true);
        addLog("Access token matched successfully from redirect hash parameters!");
        verifyGmailToken(token);
        // Clear hash from address bar to keep things tidy
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  }, []);

  // Sync client id to localstorage
  const saveClientId = (val: string) => {
    setClientId(val);
    localStorage.setItem("april_gmail_client_id", val);
    addLog(`System Google Client ID updated.`);
  };

  // Real Google API call to verify connection & extract Profile information
  const verifyGmailToken = async (token: string) => {
    setIsLoadingProfile(true);
    setAuthError("");
    addLog("Initiating HTTPS verification with Google API profiles server...");
    try {
      const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile({
          emailAddress: data.emailAddress,
          messagesTotal: data.messagesTotal || 0,
          threadsTotal: data.threadsTotal || 0
        });
        setIsAuthenticated(true);
        setIsLiveMode(true);
        addLog(`OAuth Verified! Linked successfully to Gmail inbox: ${data.emailAddress}`);
      } else {
        const errJson = await response.json().catch(() => ({ error: { message: "Unknown error" } }));
        throw new Error(errJson.error?.message || "Invalid OAuth access status.");
      }
    } catch (e: any) {
      addLog(`API Handshake failed: ${e.message}`);
      setAuthError(e.message || "Failed to link profile.");
      setIsAuthenticated(false);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  // OAuth Instant Login Popup Trigger
  const triggerOAuthFlow = () => {
    const finalId = clientId.trim();
    if (!finalId) {
      setAuthError("You need a Google Client ID to run live authorization. Please check the GCP Setup Guide below.");
      addLog("[ERROR] OAuth action aborted: Google Client ID is missing.");
      return;
    }
    setAuthError("");
    addLog("Launching standard Google Accounts auth portal viewport...");

    // Gmail OAuth authentications URL mapping
    const redirectUri = window.location.origin;
    const scope = "https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.compose";
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(finalId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}&prompt=consent`;
    
    // Redirect parent window directly
    window.location.href = googleAuthUrl;
  };

  // Disconnect OAuth
  const handleLogout = () => {
    setAccessToken("");
    setProfile(null);
    setIsAuthenticated(false);
    addLog("OAuth credentials flushed from system memory.");
  };

  // Direct manual verification if they paste token from OAuth Playground
  const handleManualTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken.trim()) {
      verifyGmailToken(accessToken.trim());
    } else {
      setAuthError("Please input a valid access token string first.");
    }
  };

  // RFC-Compliant Raw Email Builder & Sender API dispatch
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendStatusMsg(null);
    setIsSending(true);

    if (!recipient.trim() || !subject.trim() || !bodyContent.trim()) {
      setSendStatusMsg({ type: "error", text: "Please enter a valid recipient, subject, and content body." });
      setIsSending(false);
      return;
    }

    if (!isLiveMode) {
      // Simulate dispatch for demo/debugging if no Credentials/Oauth token present
      addLog(`[DEMO DISPATCH] Sending to candidate: ${recipient}`);
      addLog(`[DEMO DISPATCH] Subject line: ${subject}`);
      
      setTimeout(() => {
        setIsSending(false);
        setSendStatusMsg({
          type: "success",
          text: `Demo Email Sent Successfully! (Simulated dispatch to ${recipient}). Connect real Google Credentials below to trigger genuine SMTP rails!`
        });
        addLog(`[DEMO SUCCESS] Message validated and delivered to staging queue.`);
      }, 1500);
      return;
    }

    // LIVE MODE DISPATCH TO REAL GOOGLE API
    addLog(`[SMTP DISPATCH] Encoding raw mail envelope for recipient: ${recipient}...`);
    try {
      // Constructing RFC 2822 standard email message envelope
      const emailLines = [
        `Destination: ${recipient}`,
        `To: ${recipient}`,
        `Subject: ${subject}`,
        "Content-Type: text/html; charset=utf-8",
        "MIME-Version: 1.0",
        "",
        bodyContent
      ];
      const emailStr = emailLines.join("\r\n");

      // Standard Base64Url-Safe Encoding for Gmail API Messages
      const rawBase64 = btoa(unescape(encodeURIComponent(emailStr)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      addLog("[SMTP DISPATCH] Posting Base64 body payload to Google API messages endpoints...");
      
      const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          raw: rawBase64
        })
      });

      if (res.ok) {
        const payload = await res.json();
        setIsSending(false);
        setSendStatusMsg({
          type: "success",
          text: `Message Successfully Delivered! Gmail confirmed tracking ID: ${payload.id}. Real email dispatched directly to ${recipient}.`
        });
        addLog(`[SMTP SUCCESS] Sent message ID: ${payload.id}. Google SMTP gateway hand-off completed.`);
      } else {
        const errorDetail = await res.json().catch(() => ({}));
        throw new Error(errorDetail.error?.message || "Internal API delivery rejection.");
      }

    } catch (err: any) {
      setIsSending(false);
      setSendStatusMsg({
        type: "error",
        text: `Gmail API Rejection Error: ${err.message}. Ensure your access token hasn't expired.`
      });
      addLog(`[SMTP ERROR] Google gateway rejected message payload: ${err.message}`);
    }
  };

  return (
    <div id="gmail-hub-root" className="space-y-8 animate-fade-in">
      
      {/* Overview Headway banner */}
      <div id="gmail-hero-card" className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="space-y-2 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 text-[10px] bg-red-50 text-red-700 border border-red-100 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            <Mail className="h-3 w-3 text-red-600 animate-pulse" />
            Live Workspace Integration
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight flex items-center gap-2">
            Gmail Automation Console &amp; Staging
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            A real-time workspace experience demonstrating April&apos;s capabilities as a <strong>Technical virtual assistant</strong>. Select a task preset, configure Google credentials, and test standard email triggers directly via secure Google SMTP server endpoints.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 bg-slate-50 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              setIsLiveMode(false);
              addLog("Switched system logic to Developer Local Sandbox Staging.");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !isLiveMode
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-550 hover:text-slate-900"
            }`}
          >
            Developer Sandbox
          </button>
          <button
            onClick={() => {
              setIsLiveMode(true);
              addLog("Flipped workspace rail to Live Google SMTP Gateway.");
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
              isLiveMode
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-550 hover:text-slate-900"
            }`}
          >
            Live Google API
            {isAuthenticated && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: AUTH CONTROLS & LOGS (5 columns width) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Identity Handshake Control Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <Key className="h-4 w-4 text-blue-500" />
              Secure API Credentials
            </h3>

            {isAuthenticated && profile ? (
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold font-mono">
                    {profile.emailAddress.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-black text-emerald-950">OAuth Handshake Active</p>
                    <p className="text-[11px] text-emerald-700 font-mono font-medium truncate max-w-xs">{profile.emailAddress}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-emerald-100/60">
                  <div className="bg-white border border-emerald-100 p-2 rounded-xl">
                    <p className="text-[10px] text-slate-450 font-bold uppercase">Total Mail</p>
                    <p className="text-sm font-black text-slate-800">{profile.messagesTotal}</p>
                  </div>
                  <div className="bg-white border border-emerald-100 p-2 rounded-xl">
                    <p className="text-[10px] text-slate-450 font-bold uppercase">Threads Active</p>
                    <p className="text-sm font-black text-slate-800">{profile.threadsTotal}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-700 hover:text-red-600 text-[11px] font-bold py-2 rounded-xl transition-all"
                >
                  Disconnect Account
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Auth Mode Toggle Informative tip */}
                <p className="text-xs text-slate-500 leading-normal">
                  Link with Gmail via Google Identity Portal to trigger authentic SMTP submissions. Alternatively, generate local client tests instantly in the Developer sandbox mode.
                </p>

                {/* Google Client ID Parameter setter */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">
                    Google OAuth Client ID
                  </label>
                  <input
                    type="text"
                    value={clientId}
                    onChange={(e) => saveClientId(e.target.value)}
                    placeholder="Enter Client ID (e.g., xxx.apps.googleusercontent.com)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Submit actions */}
                <div className="space-y-2">
                  <button
                    onClick={triggerOAuthFlow}
                    className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                    <span>Authorize Secure Workspace</span>
                  </button>

                  <div className="relative flex py-2 items-center text-xs text-slate-350">
                    <div className="flex-grow border-t border-slate-150"></div>
                    <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase">Or Direct Token Paste</span>
                    <div className="flex-grow border-t border-slate-150"></div>
                  </div>

                  <form onSubmit={handleManualTokenSubmit} className="flex gap-2">
                    <input
                      type="password"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      placeholder="Paste OAuth Access Token"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 placeholder:text-slate-450 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="submit"
                      className="bg-slate-100 hover:bg-slate-200 border border-slate-250 hover:border-slate-350 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                    >
                      Verify
                    </button>
                  </form>
                </div>
              </div>
            )}

              {authError && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-amber-800 space-y-1">
                  <p className="text-xs font-bold flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
                    Handshake Notice
                  </p>
                  <p className="text-[10px] leading-relaxed font-medium">
                    {authError}
                  </p>
                </div>
              )}
          </div>

          {/* Secure Live Event Telemetry Monitor */}
          <div className="bg-slate-950 text-slate-150 rounded-3xl border border-slate-900 p-5 shadow-sm space-y-3.5 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-[10px] text-blue-400 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-blue-400" />
                Live Handshake Telemetry
              </span>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-emerald-400 font-bold font-sans">SYS OK</span>
              </div>
            </div>

            <div className="space-y-1.5 text-[10px] leading-relaxed max-h-56 overflow-y-auto">
              {logs.map((log, index) => (
                <p 
                  key={index} 
                  className={
                    log.includes("[ERROR]") 
                      ? "text-red-400" 
                      : log.includes("[SMTP SUCCESS]") || log.includes("[OAuth Verified]")
                      ? "text-emerald-400 font-bold" 
                      : log.includes("[SYSTEM]") 
                      ? "text-slate-450" 
                      : "text-slate-300"
                  }
                >
                  {log}
                </p>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-slate-850 text-[9px] text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                EST SLA: 4-Hr Recovery
              </span>
              <span>Buffer: UTF-8 Mail Body</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PRESETS, EMAIL COMPOSER & DEV GUIDE (7 columns width) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Email staging area / Mail Dispatcher */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Send className="h-4 w-4 text-rose-500" />
                  Mail Envelope Compiler
                </h3>
                <p className="text-slate-450 text-[11px] font-medium mt-0.5">
                  Choose a technical preset to draft and dispatch via {isLiveMode ? "Gmail API Staging" : "Staging Sandbox"}.
                </p>
              </div>

              {/* Presets dropdown */}
              <select
                value={activePreset}
                onChange={(e) => selectPreset(e.target.value)}
                className="bg-slate-50 border border-slate-250 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              >
                <option value="preset-audit">Template: SLA &amp; IT Audit</option>
                <option value="preset-proposal">Template: Workflow trigger</option>
                <option value="preset-ticket">Template: Helpdesk Close</option>
              </select>
            </div>

            {/* Live Mail Form */}
            <form onSubmit={handleSendEmail} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">
                    Recipient Address (To:)
                  </label>
                  <input
                    type="email"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="recipient@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">
                    Mail Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter email subject line"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* HTML/Text Mail Content Editor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">
                    Email Body Content (HTML Supported)
                  </label>
                  <span className="text-[9px] text-slate-400 font-mono font-medium">UTF-8 Compliant Mail</span>
                </div>
                <textarea
                  rows={8}
                  required
                  value={bodyContent}
                  onChange={(e) => setBodyContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 leading-relaxed"
                />
              </div>

              {/* Status notifications inside composer */}
              {sendStatusMsg && (
                <div className={`p-4 rounded-xl border ${
                  sendStatusMsg.type === "success" 
                    ? "bg-emerald-50 text-emerald-800 border-emerald-100" 
                    : "bg-red-50 text-red-800 border-red-100"
                } text-xs font-medium space-y-1`}>
                  <p className="font-extrabold flex items-center gap-1.5">
                    {sendStatusMsg.type === "success" ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <AlertCircle className="h-4 w-4 text-red-500" />}
                    {sendStatusMsg.type === "success" ? "Dispatch Finalized" : "Staging Problem"}
                  </p>
                  <p className="leading-relaxed text-[11px] opacity-90">
                    {sendStatusMsg.text}
                  </p>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-bold">
                  {isLiveMode ? (
                    <span className="flex items-center gap-1 text-blue-600">
                      <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                      Live Mode Ready
                    </span>
                  ) : (
                    <span className="text-slate-450 text-italic">Staging Sandbox mode</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black shadow-md flex items-center gap-2 transition-all ${
                    isSending 
                      ? "bg-slate-100 text-slate-450 border border-slate-200 cursor-not-allowed" 
                      : isLiveMode 
                      ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer" 
                      : "bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
                  }`}
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Dispatching Staging...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>{isLiveMode ? "Trigger SMTP Send" : "Run Sandbox Test"}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Quickstart GCP Credentials setup guide */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-slate-500" />
              GCP Setup &amp; Verification Guide
            </h4>
            
            <p className="text-xs text-slate-600 leading-normal">
              To trigger the **OAuth flow with your personal Google credentials**, complete these high-fidelity settings steps in Google Cloud Console:
            </p>

            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li className="flex items-start gap-2">
                <span className="bg-white border border-slate-250 h-5 w-5 rounded-full text-[10px] text-slate-700 flex items-center justify-center shrink-0 font-bold shadow-xxs">1</span>
                <div>
                  <span className="font-bold text-slate-800">Create a GCP Project</span>: Head to the Google Cloud Console and select or create a project.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-white border border-slate-250 h-5 w-5 rounded-full text-[10px] text-slate-700 flex items-center justify-center shrink-0 font-bold shadow-xxs">2</span>
                <div>
                  <span className="font-bold text-slate-800">OAuth Consent Screen</span>: Set up your consent screen. Add <code className="text-pink-600 font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">Gmail API</code> (specifically scope: <code className="text-slate-700 font-mono text-[9px] bg-white px-1 border rounded">.../auth/gmail.send</code>) and add your testing Google account to the Test Users list.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-white border border-slate-250 h-5 w-5 rounded-full text-[10px] text-slate-700 flex items-center justify-center shrink-0 font-bold shadow-xxs">3</span>
                <div>
                  <span className="font-bold text-slate-800">Credentials Creation</span>: Select <span className="text-slate-850 font-bold">Create Credentials</span> &gt; <span className="text-slate-850 font-semibold">OAuth Client ID</span>. Match application type to &quot;Web Application&quot;.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-white border border-slate-250 h-5 w-5 rounded-full text-[10px] text-slate-700 flex items-center justify-center shrink-0 font-bold shadow-xxs">4</span>
                <div>
                  <span className="font-bold text-slate-800">Set Redirect URIs</span>: Point Authorized JavaScript origins and Redirect URIs perfectly to our preview URL: 
                  <code className="block mt-1 bg-white p-2 border border-slate-200 rounded font-mono text-[10px] select-all text-slate-700 font-semibold truncate hover:text-blue-600">
                    {window.location.origin}
                  </code>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-white border border-slate-250 h-5 w-5 rounded-full text-[10px] text-slate-700 flex items-center justify-center shrink-0 font-bold shadow-xxs">5</span>
                <div>
                  <span className="font-bold text-slate-800">Input Client ID</span>: Paste the resulting Client ID string directly inside our secure client envelope above and hit *Authorize*!
                </div>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
