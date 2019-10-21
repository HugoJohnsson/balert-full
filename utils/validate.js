export const validateEmail = (string) => {
  if (string.length === 0) return false;
  return true;
}

export const validatePassword = (string) => {
  if (string.length === 0) return false;
  return true;
}

export const validatePasswords = (password1, password2) => {
  if (password1.length === 0 || password2.length === 0) return false;
  return password1 === password2;
}
