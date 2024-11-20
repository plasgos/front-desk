import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import { CTooltip } from "@coreui/react";
import { FaCircleInfo } from "react-icons/fa6";

const WhatsAppInput = ({
  id,
  whatsapp,
  handlePhoneNumberChange,
  handleMessageChange,
  handleUrlOpenNewTabWaChange,
}) => {
  const handleKeyDown = (e) => {
    // Cegah input jika bukan angka, backspace, atau tombol navigasi
    if (
      !/^[0-9]$/.test(e.key) && // Hanya izinkan angka 0-9
      e.key !== "Backspace" && // Izinkan backspace
      e.key !== "ArrowLeft" && // Izinkan navigasi kiri
      e.key !== "ArrowRight" && // Izinkan navigasi kanan
      e.key !== "Delete" && // Izinkan delete
      e.key !== "Tab" // Izinkan tab untuk navigasi
    ) {
      e.preventDefault(); // Cegah inputan lain
    }
  };

  return (
    <>
      <div className="form-group">
        <div className="d-flex align-items-center mb-2">
          <label className="p-0 m-0">Nomor Telepon</label>
          <CTooltip content="Aka langsung membuka aplikasi whatsapp untuk memulai percakapan dengan nomor tertera ">
            <FaCircleInfo style={{ marginLeft: 4 }} size={12} />
          </CTooltip>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              +62
            </span>
            <input
              style={{ borderRadius: "0px 0.5rem 0.5rem 0px" }}
              aria-describedby="basic-addon1"
              placeholder="8114002323"
              value={whatsapp.phoneNumber || ""}
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
              type="number"
              className="form-control"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <Input
          label="Pesan (Opsional)"
          value={whatsapp.message || ""}
          onChange={(e) => handleMessageChange(e.target.value)}
          type="text"
          placeholder="Tuliskan pesan kamu di sini"
        />
        <Checkbox
          id={id}
          checked={whatsapp.isOpenNewTab}
          onChange={(e) => handleUrlOpenNewTabWaChange(e.target.checked)}
          label="Buka di tab baru"
        />
      </div>
    </>
  );
};

export default WhatsAppInput;
