# A personal blog 

## What You'll Find Here

- **About Me** : Story, background, etc.
- **Latest News** : Recent achievements, conference, talks, and trips.
- **Projects** : Cool stuff I've built and  tried , research I'm working on.
- **Blog & Tutorials** : Where I share knowledge and explain complex AI concepts.
- **Gallery** : Visual moments
- **Contact** : Let's connect! 

## Features
- **Fully Responsive** - Looks great whether you're on your phone or desktop
- **Dark Theme** - Easy on the eyes for those late-night research sessions
- **Interactive Elements** - Smooth animations and engaging user experience
- **Markdown-Powered** - Easily write blog posts and news updates in markdown
- **LaTeX Support** - Because math formulas need to look beautiful too!
- **Syntax Highlighting** - Code blocks that actually make sense

##  Techs used

- **[Next.js 15](https://nextjs.org/)** 
- **[TypeScript](https://www.typescriptlang.org/)** 
- **[Tailwind CSS](https://tailwindcss.com/)** 
- **[Shadcn UI](https://ui.shadcn.com/)** 
- **[ReactMarkdown](https://github.com/remarkjs/react-markdown)** 
- **[KaTeX](https://katex.org/)** 

##  Want to Run This Locally?

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

## Folder structure

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
