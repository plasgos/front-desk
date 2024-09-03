import React from "react";
import CheckboxFormCheckout from "../../../common/CheckboxFormCheckout";

const VerticalPanel = ({ section, inputStyle, control }) => {
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
          <CheckboxFormCheckout
            style={inputStyle}
            label={opt.label}
            name={`custom-${section.type}.${opt.id}.value`}
            // name={`custom-${section.type}[${opt.id}]`}
            control={control}
            rules={{
              required: section.isRequired ? "Harus Di isi" : false,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default VerticalPanel;
