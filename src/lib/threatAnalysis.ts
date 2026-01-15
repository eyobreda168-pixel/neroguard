import type { RiskLevel } from "@/components/ui/RiskBadge";

export interface AnalysisResult {
  riskLevel: RiskLevel;
  confidence: number;
  summary: string;
  details: string[];
  recommendations: string[];
  indicators: ThreatIndicator[];
  timestamp: Date;
  inputType: "url" | "domain" | "text";
}

export interface ThreatIndicator {
  type: string;
  severity: "info" | "warning" | "danger";
  description: string;
}

// Common suspicious patterns
const SUSPICIOUS_PATTERNS = {
  // URL-specific patterns
  ipAddress: /^https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
  excessiveSubdomains: /^https?:\/\/([^.]+\.){4,}/,
  suspiciousTLD: /\.(xyz|tk|ml|ga|cf|gq|top|work|click|link|loan|win)$/i,
  homoglyphDomain: /[а-яА-Яα-ωΑ-Ω]/,
  encodedChars: /%[0-9a-fA-F]{2}/g,
  dataUri: /^data:/i,
  portNumber: /:\d{4,5}\//,
  
  // Text patterns
  urgencyWords: /\b(urgent|immediate|act now|limited time|expire|suspended|verify|confirm|update required)\b/i,
  financialBait: /\b(bank|account|credit card|password|ssn|social security|wire transfer|bitcoin|crypto)\b/i,
  impersonation: /\b(apple|microsoft|google|amazon|paypal|netflix|facebook|instagram|whatsapp)\b/i,
  threatLanguage: /\b(locked|suspended|unauthorized|illegal|breach|compromised|hacked)\b/i,
  rewardBait: /\b(winner|prize|lottery|free|gift card|congratulations|selected|claim)\b/i,
  
  // Domain patterns
  brandTyposquat: /(g00gle|amaz0n|paypa1|micr0soft|faceb00k|netf1ix)/i,
  dashHeavy: /(-{2,}|\..*-.*-)/,
  longSubdomain: /^[^.]{30,}\./,
};

// Known safe domains (simplified list)
const KNOWN_SAFE_DOMAINS = [
  "google.com", "youtube.com", "facebook.com", "amazon.com", "microsoft.com",
  "apple.com", "github.com", "stackoverflow.com", "wikipedia.org", "linkedin.com",
  "twitter.com", "instagram.com", "reddit.com", "netflix.com", "spotify.com",
];

function extractDomain(input: string): string | null {
  try {
    if (input.startsWith("http://") || input.startsWith("https://")) {
      const url = new URL(input);
      return url.hostname.toLowerCase();
    }
    // Check if it looks like a domain
    if (/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/.test(input)) {
      return input.toLowerCase();
    }
    return null;
  } catch {
    return null;
  }
}

function detectInputType(input: string): "url" | "domain" | "text" {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return "url";
  }
  if (/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/.test(input.trim())) {
    return "domain";
  }
  return "text";
}

export function analyzeInput(input: string): AnalysisResult {
  const trimmedInput = input.trim();
  const inputType = detectInputType(trimmedInput);
  const indicators: ThreatIndicator[] = [];
  const details: string[] = [];
  const recommendations: string[] = [];
  
  let riskScore = 0;

  // Analyze based on input type
  if (inputType === "url" || inputType === "domain") {
    const domain = extractDomain(trimmedInput);
    
    // Check for known safe domains
    if (domain && KNOWN_SAFE_DOMAINS.some(safe => domain === safe || domain.endsWith(`.${safe}`))) {
      indicators.push({
        type: "Known Domain",
        severity: "info",
        description: "This domain is from a well-known, established organization.",
      });
      riskScore -= 20;
    }

    // Check for IP address URLs
    if (SUSPICIOUS_PATTERNS.ipAddress.test(trimmedInput)) {
      indicators.push({
        type: "IP Address URL",
        severity: "warning",
        description: "URL uses an IP address instead of a domain name, which is uncommon for legitimate sites.",
      });
      riskScore += 25;
      details.push("Direct IP address usage detected in URL");
    }

    // Check for excessive subdomains
    if (SUSPICIOUS_PATTERNS.excessiveSubdomains.test(trimmedInput)) {
      indicators.push({
        type: "Complex Subdomain",
        severity: "warning",
        description: "Multiple subdomains may indicate an attempt to obfuscate the true destination.",
      });
      riskScore += 15;
      details.push("Unusually complex subdomain structure");
    }

    // Check for suspicious TLDs
    if (SUSPICIOUS_PATTERNS.suspiciousTLD.test(trimmedInput)) {
      indicators.push({
        type: "Unusual TLD",
        severity: "warning",
        description: "This top-level domain is commonly associated with low-cost registration and spam.",
      });
      riskScore += 20;
      details.push("Domain uses a TLD commonly associated with malicious activity");
    }

    // Check for homoglyph attacks
    if (SUSPICIOUS_PATTERNS.homoglyphDomain.test(trimmedInput)) {
      indicators.push({
        type: "Character Substitution",
        severity: "danger",
        description: "Domain contains characters from other alphabets that may impersonate legitimate sites.",
      });
      riskScore += 40;
      details.push("Potential homoglyph attack detected");
    }

    // Check for encoded characters
    const encodedMatches = trimmedInput.match(SUSPICIOUS_PATTERNS.encodedChars);
    if (encodedMatches && encodedMatches.length > 2) {
      indicators.push({
        type: "URL Encoding",
        severity: "warning",
        description: "Excessive URL encoding may be used to hide the true destination.",
      });
      riskScore += 15;
      details.push("Multiple encoded characters in URL");
    }

    // Check for data URIs
    if (SUSPICIOUS_PATTERNS.dataUri.test(trimmedInput)) {
      indicators.push({
        type: "Data URI",
        severity: "danger",
        description: "Data URIs can embed malicious content directly in the URL.",
      });
      riskScore += 50;
      details.push("Data URI scheme detected");
    }

    // Check for non-standard ports
    if (SUSPICIOUS_PATTERNS.portNumber.test(trimmedInput)) {
      indicators.push({
        type: "Non-Standard Port",
        severity: "info",
        description: "URL specifies a non-standard port number.",
      });
      riskScore += 10;
      details.push("Non-standard port in URL");
    }

    // Check for brand typosquatting
    if (domain && SUSPICIOUS_PATTERNS.brandTyposquat.test(domain)) {
      indicators.push({
        type: "Possible Typosquatting",
        severity: "danger",
        description: "Domain resembles a known brand with character substitutions.",
      });
      riskScore += 45;
      details.push("Domain may be impersonating a well-known brand");
    }

    // HTTPS check
    if (trimmedInput.startsWith("http://")) {
      indicators.push({
        type: "Unencrypted Connection",
        severity: "warning",
        description: "This URL uses HTTP instead of HTTPS, meaning data is not encrypted.",
      });
      riskScore += 15;
      details.push("Connection is not encrypted (HTTP)");
    }
  }

  // Text analysis for all input types
  if (SUSPICIOUS_PATTERNS.urgencyWords.test(trimmedInput)) {
    indicators.push({
      type: "Urgency Tactics",
      severity: "warning",
      description: "Contains language designed to create a sense of urgency.",
    });
    riskScore += 15;
    details.push("Uses urgency-inducing language");
  }

  if (SUSPICIOUS_PATTERNS.financialBait.test(trimmedInput)) {
    indicators.push({
      type: "Financial Keywords",
      severity: "warning",
      description: "Contains references to financial or sensitive information.",
    });
    riskScore += 10;
    details.push("References financial or sensitive topics");
  }

  if (SUSPICIOUS_PATTERNS.threatLanguage.test(trimmedInput)) {
    indicators.push({
      type: "Threat Language",
      severity: "warning",
      description: "Contains threatening language often used in phishing attempts.",
    });
    riskScore += 20;
    details.push("Uses threatening or alarming language");
  }

  if (SUSPICIOUS_PATTERNS.rewardBait.test(trimmedInput)) {
    indicators.push({
      type: "Reward Bait",
      severity: "warning",
      description: "Promises prizes or rewards, a common social engineering tactic.",
    });
    riskScore += 15;
    details.push("Contains promises of prizes or rewards");
  }

  // Determine risk level
  let riskLevel: RiskLevel;
  let summary: string;

  if (riskScore <= -10) {
    riskLevel = "safe";
    summary = "This appears to be a legitimate, trusted resource.";
    recommendations.push("Always verify you're on the correct site before entering sensitive information.");
  } else if (riskScore <= 10) {
    riskLevel = "low";
    summary = "No significant threats detected, but exercise normal caution.";
    recommendations.push("Verify the source if you weren't expecting this content.");
    recommendations.push("Look for official verification badges or certificates.");
  } else if (riskScore <= 30) {
    riskLevel = "medium";
    summary = "Some suspicious indicators detected. Proceed with caution.";
    recommendations.push("Verify the legitimacy of this content through official channels.");
    recommendations.push("Do not enter sensitive information without verification.");
    recommendations.push("Check for official communications from the claimed source.");
  } else if (riskScore <= 50) {
    riskLevel = "high";
    summary = "Multiple warning signs detected. This content may be malicious.";
    recommendations.push("Do not click links or download files from this source.");
    recommendations.push("Do not enter any personal or financial information.");
    recommendations.push("Report this content if it was sent to you unsolicited.");
    recommendations.push("If you've already interacted, consider changing relevant passwords.");
  } else {
    riskLevel = "critical";
    summary = "Strong indicators of malicious content. Avoid interaction.";
    recommendations.push("Do not interact with this content in any way.");
    recommendations.push("Close this tab/window immediately if viewing the actual content.");
    recommendations.push("Report this to relevant authorities or platforms.");
    recommendations.push("If you've shared any information, take immediate protective action.");
  }

  // Calculate confidence based on number of indicators
  const confidence = Math.min(95, 50 + indicators.length * 10);

  // Add fallback details if none found
  if (details.length === 0) {
    details.push("No specific threat indicators identified in this analysis.");
  }

  return {
    riskLevel,
    confidence,
    summary,
    details,
    recommendations,
    indicators,
    timestamp: new Date(),
    inputType,
  };
}

export function formatTimestamp(date: Date): string {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
