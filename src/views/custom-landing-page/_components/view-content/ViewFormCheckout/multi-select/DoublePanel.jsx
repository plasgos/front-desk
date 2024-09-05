import React from "react";
import CheckboxFormCheckout from "../../../common/CheckboxFormCheckout";

const DoublePanel = ({ section, inputStyle, control }) => {
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
            <CheckboxFormCheckout
              typeInput={section.typeInput}
              style={inputStyle}
              label={opt.label}
              name={`custom-${section.type}.${opt.id}.value`}
              control={control}
              rules={{
                required: section.isRequired ? "Harus Di isi" : false,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DoublePanel;
