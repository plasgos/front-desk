import React from "react";
import { InputPackageData } from "./_components/InputPackageData";
import { Expedition } from "./_components/Expedition";

const ShippingCost = () => {
  return (
    <div>
      <h4 className="font-weight-bold">Cek Ongkos Kirim</h4>
      <div style={{ gap: 20 }} className="d-flex flex-wrap mb-5 ">
        <InputPackageData />

        <Expedition />
      </div>
    </div>
  );
};

export default ShippingCost;
