import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, CheckCircle2, ClipboardList, Download, Eye, FileCheck2, FileText, Filter, FolderOpen, Gauge, ImageIcon, Search } from 'lucide-react';
import AppShell from '../components/AppShell';
import Status from '../components/Status';
import api from '../lib/api';

const nav = [
  { to: '/portal', icon: Gauge, label: 'Resumen' },
  { to: '/portal/reportes', icon: ClipboardList, label: 'Reportes' },
  { to: '/portal/documentos', icon: FolderOpen, label: 'Documentos' }
];
const date = (value) => new Date(`${value}T12:00:00`).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });

function usePortalData() {
  const [reports, setReports] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    Promise.all([api.get('/cliente/reportes'), api.get('/cliente/documentos')])
      .then(([r,d]) => { setReports(r.data); setDocuments(d.data); setError(''); })
      .catch((requestError) => setError(requestError.response?.data?.error || 'No fue posible cargar tu información. Intenta nuevamente.'))
      .finally(() => setLoading(false));
  }, []);
  return { reports, documents, loading, error };
}

function Heading({ eyebrow, title, text, action }) {
  return <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-widest text-brand-600">{eyebrow}</p><h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy">{title}</h1>{text && <p className="mt-2 text-sm text-slate-500">{text}</p>}</div>{action}</div>;
}

function Summary({ reports, documents, loading }) {
  const latest = reports.slice(0, 3);
  return <div className="reveal"><Heading eyebrow="Tu operación al día" title="Hola, bienvenido" text="Aquí tienes un resumen de tus servicios y documentos."/>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[
        ['Reportes totales',reports.length,ClipboardList,'bg-blue-50 text-blue-600'],
        ['Servicios completados',reports.filter(r=>r.estatus==='completado').length,CheckCircle2,'bg-emerald-50 text-emerald-600'],
        ['Reportes nuevos',reports.filter(r=>!r.visto_por_cliente).length,Eye,'bg-cyan/15 text-brand-600'],
        ['Documentos',documents.length,FileCheck2,'bg-violet-50 text-violet-600']
      ].map(([label,value,Icon,color])=><div className="card p-5" key={label}><div className={`grid h-10 w-10 place-items-center rounded-lg ${color}`}><Icon size={20}/></div><p className="mt-5 font-display text-3xl font-extrabold text-navy">{loading ? '—' : value}</p><p className="mt-1 text-xs font-semibold text-slate-500">{label}</p></div>)}
    </div>
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_.55fr]">
      <section className="card overflow-hidden"><div className="flex items-center justify-between border-b border-line px-6 py-5"><h2 className="font-display font-bold text-navy">Reportes recientes</h2><Link to="/portal/reportes" className="text-xs font-bold text-brand-600">Ver todos →</Link></div>
        <div>{latest.map(r=><Link to={`/portal/reportes/${r.id}`} key={r.id} className="flex items-center gap-4 border-b border-line px-6 py-5 last:border-0 hover:bg-cloud">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600"><ClipboardList size={20}/></span><span className="min-w-0 flex-1"><span className="flex items-center gap-2"><b className="truncate text-sm text-navy">{r.titulo}</b>{!r.visto_por_cliente&&<small className="rounded bg-cyan px-1.5 py-0.5 text-[9px] font-black uppercase text-navy">Nuevo</small>}</span><small className="mt-1 block text-slate-500">{date(r.fecha_servicio)} · {r.tecnico}</small></span><Status value={r.estatus}/></Link>)}</div>
      </section>
      <aside className="relative overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-card"><div className="noise absolute inset-0 opacity-20"/><div className="relative"><FileText className="text-cyan"/><h2 className="mt-12 font-display text-xl font-bold">Tu expediente, siempre disponible.</h2><p className="mt-3 text-sm leading-6 text-blue-100">Consulta pólizas, seguros y certificaciones desde cualquier dispositivo.</p><Link to="/portal/documentos" className="mt-6 inline-flex text-sm font-bold text-cyan">Ver documentos →</Link></div></aside>
    </div>
  </div>;
}

function Reports({ reports }) {
  const [q,setQ]=useState(''); const [type,setType]=useState(''); const [from,setFrom]=useState(''); const [to,setTo]=useState('');
  const types=[...new Set(reports.map(r=>r.tipo_servicio))];
  const filtered=useMemo(()=>reports.filter(r=>(!q||r.titulo.toLowerCase().includes(q.toLowerCase()))&&(!type||r.tipo_servicio===type)&&(!from||r.fecha_servicio>=from)&&(!to||r.fecha_servicio<=to)),[reports,q,type,from,to]);
  return <div className="reveal"><Heading eyebrow="Historial de servicio" title="Reportes de trabajo" text="Consulta la evidencia y el detalle de cada intervención."/>
    <div className="card mb-5 grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4"><label className="relative xl:col-span-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17}/><input value={q} onChange={e=>setQ(e.target.value)} className="input pl-10" placeholder="Buscar reporte..."/></label><label className="relative"><Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><select value={type} onChange={e=>setType(e.target.value)} className="input pl-10"><option value="">Todos los servicios</option>{types.map(t=><option key={t}>{t}</option>)}</select></label><label><span className="sr-only">Desde</span><input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="input" title="Fecha desde"/></label><label><span className="sr-only">Hasta</span><input type="date" value={to} onChange={e=>setTo(e.target.value)} className="input" title="Fecha hasta"/></label></div>
    <div className="grid gap-4">{filtered.map(r=><Link key={r.id} to={`/portal/reportes/${r.id}`} className="card group grid gap-4 p-5 transition hover:border-brand-500 sm:grid-cols-[auto_1fr_auto] sm:items-center">
      <div className="relative h-24 w-full overflow-hidden rounded-lg bg-slate-100 sm:w-32">{r.photos?.[0]?<img src={r.photos[0].url} alt="" className="h-full w-full object-cover transition group-hover:scale-105"/>:<ImageIcon className="absolute inset-0 m-auto text-slate-300"/>}{!r.visto_por_cliente&&<span className="absolute left-2 top-2 rounded bg-cyan px-2 py-1 text-[9px] font-black uppercase text-navy">Nuevo</span>}</div>
      <div><div className="flex flex-wrap items-center gap-2"><h2 className="font-display text-lg font-bold text-navy">{r.titulo}</h2><Status value={r.estatus}/></div><p className="mt-2 text-sm text-slate-500">{r.tipo_servicio}</p><div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500"><span className="flex items-center gap-1.5"><CalendarDays size={14}/>{date(r.fecha_servicio)}</span><span>Técnico: {r.tecnico||'Por asignar'}</span></div></div>
      <span className="text-sm font-bold text-brand-600">Ver detalle →</span></Link>)}
      {!filtered.length&&<div className="card p-12 text-center text-sm text-slate-500">No encontramos reportes con esos filtros.</div>}
    </div>
  </div>;
}

function ReportDetail({ reports }) {
  const { id }=useParams(); const [report,setReport]=useState(reports.find(r=>String(r.id)===id)); const [loading,setLoading]=useState(!report);
  useEffect(()=>{ if(!report) api.get(`/cliente/reportes/${id}`).then(r=>setReport(r.data)).finally(()=>setLoading(false)); },[id,report]);
  if(loading)return <p>Cargando reporte…</p>; if(!report)return <p>Reporte no encontrado.</p>;
  const before=report.photos?.filter(p=>p.tipo==='antes')||[]; const after=report.photos?.filter(p=>p.tipo==='despues')||[];
  const download=async()=>{ try { const r=await api.get(`/cliente/reportes/${id}/pdf`,{responseType:'blob'}); const url=URL.createObjectURL(r.data); const a=document.createElement('a'); a.href=url;a.download=`reporte-NSI-${id}.pdf`;a.click();URL.revokeObjectURL(url); } catch { window.print(); } };
  return <div className="reveal max-w-6xl"><Link to="/portal/reportes" className="no-print mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500"><ArrowLeft size={16}/> Volver a reportes</Link>
    <div className="card overflow-hidden"><div className="border-b border-line bg-white p-6 sm:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row"><div><div className="flex items-center gap-3"><span className="text-xs font-bold uppercase tracking-widest text-brand-600">NSI-{String(report.id).padStart(5,'0')}</span><Status value={report.estatus}/>{!report.visto_por_cliente&&<span className="rounded bg-cyan px-2 py-1 text-[9px] font-black uppercase">Nuevo</span>}</div><h1 className="mt-3 font-display text-3xl font-extrabold text-navy">{report.titulo}</h1><p className="mt-2 text-sm text-slate-500">{report.tipo_servicio}</p></div><button onClick={download} className="btn-secondary no-print self-start"><Download size={17}/> Descargar PDF</button></div>
      <div className="mt-7 grid gap-4 rounded-xl bg-cloud p-5 sm:grid-cols-3">{[['Fecha',date(report.fecha_servicio)],['Técnico',report.tecnico||'—'],['Estatus',<Status value={report.estatus}/>]].map(([l,v])=><div key={l}><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{l}</p><div className="mt-1.5 text-sm font-semibold text-navy">{v}</div></div>)}</div></div>
      <div className="space-y-9 p-6 sm:p-8"><section><h2 className="font-display text-lg font-bold text-navy">Descripción del trabajo</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">{report.descripcion}</p></section>
      {(before.length||after.length)>0&&<section><h2 className="font-display text-lg font-bold text-navy">Evidencia fotográfica</h2><div className="mt-4 grid gap-5 md:grid-cols-2">{[[before,'Antes'],[after,'Después']].map(([photos,label])=><div key={label}><p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p><div className="grid gap-2">{photos.map(p=><img key={p.id} src={p.url} alt={`Evidencia ${label.toLowerCase()}`} className="h-64 w-full rounded-xl object-cover"/>)}</div></div>)}</div></section>}
      <div className="grid gap-5 md:grid-cols-2"><section className="rounded-xl bg-blue-50 p-5"><h2 className="font-display font-bold text-navy">Notas de servicio</h2><p className="mt-2 text-sm leading-6 text-slate-600">{report.notas||'Sin notas adicionales.'}</p></section><section className="rounded-xl bg-amber-50 p-5"><h2 className="font-display font-bold text-navy">Incidencias y observaciones</h2><p className="mt-2 text-sm leading-6 text-slate-600">{report.incidencias||'Sin incidencias.'}</p></section></div></div>
    </div>
  </div>;
}

function Documents({ documents }) {
  const icons={poliza:'Póliza',seguro:'Seguro',certificacion:'Certificación',otro:'Otro'};
  return <div className="reveal"><Heading eyebrow="Expediente digital" title="Documentos" text="Pólizas, seguros y certificaciones disponibles para descarga."/><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{documents.map(d=><a key={d.id} href={d.url} target="_blank" rel="noreferrer" className="card group p-6 transition hover:border-brand-500"><div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-red-600"><FileText/></span><Download size={18} className="text-slate-400 group-hover:text-brand-600"/></div><h2 className="mt-8 font-display font-bold text-navy">{d.titulo}</h2><p className="mt-2 text-xs font-bold uppercase tracking-wider text-brand-600">{icons[d.categoria]}</p><p className="mt-5 text-xs text-slate-400">PDF · Publicado {d.createdAt ? date(d.createdAt.slice(0,10)) : 'recientemente'}</p></a>)}</div></div>;
}

export default function Portal() {
  const data=usePortalData(); const unread=data.reports.filter(r=>!r.visto_por_cliente).length;
  return <AppShell items={nav} unread={unread}>{data.error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{data.error}</div>}<Routes><Route index element={<Summary {...data}/>}/><Route path="reportes" element={<Reports reports={data.reports}/>}/><Route path="reportes/:id" element={<ReportDetail reports={data.reports}/>}/><Route path="documentos" element={<Documents documents={data.documents}/>}/></Routes></AppShell>;
}
