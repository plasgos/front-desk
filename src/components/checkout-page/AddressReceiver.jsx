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
  const { address } = useSelector((state) => state.addresses);

  const [selectedAddress, setSelectedAddress] = useState({});

  const dispatch = useDispatch();

  const getData = () => {
    dispatch(actions.getAddress());
  };

  useEffect(() => {
    const defaultAddress =
      address.data && address.data.find((addr) => addr.is_default);
    setSelectedAddress(defaultAddress || {});
  }, [address]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    defaultAddressesCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, selectedAddress]);

  const defaultAddressesCheckout = () => {
    const checkout = dispatch(
      setCheckoutReceiver({
        id: selectedAddress.id,
        name: selectedAddress.receiver_name,
        phone_number: selectedAddress.phone_number,
        address: selectedAddress.address,
        subdistrict_id: selectedAddress.subdistrict_id,
        postal_code: selectedAddress.postal_code,
        latitude: selectedAddress.latitude,
        longitude: selectedAddress.longitude,
      })
    );

    return checkout;
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
              </CCardBody>
              <CCardFooter
                style={{
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <ReceiverModal
                  address={address}
                  selectedAddress={selectedAddress}
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
