# NextStore Frontend

NextStore is a modern ecommerce frontend built with Next.js, TypeScript, React Query, Tailwind CSS, and a feature-based architecture. It includes a public storefront, authentication, customer dashboard, shopping cart, checkout flow, and an admin panel for managing products, categories, users, and orders.

![NextStore home page](./public/home.png)

## Highlights

- Public ecommerce storefront with home, product listing, product details, search, category filtering, and pagination
- Authentication flow with login, registration, logout, protected user routes, and admin-only routes
- Customer dashboard for profile management, addresses, cart, checkout, and order history
- Admin dashboard for products, categories, users, orders, and order status management
- Server-side product fetching for public pages
- Client-side mutations and cached async state with TanStack React Query
- Form validation with React Hook Form and Zod
- Reusable UI components powered by Tailwind CSS, Shadcn UI, shadcn-style primitives, and Lucide icons
- Axios API client with credentials enabled and automatic refresh-token retry handling

## Tech Stack

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4, Shadcn UI, Lucide React
- **Forms:** React Hook Form, Zod
- **Data fetching:** Fetch API for server components, Axios for client requests, TanStack React Query
- **Notifications:** Sonner
- **Tooling:** ESLint, npm

## Project Structure

```txt
app/
  (site)/          Public storefront routes
  (auth)/          Login and registration routes
  (user)/          Customer dashboard routes
  (admin)/         Admin dashboard routes
components/
  HomePage/        Landing page sections
  shared/          Shared app components
  ui/              Reusable UI primitives
features/
  auth/            Auth services, hooks, schemas, and components
  products/        Product services, hooks, schemas, and UI
  categories/      Category services, hooks, schemas, and UI
  cart/            Cart services, hooks, and UI
  order/           Order services, hooks, and UI
  addresses/       Address services, hooks, schemas, and UI
  users/           User management services, hooks, schemas, and UI
lib/
  api/             API client and base URL
  schemas/         Shared schemas
```

## Core Features

### Storefront

- Product grid with responsive cards
- Product detail pages
- Category sidebar
- Product search
- Pagination
- Latest products carousel on the home page

### Authentication

- Register and login pages
- Cookie-based auth through the backend
- Protected customer dashboard
- Admin route guard
- Automatic token refresh retry for authenticated API requests

### Customer Dashboard

- Profile management
- Address list and edit flow
- Cart quantity updates
- Clear cart and remove item actions
- Checkout flow
- Order list and order detail pages

### Admin Panel

- Admin overview page
- Product CRUD pages
- Category CRUD pages
- User CRUD pages
- Orders table
- Order detail page
- Order status update flow

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- NextStore backend running locally

The frontend currently expects the API to be available at:

```txt
http://localhost:4000/api/v1
```

The API base URL is configured in:

```txt
lib/api/base-url.ts
```

### Installation

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## API Reference

This frontend is designed to work with the companion NextStore REST API.

Default backend URL:

```txt
http://localhost:4000/api/v1
```

Swagger UI:

```txt
http://localhost:4000/api/docs
```

See [API_REFERENCE.md](./API_REFERENCE.md) for request and response examples.

## Important Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/products` | Product listing, search, category filter, pagination |
| `/products/[id]` | Product detail page |
| `/login` | Login page |
| `/register` | Register page |
| `/dashboard` | Customer dashboard |
| `/dashboard/profile` | Customer profile |
| `/dashboard/addresses` | Customer addresses |
| `/dashboard/cart` | Shopping cart |
| `/dashboard/cart/checkout` | Checkout |
| `/dashboard/orders` | Customer orders |
| `/admin` | Admin dashboard |
| `/admin/products` | Admin product management |
| `/admin/categories` | Admin category management |
| `/admin/users` | Admin user management |
| `/admin/orders` | Admin order management |

## What This Project Demonstrates

- Building a real multi-section ecommerce frontend with Next.js App Router
- Organizing code by business feature instead of only by component type
- Handling authenticated API requests with cookies and refresh-token retry logic
- Combining server-rendered public pages with client-side dashboard interactions
- Managing async server state with React Query
- Creating reusable form, table, navigation, pagination, and dashboard components
- Implementing role-based route protection for customer and admin areas

## Notes

- The frontend depends on the backend being available for product, auth, cart, address, user, and order data.
- Server-rendered pages that fetch products require the API to be reachable during production builds.
- The current API URL is hard-coded in `lib/api/base-url.ts`; moving it to an environment variable is recommended before deployment.

## Author

Built as a full ecommerce frontend portfolio project.
