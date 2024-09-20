import React, { useEffect, useState } from "react";

const ViewPage = ({ content }) => {
  const [isParentReady, setIsParentReady] = useState(false);
  const [animationKey, setAnimationKey] = useState(Date.now()); // State untuk memicu re-render

  useEffect(() => {
    const checkParentElement = () => {
      const parentElement = document.querySelector("#scrolly-div");
      if (parentElement) {
        setIsParentReady(true);
      } else {
        setTimeout(checkParentElement, 100);
      }
    };

    checkParentElement();

    return () => {
      clearTimeout(checkParentElement);
    };
  }, []);

  useEffect(() => {
    if (content?.animation?.type) {
      setTimeout(() => {
        setAnimationKey(Date.now()); // Reset animasi setelah jeda
      }, 100); // Tambahkan jeda 100ms sebelum merender ulang
    }
  }, [content.animation.type]);

  return (
    <div className="tw-flex tw-items-center">
      {content?.variant?.style?.imagePosition === "right" ? (
        <>
          <div
            style={{
              marginRight: content?.variant?.style?.distance,
            }}
            className=""
          >
            {content?.content.map((contentItem) => {
              const cleanContent = contentItem.content
                .replace(/<p>/g, "<div>")
                .replace(/<\/p>/g, "</div>");
              return (
                <div key={contentItem.id} className="">
                  <div
                    style={{
                      color: contentItem.textColor,
                      textShadow: contentItem.textShadow,
                    }}
                    className={`tw-p-2 ${contentItem.fontSize} ${contentItem.textAlign}`}
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
            <div className={`tw-w-full`}>
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
          {isParentReady && (
            <div
              style={{
                width: content?.variant?.style?.width * 10,
              }}
            >
              {content?.animation?.type ? (
                // <ScrollAnimation
                //   // key={`${content?.animation?.type}-${content?.animation?.duration}-${content?.animation?.replay}`}
                //   key={animationKey}
                //   animateIn={content?.animation?.type}
                //   animateOut="fadeOut"
                //   duration={content?.animation?.duration}
                //   scrollableParentSelector="#scrolly-div"
                // >
                //   <img
                //     className={`${
                //       content?.variant?.style?.shadow
                //         ? content?.variant?.style?.shadow
                //         : ""
                //     }`}
                //     src={content?.variant?.style?.image}
                //     alt=""
                //     style={{
                //       width: "100%",
                //       transform: `rotate(${content?.variant?.style?.rotation}deg)`,
                //       transition: "transform 0.5s ease",
                //       objectFit: "contain",
                //       borderRadius: content?.variant?.style?.rounded,
                //     }}
                //   />
                // </ScrollAnimation>
                <div></div>
              ) : (
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
              )}
            </div>
          )}

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
                <div key={contentItem.id} className="">
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

export default ViewPage;
