import React, { forwardRef } from "react";
import ImmediatelyPopup from "./ImmediatelyPopup";
import DelayPopup from "./DelayPopup";
const ViewSalesNotif = forwardRef(
  ({ content, setPreviewFloatingSection }, ref) => {
    const { shownOnWhen } = content;

    return (
      <div>
        {shownOnWhen?.value === "immediately" && (
          <ImmediatelyPopup
            ref={ref}
            setPreviewFloatingSection={setPreviewFloatingSection}
            content={content}
          />
        )}

        {shownOnWhen?.value === "waitAfter" && (
          <DelayPopup
            ref={ref}
            setPreviewFloatingSection={setPreviewFloatingSection}
            content={content}
          />
        )}
      </div>
    );
  }
);

export default ViewSalesNotif;
