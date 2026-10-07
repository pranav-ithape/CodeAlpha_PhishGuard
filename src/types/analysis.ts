export type FindingSeverity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface EducationalModuleLink {
  title: string;
  route: string;
  moduleNumber: number;
}

export interface AnalysisFinding {
  id: string;
  category: 'SENDER' | 'AUTHENTICATION' | 'SUBJECT' | 'BODY' | 'LINK' | 'ATTACHMENT' | 'DOMAIN' | 'STRUCTURE';
  severity: FindingSeverity;
  title: string;
  evidence: string;
  explanation: string;
  recommendation: string;
  weight: number;
  moduleLink?: EducationalModuleLink;
}

export interface ScoreContribution {
  findingId: string;
  title: string;
  points: number;
}

export interface RiskAssessment {
  score: number; // 0 - 100 (capped)
  rawScore: number; // Sum of finding weights before capping
  isCapped: boolean; // True if rawScore > 100
  level: RiskLevel;
  verdict: string;
  summary: string;
  counts: {
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  scoreBreakdown: ScoreContribution[];
  recommendedAction: string;
}

// -------------------------------------------------------------
// URL Analysis Specific Models
// -------------------------------------------------------------
export interface ParsedUrlComponents {
  rawUrl: string;
  isValid: boolean;
  protocol: string;
  username?: string;
  hostname: string;
  subdomain: string;
  registeredDomain: string;
  tld: string;
  port?: string;
  pathname: string;
  search: string;
  queryParams: Record<string, string>;
  hash: string;
  isIpAddress: boolean;
  isShortened: boolean;
  hasPunycode: boolean;
}

export interface UrlAnalysisResult {
  parsed: ParsedUrlComponents;
  findings: AnalysisFinding[];
  riskAssessment: RiskAssessment;
}

// -------------------------------------------------------------
// Email Analysis Specific Models
// -------------------------------------------------------------
export interface EmailLink {
  text: string;
  url: string;
}

export interface EmailAttachment {
  filename: string;
  size?: string;
  mimeType?: string;
}

export interface ParsedEmailData {
  fromRaw: string;
  fromDisplayName: string;
  fromAddress: string;
  fromDomain: string;
  replyToRaw?: string;
  replyToAddress?: string;
  replyToDomain?: string;
  to: string;
  subject: string;
  body: string;
  links: EmailLink[];
  attachments: EmailAttachment[];
  headers: Record<string, string>;
}

export interface EmailAnalysisResult {
  parsed: ParsedEmailData;
  findings: AnalysisFinding[];
  riskAssessment: RiskAssessment;
}
