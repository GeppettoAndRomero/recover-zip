import type { ToolContent } from './types';

// Deutsch. Keine Wort-für-Wort-Übersetzung, sondern Transkreation auf das Vokabular,
// mit dem im Deutschen nach „ZIP reparieren / defekte ZIP öffnen / ZIP wiederherstellen"
// gesucht wird. Kein Versprechen einer „vollständigen Reparatur" — ehrlich zum Umfang.

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'Dateien aus einer beschädigten ZIP wiederherstellen — im Browser | runlocally',
    description:
      'Öffne eine defekte oder beschädigte .zip und rette die noch lesbaren Dateien darin. Listet jeden Eintrag, markiert die beschädigten und lässt dich jeden einzeln herunterladen — im Browser. Nichts wird hochgeladen. Open Source, offline nutzbar.',
    ogTitle: 'Dateien aus einer beschädigten ZIP wiederherstellen — im Browser',
    ogDescription:
      'Rette lesbare Dateien aus einer defekten .zip: Einträge auflisten, beschädigte markieren, einzeln herunterladen. Läuft im Browser, nichts wird hochgeladen. Open Source.',
  },

  hero: {
    h1: 'ZIP wiederherstellen',
    tagline:
      'Rette die noch lesbaren Dateien aus einer defekten oder beschädigten .zip — im Browser. Nichts wird hochgeladen.',
  },

  intro: {
    h2: 'Dateien aus einer beschädigten ZIP wiederherstellen',
    paras: [
      'Ein abgebrochener Download, ein defekter Sektor, ein beim Übertragen gekipptes Byte — wenn eine .zip beschädigt ist, weigert sich ein normales Entpackprogramm oft, sie überhaupt zu öffnen, obwohl die meisten Dateien darin noch intakt sind. Dieses Tool geht anders vor: Es liest, was es lesen kann, listet jede gefundene Datei auf und lässt dich jede einzeln herunterladen — so ist ein defektes Archiv kein Totalverlust.',
      'Es arbeitet in zwei Durchgängen. Zuerst liest es den Archiv-Index (das zentrale Verzeichnis) auf normalem Weg und dekodiert jeden Eintrag. Ist dieser Index selbst beschädigt, durchsucht es ersatzweise die Rohdaten nach den lokalen Dateiköpfen, die vor jeder gespeicherten Datei stehen, und baut die Liste daraus neu auf — die Technik, mit der spezialisierte „ZIP-Reparatur"-Tools Daten aus einem beschädigten Archiv retten.',
      'Ehrlich gesagt: Es rettet die Dateien, die eine ZIP noch in lesbarer Form enthält. Es ist keine Zauber-Reparatur, die ein defektes Archiv neu aufbaut, und es kann keine Bytes zurückholen, die physisch verloren sind. Dateien, deren Prüfsumme nicht stimmt oder die abgeschnitten sind, werden als beschädigt markiert — aber weiterhin zum Download angeboten, damit du behältst, was zu retten war.',
    ],
  },

  privacy: {
    h2: 'Warum dein Archiv auf deinem Gerät bleibt',
    lead: 'Datenschutz ist hier strukturell, kein Versprechen. Es gibt keinen Upload-Schritt, weil es keinen Server gibt, zu dem hochgeladen werden könnte:',
    points: [
      'Das Archiv wird vollständig in deinem Browser gelesen und wiederhergestellt.',
      'Die Seite wird als statische Dateien ausgeliefert und stellt keine Anfrage mit deinen Daten.',
      'Der Quellcode ist offen und für jeden einsehbar (MIT).',
      'Sie funktioniert offline — was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Auch ein beschädigtes Archiv kann private Dateien enthalten; hier verlassen sie dein Gerät nie. Zum Prüfen öffne beim Wiederherstellen das Netzwerk-Panel deines Browsers — keine Anfrage trägt deine Datei.',
    sourceLinkText: 'Quellcode ansehen.',
  },

  howto: {
    h2: 'So funktioniert es',
    steps: [
      {
        h3: 'Defekte .zip öffnen',
        p: 'Klicke, um die beschädigte .zip auszuwählen, oder ziehe sie irgendwo auf die Seite. Ein defektes Archiv wird angenommen — es wiederherzustellen ist der Sinn. Es wird auf deinem Gerät gelesen, nicht hochgeladen.',
      },
      {
        h3: 'Dateiliste prüfen',
        p: 'Jede Datei erhält den Status „OK" oder „beschädigt". Beschädigte Einträge zeigen den Grund — Prüfsumme falsch, abgeschnitten oder nicht unterstützt — damit du weißt, was du bekommst.',
      },
      {
        h3: 'Herunterladen, was du brauchst',
        p: 'Lade jede Datei einzeln herunter. Beschädigte Dateien bleiben herunterladbar, mit allen geretteten Bytes — bei abgeschnittenen Dateien oft der Großteil des Inhalts.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Kann das eine beschädigte ZIP wirklich reparieren?',
      a: 'Es stellt die Dateien in einer beschädigten ZIP wieder her — das ist, was die meisten mit „reparieren" meinen. Es baut das defekte Archiv nicht zu einer heilen .zip um, sondern liest die einzelnen, noch lesbaren Dateien heraus und stellt sie zum Download bereit. Wenn die Daten einer Datei physisch fehlen oder überschrieben sind, kann kein Tool diese exakten Bytes zurückholen — dieses rettet alles, was noch da ist.',
    },
    {
      q: 'Wie stellt es Dateien wieder her, wenn sich eine ZIP nicht öffnen lässt?',
      a: 'Eine ZIP führt einen Index ihres Inhalts (das zentrale Verzeichnis) ganz am Ende der Datei. Ist dieser Index beschädigt oder abgeschnitten, können normale Tools nichts auflisten. Dieses Tool durchsucht dann die Rohdaten nach dem lokalen Dateikopf, der jeder gespeicherten Datei vorausgeht (die PK\\x03\\x04-Markierung), baut die Liste direkt daraus neu auf und entpackt jede mit dem eingebauten Decoder des Browsers.',
    },
    {
      q: 'Was bedeutet die Kennzeichnung „beschädigt"?',
      a: 'Sie bedeutet, dass die Datei nicht sauber herauskam — ihre Prüfsumme stimmte nicht, ihre Daten waren abgeschnitten, oder sie nutzt ein Komprimierungsverfahren, das dieses Tool nicht dekodieren kann. Beschädigte Dateien werden dennoch mit allen geretteten Bytes zum Download angeboten, bei abgeschnittenen meist der Großteil des Inhalts.',
    },
    {
      q: 'Wird mein Archiv irgendwohin hochgeladen?',
      a: 'Nein. Das Archiv wird vollständig in deinem Browser gelesen und wiederhergestellt. Es gibt keine Serverkomponente, also hat deine Datei keinen Weg vom Gerät weg. Der Quellcode ist offen, und du kannst das im Netzwerk-Panel deines Browsers bestätigen.',
    },
    {
      q: 'Kann es eine passwortgeschützte ZIP wiederherstellen?',
      a: 'Es kann die Einträge in einem verschlüsselten Archiv auflisten, ihren Inhalt aber ohne Passwort nicht entschlüsseln, daher werden diese Dateien als beschädigt (verschlüsselt) angezeigt. Das Wiederherstellen der lesbaren Daten erfordert das richtige Passwort, nach dem dieses Tool weder fragt noch das es verarbeitet.',
    },
    {
      q: 'Mit welchen Schäden kommt es zurecht?',
      a: 'Am besten mit einem fehlenden oder abgeschnittenen zentralen Verzeichnis, einem Teil-Download oder ein paar beschädigten Bytes — Fällen, in denen die Dateidaten selbst weitgehend intakt sind. Wenn die komprimierten Daten einer Datei zerstört sind, hilft es nicht, denn die ursprünglichen Bytes sind schlicht nicht mehr da.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Es ist eine PWA. Nach dem ersten Besuch ist es gecacht, sodass die Wiederherstellung ohne Netzwerkverbindung funktioniert. Du kannst es auch zum Startbildschirm hinzufügen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Erstellt und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; alle Prüfung und Entscheidungen liegen beim Maintainer.',
    securityText: 'Sicherheit',
  },

  related: {
    h2: 'Ähnliche Tools',
    blogLinkText: 'Technische Hintergründe lesen',
  },
};
