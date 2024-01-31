import React, { useState } from "react";
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
import { LiaExchangeAltSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from 'react-loading-skeleton'

import { setSender, setWarehouseId } from '../../../../../redux/modules/package/reducer';
import { resetCheckCosts } from '../../../../../redux/modules/shipping/reducer';

export const PickUpAddressModal = () => {
  const dispatch = useDispatch();
  const { data, isLoadingGet } = useSelector(state => state.warehouse)
  const { sender } = useSelector(state => state.package)

  const [modal, setModal] = useState(false);
  const [isSelectedAddress, setIsSelectedAddress] = useState({});
  const toggle = () => {
    setModal(!modal);
  };


  const onSelectWarehouse = async (data) => {
    console.log(data);
    await dispatch(resetCheckCosts())
    await dispatch(setSender({
      ...data,
      district_id: data.subdistrict_id
    }));
    await dispatch(setWarehouseId(data.id))
    await setModal(false);
  };
  if(data.length === 0 || !sender.id){
    return <Skeleton width={150} height={35} style={{borderRadius: 8}}/>
  }
  return (
    <>
      <CButton variant="outline" color="primary"
        onClick={() => setModal(true)} style={{width: 150, height: 35}}
      >
        <LiaExchangeAltSolid size={18} className="mr-2" />
        <span>Ganti Pengirim</span>
      </CButton>
      <CModal centered show={modal} onClose={() => setModal(false)}>
        <CModalHeader closeButton>
          <h4 className="text-center ml-auto">Alamat Pick Up</h4>
        </CModalHeader>
        <CModalBody>
          <div className="modal-overflow p-3">
          {
              data.map(address => (
                <CCard key={address.id} style={{cursor:'pointer'}} onClick={() => onSelectWarehouse(address)} className="mb-2">
                  <CCardBody
                    style={{ cursor: "pointer" }}
                    className={sender.id === address.id ? " modal-selected" : ""}
                  >
                    <div className="d-flex align-items-center">
                      <h6 className="sub-heading mr-2 mt-2">{address.name}</h6>
                      {address.is_default && <CBadge color="success">Utama</CBadge>}
                    </div>
                    <div className="mb-2">{address.phone_number}</div>
                    <div>{address.address} {address.Subdistrict.name} {address.Subdistrict.City.type} {address.Subdistrict.City.name} {address.Subdistrict.City.Province.name}, {address.postal_code}</div>
                  </CCardBody>
                </CCard>
              ))
          }
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};
