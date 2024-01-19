import React from "react";
import { CRow, CCol } from "@coreui/react";
import { SenderDetails } from "./_components/SenderDetails";
import ReceiverDetails from "./_components/ReceiverDetails";
import { DeliveryAndPayment } from "./_components/DeliveryAndPayment";
import { ItemDetails } from "./_components/ItemDetails";
import { useSelector } from "react-redux";

const SendPackagePage = () => {
  const packages = useSelector((state) => state.packages);
  return (
    <div>
      <h4 className="font-weight-bold">Kirim Paket</h4>
      <CRow>
        <CCol md="6">
          <SenderDetails />
          <ReceiverDetails />
          <ItemDetails />
        </CCol>
        <CCol md="6">
          <DeliveryAndPayment />
        </CCol>
      </CRow>
    </div>
  );
};

export default SendPackagePage;
