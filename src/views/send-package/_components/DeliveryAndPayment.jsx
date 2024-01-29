import React from "react";
import { Summary } from "./Summary";

import { Delivery } from "./Delivery";
import { useSelector } from "react-redux";
import { DetailsShippingOrders } from "./modal/DetailsShippingOrders";

export const DeliveryAndPayment = () => {
  const packages = useSelector((state) => state.packages);

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-5 ">
        <div className="font-weight-bold font-lg ">Pengiriman & Pembayaran</div>
      </div>

      <div className="card p-3 shadow-sm">
        <Delivery />
      </div>
      <DetailsShippingOrders />

      {packages.expeditions?.data.length > 0 ? <Summary /> : null}
    </div>
  );
};
