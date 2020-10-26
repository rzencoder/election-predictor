export default function parseURLMapData(data) {
  const a = data.split("");
  const b = a
    .map((el) => {
      let c = (el.charCodeAt(0) - 96).toString(3);
      while (c.length < 3) {
        c = "0" + c;
      }
      return c;
    })
    .flat()
    .join("")
    .split("");
  return b;
}
//   let mapData = data.map((el) => el.party.toString());
//   const dataInBase3 = [];
//   while (mapData.length > 0) {
//     dataInBase3.push(mapData.splice(0, 3).join(""));
//   }
//   const dataInCharacters = dataInBase3.map((el) => {
//     return String.fromCharCode(parseInt(el, 3) + 96);
//   });
//   return dataInCharacters.join("");
// }
