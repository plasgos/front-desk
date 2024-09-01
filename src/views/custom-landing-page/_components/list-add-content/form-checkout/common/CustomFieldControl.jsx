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
  console.log("🚀 ~ currentContent:", currentContent);
  const [subdictrictType, setSubdictrictType] = useState(
    subdistrictOption?.find((opt) => opt.value === currentContent.design) ||
      subdistrictOption[0]
  );

  const [label, setLabel] = useState(currentContent?.label || "");

  const [placeholder, setPlaceholder] = useState(
    currentContent?.placeholder || ""
  );
  const [defaultValue, setDefaultValue] = useState(
    currentContent?.defaultValue || ""
  );

  useEffect(() => {
    setPlaceholder(currentContent?.placeholder || "");
    setLabel(currentContent?.label || "");
    setDefaultValue(currentContent?.defaultValue || "");
  }, [currentContent]);

  const [minLength, setMinLength] = useState(currentContent?.minLength || "");
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

      {typeOptionValue !== "subdistrict" && (
        <Input
          type="text"
          value={defaultValue}
          label="Default"
          onChange={(e) => {
            const { value } = e.target;
            setDefaultValue(value);
            handleChangeValueContent("defaultValue", value);
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
    </div>
  );
};

export default CustomFieldControl;
