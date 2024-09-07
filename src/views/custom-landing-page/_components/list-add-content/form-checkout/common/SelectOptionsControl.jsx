import React, { useCallback, useEffect, useState } from "react";
import Input from "../../../common/Input";
import { DraggableListOption } from "./DraggableListOption";
import { useRemoveOption } from "../hooks/removeOption";
import { useMoveOption } from "../hooks/moveOption";
import { CButton } from "@coreui/react";
import { createUniqueID } from "../../../../../../lib/unique-id";
import { IoAdd } from "react-icons/io5";
import SelectOptions from "../../../common/SelectOptions";
import { DraggableListGroupOption } from "./DraggableGroupOption";
import { useDispatch, useSelector } from "react-redux";
import { addOptionsGroup } from "../../../../../../redux/modules/custom-landing-page/reducer";

// const defaultValueOption = [
//   {
//     label: "Basic Opsi",
//     options: [
//       { value: undefined, label: "Tidak Ada" },
//       { value: "firstOption", label: "Opsi Pertama" },
//     ],
//   },
//   {
//     label: "Opsi",
//     options: [],
//   },
// ];

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
  const { optionsGroups } = useSelector((state) => state.customLandingPage);
  console.log("🚀 ~ optionsGroups:", optionsGroups);

  const [label, setLabel] = useState(currentContent?.label || "Nama");
  const [placeholder, setPlaceholder] = useState(
    currentContent?.placeholder || "Pilih Opsi"
  );
  const [optionCounter, setOptionCounter] = useState(1);
  const [optionGroupCounter, setOptionGroupCounter] = useState(1);

  const [defaultValueOption, setDefaultValueOption] = useState([
    {
      label: "Basic Opsi",
      options: [
        { value: undefined, label: "Tidak Ada" },
        { value: "firstOption", label: "Opsi Pertama" },
      ],
    },
    {
      label: "Opsi",
      options: [], // Ini akan diisi dengan data dari optionsGroups
    },
  ]);

  const [defaultValue, setDefaultValue] = useState(
    defaultValueOption
      .flatMap((group) => group.options)
      .find((opt) => opt.value === currentContent.defaultValue) ||
      defaultValueOption[0].options[0]
  );

  console.log("🚀 ~ defaultValue:", defaultValue);
  const [typeOption, setTypeOption] = useState(
    typeOptions.find(
      (opt) => opt.value === currentContent?.typeOption || typeOptions[0]
    )
  );

  useEffect(() => {
    // Ambil opsi dari optionsGroups tanpa reduce
    const newOptions = [];
    optionsGroups.forEach((group) => {
      group.options.forEach((option) => {
        newOptions.push({
          value: option.value,
          label: option.label,
        });
      });
    });

    // Cek apakah data baru berbeda sebelum update state
    const currentOptions = defaultValueOption.find(
      (group) => group.label === "Opsi"
    )?.options;

    const isOptionsChanged =
      currentOptions?.length !== newOptions.length ||
      newOptions.some((newOpt, index) => {
        const currentOpt = currentOptions[index];
        return (
          currentOpt?.value !== newOpt.value ||
          currentOpt?.label !== newOpt.label
        );
      });

    if (isOptionsChanged) {
      setDefaultValueOption((prevOptions) =>
        prevOptions.map((optionGroup) => {
          if (optionGroup.label === "Opsi") {
            return {
              ...optionGroup,
              options: newOptions, // Masukkan opsi baru dari Redux
            };
          }
          return optionGroup;
        })
      );
    }
  }, [defaultValueOption, optionsGroups]);

  useEffect(() => {
    if (currentContent.typeOption) {
      const currentTypeOption = typeOptions.find(
        (opt) => opt.value === currentContent.typeOption
      );

      if (currentTypeOption) {
        setTypeOption(currentTypeOption);
      }
    }
  }, [currentContent.typeOption]);

  useEffect(() => {
    if (currentContent.defaultValue) {
      const currentDefaultValue = defaultValueOption
        .flatMap((group) => group.options)
        .find((opt) => opt.value === currentContent.defaultValue);

      if (currentDefaultValue) {
        setDefaultValue(currentDefaultValue);
      }
    }
  }, [currentContent.defaultValue, defaultValueOption]);

  const dispatch = useDispatch();

  const removeSection = useRemoveOption(setPreviewSection, "options");
  const moveSection = useMoveOption(
    setPreviewSection,
    "selectOption",
    "options"
  );

  const removeSectionGroup = useRemoveOption(setPreviewSection, "optionsGroup");
  const moveSectionGroup = useMoveOption(
    setPreviewSection,
    "selectOption",
    "optionsGroup"
  );

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
    const uniqueId = createUniqueID([]);

    const newOption = {
      id: uniqueId,
      label: `Opsi ${optionCounter}`,
      value: `${uniqueId}-Opsi ${optionCounter}`,
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

  const handleAddGroup = () => {
    const uniqueIdGroup = createUniqueID(currentContent.optionsGroup);

    const uniqueIdOption = createUniqueID(currentContent.options);

    const newOptionGroup = {
      groupId: uniqueIdGroup,
      label: `Group ${optionGroupCounter}`,
      options: [
        {
          id: uniqueIdOption,
          label: `Opsi 1 `,
          value: `${uniqueIdGroup}-Opsi 1 `,
        },
      ],
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
                  optionsGroup: [...contentItem.optionsGroup, newOptionGroup],
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

    dispatch(addOptionsGroup(newOptionGroup));
  };

  const renderSectionGroup = useCallback(
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
                  {contentItem?.optionsGroup?.map((option, optionIndex) => (
                    <DraggableListGroupOption
                      key={option.groupId || optionIndex}
                      index={optionIndex}
                      id={option.groupId}
                      showInfoText={option.label}
                      moveSection={(dragIndex, hoverIndex) =>
                        moveSectionGroup(
                          section.name,
                          dragIndex,
                          hoverIndex,
                          true,
                          contentIndex,
                          option.groupId
                        )
                      }
                      removeSection={() =>
                        removeSectionGroup(
                          section.id,
                          contentIndex,
                          optionIndex,
                          option.groupId,
                          setDefaultValue
                        )
                      }
                      setPreviewSection={setPreviewSection}
                      idSection={idSection}
                      idOption={option.groupId}
                      type="selectOption"
                      options={option.options}
                      setDefaultValue={setDefaultValue}
                      defaultValue={defaultValue}
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
      moveSectionGroup,
      removeSectionGroup,
      setPreviewSection,
    ]
  );

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

        {!defaultValue.value && (
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
        )}
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

      {typeOption.value === "group" ? (
        <div className="mb-3">
          <h5>Group Opsi</h5>
          <div>
            {previewSection
              .filter((section) => section.id === idSection)
              .map((section, i) => renderSectionGroup(section, i))}
          </div>

          <CButton
            onClick={() => {
              setOptionGroupCounter((prevCounter) => prevCounter + 1);

              handleAddGroup();
            }}
            className="my-3"
            variant="outline"
            color="primary"
          >
            <div style={{ gap: 10 }} className="d-flex align-items-center">
              <IoAdd size={24} />

              <div>Tambah Group</div>
            </div>
          </CButton>
        </div>
      ) : (
        <div>
          <h5>Single Opsi</h5>

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
    </div>
  );
};

export default SelectOptionsControl;
