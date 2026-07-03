import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import {
  waitReady,
  dropZip,
  GOOD_ZIP_B64,
  BAD_CENTRAL_ZIP_B64,
  CRC_BROKEN_ZIP_B64,
} from './_helpers';

/**
 * Records every request that leaves the local origin. The no-upload covenant:
 * recovering a file must trigger ZERO cross-origin requests.
 */
function trackExternal(page: Page): string[] {
  const external: string[] = [];
  page.on('request', (req) => {
    const url = req.url();
    if (
      !url.startsWith('http://localhost:4321') &&
      !url.startsWith('data:') &&
      !url.startsWith('blob:')
    ) {
      external.push(url);
    }
  });
  return external;
}

/** The row (entry testid) whose visible name contains `name`. */
const entryRow = (page: Page, name: string) =>
  page.getByTestId('entry').filter({ hasText: name });

test.describe('recover-zip', () => {
  test('lists and downloads files from a healthy archive, with no upload', async ({ page }) => {
    const external = trackExternal(page);
    await page.goto('/recover-zip/');
    await waitReady(page);
    await dropZip(page, { b64: GOOD_ZIP_B64, name: 'good.zip' });

    await expect(page.getByTestId('summary')).toContainText('3');
    await expect(page.getByTestId('source')).toHaveAttribute('data-source', 'central');

    // Three file entries, all OK.
    await expect(page.getByTestId('entry')).toHaveCount(3);
    for (const status of await page.getByTestId('entry').evaluateAll((els) =>
      els.map((e) => e.getAttribute('data-status'))
    )) {
      expect(status).toBe('ok');
    }

    // Download one entry and verify the bytes came through intact.
    const downloadPromise = page.waitForEvent('download');
    await entryRow(page, 'data.csv').getByRole('button').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('data.csv');
    const buf = readFileSync((await download.path()) as string, 'utf8');
    expect(buf).toContain('Ada,London');

    expect(external, `unexpected cross-origin requests: ${external.join(', ')}`).toHaveLength(0);
  });

  test('flags a damaged entry but still lets you download it', async ({ page }) => {
    await page.goto('/recover-zip/');
    await waitReady(page);
    await dropZip(page, { b64: CRC_BROKEN_ZIP_B64, name: 'crc-broken.zip' });

    await expect(page.getByTestId('summary')).toContainText('2');

    const broken = entryRow(page, 'broken.txt');
    await expect(broken).toHaveAttribute('data-status', 'broken');
    // The intact entries are OK.
    await expect(entryRow(page, 'intact.txt')).toHaveAttribute('data-status', 'ok');

    // The damaged entry is still downloadable (its stored bytes were salvaged).
    const btn = broken.getByRole('button');
    await expect(btn).toBeEnabled();
    const downloadPromise = page.waitForEvent('download');
    await btn.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('broken.txt');
    const buf = readFileSync((await download.path()) as string);
    expect(buf.length).toBeGreaterThan(0);
  });

  test('salvages files by scanning when the central directory is unreadable', async ({ page }) => {
    const external = trackExternal(page);
    await page.goto('/recover-zip/');
    await waitReady(page);
    await dropZip(page, { b64: BAD_CENTRAL_ZIP_B64, name: 'bad-central.zip' });

    await expect(page.getByTestId('summary')).toBeVisible();
    // The index was damaged, so recovery fell back to the local-header scan.
    await expect(page.getByTestId('source')).toHaveAttribute('data-source', 'scan');
    await expect(page.getByTestId('entry').first()).toBeVisible();

    // A scanned entry still downloads.
    const downloadPromise = page.waitForEvent('download');
    await entryRow(page, 'hello.txt').getByRole('button').first().click();
    await downloadPromise;

    expect(external, `unexpected cross-origin requests: ${external.join(', ')}`).toHaveLength(0);
  });

  test('shows a localized error for a non-zip file', async ({ page }) => {
    await page.goto('/recover-zip/');
    await waitReady(page);
    await page.evaluate(() => {
      const file = new File([new Uint8Array([1, 2, 3])], 'photo.png', { type: 'image/png' });
      window.dispatchEvent(new CustomEvent('filesDropped', { detail: [file] }));
    });

    const err = page.getByTestId('error');
    await expect(err).toBeVisible();
    await expect(err).toContainText('photo.png');
    await expect(page.getByTestId('entry')).toHaveCount(0);
  });

  test('handles an archive with nothing recoverable gracefully', async ({ page }) => {
    await page.goto('/recover-zip/');
    await waitReady(page);
    await dropZip(page, {
      b64: btoa('this is not a real zip, there are no file headers in here at all'),
      name: 'junk.zip',
    });

    await expect(page.getByTestId('empty')).toBeVisible();
    await expect(page.getByTestId('entry')).toHaveCount(0);
  });

  test('the loaded result has no serious or critical axe violations', async ({ page }) => {
    test.skip(test.info().project.name !== 'chromium', 'axe runs on one engine');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/recover-zip/');
    await waitReady(page);
    await dropZip(page, { b64: GOOD_ZIP_B64, name: 'good.zip' });
    await page.getByTestId('summary').waitFor();

    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const blocking = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(blocking.map((v) => `${v.id} (${v.impact})`)).toEqual([]);
  });
});
