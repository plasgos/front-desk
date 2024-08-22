import React from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import { CTooltip } from "@coreui/react";
import { FaCircleInfo } from "react-icons/fa6";

const WhatsAppInput = ({
  id,
  whatApps,
  handlePhoneNumberChange,
  handleMessageChange,
  handleUrlOpenNewTabWaChange,
}) => (
  <>
    <div className="form-group">
      <div className="d-flex align-items-center mb-2">
        <label className="p-0 m-0">Nomor Telepon</label>
        <CTooltip content="Aka langsung membuka aplikasi Whatapps untuk memulai percakapan dengan nomor tertera ">
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
            value={whatApps.phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            type="number"
            className="form-control"
          />
        </div>
      </div>
      <Input
        label="Pesan (Opsional)"
        value={whatApps.message}
        onChange={(e) => handleMessageChange(e.target.value)}
        type="text"
        placeholder="Tuliskan pesan kamu di sini"
      />
      <Checkbox
        id={id}
        checked={whatApps.isOpenNewTab}
        onChange={(e) => handleUrlOpenNewTabWaChange(e.target.checked)}
        label="Buka di tab baru"
      />
    </div>
  </>
);

export default WhatsAppInput;
