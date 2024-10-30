import React from "react";
import { Controller } from "react-hook-form";

const InputFormCheckout = ({
  style,
  label,
  name,
  control,
  rules,
  type = "text",
  placeholder,
  readOnly,
  isPhoneNumber,
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

  const handleKeyDown = (e) => {
    if (
      !/^[0-9]$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      e.key !== "Delete" &&
      e.key !== "Tab"
    ) {
      e.preventDefault();
    }
  };

  return (
    <>
      {isPhoneNumber ? (
        <div style={{ marginBottom: 16 + distance }}>
          <div className="d-flex align-items-center">
            <label
              className={`${fontStyle}`}
              style={{ fontSize: fontSizeLabel, color: labelColor }}
            >
              {label}
            </label>
          </div>

          <Controller
            name={name}
            control={control}
            rules={rules}
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
                    className="tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 tw-text-sm tw-pl-12 tw-pr-4 tw-placeholder-slate-300 "
                    aria-label={label}
                    onKeyDown={handleKeyDown}
                  />
                  <span
                    style={{ fontSize: 16 }}
                    className="tw-absolute tw-left-3 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-text-gray-600 "
                  >
                    +62
                  </span>
                </div>
                {error && (
                  <p className="tw-text-red-500 tw-text-sm">{error.message}</p>
                )}
              </>
            )}
          />
        </div>
      ) : (
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
                  type={type}
                  className={`tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-p-2 tw-text-sm tw-placeholder-slate-300`}
                  placeholder={placeholder}
                  readOnly={readOnly}
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
      )}
    </>
  );
};

export default InputFormCheckout;
