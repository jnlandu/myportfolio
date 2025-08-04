# Deployment Configuration

## Environment Variables for Production

When deploying to Vercel, Netlify, or other platforms, make sure to set these environment variables:

### Required for Chat Feature
```bash
HUGGINGFACE_API_KEY=your_hugging_face_api_key
```

### Optional Advanced Features
```bash
# Only set these if you want to enable RAG functionality
RAG_ENABLED=false
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=portfolio-rag
OPENAI_API_KEY=your_openai_api_key
```

## Build Configuration

The project is configured to work with serverless deployments out of the box. The chat functionality will automatically fall back to keyword-based responses if AI services are not configured.

## Performance Notes

- The chat feature uses API routes to keep server-side dependencies separate from the client bundle
- All external AI service calls are made server-side to protect API keys
- The application includes proper error handling and graceful degradation

## Deployment Checklist

- [ ] Set environment variables in your deployment platform
- [ ] Test the chat functionality works (it should fall back gracefully)
- [ ] Verify all pages load correctly
- [ ] Check that the blog posts render properly
- [ ] Ensure the site is responsive on mobile devices
