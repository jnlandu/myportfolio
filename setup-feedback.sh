#!/bin/bash

echo "🚀 Setting up Blog Feedback System"
echo "=================================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local file"
    echo ""
    echo "⚠️  IMPORTANT: You need to configure these environment variables:"
    echo "   1. Get a Resend API key from https://resend.com/api-keys"
    echo "   2. Update RESEND_API_KEY in .env.local"
    echo "   3. Update FROM_EMAIL and NOTIFICATION_EMAIL in .env.local"
    echo "   4. Update NEXT_PUBLIC_SITE_URL with your domain"
    echo ""
else
    echo "✅ .env.local already exists"
fi

echo "🔧 Next steps to complete setup:"
echo ""
echo "1. RESEND EMAIL SETUP:"
echo "   • Go to https://resend.com and create a free account"
echo "   • Get your API key from the dashboard"
echo "   • Add it to .env.local as RESEND_API_KEY"
echo ""
echo "2. GISCUS COMMENTS SETUP:"
echo "   • Go to https://github.com/jnlandu/myportfolio/settings"
echo "   • Enable Discussions in the Features section"
echo "   • Visit https://giscus.app/"
echo "   • Enter your repo: jnlandu/myportfolio"
echo "   • Follow the configuration steps"
echo "   • Copy the data-repo-id and data-category-id values"
echo "   • Add them to .env.local"
echo ""
echo "3. TEST THE SYSTEM:"
echo "   • Restart your dev server: pnpm dev"
echo "   • Visit any blog post"
echo "   • Try submitting feedback"
echo "   • Check your email for notifications"
echo ""
echo "📖 For detailed instructions, see BLOG_FEEDBACK_SETUP.md"
