// ---------------------------------------------------------------
// Sprint 05 demo data + shared board constants.
// Kept in one tiny module so every component agrees on the same
// column order and labels.
// ---------------------------------------------------------------

export const STATUS_ORDER = ["todo", "progress", "done"];

export const STATUS_LABELS = {
  todo: "To Do",
  progress: "In Progress",
  done: "Done",
};

export const PRIORITY_LABELS = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

// Factory used when the user adds a task. Returns a plain object so
// it can be serialised straight into LocalStorage.
export function makeTask(title, priority) {
  return {
    id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    code: `TK-${String(Date.now()).slice(-4)}`,
    title,
    priority,
    status: "todo",
    createdAt: new Date().toISOString(),
  };
}

// The board is seeded with a realistic Prodesk IT service-desk sprint.
export const SEED_TASKS = [
  {
    id: "seed-1",
    code: "TK-1041",
    title: "Provision VPN access for the new contractor cohort (6 seats)",
    priority: "high",
    status: "todo",
    createdAt: "2026-03-03T09:12:00.000Z",
  },
  {
    id: "seed-2",
    code: "TK-1042",
    title: "Patch CVE-2026-1180 on the staging web tier before release cut",
    priority: "high",
    status: "todo",
    createdAt: "2026-03-03T14:40:00.000Z",
  },
  {
    id: "seed-3",
    code: "TK-1043",
    title: "Rewrite the L1 onboarding runbook for the new ticketing queue",
    priority: "low",
    status: "todo",
    createdAt: "2026-03-04T08:05:00.000Z",
  },
  {
    id: "seed-4",
    code: "TK-1044",
    title: "Migrate shared drive permissions to Entra ID security groups",
    priority: "medium",
    status: "progress",
    createdAt: "2026-03-04T11:22:00.000Z",
  },
  {
    id: "seed-5",
    code: "TK-1045",
    title: "Investigate intermittent SIP call drops reported on Floor 3",
    priority: "medium",
    status: "progress",
    createdAt: "2026-03-05T10:18:00.000Z",
  },
  {
    id: "seed-6",
    code: "TK-1046",
    title: "Decommission legacy print server PS-02 and archive its queues",
    priority: "low",
    status: "done",
    createdAt: "2026-03-02T16:30:00.000Z",
  },
];
