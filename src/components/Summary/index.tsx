import { CheckCircle2Icon, PlusIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'
import { InOrbitIcon } from '../InOrbitIcon/InOrbitIcon'
import { Progress, ProgressIndicator } from '../ui/progress-bar'
import { Separator } from '../ui/separator'
import { useSummary } from '../../lib/queries/useSummary'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'
import { PendingGoals } from '../PendingGoals'

dayjs.locale(ptBR)

export const Summary = () => {
  const { data: summary } = useSummary()

  if (!summary) return null

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = (summary.completed * 100) / summary.total

  return (
    <div className="max-w-lg flex flex-col gap-6 px-5 py-10 mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="font-semibold text-lg capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <PlusIcon className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={summary.completed} max={summary.total}>
          <ProgressIndicator
            style={{
              width: `${completedPercentage}%`,
              transition: 'all .3s ease-out',
            }}
          />
        </Progress>

        <div className="flex justify-between items-center text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{summary.completed}</span> de{' '}
            <span className="text-zinc-100">{summary.total}</span> metas nessa
            semana.
          </span>
          <span>{Math.round(completedPercentage)}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(summary.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd')
          const formattedDate = dayjs(date).format('D[ de ]MMMM')

          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium">
                <span className="capitalize">{weekDay}</span>{' '}
                <span className="text-xs text-zinc-400">({formattedDate})</span>
              </h3>

              <ul className="flex flex-col gap-3">
                {goals.map(goal => {
                  const time = dayjs(goal.completedAt).format('HH[h]mm')

                  return (
                    <li
                      key={goal.id}
                      className="flex items-center gap-2 p-2 rounded-md bg-zinc-900/25 border border-zinc-800/50"
                    >
                      <CheckCircle2Icon className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{' '}
                        <span className="text-zinc-100">{time}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
