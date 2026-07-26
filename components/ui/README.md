# `components/ui` – shadcn-style UI primitives

This folder holds **reusable UI components** (e.g. from shadcn/ui or custom primitives like `animated-gradient-background`). Keeping them under `components/ui`:

- Matches the standard **shadcn** project layout so you can add more components with the shadcn CLI.
- Keeps **page/section components** in `components/` and **primitives** in `components/ui`.
- Makes it clear where to drop new UI pieces when you run `npx shadcn@latest add button`, etc.

## Adding shadcn later

If the project wasn’t created with shadcn:

1. **Init (optional):**  
   `npx shadcn@latest init`  
   When prompted, set the component path to **`@/components/ui`** so new components land here.

2. **Tailwind / TypeScript:**  
   This repo already uses Tailwind and TypeScript; no extra setup is required for shadcn.

3. **Add components:**  
   `npx shadcn@latest add button`  
   (and similarly for other components)

New components will be added under `components/ui/` and can be imported as `@/components/ui/...`.
