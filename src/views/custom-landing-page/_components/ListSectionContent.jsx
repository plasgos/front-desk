import { CCard, CCardBody } from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoCloseOutline, IoMenu, IoSettingsOutline } from "react-icons/io5";

import { dataListContent } from "./list-add-content/DataListContent";

export const ItemTypes = {
  CARD: "card",
};

export const ListSectionContent = ({
  index,
  id,
  section,
  moveSection,
  editSection,
  removeSection,
  focusContent,
  isMultiColumn,
}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      if (section.name.includes("floating")) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveSection(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

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
    <div style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <CCard
        style={{
          cursor: section.name !== "floating-button" ? "move" : "not-allowed",
        }}
        className="mb-2"
      >
        <CCardBody style={{ padding: "5px 10px 5px 10px" }}>
          <div style={{ gap: 10 }} className="d-flex align-items-center">
            <IoMenu
              style={{
                cursor:
                  section.name !== "floating-button" ? "move" : "not-allowed",
                color: section.name !== "floating-button" ? "" : "#cccccc",
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

            {isMultiColumn || section.name.includes("floating") ? null : (
              <FaMagnifyingGlass
                onClick={() => focusContent()}
                style={{ cursor: "pointer" }}
                size={14}
              />
            )}
            <div style={{ gap: 10 }} className="d-flex ">
              <IoSettingsOutline
                onClick={() => editSection()}
                style={{ cursor: "pointer" }}
                size={16}
              />
              <IoCloseOutline
                onClick={() => removeSection(index, section.id)}
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
