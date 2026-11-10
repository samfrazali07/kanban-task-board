import { ClipboardList, CircleDot, BadgeCheck } from "lucide-react";
import TaskColumn from "./TaskColumn";

// Column definitions live in one place: order, label, stamp numeral
// and the copy shown when a column is empty.
const COLUMNS = [
  {
    key: "todo",
    ordinal: "01",
    title: "To Do",
    icon: ClipboardList,
    emptyTitle: "Queue is clear",
    emptyText: "Nothing queued. Add the first task from the composer above.",
  },
  {
    key: "progress",
    ordinal: "02",
    title: "In Progress",
    icon: CircleDot,
    emptyTitle: "Nothing in flight",
    emptyText: "Move a task here with the arrow button once you start it.",
  },
  {
    key: "done",
    ordinal: "03",
    title: "Done",
    icon: BadgeCheck,
    emptyTitle: "Nothing shipped yet",
    emptyText: "Completed work lands here at the end of the sprint.",
  },
];

const PRIORITY_STAMP = [
  { key: "high", label: "High", color: "var(--high-fg)" },
  { key: "medium", label: "Medium", color: "var(--med-fg)" },
  { key: "low", label: "Low", color: "var(--low-fg)" },
];

/**
 * TaskBoard renders the three ruled columns and the footer ledger.
 * It receives the already-filtered task list, splits it per column
 * and passes everything the cards need down through props.
 */
export default function TaskBoard({
  tasks,
  totalCount,
  matchedCount,
  query,
  onMove,
  onDelete,
  onUpdateTitle,
  onReset,
}) {
  // Group the visible tasks by column in a single pass.
  const grouped = COLUMNS.reduce((acc, column) => {
    acc[column.key] = tasks.filter((task) => task.status === column.key);
    return acc;
  }, {});

  const doneCount = grouped.done.length;

  return (
    <main className="board">
      <div className="board__inner">
        <div className="board__grid">
          {COLUMNS.map((column) => (
            <TaskColumn
              key={column.key}
              column={column}
              tasks={grouped[column.key]}
              onMove={onMove}
              onDelete={onDelete}
              onUpdateTitle={onUpdateTitle}
            />
          ))}
        </div>

        {/* Ledger footer: priority totals in tabular figures. */}
        <footer className="footer">
          <div className="footer__inner">
            <div className="footer__stats">
              <div className="stat">
                <span className="stat__num">
                  {String(totalCount).padStart(2, "0")}
                </span>
                <span className="stat__label">
                  {query ? "Total · filtered below" : "Total tasks"}
                </span>
              </div>

              {PRIORITY_STAMP.map((stamp) => (
                <div className="stat" key={stamp.key}>
                  <span
                    className="stat__swatch"
                    style={{ background: stamp.color }}
                  />
                  <span className="stat__num">
                    {String(
                      tasks.filter((task) => task.priority === stamp.key).length
                    ).padStart(2, "0")}
                  </span>
                  <span className="stat__label">{stamp.label}</span>
                </div>
              ))}

              <div className="stat">
                <span className="stat__num">
                  {String(doneCount).padStart(2, "0")}
                </span>
                <span className="stat__label">Completed</span>
              </div>
            </div>

            <div className="footer__spacer" />

            <button type="button" className="linkbtn" onClick={onReset}>
              Reset demo data
            </button>

            <p className="footer__sig">
              Prodesk IT · Sprint 05 · React + Vite + LocalStorage
              <br />
              {query
                ? `Filtering “${query}” — ${matchedCount} of ${totalCount} tasks`
                : `${matchedCount} of ${totalCount} tasks shown`}
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
