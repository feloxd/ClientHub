export const statusLabel = { borrador: 'Borrador', programado: 'Programado', en_proceso: 'En proceso', completado: 'Completado', cancelado: 'Cancelado' };
export default function Status({ value }) {
  const colors = {
    completado: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    en_proceso: 'bg-amber-50 text-amber-700 ring-amber-200',
    programado: 'bg-blue-50 text-blue-700 ring-blue-200',
    borrador: 'bg-slate-100 text-slate-600 ring-slate-200',
    cancelado: 'bg-red-50 text-red-700 ring-red-200'
  };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${colors[value] || colors.borrador}`}>{statusLabel[value] || value}</span>;
}
