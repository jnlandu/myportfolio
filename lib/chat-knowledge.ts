// Personal knowledge base for the chat assistant
// This contains structured information about Jérémie N. Mabiala

export interface ChatContext {
  keywords: string[]
  response: string
  category: string
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
    keywords: ["who", "about", "yourself", "introduction", "bio", "biography"],
    response: `Hi! I'm Jérémie N. Mabiala (you can call me Jeremy). I'm currently a resident tutor in Artificial Intelligence at AMMI (African Masters in Machine Intelligence), a flagship program in AI founded by Google and Meta, hosted at AIMS Senegal.

I'm passionate about the intersection of theoretical mathematics and practical AI applications. My journey spans from pure mathematics to cutting-edge AI research!`,
    category: "personal"
  },

  // Education Background
  {
    keywords: ["education", "school", "university", "degree", "master", "bachelor", "studies", "academic"],
    response: `My academic journey includes:

**Current (2024-2025)**: MSc in AI at AMMI, African Institute for Mathematical Sciences, Senegal
**2023-2024**: Master's in Mathematical Sciences at Stellenbosch University & AIMS South Africa
   - Specialized in Mathematical Statistics and Functional Data Analysis
   - Thesis: "Gaussian Processes for Multivariate Functional Data"
**Bachelor's**: Mathematics degree from University of Kinshasa, Congo (graduated top 5% with Grande Distinction)

I also served as a teaching assistant and subsidiary lecturer for two years during my bachelor's!`,
    category: "education"
  },

  // Research & Expertise
  {
    keywords: ["research", "expertise", "specialization", "work", "thesis", "papers", "publications"],
    response: `My research focuses on:

**Machine Learning Theory**: Developing novel mathematical approaches to AI problems
**Functional Data Analysis**: Working with complex, high-dimensional functional datasets
**Mathematical Modeling**: Applying mathematical principles to real-world AI challenges
**Deep Learning**: Theoretical aspects and practical applications
**Gaussian Processes**: My master's thesis explored these for multivariate functional data

I'm particularly interested in the theoretical foundations of ML/DL and their applications to complex problems.`,
    category: "research"
  },

  // Technical Skills
  {
    keywords: ["skills", "programming", "languages", "technologies", "tools", "python", "tensorflow", "pytorch"],
    response: `My technical toolkit includes:

**Programming**: Python (primary), R, JavaScript, LaTeX
**ML/AI Frameworks**: TensorFlow, PyTorch, Scikit-learn, Keras
**Data Science**: Pandas, NumPy, Matplotlib, Seaborn
**Statistical Tools**: R, SPSS, mathematical modeling
**Web Development**: Next.js, React, HTML/CSS (built this portfolio!)
**Other Tools**: Git, Jupyter, Docker, cloud platforms

I'm constantly learning new technologies and staying updated with the latest in AI research!`,
    category: "skills"
  },

  // Projects
  {
    keywords: ["projects", "work", "portfolio", "built", "created", "developed"],
    response: `Some of my key projects include:

**Personal Portfolio Website**: This very site you're on! Built with Next.js, featuring blog, analytics, and this chat system
**StudyBuddy Mobile App**: A productivity app for students with note-taking, pomodoro timer, and collaboration features
**Research Projects**: Various ML applications in functional data analysis and mathematical modeling

I enjoy building both theoretical research projects and practical applications that solve real-world problems. Check out my projects section for more details!`,
    category: "projects"
  },

  // Current Work & Interests
  {
    keywords: ["current", "now", "doing", "interests", "ammi", "tutor", "teaching"],
    response: `Currently, I'm a resident tutor at AMMI (African Masters in Machine Intelligence) in Senegal, where I:

**Teach**: AI and ML concepts to the next generation of African AI researchers
**Research**: Continue my work on mathematical foundations of machine learning
**Collaborate**: Work with brilliant minds from across Africa on cutting-edge AI projects
**Learn**: Constantly expanding my knowledge in the rapidly evolving field of AI

I'm passionate about combining rigorous mathematical theory with practical AI applications, and I love sharing knowledge with others!`,
    category: "current"
  },

  // Languages
  {
    keywords: ["languages", "speak", "french", "english", "lingala", "swahili"],
    response: `I'm multilingual! I speak:

**English**: Fluent (professional working language)
**French**: Native speaker
**Lingala**: Native speaker (Congolese language)

This multilingual background helps me collaborate effectively across different African regions and international research communities!`,
    category: "languages"
  },

  // Location & Background
  {
    keywords: ["location", "where", "from", "congo", "senegal", "africa"],
    response: `🌍 I'm originally from the Democratic Republic of Congo (DRC), where I completed my bachelor's at the University of Kinshasa.

Currently based in Mbour, Senegal, at AIMS (African Institute for Mathematical Sciences).

My African heritage and cross-continental experience give me a unique perspective on how AI can address challenges and opportunities across the continent!`,
    category: "location"
  },

  // Contact & Collaboration
  {
    keywords: ["contact", "email", "reach", "collaborate", "work together", "hire"],
    response: `I'd love to connect! You can reach me at:

**Professional**: jeremie@aims.ac.za or jeremy@aimsammi.org
**Personal**: jnlandu00@gmail.com
**LinkedIn**: linkedin.com/in/jeremienlandu
**GitHub**: github.com/jnlandu
**Twitter/X**: @ValentinMabiala

I'm always excited to discuss:
- Research collaborations
- AI/ML projects
- Teaching opportunities
- Mathematical modeling challenges

Feel free to reach out whether you have questions, opportunities, or just want to connect with a fellow AI enthusiast!`,
    category: "contact"
  },

  // Blog & Writing
  {
    keywords: ["blog", "writing", "articles", "tutorials", "content"],
    response: `I write about AI, mathematics, and research on my blog! You can find articles about:

**Technical Tutorials**: Machine learning concepts, mathematical foundations
**Research Insights**: Sharing findings from my work in functional data analysis
**Educational Content**: Making complex AI concepts accessible
**Personal Reflections**: My journey in AI and academia

Check out the blog section of this website for my latest posts. I enjoy breaking down complex topics and sharing knowledge with the community!`,
    category: "blog"
  },

  // Hobbies & Personal
  {
    keywords: ["hobbies", "personal", "interests", "free time", "music", "reading", "podcasts"],
    response: `When I'm not doing math or training neural networks, I enjoy:

**Reading**: Always curious about new technologies and history
**Music & Podcasts**: Love listening to music and educational podcasts
**Hobbyist Development**: Building small projects and exploring new technologies
**Writing**: Both technical content and creative writing
**Exploring**: Learning about different cultures and staying curious about the world

I believe in maintaining a balance between rigorous academic work and personal interests that keep me inspired and creative!`,
    category: "personal"
  },

  // Goals & Vision
  {
    keywords: ["goals", "vision", "future", "plans", "aspirations", "dream"],
    response: `My vision is to bridge the gap between theoretical mathematics and practical AI applications, particularly in addressing challenges relevant to Africa and the developing world.

**Short-term**: Excel as an AI tutor at AMMI and contribute to advancing AI education in Africa
**Research**: Continue exploring the mathematical foundations of machine learning
**Long-term**: Contribute to AI research that has positive impact on society, particularly in educational and healthcare applications
**Community**: Build bridges between African AI researchers and the global research community

I'm passionate about using my skills to make AI more accessible and beneficial for everyone!`,
    category: "goals"
  }
]

// Fallback responses for unmatched queries
export const fallbackResponses = [
  "That's an interesting question! Could you be more specific? I can tell you about Jérémie's research, education, current work, or personal interests.",
  "I'd be happy to help! Try asking about his background, research areas, current projects, or how to get in touch with him.",
  "Feel free to ask me about Jérémie's academic journey, technical skills, research interests, or current work at AMMI!",
  "I can share information about his education, research in functional data analysis, AI expertise, or current role as an AI tutor. What interests you most?"
]

// Suggested questions to guide users
export const suggestedQuestions = [
  "Tell me about Jérémie's background",
  "What is his research about?",
  "What are his technical skills?",
  "How can I contact him?",
  "What is AMMI?",
  "What languages does he speak?",
  "What are his current projects?"
]
