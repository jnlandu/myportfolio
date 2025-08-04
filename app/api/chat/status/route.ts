import { NextResponse } from 'next/server'

export async function GET() {
  const aiAvailable = !!process.env.HUGGINGFACE_API_KEY
  
  return NextResponse.json({
    aiAvailable,
    model: aiAvailable ? 'Hugging Face LLM' : 'Keyword-based',
    status: 'operational'
  })
}
