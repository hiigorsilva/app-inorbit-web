import { PlusIcon } from 'lucide-react'
import { DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { LetsStartIllustration } from '../LetsStartIllustration'
import { LogoInOrbit } from '../InOrbitIcon/LogoInOrbit'

export const EmptyGoals = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-8">
      <LogoInOrbit />
      <LetsStartIllustration />
      <p className="max-w-80 text-center text-zinc-400 leading-relaxed">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>
      <div>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
    </div>
  )
}
