import { AddressForm } from "@/features/addresses/components/AddressForm";
import {
  AddressesHeader,
  AddressesList,
} from "@/features/addresses/components/AddressesList";

const AddressesPage = () => {
  return (
    <div className="space-y-6">
      <AddressesHeader />
      <AddressesList />
      <div id="new-address">
        <AddressForm />
      </div>
    </div>
  );
};

export default AddressesPage;
