# NextStore Improvement Plan

Current hiring signal score: **6.5/10**.

Realistic target after completing this plan: **8/10 to 8.5/10 for a junior-to-early-mid frontend portfolio**. The project already has a credible feature set and modern stack; the main gap is production readiness: auth/session resilience, accessibility discipline, API safety, test coverage, and deeper e-commerce behavior.

## 1. Strengthen auth, admin access, and session-expiry handling

**Why it matters**

Auth is one of the highest-signal areas in a real e-commerce app. Right now the frontend mostly provides UX-level protection, but the app does not clearly handle expired sessions, failed refreshes, or admin gating in a production-grade way.

**Files involved**

- `proxy.ts:3` defines auth cookie names.
- `proxy.ts:7` checks only whether an auth cookie exists.
- `proxy.ts:17` allows protected routes when any auth cookie is present.
- `features/auth/components/RequireAdmin.tsx:15` redirects after a client-side profile check.
- `features/auth/components/RequireAdmin.tsx:21` checks `profileQuery.data.role !== "admin"` in the browser.
- `features/auth/components/RequireAuth.tsx:15` redirects on profile query error.
- `lib/api/axios.ts:15` refreshes on 401.
- `lib/api/axios.ts:30` retries the original request after refresh.
- `features/auth/hooks/use-profile-queries.ts:10` defines the profile query.
- `features/auth/hooks/use-profile-queries.ts:14` disables retry for profile requests.
- `features/auth/hooks/use-auth-mutations.ts:50` removes only the profile query on logout.

**What to do**

1. Treat `proxy.ts` as a UX redirect only. Keep it, but document in code that backend endpoints must enforce authorization.
2. Improve `lib/api/axios.ts` so failed refresh does not leave the app in a broken authenticated-looking state.
3. Add a shared session-expiry handler that:
   - clears `profileQueryKeys.all`,
   - clears cart/order/user cached queries that require auth,
   - redirects to `/login` from client-only contexts,
   - avoids redirecting while already on `/login` or `/register`.
4. Prevent refresh race conditions. Use a single in-flight refresh promise so five simultaneous 401 responses trigger one `/auth/refresh` request, then retry waiting requests.
5. If `/auth/refresh` fails, reject all waiting requests and clear cached auth state.
6. Make admin pages assume the backend is authoritative. Keep `RequireAdmin` for UI routing, but ensure every admin service call handles 401/403 and displays a clear "not authorized" state instead of a generic failure.
7. Update logout behavior in `features/auth/hooks/use-auth-mutations.ts` to clear all auth-scoped query data, not only the profile query.

**Definition of done**

- Expired access tokens cause exactly one refresh request when multiple API calls fail at once.
- Failed refresh clears auth-scoped React Query cache and sends the user to `/login`.
- Admin pages do not briefly render protected admin content to non-admin users.
- 401 and 403 responses produce clear UI behavior instead of silent null screens or generic errors.
- Unit tests cover refresh success, refresh failure, and concurrent 401 behavior.

## 2. Fix form accessibility across auth, profile, address, admin, and search forms

**Why it matters**

Accessibility is a direct seniority signal. The Playwright test currently works around broken labels instead of using accessible selectors, which makes the project look junior even though the fix is straightforward.

**Files involved**

- `e2e/auth-route-protection.spec.ts:21` documents that login labels are not associated with inputs.
- `e2e/auth-route-protection.spec.ts:28` uses `getByPlaceholder("jane@example.com")`.
- `features/auth/components/LoginForm.tsx:37` has a label without `htmlFor`.
- `features/auth/components/LoginForm.tsx:40` has the email input without `id`.
- `features/auth/components/LoginForm.tsx:52` has a label without `htmlFor`.
- `features/auth/components/LoginForm.tsx:55` has the password input without `id`.
- `features/auth/components/RegisterForm.tsx:39` starts repeated labels without `htmlFor`.
- `features/auth/components/ProfileForm.tsx:75` starts repeated labels without `htmlFor`.
- `features/addresses/components/AddressForm.tsx:123` starts repeated labels without `htmlFor`.
- `components/shared/Searchbar.tsx:74` has a search input without an accessible label.
- `app/(admin)/admin/users/new/page.tsx:55` starts repeated labels without `htmlFor`.
- `app/(admin)/admin/users/[id]/edit/page.tsx:87` starts repeated labels without `htmlFor`.
- `app/(admin)/admin/categories/new/page.tsx:55` has a category name label without `htmlFor`.
- `app/(admin)/admin/categories/[id]/edit/page.tsx:81` has a category name label without `htmlFor`.

**What to do**

1. Add stable `id` values to every input/select/textarea.
2. Add matching `htmlFor` to every visible label.
3. Add `aria-invalid={!!errors.field}` for invalid fields.
4. Add `aria-describedby` pointing to the validation message element when an error exists.
5. Give each error message a stable id such as `email-error`, `password-error`, or `address-phone-error`.
6. For `Searchbar`, either add a visible label where appropriate or use an `aria-label` such as `aria-label="Search products"`.
7. Update Playwright tests to use `getByLabel()` instead of placeholder selectors.
8. Prefer extracting a small reusable `FormField` component only after fixing the existing forms. Do not introduce a large form abstraction in the same session.

**Definition of done**

- `getByLabel()` works for login, register, profile, address, admin user, category, and search fields.
- Error messages are announced by assistive tech through `aria-describedby`.
- The comment in `e2e/auth-route-protection.spec.ts:21` is removed because the workaround is no longer needed.
- Existing lint, unit tests, and route-protection E2E tests still pass.

## 3. Add high-value tests for real user flows, not only schemas and service wrappers

**Why it matters**

The project currently has passing tests, but most of them cover low-risk code. Hiring teams care more about whether checkout, cart, auth, and admin workflows are protected from regression.

**Files involved**

- `features/cart/services/cart.service.test.ts:20` tests only simple cart fetch behavior.
- `features/cart/services/cart.service.test.ts:43` tests only simple add-to-cart behavior.
- `features/order/services/order.service.test.ts:19` tests formatted order-number search behavior.
- `e2e/auth-route-protection.spec.ts:36` starts guest route-protection tests.
- `e2e/auth-route-protection.spec.ts:75` starts authenticated access tests.
- `playwright.config.ts:65` starts the dev server for E2E tests.
- `package.json:6` defines `test`.
- `package.json:7` defines `test:e2e`.

**What to do**

1. Add component or integration tests for cart behavior:
   - loading state,
   - empty state,
   - quantity increment/decrement,
   - remove item,
   - API failure toast/message.
2. Add checkout tests:
   - empty cart blocks checkout,
   - no address disables place-order button,
   - successful order redirects to `/dashboard/orders/[id]`,
   - failed order shows an error.
3. Add admin product tests:
   - create form validation,
   - edit form pre-populates fields,
   - delete requires confirmation,
   - failed mutation leaves user on the page and shows feedback.
4. Add route tests for 403/admin rejection. If backend seeding makes this hard, mock profile responses for component-level guard tests.
5. Use MSW or a small test-specific API mock layer instead of testing only mocked service return values. The goal is to exercise components and user flows.
6. Keep existing unit tests, but stop treating them as sufficient coverage.

**Definition of done**

- Tests cover the main cart, checkout, admin product, and auth guard flows.
- At least one test verifies visible behavior for API failure.
- Playwright uses accessible selectors after the accessibility work is complete.
- `npm test` remains fast and deterministic.
- `npm run test:e2e` can be run with documented seeded credentials.

## 4. Validate important API responses and centralize API error behavior

**Why it matters**

TypeScript types do not protect the app from malformed backend responses at runtime. A production frontend should fail predictably when API contracts break, especially in product, cart, order, and auth flows.

**Files involved**

- `features/products/services/products.service.ts:37` throws a generic product-list error.
- `features/products/services/products.service.ts:39` casts response JSON to `PaginatedProducts`.
- `features/products/services/products.service.ts:57` casts response JSON to `Product`.
- `features/cart/services/cart.service.ts:4` returns Axios data as `Cart`.
- `features/order/services/order.service.ts:17` creates an order and trusts response data.
- `features/order/services/order.service.ts:22` fetches customer orders and trusts response data.
- `features/order/services/order.service.ts:37` fetches admin orders and trusts response data.
- `lib/api/error-message.ts:12` extracts API error messages.
- `features/products/schemas/product-schema/product.schema.ts:5` defines product schemas.
- `lib/schemas/pagination.schema.ts` defines shared pagination schema.

**What to do**

1. Use existing Zod schemas to parse product responses in `products.service.ts`.
2. Add schemas for cart and order responses if they do not already exist.
3. Parse important responses at service boundaries:
   - product list,
   - product detail,
   - cart,
   - order detail,
   - order list,
   - profile.
4. Create a small helper such as `parseApiResponse(schema, data, fallbackMessage)` to avoid repeating try/catch logic.
5. Improve fetch error messages to include status and endpoint in developer-facing logs while keeping user-facing messages safe.
6. Keep `getApiErrorMessage` for API error display, but make service response parsing failures produce consistent messages.

**Definition of done**

- Product, cart, order, and profile service responses are parsed with Zod or equivalent runtime validation.
- A malformed API response causes a controlled error state, not undefined property crashes in components.
- Tests cover at least one malformed response per critical domain: products, cart, orders, auth/profile.

## 5. Improve React Query cache rules, query enabling, and mutation UX

**Why it matters**

React Query is present, but the usage still looks basic. Production apps avoid unnecessary protected requests, reduce UI flicker, and use cache updates intentionally after mutations.

**Files involved**

- `providers.tsx:6` creates a default `QueryClient` with no global defaults.
- `features/cart/hooks/use-cart-queries.ts:8` defines `useCartQuery` without an `enabled` option.
- `components/shared/NavBar.tsx:29` fetches profile.
- `components/shared/NavBar.tsx:32` fetches cart regardless of whether a user exists.
- `features/cart/hooks/use-cart-mutations.ts:19` invalidates cart after add.
- `features/cart/hooks/use-cart-mutations.ts:43` invalidates cart after update.
- `features/cart/hooks/use-cart-mutations.ts:61` invalidates cart after remove.
- `features/cart/hooks/use-cart-mutations.ts:79` invalidates cart after clear.
- `features/order/hooks/use-order-mutations.ts:18` invalidates all orders after create.
- `features/order/hooks/use-order-mutations.ts:22` invalidates cart using raw `["cart"]`.
- `features/products/hooks/use-product-queries.ts:28` fetches products without placeholder data.
- `features/order/hooks/use-order-queries.ts:43` uses object params directly in query keys.

**What to do**

1. Add global query defaults in `providers.tsx`, such as a modest `staleTime`, limited retries for non-auth queries, and no retry for 401/403 where appropriate.
2. Change `useCartQuery` to accept options, especially `enabled`.
3. In `NavBar.tsx`, call `useCartQuery({ enabled: !!user })` so guests do not fetch `/cart`.
4. Replace raw `["cart"]` in order mutations with `cartKeys.all`.
5. Add `placeholderData` for paginated product/admin/order lists to avoid UI flicker when changing pages.
6. Consider direct cache updates for cart mutations because mutation responses already return the updated `Cart`.
7. Use per-item pending state for cart and address rows instead of disabling all rows during one mutation.

**Definition of done**

- Guests do not request `/cart`.
- Paginated lists keep previous page data visible while the next page loads.
- Cart mutations either update cache directly or invalidate consistently through `cartKeys`.
- Mutating one cart/address item does not disable unrelated items.
- React Query Devtools or logs confirm fewer unnecessary protected requests.

## 6. Make product detail, cart, checkout, and order flows more like real e-commerce

**Why it matters**

The app has e-commerce pages, but the shopping experience is still thin. A stronger portfolio should show product thinking: inventory, quantity, shipping, payment state, and clear order lifecycle behavior.

**Files involved**

- `app/(site)/products/[id]/page.tsx:22` uses only the first product image.
- `app/(site)/products/[id]/page.tsx:41` renders basic product title.
- `app/(site)/products/[id]/page.tsx:46` renders raw price.
- `app/(site)/products/[id]/page.tsx:48` renders add-to-cart.
- `features/cart/components/AddToCartButton.tsx` owns product add behavior.
- `features/cart/components/CartPageClient.tsx:127` renders raw item price.
- `features/cart/components/CartPageClient.tsx:153` renders quantity display.
- `features/cart/components/CartPageClient.tsx:206` links directly to checkout.
- `features/order/components/CheckoutPageClient.tsx:36` creates an order with only address id.
- `features/order/components/CheckoutPageClient.tsx:187` renders a minimal order summary.
- `features/order/components/OrderPaymentButton.tsx` represents payment behavior.
- `features/order/components/OrderDetailsPageClient.tsx` renders customer order details.

**What to do**

1. Product detail:
   - show image gallery/thumbnails, not only the first image,
   - add quantity selector before add-to-cart,
   - display stock/availability if backend supports it,
   - add related products or same-category products,
   - add product metadata for SEO where possible.
2. Cart:
   - format currency consistently with `Intl.NumberFormat`,
   - show subtotal, shipping, tax, and total,
   - disable checkout when stock or cart validation fails,
   - show per-item loading state.
3. Checkout:
   - add an explicit review step,
   - show selected address summary,
   - show payment status and order status clearly,
   - handle "stock changed" or "cart changed" API errors.
4. Orders:
   - support cancellation when order status allows it,
   - show clear status timeline,
   - show payment state separately from fulfillment status.

**Definition of done**

- A user can choose quantity on product detail before adding to cart.
- Currency formatting is centralized and consistent.
- Checkout summary contains items, subtotal, shipping/tax placeholders or real values, and total.
- Product detail uses multiple images when available.
- Order details show a clear lifecycle/status experience.

## 8. Remove broad DTO casts and make form payload construction type-safe

**Why it matters**

The project uses TypeScript, but broad casts around form submission weaken trust in the types. This is a common junior-level shortcut that interviewers notice.

**Files involved**

- `features/products/components/ProductForm.tsx:31` defines `ProductFormValues`.
- `features/products/components/ProductForm.tsx:79` creates the resolver.
- `features/products/components/ProductForm.tsx:103` starts submit handling.
- `features/products/components/ProductForm.tsx:112` constructs the payload.
- `features/products/components/ProductForm.tsx:123` casts payload as `UpdateProductDTO`.
- `features/products/components/ProductForm.tsx:126` casts payload as `CreateProductDTO`.
- `features/products/schemas/product-schema/product.schema.ts:15` defines `createProductSchema`.
- `features/products/schemas/product-schema/product.schema.ts:23` defines `updateProductSchema`.

**What to do**

1. Split create and edit form value types instead of using one broad `ProductFormValues`.
2. Create explicit payload builder functions:
   - `buildCreateProductPayload(values, images): CreateProductDTO`
   - `buildUpdateProductPayload(values, images): UpdateProductDTO`
3. Make those builder functions validate and normalize:
   - numeric price,
   - numeric category id,
   - non-empty image array for create,
   - optional images for update if appropriate.
4. Type the React Hook Form resolver without `as Resolver<ProductFormValues>` if possible. If a cast remains necessary because of library typing, isolate it and explain why in one short comment.
5. Add unit tests for payload builder functions.

**Definition of done**

- `ProductForm.tsx` no longer casts submission payloads as `CreateProductDTO` or `UpdateProductDTO`.
- Payload construction is covered by focused tests.
- Create and edit flows still submit the correct payload shape.
- TypeScript catches invalid product payload construction without relying on broad casts.

## 9. Use confirmations and consistent feedback for destructive actions

**Why it matters**

Real admin/customer tools protect users from accidental destructive actions. Inconsistent delete behavior makes the UX feel unfinished.

**Files involved**

- `components/shared/ConfirmDeleteDialog.tsx:23` defines the shared confirmation dialog.
- `features/products/components/ProductTable.tsx:78` uses the confirmation dialog for product delete.
- `features/addresses/components/AddressesList.tsx:92` renders a delete button.
- `features/addresses/components/AddressesList.tsx:98` deletes an address immediately.
- `app/(admin)/admin/categories/[id]/edit/page.tsx:59` deletes category in edit flow.
- `features/categories/components/CategoriesTable.tsx:19` logs failed delete.
- `app/(admin)/admin/users/[id]/edit/page.tsx:65` logs failed user edit/delete errors.

**What to do**

1. Use `ConfirmDeleteDialog` for address deletion.
2. Use `ConfirmDeleteDialog` for category and user destructive actions.
3. Make confirmation dialog text specific to the domain:
   - product,
   - category,
   - address,
   - user.
4. Ensure failed delete actions display a toast or inline error, not only `console.error` or `console.log`.
5. Disable only the action currently pending where possible, not the entire list.
6. Close the dialog only after successful deletion. Keep it open or show an error if deletion fails.

**Definition of done**

- No customer/admin destructive action happens from a single accidental click.
- Failed delete/update actions show user-visible feedback.
- `console.log`/`console.error` is not the only failure path for destructive operations.
- Product, address, category, and user delete flows behave consistently.

## 10. Add production polish to product/admin list states and pagination

**Why it matters**

The app has many list pages. Smooth loading, error, empty, and paginated states make the difference between a demo and a usable operational tool.

**Files involved**

- `app/(site)/products/page.tsx:22` fetches products and categories.
- `app/(site)/products/page.tsx:27` builds the products page title.
- `app/(site)/products/page.tsx:56` renders the product grid.
- `features/products/components/AdminProductsPageClient.tsx:45` renders product loading state.
- `features/products/components/AdminProductsPageClient.tsx:49` renders product table when data exists.
- `features/products/components/AdminProductsPageClient.tsx:60` renders empty state.
- `components/shared/Pagination.tsx:28` changes page.
- `components/shared/Pagination.tsx:36` calculates visible result range.
- `components/shared/Pagination.tsx:40` calculates page numbers.
- `features/categories/components/CategoriesSidebar.tsx:19` uses a horizontal mobile category list.

**What to do**

1. Add route-level `loading.tsx` and `error.tsx` files for major App Router areas where server fetching can fail.
2. Make product listing resilient to invalid URL params:
   - non-numeric `categoryId`,
   - non-numeric `page`,
   - page greater than total pages.
3. Add empty states that include a useful next action.
4. Use `placeholderData` for admin/client paginated lists.
5. Add accessible labels to pagination buttons, including page numbers such as `aria-label="Go to page 3"`.
6. Preserve search query when selecting a category, or intentionally clear it with clear UX. Right now `CategoriesSidebar` links to `/products?categoryId=...` and drops search params.

**Definition of done**

- Server-fetched product pages have explicit loading/error behavior.
- Bad query params do not produce confusing pages.
- Pagination is accessible and keeps UI stable during transitions.
- Category navigation has intentional query-param behavior.

## Suggested order of work

Session group 1: **Auth and API resilience**

- Item 1
- Item 4
- Item 5

Session group 2: **Accessibility and E2E selector cleanup**

- Item 2
- Item 3, only the auth-route selector updates

Session group 3: **Testing meaningful user flows**

- Item 3, cart/checkout/admin tests

Session group 4: **Product and checkout depth**

- Item 6
- Item 10

Session group 5: **Image and upload production hardening**

- Item 7

Session group 6: **Type safety and destructive action consistency**

- Item 8
- Item 9
