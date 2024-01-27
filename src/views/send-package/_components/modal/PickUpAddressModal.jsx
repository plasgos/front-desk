import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import {
  resetExpeditions,
  setSelectSender,
} from "../../../../redux/modules/packages/actions/actions";

export const PickUpAddressModal = ({
  address,
  setSelectedAddress,
  defaultAddressSelected,
  storeId,
}) => {
  const [modal, setModal] = useState(false);
  const [isSelectedAddress, setIsSelectedAddress] = useState({});
  const toggle = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(resetExpeditions());

    setSelectedAddress(data);
    dispatch(
      setSelectSender({
        origin: {
          district_id: data.subdistrict_id,
          lat: data.latitude,
          long: data.longitude,
          address: data.address,
        },
        store_id: storeId,
        sender: {
          id: data.id,
          store_id: storeId,
          name: data.name,
          phone_number: data.phone_number,
          address: data.address,
          subdistrict_id: data.subdistrict_id,
          postal_code: data.postal_code,
          latitude: data.latitude,
          longitude: data.longitude,
        },
        warehouse_id: data.id,
      })
    );

    setModal(false);
  };

  return (
    <>
      <CButton
        variant="outline"
        color="primary"
        onClick={toggle}
        className="mr-1"
      >
        <LiaExchangeAltSolid size={18} className="mr-2" />
        <span>Ganti Pengirim</span>
      </CButton>
      <CModal centered show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          <h4 className="text-center ml-auto">Alamat Pick Up</h4>
        </CModalHeader>
        <CModalBody>
          <div className="modal-overflow p-3">
            {address.map((address) => {
              const selected =
                isSelectedAddress && isSelectedAddress.id === address.id;

              const defaultSelected =
                Object.keys(isSelectedAddress).length === 0 &&
                defaultAddressSelected.id === address.id;

              return (
                <CCard
                  key={address.id}
                  onClick={() =>
                    setIsSelectedAddress({
                      ...address,
                    })
                  }
                  className="mb-2"
                >
                  <CCardBody
                    style={{ cursor: "pointer" }}
                    className={` ${selected && " modal-selected"} ${
                      defaultSelected && " modal-selected"
                    }`}
                  >
                    <div className="d-flex align-items-center">
                      <h6 className="sub-heading mr-2 mt-2">{address.name}</h6>
                      {address.is_default && (
                        <CBadge color="success">Utama</CBadge>
                      )}
                    </div>
                    <div className="mb-2">{address.phone_number}</div>
                    <div>{address.address}</div>
                  </CCardBody>
                </CCard>
              );
            })}
          </div>
        </CModalBody>

        <CModalFooter>
          <CButton onClick={() => onSubmit(isSelectedAddress)} color="primary">
            Pilih
          </CButton>{" "}
          <CButton color="secondary" onClick={toggle}>
            Batal
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
