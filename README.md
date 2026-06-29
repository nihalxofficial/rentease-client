# RentEase — Property Rental & Booking Platform (Client)

RentEase is a full-stack property rental and booking platform where tenants can discover, favourite, and book rental properties, owners can list and manage their properties, and admins can moderate the entire platform. This repository contains the **frontend (client-side)** codebase built with Next.js.

🌐 **Live URL:** [https://rentease-flash.vercel.app](https://rentease-flash.vercel.app)

📁 **Server Repository:** [https://github.com/nihalxofficial/RentEase-Server](https://github.com/nihalxofficial/RentEase-Server)

---

## Key Features

### Authentication & Authorisation
- Email/password registration with name, photo, and secure password
- Google Social Login (role auto-assigned as Tenant)
- JWT-based authentication on all protected routes
- Role-based route protection for Tenant, Owner, and Admin
- Private routes stay accessible on page reload without redirecting to Login

### Public Pages
- **Home Page** — animated banner with search (Location, Property Type, Min/Max Price), featured properties (6 via DB limit), Why Choose Us, dynamic customer reviews, and extra sections (Top Locations, Rental Stats, Recently Added)
- **All Properties Page** — 3-column grid of approved properties with search by location, filter by property type, and price sorting (low→high / high→low) — all handled on the backend
- Framer Motion animations on banner, featured properties, and review sections

### Property Details (Private)
- Add to Favourites (saved to DB, visible in Tenant Dashboard)
- Book Property modal — Move-in Date, Contact Number, additional notes
- Stripe payment integration — creates booking record and transaction on success
- Booking status flow: Pending → Approved / Rejected
- Review system — star rating + written review with name, email, date display

### Tenant Dashboard
- My Bookings — table with property name, booking date, amount paid, booking status, payment status
- Favourites — saved properties with Remove action
- Profile page

### Owner Dashboard
- Analytics cards — Total Earnings, Total Properties, Total Bookings
- Monthly Earnings chart (Recharts line chart, last 12 months)
- Add Property — full form with title, description, location, type, pricing (rent type: Monthly/Weekly/Daily), bedrooms, bathrooms, size, amenities, images
- My Properties — table with Update/Delete actions, status column (Pending/Approved/Rejected), rejection feedback viewable via status button
- Booking Requests — Approve or Reject incoming bookings

### Admin Dashboard
- All Users — full users table with Change Role action
- All Properties — Approve, Reject (with feedback modal), Update, Delete
- All Bookings — platform-wide booking activity monitor
- Transactions — Transaction ID, Property Name, Tenant Name, Owner Name, Amount, Date

### UI/UX
- Fully responsive — mobile, tablet, and desktop
- Consistent colour theme and typography across all pages and dashboard
- Uniform card/grid layout with equal image sizes
- Dark / Light theme toggle via next-themes
- Loading page and custom Error page
- Framer Motion animations throughout
- Pagination on minimum 2 pages

---

## npm Packages Used

| Package | Purpose |
|---|---|
| `next` | React framework with App Router, SSR, and API routes |
| `react` / `react-dom` | Core UI library |
| `@heroui/react` | Primary component library (HeroUI) |
| `tailwindcss` | Utility-first CSS framework |
| `framer-motion` | Animations — banner, cards, section reveals |
| `next-themes` | Dark / Light theme switcher |
| `better-auth` | Authentication (JWT, social login) |
| `@gravity-ui/icons` | Icon set (Gravity UI) |
| `react-icons` | Extended icon library |
| `lucide-react` | Additional icon set |
| `react-fast-marquee` | Marquee/ticker animations |
| `recharts` | Line charts for Owner analytics dashboard |
| `@stripe/stripe-js` | Stripe payment integration (client-side) |
| `react-toast` | Toast notifications |

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & layouts
│   ├── (public)/         # Home, All Properties, Property Details
│   ├── (auth)/           # Login, Register
│   └── dashboard/        # Tenant, Owner, Admin dashboards
├── components/           # Reusable UI components
│   ├── shared/           # Navbar, Footer, PropertyCard, etc.
│   └── ui/               # Buttons, Modals, Forms
├── lib/                  # Utility functions, auth config
└── styles/               # Global styles
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=your_server_base_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=your_app_url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

> Never commit `.env.local` to version control.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/nihalxofficial/RentEase-Client.git
cd RentEase-Client

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.