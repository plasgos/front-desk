import React from "react";
import { formatPrice } from "../../../lib/format-price";
import { CBadge } from "@coreui/react";

export const TextSummaryFormated = ({
  title,
  price,
  isFontWeight,
  isDiscount,
  badgePromo,
  withBorder,
}) => {
  return (
    <div className="d-flex justify-content-end ">
      <div
        style={{ borderBottom: withBorder ? "2px dashed #D8DBE0" : "none" }}
        className={`d-flex justify-content-between w-50 align-items-end ${
          withBorder ? "pb-3" : "pb-0"
        } `}
      >
        <div>
          {badgePromo && (
            <CBadge color="primary" className="my-1">
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
