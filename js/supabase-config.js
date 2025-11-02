// Supabase Configuration
// IMPORTANT: Replace these with your actual Supabase project credentials
// Get them from: https://app.supabase.com/project/_/settings/api

const SUPABASE_URL = 'https://pywpobgnmbklguxnpclh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5d3BvYmdubWJrbGd1eG5wY2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMTEzNjIsImV4cCI6MjA3NzY4NzM2Mn0.y5paOjg8Xpq_641oiHECtxH8r5-rFi-4SPvFCzy03Zw';

// Initialize Supabase client
// The Supabase CDN script makes 'supabase' available globally
// Make sure to include: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
let supabase;

// Initialize Supabase when available
// The Supabase CDN script makes 'supabase' available globally
(function initSupabase() {
    if (typeof window === 'undefined') {
        console.error('Supabase requires a browser environment');
        return;
    }
    
    // The Supabase CDN exposes createClient globally
    function tryInit() {
        // Check if the Supabase library is loaded (CDN exposes it)
        if (typeof supabase !== 'undefined' && typeof supabase.createClient === 'function') {
            // CDN version: supabase.createClient(url, key)
            supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            return true;
        }
        // Alternative check for window.supabase
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            return true;
        }
        return false;
    }
    
    // Try immediately
    if (!tryInit()) {
        // Wait for CDN to load (poll every 100ms)
        const checkSupabase = setInterval(() => {
            if (tryInit()) {
                clearInterval(checkSupabase);
                console.log('Supabase initialized successfully');
            }
        }, 100);
        
        // Timeout after 5 seconds
        setTimeout(() => {
            if (!supabase) {
                clearInterval(checkSupabase);
                console.error('Supabase library not loaded. Make sure to include: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
            }
        }, 5000);
    } else {
        console.log('Supabase initialized successfully');
    }
})();

