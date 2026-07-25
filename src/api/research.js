import axios from 'axios'
import { mockResponse } from '../data/mockResponse'

// Flip to false once the backend team's endpoint is live.
const USE_MOCK = true
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Kicks off the multi-agent research + verification pipeline.
 * @param {string} question
 * @returns {Promise<object>} shape documented in src/data/mockResponse.js
 */
export async function runResearch(question) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 3600))
    return { ...mockResponse, question }
  }

  const { data } = await client.post('/api/research', { question })
  return data
}

export default client
