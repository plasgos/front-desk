import React from "react";
import LayoutPackageHistory from "../LayoutPackageHistory";
import { ButtonSection } from "../ButtonSection";

const listSection = [
  { title: "Semua" },
  { title: "Menuju Pickup" },
  { title: "Menunggu Dibayar" },
];

const PendingPackagePage = () => {
  return (
    <LayoutPackageHistory>
      <div
        style={{ gap: 10, overflowX: "auto" }}
        className="d-flex align-items-center "
      >
        {listSection.map((section, index) => (
          <ButtonSection key={index} title={section.title} />
        ))}
      </div>
    </LayoutPackageHistory>
  );
};

export default PendingPackagePage;
