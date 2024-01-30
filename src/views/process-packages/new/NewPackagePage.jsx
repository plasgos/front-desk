import React from "react";
import { FilterSectionNewPackage } from "../_components/FilterSectionNewPackage";
import { TablePackageHistory } from "../_components/TablePackageHistory";
import LayoutProcessPackages from "../LayoutProcessPackage";

const NewPackagePage = () => {
  return (
    <LayoutProcessPackages>
      <div>
        <FilterSectionNewPackage />
        <TablePackageHistory />
      </div>
    </LayoutProcessPackages>
  );
};

export default NewPackagePage;
