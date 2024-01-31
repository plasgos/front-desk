const checkObjectFilled = (obj) => {
  const values = Object.values(obj);
  return values.every(value => value !== null && value !== undefined && value !== '');
}

export {
  checkObjectFilled
}
