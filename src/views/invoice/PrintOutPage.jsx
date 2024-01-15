import { CButton } from "@coreui/react";
import React, { useRef } from "react";

import { useReactToPrint } from "react-to-print";
import { Invoice } from "./Invoice";

const PrintOutPage = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    removeAfterPrint: false,
  });

  return (
    <div>
      <div className="container px-3 pb-3 d-flex justify-content-end border-bottom ">
        <CButton onClick={handlePrint} color="primary">
          Cetak
        </CButton>
      </div>
      <div className="container w-50 my-3">
        <Invoice ref={componentRef} />
      </div>
    </div>
  );
};

export default PrintOutPage;
