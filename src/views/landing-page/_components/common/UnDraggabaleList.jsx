import { CCard, CCardBody } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { IoCloseOutline, IoMenu, IoSettingsOutline } from "react-icons/io5";
import { dataListContent } from "../add/DataListContent";

export const ItemTypes = {
  CARD: "card",
};

export const UnDraggabelList = ({
  index,
  section,
  editSection,
  removeSection,
}) => {
  const [icon, setIcon] = useState(undefined);

  useEffect(() => {
    const selectedIcon = dataListContent
      .map((group) => ({
        ...group,
        sections: group.sections.filter((icon) => icon.name === section.name), // Hanya ambil yang sesuai
      }))
      .find((group) => group.sections.length > 0); // Cari grup yang memiliki icon yang cocok

    if (selectedIcon) {
      setIcon(selectedIcon.sections[0]); // Set icon yang ditemukan
    }
  }, [section.name]);

  return (
    <div>
      <CCard
        style={{
          cursor: "not-allowed",
        }}
        className="mb-2"
      >
        <CCardBody style={{ padding: "5px 10px 5px 10px" }}>
          <div style={{ gap: 10 }} className="d-flex align-items-center">
            <IoMenu
              style={{
                cursor: "not-allowed",
                color: "#cccccc",
              }}
              size={18}
            />

            {icon && (
              <>
                <div
                  style={{
                    overflow: "hidden",
                  }}
                >
                  {icon.icon}
                </div>
              </>
            )}

            <div style={{ flexGrow: 1 }} className="capitalize">
              {section.title}
            </div>

            <div style={{ gap: 10 }} className="d-flex ">
              <IoSettingsOutline
                onClick={() => editSection()}
                style={{ cursor: "pointer" }}
                size={16}
              />
              <IoCloseOutline
                onClick={() => removeSection(section.id)}
                style={{ cursor: "pointer" }}
                size={18}
              />
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};
