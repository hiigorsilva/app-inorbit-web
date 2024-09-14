import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../../http/getSummary'

export const useSummary = () => {
  return useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
  })
}
