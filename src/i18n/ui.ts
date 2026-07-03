/**
 * Interactive-island strings, per locale. Separate from page-level content
 * (`en.ts` / `ja.ts` …): this is the text the Preact islands render.
 *
 * IMPORTANT: islands receive `locale` as a PROP (present during SSR) and never
 * read it from `document`. SSR and client render the same string, so there is no
 * hydration mismatch.
 *
 * Interpolated strings carry `{name}` / `{recovered}` / `{total}` / `{count}`
 * templates; the island does `.replace('{name}', x)`.
 */
export const ui = {
  en: {
    // RecoverManager — open / dropzone
    uploadHeading: 'Open a damaged .zip',
    uploadSubtitle: 'Choose a .zip file. It is read on your device — nothing is uploaded.',
    dropClick: 'Click to choose a .zip',
    dropOr: 'or drop it anywhere on the page',
    dropSupported: 'Salvages readable files from a broken archive',
    reading: 'Reading the archive…',

    // RecoverManager — results
    summaryRecovered: 'Recovered {recovered} of {total} files',
    sourceCentral: 'Read from the archive index.',
    sourceScan:
      'The archive index was unreadable, so files were salvaged by scanning for file headers.',
    nothingRecoverable: 'No readable files could be salvaged from this archive.',
    statusOk: 'OK',
    statusBroken: 'Damaged',
    download: 'Download',
    downloadPartial: 'Download what was salvaged',
    loadAnother: 'Recover another archive',

    // RecoverManager — reasons an entry is damaged
    reasonCrc: 'checksum mismatch, bytes may be altered',
    reasonTruncated: 'cut short, partial data only',
    reasonInflate: 'could not be decompressed',
    reasonUnsupported: 'unsupported compression',
    reasonEncrypted: 'encrypted — needs a password',
    reasonEmpty: 'no data found',

    // RecoverManager — error states
    errWrongType: '{name} is not a .zip file. Choose a .zip archive to recover.',
    errUnreadable: 'The file {name} could not be read. Please try again.',
    errEmpty: 'The file {name} is empty — there is nothing to recover.',

    // GlobalDropZone
    dzProcessing: 'Opening {count} file(s)…',
    dzPleaseWait: 'Please wait',
    dzDropTitle: 'Drop a .zip to recover',
    dzDropSub: 'A damaged .zip can be opened here',

    // InstallPrompt
    installHeading: 'Install app',
    installBody: 'Add to your home screen for quick access.',
    install: 'Install',
    later: 'Later',

    // ThemeToggle
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    themeLabel: 'Theme',

    // shared
    required: 'Required',
    close: 'Close',
  },
  ja: {
    // RecoverManager — open / dropzone
    uploadHeading: '壊れた .zip を開く',
    uploadSubtitle: '.zip ファイルを選んでください。処理は端末内で行われ、アップロードはされません。',
    dropClick: 'クリックして .zip を選択',
    dropOr: 'またはページ上にドロップ',
    dropSupported: '壊れたアーカイブから読めるファイルを救い出します',
    reading: 'アーカイブを読み込み中…',

    // RecoverManager — results
    summaryRecovered: '{total} 件中 {recovered} 件を復元しました',
    sourceCentral: 'アーカイブの索引から読み込みました。',
    sourceScan:
      'アーカイブの索引が読めなかったため、ファイルヘッダーを走査してファイルを救出しました。',
    nothingRecoverable: 'このアーカイブから読めるファイルは救出できませんでした。',
    statusOk: '正常',
    statusBroken: '破損',
    download: 'ダウンロード',
    downloadPartial: '救出できた分をダウンロード',
    loadAnother: '別のアーカイブを復元',

    // RecoverManager — reasons an entry is damaged
    reasonCrc: 'チェックサム不一致（内容が変わっている可能性）',
    reasonTruncated: '途中で切れており、一部のみ',
    reasonInflate: '展開できませんでした',
    reasonUnsupported: '未対応の圧縮形式',
    reasonEncrypted: '暗号化されています（パスワードが必要）',
    reasonEmpty: 'データが見つかりません',

    // RecoverManager — error states
    errWrongType: '{name} は .zip ファイルではありません。復元する .zip を選んでください。',
    errUnreadable: 'ファイル {name} を読み込めませんでした。もう一度お試しください。',
    errEmpty: 'ファイル {name} は空です。復元する内容がありません。',

    // GlobalDropZone
    dzProcessing: '{count} 件のファイルを開いています…',
    dzPleaseWait: 'お待ちください',
    dzDropTitle: 'ドロップで復元',
    dzDropSub: '壊れた .zip をここで開けます',

    // InstallPrompt
    installHeading: 'アプリを追加',
    installBody: 'ホーム画面に追加すると、すぐに開けます。',
    install: '追加',
    later: 'あとで',

    // ThemeToggle
    themeToLight: 'ライトモードに切り替え',
    themeToDark: 'ダークモードに切り替え',
    themeLabel: 'テーマ',

    // shared
    required: '必須',
    close: '閉じる',
  },
  zh: {
    // RecoverManager — open / dropzone
    uploadHeading: '打开损坏的 .zip',
    uploadSubtitle: '选择一个 .zip 文件。文件在你的设备上读取，不会上传。',
    dropClick: '点击选择 .zip',
    dropOr: '或把文件拖到页面任意位置',
    dropSupported: '从损坏的压缩包中抢救可读文件',
    reading: '正在读取压缩包…',

    // RecoverManager — results
    summaryRecovered: '已恢复 {total} 个文件中的 {recovered} 个',
    sourceCentral: '从压缩包目录读取。',
    sourceScan: '压缩包目录无法读取，已通过扫描文件头来抢救文件。',
    nothingRecoverable: '无法从该压缩包中抢救出可读文件。',
    statusOk: '正常',
    statusBroken: '损坏',
    download: '下载',
    downloadPartial: '下载已抢救的部分',
    loadAnother: '恢复其他压缩包',

    // RecoverManager — reasons an entry is damaged
    reasonCrc: '校验和不匹配，内容可能已改变',
    reasonTruncated: '被截断，仅有部分数据',
    reasonInflate: '无法解压',
    reasonUnsupported: '不支持的压缩方式',
    reasonEncrypted: '已加密，需要密码',
    reasonEmpty: '未找到数据',

    // RecoverManager — error states
    errWrongType: '{name} 不是 .zip 文件。请选择要恢复的 .zip 压缩包。',
    errUnreadable: '无法读取文件 {name}。请重试。',
    errEmpty: '文件 {name} 为空，没有可恢复的内容。',

    // GlobalDropZone
    dzProcessing: '正在打开 {count} 个文件…',
    dzPleaseWait: '请稍候',
    dzDropTitle: '拖放即可恢复',
    dzDropSub: '可以在此打开损坏的 .zip',

    // InstallPrompt
    installHeading: '安装应用',
    installBody: '添加到主屏幕，方便随时打开。',
    install: '安装',
    later: '以后再说',

    // ThemeToggle
    themeToLight: '切换到浅色模式',
    themeToDark: '切换到深色模式',
    themeLabel: '主题',

    // shared
    required: '必填',
    close: '关闭',
  },
  de: {
    // RecoverManager — open / dropzone
    uploadHeading: 'Beschädigte .zip öffnen',
    uploadSubtitle:
      'Wähle eine .zip-Datei. Sie wird auf deinem Gerät gelesen – nichts wird hochgeladen.',
    dropClick: 'Zum Auswählen einer .zip klicken',
    dropOr: 'oder Datei irgendwo auf die Seite ziehen',
    dropSupported: 'Rettet lesbare Dateien aus einem beschädigten Archiv',
    reading: 'Archiv wird gelesen …',

    // RecoverManager — results
    summaryRecovered: '{recovered} von {total} Dateien gerettet',
    sourceCentral: 'Aus dem Archiv-Index gelesen.',
    sourceScan:
      'Der Archiv-Index war unlesbar, daher wurden Dateien durch Scannen der Dateiköpfe gerettet.',
    nothingRecoverable: 'Aus diesem Archiv ließen sich keine lesbaren Dateien retten.',
    statusOk: 'OK',
    statusBroken: 'Beschädigt',
    download: 'Herunterladen',
    downloadPartial: 'Gerettetes herunterladen',
    loadAnother: 'Weiteres Archiv wiederherstellen',

    // RecoverManager — reasons an entry is damaged
    reasonCrc: 'Prüfsumme stimmt nicht, Bytes evtl. verändert',
    reasonTruncated: 'abgeschnitten, nur Teildaten',
    reasonInflate: 'konnte nicht entpackt werden',
    reasonUnsupported: 'nicht unterstützte Komprimierung',
    reasonEncrypted: 'verschlüsselt – Passwort nötig',
    reasonEmpty: 'keine Daten gefunden',

    // RecoverManager — error states
    errWrongType: '{name} ist keine .zip-Datei. Wähle ein .zip-Archiv zum Wiederherstellen.',
    errUnreadable: 'Die Datei {name} konnte nicht gelesen werden. Bitte versuche es erneut.',
    errEmpty: 'Die Datei {name} ist leer – es gibt nichts wiederherzustellen.',

    // GlobalDropZone
    dzProcessing: '{count} Datei(en) werden geöffnet …',
    dzPleaseWait: 'Bitte warten',
    dzDropTitle: '.zip zum Wiederherstellen ablegen',
    dzDropSub: 'Eine beschädigte .zip kann hier geöffnet werden',

    // InstallPrompt
    installHeading: 'App installieren',
    installBody: 'Zum Startbildschirm hinzufügen, um es direkt zu öffnen.',
    install: 'Installieren',
    later: 'Später',

    // ThemeToggle
    themeToLight: 'Zum hellen Modus wechseln',
    themeToDark: 'Zum dunklen Modus wechseln',
    themeLabel: 'Design',

    // shared
    required: 'Erforderlich',
    close: 'Schließen',
  },
  es: {
    // RecoverManager — open / dropzone
    uploadHeading: 'Abrir un .zip dañado',
    uploadSubtitle: 'Elige un archivo .zip. Se lee en tu dispositivo: no se sube nada.',
    dropClick: 'Haz clic para elegir un .zip',
    dropOr: 'o suéltalo en cualquier parte de la página',
    dropSupported: 'Rescata los archivos legibles de un .zip dañado',
    reading: 'Leyendo el archivo…',

    // RecoverManager — results
    summaryRecovered: 'Se recuperaron {recovered} de {total} archivos',
    sourceCentral: 'Leído desde el índice del archivo.',
    sourceScan:
      'El índice del archivo no se pudo leer, así que los archivos se rescataron escaneando las cabeceras.',
    nothingRecoverable: 'No se pudo rescatar ningún archivo legible de este .zip.',
    statusOk: 'OK',
    statusBroken: 'Dañado',
    download: 'Descargar',
    downloadPartial: 'Descargar lo rescatado',
    loadAnother: 'Recuperar otro archivo',

    // RecoverManager — reasons an entry is damaged
    reasonCrc: 'la suma de verificación no coincide, los bytes pueden estar alterados',
    reasonTruncated: 'cortado, solo datos parciales',
    reasonInflate: 'no se pudo descomprimir',
    reasonUnsupported: 'compresión no compatible',
    reasonEncrypted: 'cifrado: necesita contraseña',
    reasonEmpty: 'no se encontraron datos',

    // RecoverManager — error states
    errWrongType: '{name} no es un archivo .zip. Elige un .zip para recuperar.',
    errUnreadable: 'No se pudo leer el archivo {name}. Inténtalo de nuevo.',
    errEmpty: 'El archivo {name} está vacío: no hay nada que recuperar.',

    // GlobalDropZone
    dzProcessing: 'Abriendo {count} archivo(s)…',
    dzPleaseWait: 'Espera un momento',
    dzDropTitle: 'Suelta un .zip para recuperarlo',
    dzDropSub: 'Aquí se puede abrir un .zip dañado',

    // InstallPrompt
    installHeading: 'Instalar la app',
    installBody: 'Añádela a tu pantalla de inicio para tenerla siempre a mano.',
    install: 'Instalar',
    later: 'Más tarde',

    // ThemeToggle
    themeToLight: 'Cambiar al modo claro',
    themeToDark: 'Cambiar al modo oscuro',
    themeLabel: 'Tema',

    // shared
    required: 'Obligatorio',
    close: 'Cerrar',
  },
} as const;

export type UiStrings = (typeof ui)['en'];
