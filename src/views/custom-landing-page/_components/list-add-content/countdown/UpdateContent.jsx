import React, { useState } from "react";
import SelectOptions from "../../common/SelectOptions";

import "react-dates/initialize"; // Inisialisasi untuk react-dates
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";

const typeTargetOptions = [
  { value: "duration", label: "Durasi" },
  { value: "date", label: "Tanggal" },
];

const minuteOptions = Array.from({ length: 60 }, (_, i) => {
  const value = i * 60; // Mengubah menit menjadi detik (minuteSeconds = 60)
  const label = i < 10 ? `0${i}` : `${i}`; // Tetap menampilkan label menit
  return { value, label };
});
const hoursOptions = Array.from({ length: 24 }, (_, i) => {
  const seconds = i * 3600; // Konversi jam ke detik
  const value = seconds;
  const label = i < 10 ? `0${i}` : `${i}`; // Label tetap dalam format jam
  return { value, label };
});

const UpdateContent = ({
  setPreviewSection,
  currentSection,
  isEditingContent,
}) => {
  //   console.log("🚀 ~ minuteOptions ~ minuteOptions:", minuteOptions);
  //   console.log("🚀 ~ hoursOptions ~ hoursOptions:", hoursOptions);

  const [typeTarget, setTypeTarget] = useState(
    typeTargetOptions.find(
      (opt) => opt.value === currentSection?.content?.typeTarget
    ) || typeTargetOptions[1]
  );

  const [hours, setHours] = useState(
    hoursOptions.find((opt) => opt.value === currentSection?.content?.hours) ||
      minuteOptions[8]
  );

  const [minutes, setMinutes] = useState(
    minuteOptions.find(
      (opt) => opt.value === currentSection?.content?.minutes
    ) || hoursOptions[10]
  );

  const [size, setSize] = useState(currentSection?.content?.size || 10);

  const [date, setDate] = useState(moment().add(7, "days"));
  const [focused, setFocused] = useState(false);

  const handelUpdateContent = (key, value) => {
    setPreviewSection((prevSection) =>
      prevSection.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              content: {
                ...section.content,
                [key]: value,
              },
            }
          : section
      )
    );
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);

    const now = moment(); // Tanggal saat ini
    const differenceInSeconds = newDate.diff(now, "seconds");

    handelUpdateContent("days", differenceInSeconds);
  };

  const handleChangeContentWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "size") {
      setSize(newValue);
    }
    handelUpdateContent(key, newValue);
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Tipe Target"
          options={typeTargetOptions}
          onChange={(selectedOption) => {
            setTypeTarget(selectedOption);
            handelUpdateContent("typeTarget", selectedOption.value);
          }}
          value={typeTarget}
        />
      </div>

      {currentSection?.content?.typeTarget === "date" && (
        <>
          <div style={{ gap: 10 }} className="d-flex align-items-center">
            <div className="w-50">
              <SingleDatePicker
                date={date} // Tanggal saat ini
                onDateChange={handleDateChange}
                // onDateChange={(date) => setDate(date)} // Mengupdate state
                focused={focused} // Status fokus
                onFocusChange={({ focused }) => setFocused(focused)} // Mengubah fokus
                numberOfMonths={1} // Jumlah bulan yang ditampilkan
                isOutsideRange={() => false} // Memungkinkan pemilihan tanggal manapun
                displayFormat="DD - MM - YY"
              />
            </div>

            <SelectOptions
              label="Jam"
              options={hoursOptions}
              onChange={(selectedOption) => {
                setHours(selectedOption);
                handelUpdateContent("hours", selectedOption.value);
              }}
              value={hours}
              width="w-25"
            />

            <div style={{ fontSize: 24, position: "relative", top: 0 }}>:</div>

            <SelectOptions
              label="Menit"
              options={minuteOptions}
              onChange={(selectedOption) => {
                setMinutes(selectedOption);
                handelUpdateContent("minutes", selectedOption.value);
              }}
              value={minutes}
              width="w-25"
            />
          </div>
        </>
      )}

      <InputRangeWithNumber
        label="Lebar"
        value={size}
        onChange={(newValue) => {
          setSize(newValue);
          handelUpdateContent("size", newValue);
        }}
        min={5}
        max={50}
        onBlur={() => handleChangeContentWhenBlur(size, 5, 50, "size")}
      />
    </div>
  );
};

export default UpdateContent;
