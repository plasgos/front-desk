import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useState } from "react";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";
import { Controller, useForm } from "react-hook-form";

const ViewNewsletter = forwardRef(
  (
    {
      isDragging,
      isResizing,
      section,
      content,
      focusedIndexSectionContent,
      setSectionContentRef,
    },
    ref
  ) => {
    const { handleSubmit, control } = useForm({
      defaultValues: {
        email: "",
      },
    });

    const onSubmit = (data) => {
      console.log(data);
    };

    const { titleColor, innerOutline } = section?.variant?.style || {};

    const iconPack = useFontAwesomeIconPack();
    const [icon, setIcon] = useState(null);

    useEffect(() => {
      if (iconPack && iconPack.length > 0) {
        const iconToSet = content?.content?.icon;

        if (iconToSet && Object.keys(iconToSet).length > 0) {
          const iconExists = iconPack.some(
            (icon) => icon.iconName === iconToSet.iconName
          );

          setIcon(iconExists ? iconToSet : {});
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [iconPack, content]);

    useEffect(() => {
      if (content.content?.image) {
        setIcon(null);
      }
    }, [content.content.image]);

    return (
      <div
        ref={(el) => {
          if (setSectionContentRef) {
            setSectionContentRef(el, content.id);
          }
        }}
        style={{
          ...(focusedIndexSectionContent === content.id && {
            border: "2px solid green",
          }),
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          width: content?.content?.maxWidth,
          padding: 10,
        }}
        key={content.id}
        className={`${
          focusedIndexSectionContent === content.id
            ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
            : ""
        }`}
      >
        <div className="tw-flex tw-items-center tw-mb-3">
          {icon && (
            <div
              style={{
                position: "relative",
                marginRight: 8,
                color: titleColor,
              }}
            >
              <FontAwesomeIcon
                icon={[`${icon.prefix}`, icon.iconName]}
                style={{ fontSize: content.content?.iconSize }}
              />
            </div>
          )}

          {content?.content?.image && (
            <div
              style={{
                position: "relative",
                marginRight: 8,
                width: content.content?.imageSize,
              }}
            >
              <img
                src={content?.content?.image}
                alt="icon"
                style={{ width: "100%", objectFit: "contain" }}
              />
            </div>
          )}

          <div
            style={{
              color: titleColor,
            }}
          >
            {content?.content?.title}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            borderTop: `1px solid ${innerOutline} `,
            paddingTop: 10,
          }}
          className="tw-relative tw-inline-block"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Bagian ini harus di isi",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Format email tidak valid", // Pesan error untuk format email
                },
              }}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <>
                  <div className="tw-flex  ">
                    <input
                      style={{
                        borderRadius: "8px 0 0 8px",
                      }}
                      placeholder={content?.content?.placeholder}
                      {...field}
                      type="text"
                      className={`tw-w-full tw-border tw-border-gray-300  tw-p-2 tw-text-sm tw-placeholder-slate-300 tw-flex-grow `}
                    />

                    <button
                      style={{
                        backgroundColor: content?.content?.btnColor,
                        borderRadius: "0 8px 8px 0",
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
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  )}
                </>
              )}
            />
          </form>
        </div>
      </div>
    );
  }
);

export default ViewNewsletter;
