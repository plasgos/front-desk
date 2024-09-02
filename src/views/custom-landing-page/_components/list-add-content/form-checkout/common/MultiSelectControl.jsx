import React, { useState } from "react";
import Input from "../../../common/Input";
import SelectOptions from "../../../common/SelectOptions";
import SelectVariant from "../../../common/SelectVariant";
import { useDispatch, useSelector } from "react-redux";
import { setIsSelectVariantMultiSelect } from "../../../../../../redux/modules/custom-landing-page/reducer";

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
  currentContent,
  handleChangeValueContent,
  setPreviewSection,
}) => {
  const [label, setLabel] = useState(currentContent?.label || "Nama");

  const [selectedVariant, setSelectedVariant] = useState(
    flattenedOptions.find(
      (option) => option.id === currentContent.designId || flattenedOptions[0]
    )
  );
  console.log("🚀 ~ selectedVariant:", selectedVariant);

  const { isSelectVariantMultiSelect } = useSelector(
    (state) => state.customLandingPage
  );
  console.log("🚀 ~ isSelectVariantMultiSelect:", isSelectVariantMultiSelect);

  const dispacth = useDispatch();

  const handleVariantChange = (group, option) => {
    setSelectedVariant({ ...option, group });
    // setPreviewSection((arr) =>

    //   arr.map((item) => {
    //     const contentIdToCheck = isEditingSection
    //       ? currentSection.id
    //       : setting.id;

    //     return String(item.id) === contentIdToCheck
    //       ? {
    //           ...item,
    //           variant: {
    //             ...item.variant,
    //             group,
    //             id: option.id,
    //             name: option.value,
    //             style,
    //           },
    //         }
    //       : item;
    //   })
    // );

    // if (!isEditingSection) {
    //   setSetting((prev) => ({
    //     ...prev,
    //     variant: {
    //       ...prev.variant,
    //       group,
    //       id: option.id,
    //       name: option.value,
    //       style,
    //     },
    //   }));
    // }
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
        </div>
      )}
    </>
  );
};

export default MultiSelectControl;
