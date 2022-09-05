import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormContainer, HomeContainer, BaseCountdownButton } from './styles'
import React, { createContext, useState } from 'react'
import NewCycleForm from 'src/pages/Home/components/NewCycleForm'
import Coutdown from './components/Coutdown'

const newCycleFormValidationSchema = zod.object({
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa de ser no mínimo 5 minutos')
    .max(60, 'O ciclo precisa de ser no máximo 60 minutos'),
  task: zod.string().min(1, 'Informe a tarefa'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface ICyclesContext {
  activeCycle?: Cycle
  markCurrentCycleAsFinished: React.Dispatch<void>
  amountSecondsPassed: number
  setAmountSecondsPassed: (value: number) => void
}

export const CyclesContext = createContext({} as ICyclesContext)

const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { watch, handleSubmit, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const markCurrentCycleAsFinished = () => {
    setCycles((prevCycles) =>
      prevCycles.map((cycle) =>
        cycle.id === activeCycleId
          ? {
              ...cycle,
              finishedDate: new Date(),
            }
          : cycle,
      ),
    )
    setActiveCycleId(null)
  }

  const handleInterrupCycle = () => {
    setCycles((prevCycles) =>
      prevCycles.map((cycle) =>
        cycle.id === activeCycleId
          ? {
              ...cycle,
              interruptDate: new Date(),
            }
          : cycle,
      ),
    )

    setActiveCycleId(null)
  }

  const handleCreateNewTask = (data: NewCycleFormData) => {
    const cycleId = String(new Date().getTime())
    const newCycle: Cycle = {
      id: cycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((prevState) => [...prevState, newCycle])
    setActiveCycleId(cycleId)
    setAmountSecondsPassed(0)

    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setAmountSecondsPassed,
      }}
    >
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
              onClick={handleInterrupCycle}
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
    </CyclesContext.Provider>
  )
}
export default Home
