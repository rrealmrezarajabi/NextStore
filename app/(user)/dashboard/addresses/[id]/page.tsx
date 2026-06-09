import { AddressEditPageClient } from "@/features/addresses/components/AddressEditPageClient";

type AddressPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AddressPage({ params }: AddressPageProps) {
  const { id } = await params;
  const addressId = Number(id);

  return <AddressEditPageClient addressId={addressId} />;
}
