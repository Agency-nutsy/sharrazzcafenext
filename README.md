# Sharrazz Cafe - Rooftop Dining & Lounge

This is the official codebase for the Sharrazz Cafe website.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the files.

3. **Build for production**:
   ```bash
   npm run build
   ```

## Editing Content

All business-specific configuration and contact information (phone numbers, addresses, social links, menu, etc.) have been centralized for easy editing. 

- **Contact Info & Socials**: Edit `lib/siteConfig.ts` to change the phone numbers, addresses, emails, and social media links. These changes will automatically reflect across the Navbar, Footer, and Contact pages.
- **Menu Items**: Edit `app/menu/page.tsx` or the associated data files to update the food and beverage offerings.

## Tech Stack
- Next.js 16 (App Router)
- React
- Tailwind CSS
- Framer Motion
