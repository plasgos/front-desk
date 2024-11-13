import React from "react";

const SidebarMenu = ({
  toggleSidebar,
  sidebar,
  logo,
  previewNavbar,
  renderViewNavbar,
}) => {
  const { bgColor, lineColor, textColor, isShowSidebar } = sidebar;

  const mobileView = {
    value: true,
    textColor,
  };

  return (
    <div>
      <div
        style={{ zIndex: 9999, backgroundColor: bgColor }}
        className={`tw-absolute tw-p-3 tw-top-0 tw-right-0 tw-h-full tw-w-64  tw-text-white tw-transform tw-transition-transform tw-duration-300 ${
          isShowSidebar ? "tw-translate-x-0" : "tw-translate-x-full"
        }`}
      >
        <div className="tw-flex tw-w-full tw-items-center tw-justify-between tw-mb-2">
          <div style={{ maxWidth: "170px" }}>
            <img
              src={logo?.image}
              alt="logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{ color: lineColor }}
            onClick={() => toggleSidebar(false)}
            className=" tw-text-2xl tw-cursor-pointer "
          >
            X
          </div>
        </div>

        <div
          style={{ height: 1, backgroundColor: lineColor }}
          className="tw-w-full tw-mb-5 "
        ></div>

        <div className="tw-flex tw-flex-col tw-w-full">
          {previewNavbar.map((section) =>
            section.content.map((content) => (
              <div
                style={{
                  marginBottom: content.name !== "divider" ? 20 : 0,
                }}
                key={content?.id}
              >
                {renderViewNavbar(section, content, mobileView)}
              </div>
            ))
          )}
        </div>
      </div>

      {isShowSidebar && (
        <div
          style={{ zIndex: 999 }}
          onClick={() => toggleSidebar(false)}
          className="tw-absolute tw-inset-0 tw-bg-black/50"
        ></div>
      )}
    </div>
  );
};

export default SidebarMenu;
