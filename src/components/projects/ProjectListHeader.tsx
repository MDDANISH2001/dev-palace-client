import React from "react";

interface Props {
  showMine: boolean;
  onToggle: () => void;
  status?: string;
  onStatusChange?: (s?: string) => void;
}

export const ProjectListHeader: React.FC<Props> = ({
  showMine,
  onToggle,
  status,
  onStatusChange,
}) => {
  const user = localStorage.getItem("user");
  const userRole = user ? JSON.parse(user).userType : null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Browse available projects or view only your own.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {userRole === "client" && (
          <div className="flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={onToggle}
              className="px-3 py-1 rounded-md border border-border bg-card text-card-foreground"
            >
              {showMine ? "Show All" : "Show My Projects"}
            </button>
          </div>
        )}

        <select
          value={status ?? ""}
          onChange={(e) => onStatusChange?.(e.target.value || undefined)}
          className="px-3 py-1 rounded-md border border-border bg-card text-card-foreground text-sm"
        >
          <option value="">All status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
        </select>
      </div>
    </div>
  );
};

export default ProjectListHeader;
