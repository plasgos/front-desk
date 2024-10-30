import React, { forwardRef } from "react";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";
import { Controller, useForm } from "react-hook-form";

const ViewFormActivity = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    const { handleSubmit, control } = useForm({
      defaultValues: {
        email: "",
      },
    });

    const stylesBg = useBackgroundStyles(content);

    const onSubmit = (data) => {
      console.log(data);
    };

    const variant =
      content?.variant === "basic"
        ? {
            input: {
              borderRadius: "10px 0 0 10px",
            },
            button: {
              borderRadius: "0 10px 10px 0",
            },
          }
        : content?.variant === "oval"
        ? {
            input: {
              borderRadius: "20px 0 0 20px",
            },
            button: {
              borderRadius: "0 20px 20px 0",
            },
          }
        : {
            borderRadius: "0 0 0 0",
          };

    const collected = content?.collected?.isCollected;

    return (
      <div
        key={content.id}
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          paddingTop: stylesBg.paddingTop,
          paddingBottom: stylesBg.paddingBottom,
          backgroundColor: content.background.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className={` tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
        }  `}
      >
        {content?.background?.bgImage ? (
          <div style={stylesBg.backgroundImgStyle}></div>
        ) : content?.background?.bgType === "gradient" ? (
          <div style={stylesBg.gradientStyle}></div>
        ) : content?.background?.bgType === "pattern" ? (
          <div style={stylesBg.backgroundPatternStyle}></div>
        ) : null}

        {content.background?.opacity ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor:
                content.background?.opacity < 0 ? "black" : "white",
              opacity: Math.abs(stylesBg.calculateOpacity),
            }}
          ></div>
        ) : null}

        <div className="tw-w-full tw-flex tw-flex-col tw-items-center tw-gap-y-2">
          <div
            className={`${content?.titleHeader?.fontSize} ${content?.titleHeader?.textAlign}`}
            style={{
              color: content?.titleHeader?.textColor,
              textShadow: content?.titleHeader?.textShadow,
              width: "80%",
            }}
            dangerouslySetInnerHTML={{ __html: content.titleHeader.text }}
          />

          {content?.content?.typeForm === "collected-email-and-phone" ? (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div
                  style={{ width: "100%" }}
                  className="tw-relative tw-inline-block"
                >
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Bagian ini harus di isi",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Format email tidak valid", // Pesan error untuk format email
                      },
                    }}
                    defaultValue=""
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div
                          style={{
                            cursor: collected && "not-allowed",
                          }}
                          className="tw-flex "
                        >
                          <input
                            placeholder="johndoe@gmail.com"
                            style={{
                              height: 38,
                              border: "1px solid #D8DBE0 ",
                            }}
                            {...field}
                            type="text"
                            className={`tw-w-full tw-border tw-border-gray-300  tw-p-2 tw-text-sm tw-placeholder-slate-300 tw-flex-grow tw-rounded-md`}
                            readOnly={collected}
                          />
                        </div>
                        {error && (
                          <div
                            style={{ right: 0, top: "-15px" }}
                            id="tooltip-top"
                            role="tooltip"
                            className="tw-absolute tw-z-10  tw-inline-block tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-text-white tw-bg-red-500 tw-rounded-lg tw-shadow-sm  tw-tooltip "
                          >
                            {error.message}
                            <div
                              className="tooltip-arrow"
                              data-popper-arrow
                            ></div>
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>

                <div
                  style={{ width: "100%" }}
                  className="tw-relative tw-inline-block"
                >
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{ required: "Bagian ini harus di isi" }}
                    defaultValue=""
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div
                          style={{
                            cursor: collected && "not-allowed",
                          }}
                          className="tw-flex "
                        >
                          <input
                            placeholder="+62897656232"
                            style={{
                              height: 38,
                              border: "1px solid #D8DBE0 ",
                            }}
                            {...field}
                            className={`tw-w-full tw-border tw-border-gray-300  tw-p-2 tw-text-sm tw-placeholder-slate-300 tw-flex-grow tw-rounded-md tw-my-3`}
                            readOnly={collected}
                            type="text"
                          />
                        </div>
                        {error && (
                          <div
                            style={{ right: 0, top: "-15px" }}
                            id="tooltip-top"
                            role="tooltip"
                            className="tw-absolute tw-z-10  tw-inline-block tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-text-white tw-bg-red-500 tw-rounded-lg tw-shadow-sm  tw-tooltip "
                          >
                            {error.message}
                            <div
                              className="tooltip-arrow"
                              data-popper-arrow
                            ></div>
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>

                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={collected}
                  style={{
                    width: "100%",
                    backgroundColor: collected
                      ? "#d9d9d9"
                      : content?.content?.btnColor,
                    color: collected ? "#a6a6a6" : "#ffffff",
                    cursor: collected ? "not-allowed" : "pointer",
                    opacity: collected ? 0.6 : 1,
                  }}
                  className=" tw-hover:bg-blue-600 tw-text-white   tw-py-2.5 tw-px-4  focus:tw-outline-none focus:tw-ring-0 tw-border-none  tw-whitespace-nowrap tw-rounded-md"
                  type="submit"
                >
                  {content?.content?.textBtn}
                </button>
              </form>
            </>
          ) : (
            <>
              <div
                style={{ width: "80%" }}
                className="tw-relative tw-inline-block"
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Bagian ini harus di isi",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Format email tidak valid", // Pesan error untuk format email
                      },
                    }}
                    defaultValue=""
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <div
                          style={{
                            cursor: collected && "not-allowed",
                          }}
                          className="tw-flex  "
                        >
                          <input
                            placeholder={content?.content?.placeholder}
                            style={{
                              ...variant.input,
                              height: 38,
                              border: "1px solid #D8DBE0 ",
                            }}
                            {...field}
                            type="text"
                            className={`tw-w-full tw-border tw-border-gray-300  tw-p-2 tw-text-sm tw-placeholder-slate-300 tw-flex-grow `}
                            readOnly={collected}
                          />

                          <button
                            disabled={collected}
                            style={{
                              ...variant.button,
                              backgroundColor: collected
                                ? "#d9d9d9"
                                : content?.content?.btnColor,
                              color: collected ? "#a6a6a6" : "#ffffff",
                              cursor: collected ? "not-allowed" : "pointer",
                              opacity: collected ? 0.6 : 1,
                            }}
                            className=" tw-hover:bg-blue-600 tw-text-white   tw-py-2.5 tw-px-4  focus:tw-outline-none focus:tw-ring-0 tw-border-none tw-w-auto tw-whitespace-nowrap"
                            type="submit"
                          >
                            {content?.content?.textBtn}
                          </button>
                        </div>
                        {error && (
                          <div
                            style={{ right: 75, top: "-15px" }}
                            id="tooltip-top"
                            role="tooltip"
                            className="tw-absolute tw-z-10  tw-inline-block tw-px-2 tw-py-1 tw-text-xs tw-font-medium tw-text-white tw-bg-red-500 tw-rounded-lg tw-shadow-sm  tw-tooltip "
                          >
                            {error.message}
                            <div
                              className="tooltip-arrow"
                              data-popper-arrow
                            ></div>
                          </div>
                        )}
                      </>
                    )}
                  />
                </form>
              </div>
            </>
          )}

          {collected && (
            <div
              className={`${content?.collected?.fontSize} ${content?.collected?.textAlign}`}
              style={{
                color: content?.collected?.textColor,
                textShadow: content?.collected?.textShadow,
                width: "80%",
              }}
              dangerouslySetInnerHTML={{ __html: content?.collected?.text }}
            />
          )}
        </div>
      </div>
    );
  }
);

export default ViewFormActivity;
