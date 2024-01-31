export const IMAGE_EMPTY = 'https://image-plasgos.s3-ap-southeast-1.amazonaws.com/no-image-thumb.png'
export const no_image_01 = 'https://plasgos.s3.ap-southeast-1.amazonaws.com/static/no-image-01.png'

const defaultImgSquare200 = detail => {
  let url = detail.ImageProducts ? detail.ImageProducts.find(dt=>dt.is_default).square_200_url : null;
  return url ? url+".webp": IMAGE_EMPTY;
}

const defaultImg = detail => {
  let url = detail.ImageProducts ? detail.ImageProducts.find(dt=>dt.is_default).url : null;
  return url ? url+".webp": IMAGE_EMPTY;
}

const totalPoint = detail => {
  let dataFilter = detail.Points.filter(dt=>dt.point !== null)
  let total = dataFilter.reduce((prevValue, currentValue )=>prevValue + currentValue.point, 0)
  return dataFilter.length === 0 || total === 0 ? 0 : Math.round(total / dataFilter.length);
}

const totalReview = detail => {
  let dataFilter = detail.Points.filter(dt=> dt.point !== null)
  return dataFilter.length;
}

const checkCashback = (detail) => {
  let result = detail.GrocierPrices.reduce((acc, val) => acc + val.cashback, 0);
  return result > 0
}
export {
  defaultImgSquare200,
  defaultImg,
  totalPoint,
  totalReview,
  checkCashback
}
