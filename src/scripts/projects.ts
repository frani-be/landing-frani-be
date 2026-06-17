export interface ProjectLinks {
  demo?: string;
  repo?: string;
  caseStudy?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
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

export function buildProjectCardHTML(p: Project): string {
  const tagsHTML = p.tags.slice(0, 4)
    .map(t => `<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">${t}</span>`)
    .join('');
  const hasLinks = p.links.demo || p.links.repo || p.links.caseStudy;
  return `
    <div class="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#d4b0f7] hover:shadow-[0_12px_32px_-8px_rgba(181,90,255,0.18)] transition-all duration-300 flex flex-col group project-card" data-id="${p.id}">
      <div class="aspect-video w-full overflow-hidden">
        <img src="${p.image.replace('assets/', '/')}" alt="${p.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div class="p-6 flex-1 flex flex-col">
        <span class="text-xs font-bold uppercase tracking-wide text-custom-purple mb-2">${p.category}</span>
        <h3 class="text-xl font-bold text-custom-black mb-3 font-titles leading-tight">${p.title}</h3>
        <p class="text-custom-dark-gray mb-4 flex-1 text-sm">${p.description}</p>
        <div class="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">${tagsHTML}</div>
        <div class="mt-6 flex gap-3">
          <a href="/proyectos/${p.id}" class="btn btn-primary flex-1 text-center">Ver proyecto</a>
          ${hasLinks ? `<button class="btn btn-secondary links-btn" data-id="${p.id}">Links</button>` : ''}
        </div>
      </div>
    </div>`;
}

export function initLinksModal(projects: Project[]) {
  const modal = document.getElementById('links-modal');
  if (!modal) return;

  function showLinksModal(links: ProjectLinks) {
    const body = document.getElementById('links-modal-body')!;
    const closeBtn = modal!.querySelector('button[aria-label="Cerrar"]') as HTMLElement;
    const overlay = modal!.querySelector('.absolute.inset-0') as HTMLElement;
    const items: string[] = [];
    if (links.demo) items.push(`<a href="${links.demo}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-6 py-1 bg-gray-50 border border-gray-200 rounded-lg text-custom-black font-semibold hover:translate-x-1 transition-all">🔗 Preview</a>`);
    if (links.repo) items.push(`<a href="${links.repo}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-6 py-1 bg-gray-50 border border-gray-200 rounded-lg text-custom-black font-semibold hover:translate-x-1 transition-all">💻 Repositorio</a>`);
    if (links.caseStudy) items.push(`<a href="${links.caseStudy}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-6 py-1 bg-gray-50 border border-gray-200 rounded-lg text-custom-black font-semibold hover:translate-x-1 transition-all">📄 Caso de estudio</a>`);
    body.innerHTML = items.join('');
    modal!.classList.remove('hidden');
    const close = () => modal!.classList.add('hidden');
    closeBtn.onclick = close;
    overlay.onclick = close;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } };
    document.addEventListener('keydown', esc);
  }

  document.querySelectorAll<HTMLElement>('.links-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id!;
      const proj = projects.find(p => p.id === id);
      if (proj) showLinksModal(proj.links);
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
