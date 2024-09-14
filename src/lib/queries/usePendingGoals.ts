import { useQuery } from '@tanstack/react-query'
import { getPendingGoals } from '../../http/getPendingGoals'

export const usePendingGoals = () => {
  return useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
  })
}
