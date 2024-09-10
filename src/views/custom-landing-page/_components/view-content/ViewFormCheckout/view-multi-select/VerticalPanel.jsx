import React from "react";

import CheckBoxMultiSelect from "./CheckBoxMultiSelect";

const VerticalPanel = ({ name, section, inputStyle, control }) => {
  return (
    <div className="tw-flex tw-flex-col">
      {section?.options.map((opt, index) => (
        <div
          key={opt.id}
          style={{
            padding: 10,
            backgroundColor: "#FAFAFA",
            borderTop: index !== 0 && "0.5px solid #E0E0E0",
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
      ))}
    </div>
  );
};

export default VerticalPanel;
