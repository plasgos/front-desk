import { CCard, CCardBody } from "@coreui/react";
import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

const FooterAndNavbarControl = ({
  label,
  handleFocus,
  editSection,
  isVisible,
  toggleVisible,
}) => {
  return (
    <CCard className="mb-2">
      <CCardBody style={{ padding: "8px" }}>
        <div
          style={{ gap: 10 }}
          className="d-flex align-items-center justify-content-between px-2"
        >
          <div>{label}</div>

          <div style={{ gap: 10 }} className="d-flex">
            {isVisible && (
              <>
                <FaMagnifyingGlass
                  onClick={() => handleFocus()}
                  style={{ cursor: "pointer" }}
                  size={14}
                />

                <IoSettingsOutline
                  onClick={() => editSection()}
                  style={{ cursor: "pointer" }}
                  size={16}
                />
              </>
            )}

            {isVisible ? (
              <AiFillEye
                onClick={toggleVisible}
                style={{ cursor: "pointer" }}
                size={18}
              />
            ) : (
              <AiFillEyeInvisible
                onClick={toggleVisible}
                style={{ cursor: "pointer" }}
                size={18}
              />
            )}
          </div>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default FooterAndNavbarControl;
