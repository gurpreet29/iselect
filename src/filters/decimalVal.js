/**
 * decimalVal  */
export default function decimalVal() {
  return item => {
    if (item != null) {
      let val = item.split('.');
      if (val.length > 0) {
        return val[1].substr(0, 2);
      } else {
        return val;
      }
    } else {
      return 0;
    }
  }
}
