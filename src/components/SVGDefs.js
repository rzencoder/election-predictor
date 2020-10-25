import { handleDistrictColor } from "../utils/handleStateColor";

export default function SVGDefs({ stateData }) {
  const NE1 = handleDistrictColor(stateData[51]);
  const NE2 = handleDistrictColor(stateData[52]);
  const NE3 = handleDistrictColor(stateData[53]);
  const NE = handleDistrictColor(stateData[27]);
  const ME1 = handleDistrictColor(stateData[54]);
  const ME2 = handleDistrictColor(stateData[55]);
  const ME = handleDistrictColor(stateData[19]);

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
