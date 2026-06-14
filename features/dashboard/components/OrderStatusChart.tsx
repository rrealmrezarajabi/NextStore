"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { DashboardEmptyState } from "./DashboardEmptyState";

type OrderStatusDatum = {
  name: string;
  value: number;
  fill: string;
};

type OrderStatusChartProps = {
  data: OrderStatusDatum[];
};

type ChartTooltipProps<TPayload> = {
  active?: boolean;
  payload?: Array<{ payload: TPayload }>;
};

function StatusTooltip({
  active,
  payload,
}: ChartTooltipProps<OrderStatusDatum>) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload as OrderStatusDatum;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm">
      <p className="font-medium text-black">{item.name}</p>
      <p className="text-zinc-500">{item.value} orders</p>
    </div>
  );
}

export function OrderStatusChart({ data }: OrderStatusChartProps) {
  if (data.length === 0) {
    return (
      <DashboardEmptyState
        title="No order statuses yet"
        description="Order status distribution will appear once orders are created."
      />
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-[minmax(220px,1fr)_minmax(180px,220px)] md:items-center">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              dataKey="value"
              innerRadius={58}
              outerRadius={92}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.fill} />
              ))}
            </Pie>
            <Tooltip content={<StatusTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col justify-center gap-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm text-zinc-700">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-black">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
