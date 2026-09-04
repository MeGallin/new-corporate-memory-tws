import { useEffect, useRef, useState } from 'react';
import './ThemeAccentSelectorComponent.scss';

import {
  ACCENT_OPTIONS,
  getStoredAccent,
  saveAccent,
} from '../../Utils/accentTheme';

const ThemeAccentSelectorComponent = ({ authInfo, userDetails }) => {
  const triggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState(() =>
    getStoredAccent(authInfo, userDetails),
  );

  useEffect(() => {
    setSelectedAccent(getStoredAccent(authInfo, userDetails));
  }, [authInfo, userDetails]);

  const selectedOption =
    ACCENT_OPTIONS.find(({ id }) => id === selectedAccent) || ACCENT_OPTIONS[0];

  const closePalette = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const selectAccent = (accent) => {
    setSelectedAccent(saveAccent(accent, authInfo, userDetails));
    closePalette();
  };

  return (
    <div
      className="theme-accent-selector"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closePalette();
        }
      }}
    >
      <button
        ref={triggerRef}
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
                aria-label={label}
                aria-pressed={selectedAccent === id}
                title={label}
                onClick={() => selectAccent(id)}
              >
                <span
                  className="theme-accent-selector__swatch"
                  aria-hidden="true"
                  style={{ '--swatch-colour': colour }}
                />
              </button>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default ThemeAccentSelectorComponent;
