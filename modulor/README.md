# Modulor

An online learning platform for technical and professional training programs. Modulor enables learners to access modular, self-paced courses with video content and practical workshops, with support for multiple payment methods including mobile money.

## Features

- **Modular Learning Paths**: Organized courses and formations with flexible, self-paced learning
- **Video Courses & Workshops**: Rich content including video lectures and practical exercises
- **User Authentication**: Secure signup and login with email verification
- **Shopping Cart & Checkout**: Browse formations, add to cart, and purchase via multiple payment methods
- **User Dashboard**: Personalized dashboard showing enrolled courses, progress, and portfolio
- **Favorites Management**: Bookmark favorite formations for quick access
- **User Profiles**: Manage user information and learning history
- **Certificate Generation**: Automatic certificate generation upon course completion
- **Responsive Design**: Fully responsive interface optimized for mobile and desktop

## Tech Stack

- **Framework**: Next.js 16.2.4
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Form Handling**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **State Management**: Zustand
- **PDF Generation**: PDFKit

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public-facing pages
│   │   ├── page.tsx       # Home page
│   │   ├── formations/    # Course listings and details
│   │   ├── connexion/     # Login page
│   │   ├── inscription/   # Registration page
│   │   ├── panier/        # Shopping cart
│   │   └── profil/        # User profile
│   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── tableau-de-bord/  # Main dashboard
│   │   ├── mes-favoris/      # Favorite formations
│   │   └── portefeuille/     # User portfolio
│   └── api/               # API routes
│       ├── cart/          # Cart operations
│       ├── favorites/     # Favorites management
│       └── certificates/  # Certificate generation
├── components/            # Reusable React components
├── lib/                   # Utility functions and helpers
└── types/                 # TypeScript type definitions
```

## Environment Variables

Required environment variables in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Development Notes

- This project uses Next.js 16 which has breaking changes from previous versions. See `AGENTS.md` and `node_modules/next/dist/docs/` for important updates
- Form validation uses Zod schema definitions
- State management handled via Zustand stores
- Database queries use Supabase client SDK

## Contributing

When working on this project:
- Run linting before committing: `npm run lint`
- Follow Next.js App Router conventions
- Keep components modular and reusable
- Add proper TypeScript types

## License

Proprietary - Modulor Platform

## Contact

For questions or feedback, contact modulororg@gmail.com
