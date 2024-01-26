export const getDataExpeditions = (
  dispatch,
  getShippingCost,
  packages,
  userData
) => {
  dispatch(
    getShippingCost({
      data: {
        origin: {
          district_id: packages.origin.district_id,
          lat: packages.origin.lat,
          long: packages.origin.long,
          address: packages.origin.address,
        },
        destination: {
          district_id: packages.receiver.subdistrict_id,
          lat: packages.receiver.lat,
          long: packages.receiver.long,
          address: packages.receiver.address,
        },
        weight: packages.totalWeight,
        insurance: packages.insurance,
        item_value: packages.item_value,
        store_id: userData.user.store.id,
      },
      token: userData.token,
    })
  );
};
