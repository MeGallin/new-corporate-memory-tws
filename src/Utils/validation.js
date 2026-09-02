import { emailRegEx, nameRegEx, passwordRegEx } from './regEx';

export const PASSWORD_REQUIREMENT =
  'Use 6 to 72 characters with uppercase, lowercase, a number, and a special character.';

export const IMAGE_ACCEPT = '.jpg,.jpeg,.png,image/jpeg,image/png';
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export const isValidName = (value = '') => nameRegEx.test(value.trim());
export const isValidEmail = (value = '') => emailRegEx.test(value.trim());
export const isValidNewPassword = (value = '') => passwordRegEx.test(value);
export const isValidLoginPassword = (value = '') => value.length >= 6;
export const isValidMemoryTitle = (value = '') => value.trim().length > 0;
export const isValidMemoryNote = (value = '') => value.trim().length >= 5;
export const isValidPriority = (value) => {
  const priority = Number(value);
  return Number.isInteger(priority) && priority >= 1 && priority <= 5;
};

export const getImageFileError = (file) => {
  if (!file) return 'Select an image to continue.';
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    return 'Choose a JPG or PNG image.';
  }
  if (file.size > IMAGE_MAX_BYTES) {
    return 'Choose an image no larger than 5 MB.';
  }
  return null;
};
