import React from "react";

const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  readOnly,
  isPhoneNumber,
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
      {isPhoneNumber ? (
        <div className="form-group mb-0">
          <div className="d-flex align-items-center mb-2">
            <label style={{ fontSize: 12 }} className="p-0 m-0">
              {label}
            </label>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                +62
              </span>
              <input
                style={{ borderRadius: "0px 0.5rem 0.5rem 0px", height: 38 }}
                aria-describedby="basic-addon1"
                placeholder="8114002323"
                value={value}
                onChange={onChange}
                type="number"
                className="form-control"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="form-group ">
          {label && <label>{label}</label>}
          <input
            value={value || ""}
            onChange={onChange}
            type={type}
            className="form-control"
            placeholder={placeholder}
            readOnly={readOnly}
          />
        </div>
      )}
    </>
  );
};

export default Input;
