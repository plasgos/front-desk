// Layout.jsx
import React from "react";

import { CButton } from "@coreui/react";
import { TbPackageExport } from "react-icons/tb";
import { MenuOptions } from "./_components/MenuOptions";

const LayoutProcessPackages = ({ children }) => {
  return (
    <div>
      <div className=" d-flex justify-content-between p-3 shadow-sm">
        <div>
          <h4 className="font-weight-bold">Pickup</h4>
        </div>
        <nav className="ml-auto d-flex">
          <CButton color="primary" className="ml-3">
            <TbPackageExport size={24} className="mr-2" />
            Kirim Paket
          </CButton>
        </nav>
      </div>
      <MenuOptions />
      <main>{children}</main>
    </div>
  );
};

export default LayoutProcessPackages;
