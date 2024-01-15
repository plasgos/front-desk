import { CBadge } from "@coreui/react";
import React from "react";
import jne from "../../assets/jne-logo.png";
import { formatPrice } from "../../lib/format-price";
import { IoIosInformationCircleOutline } from "react-icons/io";

export const TablePackageHistory = () => {
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
          <tr>
            <th
              scope="row"
              // className="align-middle"
            >
              1
            </th>
            <td className="align-middle">
              <CBadge color="primary"> Reguler</CBadge>
              <div className="font-weight-bold my-2 ">DID-7681440137</div>
              <div className="text-muted my-2">03 Jan 2024 16:10</div>
              <div className="text-success">Sampai Tujuan</div>
              <div className="text-danger mt-2">...Follow Up</div>
            </td>
            <td className="align-middle">
              <div className="font-weight-bold">Dyan Kastutara</div>
              <div className="my-2">08236813299</div>
              <div>
                Graha Mas Pemuda Jl. Pemuda RT 20/RW 6 Jati Kec. Pulo gadung
                Kota Jakarta Timur Daerah Khusus Ibukota Jakarta 13220 Indonesia
              </div>
            </td>
            <td className="align-middle">
              <div className="font-weight-bold">Mukriji After sales online</div>
              <div className="my-2">08236813299</div>
              <div>
                Graha Mas Pemuda Jl. Pemuda RT 20/RW 6 Jati Kec. Pulo gadung
                Kota Jakarta Timur Daerah Khusus Ibukota Jakarta 13220 Indonesia
              </div>
            </td>
            <td className="align-middle">
              <img style={{ width: 80 }} src={jne} alt="jne-logo" />
              <div className="font-weight-bold mt-2">JNE Express Regular</div>
              <div className="font-weight-bold mt-2">00291367192388</div>
            </td>
            <td className="align-middle">
              <CBadge color="primary">Non-COD</CBadge>
              <CBadge color="danger my-2"> Drop Off</CBadge>
            </td>
            <td className="align-middle">
              <div>{formatPrice(10000)}</div>
              <CBadge color="success my-2"> Bisa Klaim</CBadge>
            </td>
            <td className="text-center align-middle">
              <div style={{ cursor: "pointer" }}>
                <IoIosInformationCircleOutline size={24} />
              </div>
              <div>Details</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
