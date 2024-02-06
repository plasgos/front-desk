import React from "react";
import { TableMutation } from "../_components/TablePackageHistory";
import LayoutMutationPage from "../LayoutMutationPage";
import { FilterSection } from "../_components/FilterSection";
import { ButtonSection } from "../_components/ButtonSection";
import { ListFilteredButton } from "../_components/ListFilteredButton";

const ActiveBalancePage = () => {
  const filteredButton = ListFilteredButton();

  return (
    <LayoutMutationPage>
      <div>
        {filteredButton.map((btn, index) => (
          <ButtonSection key={index} title={btn.title} icon={btn.icon} />
        ))}
        <FilterSection />
        <TableMutation />
      </div>
    </LayoutMutationPage>
  );
};

export default ActiveBalancePage;
