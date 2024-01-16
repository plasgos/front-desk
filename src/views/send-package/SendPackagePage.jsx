import React from "react";
import { SenderDetails } from "./_components/SenderDetails";
import { ReceiverDetails } from "./_components/ReceiverDetails";
import { DeliveryAndPayment } from "./_components/DeliveryAndPayment";
import { ItemDetails } from "./_components/ItemDetails";

const SendPackagePage = () => {
  return (
    <div>
      <h4 className="font-weight-bold">Kirim Paket</h4>
      <div style={{ gap: 20 }} className="d-flex flex-wrap mb-5">
        <div style={{ gap: 20, maxWidth: 620 }} className="flex-column">
          <SenderDetails />
          <ReceiverDetails />
          <ItemDetails />
        </div>
        <DeliveryAndPayment />
      </div>
    </div>
  );
};

export default SendPackagePage;
