import { useCallback, useState } from 'react'
import { runResearch } from '../api/research'

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

export function useResearch() {
  const [status, setStatus] = useState(STATUS.IDLE)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const submitQuestion = useCallback(async (question) => {
    if (!question || !question.trim()) return
    setStatus(STATUS.LOADING)
    setError(null)
    try {
      const result = await runResearch(question.trim())
      setData(result)
      setStatus(STATUS.SUCCESS)
    } catch (err) {
      setError(err?.message || 'Something went wrong while verifying this question.')
      setStatus(STATUS.ERROR)
    }
  }, [])

  const reset = useCallback(() => {
    setStatus(STATUS.IDLE)
    setData(null)
    setError(null)
  }, [])

  return { status, data, error, submitQuestion, reset }
}
