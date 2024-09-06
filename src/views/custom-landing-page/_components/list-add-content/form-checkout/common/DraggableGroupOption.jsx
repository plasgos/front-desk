import { CCard, CCardBody } from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { IoAdd, IoCloseOutline, IoMenu } from "react-icons/io5";
import { useDrag, useDrop } from "react-dnd";
import { createUniqueID } from "../../../../../../lib/unique-id";

export const ItemTypes = {
  CARD: "card",
};

export const DraggableListGroupOption = ({
  index,
  id,
  showInfoText,
  moveSection,
  removeSection,
  setPreviewSection,
  idSection,
  idOption,
  type,
  options,
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

  const [labelGroup, setLabelGroup] = useState(showInfoText);
  const [optionValue, setOptionValue] = useState([]);

  const [optionCounters, setOptionCounters] = useState({});

  useEffect(() => {
    if (options && options.length > 0) {
      const valueOption = options.map((opt) => ({
        id: opt.id,
        value: opt.value,
        label: opt.label,
      }));
      setOptionValue(valueOption);
    }
  }, [options]);

  const handleChangeLabelGroup = (value, id) => {
    setLabelGroup(value);
    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === idSection) {
          return {
            ...section,
            content: section.content.map((contentItem) => {
              if (contentItem.type === type) {
                return {
                  ...contentItem,
                  optionsGroup: contentItem.optionsGroup.map((opt) =>
                    opt.groupId === id
                      ? {
                          ...opt,
                          group: value,
                        }
                      : opt
                  ),
                };
              }
              return contentItem;
            }),
          };
        }
        return section;
      })
    );
  };

  const handleChangeLabelOption = (value, optionid) => {
    setOptionValue((prevOptionValue) =>
      prevOptionValue.map((opt) =>
        opt.id === optionid ? { ...opt, value: value } : opt
      )
    );

    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === idSection) {
          return {
            ...section,
            content: section.content.map((contentItem) => {
              if (contentItem.type === type) {
                return {
                  ...contentItem,
                  optionsGroup: contentItem.optionsGroup.map((optGroup) => ({
                    ...optGroup,
                    options: optGroup.options.map((item) =>
                      item.id === optionid
                        ? { ...item, label: value, value: `${id}-${value}` }
                        : item
                    ),
                  })),
                };
              }
              return contentItem;
            }),
          };
        }
        return section;
      })
    );
  };

  //   const handleAddOption = () => {
  //     let uniqueId = createUniqueID(options);

  //     let newOption = {
  //       id: uniqueId,
  //       label: `Opsi ${optionCounter}`,
  //       value: `Opsi ${optionCounter}`,
  //     };

  //     setPreviewSection((prevSections) =>
  //       prevSections.map((section) => {
  //         if (section.id === idSection) {
  //           return {
  //             ...section,
  //             content: section.content.map((contentItem) => {
  //               if (contentItem.type === type) {
  //                 return {
  //                   ...contentItem,
  //                   optionsGroup: contentItem.optionsGroup.map((optGroup) => {
  //                     if (optGroup.groupId === id) {
  //                       return {
  //                         ...optGroup,
  //                         options: [...optGroup.options, newOption],
  //                       };
  //                     }
  //                     return optGroup;
  //                   }),
  //                 };
  //               }
  //               return contentItem;
  //             }),
  //           };
  //         }
  //         return section;
  //       })
  //     );
  //   };

  const handleAddOption = (groupId) => {
    setPreviewSection((prevSections) => {
      const updatedSections = prevSections.map((section) => {
        if (section.id === idSection) {
          return {
            ...section,
            content: section.content.map((contentItem) => {
              if (contentItem.type === type) {
                return {
                  ...contentItem,
                  optionsGroup: contentItem.optionsGroup.map((optGroup) => {
                    if (optGroup.groupId === id) {
                      // Ambil dan perbarui counter untuk grup ini
                      const newCounter =
                        (optionCounters[id] || optGroup.options.length) + 1;

                      setOptionCounters((prevCounters) => ({
                        ...prevCounters,
                        [groupId]: newCounter,
                      }));

                      let uniqueId = createUniqueID(options);

                      let newOption = {
                        id: uniqueId,
                        label: `Opsi ${newCounter}`,
                        value: `${id}-Opsi ${newCounter}`,
                      };

                      return {
                        ...optGroup,
                        options: [...optGroup.options, newOption],
                      };
                    }
                    return optGroup;
                  }),
                };
              }
              return contentItem;
            }),
          };
        }
        return section;
      });

      return updatedSections;
    });
  };

  const handleRemoveOption = (optionId) => {
    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === idSection) {
          return {
            ...section,
            content: section.content.map((contentItem) => {
              if (contentItem.type === type) {
                return {
                  ...contentItem,
                  optionsGroup: contentItem.optionsGroup.map((optGroup) => {
                    // Hapus opsi dari grup yang sesuai
                    if (optGroup.groupId === id) {
                      return {
                        ...optGroup,
                        options: optGroup.options.filter(
                          (item) => item.id !== optionId
                        ),
                      };
                    }
                    return optGroup;
                  }),
                };
              }
              return contentItem;
            }),
          };
        }
        return section;
      })
    );
  };

  return (
    <div
      className="shadow-sm p-1 rounded"
      style={{ opacity, marginBottom: 12 }}
    >
      <div style={{ gap: 10 }} className="d-flex ">
        <div ref={ref} data-handler-id={handlerId}>
          <IoMenu style={{ cursor: "move" }} size={18} />
        </div>

        <div style={{ flexGrow: 1 }}>
          <div className="mb-2">
            <div style={{ fontSize: 12, marginBottom: 8 }}>Group</div>
            <CCard style={{ marginBottom: 0 }}>
              <CCardBody className="p-1">
                <div style={{ gap: 10 }} className="d-flex align-items-center">
                  <div>
                    <input
                      id={idOption}
                      value={labelGroup || ""}
                      type="text"
                      style={{ border: "none", outline: "none" }}
                      onChange={(e) => {
                        const { value } = e.target;
                        const { id } = e.target;
                        handleChangeLabelGroup(value, id);
                      }}
                    />
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </div>

          <div className="mb-2">
            <div className="d-flex align-items-center justify-content-between">
              <div style={{ fontSize: 12, marginBottom: 8 }}>Opsi</div>

              {options.length === 0 && (
                <IoAdd
                  onClick={() => {
                    handleAddOption();
                  }}
                  style={{ cursor: "pointer" }}
                  size={18}
                />
              )}
            </div>

            {options?.map((opt) => (
              <div
                key={opt.id}
                style={{ gap: 5, marginBottom: 10 }}
                className="d-flex align-items-center "
              >
                <IoCloseOutline
                  onClick={() => handleRemoveOption(opt.id)}
                  style={{ cursor: "pointer" }}
                  size={18}
                />

                <CCard style={{ cursor: "move", marginBottom: 0, flexGrow: 1 }}>
                  <CCardBody className="p-1">
                    <input
                      id={opt.id}
                      value={
                        optionValue.find((item) => item.id === opt.id)?.label ||
                        ""
                      }
                      type="text"
                      style={{ border: "none", outline: "none" }}
                      onChange={(e) => {
                        const { value } = e.target;
                        const { id } = e.target;
                        handleChangeLabelOption(value, id);
                      }}
                    />
                  </CCardBody>
                </CCard>

                <IoAdd
                  onClick={() => {
                    handleAddOption();
                  }}
                  style={{ cursor: "pointer" }}
                  size={18}
                />
              </div>
            ))}
          </div>
        </div>

        <IoCloseOutline
          onClick={() => removeSection()}
          style={{ cursor: "pointer" }}
          size={18}
        />
      </div>
    </div>
  );
};
