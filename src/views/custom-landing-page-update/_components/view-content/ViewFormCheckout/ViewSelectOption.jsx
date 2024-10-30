import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import SelectOptionsCustomForm from "../../common/SelectOptionsCustomForm";

const ViewSelectOption = ({
  style,
  label,
  control,
  options,
  placeholder,
  defaultValue,
  typeOption,
  required,
  type,
  index,
}) => {
  const { setValue } = useFormContext();

  const { labelColor, fontSizeLabel, fontStyle, distance } = style || {};

  const name = `customField[${index}].value`;

  useEffect(() => {
    if (options) {
      if (defaultValue === "firstOption" && typeOption === "single") {
        setValue(name, options[0]);
      } else if (defaultValue === "firstOption" && typeOption === "group") {
        setValue(name, options[0].options[0]);
      } else if (
        defaultValue !== undefined &&
        defaultValue !== "firstOption" &&
        typeOption === "group"
      ) {
        const value = options
          .flatMap((opt) => opt.options)
          .find((opsi) => opsi.value === defaultValue);
        setValue(name, value);
      } else if (
        defaultValue !== undefined &&
        defaultValue !== "firstOption" &&
        typeOption === "single"
      ) {
        const value = options.find((opt) => opt.value === defaultValue);
        setValue(name, value);
      } else {
        setValue(name, undefined);
      }
    }
  }, [defaultValue, name, options, setValue, typeOption]);

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
        name={name}
        control={control}
        rules={{ required: required ? "Harus Di Isi" : false }}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <div className="tw-flex tw-items-center tw-gap-x-3">
              <div className="tw-w-full">
                <SelectOptionsCustomForm
                  style={style}
                  placeholder={placeholder}
                  options={options}
                  onChange={(selectedOption) => {
                    onChange(selectedOption);
                  }}
                  value={value}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                />
              </div>
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

export default ViewSelectOption;
