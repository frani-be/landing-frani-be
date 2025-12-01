// Projects Portfolio System
class ProjectsPortfolio {
    constructor() {
        this.projectsData = [];
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        try {
            await this.loadProjectsData();
            this.detectPageAndRender();
        } catch (error) {
            console.error('Error initializing projects:', error);
        }
    }

    async loadProjectsData() {
        try {
            const response = await fetch('assets/data/projects.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            this.projectsData = data.projects || [];
        } catch (error) {
            console.error('Error loading projects data:', error);
            this.projectsData = [];
        }
    }

    detectPageAndRender() {
        const currentPage = window.location.pathname.split('/').pop();
        
        if (currentPage === 'index.html' || currentPage === '') {
            this.renderFeaturedProjects();
        } else if (currentPage === 'projects.html') {
            this.renderAllProjects();
            this.setupCategoryFilters();
        } else if (currentPage === 'project-detail.html') {
            this.renderProjectDetail();
        }
    }

    // ========== FEATURED PROJECTS (Home) ==========
    renderFeaturedProjects() {
        const container = document.getElementById('featured-projects-container');
        if (!container) return;

        const featuredProjects = this.projectsData.filter(project => project.featured === true);

        if (featuredProjects.length === 0) {
            container.innerHTML = '<p class="text-center text-custom-dark-gray col-span-full">No hay proyectos destacados disponibles.</p>';
            return;
        }

        const projectsHTML = featuredProjects.map(project => this.createProjectCard(project)).join('');
        container.innerHTML = projectsHTML;
        
        this.animateCards();
    }

    // ========== ALL PROJECTS (Listing Page) ==========
    renderAllProjects(category = 'all') {
        const container = document.getElementById('all-projects-container');
        const noProjectsMessage = document.getElementById('no-projects-message');
        
        if (!container) return;

        let filteredProjects = category === 'all' 
            ? [...this.projectsData]
            : this.projectsData.filter(project => project.category === category);

        if (filteredProjects.length === 0) {
            container.innerHTML = '';
            if (noProjectsMessage) {
                noProjectsMessage.classList.remove('hidden');
            }
            return;
        }

        if (noProjectsMessage) {
            noProjectsMessage.classList.add('hidden');
        }

        const projectsHTML = filteredProjects.map(project => this.createProjectCard(project)).join('');
        container.innerHTML = projectsHTML;
        
        this.animateCards();
    }

    createProjectCard(project) {
        const tagsHTML = project.tags.slice(0, 4).map(tag => 
            `<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">${tag}</span>`
        ).join('');

        const hasLinks = project.links.demo || project.links.repo || project.links.caseStudy;

        return `
            <div class="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group opacity-0 project-card">
                <div class="aspect-video w-full overflow-hidden">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="p-6 flex-1 flex flex-col">
                    <span class="text-xs font-bold uppercase tracking-wide text-custom-purple mb-2">${project.category}</span>
                    <h3 class="text-xl font-bold text-custom-black mb-3 font-titles leading-tight">${project.title}</h3>
                    <p class="text-custom-dark-gray mb-4 flex-1">${project.description}</p>
                    
                    <div class="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
                        ${tagsHTML}
                    </div>
                    
                    <div class="mt-6 flex gap-3">
                        <a href="project-detail.html?id=${project.id}" class="flex-1 text-center bg-custom-purple text-white py-2 px-4 rounded-[7px] font-bold text-sm transition-all hover:bg-custom-purple-dark">
                            Ver proyecto
                        </a>
                        ${hasLinks ? `
                            <button onclick="window.projectsPortfolio.showProjectLinks('${project.id}')" class="bg-white text-custom-purple border-2 border-custom-purple py-2 px-4 rounded-[7px] font-bold text-sm transition-all hover:bg-custom-purple hover:text-white">
                                Links
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    showProjectLinks(projectId) {
        const project = this.projectsData.find(p => p.id === projectId);
        if (!project) return;

        const links = [];
        if (project.links.demo) links.push(`<a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="text-custom-purple hover:underline">🔗 Demo</a>`);
        if (project.links.repo) links.push(`<a href="${project.links.repo}" target="_blank" rel="noopener noreferrer" class="text-custom-purple hover:underline">💻 Repositorio</a>`);
        if (project.links.caseStudy) links.push(`<a href="${project.links.caseStudy}" target="_blank" rel="noopener noreferrer" class="text-custom-purple hover:underline">📄 Case Study</a>`);

        if (links.length > 0) {
            alert(links.join('\n'));
        }
    }

    animateCards() {
        setTimeout(() => {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 50);
    }

    // ========== CATEGORY FILTERS (Projects Page) ==========
    setupCategoryFilters() {
        const filterButtons = document.querySelectorAll('.category-filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.currentFilter = category;
                
                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-custom-purple', 'text-white');
                    btn.classList.add('bg-white', 'text-custom-purple');
                });
                
                e.target.classList.remove('bg-white', 'text-custom-purple');
                e.target.classList.add('bg-custom-purple', 'text-white');
                
                // Render filtered projects
                this.renderAllProjects(category);
            });
        });
    }

    // ========== PROJECT DETAIL PAGE ==========
    renderProjectDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');

        if (!projectId) {
            this.showError();
            return;
        }

        const project = this.projectsData.find(p => p.id === projectId);

        if (!project) {
            this.showError();
            return;
        }

        this.populateProjectDetail(project);
    }

    populateProjectDetail(project) {
        // Hide loading, show content
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('project-content').classList.remove('hidden');

        // Update page title and meta tags
        document.getElementById('page-title').textContent = `${project.title} | Francisca Beatriz Medina Concha`;
        document.getElementById('page-description').setAttribute('content', project.description);
        document.getElementById('og-title').setAttribute('content', `${project.title} | Francisca Beatriz Medina Concha`);
        document.getElementById('og-description').setAttribute('content', project.description);
        document.getElementById('og-image').setAttribute('content', project.image);
        document.getElementById('twitter-title').setAttribute('content', `${project.title} | Francisca Beatriz Medina Concha`);
        document.getElementById('twitter-description').setAttribute('content', project.description);
        document.getElementById('twitter-image').setAttribute('content', project.image);

        // Populate content
        document.getElementById('project-category').textContent = project.category;
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-description').textContent = project.description;
        document.getElementById('project-image').src = project.image;
        document.getElementById('project-image').alt = project.title;

        // Parse and render full description (Markdown-like)
        const fullDescriptionHTML = this.parseMarkdown(project.fullDescription);
        document.getElementById('project-full-description').innerHTML = fullDescriptionHTML;

        // Sidebar metadata
        document.getElementById('project-client').textContent = project.client || 'N/A';
        document.getElementById('project-date').textContent = project.date || 'N/A';
        document.getElementById('project-role').textContent = project.role || 'N/A';
        document.getElementById('project-stack').textContent = project.stack || 'N/A';

        // Tags
        const tagsHTML = project.tags.map(tag => 
            `<span class="px-3 py-1 bg-custom-light-purple text-custom-purple text-sm rounded-full font-medium">${tag}</span>`
        ).join('');
        document.getElementById('project-tags').innerHTML = tagsHTML;

        // Links
        const linksContainer = document.getElementById('project-links');
        let linksHTML = '';

        if (project.links.demo) {
            linksHTML += `
                <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" 
                   class="block w-full text-center bg-custom-purple text-white py-2 px-4 rounded-[7px] font-bold text-sm transition-all hover:bg-custom-purple-dark">
                    🔗 Ver Demo
                </a>
            `;
        }

        if (project.links.repo) {
            linksHTML += `
                <a href="${project.links.repo}" target="_blank" rel="noopener noreferrer" 
                   class="block w-full text-center bg-white text-custom-purple border-2 border-custom-purple py-2 px-4 rounded-[7px] font-bold text-sm transition-all hover:bg-custom-purple hover:text-white">
                    💻 Ver Código
                </a>
            `;
        }

        if (project.links.caseStudy) {
            linksHTML += `
                <a href="${project.links.caseStudy}" target="_blank" rel="noopener noreferrer" 
                   class="block w-full text-center bg-white text-custom-purple border-2 border-custom-purple py-2 px-4 rounded-[7px] font-bold text-sm transition-all hover:bg-custom-purple hover:text-white">
                    📄 Case Study
                </a>
            `;
        }

        linksContainer.innerHTML = linksHTML;
    }

    parseMarkdown(text) {
        if (!text) return '';

        let html = text;

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-custom-black mt-6 mb-3 font-titles">$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-custom-black mt-8 mb-4 font-titles">$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-custom-black mt-8 mb-4 font-titles">$1</h1>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-custom-black">$1</strong>');
        html = html.replace(/__(.*?)__/g, '<strong class="font-bold text-custom-black">$1</strong>');

        // Lists
        const lines = html.split('\n');
        let inList = false;
        let result = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.startsWith('- ')) {
                if (!inList) {
                    result.push('<ul class="list-disc list-inside space-y-2 my-4 text-custom-dark-gray">');
                    inList = true;
                }
                result.push(`<li class="ml-4">${line.substring(2)}</li>`);
            } else {
                if (inList) {
                    result.push('</ul>');
                    inList = false;
                }
                if (line && !line.startsWith('<h')) {
                    result.push(`<p class="text-custom-dark-gray leading-relaxed mb-4">${line}</p>`);
                } else if (line.startsWith('<h')) {
                    result.push(line);
                }
            }
        }

        if (inList) {
            result.push('</ul>');
        }

        return result.join('');
    }

    showError() {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('error-state').classList.remove('hidden');
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.projectsPortfolio = new ProjectsPortfolio();
});
