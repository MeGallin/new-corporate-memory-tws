import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ThemeAccentSelectorComponent from './ThemeAccentSelectorComponent';

describe('ThemeAccentSelectorComponent', () => {
  afterEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.accent;
  });

  it('reveals ten accent options and applies the selected colour', async () => {
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
    expect(screen.getAllByRole('button')).toHaveLength(11);
    expect(screen.getByRole('button', { name: 'Pink' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Purple' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Electric Blue' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Cyan' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Lime' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Coral' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Cyan' }));

    expect(document.documentElement.dataset.accent).toBe('cyan');
    expect(trigger).toHaveTextContent('Accent: Cyan');
    expect(trigger).toHaveFocus();
    expect(
      screen.queryByRole('group', { name: 'Theme colour' }),
    ).not.toBeInTheDocument();
  });

  it('closes the palette with Escape without changing the accent', async () => {
    const user = userEvent.setup();
    render(
      <ThemeAccentSelectorComponent
        authInfo={{ token: 'test-token' }}
        userDetails={{ _id: 'user-1' }}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Accent: Orange' });
    await user.click(trigger);
    await user.keyboard('{Escape}');

    expect(
      screen.queryByRole('group', { name: 'Theme colour' }),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent('Accent: Orange');
    expect(trigger).toHaveFocus();
    expect(localStorage).toHaveLength(0);
  });
});
