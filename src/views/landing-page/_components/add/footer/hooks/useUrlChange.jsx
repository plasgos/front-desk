import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useUrlChange = (
  setPreviewSection,
  currentSectionId,
  currentContentId,
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
                                url: {
                                  ...contentItem.target.url,
                                  url: value,
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

  const handleUrlOpenNewTabChange = (value) => {
    setUrl((prevValue) => ({
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
                                url: {
                                  ...contentItem.target.url,
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
    url,
    setUrl,
    handleUrlChange,
    handleUrlOpenNewTabChange,
  };
};
