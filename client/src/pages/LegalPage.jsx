import { Link, Navigate, useParams } from 'react-router-dom';
import Brand from '../components/Brand';

const pages = {
  privacy: {
    title: 'Privacy policy',
    intro: 'This demo policy explains how Seals HVAC Services intends to handle website and client portal information. It must be reviewed with the business before production launch.',
    sections: [
      ['Information collected', 'Contact and service-request details may include a name, email, phone number, building, suite, problem description and optional service evidence.'],
      ['How information is used', 'Information is used to respond to requests, coordinate authorized work, maintain service records and communicate account updates.'],
      ['Access and security', 'Client portal information is intended to be available only to authorized users. Production access will use authenticated accounts and role-based permissions.'],
      ['Contact', 'Questions about privacy can be directed to Seals HVAC Services at 416-732-8025.']
    ]
  },
  terms: {
    title: 'Website terms',
    intro: 'These draft terms describe the intended use of the public website and client portal. Final legal language should be approved before production launch.',
    sections: [
      ['Website information', 'Website content is general information and does not replace a technician diagnosis or a written, authorized scope of work.'],
      ['Quotes and authorization', 'Displayed options, pricing and scheduling become binding only when confirmed through the applicable service process.'],
      ['Portal access', 'Authorized users are responsible for protecting their account credentials and reporting suspected unauthorized access.'],
      ['Emergency limitations', 'The website is not an emergency dispatch service. For urgent concerns, call 416-732-8025 and follow applicable building safety procedures.']
    ]
  }
};

export default function LegalPage() {
  const { page } = useParams();
  const content = pages[page];
  if (!content) return <Navigate to="/" replace/>;
  return <div className="min-h-screen bg-[#f3f7fa] text-navy"><header className="border-b border-slate-200 bg-white"><div className="container-wide flex h-20 items-center justify-between"><Brand compact/><Link to="/" className="text-xs font-extrabold text-brand-600">Back to website</Link></div></header><main className="container-site py-16 md:py-24"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-brand-600">Seals HVAC Services</p><h1 className="mt-4 font-display text-5xl font-extrabold tracking-[-.05em] md:text-7xl">{content.title}</h1><p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">{content.intro}</p><div className="mt-12 grid gap-4">{content.sections.map(([title,text])=><section key={title} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"><h2 className="font-display text-xl font-extrabold">{title}</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">{text}</p></section>)}</div><p className="mt-8 text-xs text-slate-400">Draft updated August 2026 · Review required before production use.</p></main></div>;
}
