export const demoReports = [
  {
    id: 1, titulo: 'Mantenimiento preventivo de red', tipo_servicio: 'Redes y conectividad', fecha_servicio: '2026-07-18',
    estatus: 'completado', tecnico: 'Carlos Mendoza', visto_por_cliente: false,
    descripcion: 'Diagnóstico de nodos, limpieza de gabinete, reorganización de cableado y certificación de 24 puntos de red.',
    notas: 'Todos los enlaces operan dentro de parámetros. Se recomienda renovar dos patch cords en la próxima visita.',
    incidencias: 'Se detectó un puerto sin etiquetado; quedó identificado y actualizado en el plano.',
    photos: [
      { id: 1, tipo: 'antes', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80' },
      { id: 2, tipo: 'despues', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80' }
    ]
  },
  {
    id: 2, titulo: 'Instalación de cámaras en acceso norte', tipo_servicio: 'Videovigilancia', fecha_servicio: '2026-06-29',
    estatus: 'completado', tecnico: 'Mariana Torres', visto_por_cliente: true,
    descripcion: 'Instalación y configuración de cuatro cámaras IP con visión nocturna, ajuste de zonas y pruebas de grabación.',
    notas: 'Acceso remoto verificado con el responsable de seguridad.', incidencias: 'Sin incidencias durante la instalación.',
    photos: [
      { id: 3, tipo: 'antes', url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80' },
      { id: 4, tipo: 'despues', url: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=1200&q=80' }
    ]
  }
];

export const demoDocs = [
  { id: 1, titulo: 'Póliza de mantenimiento 2026', categoria: 'poliza', createdAt: '2026-01-08', url: '#' },
  { id: 2, titulo: 'Seguro de responsabilidad civil', categoria: 'seguro', createdAt: '2026-03-12', url: '#' },
  { id: 3, titulo: 'Certificación técnica del proveedor', categoria: 'certificacion', createdAt: '2026-05-20', url: '#' }
];
