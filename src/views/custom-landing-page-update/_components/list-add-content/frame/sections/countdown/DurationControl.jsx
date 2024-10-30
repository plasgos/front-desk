import React, { useState } from "react";
import { minuteOptions } from "./UpdateContent";
import Input from "../../../../common/Input";
import SelectOptions from "../../../../common/SelectOptions";

const DurationControl = ({ currentSection, handelUpdateDuration }) => {
  const [hoursDuration, setHoursDuration] = useState(
    currentSection?.content?.duration.hours ?? 2
  );

  const [minutesDuration, setMinutesDuration] = useState(
    minuteOptions.find(
      (opt) => opt.value === currentSection?.content?.duration?.minutes
    ) || minuteOptions[30]
  );

  return (
    <div>
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
      </div>
    </div>
  );
};

export default DurationControl;
