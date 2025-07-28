# Blog Comments and Feedback System Setup

This guide will help you set up the complete feedback and comments system for your blog.

## Features Included

1. **Quick Feedback Bar** - Instant reactions (helpful, love it, bookmark) with view counter
2. **Detailed Feedback Form** - Comprehensive feedback collection with ratings and categories
3. **Comments System** - GitHub Discussions-based comments using Giscus

## Quick Setup

### 1. Giscus Comments Setup (GitHub Discussions)

To enable GitHub Discussions-based comments:

1. **Enable GitHub Discussions** in your repository:
   - Go to your GitHub repository: `https://github.com/jnlandu/myportfolio`
   - Go to Settings → General → Features
   - Check "Discussions"

2. **Set up Giscus**:
   - Visit https://giscus.app/
   - Enter your repository: `jnlandu/myportfolio`
   - Choose "Discussion title contains page pathname"
   - Select a discussion category (create "Blog Comments" category if needed)
   - Copy the generated data attributes

3. **Update the BlogComments component**:
   - Open `components/blog-comments.tsx`
   - Replace `YOUR_REPO_ID` and `YOUR_CATEGORY_ID` with values from Giscus
   - The component will automatically handle dark/light theme switching

### 2. Feedback API Integration

The feedback system is already set up with a basic API endpoint at `/api/feedback/route.ts`.

#### Integration Options:

**Option A: Email Notifications (Recommended)**
```bash
pnpm add resend
```

Then update `/app/api/feedback/route.ts` to send emails:

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Add this after logging the feedback
await resend.emails.send({
  from: 'blog@yourdomain.com',
  to: 'your-email@example.com',
  subject: `New Blog Feedback: ${data.title}`,
  html: `
    <h2>New feedback on "${data.title}"</h2>
    <p><strong>Type:</strong> ${data.feedbackType}</p>
    <p><strong>Rating:</strong> ${data.rating}/5 stars</p>
    <p><strong>Feedback:</strong></p>
    <p>${data.feedback}</p>
    <p><strong>From:</strong> ${data.name || 'Anonymous'} (${data.email || 'No email'})</p>
  `
})
```

**Option B: Slack Integration**
```typescript
// Add this to handle feedback
const webhookUrl = process.env.SLACK_WEBHOOK_URL
if (webhookUrl) {
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `New blog feedback on "${data.title}": ${data.feedback.substring(0, 100)}...`
    })
  })
}
```

**Option C: Notion Database**
```bash
pnpm add @notionhq/client
```

**Option D: Airtable**
```bash
pnpm add airtable
```

### 3. Environment Variables

Add these to your `.env.local`:

```bash
# For email notifications (if using Resend)
RESEND_API_KEY=your_resend_api_key

# For Slack notifications (if using)
SLACK_WEBHOOK_URL=your_slack_webhook_url

# For Notion integration (if using)
NOTION_TOKEN=your_notion_token
NOTION_DATABASE_ID=your_database_id
```

## Components Overview

### QuickFeedback
- Instant reactions (helpful, love it, bookmark)
- View counter
- Share functionality
- Data stored in localStorage (can be moved to database)

### BlogFeedback
- Detailed feedback form with ratings
- Categorized feedback types
- Optional contact information
- Integrates with API endpoint

### BlogComments
- GitHub Discussions integration via Giscus
- Automatic theme switching
- Threaded discussions
- Reaction system

## Customization

### Styling
All components use your existing Tailwind classes and follow your dark theme design.

### Feedback Categories
Edit the `feedbackTypes` array in `components/blog-feedback.tsx`:

```typescript
const feedbackTypes = [
  { id: "helpful", label: "Helpful Content", icon: ThumbsUp, color: "bg-green-500" },
  { id: "suggestion", label: "Suggestion", icon: Lightbulb, color: "bg-yellow-500" },
  // Add more categories as needed
]
```

### Quick Reactions
Modify reaction types in `components/quick-feedback.tsx`:

```typescript
const [reactions, setReactions] = useState({
  helpful: 0,
  love: 0,
  bookmark: 0,
  // Add more reaction types
})
```

## Analytics Integration

To track engagement metrics, you can integrate with your analytics platform:

```typescript
// Example: Google Analytics event tracking
gtag('event', 'blog_feedback', {
  'feedback_type': feedbackType,
  'rating': rating,
  'blog_post': slug
})
```

## Database Schema (Optional)

If you want to store feedback in a database instead of just logging:

```sql
CREATE TABLE blog_feedback (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL,
  title TEXT NOT NULL,
  feedback_type VARCHAR(50),
  rating INTEGER,
  feedback TEXT NOT NULL,
  email VARCHAR(255),
  name VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_reactions (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL,
  reaction_type VARCHAR(50) NOT NULL,
  count INTEGER DEFAULT 0,
  UNIQUE(slug, reaction_type)
);
```

## Testing

Test the feedback system:

1. Navigate to any blog post
2. Try the quick reactions (helpful, love it, bookmark)
3. Submit detailed feedback with different categories
4. Check that comments load properly (after Giscus setup)

The feedback should appear in your console logs (or be sent via your chosen integration).
