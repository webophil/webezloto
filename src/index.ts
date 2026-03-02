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
    <span class="brand-ez">EZ</span><span class="brand-loto">Loto</span>
    <i>Assistant intelligent pour joueurs de loto en salle</i>
  </h1>

  <div class="hero-grid">

    <!-- Colonne gauche : image salle -->
    <div class="hero-left">
      <img src="/salle-loto.png" alt="Ambiance salle de loto" />
    </div>

    <!-- Colonne centre : texte -->
    <div class="hero-center">
      <p>
        Vous jouez plusieurs plaques de 6 ou 12 cartons ?<br />
        L'animateur va trop vite et le marquage devient difficile à suivre ?<br />
        Vous bousculez un ou plusieurs cartons et vos jetons sont déplacés ?
      </p>

      <p class="hero-solution">
        🎱 <strong>EZLoto vous aide à suivre tous vos cartons, simplement.</strong>
      </p>

      <p>
        Entrez le numéro annoncé, tous vos cartons se mettent à jour.
        L’application vous prévient lorsqu’un carton est à un numéro de
        <strong>“toucher”</strong>, puis affiche clairement le carton gagnant.
      </p>
    </div>

    <!-- Colonne droite : QR -->
    <div class="hero-right">

      <div class="qr-block">
        <img src="/qrcode-ezloto.png" alt="QR code pour installer EZLoto" />
        <p class="qr-caption">
          Scannez avec votre smartphone
        </p>
      </div>

      <div class="install-link">
        <a href="https://ezloto.app" target="_blank" class="btn-primary">
          Ouvrir EZLoto
        </a>

        <p class="install-notes">
          Installation sans App Store<br />
          Application web sécurisée
        </p>
      </div>

    </div>

  </div>

</section>

<div class="cards-grid">

  <div class="card scan-card">
    <div class="card-image">
      <img src="/scan-carton.jpg" alt="Scan de plaques de loto" />
    </div>
    <div class="card-text">
      <h3>1️⃣ Scannez vos plaques</h3>
      <p>Placez vos cartons dans le cadre jaune et capturez l’image.</p>
    </div>
  </div>

  <div class="card scan-card">
    <div class="card-image">
      <img src="/resultat-scan.jpg" alt="Contrôle des cartons détectés" />
    </div>
    <div class="card-text">
      <h3>2️⃣ Contrôlez vos cartons</h3>
      <p>Vérifiez les numéros détectés et corrigez si nécessaire.</p>
    </div>
  </div>

  <div class="card scan-card">
    <div class="card-image">
      <img src="/ezloto-pretajouer.png" alt="Cartons prêts à jouer" />
    </div>
    <div class="card-text">
      <h3>3️⃣ Prêt à jouer</h3>
      <p>Vos cartons sont enregistrés. Vous pouvez commencer le tirage sereinement.</p>
    </div>
  </div>

</div>

<section>

  <div class="cards-grid">

    <!-- Carte 4 -->
    <div class="card scan-card">
      <div class="card-image">
        <img src="/ezloto-boulier.png" alt="Rack des 90 numéros EZLoto" />
      </div>
      <div class="card-text">
        <h3>4️⃣ Deux modes de saisie</h3>
        <p>
          Entrez le numéro annoncé avec le clavier rapide (voir en 3️⃣)
          ou cochez-le directement sur le rack des 90 numéros.
        </p>
        <p>
          Vous choisissez la méthode que vous préférez.
        </p>
      </div>
    </div>

    <!-- Carte 5 -->
    <div class="card scan-card">
      <div class="card-image">
        <img src="/alerte-toucher-ezloto.png" alt="Alerte à un numéro de gagner" />
      </div>
      <div class="card-text">
        <h3>5️⃣ À un numéro de “toucher”</h3>
        <p>
          Dès qu’un carton est à un numéro près
          pour une ligne, deux lignes ou un carton plein,
          l’application vous prévient.
        </p>
      </div>
    </div>

    <!-- Carte 6 -->
    <div class="card scan-card">
      <div class="card-image">
        <img src="/carton-gagnant-ezloto.png" alt="Carton gagnant affiché" />
      </div>
      <div class="card-text">
        <h3>6️⃣ C’est gagné</h3>
        <p>
          Le carton gagnant s’affiche clairement.
          Il ne vous reste plus qu’à faire vérifier
          votre carton physique.
        </p>
      </div>
    </div>

  </div>

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
      title: 'EZLoto - Mode d\'emploi',
      description:
        'Mode d\'emploi détaillé de l\'app EZLoto',
      canonical: 'https://presentation.ezloto.app/mode-emploi',
      content: auditContent
    })
  )
})


/* -------------------------------------------------
   Export
------------------------------------------------- */

export default app
