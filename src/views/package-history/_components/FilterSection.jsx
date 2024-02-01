import React, { useState } from "react";

import "bootstrap-daterangepicker/daterangepicker.css";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";

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
import { FaRegFileExcel } from "react-icons/fa";

export const FilterSection = ({
  setFilterInvoice,
  setFilterPackageType,
  setStartDate,
  setEndDate,
}) => {
  const [state, setState] = useState({
    start: moment().subtract(29, "days"),
    end: moment(),
  });

  const { start, end } = state;
  const handleCallback = (start, end) => {
    setState({ start, end });
  };

  const [invoice, setInvoice] = useState("");
  const [packageType, setPackageType] = useState("");
  const handleSearch = () => {
    setFilterInvoice(invoice);
    setFilterPackageType(packageType);
    setStartDate(moment(start._i).format("DD-MM-YYYY"));
    setEndDate(moment(end._i).format("DD-MM-YYYY"));
  };

  return (
    <div className="shadow-sm  p-3 mt-3">
      <div
        style={{ gap: 10 }}
        className="d-flex flex-wrap align-items-center   "
      >
        <div style={{ flexGrow: 1 }}>
          <CLabel className="font-weight-bold">Cari</CLabel>
          <CInput
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
            type="text"
          />
        </div>
        <div style={{ width: 200 }}>
          <CLabel className="font-weight-bold">Tanggal</CLabel>
          <DateRangePicker
            initialSettings={{
              startDate: start.toDate(),
              endDate: end.toDate(),
              alwaysShowCalendars: true,
              showCustomRangeLabel: false,
              minDate:
                moment().subtract(2, "year").toDate() >
                moment("2024-01-01T00:00:00").toDate()
                  ? moment().subtract(2, "year").toDate()
                  : moment("2024-01-01T00:00:00").toDate(),
              maxDate: moment().toDate(),
              ranges: {
                "Last 7 Days": [
                  moment().subtract(7, "days").toDate(),
                  moment().toDate(),
                ],
                "Last 30 Days": [
                  moment().subtract(30, "days").toDate(),
                  moment().toDate(),
                ],
                "Last 90 Days": [
                  moment().subtract(90, "days").toDate(),
                  moment().toDate(),
                ],
              },
              autoApply: true,
              locale: {
                format: "DD-MM-YYYY",
              },
            }}
            onCallback={handleCallback}
          >
            <input type="text" className="form-control" />
          </DateRangePicker>
        </div>

        <div>
          <div className="font-weight-bold">jenis Paket</div>
          <CDropdown className="mt-2">
            <CDropdownToggle
              style={{ width: 200 }}
              caret
              className="border d-flex justify-content-between align-items-center"
            >
              {packageType ? packageType.toUpperCase() : "Semua(COD/Non COD"}
            </CDropdownToggle>
            <CDropdownMenu style={{ width: 200 }}>
              <CDropdownItem
                onClick={() => setPackageType("cod")}
                style={{ cursor: "pointer" }}
              >
                COD
              </CDropdownItem>
              <CDropdownItem
                onClick={() => setPackageType("non-cod")}
                style={{ cursor: "pointer" }}
              >
                NON COD
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
        <CButton
          onClick={handleSearch}
          style={{ whiteSpace: "nowrap" }}
          color="primary"
        >
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
