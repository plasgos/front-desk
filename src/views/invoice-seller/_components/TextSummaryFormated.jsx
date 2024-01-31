import React from "react";
import { formatPrice } from "../../../lib/format-price";
import { CBadge } from "@coreui/react";

export const TextSummaryFormated = ({
  title,
  price,
  isFontWeight,
  isDiscount,
  badgePromo,
}) => {
  return (
    <div className="d-flex justify-content-end ">
      <div
        style={{ borderBottom: "2px dashed #D8DBE0" }}
        className="d-flex justify-content-between w-50 pb-3 align-items-end "
      >
        <div>
          {badgePromo && (
            <CBadge color="success" className="my-1">
              Promo Plasgos
            </CBadge>
          )}

          <div className={`${isFontWeight ? "font-weight-bold" : ""}`}>
            {title}
          </div>
        </div>
        <div className={`font-weight-bold ${isFontWeight ? "font-lg" : ""}`}>
          {" "}
          {isDiscount && "-"} {formatPrice(price)}
        </div>
      </div>
    </div>
  );
};
