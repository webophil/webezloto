import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/* -------------------------------------------------
   ESM __dirname / __filename
------------------------------------------------- */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* -------------------------------------------------
   Express app
------------------------------------------------- */

const app = express()

/* -------------------------------------------------
   Static files (CSS, images, etc.)
------------------------------------------------- */

app.use(express.static(path.join(__dirname, '..', 'public')))

/* -------------------------------------------------
   Load shared layout parts
------------------------------------------------- */

const header = fs.readFileSync(
  path.join(__dirname, '..', 'components', 'header.html'),
  'utf8'
)

const footer = fs.readFileSync(
  path.join(__dirname, '..', 'components', 'footer.html'),
  'utf8'
)

/* -------------------------------------------------
   Page renderer
------------------------------------------------- */

type PageOptions = {
  title: string
  description?: string
  canonical?: string
  content: string
}

function renderPage({
  title,
  description,
  canonical,
  content
}: PageOptions) {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <title>${title}</title>

    ${description ? `<meta name="description" content="${description}"/>` : ''}
    ${canonical ? `<link rel="canonical" href="${canonical}"/>` : ''}

    <!-- Favicon -->
    <link
      rel="icon"
      type="image/png"
      href="/ezloto512.png"
    />

    <!-- Author -->
    <meta name="author" content="EZLoto" />

    <!-- Open Graph -->
    <meta property="og:title" content="${title}" />
    ${description ? `<meta property="og:description" content="${description}" />` : ''}
    <meta property="og:type" content="website" />
    ${canonical ? `<meta property="og:url" content="${canonical}" />` : ''}
    <meta property="og:image" content="https://presentation.ezloto.app/ezloto-og.png" />
    <meta property="og:locale" content="fr_FR" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    ${description ? `<meta name="twitter:description" content="${description}" />` : ''}
    <meta name="twitter:image" content="https://presentation.ezloto.app/ezloto-og.png" />

    <link rel="stylesheet" href="/style.css"/>
  </head>

  <body>
    ${header}

    <main class="container">
      ${content}
    </main>

    ${footer}
  </body>
</html>`
}

/* -------------------------------------------------
   Routes HTML
------------------------------------------------- */

// Home
app.get('/', (req, res) => {
  res.type('html').send(
    renderPage({
      title: 'EZLoto – Assistant intelligent pour joueurs de loto en salle',
      description:
        'Scannez vos plaques de loto, suivez 12, 24 ou 36 cartons en temps réel et ne ratez plus jamais un numéro.',
      canonical: 'https://presentation.ezloto.app/',
      content: `
<section class="hero">

  <h1>
    <span class="brand-ez">EZ</span>
    <span class="brand-loto">Loto</span><br/>
    L’assistant intelligent des joueurs de loto en salle
  </h1>

  <p class="hero-sub">
    Vous jouez plusieurs plaques ?
    EZLoto surveille tous vos cartons en temps réel
    et vous avertit quand il ne reste plus qu’un numéro.
  </p>

  <div class="cta-group">
    <a href="https://ezloto.app" target="_blank" class="btn-primary">
      Installer gratuitement
    </a>
    <a href="/mode-emploi" class="btn-secondary">
      Voir le mode d’emploi
    </a>
  </div>

</section>

<hr class="separator"/>

<section>

  <h2>📸 Scannez vos plaques en quelques secondes</h2>

  <p>
    Prenez une photo de votre plaque de 12 cartons.
    L’intelligence artificielle lit les numéros,
    découpe chaque carton et les recrée parfaitement.
  </p>

  <p>
    Donnez un nom à vos séries et suivez-les facilement
    pendant tout le tirage.
  </p>

</section>

<section>

  <h2>🔢 Deux modes de saisie au choix</h2>

  <ul>
    <li>Clavier rapide intégré</li>
    <li>Rack visuel des 90 numéros à cocher</li>
    <li>Changement possible à tout moment</li>
  </ul>

  <p>
    Tous vos cartons se mettent à jour instantanément,
    même si vous jouez 24 ou 36 cartons.
  </p>

</section>

<section>

  <h2>🚨 Ne ratez plus jamais un numéro</h2>

  <p>
    EZLoto vous avertit automatiquement lorsqu’il reste
    un seul numéro pour :
  </p>

  <ul>
    <li>1 ligne</li>
    <li>2 lignes</li>
    <li>Carton plein</li>
  </ul>

  <p>
    Le loto est une question de chance.
    L’erreur humaine ne devrait pas en faire partie.
  </p>

</section>

<section>

  <h2>💛 Conçu pour les joueurs réguliers</h2>

  <p>
    Plus vous jouez de cartons,
    plus EZLoto devient indispensable.
  </p>

  <p>
    2 plaques ? Confort.
    3 plaques ? Sécurité.
    4 plaques ? Sérénité totale.
  </p>

</section>

<section class="pricing">

  <h2>💸 Simple et flexible</h2>

  <ul>
    <li>Quelques scans offerts à l’installation</li>
    <li>Recharge par packs à petit prix</li>
    <li>Aucun abonnement</li>
    <li>Paiement sécurisé</li>
  </ul>

  <p>
    Vous payez uniquement lorsque vous en avez besoin.
  </p>

</section>

<section class="final-cta">

  <h2>Prêt à jouer sans stress ?</h2>

  <a href="https://ezloto.app" target="_blank" class="btn-primary large">
    Installer EZLoto
  </a>

</section>
      `
    })
  )
})

// PWA commerce local
app.get('/pwa-commerce-local', (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, '..', 'components', 'pwa-commerce-local.htm'),
    'utf8'
  )

  res.type('html').send(
    renderPage({
      title: 'Progressive Web App pour commerce local',
      description:
        'Application mobile au format Progressive Web App pour restaurant, bar et commerce de proximité.',
      canonical: 'https://outils.phildev.fr/pwa-commerce-local',
      content
    })
  )
})

/* -------------------------------------------------
   Export app (Vercel)
------------------------------------------------- */

export default app
