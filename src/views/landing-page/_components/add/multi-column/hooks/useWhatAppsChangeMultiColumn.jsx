import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useWhatsappsChangeMultiColumn = (
  sectionId,
  columnId,
  setPreviewSection,
  idSection,
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
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === idSection
                          ? {
                              ...content,
                              content: content.content.map((contentItem) => {
                                return contentItem.id ===
                                  selectedSectionToEdit.id
                                  ? {
                                      ...contentItem,
                                      target: {
                                        whatsapp: {
                                          ...contentItem.target.whatsapp,
                                          phoneNumber: value,
                                        },
                                      },
                                    }
                                  : contentItem;
                              }),
                            }
                          : content
                      ),
                    }
                  : column
              ),
            }
          : section
      )
    );
  };

  const handleMessageChange = (value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === idSection
                          ? {
                              ...content,
                              content: content.content.map((contentItem) => {
                                return contentItem.id ===
                                  selectedSectionToEdit.id
                                  ? {
                                      ...contentItem,
                                      target: {
                                        whatsapp: {
                                          ...contentItem.target.whatsapp,
                                          message: value,
                                        },
                                      },
                                    }
                                  : contentItem;
                              }),
                            }
                          : content
                      ),
                    }
                  : column
              ),
            }
          : section
      )
    );
  };

  const handleUrlOpenNewTabWaChange = (value) => {
    setWhatApps((prevValue) => ({
      ...prevValue,
      isOpenNewTab: value,
    }));

    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === idSection
                          ? {
                              ...content,
                              content: content.content.map((contentItem) => {
                                return contentItem.id ===
                                  selectedSectionToEdit.id
                                  ? {
                                      ...contentItem,
                                      target: {
                                        whatsapp: {
                                          ...contentItem.target.whatsapp,
                                          isOpenNewTab: value,
                                        },
                                      },
                                    }
                                  : contentItem;
                              }),
                            }
                          : content
                      ),
                    }
                  : column
              ),
            }
          : section
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
