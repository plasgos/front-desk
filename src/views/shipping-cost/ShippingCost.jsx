import React from "react";
import { InputPackageData } from "./_components/InputPackageData";
import { Expedition } from "./_components/Expedition";

const ShippingCost = () => {
  return (
    <div>
      <h4 className="font-weight-bold">Cek Ongkos Kirim</h4>
      <div className="row">
        <div className="col-12 mb-2 mb-md-0 col-md-6  shadow-sm p-3 rounded ">
          <InputPackageData />
        </div>
        <div className="col-12 mb-2 mb-md-0 col-md-6 shadow-sm p-3 rounded ">
          <Expedition />
        </div>
      </div>
    </div>
  );
};

export default ShippingCost;
