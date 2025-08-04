import { NextRequest, NextResponse } from 'next/server'

// Define types for the request/response
interface ChatRequest {
  message: string
  useAI?: boolean
}

interface ChatResponse {
  response: string
  model?: string
  error?: string
}

// Simple keyword-based chat fallback
function getKeywordResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Personal and contact information
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return "You can reach me at jeremie@aims.ac.za or connect with me on LinkedIn at https://linkedin.com/in/jeremie-mabiala. I'm always open to discussing research collaborations or opportunities!"
  }
  
  if (lowerMessage.includes('ammi') || lowerMessage.includes('aims') || lowerMessage.includes('current') || lowerMessage.includes('work')) {
    return "I'm currently a Resident Tutor at AMMI (African Masters in Machine Intelligence) at AIMS Senegal. AMMI is a rigorous one-year program that trains the next generation of African machine learning researchers and practitioners."
  }
  
  if (lowerMessage.includes('research') || lowerMessage.includes('focus') || lowerMessage.includes('study')) {
    return "My research focuses on mathematical machine learning, particularly Bayesian methods, functional data analysis, and mathematical modeling. I'm interested in developing novel mathematical approaches to AI problems and their applications in various domains."
  }
  
  if (lowerMessage.includes('education') || lowerMessage.includes('background') || lowerMessage.includes('degree')) {
    return "I have a strong background in mathematics and machine learning. I completed my education focusing on mathematical sciences and have specialized in areas like functional data analysis and Bayesian statistics."
  }
  
  if (lowerMessage.includes('programming') || lowerMessage.includes('language') || lowerMessage.includes('tech') || lowerMessage.includes('skills')) {
    return "I'm proficient in Python, R, and have experience with machine learning frameworks like TensorFlow, PyTorch, and scikit-learn. I also work with mathematical software like MATLAB and have experience with data analysis tools."
  }
  
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
    return "I work on various projects involving mathematical modeling, machine learning applications, and educational content. You can check out my projects section on this website to see some of my recent work in functional data analysis and Bayesian methods."
  }
  
  if (lowerMessage.includes('blog') || lowerMessage.includes('tutorial') || lowerMessage.includes('writing')) {
    return "I enjoy sharing knowledge through tutorials and educational content. I write about topics like Gaussian processes, functional data analysis, and machine learning concepts. Check out my blog section for detailed explanations of mathematical and ML concepts!"
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('introduce')) {
    return "Hello! I'm Jérémie N. Mabiala, a mathematical scientist and AI researcher. I'm currently a Resident Tutor at AMMI at AIMS Senegal, where I work on machine learning education and research. How can I help you today?"
  }
  
  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('senegal')) {
    return "I'm currently based in Senegal, working at AIMS (African Institute for Mathematical Sciences) as part of the AMMI program. AIMS Senegal is located in Mbour, about an hour from Dakar."
  }
  
  // Default response
  return "That's an interesting question! I'd be happy to discuss that further. Feel free to contact me directly at jeremie@aims.ac.za, or ask me about my research, work at AMMI, technical skills, or educational background."
}

// Server-side AI chat function (simplified version)
async function getAIResponse(message: string): Promise<string> {
  const apiKey = process.env.HUGGINGFACE_API_KEY
  
  if (!apiKey) {
    throw new Error('AI service not configured')
  }

  const systemPrompt = `You are Jérémie N. Mabiala's personal AI assistant. Respond as if you are Jérémie himself, using first person.

ABOUT JÉRÉMIE:
- Currently a Resident Tutor at AMMI (African Masters in Machine Intelligence) at AIMS Senegal
- Research focus: Mathematical machine learning, Bayesian methods, functional data analysis
- Email: jeremie@aims.ac.za
- LinkedIn: https://linkedin.com/in/jeremie-mabiala
- Technical skills: Python, R, TensorFlow, PyTorch, mathematical modeling
- Passionate about education and sharing knowledge through tutorials

Be conversational, helpful, and accurate. Keep responses concise (2-3 sentences).`

  try {
    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        model: 'meta-llama/Llama-3.3-70B-Instruct:cerebras',
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.'
    
  } catch (error) {
    console.error('AI response failed:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { message, useAI = false } = body

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    let response: string
    let model: string | undefined

    if (useAI && process.env.HUGGINGFACE_API_KEY) {
      try {
        response = await getAIResponse(message)
        model = 'Hugging Face LLM'
      } catch (error) {
        console.warn('AI failed, falling back to keyword response:', error)
        response = getKeywordResponse(message)
        model = 'Keyword-based'
      }
    } else {
      response = getKeywordResponse(message)
      model = 'Keyword-based'
    }

    const chatResponse: ChatResponse = {
      response,
      model
    }

    return NextResponse.json(chatResponse)

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
