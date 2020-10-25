export function handleStateColor(geo, stateData) {
  const { party } = stateData.find((s) => s.val === geo.id);
  if (geo.id == 31) {
    return "url(#nebraska-style)";
  }
  if (geo.id == 23) {
    return "url(#maine-style)";
  }
  if (party === 0) return "#888";
  if (party === 1) return "#00f";
  if (party === 2) return "#f00";

  return "#000";
}

export function handleDistrictColor(district) {
  console.log(district);
  if (district.party === 0) return "#888";
  if (district.party === 1) return "blue";
  if (district.party === 2) return "red";
  console.log("here");
  return "#000";
}
