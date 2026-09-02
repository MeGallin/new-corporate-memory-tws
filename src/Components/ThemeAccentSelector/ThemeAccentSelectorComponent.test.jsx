import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ThemeAccentSelectorComponent from './ThemeAccentSelectorComponent';

describe('ThemeAccentSelectorComponent', () => {
  afterEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.accent;
  });

  it('reveals four accent options and applies the selected colour', async () => {
    const user = userEvent.setup();
    render(
      <ThemeAccentSelectorComponent
        authInfo={{ token: 'test-token' }}
        userDetails={{ _id: 'user-1' }}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Accent: Orange' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    expect(screen.getByRole('group', { name: 'Theme colour' })).toBeVisible();
    expect(screen.getAllByRole('button')).toHaveLength(5);

    await user.click(screen.getByRole('button', { name: 'Green' }));

    expect(document.documentElement.dataset.accent).toBe('green');
    expect(screen.getByRole('button', { name: 'Green' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(trigger).toHaveTextContent('Accent: Green');

    await user.keyboard('{Escape}');
    expect(
      screen.queryByRole('group', { name: 'Theme colour' }),
    ).not.toBeInTheDocument();
  });
});
