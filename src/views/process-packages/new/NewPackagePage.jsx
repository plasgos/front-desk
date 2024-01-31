import React from "react";
import { FilterSectionNewPackage } from "../_components/FilterSectionNewPackage";
import { TableNewProcessPackage } from "./TableNewProcessPackage";
import LayoutProcessPackages from "../LayoutProcessPackage";

const NewPackagePage = () => {
  return (
    <LayoutProcessPackages>
      <div>
        <FilterSectionNewPackage />
        <TableNewProcessPackage />
      </div>
    </LayoutProcessPackages>
  );
};

export default NewPackagePage;
