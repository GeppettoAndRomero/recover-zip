# recover-zip

Salvage the files still readable inside a broken or corrupted `.zip`, entirely in
your browser. The archive is read on your device and never uploaded. Open source,
works offline (PWA).

Part of [runlocally](https://runlocally.app) — small tools that run locally on your device.

## How it works

It works in two layers:

1. **Normal path.** The central directory (the archive's index) is read with
   [@zip.js/zip.js](https://github.com/gildas-lormeau/zip.js) and every entry is
   listed and decoded. Entries that decode cleanly are OK; entries that fail (bad
   CRC, truncated, unsupported, encrypted) are marked **damaged** but still offered
   for download with whatever bytes were salvaged.
2. **Recovery path.** When the central directory itself is unreadable, the raw
   bytes are scanned for local file headers (`PK\x03\x04`) and the entry list is
   rebuilt from them, inflating DEFLATE with the browser-native
   `DecompressionStream('deflate-raw')` and storing STORED entries as-is.

The whole pipeline runs client-side — there is no server component, so your files
have no path off your device.

This is **salvage**, not a guaranteed repair: it recovers what a ZIP still holds in
a readable form. It does not rebuild a broken archive, and it cannot bring back
bytes that are physically gone.

## Features

- List the files inside a damaged `.zip` and download each individually
- Damaged entries are clearly flagged, and still downloadable (partial bytes kept)
- Local-header scan recovers files even when the central directory is unreadable
- Works offline (PWA), installable

## Develop

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build to dist/
```

Stack: Astro + Preact + TypeScript. Recovery uses `@zip.js/zip.js` plus the native
`DecompressionStream` — no extra WebAssembly.

## Browser support

Works in current Chrome, Edge, Firefox and Safari. The recovery path relies on the
native `DecompressionStream('deflate-raw')`, available in current browsers.

## License

[MIT](./LICENSE). Built and maintained by Geppetto. Some code is written with AI
assistance; all review and decisions are the maintainer's.
