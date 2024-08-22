import { CCard, CCardBody } from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoCloseOutline, IoMenu, IoSettingsOutline } from "react-icons/io5";
import { useDrag, useDrop } from "react-dnd";

import { MdTextFields, MdViewColumn } from "react-icons/md";
import { PiArrowsDownUpLight, PiTargetDuotone } from "react-icons/pi";
import { FaGripLines, FaListCheck } from "react-icons/fa6";
import { RxSwitch } from "react-icons/rx";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { IoMdImages } from "react-icons/io";

export const ItemTypes = {
  CARD: "card",
};

const iconListContent = [
  {
    name: "text",
    icon: <MdTextFields style={{ marginRight: 5 }} size={24} />,
  },
  {
    name: "column-text-and-image",
    icon: <MdViewColumn style={{ marginRight: 5 }} size={24} />,
  },
  {
    name: "empty-space",
    icon: <PiArrowsDownUpLight style={{ marginRight: 5 }} size={24} />,
  },
  {
    name: "list-images",
    icon: <IoMdImages style={{ marginRight: 5 }} size={24} />,
  },
  {
    name: "scroll-target",
    icon: <PiTargetDuotone style={{ marginRight: 5 }} size={24} />,
  },
  {
    name: "button",
    icon: <RxSwitch style={{ marginRight: 5 }} size={24} />,
  },
  {
    name: "testimony",
    icon: <BsFillChatSquareQuoteFill style={{ marginRight: 5 }} size={24} />,
  },
  {
    name: "line",
    icon: <FaGripLines style={{ marginRight: 5 }} size={24} />,
  },
  {
    name: "list-feature",
    icon: <FaListCheck style={{ marginRight: 5 }} size={24} />,
  },
];

export const ListSectionContent = ({
  index,
  id,
  section,
  moveSection,
  editSection,
  removeSection,
  focusContent,
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
  useEffect(() => {
    const selectedIcon = iconListContent.find(
      (icon) => icon.name === section.name
    );
    if (selectedIcon) {
      setIcon(selectedIcon);
    }
  }, [section.name]);

  return (
    <div style={{ opacity }} ref={ref} data-handler-id={handlerId}>
      <CCard style={{ cursor: "move" }} className="mb-2">
        <CCardBody style={{ padding: "5px 10px 5px 10px" }}>
          <div style={{ gap: 10 }} className="d-flex align-items-center">
            <IoMenu style={{ cursor: "move" }} size={18} />

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

            <FaMagnifyingGlass
              onClick={() => focusContent()}
              style={{ cursor: "pointer" }}
              size={14}
            />
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
