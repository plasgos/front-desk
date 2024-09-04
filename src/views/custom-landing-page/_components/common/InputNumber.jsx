import React, { useState } from "react";
import { Controller } from "react-hook-form";

const InputNumber = ({
  style,
  label,
  name,
  control,
  rules,
  placeholder,
  minValue,
  maxValue,
}) => {
  const {
    labelColor,
    textInputColor,
    bgInputColor,
    outlineInputColor,
    fontSizeLabel,
    fontStyle,
    fontSizeTextInputColor,
    outlineInputColorSize,
    borderRadius,
    distance,
  } = style || {};

  const [formattedValue, setFormattedValue] = useState("");

  const parseNumber = (value) => {
    return value.replace(/\./g, "");
  };

  const handleBlur = (e, field) => {
    let rawValue = parseNumber(e.target.value);
    let numericValue = parseInt(rawValue, 10);

    if (isNaN(numericValue)) {
      numericValue = ""; // Set ke string kosong jika nilai bukan angka
    } else if (minValue !== undefined && numericValue < minValue) {
      numericValue = minValue; // Atur ke minValue jika nilai di bawah minValue
    } else if (maxValue !== undefined && numericValue > maxValue) {
      numericValue = maxValue; // Atur ke maxValue jika nilai di atas maxValue
    }

    setFormattedValue(numericValue);
    field.onChange(numericValue);
  };

  const handleChange = (e) => {
    const rawValue = parseNumber(e.target.value);
    setFormattedValue(rawValue);
  };

  return (
    <>
      <div style={{ marginBottom: 16 + distance }}>
        {label && (
          <label
            className={`${fontStyle}`}
            style={{ fontSize: fontSizeLabel, color: labelColor }}
          >
            {label}
          </label>
        )}

        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                style={{
                  borderRadius,
                  height: 38,
                  color: textInputColor,
                  backgroundColor: bgInputColor,
                  fontSize: fontSizeTextInputColor,
                  borderColor: outlineInputColor,
                  borderWidth: outlineInputColorSize,
                  borderStyle: "solid",
                }}
                {...field}
                value={formattedValue}
                onChange={(e) => {
                  handleChange(e);
                  field.onChange(parseNumber(e.target.value));
                }}
                onBlur={(e) => handleBlur(e, field)}
                type="number"
                className={`tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 tw-text-sm tw-placeholder-slate-300 `}
                placeholder={placeholder}
              />
              {error && (
                <span className="tw-text-red-500 tw-text-sm">
                  {error.message}
                </span>
              )}
            </>
          )}
        />
      </div>
    </>
  );
};

export default InputNumber;
