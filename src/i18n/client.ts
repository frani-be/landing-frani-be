/**
 * Helpers de idioma para scripts de cliente.
 * El <html lang> viene del servidor; aquí solo se lee.
 */
import type { Lang } from './ui';

export function clientLang(): Lang {
  return document.documentElement.lang === 'en' ? 'en' : 'es';
}

/** Diccionario mínimo para strings renderizados por JS en cliente */
export const clientStrings = {
  es: {
    'cat.laboral': 'Profesional',
    'cat.docencia': 'Docencia',
    'cat.voluntariados': 'Comunidad',
    'cat.academica': 'Formación',
    present: 'Actualidad',
    months: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    'timeline.currently': '// actualmente',
    'timeline.empty': 'Sin resultados. Activa algún ámbito del recorrido.',
    'projects.view': 'Ver proyecto',
    'projects.challenge': 'El desafío',
    'projects.contribution': 'Mi aporte',
    'links.title': 'Enlaces del proyecto',
    'links.close': 'Cerrar',
    'links.repo': 'Repositorio',
    'links.case': 'Caso de estudio',
    'form.sending': 'Enviando…',
    'form.send': 'Enviar mensaje',
    'form.ok': '¡Mensaje enviado! Te respondo a la brevedad.',
    'form.err': 'Hubo un error al enviar. Escríbeme directamente a hola@frani.be',
  },
  en: {
    'cat.laboral': 'Professional',
    'cat.docencia': 'Teaching',
    'cat.voluntariados': 'Community',
    'cat.academica': 'Education',
    present: 'Present',
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    'timeline.currently': '// currently',
    'timeline.empty': 'No results. Enable an area of the journey.',
    'projects.view': 'View project',
    'projects.challenge': 'The challenge',
    'projects.contribution': 'My contribution',
    'links.title': 'Project links',
    'links.close': 'Close',
    'links.repo': 'Repository',
    'links.case': 'Case study',
    'form.sending': 'Sending…',
    'form.send': 'Send message',
    'form.ok': 'Message sent! I will get back to you soon.',
    'form.err': 'Something went wrong. Write me directly at hola@frani.be',
  },
} as const;

export function cs<K extends Exclude<keyof (typeof clientStrings)['es'], 'months'>>(key: K): string {
  return clientStrings[clientLang()][key];
}
