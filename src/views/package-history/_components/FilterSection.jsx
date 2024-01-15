import React, { useState, useRef } from "react";

// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import DateRangePicker from "react-bootstrap-daterangepicker";

import {
  CButton,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CInput,
  CLabel,
} from "@coreui/react";

import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaRegFileExcel } from "react-icons/fa";

export const FilterSection = () => {
  const [selectedDate, setSelectedDate] = useState("");
  console.log("🚀 ~ FilterSection ~ selectedDate:", selectedDate);
  // const inputRef = useRef(null);

  const handleDateChange = (event, picker) => {
    setSelectedDate(
      picker.startDate.format("MM/DD/YYYY") +
        " - " +
        picker.endDate.format("MM/DD/YYYY")
    );
  };

  // const handleInputChange = () => {
  //   // Access the input value using the ref
  //   const inputValue = inputRef.current.value;
  //   // Do something with the input value
  //   console.log("Input Value:", inputValue);
  // };

  return (
    <div className="shadow-sm  p-3 mt-3">
      <div
        style={{ gap: 10 }}
        className="d-flex flex-wrap align-items-center   "
      >
        <div style={{ flexGrow: 1 }}>
          <CLabel className="font-weight-bold">Cari</CLabel>
          <CInput type="text" />
        </div>
        <div style={{ width: 200 }}>
          <CLabel className="font-weight-bold">Tanggal</CLabel>
          <DateRangePicker onApply={handleDateChange}>
            <input
              // ref={inputRef}
              type="text"
              className="form-control"
              // onChange={handleInputChange}
            />
          </DateRangePicker>
        </div>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="font-weight-bold">Tipe Tanggal</div>
            <FaRegCircleQuestion />
          </div>
          <CDropdown className="mt-2">
            <CDropdownToggle
              style={{ width: 200 }}
              caret
              className="border d-flex justify-content-between align-items-center"
            >
              Paket Dibuat
            </CDropdownToggle>
            <CDropdownMenu style={{ width: 200 }}>
              <CDropdownItem style={{ cursor: "pointer" }} header>
                Header
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
        <div>
          <div className="font-weight-bold">jenis Paket</div>
          <CDropdown className="mt-2">
            <CDropdownToggle
              style={{ width: 200 }}
              caret
              className="border d-flex justify-content-between align-items-center"
            >
              Semua(COD/Non COD)
            </CDropdownToggle>
            <CDropdownMenu style={{ width: 200 }}>
              <CDropdownItem style={{ cursor: "pointer" }} header>
                Header
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
        <div>
          <div className="font-weight-bold">Ekspedisi</div>
          <CDropdown className="mt-2">
            <CDropdownToggle
              style={{ width: 200 }}
              caret
              className="border d-flex justify-content-between align-items-center"
            >
              Semua
            </CDropdownToggle>
            <CDropdownMenu style={{ width: 200 }}>
              <CDropdownItem style={{ cursor: "pointer" }} header>
                Header
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </div>

      <div style={{ gap: 10 }} className="d-flex justify-content-end mt-3">
        <CButton style={{ whiteSpace: "nowrap" }} color="primary">
          <IoSearch className="mr-2" />
          Cari
        </CButton>

        <CButton style={{ whiteSpace: "nowrap" }} color="primary">
          <FaRegFileExcel className="mr-2" />
          Export Excel
        </CButton>
      </div>
    </div>
  );
};
