# COWebs Template Store - Full Stack Application

A modern, full-stack e-commerce platform for selling premium website templates. Built with vanilla JavaScript, Tailwind CSS, and Supabase, featuring user authentication, dynamic template management, admin dashboard, and secure payment tracking.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

COWebs Template Store is a complete solution for selling website templates online. The platform provides:

- **User Management**: Secure authentication with role-based access control (User/Admin)
- **Template Marketplace**: Dynamic template catalog with filtering, search, and detailed views
- **Admin Dashboard**: Full CRUD operations for template management, statistics, and user oversight
- **Purchase System**: Track purchases, generate download links, and manage customer access
- **Responsive Design**: Mobile-first design that works seamlessly across all devices

## ✨ Features

### 🔐 Authentication System
- **User Registration**: Email/password signup with profile creation
- **User Login**: Secure authentication with session management
- **Profile Management**: User profiles with purchase history
- **Role-Based Access**: Separate permissions for users and administrators
- **Session Management**: Automatic authentication state tracking

### 🎨 Template Management
- **Dynamic Templates**: All templates stored in Supabase database
- **Category Filtering**: Filter by Restaurant, Business, Portfolio, E-commerce, or Other
- **Featured Templates**: Highlight special templates on homepage
- **Template Details**: Comprehensive detail pages with previews, features, and pricing
- **Search & Browse**: Easy navigation through template catalog

### 👨‍💼 Admin Dashboard
- **Template CRUD**: Create, read, update, and delete templates
- **Template Publishing**: Control visibility with published/draft status
- **Featured Management**: Mark templates as featured for homepage
- **Statistics**: View total templates, published count, and purchase metrics
- **User Management**: View and manage user accounts (future enhancement)

### 💰 Purchase System
- **Purchase Tracking**: Record all template purchases
- **Download Links**: Generate secure download links for purchased templates
- **Purchase History**: Users can view all their purchased templates
- **Status Management**: Track purchase status (pending, completed, failed)

### 🎨 UI/UX Features
- **Purple Theme**: Distinctive purple color scheme differentiating from main site
- **Smooth Animations**: Scroll animations, hover effects, and transitions
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Graceful error messages and fallbacks

## 🛠 Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom styles with Tailwind CSS
- **JavaScript (ES6+)**: Vanilla JavaScript with modern async/await
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **Font Awesome**: Icon library for UI icons
- **Google Fonts**: Poppins font family

### Backend & Database
- **Supabase**: Backend-as-a-Service platform
  - Authentication (email/password)
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions (ready for future use)

### Deployment
- **GitHub**: Version control and code hosting
- **Static Hosting Ready**: Can be deployed to any static hosting service
  - Netlify
  - Vercel
  - GitHub Pages
  - Cloudflare Pages

## 📁 Project Structure

```
templates-store/
├── index.html                 # Homepage with featured templates
├── logo.png                   # Site logo
│
├── html/                      # HTML Pages
│   ├── templates.html         # Template catalog with filtering
│   ├── template-detail.html   # Individual template detail page
│   ├── login.html             # User login page
│   ├── signup.html            # User registration page
│   ├── profile.html           # User profile with purchases
│   ├── admin.html             # Admin dashboard
│   ├── about.html             # About page
│   └── contact.html           # Contact page
│
├── css/                       # Stylesheets
│   └── style.css              # Custom CSS animations and overrides
│
├── js/                        # JavaScript Files
│   ├── supabase-config.js     # Supabase initialization
│   ├── auth.js                # Authentication utilities
│   ├── templates-api.js       # Template CRUD operations
│   ├── nav-auth.js            # Navigation auth state management
│   ├── dynamic-templates.js  # Dynamic template loading
│   └── script.js             # Main script (animations, UI)
│
├── favicon/                   # Favicon files
│   ├── favicon.ico
│   ├── favicon.svg
│   └── ...
│
├── DATABASE_SCHEMA.sql        # Complete database schema
├── SETUP_GUIDE.md             # Quick setup guide
└── README.md                  # This file
```

## 🚀 Setup & Installation

### Prerequisites
- A Supabase account ([sign up here](https://supabase.com))
- Git (for version control)
- A modern web browser
- A text editor or IDE

### Step 1: Clone the Repository

```bash
git clone https://github.com/cowebsLB/cowebslb-templatestore.git
cd cowebslb-templatestore
```

### Step 2: Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details:
   - Name: `cowebslb-templatestore` (or your preferred name)
   - Database Password: (choose a strong password)
   - Region: (select closest to your users)
4. Wait for project to initialize (~2 minutes)

### Step 3: Configure Supabase

1. In Supabase dashboard, go to **Settings** > **API**
2. Copy your **Project URL** (e.g., `https://xxxxx.supabase.co`)
3. Copy your **anon public key** (starts with `eyJ...`)
4. Open `js/supabase-config.js` in your project
5. Replace the placeholder values:
   ```javascript
   const SUPABASE_URL = 'https://your-project.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key-here';
   ```

### Step 4: Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Open `DATABASE_SCHEMA.sql` from your project
3. Copy the entire SQL script
4. Paste it into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. Verify tables were created:
   - Go to **Table Editor**
   - You should see: `profiles`, `templates`, `purchases`

### Step 5: Create Admin Account

1. Open your project in a browser
2. Navigate to `/html/signup.html`
3. Create an account with your email
4. In Supabase dashboard, go to **Authentication** > **Users**
5. Find your user and copy the **UUID** (user ID)
6. Go to **SQL Editor** and run:
   ```sql
   UPDATE profiles 
   SET role = 'admin' 
   WHERE id = 'your-user-uuid-here';
   ```
7. Log out and log back in - you should now have admin access!

### Step 6: Add Your First Template

1. Log in with your admin account
2. Navigate to `/html/admin.html`
3. Click **"Add New Template"**
4. Fill in the form:
   - **Title**: Restaurant Website Template
   - **Slug**: restaurant-template (lowercase, hyphenated)
   - **Category**: Select appropriate category
   - **Price**: Enter price (e.g., 49.00)
   - **Short Description**: Brief one-liner
   - **Description**: Full description
   - **Featured**: Check if you want it featured
   - **Published**: Check to make it visible
5. Click **"Save Template"**
6. Visit `/html/templates.html` to see your template!

### Step 7: Test the Application

1. **Test Authentication**:
   - Try signing up a new account
   - Log out and log back in
   - Verify profile page shows your info

2. **Test Template Display**:
   - Visit homepage - featured templates should load
   - Visit templates page - all templates should display
   - Test category filtering

3. **Test Admin Functions**:
   - Log in as admin
   - Create, edit, and delete templates
   - Verify statistics update correctly

## 🗄 Database Schema

### Tables Overview

#### `profiles`
Extends Supabase's `auth.users` with additional user information.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, references `auth.users.id` |
| `email` | TEXT | User's email address |
| `full_name` | TEXT | User's full name |
| `role` | TEXT | User role: `'user'` or `'admin'` |
| `avatar_url` | TEXT | URL to user avatar (optional) |
| `created_at` | TIMESTAMP | Account creation date |
| `updated_at` | TIMESTAMP | Last update timestamp |

#### `templates`
Stores all website templates.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `title` | TEXT | Template title |
| `slug` | TEXT | URL-friendly slug (unique) |
| `description` | TEXT | Full description |
| `short_description` | TEXT | Brief description for cards |
| `category` | TEXT | Category: `restaurant`, `business`, `portfolio`, `ecommerce`, `other` |
| `price` | DECIMAL(10,2) | Template price |
| `featured` | BOOLEAN | Whether template is featured |
| `published` | BOOLEAN | Whether template is visible to public |
| `desktop_preview_url` | TEXT | URL to desktop preview image |
| `mobile_preview_url` | TEXT | URL to mobile preview image |
| `thumbnail_url` | TEXT | URL to thumbnail image |
| `template_file_url` | TEXT | URL to template ZIP file |
| `features` | JSONB | Array of feature strings |
| `whats_included` | JSONB | Array of included items |
| `created_by` | UUID | Admin user who created it |
| `created_at` | TIMESTAMP | Creation date |
| `updated_at` | TIMESTAMP | Last update timestamp |

#### `purchases`
Tracks template purchases.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Purchasing user (references `auth.users.id`) |
| `template_id` | UUID | Purchased template (references `templates.id`) |
| `price` | DECIMAL(10,2) | Purchase price |
| `payment_method` | TEXT | Payment method used |
| `status` | TEXT | Status: `pending`, `completed`, `failed` |
| `download_link` | TEXT | Generated download link |
| `expires_at` | TIMESTAMP | Link expiration date |
| `created_at` | TIMESTAMP | Purchase date |
| `updated_at` | TIMESTAMP | Last update timestamp |

### Row Level Security (RLS)

The database uses Supabase's Row Level Security to ensure data protection:

- **Profiles**: Users can only view/update their own profile
- **Templates**: Public users can only see published templates; admins see all
- **Purchases**: Users can only see their own purchases; admins see all

## 🔐 Authentication

### Authentication Flow

1. **Sign Up**:
   - User fills out registration form
   - Account created in Supabase Auth
   - Profile record automatically created via database trigger
   - Email verification (if enabled in Supabase)

2. **Sign In**:
   - User enters email/password
   - Supabase validates credentials
   - Session created and stored
   - Navigation updates to show user profile

3. **Sign Out**:
   - Session cleared
   - User redirected to homepage
   - Navigation reverts to login/signup buttons

### Role Management

- **Default Role**: All new users get `'user'` role
- **Admin Role**: Manually assigned via SQL query or admin panel
- **Role Check**: Done via `isAdmin()` function before allowing admin operations

### Security Features

- Password hashing handled by Supabase
- JWT tokens for session management
- RLS policies prevent unauthorized data access
- Email verification support (configurable in Supabase)

## 📚 API Documentation

### Authentication Functions

Located in `js/auth.js`:

#### `isAuthenticated()`
Check if user is currently logged in.
```javascript
const authenticated = await isAuthenticated();
// Returns: true or false
```

#### `getCurrentUser()`
Get current authenticated user object.
```javascript
const user = await getCurrentUser();
// Returns: User object or null
```

#### `getUserProfile(userId)`
Get user profile with role information.
```javascript
const profile = await getUserProfile(user.id);
// Returns: Profile object with role, full_name, etc.
```

#### `isAdmin()`
Check if current user is an admin.
```javascript
const admin = await isAdmin();
// Returns: true or false
```

#### `signUp(email, password, fullName)`
Register a new user.
```javascript
const result = await signUp('user@example.com', 'password123', 'John Doe');
// Returns: { success: true, user: {...} } or { success: false, error: '...' }
```

#### `signIn(email, password)`
Log in an existing user.
```javascript
const result = await signIn('user@example.com', 'password123');
// Returns: { success: true, user: {...} } or { success: false, error: '...' }
```

#### `signOut()`
Log out current user.
```javascript
const result = await signOut();
// Returns: { success: true }
```

### Template API Functions

Located in `js/templates-api.js`:

#### `fetchTemplates(category)`
Get all published templates, optionally filtered by category.
```javascript
const templates = await fetchTemplates(); // All templates
const restaurantTemplates = await fetchTemplates('restaurant');
// Returns: Array of template objects
```

#### `fetchTemplateById(id)`
Get a single template by ID.
```javascript
const template = await fetchTemplateById('template-uuid');
// Returns: Template object or null
```

#### `fetchFeaturedTemplates(limit)`
Get featured templates for homepage.
```javascript
const featured = await fetchFeaturedTemplates(3);
// Returns: Array of featured templates
```

#### `createTemplate(templateData)` (Admin Only)
Create a new template.
```javascript
const result = await createTemplate({
  title: 'My Template',
  slug: 'my-template',
  category: 'business',
  price: 49.00,
  // ... other fields
});
// Returns: { success: true, template: {...} } or { success: false, error: '...' }
```

#### `updateTemplate(id, templateData)` (Admin Only)
Update an existing template.
```javascript
const result = await updateTemplate('template-uuid', {
  price: 59.00,
  published: true
});
// Returns: { success: true, template: {...} } or { success: false, error: '...' }
```

#### `deleteTemplate(id)` (Admin Only)
Delete a template.
```javascript
const result = await deleteTemplate('template-uuid');
// Returns: { success: true } or { success: false, error: '...' }
```

## 📖 Usage Guide

### For End Users

1. **Browse Templates**:
   - Visit homepage to see featured templates
   - Click "Browse All Templates" to see full catalog
   - Use category filters to narrow down selection

2. **View Template Details**:
   - Click on any template card
   - View full description, features, and pricing
   - See desktop and mobile previews

3. **Purchase Template**:
   - Click "Purchase via WhatsApp" button
   - Complete purchase through WhatsApp (customize this flow)
   - Receive download link via email or WhatsApp

4. **Manage Account**:
   - Click on your name in navigation
   - View profile and purchase history
   - Download purchased templates

### For Administrators

1. **Access Dashboard**:
   - Log in with admin account
   - Click "Admin" button in navigation
   - View statistics and template list

2. **Create Template**:
   - Click "Add New Template"
   - Fill in all required fields
   - Upload preview images (via Supabase Storage)
   - Mark as "Published" to make visible
   - Mark as "Featured" to show on homepage

3. **Edit Template**:
   - Click edit icon on template in admin dashboard
   - Modify any fields
   - Save changes

4. **Delete Template**:
   - Click delete icon on template
   - Confirm deletion
   - Template will be permanently removed

5. **Manage Visibility**:
   - Use "Published" checkbox to control visibility
   - Unpublished templates only visible to admins
   - Use "Featured" to highlight important templates

## 🚀 Deployment

### Option 1: Netlify

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: (leave empty - static site)
   - Publish directory: `templates-store`
6. Deploy!

### Option 2: Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Root directory: `templates-store`
5. Framework: Other
6. Deploy!

### Option 3: GitHub Pages

1. Go to repository Settings
2. Navigate to Pages
3. Source: Deploy from a branch
4. Branch: `main`
5. Folder: `/templates-store`
6. Save

### Environment Variables

For production, consider using environment variables for Supabase credentials:
- Set in your hosting platform's environment variables
- Update `supabase-config.js` to read from `process.env` or similar

## 🐛 Troubleshooting

### Templates Not Loading

**Problem**: Templates don't appear on the page.

**Solutions**:
1. Check browser console for errors
2. Verify Supabase credentials in `js/supabase-config.js`
3. Ensure templates are marked as `published = true` in database
4. Check RLS policies allow public read access
5. Verify Supabase CDN script is loaded before config script

### Authentication Not Working

**Problem**: Can't log in or sign up.

**Solutions**:
1. Verify Supabase URL and key are correct
2. Check Supabase dashboard > Authentication > Settings
3. Ensure email confirmation is disabled (or check spam folder)
4. Check browser console for specific error messages
5. Verify database schema was created correctly

### Admin Access Denied

**Problem**: Can't access admin dashboard.

**Solutions**:
1. Verify your user role is set to `'admin'` in `profiles` table
2. Log out and log back in after changing role
3. Check that `isAdmin()` function is working correctly
4. Verify RLS policies allow admin access

### Navigation Buttons Not Showing

**Problem**: Login/Signup buttons don't appear.

**Solutions**:
1. Check that `nav-auth.js` is loaded after Supabase config
2. Open browser console for errors
3. Verify `.auth-buttons` containers exist in HTML
4. Wait a moment - fallback buttons appear after 1 second

### Database Errors

**Problem**: SQL errors when running schema.

**Solutions**:
1. Ensure you're in SQL Editor in Supabase dashboard
2. Copy entire SQL script (all statements)
3. Run script in one go (don't split)
4. Check for syntax errors in console
5. Verify you have proper permissions in Supabase

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 📄 License

Copyright © 2024 COWebs Template Store. All rights reserved.

This project is proprietary software. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

## 👤 Author

**Christian Oulikian - COWebs.lb**

- Website: [COWebs.lb](https://cowebslb.com)
- GitHub: [@cowebsLB](https://github.com/cowebsLB)

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the amazing backend platform
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Font Awesome](https://fontawesome.com) for the icon library
- [Google Fonts](https://fonts.google.com) for the Poppins font

## 📞 Support

For support, questions, or issues:

- **Email**: Contact through [COWebs.lb](https://cowebslb.com/contact)
- **GitHub Issues**: [Open an issue](https://github.com/cowebsLB/cowebslb-templatestore/issues)
- **Documentation**: Check `SETUP_GUIDE.md` for quick setup help

---

**Built with ❤️ by COWebs.lb**
