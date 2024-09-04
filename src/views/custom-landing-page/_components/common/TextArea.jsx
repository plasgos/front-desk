import React from "react";
import { Controller } from "react-hook-form";

const TextArea = ({
  style,
  label,
  name,
  rules,
  control,
  type = "text",
  placeholder,
  height,
  minLength,
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
            <textarea
              minLength={+minLength}
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
