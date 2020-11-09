import { getDistrictColor } from "../../utils";

// Component to handle rendering of Nebraska and Maine states as they have state and district votes which could lead to a mix of parties. Linear gradients used to show this potential mix

export default function SVGDefs({ stateData }) {
  const NE1 = getDistrictColor(stateData[51].party);
  const NE2 = getDistrictColor(stateData[52].party);
  const NE3 = getDistrictColor(stateData[53].party);
  const NE = getDistrictColor(stateData[27].party);
  const ME1 = getDistrictColor(stateData[54].party);
  const ME2 = getDistrictColor(stateData[55].party);
  const ME = getDistrictColor(stateData[19].party);

  return (
    <defs>
      <linearGradient id="Gradient-1" x1="10%" y1="4%" x2="2%" y2="1%">
        <stop offset="0%" stopColor={NE1} />
        <stop offset="25%" stopColor={NE2} />
        <stop offset="50%" stopColor={NE3} />
        <stop offset="75%" stopColor={NE} />
      </linearGradient>

      <linearGradient id="Gradient-2" x1="10%" y1="4%" x2="2%" y2="1%">
        <stop offset="0%" stopColor={ME1} />
        <stop offset="33%" stopColor={ME2} />
        <stop offset="66%" stopColor={ME} />
      </linearGradient>

      <linearGradient
        data-testid="nebraska-gradient"
        id="nebraska-style"
        href="#Gradient-1"
        spreadMethod="repeat"
      />
      <linearGradient
        id="maine-style"
        href="#Gradient-2"
        spreadMethod="repeat"
      />
    </defs>
  );
}
