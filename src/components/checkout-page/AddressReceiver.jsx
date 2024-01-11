import React, { useEffect, useState } from "react";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../redux/modules/addresses/actions/actions";

import { setCheckoutReceiver } from "../../redux/modules/checkout/actions/actions";
import { ReceiverModal } from "./modal/ReceiverModal";

export const AddressReceiver = () => {
  const [selectedAddress, setSelectedAddress] = useState({});

  const dispatch = useDispatch();

  const { address } = useSelector((state) => state.addresses);

  const getData = () => {
    // let payload = {
    //   token: "xxxx",
    // };
    dispatch(actions.getAddress());
  };

  useEffect(() => {
    getData();
    defaultAddressesCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultAddresses = address.data.filter(
    (address) => address.is_default === true
  );

  const defaultAddressesCheckout = () => {
    defaultAddresses.map((address) => {
      const checkout = dispatch(
        setCheckoutReceiver({
          id: address.id,
          name: address.receiver_name,
          phone_number: address.phone_number,
          address: address.address,
          subdistrict_id: address.subdistrict_id,
          postal_code: address.postal_code,
          latitude: address.latitude,
          longitude: address.longitude,
        })
      );

      return checkout;
    });
  };

  return (
    <div>
      <h1 className="heading">Checkout</h1>
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CCard style={{ borderRadius: 8 }} className="border-0 shadow-sm">
              <CCardHeader
                style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                className="sub-heading"
              >
                Alamat Penerima
              </CCardHeader>
              <CCardBody className="py-4">
                {Object.keys(selectedAddress).length === 0 ? (
                  defaultAddresses.map((address) => (
                    <div key={address.id}>
                      <div className="d-flex align-items-center">
                        <h6 className="sub-heading mr-2 mt-2">
                          {address.receiver_name}
                        </h6>
                        {address.is_default && (
                          <CBadge color="success">Utama</CBadge>
                        )}
                      </div>
                      <div>{address.phone_number}</div>
                      <div>{address.address}</div>
                    </div>
                  ))
                ) : (
                  <div key={address.id}>
                    <div className="d-flex align-items-center">
                      <h6 className="sub-heading mr-2 mt-2">
                        {selectedAddress.receiver_name}
                      </h6>
                      {selectedAddress.is_default && (
                        <CBadge color="success">Utama</CBadge>
                      )}
                    </div>
                    <div>{selectedAddress.phone_number}</div>
                    <div>{selectedAddress.address}</div>
                  </div>
                )}
              </CCardBody>
              <CCardFooter
                style={{
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <ReceiverModal
                  address={address}
                  setSelectedAddress={setSelectedAddress}
                />
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
