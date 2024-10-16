import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const useUrlChangeFrame = (
  setPreviewSection,
  sectionId,
  sectionFrameId,
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

  const setValueUrltarget = (newValue) => {
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
                                url: {
                                  ...contentItem.target.url,
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

  const handleUrlChange = (value) => {
    const newValue = {
      url: value,
    };
    setValueUrltarget(newValue);
  };

  const handleUrlOpenNewTabChange = (value) => {
    setUrl((prevValue) => ({
      ...prevValue,
      isOpenNewTab: value,
    }));

    const newValue = {
      isOpenNewTab: value,
    };
    setValueUrltarget(newValue);
  };

  return {
    url,
    setUrl,
    handleUrlChange,
    handleUrlOpenNewTabChange,
  };
};
