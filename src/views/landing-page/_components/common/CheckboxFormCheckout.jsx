import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const CheckboxFormCheckout = ({
  style,
  label,
  control,
  disabled,
  typeInput = "checkbox",
  required,
  type,
  index,
}) => {
  const { labelColor, fontStyle, fontSizeTextInputColor } = style || {};

  const { setValue } = useFormContext();

  useEffect(() => {
    if (label !== undefined) {
      setValue(`customField[${index}].label`, label);
      setValue(`customField[${index}].type`, type);
    }
  }, [index, label, setValue, type]);

  return (
    <div className="tw-my-3">
      <Controller
        name={`customField[${index}].value`}
        control={control}
        rules={{ required: required ? "Harus Di Isi" : false }}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="d-flex align-items-center my-1">
              <input
                {...field}
                disabled={disabled}
                id={`customField[${index}].value`}
                style={{ cursor: "pointer" }}
                type={typeInput}
              />

              <Controller
                name={`customField[${index}].label`}
                control={control}
                defaultValue={label}
                render={({ field: { value: labelValue, onChange } }) => (
                  <label
                    htmlFor={`customField[${index}].value`}
                    className={`ml-1 mb-0 ${
                      disabled && "tw-text-slate-400"
                    } ${fontStyle}`}
                    style={{
                      fontSize: fontSizeTextInputColor,
                      color: labelColor,
                      cursor: "pointer",
                    }}
                  >
                    {labelValue}
                  </label>
                )}
              />
            </div>
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

export default CheckboxFormCheckout;
