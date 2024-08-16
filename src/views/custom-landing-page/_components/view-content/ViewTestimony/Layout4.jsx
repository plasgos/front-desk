import React from "react";
import { FaStar } from "react-icons/fa6";
import SvgCurve from "./SvgShape";

const Layout4 = ({ content, item }) => {
  return (
    <div className="tw-flex tw-items-center  ">
      <div
        style={{
          position: "relative",
          zIndex: 3,
          borderRadius: content.wrapperStyle.borderRadius,
          borderWidth: content.wrapperStyle.borderWidth,
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
        {content.shape.map((shape) => (
          <SvgCurve
            key={shape.id}
            type={shape.type}
            height1={shape.height1}
            height2={shape.height2}
            curveDepth={shape.circle1}
            position={shape.position.value}
            fill={shape.color}
          />
        ))}

        <div className="tw-flex tw-flex-col tw-items-center tw-p-3 ">
          <div className="tw-flex tw-items-center  ">
            <div id="name">
              <div
                style={{
                  paddingBottom: content.profileStyle?.distanceName,
                }}
                className={`tw-flex tw-flex-col tw-items-center `}
              >
                {content.starStyle?.position === "top-name" && (
                  <div style={{ marginBottom: content.starStyle?.margin }}>
                    <div className="tw-flex  tw-items-center">
                      {[...Array(content.starStyle?.amount)].map((_, index) => (
                        <FaStar
                          key={index}
                          size={content.starStyle?.size}
                          color={content.cardStyle?.starColor}
                          style={{
                            marginLeft: content.starStyle?.marginX,
                            marginRight: content.starStyle?.marginX,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div
                  style={{
                    fontSize: content.profileStyle?.fontSizeName,
                  }}
                  className={`tw-mx-2 tw-text-[${content.profileStyle.colorName}] ${content.profileStyle?.fontStyle}  tw-text-center  `}
                >
                  {item.name}
                </div>
                {content.starStyle?.position === "bottom-name" && (
                  <div style={{ marginTop: content.starStyle?.margin }}>
                    <div className="tw-flex  tw-items-center">
                      {[...Array(content.starStyle?.amount)].map((_, index) => (
                        <FaStar
                          key={index}
                          size={content.starStyle?.size}
                          color={content.cardStyle?.starColor}
                          style={{
                            marginLeft: content.starStyle?.marginX,
                            marginRight: content.starStyle?.marginX,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div id="profile-picture">
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
              className={`tw-shrink-0 ${content.profileStyle?.shadowImageName} `}
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

          <div id="content">
            {content.starStyle?.position === "top-content" && (
              <div style={{ marginBottom: content.starStyle?.margin }}>
                <div className="tw-flex  tw-items-center">
                  {[...Array(content.starStyle?.amount)].map((_, index) => (
                    <FaStar
                      key={index}
                      size={content.starStyle?.size}
                      color={content.cardStyle?.starColor}
                      style={{
                        marginLeft: content.starStyle?.marginX,
                        marginRight: content.starStyle?.marginX,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div
              style={{
                paddingTop: content.contentStyle?.distanceContent,
              }}
            >
              <div
                className={`${content.contentStyle?.fontSize} ${content.contentStyle?.textAlign} tw-whitespace-pre-wrap`}
                dangerouslySetInnerHTML={{
                  __html: item?.content,
                }}
              />

              {content.starStyle?.position === "bottom-content" && (
                <div style={{ marginTop: content.starStyle?.margin }}>
                  <div className="tw-flex  tw-items-center">
                    {[...Array(content.starStyle?.amount)].map((_, index) => (
                      <FaStar
                        key={index}
                        size={content.starStyle?.size}
                        color={content.cardStyle?.starColor}
                        style={{
                          marginLeft: content.starStyle?.marginX,
                          marginRight: content.starStyle?.marginX,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout4;
