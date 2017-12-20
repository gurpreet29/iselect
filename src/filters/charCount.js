/** checks for string length
 * charCount  
 */
export default function charCount() {
  return input => {

    if (input != true || input != false) {
      var text = String(input).replace(/<[^>]+>/gm, '');
      var x = text.length;
      if (x > 55) {
        x = true;
      } else {
        x = false;
      }
    }

    return x;
  }
}
