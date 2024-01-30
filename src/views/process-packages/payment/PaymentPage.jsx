import React from "react";
import { TablePackageHistory } from "../_components/TablePackageHistory";
import LayoutProcessPackages from "../LayoutProcessPackage";
import { FilterSectionResi } from "../_components/FilterSectionResi";

const PaymentPage = () => {
  return (
    <LayoutProcessPackages>
      <div>
        <FilterSectionResi />
        <TablePackageHistory />
      </div>
    </LayoutProcessPackages>
  );
};

export default PaymentPage;
