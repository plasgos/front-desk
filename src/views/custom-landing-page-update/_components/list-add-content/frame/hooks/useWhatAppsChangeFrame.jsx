import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useWhatAppsChangeFrame = (
  setPreviewSection,
  sectionId,
  sectionFrameId,
  selectedSectionToEdit
) => {
  const [whatApps, setWhatApps] = useState(
    selectedSectionToEdit?.target?.whatApps || {}
  );

  const [whatAppsPhoneNumberValue] = useDebounce(whatApps.phoneNumber, 300);

  const [whatAppsMessageValue] = useDebounce(whatApps.message, 300);

  useEffect(() => {
    if (
      whatAppsPhoneNumberValue !==
      selectedSectionToEdit?.target?.whatApps?.phoneNumber
    ) {
      handlePhoneNumberChange(whatAppsPhoneNumberValue);
    }

    if (
      whatAppsMessageValue !== selectedSectionToEdit?.target?.whatApps?.message
    ) {
      handleMessageChange(whatAppsMessageValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whatAppsPhoneNumberValue, whatAppsMessageValue]);

  const setValueWhatAppstarget = (newValue) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === sectionFrameId
                  ? {
                      ...sectionFrame,
                      content: sectionFrame.content.map((contentItem) =>
                        contentItem.id === selectedSectionToEdit.id
                          ? {
                              ...contentItem,
                              target: {
                                whatApps: {
                                  ...contentItem.target.whatApps,
                                  ...newValue,
                                },
                              },
                            }
                          : contentItem
                      ),
                    }
                  : sectionFrame
              ),
            }
          : section
      )
    );
  };

  const handlePhoneNumberChange = (value) => {
    const newValue = {
      phoneNumber: value,
    };
    setValueWhatAppstarget(newValue);
  };

  const handleMessageChange = (value) => {
    const newValue = {
      message: value,
    };
    setValueWhatAppstarget(newValue);
  };

  const handleUrlOpenNewTabWaChange = (value) => {
    setWhatApps((prevValue) => ({
      ...prevValue,
      isOpenNewTab: value,
    }));

    const newValue = {
      isOpenNewTab: value,
    };
    setValueWhatAppstarget(newValue);
  };

  return {
    whatApps,
    setWhatApps,
    handlePhoneNumberChange,
    handleMessageChange,
    handleUrlOpenNewTabWaChange,
  };
};
