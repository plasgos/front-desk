import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import SelectOptionsCutomForm from "../../common/SelectOptionsCustomForm";

const dateOptions = Array.from({ length: 31 }, (v, k) => ({
  value: String(k + 1).padStart(2, "0"),
  label: String(k + 1).padStart(2, "0"),
}));

const monthOptions = [
  { value: "01", label: "Januari" },
  { value: "02", label: "Februari" },
  { value: "03", label: "Maret" },
  { value: "04", label: "April" },
  { value: "05", label: "Mei" },
  { value: "06", label: "Juni" },
  { value: "07", label: "Juli" },
  { value: "08", label: "Agustus" },
  { value: "09", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
];

const yearOptions = Array.from({ length: 100 }, (v, k) => ({
  value: String(2024 - k),
  label: String(2024 - k),
}));

const ViewDate = ({
  style,
  label,
  type,
  control,
  isToday,
  required,
  index,
}) => {
  const { setValue } = useFormContext();

  const { labelColor, fontSizeLabel, fontStyle, distance } = style || {};
  useEffect(() => {
    if (label !== undefined) {
      setValue(`customField[${index}].label`, label);
      setValue(`customField[${index}].type`, type);
    }
  }, [index, label, setValue, type]);

  const setDefaultDate = (defaultDate) => {
    setValue(`customField[${index}].value`, defaultDate); // Mengatur nilai default pada form
  };

  useEffect(() => {
    if (isToday) {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0"); // getMonth() mulai dari 0
      const year = String(today.getFullYear());

      // Set nilai default ke tanggal hari ini
      setDefaultDate(`${day}-${month}-${year}`);
    } else {
      setDefaultDate(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToday]);

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
        name={`customField[${index}].value`}
        control={control}
        rules={{ required: required ? "Harus Di Isi" : false }}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <div className="tw-flex tw-items-center tw-gap-x-3">
              <div className="tw-w-1/3">
                <SelectOptionsCutomForm
                  style={style}
                  placeholder="Tanggal"
                  options={dateOptions}
                  onChange={(selectedOption) => {
                    const selectedDate = selectedOption.value;
                    const selectedMonth = value?.split("-")[1] || "01";
                    const selectedYear = value?.split("-")[2] || "2024";
                    onChange(
                      `${selectedDate}-${selectedMonth}-${selectedYear}`
                    );
                  }}
                  value={
                    dateOptions.find(
                      (option) => option.value === value?.split("-")[0]
                    ) || undefined
                  }
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                />
              </div>

              <div
                style={{
                  fontSize: 24,
                  position: "relative",
                  top: -9,
                  color: "#D8DBE0",
                }}
              >
                /
              </div>

              <div className="tw-w-1/3">
                <SelectOptionsCutomForm
                  style={style}
                  placeholder="Bulan"
                  options={monthOptions}
                  onChange={(selectedOption) => {
                    const selectedMonth = selectedOption.value;
                    const selectedDate = value?.split("-")[0] || "01";
                    const selectedYear = value?.split("-")[2] || "2024";
                    onChange(
                      `${selectedDate}-${selectedMonth}-${selectedYear}`
                    );
                  }}
                  value={
                    monthOptions.find(
                      (option) => option.value === value?.split("-")[1]
                    ) || undefined
                  }
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                />
              </div>

              <div
                style={{
                  fontSize: 24,
                  position: "relative",
                  top: -9,
                  color: "#D8DBE0",
                }}
              >
                /
              </div>

              <div className="tw-w-1/3">
                <SelectOptionsCutomForm
                  style={style}
                  placeholder="Tahun"
                  options={yearOptions}
                  onChange={(selectedOption) => {
                    const selectedYear = selectedOption.value;
                    const selectedDate = value?.split("-")[0] || "01";
                    const selectedMonth = value?.split("-")[1] || "01";
                    onChange(
                      `${selectedDate}-${selectedMonth}-${selectedYear}`
                    );
                  }}
                  value={
                    yearOptions.find(
                      (option) => option.value === value?.split("-")[2]
                    ) || undefined
                  }
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

export default ViewDate;
