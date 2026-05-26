'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Boxes, CheckCircle, Coffee, Landmark, Plane, Sofa, Sparkles, Shirt, ShieldCheck } from 'lucide-react';

const scenarios = [
  {
    id: 'coffee',
    title: 'Coffee Export',
    product: 'Specialty Coffee Beans',
    exporter: 'Indonesian SME Exporter',
    importer: 'German Buyer',
    route: 'Jakarta -> Singapore -> Rotterdam -> Hamburg',
    market: 'Indonesia -> Germany',
    value: 'USD 12,000',
    incoterms: 'FOB',
    shipmentId: 'NX-SHP-8842',
    icon: Coffee,
  },
  {
    id: 'furniture',
    title: 'Furniture Export',
    product: 'Rattan Furniture',
    exporter: 'Indonesian SME Exporter',
    importer: 'UAE Buyer',
    route: 'Surabaya -> Singapore -> Jebel Ali',
    market: 'Indonesia -> UAE',
    value: 'USD 28,000',
    incoterms: 'CIF',
    shipmentId: 'NX-SHP-9910',
    icon: Sofa,
  },
  {
    id: 'textile',
    title: 'Textile Export',
    product: 'Textile Garments',
    exporter: 'Indonesian SME Exporter',
    importer: 'Singapore Buyer',
    route: 'Bandung -> Jakarta -> Singapore',
    market: 'Indonesia -> Singapore',
    value: 'USD 7,500',
    incoterms: 'FOB',
    shipmentId: 'NX-SHP-5027',
    icon: Shirt,
  },
];

const previewSteps = [
  { label: 'Exporter', icon: Boxes },
  { label: 'AI Verification', icon: Sparkles },
  { label: 'Escrow State', icon: ShieldCheck },
  { label: 'Logistics', icon: Plane },
  { label: 'Settlement', icon: Landmark },
];

const requiredDocuments = [
  'Commercial Invoice',
  'Packing List',
  'Trade Agreement',
  'Shipping Data',
  'Certificate of Origin',
];

const aiVerificationChecks = [
  'Invoice completeness',
  'Buyer and seller identity match',
  'Amount consistency',
  'Shipment detail consistency',
  'Document hash preparation',
];

const logisticsEvents = [
  'Picked Up',
  'Export Customs Cleared',
  'Port Departure',
  'In Transit',
  'Import Customs',
  'Delivered',
];

const simulationSteps = [
  {
    label: 'Deal',
    log: 'Deal workspace opened in draft state.',
    status: {
      deal: 'Draft',
      documents: 'Not Assigned',
      ai: 'Standby',
      escrow: 'Waiting',
      proof: 'Not Recorded',
      shipment: 'Not Started',
      settlement: 'Locked',
    },
  },
  {
    label: 'Documents',
    log: 'Document assignment stage prepared for the selected scenario.',
    status: {
      deal: 'Draft',
      documents: 'Assigned',
      ai: 'Standby',
      escrow: 'Waiting',
      proof: 'Not Recorded',
      shipment: 'Not Started',
      settlement: 'Locked',
    },
  },
  {
    label: 'Verification',
    log: 'AI verification stage activated for trade documents.',
    status: {
      deal: 'Draft',
      documents: 'Assigned',
      ai: 'Checking',
      escrow: 'Waiting',
      proof: 'Not Recorded',
      shipment: 'Not Started',
      settlement: 'Locked',
    },
  },
  {
    label: 'Review',
    log: 'Review checkpoint reached for transaction readiness.',
    status: {
      deal: 'Under Review',
      documents: 'Assigned',
      ai: 'Passed',
      escrow: 'Waiting',
      proof: 'Not Recorded',
      shipment: 'Not Started',
      settlement: 'Locked',
    },
  },
  {
    label: 'Escrow',
    log: 'Tokenized escrow state prepared for locked transaction value.',
    status: {
      deal: 'Approved',
      documents: 'Assigned',
      ai: 'Passed',
      escrow: 'Locked',
      proof: 'Not Recorded',
      shipment: 'Not Started',
      settlement: 'Locked',
    },
  },
  {
    label: 'Proof',
    log: 'Blockchain proof stage recorded transaction checkpoint metadata.',
    status: {
      deal: 'Approved',
      documents: 'Assigned',
      ai: 'Passed',
      escrow: 'Locked',
      proof: 'Recorded',
      shipment: 'Not Started',
      settlement: 'Locked',
    },
  },
  {
    label: 'Shipment',
    log: 'Shipment tracking stage started for the selected route.',
    status: {
      deal: 'Approved',
      documents: 'Assigned',
      ai: 'Passed',
      escrow: 'Locked',
      proof: 'Recorded',
      shipment: 'In Transit',
      settlement: 'Locked',
    },
  },
  {
    label: 'Settlement',
    log: 'Programmable settlement stage ready for release conditions.',
    status: {
      deal: 'Approved',
      documents: 'Assigned',
      ai: 'Passed',
      escrow: 'Verified',
      proof: 'Recorded',
      shipment: 'Confirmed',
      settlement: 'Ready',
    },
  },
  {
    label: 'Completed',
    log: 'Simulation completed. Settlement state marked as released.',
    status: {
      deal: 'Completed',
      documents: 'Assigned',
      ai: 'Passed',
      escrow: 'Released',
      proof: 'Recorded',
      shipment: 'Confirmed',
      settlement: 'Released',
    },
  },
];

const statusLabels = [
  ['Deal Status', 'deal'],
  ['Documents', 'documents'],
  ['AI Verification', 'ai'],
  ['Escrow State', 'escrow'],
  ['Blockchain Proof', 'proof'],
  ['Shipment', 'shipment'],
  ['Settlement', 'settlement'],
] as const;

export default function TryNowPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const [attachedDocuments, setAttachedDocuments] = useState<string[]>([]);
  const [reviewRole, setReviewRole] = useState<'Exporter' | 'Importer'>('Exporter');
  const [buyerApproval, setBuyerApproval] = useState<'Pending' | 'Approved' | 'Revision Requested'>('Pending');
  const [showRevisionNote, setShowRevisionNote] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'Waiting for Buyer Payment' | 'Confirmed'>('Waiting for Buyer Payment');
  const [escrowStatus, setEscrowStatus] = useState<'Waiting' | 'Locked' | 'Released'>('Waiting');
  const [tokenizedState, setTokenizedState] = useState<'Not Created' | 'Created'>('Not Created');
  const [blockchainProof, setBlockchainProof] = useState<'Not Recorded' | 'Recorded'>('Not Recorded');
  const [shipmentEventIndex, setShipmentEventIndex] = useState(-1);
  const [deliveryStatus, setDeliveryStatus] = useState<'Pending' | 'Confirmed'>('Pending');
  const [settlementStatus, setSettlementStatus] = useState<'Locked' | 'Completed'>('Locked');
  const [aiCheckStatuses, setAiCheckStatuses] = useState<Record<string, 'Pending' | 'Checking' | 'Passed'>>(
    Object.fromEntries(aiVerificationChecks.map((check) => [check, 'Pending']))
  );
  const [aiVerificationRunning, setAiVerificationRunning] = useState(false);
  const [aiSuggestionResolved, setAiSuggestionResolved] = useState(false);
  const selectedScenario = scenarios.find((scenario) => scenario.id === selectedScenarioId);
  const liveStatus = simulationSteps[activeStep].status;
  const displayedStatus = {
    ...liveStatus,
    ...(activeStep === 2 && aiSuggestionResolved ? { ai: 'Passed' } : {}),
    ...(activeStep === 4 ? { escrow: escrowStatus } : {}),
    ...(activeStep === 5 ? { proof: blockchainProof } : {}),
    ...(activeStep === 6
      ? { shipment: deliveryStatus === 'Confirmed' ? 'Confirmed' : shipmentEventIndex >= 0 ? logisticsEvents[shipmentEventIndex] : 'Not Started' }
      : {}),
    ...(activeStep === 7 ? { escrow: escrowStatus, proof: blockchainProof, shipment: deliveryStatus === 'Confirmed' ? 'Confirmed' : 'Not Confirmed', settlement: settlementStatus } : {}),
    ...(activeStep === 8 ? { escrow: 'Released', proof: 'Finalized', shipment: 'Delivered', settlement: 'Completed' } : {}),
  };
  const allDocumentsAttached = attachedDocuments.length === requiredDocuments.length;
  const allAiChecksPassed = aiVerificationChecks.every((check) => aiCheckStatuses[check] === 'Passed');

  const resetAiVerification = () => {
    setAiCheckStatuses(Object.fromEntries(aiVerificationChecks.map((check) => [check, 'Pending'])));
    setAiVerificationRunning(false);
    setAiSuggestionResolved(false);
  };

  const resetReview = () => {
    setReviewRole('Exporter');
    setBuyerApproval('Pending');
    setShowRevisionNote(false);
  };

  const resetEscrowAndProof = () => {
    setPaymentStatus('Waiting for Buyer Payment');
    setEscrowStatus('Waiting');
    setTokenizedState('Not Created');
    setBlockchainProof('Not Recorded');
  };

  const resetLogistics = () => {
    setShipmentEventIndex(-1);
    setDeliveryStatus('Pending');
  };

  const resetSettlement = () => {
    setSettlementStatus('Locked');
  };

  const selectScenario = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    setSimulationStarted(false);
    setActiveStep(0);
    setActivityLog([]);
    setAttachedDocuments([]);
    resetAiVerification();
    resetReview();
    resetEscrowAndProof();
    resetLogistics();
    resetSettlement();
  };

  const startSimulation = () => {
    if (!selectedScenario) {
      return;
    }

    setSimulationStarted(true);
    setActiveStep(0);
    setActivityLog([`${selectedScenario.shipmentId}: ${simulationSteps[0].log}`]);
    setAttachedDocuments([]);
    resetAiVerification();
    resetReview();
    resetEscrowAndProof();
    resetLogistics();
    resetSettlement();
  };

  const nextStep = () => {
    if (!selectedScenario) {
      return;
    }

    setActiveStep((current) => {
      const next = Math.min(current + 1, simulationSteps.length - 1);
      if (next !== current) {
        setActivityLog((logs) => [
          `${selectedScenario.shipmentId}: ${simulationSteps[next].log}`,
          ...logs,
        ]);
      }
      return next;
    });
  };

  const resetSimulation = () => {
    if (!selectedScenario) {
      return;
    }

    setActiveStep(0);
    setActivityLog([`${selectedScenario.shipmentId}: ${simulationSteps[0].log}`]);
    setAttachedDocuments([]);
    resetAiVerification();
    resetReview();
    resetEscrowAndProof();
    resetLogistics();
    resetSettlement();
  };

  const attachDocument = (documentName: string) => {
    if (!selectedScenario || attachedDocuments.includes(documentName)) {
      return;
    }

    setAttachedDocuments((current) => [...current, documentName]);
    setActivityLog((logs) => [
      `${selectedScenario.shipmentId}: ${documentName} attached by exporter.`,
      ...logs,
    ]);
  };

  const runAiVerification = async () => {
    if (!selectedScenario || aiVerificationRunning || allAiChecksPassed) {
      return;
    }

    setAiVerificationRunning(true);
    setAiSuggestionResolved(false);
    setAiCheckStatuses(Object.fromEntries(aiVerificationChecks.map((check) => [check, 'Pending'])));

    for (const check of aiVerificationChecks) {
      setAiCheckStatuses((current) => ({ ...current, [check]: 'Checking' }));
      await new Promise((resolve) => setTimeout(resolve, 600));
      setAiCheckStatuses((current) => ({ ...current, [check]: 'Passed' }));
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    setAiVerificationRunning(false);
  };

  const applyAiSuggestion = () => {
    if (!selectedScenario || !allAiChecksPassed || aiSuggestionResolved) {
      return;
    }

    setAiSuggestionResolved(true);
    setActivityLog((logs) => [
      `${selectedScenario.shipmentId}: AI verification completed with resolved suggestion.`,
      ...logs,
    ]);
  };

  const approveTerms = () => {
    if (!selectedScenario) {
      return;
    }

    setBuyerApproval('Approved');
    setShowRevisionNote(false);
    setActivityLog((logs) => [
      `${selectedScenario.shipmentId}: Importer approved verified trade terms.`,
      ...logs,
    ]);
  };

  const requestRevision = () => {
    if (!selectedScenario) {
      return;
    }

    setBuyerApproval('Revision Requested');
    setShowRevisionNote(true);
    setActivityLog((logs) => [
      `${selectedScenario.shipmentId}: Importer requested revision.`,
      ...logs,
    ]);
  };

  const createEscrowState = () => {
    if (!selectedScenario || paymentStatus !== 'Confirmed' || escrowStatus === 'Locked') {
      return;
    }

    setEscrowStatus('Locked');
    setTokenizedState('Created');
    setActivityLog((logs) => [
      `${selectedScenario.shipmentId}: Tokenized escrow state created.`,
      ...logs,
    ]);
  };

  const confirmPayment = () => {
    if (!selectedScenario || paymentStatus === 'Confirmed') {
      return;
    }

    setPaymentStatus('Confirmed');
    setActivityLog((logs) => [
      `${selectedScenario.shipmentId}: Buyer payment confirmed through simulated payment gateway.`,
      ...logs,
    ]);
  };

  const recordProof = () => {
    if (!selectedScenario || blockchainProof === 'Recorded') {
      return;
    }

    setBlockchainProof('Recorded');
    setActivityLog((logs) => [
      `${selectedScenario.shipmentId}: Blockchain audit trail recorded document and agreement proof.`,
      ...logs,
    ]);
  };

  const nextLogisticsEvent = () => {
    if (!selectedScenario || shipmentEventIndex === logisticsEvents.length - 1) {
      return;
    }

    const nextIndex = shipmentEventIndex + 1;
    const eventName = logisticsEvents[nextIndex];
    setShipmentEventIndex(nextIndex);
    if (eventName === 'Delivered') {
      setDeliveryStatus('Confirmed');
    }
    setActivityLog((logs) => [
      `${selectedScenario.shipmentId}: Simulated Logistics API Event: ${eventName}`,
      ...logs,
    ]);
  };

  const releaseSettlement = () => {
    if (!selectedScenario || settlementStatus === 'Completed') {
      return;
    }

    setEscrowStatus('Released');
    setSettlementStatus('Completed');
    setActivityLog((logs) => [
      `${selectedScenario.shipmentId}: Settlement released to exporter under agreed conditions.`,
      ...logs,
    ]);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(to_bottom,rgba(248,250,252,0.96),rgba(255,255,255,0.9),rgba(241,245,249,0.96))] text-slate-950 transition-colors duration-300 dark:bg-[linear-gradient(to_bottom,rgba(3,7,18,0.98),rgba(5,11,24,0.94),rgba(2,5,12,0.98))] dark:text-white">
      <section className="relative px-6 pb-20 pt-32 md:px-10 md:pb-24 md:pt-36">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[110px] dark:bg-cyan-400/[0.08]" />
        <div className="pointer-events-none absolute right-[-180px] top-40 h-[360px] w-[360px] rounded-full bg-cyan-500/[0.06] blur-[100px] dark:bg-blue-500/[0.08]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-600 shadow-sm backdrop-blur-sm transition-colors hover:border-blue-500/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-cyan-300 dark:hover:border-cyan-400/40"
            >
              NEXII PORT Demo
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl md:text-7xl">
              NEXII Interactive Experience
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-xl">
              Simulate how exporters, importers, AI verification, tokenized escrow state, logistics tracking, and programmable settlement work together in one transaction.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                Scenario Selection
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white md:text-4xl">
                Choose an export-import scenario.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Select a trade case to preview the future simulation workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              const isSelected = selectedScenarioId === scenario.id;

              return (
                <button
                  key={scenario.title}
                  type="button"
                  onClick={() => selectScenario(scenario.id)}
                  aria-pressed={isSelected}
                  className={`premium-3d-card group relative overflow-hidden rounded-2xl border bg-white/70 p-6 text-left shadow-sm backdrop-blur-sm transition-all duration-300 dark:bg-[#070e1a]/60 ${
                    isSelected
                      ? 'border-blue-500/70 shadow-[0_22px_56px_rgba(37,99,235,0.14)] dark:border-cyan-400/70 dark:shadow-[0_22px_56px_rgba(34,211,238,0.16)]'
                      : 'border-slate-200/70 dark:border-white/[0.08]'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/[0.06] via-transparent to-cyan-500/[0.08] transition-opacity duration-300 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                  <div className="relative z-10">
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        isSelected
                          ? 'bg-blue-500/10 text-blue-600 dark:bg-cyan-400/10 dark:text-cyan-300'
                          : 'bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400'
                      }`}>
                        {isSelected && <CheckCircle className="h-3.5 w-3.5" />}
                        {isSelected ? 'Selected' : 'Preview'}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                      {scenario.title}
                    </h3>
                    <p className="mt-3 text-sm font-semibold text-blue-600 dark:text-cyan-300">
                      {scenario.market}
                    </p>
                    <p className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      {scenario.value}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedScenario && (
            <div className="mt-8 rounded-2xl border border-blue-500/20 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-cyan-400/20 dark:bg-[#070e1a]/65 md:p-8">
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                    Selected Scenario
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                    {selectedScenario.title}
                  </h3>
                </div>
                <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-cyan-400/10 dark:text-cyan-300">
                  {selectedScenario.shipmentId}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  ['Product', selectedScenario.product],
                  ['Exporter', selectedScenario.exporter],
                  ['Importer', selectedScenario.importer],
                  ['Route', selectedScenario.route],
                  ['Value', selectedScenario.value],
                  ['Incoterms', selectedScenario.incoterms],
                  ['Shipment ID', selectedScenario.shipmentId],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-bold leading-snug text-slate-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#070e1a]/60 md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.10),transparent_48%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.14),transparent_50%)]" />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                  Start Simulation Preview
                </p>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white md:text-4xl">
                  Transaction workspace shell.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
                  The next build will connect scenario selection into document assignment, verification states, logistics checkpoints, and programmable settlement.
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-5 lg:max-w-2xl">
                {previewSteps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.label}
                      className="flex min-h-[112px] flex-col items-center justify-center rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 text-center dark:border-white/10 dark:bg-slate-950/55"
                    >
                      <Icon className="h-5 w-5 text-blue-600 dark:text-cyan-300" />
                      <span className="mt-3 text-[11px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                disabled={!selectedScenario}
                onClick={startSimulation}
                className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/10 transition-all duration-300 ${
                  selectedScenario
                    ? 'cursor-pointer hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400 hover:shadow-cyan-500/20'
                    : 'cursor-not-allowed opacity-55'
                }`}
              >
                Start Simulation <ArrowRight className="h-4 w-4" />
              </button>
              <span className="inline-flex items-center rounded-xl border border-slate-200/70 bg-white/60 px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
                {selectedScenario ? 'Ready to start' : 'Choose scenario first'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {simulationStarted && selectedScenario && (
        <section className="px-6 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-cyan-400/20 dark:bg-[#070e1a]/65 md:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.10),transparent_42%)] dark:bg-[radial-gradient(circle_at_20%_0%,rgba(6,182,212,0.14),transparent_45%)]" />
              <div className="relative z-10">
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                  NEXII Trade Simulation
                </p>
                <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white md:text-4xl">
                      NEXII Trade Simulation
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
                      {selectedScenario.title} workflow for {selectedScenario.shipmentId}. Move through each checkpoint one step at a time.
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-cyan-400/10 dark:text-cyan-300">
                    {selectedScenario.value}
                  </span>
                </div>

                <div className="mt-8 overflow-x-auto pb-3">
                  <div className="grid min-w-[860px] grid-cols-9 gap-3">
                    {simulationSteps.map((step, index) => {
                      const isCompleted = index < activeStep;
                      const isActive = index === activeStep;

                      return (
                        <div key={step.label} className="relative">
                          <div className={`flex min-h-[92px] flex-col items-center justify-center rounded-xl border p-3 text-center transition-all duration-300 ${
                            isActive
                              ? 'border-blue-500 bg-blue-500/10 text-blue-600 shadow-[0_0_24px_rgba(37,99,235,0.14)] dark:border-cyan-400 dark:bg-cyan-400/10 dark:text-cyan-300 dark:shadow-[0_0_28px_rgba(34,211,238,0.16)]'
                              : isCompleted
                                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                : 'border-slate-200/70 bg-slate-50/80 text-slate-400 dark:border-white/10 dark:bg-slate-950/55 dark:text-slate-500'
                          }`}>
                            <span className="text-xs font-extrabold">{String(index + 1).padStart(2, '0')}</span>
                            <span className="mt-2 text-[11px] font-extrabold uppercase tracking-widest">{step.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/55">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                      Action Panel
                    </p>
                    <h3 className="mt-3 text-xl font-extrabold text-slate-950 dark:text-white">
                      {simulationSteps[activeStep].label}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      Current scenario: {selectedScenario.product} from {selectedScenario.market}.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={activeStep === simulationSteps.length - 1}
                        className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 ${
                          activeStep === simulationSteps.length - 1
                            ? 'cursor-not-allowed bg-slate-400 opacity-60'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-500/10 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400'
                        }`}
                      >
                        Next Step <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={resetSimulation}
                        className="inline-flex items-center rounded-xl border border-slate-200/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-cyan-400/40"
                      >
                        Reset Simulation
                      </button>
                    </div>

                    {simulationSteps[activeStep].label === 'Documents' && (
                      <div className="mt-6 rounded-2xl border border-blue-500/20 bg-white/75 p-4 dark:border-cyan-400/20 dark:bg-white/[0.03]">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                              Document Assignment
                            </p>
                            <h4 className="mt-1 text-base font-extrabold text-slate-950 dark:text-white">
                              Required export documents
                            </h4>
                          </div>
                          <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:bg-cyan-400/10 dark:text-cyan-300">
                            {attachedDocuments.length}/{requiredDocuments.length} Attached
                          </span>
                        </div>

                        <div className="space-y-3">
                          {requiredDocuments.map((documentName) => {
                            const isAttached = attachedDocuments.includes(documentName);

                            return (
                              <div
                                key={documentName}
                                className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55"
                              >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                  <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                                      {documentName}
                                    </p>
                                    <p className={`mt-1 text-xs font-semibold ${
                                      isAttached
                                        ? 'text-emerald-600 dark:text-emerald-300'
                                        : 'text-slate-500 dark:text-slate-400'
                                    }`}>
                                      {isAttached ? 'Attached' : 'Not Attached'}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => attachDocument(documentName)}
                                    disabled={isAttached}
                                    className={`w-full rounded-lg px-3 py-2 text-xs font-bold transition-all duration-300 sm:w-auto ${
                                      isAttached
                                        ? 'cursor-not-allowed bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                        : 'bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300'
                                    }`}
                                  >
                                    Attach Sample Document
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {allDocumentsAttached && (
                          <div className="mt-4 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                            All required documents are attached and ready for AI verification.
                          </div>
                        )}
                      </div>
                    )}

                    {simulationSteps[activeStep].label === 'Verification' && (
                      <div className="mt-6 rounded-2xl border border-blue-500/20 bg-white/75 p-4 dark:border-cyan-400/20 dark:bg-white/[0.03]">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                              AI Verification
                            </p>
                            <h4 className="mt-1 text-base font-extrabold text-slate-950 dark:text-white">
                              Structured document checks
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={runAiVerification}
                            disabled={aiVerificationRunning || allAiChecksPassed}
                            className={`w-full rounded-lg px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:w-auto ${
                              aiVerificationRunning || allAiChecksPassed
                                ? 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                                : 'bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300'
                            }`}
                          >
                            Run AI Verification
                          </button>
                        </div>

                        <div className="space-y-3">
                          {aiVerificationChecks.map((check) => {
                            const status = aiCheckStatuses[check];

                            return (
                              <div key={check} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                                    {check}
                                  </p>
                                  <span className={`w-fit rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                                    status === 'Passed'
                                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                      : status === 'Checking'
                                        ? 'bg-blue-500/10 text-blue-600 dark:bg-cyan-400/10 dark:text-cyan-300'
                                        : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                                  }`}>
                                    {status}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {allAiChecksPassed && (
                          <div className={`mt-4 rounded-xl border p-4 ${
                            aiSuggestionResolved
                              ? 'border-emerald-500/25 bg-emerald-500/10'
                              : 'border-amber-500/25 bg-amber-500/10'
                          }`}>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className={`text-sm font-semibold ${
                                  aiSuggestionResolved
                                    ? 'text-emerald-700 dark:text-emerald-300'
                                    : 'text-amber-700 dark:text-amber-300'
                                }`}>
                                  Packing List quantity format adjusted by AI suggestion.
                                </p>
                                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                  {aiSuggestionResolved ? 'Resolved' : 'Warning'}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={applyAiSuggestion}
                                disabled={aiSuggestionResolved}
                                className={`w-full rounded-lg px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:w-auto ${
                                  aiSuggestionResolved
                                    ? 'cursor-not-allowed bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                    : 'bg-amber-500 text-slate-950 hover:-translate-y-0.5 hover:bg-amber-400'
                                }`}
                              >
                                Apply Suggestion
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {simulationSteps[activeStep].label === 'Review' && (
                      <div className="mt-6 rounded-2xl border border-blue-500/20 bg-white/75 p-4 dark:border-cyan-400/20 dark:bg-white/[0.03]">
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                              Role Review
                            </p>
                            <h4 className="mt-1 text-base font-extrabold text-slate-950 dark:text-white">
                              Verified trade terms review
                            </h4>
                          </div>
                          <div className="grid grid-cols-2 rounded-xl border border-slate-200/70 bg-slate-100/80 p-1 dark:border-white/10 dark:bg-slate-950/55">
                            {(['Exporter', 'Importer'] as const).map((role) => (
                              <button
                                key={role}
                                type="button"
                                onClick={() => setReviewRole(role)}
                                className={`rounded-lg px-3 py-2 text-xs font-bold transition-all duration-300 ${
                                  reviewRole === role
                                    ? 'bg-white text-blue-600 shadow-sm dark:bg-cyan-400 dark:text-slate-950'
                                    : 'text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-cyan-300'
                                }`}
                              >
                                {role} View
                              </button>
                            ))}
                          </div>
                        </div>

                        {reviewRole === 'Exporter' ? (
                          <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              Waiting for importer review.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {buyerApproval === 'Approved' && (
                              <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                                Approved by Importer
                              </span>
                            )}

                            <div className="grid grid-cols-1 gap-3">
                              <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                  Selected Trade Terms
                                </p>
                                <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                                  {selectedScenario.product} | {selectedScenario.value} | {selectedScenario.incoterms}
                                </p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                  {selectedScenario.exporter} to {selectedScenario.importer}
                                </p>
                              </div>

                              <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                  Attached Documents Summary
                                </p>
                                <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                                  {attachedDocuments.length}/{requiredDocuments.length} required documents attached
                                </p>
                              </div>

                              <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                  AI Verification Result
                                </p>
                                <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                                  {aiSuggestionResolved ? 'Passed with resolved suggestion' : allAiChecksPassed ? 'Passed with pending suggestion' : 'Pending'}
                                </p>
                              </div>

                              <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                  Escrow Preview
                                </p>
                                <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                                  {selectedScenario.value} locked after importer approval
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              <button
                                type="button"
                                onClick={approveTerms}
                                className="rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
                              >
                                Approve Terms
                              </button>
                              <button
                                type="button"
                                onClick={requestRevision}
                                className="rounded-lg border border-slate-200/70 bg-white/70 px-4 py-2.5 text-xs font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                              >
                                Request Revision
                              </button>
                            </div>

                            {showRevisionNote && (
                              <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-4">
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                                  Revision Note
                                </p>
                                <textarea
                                  className="mt-3 min-h-24 w-full resize-none rounded-lg border border-amber-500/20 bg-white/75 p-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-amber-500/50 dark:bg-slate-950/60 dark:text-slate-200"
                                  placeholder="Add a short revision note for the exporter."
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {simulationSteps[activeStep].label === 'Escrow' && (
                      <div className="mt-6 rounded-2xl border border-blue-500/20 bg-white/75 p-4 dark:border-cyan-400/20 dark:bg-white/[0.03]">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                              Escrow State
                            </p>
                            <h4 className="mt-1 text-base font-extrabold text-slate-950 dark:text-white">
                              Tokenized escrow preparation
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={createEscrowState}
                            disabled={paymentStatus !== 'Confirmed' || escrowStatus === 'Locked'}
                            className={`w-full rounded-lg px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:w-auto ${
                              escrowStatus === 'Locked'
                                ? 'cursor-not-allowed bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                : paymentStatus !== 'Confirmed'
                                  ? 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                                : 'bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300'
                            }`}
                          >
                            Create Escrow State
                          </button>
                        </div>

                        <div className="mb-4 rounded-2xl border border-blue-500/20 bg-white/75 p-4 dark:border-cyan-400/20 dark:bg-white/[0.03]">
                          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                              <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                                Payment Gateway Preview
                              </p>
                              <h5 className="mt-1 text-sm font-extrabold text-slate-950 dark:text-white">
                                Payment Confirmation
                              </h5>
                            </div>
                            <button
                              type="button"
                              onClick={confirmPayment}
                              disabled={paymentStatus === 'Confirmed'}
                              className={`w-full rounded-lg px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:w-auto ${
                                paymentStatus === 'Confirmed'
                                  ? 'cursor-not-allowed bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                  : 'bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300'
                              }`}
                            >
                              Confirm Payment
                            </button>
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                            {[
                              ['Payment Method', 'International Transfer'],
                              ['Payment Channel', 'Virtual Account / Cross-border Payment'],
                              ['Amount', selectedScenario.value],
                              ['Currency', 'USD'],
                              ['Payment Status', paymentStatus],
                              ['Beneficiary', 'NEXII Escrow Settlement Layer'],
                              ['Reference ID', 'NX-PAY-2048'],
                            ].map(([label, value]) => (
                              <div key={label} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                  {label}
                                </p>
                                <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                                  {value}
                                </p>
                              </div>
                            ))}
                          </div>

                          {paymentStatus !== 'Confirmed' && (
                            <div className="mt-4 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm font-semibold text-amber-700 dark:text-amber-300">
                              Payment must be confirmed before escrow state can be locked.
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {[
                            ['Escrow State', escrowStatus],
                            ['Locked Value', selectedScenario.value],
                            ['Tokenized Escrow State', tokenizedState],
                            ['Settlement Condition', 'Delivery confirmed + no active dispute'],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                {label}
                              </p>
                              <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                          <p className="text-xs font-semibold leading-relaxed text-slate-600 dark:text-slate-300">
                            Note: Non-tradable digital representation of locked transaction value.
                          </p>
                        </div>
                      </div>
                    )}

                    {simulationSteps[activeStep].label === 'Proof' && (
                      <div className="mt-6 rounded-2xl border border-blue-500/20 bg-white/75 p-4 dark:border-cyan-400/20 dark:bg-white/[0.03]">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                              Blockchain Proof
                            </p>
                            <h4 className="mt-1 text-base font-extrabold text-slate-950 dark:text-white">
                              Audit trail recording
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={recordProof}
                            disabled={blockchainProof === 'Recorded'}
                            className={`w-full rounded-lg px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:w-auto ${
                              blockchainProof === 'Recorded'
                                ? 'cursor-not-allowed bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                : 'bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300'
                            }`}
                          >
                            Record Proof
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {[
                            ['Document Hash', '0x9F3A...82C'],
                            ['Agreement Hash', '0x71BC...42F'],
                            ['Timestamp', '2026-06-06 14:30 UTC'],
                            ['Proof Status', blockchainProof],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                {label}
                              </p>
                              <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {simulationSteps[activeStep].label === 'Shipment' && (
                      <div className="mt-6 rounded-2xl border border-blue-500/20 bg-white/75 p-4 dark:border-cyan-400/20 dark:bg-white/[0.03]">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                              Logistics Tracking
                            </p>
                            <h4 className="mt-1 text-base font-extrabold text-slate-950 dark:text-white">
                              Dummy route tracker
                            </h4>
                          </div>
                          {deliveryStatus === 'Confirmed' && (
                            <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                              Delivery Confirmed
                            </span>
                          )}
                        </div>

                        <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                          <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            Selected Route
                          </p>
                          <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                            {selectedScenario.route}
                          </p>
                        </div>

                        <div className="mt-4 overflow-x-auto pb-2">
                          <div className="relative min-w-[680px] px-2 py-5">
                            <div className="absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-slate-200 dark:bg-white/10" />
                            <div
                              className="absolute left-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                              style={{
                                width: shipmentEventIndex < 0 ? '0%' : `calc((100% - 4rem) * ${shipmentEventIndex / (logisticsEvents.length - 1)})`,
                              }}
                            />
                            <div className="relative grid grid-cols-6 gap-3">
                              {logisticsEvents.map((eventName, index) => {
                                const isComplete = shipmentEventIndex >= index;
                                const isActive = shipmentEventIndex === index;

                                return (
                                  <div key={eventName} className="flex flex-col items-center text-center">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-extrabold transition-all duration-300 ${
                                      isComplete
                                        ? 'border-blue-500 bg-blue-500 text-white dark:border-cyan-400 dark:bg-cyan-400 dark:text-slate-950'
                                        : 'border-slate-200 bg-white text-slate-400 dark:border-white/10 dark:bg-slate-950 dark:text-slate-500'
                                    }`}>
                                      {index + 1}
                                    </div>
                                    <span className={`mt-3 text-[10px] font-extrabold uppercase tracking-widest ${
                                      isActive
                                        ? 'text-blue-600 dark:text-cyan-300'
                                        : isComplete
                                          ? 'text-slate-700 dark:text-slate-200'
                                          : 'text-slate-400 dark:text-slate-500'
                                    }`}>
                                      {eventName}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                              Shipment Status
                            </p>
                            <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                              {deliveryStatus === 'Confirmed' ? 'Delivered' : shipmentEventIndex >= 0 ? logisticsEvents[shipmentEventIndex] : 'Not Started'}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={nextLogisticsEvent}
                            disabled={shipmentEventIndex === logisticsEvents.length - 1}
                            className={`w-full rounded-lg px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:w-auto ${
                              shipmentEventIndex === logisticsEvents.length - 1
                                ? 'cursor-not-allowed bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                : 'bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300'
                            }`}
                          >
                            Next Logistics Event
                          </button>
                        </div>
                      </div>
                    )}

                    {simulationSteps[activeStep].label === 'Settlement' && (
                      <div className="mt-6 rounded-2xl border border-blue-500/20 bg-white/75 p-4 dark:border-cyan-400/20 dark:bg-white/[0.03]">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                              Settlement Release
                            </p>
                            <h4 className="mt-1 text-base font-extrabold text-slate-950 dark:text-white">
                              Agreed-condition payout
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={releaseSettlement}
                            disabled={settlementStatus === 'Completed'}
                            className={`w-full rounded-lg px-4 py-2.5 text-xs font-bold transition-all duration-300 sm:w-auto ${
                              settlementStatus === 'Completed'
                                ? 'cursor-not-allowed bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                : 'bg-blue-600 text-white hover:-translate-y-0.5 hover:bg-blue-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300'
                            }`}
                          >
                            Release Settlement
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                              Conditions
                            </p>
                            <div className="mt-3 grid grid-cols-1 gap-2">
                              {[
                                ['Delivery Confirmed', deliveryStatus === 'Confirmed'],
                                ['No active dispute', true],
                                ['Blockchain Proof Recorded', blockchainProof === 'Recorded'],
                              ].map(([condition, passed]) => (
                                <div key={condition.toString()} className="flex items-center justify-between gap-3 rounded-lg bg-white/70 px-3 py-2 dark:bg-white/[0.03]">
                                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                                    {condition}
                                  </span>
                                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                                    passed
                                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                      : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                                  }`}>
                                    {passed ? 'Ready' : 'Pending'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {[
                            ['Escrow State', escrowStatus],
                            ['Settlement Status', settlementStatus],
                            ['Seller Payout', selectedScenario.value],
                            ['Dispute Status', 'Clear'],
                            ['Blockchain Proof', blockchainProof],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                {label}
                              </p>
                              <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {simulationSteps[activeStep].label === 'Completed' && (
                      <div className="mt-6 rounded-2xl border border-blue-500/20 bg-white/75 p-4 dark:border-cyan-400/20 dark:bg-white/[0.03]">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                              Final Summary
                            </p>
                            <h4 className="mt-1 text-base font-extrabold text-slate-950 dark:text-white">
                              Completed transaction state
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={resetSimulation}
                            className="w-full rounded-lg border border-slate-200/70 bg-white/70 px-4 py-2.5 text-xs font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-cyan-400/40 sm:w-auto"
                          >
                            Reset Simulation
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {[
                            ['Trade Deal', 'Approved'],
                            ['Documents', 'Verified'],
                            ['AI Verification', 'Passed'],
                            ['Escrow State', 'Released'],
                            ['Shipment', 'Delivered'],
                            ['Blockchain Proof', 'Finalized'],
                            ['Settlement', 'Completed'],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/55">
                              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                {label}
                              </p>
                              <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/55">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                      Live Status
                    </p>
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {statusLabels.map(([label, key]) => (
                        <div key={key} className="rounded-xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                          <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            {label}
                          </p>
                          <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                            {displayedStatus[key]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/55">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
                    Activity Log
                  </p>
                  <div className="mt-4 space-y-3">
                    {activityLog.map((entry, index) => (
                      <div key={`${entry}-${index}`} className="rounded-xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
                        {entry}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
