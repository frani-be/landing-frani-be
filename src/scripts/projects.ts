import { svgIcon } from './icons';
import { clientStrings, clientLang } from '../i18n/client';
import type { Lang } from '../i18n/ui';

export interface ProjectLinks {
  demo?: string;
  repo?: string;
  caseStudy?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  type?: string;
  service?: string;
  serviceLabel?: string;
  description: string;
  fullDescription?: string;
  image: string;
  tags: string[];
  links: ProjectLinks;
  featured?: boolean;
  client?: string;
  date?: string;
  role?: string;
  stack?: string;
}

export function extractYear(d: string) {
  const m = d?.match(/\d{4}/g);
  return m ? Math.max(...m.map(Number)) : 0;
}

export function buildProjectCardHTML(p: Project, lang: Lang = clientLang()): string {
  const S = clientStrings[lang];
  const prefix = lang === 'en' ? '/en' : '';
  const tagsHTML = p.tags.slice(0, 4)
    .map(t => `<span class="tag-mono">${t}</span>`)
    .join('');
  const hasLinks = p.links.demo || p.links.repo || p.links.caseStudy;
  return `
    <div class="bg-surface rounded-[var(--radius-card)] overflow-hidden border border-border-soft hover:border-border-hover hover:shadow-[0_12px_32px_-8px_rgba(181,90,255,0.18)] transition-all duration-300 flex flex-col group project-card" data-id="${p.id}">
      <div class="aspect-video w-full overflow-hidden project-thumb">
        <img src="${p.image.replace('assets/', '/')}" alt="${p.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <div class="flex flex-wrap gap-2 mb-3">
          ${p.type ? `<span class="tag-mono">${p.type}</span>` : ''}
          ${p.service && p.serviceLabel ? `<a href="${prefix}/servicios/${p.service}" class="tag-mono tag-mono--accent">${p.serviceLabel}</a>` : ''}
        </div>
        <h3 class="text-xl text-custom-black mb-3 leading-tight">${p.title}</h3>
        <p class="text-custom-dark-gray mb-4 flex-1 text-sm">${p.description}</p>
        <div class="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border-soft">${tagsHTML}</div>
        <div class="mt-6 flex gap-3">
          <a href="${prefix}/proyectos/${p.id}" class="btn btn-secondary flex-1 text-center">${S['projects.view']}${svgIcon('upRight', 'btn-arrow')}</a>
          ${hasLinks ? `<button class="btn btn-tertiary links-btn" data-id="${p.id}">Links</button>` : ''}
        </div>
      </div>
    </div>`;
}

export function initLinksModal(projects: Project[]) {
  const modal = document.getElementById('links-modal');
  if (!modal) return;

  function showLinksModal(links: ProjectLinks, trigger: HTMLElement) {
    const body = document.getElementById('links-modal-body')!;
    const closeBtn = modal!.querySelector('.modal-close') as HTMLElement;
    const overlay = modal!.querySelector('.absolute.inset-0') as HTMLElement;
    const items: string[] = [];
    const iconLink = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
    const iconCode = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>';
    const iconDoc = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
    const itemClass = 'flex items-center gap-3 px-6 py-1 bg-surface-muted border border-border-soft rounded-[0.75rem] text-custom-black font-semibold hover:translate-x-1 transition-all';
    const S = clientStrings[clientLang()];
    if (links.demo) items.push(`<a href="${links.demo}" target="_blank" rel="noopener noreferrer" class="${itemClass}">${iconLink} Preview</a>`);
    if (links.repo) items.push(`<a href="${links.repo}" target="_blank" rel="noopener noreferrer" class="${itemClass}">${iconCode} ${S['links.repo']}</a>`);
    if (links.caseStudy) items.push(`<a href="${links.caseStudy}" target="_blank" rel="noopener noreferrer" class="${itemClass}">${iconDoc} ${S['links.case']}</a>`);
    body.innerHTML = items.join('');
    modal!.classList.remove('hidden');
    closeBtn.focus();
    const close = () => {
      modal!.classList.add('hidden');
      trigger.focus();
    };
    closeBtn.onclick = close;
    overlay.onclick = close;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } };
    document.addEventListener('keydown', esc);
  }

  document.querySelectorAll<HTMLElement>('.links-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id!;
      const proj = projects.find(p => p.id === id);
      if (proj) showLinksModal(proj.links, btn);
    });
  });
}

export function revealProjectCards() {
  const cards = document.querySelectorAll<HTMLElement>('.project-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(52px)';
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target as HTMLElement;
      const i = Array.from(cards).indexOf(card);
      card.animate(
        [{ opacity: '0', transform: 'translateY(52px)' }, { opacity: '1', transform: 'translateY(0)' }],
        { duration: 1100, delay: i * 180, easing: 'cubic-bezier(0.16,1,0.3,1)', fill: 'forwards' }
      );
      observer.unobserve(card);
    });
  }, { threshold: 0.08 });
  cards.forEach(card => observer.observe(card));
}
