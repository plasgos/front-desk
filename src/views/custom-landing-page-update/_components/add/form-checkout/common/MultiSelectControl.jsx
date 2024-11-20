import { CButton } from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { createUniqueID } from "../../../../../../lib/unique-id";
import {
  setCurrentVariantMultiSelect,
  setIsSelectVariantMultiSelect,
  setSelectedVariant,
} from "../../../../../../modules/custom-landing-page/reducer";
import Input from "../../../common/Input";
import SelectOptions from "../../../common/SelectOptions";
import SelectVariant from "../../../common/SelectVariant";
import { useMoveOption } from "../hooks/moveOption";
import { useRemoveOption } from "../hooks/removeOption";
import { DraggableListOption } from "./DraggableListOption";

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

const typeInputOptions = [
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio" },
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

  const [typeInput, setTypeInput] = useState(
    typeInputOptions.find((opt) => opt.value === currentContent?.typeInput) ||
      optionVariant[0]
  );

  const { isSelectVariantMultiSelect, selectedVariant } = useSelector(
    (state) => state.customLandingPage
  );

  const dispatch = useDispatch();

  const [labelValue] = useDebounce(label, 300);

  useEffect(() => {
    if (labelValue) {
      handleChangeValueContent("label", labelValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelValue]);

  useEffect(() => {
    const initialVariant =
      flattenedOptions.find(
        (option) => option.id === currentContent.designId
      ) || flattenedOptions[0];
    dispatch(
      setSelectedVariant({
        ...initialVariant,
      })
    );
  }, [dispatch, currentContent]);

  const handleVariantChange = (group, option) => {
    dispatch(
      setSelectedVariant({
        ...option,
        group,
      })
    );

    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === idSection) {
          return {
            ...section,
            content: section.content.map((contentItem) => {
              if (
                contentItem.type === "multiSelect" &&
                contentItem.id === currentContent.id
              ) {
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
              if (
                contentItem.type === "multiSelect" &&
                contentItem.id === currentContent.id
              ) {
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

  const removeSection = useRemoveOption(setPreviewSection, "multiSelect");

  const moveSection = useMoveOption(
    setPreviewSection,
    "multiSelect",
    "options"
  );

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section?.content?.map((contentItem, contentIndex) => {
            // Filter atau cari contentItem berdasarkan kondisi tertentu
            if (
              contentItem?.type === "multiSelect" &&
              contentItem.id === currentContent.id
            ) {
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
                          section.id,
                          dragIndex,
                          hoverIndex,
                          true,
                          contentIndex
                        )
                      }
                      removeSection={() =>
                        removeSection(
                          section.id,
                          contentIndex,
                          optionIndex,
                          option
                        )
                      }
                      setPreviewSection={setPreviewSection}
                      idSection={idSection}
                      idOption={option.id}
                      type="multiSelect"
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
    [
      currentContent.id,
      idSection,
      moveSection,
      removeSection,
      setPreviewSection,
    ]
  );

  const openVariantMultiSelect = () => {
    dispatch(
      setCurrentVariantMultiSelect({
        ...selectedVariant,
        contentId: currentContent.id,
      })
    );
    dispatch(setIsSelectVariantMultiSelect(true));
  };

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
            <div onClick={openVariantMultiSelect} className="w-50">
              <SelectOptions
                label="Desain"
                value={selectedVariant}
                width="100"
                menuIsOpen={false}
              />
            </div>

            <SelectOptions
              label="Tipe Input"
              options={typeInputOptions}
              value={typeInput}
              width="50"
              onChange={(selectedOption) => {
                setTypeInput(selectedOption);
                handleChangeValueContent("typeInput", selectedOption.value);
              }}
            />
          </div>

          <Input
            type="text"
            value={label}
            label="Nama"
            onChange={(e) => {
              const { value } = e.target;
              setLabel(value);
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
