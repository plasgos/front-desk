import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CCol,
  CInput
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";

import { getProducts } from "../../../../redux/modules/product/reducer";
import { formatPrice } from "../../../../lib";
import { defaultImgSquare200 } from '../../../../lib/product';

import { Detail } from "./Detail";
import { CatalogProductsModal } from "./modal/CatalogProductsModal";

const Card = ({item}) => {
  return (
    <div className="card shadow-sm p-2">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div>
            <div className="rounded shadow-sm border p-2">
              <img style={{ width: 40, height: 40 }} src={defaultImgSquare200(item.product)} alt="display-product" />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-weight-bold">{item.product.name}</div>
            {item.price && <div className="font-weight-bold mb-1 text-danger">{formatPrice(item.price)}</div>}
            <div className="font-weight-bold text-dark" style={{fontSize: 12}}>{item.quantity} Item ({item.weight} gram / item)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default () => {
  const dispatch = useDispatch();
  const { token, logged_in } = useSelector((state) => state.login);
  const { data } = useSelector((state) => state.product);
  const { items } = useSelector((state) => state.package);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(25);

  const getData = () => {
    if(logged_in){
      dispatch(getProducts({ page, limit, token }));
    }
  };

  useEffect(() => {
    getData();
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="font-weight-bold font-lg  my-t mb-3">Detail Barang</div>
      <div className=" card p-3 shadow-sm rounded">
        <div className="mb-3">
          <CatalogProductsModal />
        </div>

        <div className="vertical-scrolling-menu pr-2" style={{maxHeight: 350}}>
        {
          items.length > 0 ? items.map(item => (
            <div key={item.product_id}>
              <Card item={item} />
            </div>
          )) : (
            <div className="text-center">
              Pilih Produk yang mau kamu kirim
            </div>
          )
        }
        </div>

        {items && items.length > 0 && <Detail />}
      </div>
    </div>
  );
};
