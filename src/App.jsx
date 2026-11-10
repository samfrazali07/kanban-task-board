import { useEffect, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import TaskBoard from "./components/TaskBoard";
import { SEED_TASKS, STATUS_ORDER, makeTask } from "./data/tasks";

// LocalStorage key. Versioned so a future schema change can't read
// stale data from an older build.
const STORAGE_KEY = "prodesk-sprint05-tasks-v1";

/**
 * App is the single source of truth for the whole board.
 * Every piece of state lives here and is passed down through props
 * (state-down / actions-up). No component reaches into the DOM.
 */
export default function App() {
  // --- Tasks -------------------------------------------------
  // Lazy initialiser: React runs this function only once, on the
  // first render, so we read LocalStorage without an extra effect.
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return SEED_TASKS;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : SEED_TASKS;
    } catch (error) {
      // Corrupt JSON / private mode: fall back to the demo board
      // instead of crashing the app.
      return SEED_TASKS;
    }
  });

  // --- Search query -----------------------------------------
  const [query, setQuery] = useState("");

  // Timestamp of the last successful LocalStorage write, shown in
  // the header so the user can see persistence is real.
  const [lastSaved, setLastSaved] = useState(null);

  // --- Persistence ------------------------------------------
  // Runs after every change to `tasks`, so a refresh restores the
  // board exactly as it was left.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setLastSaved(new Date());
    } catch (error) {
      // Storage full or blocked — the board still works in memory.
    }
  }, [tasks]);

  // --- Derived data -----------------------------------------
  // useMemo keeps the filtered list stable between renders that
  // don't change the tasks or the query.
  const visibleTasks = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return tasks;
    return tasks.filter((task) => task.title.toLowerCase().includes(needle));
  }, [tasks, query]);

  // --- Actions ----------------------------------------------
  function handleAdd(title, priority) {
    setTasks((prev) => [makeTask(title, priority), ...prev]);
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  // Move one column left (-1) or right (+1). Clamped to the board.
  function handleMove(id, direction) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const currentIndex = STATUS_ORDER.indexOf(task.status);
        const nextIndex = Math.min(
          STATUS_ORDER.length - 1,
          Math.max(0, currentIndex + direction)
        );
        return { ...task, status: STATUS_ORDER[nextIndex] };
      })
    );
  }

  function handleUpdateTitle(id, title) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task))
    );
  }

  function handleReset() {
    setTasks(SEED_TASKS);
    setQuery("");
  }

  return (
    <MotionConfig reducedMotion="user">
      <Header
        query={query}
        onQueryChange={setQuery}
        onAdd={handleAdd}
        totalCount={tasks.length}
        matchedCount={visibleTasks.length}
        lastSaved={lastSaved}
      />

      <TaskBoard
        tasks={visibleTasks}
        totalCount={tasks.length}
        matchedCount={visibleTasks.length}
        query={query}
        onMove={handleMove}
        onDelete={handleDelete}
        onUpdateTitle={handleUpdateTitle}
        onReset={handleReset}
      />
    </MotionConfig>
  );
}
