import { demColor, repColor, blankColor } from "../constants/styles";

export default function getDistrictColor(party) {
  switch (party) {
    case 0:
      return blankColor;
    case 1:
      return demColor;
    case 2:
      return repColor;
    default:
      return "#000";
  }
}
