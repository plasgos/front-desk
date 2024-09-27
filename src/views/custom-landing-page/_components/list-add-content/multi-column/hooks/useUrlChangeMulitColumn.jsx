import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useUrlChangeMultiColumn = (
  sectionId,
  columnId,
  setPreviewSection,
  idSection,
  selectedSectionToEdit
) => {
  const [url, setUrl] = useState(selectedSectionToEdit?.target?.url || {});
  const [urlValue] = useDebounce(url.url, 300);

  useEffect(() => {
    if (urlValue !== selectedSectionToEdit?.target?.url) {
      handleUrlChange(urlValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlValue]);

  const handleUrlChange = (value) => {
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
                                        url: {
                                          ...contentItem.target.url,
                                          url: value,
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

  const handleUrlOpenNewTabChange = (value) => {
    setUrl((prevValue) => ({
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
                                        url: {
                                          ...contentItem.target.url,
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
    url,
    setUrl,
    handleUrlChange,
    handleUrlOpenNewTabChange,
  };
};
