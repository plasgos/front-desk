import React, { useState } from "react";
import Checkbox from "../../common/Checkbox";
import SelectOptions from "../../common/SelectOptions";

const typeVariableOptions = [
  { value: "custom", label: "Custom" },
  { value: "data-from-order", label: "Data dari order" },
];

const VariableUpdate = ({ setPreviewSection, currentSection }) => {
  const [typeVariable, setTypeVariable] = useState(typeVariableOptions[0]);

  const [isRandomList, setIsRandomList] = useState(
    currentSection?.isRandomList || false
  );

  const handleUpdateVariable = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              [key]: value,
            }
          : section
      )
    );
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Tipe Variable"
          options={typeVariableOptions}
          onChange={(selectedOption) => {
            setTypeVariable(selectedOption);
            handleUpdateVariable("typeVariable", selectedOption.value);
          }}
          value={typeVariable}
          width="50"
        />

        <Checkbox
          id="random-list"
          label="Urutan Acak"
          checked={isRandomList}
          onChange={(e) => {
            const { checked } = e.target;
            setIsRandomList(checked);
            handleUpdateVariable("isRandomList", checked);
          }}
        />
      </div>
    </div>
  );
};

export default VariableUpdate;
