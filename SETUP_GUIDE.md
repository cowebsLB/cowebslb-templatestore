# Full-Stack Setup Guide

## Quick Start

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com) and create a free account
   - Create a new project
   - Wait for project to be ready (takes ~2 minutes)

2. **Get Your Credentials**
   - Go to **Settings** > **API**
   - Copy your **Project URL**
   - Copy your **anon/public key**

3. **Configure Supabase**
   - Open `js/supabase-config.js`
   - Replace `YOUR_SUPABASE_URL` with your Project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your anon key

4. **Set Up Database**
   - In Supabase dashboard, go to **SQL Editor**
   - Open `DATABASE_SCHEMA.sql` from this project
   - Copy and paste the entire SQL script
   - Click **Run** to execute
   - This creates all tables, policies, and triggers

5. **Create Your Admin Account**
   - Visit `/html/signup.html` and create an account
   - Go to Supabase dashboard > **Authentication** > **Users**
   - Find your user and copy their `id` (UUID)
   - Go to **SQL Editor** and run:
     ```sql
     UPDATE profiles 
     SET role = 'admin' 
     WHERE id = 'YOUR_USER_ID_HERE';
     ```
   - Now you have admin access!

6. **Add Your First Template**
   - Log in with your admin account
   - Visit `/html/admin.html`
   - Click "Add New Template"
   - Fill in the form and save
   - Mark it as "Published" to make it visible

## Files Created

### Authentication
- `html/login.html` - Login page
- `html/signup.html` - Signup page
- `html/profile.html` - User profile page

### Admin
- `html/admin.html` - Admin dashboard with template management

### JavaScript Utilities
- `js/supabase-config.js` - Supabase initialization
- `js/auth.js` - Authentication functions
- `js/templates-api.js` - Template CRUD operations
- `js/nav-auth.js` - Dynamic navigation updates
- `js/dynamic-templates.js` - Dynamic template loading

### Database
- `DATABASE_SCHEMA.sql` - Complete database schema

## Database Tables

### `profiles`
- Extends Supabase auth.users
- Stores user profile information and role (user/admin)

### `templates`
- Stores all website templates
- Fields: title, slug, category, price, description, featured, published, etc.

### `purchases`
- Tracks user template purchases
- Links users to templates with purchase details

## Security

- **Row Level Security (RLS)** is enabled on all tables
- Users can only see their own purchases
- Only admins can create/update/delete templates
- Public users can only view published templates

## Troubleshooting

### "Supabase library not loaded"
- Make sure Supabase CDN is included before `supabase-config.js`
- Check browser console for errors

### Templates not showing
- Verify templates are marked as `published = true` in database
- Check RLS policies are set correctly
- Verify Supabase credentials are correct

### Admin access not working
- Confirm your user role is set to 'admin' in `profiles` table
- Check that you're logged in with the correct account

## Next Steps

1. Upload template preview images to Supabase Storage
2. Set up email templates for purchases
3. Configure payment integration
4. Add analytics tracking

