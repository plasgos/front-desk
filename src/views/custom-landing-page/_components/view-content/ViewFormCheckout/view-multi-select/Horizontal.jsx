import React from "react";
import CheckBoxMultiSelect from "./CheckBoxMultiSelect";

const Horizontal = ({ name, section, inputStyle, control }) => {
  return (
    <div className="tw-flex tw-flex-wrap tw-gap-x-3">
      {section?.options.map((opt, index) => (
        <div key={opt.id}>
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

export default Horizontal;
