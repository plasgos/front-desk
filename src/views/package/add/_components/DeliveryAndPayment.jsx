import React, { useState } from "react";
import { TbReportMoney } from "react-icons/tb";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import { CAlert } from "@coreui/react";

import Delivery from "./Delivery";
import PaymentMethod from './PaymentMethod';
import Costs from './Costs';
import CustomCOD from './CustomCOD';

// import { Summary } from "./Summary";

export default () => {
  const { shipping } = useSelector((state) => state.package);
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <div className="font-weight-bold font-lg ">Pengiriman & Pembayaran</div>
        <div style={{height: 35}} />
      </div>
      <div className="card py-2 px-3 shadow-sm">
        <Delivery />
        <PaymentMethod />
        <Costs />
      </div>
    </div>
  );
};
