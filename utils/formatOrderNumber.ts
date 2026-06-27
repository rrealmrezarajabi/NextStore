export function formatOrderNumber(orderId: number, createdAt?: Date): string {
  const date = createdAt ? new Date(createdAt) : new Date();

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `ORD-${y}${m}${d}-${String(orderId).padStart(4, "0")}`;
}

const ORDER_NUMBER_PATTERN = /^ORD-\d{8}-(\d+)$/i;

export function parseOrderNumber(orderNumber: string): number | null {
  const match = orderNumber.trim().match(ORDER_NUMBER_PATTERN);
  if (!match) return null;

  const orderId = Number(match[1]);
  return Number.isSafeInteger(orderId) && orderId > 0 ? orderId : null;
}
