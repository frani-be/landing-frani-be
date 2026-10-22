export type Lang = 'es' | 'en';

export const ui = {
  es: {
    'nav.experience': 'Trayectoria',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',
    'nav.home': 'Ir al inicio',
    'nav.main': 'Navegación principal',
    'nav.menu.open': 'Abrir menú de navegación',
    'nav.menu.close': 'Cerrar menú de navegación',
    'nav.theme': 'Cambiar entre tema claro y oscuro',
    'nav.lang.switch': 'Switch to English',
    'a11y.skip': 'Saltar al contenido',
    'contact.title': 'Hablemos',
    'contact.lead': '¿Tienes un proyecto en mente, quieres contratar un servicio o simplemente saludar? Escríbeme por cualquiera de estos canales.',
    'contact.call': 'Agenda una videollamada',
    'contact.name': 'Nombre',
    'contact.name.ph': 'Tu nombre',
    'contact.email': 'Correo electrónico',
    'contact.email.ph': 'tu@email.com',
    'contact.subject': 'Asunto',
    'contact.subject.ph': '¿En qué te puedo ayudar?',
    'contact.message': 'Mensaje',
    'contact.message.ph': 'Cuéntame tu proyecto...',
    'contact.send': 'Enviar mensaje',
    'contact.mailSubject': 'Nuevo mensaje desde frani.be',
    'contact.sending': 'Enviando…',
    'contact.ok': '¡Mensaje enviado! Te respondo a la brevedad.',
    'contact.err': 'Hubo un error al enviar. Escríbeme directamente a hola@frani.be',
    'footer.signature': '// hecho con código, curiosidad y té',
    'breadcrumb.home': 'Ir al inicio',
    'aria.closeDetail': 'Cerrar detalle',
  },
  en: {
    'nav.experience': 'Experience',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.home': 'Go to home',
    'nav.main': 'Main navigation',
    'nav.menu.open': 'Open navigation menu',
    'nav.menu.close': 'Close navigation menu',
    'nav.theme': 'Toggle light and dark theme',
    'nav.lang.switch': 'Cambiar a español',
    'a11y.skip': 'Skip to content',
    'contact.title': "Let's talk",
    'contact.lead': 'Have a project in mind, want to hire a service, or just say hi? Reach me through any of these channels.',
    'contact.call': 'Book a video call',
    'contact.name': 'Name',
    'contact.name.ph': 'Your name',
    'contact.email': 'Email',
    'contact.email.ph': 'you@email.com',
    'contact.subject': 'Subject',
    'contact.subject.ph': 'How can I help you?',
    'contact.message': 'Message',
    'contact.message.ph': 'Tell me about your project...',
    'contact.send': 'Send message',
    'contact.mailSubject': 'New message from frani.be',
    'contact.sending': 'Sending…',
    'contact.ok': 'Message sent! I will get back to you soon.',
    'contact.err': 'Something went wrong. Write me directly at hola@frani.be',
    'footer.signature': '// made with code, curiosity and tea',
    'breadcrumb.home': 'Go to home',
    'aria.closeDetail': 'Close detail',
  },
} as const;

export type UiKey = keyof (typeof ui)['es'];

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}

/** Prefija rutas internas con /en cuando el idioma es inglés */
export function localePath(path: string, lang: Lang): string {
  return lang === 'en' ? `/en${path === '/' ? '/' : path}` : path;
}
