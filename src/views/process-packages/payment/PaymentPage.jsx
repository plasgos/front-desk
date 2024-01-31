import React from "react";
import LayoutProcessPackages from "../LayoutProcessPackage";
import { FilterSectionResi } from "../_components/FilterSectionResi";
import { TablePayment } from "./TablePayment";

const PaymentPage = () => {
  return (
    <LayoutProcessPackages>
      <div>
        <FilterSectionResi />
        <TablePayment />
      </div>
    </LayoutProcessPackages>
  );
};

export default PaymentPage;
