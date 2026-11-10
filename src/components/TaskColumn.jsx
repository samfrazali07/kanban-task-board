import { AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";

/**
 * TaskColumn renders one ruled column of the board: the stamped
 * ordinal + title + count header, then either the task cards or a
 * designed empty state.
 */
export default function TaskColumn({
  column,
  tasks,
  onMove,
  onDelete,
  onUpdateTitle,
}) {
  const Icon = column.icon;

  return (
    <section className="column" aria-label={column.title}>
      <div className="column__head">
        {/* Ghost ordinal stamped behind the title. */}
        <span className="column__ordinal" aria-hidden="true">
          {column.ordinal}
        </span>

        <div className="column__titlerow">
          <h2 className="column__title">{column.title}</h2>
          <span className="count" data-status={column.key}>
            {String(tasks.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="column__list">
        {tasks.length === 0 ? (
          <div className="empty">
            <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
            <span className="empty__title">{column.emptyTitle}</span>
            <p className="empty__text">{column.emptyText}</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                columnKey={column.key}
                onMove={onMove}
                onDelete={onDelete}
                onUpdateTitle={onUpdateTitle}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
