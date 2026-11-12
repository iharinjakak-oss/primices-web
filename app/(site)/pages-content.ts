import type { FaqItem } from '@/app/components/faq'
import type { LegalSection } from '@/app/components/legal-sections'

const TODO = 'À reprendre depuis primices.com/fr'
const todoList = (count: number) => Array.from({ length: count }, (_, i) => `${TODO} (${i + 1})`)

export const cta = 'Planifier un appel'

// Si tu n'as pas encore une photo, supprime sa ligne : le fond bleu marine prend le relais.
export const images: { hero?: string; guide?: string; closing?: string; page?: string } = {
  hero: '/images/hero-city.jpg',
  guide: '/images/guide.jpg',
  closing: '/images/closing.jpg',
  page: '/images/hero-city.jpg',
}

export const home = {
  hero: { title: TODO, subtitle: TODO },
  stats: [
    { value: '216', label: "Propriétaires d'entreprises accompagnés" },
    { value: '100 %', label: 'Taux de satisfaction' },
  ],
  testimonial: { name: TODO, text: TODO },
  guide: { title: TODO, subtitle: TODO, points: todoList(8) },
  life: { title: TODO, subtitle: TODO, points: todoList(4) },
  questions: { title: TODO, subtitle: TODO, points: todoList(8) },
  balance: { title: TODO, subtitle: TODO, points: todoList(5) },
  steps: {
    title: TODO,
    subtitle: TODO,
    items: [
      { number: '01', title: TODO, text: TODO },
      { number: '02', title: TODO, text: TODO },
      { number: '03', title: TODO, text: TODO },
    ],
  },
  closing: { title: TODO, subtitle: TODO, text: TODO },
}

export const programsPage = {
  title: 'Programmes de coaching',
  description:
    "Coaching individuel, de groupe et d'entreprise : trouvez le programme qui vous correspond.",
  intro: TODO,
  sectionTitle: 'Nos programmes',
  programs: [
    { name: 'Coaching individuel', description: TODO, points: todoList(4) },
    { name: 'Coaching de groupe', description: TODO, points: todoList(4) },
    { name: "Coaching d'entreprise", description: TODO, points: todoList(4) },
  ],
  steps: {
    title: 'Comment ça fonctionne',
    subtitle: TODO,
    items: [
      { number: '01', title: 'Consultation initiale', text: TODO },
      { number: '02', title: 'Programme personnalisé', text: TODO },
      { number: '03', title: 'Accompagnement continu', text: TODO },
    ],
  },
  closing: { title: TODO, text: TODO },
}

export const aboutPage = {
  title: 'À propos',
  description: 'La mission, les valeurs et l’histoire de Primices International.',
  intro: TODO,
  mission: { title: 'Notre mission', text: TODO },
  values: {
    title: 'Nos valeurs',
    items: [
      { name: 'Excellence', text: TODO },
      { name: 'Intégrité', text: TODO },
      { name: 'Croissance', text: TODO },
    ],
  },
  story: { title: 'Notre histoire', paragraphs: [TODO, TODO] },
  closing: { title: 'Rejoignez notre communauté', text: TODO },
}

export const testimonialsPage = {
  title: 'Témoignages',
  description:
    'Les retours d’expérience des dirigeants et entrepreneurs accompagnés par Primices International.',
  intro: TODO,
  // À CONFIRMER avec le lead : le site actuel affiche aussi 500+ / 98 % / 10+ ans sur cette page.
  stats: [
    { value: '216', label: "Propriétaires d'entreprises accompagnés" },
    { value: '100 %', label: 'Taux de satisfaction' },
  ],
  sectionTitle: 'Ce que disent nos clients',
  // À CONFIRMER : ces témoignages sont-ils authentiques, et les personnes sont-elles d'accord ?
  items: [
    { name: 'Alex Martin', role: 'Entrepreneur', text: TODO },
    { name: 'Sarah Johnson', role: 'Directeur commercial', text: TODO },
    { name: 'Michael Chen', role: 'PDG', text: TODO },
    { name: 'Emma Williams', role: 'Fondatrice', text: TODO },
    { name: 'David Brown', role: 'Consultant en stratégie', text: TODO },
    { name: 'Lisa Anderson', role: 'Directrice marketing', text: TODO },
  ],
  closing: { title: 'Vous aussi, retrouvez l’équilibre', text: TODO },
}

// Questions fondées uniquement sur ce que dit le site actuel.
// À AJOUTER après validation : tarifs, durée d'un accompagnement, conditions.
export const faqPage = {
  title: 'Questions fréquentes',
  description: 'Les réponses aux questions les plus courantes sur nos programmes de coaching.',
  intro: 'Vous trouverez ici les réponses aux questions les plus fréquentes.',
  items: [
    {
      question: 'À qui s’adressent vos programmes ?',
      answer:
        'À des entrepreneurs, des dirigeants et des professionnels qui souhaitent réussir tout en préservant leur bien-être.',
    },
    {
      question: 'Quels programmes proposez-vous ?',
      answer:
        'Trois formules : le coaching individuel, le coaching de groupe et le coaching d’entreprise.',
      link: { href: '/coaching', label: 'Découvrir les programmes' },
    },
    {
      question: 'Comment démarrer ?',
      answer:
        'Par une session stratégique, qui permet d’évaluer vos besoins et de définir vos objectifs. Vous pouvez la planifier depuis la page Contact.',
      link: { href: '/contact', label: 'Planifier un appel' },
    },
    {
      question: 'Comment se déroule un accompagnement ?',
      answer:
        'Il se fait en trois étapes : une consultation initiale, un programme personnalisé, puis un accompagnement continu.',
    },
    {
      question: 'Comment vous contacter ?',
      answer: 'Par la page Contact, ou directement par e-mail à contact@primices.com.',
      link: { href: '/contact', label: 'Aller à la page Contact' },
    },
    {
      question: 'Où trouver votre politique de confidentialité ?',
      answer: 'Elle est consultable à tout moment depuis le bas de chaque page.',
      link: { href: '/privacy-policy', label: 'Lire la politique de confidentialité' },
    },
  ] satisfies FaqItem[],
  closing: {
    title: 'Vous avez une autre question ?',
    text: 'Notre équipe se fera un plaisir de vous répondre.',
  },
}

// Ajoute ici une entrée par section de la politique actuelle (voir phase F).
export const privacyPage = {
  title: 'Politique de confidentialité',
  description: 'La manière dont Primices International traite vos données personnelles.',
  intro: TODO,
  sections: [{ title: TODO, paragraphs: [TODO] }] satisfies LegalSection[],
}

// Informations légales : NE PAS inventer. À fournir par l'entreprise.
const LEGAL = {
  company: 'À compléter',
  address: 'À compléter',
  publisher: 'À compléter',
  host: 'À compléter',
  email: 'contact@primices.com',
}

export const legalPage = {
  title: 'Mentions légales',
  description:
    'Informations légales sur l’éditeur et l’hébergeur du site Primices International.',
  intro:
    'Les informations ci-dessous sont fournies conformément aux obligations de transparence applicables aux sites professionnels.',
  sections: [
    {
      title: 'Éditeur du site',
      paragraphs: [
        `Le site est édité par : ${LEGAL.company}.`,
        `Adresse : ${LEGAL.address}.`,
        `Responsable de la publication : ${LEGAL.publisher}.`,
        `Contact : ${LEGAL.email}.`,
      ],
    },
    {
      title: 'Hébergement',
      paragraphs: [`Le site est hébergé par : ${LEGAL.host}.`],
    },
    {
      title: 'Propriété intellectuelle',
      paragraphs: [
        'Les contenus du site (textes, images, logos) sont protégés. Toute reproduction sans autorisation préalable est interdite.',
      ],
    },
    {
      title: 'Données personnelles',
      paragraphs: [
        'Le traitement de vos données personnelles est décrit dans notre politique de confidentialité.',
      ],
    },
  ] satisfies LegalSection[],
}

export const contactPage = {
  title: 'Contact',
  description: 'Contactez Primices International pour planifier un appel ou poser une question.',
  intro: 'Une question sur nos programmes ? Souhaitez-vous planifier un appel ? Écrivez-nous.',
  email: 'contact@primices.com',
}