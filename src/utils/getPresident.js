export default function getPresident(year = "Predictor", party) {
  if (party > 2 || party < 1) return "";
  if (year === 2020) {
    return party === 1 ? "Biden" : "Trump";
  } else if (year === 2016) {
    return party === 1 ? "Clinton" : "Trump";
  } else if (year === 2012) {
    return party === 1 ? "Obama" : "Romney";
  } else if (year === 2008) {
    return party === 1 ? "Obama" : "McCain";
  } else if (year === 2004) {
    return party === 1 ? "Kerry" : "Bush";
  } else if (year === 2000) {
    return party === 1 ? "Gore" : "Bush";
  } else {
    return party === 1 ? "Democrats" : "Republicans";
  }
}
