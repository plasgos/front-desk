import React from "react";
import { Controller } from "react-hook-form";

const TextArea = ({
  label,
  name,
  defaultValue = "",
  rules,
  control,
  type = "text",
  placeholder,
  height,
}) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <textarea
              style={{ height: height }}
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
