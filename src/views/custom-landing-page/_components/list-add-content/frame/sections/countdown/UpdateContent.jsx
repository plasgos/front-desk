import React, { useCallback, useEffect, useState } from "react";

import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize"; // Inisialisasi untuk react-dates
import "react-dates/lib/css/_datepicker.css";
import DurationControl from "./DurationControl";
import SelectOptions from "../../../../common/SelectOptions";
import ColorPicker from "../../../../common/ColorPicker";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";

const typeTargetOptions = [
  { value: "duration", label: "Durasi" },
  { value: "date", label: "Tanggal" },
];

export const minuteOptions = Array.from({ length: 60 }, (_, i) => {
  const value = i; // Menyimpan nilai menit langsung (0-59)
  const label = i < 10 ? `0${i}` : `${i}`; // Format label untuk menit
  return { value, label };
});

export const hoursOptions = Array.from({ length: 24 }, (_, i) => {
  const value = i; // Menyimpan nilai jam langsung (0-23)
  const label = i < 10 ? `0${i}` : `${i}`; // Format label untuk jam
  return { value, label };
});

const UpdateContent = ({
  setPreviewSection,
  currentSection,
  isEditingContent,
  sectionId,
}) => {
  const [typeTarget, setTypeTarget] = useState(
    typeTargetOptions.find(
      (opt) => opt.value === currentSection?.content?.typeTarget
    ) || typeTargetOptions[1]
  );

  const [hours, setHours] = useState(
    hoursOptions.find(
      (opt) => opt.value === currentSection?.content?.datePicked?.hours
    ) || minuteOptions[8]
  );

  const [minutes, setMinutes] = useState(
    minuteOptions.find(
      (opt) => opt.value === currentSection?.content?.datePicked?.minutes
    ) || hoursOptions[10]
  );

  const [size, setSize] = useState(currentSection?.variant?.style?.size || 20);

  const [date, setDate] = useState(
    currentSection?.content?.datePicked?.dateView || moment().add(7, "days")
  );
  const [focused, setFocused] = useState(false);

  const [daysColor, setDaysColor] = useState(
    currentSection?.variant?.style?.daysColor || "#7E2E84"
  );

  const [hoursColor, setHoursColor] = useState(
    currentSection?.variant?.style?.hoursColor || "#D14081"
  );

  const [minutesColor, setMinutesColor] = useState(
    currentSection?.variant?.style?.minutesColor || "#EF798A"
  );

  const [secondsColor, setSecondsColor] = useState(
    currentSection?.variant?.style?.secondsColor || "#218380"
  );

  const [dividerColor, setDividerColor] = useState(
    currentSection?.variant?.style?.dividerColor || "#00000"
  );

  useEffect(() => {
    const currentdaysColor = currentSection?.variant?.style?.daysColor;
    const currenthoursColor = currentSection?.variant?.style?.hoursColor;
    const currentminutesColor = currentSection?.variant?.style?.minutesColor;
    const currentsecondsColor = currentSection?.variant?.style?.secondsColor;
    const currentdividerColor = currentSection?.variant?.style?.dividerColor;
    const currentDate = currentSection?.content?.datePicked?.dateView;

    if (currentdaysColor) {
      setDaysColor(currentdaysColor);
    }
    if (currenthoursColor) {
      setHoursColor(currenthoursColor);
    }
    if (currentminutesColor) {
      setMinutesColor(currentminutesColor);
    }
    if (currentsecondsColor) {
      setSecondsColor(currentsecondsColor);
    }
    if (currentdividerColor) {
      setDividerColor(currentdividerColor);
    }

    if (currentDate) {
      setDate(currentDate);
    }
  }, [currentSection]);

  const handleUpdateDatePicker = useCallback(
    (key, value) => {
      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: section.content.map((sectionFrame) =>
                  sectionFrame.id === currentSection?.id
                    ? {
                        ...sectionFrame,
                        content: {
                          ...sectionFrame.content,
                          datePicked: {
                            ...sectionFrame.content.datePicked,
                            [key]: value,
                          },
                        },
                      }
                    : sectionFrame
                ),
              }
            : section
        )
      );
    },
    [currentSection.id, sectionId, setPreviewSection]
  );

  const handelUpdateDuration = useCallback(
    (key, value) => {
      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: section.content.map((sectionFrame) =>
                  sectionFrame.id === currentSection?.id
                    ? {
                        ...sectionFrame,
                        content: {
                          ...sectionFrame.content,
                          duration: {
                            ...sectionFrame.content.duration,
                            [key]: value,
                          },
                        },
                      }
                    : sectionFrame
                ),
              }
            : section
        )
      );
    },
    [currentSection.id, sectionId, setPreviewSection]
  );

  const handelUpdateStyle = useCallback(
    (key, value) => {
      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: section.content.map((sectionFrame) =>
                  sectionFrame.id === currentSection?.id
                    ? {
                        ...sectionFrame,
                        variant: {
                          ...sectionFrame.variant,
                          style: {
                            ...sectionFrame.variant.style,
                            [key]: value,
                          },
                        },
                      }
                    : sectionFrame
                ),
              }
            : section
        )
      );
    },
    [currentSection.id, sectionId, setPreviewSection]
  );

  const handleDateChange = (newDate) => {
    setDate(newDate);

    const selectedDay = newDate.date(); // Hari
    const selectedMonth = newDate.month() + 1; // Bulan (0-indexed)
    const selectedYear = newDate.year(); // Tahun

    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === currentSection?.id
                  ? {
                      ...sectionFrame,
                      content: {
                        ...sectionFrame.content,
                        datePicked: {
                          ...sectionFrame.content.datePicked,
                          date: selectedDay,
                          month: selectedMonth,
                          years: selectedYear,
                        },
                      },
                    }
                  : sectionFrame
              ),
            }
          : section
      )
    );
    handleUpdateDatePicker("dateView", newDate);
  };

  const handleChangeContentWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "size") {
      setSize(newValue);
    }
    handleUpdateDatePicker(key, newValue);
  };

  const handleUpdateTypeTarget = useCallback(
    (key, value) => {
      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: section.content.map((sectionFrame) =>
                  sectionFrame.id === currentSection?.id
                    ? {
                        ...sectionFrame,
                        content: {
                          ...sectionFrame.content,
                          [key]: value,
                        },
                      }
                    : sectionFrame
                ),
              }
            : section
        )
      );
    },
    [currentSection.id, sectionId, setPreviewSection]
  );
  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Tipe Target"
          options={typeTargetOptions}
          onChange={(selectedOption) => {
            setTypeTarget(selectedOption);
            handleUpdateTypeTarget("typeTarget", selectedOption.value);
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
                handleUpdateDatePicker("hours", selectedOption.value);
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
                handleUpdateDatePicker("minutes", selectedOption.value);
              }}
              value={minutes}
              width="w-25"
            />
          </div>
        </>
      )}

      {currentSection?.content?.typeTarget === "duration" && (
        <DurationControl
          setPreviewSection={setPreviewSection}
          currentSection={currentSection}
          handelUpdateDuration={handelUpdateDuration}
        />
      )}

      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        {/* {hoursDuration > 24 && (
        )} */}
        <ColorPicker
          initialColor={daysColor}
          label="Hari"
          onChange={(color) => {
            setDaysColor(color);
            handelUpdateStyle("daysColor", color);
          }}
          top={"0"}
          right={"34px"}
          type="rgba"
        />

        <ColorPicker
          initialColor={hoursColor}
          label="Jam"
          onChange={(color) => {
            setHoursColor(color);
            handelUpdateStyle("hoursColor", color);
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
            handelUpdateStyle("minutesColor", color);
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
            handelUpdateStyle("secondsColor", color);
          }}
          top={"0"}
          right={"34px"}
          type="rgba"
        />
      </div>

      {currentSection?.variant?.name === "basic" && (
        <div className="my-2">
          <ColorPicker
            initialColor={dividerColor}
            label="Pemisah"
            onChange={(color) => {
              setDividerColor(color);
              handelUpdateStyle("dividerColor", color);
            }}
            top={"0"}
            right={"34px"}
            type="rgba"
          />
        </div>
      )}

      <InputRangeWithNumber
        label="Lebar"
        value={size}
        onChange={(newValue) => {
          setSize(newValue);
          handelUpdateStyle("size", newValue);
        }}
        min={10}
        max={50}
        onBlur={() => handleChangeContentWhenBlur(size, 10, 50, "size")}
      />
    </div>
  );
};

export default UpdateContent;
