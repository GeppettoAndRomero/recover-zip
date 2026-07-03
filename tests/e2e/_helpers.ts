import { type Page } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const b64 = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url))).toString('base64');

/** Healthy archive: 3 files, all recoverable via the central directory. */
export const GOOD_ZIP_B64 = b64('../fixtures/good.zip');
/** Central directory cut off: forces the local-header scan recovery path. */
export const BAD_CENTRAL_ZIP_B64 = b64('../fixtures/bad-central.zip');
/** One STORED entry with a flipped byte: broken (bad CRC) but fully downloadable. */
export const CRC_BROKEN_ZIP_B64 = b64('../fixtures/crc-broken.zip');

/** Wait until the island has hydrated and is ready to receive files. */
export async function waitReady(page: Page) {
  await page.waitForFunction(() => (window as Record<string, unknown>).__toolReady === true);
}

/** Feed a base64 archive through the same drop-zone path the UI uses. */
export async function dropZip(page: Page, opts: { b64: string; name: string }) {
  await page.evaluate(({ b64: data, name }) => {
    const bin = atob(data);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const file = new File([bytes], name, { type: 'application/zip' });
    window.dispatchEvent(new CustomEvent('filesDropped', { detail: [file] }));
  }, opts);
}

/**
 * The frozen covenant/i18n specs call this: open a healthy archive and wait for
 * the recovery result to appear. Exercises the full read → decode → list path.
 */
export async function convert(page: Page) {
  await dropZip(page, { b64: GOOD_ZIP_B64, name: 'good.zip' });
  await page.getByTestId('summary').waitFor();
}
