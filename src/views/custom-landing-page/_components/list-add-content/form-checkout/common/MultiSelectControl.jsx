import React, { useCallback, useState } from "react";
import Input from "../../../common/Input";
import SelectOptions from "../../../common/SelectOptions";
import SelectVariant from "../../../common/SelectVariant";
import { useDispatch, useSelector } from "react-redux";
import { setIsSelectVariantMultiSelect } from "../../../../../../redux/modules/custom-landing-page/reducer";
import { useRemoveOption } from "../hooks/removeOption";
import { useMoveOption } from "../hooks/moveOption";
import { CButton } from "@coreui/react";
import { IoAdd } from "react-icons/io5";
import { DraggableListOption } from "./DraggableListOption";
import { createUniqueID } from "../../../../../../lib/unique-id";

const optionVariant = [
  {
    group: "Checkbox",
    options: [
      { id: "1", value: "vertical", label: "Vertical" },
      { id: "2", value: "horizontal", label: "Horizontal" },
    ],
  },
  {
    group: "Panel",
    options: [
      { id: "3", value: "vertical", label: "Vertical" },
      { id: "4", value: "double", label: "Double" },
      { id: "5", value: "triple", label: "Triple" },
    ],
  },
];

const flattenedOptions = optionVariant.flatMap((group) =>
  group.options.map((option) => ({
    ...option,
    group: group.group,
  }))
);

const MultiSelectControl = ({
  idSection,
  currentContent,
  handleChangeValueContent,
  previewSection,
  setPreviewSection,
}) => {
  const [label, setLabel] = useState(currentContent?.label || "Nama");

  const [optionCounter, setOptionCounter] = useState(1);

  const [selectedVariant, setSelectedVariant] = useState(
    flattenedOptions.find(
      (option) => option.id === currentContent.designId || flattenedOptions[0]
    )
  );
  const { isSelectVariantMultiSelect } = useSelector(
    (state) => state.customLandingPage
  );

  const dispacth = useDispatch();

  const handleVariantChange = (group, option) => {
    setSelectedVariant({ ...option, group });
    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === idSection) {
          return {
            ...section,
            content: section.content.map((contentItem) => {
              if (contentItem.type === "multiSelect") {
                return {
                  ...contentItem,
                  designId: option.id,
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

  const handleAddOption = () => {
    let uniqueId = createUniqueID([]);

    let newOption = {
      id: uniqueId,
      label: `Opsi ${optionCounter}`,
      value: false,
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === idSection) {
          return {
            ...section,
            content: section.content.map((contentItem) => {
              if (contentItem.type === "multiSelect") {
                return {
                  ...contentItem,
                  options: [...contentItem.options, newOption],
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

  const removeSection = useRemoveOption(setPreviewSection);
  const moveSection = useMoveOption(setPreviewSection);

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section?.content?.map((contentItem, contentIndex) => {
            // Filter atau cari contentItem berdasarkan kondisi tertentu
            if (contentItem?.type === "multiSelect") {
              return (
                <div key={contentItem.id || contentIndex}>
                  {contentItem?.options?.map((option, optionIndex) => (
                    <DraggableListOption
                      key={option.id || optionIndex}
                      index={optionIndex}
                      id={option.id}
                      showInfoText={option.label}
                      moveSection={(dragIndex, hoverIndex) =>
                        moveSection(
                          section.name,
                          dragIndex,
                          hoverIndex,
                          true,
                          contentIndex
                        )
                      }
                      removeSection={() =>
                        removeSection(section.id, contentIndex, optionIndex)
                      }
                      setPreviewSection={setPreviewSection}
                      idSection={idSection}
                      idOption={option.id}
                    />
                  ))}
                </div>
              );
            }

            // Jika tidak memenuhi kondisi, Anda bisa mengembalikan null atau komponen lainnya
            return null;
          })}
        </div>
      );
    },
    [idSection, moveSection, removeSection, setPreviewSection]
  );

  return (
    <>
      {isSelectVariantMultiSelect ? (
        <SelectVariant
          optionVariant={optionVariant}
          selectedVariant={selectedVariant}
          onChangeVariant={handleVariantChange}
        />
      ) : (
        <div>
          <div style={{ gap: 10 }} className="d-flex align-items-center ">
            <div
              onClick={() => {
                dispacth(setIsSelectVariantMultiSelect(true));
              }}
              className="w-50"
            >
              <SelectOptions
                label="Desain"
                value={selectedVariant}
                width="100"
                menuIsOpen={false}
              />
            </div>
          </div>

          <Input
            type="text"
            value={label}
            label="Nama"
            onChange={(e) => {
              const { value } = e.target;
              setLabel(value);
              handleChangeValueContent("label", value);
            }}
          />

          <h5>Opsi</h5>

          <div>
            {previewSection
              .filter((section) => section.id === idSection)
              .map((section, i) => renderSection(section, i))}
          </div>

          <CButton
            onClick={() => {
              setOptionCounter((prevCounter) => prevCounter + 1);
              handleAddOption();
            }}
            className="my-3"
            variant="outline"
            color="primary"
          >
            <div style={{ gap: 10 }} className="d-flex align-items-center">
              <IoAdd size={24} />

              <div>Tambah Opsi</div>
            </div>
          </CButton>
        </div>
      )}
    </>
  );
};

export default MultiSelectControl;
