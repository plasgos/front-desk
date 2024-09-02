import React from "react";
import { Controller } from "react-hook-form";

const CheckboxFormCheckout = ({
  style,
  label,
  name,
  control,
  defaultValue = false,
  rules,
  disabled,
}) => {
  const { labelColor, fontStyle, fontSizeTextInputColor } = style || {};

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="d-flex align-items-center my-1">
              <input
                {...field}
                disabled={disabled}
                id={name}
                style={{ cursor: "pointer" }}
                type="checkbox"
              />
              <label
                style={{
                  cursor: "pointer",
                  color: labelColor,
                  fontSize: fontSizeTextInputColor,
                }}
                htmlFor={name}
                className={`ml-1 mb-0 ${
                  disabled && "tw-text-slate-400"
                } ${fontStyle}`}
              >
                {label}
              </label>
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
