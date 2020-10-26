// Convert party for each state from numerical value of 0,1 or 2 into an alphabetic character to enable sharing the map data via an url parameter

export default function convertMapData(data) {
  let mapData = data.map((el) => el.party.toString());
  // Group data into sets of 3 to convert into base3
  const dataInBase3 = [];
  while (mapData.length > 0) {
    dataInBase3.push(mapData.splice(0, 3).join(""));
  }
  // Convert base3 into integer then a character
  const dataInCharacters = dataInBase3.map((el) => {
    return String.fromCharCode(parseInt(el, 3) + 96);
  });
  return dataInCharacters.join("");
}
