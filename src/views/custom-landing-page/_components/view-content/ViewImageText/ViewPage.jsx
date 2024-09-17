import React from "react";

const ViewPage = ({ content }) => {
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
        </>
      )}
    </div>
  );
};

export default ViewPage;
