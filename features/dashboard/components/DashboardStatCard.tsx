import type { LucideIcon } from "lucide-react";

type DashboardStatCardProps = {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
};

export function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          <p className="text-2xl font-semibold tracking-tight text-black">
            {value}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {description ? (
        <p className="mt-3 text-xs leading-5 text-zinc-500">{description}</p>
      ) : null}
    </div>
  );
}
