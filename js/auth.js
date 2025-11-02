// Authentication utilities for Supabase

// Check if user is authenticated
async function isAuthenticated() {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
}

// Get current user
async function getCurrentUser() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
}

// Get user profile with role
async function getUserProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
    
    return data;
}

// Check if user is admin
async function isAdmin() {
    const user = await getCurrentUser();
    if (!user) return false;
    
    const profile = await getUserProfile(user.id);
    return profile?.role === 'admin';
}

// Sign up new user
async function signUp(email, password, fullName) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName
            }
        }
    });
    
    if (error) {
        return { success: false, error: error.message };
    }
    
    // Create profile record
    if (data.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([
                {
                    id: data.user.id,
                    email: email,
                    full_name: fullName,
                    role: 'user' // Default role
                }
            ]);
        
        if (profileError) {
            console.error('Error creating profile:', profileError);
        }
    }
    
    return { success: true, user: data.user };
}

// Sign in existing user
async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    
    if (error) {
        return { success: false, error: error.message };
    }
    
    return { success: true, user: data.user };
}

// Sign out
async function signOut() {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
        return { success: false, error: error.message };
    }
    
    // Redirect to home page
    window.location.href = '/';
    
    return { success: true };
}

// Listen to auth state changes
function onAuthStateChange(callback) {
    supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}

