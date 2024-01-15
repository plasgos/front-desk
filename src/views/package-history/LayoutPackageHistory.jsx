// Layout.jsx
import React from "react";

import { CButton } from "@coreui/react";
import { IoListSharp } from "react-icons/io5";
import { TbPackageExport } from "react-icons/tb";
import { Header } from "./_components/Header";

const LayoutPackageHistory = ({ children }) => {
  return (
    <div>
      <div className=" d-flex justify-content-between p-3 shadow-sm">
        <div>
          <h4 className="font-weight-bold">Riwayat Paket</h4>
        </div>
        <nav className="ml-auto d-flex">
          <CButton className="btn btn-outline-primary">
            <IoListSharp size={24} className="mr-2" />
            Tampilkan Semua
          </CButton>

          <CButton color="primary" className="ml-3">
            <TbPackageExport size={24} className="mr-2" />
            Kirim Paket
          </CButton>
        </nav>
      </div>
      <Header />
      <main className="px-3">{children}</main>
    </div>
  );
};

export default LayoutPackageHistory;
