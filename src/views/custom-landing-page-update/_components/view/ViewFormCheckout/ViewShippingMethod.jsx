import React from "react";
import { formatPrice } from "../../../../../lib/format-price";
import { Controller } from "react-hook-form";
import SelectOptionsCustomForm from "../../common/SelectOptionsCustomForm";

import { components } from "react-select";

// Custom component to display selected option
const CustomSingleValue = ({ data }) => (
  <div className="tw-flex tw-items-center tw-gap-x-2">
    <div>{data.label}</div>
    <div className="tw-italic tw-font-semibold">{data.service}</div>
    <div>{formatPrice(data.price)}</div>
    {data.estimate && <div>{data.estimate}</div>}
  </div>
);

// Custom component to display options in the dropdown menu
const CustomOption = (props) => (
  <components.Option {...props}>
    <div className="tw-flex tw-items-center tw-gap-x-2">
      <div>{props.label}</div>
      <div className="tw-italic tw-font-semibold">{props.data.service}</div>
      <div>{formatPrice(props.data.price)}</div>
      {props.data.estimate && <div>{props.data.estimate}</div>}
    </div>
  </components.Option>
);

const ViewShippingMethod = ({ style, control, content }) => {
  const { outlineInputColor, outlineInputColorSize } = style || {};

  return (
    <div>
      {content?.form?.shippingMethod.design === "close" ? (
        <Controller
          name="shippingMethod"
          control={control}
          rules={{
            required:
              content?.form?.shippingMethod?.shippingMethodOption === "required"
                ? "Harus Di Isi"
                : false,
          }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <div className="tw-flex tw-items-center tw-gap-x-3">
                <div className="tw-w-full">
                  <SelectOptionsCustomForm
                    style={style}
                    placeholder="Pilih Kurir"
                    options={content?.couriers}
                    onChange={(selectedOption) => {
                      const { isDisabled, ...courierWithoutDisabled } =
                        selectedOption;
                      onChange(courierWithoutDisabled);
                    }}
                    value={value}
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    components={{
                      SingleValue: CustomSingleValue,
                      Option: CustomOption,
                    }}
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
      ) : (
        content?.couriers.map((courier) => (
          <Controller
            key={courier.id}
            name="shippingMethod"
            control={control}
            rules={{
              required:
                content?.form?.shippingMethod?.shippingMethodOption ===
                "required"
                  ? "Harus Di Isi"
                  : false,
            }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <div
                style={{
                  borderWidth: outlineInputColorSize,
                  borderStyle: "solid",
                  borderColor: outlineInputColor,
                }}
                className="tw-w-full tw-rounded tw-py-2 tw-px-4 tw-my-3"
              >
                <div className="tw-flex tw-items-center tw-mb-2">
                  <input
                    value={courier.id}
                    checked={value?.id === courier.id}
                    onChange={() => {
                      const { isDisabled, ...courierWithoutDisabled } = courier;
                      onChange(courierWithoutDisabled);
                    }}
                    onBlur={onBlur}
                    style={{ cursor: "pointer" }}
                    type="radio"
                  />

                  <div className="tw-ml-3 tw-w-16 tw-h-8 tw-flex tw-justify-center tw-items-center">
                    <img
                      src={courier.image}
                      alt="logo"
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </div>
                </div>

                <div className="tw-flex tw-items-center tw-gap-x-2 tw-ml-3">
                  <input
                    value={courier.id} // Set value to courier ID or any unique value
                    checked={value?.id === courier.id} // Check if the current value matches
                    onChange={() => onChange(courier)} // Update form state on change
                    onBlur={onBlur}
                    style={{ cursor: "pointer" }}
                    type="radio"
                  />

                  <div className="tw-italic tw-font-semibold">
                    {courier.service}
                  </div>
                  <div className="">{formatPrice(courier.price)}</div>

                  {content?.form?.shippingMethod?.isShowEstimate && (
                    <div>{courier.estimate}</div>
                  )}
                </div>
              </div>
            )}
          />
        ))
      )}
    </div>
  );
};

export default ViewShippingMethod;
