/** checks for payment frequency to show yearly / monthly
 * frequencyName  
 */
export default function frequencyName(){
  return item =>{

    return item=="0" ? "year" : "monthly";
  }
}