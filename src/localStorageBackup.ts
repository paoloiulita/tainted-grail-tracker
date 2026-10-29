export type LocalStorageBackup = Record<string, string>;

type ValidationErrorCode = 'invalidJson' | 'invalidFormat';
type StorageErrorCode = 'readFailed' | 'replaceFailed' | 'rollbackFailed';

export class BackupValidationError extends Error {
  constructor(readonly code: ValidationErrorCode) {
    super(code);
  }
}

export class BackupStorageError extends Error {
  constructor(readonly code: StorageErrorCode) {
    super(code);
  }
}

export const parseLocalStorageBackup = (content: string): LocalStorageBackup => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(content);
  } catch {
    throw new BackupValidationError('invalidJson');
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new BackupValidationError('invalidFormat');
  }

  const backup = Object.create(null) as LocalStorageBackup;
  for (const [key, value] of Object.entries(parsed)) {
    if (typeof value !== 'string') {
      throw new BackupValidationError('invalidFormat');
    }

    Object.defineProperty(backup, key, {
      configurable: true,
      enumerable: true,
      value,
      writable: true
    });
  }

  return backup;
};

export const readLocalStorageBackup = (storage: Storage): LocalStorageBackup => {
  const backup = Object.create(null) as LocalStorageBackup;

  try {
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (key === null) {
        throw new BackupStorageError('readFailed');
      }

      const value = storage.getItem(key);
      if (value === null) {
        throw new BackupStorageError('readFailed');
      }

      Object.defineProperty(backup, key, {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      });
    }
  } catch {
    throw new BackupStorageError('readFailed');
  }

  return backup;
};

export const replaceLocalStorage = (storage: Storage, backup: LocalStorageBackup): void => {
  const previous = readLocalStorageBackup(storage);

  try {
    storage.clear();
    Object.entries(backup).forEach(([key, value]) => storage.setItem(key, value));
  } catch {
    try {
      storage.clear();
      Object.entries(previous).forEach(([key, value]) => storage.setItem(key, value));
    } catch {
      throw new BackupStorageError('rollbackFailed');
    }

    throw new BackupStorageError('replaceFailed');
  }
};
