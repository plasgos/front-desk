import React from "react";
import { CRow, CCol } from "@coreui/react";
import { useSelector } from "react-redux";

import SenderDetails from "./_components/SenderDetails";
import ReceiverDetails from "./_components/ReceiverDetails";
import ItemDetails from "./_components/ItemDetails";
import DeliveryAndPayment from "./_components/DeliveryAndPayment";
import CustomCOD from "./_components/CustomCOD";
import Summary from "./_components/Summary";

const SendPackagePage = ({history}) => {
  const { receiver, sender, shipping } = useSelector((state) => state.package);
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
          <CustomCOD />
          <Summary history={history}/>
        </CCol>
      </CRow>
    </div>
  );
};

export default SendPackagePage;
