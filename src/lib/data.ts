import {
  Shield,
  Brain,
  Link2,
  Coins,
  FileCheck,
  Lock,
  AlertTriangle,
  Clock,
  FileWarning,
  Users,
  Layers,
  Cpu,
  Database,
  Cloud,
  Scale,
  Landmark,
  Globe,
  Building2,
  PenTool,
  ShieldCheck,
  Truck,
  FileText,
  Gavel,
  Banknote,
  type LucideIcon,
} from 'lucide-react';

/* ───────────────────────────── HERO METRICS ───────────────────────────── */
export interface HeroMetric {
  label: string;
  icon: LucideIcon;
}

export const heroMetrics: HeroMetric[] = [
  { label: 'AI Verification', icon: Brain },
  { label: 'Tokenized Escrow State', icon: Coins },
  { label: 'Blockchain Audit Trail', icon: Link2 },
  { label: 'Future CBDC Ready', icon: Banknote },
];

/* ────────────────────────── TRUST GAP PROBLEMS ────────────────────────── */
export interface TrustProblem {
  problem: string;
  impact: string;
  icon: LucideIcon;
}

export const trustProblems: TrustProblem[] = [
  {
    problem: 'Bank guarantee access is difficult and expensive for many SMEs',
    impact: 'SMEs are excluded from international trade opportunities that require financial backing.',
    icon: Landmark,
  },
  {
    problem: 'LC process can be complex and slow',
    impact: 'Delays in letter of credit processing slow down trade cycles and increase cost.',
    icon: Clock,
  },
  {
    problem: 'Cross-border buyers and sellers lack mutual trust',
    impact: 'Transactions stall or fail without a neutral mechanism to assure both parties.',
    icon: Users,
  },
  {
    problem: 'Export-import documents are complex',
    impact: 'Document errors cause customs delays, shipment holds, and compliance risk.',
    icon: FileWarning,
  },
  {
    problem: 'Fraud and dispute risk reduce confidence',
    impact: 'Fear of non-payment or non-delivery discourages SMEs from scaling exports.',
    icon: AlertTriangle,
  },
];

/* ────────────────────────── SOLUTION FEATURES ────────────────────────── */
export interface SolutionFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const solutionFeatures: SolutionFeature[] = [
  {
    title: 'AI Document Verification',
    description: 'AI helps verify documents and detect anomalies across invoices, packing lists, and trade agreements.',
    icon: Brain,
  },
  {
    title: 'Tokenized Escrow State',
    description: 'A non-tradable digital representation of locked transaction value within the platform workflow.',
    icon: Coins,
  },
  {
    title: 'Blockchain Audit Trail',
    description: 'Immutable records of transaction proof, document hashes, and verification events.',
    icon: Link2,
  },
  {
    title: 'Programmable Settlement',
    description: 'Smart release logic supports condition-based, automated settlement workflows.',
    icon: Shield,
  },
  {
    title: 'Encrypted Cloud Storage',
    description: 'Original signed documents stored securely with encryption and access control.',
    icon: Cloud,
  },
];

/* ──────────────────── ARCHITECTURE LAYERS ──────────────────── */
export interface ArchLayer {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const architectureLayers: ArchLayer[] = [
  {
    name: 'User Layer',
    description: 'Web dashboard, mobile interface, API access for buyers, sellers, and administrators.',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'AI & Application Layer',
    description: 'Document verification engine, anomaly detection, workflow automation, and risk assessment.',
    icon: Brain,
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    name: 'Settlement Layer',
    description: 'Escrow orchestration, tokenized state management, and programmable release logic.',
    icon: Coins,
    color: 'from-violet-500 to-violet-600',
  },
  {
    name: 'Blockchain Layer',
    description: 'Immutable audit trail, document hash storage, verification event logging, and proof records.',
    icon: Link2,
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    name: 'Storage & Security Layer',
    description: 'Encrypted cloud storage, access control, digital signatures, and data integrity.',
    icon: Database,
    color: 'from-amber-500 to-amber-600',
  },
  {
    name: 'Compliance Layer',
    description: 'Regulatory alignment, trade standards compliance, legal framework, and governance.',
    icon: Scale,
    color: 'from-rose-500 to-rose-600',
  },
];

/* ──────────────────────── PLATFORM FLOW STEPS ──────────────────────── */
export interface FlowStep {
  step: number;
  title: string;
  description: string;
  details?: string[];
  escrowStatus: string;
  aiCheck: string;
  blockchainProof: string;
  disputeStatus: string;
}

export const platformFlowSteps: FlowStep[] = [
  {
    step: 1,
    title: 'Trade Agreement',
    description: 'Buyer and seller agree on trade terms.',
    details: ['Trade terms defined', 'Pricing confirmed', 'Delivery timeline set'],
    escrowStatus: 'Pending',
    aiCheck: 'Standby',
    blockchainProof: 'Not Started',
    disputeStatus: 'Clear',
  },
  {
    step: 2,
    title: 'Fiat Payment',
    description: 'Buyer pays using fiat currency.',
    details: ['Payment initiated', 'Fiat currency deposited', 'Transaction recorded'],
    escrowStatus: 'Funding',
    aiCheck: 'Standby',
    blockchainProof: 'Initiated',
    disputeStatus: 'Clear',
  },
  {
    step: 3,
    title: 'Tokenized Escrow',
    description: 'Transaction value becomes Tokenized Escrow State.',
    details: ['Non-tradable representation of locked transaction value', 'Escrow state created', 'Value secured'],
    escrowStatus: 'Locked',
    aiCheck: 'Standby',
    blockchainProof: 'Recorded',
    disputeStatus: 'Clear',
  },
  {
    step: 4,
    title: 'AI Verification',
    description: 'AI verifies trade documents.',
    details: ['Invoice verified', 'Packing list checked', 'Trade agreement validated', 'Shipment data confirmed', 'Export documents reviewed'],
    escrowStatus: 'Locked',
    aiCheck: 'Processing',
    blockchainProof: 'Recorded',
    disputeStatus: 'Clear',
  },
  {
    step: 5,
    title: 'Blockchain Logging',
    description: 'Blockchain logs all verification events.',
    details: ['Escrow state logged', 'Document hash stored', 'Verification events recorded', 'Smart release status updated'],
    escrowStatus: 'Verified',
    aiCheck: 'Passed',
    blockchainProof: 'Verified',
    disputeStatus: 'Clear',
  },
  {
    step: 6,
    title: 'Settlement Release',
    description: 'If conditions are fulfilled, settlement is released to seller.',
    details: ['All conditions met', 'Settlement approved', 'Funds released to seller'],
    escrowStatus: 'Released',
    aiCheck: 'Passed',
    blockchainProof: 'Finalized',
    disputeStatus: 'Clear',
  },
];

/* ──────────────────── TOKENIZATION MODEL ──────────────────── */
export interface TokenPoint {
  title: string;
  description: string;
}

export const tokenPoints: TokenPoint[] = [
  { title: 'Not Public Cryptocurrency', description: 'The token is not listed on any public exchange and has no market trading.' },
  { title: 'Not Traded', description: 'Tokens cannot be bought, sold, or transferred between users outside the platform.' },
  { title: 'No Speculative Value', description: 'The token has no speculative market value — it is not an investment instrument.' },
  { title: 'Represents Transaction State', description: 'Each token only represents the current state of a specific trade transaction.' },
  { title: 'Tied to Real Trade', description: 'Every tokenized escrow state is backed by and linked to a real trade transaction.' },
  { title: 'Future CBDC-Ready', description: 'Architecture is designed for future compatibility with Central Bank Digital Currency settlement.' },
];

/* ──────────────────── AI ROLE ──────────────────── */
export const aiCan: string[] = [
  'Generate draft documents',
  'Verify and validate documents',
  'Detect anomalies and risk',
  'Recommend workflow actions',
  'Monitor transaction status',
];

export const aiCannot: string[] = [
  'Decide legal disputes',
  'Release funds independently',
  'Replace human approval',
  'Act as arbitrator',
];

/* ──────────────────── ECOSYSTEM ──────────────────── */
export interface EcoNode {
  name: string;
  purpose: string;
  type: 'domestic' | 'international';
  icon: LucideIcon;
}

export const ecosystemNodes: EcoNode[] = [
  { name: 'Bea Cukai', purpose: 'customs document reference and HS code validation pathway.', type: 'domestic', icon: ShieldCheck },
  { name: 'Kemendag', purpose: 'export-import ecosystem and trade policy alignment pathway.', type: 'domestic', icon: Building2 },
  { name: 'Bank Indonesia', purpose: 'future Digital Rupiah and CBDC settlement alignment.', type: 'domestic', icon: Landmark },
  { name: 'Komdigi / BSrE', purpose: 'national digital signature and document integrity infrastructure alignment.', type: 'domestic', icon: PenTool },
  { name: 'KADIN', purpose: 'SME exporter onboarding and pilot ecosystem.', type: 'domestic', icon: Users },
  { name: 'Logistics APIs', purpose: 'Shipment status tracking, customs clearing coordinates, and delivery confirmation pathways.', type: 'international', icon: Truck },
  { name: 'Trade Standards', purpose: 'UN/CEFACT, ICC, and Incoterms standards representation.', type: 'international', icon: FileText },
  { name: 'Arbitration Partners', purpose: 'Mediation, dispute management workflows, and fast resolution routes.', type: 'international', icon: Gavel },
  { name: 'CBDC Initiatives', purpose: 'Cross-border liquidity pools and future programmable settlement bridges.', type: 'international', icon: Globe },
];

/* ──────────────────── BMC ──────────────────── */
export interface BMCBlock {
  title: string;
  items: string[];
  gridArea: string;
}

export const bmcData: BMCBlock[] = [
  {
    title: 'Key Partners',
    items: ['Customs / Bea Cukai reference', 'Kemendag ecosystem', 'Logistics APIs', 'Digital signature provider', 'Export communities', 'Legal & trade compliance experts'],
    gridArea: 'kp',
  },
  {
    title: 'Key Activities',
    items: ['AI document verification', 'Escrow orchestration', 'Blockchain audit trail', 'Compliance workflow', 'SME onboarding & education'],
    gridArea: 'ka',
  },
  {
    title: 'Value Proposition',
    items: ['Affordable trade assurance', 'Transparent settlement workflow', 'Faster document verification', 'Reduced fraud & dispute risk', 'SME-friendly export infrastructure', 'Future CBDC-ready settlement'],
    gridArea: 'vp',
  },
  {
    title: 'Customer Relationships',
    items: ['Self-service platform', 'Onboarding support', 'Export education', 'Dedicated assistance for early adopters'],
    gridArea: 'cr',
  },
  {
    title: 'Customer Segments',
    items: ['Indonesian SME exporters', 'International SME buyers', 'Freight forwarders', 'Trading companies', 'Export communities'],
    gridArea: 'cs',
  },
  {
    title: 'Key Resources',
    items: ['AI document engine', 'Blockchain infrastructure', 'Escrow workflow engine', 'Encrypted cloud storage', 'Legal/compliance framework', 'Brand trust'],
    gridArea: 'kr',
  },
  {
    title: 'Channels',
    items: ['Website platform', 'Export communities', 'KADIN / events', 'Digital content', 'B2B outreach', 'Integration partnerships'],
    gridArea: 'ch',
  },
  {
    title: 'Cost Structure',
    items: ['Cloud infrastructure', 'AI model cost', 'Development team', 'Legal & compliance', 'Marketing & partnership', 'API integration'],
    gridArea: 'cost',
  },
  {
    title: 'Revenue Streams',
    items: ['SaaS subscription', 'Transaction fee', 'Enterprise/API integration', 'Premium verification service', 'Value-added trade services'],
    gridArea: 'rev',
  },
];

/* ──────────────────── DOCUMENTS ──────────────────── */
export interface LegalDoc {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const legalDocuments: LegalDoc[] = [
  { title: 'Trade Agreement', description: 'Defines trade terms, pricing, delivery, and obligations between buyer and seller.', icon: FileText },
  { title: 'Escrow Instruction Agreement', description: 'Governs the conditions for escrow lock, verification, and release.', icon: Lock },
  { title: 'Platform Terms & Conditions', description: 'Outlines user responsibilities, platform scope, and legal boundaries.', icon: Scale },
  { title: 'Tokenized Settlement Acknowledgement', description: 'Confirms understanding that tokenized escrow state is non-tradable and non-speculative.', icon: Coins },
  { title: 'Dispute Resolution Agreement', description: 'Establishes the pathway for mediation and dispute resolution.', icon: Gavel },
];

export interface RoadmapPhase {
  phase: number;
  title: string;
  subtitle: string;
  items: string[];
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: 1,
    title: 'MVP Trade Assurance',
    subtitle: 'Core Foundation',
    items: ['Bespoke trade agreement flows', 'Value locking escrow contracts', 'Dashboard mockup pilots', 'Domestic SME group trials'],
  },
  {
    phase: 2,
    title: 'AI Verification',
    subtitle: 'Automation',
    items: ['Bills of lading invoice audits', 'Automatic HS Code checks', 'Customs documentation scans', 'Risk scoring indicators'],
  },
  {
    phase: 3,
    title: 'Blockchain Audit',
    subtitle: 'Immutability',
    items: ['Secure document hashing logs', 'Verification events logs', 'Smart verification conditions', 'Ecosystem onboarding pilots'],
  },
  {
    phase: 4,
    title: 'CBDC Settlement',
    subtitle: 'Programmability',
    items: ['Digital Rupiah integration blueprint', 'Bank Indonesia alignment', 'Automatic payout routing mechanics', 'Arbitration settlement logic'],
  },
  {
    phase: 5,
    title: 'Global Expansion',
    subtitle: 'Scale Infrastructure',
    items: ['Cross-border regulatory alignment', 'Logistics clearing integrations', 'International hub partnerships', 'Global SME trade Assurance rails'],
  },
];

/* ──────────────────── NATIONAL RELEVANCE ──────────────────── */
export interface NationalPoint {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const nationalPoints: NationalPoint[] = [
  { title: 'SME Export Inclusion', description: 'Enabling smaller businesses to participate in international trade with assurance.', icon: Users },
  { title: 'Digitalization of Trade Assurance', description: 'Modernizing the trust layer for export-import with digital infrastructure.', icon: Cpu },
  { title: 'Transparency in Settlement', description: 'Creating auditable, transparent cross-border settlement workflows.', icon: Shield },
  { title: 'CBDC Ecosystem Readiness', description: 'Aligning infrastructure with future Digital Rupiah and CBDC initiatives.', icon: Banknote },
  { title: 'Efficient Export-Import Workflow', description: 'Reducing friction, cost, and time in the export-import process.', icon: Layers },
];
