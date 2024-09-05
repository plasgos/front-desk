import React from "react";
import CheckboxFormCheckout from "../../../common/CheckboxFormCheckout";

const TriplePanel = ({ section, inputStyle, control }) => {
  return (
    <div className="tw-flex tw-flex-wrap">
      {section?.options.map((opt, index) => {
        const isLastRow = index >= section.options.length - 3; // Tiga item terakhir
        const isFirstInRow = index % 3 === 0; // Index 0, 3, 6, dst.
        const isSecondInRow = index % 3 === 1; // Index 1, 4, 7, dst.

        return (
          <div
            key={opt.id}
            className="tw-w-1/3"
            style={{
              padding: 10,
              backgroundColor: "#FAFAFA",
              borderRight:
                isFirstInRow || isSecondInRow ? "0.5px solid #E0E0E0" : "none", // Border kanan untuk kolom 1 dan 2
              borderBottom: !isLastRow ? "0.5px solid #E0E0E0" : "none", // Border bawah kecuali tiga item terakhir
            }}
          >
            <CheckboxFormCheckout
              typeInput={section.typeInput}
              style={inputStyle}
              label={opt.label}
              name={`custom-${section.type}.${opt.id}.value`}
              control={control}
              rules={{
                required: section.isRequired ? "Harus Diisi" : false,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TriplePanel;
