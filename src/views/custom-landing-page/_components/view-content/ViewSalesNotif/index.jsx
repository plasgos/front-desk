import React, { forwardRef } from "react";

const ViewSalesNotif = forwardRef(
  ({ content, setPreviewFloatingSection }, ref) => {
    const { shownOnWhen, isPopupShown, hidden, nextAfter, isRandomList } =
      content;

    return <div>ViewSalesNotif</div>;
  }
);

export default ViewSalesNotif;
