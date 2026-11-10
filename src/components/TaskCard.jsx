import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { PRIORITY_LABELS, STATUS_ORDER, STATUS_LABELS } from "../data/tasks";

function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

/**
 * TaskCard is a single job ticket. It owns two small pieces of local
 * UI state (are we editing, and what is typed in the edit field);
 * every real change is sent back up to App via props.
 */
export default function TaskCard({
  task,
  columnKey,
  onMove,
  onDelete,
  onUpdateTitle,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const columnIndex = STATUS_ORDER.indexOf(columnKey);
  const canMoveBack = columnIndex > 0;
  const canMoveForward = columnIndex < STATUS_ORDER.length - 1;

  function startEditing() {
    setDraft(task.title); // always start from the current title
    setEditing(true);
  }

  function cancelEditing() {
    setDraft(task.title); // throw away any unsaved typing
    setEditing(false);
  }

  function saveEditing(event) {
    event.preventDefault();
    const clean = draft.trim();
    if (!clean) return; // never save an empty title
    onUpdateTitle(task.id, clean);
    setEditing(false);
  }

  return (
    <motion.article
      className="card"
      data-p={task.priority}
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="card__top">
        <span className={`badge badge--${task.priority}`}>
          <span className="badge__dot" />
          {PRIORITY_LABELS[task.priority] || task.priority}
        </span>
        <span className="card__code">{task.code}</span>
        <span className="card__top-spacer" />

        {!editing && (
          <div className="card__actions">
            <button
              type="button"
              className="iconbtn"
              onClick={startEditing}
              aria-label={`Edit task: ${task.title}`}
              title="Edit task"
            >
              <Pencil size={15} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="iconbtn iconbtn--danger"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete task: ${task.title}`}
              title="Delete task"
            >
              <Trash2 size={15} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <form className="card__edit" onSubmit={saveEditing}>
          <input
            className="edit-input"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") cancelEditing();
            }}
            autoFocus
            aria-label="Task title"
          />
          <div className="edit-actions">
            <button className="btn btn--primary btn--sm" type="submit">
              <Check size={14} strokeWidth={2.6} />
              Save
            </button>
            <button
              className="btn btn--ghost btn--sm"
              type="button"
              onClick={cancelEditing}
            >
              <X size={14} strokeWidth={2.6} />
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="card__title">{task.title}</h3>

          <div className="card__meta">
            <span>Created {formatDate(task.createdAt)}</span>
            <span className="card__metasep" />
            <span>{STATUS_LABELS[task.status]}</span>
          </div>

          <div className="card__bottom">
            <span className="card__movehint">MOVE</span>
            <span className="card__bottom-spacer" />

            <button
              type="button"
              className="movebtn"
              onClick={() => onMove(task.id, -1)}
              disabled={!canMoveBack}
              aria-label={`Move back to ${
                canMoveBack ? STATUS_LABELS[STATUS_ORDER[columnIndex - 1]] : "—"
              }`}
              title={
                canMoveBack
                  ? `Move to ${STATUS_LABELS[STATUS_ORDER[columnIndex - 1]]}`
                  : "Already in the first column"
              }
            >
              <ArrowLeft size={15} strokeWidth={2.2} />
            </button>

            <button
              type="button"
              className="movebtn"
              onClick={() => onMove(task.id, 1)}
              disabled={!canMoveForward}
              aria-label={`Move forward to ${
                canMoveForward
                  ? STATUS_LABELS[STATUS_ORDER[columnIndex + 1]]
                  : "—"
              }`}
              title={
                canMoveForward
                  ? `Move to ${STATUS_LABELS[STATUS_ORDER[columnIndex + 1]]}`
                  : "Already in the last column"
              }
            >
              <ArrowRight size={15} strokeWidth={2.2} />
            </button>
          </div>
        </>
      )}
    </motion.article>
  );
}
