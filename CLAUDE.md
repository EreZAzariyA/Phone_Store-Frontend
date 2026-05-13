# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server (http://localhost:3000)
npm run build    # Production build
npm test         # Run tests (Jest / React Testing Library)
```

No linting script is configured in package.json; ESLint runs implicitly via `react-scripts`.

## Architecture Overview

React 18 + TypeScript SPA bootstrapped with Create React App, deployed on Vercel.

### State Management — Redux Toolkit (`src/Redux/`)

Four slices in `src/Redux/slicers/`:
- `auth-slicer` — JWT token + decoded user; persists token to/from `localStorage`
- `store-slicer` — top phones and top brands for the homepage
- `shopping-cart-slicer` — full cart object with products array
- `orders-slicer` — order list state

`RootState` and `AppDispatch` are exported from `src/Redux/Store.ts`.

### Auth & JWT

- `AuthServices` posts credentials, receives a JWT string, dispatches `loginAction(token)`.
- `auth-slicer` decodes the token with `jwt-decode` and stores the `user` object from the payload.
- `UserModel.roleId` is a `Role` enum (`User = 1`, `Admin = 2`). The `isAdmin()` helper in `src/Utils/helpers.ts` is the canonical role check used throughout.
- `InterceptorsService` attaches `Authorization: Bearer <token>` to every axios request. It is initialised once in `src/index.tsx`.

### Routing (`src/App.tsx`)

Routes are conditionally rendered based on Redux auth state — no route guard wrappers:
- Public: `/`, `/phones`, `/phone/:phoneId`, `/brands`, `/brands/:brand_id`, `/about`
- Authenticated users: `/cart`, `/order`, `/my-orders`, `/order-detail/:orderId`
- Unauthenticated: `/auth/login`, `/auth/register`
- Admin only: `/admin/top-phones`, `/admin/top-brands`, `/admin/orders`, `/admin/order/:orderId`, `/admin/guest-orders`

Unknown routes redirect to `/`.

### Services (`src/Services/`)

Each domain has a service class that calls axios and dispatches Redux actions directly:
- `AuthServices` — register / login / logout
- `PhonesServices` — CRUD for phones
- `BrandsServices` — CRUD for brands
- `ShoppingCartsServices` — cart fetch / add / update / remove / clear
- `OrdersServices` — create orders, fetch by user/guest/all, update status
- `StoreServices` — top-three phones, top brands for homepage
- `NotifyService` — wraps `notyf` for success/error toasts

### API Configuration (`src/Utils/Config.ts`)

- Development: `https://localhost:7273/api/` (ASP.NET Core backend)
- Production: `process.env.REACT_APP_BASE_URL` (set in Vercel environment variables)

### UI

- **react-bootstrap** for layout, `Navbar`, `Badge`, `Button`, `Dropdown`, `Modal`
- **antd** (Ant Design v5) used in some pages alongside Bootstrap
- **react-icons** for icons
- **notyf** for toast notifications (via `NotifyService`)
- **@paypal/react-paypal-js** for payment in the order flow
- CSS: `src/index.css` for global/custom variables; component-level `.css` files co-located where used

### Data Initialisation

`Header.tsx` fetches all phones and brands on mount (every page load) and the user's shopping cart if logged in as a regular user. This is the primary data-loading entry point for the app.
