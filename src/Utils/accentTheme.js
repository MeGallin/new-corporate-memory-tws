export const DEFAULT_ACCENT = 'orange';

export const ACCENT_OPTIONS = Object.freeze([
  { id: 'orange', label: 'Orange', colour: '#ff6200' },
  { id: 'yellow', label: 'Yellow', colour: '#f4c542' },
  { id: 'green', label: 'Green', colour: '#35b779' },
  { id: 'indian-red', label: 'Indian Red', colour: '#cd5c5c' },
]);

const validAccents = new Set(ACCENT_OPTIONS.map(({ id }) => id));
const storagePrefix = 'corporateMemory.accent';
const lastAccentStorageKey = `${storagePrefix}.lastUsed`;

const decodeTokenPayload = (token) => {
  try {
    const encodedPayload = token?.split('.')[1];
    if (!encodedPayload) return null;

    const base64 = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '=',
    );
    return JSON.parse(atob(paddedBase64));
  } catch {
    return null;
  }
};

export const getAccentUserKey = (authInfo, userDetails) => {
  const explicitId = userDetails?._id;
  if (explicitId) return String(explicitId);

  const tokenPayload = decodeTokenPayload(authInfo?.token);
  const tokenId = tokenPayload?.id || tokenPayload?.userId || tokenPayload?.sub;
  if (tokenId) return String(tokenId);

  return authInfo?.name ? `name:${authInfo.name}` : null;
};

const normaliseAccent = (accent) =>
  validAccents.has(accent) ? accent : DEFAULT_ACCENT;

export const getStoredAccent = (authInfo, userDetails) => {
  const userKey = getAccentUserKey(authInfo, userDetails);
  if (!userKey) return DEFAULT_ACCENT;

  try {
    return normaliseAccent(
      localStorage.getItem(`${storagePrefix}.${encodeURIComponent(userKey)}`),
    );
  } catch {
    return DEFAULT_ACCENT;
  }
};

export const getLastStoredAccent = () => {
  try {
    return normaliseAccent(localStorage.getItem(lastAccentStorageKey));
  } catch {
    return DEFAULT_ACCENT;
  }
};

export const applyAccent = (accent) => {
  const selectedAccent = normaliseAccent(accent);
  document.documentElement.dataset.accent = selectedAccent;
  return selectedAccent;
};

export const saveAccent = (accent, authInfo, userDetails) => {
  const selectedAccent = applyAccent(accent);
  const userKey = getAccentUserKey(authInfo, userDetails);

  try {
    localStorage.setItem(lastAccentStorageKey, selectedAccent);

    if (userKey) {
      localStorage.setItem(
        `${storagePrefix}.${encodeURIComponent(userKey)}`,
        selectedAccent,
      );
    }
  } catch {}

  return selectedAccent;
};
