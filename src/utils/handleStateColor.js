import getStateColor from "./getStateColor";

export default function handleStateColor(geo, stateData) {
  // Special cases where states can be shared between parties
  if (geo.id === "31") {
    return "nebraska-state";
  } else if (geo.id === "23") {
    return "maine-state";
  } else {
    // Find state to match svg state
    const { party } = stateData.find((s) => s.val === geo.id);
    return getStateColor(party);
  }
}
