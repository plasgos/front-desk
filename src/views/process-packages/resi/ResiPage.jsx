import React from "react";
import LayoutProcessPackages from "../LayoutProcessPackage";
import { FilterSectionResi } from "../_components/FilterSectionResi";
import { TableResi } from "./TableResi";

const ResiPage = () => {
  return (
    <LayoutProcessPackages>
      <div>
        <FilterSectionResi />
        <TableResi />
      </div>
    </LayoutProcessPackages>
  );
};

export default ResiPage;
