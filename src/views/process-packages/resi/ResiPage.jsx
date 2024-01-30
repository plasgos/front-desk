import React from "react";
import { TablePackageHistory } from "../_components/TablePackageHistory";
import LayoutProcessPackages from "../LayoutProcessPackage";
import { FilterSectionResi } from "../_components/FilterSectionResi";

const ResiPage = () => {
  return (
    <LayoutProcessPackages>
      <div>
        <FilterSectionResi />
        <TablePackageHistory />
      </div>
    </LayoutProcessPackages>
  );
};

export default ResiPage;
