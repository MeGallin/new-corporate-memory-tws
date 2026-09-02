import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutComponent from './About/AboutComponent';
import HomeComponent from './Home/HomeComponent';

describe('public workspaces', () => {
  test('presents the Home page as a structured corporate-memory workspace', () => {
    render(
      <MemoryRouter>
        <HomeComponent />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Corporate memory' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Why it matters' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Memory model' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute(
      'href',
      '/forms',
    );
  });

  test('organises the About page into product and platform fieldsets', () => {
    render(
      <MemoryRouter>
        <AboutComponent />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'About YCM' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'What YCM does' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'AI features' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Data protection' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute(
      'href',
      '/contact',
    );
  });
});
