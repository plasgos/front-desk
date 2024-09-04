import React, { useEffect, useState } from "react";
import Input from "../../../common/Input";
import SelectOptions from "../../../common/SelectOptions";

const subdistrictOption = [
  { value: "search", label: "Pencarian" },
  { value: "menu", label: "Menu" },
];

const CustomFieldControl = ({
  currentContent,
  handleChangeValueContent,
  typeOptionValue,
}) => {
  const [subdictrictType, setSubdictrictType] = useState(
    subdistrictOption?.find((opt) => opt.value === currentContent.design) ||
      subdistrictOption[0]
  );

  const [label, setLabel] = useState(currentContent?.label || "");

  const [placeholder, setPlaceholder] = useState(
    currentContent?.placeholder || ""
  );

  const [minLength, setMinLength] = useState(currentContent?.minLength || "");

  const [minValue, setMinValue] = useState(currentContent?.minValue || "");

  const [maxValue, setMaxValue] = useState(currentContent?.maxValue || "");

  useEffect(() => {
    setPlaceholder(currentContent?.placeholder || "");
    setLabel(currentContent?.label || "");
    setMinLength(currentContent?.minLength || "");
  }, [currentContent]);

  return (
    <div>
      {typeOptionValue === "subdistrict" && (
        <SelectOptions
          label="Desain"
          options={subdistrictOption}
          onChange={(selectedOption) => {
            setSubdictrictType(selectedOption);
            handleChangeValueContent("subdistrict", selectedOption.value);
          }}
          value={subdictrictType}
          width="50"
        />
      )}

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

      {typeOptionValue !== "counter" && (
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

      {typeOptionValue === "addressC" || typeOptionValue === "longText" ? (
        <Input
          type="number"
          value={minLength}
          label="Panjang Minimum"
          onChange={(e) => {
            const { value } = e.target;
            setMinLength(value);
            handleChangeValueContent("minLength", value);
          }}
        />
      ) : null}

      {typeOptionValue === "number" ||
      typeOptionValue === "price" ||
      typeOptionValue === "counter" ? (
        <div style={{ gap: 10 }} className="d-flex align-items-center ">
          <Input
            type="number"
            value={minValue}
            label="Minimum Nilai"
            onChange={(e) => {
              const { value } = e.target;
              setMinValue(value);
              handleChangeValueContent("minValue", value);
            }}
          />

          <Input
            type="number"
            value={maxValue}
            label="Maximum Nilai"
            onChange={(e) => {
              const { value } = e.target;
              setMaxValue(value);
              handleChangeValueContent("maxValue", value);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CustomFieldControl;
