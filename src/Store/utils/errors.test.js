import { describe, expect, it } from 'vitest';
import { getApiErrorMessage } from './errors';

describe('getApiErrorMessage', () => {
  it('uses the API error contract before generic status text', () => {
    expect(
      getApiErrorMessage({
        response: { status: 400, data: { error: 'Memory title is required' } },
      }),
    ).toBe('Memory title is required');
  });

  it('normalizes validation arrays and network failures', () => {
    expect(
      getApiErrorMessage({
        response: { status: 400, data: { error: ['Name is required', 'Email is invalid'] } },
      }),
    ).toBe('Name is required, Email is invalid');
    expect(getApiErrorMessage({ request: {} })).toBe(
      'Network error. Please check your connection.',
    );
  });
});
