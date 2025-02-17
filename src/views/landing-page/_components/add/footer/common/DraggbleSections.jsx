import { CCard, CCardBody } from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoCloseOutline, IoMenu, IoSettingsOutline } from "react-icons/io5";

import { listContentsFooterOption } from "../ListContentFooter";
import { listContentsNavbarOption } from "../../navbar/ListContentNavbar";

export const ItemTypes = {
  CARD: "card",
};

export const DraggableSections = ({
  index,
  id,
  section,
  moveSection,
  editSection,
  removeSection,
  focusContent,
  titleContent,
  titleContentItem,
  showThumbnail,
  hiddenFocus,
  isNavbar,
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

  const sourceIcon = isNavbar
    ? listContentsNavbarOption
    : listContentsFooterOption;

  useEffect(() => {
    const selectedIcon = sourceIcon.filter(
      (icon) => icon.name === section.name
    );

    if (selectedIcon) {
      setIcon(selectedIcon[0]); // Set icon yang ditemukan
    }
  }, [section.name, sourceIcon]);

  return (
    <div style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <CCard
        style={{
          cursor: "move",
        }}
        className="mb-2"
      >
        <CCardBody style={{ padding: "5px 10px 5px 10px" }}>
          <div style={{ gap: 10 }} className="d-flex align-items-center">
            <IoMenu
              style={{
                cursor: "move",
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

            {showThumbnail && (
              <div
                style={{
                  width: 60,
                  height: 40,
                  overflow: "hidden",
                }}
              >
                <img
                  src={showThumbnail}
                  alt="img"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            <div
              style={{
                flexGrow: 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: 80,
              }}
              className="capitalize"
            >
              {titleContent}{" "}
              {titleContentItem ? (
                <span style={{ fontStyle: "italic", color: "#9EA0A1" }}>
                  - {titleContentItem}
                </span>
              ) : (
                ""
              )}
            </div>

            {hiddenFocus ? null : (
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
                onClick={() => removeSection()}
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
