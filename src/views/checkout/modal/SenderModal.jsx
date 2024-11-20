import {
  CButton,
  CCard,
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAddressStore } from "../../../modules/orders/actions/actions";
import { setCheckoutSelectSender } from "../../../modules/checkout/actions/actions";

export const SenderModal = ({
  order,
  selectedWarehouse,
  setSelectedWarehouse,
}) => {
  const [modalStates, setModalStates] = useState({});

  const dispatch = useDispatch();

  const toggleModal = (store_id) => {
    setModalStates((prevStates) => ({
      ...prevStates,
      [store_id]: !prevStates[store_id],
    }));
  };

  const onSubmit = (data) => {
    dispatch(setAddressStore(data));
    dispatch(
      setCheckoutSelectSender({
        id: data.id,
        store_id: data.store_id,
        name: data.name,
        phone_number: data.phone_number,
        address: data.address,
        subdistrict_id: data.subdistrict_id,
        postal_code: data.postal_code,
        latitude: data.latitude,
        longitude: data.longitude,
      })
    );

    setModalStates((prevStates) => ({
      ...prevStates,
      [data.store_id]: !prevStates[data.store_id],
    }));
  };
  return (
    <div>
      <CButton
        onClick={() => toggleModal(order.store_id)}
        className="mr-1 border ml-auto"
      >
        Pilih alamat Pengiriman
      </CButton>
      <CModal
        centered
        show={modalStates[order.store_id]}
        onClose={() => toggleModal(order.store_id)}
      >
        <CModalHeader closeButton>
          <h4 className="text-center ml-auto">Pilih Alamat Penerima</h4>
        </CModalHeader>
        <CModalBody>
          <div className="modal-overflow">
            {order.Warehouses.map((warehouse) => {
              const isSelected = selectedWarehouse.id === warehouse.id;

              const defaultSender =
                Object.keys(selectedWarehouse).length === 0 &&
                warehouse.is_default;

              return (
                <CCard
                  key={warehouse.id}
                  className={`mb-2 `}
                  onClick={() => setSelectedWarehouse({ ...warehouse })}
                >
                  <CCardBody
                    style={{ cursor: "pointer" }}
                    className={` ${isSelected && "modal-selected"} ${
                      defaultSender && "modal-selected"
                    } `}
                  >
                    <div>
                      <h6 className="sub-heading">{warehouse.name}</h6>
                      <div>
                        {warehouse.Subdistrict.City.name},{" "}
                        {warehouse.Subdistrict.City.Province.name}{" "}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              );
            })}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => onSubmit(selectedWarehouse)} color="primary">
            Pilih
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => toggleModal(order.store_id)}
          >
            Batal
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};
