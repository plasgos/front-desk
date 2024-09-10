import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const CheckBoxMultiSelect = ({
  style,
  label,
  name,
  control,
  disabled,
  typeInput = "checkbox",
  required,
  indexMultiSelect,
}) => {
  const { labelColor, fontStyle, fontSizeTextInputColor } = style || {};

  const { setValue } = useFormContext();

  useEffect(() => {
    if (label !== undefined) {
      setValue(`${name}.options[${indexMultiSelect}].label`, label);
    }
  }, [indexMultiSelect, label, name, setValue]);

  return (
    <div className="tw-my-3">
      <Controller
        name={`${name}.options[${indexMultiSelect}].value`}
        defaultValue={false}
        control={control}
        rules={{ required: required ? "Harus Di Isi" : false }}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="d-flex align-items-center my-1">
              <input
                {...field}
                disabled={disabled}
                id={`${name}.options[${indexMultiSelect}].value`}
                style={{ cursor: "pointer" }}
                type={typeInput}
              />

              <Controller
                name={`${name}.options[${indexMultiSelect}].label`}
                control={control}
                defaultValue={label}
                render={({ field: { value: labelValue, onChange } }) => (
                  <label
                    htmlFor={`${name}.options[${indexMultiSelect}].value`}
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

export default CheckBoxMultiSelect;
