import { PlusIcon } from 'lucide-react'
import { OutlineButton } from '../ui/outline-button'
import { usePendingGoals } from '../../lib/queries/usePendingGoals'
import { createGoalCompletion } from '../../http/createGoalCompletion'
import { useQueryClient } from '@tanstack/react-query'

export const PendingGoals = () => {
  const queryClient = useQueryClient()
  const { data: pendingGoals } = usePendingGoals()

  if (!pendingGoals) return null

  const handleCompleteGoal = async (goalId: string) => {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals.map(goal => {
        const goalWasCompleted =
          goal.completionCount >= goal.desiredWeeklyFrequency

        return (
          <OutlineButton
            key={goal.id}
            disabled={goalWasCompleted}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <PlusIcon className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
