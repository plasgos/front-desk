import React, { useCallback, useState } from "react";
import Input from "../../../common/Input";
import { DraggableListOption } from "./DraggableListOption";
import { useRemoveOption } from "../hooks/removeOption";
import { useMoveOption } from "../hooks/moveOption";
import { CButton } from "@coreui/react";
import { createUniqueID } from "../../../../../../lib/unique-id";
import { IoAdd } from "react-icons/io5";
import SelectOptions from "../../../common/SelectOptions";

const defaultValueOption = [
  { value: undefined, label: "Tidak Ada" },
  { value: "firstOption", label: "Opsi Pertama" },
];

const typeOptions = [
  { value: "single", label: "Single" },
  { value: "group", label: "Group" },
];

const SelectOptionsControl = ({
  idSection,
  currentContent,
  handleChangeValueContent,
  previewSection,
  setPreviewSection,
}) => {
  const [label, setLabel] = useState(currentContent?.label || "Nama");
  const [placeholder, setPlaceholder] = useState(
    currentContent?.placeholder || "Pilih Opsi"
  );
  const [optionCounter, setOptionCounter] = useState(1);

  const [defaultValue, setDefaultValue] = useState(
    defaultValueOption.find(
      (opt) =>
        opt.value === currentContent?.defaultValue || defaultValueOption[0]
    )
  );

  const [typeOption, setTypeOption] = useState(
    typeOptions.find(
      (opt) => opt.value === currentContent?.typeOption || typeOptions[0]
    )
  );

  const removeSection = useRemoveOption(setPreviewSection);
  const moveSection = useMoveOption(setPreviewSection, "selectOption");

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section?.content?.map((contentItem, contentIndex) => {
            // Filter atau cari contentItem berdasarkan kondisi tertentu
            if (
              contentItem?.type === "selectOption" &&
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
                      type="selectOption"
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

  const handleAddOption = () => {
    let uniqueId = createUniqueID([]);

    let newOption = {
      id: uniqueId,
      label: `Opsi ${optionCounter}`,
      value: `Opsi ${optionCounter}`,
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === idSection) {
          return {
            ...section,
            content: section.content.map((contentItem) => {
              if (
                contentItem.type === "selectOption" &&
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

    // setSetting(newOption);
  };

  return (
    <div>
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

      <h5>Default</h5>

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Default"
          options={defaultValueOption}
          value={defaultValue}
          width="50"
          onChange={(selectedOption) => {
            setDefaultValue(selectedOption);
            handleChangeValueContent("defaultValue", selectedOption.value);
          }}
        />

        <Input
          type="text"
          value={placeholder}
          label="Placeholder"
          onChange={(e) => {
            const { value } = e.target;
            setPlaceholder(value);
            handleChangeValueContent("placeholder", value);
          }}
        />
      </div>

      <SelectOptions
        label="Tipe Opsi"
        options={typeOptions}
        value={typeOption}
        width="50"
        onChange={(selectedOption) => {
          setTypeOption(selectedOption);
          handleChangeValueContent("typeOption", selectedOption.value);
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
  );
};

export default SelectOptionsControl;
