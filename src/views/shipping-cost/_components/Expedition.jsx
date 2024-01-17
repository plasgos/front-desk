import React from "react";
import { formatPrice } from "../../../lib/format-price";
import ncs from "../../../assets/ncs-logo.png";

export const Expedition = () => {
  return (
    <div style={{ flexGrow: 1 }} className="card shadow-sm p-3 rounded ">
      <div className="font-weight-bold mb-3">Ekspedisi</div>
      <button type="button" className="btn btn-primary">
        Regular
      </button>
      <div className="d-flex justify-content-between align-items-center mt-2 p-3 shadow-sm rounded mb-3">
        <div className="">
          <div className="font-weight-bold mb-2">NCS Regular Service</div>
          <div className="font-weight-bold mb-2">
            <span style={{ color: "skyblue" }}>Non COD</span> &{" "}
            <span style={{ color: "purple" }}>COD</span>
          </div>
          <div className="font-weight-bold mb-2">2-3 Hari</div>
          <div className="font-weight-bold mb-2 text-muted">
            Ongkir :{" "}
            <span
              style={{ textDecoration: "line-through" }}
              className="text-decoration-line-through text-danger mr-1"
            >
              {formatPrice(18000)}
            </span>{" "}
            <span> {formatPrice(17000)}</span>
          </div>
          <div className="font-weight-bold mb-2 text-muted">
            Nilai Barang : {formatPrice(2500000)}
          </div>
          <div className="font-weight-bold mb-2 text-muted">
            Biaya COD : {formatPrice(75702)}
          </div>
          <div className="font-weight-bold mb-2 text-muted">
            Asuransi : {formatPrice(6300)}
          </div>
          <div className="font-weight-bold mb-2 text-success">
            Nilai COD : {formatPrice(2599102)}
          </div>
        </div>

        <div>
          <img style={{ width: 80 }} src={ncs} alt="ncs-logo" />
        </div>
      </div>
    </div>
  );
};
