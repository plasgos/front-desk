import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Vertical from "./Vertical";
import Horizontal from "./Horizontal";
import VerticalPanel from "./VerticalPanel";
import DoublePanel from "./DoublePanel";
import TriplePanel from "./TriplePanel";

const ViewMultiSelect = ({
  style,
  section,
  label,
  name,
  control,
  type,
  index,
}) => {
  const { labelColor, outlineInputColor, fontSizeLabel, fontStyle, distance } =
    style || {};

  const { setValue } = useFormContext();

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

      {section?.designId === "1" && (
        <Vertical
          name={name}
          section={section}
          inputStyle={style}
          control={control}
        />
      )}

      {section?.designId === "2" && (
        <Horizontal
          name={name}
          section={section}
          inputStyle={style}
          control={control}
        />
      )}

      {section?.designId === "3" && (
        <VerticalPanel
          name={name}
          section={section}
          inputStyle={style}
          control={control}
        />
      )}

      {section?.designId === "4" && (
        <DoublePanel
          name={name}
          section={section}
          inputStyle={style}
          control={control}
        />
      )}

      {section?.designId === "5" && (
        <TriplePanel
          name={name}
          section={section}
          inputStyle={style}
          control={control}
        />
      )}
    </div>
  );
};

export default ViewMultiSelect;
