// Navigation Auth State Management
// Updates navigation based on authentication state

async function updateNavigation() {
    const authenticated = await isAuthenticated();
    const user = await getCurrentUser();
    let profile = null;
    let isAdminUser = false;
    
    if (authenticated && user) {
        profile = await getUserProfile(user.id);
        isAdminUser = profile?.role === 'admin';
    }
    
    // Find all navigation containers
    const desktopNavs = document.querySelectorAll('.desktop-nav');
    const mobileNavs = document.querySelectorAll('.mobile-nav');
    
    desktopNavs.forEach(nav => updateNavElement(nav, authenticated, profile, isAdminUser));
    mobileNavs.forEach(nav => updateNavElement(nav, authenticated, profile, isAdminUser));
}

function updateNavElement(navElement, authenticated, profile, isAdmin) {
    // Find or create auth button container
    let authContainer = navElement.querySelector('.auth-buttons');
    
    if (!authContainer) {
        // Find the ul element to insert after
        const ul = navElement.querySelector('ul');
        if (ul) {
            authContainer = document.createElement('div');
            authContainer.className = 'auth-buttons flex items-center gap-4';
            ul.parentNode.insertBefore(authContainer, ul.nextSibling);
        } else {
            // If no ul, append to nav
            authContainer = document.createElement('div');
            authContainer.className = 'auth-buttons flex items-center gap-4';
            navElement.appendChild(authContainer);
        }
    }
    
    // Show/hide browse templates button based on auth state
    const browseBtn = navElement.querySelector('.browse-templates-btn');
    if (browseBtn) {
        if (authenticated) {
            browseBtn.style.display = 'flex';
        } else {
            browseBtn.style.display = 'none';
        }
    }
    
    // Clear existing content
    authContainer.innerHTML = '';
    
    if (authenticated && profile) {
        // User is logged in - show profile link and logout
        const profileLink = document.createElement('a');
        profileLink.href = 'html/profile.html';
        profileLink.className = 'text-gray-700 hover:text-primary-900 font-medium transition-colors duration-300 flex items-center gap-2';
        profileLink.innerHTML = `
            <i class="fas fa-user-circle text-xl"></i>
            <span>${profile.full_name || profile.email || 'Profile'}</span>
        `;
        authContainer.appendChild(profileLink);
        
        // Admin dashboard link
        if (isAdmin) {
            const adminLink = document.createElement('a');
            adminLink.href = adminPath;
            adminLink.className = 'bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-full font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2';
            adminLink.innerHTML = `
                <i class="fas fa-shield-alt"></i>
                <span>Admin</span>
            `;
            authContainer.appendChild(adminLink);
        }
        
        // Logout button
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'text-gray-700 hover:text-red-600 font-medium transition-colors duration-300';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt mr-2"></i>Logout';
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await signOut();
        });
        authContainer.appendChild(logoutBtn);
    } else {
        // User is not logged in - show login/signup buttons
        const isInHtmlFolder = window.location.pathname.includes('/html/');
        const loginPath = isInHtmlFolder ? 'login.html' : 'html/login.html';
        const signupPath = isInHtmlFolder ? 'signup.html' : 'html/signup.html';
        
        const loginLink = document.createElement('a');
        loginLink.href = loginPath;
        loginLink.className = 'text-gray-700 hover:text-primary-900 font-medium transition-colors duration-300';
        loginLink.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Login';
        authContainer.appendChild(loginLink);
        
        const signupLink = document.createElement('a');
        signupLink.href = signupPath;
        signupLink.className = 'bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center';
        signupLink.innerHTML = '<i class="fas fa-user-plus mr-2"></i>Sign Up';
        authContainer.appendChild(signupLink);
    }
}

// Fallback: Show login/signup buttons even if Supabase isn't configured
// This ensures buttons are visible during development
function showFallbackAuthButtons() {
    const authContainers = document.querySelectorAll('.auth-buttons');
    
    authContainers.forEach(container => {
        // Only show fallback if container is empty and Supabase might not be ready
        if (container.children.length === 0) {
            const isInHtmlFolder = window.location.pathname.includes('/html/');
            const loginPath = isInHtmlFolder ? 'login.html' : 'html/login.html';
            const signupPath = isInHtmlFolder ? 'signup.html' : 'html/signup.html';
            
            const loginLink = document.createElement('a');
            loginLink.href = loginPath;
            loginLink.className = 'text-gray-700 hover:text-primary-900 font-medium transition-colors duration-300';
            loginLink.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Login';
            container.appendChild(loginLink);
            
            const signupLink = document.createElement('a');
            signupLink.href = signupPath;
            signupLink.className = 'bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center';
            signupLink.innerHTML = '<i class="fas fa-user-plus mr-2"></i>Sign Up';
            container.appendChild(signupLink);
        }
    });
}

// Update navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    // Try to update with Supabase first
    updateNavigation().catch(() => {
        // If Supabase fails (not configured), show fallback buttons
        showFallbackAuthButtons();
    });
    
    // Show fallback buttons after 1 second if no buttons appeared (Supabase not configured)
    setTimeout(() => {
        const authContainers = document.querySelectorAll('.auth-buttons');
        let hasButtons = false;
        authContainers.forEach(container => {
            if (container.children.length > 0) {
                hasButtons = true;
            }
        });
        if (!hasButtons) {
            showFallbackAuthButtons();
        }
    }, 1000);
    
    // Listen for auth state changes
    if (typeof onAuthStateChange === 'function') {
        onAuthStateChange(() => {
            updateNavigation();
        });
    }
});
