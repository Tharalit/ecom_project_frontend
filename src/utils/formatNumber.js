import numeral from "numeral";

export const formatNumber = (num) => {
  return numeral(num).format(0, 0);
};
