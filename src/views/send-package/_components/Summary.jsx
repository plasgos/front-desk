import React, { useState } from "react";
import { formatPrice } from "../../../lib/format-price";
import { CButton, CSwitch } from "@coreui/react";
import { RiErrorWarningFill } from "react-icons/ri";
import { GoQuestion } from "react-icons/go";

export const Summary = () => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleSwitch = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="mb-3">
      <div className="pt-3 card p-3 shadow-sm">
        <div className="card shadow-sm p-3 ">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="font-weight-bold mb-1">Asuransi</div>
              <div className="text-success">
                Biaya Asuransi {formatPrice(5300)}
              </div>
            </div>
            <div>
              <CSwitch
                shape="pill"
                color="primary"
                checked={isChecked}
                onChange={toggleSwitch}
              />
            </div>
          </div>
        </div>

        <div style={{ gap: 10 }} className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">Layanan</div>
            <div className="font-weight-bold">JNE</div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">Ongkir</div>
            <div className="font-weight-bold mb-2 text-success">
              <span
                style={{ textDecoration: "line-through" }}
                className="text-decoration-line-through text-danger mr-1"
              >
                {formatPrice(12000)}
              </span>{" "}
              <span> {formatPrice(10560)}</span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">Biaya Asuransi</div>
            <div className="font-weight-bold">{formatPrice(53000)}</div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">COD Fee</div>
            <div className="font-weight-bold">{formatPrice(6000)}</div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">Nilai Barang</div>
            <div className="font-weight-bold">{formatPrice(150000)}</div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className=" font-weight-bold text-primary">
              Ditagih ke Penerima
            </div>
            <div className="font-weight-bold text-primary">
              {formatPrice(200000)}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="font-weight-bold text-success">
              Estimasi Pencairan
            </div>
            <div className="d-flex align-items-center">
              <div className="font-weight-bold text-success">
                {formatPrice(178140)}
              </div>
              <GoQuestion className="ml-2 text-success" />
            </div>
          </div>

          <div className="">
            <div
              style={{ backgroundColor: "#D7E3FF", gap: 15 }}
              className="d-flex justify-content-between align-items-center rounded p-2"
            >
              <div
                className="d-flex  align-items-center"
                style={{ color: "#2D61AC" }}
              >
                <RiErrorWarningFill size={18} />
                <span className="ml-2">Syarat & Ketentuan</span>
              </div>
              <div style={{ color: "#2D61AC" }}>Details</div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-end">
        <CButton className="btn-outline-primary">Batal</CButton>
        <CButton className="ml-3" color="primary">
          Kirim
        </CButton>
      </div>
    </div>
  );
};
