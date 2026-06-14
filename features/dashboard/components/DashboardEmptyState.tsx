type DashboardEmptyStateProps = {
  title: string;
  description: string;
};

export function DashboardEmptyState({
  title,
  description,
}: DashboardEmptyStateProps) {
  return (
    <div className="flex min-h-44 items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-white p-6 text-center">
      <div className="max-w-sm space-y-1">
        <p className="text-sm font-semibold text-black">{title}</p>
        <p className="text-sm leading-6 text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
