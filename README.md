# Airtable Wishlist App

A Next.js application that helps you manage your wishlist using Airtable as a backend. Built with modern web technologies and a clean, responsive UI.

## Tech Stack

### Core
- **Next.js 15** - React framework with server-side rendering
- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience

### UI Components
- **shadcn/ui** - Reusable component system built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Modern icon set
- **Radix UI** - Unstyled, accessible components
  - `@radix-ui/react-dialog` - Modal dialogs
  - `@radix-ui/react-toast` - Toast notifications
  - `@radix-ui/react-toggle` - Toggle buttons

### Authentication
- **Clerk** - User authentication and management
  - Protected routes
  - User session handling
  - Sign in/up components
  - User profile management

### Data Storage
- **Airtable** - Backend database
  - Table structure:
    - `title` (text)
    - `description` (text)
    - `url` (url)
    - `purchased` (checkbox)

## Features

- 🔐 Authentication with Clerk
- 📝 CRUD operations for wishlist items
- ✅ Mark items as purchased/unpurchased
- 👁️ Toggle visibility of purchased items
- 🔄 Real-time updates with automatic page revalidation
- 📱 Responsive design
- 🎨 Clean and modern UI
- 🚨 Toast notifications for user feedback

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout with auth wrapper
│   ├── page.tsx           # Landing page
│   └── wishlist/          # Wishlist feature
│       ├── actions.ts     # Server actions
│       └── page.tsx       # Wishlist page
├── components/
│   ├── ui/               # Reusable UI components
│   ├── new-item-dialog.tsx
│   └── purchased-items-toggle.tsx
└── lib/
    └── airtable.ts      # Airtable integration
```

## Environment Variables

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Airtable
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=your_table_name
```

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in your credentials
4. Set up Airtable:
   - Create a new base
   - Create a table with columns: title, description, url, purchased
   - Get your API key and Base ID ([How to find Base ID and Table ID](https://www.highviewapps.com/kb/where-can-i-find-the-airtable-base-id-and-table-id/))
5. Set up Clerk:
   - Create a new application
   - Get your publishable and secret keys
6. Run the development server:
   ```bash
   npm run dev
   ```

## Key Implementation Details

### Authentication Flow
- Middleware-based auth protection
- Public landing page
- Protected wishlist routes
- Automatic redirects for unauthenticated users

### Data Management
- Server actions for CRUD operations
- Automatic page revalidation
- Optimistic updates with error handling
- Toast notifications for operation feedback

### UI/UX Features
- Modal dialog for new items
- Toggle for purchased items visibility
- Responsive grid layout
- Loading states and error handling
- Toast notifications for user feedback

## Using as a Template

This project can serve as a template for similar applications that need:
1. Authentication with Clerk
2. Airtable as a backend
3. Modern UI with shadcn/ui
4. Server actions for data operations
5. Protected routes
6. Toast notifications
7. Modal dialogs
8. Toggle functionality

To use as a template:
1. Clone the repository
2. Update the environment variables
3. Modify the Airtable schema
4. Customize the UI components
5. Add your own features

## License

MIT
