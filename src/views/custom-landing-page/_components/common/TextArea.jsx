import React from "react";
import { Controller } from "react-hook-form";

const TextArea = ({
  style,
  label,
  name,
  defaultValue = "",
  rules,
  control,
  type = "text",
  placeholder,
  height,
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

  return (
    <div style={{ marginBottom: 16 + distance }} className="form-group">
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
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <textarea
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
              type={type}
              className={`form-control`}
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
