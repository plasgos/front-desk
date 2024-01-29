import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../../lib/format-price";

export const DetailsShippingOrders = () => {
  const packages = useSelector((state) => state.packages);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <CButton color="primary" onClick={toggle} className="ml-2">
        Kirim
      </CButton>
      <CModal size="lg" centered show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          <h4 className="text-center ml-auto">Detail Pengiriman Paket</h4>
        </CModalHeader>
        <CModalBody className="modal-overflow p-4">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Pengirim</th>
                <th scope="col">Penerima</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    <div style={{ gap: 6 }} className="d-flex flex-column mb-4">
                      <div className="">Nama : {packages.origin.name}</div>
                      <div>No Telp : {packages.origin.phone_number}</div>
                      <div>Alamat : {packages.origin.address}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <div>
                    <div style={{ gap: 6 }} className="d-flex flex-column mb-4">
                      <div className="">Nama : {packages.receiver.name}</div>
                      <div>No Telp : {packages.receiver.phone_number}</div>
                      <div>Alamat : {packages.receiver.address}</div>
                      <div className="text-muted">
                        {/* <span style={{ visibility: "hidden" }}>Alamat :</span> */}
                        {packages.receiver.Subdistrict?.name},{" "}
                        {packages.receiver.Subdistrict?.cityType},{" "}
                        {packages.receiver.Subdistrict?.cityName}{" "}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Produk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {packages.orders.map((order) =>
                  order.products?.map((product) => (
                    <td
                      key={product.id}
                      style={{ gap: 6 }}
                      className="d-flex flex-column "
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="">Nama : {product.name}</div>
                          <div>Qty : {product.min_order}</div>
                          <div>
                            Total Harga : {formatPrice(product.totalPrice)}
                          </div>
                          <div>Total Berat : {product.totalWeight} Gram</div>
                        </div>
                        <div>
                          <img
                            style={{ width: 60 }}
                            src={product.ImageProducts[0].url}
                            alt="product"
                          />
                        </div>
                      </div>
                    </td>
                  ))
                )}
              </tr>
            </tbody>
          </table>

          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>
                  {packages.totalWeight ? (
                    <div>Total Berat Order : {packages.totalWeight} Gram</div>
                  ) : null}
                </th>
                <th>
                  {packages.dimension.length ? (
                    <div>Panjang: {packages.dimension.length} CM</div>
                  ) : null}
                </th>
                <th>
                  {packages.dimension.width ? (
                    <div>Lebar: {packages.dimension.width} CM</div>
                  ) : null}
                </th>
                <th>
                  {packages.dimension.height ? (
                    <div>Panjang: {packages.dimension.height} CM</div>
                  ) : null}
                </th>
              </tr>
            </thead>
          </table>

          <table className="table">
            <tr className="table-info">
              {packages.notes ? (
                <div className="p-3">
                  {" "}
                  <span className="font-weight-bold">Catatan :</span>{" "}
                  {packages.notes}
                </div>
              ) : null}
            </tr>
          </table>

          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Opsi Penjemputan</th>
                <th>Metode Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {packages.orders.map((order, index) => (
                    <div key={index} className="p-2">
                      {order.drop ? <div>Drop Off</div> : <div>Pick Up</div>}
                    </div>
                  ))}
                </td>
                <td>
                  {packages.orders.map((order, index) => (
                    <div key={index} className="p-2">
                      {order.cod ? <div>COD</div> : <div>NON COD</div>}
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Ekspedisi</th>
                <th>Estimasi Biaya</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <div style={{ gap: 6 }} className="d-flex flex-column p-2">
                    <div>
                      Service Type : {packages.selectedExpedition?.service_name}{" "}
                    </div>
                    <div>Kurir : {packages.selectedExpedition?.name} </div>
                    <div>
                      Harga :{" "}
                      {formatPrice(packages.selectedExpedition?.cost || 0)}{" "}
                    </div>
                    <div>
                      Estimasi Paket Sampai : {packages.selectedExpedition?.etd}{" "}
                    </div>
                  </div>
                </td>

                <td>
                  <div style={{ gap: 6 }} className="d-flex flex-column p-2">
                    <div>Layanan : {packages.summary?.service} </div>
                    <div>
                      Ongkir :{" "}
                      {formatPrice(packages.summary?.shippingCost || 0)}{" "}
                    </div>
                    <div>
                      Biaya Asuransi :{" "}
                      {formatPrice(packages.summary?.insuranceFee || 0)}{" "}
                    </div>
                    <div>
                      COD Fee : {formatPrice(packages.summary?.codFee || 0)}
                    </div>
                    <div>
                      Nilai Barang :{" "}
                      {formatPrice(packages.summary?.item_value || 0)}
                    </div>
                    <div>
                      Ditagih Ke Penerima :{" "}
                      {formatPrice(packages.summary?.billedByReceiver || 0)}
                    </div>
                    <div>
                      Estimasi Pencairan :{" "}
                      {formatPrice(packages.summary?.estimateFund || 0)}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">Kirim</CButton>{" "}
          <CButton color="secondary" onClick={toggle}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};
