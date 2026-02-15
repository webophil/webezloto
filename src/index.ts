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
    <link
      rel="icon"
      type="image/png"
      href="https://storage.googleapis.com/gpt-engineer-file-uploads/asNNCVmjyJgOakDIePcVcN7tw2x2/uploads/1767451716548-iconePhD.png"
    />
    <!-- Geo metadata for local SEO -->
    <meta name="geo.region" content="FR-GES" />
    <meta name="geo.placename" content="Reims" />
    <meta name="geo.position" content="49.2583;4.0317" />
    <meta name="author" content="PhilDEV"/>

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
      title: 'Outils Vibe Coding par PhilDEV',
      description:
        'Outils et aides au développement en Vibe Coding – SEO et environnement React / TypeScript.',
      canonical: 'https://outils.phildev.fr/',
      content: `
        <h1>Outils, Tutos & Ressources Vibe Coding</h1>

<img src="vibecoding.jpg" width="180" alt="Vibe Coding à Reims" class="image-gauche">

<p class="intro">
Ce site regroupe des <strong>ressources pratiques autour du Vibe Coding</strong>,
du développement web assisté par l’IA, et de la création d’applications modernes
efficaces, accessibles et bien pensées.
</p>

<p>
Ici, pas de recettes magiques ni de promesses floues.
On parle de <strong>ce qui fonctionne vraiment</strong> quand on développe avec l’IA,
que l’on soit développeur débutant, curieux de ces nouveaux outils,
ou professionnel cherchant des solutions concrètes.
</p>

<p>
Vibe Coding, PWA, SEO sans SSR, UI lisible et utile, IA appliquée aux services web :
autant de sujets abordés avec un objectif simple :
<strong>créer mieux, plus vite, et de façon maîtrisée</strong>.
</p>

<hr class="separator">

<div class="cards-grid menu-cards">
    <a href="/vibe-coding" class="card card-link">
    <div class="card-header">
    <h3>Vibe Coding & IA</h3>
    <span class="card-read">Lire</span>
    </div>
    <p class="card-subtitle"> 
      Développer avec l’IA sans perdre la maîtrise du code
    </p>
    <p>
      Prompts, architecture, limites du no-code
      et bonnes pratiques pour débuter sereinement.
    </p>
  </a>
  
  <a href="/pwa-mobile" class="card card-link">

  <div class="card-header">
    <h3>Applis Mobiles</h3>
    <span class="card-read">Lire</span>
  </div>

  <p class="card-subtitle">
    Progressive Web Apps, facilement sur les mobiles de vos clients
  </p>

  <p>
    Des applications installables, rapides et efficaces,
    sans App Stores ni contraintes inutiles.
  </p>

</a>
   
<a href="/agents-ia" class="card card-link">
  <div class="card-header">
    <h3>Les Agents IA</h3>
    <span class="card-read">Lire</span>
    </div>
    <p class="card-subtitle">
      L’IA vous assiste dans votre métier en toute simplicité
    </p>
    <p>
      ChatBots, Assistance Clients, plans de travail, suivi détaillé de vos process, devis, facturation...
    </p>
  </a>

</div>


<h2>Explorer les thématiques</h2>

<div class="cards-grid">

  <div class="card">
    <h3>Vibe Coding & IA générative</h3>
    <p>
      Comment utiliser l’IA pour développer sans perdre le contrôle du code,
      comprendre ce qu’on génère et construire des bases solides.
    </p>
    <ul>
      <li>Vibe Coding vs no-code et low-code</li>
      <li><a href="/prompt-ideal-vibe-coding">Bien prompter pour éviter le code bancal</a></li>
      <li>Architecture minimale mais propre</li>
    </ul>
  </div>

  <div class="card">
    <h3>PWA & applications web modernes</h3>
    <p>
      Les Progressive Web Apps comme alternative crédible aux applications
      mobiles natives, sans App Store ni coûts excessifs.
    </p>
    <ul>
      <li><a href="/pwa-commerce-local">PWA pour commerces et artisans</a></li>
      <li>Installation mobile sans friction</li>
      <li>Cas concrets d’usage grand public</li>
    </ul>
  </div>

  

  <div class="card">
    <h3>SEO & visibilité des apps JavaScript</h3>
    <p>
      Comment rendre visibles des applications React ou TypeScript
      malgré l’absence de SSR, avec des solutions simples et efficaces.
    </p>
    <ul>
      <li>HTML statique et SEO intelligent</li>
      <li>JSON-LD et contenu utile - <a href="/auditseo/">Audit SEO Vibe Coding Lire→</a></li>
      <li>Donner du “jus” à un site principal</li>
    </ul>
  </div>

  <div class="card">
    <h3>Design Web : faire simple, lisible et efficace</h3>
    <p>
      L'UI (User Interface) n’a pas besoin d’être complexe pour être efficace.
      Ici, on privilégie la clarté, la hiérarchie et l’usage réel.
    </p>
    <ul>
      <li><a href="/design-site-web">Design utile vs design décoratif</a></li>
      <li>Lisibilité mobile avant tout</li>
      <li>Moins d’effets, plus d’efficacité</li>
      <li>UI/UX : ergonomie d'une app</li>
    </ul>
  </div>

</div>

<hr class="separator">

<h2>Des concepts appliqués sur des projets réels</h2>

<p>
Les idées et méthodes présentées ici ne sont pas théoriques.
Elles sont utilisées dans des projets concrets,
des applications web et des Progressive Web Apps
développées pour des usages réels.
</p>

<p>
C’est cette approche pragmatique que je mets également en œuvre
dans mon activité de développement web sur
<a href="https://phildev.fr" target="_blank"><strong>PhilDEV.fr</strong></a>,
au service des professionnels, commerçants et porteurs de projets.
</p>

      `
    })
  )
})

// Audit SEO
app.get('/auditseo', (req, res) => {
  const auditContent = fs.readFileSync(
    path.join(__dirname, '..', 'components', 'auditseo.htm'),
    'utf8'
  )

  res.type('html').send(
    renderPage({
      title: 'Audit SEO React & SPA – PhilDEV',
      description:
        'Audit SEO spécialisé pour applications React, SPA et sites JavaScript modernes.',
      canonical: 'https://outils.phildev.fr/auditseo',
      content: auditContent
    })
  )
})
// PWA Mobile
app.get('/pwa-mobile', (req, res) => {
  const auditContent = fs.readFileSync(
    path.join(__dirname, '..', 'components', 'pwa-mobile.htm'),
    'utf8'
  )

  res.type('html').send(
    renderPage({
      title: 'Progressive Web App - application mobile en plus facile',
      description:
        'Création de Progressive Web Apps pour mobile, installable sur tous les téléphones',
      canonical: 'https://outils.phildev.fr/pwa-mobile',
      content: auditContent
    })
  )
})
// Vibe Coding
app.get('/vibe-coding', (req, res) => {
  const auditContent = fs.readFileSync(
    path.join(__dirname, '..', 'components', 'vibe-coding.htm'),
    'utf8'
  )

  res.type('html').send(
    renderPage({
      title: 'Vibe Coding - développer avec l’IA en gardant la maîtrise',
      description:
        'Découvrir le Vibe Coding, une approche moderne du développement assisté par l’IA, ses avantages, ses limites et ses usages professionnels.',
      canonical: 'https://outils.phildev.fr/vibe-coding',
      content: auditContent
    })
  )
})

// Prompt Idéal Vibe Coding
app.get('/prompt-ideal-vibe-coding', (req, res) => {
  const auditContent = fs.readFileSync(
    path.join(__dirname, '..', 'components', 'prompt-ideal-vibe-coding.htm'),
    'utf8'
  )

  res.type('html').send(
    renderPage({
      title: "Prompt Vibe Coding - de l'idée à la création par IA",
      description:
        'Comment structurer un prompt efficace en Vibe Coding pour créer une application avec un code propre et évolutif',
      canonical: 'https://outils.phildev.fr/prompt-ideal-vibe-coding',
      content: auditContent
    })
  )
})

// Agents IA
app.get('/agents-ia', (req, res) => {
  const auditContent = fs.readFileSync(
    path.join(__dirname, '..', 'components', 'agents-ia.htm'),
    'utf8'
  )

  res.type('html').send(
    renderPage({
      title: "Les agents IA – automatiser le travail sans remplacer l’humain",
      description:
        "Comprendre simplement ce que sont les agents IA, leur rôle dans les workflows et comment ils automatisent des tâches au service des professionnels.",
      canonical: 'https://outils.phildev.fr/agents-ia',
      content: auditContent
    })
  )
})

// Design de site web
app.get('/design-site-web', (req, res) => {
  const designContent = fs.readFileSync(
    path.join(__dirname, '..', 'components', 'design-site-web.htm'),
    'utf8'
  )

  res.type('html').send(
    renderPage({
      title: "Le design d’un site web – première impression, lisibilité et confiance",
      description:
        "Comprendre le rôle du design d’un site web : orienter la lecture, structurer l’information et inspirer confiance, avec une approche accessible et orientée projets modernes.",
      canonical: 'https://outils.phildev.fr/design-site-web',
      content: designContent
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
