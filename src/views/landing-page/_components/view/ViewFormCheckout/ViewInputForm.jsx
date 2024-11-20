import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ViewInputForm = ({
  style,
  label,
  control,
  rules,
  type = "text",
  placeholder,
  readOnly,
  isPhoneNumber,
  sectionType,
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
      setValue(`customField[${index}].type`, sectionType);
    }
  }, [index, label, sectionType, setValue]);

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
            defaultValue=""
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
            defaultValue=""
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

export default ViewInputForm;
