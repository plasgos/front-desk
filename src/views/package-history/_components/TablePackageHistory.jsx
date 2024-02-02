import { CBadge } from "@coreui/react";
import React from "react";
import { formatPrice } from "../../../lib/format-price";
import { DetailsModal } from "./DetailsModal";
import moment from "moment";

export const TablePackageHistory = ({ history }) => {
  return (
    <div className="my-3 shadow-sm ">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Transaksi</th>
            <th scope="col">Pengirim</th>
            <th scope="col">Penerima</th>
            <th scope="col">Ekspedisi</th>
            <th scope="col">Tipe</th>
            <th scope="col">Ongkir</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {history?.length > 0 ? (
            history.map((history, index) => {
              return (
                <tr key={history.id}>
                  <th
                    scope="row"
                    // className="align-middle"
                  >
                    {index + 1}
                  </th>
                  <td className="align-middle">
                    <CBadge color="primary">
                      {" "}
                      {history.PackageShipping?.ServiceType?.name}
                    </CBadge>
                    <div className="font-weight-bold my-2 ">
                      {history.number}
                    </div>
                    <div className="text-muted my-2">
                      {moment(history.updatedAt).format("DD-MM-YYYY HH:mm")}
                    </div>
                    <div className="text-success">
                      {history.PackageStatus.name}
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="font-weight-bold">
                      {history.PackageSender.name}
                    </div>
                    <div className="my-2">
                      {history.PackageSender.phone_number}
                    </div>
                    <div style={{ lineHeight: 1.5 }}>
                      {history.PackageSender?.address}{" "}
                      {history.PackageSender?.Subdistrict?.type}{" "}
                      {history.PackageSender?.Subdistrict?.name}{" "}
                      {history.PackageSender?.Subdistrict?.City?.name}{" "}
                      {history.PackageSender?.Subdistrict?.City?.Province?.name}{" "}
                      {history.PackageSender?.postal_code}{" "}
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="font-weight-bold">
                      {history.PackageReceiver.name}
                    </div>
                    <div className="my-2">
                      {history.PackageReceiver.phone_number}
                    </div>
                    <div style={{ lineHeight: 1.5 }}>
                      {history.PackageReceiver?.address}{" "}
                      {history.PackageReceiver?.Subdistrict?.type}{" "}
                      {history.PackageReceiver?.Subdistrict?.name}{" "}
                      {history.PackageReceiver?.Subdistrict?.City?.name}{" "}
                      {
                        history.PackageReceiver?.Subdistrict?.City?.Province
                          ?.name
                      }{" "}
                      {history.PackageReceiver?.postal_code}{" "}
                    </div>
                  </td>
                  <td className="align-middle">
                    <img
                      style={{ width: 80 }}
                      src={history.PackageShipping?.ServiceType?.Service?.img}
                      alt="jne-logo"
                    />
                    <div className="font-weight-bold mt-2">
                      {history.PackageShipping?.ServiceType?.code}
                    </div>
                    <div className="font-weight-bold mt-2">
                      {history.PackageShipping?.awb}
                    </div>
                  </td>
                  <td className="align-middle">
                    {history.PackageShipping?.cod ? (
                      <CBadge color="primary">COD</CBadge>
                    ) : (
                      <CBadge color="primary">Non-COD</CBadge>
                    )}

                    {history.PackageShipping?.drop ? (
                      <CBadge color="danger my-2"> Drop Off</CBadge>
                    ) : (
                      <CBadge color="danger my-2"> Pick Up</CBadge>
                    )}
                  </td>
                  <td className="align-middle">
                    <div>{formatPrice(history.shipping_cost)}</div>
                    <CBadge color="success my-2"> Bisa Klaim</CBadge>
                  </td>
                  <td className="align-middle">
                    <div>
                      <DetailsModal history={history} />
                    </div>
                    <div style={{ cursor: "pointer" }} className="text-center">
                      Details
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="mx-auto">
              <td></td>
              <td></td>
              <td></td>
              <td className=" text-center align-middle">
                <p>Data Tidak Ada</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
