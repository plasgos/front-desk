import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useWhatAppsChange = (
  setPreviewSection,
  idSection,
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

  const handlePhoneNumberChange = (value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      target: {
                        whatApps: {
                          ...contentItem.target.whatApps,
                          phoneNumber: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleMessageChange = (value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      target: {
                        whatApps: {
                          ...contentItem.target.whatApps,
                          message: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  const handleUrlOpenNewTabWaChange = (value) => {
    setWhatApps((prevValue) => ({
      ...prevValue,
      isOpenNewTab: value,
    }));

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
                  ? {
                      ...contentItem,
                      target: {
                        whatApps: {
                          ...contentItem.target.whatApps,
                          isOpenNewTab: value,
                        },
                      },
                    }
                  : contentItem
              ),
            }
          : item
      )
    );
  };

  return {
    whatApps,
    setWhatApps,
    handlePhoneNumberChange,
    handleMessageChange,
    handleUrlOpenNewTabWaChange,
  };
};
