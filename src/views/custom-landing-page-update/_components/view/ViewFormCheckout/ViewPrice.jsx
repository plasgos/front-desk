import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ViewPrice = ({
  style,
  label,
  control,
  rules,
  placeholder,
  minValue,
  maxValue,
  type,
  index,
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

  const { setValue } = useFormContext();

  const [formattedValue, setFormattedValue] = useState("");

  const formatNumber = (value) => {
    if (!value) return "";
    return value
      .replace(/\D/g, "") // Menghapus semua karakter non-digit
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Menambahkan titik setiap ribuan
  };

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

    const newFormattedValue = formatNumber(numericValue.toString());
    setFormattedValue(newFormattedValue);
    field.onChange(numericValue);
  };

  const handleChange = (e) => {
    const rawValue = parseNumber(e.target.value);
    setFormattedValue(formatNumber(rawValue));
  };

  useEffect(() => {
    if (label !== undefined) {
      setValue(`customField[${index}].label`, label);
      setValue(`customField[${index}].type`, type);
    }
  }, [index, label, setValue, type]);

  useEffect(() => {
    setValue(`customField[${index}].value`, formattedValue);
  }, [formattedValue, index, setValue]);

  return (
    <>
      <div style={{ marginBottom: 16 + distance }}>
        <Controller
          name={`customField[${index}].label`}
          control={control}
          defaultValue={label}
          render={({ field: { value: labelValue, onChange } }) => (
            <label
              className={`${fontStyle}`}
              style={{ fontSize: fontSizeLabel, color: labelColor }}
            >
              {labelValue}
            </label>
          )}
        />

        <div className="tw-flex tw-flex-col tw-w-full">
          <Controller
            name={`customField[${index}].value`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <div className="tw-relative tw-w-full">
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
                    type="text"
                    placeholder={placeholder}
                    value={formattedValue}
                    onChange={(e) => {
                      handleChange(e);
                      field.onChange(parseNumber(e.target.value));
                    }}
                    onBlur={(e) => handleBlur(e, field)}
                    className="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 tw-text-sm tw-pl-12 tw-pr-4 tw-text-right tw-placeholder-slate-300"
                    aria-label={label}
                  />
                  <span
                    style={{ fontSize: 16 }}
                    className="tw-absolute tw-left-3 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-text-gray-600"
                  >
                    Rp
                  </span>
                </div>
                {error && (
                  <p className="tw-text-red-500 tw-text-sm">{error.message}</p>
                )}
              </>
            )}
            rules={rules}
          />
        </div>
      </div>
    </>
  );
};

export default ViewPrice;
