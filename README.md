## Stack

<div style="display: flex; gap: 10pxl">
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/github.png" alt="Github" width="50">
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/html.png" alt="HTML" width="50">
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png" alt="Tailwind" width="50">
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" alt="React" width="50">
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" alt="Typscript" width="50">
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/npm.png" alt="NPM" width="50">
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png" alt="Node" width="50">
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/next_js.png" alt="Next" width="50">
<img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/playwright.png" alt="Playwright" width="50">
<img src="vercel.svg" alt="Vercel" width="50">
<img src="" alt="" width="50">
</div>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Also, project is deployed at [https://equipmaint.vercel.app](https://equipmaint.vercel.app).

## Features

### Equipment Form

<!-- <img src="/public/images/equipment-form.png"> -->

- Zod validation for Name (required, min 3 chars)
- Zod validation for location (required)
- Zod validation for Department (dropdown from enum)
- Zod validation for Model (required)
- Zod validation for Serial Number (required, alphanumeric)
- Zod validation for Install Date (required, must be past date)
- Zod validation for Status (dropdown from enum)

### Maintenance Form

- Zod validation for Equipment (dropdown selection, required)
- Zod validation for Date (required, not future date)
- Zod validation for Type (dropdown from enum)
- Zod validation for Technician (required, min 2 chars)
- Zod validation for Hours Spent (required, postive number, max 24)
- Zod validation for Description (required, min 10 chars)
- Zod validation for Parts Replaced (optional, dynamic array of strings)
- Zod validation for Priority (dropdown from enum)
- Zod validation for Completion Status (dropdown from enum)

### Equipment Table

- Display all equipment with columns for all fields
- Sorting and filtering for columns
- Status based row coloring
-

### Maintenance Table

- Display all maintenance records with columns for all fields
- Sorting and filtering for columns
- Grouping by equipment option

### Dashboard

- Equipment status breakdown pie chart
- Maintenance hours by department (bar chart)
- Recent maintenance activities

## Techinical Decisions

### React-Hook-Form

- [https://react-hook-form.com/](https://react-hook-form.com/)
- After reading through the documentation, it appeard to be the perfect solution for the forms required
- The library integrates well with Zod for validation
- The implementation was fairly straight-forward and simple

### App Router

- [https://nextjs.org/docs/app](https://nextjs.org/docs/app)
- I wanted to implement a project with the newer approach so I can gain experience and also better comprehend the structure

## Known Issues

- Maintenance Records Table does not pull the equipment name from the Equipment Data
- Playwright tests not comppleted
- Extra credit not completed
