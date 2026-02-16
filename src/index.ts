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
      content: `... ton contenu HTML ici ...`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "EZLoto",
        "image": "https://presentation.ezloto.app/ezloto-og.png",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Android, iOS, Web",
        "url": "https://ezloto.app",
        "description": "Application pour joueurs réguliers de loto en salle permettant de scanner et suivre plusieurs plaques en temps réel.",
        "offers": {
          "@type": "Offer",
          "price": "1.99",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      }
    })
  )
})

/* -------------------------------------------------
   Export
------------------------------------------------- */

export default app
