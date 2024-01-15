import React from "react";
import LayoutPackageHistory from "../LayoutPackageHistory";
import { ButtonSection } from "../ButtonSection";
import { FilterSection } from "../FilterSection";

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
      </div>
    </LayoutPackageHistory>
  );
};

export default DonePackagePage;
