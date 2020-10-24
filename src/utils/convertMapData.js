export function convertMapData(data) {
  let mapData = data.map((el) => el.party.toString());
  const dataInBase3 = [];
  while (mapData.length > 0) {
    dataInBase3.push(mapData.splice(0, 3).join(""));
  }
  const dataInCharacters = dataInBase3.map((el) => {
    return String.fromCharCode(parseInt(el, 3) + 96);
  });
  return dataInCharacters.join("");
}
