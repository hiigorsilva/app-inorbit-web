import type { PendingGoalsResponse } from '../types/PendingGoalsResponse'

export const getPendingGoals = async (): Promise<PendingGoalsResponse> => {
  const response = await fetch('http://localhost:3333/pending-goals')
  const data = await response.json()
  return data.pendingGoals
}
