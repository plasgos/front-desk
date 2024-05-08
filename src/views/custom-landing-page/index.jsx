import React from "react";
import { ViewTextAndImage } from "./_components/Commons";
import {
  CCard,
  CCardBody,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";

import image from "../../assets/action-figure.jpg";

import { FiMenu } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { IoMenu, IoCloseOutline, IoSettingsOutline } from "react-icons/io5";

const CustomLandingPage = () => {
  return (
    <div>
      <CRow>
        <CCol md="4">
          <CTabs activeTab="kolom">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="kolom">Kolom</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="desain">Desain</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="background">Background</CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="kolom">
                <CCard className="mt-3">
                  <CCardBody style={{ padding: "0px 10px 0px 10px" }}>
                    <div
                      style={{ gap: 10 }}
                      className="d-flex align-items-center"
                    >
                      <IoMenu style={{ cursor: "pointer" }} size={18} />

                      <div
                        style={{ width: 60, height: 40, overflow: "hidden" }}
                      >
                        <img
                          src={image}
                          alt="img"
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          flexGrow: 1,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          width: 100,
                          fontSize: 14,
                        }}
                      >
                        Rahasia untuk maju adalah memulai
                      </div>

                      <FaMagnifyingGlass
                        style={{ cursor: "pointer" }}
                        size={16}
                      />
                      <IoSettingsOutline
                        style={{ cursor: "pointer" }}
                        size={16}
                      />
                      <IoCloseOutline style={{ cursor: "pointer" }} size={18} />
                    </div>
                  </CCardBody>
                </CCard>
              </CTabPane>
              <CTabPane data-tab="desain">456</CTabPane>
              <CTabPane data-tab="background">789</CTabPane>
            </CTabContent>
          </CTabs>
        </CCol>

        <CCol>
          <ViewTextAndImage />
        </CCol>
      </CRow>
    </div>
  );
};

export default CustomLandingPage;
