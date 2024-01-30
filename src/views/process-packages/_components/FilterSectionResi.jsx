import React from "react";

import "bootstrap-daterangepicker/daterangepicker.css";

import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CLabel,
} from "@coreui/react";

import { IoSearch } from "react-icons/io5";
import { FaRegFileExcel } from "react-icons/fa6";

export const FilterSectionResi = () => {
  return (
    <>
      <div className="shadow-sm  p-3 ">
        <div
          style={{ gap: 10 }}
          className="d-flex flex-wrap justify-content-between align-items-end  "
        >
          <div style={{ flexGrow: 1 }}>
            <CLabel className="font-weight-bold">No Pembayaran</CLabel>
            <CInput type="text" />
          </div>
          <div
            style={{ gap: 100 }}
            className="d-flex justify-content-between align-items-end"
          >
            <div>
              <div>
                <div className="font-weight-bold">Urutkan Berdasar</div>
              </div>
              <CDropdown className="mt-2">
                <CDropdownToggle
                  style={{ width: 120 }}
                  caret
                  className="border d-flex justify-content-between align-items-center"
                >
                  Terbaru
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem style={{ cursor: "pointer" }}>
                    Terbaru
                  </CDropdownItem>
                  <CDropdownItem style={{ cursor: "pointer" }}>
                    Terlama
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>

            <div>
              <CButton style={{ whiteSpace: "nowrap" }} color="primary">
                <IoSearch className="mr-2" />
                Cari
              </CButton>
            </div>
          </div>
        </div>
      </div>

      <div style={{ gap: 10 }} className="d-flex justify-content-end mt-3 pr-3">
        <CButton style={{ whiteSpace: "nowrap" }} color="success">
          <FaRegFileExcel className="mr-2" />
          Export Excel
        </CButton>
      </div>
    </>
  );
};
