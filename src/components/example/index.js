import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from './reducer';

const Example = () => {
  const dispatch = useDispatch();
  const { address } = useSelector(state => state.example);

  const getData = () => {
    let payload = {
      token: "xxxx"
    }
    dispatch(actions.getAddress(payload))
  }
  console.log(address);
  useEffect(() => {
    return () => {}
  },[])
  return (
    <div>
      <button onClick={() => getData()}>Get Data Address</button>
      {
        address.data && address.data.map(item => (
          <div key={item.id} style={{margin: 10, border: '1px solid #000'}}>
            <div>{item.name_address_as}</div>
            <div>{item.address}</div>
            <div>{item.Subdistrict?.name} {item.Subdistrict?.City.type} {item.Subdistrict?.City.name} {item.Subdistrict?.City.Province.name}</div>
          </div>
        ))
      }
    </div>
  )
}
export default Example;
