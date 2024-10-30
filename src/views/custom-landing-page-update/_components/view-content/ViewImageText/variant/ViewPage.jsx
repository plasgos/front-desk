import React from "react";
import useAnimatedVisibility from "../../../../../../hooks/useAnimatedVisibility";
const ViewPageCSS = ({ content, isPreview, width }) => {
  const { elementRef, getClassName, duration } = useAnimatedVisibility(content);
  const {
    elementRef: elementRefContent,
    getClassName: getClassNameContent,
    duration: durationContent,
  } = useAnimatedVisibility(content.content[0]);

  return (
    <div
      className={` ${
        isPreview
          ? `tw-flex tw-items-center tw-max-w-full ${
              width === "100%"
                ? "tw-flex-nowrap"
                : width < 420
                ? "tw-flex-wrap"
                : ""
            }`
          : "parent-container-video-text-view"
      }`}
    >
      {content?.variant?.style?.imagePosition === "right" ? (
        <>
          <div
            style={{
              marginRight: content?.variant?.style?.distance,
            }}
          >
            {content?.content.map((contentItem) => {
              const cleanContent = contentItem.content
                .replace(/<p>/g, "<div>")
                .replace(/<\/p>/g, "</div>");
              return (
                <div
                  ref={elementRefContent}
                  className={getClassNameContent()}
                  style={{
                    "--animation-duration": `${durationContent}s`,
                  }}
                  key={contentItem.id}
                >
                  <div
                    style={{
                      color: content?.variant?.style?.textColor,
                      textShadow: content?.variant?.style?.textShadow,
                    }}
                    className={`tw-p-2 ${content?.variant?.style?.fontSize} ${content?.variant?.style?.textAlign}`}
                    dangerouslySetInnerHTML={{ __html: cleanContent }}
                  />
                </div>
              );
            })}
          </div>

          <div
            style={{
              width: content?.variant?.style?.width * 10,
            }}
          >
            <div
              ref={elementRef}
              className={getClassName()}
              style={{
                "--animation-duration": `${duration}s`,
              }}
            >
              <img
                className={`${
                  content?.variant?.style?.shadow
                    ? content?.variant?.style?.shadow
                    : ""
                }`}
                src={content?.variant?.style?.image}
                alt=""
                style={{
                  width: "100%",
                  transform: `rotate(${content?.variant?.style?.rotation}deg)`,
                  transition: "transform 0.5s ease",
                  objectFit: "contain",
                  borderRadius: content?.variant?.style?.rounded,
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              width: content?.variant?.style?.width * 10,
            }}
          >
            <div
              ref={elementRef}
              className={getClassName()}
              style={{
                "--animation-duration": `${duration}s`,
              }}
            >
              <img
                className={`${
                  content?.variant?.style?.shadow
                    ? content?.variant?.style?.shadow
                    : ""
                }`}
                src={content?.variant?.style?.image}
                alt=""
                style={{
                  width: "100%",
                  transform: `rotate(${content?.variant?.style?.rotation}deg)`,
                  transition: "transform 0.5s ease",
                  objectFit: "contain",
                  borderRadius: content?.variant?.style?.rounded,
                }}
              />
            </div>
          </div>

          <div
            style={{
              marginLeft: content?.variant?.style?.distance,
            }}
            className=""
          >
            {content?.content.map((contentItem) => {
              const cleanContent = contentItem.content
                .replace(/<p>/g, "<div>")
                .replace(/<\/p>/g, "</div>");
              return (
                <div
                  ref={elementRefContent}
                  className={getClassNameContent()}
                  style={{
                    "--animation-duration": `${durationContent}s`,
                  }}
                  key={contentItem.id}
                >
                  <div
                    style={{
                      color: content?.variant?.style?.textColor,
                      textShadow: content?.variant?.style?.textShadow,
                    }}
                    className={`tw-p-2 ${content?.variant?.style?.fontSize} ${content?.variant?.style?.textAlign}`}
                    dangerouslySetInnerHTML={{ __html: cleanContent }}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewPageCSS;
