import { beforeEach, describe, expect, it } from 'vitest';
import {
  BackupStorageError,
  BackupValidationError,
  parseLocalStorageBackup,
  readLocalStorageBackup,
  replaceLocalStorage
} from './localStorageBackup';

describe('localStorage backups', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('parses string-valued JSON objects, including special keys', () => {
    const backup = parseLocalStorageBackup('{"campaign-state":"{}","__proto__":"safe","unicode":"café"}');

    expect(backup['campaign-state']).toBe('{}');
    expect(Object.hasOwn(backup, '__proto__')).toBe(true);
    expect(backup.__proto__).toBe('safe');
    expect(backup.unicode).toBe('café');
  });

  it.each([
    ['malformed JSON', '{'],
    ['a non-object value', 'null'],
    ['an array', '[]'],
    ['a non-string value', '{"save":false}']
  ])('rejects %s', (_description, content) => {
    expect(() => parseLocalStorageBackup(content)).toThrow(BackupValidationError);
  });

  it('reads and replaces the complete localStorage contents', () => {
    localStorage.setItem('old-key', 'old-value');
    const backup = parseLocalStorageBackup('{"new-key":"new-value"}');

    replaceLocalStorage(localStorage, backup);

    expect(readLocalStorageBackup(localStorage)).toEqual({ 'new-key': 'new-value' });
  });

  it('restores the previous contents if replacement fails', () => {
    const data = new Map([['existing-key', 'existing-value']]);
    const storage: Storage = {
      get length() {
        return data.size;
      },
      clear: () => data.clear(),
      getItem: (key) => data.get(key) ?? null,
      key: (index) => [...data.keys()][index] ?? null,
      removeItem: (key) => data.delete(key),
      setItem: (key, value) => {
        if (key === 'failing-key') throw new Error('Storage write failed');
        data.set(key, value);
      }
    };

    expect(() => replaceLocalStorage(
      storage,
      parseLocalStorageBackup('{"partial-key":"partial","failing-key":"failure"}')
    )).toThrow(new BackupStorageError('replaceFailed'));
    expect(readLocalStorageBackup(storage)).toEqual({ 'existing-key': 'existing-value' });
  });
});
