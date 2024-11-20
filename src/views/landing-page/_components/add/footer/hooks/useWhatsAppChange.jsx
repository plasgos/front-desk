import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useWhatsappChange = (
  setPreviewSection,
  currentSectionId,
  currentContentId,
  selectedSectionToEdit
) => {
  const [whatsapp, setWhatApps] = useState(
    selectedSectionToEdit?.target?.whatsapp || {}
  );

  const [whatAppsPhoneNumberValue] = useDebounce(whatsapp.phoneNumber, 300);

  const [whatAppsMessageValue] = useDebounce(whatsapp.message, 300);

  useEffect(() => {
    if (
      whatAppsPhoneNumberValue !==
      selectedSectionToEdit?.target?.whatsapp?.phoneNumber
    ) {
      handlePhoneNumberChange(whatAppsPhoneNumberValue);
    }

    if (
      whatAppsMessageValue !== selectedSectionToEdit?.target?.whatsapp?.message
    ) {
      handleMessageChange(whatAppsMessageValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whatAppsPhoneNumberValue, whatAppsMessageValue]);

  const handlePhoneNumberChange = (value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSectionId
          ? {
              ...item,
              content: item.content.map((content) =>
                String(content.id) === String(currentContentId)
                  ? {
                      ...content,
                      content: content.content.map((contentItem) =>
                        contentItem.id === selectedSectionToEdit.id
                          ? {
                              ...contentItem,
                              target: {
                                whatsapp: {
                                  ...contentItem.target.whatsapp,
                                  phoneNumber: value,
                                },
                              },
                            }
                          : contentItem
                      ),
                    }
                  : content
              ),
            }
          : item
      )
    );
  };

  const handleMessageChange = (value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSectionId
          ? {
              ...item,
              content: item.content.map((content) =>
                String(content.id) === String(currentContentId)
                  ? {
                      ...content,
                      content: content.content.map((contentItem) =>
                        contentItem.id === selectedSectionToEdit.id
                          ? {
                              ...contentItem,
                              target: {
                                whatsapp: {
                                  ...contentItem.target.whatsapp,
                                  message: value,
                                },
                              },
                            }
                          : contentItem
                      ),
                    }
                  : content
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
        String(item.id) === currentSectionId
          ? {
              ...item,
              content: item.content.map((content) =>
                String(content.id) === String(currentContentId)
                  ? {
                      ...content,
                      content: content.content.map((contentItem) =>
                        contentItem.id === selectedSectionToEdit.id
                          ? {
                              ...contentItem,
                              target: {
                                whatsapp: {
                                  ...contentItem.target.whatsapp,
                                  isOpenNewTab: value,
                                },
                              },
                            }
                          : contentItem
                      ),
                    }
                  : content
              ),
            }
          : item
      )
    );
  };

  return {
    whatsapp,
    setWhatApps,
    handlePhoneNumberChange,
    handleMessageChange,
    handleUrlOpenNewTabWaChange,
  };
};
