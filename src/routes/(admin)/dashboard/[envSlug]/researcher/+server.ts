import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { companyResearcherAgent } from '$lib/agents'

export const POST: RequestHandler = async ({ request, locals }) => {
  // Verify user is authenticated
  const { session } = locals.auth
  if (!session) {
    return json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { message } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return json({ error: 'Message is required' }, { status: 400 })
    }

    // Generate response using the agent
    const response = await companyResearcherAgent.generate([
      {
        role: 'user',
        content: message
      }
    ])

    return json({ 
      response: response.text
    })
  } catch (error) {
    console.error('Error in researcher agent:', error)
    return json({ error: 'Internal server error' }, { status: 500 })
  }
}
