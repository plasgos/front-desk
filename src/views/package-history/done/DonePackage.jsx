import React from "react";
import LayoutPackageHistory from "../LayoutPackageHistory";
import { ButtonSection } from "../_components/ButtonSection";
import { FilterSection } from "../_components/FilterSection";
import { TablePackageHistory } from "../_components/TablePackageHistory";

const listSection = [
  { title: "Semua" },
  { title: "Sampai Tujuan" },
  { title: "Breach" },
  { title: "Breach Finish" },

  { title: "Klaim Paket Hilang Selesai" },
  { title: "Klaim Paket Rusak Selesai" },
  { title: "Ditolak" },
  { title: "Dimusnahkan" },
];

const DonePackagePage = () => {
  return (
    <LayoutPackageHistory>
      <div
        style={{ gap: 10, overflowX: "auto" }}
        className="d-flex align-items-center p-2"
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

export default DonePackagePage;
