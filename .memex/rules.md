# Nextjs with Clerk auth and Airtable store Documentation

## Project Overview
Airtable Wishlist App is a Next.js application that helps users manage their wishlist using Airtable as a backend. The app features authentication with Clerk, CRUD operations for wishlist items, and a clean, responsive UI built with modern web technologies.

## Project Structure
```
/
├── .git/                  # Git repository
├── .gitignore             # Git ignore file
├── .memex/                # Memex universe configuration directory
│   ├── config.yaml        # Project metadata for Memex
│   └── rules.md           # Project documentation and guidelines
├── public/                # Static assets
├── src/                   # Source code
│   ├── app/               # Next.js app router
│   │   ├── api/           # API routes
│   │   ├── wishlist/      # Wishlist feature
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Landing page
│   ├── components/        # React components
│   │   ├── ui/            # UI components library
│   │   ├── new-item-dialog.tsx
│   │   └── purchased-items-toggle.tsx
│   ├── lib/               # Utility functions
│   │   ├── airtable.ts    # Airtable integration
│   │   └── utils.ts       # Helper utilities
│   └── middleware.ts      # Next.js middleware (auth)
├── .env.local             # Environment variables
├── components.json        # shadcn/ui configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies
├── postcss.config.mjs     # PostCSS configuration
├── README.md              # Project documentation
└── tsconfig.json          # TypeScript configuration
```

## Memex Universe
The `.memex` directory is used by the Memex universe, a template system for project management. The `config.yaml` file stores metadata about the project, while `rules.md` (this file) provides instructions and documentation for working with this project. These files are used by the Memex agent to guide development and iteration on the project.

## Prerequisites
- Node.js 18.0+ (LTS recommended)
- npm or yarn
- Airtable account
- Clerk account

## Tech Stack
- **Next.js 15** - React framework with server-side rendering
- **React 19** - UI library
- **TypeScript** - Type safety
- **Clerk** - Authentication
- **Airtable** - Backend database
- **shadcn/ui** - Component library
- **Radix UI** - Unstyled, accessible components
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library

## Setup Instructions

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Create `.env.local` and fill in your Environment Variables
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
7. Set up Vercel for deployment:
   - Create a new application
   - Add Environment variables
   - Setup custom Install Command in project Settings/Build and Deployment/Framework Settings
   ```bash
   npm install --legacy-peer-deps
### Clone and Install
```bash
git clone <repository-url>
cd nextjs_clerk_airtable
npm install --legacy-peer-deps
```

### Environment Variables
Create a `.env.local` file with the following variables:
```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Airtable
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=your_table_name
```

### Airtable Setup
1. Create a new Airtable base
2. Create a table with columns: title, description, url, purchased
3. Get your API key and Base ID

### Clerk Setup
1. Create a new Clerk application
2. Configure authentication (sign-in, sign-up)
3. Get your publishable and secret keys

### Run Development Server
```bash
npm run dev
```

## Deployment

### Vercel CLI Installation

```bash
npm i -g vercel
```

### Vercel Deployment

```bash
vercel
```

## Development Guidelines

### Component Development
- When using client-side hooks (useState and useEffect) in a component, always add the "use client" directive at the top of the file
- Use shadcn/ui components for consistent UI
- Use Lucide React for icons
- Use Tailwind CSS for styling

### UI/UX Guidelines
- Create beautiful, production-worthy designs
- Avoid cookie-cutter templates
- Use stock photos from Unsplash where appropriate (only valid URLs)
- Ensure responsive design for all screen sizes

### Code Quality
- Avoid code that triggers the error: "Warning: Extra attributes from the server: %s%s""class,style"
- Read and understand code before making changes
- Ask for clarification when unsure

### Running the Project
- Always run the project in the background (non-blocking)
- Ensure all dependencies are installed before running


## Troubleshooting
- For authentication issues, check Clerk configuration
- For data issues, verify Airtable API key and permissions
- For UI issues, check component implementation and CSS

### 1. Airtable Integration

#### Correct Record Creation
When creating records in Airtable, send the fields directly without wrapping them in a `fields` object:

```javascript
// ❌ INCORRECT
await table.create({
  fields: {
    name: 'Item Name',
    description: 'Description'
  }
});

// ✅ CORRECT
await table.create({
  name: 'Item Name',
  description: 'Description'
});
```