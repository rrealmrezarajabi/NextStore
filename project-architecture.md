This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: node_modules/**, .git/**, .next/**, dist/**, build/**, coverage/**
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
app/
  (admin)/
    admin/
      categories/
        [id]/
          edit/
            page.tsx
          page.tsx
        new/
          page.tsx
        page.tsx
      orders/
        [id]/
          page.tsx
        page.tsx
      products/
        [id]/
          edit/
            page.tsx
          page.tsx
        new/
          page.tsx
        page.tsx
      users/
        [id]/
          edit/
            page.tsx
          page.tsx
        new/
          page.tsx
        page.tsx
      layout.tsx
      page.tsx
  (auth)/
    login/
      page.tsx
    register/
      page.tsx
  (site)/
    about/
      page.tsx
    products/
      [id]/
        page.tsx
      page.tsx
    layout.tsx
    page.tsx
  (user)/
    dashboard/
      addresses/
        [id]/
          page.tsx
        page.tsx
      cart/
        checkout/
          page.tsx
        page.tsx
      orders/
        [id]/
          page.tsx
        page.tsx
      profile/
        page.tsx
      layout.tsx
      page.tsx
  favicon.ico
  globals.css
  layout.tsx
components/
  HomePage/
    FeatureShowcase/
      featureShowcase.data.tsx
      FeatureShowcase.tsx
      index.ts
    LatestProducts/
      index.ts
      LatestProducts.tsx
      ProductsCarousel.tsx
    SocialProof/
      index.ts
      NewsletterCTA.tsx
      TestimonialCard.tsx
      TrustedBy.tsx
    Hero.tsx
  shared/
    Footer.tsx
    ImageUploader.tsx
    LogoutButton.tsx
    NavBar.tsx
    Pagination.tsx
    Searchbar.tsx
  ui/
    button.tsx
    card.tsx
    dropdown-menu.tsx
    sheet.tsx
    sonner.tsx
    spinner.tsx
features/
  addresses/
    components/
      AddressEditPageClient.tsx
      AddressesList.tsx
      AddressForm.tsx
    hooks/
      use-address-mutations.ts
      use-address-queries.ts
    schemas/
      address.schema.ts
    services/
      address.service.ts
    types.ts
  admin/
    components/
      AdminDashboard.tsx
      AdminSidebar.tsx
      ProductCategoryChart.tsx
    lib/
      admin-dashboard-utils.ts
  auth/
    components/
      LoginForm.tsx
      ProfileForm.tsx
      RegisterForm.tsx
      RequireAdmin.tsx
      RequireAuth.tsx
    hooks/
      use-auth-mutations.ts
      use-profile-mutations.ts
      use-profile-queries.ts
    schemas/
      login.schema.ts
      profile.schema.ts
      register.schema.ts
    services/
      auth.service.ts
      profile.services.ts
    types.ts
  cart/
    components/
      AddToCartButton.tsx
      CartPageClient.tsx
    hooks/
      use-cart-mutations.ts
      use-cart-queries.ts
    services/
      cart.service.ts
    types.ts
  categories/
    components/
      AdminCategoriesPageClient.tsx
      CategoriesSidebar.tsx
      CategoriesTable.tsx
    hooks/
      use-category-mutations.ts
      use-category-queries.ts
    schemas/
      category.schema.ts
    services/
      categories.service.ts
    types.ts
  dashboard/
    components/
      DashboardEmptyState.tsx
      DashboardSidebar.tsx
      DashboardStatCard.tsx
      OrderStatusChart.tsx
      UserDashboard.tsx
    lib/
      dashboard-utils.ts
  files/
    services/
      files.service.ts
  order/
    components/
      AdminOrderDetailsPageClient.tsx
      AdminOrdersPageClient.tsx
      AdminOrdersTable.tsx
      CheckoutPageClient.tsx
      OrderDetailsPageClient.tsx
      OrderList.tsx
      OrderPaymentButton.tsx
    hooks/
      use-order-mutations.ts
      use-order-queries.ts
    services/
      order.service.ts
    types.ts
  products/
    components/
      AdminProductsPageClient.tsx
      ProductCard.tsx
      ProductsGrid.tsx
      ProductTable.tsx
    hooks/
      use-product-mutations.ts
      use-product-queries.ts
    schemas/
      product.schema.ts
    services/
      products.service.ts
    types.ts
  users/
    components/
      AdminUsersPageClient.tsx
      UsersTable.tsx
    hooks/
      use-user-mutations.ts
      use-user-queries.ts
    schemas/
      user.schema.ts
    services/
      users.service.ts
    types.ts
lib/
  api/
    axios.ts
    base-url.ts
    error-message.ts
  schemas/
    pagination.schema.ts
  utils.ts
public/
  illustrations/
    checkout.svg
    delivery.svg
    insights.svg
  footer.png
  home.png
  logo.png
  me.jpg
  montana.jpg
.env.example
.gitignore
API_REFERENCE.md
components.json
eslint.config.mjs
middleware.ts
next.config.ts
package.json
postcss.config.mjs
providers.tsx
README.md
tsconfig.json
```
