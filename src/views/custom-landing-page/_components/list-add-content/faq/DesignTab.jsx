import React, { useEffect } from "react";
import { useFontAwesomeIconPack } from "../../../../../hooks/useFontAwesomePack";
import IconPicker from "../../common/IconPicker";
import PlainSimple from "./plain/Simple";
import KapsulSimple from "./kapsul/KapsulSimple";
import Accordion from "./accordion/Accordion";

const DesignTab = ({
  previewSection,
  currentSection,
  setPreviewSection,
  isEditingSection = false,
  setIconBeforeEdit,
  variant,
  isListIconVisible,
  setIsListIconVisible,
  imageUrl,
  setImageUrl,
  icon,
  setIcon,
  setPreviousIcon,
}) => {
  const iconPack = useFontAwesomeIconPack();
  useEffect(() => {
    if (imageUrl !== "") {
      // Update tempSections hanya jika imageUrl bukan string kosong
      setIcon({});
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                variant: {
                  ...item.variant,
                  style: {
                    ...item.variant.style,
                    image: imageUrl,
                    icon: {},
                  },
                },
              }
            : item
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };

  const handleSearchIcon = (prevIcon) => {
    setIconBeforeEdit([...previewSection]);
    setPreviousIcon(prevIcon);
    setIsListIconVisible(true);
  };

  useEffect(() => {
    if (iconPack && iconPack.length > 0 && Object.keys(icon).length > 0) {
      const iconToSet = currentSection?.variant?.style?.icon;

      if (Object.keys(iconToSet).length > 0) {
        const iconExists = iconPack.some(
          (icon) => icon.iconName === iconToSet?.iconName
        );

        setIcon(iconExists ? iconToSet : {});
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconPack, currentSection]);

  const handleChangeStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              variant: {
                ...item.variant,
                style: {
                  ...item.variant.style,
                  [key]: value,
                },
              },
            }
          : item
      )
    );
  };

  const handleChangeIcon = (value) => {
    setIcon(value);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              variant: {
                ...item.variant,
                style: {
                  ...item.variant.style,
                  icon: value,
                  image: "",
                },
              },
            }
          : item
      )
    );
  };

  return (
    <div>
      {isListIconVisible ? (
        <IconPicker
          value={icon}
          onChange={(value) => handleChangeIcon(value)}
        />
      ) : (
        <div>
          {variant === "1" ? (
            <PlainSimple
              currentSection={currentSection}
              handleChangeStyle={handleChangeStyle}
            />
          ) : variant === "2" ? (
            <KapsulSimple
              currentSection={currentSection}
              handleChangeStyle={handleChangeStyle}
            />
          ) : variant === "3" || variant === "4" ? (
            <Accordion
              currentSection={currentSection}
              handleChangeStyle={handleChangeStyle}
              handleFileUpload={handleFileUpload}
              handleSearchIcon={handleSearchIcon}
              icon={icon}
              imageUrl={imageUrl}
              iconPack={iconPack}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DesignTab;
