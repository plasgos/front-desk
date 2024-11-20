import { CNav, CNavItem, CNavLink } from "@coreui/react";
import React from "react";

const NavTabsCustom = ({ tabs, onTabClick }) => {
  return (
    <div
      style={{
        position: "sticky",
        top: 60,
        backgroundColor: "#fff",
        zIndex: 1,
      }}
    >
      <CNav variant="tabs">
        {tabs.map((tab, index) => (
          <CNavItem key={index}>
            <CNavLink
              onClick={onTabClick ? () => onTabClick(tab.value) : () => {}}
              data-tab={tab.value}
            >
              {tab.label}
            </CNavLink>
          </CNavItem>
        ))}
      </CNav>
    </div>
  );
};

export default NavTabsCustom;
