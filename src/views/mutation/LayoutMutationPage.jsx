import React from "react";
import { MenuOptions } from "./_components/MenuOptions";

const LayoutMutationPage = ({ children }) => {
  return (
    <div>
      <MenuOptions />
      <main>{children}</main>
    </div>
  );
};

export default LayoutMutationPage;
