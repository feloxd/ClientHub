import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Building2, Cable, Check, ChevronRight, Clock3, Headphones, Menu, Phone, ShieldCheck, Sparkles, Star, Video, Wrench, X, Zap } from 'lucide-react';
import Brand from '../components/Brand';
import api from '../lib/api';

const services = [
  { icon: Wrench, title: 'Mantenimiento integral', text: 'Programas preventivos y atención correctiva para mantener tus instalaciones operando sin interrupciones.', number: '01' },
  { icon: Cable, title: 'Redes y conectividad', text: 'Cableado estructurado, fibra óptica, certificación de nodos y organización de centros de datos.', number: '02' },
  { icon: Video, title: 'Videovigilancia', text: 'Cámaras IP, control de acceso y monitoreo inteligente, diseñados para cada espacio.', number: '03' },
  { icon: Zap, title: 'Instalaciones eléctricas', text: 'Instalación, adecuación y diagnóstico eléctrico con protocolos de seguridad documentados.', number: '04' }
];
const work = [
  ['Infraestructura de red', 'Corporativo · Querétaro', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85'],
  ['Sistema de videovigilancia', 'Centro logístico · CDMX', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=85'],
  ['Mantenimiento eléctrico', 'Planta industrial · Toluca', 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=85'],
  ['Centro de comunicaciones', 'Campus empresarial · Puebla', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=85']
];

export default function Landing() {
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState('');
  const [sending, setSending] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setSending(true); setSent('');
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try { const response = await api.post('/publico/contacto', data); setSent(response.data.message); event.currentTarget.reset(); }
    catch (error) { setSent(error.response?.data?.error || 'No pudimos enviar tu mensaje. Escríbenos por teléfono.'); }
    finally { setSending(false); }
  };
  return <div className="overflow-hidden">
    <div className="bg-navy text-[11px] text-blue-100">
      <div className="container-site flex h-9 items-center justify-between">
        <span>Atención empresarial en CDMX y zona centro</span>
        <span className="hidden items-center gap-4 sm:flex"><span className="flex items-center gap-1.5"><Phone size={12}/> 55 8000 2468</span><span>Lun–Vie · 8:00–18:00</span></span>
      </div>
    </div>
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur">
      <div className="container-site flex h-[76px] items-center justify-between">
        <Brand />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 lg:flex">
          <a href="#servicios" className="hover:text-brand-600">Servicios</a><a href="#nosotros" className="hover:text-brand-600">Nosotros</a>
          <a href="#trabajos" className="hover:text-brand-600">Proyectos</a><a href="#contacto" className="hover:text-brand-600">Contacto</a>
          <Link to="/login" className="btn-primary py-2.5">Acceso clientes <ArrowRight size={16}/></Link>
        </nav>
        <button className="rounded-lg p-2 lg:hidden" onClick={() => setMenu(!menu)} aria-label="Abrir menú">{menu ? <X/> : <Menu/>}</button>
      </div>
      {menu && <nav className="container-site flex flex-col gap-4 border-t border-line py-5 text-sm font-semibold lg:hidden">
        {['servicios','nosotros','trabajos','contacto'].map((id) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="capitalize">{id}</a>)}
        <Link to="/login" className="btn-primary">Acceso clientes</Link>
      </nav>}
    </header>

    <main>
      <section className="relative bg-navy text-white">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-500/20 blur-3xl" />
        <div className="container-site relative grid min-h-[670px] items-center gap-12 py-16 lg:grid-cols-[1.08fr_.92fr]">
          <div className="reveal max-w-3xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-cyan"><Sparkles size={14}/> Expertos que sí responden</span>
            <h1 className="font-display text-5xl font-extrabold leading-[1.03] tracking-[-.045em] sm:text-6xl lg:text-[72px]">Tu operación,<br/><span className="text-cyan">siempre en marcha.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-blue-100">Mantenimiento e instalaciones técnicas para empresas que necesitan resultados claros, respuesta oportuna y evidencia de cada trabajo.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#contacto" className="btn-primary bg-cyan text-navy hover:bg-white">Solicitar diagnóstico <ArrowRight size={17}/></a>
              <a href="#servicios" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-bold hover:bg-white/10">Conocer servicios <ChevronRight size={17}/></a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold text-blue-100">
              {['Personal certificado','Reportes con evidencia','Atención programada'].map((x) => <span key={x} className="flex items-center gap-2"><Check size={15} className="text-cyan"/>{x}</span>)}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative ml-auto h-[490px] max-w-[450px] overflow-hidden rounded-[28px] border border-white/15 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1100&q=88" alt="Técnico profesional dando mantenimiento a instalaciones" className="h-full w-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"/>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl border border-white/20 bg-navy/80 p-4 backdrop-blur">
                <span><b className="block font-display text-lg">+480 servicios</b><small className="text-blue-200">documentados cada año</small></span>
                <BadgeCheck className="text-cyan" size={34}/>
              </div>
            </div>
            <div className="absolute -left-7 top-16 rounded-xl bg-white p-4 text-navy shadow-soft">
              <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><Clock3 size={19}/></span>
              <b className="font-display text-2xl">98%</b><small className="block text-slate-500">a tiempo</small>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white py-8">
        <div className="container-site flex flex-wrap items-center justify-center gap-x-14 gap-y-5 text-sm font-bold uppercase tracking-[.14em] text-slate-400">
          <span className="text-xs font-medium normal-case tracking-normal text-slate-400">Confían en nuestro trabajo</span>
          {['Orbita','ALTEA','Nortek','Vértice','Metrópoli'].map((x) => <span key={x} className="font-display text-lg">{x}</span>)}
        </div>
      </section>

      <section id="servicios" className="bg-cloud py-24">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div><span className="eyebrow">Lo que hacemos</span><h2 className="section-title">Soluciones que sostienen<br/>tu operación diaria.</h2></div>
            <p className="max-w-lg text-base leading-7 text-slate-600 lg:justify-self-end">Integramos personal capacitado, procesos documentados y atención cercana para resolver desde una intervención puntual hasta un programa completo.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {services.map(({ icon: Icon, title, text, number }) => <article key={title} className="group card relative overflow-hidden p-7 transition hover:-translate-y-1 hover:border-brand-500 hover:shadow-soft sm:p-9">
              <span className="absolute right-6 top-5 font-display text-5xl font-black text-slate-100 transition group-hover:text-brand-50">{number}</span>
              <div className="mb-7 grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon size={24}/></div>
              <h3 className="font-display text-xl font-bold text-navy">{title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-slate-600">{text}</p>
              <a href="#contacto" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-600">Cotizar servicio <ArrowRight size={15}/></a>
            </article>)}
          </div>
        </div>
      </section>

      <section id="nosotros" className="py-24">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=85" alt="Equipo técnico de Nexo revisando un proyecto" className="h-[520px] w-full rounded-[28px] object-cover"/>
            <div className="absolute -bottom-6 -right-3 max-w-[260px] rounded-2xl bg-navy p-6 text-white shadow-soft sm:right-8">
              <ShieldCheck className="mb-4 text-cyan"/><b className="font-display text-lg">Cada trabajo deja evidencia</b><p className="mt-2 text-xs leading-5 text-blue-100">Reporte digital, fotografías y observaciones accesibles desde tu portal.</p>
            </div>
          </div>
          <div>
            <span className="eyebrow">Por qué Nexo</span><h2 className="section-title">Servicio técnico con<br/>claridad de principio a fin.</h2>
            <p className="mt-6 text-base leading-7 text-slate-600">No basta con resolver: necesitas saber qué se hizo, cuándo y con qué resultado. Nuestro modelo combina ejecución técnica con seguimiento transparente.</p>
            <div className="mt-9 space-y-7">
              {[
                [Headphones,'Respuesta cercana','Un responsable acompaña tu servicio y mantiene la comunicación abierta.'],
                [BadgeCheck,'Personal validado','Técnicos capacitados, protocolos de seguridad y supervisión de calidad.'],
                [Building2,'Visión empresarial','Planeación, trazabilidad y documentación pensadas para tu operación.']
              ].map(([Icon,title,text]) => <div key={title} className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600"><Icon size={21}/></span><div><h3 className="font-display font-bold text-navy">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="trabajos" className="bg-navy py-24 text-white">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div><span className="eyebrow text-cyan">Trabajo comprobable</span><h2 className="section-title text-white">Proyectos recientes.</h2></div>
            <p className="max-w-md text-sm leading-6 text-blue-100">Resultados visibles en espacios corporativos, industriales y comerciales.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {work.map(([title,place,img], i) => <figure key={title} className={`group relative overflow-hidden rounded-2xl ${i === 0 ? 'md:row-span-2 md:min-h-[610px]' : 'min-h-[292px]'}`}>
              <img src={img} alt={title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/5 to-transparent"/>
              <figcaption className="absolute bottom-0 p-7"><span className="text-xs font-bold uppercase tracking-widest text-cyan">{place}</span><h3 className="mt-2 font-display text-xl font-bold">{title}</h3></figcaption>
            </figure>)}
          </div>
        </div>
      </section>

      <section className="bg-cloud py-24">
        <div className="container-site text-center">
          <span className="eyebrow">Clientes que nos recomiendan</span><h2 className="section-title">La confianza se construye<br/>en cada visita.</h2>
          <div className="mt-12 grid gap-5 text-left lg:grid-cols-3">
            {[
              ['“Ahora tenemos trazabilidad real de cada mantenimiento. El portal nos ahorra horas de seguimiento.”','Laura Medina','Gerencia de Operaciones · Altea'],
              ['“El equipo entiende la urgencia sin perder orden. Resuelven, documentan y dan seguimiento.”','Fernando Ríos','Facilities Manager · Nortek'],
              ['“Encontramos un aliado técnico, no solo un proveedor. La comunicación ha sido impecable.”','Mónica Aguilar','Administración · Grupo Vértice']
            ].map(([quote,name,role]) => <blockquote key={name} className="card p-7"><div className="mb-5 flex gap-1 text-amber-400">{[1,2,3,4,5].map(n=><Star key={n} size={15} fill="currentColor"/>)}</div><p className="text-[15px] leading-7 text-slate-700">{quote}</p><footer className="mt-7 border-t border-line pt-5"><b className="block font-display text-sm text-navy">{name}</b><span className="text-xs text-slate-500">{role}</span></footer></blockquote>)}
          </div>
        </div>
      </section>

      <section id="contacto" className="relative py-24">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-brand-50 lg:block"/>
        <div className="container-site relative grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div><span className="eyebrow">Hablemos de tu proyecto</span><h2 className="section-title">Cuéntanos qué<br/>necesitas resolver.</h2><p className="mt-6 max-w-md text-base leading-7 text-slate-600">Un especialista revisará tu solicitud y te contactará para entender alcance, tiempos y prioridades.</p>
            <div className="mt-9 space-y-4 text-sm"><p className="flex items-center gap-3"><Phone size={18} className="text-brand-600"/> 55 8000 2468</p><p className="flex items-center gap-3"><Headphones size={18} className="text-brand-600"/> contacto@nexo.mx</p></div>
          </div>
          <form onSubmit={submit} className="card grid gap-5 p-7 sm:grid-cols-2 sm:p-9">
            <label><span className="label">Nombre completo</span><input className="input" name="nombre" required placeholder="Tu nombre"/></label>
            <label><span className="label">Correo empresarial</span><input className="input" type="email" name="email" required placeholder="nombre@empresa.com"/></label>
            <label><span className="label">Teléfono</span><input className="input" name="telefono" placeholder="55 0000 0000"/></label>
            <label><span className="label">Servicio de interés</span><select className="input" name="servicio" required><option>Mantenimiento integral</option><option>Redes y conectividad</option><option>Videovigilancia</option><option>Instalación eléctrica</option><option>Otro</option></select></label>
            <label className="sm:col-span-2"><span className="label">¿Cómo podemos ayudarte?</span><textarea className="input min-h-32 resize-y" name="mensaje" required minLength={10} placeholder="Describe brevemente tu necesidad..."/></label>
            <div className="sm:col-span-2 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"><button disabled={sending} className="btn-primary">{sending ? 'Enviando…' : 'Enviar solicitud'} <ArrowRight size={16}/></button>{sent && <p className="text-sm text-brand-700">{sent}</p>}</div>
          </form>
        </div>
      </section>
    </main>

    <footer className="bg-[#071d33] py-14 text-blue-100">
      <div className="container-site grid gap-10 border-b border-white/10 pb-12 md:grid-cols-4">
        <div className="md:col-span-2"><Brand light/><p className="mt-5 max-w-sm text-sm leading-6 text-blue-200">Mantenimiento e instalaciones con atención profesional, evidencia clara y seguimiento confiable.</p></div>
        <div><h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-cyan">Servicios</h3><div className="space-y-2 text-sm"><p>Mantenimiento</p><p>Redes y conectividad</p><p>Videovigilancia</p><p>Instalaciones eléctricas</p></div></div>
        <div><h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-cyan">Contacto</h3><div className="space-y-2 text-sm"><p>55 8000 2468</p><p>contacto@nexo.mx</p><p>CDMX y zona centro</p><Link to="/login" className="mt-3 inline-block font-bold text-white">Portal de clientes →</Link></div></div>
      </div>
      <div className="container-site flex flex-col justify-between gap-2 pt-6 text-xs text-blue-300 sm:flex-row"><p>© 2026 Nexo Servicio Integral. Todos los derechos reservados.</p><p>Aviso de privacidad · Términos de uso</p></div>
    </footer>
  </div>;
}
