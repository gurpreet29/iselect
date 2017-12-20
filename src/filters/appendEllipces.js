/** checks for string as a number or not to appendEllipces (...) sign
 * appendEllipces  
 */
export default function appendEllipces() {
  return input => {
    var text = String(input).replace(/<[^>]+>/gm, '')
    if(text.length > 55) {
      var x = text.substr(0,55);
      x = x + "...";
      return x;
    }
    return input;
  }
}
