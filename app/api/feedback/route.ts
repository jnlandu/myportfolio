import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.slug || !data.feedback) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with services like Notion, Airtable, etc.
    
    // For now, just log the feedback
    console.log("New blog feedback received:", {
      slug: data.slug,
      title: data.title,
      feedbackType: data.feedbackType,
      rating: data.rating,
      feedback: data.feedback,
      email: data.email,
      name: data.name,
      timestamp: data.timestamp,
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    })

    // Send email notification if Resend is configured
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        const ratingStars = "⭐".repeat(data.rating || 0)
        const feedbackTypeEmoji: Record<string, string> = {
          helpful: "👍",
          suggestion: "💡",
          question: "❓",
          error: "🐛",
          more: "❤️"
        }
        const emoji = feedbackTypeEmoji[data.feedbackType] || "💬"

        await resend.emails.send({
          from: process.env.FROM_EMAIL || "blog@yourdomain.com",
          to: process.env.NOTIFICATION_EMAIL,
          subject: `${emoji} New Blog Feedback: ${data.title}`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; color: white; margin-bottom: 20px;">
                <h1 style="margin: 0; font-size: 24px;">New Blog Feedback</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Someone shared feedback on your blog post</p>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 15px 0; color: #333; font-size: 20px;">${data.title}</h2>
                <div style="display: flex; gap: 20px; margin-bottom: 15px;">
                  <div>
                    <strong style="color: #666;">Type:</strong> 
                    <span style="background: #e9ecef; padding: 4px 8px; border-radius: 4px; font-size: 14px;">
                      ${emoji} ${data.feedbackType}
                    </span>
                  </div>
                  ${data.rating ? `
                  <div>
                    <strong style="color: #666;">Rating:</strong> 
                    <span style="font-size: 18px;">${ratingStars}</span>
                    <span style="color: #666; font-size: 14px;">(${data.rating}/5)</span>
                  </div>
                  ` : ''}
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #667eea;">
                  <strong style="color: #333; display: block; margin-bottom: 8px;">Feedback:</strong>
                  <p style="margin: 0; line-height: 1.6; color: #555;">${data.feedback.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
              
              ${data.name || data.email ? `
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Contact Information</h3>
                ${data.name ? `<p style="margin: 5px 0;"><strong>Name:</strong> ${data.name}</p>` : ''}
                ${data.email ? `<p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #667eea;">${data.email}</a></p>` : ''}
              </div>
              ` : ''}
              
              <div style="padding: 15px; background: #f1f3f4; border-radius: 8px; font-size: 12px; color: #666;">
                <p style="margin: 0;"><strong>Post:</strong> <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${data.slug}" style="color: #667eea;">${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${data.slug}</a></p>
                <p style="margin: 5px 0 0 0;"><strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
              </div>
            </div>
          `
        })
        console.log("Email notification sent successfully")
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError)
        // Don't fail the request if email fails
      }
    }

    // You could also send this to external services:
    // - Email via Resend/SendGrid
    // - Slack webhook
    // - Discord webhook
    // - Notion database
    // - Airtable
    // - Google Sheets
    
    return NextResponse.json(
      { message: "Feedback submitted successfully" },
      { status: 200 }
    )
    
  } catch (error) {
    console.error("Error handling feedback:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
