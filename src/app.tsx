import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/CreateGoal'
import { Summary } from './components/Summary'
import { EmptyGoals } from './components/EmptyGoals'
import { useSummary } from './lib/queries/useSummary'

export const App = () => {
  const { data: summary } = useSummary()

  if (!summary) return null

  return (
    <Dialog>
      {summary.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
