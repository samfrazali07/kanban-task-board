import { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";

// Three priorities, in the order they appear in the control.
const PRIORITIES = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

/**
 * AddTask is the composer in the command strip.
 * It owns only its own form state; the actual task list is updated
 * by calling the onAdd prop passed down from App.
 */
export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    // Prevent the browser from reloading the page on submit.
    event.preventDefault();

    const clean = title.trim();
    if (!clean) {
      setError("Enter a task title before adding it.");
      return;
    }

    onAdd(clean, priority); // hand the new task up to App
    setTitle(""); // reset the field for the next entry
    setError("");
  }

  return (
    <form className="addtask" onSubmit={handleSubmit} noValidate>
      <div className="field field--grow">
        <label className="field__label" htmlFor="new-task-title">
          New task
        </label>
        <input
          id="new-task-title"
          className={`input${error ? " input--error" : ""}`}
          type="text"
          placeholder="e.g. Rotate the SSL certificate on portal.prodesk.local"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) setError("");
          }}
          autoComplete="off"
        />
        {error && (
          <span className="formhint" role="alert">
            <AlertCircle
              size={12}
              strokeWidth={2.4}
              style={{ display: "inline", verticalAlign: "-2px", marginRight: 5 }}
            />
            {error}
          </span>
        )}
      </div>

      {/* Priority is a segmented control of real buttons, kept in
          state as a single string value. */}
      <div className="field">
        <span className="field__label">Priority</span>
        <div className="segment" role="group" aria-label="Task priority">
          {PRIORITIES.map((option) => (
            <button
              key={option.value}
              type="button"
              className="segment__btn"
              data-p={option.value}
              aria-pressed={priority === option.value}
              onClick={() => setPriority(option.value)}
            >
              <span className="segment__dot" />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button className="btn btn--primary" type="submit">
        <Plus size={16} strokeWidth={2.6} />
        Add to To Do
      </button>
    </form>
  );
}
