import type { ToolContent } from './types';

// recover-zip. English source content.

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Recover files from a corrupted ZIP — in your browser | runlocally',
    description:
      'Open a broken or corrupted .zip and salvage the files still readable inside it. Lists every entry, flags the damaged ones, and lets you download each — in your browser. Nothing is uploaded. Open source, works offline.',
    ogTitle: 'Recover files from a corrupted ZIP — in your browser',
    ogDescription:
      'Salvage readable files from a damaged .zip: list the entries, flag the broken ones, download each. Runs in your browser, nothing uploaded. Open source.',
  },

  hero: {
    h1: 'Recover ZIP',
    tagline:
      'Salvage the files still readable inside a broken or corrupted .zip — in your browser. Nothing is uploaded.',
  },

  intro: {
    h2: 'Recover files from a corrupted ZIP',
    paras: [
      'When a .zip is damaged — a truncated download, a bad sector, a byte flipped in transfer — a normal unzip tool often refuses to open it at all, even though most of the files inside are still intact. This tool takes a different approach: it reads what it can, lists every file it finds, and lets you download each one, so a broken archive is not a total loss.',
      'It works in two passes. First it reads the archive index (the central directory) the normal way and decodes each entry. If that index is itself damaged, it falls back to scanning the raw bytes for the local file headers that sit in front of every stored file, and rebuilds the list from those — the technique dedicated "zip repair" tools use to recover data from a corrupt archive.',
      'Be clear about what this is: it salvages the files a ZIP still holds in a readable form. It is not a magic repair that rebuilds a broken archive, and it cannot bring back bytes that are physically gone. Files that fail their checksum or are cut short are marked as damaged — but still offered for download, so you keep whatever was recoverable.',
    ],
  },

  privacy: {
    h2: 'Why your archive stays on your device',
    lead: 'Privacy here is structural, not a promise. There is no upload step because there is no server to upload to:',
    points: [
      'The archive is read and recovered entirely in your browser.',
      'The page is served as static files and makes no request with your data.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: "A damaged archive can hold private files; here they never leave your device. If you want to check, open your browser's Network panel while recovering — no request carries your file.",
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Open the broken .zip',
        p: 'Click to select the damaged .zip, or drop it anywhere on the page. A corrupt archive is accepted — recovering it is the point. It is read on your device, not uploaded.',
      },
      {
        h3: 'Review the file list',
        p: 'Each file is listed with an OK or “damaged” status. Damaged entries show why — a checksum mismatch, cut short, or unsupported — so you know what you are getting.',
      },
      {
        h3: 'Download what you need',
        p: 'Download any file individually. Damaged files are still downloadable with whatever bytes were salvaged, which is often most of the content.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Can this really repair a corrupted ZIP?',
      a: 'It recovers the files inside a corrupted ZIP, which is what most people mean by “repair”. It does not rebuild the broken archive into a fixed .zip; instead it reads out the individual files that are still readable and lets you download them. If a file’s data is physically missing or overwritten, no tool can bring those exact bytes back — this one recovers everything that is still there.',
    },
    {
      q: 'How does it recover files when a ZIP won’t open?',
      a: 'A ZIP keeps an index of its contents (the central directory) at the very end of the file. If that index is damaged or was cut off, ordinary tools can’t list anything. This tool then scans the raw bytes for the local file header that precedes each stored file (the PK\\x03\\x04 marker) and rebuilds the list directly from those, decompressing each with the browser’s built-in decoder.',
    },
    {
      q: 'What does the “damaged” label mean?',
      a: 'It means the file did not come out cleanly — its checksum didn’t match, its data was cut short, or it uses a compression method this tool can’t decode. Damaged files are still offered for download with whatever bytes were recovered, which for a truncated file is usually most of the content, so you can salvage what’s there.',
    },
    {
      q: 'Is my archive uploaded anywhere?',
      a: 'No. The archive is read and recovered entirely in your browser. There is no server component, so your file has no path off your device. The source is open and you can confirm this in your browser’s Network panel.',
    },
    {
      q: 'Can it recover a password-protected ZIP?',
      a: 'It can list the entries inside an encrypted archive, but it cannot decrypt their contents without the password, so those files are shown as damaged (encrypted). Recovering the readable data requires the correct password, which this tool does not ask for or handle.',
    },
    {
      q: 'What kinds of damage can it handle?',
      a: 'It does best with a missing or truncated central directory, a partial download, or a few corrupted bytes — cases where the file data itself is largely intact. It cannot help when the compressed data for a file is destroyed, since the original bytes are simply not there to recover.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so recovery works without a network connection. You can also install it to your home screen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      "Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer's.",
    securityText: 'Security',
  },
};
