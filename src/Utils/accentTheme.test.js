import { afterEach, describe, expect, it } from 'vitest';

import {
  DEFAULT_ACCENT,
  applyAccent,
  getAccentUserKey,
  getLastStoredAccent,
  getStoredAccent,
  saveAccent,
} from './accentTheme';

const createToken = (payload) =>
  `header.${btoa(JSON.stringify(payload)).replace(/=/g, '')}.signature`;

describe('accent theme preferences', () => {
  afterEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.accent;
  });

  it('uses the signed-in account id from details or the token', () => {
    const authInfo = { token: createToken({ id: 'token-user' }) };

    expect(getAccentUserKey(authInfo)).toBe('token-user');
    expect(getAccentUserKey(authInfo, { _id: 'details-user' })).toBe(
      'details-user',
    );
  });

  it('stores valid choices per account and for signed-out pages', () => {
    const firstUser = { _id: 'first-user' };
    const secondUser = { _id: 'second-user' };

    expect(saveAccent('green', null, firstUser)).toBe('green');
    expect(document.documentElement.dataset.accent).toBe('green');
    expect(getStoredAccent(null, firstUser)).toBe('green');
    expect(getStoredAccent(null, secondUser)).toBe(DEFAULT_ACCENT);
    expect(getLastStoredAccent()).toBe('green');
  });

  it('rejects unknown stored and requested colours', () => {
    localStorage.setItem('corporateMemory.accent.lastUsed', 'purple');

    expect(getLastStoredAccent()).toBe(DEFAULT_ACCENT);
    expect(applyAccent('purple')).toBe(DEFAULT_ACCENT);
    expect(document.documentElement.dataset.accent).toBe(DEFAULT_ACCENT);
  });
});
