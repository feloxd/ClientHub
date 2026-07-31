import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, ArrowLeft, ArrowRight, Bell, Building2, CalendarDays, Camera,
  Check, CheckCircle2, ChevronDown, ClipboardCheck, Clock3, CreditCard,
  FileCheck2, FileText, Gauge, HardHat, Home, ImagePlus, LayoutDashboard,
  MapPin, Menu, MessageSquareText, Plus, ReceiptText, Search, Send, Settings,
  ShieldCheck, Sparkles, UserRoundCheck, Users, Wrench, X
} from 'lucide-react';
import Brand from '../components/Brand';

const copy = {
  en: {
    demo: 'Interactive product demo',
    client: 'Client',
    admin: 'Operations',
    tech: 'Technician',
    dashboard: 'Dashboard',
    requests: 'Service requests',
    quotes: 'Quotes',
    schedule: 'Schedule',
    payments: 'Payments',
    history: 'History',
    documents: 'Documents',
    properties: 'Properties',
    team: 'Team',
    signout: 'Exit demo',
    welcome: 'Good afternoon, Sophie',
    welcomeText: 'Here is what is happening across Harbourview Condominium.',
    newRequest: 'New service request',
    activeRequests: 'Active requests',
    pendingApproval: 'Pending approval',
    scheduled: 'Scheduled',
    completed: 'Completed this month',
    currentJob: 'Current service request',
    noCooling: 'No cooling in living room',
    unit: 'Suite 530',
    building: 'Harbourview Condominiums',
    quoteReady: 'Quote ready for approval',
    choose: 'Choose the best option for your property. Work will only begin after approval.',
    approve: 'Approve this option',
    approved: 'Option approved',
    option: 'Option',
    recommended: 'Recommended',
    requestReceived: 'Request received',
    diagnosis: 'Diagnosis',
    authorization: 'Authorization',
    appointment: 'Appointment',
    service: 'Service',
    report: 'Final report',
    requestTitle: 'Create a service request',
    requestHelp: 'Use simple words. Our team will handle the technical diagnosis.',
    property: 'Property',
    suite: 'Suite / unit',
    issue: 'What is happening?',
    priority: 'Priority',
    normal: 'Normal',
    urgent: 'Urgent',
    attach: 'Add photos (optional)',
    submit: 'Send request',
    sent: 'Request #SHV-1054 was created and sent to operations.',
    queue: 'Live service queue',
    queueText: 'Review, quote, schedule and assign every job from one place.',
    open: 'Open',
    awaiting: 'Awaiting client',
    today: 'Today',
    revenue: 'Collected this month',
    reviewRequest: 'Request details',
    clientNotes: 'Client description',
    diagnosisLabel: 'Plain-language diagnosis',
    diagnosisText: 'The fan coil is running, but the control valve is not opening. The suite is not receiving cold water.',
    createQuote: 'Build quote',
    assign: 'Assign technician',
    notify: 'Notify client',
    quoteOptions: 'Quote options',
    addOption: 'Add option',
    publish: 'Publish quote',
    operationsNote: 'The client sees only the explanation, options and total—not internal notes.',
    technicianToday: 'Today’s route',
    nextJob: 'Next assigned job',
    access: 'Access details',
    scope: 'Authorized scope',
    replaceValve: 'Replace fan coil control valve and test cooling operation.',
    startJob: 'Start job',
    progress: 'Work in progress',
    before: 'Before photos',
    after: 'After photos',
    addEvidence: 'Add photo evidence',
    changeOrder: 'Request additional authorization',
    changeHelp: 'Extra work requires a reason, cost and client approval before continuing.',
    collect: 'Collect on-site payment',
    finish: 'Complete service',
    paymentRecorded: 'Payment recorded',
    amount: 'Amount',
    method: 'Method',
    reference: 'Reference',
    receipt: 'Receipt / photo',
    record: 'Record payment',
    presentation: 'Presentation mode',
    demoHint: 'Switch roles to show the complete experience.',
    back: 'Back to website',
    allCaught: 'All actions are simulated for this sales demo.'
  },
  fr: {
    demo: 'Démo interactive du produit',
    client: 'Client',
    admin: 'Opérations',
    tech: 'Technicien',
    dashboard: 'Tableau de bord',
    requests: 'Demandes de service',
    quotes: 'Soumissions',
    schedule: 'Horaire',
    payments: 'Paiements',
    history: 'Historique',
    documents: 'Documents',
    properties: 'Immeubles',
    team: 'Équipe',
    signout: 'Quitter la démo',
    welcome: 'Bonjour, Sophie',
    welcomeText: 'Voici ce qui se passe au Harbourview Condominium.',
    newRequest: 'Nouvelle demande',
    activeRequests: 'Demandes actives',
    pendingApproval: 'À approuver',
    scheduled: 'Planifiées',
    completed: 'Terminées ce mois-ci',
    currentJob: 'Demande en cours',
    noCooling: 'Aucune climatisation au salon',
    unit: 'Unité 530',
    building: 'Harbourview Condominiums',
    quoteReady: 'Soumission prête à approuver',
    choose: 'Choisissez la meilleure option. Les travaux commencent seulement après votre approbation.',
    approve: 'Approuver cette option',
    approved: 'Option approuvée',
    option: 'Option',
    recommended: 'Recommandée',
    requestReceived: 'Demande reçue',
    diagnosis: 'Diagnostic',
    authorization: 'Autorisation',
    appointment: 'Rendez-vous',
    service: 'Service',
    report: 'Rapport final',
    requestTitle: 'Créer une demande de service',
    requestHelp: 'Décrivez simplement le problème. Notre équipe fera le diagnostic technique.',
    property: 'Immeuble',
    suite: 'Unité',
    issue: 'Que se passe-t-il?',
    priority: 'Priorité',
    normal: 'Normale',
    urgent: 'Urgente',
    attach: 'Ajouter des photos (facultatif)',
    submit: 'Envoyer la demande',
    sent: 'La demande #SHV-1054 a été envoyée aux opérations.',
    queue: 'File de service en direct',
    queueText: 'Analysez, soumissionnez, planifiez et assignez chaque travail au même endroit.',
    open: 'Ouvertes',
    awaiting: 'En attente du client',
    today: 'Aujourd’hui',
    revenue: 'Perçu ce mois-ci',
    reviewRequest: 'Détails de la demande',
    clientNotes: 'Description du client',
    diagnosisLabel: 'Diagnostic en langage simple',
    diagnosisText: 'Le ventilo-convecteur fonctionne, mais la vanne de contrôle ne s’ouvre pas. L’unité ne reçoit pas d’eau froide.',
    createQuote: 'Créer la soumission',
    assign: 'Assigner un technicien',
    notify: 'Aviser le client',
    quoteOptions: 'Options de soumission',
    addOption: 'Ajouter une option',
    publish: 'Publier la soumission',
    operationsNote: 'Le client voit l’explication, les options et le total — jamais les notes internes.',
    technicianToday: 'Trajet d’aujourd’hui',
    nextJob: 'Prochain travail assigné',
    access: 'Détails d’accès',
    scope: 'Travaux autorisés',
    replaceValve: 'Remplacer la vanne du ventilo-convecteur et tester la climatisation.',
    startJob: 'Commencer',
    progress: 'Travail en cours',
    before: 'Photos avant',
    after: 'Photos après',
    addEvidence: 'Ajouter une preuve photo',
    changeOrder: 'Demander une autorisation supplémentaire',
    changeHelp: 'Tout travail supplémentaire exige une justification, un coût et l’approbation du client.',
    collect: 'Percevoir le paiement sur place',
    finish: 'Terminer le service',
    paymentRecorded: 'Paiement enregistré',
    amount: 'Montant',
    method: 'Mode',
    reference: 'Référence',
    receipt: 'Reçu / photo',
    record: 'Enregistrer le paiement',
    presentation: 'Mode présentation',
    demoHint: 'Changez de rôle pour présenter l’expérience complète.',
    back: 'Retour au site',
    allCaught: 'Toutes les actions sont simulées dans cette démo.'
  }
};

const roleMeta = {
  client: { icon: Building2, color: 'bg-brand-600' },
  admin: { icon: ShieldCheck, color: 'bg-[#7c3aed]' },
  tech: { icon: HardHat, color: 'bg-[#e27620]' }
};

const tickets = [
  { id: 'SHV-1053', suite: 'Suite 530', title: 'No cooling in living room', stage: 'Awaiting approval', priority: 'Urgent', age: '18 min', accent: 'bg-amber-400' },
  { id: 'SHV-1052', suite: 'Suite 814', title: 'Fan coil annual maintenance', stage: 'Scheduled', priority: 'Normal', age: 'Today, 3:30 PM', accent: 'bg-blue-500' },
  { id: 'SHV-1051', suite: 'Suite 1206', title: 'Thermostat screen is blank', stage: 'Technician on site', priority: 'Normal', age: '42 min', accent: 'bg-cyan' },
  { id: 'SHV-1049', suite: 'Suite 407', title: 'Unusual noise from unit', stage: 'Reviewing request', priority: 'Normal', age: '2 hr', accent: 'bg-slate-400' }
];

function Pill({ children, tone = 'blue' }) {
  const tones = {
    blue: 'bg-brand-50 text-brand-700', green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700', purple: 'bg-violet-50 text-violet-700',
    slate: 'bg-slate-100 text-slate-600'
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${tones[tone]}`}>{children}</span>;
}

function Stat({ icon: Icon, label, value, detail, tone = 'blue' }) {
  const tones = {
    blue: 'bg-brand-50 text-brand-600', amber: 'bg-amber-50 text-amber-600',
    green: 'bg-emerald-50 text-emerald-600', purple: 'bg-violet-50 text-violet-600'
  };
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(7,34,58,.05)]">
    <div className="flex items-start justify-between"><span className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}><Icon size={19}/></span>{detail && <small className="font-bold text-emerald-600">{detail}</small>}</div>
    <strong className="mt-5 block font-display text-3xl font-extrabold text-navy">{value}</strong>
    <span className="mt-1 block text-xs font-semibold text-slate-500">{label}</span>
  </article>;
}

function Pipeline({ t }) {
  const steps = [
    [MessageSquareText, t.requestReceived, true],
    [Wrench, t.diagnosis, true],
    [FileCheck2, t.authorization, true],
    [CalendarDays, t.appointment, false],
    [UserRoundCheck, t.service, false],
    [ClipboardCheck, t.report, false]
  ];
  return <div className="overflow-x-auto pb-2"><div className="flex min-w-[720px] items-start">
    {steps.map(([Icon, label, done], index) => <div key={label} className="relative flex flex-1 flex-col items-center text-center">
      {index < steps.length - 1 && <span className={`absolute left-1/2 top-5 h-0.5 w-full ${done ? 'bg-brand-600' : 'bg-slate-200'}`}/>}
      <span className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border-4 border-white ${done ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{done ? <Check size={17}/> : <Icon size={16}/>}</span>
      <span className={`mt-2 max-w-24 text-[10px] font-bold ${done ? 'text-navy' : 'text-slate-400'}`}>{label}</span>
    </div>)}
  </div></div>;
}

function RequestModal({ t, onClose, onDone }) {
  const submit = (event) => {
    event.preventDefault();
    onDone();
  };
  return <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#03101e]/70 p-4 backdrop-blur-sm">
    <form onSubmit={submit} className="my-8 w-full max-w-2xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
      <header className="flex items-start justify-between border-b border-slate-200 p-6 sm:p-8">
        <div><Pill>{t.newRequest}</Pill><h2 className="mt-4 font-display text-2xl font-extrabold text-navy">{t.requestTitle}</h2><p className="mt-2 text-sm text-slate-500">{t.requestHelp}</p></div>
        <button type="button" onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500"><X size={18}/></button>
      </header>
      <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
        <label><span className="label">{t.property}</span><select className="input"><option>Harbourview Condominiums</option></select></label>
        <label><span className="label">{t.suite}</span><input className="input" defaultValue="Suite 1102" required/></label>
        <label className="sm:col-span-2"><span className="label">{t.issue}</span><textarea className="input min-h-28 resize-none" placeholder="The air conditioner is running but the suite is still warm..." required/></label>
        <label><span className="label">{t.priority}</span><select className="input"><option>{t.normal}</option><option>{t.urgent}</option></select></label>
        <label><span className="label">{t.attach}</span><span className="flex h-[46px] cursor-pointer items-center gap-2 rounded-lg border border-dashed border-brand-500 px-4 text-sm font-bold text-brand-600"><ImagePlus size={17}/> JPG, PNG</span></label>
      </div>
      <footer className="flex justify-end gap-3 bg-slate-50 px-6 py-5 sm:px-8"><button type="button" onClick={onClose} className="btn-secondary">Cancel</button><button className="btn-primary"><Send size={16}/>{t.submit}</button></footer>
    </form>
  </div>;
}

function ClientView({ t, selectedQuote, setSelectedQuote, setToast, setRequestOpen }) {
  const options = [
    { id: 1, title: 'Standard valve replacement', text: 'OEM-compatible valve, installation and system test.', price: '$385', warranty: '1-year parts warranty' },
    { id: 2, title: 'Premium OEM replacement', text: 'Manufacturer OEM valve, installation and full performance test.', price: '$495', warranty: '2-year parts warranty' },
    { id: 3, title: 'Repair + preventive service', text: 'Valve replacement plus coil cleaning and seasonal inspection.', price: '$635', warranty: 'Best long-term value' }
  ];
  const approve = () => {
    if (!selectedQuote) return;
    setToast(t.approved);
  };
  return <div className="space-y-7">
    <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-600">{t.building}</p><h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy md:text-4xl">{t.welcome}</h1><p className="mt-2 text-sm text-slate-500">{t.welcomeText}</p></div>
      <button onClick={() => setRequestOpen(true)} className="btn-primary rounded-full"><Plus size={17}/>{t.newRequest}</button>
    </header>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat icon={MessageSquareText} label={t.activeRequests} value="3" tone="blue"/>
      <Stat icon={FileCheck2} label={t.pendingApproval} value="1" tone="amber"/>
      <Stat icon={CalendarDays} label={t.scheduled} value="2" tone="purple"/>
      <Stat icon={CheckCircle2} label={t.completed} value="14" detail="+12%" tone="green"/>
    </section>
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-card">
      <div className="flex flex-col gap-5 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-600"><Wrench size={21}/></span><div><p className="text-[10px] font-black uppercase tracking-widest text-brand-600">{t.currentJob} · #SHV-1053</p><h2 className="mt-1 font-display text-xl font-extrabold text-navy">{t.noCooling}</h2><p className="mt-1 text-xs text-slate-500">{t.unit} · {t.building}</p></div></div>
        <Pill tone="amber">{t.quoteReady}</Pill>
      </div>
      <div className="p-6"><Pipeline t={t}/></div>
    </section>
    <section className="rounded-[24px] bg-[#071a2e] p-6 text-white shadow-[0_22px_60px_rgba(4,24,43,.18)] sm:p-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan">{t.quoteReady} · #Q-2077</p><h2 className="mt-3 font-display text-2xl font-extrabold">Fan coil control valve repair</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">{t.choose}</p></div>
        <div className="rounded-xl bg-white/10 px-4 py-3 text-xs"><span className="text-white/45">Valid until</span><strong className="ml-2">Aug 8, 2026</strong></div>
      </div>
      <div className="mt-7 grid gap-3 lg:grid-cols-3">
        {options.map((item, index) => <button key={item.id} onClick={() => setSelectedQuote(item.id)} className={`relative rounded-2xl border p-5 text-left transition ${selectedQuote === item.id ? 'border-cyan bg-cyan/10 ring-2 ring-cyan/25' : 'border-white/15 bg-white/[.05] hover:border-white/35'}`}>
          {index === 1 && <span className="absolute -top-2.5 right-4 rounded-full bg-cyan px-3 py-1 text-[9px] font-black uppercase text-navy">{t.recommended}</span>}
          <div className="flex items-start justify-between"><span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t.option} {item.id}</span><span className={`grid h-5 w-5 place-items-center rounded-full border ${selectedQuote === item.id ? 'border-cyan bg-cyan text-navy' : 'border-white/30'}`}>{selectedQuote === item.id && <Check size={13}/>}</span></div>
          <h3 className="mt-5 font-display text-lg font-bold">{item.title}</h3><p className="mt-2 min-h-12 text-xs leading-5 text-white/50">{item.text}</p><strong className="mt-6 block font-display text-3xl font-extrabold text-cyan">{item.price}</strong><small className="mt-2 block text-white/45">{item.warranty} · + HST</small>
        </button>)}
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center"><p className="flex items-center gap-2 text-xs text-white/45"><ShieldCheck size={16} className="text-cyan"/>Approval is recorded with date and account.</p><button onClick={approve} disabled={!selectedQuote} className="inline-flex items-center gap-2 rounded-full bg-cyan px-6 py-3 text-sm font-extrabold text-navy transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35">{t.approve}<ArrowRight size={16}/></button></div>
    </section>
  </div>;
}

function AdminView({ t, setToast }) {
  const [options, setOptions] = useState(2);
  return <div className="space-y-7">
    <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-violet-600">Seals command centre</p><h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy md:text-4xl">{t.queue}</h1><p className="mt-2 text-sm text-slate-500">{t.queueText}</p></div><button onClick={() => setToast('New request created')} className="btn-primary rounded-full"><Plus size={17}/>{t.newRequest}</button></header>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat icon={MessageSquareText} label={t.open} value="12" detail="+3 today"/>
      <Stat icon={Clock3} label={t.awaiting} value="4" tone="amber"/>
      <Stat icon={UserRoundCheck} label={t.today} value="8 jobs" tone="purple"/>
      <Stat icon={CreditCard} label={t.revenue} value="$18.4K" detail="+8.2%" tone="green"/>
    </section>
    <div className="grid gap-6 2xl:grid-cols-[1.12fr_.88fr]">
      <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-slate-200 p-5"><div><h2 className="font-display text-lg font-extrabold text-navy">Priority queue</h2><p className="mt-1 text-xs text-slate-500">Updated a few seconds ago</p></div><div className="relative hidden sm:block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><input className="input w-52 py-2 pl-9" placeholder="Search jobs"/></div></div>
        <div className="divide-y divide-slate-100">{tickets.map((ticket, index) => <button key={ticket.id} className={`grid w-full gap-3 p-5 text-left transition hover:bg-slate-50 sm:grid-cols-[6px_1fr_auto] sm:items-center ${index === 0 ? 'bg-brand-50/50' : ''}`}>
          <span className={`hidden h-12 w-1.5 rounded-full sm:block ${ticket.accent}`}/>
          <span><span className="flex flex-wrap items-center gap-2"><b className="text-sm text-navy">{ticket.suite} · {ticket.title}</b>{index === 0 && <Pill tone="amber">Needs action</Pill>}</span><small className="mt-1.5 block text-slate-500">{ticket.id} · {ticket.priority} · {ticket.age}</small></span>
          <span className="text-xs font-bold text-brand-600">{ticket.stage} <ArrowRight className="ml-1 inline" size={13}/></span>
        </button>)}</div>
      </section>
      <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-card">
        <header className="border-b border-slate-200 bg-[#071a2e] p-6 text-white"><div className="flex items-center justify-between"><Pill tone="amber">Needs quote</Pill><span className="text-xs text-white/45">#SHV-1053</span></div><h2 className="mt-4 font-display text-2xl font-extrabold">{t.reviewRequest}</h2><p className="mt-2 text-sm text-white/50">{t.unit} · {t.building}</p></header>
        <div className="space-y-5 p-6">
          <div><p className="label">{t.clientNotes}</p><p className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">“The air is running but it is still very warm in the living room. The bedroom feels cooler.”</p></div>
          <div><p className="label">{t.diagnosisLabel}</p><p className="rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm leading-6 text-navy">{t.diagnosisText}</p></div>
          <div className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between"><div><p className="font-display text-sm font-extrabold text-navy">{t.quoteOptions}</p><p className="mt-1 text-xs text-slate-500">{options} options prepared</p></div><button onClick={() => setOptions((count) => count + 1)} className="flex items-center gap-1 text-xs font-bold text-brand-600"><Plus size={14}/>{t.addOption}</button></div>
            <div className="mt-4 space-y-2">{Array.from({ length: options }).map((_, index) => <div key={index} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 text-xs"><span><b>Option {index + 1}</b> · {index === 0 ? 'Standard replacement' : index === 1 ? 'OEM replacement' : 'Custom alternative'}</span><b className="text-navy">${index === 0 ? '385' : index === 1 ? '495' : 575 + index * 40}</b></div>)}</div>
          </div>
          <p className="flex gap-2 text-[11px] leading-5 text-slate-400"><ShieldCheck className="mt-0.5 shrink-0" size={15}/>{t.operationsNote}</p>
          <div className="grid gap-2 sm:grid-cols-2"><button onClick={() => setToast('Quote published and client notified')} className="btn-primary"><Send size={16}/>{t.publish}</button><button onClick={() => setToast('Technician assignment opened')} className="btn-secondary"><UserRoundCheck size={16}/>{t.assign}</button></div>
        </div>
      </section>
    </div>
  </div>;
}

function TechnicianView({ t, setToast }) {
  const [started, setStarted] = useState(false);
  const [payment, setPayment] = useState(false);
  return <div className="mx-auto max-w-6xl space-y-7">
    <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#d56818]">{t.technicianToday} · Oscar M.</p><h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy md:text-4xl">{started ? t.progress : t.nextJob}</h1><p className="mt-2 text-sm text-slate-500">2 of 5 jobs completed · Route on time</p></div><Pill tone="green">Online · GPS active</Pill></header>
    <div className="grid gap-6 lg:grid-cols-[.68fr_1.32fr]">
      <aside className="space-y-4">
        <section className="overflow-hidden rounded-[24px] bg-[#071a2e] text-white shadow-card"><div className="p-6"><div className="flex items-center justify-between"><Pill tone="amber">{started ? t.progress : '3:30 PM'}</Pill><span className="text-xs text-white/45">#WO-1053</span></div><h2 className="mt-5 font-display text-2xl font-extrabold">{t.noCooling}</h2><p className="mt-2 text-sm text-white/55">{t.unit} · {t.building}</p><div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs text-white/65"><p className="flex items-center gap-3"><MapPin size={16} className="text-cyan"/>88 Harbour St, Toronto</p><p className="flex items-center gap-3"><Home size={16} className="text-cyan"/>{t.access}: Concierge has key</p><p className="flex items-center gap-3"><Clock3 size={16} className="text-cyan"/>Estimated: 75 minutes</p></div></div><button onClick={() => { setStarted(true); setToast('Job timer started'); }} className="flex w-full items-center justify-center gap-2 bg-cyan py-4 text-sm font-extrabold text-navy">{started ? <><CheckCircle2 size={17}/>Job started</> : <><ArrowRight size={17}/>{t.startJob}</>}</button></section>
        <section className="rounded-[20px] border border-amber-200 bg-amber-50 p-5"><div className="flex gap-3"><AlertTriangle className="shrink-0 text-amber-600" size={20}/><div><h3 className="font-display text-sm font-extrabold text-amber-900">{t.changeOrder}</h3><p className="mt-2 text-xs leading-5 text-amber-800/70">{t.changeHelp}</p><button onClick={() => setToast('Change-order request opened')} className="mt-4 text-xs font-extrabold text-amber-800">Create request <ArrowRight className="ml-1 inline" size={13}/></button></div></div></section>
      </aside>
      <main className="space-y-5">
        <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-card">
          <p className="label">{t.scope}</p><h2 className="font-display text-xl font-extrabold text-navy">{t.replaceValve}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">{['Confirm power is off', 'Replace authorized part', 'Test cooling operation'].map((item, index) => <label key={item} className="flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4 text-xs font-semibold text-slate-600"><input type="checkbox" defaultChecked={index === 0} className="mt-0.5 accent-[#0969a9]"/>{item}</label>)}</div>
        </section>
        <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-card"><div className="flex items-center justify-between"><div><p className="label">Required documentation</p><h2 className="font-display text-xl font-extrabold text-navy">Photo evidence</h2></div><Camera className="text-brand-600"/></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">{[t.before, t.after].map((label, index) => <button key={label} onClick={() => setToast(`${label} added`)} className={`grid min-h-36 place-items-center rounded-2xl border-2 border-dashed p-5 text-center ${index === 0 ? 'border-emerald-200 bg-emerald-50/50' : 'border-brand-200 bg-brand-50/50'}`}><span><span className={`mx-auto grid h-10 w-10 place-items-center rounded-full ${index === 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-brand-100 text-brand-600'}`}>{index === 0 ? <Check size={19}/> : <Camera size={19}/>}</span><b className="mt-3 block text-sm text-navy">{label}</b><small className="mt-1 block text-slate-500">{index === 0 ? '2 photos uploaded' : t.addEvidence}</small></span></button>)}</div>
        </section>
        <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-card"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="label">{t.collect}</p><h2 className="font-display text-xl font-extrabold text-navy">{payment ? t.paymentRecorded : '$495.00 + HST · $559.35 CAD'}</h2></div>{payment ? <Pill tone="green">Paid · Credit card</Pill> : <button onClick={() => setPayment(true)} className="btn-primary"><CreditCard size={16}/>{t.record}</button>}</div>
          {payment && <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">{[[t.method,'Credit card'],[t.reference,'TX-773091'],[t.receipt,'Attached']].map(([label,value]) => <div key={label}><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p><b className="mt-1 block text-sm text-navy">{value}</b></div>)}</div>}
        </section>
        <button onClick={() => setToast('Service completed. Final report sent to operations.')} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-100"><CheckCircle2 size={18}/>{t.finish}</button>
      </main>
    </div>
  </div>;
}

export default function Demo() {
  const [role, setRole] = useState('client');
  const [lang, setLang] = useState('en');
  const [mobile, setMobile] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(2);
  const [toast, setToast] = useState('');
  const t = copy[lang];
  const meta = roleMeta[role];
  const RoleIcon = meta.icon;
  const nav = useMemo(() => {
    if (role === 'client') return [[LayoutDashboard,t.dashboard],[MessageSquareText,t.requests],[FileCheck2,t.quotes],[CalendarDays,t.schedule],[CreditCard,t.payments],[Clock3,t.history],[FileText,t.documents]];
    if (role === 'admin') return [[Gauge,t.dashboard],[MessageSquareText,t.requests],[FileCheck2,t.quotes],[CalendarDays,t.schedule],[Users,t.team],[Building2,t.properties],[CreditCard,t.payments],[Settings,'Settings']];
    return [[LayoutDashboard,t.dashboard],[MapPin,t.schedule],[ClipboardCheck,'Work orders'],[ReceiptText,t.payments],[Clock3,t.history]];
  }, [role, t]);
  const flash = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };
  return <div className="min-h-screen bg-[#f4f7f9] text-navy">
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[270px] flex-col bg-[#061729] p-5 text-white lg:flex">
      <Brand light/>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[.06] p-4"><div className="flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${meta.color}`}><RoleIcon size={19}/></span><div><p className="text-[9px] font-black uppercase tracking-[.18em] text-white/35">{t.presentation}</p><b className="text-sm">{t[role]}</b></div></div><p className="mt-3 text-[11px] leading-5 text-white/40">{t.demoHint}</p></div>
      <nav className="mt-7 space-y-1">{nav.map(([Icon,label],index) => <button key={label} className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition ${index === 0 ? 'bg-white text-navy' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}><Icon size={18}/>{label}{label === t.requests && <span className="ml-auto rounded-full bg-cyan px-2 py-0.5 text-[9px] font-black text-navy">3</span>}</button>)}</nav>
      <Link to="/" className="mt-auto flex items-center gap-2 border-t border-white/10 pt-5 text-xs font-bold text-white/45 hover:text-white"><ArrowLeft size={15}/>{t.back}</Link>
    </aside>
    {mobile && <div className="fixed inset-0 z-[80] bg-navy/60 lg:hidden" onClick={() => setMobile(false)}><aside className="h-full w-72 bg-[#061729] p-5 text-white" onClick={(e) => e.stopPropagation()}><div className="flex justify-between"><Brand light/><button onClick={() => setMobile(false)}><X/></button></div><nav className="mt-8 space-y-1">{nav.map(([Icon,label],index) => <button key={label} className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold ${index === 0 ? 'bg-white text-navy' : 'text-white/60'}`}><Icon size={18}/>{label}</button>)}</nav></aside></div>}
    <div className="lg:pl-[270px]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-7">
        <div className="flex items-center justify-between gap-3"><button onClick={() => setMobile(true)} className="rounded-lg border border-slate-200 p-2 lg:hidden"><Menu size={20}/></button>
          <div className="hidden items-center gap-1 rounded-full bg-slate-100 p-1 sm:flex">{Object.keys(roleMeta).map((item) => { const Icon=roleMeta[item].icon; return <button key={item} onClick={() => setRole(item)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold transition ${role === item ? 'bg-white text-navy shadow-sm' : 'text-slate-500'}`}><Icon size={15}/>{t[item]}</button>;})}</div>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="input max-w-40 py-2 sm:hidden"><option value="client">{t.client}</option><option value="admin">{t.admin}</option><option value="tech">{t.tech}</option></select>
          <div className="ml-auto flex items-center gap-2"><button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="rounded-full border border-slate-200 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600">{lang === 'en' ? 'FR' : 'EN'}</button><button className="relative rounded-full border border-slate-200 p-2 text-slate-500"><Bell size={18}/><span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-cyan"/></button><span className={`grid h-9 w-9 place-items-center rounded-full text-xs font-black text-white ${meta.color}`}>{role === 'client' ? 'SP' : role === 'admin' ? 'AD' : 'OM'}</span></div>
        </div>
      </header>
      <main className="p-4 md:p-7 xl:p-9">
        {role === 'client' && <ClientView t={t} selectedQuote={selectedQuote} setSelectedQuote={setSelectedQuote} setToast={flash} setRequestOpen={setRequestOpen}/>}
        {role === 'admin' && <AdminView t={t} setToast={flash}/>}
        {role === 'tech' && <TechnicianView t={t} setToast={flash}/>}
        <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-widest text-slate-300">{t.allCaught}</p>
      </main>
    </div>
    {requestOpen && <RequestModal t={t} onClose={() => setRequestOpen(false)} onDone={() => { setRequestOpen(false); flash(t.sent); }}/>}
    {toast && <div className="fixed bottom-5 right-5 z-[120] flex max-w-sm items-center gap-3 rounded-2xl bg-[#071a2e] px-5 py-4 text-sm font-bold text-white shadow-2xl"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan text-navy"><Check size={15}/></span>{toast}</div>}
  </div>;
}
