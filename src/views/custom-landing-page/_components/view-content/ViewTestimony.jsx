import React, { forwardRef } from "react";
import { FaStar } from "react-icons/fa6";

const ViewTestimony = forwardRef(
  ({ containerRef, isDragging, content, isResizing, isFocused }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
        }}
        className="tw-w-full tw-flex tw-flex-wrap tw-justify-center tw-items-center  tw-p-4 "
      >
        {content.content.map((item) => (
          <div
            style={{
              paddingLeft: content.wrapperStyle?.paddingX,
              paddingRight: content.wrapperStyle?.paddingX,
              paddingBottom: content.wrapperStyle?.paddingX
                ? `calc(${content.wrapperStyle.paddingX}px * 2)`
                : "0px",
            }}
            key={item.id}
            className={`${content.wrapperStyle?.column}`}
          >
            <div
              style={{
                borderRadius: content.wrapperStyle.borderRadius,
                borderWidth: content.wrapperStyle.borderWidth,
                padding: `14px`, // Default padding untuk semua sisi
                paddingTop: content.wrapperStyle.paddingTop
                  ? `calc(14px + ${content.wrapperStyle.paddingTop}px)`
                  : "14px",
                paddingBottom: content.wrapperStyle.paddingBottom
                  ? `calc(14px + ${content.wrapperStyle.paddingBottom}px)`
                  : "14px",
              }}
              className={`tw-bg-[${content.cardStyle.bgColor}]  tw-border-2 tw-border-[${content.cardStyle.borderColor}]
           
             ${content.cardStyle.shadowCard} tw-w-full tw-overflow-hidden`}
            >
              <div className="tw-flex tw-flex-col ">
                <div
                  className={`tw-mb-3 ${content.contentStyle?.textAlign} tw-whitespace-pre-wrap`}
                  style={{
                    lineHeight: 1.4,
                    fontSize: content.contentStyle?.fontSize,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: item?.content,
                  }}
                />
                <div className="tw-flex tw-justify-end tw-items-center  ">
                  <div className="tw-flex tw-flex-col tw-items-end tw-mr-3">
                    <div
                      style={{
                        fontSize: content.profileStyle?.fontSizeName,
                      }}
                      className={`tw-mb-2 tw-text-[${content.profileStyle.colorName}]  `}
                    >
                      {item.name}
                    </div>
                    <div>
                      <div className="tw-flex  tw-items-center">
                        {[...Array(content.startStyle?.amount)].map(
                          (_, index) => (
                            <FaStar
                              key={index}
                              size={content.startStyle?.size}
                              color={content.cardStyle?.starColor}
                              style={{
                                marginLeft: content.startStyle?.marginX,
                                marginRight: content.startStyle?.marginX,
                              }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      width: content.profileStyle?.imageSize,
                      height: content.profileStyle?.imageSize,
                      borderRadius: content.profileStyle?.borderRadiusImage,
                      border: `${content.profileStyle?.borderWidthImage}px solid ${content.profileStyle?.borderPictColor}`,
                      overflow: "hidden",
                      display: "inline-block",
                    }}
                    className={`tw-shrink-0 ${content.profileStyle?.shadowImageName}`}
                  >
                    <img
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      src={item?.image}
                      alt="profile"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

export default ViewTestimony;
