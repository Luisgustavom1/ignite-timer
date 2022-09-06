import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormContainer, HomeContainer, BaseCountdownButton } from './styles'
import NewCycleForm from 'src/pages/Home/components/NewCycleForm'
import Coutdown from './components/Coutdown'
import { useCycleContext } from 'src/contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa de ser no mínimo 5 minutos')
    .max(60, 'O ciclo precisa de ser no máximo 60 minutos'),
  task: zod.string().min(1, 'Informe a tarefa'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

const Home = () => {
  const { createNewTask, interruptCycle, activeCycle } = useCycleContext()
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { watch, handleSubmit, reset } = newCycleForm

  const handleCreateNewTask = (data: NewCycleFormData) => {
    createNewTask(data)

    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <FormContainer onSubmit={handleSubmit(handleCreateNewTask)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Coutdown />

        {activeCycle ? (
          <BaseCountdownButton
            variant="interrupt"
            type="button"
            onClick={interruptCycle}
          >
            <HandPalm size={24} />
            Interromper
          </BaseCountdownButton>
        ) : (
          <BaseCountdownButton
            variant="active"
            disabled={isSubmitDisabled}
            type="submit"
          >
            <Play size={24} />
            Começar
          </BaseCountdownButton>
        )}
      </FormContainer>
    </HomeContainer>
  )
}
export default Home
