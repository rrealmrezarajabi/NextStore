import { OrderDetailsPageClient } from "@/features/order/components/OrderDetailsPageClient";

type OrderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const orderId = Number(id);

  return <OrderDetailsPageClient orderId={orderId} />;
}
