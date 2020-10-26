import getStateColor from "./getStateColor";

export default function handleStateColor(geo, stateData) {
  if (geo.id == 31) {
    return "url(#nebraska-style)";
  } else if (geo.id == 23) {
    return "url(#maine-style)";
  } else {
    const { party } = stateData.find((s) => s.val === geo.id);
    return getStateColor(party);
  }
}
