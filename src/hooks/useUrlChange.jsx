import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useUrlChange = (
  setPreviewSection,
  idSection,
  selectedSectionToEdit
) => {
  const [url, setUrl] = useState(selectedSectionToEdit?.target?.url || {});
  const [urlValue] = useDebounce(url.url, 1000);

  useEffect(() => {
    if (urlValue !== selectedSectionToEdit?.target?.url) {
      handleUrlChange(urlValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlValue]);

  const handleUrlChange = (value) => {
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
                        url: {
                          ...contentItem.target.url,
                          url: value,
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

  const handleUrlOpenNewTabChange = (value) => {
    setUrl((prevValue) => ({
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
                        url: {
                          ...contentItem.target.url,
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
    url,
    setUrl,
    handleUrlChange,
    handleUrlOpenNewTabChange,
  };
};
