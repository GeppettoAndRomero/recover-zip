/**
 * File-type validation for recover-zip.
 *
 * The input is a .zip. Validation is deliberately lenient: a *damaged* archive
 * is exactly what this tool exists to open, so a file is accepted whenever it
 * looks like a ZIP by extension or MIME — we never reject it for being corrupt,
 * truncated, or having an odd/empty MIME type. Only clearly-wrong inputs (e.g.
 * an image or a text file with no zip signal) are rejected.
 *
 * Validation returns a stable machine `code` (not a message) so the UI can
 * render the localized string for the current locale.
 */

export type ValidationCode = 'wrongType';

export interface ValidationResult {
  valid: boolean;
  code?: ValidationCode;
}

export const ALLOWED_EXTENSIONS = ['.zip'] as const;

// MIME types browsers commonly report for ZIP archives. Often empty or generic
// (application/octet-stream) — so the extension is authoritative and a non-empty
// MIME only helps when the extension is missing.
const ALLOWED_MIME_TYPES = [
  'application/zip',
  'application/x-zip-compressed',
  'application/x-zip',
  'multipart/x-zip',
];

/** Lower-cased extension including the dot, or '' when the name has none. */
export function getExtension(fileName: string): string {
  const dot = fileName.lastIndexOf('.');
  return dot >= 0 ? fileName.slice(dot).toLowerCase() : '';
}

export function validateFileExtension(fileName: string): ValidationResult {
  const ext = getExtension(fileName);
  return (ALLOWED_EXTENSIONS as readonly string[]).includes(ext)
    ? { valid: true }
    : { valid: false, code: 'wrongType' };
}

/**
 * Accept a file when it is named `.zip`, or (when the extension is missing/odd)
 * when the browser reported a ZIP MIME type. A corrupt `.zip` is still accepted:
 * recovering it is the whole point.
 */
export function validateFile(file: File): ValidationResult {
  if (validateFileExtension(file.name).valid) {
    return { valid: true };
  }
  if (file.type && ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return { valid: true };
  }
  return { valid: false, code: 'wrongType' };
}
