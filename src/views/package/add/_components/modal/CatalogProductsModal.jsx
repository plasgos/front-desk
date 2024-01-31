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
import React, { useState, useEffect } from "react";
import { FaListUl, FaRegEdit } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoClose, IoTrashOutline, IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { setQtyItem, setAddItem, setRemoveItem, setItemValue, setDetail} from "../../../../../redux/modules/package/reducer";
import { formatPrice } from "../../../../../lib";
import { defaultImgSquare200 } from '../../../../../lib/product';


const CardProduct = ({detail}) => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.product);
  const { items } = useSelector(state => state.package);

  const onSelect = (obj) => {
    dispatch(setAddItem({
      product_id: obj.id,
      quantity: obj.min_order,
      price: obj.price,
      weight: obj.weight,
      product: obj
    }))
  }

  return (
    <CCard className="my-2" style={{ cursor: "pointer" }}>
      <CCardBody className={'p-2' /*`p-2`  ${selected && "modal-selected"}*/}>
        <div style={{ gap: 20 }} className="d-flex ">
          <div className="rounded shadow-sm border p-2">
            <img style={{ width: 40, height: 40 }} src={defaultImgSquare200(detail)} alt="display-product" />
          </div>
          <div>
            <div className="font-weight-bold mb-1 text-dark">{detail.name}</div>
            <div className="mb-1" style={{fontSize:12}}>Berat {detail.weight} gram / item</div>
            <div className="font-weight-bold text-primary">{formatPrice(detail.price)}</div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <CButton
            size="sm"
            shape="pill"
            variant="outline"
            color="primary"
            onClick={() => onSelect(detail) }
          >
            Pilih Produk
            <MdOutlineShoppingCartCheckout size={18} className="ml-2"/>
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  )
}
const CardSelected = ({item}) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(item.quantity);
  const onBlurQty = () => {
    let payload = {
      product_id: item.product_id,
      quantity: Number(qty),
      weight: Number(item.product.weight),
      price: Number(item.product.price),
    }
    dispatch(setQtyItem(payload))
  }
  const onChangeQty = (value) => {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (reg.test(value) || value === '' || value === '-') {
      setQty(value)
    }
  }
  const onChangeQtyAdd = (value) => {
    let payload = {
      product_id: item.product_id,
      quantity: Number(value)+1,
      weight: Number(item.product.weight),
      price: Number(item.product.price),
    }
    setQty(Number(value)+1)
    dispatch(setQtyItem(payload))
  }
  const onChangeQtyMinus = (value) => {
    if(Number(value) > 1){
      let payload = {
        product_id: item.product_id,
        quantity: Number(value)-1,
        weight: Number(item.product.weight),
        price: Number(item.product.price),
      }
      setQty(Number(value)-1)
      dispatch(setQtyItem(payload))
    }
  }
  const onRemoveSelected = () => {
    dispatch(setRemoveItem({product_id: item.product_id}))
  }
  return (
    <CCard className="my-2  border-primary"  style={{ cursor: "pointer" }}>
      <CCardBody className="p-2">
        <div className="d-flex justify-content-start align-items-start">
          <div className="rounded shadow-sm border p-2">
            <img style={{ width: 40, height: 40 }} src={defaultImgSquare200(item.product)} alt="display-product" />
          </div>
          <div className="ml-3">
            <div className="text-dark">{item.product.name}</div>
            <div className="mb-1" style={{fontSize:12}}>{item.quantity} barang ({item.product.weight * item.quantity} gram)</div>
            <div className="font-weight-bold mb-2">{formatPrice(item.product.price)}</div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <CButton
            size="sm"
            shape="pill"
            variant="outline"
            color="danger"
            onClick={onRemoveSelected}
          >
            Hapus Produk <IoTrashOutline style={{fontSize: 18}} className="ml-2"/>
          </CButton>
          <div className="d-flex align-items-center justify-content-end">
            <div className="mr-2">
              <div>Subtotal</div>
              <div className="text-primary"><b>{formatPrice(Number(item.product.price) * Number(item.quantity))}</b></div>
            </div>
            <div className="d-flex align-items-center">
              <div style={{cursor:'pointer'}} onClick={() => onChangeQtyMinus(qty)}><IoRemoveCircleOutline style={{fontSize: 24}} color={item.quantity === 1 ? "#dae2ed" : "#fa541c"}/></div>
              <div className="px-2"><CInput onBlur={onBlurQty} value={qty} style={{width:50, textAlign:'center'}} onChange={(e)=>onChangeQty(e.target.value)}/></div>
              <div style={{cursor:'pointer'}} onClick={() => onChangeQtyAdd(qty)}><IoAddCircleOutline style={{fontSize: 24}} color="#FA541C"/></div>
            </div>
          </div>
        </div>

      </CCardBody>
    </CCard>
  )
}
const ListSelectedProducts = () => {
  const { items } = useSelector(state => state.package);
  const weight = items.reduce((acc, val) => acc + (val.product.weight * val.quantity),0)
  return (
    <div style={{ flex: 1 }}>
      <div className="mb-2">Produk Terpilih</div>
      <div className="modal-overflow vertical-scrolling-menu">
        {
          items.length > 0 ? (
            <>
              {
                items.map((item, i) => <CardSelected key={item.product_id} item={item} />).reverse()
              }
              <div>
                <div><b>Total Berat</b></div>
                <div>{weight} gram</div>
              </div>
            </>
          ) : (
            <div>Kosong</div>
          )
        }
      </div>
    </div>
  )
}
export const CatalogProductsModal = () => {
  const dispatch = useDispatch();
  const { items, detail } = useSelector(state => state.package);
  const { data } = useSelector(state => state.product);

  const filteredNotInclude = data.filter(product => !items.some(item => product.id === item.product_id))

  const [modal, setModal] = useState(false);
  const toggle = async () => {
    if(!modal === false){
      const total_item_value = await items.reduce((acc, val) => acc + (val.product.price * val.quantity), 0)
      const total_weight = await items.reduce((acc, val) => acc + (val.product.weight * val.quantity),0)
      await dispatch(setItemValue(total_item_value))
      await dispatch(setDetail({
        ...detail,
        weight:total_weight
      }))
    }
    await setModal(!modal);
  };
  return (
    <>
      {
        items && items.length > 0 ? (
          <CButton color="primary" onClick={toggle} className="mr-1 btn-block">
            <FaRegEdit size={18} className="mr-2" /> Ubah Produk Terpilih
          </CButton>
        ):(
          <CButton color="primary" onClick={toggle} className="mr-1 btn-block">
            <FaListUl size={18} className="mr-2" /> Katalog Produk
          </CButton>
        )
      }
      <CModal size="xl" centered show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          <h4 className="text-center ml-auto">Katalog Produk</h4>
        </CModalHeader>
        <CModalBody style={{ gap: 20 }} className="d-flex">
          <div style={{ flex: 1 }}>
            <div className="mb-2">Daftar Produk</div>
            <div className="modal-overflow vertical-scrolling-menu">
              {data.length > 0 ? filteredNotInclude.map((product, i) => <div key={i}><CardProduct detail={product} / ></div> ) : <div>Kosong</div>}
            </div>
          </div>
          <ListSelectedProducts />
        </CModalBody>
        <CModalFooter className="d-flex align-items-center justify-content-end">
          <CButton onClick={toggle} color="primary"className="ml-2">
            Tambahkan
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
