export function ancestryToString(ancestry: string | undefined) {
  const ancestryLower = !!ancestry ? ancestry.toLowerCase() : "";
  switch (ancestryLower) {
    case "c":
      return "Cox";

    case "s":
      return "Stuth";

    default:
      return "n/a";
  }
}

export function genderToString(gender: string | undefined) {
  const genderLower = !!gender ? gender.toLowerCase() : "";
  switch (genderLower) {
    case "m":
      return "Male";
    case "f":
      return "Female";
    default:
      return "n/a";
  }
}
