import { describe, it, expect } from 'vitest';
import { getExtension, validateFileExtension, validateFile } from '@/utils/fileValidation';

// Minimal File-like stub (only the fields the validators read).
const f = (name: string, type = ''): File => ({ name, type }) as unknown as File;

describe('getExtension', () => {
  it('lower-cases the extension including the dot', () => {
    expect(getExtension('ARCHIVE.ZIP')).toBe('.zip');
  });

  it('returns the final extension on multi-dot names', () => {
    expect(getExtension('my.backup.zip')).toBe('.zip');
  });

  it('returns empty string when there is no extension', () => {
    expect(getExtension('noext')).toBe('');
  });
});

describe('validateFileExtension', () => {
  it('accepts .zip regardless of case', () => {
    expect(validateFileExtension('a.zip').valid).toBe(true);
    expect(validateFileExtension('a.ZIP').valid).toBe(true);
  });

  it('rejects a non-zip extension with a wrongType code', () => {
    const r = validateFileExtension('photo.png');
    expect(r.valid).toBe(false);
    expect(r.code).toBe('wrongType');
  });
});

describe('validateFile', () => {
  it('accepts a .zip file even with an empty MIME (corrupt/odd files must pass)', () => {
    expect(validateFile(f('broken.zip', '')).valid).toBe(true);
  });

  it('accepts a .zip file even with a generic octet-stream MIME', () => {
    expect(validateFile(f('data.zip', 'application/octet-stream')).valid).toBe(true);
  });

  it('accepts a zip MIME type even without a .zip extension', () => {
    expect(validateFile(f('download', 'application/zip')).valid).toBe(true);
  });

  it('rejects an image', () => {
    const r = validateFile(f('photo.png', 'image/png'));
    expect(r.valid).toBe(false);
    expect(r.code).toBe('wrongType');
  });
});
