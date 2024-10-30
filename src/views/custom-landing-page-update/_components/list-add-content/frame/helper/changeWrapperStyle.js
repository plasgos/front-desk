export const changeWrapperStyleFrame = (
  setPreviewSection,
  sectionId,
  sectionFrameId,
  newValue
) => {
  setPreviewSection((arr) =>
    arr.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            content: section.content.map((sectionFrame) =>
              sectionFrame.id === sectionFrameId
                ? {
                    ...sectionFrame,
                    wrapperStyle: {
                      ...sectionFrame.wrapperStyle,
                      ...newValue,
                    },
                  }
                : sectionFrame
            ),
          }
        : section
    )
  );
};
