import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { PickUpAddressModal } from "./modal/PickUpAddressModal";

export const SenderDetails = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="font-weight-bold font-lg">Detail Pengirim</div>

        <div>
          <PickUpAddressModal />
        </div>
      </div>
      <div className="card p-3 shadow-sm rounded">
        <div
          style={{ backgroundColor: "#D7E3FF", gap: 15 }}
          className="d-flex align-items-center p-3 rounded"
        >
          <div style={{ color: "#2D61AC" }}>
            <RiErrorWarningFill size={32} />
          </div>
          <div>
            <div className="font-weight-bold mb-2">Belum Pin Lokasi</div>
            <div>
              Untuk pengiriman menggunakan ekpedisi{" "}
              <span className="font-wight-bold">
                Lion Parcel atau Pos Indonesia,
              </span>{" "}
              alamat pengirim harus di sertai dengan pin lokasi
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex align-items-center mt-3">
            <div className="font-weight-bold font-lg mr-3">Dyan Kastutara</div>
            <div>
              <span className="badge badge-success">Kantor</span>
            </div>
            <div className="ml-auto">
              <button className="btn btn-outline-primary">
                <FaEdit size={18} className="mr-2" />
                <span>Edit Alamat</span>
              </button>
            </div>
          </div>

          <div className="my-2">08034678129</div>
          <div>
            Graha Mas Pemuda Jl. Pemuda RT 20/RW 6 Jati Kec. Pulo gadung Kota
            Jakarta Timur Daerah Khusus Ibukota Jakarta 13220 Indonesia
          </div>
        </div>
      </div>
    </div>
  );
};
