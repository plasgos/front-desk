import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const TextArea = ({
  style,
  label,
  rules,
  control,
  placeholder,
  height,
  minLength,
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
      <Controller
        name={`customField[${index}].value`}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <textarea
              minLength={minLength ? +minLength : ""}
              style={{
                height: height,
                borderRadius,
                color: textInputColor,
                backgroundColor: bgInputColor,
                fontSize: fontSizeTextInputColor,
                borderColor: outlineInputColor,
                borderWidth: outlineInputColorSize,
                borderStyle: "solid",
              }}
              {...field}
              type="text"
              className={`tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 tw-text-sm tw-placeholder-slate-300`}
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
  );
};

export default TextArea;
