import { describe, expect, it } from 'vitest';

import {
  getImageFileError,
  isValidEmail,
  isValidLoginPassword,
  isValidMemoryNote,
  isValidMemoryTitle,
  isValidName,
  isValidNewPassword,
  isValidPriority,
} from './validation';

describe('shared form validation', () => {
  it('validates account fields consistently', () => {
    expect(isValidName('Admin Guy')).toBe(true);
    expect(isValidName('Admin')).toBe(false);
    expect(isValidEmail('admin@example.com')).toBe(true);
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidLoginPassword('legacy')).toBe(true);
    expect(isValidNewPassword('Secure1!')).toBe(true);
    expect(isValidNewPassword('password')).toBe(false);
  });

  it('rejects whitespace memories and invalid priorities', () => {
    expect(isValidMemoryTitle('   ')).toBe(false);
    expect(isValidMemoryNote('  no ')).toBe(false);
    expect(isValidMemoryNote(' useful ')).toBe(true);
    expect(isValidPriority(1)).toBe(true);
    expect(isValidPriority('5')).toBe(true);
    expect(isValidPriority(6)).toBe(false);
  });

  it('accepts only JPG or PNG images up to 5 MB', () => {
    expect(getImageFileError({ type: 'image/jpeg', size: 1024 })).toBeNull();
    expect(getImageFileError({ type: 'image/gif', size: 1024 })).toBe(
      'Choose a JPG or PNG image.',
    );
    expect(
      getImageFileError({ type: 'image/png', size: 5 * 1024 * 1024 + 1 }),
    ).toBe('Choose an image no larger than 5 MB.');
  });
});
