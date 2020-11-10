// Receiving alphabetic string from the url which needs converting back into an array of numbers which represents which party is chosen in each state;

export default function parseURLMapData(data) {
  if (!data) return Array(57).fill("0");

  const dataArray = data.split("");
  const parsedData = dataArray
    .map((el) => {
      // Convert letter to number
      let charCode = el.charCodeAt(0) - 96;
      if (charCode < 0 || charCode > 28) {
        charCode = 0;
      }
      // convert integer to base3
      let base3String = charCode.toString(3);
      // Add missing '0's to start of numbers where missing
      while (base3String.length < 3) {
        base3String = "0" + base3String;
      }
      return base3String;
    })
    .flat()
    .join("")
    .split("");
  return parsedData;
}
