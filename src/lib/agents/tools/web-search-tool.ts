import { z } from 'zod'
import { createTool } from '@mastra/core'
import Exa from 'exa-js'
import { env } from '$env/dynamic/private'

const webSearchSchema = z.object({
  query: z.string().describe('Company name or search query for research'),
  includeDetails: z.boolean().default(true).describe('Whether to include detailed content from search results'),
  numResults: z.number().default(10).describe('Number of search results to return (max 25)')
})

export const webSearchTool = createTool({
  id: 'web-search',
  description: 'Search the web for comprehensive information about companies using Exa AI',
  inputSchema: webSearchSchema,
  execute: async (context) => {
    const { query, includeDetails, numResults } = context.context
    
    const apiKey = env.EXA_API_KEY
    if (!apiKey) {
      throw new Error('EXA_API_KEY environment variable is not set')
    }

    const exa = new Exa(apiKey)
    
    try {
      // First, search for general company information
      const searchResults = includeDetails 
        ? await exa.searchAndContents(query, {
            numResults: Math.min(numResults, 25),
            text: true
          })
        : await exa.search(query, {
            numResults: Math.min(numResults, 25)
          })

      // If we have results, try to find more specific information
      let financialResults = null
      let newsResults = null
      let aboutResults = null

      if (searchResults.results.length > 0) {
        // Search for financial information
        try {
          financialResults = includeDetails 
            ? await exa.searchAndContents(`${query} financial performance revenue earnings`, {
                numResults: 5,
                text: true
              })
            : await exa.search(`${query} financial performance revenue earnings`, {
                numResults: 5
              })
        } catch (error) {
          console.warn('Financial search failed:', error)
        }

        // Search for recent news
        try {
          newsResults = includeDetails 
            ? await exa.searchAndContents(`${query} news recent updates`, {
                numResults: 5,
                text: true
              })
            : await exa.search(`${query} news recent updates`, {
                numResults: 5
              })
        } catch (error) {
          console.warn('News search failed:', error)
        }

        // Search for company overview/about information
        try {
          aboutResults = includeDetails 
            ? await exa.searchAndContents(`${query} company overview about mission`, {
                numResults: 3,
                text: true
              })
            : await exa.search(`${query} company overview about mission`, {
                numResults: 3
              })
        } catch (error) {
          console.warn('About search failed:', error)
        }
      }

      // Format the comprehensive research report
      const report = {
        query,
        searchType: 'auto',
        totalResults: searchResults.results.length,
        generalInformation: {
          results: searchResults.results.map(result => ({
            title: result.title,
            url: result.url,
            author: result.author || 'Unknown',
            publishedDate: result.publishedDate || 'Unknown',
            summary: 'Content found and processed',
            highlights: [],
            score: result.score || 0,
            text: includeDetails && result.text ? result.text.substring(0, 1000) + '...' : null
          }))
        },
        financialInformation: financialResults ? {
          results: financialResults.results.map(result => ({
            title: result.title,
            url: result.url,
            author: result.author || 'Unknown',
            publishedDate: result.publishedDate || 'Unknown',
            summary: 'Financial content found and processed',
            highlights: [],
            score: result.score || 0,
            text: includeDetails && result.text ? result.text.substring(0, 1000) + '...' : null
          }))
        } : null,
        recentNews: newsResults ? {
          results: newsResults.results.map(result => ({
            title: result.title,
            url: result.url,
            author: result.author || 'Unknown',
            publishedDate: result.publishedDate || 'Unknown',
            summary: 'News content found and processed',
            highlights: [],
            score: result.score || 0,
            text: includeDetails && result.text ? result.text.substring(0, 1000) + '...' : null
          }))
        } : null,
        companyOverview: aboutResults ? {
          results: aboutResults.results.map(result => ({
            title: result.title,
            url: result.url,
            author: result.author || 'Unknown',
            publishedDate: result.publishedDate || 'Unknown',
            summary: 'Company overview content found and processed',
            highlights: [],
            score: result.score || 0,
            text: includeDetails && result.text ? result.text.substring(0, 1000) + '...' : null
          }))
        } : null,
        researchSummary: generateResearchSummary(searchResults, financialResults, newsResults, aboutResults),
        timestamp: new Date().toISOString()
      }

      return { report }
    } catch (error) {
      console.error('Web search failed:', error)
      throw new Error(`Web search failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
})

function generateResearchSummary(
  generalResults: any,
  financialResults: any,
  newsResults: any,
  aboutResults: any
): string {
  const summaries = []
  
  if (generalResults?.results?.length > 0) {
    summaries.push(`Found ${generalResults.results.length} general results about the company.`)
  }
  
  if (financialResults?.results?.length > 0) {
    summaries.push(`Located ${financialResults.results.length} financial-related sources.`)
  }
  
  if (newsResults?.results?.length > 0) {
    summaries.push(`Discovered ${newsResults.results.length} recent news articles.`)
  }
  
  if (aboutResults?.results?.length > 0) {
    summaries.push(`Found ${aboutResults.results.length} company overview sources.`)
  }
  
  return summaries.join(' ') || 'No comprehensive results found for this query.'
}
