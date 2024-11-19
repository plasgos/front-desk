import {
  CButton,
  CCard,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { IoIosPhonePortrait, IoIosTabletPortrait } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdLaptopMac } from "react-icons/md";
import FooterAndNavbarControl from "./common/FooterAndNavbarControl";
import Input from "./common/Input";
import DesignTabControl from "./DesignTabControl";
import ListContent from "./list-add-content";
import Footer from "./list-add-content/footer";
import Navbar from "./list-add-content/navbar";

const MenuContent = ({
  editing,
  toggleModal,
  pageSetting,
  setPageSetting,
  handleChangeTitlePage,
  isSelectedView,
  setIsSelectedView,
  previewSection,
  setPreviewSection,
  previewNavbar,
  setPreviewNavbar,
  previewFooter,
  setPreviewFooter,
  previewFloatingSection,
  setPreviewFloatingSection,
  renderEditSection,
  renderListContent,
  renderListSectionFloating,
  handleContentFocus,
  handleSectionContentFocus,
  handleColumnFocus,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [navbarIsVisible, setNavbarIsVisible] = useState(false);
  const [isEditNavbar, setIsEditNavbar] = useState(false);

  const [footerIsVisble, setFooterIsVisble] = useState(false);
  const [isEditFooter, setIsEditFooter] = useState(false);

  const [isHideSideBar, setIsHideSideBar] = useState(false);

  const handleHideSideBar = () => {
    setIsHideSideBar((prev) => !prev);
  };

  const viewIcon = {
    laptop: <MdLaptopMac size={20} />,
    tablet: <IoIosTabletPortrait size={20} />,
    phone: <IoIosPhonePortrait size={20} />,
  };

  const viewTypes = Object.keys(viewIcon);

  const handleToggleNavbar = () => {
    const newNavbarVisibility = !navbarIsVisible;

    setNavbarIsVisible(newNavbarVisibility);

    setPreviewNavbar((arr) =>
      arr.map((section) => ({
        ...section,
        isShowNavbar: newNavbarVisibility,
      }))
    );
  };

  const handleToggleFooter = () => {
    const newFooterVisibility = !footerIsVisble;

    setFooterIsVisble(newFooterVisibility);

    setPreviewFooter((arr) =>
      arr.map((section) => ({
        ...section,
        isShowFooter: newFooterVisibility,
      }))
    );
  };

  return (
    <>
      <aside
        className={`${
          !isHideSideBar ? "" : "animate__animated animate__slideOutLeft"
        }`}
        style={{
          width: isHideSideBar ? "0px" : "410px",
          transition: "width 0.3s ease",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          top: 0,
          left: 0,
          height: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
          }}
        >
          {!editing && !isAddContent && !isEditFooter && !isEditNavbar && (
            <>
              <div className="d-flex justify-content-end align-items-center border-bottom p-3">
                <div>
                  <CButton
                    onClick={toggleModal}
                    color="primary"
                    variant="outline"
                    className="mx-2"
                  >
                    Kembali
                  </CButton>

                  <CButton color="primary">Simpan</CButton>
                </div>
              </div>
            </>
          )}
        </div>

        <div
          style={{
            flex: 1,
          }}
        >
          {!editing && !isAddContent && !isEditFooter && !isEditNavbar && (
            <CTabs activeTab="konten">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="konten">Kolom</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="desain">Desain</CNavLink>
                </CNavItem>
              </CNav>

              <CTabContent
                style={{
                  overflowY: "auto",
                  height: "calc(100vh - 140px)",
                  backgroundColor: "#F5F5F5",
                }}
              >
                <CTabPane data-tab="konten">
                  <div
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)",
                    }}
                    className=" w-100 p-3 mb-3 border-bottom   "
                  >
                    <Input
                      label="Nama halaman"
                      placeholder="Masukan judul di sini"
                      type="text"
                      value={pageSetting.title}
                      onChange={(e) => handleChangeTitlePage(e.target.value)}
                    />
                  </div>

                  <div style={{ padding: "0px 20px" }}>
                    <FooterAndNavbarControl
                      label="Navigasi"
                      isVisible={navbarIsVisible}
                      toggleVisible={handleToggleNavbar}
                      editSection={() => setIsEditNavbar(true)}
                      handleFocus={() =>
                        handleContentFocus(previewNavbar[0]?.id)
                      }
                    />

                    {previewSection.map((section, index) =>
                      renderListContent(section, index)
                    )}

                    <CCard
                      style={{ cursor: "pointer", marginBottom: 8 }}
                      onClick={() => setIsAddContent(true)}
                    >
                      <CCardBody className="p-1">
                        <div className="d-flex align-items-center ">
                          <IoAdd
                            style={{
                              cursor: "pointer",
                              margin: "0px 10px 0px 6px",
                            }}
                            size={18}
                          />

                          <div>Tambah Konten</div>
                        </div>
                      </CCardBody>
                    </CCard>

                    <FooterAndNavbarControl
                      label="Footer"
                      isVisible={footerIsVisble}
                      toggleVisible={handleToggleFooter}
                      editSection={() => setIsEditFooter(true)}
                      handleFocus={() =>
                        handleContentFocus(previewFooter[0]?.id)
                      }
                    />

                    {previewFloatingSection.map((section, index) =>
                      renderListSectionFloating(section, index)
                    )}
                  </div>
                </CTabPane>
                <CTabPane data-tab="desain">
                  <DesignTabControl
                    previewSection={previewSection}
                    setPreviewSection={(value) => setPreviewSection(value)}
                    previewFloatingSection={previewFloatingSection}
                    setPreviewFloatingSection={(value) =>
                      setPreviewFloatingSection(value)
                    }
                    pageSetting={pageSetting}
                    setPageSetting={(value) => setPageSetting(value)}
                  />
                </CTabPane>
              </CTabContent>
            </CTabs>
          )}

          {editing && (
            <div>
              {previewSection.map((section) => (
                <div key={section.id}>{renderEditSection(section)}</div>
              ))}

              {previewFloatingSection.map((section) => (
                <div key={section.id}>{renderEditSection(section)}</div>
              ))}
            </div>
          )}

          {isAddContent && (
            <ListContent
              previewSection={previewSection}
              setPreviewSection={(value) => setPreviewSection(value)}
              isShowContent={(value) => setIsAddContent(value)}
              previewFloatingSection={previewFloatingSection}
              setPreviewFloatingSection={setPreviewFloatingSection}
              handleColumnFocus={handleColumnFocus}
              handleSectionContentFocus={handleSectionContentFocus}
              pageSetting={pageSetting}
            />
          )}

          {isEditNavbar && (
            <div>
              <Navbar
                previewSection={previewNavbar}
                setPreviewSection={setPreviewNavbar}
                isShowContent={(value) => setIsEditNavbar(value)}
                pageSetting={pageSetting}
                setPageSetting={(value) => setPageSetting(value)}
                handleSectionContentFocus={handleSectionContentFocus}
              />
            </div>
          )}

          {isEditFooter && (
            <div>
              <Footer
                previewSection={previewFooter}
                setPreviewSection={setPreviewFooter}
                isShowContent={(value) => setIsEditFooter(value)}
                pageSetting={pageSetting}
                setPageSetting={(value) => setPageSetting(value)}
                handleSectionContentFocus={handleSectionContentFocus}
              />
            </div>
          )}
        </div>

        <div
          style={{
            zIndex: 10,
            backgroundColor: "white",
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
          className="d-flex justify-content-between align-items-center border rounded-sm p-2 shadow-sm "
        >
          <div
            className="d-flex align-items-center "
            style={{ cursor: "pointer" }}
          >
            {viewTypes.map((view) => (
              <div
                key={view}
                onClick={() => setIsSelectedView(view)}
                style={{
                  backgroundColor:
                    isSelectedView === view ? "#fa541c" : "transparent",
                }}
                className="border p-1 px-2 "
              >
                {React.cloneElement(viewIcon[view], {
                  color: isSelectedView === view ? "white" : "black",
                })}
              </div>
            ))}
          </div>
          <CButton
            onClick={handleHideSideBar}
            active={isHideSideBar}
            variant="outline"
            color="primary"
          >
            <FaChevronLeft size={14} />
          </CButton>
        </div>
      </aside>

      {isHideSideBar && (
        <div
          style={{
            position: "absolute",
            left: 20,
            bottom: 20,
            zIndex: 9999,
          }}
        >
          <CButton
            onClick={handleHideSideBar}
            active={isHideSideBar}
            variant="outline"
            color="primary"
          >
            <FaChevronLeft size={14} />
          </CButton>
        </div>
      )}
    </>
  );
};

export default MenuContent;
