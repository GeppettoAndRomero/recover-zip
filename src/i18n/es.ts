import type { ToolContent } from './types';

// Español. Transcreación basada en el vocabulario con el que se busca en español
// «reparar ZIP / abrir ZIP dañado / recuperar archivos de un ZIP». Sin prometer una
// «reparación total»: se explica con honestidad lo que se puede rescatar.

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Recuperar archivos de un ZIP dañado — en tu navegador | runlocally',
    description:
      'Abre un .zip roto o dañado y rescata los archivos que aún son legibles dentro. Lista cada entrada, marca las dañadas y te deja descargar cada una — en tu navegador. No se sube nada. Código abierto, funciona sin conexión.',
    ogTitle: 'Recuperar archivos de un ZIP dañado — en tu navegador',
    ogDescription:
      'Rescata archivos legibles de un .zip dañado: lista las entradas, marca las rotas y descarga cada una. Se ejecuta en tu navegador, no se sube nada. Código abierto.',
  },

  hero: {
    h1: 'Recuperar ZIP',
    tagline:
      'Rescata los archivos que aún son legibles dentro de un .zip roto o dañado — en tu navegador. No se sube nada.',
  },

  intro: {
    h2: 'Recuperar archivos de un ZIP dañado',
    paras: [
      'Una descarga cortada, un sector defectuoso, un byte alterado en la transferencia: cuando un .zip se daña, un descompresor normal a menudo se niega a abrirlo, aunque la mayoría de los archivos de dentro sigan intactos. Esta herramienta actúa de otra forma: lee lo que puede, lista cada archivo que encuentra y te deja descargarlos uno a uno, de modo que un archivo roto no sea una pérdida total.',
      'Funciona en dos pasadas. Primero lee el índice del archivo (el directorio central) de la forma habitual y descomprime cada entrada. Si ese índice está dañado, recurre a rastrear los bytes en bruto en busca de las cabeceras locales que van delante de cada archivo guardado y reconstruye la lista a partir de ellas — la técnica que usan las herramientas de «reparación de ZIP» para recuperar datos de un archivo corrupto.',
      'Seamos claros: rescata los archivos que un ZIP todavía conserva de forma legible. No es una reparación mágica que reconstruye un archivo roto, ni puede devolver bytes que se han perdido físicamente. Los archivos cuya suma de verificación no coincide o que están cortados se marcan como dañados, pero se siguen ofreciendo para descargar, para que conserves todo lo que se pudo recuperar.',
    ],
  },

  privacy: {
    h2: 'Por qué tu archivo se queda en tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay paso de subida porque no hay ningún servidor al que subir:',
    points: [
      'El archivo se lee y se recupera por completo en tu navegador.',
      'La página se sirve como archivos estáticos y no hace ninguna petición con tus datos.',
      'El código es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Un archivo dañado también puede contener ficheros privados; aquí nunca salen de tu dispositivo. Si quieres comprobarlo, abre el panel de red de tu navegador mientras recuperas: ninguna petición transporta tu archivo.',
    sourceLinkText: 'Ver el código.',
  },

  howto: {
    h2: 'Cómo se usa',
    steps: [
      {
        h3: 'Abre el .zip roto',
        p: 'Haz clic para elegir el .zip dañado, o suéltalo en cualquier parte de la página. Se acepta un archivo corrupto: recuperarlo es el objetivo. Se lee en tu dispositivo, no se sube.',
      },
      {
        h3: 'Revisa la lista de archivos',
        p: 'Cada archivo aparece con el estado «OK» o «dañado». Las entradas dañadas indican el motivo — suma de verificación incorrecta, cortado o no compatible — para que sepas qué obtienes.',
      },
      {
        h3: 'Descarga lo que necesites',
        p: 'Descarga cualquier archivo por separado. Los archivos dañados también se pueden descargar con los bytes que se rescataron, que en un archivo cortado suele ser la mayor parte del contenido.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿De verdad puede reparar un ZIP dañado?',
      a: 'Recupera los archivos de dentro de un ZIP dañado, que es lo que la mayoría entiende por «reparar». No reconstruye el archivo roto en un .zip arreglado; en su lugar extrae los archivos individuales que aún son legibles y te deja descargarlos. Si los datos de un archivo faltan físicamente o han sido sobrescritos, ninguna herramienta puede devolver esos bytes exactos: esta recupera todo lo que aún esté presente.',
    },
    {
      q: '¿Cómo recupera archivos cuando un ZIP no se abre?',
      a: 'Un ZIP guarda un índice de su contenido (el directorio central) al final del archivo. Si ese índice está dañado o se ha cortado, las herramientas normales no pueden listar nada. Entonces esta herramienta rastrea los bytes en bruto en busca de la cabecera local que precede a cada archivo guardado (la marca PK\\x03\\x04), reconstruye la lista directamente a partir de ellas y descomprime cada una con el decodificador integrado del navegador.',
    },
    {
      q: '¿Qué significa la etiqueta «dañado»?',
      a: 'Significa que el archivo no salió limpio: su suma de verificación no coincidió, sus datos estaban cortados, o usa un método de compresión que esta herramienta no puede decodificar. Los archivos dañados se siguen ofreciendo para descargar con los bytes que se recuperaron; en un archivo cortado suele ser la mayor parte del contenido, así que puedes rescatar lo que hay.',
    },
    {
      q: '¿Se sube mi archivo a algún sitio?',
      a: 'No. El archivo se lee y se recupera por completo en tu navegador. No hay componente de servidor, así que tu archivo no tiene ninguna vía para salir del dispositivo. El código es abierto y puedes confirmarlo en el panel de red de tu navegador.',
    },
    {
      q: '¿Puede recuperar un ZIP con contraseña?',
      a: 'Puede listar las entradas de un archivo cifrado, pero no puede descifrar su contenido sin la contraseña, así que esos archivos se muestran como dañados (cifrados). Recuperar los datos legibles requiere la contraseña correcta, que esta herramienta ni pide ni maneja.',
    },
    {
      q: '¿Qué tipos de daño puede manejar?',
      a: 'Funciona mejor con un directorio central que falta o está cortado, una descarga parcial o unos pocos bytes corruptos: casos en los que los datos del archivo en sí están en su mayoría intactos. No puede ayudar cuando los datos comprimidos de un archivo están destruidos, porque los bytes originales simplemente ya no están.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Tras la primera visita queda en caché, así que la recuperación funciona sin conexión a la red. También puedes añadirla a tu pantalla de inicio.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— pequeñas herramientas que se ejecutan localmente en tu dispositivo.',
    colophon:
      'Creado y mantenido por Geppetto. Parte del código se escribe con ayuda de IA; toda la revisión y las decisiones son del responsable.',
    securityText: 'Seguridad',
  },
};
