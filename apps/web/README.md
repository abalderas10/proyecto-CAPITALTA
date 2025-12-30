# CAPITALTA Web Application

This is the frontend application for CAPITALTA, built with Next.js, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Date Handling**: date-fns

## Project Structure

```
apps/web/
├── src/
│   ├── app/                 # App Router pages and layouts
│   ├── components/          # React components
│   │   ├── features/        # Feature-specific components (e.g., Calculator)
│   │   ├── layout/          # Layout components (Header, Sidebar)
│   │   └── ui/              # Reusable UI components (shadcn/ui)
│   ├── lib/                 # Utilities and helpers
│   └── styles/              # Global styles and Tailwind configuration
└── public/                  # Static assets
```

## UI Components (shadcn/ui)

The project uses a customized version of shadcn/ui components. All UI components are located in `src/components/ui`.

### Implemented Components

- **Form**: Input, Select, Textarea, Checkbox, RadioGroup, Switch, Slider, Combobox, DatePicker
- **Feedback**: Alert, Dialog, Toast, Popover
- **Data Display**: Card, Avatar, Badge, Separator, Skeleton
- **Navigation**: Tabs, Accordion, Breadcrumb, NavigationMenu
- **Layout**: Header, Sidebar

### Usage

Import components directly from `@/components/ui/[component-name]`.

```tsx
import { Button } from "@/components/ui/button"

export default function MyComponent() {
  return <Button>Click me</Button>
}
```

### Accessibility

All components are built on top of Radix UI primitives, ensuring WAI-ARIA compliance and keyboard navigation support.

## Development

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) (or the port shown in terminal) with your browser.

## UI Demo

A demonstration of all implemented UI components is available at `/ui-demo`.
Visit [http://localhost:3000/ui-demo](http://localhost:3000/ui-demo) to see the design system in action.

## Theme & Branding

The design system uses CSS variables for theming, defined in `src/styles/globals.css`.
Tailwind configuration in `tailwind.config.ts` maps these variables to utility classes.

### Colors
- **Primary**: Brand Teal (`#008080`)
- **Secondary**: Brand Orange (`#FF7F50`)
- **Accent**: Light variants for backgrounds
- **Destructive**: Red for errors/warnings

## Key Features

- **Loan Calculator**: Interactive calculator for different loan types (Constructora, Persona Física, PyME).
- **Responsive Layout**: Custom Sidebar and Header components.
- **Dynamic Content**: Page content driven by configuration files.

## Contributing

1. Ensure new components follow the shadcn/ui pattern (Radix UI + Tailwind + `cva`).
2. Use the `cn` utility for class merging.
3. Mark client components with `"use client"` when using hooks or interactivity.
