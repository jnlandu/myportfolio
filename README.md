# Hey there! Welcome to my Portfolio

This is my personal corner of the internet where I share my journey as a student in AI  and machine learning engineer. I built this site to showcase my work, thoughts, and experiences.

## What You'll Find Here

I've crafted this portfolio to give you a comprehensive look at who I am and what I do:

- **About Me** : My story, background, and what drives my passion.
- **Latest News** :Recent achievements, conference talks, and trips.
- **Projects** : Cool stuff I've built and  tried , research I'm working on.
- **Blog & Tutorials** : Where I share knowledge and explain complex AI concepts.
- **Gallery** : Visual moments from my academic journey
- **Contact** : Let's connect! 
- **AI Chat Assistant** : Ask questions about my background, research, and experience

## What Makes This Special

I didn't just throw together a basic portfolio. I wanted something that truly represents me:

- **AI-Powered Chat** - Interactive assistant to answer questions about my work and background
- **Fully Responsive** - Looks great whether you're on your phone or desktop
- **Dark Theme** - Easy on the eyes for those late-night research sessions
- **Interactive Elements** - Smooth animations and engaging user experience
- **Markdown-Powered** - I can easily write blog posts and news updates in markdown
- **LaTeX Support** - Because math formulas need to look beautiful too! 📊
- **Syntax Highlighting** - Code blocks that actually make sense

## Built With Love (and Modern Tech)

I chose technologies that I genuinely enjoy working with:

- **[Next.js 15](https://nextjs.org/)** - The React framework that just works
- **[TypeScript](https://www.typescriptlang.org/)** - Because I like my code to be predictable
- **[Tailwind CSS](https://tailwindcss.com/)** - Makes styling actually fun
- **[Shadcn UI](https://ui.shadcn.com/)** - Beautiful components that save time
- **[ReactMarkdown](https://github.com/remarkjs/react-markdown)** - For that smooth markdown rendering
- **[KaTeX](https://katex.org/)** - Making mathematical expressions look gorgeous

##  Want to Run This Locally?

I'd be honored if you want to check out my code or even use it as inspiration for your own portfolio!

### What You'll Need
- Node.js (version 18 or newer - I'm staying current!)
- pnpm (my package manager of choice, but npm works too)

### Let's Get You Set Up

1. **Clone this bad boy**
   ```bash
   git clone https://github.com/jnlandu/myportfolio.git
   cd myportfolio
   ```

2. **Install the dependencies**
   ```bash
   pnpm install
   ```

3. **Fire it up!**
   ```bash
   pnpm dev
   ```

4. **Check it out**
   Open [http://localhost:3001](http://localhost:3001) (might be 3000 if that's free) and voilà!

### Optional: Enable AI Chat Features

The portfolio includes an AI-powered chat assistant that can answer questions about your background. To enable this:

1. **Copy the environment file**
   ```bash
   cp .env.example .env.local
   ```

2. **Get a Hugging Face API key**
   - Visit [Hugging Face Settings](https://huggingface.co/settings/tokens)
   - Create a new token with read permissions
   - Add it to your `.env.local` file:
   ```bash
   HUGGINGFACE_API_KEY=your_actual_api_key_here
   ```

3. **Restart the development server**
   ```bash
   pnpm dev
   ```

The chat button will automatically detect when AI features are available and switch between AI-powered responses and smart keyword-based responses.

## How I Organized Everything

I like keeping things clean and logical:

```
 My Portfolio
├── 📂 app/              # Next.js pages and layouts
├── 📂 components/       # All my reusable UI pieces
├── 📂 content/          # Blog posts and news in markdown
│   ├── 📂 blog/         # Tutorial and educational content
│   └── 📂 news/         # Latest updates and announcements
├── 📂 hooks/           # Custom React hooks I've written
├── 📂 lib/             # Utility functions and helpers
├── 📂 public/          # Images and static assets
└── 📂 styles/          # Custom CSS and styling
```

## Making It Your Own

Feel free to fork this and make it yours! Here's what you'll want to customize:

- **Content files** in `/content/` - Replace with your own blog posts and news
- **Components** - Update the personal information in each section
- **Images** - Swap out my photos with yours in `/public/`
- **Colors** - The primary theme is in `tailwind.config.ts`
- **Social links** - Update these in the hero and footer sections

## Let's Connect!

I'm always excited to meet fellow researchers, developers, and curious minds! 

- **Email**: jeremy@aimsammi.org or jnlandu00@gmail.com
- **LinkedIn**: [jeremienlandu](https://linkedin.com/in/jeremienlandu)
- **GitHub**: [jnlandu](https://github.com/jnlandu)
- **Twitter/X**: [@ValentinMabiala](https://twitter.com/ValentinMabiala)

##  A Note About the Code

I believe in open source and sharing knowledge. If you find something useful here, please feel free to use it!

## Special Thanks

Big shoutout to the amazing open-source community and everyone who builds these incredible tools that make our lives easier. Y'all are the real MVPs!

---
**P.S.** - If you spot any bugs or have suggestions, don't hesitate to open an issue. I'm always looking to improve!
