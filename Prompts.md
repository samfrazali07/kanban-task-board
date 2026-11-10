# Prompts.md — Sprint 05 · Kanban Task Board

**Course:** Prodesk IT — Sprint 05 assignment
**Deliverable:** A professional, light-themed Trello-style Kanban task management board.

---

## 1. Technology Requirements

- React.js
- Vite
- JavaScript (JSX)
- CSS3
- React `useState` and `useEffect`
- LocalStorage
- Lucide React icons

Do not use Create React App, Redux, backend APIs, or unnecessary libraries.

## 2. Design Requirements

Create a premium but simple light-themed dashboard.

Design:

- White and light grey background
- Blue primary accent color
- Professional typography
- Rounded task cards
- Subtle shadows
- Clean spacing
- Responsive layout for desktop and mobile

Avoid unnecessary animations, complicated effects, and excessive sections.

## 3. Main Dashboard

Create three columns:

1. To Do
2. In Progress
3. Done

Each column should display its task count and task cards.

## 4. Functional Requirements

### Add Task

- Add a new task using an input field.
- Include task title and priority selection.
- New tasks should automatically appear in To Do.

### Delete Task

- Every task card should have a delete button.
- Deleting should immediately update the board.

### Move Task

- Add buttons to move tasks between columns.
- Allow moving forward and backward between columns.

### Priority System

Support three priorities:

- High – Red
- Medium – Yellow
- Low – Green

Display priority badges on task cards.

### Edit Task

- Allow users to edit an existing task title.
- Provide Save and Cancel buttons.

### LocalStorage

- Save all tasks in browser LocalStorage.
- Restore tasks automatically after refreshing the page.

### Search

- Add a simple search bar.
- Filter tasks by title in real time.

## 5. React Architecture

Use reusable components:

- `App.jsx`
- `Header.jsx`
- `TaskBoard.jsx`
- `TaskColumn.jsx`
- `TaskCard.jsx`
- `AddTask.jsx`

Keep the application state in the parent component and pass data and functions through props.
Use React state instead of direct DOM manipulation.

## 6. Important Instructions

- All buttons must work.
- No dummy functionality.
- No unnecessary advanced features.
- No backend or API integration.
- No authentication or payment system.
- Keep the source code clean and beginner-friendly.
- Add comments explaining important React logic.
- Ensure there are no console errors.

## 7. GitHub and Deployment

Prepare the project for Vercel deployment.

Ensure:

- Correct `package.json`
- Correct Vite configuration
- Proper `.gitignore`
- `node_modules` is excluded
- `Prompts.md` is included
- `npm run build` executes successfully

## 8. Final Deliverable

Provide a fully working React Kanban Task Board with a professional light UI.
Prioritize functional correctness, clean component architecture, and a polished
user experience over unnecessary complexity.

---

## Design direction (as built)

The board is treated as a **printed IT service-desk job-ticket sheet** rather than a
generic SaaS dashboard: a warm paper-grey surface, a full-bleed stamped blue header
band, ruled hairline column dividers, oversized ghost ordinals (`01 / 02 / 03`)
stamped behind each column title, and every figure set in tabular monospaced type.

- **Palette:** paper `#F4F5F7`, ink `#101828`, Prodesk blue `#1D4ED8` (tint `#EFF4FF`,
  dark `#1637A8`), tinted neutrals `#475467` / `#667085` / `#E4E7EC`.
- **Priority stamps:** High `#D92D20` on `#FEF3F2`, Medium `#B54708` on `#FFFAEB`,
  Low `#027A48` on `#ECFDF3`.
- **Type:** Archivo (UI/labels/buttons), Source Serif 4 (task titles), JetBrains Mono
  (all counts, codes and timestamps — tabular figures).
- **Motion:** small and functional only — cards settle 6px on insert and reorder via
  Framer Motion, wrapped in `MotionConfig reducedMotion="user"` and guarded by a
  `prefers-reduced-motion` media query.
