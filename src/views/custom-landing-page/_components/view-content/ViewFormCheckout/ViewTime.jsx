import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import SelectOptionsCutomForm from "../../common/SelectOptionsCutomForm";

const hoursOptions = [
  { value: "00", label: "00" },
  { value: "01", label: "01" },
  { value: "02", label: "02" },
  { value: "03", label: "03" },
  { value: "04", label: "04" },
  { value: "05", label: "05" },
  { value: "06", label: "06" },
  { value: "07", label: "07" },
  { value: "08", label: "08" },
  { value: "09", label: "09" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
];

const minuteOptions = [
  { value: "00", label: "00" },
  { value: "05", label: "05" },
  { value: "10", label: "10" },
  { value: "15", label: "15" },
  { value: "20", label: "20" },
  { value: "25", label: "25" },
  { value: "30", label: "30" },
  { value: "35", label: "35" },
  { value: "40", label: "40" },
  { value: "45", label: "45" },
  { value: "50", label: "50" },
  { value: "56", label: "56" },
  { value: "57", label: "57" },
  { value: "58", label: "58" },
  { value: "59", label: "59" },
];

const ViewTime = ({ style, type, label, control, index }) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    if (label !== undefined) {
      setValue(`customField[${index}].label`, label);
      setValue(`customField[${index}].type`, type);
    }
  }, [index, label, setValue, type]);

  const { labelColor, fontSizeLabel, fontStyle, distance } = style || {};

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
        render={({ field: { value, onChange, onBlur } }) => (
          <div className="tw-flex tw-items-center tw-gap-x-3">
            <div className="tw-w-full">
              <SelectOptionsCutomForm
                style={style}
                options={hoursOptions}
                onChange={(selectedOption) => {
                  const selectedHour = selectedOption.value;
                  const selectedMinute = value?.split(":")[1] || "00"; // Ambil nilai menit saat ini atau default "00"
                  // Gabungkan nilai jam dan menit
                  onChange(`${selectedHour}:${selectedMinute}`);
                }}
                value={
                  hoursOptions.find(
                    (option) => option.value === value?.split(":")[0]
                  ) || hoursOptions[0]
                } // Temukan objek hours yang sesuai
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            </div>

            <div style={{ fontSize: 24, position: "relative", top: -9 }}>:</div>

            <div className="tw-w-full">
              <SelectOptionsCutomForm
                style={style}
                options={minuteOptions}
                onChange={(selectedOption) => {
                  const selectedMinute = selectedOption.value;
                  const selectedHour = value?.split(":")[0] || "00"; // Ambil nilai jam saat ini atau default "00"
                  // Gabungkan nilai jam dan menit
                  onChange(`${selectedHour}:${selectedMinute}`);
                }}
                value={
                  minuteOptions.find(
                    (option) => option.value === value?.split(":")[1]
                  ) || minuteOptions[0]
                } // Temukan objek minutes yang sesuai
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
              />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default ViewTime;
