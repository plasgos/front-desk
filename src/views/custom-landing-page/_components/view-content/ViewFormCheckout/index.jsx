import React, { forwardRef, useEffect, useState } from "react";
import { useFontAwesomeIconPack } from "../../../../../hooks/useFontAwesomePack";
import Input from "../../common/Input";

const ViewFormCheckout = forwardRef(
  ({ isDragging, content, isResizing, isFocused, setPreviewSection }, ref) => {
    const iconPack = useFontAwesomeIconPack();
    const [iconName, setIconName] = useState(null);

    const [visitorEmail, setVisitorEmail] = useState(
      content.form?.information?.email || ""
    );

    useEffect(() => {
      if (iconPack && content.form?.style?.icon) {
        const iconToSet = content.form?.style?.icon || "";
        const iconExists = iconPack.some((icon) => icon.iconName === iconToSet);

        if (iconExists) {
          setIconName(iconToSet);
        } else {
          setIconName(""); // Set default icon
        }
      }
    }, [content.form.style.icon, iconPack]);

    useEffect(() => {
      if (content.form?.style?.image) {
        setIconName(null);
      }
    }, [content.form.style.image]);

    const handleChangeFormValue = (key, value) => {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === content.id
            ? {
                ...item,
                form: {
                  ...item.form,
                  information: {
                    ...item.form.information,
                    visitor: {
                      [key]: value,
                    },
                  },
                },
              }
            : item
        )
      );
    };

    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          position: "relative",
          zIndex: 1,
        }}
        className={`tw-w-full  tw-p-4 `}
      >
        {content.form?.formSetting?.visitor === "email" && (
          <Input
            type="email"
            label="Email"
            value={visitorEmail}
            onChange={(e) => {
              const { value } = e.target;
              setVisitorEmail(value);
              handleChangeFormValue("email", value);
            }}
          />
        )}
      </div>
    );
  }
);

export default ViewFormCheckout;
