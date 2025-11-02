// Templates API utilities for Supabase

// Fetch all templates
async function fetchTemplates(category = null) {
    let query = supabase
        .from('templates')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
    
    if (category && category !== 'all') {
        query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
        console.error('Error fetching templates:', error);
        return [];
    }
    
    return data || [];
}

// Fetch single template by ID
async function fetchTemplateById(id) {
    const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();
    
    if (error) {
        console.error('Error fetching template:', error);
        return null;
    }
    
    return data;
}

// Fetch featured templates
async function fetchFeaturedTemplates(limit = 3) {
    const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);
    
    if (error) {
        console.error('Error fetching featured templates:', error);
        return [];
    }
    
    return data || [];
}

// Admin: Create new template
async function createTemplate(templateData) {
    const { data: { user } } = await supabase.auth.getSession();
    if (!user) {
        return { success: false, error: 'Not authenticated' };
    }
    
    const profile = await getUserProfile(user.id);
    if (profile?.role !== 'admin') {
        return { success: false, error: 'Admin access required' };
    }
    
    const { data, error } = await supabase
        .from('templates')
        .insert([{
            ...templateData,
            created_by: user.id
        }])
        .select()
        .single();
    
    if (error) {
        return { success: false, error: error.message };
    }
    
    return { success: true, template: data };
}

// Admin: Update template
async function updateTemplate(id, templateData) {
    const { data: { user } } = await supabase.auth.getSession();
    if (!user) {
        return { success: false, error: 'Not authenticated' };
    }
    
    const profile = await getUserProfile(user.id);
    if (profile?.role !== 'admin') {
        return { success: false, error: 'Admin access required' };
    }
    
    const { data, error } = await supabase
        .from('templates')
        .update(templateData)
        .eq('id', id)
        .select()
        .single();
    
    if (error) {
        return { success: false, error: error.message };
    }
    
    return { success: true, template: data };
}

// Admin: Delete template
async function deleteTemplate(id) {
    const { data: { user } } = await supabase.auth.getSession();
    if (!user) {
        return { success: false, error: 'Not authenticated' };
    }
    
    const profile = await getUserProfile(user.id);
    if (profile?.role !== 'admin') {
        return { success: false, error: 'Admin access required' };
    }
    
    const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id);
    
    if (error) {
        return { success: false, error: error.message };
    }
    
    return { success: true };
}

// Admin: Fetch all templates (including unpublished)
async function fetchAllTemplatesAdmin() {
    const { data: { user } } = await supabase.auth.getSession();
    if (!user) {
        return { success: false, error: 'Not authenticated', data: [] };
    }
    
    const profile = await getUserProfile(user.id);
    if (profile?.role !== 'admin') {
        return { success: false, error: 'Admin access required', data: [] };
    }
    
    const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) {
        return { success: false, error: error.message, data: [] };
    }
    
    return { success: true, data: data || [] };
}

