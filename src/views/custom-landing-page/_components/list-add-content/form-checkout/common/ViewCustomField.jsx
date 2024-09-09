import React, { useCallback, useEffect } from "react";
import InputFormCheckout from "../../../common/InputFormCheckout";
import { SelectDistrict } from "../../../common/SelectDistrict";
import TextArea from "../../../common/TextArea";
import CheckboxFormCheckout from "../../../common/CheckboxFormCheckout";
import Vertical from "../../../view-content/ViewFormCheckout/multi-select/Vertical";
import Horizontal from "../../../view-content/ViewFormCheckout/multi-select/Horizontal";
import VerticalPanel from "../../../view-content/ViewFormCheckout/multi-select/VerticalPanel";
import DoublePanel from "../../../view-content/ViewFormCheckout/multi-select/DoublePanel";
import TriplePanel from "../../../view-content/ViewFormCheckout/multi-select/TriplePanel";
import { useFormContext } from "react-hook-form";
import InputPrice from "../../../common/InputPrice";
import InputNumber from "../../../common/InputNumber";
import ViewCounter from "../../../view-content/ViewFormCheckout/ViewCounter";
import ViewImage from "../../../view-content/ViewFormCheckout/ViewImage";
import ViewTime from "../../../view-content/ViewFormCheckout/ViewTime";
import ViewDate from "../../../view-content/ViewFormCheckout/ViewDate";
import ViewRating from "../../../view-content/ViewFormCheckout/ViewRating";
import ViewSelectOption from "../../../view-content/ViewFormCheckout/ViewSelectOption";

const ViewCustomField = ({
  section,
  inputStyle,
  control,
  onSetSubdistrict,
  index,
}) => {
  const { setValue } = useFormContext();

  // useEffect(() => {
  //   if (section.type === "multiSelect") {
  //     section.options.forEach((opt) => {
  //       setValue(`custom-${section.type}.${opt.id}.label`, opt.label);
  //     });
  //   }
  // }, [section.options, section.type, setValue]);

  // useEffect(() => {
  //   setValue(`custom-${section.type}.${section.id}.label`, section.label);
  // }, [section.id, section.label, section.options, section.type, setValue]);

  return (
    <div>
      {(section.type === "text" ||
        section.type === "postalCode" ||
        section.type === "firstName" ||
        section.type.includes("email") ||
        section.type.includes("phoneNumber")) && (
        <InputFormCheckout
          style={inputStyle}
          type={
            section.type.includes("email")
              ? "email"
              : section.type.includes("phoneNumber")
              ? "number"
              : section.type === "postalCode"
              ? "number"
              : "text"
          }
          label={section.label}
          name={`custom-${section.type}.${section.id}.value`}
          control={control}
          placeholder={section.placeholder}
          rules={{
            required: section.isRequired ? "Harus Di isi" : false,
          }}
          isPhoneNumber={section.type.includes("phoneNumber") ? true : false}
        />
      )}

      {section.type === "subdistrict" && (
        <div className="tw-mb-4">
          <SelectDistrict
            label={section.label}
            placeholder={section.placeholder}
            style={inputStyle}
            onSelectDistrict={onSetSubdistrict}
          />
        </div>
      )}

      {(section.type === "addressC" || section.type === "longText") && (
        <TextArea
          style={inputStyle}
          type="text"
          label={section.label}
          name={`custom-${section.type}.${section.id}.value`}
          control={control}
          placeholder={section.placeholder}
          rules={{
            required: "Harus Di isi",
          }}
          height={100}
          minLength={section.minLength}
        />
      )}

      {section.type === "divider" && (
        <div
          className="tw-my-3"
          style={{
            fontSize: section.fontSize,
            color: inputStyle.labelColor,
          }}
        >
          {section.label}
        </div>
      )}

      {section.type === "line" && (
        <div
          style={{
            fontSize: section.fontSize,
            color: inputStyle.labelColor,
            marginTop: 1 + section.emptySpace,
            marginBottom: 33 + section.emptySpace,
          }}
        >
          <div
            style={{
              height: section.height,
              backgroundColor: inputStyle.labelColor,
              marginLeft:
                -1 + (section.width > 0 ? -section.width : section.width),
              marginRight:
                -1 + (section.width > 0 ? -section.width : section.width),
            }}
          ></div>
        </div>
      )}

      {section.type === "emptySpace" && (
        <div
          style={{
            height: section.height,
          }}
        ></div>
      )}

      {section.type === "checkbox" && (
        <div className="tw-my-3">
          <CheckboxFormCheckout
            style={inputStyle}
            label={section.label}
            // name={`custom-${section.type}[${section.id}]`}
            name={`custom-${section.type}.${section.id}.value`}
            control={control}
            rules={{
              required: section.isRequired ? "Harus Di isi" : false,
            }}
          />
        </div>
      )}

      {section.type === "multiSelect" && (
        <div className="tw-my-3">
          <label
            className={`${inputStyle.fontStyle}`}
            style={{
              fontSize: inputStyle.fontSizeLabel,
              color: inputStyle.labelColor,
            }}
          >
            {section.label}
          </label>

          {section?.designId === "1" && (
            <Vertical
              section={section}
              inputStyle={inputStyle}
              control={control}
            />
          )}

          {section?.designId === "2" && (
            <Horizontal
              section={section}
              inputStyle={inputStyle}
              control={control}
            />
          )}

          {section?.designId === "3" && (
            <VerticalPanel
              section={section}
              inputStyle={inputStyle}
              control={control}
            />
          )}

          {section?.designId === "4" && (
            <DoublePanel
              section={section}
              inputStyle={inputStyle}
              control={control}
            />
          )}

          {section?.designId === "5" && (
            <TriplePanel
              section={section}
              inputStyle={inputStyle}
              control={control}
            />
          )}
        </div>
      )}

      {section.type === "number" && (
        <InputNumber
          style={inputStyle}
          label={section.label}
          name={`custom-${section.type}.${section.id}.value`}
          control={control}
          placeholder={section.placeholder}
          rules={{
            required: section.isRequired ? "Harus Di isi" : false,
          }}
          minValue={section.minValue}
          maxValue={section.maxValue}
        />
      )}

      {section.type === "price" && (
        <InputPrice
          style={inputStyle}
          label={section.label}
          name={`custom-${section.type}.${section.id}.value`}
          control={control}
          placeholder={section.placeholder}
          rules={{
            required: section.isRequired ? "Harus Di isi" : false,
          }}
          minValue={section.minValue}
          maxValue={section.maxValue}
        />
      )}

      {section.type === "counter" && (
        <ViewCounter
          style={inputStyle}
          label={section.label}
          name={`custom-${section.type}.${section.id}.value`}
          control={control}
          minValue={section.minValue}
          maxValue={section.maxValue}
        />
      )}

      {section.type === "image" && (
        <ViewImage
          style={inputStyle}
          label={section.label}
          name={`custom-${section.type}.${section.id}.value`}
          control={control}
          required={section.isRequired}
          index={index}
        />
      )}

      {section.type === "time" && (
        <ViewTime
          style={inputStyle}
          label={section.label}
          name={`custom-${section.type}.${section.id}.value`}
          control={control}
        />
      )}

      {section.type === "date" && (
        <ViewDate
          style={inputStyle}
          label={section.label}
          name={`custom-${section.type}.${section.id}.value`}
          control={control}
          isToday={section.isToday}
          required={section.isRequired}
        />
      )}

      {section.type === "rating" && (
        <ViewRating
          style={inputStyle}
          label={section.label}
          name={`custom-${section.type}.${section.id}.value`}
          control={control}
          design={section.design}
          required={section.isRequired}
        />
      )}

      {section.type === "selectOption" && (
        <ViewSelectOption
          style={inputStyle}
          label={section.label}
          name={`custom-${section.type}.${section.id}.value`}
          control={control}
          options={
            section.typeOption === "single"
              ? section.options
              : section.optionsGroup
          }
          placeholder={section.placeholder}
          defaultValue={section.defaultValue}
          typeOption={section.typeOption}
          required={section.isRequired}
        />
      )}
    </div>
  );
};

export default ViewCustomField;
