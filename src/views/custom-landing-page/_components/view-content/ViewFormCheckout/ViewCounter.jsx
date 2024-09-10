import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ViewCounter = ({
  style,
  label,
  control,
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

  const name = `customField[${index}].value`;

  const parseNumberMinValue = Number(minValue);
  const parseNumberMaxValue = Number(maxValue);

  const { setValue } = useFormContext();

  const [formattedValue, setFormattedValue] = useState("");

  const incrementValue = () => {
    setFormattedValue((prev) => {
      if (prev >= parseNumberMaxValue) {
        return parseNumberMaxValue;
      }

      const newValue = prev + 1;

      return newValue > parseNumberMaxValue ? parseNumberMaxValue : newValue;
    });
  };

  useEffect(() => {
    if (minValue) {
      setFormattedValue(parseNumberMinValue);
    }
  }, [minValue, name, parseNumberMinValue, setValue]);

  const decrementValue = () => {
    setFormattedValue((prev) => {
      if (prev <= parseNumberMinValue) {
        return parseNumberMinValue;
      }

      const newValue = prev - 1;

      return newValue < parseNumberMinValue ? parseNumberMinValue : newValue;
    });
  };

  const handleBlur = (e, field) => {
    let numericValue = Number(e.target.value);

    if (isNaN(numericValue)) {
      numericValue = ""; // Set ke string kosong jika nilai bukan angka
    } else if (
      parseNumberMinValue !== undefined &&
      numericValue < parseNumberMinValue
    ) {
      numericValue = parseNumberMinValue; // Atur ke minValue jika nilai di bawah minValue
    } else if (
      parseNumberMaxValue !== undefined &&
      numericValue > parseNumberMaxValue
    ) {
      numericValue = parseNumberMaxValue; // Atur ke maxValue jika nilai di atas maxValue
    }

    setFormattedValue(numericValue);
    field.onChange(numericValue);
  };

  const handleChange = (e) => {
    const rawValue = Number(e.target.value);
    setFormattedValue(rawValue);
  };

  useEffect(() => {
    setValue(name, formattedValue);
  }, [formattedValue, setValue, name]);

  useEffect(() => {
    if (label !== undefined) {
      setValue(`customField[${index}].label`, label);
      setValue(`customField[${index}].type`, type);
    }
  }, [index, label, setValue, type]);

  return (
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

      <div className="tw-flex tw-items-center">
        <div
          onClick={decrementValue}
          style={{ height: 38 }}
          className="tw-bg-slate-300 tw-text-center tw-py-2 tw-px-3 tw-rounded-l-md tw-cursor-pointer"
        >
          <span style={{ fontSize: 20 }}>-</span>
        </div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
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
                  field.onChange(Number(e.target.value));
                }}
                onBlur={(e) => handleBlur(e, field)}
                className={`tw-w-1/4 tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 tw-text-sm tw-text-center`}
                type="number"
              />
            </>
          )}
        />
        <div
          onClick={incrementValue}
          style={{ height: 38 }}
          className="tw-bg-slate-300 tw-text-center tw-py-2 tw-px-3 tw-rounded-r-md tw-cursor-pointer"
        >
          <span style={{ fontSize: 20 }}>+</span>
        </div>
      </div>
    </div>
  );
};

export default ViewCounter;
