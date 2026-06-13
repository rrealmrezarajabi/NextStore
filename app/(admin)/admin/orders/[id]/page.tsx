import { AdminOrderDetailsPageClient } from "@/features/order/components/AdminOrderDetailsPageClient";

type AdminOrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderPage({ params }: AdminOrderPageProps) {
  const { id } = await params;
  const orderId = Number(id);

  return <AdminOrderDetailsPageClient orderId={orderId} />;
}
