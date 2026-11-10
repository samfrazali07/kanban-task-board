import { Search, X } from "lucide-react";
import AddTask from "./AddTask";

// The brand mark is drawn as real vector paths (rounded columns of a
// board) so it stays crisp at any size and can be recoloured.
function BrandMark() {
  return (
    <svg width="25" height="25" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M5.9 6 h2.2 a2.4 2.4 0 0 1 2.4 2.4 v15.2 a2.4 2.4 0 0 1 -2.4 2.4 h-2.2 a2.4 2.4 0 0 1 -2.4 -2.4 v-15.2 a2.4 2.4 0 0 1 2.4 -2.4 z"
        fill="#fff"
      />
      <path
        d="M14.9 6 h2.2 a2.4 2.4 0 0 1 2.4 2.4 v7.7 a2.4 2.4 0 0 1 -2.4 2.4 h-2.2 a2.4 2.4 0 0 1 -2.4 -2.4 v-7.7 a2.4 2.4 0 0 1 2.4 -2.4 z"
        fill="#fff"
        opacity="0.72"
      />
      <path
        d="M23.9 6 h2.2 a2.4 2.4 0 0 1 2.4 2.4 v11.7 a2.4 2.4 0 0 1 -2.4 2.4 h-2.2 a2.4 2.4 0 0 1 -2.4 -2.4 v-11.7 a2.4 2.4 0 0 1 2.4 -2.4 z"
        fill="#fff"
        opacity="0.88"
      />
    </svg>
  );
}

function formatClock(date) {
  if (!date) return "--:--:--";
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

/**
 * Header renders the printed "form header band": brand, sprint meta,
 * the persistence indicator, and the command strip that holds the
 * Add Task composer and the live search field.
 */
export default function Header({
  query,
  onQueryChange,
  onAdd,
  totalCount,
  matchedCount,
  lastSaved,
}) {
  return (
    <header>
      <div className="stamp-bar" />

      <div className="topbar">
        <div className="topbar__inner">
          <div className="brand-row">
            <div className="brand">
              <div className="brand__tile">
                <BrandMark />
              </div>
              <div>
                <span className="brand__eyebrow">Sprint 05</span>
                <h1 className="brand__wordmark">Prodesk IT</h1>
              </div>
            </div>

            <div className="vrule" aria-hidden="true" />

            <div className="sprintmeta">
              <span className="sprintmeta__label">Sprint window</span>
              <span className="sprintmeta__value">03 Mar — 14 Mar 2026</span>
            </div>

            <div className="vrule" aria-hidden="true" />

            <div className="sprintmeta">
              <span className="sprintmeta__label">Board</span>
              <span className="sprintmeta__value">
                {String(totalCount).padStart(2, "0")} tasks / 3 columns
              </span>
            </div>

            <div className="brand-row__spacer" />

            <div className="savechip" title="Tasks are saved to this browser">
              <span className="savechip__dot" />
              <span className="savechip__text">Saved locally</span>
              <span className="savechip__time">{formatClock(lastSaved)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Second ruled row of the same band: composer + search */}
      <div className="strip">
        <div className="strip__inner">
          <AddTask onAdd={onAdd} />

          <div className="search">
            <label className="field__label" htmlFor="task-search">
              Search tasks
            </label>
            <div className="search__box">
              <Search className="search__icon" size={16} strokeWidth={2} />
              <input
                id="task-search"
                className="search__input"
                type="text"
                placeholder="Filter by title…"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  className="search__clear"
                  onClick={() => onQueryChange("")}
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <X size={15} strokeWidth={2.2} />
                </button>
              )}
            </div>
            <span className="search__count">
              Showing <b>{String(matchedCount).padStart(2, "0")}</b> of{" "}
              {String(totalCount).padStart(2, "0")} tasks
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
