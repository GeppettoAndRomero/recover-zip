/**
 * RecoverManager — the tool's only non-frozen widget.
 *
 * Opens a (possibly damaged) .zip chosen from the picker or dropped anywhere on
 * the page (via the frozen GlobalDropZone's `filesDropped` CustomEvent<File[]>),
 * salvages the files inside with `recoverZip`, and lists each one with an OK or
 * "damaged" status plus a per-file download. Everything runs in the browser.
 *
 * The island receives `locale` as a prop (present during SSR) and reads all
 * strings from the i18n table, so SSR and client render identically.
 */

import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import { AppCard } from './AppCard';
import { AppButton } from './AppButton';
import { ui } from '@/i18n/ui';
import { validateFile } from '@/utils/fileValidation';
import {
  recoverZip,
  downloadEntry,
  type RecoverResult,
  type RecoveredEntry,
  type BrokenReason,
} from '@/utils/recoverEngine';

type ErrorCode = 'wrongType' | 'unreadable' | 'empty';

interface RecoverManagerProps {
  locale?: string;
}

function humanSize(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function RecoverManager({ locale = 'en' }: RecoverManagerProps) {
  const t = (ui as any)[locale] ?? ui.en;

  const [name, setName] = useState<string>('');
  const [result, setResult] = useState<RecoverResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null);
  const [errorName, setErrorName] = useState<string>('');
  const busyRef = useRef(false);

  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  const finish = useCallback(() => {
    window.dispatchEvent(new CustomEvent('filesProcessed'));
  }, []);

  const openZip = useCallback(async (file: File) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setErrorCode(null);
    setResult(null);
    setName(file.name);
    try {
      const buf = await file.arrayBuffer();
      if (buf.byteLength === 0) {
        setErrorName(file.name);
        setErrorCode('empty');
        return;
      }
      setResult(await recoverZip(buf));
    } catch {
      setErrorName(file.name);
      setErrorCode('unreadable');
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }, []);

  const handleFiles = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (file) {
        if (validateFile(file).valid) {
          void openZip(file);
        } else {
          setResult(null);
          setErrorName(file.name);
          setErrorCode('wrongType');
        }
      }
      finish();
    },
    [openZip, finish]
  );

  useEffect(() => {
    const handler = (e: Event) => handleFiles((e as CustomEvent<File[]>).detail ?? []);
    window.addEventListener('filesDropped', handler);
    return () => window.removeEventListener('filesDropped', handler);
  }, [handleFiles]);

  const onPick = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    handleFiles(Array.from(input.files ?? []));
    input.value = '';
  };

  const reset = () => {
    setResult(null);
    setName('');
    setErrorCode(null);
  };

  const errorText = (code: ErrorCode): string => {
    switch (code) {
      case 'wrongType':
        return t.errWrongType.replace('{name}', errorName);
      case 'unreadable':
        return t.errUnreadable.replace('{name}', errorName);
      case 'empty':
        return t.errEmpty.replace('{name}', errorName);
    }
  };

  const reasonText = (reason?: BrokenReason): string => {
    switch (reason) {
      case 'crc':
        return t.reasonCrc;
      case 'truncated':
        return t.reasonTruncated;
      case 'inflate':
        return t.reasonInflate;
      case 'unsupported':
        return t.reasonUnsupported;
      case 'encrypted':
        return t.reasonEncrypted;
      case 'empty':
        return t.reasonEmpty;
      default:
        return t.reasonInflate;
    }
  };

  const fileEntries = result?.entries.filter((e) => !e.directory) ?? [];
  const nothingRecoverable = result !== null && fileEntries.length === 0;

  const doDownload = (entry: RecoveredEntry) => {
    try {
      downloadEntry(entry);
    } catch {
      // Nothing to download for this entry; the button is already disabled when
      // there are no bytes, so this is a defensive no-op.
    }
  };

  return (
    <div>
      <AppCard>
        <div style="margin-bottom: var(--space-4);">
          <h2 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
            {t.uploadHeading}
          </h2>
          <p style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">
            {t.uploadSubtitle}
          </p>
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-label={t.dropClick}
          style={{
            padding: 'var(--space-6)',
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface)',
            textAlign: 'center',
            marginBottom: 'var(--space-4)',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('file-input')?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              document.getElementById('file-input')?.click();
            }
          }}
        >
          <div style="font-size: 3rem; margin-bottom: var(--space-2);" aria-hidden="true">
            🛟
          </div>
          <div style="font-size: var(--fs-3); font-weight: 600; margin-bottom: var(--space-2);">
            {t.dropClick}
          </div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle);">{t.dropOr}</div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle); margin-top: var(--space-1);">
            {t.dropSupported}
          </div>
          <input
            id="file-input"
            type="file"
            accept=".zip,application/zip,application/x-zip-compressed"
            onChange={onPick}
            style="display: none;"
          />
        </div>

        {busy && (
          <p style="color: var(--color-subtle); margin: 0;" data-testid="busy">
            {t.reading}
          </p>
        )}
      </AppCard>

      {errorCode && (
        <div
          role="alert"
          data-testid="error"
          style="margin-top: var(--space-4); padding: var(--space-3) var(--space-4); border: 1px solid var(--color-danger); border-radius: var(--radius-sm); color: var(--color-danger); font-size: var(--fs-2);"
        >
          <span aria-hidden="true">⚠</span>{' '}
          <span data-testid="error-message">{errorText(errorCode)}</span>
        </div>
      )}

      {result && (
        <AppCard className="mt-6">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-2);">
            <div>
              <strong data-testid="file-name" title={name}>
                {name}
              </strong>
              <div
                data-testid="summary"
                style="font-size: var(--fs-2); color: var(--color-subtle); margin-top: var(--space-1);"
              >
                {t.summaryRecovered
                  .replace('{recovered}', String(result.recovered))
                  .replace('{total}', String(result.total))}
              </div>
            </div>
            <AppButton variant="secondary" onClick={reset}>
              {t.loadAnother}
            </AppButton>
          </div>

          <p
            data-testid="source"
            data-source={result.source}
            style="font-size: var(--fs-1); color: var(--color-subtle); margin: 0 0 var(--space-4) 0;"
          >
            {result.source === 'scan' ? t.sourceScan : t.sourceCentral}
          </p>

          {nothingRecoverable ? (
            <p data-testid="empty" style="color: var(--color-subtle);">
              {t.nothingRecoverable}
            </p>
          ) : (
            <div data-testid="entry-list" style="display: flex; flex-direction: column; gap: 2px;">
              {fileEntries.map((entry, i) => {
                const broken = entry.status === 'broken';
                const hasBytes = entry.bytes !== null && entry.size > 0;
                return (
                  <div
                    key={i}
                    data-testid="entry"
                    data-status={entry.status}
                    style="display: flex; justify-content: space-between; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-3); background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-xs); font-size: var(--fs-2);"
                  >
                    <div style="flex: 1; min-width: 0;">
                      <span
                        title={entry.name}
                        style="display: block; overflow-wrap: anywhere; word-break: break-word;"
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            fontWeight: 700,
                            color: broken ? 'var(--color-warning)' : 'var(--color-success)',
                          }}
                        >
                          {broken ? '⚠ ' : '✓ '}
                        </span>
                        {entry.name}
                      </span>
                      <span
                        data-testid="entry-status"
                        style="font-size: var(--fs-1); color: var(--color-text-muted);"
                      >
                        {broken ? t.statusBroken : t.statusOk}
                        {broken ? ` — ${reasonText(entry.reason)}` : ''}
                        {entry.size > 0 ? ` · ${humanSize(entry.size)}` : ''}
                      </span>
                    </div>
                    <AppButton
                      variant={broken ? 'secondary' : 'primary'}
                      onClick={() => doDownload(entry)}
                      disabled={!hasBytes}
                    >
                      {broken ? t.downloadPartial : t.download}
                    </AppButton>
                  </div>
                );
              })}
            </div>
          )}
        </AppCard>
      )}
    </div>
  );
}
