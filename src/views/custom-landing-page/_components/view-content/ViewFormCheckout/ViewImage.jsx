import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ViewImage = ({ style, label, name, control, required, index }) => {
  const { setValue } = useFormContext();

  const { labelColor, outlineInputColor, fontSizeLabel, fontStyle, distance } =
    style || {};

  useEffect(() => {
    if (label !== undefined) {
      setValue(`customField[${index}].label`, label);
    }
  }, [index, label, name, setValue]);

  const handleUpload = (onChange) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        onChange(imageUrl); // Mengatur nilai gambar
      };

      reader.readAsDataURL(file);
    };
  };

  return (
    <Controller
      // name={name}
      name={`customField[${index}].image`}
      control={control}
      rules={{ required: required ? "Harus Di Isi" : false }}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <div style={{ marginBottom: 16 + distance }}>
            <div className="tw-flex tw-flex-col">
              <Controller
                // name={`${name}-label`}
                name={`customField[${index}].label`}
                control={control}
                defaultValue={label}
                render={({
                  field: { value: labelValue, onChange: onLabelChange },
                }) => (
                  <label
                    className={`${fontStyle}`}
                    style={{ fontSize: fontSizeLabel, color: labelColor }}
                  >
                    {labelValue}
                  </label>
                )}
              />

              {value && (
                <div
                  style={{
                    backgroundColor: "#F5F5F5",
                    width: "100%",
                    overflow: "hidden",
                  }}
                  className="mx-auto mb-2"
                >
                  <img
                    style={{ objectFit: "contain", width: "100%", height: 100 }}
                    src={value}
                    alt="img"
                  />
                </div>
              )}

              <div className="tw-flex tw-items-center tw-gap-x-3 ">
                <button
                  onClick={() => {
                    handleUpload(onChange);
                  }}
                  type="button"
                  style={{
                    borderColor: outlineInputColor,
                    borderStyle: "solid",
                    borderWidth: 1,
                  }}
                  className="tw-text-sky-600 tw-py-2.5 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-ring-0 tw-border-none tw-w-1/2"
                >
                  Upload Gambar
                </button>

                {value && (
                  <button
                    onClick={() => onChange("")} // Menghapus gambar
                    type="button"
                    style={{
                      borderColor: outlineInputColor,
                      borderStyle: "solid",
                      borderWidth: 1,
                    }}
                    className="tw-text-red-600 tw-py-2.5 tw-px-4 tw-rounded focus:tw-outline-none focus:tw-ring-0 tw-border-none tw-w-1/2"
                  >
                    Hapus Gambar
                  </button>
                )}
              </div>
            </div>
          </div>
          {error && (
            <span className="tw-text-red-500 tw-text-sm">{error.message}</span>
          )}
        </>
      )}
    />
  );
};

export default ViewImage;
