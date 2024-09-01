import React from "react";
import { Controller } from "react-hook-form";

const InputFormCheckout = ({
  style,
  label,
  name,
  control,
  defaultValue = "",
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
        <div style={{ marginBottom: 16 + distance }} className="form-group ">
          <div className="d-flex align-items-center mb-2">
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
            defaultValue={defaultValue}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
              <div className="input-group mb-3">
                <div className="input-group-prepend w-100">
                  <span
                    style={{
                      borderRadius: `${borderRadius}px 0px   0px ${borderRadius}px`,
                    }}
                    className="input-group-text"
                    id="basic-addon1"
                  >
                    +62
                  </span>
                  <input
                    {...field}
                    style={{
                      borderRadius: `0px ${borderRadius}px ${borderRadius}px 0px`,
                      height: 38,
                      color: textInputColor,
                      backgroundColor: bgInputColor,
                      fontSize: fontSizeTextInputColor,
                      borderColor: outlineInputColor,
                      borderWidth: outlineInputColorSize,
                      borderStyle: "solid",
                    }}
                    aria-describedby="basic-addon1"
                    placeholder={placeholder}
                    type="number"
                    className="form-control"
                    onKeyDown={handleKeyDown}
                  />
                </div>
                {error && (
                  <span className="tw-text-red-500 tw-text-sm">
                    {error.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      ) : (
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
                  className={`form-control`}
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
