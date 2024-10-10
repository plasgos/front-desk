import React, { useCallback, useEffect, useState } from "react";
import SelectOptions from "../../common/SelectOptions";

import "react-dates/initialize"; // Inisialisasi untuk react-dates
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import Input from "../../common/Input";
import ColorPicker from "../../common/ColorPicker";

const typeTargetOptions = [
  { value: "duration", label: "Durasi" },
  { value: "date", label: "Tanggal" },
];

const minuteOptions = Array.from({ length: 60 }, (_, i) => {
  const value = i; // Menyimpan nilai menit langsung (0-59)
  const label = i < 10 ? `0${i}` : `${i}`; // Format label untuk menit
  return { value, label };
});

const hoursOptions = Array.from({ length: 24 }, (_, i) => {
  const value = i; // Menyimpan nilai jam langsung (0-23)
  const label = i < 10 ? `0${i}` : `${i}`; // Format label untuk jam
  return { value, label };
});

const UpdateContent = ({
  setPreviewSection,
  currentSection,
  isEditingContent,
}) => {
  // console.log("🚀 ~ minuteOptions ~ minuteOptions:", minuteOptions);
  // console.log("🚀 ~ hoursOptions ~ hoursOptions:", hoursOptions);

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

  const [date, setDate] = useState(
    currentSection?.content?.date || moment().add(7, "days")
  );
  const [focused, setFocused] = useState(false);

  const [hoursDuration, setHoursDuration] = useState(
    currentSection?.content?.duration.hours || 2
  );

  const [minutesDuration, setMinutesDuration] = useState(
    minuteOptions.find(
      (opt) => opt.value === currentSection?.content?.duration?.minutes
    ) || minuteOptions[30]
  );

  const [daysColor, setDaysColor] = useState(
    currentSection?.content?.duration.daysColor || "#7E2E84"
  );

  const [hoursColor, setHoursColor] = useState(
    currentSection?.content?.duration.hoursColor || "#D14081"
  );

  const [minutesColor, setMinutesColor] = useState(
    currentSection?.content?.duration.minutesColor || "#EF798A"
  );

  const [secondsColor, setSecondsColor] = useState(
    currentSection?.content?.duration.secondsColor || "#218380"
  );

  const handelUpdateContent = useCallback(
    (key, value) => {
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
    },
    [currentSection.id, setPreviewSection]
  );

  const handelUpdateDuration = useCallback(
    (key, value) => {
      setPreviewSection((prevSection) =>
        prevSection.map((section) =>
          section.id === currentSection?.id
            ? {
                ...section,
                content: {
                  ...section.content,
                  duration: {
                    ...section.content.duration,
                    [key]: value,
                  },
                },
              }
            : section
        )
      );
    },
    [currentSection.id, setPreviewSection]
  );

  useEffect(() => {
    if (currentSection?.content?.date) {
      setDate(currentSection.content.date);
    }
  }, [currentSection]);

  // useEffect(() => {
  //   if (!currentSection?.content?.days) {
  //     const now = moment(); // Tanggal saat ini
  //     const differenceInSeconds = date.diff(now, "seconds");
  //     const differenceInDays = Math.floor(differenceInSeconds / (24 * 3600));
  //     handelUpdateContent("days", differenceInDays);
  //   }
  // }, [currentSection, date, handelUpdateContent]);

  const handleDateChange = (newDate) => {
    setDate(newDate);

    const now = moment(); // Tanggal saat ini
    const differenceInSeconds = newDate.diff(now, "seconds");

    const differenceInDays = Math.floor(differenceInSeconds / (24 * 3600));

    handelUpdateContent("days", differenceInDays);
    handelUpdateContent("date", newDate);
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

      {currentSection?.content?.typeTarget === "duration" && (
        <div>
          <div style={{ gap: 10 }} className="d-flex align-items-center">
            <Input
              type="number"
              label="Jam"
              value={hoursDuration || 0}
              onChange={(e) => {
                const { value } = e.target;
                setHoursDuration(+value);
                handelUpdateDuration("hours", +value);
              }}
            />

            <SelectOptions
              label="Menit"
              options={minuteOptions}
              onChange={(selectedOption) => {
                setMinutesDuration(selectedOption);
                handelUpdateDuration("minutes", selectedOption.value);
              }}
              value={minutesDuration || 0}
            />
          </div>

          <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
            {hoursDuration > 24 && (
              <ColorPicker
                initialColor={daysColor}
                label="Hari"
                onChange={(color) => {
                  setDaysColor(color);
                  handelUpdateDuration("daysColor", color);
                }}
                top={"0"}
                right={"34px"}
                type="rgba"
              />
            )}

            <ColorPicker
              initialColor={hoursColor}
              label="Jam"
              onChange={(color) => {
                setHoursColor(color);
                handelUpdateDuration("hoursColor", color);
              }}
              top={"0"}
              right={"34px"}
              type="rgba"
            />
          </div>

          <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
            <ColorPicker
              initialColor={minutesColor}
              label="Menit "
              onChange={(color) => {
                setMinutesColor(color);
                handelUpdateDuration("minutesColor", color);
              }}
              top={"0"}
              right={"34px"}
              type="rgba"
            />

            <ColorPicker
              initialColor={secondsColor}
              label="Detik"
              onChange={(color) => {
                setSecondsColor(color);
                handelUpdateDuration("secondsColor", color);
              }}
              top={"0"}
              right={"34px"}
              type="rgba"
            />
          </div>
        </div>
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
