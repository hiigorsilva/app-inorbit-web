import { XIcon } from 'lucide-react'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '../ui/radio-group'
import { Button } from '../ui/button'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { NumberRepeatPerWeek } from './NumberRepeatPerWeek'
import { createGoal } from '../../http/createGoal'
import { useQueryClient } from '@tanstack/react-query'

const createGoaForm = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalForm = z.infer<typeof createGoaForm>

export const CreateGoal = () => {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoaForm),
    })

  const handleCreateGoal = async (data: CreateGoalForm) => {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    })

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

    reset()
  }

  return (
    <DialogContent className="overflow-y-auto">
      <div className="h-full flex flex-col gap-6">
        <div className="h-full flex flex-col gap-3 overflow-y-auto pr-2">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <XIcon className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>

          <form
            onSubmit={handleSubmit(handleCreateGoal)}
            className="flex flex-1 flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Qual a atividade?</Label>
                <Input
                  id="title"
                  type="text"
                  autoFocus
                  placeholder="Praticar exercícios, meditar, etc..."
                  {...register('title')}
                />
                {formState.errors.title && (
                  <p className="text-red-400 text-sm">
                    {formState.errors.title.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Quantas vezes na semana?</Label>
                <Controller
                  control={control}
                  defaultValue={3}
                  name="desiredWeeklyFrequency"
                  render={({ field }) => {
                    return (
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={String(field.value)}
                      >
                        {NumberRepeatPerWeek.map(repeat => (
                          <RadioGroupItem
                            key={repeat.repeatGoal}
                            value={repeat.repeatGoal}
                          >
                            <RadioGroupIndicator />
                            <span className="font-medium text-sm text-zinc-400 leading-none">
                              {repeat.repeatGoal}x na semana
                            </span>
                            <span className="text-lg leading-none">
                              {repeat.emoji}
                            </span>
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    )
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DialogClose asChild>
                <Button type="button" className="flex-1" variant="secondary">
                  Fechar
                </Button>
              </DialogClose>

              <Button className="flex-1">Salvar</Button>
            </div>
          </form>
        </div>
      </div>
    </DialogContent>
  )
}
