import React from "react";

const SidebarMenu = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div>
      <div
        style={{ zIndex: 9999999 }}
        className={`tw-absolute  tw-top-0 tw-right-0 tw-h-full tw-w-64 tw-bg-gray-800 tw-text-white tw-transform tw-transition-transform tw-duration-300 ${
          isSidebarOpen ? "tw-translate-x-0" : "tw-translate-x-full"
        }`}
      >
        <div className="tw-p-4">
          <h2 className="tw-text-xl tw-font-semibold">Right Sidebar</h2>
          <p>This sidebar slides in from the right.</p>
        </div>

        {/* Tombol untuk menutup sidebar */}
        <button
          onClick={() => toggleSidebar(false)}
          className="tw-absolute tw-top-2 tw-left-2 tw-p-1 tw-bg-red-500 tw-rounded tw-text-white"
        >
          Close
        </button>
      </div>

      {isSidebarOpen && (
        <div
          onClick={() => toggleSidebar(false)}
          className="tw-absolute tw-inset-0 tw-bg-black/50"
        ></div>
      )}
    </div>
  );
};

export default SidebarMenu;
