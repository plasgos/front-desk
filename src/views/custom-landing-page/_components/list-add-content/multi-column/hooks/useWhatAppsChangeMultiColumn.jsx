import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useWhatAppsChangeMultiColumn = (
  sectionId,
  columnId,
  setPreviewSection,
  idSection,
  selectedSectionToEdit
) => {
  const [whatApps, setWhatApps] = useState(
    selectedSectionToEdit?.target?.whatApps || {}
  );

  const [whatAppsPhoneNumberValue] = useDebounce(whatApps.phoneNumber, 1000);

  const [whatAppsMessageValue] = useDebounce(whatApps.message, 1000);

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
                                        whatApps: {
                                          ...contentItem.target.whatApps,
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
                                        whatApps: {
                                          ...contentItem.target.whatApps,
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
                                        whatApps: {
                                          ...contentItem.target.whatApps,
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
    whatApps,
    setWhatApps,
    handlePhoneNumberChange,
    handleMessageChange,
    handleUrlOpenNewTabWaChange,
  };
};
