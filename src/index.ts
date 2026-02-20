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
   Static files
------------------------------------------------- */

app.use(express.static(path.join(__dirname, '..', 'public')))

/* -------------------------------------------------
   Shared layout
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
  jsonLd?: object
}

function renderPage({
  title,
  description,
  canonical,
  content,
  jsonLd
}: PageOptions) {

  const structuredData = jsonLd
    ? `<script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
</script>`
    : ''

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <title>${title}</title>

    ${description ? `<meta name="description" content="${description}"/>` : ''}
    ${canonical ? `<link rel="canonical" href="${canonical}"/>` : ''}

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/ezloto512.png"/>

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

    ${structuredData}

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
   Routes
------------------------------------------------- */

// HOME
app.get('/', (req, res) => {
  res.type('html').send(
    renderPage({
      title: 'EZLoto – Assistant intelligent pour joueurs de loto en salle',
      description:
        'Scannez vos plaques de loto, suivez 12, 24 ou 36 cartons en temps réel et ne ratez plus jamais un numéro.',
      canonical: 'https://presentation.ezloto.app/',
      content: `<section class="hero">

  <h1>
    <span class="brand-ez">EZ</span>
    <span class="brand-loto">Loto</span> - <i>assistant intelligent pour joueurs de loto en salle</i>
  </h1>

  <p class="hero-sub">
    Vous jouez plusieurs plaques de 6 ou 12 cartons ?<br />L'animateur va trop vite et le marquage devient difficile à suivre ?<br />Vous bousculez un ou plusieurs cartons et vos jetons sont déplacés ?<br /><br />
    💡<b> Vous avez enfin trouvé LA solution !! </b>💡<br /><br />
    Votre Assistant intelligent <b>EZLoto</b> gère tous vos cartons en temps réel, le marquage se fait en un seul clic, pour tous vos jeux. L'appli vous prévient dès qu'un carton "touche" à un numéro près, et vous annonce votre victoire avec visualisation du carton gagnant.<br />Vous n'avez plus qu'à faire vérifier le carton physique et à profiter de votre lot !
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

</section>`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "EZLoto",
        "image": "https://presentation.ezloto.app/ezloto-og.png",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Android, iOS, Web",
        "url": "https://ezloto.app",
        "description": "Application pour joueurs réguliers de loto en salle permettant de scanner et suivre plusieurs plaques de cartons en temps réel.",
        "offers": {
          "@type": "Offer",
          "price": "1.99",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      }
    }) // Fin de renderPage
  )   // Fin du res.type('html').send(...)
})    //
// mentions légales
app.get('/mentions-legales', (req, res) => {
  const auditContent = fs.readFileSync(
    path.join(__dirname, '..', 'components', 'mentions-legales.htm'),
    'utf8'
  )

  res.type('html').send(
    renderPage({
      title: 'EZLoto - Mentions Légales',
      description:
        'Mentions légales EZLoto',
      canonical: 'https://presentation.ezloto.app/mentions-legales',
      content: auditContent
    })
  )
})
// mode d'emploi
app.get('/mode-emploi', (req, res) => {
  const auditContent = fs.readFileSync(
    path.join(__dirname, '..', 'components', 'mode-emploi.htm'),
    'utf8'
  )

  res.type('html').send(
    renderPage({
      title: "EZLoto - Mode d'emploi",
      description:
        "Mode d'emploi détaillé de l'app EZLoto",
      canonical: 'https://presentation.ezloto.app/mode-emploi',
      content: auditContent
    })
  )
})


/* -------------------------------------------------
   Export
------------------------------------------------- */

export default app
