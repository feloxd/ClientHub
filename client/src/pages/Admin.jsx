import { useCallback, useEffect, useMemo, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Activity, Archive, CheckCircle2, ClipboardList, Edit3, FileText, Gauge, ImageIcon,
  Mail, Plus, Search, Send, ShieldCheck, Trash2, UploadCloud, Users, X
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import AppShell from '../components/AppShell';
import Status from '../components/Status';
import api from '../lib/api';

const nav = [
  { to: '/admin', icon: Gauge, label: 'Overview' },
  { to: '/admin/clientes', icon: Users, label: 'Clients' },
  { to: '/admin/reportes', icon: ClipboardList, label: 'Service requests' },
  { to: '/admin/documentos', icon: Archive, label: 'Documents' },
  { to: '/admin/auditoria', icon: ShieldCheck, label: 'Activity log' }
];
const serviceTypes = ['HVAC repair', 'Fan coil service', 'Preventive maintenance', 'Installation or replacement', 'Other'];
const date = (value) => value ? new Date(`${value}T12:00:00`).toLocaleDateString('en-CA', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

function useAdminData() {
  const [clients, setClients] = useState([]);
  const [reports, setReports] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [clientResult, reportResult, documentResult] = await Promise.all([
        api.get('/admin/clientes'), api.get('/admin/reportes'), api.get('/admin/documentos')
      ]);
      setClients(clientResult.data);
      setReports(reportResult.data);
      setDocuments(documentResult.data);
      setError('');
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'No fue posible cargar la información. Revisa la conexión con el servidor.');
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);
  return { clients, reports, documents, loading, error, reload: load };
}

function Head({ kicker, title, action }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-widest text-brand-600">{kicker}</p><h1 className="mt-2 font-display text-3xl font-extrabold text-navy">{title}</h1></div>{action}</div>;
}
function Modal({ title, onClose, children, wide = false }) {
  return <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-navy/50 p-4"><div className={`my-8 w-full ${wide ? 'max-w-4xl' : 'max-w-lg'} rounded-2xl bg-white shadow-2xl`}><div className="flex items-center justify-between border-b border-line px-6 py-5"><h2 className="font-display text-lg font-bold text-navy">{title}</h2><button onClick={onClose} className="text-slate-400" aria-label="Cerrar"><X/></button></div>{children}</div></div>;
}
function ErrorState({ message, retry }) {
  return message ? <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center"><span>{message}</span><button onClick={retry} className="font-bold">Reintentar</button></div> : null;
}

function Dashboard({ data }) {
  const stats = [
    ['Active clients', data.clients.filter((client) => client.activo).length, Users, 'bg-blue-50 text-blue-600'],
    ['Service requests', data.reports.length, ClipboardList, 'bg-violet-50 text-violet-600'],
    ['Awaiting approval', data.reports.filter((report) => !report.publicado).length, Send, 'bg-amber-50 text-amber-600'],
    ['Completed', data.reports.filter((report) => report.estatus === 'completado').length, CheckCircle2, 'bg-emerald-50 text-emerald-600']
  ];
  return <div><Head kicker="At a glance" title="Operations dashboard"/><ErrorState message={data.error} retry={data.reload}/>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value, Icon, color]) => <div className="card p-5" key={label}><div className={`grid h-10 w-10 place-items-center rounded-lg ${color}`}><Icon size={19}/></div><p className="mt-5 font-display text-3xl font-extrabold text-navy">{data.loading ? '—' : value}</p><p className="mt-1 text-xs font-semibold text-slate-500">{label}</p></div>)}</div>
    <div className="mt-7 grid gap-6 xl:grid-cols-[1.5fr_.5fr]"><section className="card overflow-hidden"><div className="flex items-center justify-between border-b border-line p-5"><h2 className="font-display font-bold text-navy">Recent activity</h2><Link to="/admin/reportes" className="text-xs font-bold text-brand-600">View all →</Link></div>{data.reports.slice(0, 4).map((report) => <div className="flex items-center gap-4 border-b border-line px-5 py-4 last:border-0" key={report.id}><span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600"><Activity size={18}/></span><div className="min-w-0 flex-1"><b className="block truncate text-sm text-navy">{report.titulo}</b><small className="text-slate-500">{report.client?.nombre} · {date(report.fecha_servicio)}</small></div><Status value={report.estatus}/></div>)}</section>
      <aside className="rounded-2xl bg-navy p-6 text-white"><UploadCloud className="text-cyan"/><h2 className="mt-8 font-display text-xl font-bold">Work queue</h2><p className="mt-3 text-sm leading-6 text-blue-100">{data.reports.filter((report) => !report.publicado).length} service requests are being prepared before the client is notified.</p><Link to="/admin/reportes" className="mt-6 inline-block text-sm font-bold text-cyan">Review requests →</Link></aside></div>
  </div>;
}

function ClientForm({ client, close, reload }) {
  const [state, setState] = useState({ loading: false, message: '' });
  const submit = async (event) => {
    event.preventDefault();
    setState({ loading: true, message: '' });
    try {
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      if (client) await api.patch(`/admin/clientes/${client.id}`, payload);
      else await api.post('/admin/clientes', payload);
      await reload();
      close();
    } catch (error) {
      setState({ loading: false, message: error.response?.data?.error || 'No fue posible guardar el cliente.' });
    }
  };
  return <Modal title={client ? 'Editar cliente' : 'Nuevo cliente'} onClose={close}><form onSubmit={submit} className="space-y-5 p-6">
    <label><span className="label">Nombre o razón social</span><input className="input" name="nombre" defaultValue={client?.nombre} required/></label>
    <label><span className="label">Correo autorizado</span><input className="input" name="email" type="email" defaultValue={client?.email} required/></label>
    {!client && <div className="rounded-lg bg-brand-50 p-4 text-xs leading-5 text-brand-900"><Mail size={16} className="mb-2"/>Se enviará una invitación válida por 72 horas para establecer contraseña.</div>}
    {state.message && <p className="text-sm text-red-600">{state.message}</p>}
    <div className="flex justify-end gap-3"><button type="button" onClick={close} className="btn-secondary">Cancelar</button><button disabled={state.loading} className="btn-primary">{state.loading ? 'Guardando…' : client ? 'Guardar cambios' : 'Crear y enviar invitación'}</button></div>
  </form></Modal>;
}

function Clients({ data }) {
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rows = data.clients.filter((client) => `${client.nombre}${client.email}`.toLowerCase().includes(query.toLowerCase()));
  const toggle = async (client) => { await api.patch(`/admin/clientes/${client.id}`, { activo: !client.activo }); await data.reload(); };
  const resend = async (id) => { await api.post(`/admin/clientes/${id}/reenviar-invitacion`); window.alert('Invitación enviada.'); };
  const remove = async (client) => {
    if (!window.confirm(`¿Eliminar a ${client.nombre}? También se eliminarán sus reportes, documentos y notificaciones.`)) return;
    await api.delete(`/admin/clientes/${client.id}`);
    await data.reload();
  };
  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (client) => { setEditing(client); setFormOpen(true); };
  return <div><Head kicker="Directorio" title="Clientes" action={<button onClick={openCreate} className="btn-primary"><Plus size={17}/> Nuevo cliente</button>}/><ErrorState message={data.error} retry={data.reload}/>
    <div className="card overflow-hidden"><div className="border-b border-line p-4"><label className="relative block max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} className="input pl-10" placeholder="Buscar cliente o correo..."/></label></div><div className="overflow-x-auto"><table className="admin-table"><thead><tr><th>Cliente</th><th>Reportes</th><th>Acceso</th><th>Acciones</th></tr></thead><tbody>{rows.map((client) => <tr key={client.id}><td><b className="block text-navy">{client.nombre}</b><small className="text-slate-500">{client.email}</small></td><td>{client.reportCount || 0}</td><td><button onClick={() => toggle(client)} className={`rounded-full px-2.5 py-1 text-xs font-bold ${client.activo ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{client.activo ? 'Activo' : 'Inactivo'}</button></td><td><div className="flex items-center gap-3"><button onClick={() => openEdit(client)} title="Editar" className="text-brand-600"><Edit3 size={16}/></button><button onClick={() => resend(client.id)} title="Reenviar invitación" className="text-slate-500"><Mail size={16}/></button><button onClick={() => remove(client)} title="Eliminar" className="text-red-600"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div></div>
    {formOpen && <ClientForm client={editing} close={() => setFormOpen(false)} reload={data.reload}/>}
  </div>;
}

function PhotoDrop({ files, setFiles, type }) {
  const onDrop = useCallback(async (accepted) => {
    const compressed = await Promise.all(accepted.map((file) => imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true })));
    setFiles((current) => ({ ...current, [type]: [...current[type], ...compressed] }));
  }, [setFiles, type]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] } });
  return <div><p className="label">Nuevas fotos: {type}</p><div {...getRootProps()} className={`cursor-pointer rounded-xl border-2 border-dashed p-5 text-center ${isDragActive ? 'border-brand-500 bg-brand-50' : 'border-line'}`}><input {...getInputProps()}/><UploadCloud className="mx-auto text-brand-600"/><p className="mt-2 text-xs text-slate-500">Arrastra imágenes o haz clic · Compresión automática</p></div>{files[type].length > 0 && <p className="mt-2 text-xs font-semibold text-brand-600">{files[type].length} archivo(s) listo(s)</p>}</div>;
}

function ReportForm({ report, clients, close, reload }) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({ antes: [], despues: [] });
  const [photos, setPhotos] = useState(report?.photos || []);
  const [message, setMessage] = useState('');
  const deletePhoto = async (photo) => {
    if (!window.confirm('¿Eliminar esta fotografía?')) return;
    await api.delete(`/admin/reportes/${report.id}/fotos/${photo.id}`);
    setPhotos((current) => current.filter((item) => item.id !== photo.id));
  };
  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      payload.user_id = Number(payload.user_id);
      const { data: saved } = report
        ? await api.patch(`/admin/reportes/${report.id}`, payload)
        : await api.post('/admin/reportes', payload);
      for (const type of ['antes', 'despues']) {
        if (!files[type].length) continue;
        const formData = new FormData();
        formData.append('tipo', type);
        files[type].forEach((file) => formData.append('fotos', file));
        await api.post(`/admin/reportes/${saved.id}/fotos`, formData);
      }
      await reload();
      close();
    } catch (error) {
      setMessage(error.response?.data?.error || 'No fue posible guardar el reporte.');
      setLoading(false);
    }
  };
  return <Modal title={report ? 'Editar reporte de trabajo' : 'Nuevo reporte de trabajo'} onClose={close} wide><form onSubmit={submit} className="grid gap-5 p-6 sm:grid-cols-2">
    <label><span className="label">Cliente</span><select name="user_id" className="input" defaultValue={report?.user_id || ''} required><option value="">Selecciona…</option>{clients.filter((client) => client.activo || client.id === report?.user_id).map((client) => <option value={client.id} key={client.id}>{client.nombre}</option>)}</select></label>
    <label><span className="label">Fecha de servicio</span><input className="input" name="fecha_servicio" type="date" defaultValue={report?.fecha_servicio} required/></label>
    <label className="sm:col-span-2"><span className="label">Título</span><input className="input" name="titulo" defaultValue={report?.titulo} required/></label>
    <label><span className="label">Tipo de servicio</span><select className="input" name="tipo_servicio" defaultValue={report?.tipo_servicio || serviceTypes[0]}>{serviceTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
    <label><span className="label">Técnico responsable</span><input className="input" name="tecnico" defaultValue={report?.tecnico}/></label>
    <label><span className="label">Estatus</span><select className="input" name="estatus" defaultValue={report?.estatus || 'borrador'}><option value="borrador">Borrador</option><option value="programado">Programado</option><option value="en_proceso">En proceso</option><option value="completado">Completado</option><option value="cancelado">Cancelado</option></select></label><span/>
    <label className="sm:col-span-2"><span className="label">Descripción</span><textarea className="input min-h-24" name="descripcion" defaultValue={report?.descripcion} required/></label>
    <label><span className="label">Notas</span><textarea className="input min-h-20" name="notas" defaultValue={report?.notas}/></label>
    <label><span className="label">Incidencias</span><textarea className="input min-h-20" name="incidencias" defaultValue={report?.incidencias}/></label>
    {report && photos.length > 0 && <div className="sm:col-span-2"><p className="label">Evidencia existente</p><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{photos.map((photo) => <div className="group relative overflow-hidden rounded-lg" key={photo.id}><img src={photo.url} alt={`Foto ${photo.tipo}`} className="h-28 w-full object-cover"/><span className="absolute bottom-2 left-2 rounded bg-navy/80 px-2 py-1 text-[9px] font-bold uppercase text-white">{photo.tipo}</span><button type="button" onClick={() => deletePhoto(photo)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white text-red-600 opacity-100 shadow sm:opacity-0 sm:group-hover:opacity-100"><Trash2 size={14}/></button></div>)}</div></div>}
    <PhotoDrop files={files} setFiles={setFiles} type="antes"/><PhotoDrop files={files} setFiles={setFiles} type="despues"/>
    {message && <p className="sm:col-span-2 text-sm text-red-600">{message}</p>}
    <div className="flex justify-end gap-3 sm:col-span-2"><button type="button" onClick={close} className="btn-secondary">Cancelar</button><button disabled={loading} className="btn-primary">{loading ? 'Guardando…' : report ? 'Guardar cambios' : 'Guardar borrador'}</button></div>
  </form></Modal>;
}

function ReportsAdmin({ data }) {
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [filters, setFilters] = useState({ query: '', status: '', client: '', type: '', from: '', to: '' });
  const rows = useMemo(() => data.reports.filter((report) => {
    const text = `${report.titulo}${report.client?.nombre || ''}`.toLowerCase();
    return (!filters.query || text.includes(filters.query.toLowerCase()))
      && (!filters.status || report.estatus === filters.status)
      && (!filters.client || String(report.user_id) === filters.client)
      && (!filters.type || report.tipo_servicio === filters.type)
      && (!filters.from || report.fecha_servicio >= filters.from)
      && (!filters.to || report.fecha_servicio <= filters.to);
  }), [data.reports, filters]);
  const setFilter = (key) => (event) => setFilters((current) => ({ ...current, [key]: event.target.value }));
  const publish = async (id) => {
    if (!window.confirm('¿Publicar este reporte y notificar al cliente?')) return;
    await api.post(`/admin/reportes/${id}/publicar`);
    await data.reload();
  };
  const remove = async (report) => {
    if (!window.confirm(`¿Eliminar el reporte “${report.titulo}” y todas sus fotografías?`)) return;
    await api.delete(`/admin/reportes/${report.id}`);
    await data.reload();
  };
  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (report) => { setEditing(report); setFormOpen(true); };
  return <div><Head kicker="Operación" title="Reportes de trabajo" action={<button className="btn-primary" onClick={openCreate}><Plus size={17}/> Nuevo reporte</button>}/><ErrorState message={data.error} retry={data.reload}/>
    <div className="card overflow-hidden"><div className="grid gap-3 border-b border-line p-4 md:grid-cols-2 xl:grid-cols-6"><label className="relative xl:col-span-2"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17}/><input className="input pl-10" value={filters.query} onChange={setFilter('query')} placeholder="Buscar reporte o cliente..."/></label><select value={filters.client} onChange={setFilter('client')} className="input"><option value="">Todos los clientes</option>{data.clients.map((client) => <option value={client.id} key={client.id}>{client.nombre}</option>)}</select><select value={filters.type} onChange={setFilter('type')} className="input"><option value="">Todos los servicios</option>{serviceTypes.map((type) => <option key={type}>{type}</option>)}</select><select value={filters.status} onChange={setFilter('status')} className="input"><option value="">Todos los estatus</option><option value="borrador">Borrador</option><option value="programado">Programado</option><option value="en_proceso">En proceso</option><option value="completado">Completado</option><option value="cancelado">Cancelado</option></select><div className="grid grid-cols-2 gap-2"><input type="date" value={filters.from} onChange={setFilter('from')} className="input px-2" title="Desde"/><input type="date" value={filters.to} onChange={setFilter('to')} className="input px-2" title="Hasta"/></div></div>
      <div className="overflow-x-auto"><table className="admin-table"><thead><tr><th>Reporte</th><th>Cliente</th><th>Fecha</th><th>Estatus</th><th>Publicación</th><th>Acciones</th></tr></thead><tbody>{rows.map((report) => <tr key={report.id}><td><b className="block text-navy">{report.titulo}</b><small className="text-slate-500">{report.tipo_servicio}</small></td><td>{report.client?.nombre || '—'}</td><td>{date(report.fecha_servicio)}</td><td><Status value={report.estatus}/></td><td>{report.publicado ? <span className="text-xs font-bold text-emerald-600">Publicado</span> : <button onClick={() => publish(report.id)} className="inline-flex items-center gap-1 text-xs font-bold text-brand-600"><Send size={14}/> Publicar</button>}</td><td><div className="flex gap-3"><button onClick={() => openEdit(report)} className="text-brand-600" title="Editar"><Edit3 size={16}/></button><button onClick={() => remove(report)} className="text-red-600" title="Eliminar"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>
    </div>{formOpen && <ReportForm report={editing} clients={data.clients} close={() => setFormOpen(false)} reload={data.reload}/>}
  </div>;
}

function DocumentForm({ document, clients, close, reload }) {
  const [state, setState] = useState({ loading: false, message: '' });
  const submit = async (event) => {
    event.preventDefault();
    setState({ loading: true, message: '' });
    try {
      if (document) {
        const payload = Object.fromEntries(new FormData(event.currentTarget));
        payload.user_id = Number(payload.user_id);
        await api.patch(`/admin/documentos/${document.id}`, payload);
      } else {
        await api.post('/admin/documentos', new FormData(event.currentTarget));
      }
      await reload();
      close();
    } catch (error) {
      setState({ loading: false, message: error.response?.data?.error || 'No fue posible guardar el documento.' });
    }
  };
  return <Modal title={document ? 'Editar documento' : 'Publicar documento'} onClose={close}><form onSubmit={submit} className="space-y-5 p-6">
    <label><span className="label">Cliente</span><select className="input" name="user_id" defaultValue={document?.user_id || ''} required><option value="">Selecciona…</option>{clients.map((client) => <option value={client.id} key={client.id}>{client.nombre}</option>)}</select></label>
    <label><span className="label">Título</span><input className="input" name="titulo" defaultValue={document?.titulo} required/></label>
    <label><span className="label">Categoría</span><select className="input" name="categoria" defaultValue={document?.categoria || 'poliza'}><option value="poliza">Póliza</option><option value="seguro">Seguro</option><option value="certificacion">Certificación</option><option value="otro">Otro</option></select></label>
    {!document && <label><span className="label">Archivo PDF</span><input className="input" type="file" name="archivo" accept="application/pdf" required/></label>}
    <p className="text-xs leading-5 text-slate-500">{document ? 'La edición cambia los datos descriptivos; el PDF original se conserva.' : 'Al publicar, el cliente recibirá una notificación por correo.'}</p>
    {state.message && <p className="text-sm text-red-600">{state.message}</p>}
    <div className="flex justify-end gap-3"><button type="button" onClick={close} className="btn-secondary">Cancelar</button><button disabled={state.loading} className="btn-primary">{state.loading ? 'Guardando…' : document ? 'Guardar cambios' : 'Publicar documento'}</button></div>
  </form></Modal>;
}

function DocumentsAdmin({ data }) {
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [client, setClient] = useState('');
  const rows = data.documents.filter((document) => (!query || document.titulo.toLowerCase().includes(query.toLowerCase())) && (!client || String(document.user_id) === client));
  const remove = async (document) => {
    if (!window.confirm(`¿Eliminar “${document.titulo}” y su archivo de almacenamiento?`)) return;
    await api.delete(`/admin/documentos/${document.id}`);
    await data.reload();
  };
  return <div><Head kicker="Expedientes" title="Documentos por cliente" action={<button onClick={() => { setEditing(null); setFormOpen(true); }} className="btn-primary"><Plus size={17}/> Subir PDF</button>}/><ErrorState message={data.error} retry={data.reload}/>
    <div className="card overflow-hidden"><div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row"><label className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17}/><input className="input pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar documento..."/></label><select className="input sm:w-64" value={client} onChange={(event) => setClient(event.target.value)}><option value="">Todos los clientes</option>{data.clients.map((item) => <option value={item.id} key={item.id}>{item.nombre}</option>)}</select></div>
      {rows.length ? <div className="overflow-x-auto"><table className="admin-table"><thead><tr><th>Documento</th><th>Cliente</th><th>Categoría</th><th>Fecha</th><th>Acciones</th></tr></thead><tbody>{rows.map((document) => <tr key={document.id}><td><a href={document.url} target="_blank" rel="noreferrer" className="font-bold text-brand-600">{document.titulo}</a></td><td>{document.client?.nombre}</td><td className="capitalize">{document.categoria}</td><td>{document.createdAt ? date(document.createdAt.slice(0, 10)) : '—'}</td><td><div className="flex gap-3"><button onClick={() => { setEditing(document); setFormOpen(true); }} className="text-brand-600"><Edit3 size={16}/></button><button onClick={() => remove(document)} className="text-red-600"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div> : <div className="p-14 text-center"><FileText className="mx-auto text-slate-300" size={40}/><h2 className="mt-4 font-display font-bold text-navy">No hay documentos con esos filtros</h2></div>}
    </div>{formOpen && <DocumentForm document={editing} clients={data.clients} close={() => setFormOpen(false)} reload={data.reload}/>}
  </div>;
}

function AuditPage() {
  const [logs, setLogs] = useState([]);
  const [entity, setEntity] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    api.get('/admin/auditoria', { params: entity ? { entidad: entity } : {} })
      .then(({ data }) => { setLogs(data); setError(''); })
      .catch((requestError) => setError(requestError.response?.data?.error || 'No fue posible cargar la bitácora.'));
  }, [entity]);
  return <div><Head kicker="Seguridad y trazabilidad" title="Bitácora administrativa" action={<select className="input w-52" value={entity} onChange={(event) => setEntity(event.target.value)}><option value="">Todas las entidades</option><option value="cliente">Clientes</option><option value="reporte">Reportes</option><option value="documento">Documentos</option></select>}/><ErrorState message={error}/>
    <div className="card overflow-hidden"><div className="overflow-x-auto"><table className="admin-table"><thead><tr><th>Fecha</th><th>Administrador</th><th>Acción</th><th>Entidad</th><th>Referencia</th><th>IP</th></tr></thead><tbody>{logs.map((log) => <tr key={log.id}><td className="whitespace-nowrap">{new Date(log.createdAt).toLocaleString('es-MX')}</td><td><b className="block text-navy">{log.admin?.nombre || 'Cuenta eliminada'}</b><small className="text-slate-500">{log.admin?.email}</small></td><td className="font-semibold capitalize">{log.accion.replaceAll('_', ' ')}</td><td className="capitalize">{log.entidad}</td><td>#{log.entidad_id || '—'}</td><td className="text-xs text-slate-500">{log.ip || '—'}</td></tr>)}</tbody></table>{!logs.length && !error && <p className="p-12 text-center text-sm text-slate-500">Aún no hay acciones registradas.</p>}</div></div>
  </div>;
}

export default function Admin() {
  const data = useAdminData();
  return <AppShell items={nav} admin><Routes><Route index element={<Dashboard data={data}/>}/><Route path="clientes" element={<Clients data={data}/>}/><Route path="reportes" element={<ReportsAdmin data={data}/>}/><Route path="documentos" element={<DocumentsAdmin data={data}/>}/><Route path="auditoria" element={<AuditPage/>}/></Routes></AppShell>;
}
