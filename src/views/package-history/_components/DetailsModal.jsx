import {
  CBadge,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";
import moment from "moment";

import { IoIosInformationCircleOutline } from "react-icons/io";
import { defaultImg } from "../../../lib/product";
import { formatPrice } from "../../../lib/format-price";
import { FaCircleDot } from "react-icons/fa6";

export const DetailsModal = ({ history }) => {
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
                    {history.PackageStatus.name}
                  </CBadge>
                </div>
              </div>

              <div style={{ gap: 20 }} className="d-flex mb-3">
                <div className="w-50">
                  <div>
                    <div className=" text-primary font-weight-bold mb-2">
                      Payment ID
                    </div>
                    <div>{history.payment_id ? history.payment_id : "-"}</div>
                  </div>
                </div>

                <div className="w-50">
                  <div className="text-primary font-weight-bold mb-2">
                    Resi / AWB
                  </div>
                  <div className="mb-2">
                    {history.PackageShipping?.awb
                      ? history.PackageShipping?.awb
                      : "-"}
                  </div>
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <div className="mr-3">
                        {history.PackageShipping?.drop ? (
                          <CBadge className="p-2" color="danger my-2">
                            {" "}
                            Drop Off
                          </CBadge>
                        ) : (
                          <CBadge className="p-2" color="danger my-2">
                            {" "}
                            Pick Up
                          </CBadge>
                        )}
                      </div>

                      <div>
                        {history.PackageShipping?.cod ? (
                          <CBadge className="p-2" color="primary">
                            COD
                          </CBadge>
                        ) : (
                          <CBadge className="p-2" color="primary">
                            Non-COD
                          </CBadge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-50">
                  <div className="mb-3">
                    <div className=" text-primary font-weight-bold mb-3">
                      Ekpedisi
                    </div>
                    <div className="">
                      <img
                        style={{ width: 70 }}
                        src={history.PackageShipping?.ServiceType?.Service?.img}
                        alt="logo"
                      />
                      <div className="font-weight-bold mt-1">
                        {history.PackageShipping?.ServiceType?.code}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ gap: 20 }} className="d-flex mb-3">
                <div className="w-50 ">
                  <div>
                    <div className=" text-primary font-weight-bold mb-3">
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
                          history.PackageSender?.Subdistrict?.City?.Province
                            ?.name
                        }{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-50 ">
                  <div className="text-primary font-weight-bold mb-3">
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

                <div className="w-50">
                  <div>
                    <div className=" text-primary font-weight-bold mb-3">
                      Pembayaran
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>Ongkir</div>
                      <div className="font-weight-bold">
                        {formatPrice(history.shipping_cost)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ gap: 20 }} className="d-flex my-3">
                <div className="w-50">
                  <div className=" text-primary font-weight-bold mb-3">
                    Paket
                  </div>
                  <div className="font-weight-bold mb-2">Isi Barang</div>
                  {history.PackageItems.map((item) => (
                    <div className="mb-3" key={item.id}>
                      <div className="p-2 card shadow-sm mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>{item.Product.name}</div>

                          <div>
                            <img
                              style={{ width: 50 }}
                              src={defaultImg(item.Product)}
                              alt="product"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mb-3">
                    <div className="font-weight-bold mb-2">Catatan</div>
                    <div>
                      {history.PackageDetail.note
                        ? history.PackageDetail.note
                        : "-"}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <div className="font-weight-bold mb-2">Nilai</div>
                      <div>{formatPrice(history.item_value)}</div>
                    </div>

                    <div>
                      <div className="font-weight-bold mb-2">Asuransi</div>
                      <div>{formatPrice(history.insurance_fee)}</div>
                    </div>
                  </div>

                  <div>
                    <div className="font-weight-bold mb-2">Berat | Dimensi</div>
                    <div>
                      {history.PackageDetail.weight} gr |{" "}
                      {history.PackageDetail.length} x{" "}
                      {history.PackageDetail.width} x{" "}
                      {history.PackageDetail.height} cm
                    </div>
                  </div>
                </div>

                <div className="w-50">
                  <div className=" text-primary font-weight-bold mb-3">
                    Riwayat
                  </div>
                  <div style={{ maxHeight: 300, overflowY: "auto" }}>
                    {history.PackageHistories.map((packageHistory) => (
                      <div className="mb-2" key={packageHistory.id}>
                        <div className="font-weight-bold mb-1">
                          {packageHistory.PackageStatus.name}
                        </div>
                        <div>
                          {moment(packageHistory.createdAt).format(
                            "DD-MM-YYYY HH:mm"
                          )}
                        </div>
                      </div>
                    )).reverse()}
                  </div>
                </div>

                <div className="w-50">
                  <div className="text-primary font-weight-bold mb-3">
                    Bukti Pegiriman
                  </div>
                  <div>-</div>
                </div>
              </div>
            </div>

            <div>
              <div className="d-flex justify-content-between">
                <div>
                  <div className="font-weight-bold mb-3">Tracking</div>
                  <div className="card p-3">
                    <div
                      //  style={{ gap: 12 }}
                      className="d-flex justify-content-between "
                    >
                      <div>Selasa, 30 Jan 2024 </div>
                      <div>
                        <div className="mb-2">
                          <FaCircleDot size={18} className="mr-2" />
                          14:02
                        </div>
                        <div>Paket dibuat oleh Dyan Kastutara</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
