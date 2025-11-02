// Dynamic Templates Loading
// Replaces hardcoded template cards with data from Supabase

async function loadTemplatesIntoContainer(containerSelector, category = null) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error('Template container not found:', containerSelector);
        return;
    }
    
    // Show loading state
    container.innerHTML = `
        <div class="col-span-full text-center py-12">
            <i class="fas fa-spinner fa-spin text-5xl text-primary-600 mb-4"></i>
            <p class="text-gray-600">Loading templates...</p>
        </div>
    `;
    
    try {
        const templates = await fetchTemplates(category);
        
        if (templates.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
                    <p class="text-gray-600 text-lg">No templates found in this category.</p>
                </div>
            `;
            return;
        }
        
        // Generate template cards
        container.innerHTML = templates.map(template => createTemplateCard(template)).join('');
        
        // Animate cards on scroll
        const cards = container.querySelectorAll('.template-card');
        cards.forEach(card => {
            card.classList.add('animate-on-scroll');
        });
        
        // Initialize scroll animations
        if (typeof observeScrollElements === 'function') {
            observeScrollElements();
        }
    } catch (error) {
        console.error('Error loading templates:', error);
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-exclamation-circle text-5xl text-red-500 mb-4"></i>
                <p class="text-gray-600 text-lg">Failed to load templates. Please refresh the page.</p>
            </div>
        `;
    }
}

function createTemplateCard(template) {
    const categoryColors = {
        restaurant: 'primary',
        business: 'blue',
        portfolio: 'purple',
        ecommerce: 'green',
        other: 'gray'
    };
    
    const color = categoryColors[template.category] || 'primary';
    const categoryLabel = template.category.charAt(0).toUpperCase() + template.category.slice(1);
    
    // Features array
    const features = Array.isArray(template.features) ? template.features : [];
    
    return `
        <div class="template-card bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden group" data-category="${template.category}">
            <div class="relative h-72 bg-gradient-to-br from-${color}-100 to-${color}-200 overflow-hidden">
                <!-- Desktop Preview -->
                <div class="absolute inset-0 flex items-center justify-center">
                    ${template.desktop_preview_url ? `
                        <img src="${template.desktop_preview_url}" alt="${template.title}" class="w-full h-full object-cover rounded-lg m-4">
                    ` : `
                        <div class="w-full h-full bg-gradient-to-br from-${color}-300 to-${color}-400 rounded-lg m-4 flex items-center justify-center">
                            <i class="fas fa-${getCategoryIcon(template.category)} text-7xl text-white opacity-70 group-hover:scale-110 transition-transform duration-500"></i>
                        </div>
                    `}
                </div>
                <!-- Mobile Preview Overlay -->
                <div class="absolute bottom-4 right-4 w-20 h-32 bg-gradient-to-br from-${color}-400 to-${color}-500 rounded-lg shadow-xl border-4 border-white transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
                    ${template.mobile_preview_url ? `
                        <img src="${template.mobile_preview_url}" alt="${template.title} mobile" class="w-full h-full object-cover rounded-lg">
                    ` : `
                        <i class="fas fa-${getCategoryIcon(template.category)} text-2xl text-white opacity-80"></i>
                    `}
                </div>
                <div class="absolute top-4 right-4">
                    <span class="bg-${color}-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">${categoryLabel}</span>
                </div>
                <div class="absolute bottom-4 left-4 flex gap-2">
                    ${features.includes('Responsive') || features.length === 0 ? '<span class="bg-white/95 backdrop-blur-sm text-xs font-bold text-gray-700 px-3 py-1 rounded-full shadow-md">✓ Responsive</span>' : ''}
                    ${features.includes('SEO') || features.length === 0 ? '<span class="bg-white/95 backdrop-blur-sm text-xs font-bold text-gray-700 px-3 py-1 rounded-full shadow-md">✓ SEO</span>' : ''}
                </div>
                <!-- Hover Overlay -->
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <a href="template-detail.html?id=${template.id}" class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-${color}-600 px-6 py-3 rounded-full font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl">
                        View Details <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">${template.title}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${template.short_description || template.description || 'Premium website template'}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl font-bold text-${color}-600">$${template.price}</span>
                    </div>
                    <a href="template-detail.html?id=${template.id}" class="bg-gradient-to-r from-${color}-600 to-${color}-700 text-white px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `;
}

function getCategoryIcon(category) {
    const icons = {
        restaurant: 'utensils',
        business: 'briefcase',
        portfolio: 'user-circle',
        ecommerce: 'shopping-cart',
        other: 'file-code'
    };
    return icons[category] || 'file-code';
}

// Load featured templates for homepage
async function loadFeaturedTemplates(limit = 3) {
    const templates = await fetchFeaturedTemplates(limit);
    const container = document.querySelector('.featured-templates');
    
    if (!container) return;
    
    if (templates.length === 0) {
        // Fallback: load regular templates
        const allTemplates = await fetchTemplates();
        templates = allTemplates.slice(0, limit);
    }
    
    container.innerHTML = templates.map(template => createTemplateCard(template)).join('');
    
    // Initialize scroll animations
    if (typeof observeScrollElements === 'function') {
        observeScrollElements();
    }
}

