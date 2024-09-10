import React from "react";

import CheckBoxMultiSelect from "./CheckBoxMultiSelect";

const DoublePanel = ({ name, section, inputStyle, control }) => {
  return (
    <div className="tw-flex tw-flex-wrap tw-justify-between">
      {section?.options.map((opt, index) => {
        const isLastRow = index >= section.options.length - 2; // Dua item terakhir
        const isEvenIndex = index % 2 === 0; // Index genap

        return (
          <div
            key={opt.id}
            className="tw-w-1/2"
            style={{
              padding: 10,
              backgroundColor: "#FAFAFA",
              borderRight: isEvenIndex ? "0.5px solid #E0E0E0" : "none",
              borderBottom: !isLastRow ? "0.5px solid #E0E0E0" : "none",
            }}
          >
            <CheckBoxMultiSelect
              typeInput={section.typeInput}
              style={inputStyle}
              label={opt.label}
              name={name}
              control={control}
              required={section.isRequired}
              indexMultiSelect={index}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DoublePanel;
