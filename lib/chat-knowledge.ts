// Personal knowledge base for Jérémie N. Mabiala's AI assistant
// This contains structured information for the AI to use when responding

export interface ChatContext {
  category: string
  keywords: string[]
  response: string
}

export const personalInfo = {
  name: "Jérémie N. Mabiala",
  alternativeNames: ["Jeremy", "Jérémie", "Mabiala"],
  currentPosition: "Resident Tutor in Artificial Intelligence at AMMI (African Masters in Machine Intelligence)",
  location: "AIMS Senegal, Mbour, Senegal",
  emails: ["jeremie@aims.ac.za", "jeremy@aimsammi.org", "jnlandu00@gmail.com"],
  socialLinks: {
    linkedin: "https://linkedin.com/in/jeremienlandu",
    github: "https://github.com/jnlandu",
    twitter: "https://twitter.com/ValentinMabiala"
  }
}

export const chatContexts: ChatContext[] = [
  // Personal Introduction
  {
    category: "introduction",
    keywords: ["who", "about", "yourself", "introduction", "bio", "biography"],
    response: "I'm Jérémie N. Mabiala, a Resident Tutor in Artificial Intelligence at AMMI (African Masters in Machine Intelligence) at AIMS Senegal. I'm passionate about machine learning, particularly computer vision, natural language processing, and statistical learning theory. I love combining theoretical mathematical insights with practical AI applications."
  },

  // Current Position & Work
  {
    category: "current_work",
    keywords: ["work", "job", "position", "current", "ammi", "aims", "tutor", "teaching"],
    response: "I currently work as a Resident Tutor in Artificial Intelligence at AMMI (African Masters in Machine Intelligence) at AIMS Senegal in Mbour. In this role, I teach and mentor students in various AI and machine learning topics, guide research projects, and contribute to the academic community in Africa. AMMI is a one-year intensive master's program that trains the next generation of African AI researchers and practitioners."
  },

  // Education
  {
    category: "education",
    keywords: ["education", "study", "degree", "university", "academic", "background", "school"],
    response: "I'm currently pursuing an African Masters in Machine Intelligence (AMMI) at AIMS Senegal. Before this, I built a strong foundation in mathematics and computer science. My academic journey has always focused on the intersection of mathematics, statistics, and computer science, which naturally led me to specialize in machine learning and AI."
  },

  // Research Interests
  {
    category: "research",
    keywords: ["research", "interests", "focus", "projects", "papers", "publications", "science"],
    response: "My research focuses on several key areas: computer vision (image processing, object detection, pattern recognition), natural language processing (text analysis, language models), and statistical learning theory (mathematical foundations of ML algorithms). I'm particularly interested in developing novel mathematical approaches to solve real-world AI problems and making these techniques accessible to researchers across Africa."
  },

  // Technical Skills
  {
    category: "skills",
    keywords: ["skills", "programming", "languages", "technologies", "tools", "software", "code"],
    response: "I'm proficient in Python (my primary language for AI/ML), R (for statistical analysis), JavaScript and TypeScript (for web development). For machine learning, I work with PyTorch, TensorFlow, scikit-learn, and Hugging Face transformers. I also have experience with web technologies like React, Next.js, FastAPI, and Node.js. I'm comfortable with tools like Git, Docker, Jupyter notebooks, and Google Colab for development and research."
  },

  // Projects
  {
    category: "projects",
    keywords: ["projects", "portfolio", "work", "built", "developed", "github"],
    response: "I work on various machine learning projects ranging from computer vision applications to NLP systems. You can check out my GitHub (github.com/jnlandu) to see some of my code and projects. I also enjoy building educational tools and resources to help others learn AI and machine learning concepts. This portfolio website itself is one of my projects, featuring an AI assistant (that's me!) to answer questions about my background."
  },

  // Contact Information
  {
    category: "contact",
    keywords: ["contact", "email", "reach", "get in touch", "linkedin", "social", "connect"],
    response: "You can reach me through several channels: Email me at jeremie@aims.ac.za (work) or jeremy@aimsammi.org (AMMI-related), or jnlandu00@gmail.com (personal). You can also connect with me on LinkedIn at linkedin.com/in/jeremienlandu or check out my code on GitHub at github.com/jnlandu. I'm always open to discussing research collaborations, AI projects, or questions about AMMI and AI education in Africa."
  },

  // AMMI & AIMS
  {
    category: "ammi_aims",
    keywords: ["ammi", "aims", "senegal", "africa", "masters", "program", "students"],
    response: "AMMI (African Masters in Machine Intelligence) is a one-year intensive master's program hosted by AIMS (African Institute for Mathematical Sciences) centers across Africa. Our Senegal center is in Mbour. AMMI trains the next generation of African AI researchers and practitioners through rigorous coursework, research projects, and industry collaborations. As a Resident Tutor, I help design curriculum, teach courses, mentor students, and ensure they're well-prepared for careers in AI research or industry."
  },

  // Location
  {
    category: "location",
    keywords: ["where", "location", "live", "based", "senegal", "mbour", "africa"],
    response: "I'm currently based in Mbour, Senegal, where the AIMS Senegal center is located. It's a beautiful coastal city about an hour from Dakar. Being in Senegal has been an incredible experience - I get to work with brilliant students from across Africa and contribute to the growing AI ecosystem on the continent."
  },

  // Future Goals
  {
    category: "goals",
    keywords: ["future", "goals", "plans", "vision", "next", "career"],
    response: "My goal is to continue advancing AI research and education in Africa. I want to bridge the gap between theoretical AI research and practical applications that can solve real problems across the continent. I'm also passionate about making AI education more accessible and building the next generation of African AI talent through programs like AMMI."
  }
]

export const fallbackResponses = [
  "That's an interesting question! While I might not have specific information about that topic, feel free to ask me about my research, work at AMMI, technical background, or how to get in touch.",
  "I'd love to help, but I might need a bit more context. You can ask me about my work in AI, my role at AMMI, my technical skills, or my research interests.",
  "Hmm, I'm not sure I have the exact information you're looking for. Try asking about my education, current work, research focus, or contact information.",
  "Great question! I specialize in topics related to AI, machine learning, and my work at AMMI. Feel free to ask about any of these areas or how to connect with me."
]

export const suggestedQuestions = [
  "What's your current research focus?",
  "Tell me about your work at AMMI",
  "What programming languages do you use?",
  "What's your educational background?",
  "How can I contact you?",
  "What projects are you working on?",
  "What is AMMI and what do you do there?",
  "What are your main areas of expertise?",
  "What's it like working in Senegal?",
  "How did you get into AI and machine learning?",
  "What advice do you have for aspiring AI researchers?",
  "What are some interesting AI applications you've worked on?"
]
