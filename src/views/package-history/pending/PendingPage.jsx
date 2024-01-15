import React from "react";
import LayoutPackageHistory from "../LayoutPackageHistory";
import { ButtonSection } from "../ButtonSection";
import { FilterSection } from "../FilterSection";
import { TablePackageHistory } from "../TablePackageHistory";

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
        className="d-flex align-items-center p-2 "
      >
        {listSection.map((section, index) => (
          <ButtonSection key={index} title={section.title} />
        ))}
      </div>
      <div>
        <FilterSection />
        <TablePackageHistory />
      </div>
    </LayoutPackageHistory>
  );
};

export default PendingPackagePage;
