import React from "react";
import { AddressReceiver } from "./AddressReceiver";
import { SellerAddress } from "./SellerAddressUpdate";
import { Payment } from "./Payment";
import { Summary } from "./Summary";

const CheckoutPage = () => {
  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-8">
          <AddressReceiver />
          <SellerAddress />
        </div>
        <div className="col-6 col-md-4">
          <Payment />
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
