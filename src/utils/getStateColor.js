export default function getStateColor(party) {
  switch (party) {
    case 0:
      return "blank-state";
    case 1:
      return "dem-state";
    case 2:
      return "rep-state";
    default:
      return "";
  }
}
