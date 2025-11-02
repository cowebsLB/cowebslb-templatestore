# COWebs Template Store - Full Stack Application

A full-stack template store application built with Supabase for backend services, featuring user authentication, dynamic template management, and an admin dashboard.

## Features

- ✅ **User Authentication** - Sign up, login, and logout
- ✅ **Dynamic Templates** - Templates stored in Supabase database
- ✅ **User Profiles** - View purchased templates and profile information
- ✅ **Admin Dashboard** - Manage templates, view stats, and control access
- ✅ **Role-Based Access** - User and Admin roles with different permissions
- ✅ **Purchase System** - Track template purchases and downloads
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop

## Setup Instructions

### 1. Supabase Setup

1. Create a free account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** > **API** and copy:
   - **Project URL**
   - **Anon/Public Key**

### 2. Database Setup

1. In your Supabase project, go to **SQL Editor**
2. Open the file `DATABASE_SCHEMA.sql` from this project
3. Copy and paste the entire SQL script into the SQL Editor
4. Click **Run** to execute the script
5. This will create:
   - `profiles` table (extends auth.users)
   - `templates` table (stores all templates)
   - `purchases` table (tracks user purchases)
   - Row Level Security (RLS) policies
   - Database triggers

### 3. Configure Supabase Credentials

1. Open `js/supabase-config.js`
2. Replace the placeholder values:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Your project URL
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Your anon key
   ```

### 4. Create Your First Admin User

1. Sign up for an account through the signup page
2. Go to Supabase dashboard > **Authentication** > **Users**
3. Find your user and note the `id` (UUID)
4. Go to **SQL Editor** and run:
   ```sql
   UPDATE profiles 
   SET role = 'admin' 
   WHERE id = 'YOUR_USER_ID_HERE';
   ```
5. Now you have admin access!

### 5. Add Templates

As an admin, you can:
- Visit `/html/admin.html` (after logging in as admin)
- Click "Add New Template" to create templates
- Or insert directly into the database:
   ```sql
   INSERT INTO templates (title, slug, category, price, short_description, description, featured, published)
   VALUES ('Restaurant Template', 'restaurant-template', 'restaurant', 49.00, 'Premium restaurant website template', 'Full description here', true, true);
   ```

### 6. Supabase Configuration

#### Email Authentication
- Go to **Authentication** > **Settings**
- Configure email templates if needed
- Enable email confirmation if desired (optional)

#### Storage (Optional)
If you want to store template files/images:
1. Go to **Storage** in Supabase dashboard
2. Create a bucket named `templates`
3. Set it to public
4. Upload your template files and images
5. Update template records with file URLs

## File Structure

```
templates-store/
├── html/
│   ├── index.html          # Homepage
│   ├── templates.html      # Template catalog (now dynamic)
│   ├── template-detail.html # Template detail page (update to load from DB)
│   ├── login.html          # Login page
│   ├── signup.html         # Signup page
│   ├── profile.html        # User profile page
│   ├── admin.html          # Admin dashboard
│   ├── about.html
│   └── contact.html
├── js/
│   ├── supabase-config.js  # Supabase initialization
│   ├── auth.js             # Authentication utilities
│   ├── templates-api.js    # Template CRUD operations
│   ├── nav-auth.js         # Navigation auth state
│   ├── dynamic-templates.js # Dynamic template loading
│   └── script.js           # Main script (animations, etc.)
├── css/
│   └── style.css           # Custom styles
├── favicon/                # Favicon files
├── DATABASE_SCHEMA.sql     # Database schema
└── README.md               # This file
```

## Updating Pages to Use Supabase

### Pages That Need Supabase Scripts

Add these scripts before the closing `</body>` tag on these pages:
- `index.html`
- `html/templates.html`
- `html/template-detail.html`
- Any page with navigation

```html
<!-- Supabase CDN -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<!-- Supabase Config -->
<script src="js/supabase-config.js"></script>
<!-- Auth Utilities -->
<script src="js/auth.js"></script>
<!-- Navigation Auth -->
<script src="js/nav-auth.js"></script>
<!-- Dynamic Templates (for pages that show templates) -->
<script src="js/dynamic-templates.js"></script>
```

### Making Templates Dynamic

Replace hardcoded template HTML with:
```javascript
// On page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadTemplatesIntoContainer('.templates-grid');
});
```

## API Functions

### Authentication
- `isAuthenticated()` - Check if user is logged in
- `getCurrentUser()` - Get current user object
- `getUserProfile(userId)` - Get user profile with role
- `isAdmin()` - Check if user is admin
- `signUp(email, password, fullName)` - Register new user
- `signIn(email, password)` - Login user
- `signOut()` - Logout user

### Templates
- `fetchTemplates(category)` - Get all published templates (optional filter)
- `fetchTemplateById(id)` - Get single template
- `fetchFeaturedTemplates(limit)` - Get featured templates
- `createTemplate(templateData)` - Admin: Create template
- `updateTemplate(id, templateData)` - Admin: Update template
- `deleteTemplate(id)` - Admin: Delete template
- `fetchAllTemplatesAdmin()` - Admin: Get all templates (including unpublished)

## Security

- **Row Level Security (RLS)** enabled on all tables
- Users can only see their own purchases
- Only admins can create/update/delete templates
- API keys are public but protected by RLS policies
- Never expose your `service_role` key in client-side code

## Troubleshooting

### "Supabase library not loaded"
- Make sure you include the Supabase CDN script before `supabase-config.js`
- Check the order of script tags

### "Not authenticated" errors
- Verify your Supabase credentials in `supabase-config.js`
- Check browser console for specific error messages

### Templates not loading
- Verify database schema was created correctly
- Check RLS policies allow public read access to published templates
- Verify templates are marked as `published = true`

### Admin access not working
- Confirm your user role is set to 'admin' in the `profiles` table
- Check that the profile was created correctly (trigger may have failed)

## Next Steps

1. **Template Detail Page** - Update `template-detail.html` to load template data from Supabase
2. **Purchase Flow** - Implement actual purchase/payment integration
3. **Image Storage** - Set up Supabase Storage for template previews
4. **Email Notifications** - Configure email templates for purchases
5. **Analytics** - Add tracking for template views and purchases

## Support

For issues or questions, please refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## License

Copyright © 2024 COWebs Template Store. All rights reserved.

