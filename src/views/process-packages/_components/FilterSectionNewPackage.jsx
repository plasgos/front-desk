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
import { FaRegTrashAlt } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import { GoPackageDependencies } from "react-icons/go";
import { GoPackageDependents } from "react-icons/go";

export const FilterSectionNewPackage = () => {
  return (
    <>
      <div className="shadow-sm  p-3 ">
        <div
          style={{ gap: 10 }}
          className="d-flex flex-wrap justify-content-between align-items-end  "
        >
          <div style={{ gap: 12 }} className="d-flex">
            <div>
              <CLabel className="font-weight-bold">Order ID</CLabel>
              <CInput type="text" />
            </div>
            <div>
              <CLabel className="font-weight-bold">Nama Atau Nomor HP</CLabel>
              <CInput type="text" />
            </div>
            <div>
              <div>
                <div className="font-weight-bold">Ekspedisi</div>
              </div>
              <CDropdown className="mt-2">
                <CDropdownToggle
                  style={{ width: 120 }}
                  caret
                  className="border d-flex justify-content-between align-items-center"
                >
                  Semua
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem style={{ cursor: "pointer" }} header>
                    Header
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
            <div>
              <div className="font-weight-bold">Tipe</div>
              <CDropdown className="mt-2">
                <CDropdownToggle
                  style={{ width: 120 }}
                  caret
                  className="border d-flex justify-content-between align-items-center"
                >
                  Semua
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem style={{ cursor: "pointer" }}>
                    COD
                  </CDropdownItem>
                  <CDropdownItem style={{ cursor: "pointer" }}>
                    NON COD
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
            <div>
              <div className="font-weight-bold">Urutkan Berdasar</div>
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
          </div>

          <div>
            <CButton style={{ whiteSpace: "nowrap" }} color="primary">
              <IoSearch className="mr-2" />
              Cari
            </CButton>
          </div>
        </div>
      </div>

      <div style={{ gap: 10 }} className="d-flex justify-content-between my-4">
        <div>
          <CButton
            variant="outline"
            className="mr-2"
            style={{ whiteSpace: "nowrap" }}
            color="info"
            shape="pill"
          >
            <GoPackageDependencies className="mr-2" />
            Pick Up
          </CButton>

          <CButton
            variant="outline"
            style={{ whiteSpace: "nowrap" }}
            color="primary"
            shape="pill"
          >
            <GoPackageDependents className="mr-2" />
            Drop Off
          </CButton>
        </div>

        <div>
          <CButton
            className="mr-2"
            style={{ whiteSpace: "nowrap" }}
            color="danger"
          >
            <FaRegTrashAlt className="mr-2" />
            Hapus Paket (0)
          </CButton>

          <CButton style={{ whiteSpace: "nowrap" }} color="primary">
            <FaDollarSign className="mr-2" />
            Proses Paket (0)
          </CButton>
        </div>
      </div>
    </>
  );
};
