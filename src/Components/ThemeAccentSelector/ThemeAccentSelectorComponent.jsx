import { useEffect, useState } from 'react';
import './ThemeAccentSelectorComponent.scss';

import {
  ACCENT_OPTIONS,
  getStoredAccent,
  saveAccent,
} from '../../Utils/accentTheme';

const ThemeAccentSelectorComponent = ({ authInfo, userDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState(() =>
    getStoredAccent(authInfo, userDetails),
  );

  useEffect(() => {
    setSelectedAccent(getStoredAccent(authInfo, userDetails));
  }, [authInfo, userDetails]);

  const selectedOption =
    ACCENT_OPTIONS.find(({ id }) => id === selectedAccent) || ACCENT_OPTIONS[0];

  const selectAccent = (accent) => {
    setSelectedAccent(saveAccent(accent, authInfo, userDetails));
  };

  return (
    <div
      className="theme-accent-selector"
      onKeyDown={(event) => {
        if (event.key === 'Escape') setIsOpen(false);
      }}
    >
      <button
        type="button"
        className="theme-accent-selector__trigger"
        aria-expanded={isOpen}
        aria-controls="accent-colour-options"
        onClick={() => setIsOpen((wasOpen) => !wasOpen)}
      >
        <span
          className="theme-accent-selector__current-swatch"
          aria-hidden="true"
          style={{ '--swatch-colour': selectedOption.colour }}
        />
        Accent: {selectedOption.label}
      </button>

      {isOpen && (
        <fieldset
          id="accent-colour-options"
          className="query-fieldset theme-accent-selector__panel"
        >
          <legend>Theme colour</legend>
          <div className="theme-accent-selector__options">
            {ACCENT_OPTIONS.map(({ id, label, colour }) => (
              <button
                key={id}
                type="button"
                className="theme-accent-selector__option"
                aria-pressed={selectedAccent === id}
                onClick={() => selectAccent(id)}
              >
                <span
                  className="theme-accent-selector__swatch"
                  aria-hidden="true"
                  style={{ '--swatch-colour': colour }}
                />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <p>
            Saves this account&apos;s accent and keeps it on public pages after
            logout.
          </p>
        </fieldset>
      )}
    </div>
  );
};

export default ThemeAccentSelectorComponent;
