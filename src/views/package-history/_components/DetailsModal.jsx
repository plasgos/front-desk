import {
  CBadge,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";

import { IoIosInformationCircleOutline } from "react-icons/io";

export const DetailsModal = ({ history }) => {
  console.log("🚀 ~ DetailsModal ~ history:", history);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <CButton onClick={toggle} className="mr-1">
        <IoIosInformationCircleOutline size={24} />
      </CButton>
      <CModal size="xl" show={modal} onClose={toggle}>
        <CModalHeader closeButton>Details</CModalHeader>
        <CModalBody>
          <div style={{ gap: 12 }} className="d-flex">
            <div style={{ flexGrow: 1 }} className="modal-overflow p-3">
              <div className="d-flex align-items-center mb-3">
                <div className="font-lg font-weight-bold mr-3">
                  {history.number}
                </div>
                <div>
                  <CBadge className="p-2" color="info">
                    Baru Dibuat
                  </CBadge>
                </div>
              </div>

              <div style={{ gap: 20 }} className="d-flex mb-3">
                <div className="w-50">
                  <div className=" text-primary font-weight-bold mb-2">
                    Payment ID
                  </div>
                  <div style={{ marginBottom: 48 }}>-</div>
                  <div className=" text-primary font-weight-bold mb-2">
                    Pengirim
                  </div>
                  <div className=" font-weight-bold">
                    {history.PackageSender?.name}
                  </div>
                  <div className=" my-2">
                    {history.PackageSender.phone_number}
                  </div>
                  <div style={{ lineHeight: 1.5 }}>
                    {history.PackageSender?.address}{" "}
                    {history.PackageSender?.Subdistrict?.type}{" "}
                    {history.PackageSender?.Subdistrict?.name}{" "}
                    {history.PackageSender?.Subdistrict?.City?.name}{" "}
                    {history.PackageSender?.Subdistrict?.City?.Province?.name}{" "}
                    {history.PackageSender?.postal_code} <br />
                    <span className="font-weight-bold">
                      -, {history.PackageSender?.Subdistrict?.name},{" "}
                      {history.PackageSender?.Subdistrict?.City?.name}
                      {
                        history.PackageSender?.Subdistrict?.City?.Province?.name
                      }{" "}
                    </span>
                  </div>
                </div>
                <div className="w-50">
                  <div className="text-primary font-weight-bold mb-2">
                    Resi / AWB
                  </div>
                  <div className="mb-2">-</div>
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <div className="mr-3">
                        {history.PackageShipping?.drop ? (
                          <CBadge color="danger my-2"> Drop Off</CBadge>
                        ) : (
                          <CBadge color="danger my-2"> Pick Up</CBadge>
                        )}
                      </div>

                      <div>
                        {history.PackageShipping?.cod ? (
                          <CBadge color="primary">COD</CBadge>
                        ) : (
                          <CBadge color="primary">Non-COD</CBadge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-primary font-weight-bold mb-2">
                    Penerima
                  </div>
                  <div className="font-weight-bold">
                    {history.PackageReceiver?.name}
                  </div>
                  <div className="my-2">
                    {history.PackageReceiver.phone_number}
                  </div>
                  <div style={{ lineHeight: 1.5 }}>
                    {history.PackageReceiver?.address}{" "}
                    {history.PackageReceiver?.Subdistrict?.type}{" "}
                    {history.PackageReceiver?.Subdistrict?.name}{" "}
                    {history.PackageReceiver?.Subdistrict?.City?.name}{" "}
                    {history.PackageReceiver?.Subdistrict?.City?.Province?.name}{" "}
                    {history.PackageReceiver?.postal_code} <br />
                    <span className="font-weight-bold">
                      -, {history.PackageReceiver?.Subdistrict?.name},{" "}
                      {history.PackageReceiver?.Subdistrict?.City?.name}
                      {
                        history.PackageReceiver?.Subdistrict?.City?.Province
                          ?.name
                      }{" "}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ gap: 20 }} className="d-flex mb-3">
                <div className="w-50">
                  <div className=" text-primary font-weight-bold mb-2">
                    Paket
                  </div>
                </div>
                <div className="w-50">
                  <div className=" text-primary font-weight-bold mb-2">
                    Riwayat
                  </div>
                </div>
              </div>
            </div>

            <div style={{ flexGrow: 1 }} className="modal-overflow p-3"></div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">Do Something</CButton>{" "}
          <CButton color="secondary" onClick={toggle}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
