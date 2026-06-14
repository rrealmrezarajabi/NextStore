"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardEmptyState } from "@/features/dashboard/components/DashboardEmptyState";

type ProductCategoryDatum = {
  name: string;
  products: number;
};

type ProductCategoryChartProps = {
  data: ProductCategoryDatum[];
};

type ChartTooltipProps<TPayload> = {
  active?: boolean;
  payload?: Array<{ payload: TPayload }>;
};

function ProductTooltip({
  active,
  payload,
}: ChartTooltipProps<ProductCategoryDatum>) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload as ProductCategoryDatum;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm">
      <p className="font-medium text-black">{item.name}</p>
      <p className="text-zinc-500">{item.products} products</p>
    </div>
  );
}

export function ProductCategoryChart({ data }: ProductCategoryChartProps) {
  if (data.length === 0) {
    return (
      <DashboardEmptyState
        title="No product mix yet"
        description="Category distribution will appear once products are added."
      />
    );
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 12 }}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 12 }}
          />
          <Tooltip content={<ProductTooltip />} cursor={{ fill: "#f4f4f5" }} />
          <Bar dataKey="products" fill="#111827" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
