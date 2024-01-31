import { CButton } from "@coreui/react";
import React from "react";
import { LiaReceiptSolid } from "react-icons/lia";
import { formatPrice } from "../../../lib/format-price";

export const TablePayment = () => {
  return (
    <div className="my-3 shadow-sm ">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="selectAll"
                  // checked
                />
                <label
                  className="custom-control-label"
                  htmlFor="selectAll"
                ></label>
              </div>
            </th>
            <th scope="col">No Pembayaran</th>
            <th scope="col">Jadwal Penjemputan</th>
            <th scope="col">Pembayaran</th>
            <th scope="col">Jumlah Paket</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="align-middle">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                  // checked
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheck1"
                ></label>
              </div>
            </td>
            <td className="align-middle">
              <div className="font-weight-bold my-2 ">DID-7681440137</div>
            </td>
            <td className="align-middle">
              <div className="font-weight-bold">Kamis, 11 Jan 2024 09:26</div>
            </td>
            <td className="align-middle">
              <div className="font-weight-bold">QRIS</div>
              <div className="my-2">{formatPrice(12000)}</div>
            </td>
            <td className="align-middle">
              <div className="font-weight-bold">1</div>
            </td>

            <td className="text-center align-middle">
              <CButton style={{ whiteSpace: "nowrap" }} color="info">
                <LiaReceiptSolid className="mr-2" />
                Resi
              </CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
