import { CCard, CCardBody } from "@coreui/react";
import React, { useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoCloseOutline, IoMenu, IoSettingsOutline } from "react-icons/io5";
import { useDrag, useDrop } from "react-dnd";

export const ItemTypes = {
  CARD: "card",
};

export const ImagesList = ({
  index,
  id,
  section,
  moveSection,
  editSection,
  removeSection,
  // focusContent,
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

  return (
    <div style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <CCard style={{ cursor: "move" }} className="mb-2">
        <CCardBody style={{ padding: "0px 10px 0px 10px" }}>
          <div style={{ gap: 10 }} className="d-flex align-items-center">
            <IoMenu style={{ cursor: "move" }} size={18} />

            <div
              style={{
                width: 60,
                height: 40,
                overflow: "hidden",
              }}
            >
              <img
                src={section?.content?.image}
                alt="img"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            <div
              style={{
                flexGrow: 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: 80,
                fontSize: 14,
              }}
            >
              {section?.content?.title}
            </div>

            {/* <FaMagnifyingGlass
              onClick={() => focusContent()}
              style={{ cursor: "pointer" }}
              size={16}
            /> */}
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
        </CCardBody>
      </CCard>
    </div>
  );
};
