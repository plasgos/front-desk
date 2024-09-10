import React from "react";
import { SelectDistrict } from "../../../common/SelectDistrict";
import TextArea from "../../../common/TextArea";
import ViewMultiSelect from "../../../view-content/ViewFormCheckout/view-multi-select";
import ViewCheckBox from "../../../view-content/ViewFormCheckout/ViewCheckBox";
import ViewCounter from "../../../view-content/ViewFormCheckout/ViewCounter";
import ViewDate from "../../../view-content/ViewFormCheckout/ViewDate";
import ViewImage from "../../../view-content/ViewFormCheckout/ViewImage";
import ViewInputForm from "../../../view-content/ViewFormCheckout/ViewInputForm";
import ViewNumber from "../../../view-content/ViewFormCheckout/ViewNumber";
import ViewPrice from "../../../view-content/ViewFormCheckout/ViewPrice";
import ViewRating from "../../../view-content/ViewFormCheckout/ViewRating";
import ViewSelectOption from "../../../view-content/ViewFormCheckout/ViewSelectOption";
import ViewTime from "../../../view-content/ViewFormCheckout/ViewTime";

const ViewCustomField = ({
  section,
  inputStyle,
  control,
  onSetSubdistrict,
  index,
}) => {
  return (
    <div>
      {(section.type === "text" ||
        section.type === "postalCode" ||
        section.type === "firstName" ||
        section.type.includes("email") ||
        section.type.includes("phoneNumber")) && (
        <ViewInputForm
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
          sectionType={section.type}
          index={index}
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
          label={section.label}
          name={`custom-${section.type}.${section.id}.value`}
          control={control}
          placeholder={section.placeholder}
          rules={{
            required: "Harus Di isi",
          }}
          height={100}
          minLength={section.minLength}
          type={section.type}
          index={index}
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
        <ViewCheckBox
          style={inputStyle}
          label={section.label}
          name={`customField[${index}].value`}
          control={control}
          required={section.isRequired}
          type={section.type}
          index={index}
        />
      )}

      {section.type === "multiSelect" && (
        <ViewMultiSelect
          style={inputStyle}
          section={section}
          label={section.label}
          name={`customField[${index}]`}
          control={control}
          type={section.type}
          index={index}
        />
      )}

      {section.type === "number" && (
        <ViewNumber
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
          type={section.type}
          index={index}
        />
      )}

      {section.type === "price" && (
        <ViewPrice
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
          type={section.type}
          index={index}
        />
      )}

      {section.type === "counter" && (
        <ViewCounter
          style={inputStyle}
          label={section.label}
          control={control}
          minValue={section.minValue}
          maxValue={section.maxValue}
          type={section.type}
          index={index}
        />
      )}

      {section.type === "image" && (
        <ViewImage
          style={inputStyle}
          label={section.label}
          control={control}
          required={section.isRequired}
          type={section.type}
          index={index}
        />
      )}

      {section.type === "time" && (
        <ViewTime
          style={inputStyle}
          label={section.label}
          control={control}
          type={section.type}
          index={index}
        />
      )}

      {section.type === "date" && (
        <ViewDate
          style={inputStyle}
          label={section.label}
          control={control}
          isToday={section.isToday}
          required={section.isRequired}
          type={section.type}
          index={index}
        />
      )}

      {section.type === "rating" && (
        <ViewRating
          style={inputStyle}
          label={section.label}
          control={control}
          design={section.design}
          required={section.isRequired}
          type={section.type}
          index={index}
        />
      )}

      {section.type === "selectOption" && (
        <ViewSelectOption
          style={inputStyle}
          label={section.label}
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
          type={section.type}
          index={index}
        />
      )}
    </div>
  );
};

export default ViewCustomField;
