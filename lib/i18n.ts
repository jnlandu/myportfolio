export type Locale = 'en' | 'fr'

export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'fr']

export interface Translation {
  // Navigation
  nav: {
    home: string
    about: string
    news: string
    projects: string
    publications: string
    education: string
    skills: string
    motivations: string
    citations: string
    blog: string
    contact: string
    getInTouch: string
  }
  // Hero Section
  hero: {
    greeting: string
    name: string
    title: string
    description: string
    viewResume: string
    contactMe: string
  }
  // About Section
  about: {
    title: string
    description: string
    currentRole: string
    interests: string
    learnMore: string
    welcome: string
    story: {
      paragraph1: string
      paragraph2: string
      paragraph3: string
      paragraph4: string
      personalNote: {
        title: string
        content: string
      }
    }
    languages: {
      title: string
      french: string
      english: string
      lingala: string
      native: string
      fluent: string
    }
    academicJourney: {
      title: string
      current: string
      currentDesc: string
      masters2024: string
      masters2024Desc: string
      masters2023: string
      masters2023Desc: string
      bachelors: string
      bachelorsDesc: string
    }
    contact: {
      title: string
      description: string
      getInTouch: string
      updateNote: string
    }
  }
  // News Section
  news: {
    title: string
    subtitle: string
    viewAll: string
    readMore: string
    categories: {
      all: string
      research: string
      academic: string
      speaking: string
      awards: string
    }
  }
  // Projects Section
  projects: {
    title: string
    subtitle: string
    viewProject: string
    sourceCode: string
    liveDemo: string
    research: string
    webMobile: string
    personal: string
  }
  // Blog Section
  blog: {
    title: string
    subtitle: string
    readMore: string
    readTime: string
    tableOfContents: string
    relatedPosts: string
  }
  // Contact Section
  contact: {
    title: string
    subtitle: string
    name: string
    email: string
    subject: string
    message: string
    send: string
    sending: string
    success: string
    error: string
  }
  // Footer
  footer: {
    description: string
    quickLinks: string
    myWork: string
    connect: string
    copyright: string
    projects: string
    blog: string
    gallery: string
    allNews: string
    currentlyBased: string
    studentAt: string
    focus: string
    getInTouch: string
    madeWith: string
    forkDesign: string
    viewSource: string
    builtWith: string
  }
  // Common
  common: {
    loading: string
    error: string
    notFound: string
    backToHome: string
    language: string
    darkMode: string
    lightMode: string
  }
}

export const translations: Record<Locale, Translation> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      news: "News",
      projects: "Projects",
      publications: "Publications",
      education: "Education",
      skills: "Skills",
      motivations: "Motivations",
      citations: "Citations",
      blog: "Blog",
      contact: "Contact",
      getInTouch: "Get in Touch"
    },
    hero: {
      greeting: "Hello, I'm",
      name: "Jérémie N. Mabiala",
      title: "AI Researcher & PhD Student",
      description: "Passionate about artificial intelligence, machine learning, and developing innovative solutions that make a positive impact on society.",
      viewResume: "View Resume",
      contactMe: "Contact Me"
    },
    about: {
      title: "About Me",
      description: "I am a PhD student and researcher passionate about artificial intelligence and machine learning. My work focuses on developing innovative AI solutions and advancing the field through research and practical applications.",
      currentRole: "Current Role",
      interests: "Research Interests",
      learnMore: "Learn More",
      welcome: "Welcome!",
      story: {
        paragraph1: "I am Jérémie N. Mabiala. If you're from an English-speaking culture, you can call me Jeremy. I am currently a resident tutor in Artificial Intelligence at the African Masters in Machine Intelligence (AMMI), a pan-African flagship master's program in Artificial Intelligence founded by Google and Meta, hosted at the African Institute for Mathematical Sciences (AIMS) Senegal.",
        paragraph2: "Before that, I graduated from Stellenbosch University and AIMS South Africa in February 2024 with a Master's degree in Mathematical Sciences. I worked on Mathematical Statistics, specifically Functional Data Analysis. My master's thesis is titled Gaussian Processes for Multivariate Functional Data, and it is available at the AIMS Archive.",
        paragraph3: "I also hold a Bachelor's degree (equivalent to Bac +5) in Mathematics from the University of Kinshasa, the Congo's leading university. There I graduated in the top 5% in my department with \"Grande Distinction\" (the Congolese equivalent of Summa Cum Laude). During my time there, I worked on Functional Analysis, which was my early math interest, and I served as a teaching assistant and subsidiary lecturer for two years.",
        paragraph4: "I am passionate about teaching, gaining knowledge, and sharing it with others. 🤝 I am particularly interested in Mathematics, Theoretical Aspects of Machine Learning and/or Deep Learning and their applications. My interests also extend to Mathematical Modeling, Functional Data Analysis, Large Language Models, and Reinforcement Learning.",
        personalNote: {
          title: "Personal Note",
          content: "I am a hobbyist developer and an apprentice writer. I like to keep myself curious about technologies and history. When I'm not doing math or training neural networks, you'll find me reading and exploring technologies, posts on X, or listening to music and podcasts."
        }
      },
      languages: {
        title: "Languages",
        french: "French",
        english: "English", 
        lingala: "Lingala",
        native: "Native",
        fluent: "Fluent"
      },
      academicJourney: {
        title: "Academic Journey",
        current: "Current - AMMI Tutor",
        currentDesc: "African Institute for Mathematical Sciences, Senegal",
        masters2024: "Feb 2024 - 2025 - MSc in AI",
        masters2024Desc: "AMMI, African Institute for Mathematical Sciences, Senegal",
        masters2023: "Mars 2023 - Mars 2024 - Master's Degree",
        masters2023Desc: "Stellenbosch University & AIMS South Africa",
        bachelors: "Bachelor's Degree",
        bachelorsDesc: "University of Kinshasa, Congo"
      },
      contact: {
        title: "Let's Connect!",
        description: "I'm always excited to discuss AI, mathematics, and potential connections.",
        getInTouch: "Get in Touch",
        updateNote: "I'm currently updating this website. Feel free to reach out for any inquiries!"
      }
    },
    news: {
      title: "Latest News",
      subtitle: "Stay updated with my recent activities, research, and achievements",
      viewAll: "View All News",
      readMore: "Read More",
      categories: {
        all: "All",
        research: "Research",
        academic: "Academic",
        speaking: "Speaking",
        awards: "Awards"
      }
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Exploring the frontiers of AI research through innovative projects and collaborations",
      viewProject: "View Project",
      sourceCode: "Source Code",
      liveDemo: "Live Demo",
      research: "Research",
      webMobile: "Web & Mobile",
      personal: "Personal"
    },
    blog: {
      title: "Blog",
      subtitle: "Thoughts, tutorials, and insights on AI, machine learning, and technology",
      readMore: "Read More",
      readTime: "min read",
      tableOfContents: "Table of Contents",
      relatedPosts: "Related Posts"
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Let's discuss opportunities, collaborations, or just have a conversation about AI and technology",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again."
    },
    footer: {
      description: "AI Researcher and PhD Student passionate about developing innovative solutions through artificial intelligence and machine learning.",
      quickLinks: "Quick Links",
      myWork: "My Work",
      connect: "Connect",
      copyright: "All rights reserved.",
      projects: "Projects",
      blog: "Blog & Tutorials",
      gallery: "Gallery", 
      allNews: "All News",
      currentlyBased: "Currently based in Senegal",
      studentAt: "Student at AIMS",
      focus: "Focus: Artificial Intelligence",
      getInTouch: "Get In Touch",
      madeWith: "Made with",
      forkDesign: "Feel free to fork this design and make it yours!",
      viewSource: "View source code",
      builtWith: "Built with Next.js, TypeScript, and Tailwind CSS."
    },
    common: {
      loading: "Loading...",
      error: "Something went wrong",
      notFound: "Page not found",
      backToHome: "Back to Home",
      language: "Language",
      darkMode: "Dark Mode",
      lightMode: "Light Mode"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      news: "Actualités",
      projects: "Projets",
      publications: "Publications",
      education: "Éducation",
      skills: "Compétences",
      motivations: "Motivations",
      citations: "Citations",
      blog: "Blog",
      contact: "Contact",
      getInTouch: "Contactez-moi"
    },
    hero: {
      greeting: "Bonjour, je suis",
      name: "Jérémie N. Mabiala",
      title: "Chercheur IA & Doctorant",
      description: "Passionné par l'intelligence artificielle, l'apprentissage automatique et le développement de solutions innovantes qui ont un impact positif sur la société.",
      viewResume: "Voir le CV",
      contactMe: "Me contacter"
    },
    about: {
      title: "À propos de moi",
      description: "Je suis doctorant et chercheur passionné par l'intelligence artificielle et l'apprentissage automatique. Mon travail se concentre sur le développement de solutions IA innovantes et l'avancement du domaine par la recherche et les applications pratiques.",
      currentRole: "Rôle actuel",
      interests: "Intérêts de recherche",
      learnMore: "En savoir plus",
      welcome: "Bienvenue !",
      story: {
        paragraph1: "Je suis Jérémie N. Mabiala. Si vous êtes d'une culture anglophone, vous pouvez m'appeler Jeremy. Je suis actuellement tuteur résident en Intelligence Artificielle au sein du Master Africain en Intelligence Machine (AMMI), un programme de master phare panafricain en Intelligence Artificielle fondé par Google et Meta, hébergé à l'Institut Africain des Sciences Mathématiques (AIMS) Sénégal.",
        paragraph2: "Avant cela, j'ai obtenu mon diplôme de l'Université de Stellenbosch et d'AIMS Afrique du Sud en février 2024 avec un Master en Sciences Mathématiques. J'ai travaillé sur les Statistiques Mathématiques, spécifiquement l'Analyse de Données Fonctionnelles. Mon mémoire de master s'intitule Processus Gaussiens pour Données Fonctionnelles Multivariées, et il est disponible dans les Archives AIMS.",
        paragraph3: "Je détiens également un diplôme de Licence (équivalent Bac +5) en Mathématiques de l'Université de Kinshasa, la principale université du Congo. Là, j'ai été diplômé dans le top 5% de mon département avec \"Grande Distinction\" (l'équivalent congolais de Summa Cum Laude). Pendant mon temps là-bas, j'ai travaillé sur l'Analyse Fonctionnelle, qui était mon intérêt mathématique initial, et j'ai servi comme assistant d'enseignement et chargé de cours auxiliaire pendant deux ans.",
        paragraph4: "Je suis passionné par l'enseignement, l'acquisition de connaissances et leur partage avec les autres. 🤝 Je m'intéresse particulièrement aux Mathématiques, aux Aspects Théoriques de l'Apprentissage Automatique et/ou de l'Apprentissage Profond et leurs applications. Mes intérêts s'étendent également à la Modélisation Mathématique, l'Analyse de Données Fonctionnelles, les Grands Modèles de Langage et l'Apprentissage par Renforcement.",
        personalNote: {
          title: "Note personnelle",
          content: "Je suis un développeur amateur et un apprenti écrivain. J'aime rester curieux sur les technologies et l'histoire. Quand je ne fais pas de mathématiques ou n'entraîne pas de réseaux de neurones, vous me trouverez en train de lire et d'explorer les technologies, les posts sur X, ou d'écouter de la musique et des podcasts."
        }
      },
      languages: {
        title: "Langues",
        french: "Français",
        english: "Anglais",
        lingala: "Lingala", 
        native: "Natif",
        fluent: "Courant"
      },
      academicJourney: {
        title: "Parcours académique",
        current: "Actuel - Tuteur AMMI",
        currentDesc: "Institut Africain des Sciences Mathématiques, Sénégal",
        masters2024: "Fév 2024 - 2025 - MSc en IA",
        masters2024Desc: "AMMI, Institut Africain des Sciences Mathématiques, Sénégal",
        masters2023: "Mars 2023 - Mars 2024 - Master",
        masters2023Desc: "Université de Stellenbosch & AIMS Afrique du Sud",
        bachelors: "Licence",
        bachelorsDesc: "Université de Kinshasa, Congo"
      },
      contact: {
        title: "Connectons-nous !",
        description: "Je suis toujours ravi de discuter d'IA, de mathématiques et de connexions potentielles.",
        getInTouch: "Me contacter",
        updateNote: "Je mets actuellement à jour ce site web. N'hésitez pas à me contacter pour toute demande !"
      }
    },
    news: {
      title: "Dernières nouvelles",
      subtitle: "Restez informé de mes activités récentes, recherches et réalisations",
      viewAll: "Voir toutes les actualités",
      readMore: "Lire la suite",
      categories: {
        all: "Tout",
        research: "Recherche",
        academic: "Académique",
        speaking: "Conférences",
        awards: "Prix"
      }
    },
    projects: {
      title: "Projets en vedette",
      subtitle: "Explorer les frontières de la recherche en IA à travers des projets innovants et des collaborations",
      viewProject: "Voir le projet",
      sourceCode: "Code source",
      liveDemo: "Démo en direct",
      research: "Recherche",
      webMobile: "Web & Mobile",
      personal: "Personnel"
    },
    blog: {
      title: "Blog",
      subtitle: "Réflexions, tutoriels et insights sur l'IA, l'apprentissage automatique et la technologie",
      readMore: "Lire la suite",
      readTime: "min de lecture",
      tableOfContents: "Table des matières",
      relatedPosts: "Articles connexes"
    },
    contact: {
      title: "Contactez-moi",
      subtitle: "Discutons d'opportunités, de collaborations, ou simplement de l'IA et de la technologie",
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès !",
      error: "Échec de l'envoi du message. Veuillez réessayer."
    },
    footer: {
      description: "Chercheur IA et doctorant passionné par le développement de solutions innovantes grâce à l'intelligence artificielle et l'apprentissage automatique.",
      quickLinks: "Liens rapides",
      myWork: "Mon travail",
      connect: "Se connecter",
      copyright: "Tous droits réservés.",
      projects: "Projets",
      blog: "Blog & Tutoriels",
      gallery: "Galerie",
      allNews: "Toutes les actualités",
      currentlyBased: "Actuellement basé au Sénégal",
      studentAt: "Étudiant à AIMS",
      focus: "Focus : Intelligence Artificielle",
      getInTouch: "Me contacter",
      madeWith: "Fait avec",
      forkDesign: "N'hésitez pas à bifurquer ce design et à le personnaliser !",
      viewSource: "Voir le code source",
      builtWith: "Construit avec Next.js, TypeScript et Tailwind CSS."
    },
    common: {
      loading: "Chargement...",
      error: "Quelque chose s'est mal passé",
      notFound: "Page non trouvée",
      backToHome: "Retour à l'accueil",
      language: "Langue",
      darkMode: "Mode sombre",
      lightMode: "Mode clair"
    }
  }
}

export function getTranslation(locale: Locale): Translation {
  return translations[locale] || translations[defaultLocale]
}
