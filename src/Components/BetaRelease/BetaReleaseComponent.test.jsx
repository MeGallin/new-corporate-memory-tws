import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import BetaReleaseComponent from './BetaReleaseComponent';

describe('BetaReleaseComponent', () => {
  it('renders the persistent corner-ribbon hook', () => {
    render(<BetaReleaseComponent />);

    expect(screen.getByLabelText('Beta release')).toHaveClass(
      'beta-release-badge',
    );
  });
});
