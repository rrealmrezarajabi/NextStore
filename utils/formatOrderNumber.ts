export function formatOrderNumber(orderId: number, createdAt?: Date): string {
  const date = createdAt ? new Date(createdAt) : new Date();

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `ORD-${y}${m}${d}-${String(orderId).padStart(4, "0")}`;
}
