// Receiving alphabetic string from the url which needs converting back into an array of numbers which represents which party is chosen in each state;

export default function parseURLMapData(data) {
  const dataArray = data.split("");
  const parsedData = dataArray
    .map((el) => {
      // Convert letter to number and convert integer to base 3
      let base3String = (el.charCodeAt(0) - 96).toString(3);
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
