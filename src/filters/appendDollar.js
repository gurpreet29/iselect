/** checks for string as a number or not to append dollar ($) sign
 * appendDollar  
 */
export default function appendDollar() {
  return input => {

    var x = parseInt(input, 10);
    if (!isNaN(x)) {
      x = '$' + x;
    } else {
      x = input;
    }

    return x;;
  }
}