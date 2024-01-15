import React from "react";
import { AddressReceiver } from "./AddressReceiver";
import { Orders } from "./Orders";
import { Payment } from "./Payment";
import { Summary } from "./Summary";

const CheckoutPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12  col-md-8">
          <AddressReceiver />
          <Orders />
        </div>
        <div className="col-12  col-md-4">
          <Payment />
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
