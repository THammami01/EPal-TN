export const checkEmail = (email) => {
  // must include only one "@"
  if (email.includes("@") && email.split("@").length === 2) {
    // get the email's 2 parts (separated by "@")
    const [p1, p2] = email.split("@");

    // 1st part's length > 0 and 2nd part must include at least one "."
    if (p1.length && p2.includes(".") && p2.split(".").length >= 2) {
      // each part (separated by ".") of the 2nd part must not be empty
      for (let s in p2.split(".")) if (s.length === 0) return false;

      // if all checks pass, return true
      return true;
    }
  }

  // this point is reached only if the checks fail
  return false;
};

export const checkPassword = (password) => {
  if (password.length < 6) return false;
  return true;
};
