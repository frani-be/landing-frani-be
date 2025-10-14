// Timeline functionality
class Timeline {
    constructor() {
        this.timelineData = [];
        this.filteredData = [];
        this.currentFilter = 'all';
        this.init();
    }

    // Configuración de categorías centralizada
    static get CATEGORIES() {
        return {
            laboral: {
                label: 'Experiencia laboral',
                color: '#2555a3',
                cssClasses: {
                    text: 'u-txt-color-laboral',
                    bg: 'u-bg-color-laboral',
                    border: 'u-border-color-laboral'
                }
            },
            academica: {
                label: 'Formación académica',
                color: '#9f2eba',
                cssClasses: {
                    text: 'u-txt-color-academica',
                    bg: 'u-bg-color-academica',
                    border: 'u-border-color-academica'
                }
            },
            docencia: {
                label: 'Experiencia en docencia',
                color: '#7d1fc7',
                cssClasses: {
                    text: 'u-txt-color-docencia',
                    bg: 'u-bg-color-docencia',
                    border: 'u-border-color-docencia'
                }
            },
            voluntariados: {
                label: 'Voluntariados',
                color: '#bd2c97',
                cssClasses: {
                    text: 'u-txt-color-voluntariados',
                    bg: 'u-bg-color-voluntariados',
                    border: 'u-border-color-voluntariados'
                }
            }
        };
    }

    static get MONTHS() {
        return ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    }

    async init() {
        try {
            await this.loadTimelineData();
            this.renderTimeline();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing timeline:', error);
        }
    }

    async loadTimelineData() {
        try {
            const response = await fetch('assets/data/timeline.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            this.timelineData = data.timeline || [];
            this.filteredData = [...this.timelineData];
            this.sortByDate(this.filteredData);
        } catch (error) {
            console.error('Error loading timeline data:', error);
            this.timelineData = [];
            this.filteredData = [];
        }
    }

    sortByDate(data) {
        return data.sort((a, b) => {
            const dateA = new Date(a.startDate + '-01');
            const dateB = new Date(b.startDate + '-01');
            return dateB - dateA;
        });
    }

    setupEventListeners() {
        this.setupFilterButtons();
        this.setupGlobalControlButtons();
    }

    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', this.handleFilterClick.bind(this));
        });
    }

    setupGlobalControlButtons() {
        const expandAllBtn = document.getElementById('expand-all-btn');
        const collapseAllBtn = document.getElementById('collapse-all-btn');
        
        if (expandAllBtn) {
            expandAllBtn.addEventListener('click', this.expandAllDescriptions.bind(this));
        }
        
        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', this.collapseAllDescriptions.bind(this));
        }
    }

    handleFilterClick(e) {
        const filter = e.target.dataset.filter;
        this.filterTimeline(filter);
        this.updateActiveFilter(e.target);
    }

    filterTimeline(filter) {
        this.currentFilter = filter;
        this.filteredData = filter === 'all' 
            ? [...this.timelineData]
            : this.timelineData.filter(item => item.category === filter);
        
        this.sortByDate(this.filteredData);
        this.renderTimeline();
    }

    updateActiveFilter(activeButton) {
        // Resetear todos los botones
        document.querySelectorAll('.filter-btn').forEach(btn => {
            this.resetButtonStyles(btn);
        });
        
        // Activar el botón seleccionado
        this.activateButton(activeButton);
    }

    resetButtonStyles(button) {
        button.classList.remove('active');
        const filter = button.getAttribute('data-filter');
        
        if (filter === 'all') {
            this.applyButtonStyles(button, {
                remove: ['u-bg-color-purple', 'u-txt-color-white'],
                add: ['u-bg-color-white', 'u-txt-color-purple', 'u-border-color-purple']
            });
        } else {
            const category = Timeline.CATEGORIES[filter];
            if (category) {
                this.applyButtonStyles(button, {
                    remove: [category.cssClasses.bg, 'u-txt-color-white'],
                    add: ['u-bg-color-white', category.cssClasses.text, category.cssClasses.border]
                });
            }
        }
    }

    activateButton(button) {
        button.classList.add('active');
        const filter = button.getAttribute('data-filter');
        
        if (filter === 'all') {
            this.applyButtonStyles(button, {
                remove: ['u-bg-color-white', 'u-txt-color-purple'],
                add: ['u-bg-color-purple', 'u-txt-color-white', 'u-border-color-purple']
            });
        } else {
            const category = Timeline.CATEGORIES[filter];
            if (category) {
                this.applyButtonStyles(button, {
                    remove: ['u-bg-color-white', category.cssClasses.text],
                    add: [category.cssClasses.bg, 'u-txt-color-white', category.cssClasses.border]
                });
            }
        }
    }

    applyButtonStyles(button, { remove = [], add = [] }) {
        button.classList.remove(...remove);
        button.classList.add(...add);
    }

    updateActiveFilterByCategory(category) {
        const filterButton = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (filterButton) {
            this.updateActiveFilter(filterButton);
        }
    }

    formatDate(dateString) {
        if (dateString === 'actualidad') return 'Actualidad';
        
        const [year, month] = dateString.split('-');
        const monthIndex = parseInt(month) - 1;
        return `${Timeline.MONTHS[monthIndex]} ${year}`;
    }

    getCategoryInfo(category) {
        return Timeline.CATEGORIES[category] || {
            label: category,
            color: '#565656',
            cssClasses: { text: 'u-txt-color-dark-gray', bg: 'u-bg-color-dark-gray', border: 'u-border-color-dark-gray' }
        };
    }

    // Convertir Markdown básico a HTML
    parseMarkdown(text) {
        if (!text) return '';
        
        // Convertir líneas que empiecen con "- " a elementos de lista
        const lines = text.split('\n');
        let inList = false;
        let result = [];
        let hasListItems = lines.some(line => line.trim().startsWith('- '));
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('- ')) {
                if (!inList) {
                    result.push('<ul class="timeline-list">');
                    inList = true;
                }
                // Procesar texto en negrita dentro del elemento de lista
                const listContent = this.processBoldText(line.substring(2));
                result.push(`<li>${listContent}</li>`);
            } else {
                if (inList) {
                    result.push('</ul>');
                    inList = false;
                }
                if (line) {
                    // Si hay elementos de lista, tratar texto normal como párrafos
                    // Si no hay listas, tratar todo como un párrafo continuo
                    if (hasListItems) {
                        const processedLine = this.processBoldText(line);
                        result.push(`<p>${processedLine}</p>`);
                    } else {
                        // Si no hay viñetas, concatenar todo en un solo párrafo
                        if (result.length === 0) {
                            result.push('<p>');
                        }
                        const processedLine = this.processBoldText(line);
                        result.push(processedLine);
                        if (i < lines.length - 1 && lines[i + 1].trim()) {
                            result.push(' ');
                        }
                    }
                }
            }
        }
        
        // Cerrar lista si está abierta al final
        if (inList) {
            result.push('</ul>');
        }
        
        // Cerrar párrafo si no hay listas
        if (!hasListItems && result.length > 0) {
            result.push('</p>');
        }
        
        return result.join('');
    }

    // Procesar texto en negrita (texto entre ** o __)
    processBoldText(text) {
        // Convertir **texto** a <strong>texto</strong>
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Convertir __texto__ a <strong>texto</strong>
        text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
        return text;
    }

    renderTimeline() {
        const container = document.getElementById('timeline-container');
        
        if (this.filteredData.length === 0) {
            container.innerHTML = '<p class="u-txt-center u-txt-color-dark-gray u-font-primary">No hay elementos para mostrar</p>';
            return;
        }

        const timelineHTML = this.filteredData.map(item => this.createTimelineItem(item)).join('');
        container.innerHTML = `<div class="timeline-line"></div>${timelineHTML}`;
        
        this.setupToggleListeners();
        this.setupGlobalControlButtons(); // Re-configurar listeners globales después del re-render
        this.animateItems();
    }

    createTimelineItem(item) {
        const categoryInfo = this.getCategoryInfo(item.category);
        
        return `
            <div class="u-position-relative u-mb-2 u-opacity-0 u-transition-all-slow timeline-item" 
                 data-category="${item.category}" 
                 style="--category-color: ${categoryInfo.color}; margin-left: 4rem; transform: translateY(20px);">
                ${this.createTimelineMarker()}
                ${this.createTimelineContent(item, categoryInfo)}
            </div>
        `;
    }

    createTimelineMarker() {
        return `
            <div class="timeline-marker u-position-absolute u-border-radius-large u-z-2" 
                 style="left: -4rem; top: 0.75rem; width: 1rem; height: 1rem; margin-left: 1.5rem;"></div>
        `;
    }

    createTimelineContent(item, categoryInfo) {
        return `
            <div class="timeline-content u-bg-color-white u-border-radius-medium u-shadow-sm u-transition-transform u-font-primary" 
                 style="padding: 1.5rem;">
                ${this.createTimelineHeader(item, categoryInfo)}
                ${this.createTimelineBody(item)}
                ${this.createTimelineDescription(item)}
            </div>
        `;
    }

    createTimelineHeader(item, categoryInfo) {
        return `
            <div class="u-display-flex u-justify-between u-align-center u-flex-wrap timeline-header-content" 
                 style="margin-bottom: 0.5rem; gap: 0.5rem;">
                <div class="u-txt-sm u-txt-color-dark-gray u-font-weight-500 u-font-primary">
                    ${this.formatDate(item.startDate)} - ${this.formatDate(item.endDate)}
                </div>
                <button class="timeline-category u-txt-color-white u-border-radius-small u-font-primary u-font-weight-500 u-txt-sm u-pt-0-25 u-pb-0-25 u-pl-1 u-pr-1 u-cursor-pointer u-transition-all u-border-1 u-border-solid"
                        data-filter="${item.category}">
                    ${categoryInfo.label}
                </button>
            </div>
        `;
    }

    createTimelineBody(item) {
        return `
            <h3 class="u-txt-lg u-font-weight-700 u-txt-color-black u-m-0 u-font-titles" 
                style="margin-bottom: 0.5rem; line-height: 1.3;">${item.title}</h3>
            <div class="u-txt-md u-txt-color-dark-gray u-font-weight-500 u-font-primary" 
                 style="margin-bottom: 1rem;">${item.company} • ${item.location}</div>
        `;
    }

    createTimelineDescription(item) {
        const markdownHTML = this.parseMarkdown(item.description);
        
        return `
            <div class="u-position-relative">
                <div class="timeline-description collapsed u-txt-color-black u-overflow-hidden u-font-primary" 
                     style="line-height: 1.6;" id="description-${item.id}">
                    ${markdownHTML}
                </div>
                <button class="timeline-toggle u-font-weight-600 u-txt-sm u-cursor-pointer u-display-flex u-align-center u-transition-all u-font-primary" 
                        style="gap: 0.25rem; margin-top: 0.5rem;" data-item-id="${item.id}">
                    <span class="toggle-text">Ver más</span>
                    <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;
    }

    animateItems() {
        setTimeout(() => {
            const items = document.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                this.applyResponsiveStyles(item);
                setTimeout(() => item.classList.add('animate-in'), index * 100);
            });
            
            this.applyMobileFilterStyles();
        }, 50);
    }

    applyResponsiveStyles(item) {
        if (window.innerWidth <= 768) {
            item.style.marginLeft = '2.5rem';
            
            const marker = item.querySelector('.timeline-marker');
            if (marker) {
                marker.style.left = '-3rem';
                marker.style.marginLeft = '1rem';
            }
            
            const headerContent = item.querySelector('.timeline-header-content');
            if (headerContent) {
                headerContent.style.flexDirection = 'column';
                headerContent.style.alignItems = 'flex-start';
            }
            
            const content = item.querySelector('.timeline-content');
            if (content) content.style.padding = '1rem';
        }
    }

    setupToggleListeners() {
        this.setupDescriptionToggles();
        this.setupCategoryLabels();
    }

    setupDescriptionToggles() {
        const toggleButtons = document.querySelectorAll('.timeline-toggle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', this.handleToggleClick.bind(this));
        });
    }

    setupCategoryLabels() {
        const categoryLabels = document.querySelectorAll('.timeline-category');
        categoryLabels.forEach(label => {
            label.addEventListener('click', this.handleCategoryClick.bind(this));
        });
    }

    handleToggleClick(e) {
        const itemId = parseInt(e.currentTarget.getAttribute('data-item-id'));
        this.toggleDescription(itemId);
    }

    handleCategoryClick(e) {
        e.preventDefault();
        e.stopPropagation();
        const filter = e.currentTarget.getAttribute('data-filter');
        this.filterTimeline(filter);
        this.updateActiveFilterByCategory(filter);
    }

    toggleDescription(itemId) {
        const description = document.getElementById(`description-${itemId}`);
        
        if (!description) {
            console.error('Description element not found for id:', itemId);
            return;
        }
        
        const button = description.nextElementSibling;
        const toggleText = button.querySelector('.toggle-text');
        const toggleIcon = button.querySelector('.toggle-icon');
        
        const isCollapsed = description.classList.contains('collapsed');
        
        if (isCollapsed) {
            this.expandDescription(description, toggleText, toggleIcon);
        } else {
            this.collapseDescription(description, toggleText, toggleIcon);
        }
    }

    expandDescription(description, toggleText, toggleIcon) {
        description.classList.remove('collapsed');
        description.classList.add('expanded');
        toggleText.textContent = 'Ver menos';
        toggleIcon.style.transform = 'rotate(180deg)';
    }

    collapseDescription(description, toggleText, toggleIcon) {
        description.classList.remove('expanded');
        description.classList.add('collapsed');
        toggleText.textContent = 'Ver más';
        toggleIcon.style.transform = 'rotate(0deg)';
    }

    expandAllDescriptions() {
        const descriptions = document.querySelectorAll('.timeline-description');
        descriptions.forEach(description => {
            if (description.classList.contains('collapsed')) {
                const button = description.nextElementSibling;
                const toggleText = button.querySelector('.toggle-text');
                const toggleIcon = button.querySelector('.toggle-icon');
                this.expandDescription(description, toggleText, toggleIcon);
            }
        });
    }

    collapseAllDescriptions() {
        const descriptions = document.querySelectorAll('.timeline-description');
        descriptions.forEach(description => {
            if (description.classList.contains('expanded')) {
                const button = description.nextElementSibling;
                const toggleText = button.querySelector('.toggle-text');
                const toggleIcon = button.querySelector('.toggle-icon');
                this.collapseDescription(description, toggleText, toggleIcon);
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    window.timeline = new Timeline();
});
