import React from "react";
import { formatPrice } from "../../../lib/format-price";

export const ProductInfo = () => {
  return (
    <div>
      <table className="table table-hover">
        <thead className="">
          <tr>
            <th className="py-4" scope="col">
              INFO PRODUK
            </th>
            <th className="py-4" scope="col">
              JUMLAH
            </th>
            <th className="py-4" scope="col">
              HARGA SATUAN
            </th>
            <th className="py-4" scope="col">
              TOTAL HARGA
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="text-primary mb-2 font-weight-bold font-lg">
                RadianceRenew Moisturizing Cream
              </div>
              <div>
                Berat : <span className="font-weight-bold">250 gr</span>
              </div>
            </td>
            <td>1</td>
            <td>{formatPrice(60000)}</td>
            <td>{formatPrice(60000)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
