import React, { useMemo, useState } from "react";
import ProjectListHeader from "../../components/projects/ProjectListHeader";
import ProjectCard from "../../components/projects/ProjectCard";
import Pagination from "../../components/projects/Pagination";
import { useGetProjects } from "../../apis/hooks/shared-query.hook";

export const ProjectList: React.FC = () => {
  // UI state
  const [showMine, setShowMine] = useState(false);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const limit = 10;

  // get current user id from localStorage (set by auth hooks)
  const currentUser =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const currentUserId = useMemo(() => {
    try {
      return currentUser ? JSON.parse(currentUser)._id : null;
    } catch {
      return null;
    }
  }, [currentUser]);

  const params = useMemo(
    () => ({
      page,
      limit,
      status,
      clientId: showMine ? currentUserId ?? undefined : undefined,
    }),
    [page, limit, status, showMine, currentUserId]
  );

  const { data, isLoading, isError, refetch } = useGetProjects(params);

  const projects = data?.data.projects ?? [];
  const pagination = data?.data.pagination;

  return (
    <div className="container mx-auto p-4">
      <ProjectListHeader
        showMine={showMine}
        onToggle={() => {
          setShowMine((s) => !s);
          setPage(1);
        }}
        status={status}
        onStatusChange={(s) => {
          setStatus(s);
          setPage(1);
        }}
      />

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-muted animate-pulse h-32"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-4 text-center text-destructive">
          <p>Failed to load projects.</p>
          <button
            className="mt-2 px-3 py-1 rounded-md border border-border bg-card text-card-foreground"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && projects.length === 0 && (
        <div className="p-6 text-center text-muted-foreground">
          No projects found.
        </div>
      )}

      {!isLoading && !isError && projects.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <ProjectCard
                key={p._id}
                project={p}
                currentUserId={currentUserId}
              />
            ))}
          </div>

          {pagination && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(pg) => setPage(pg)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProjectList;
