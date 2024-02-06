import { CBadge } from "@coreui/react";
import React from "react";
import { formatPrice } from "../../../lib/format-price";

export const TableMutation = () => {
  return (
    <div className="my-3 shadow-sm ">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">NO</th>
            <th scope="col">MUTASI</th>
            <th scope="col">NILAI</th>
            <th scope="col">STATUS</th>
            <th scope="col">TGL DIBUAT/ESTIMASI</th>
            <th scope="col">TGL RILIS</th>
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
              <CBadge color="primary"> COD</CBadge>
              <div className="font-weight-bold my-2 ">DID-7681440137</div>
              <div className="text-muted my-2">00127128534127</div>
            </td>
            <td className="align-middle">
              <div className="font-weight-bold text-success">
                + {formatPrice(22800)}
              </div>
            </td>
            <td className="align-middle">
              <CBadge color="danger"> Cancel</CBadge>
            </td>
            <td className="align-middle">
              <div>11 Jan 2024 09:27</div>
            </td>

            <td className="align-middle">
              <div>-</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
