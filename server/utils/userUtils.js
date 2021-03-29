function findIndex(arr, id) {
  const res = { arrIndex, error };
  res.index = arr.findIndex((arr) => arr.id === parseInt(id, 10));

  if (res.index === -1) res.error = "No element found";

  return res;
}
module.exports = {
  findIndex,
};
