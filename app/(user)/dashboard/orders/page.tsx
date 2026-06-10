import { OrdersList } from "@/features/order/components/OrderList";


export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>
      <OrdersList />
    </div>
  );
}
