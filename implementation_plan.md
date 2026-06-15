# Implementation Plan - Leads Pipeline Management

This plan details the design and implementation of the **Leads Pipeline Management** screen with draggable kanban columns, lead assignment tables, and tab views matching the user's specific visual guidelines.

## Proposed Changes

### 1. Sidebar Collapsible Menu
#### [MODIFY] [Sidebar.tsx](file:///c:/Saiful/dominik_frontend/src/components/Sidebar.tsx)
- Add state: `const [leadsExpanded, setLeadsExpanded] = React.useState(true)`.
- Convert the single `Leads` menu item into a collapsible menu:
  - Clicking on "Leads" expands/collapses the submenu.
  - Submenu items:
    - **Pipeline** (mounts the new `LeadsPipelinePage` / sets activeTab to `leads_pipeline` or `leads`).
    - **Data Analysis** (mounts the existing `LeadsPage` / sets activeTab to `analytics_customers_leads`).

### 2. Leads Pipeline Page Component
#### [NEW] [LeadsPipelinePage.tsx](file:///c:/Saiful/dominik_frontend/src/components/LeadsPipelinePage.tsx)
Create a new interactive page component containing:
1. **Interactive Subtabs**:
   - `Leads da Gestire` (Leads to Manage): Lists new incoming leads with quick actions (Assign to, Delete, Add task, See more).
   - `Actual Pipeline` (Kanban Board): Lists cards categorized into draggable columns/stages (`To Contact`, `Call To_fix`, `Fixed Call`, `Follow Up`, `Waiting for Decision`, `Won`, `Lost`).
   - `Settings`: Dummy configuration tab.
2. **Draggable & Movable Board**:
   - Implement HTML5 Drag and Drop APIs inside React to allow moving cards between columns dynamically.
   - Dropping a card in a new column updates the card's stage in state, updates the badge counts in real-time, and triggers visual drag-over animations.
3. **Incoming Leads Assign & Bulk Actions**:
   - Select multiple leads via checkboxes to show bulk actions: "Group Assign" and "Group Delete".
   - Days-since-received filters: "All", "Less than 3 days", "More than 3 days".
4. **Figma CSS Spec as Tailwind**:
   - Title header bar with functioning `Trash` (red), `Refresh Data` (grey), and `Export Report` (blue) buttons.
   - Cards styled with custom priority color labels (`#FFE5ED` background + `#FF6692` text for high priority/3d ago, `#FFF9E5` + `#FFD648` for warning/2d ago, `#EBFAF0` + `#36C76C` for success/1d ago).

### 3. Main Routing Integration
#### [MODIFY] [page.tsx](file:///c:/Saiful/dominik_frontend/src/app/page.tsx)
- Import `LeadsPipelinePage` from `../components/LeadsPipelinePage`.
- Handle cases `leads` and `leads_pipeline` inside the rendering logic to return the new `<LeadsPipelinePage setActiveTab={setActiveTab} />` component.

## Verification Plan

### Automated Tests
- Build verification via Next.js Turbopack compiler:
  ```powershell
  cmd /c npm run build
  ```

### Manual Verification
- Open the dev server (`npm run dev`), go to the dashboard:
  - Click **Leads** in the sidebar. Confirm it expands to show **Pipeline** and **Data Analysis**.
  - Under **Pipeline** (Leads Management):
    - Under the **Leads da Gestire** tab: Select multiple checkable leads, check that the "Group Assign" and "Group Delete" actions show up. Filter by received days. Click the three dots menu to test the dropdown context actions (See more, Add task, Delete).
    - Under the **Actual Pipeline** tab: Drag lead cards (e.g. Alessandro Bianchi, Elena Conti) across columns and drop them. Confirm that column counts update dynamically. Toggle ongoing/completed statuses and priority pills.
  - Click **Data Analysis** in the sidebar to verify it correctly navigates to the existing leads chart analysis screen.
