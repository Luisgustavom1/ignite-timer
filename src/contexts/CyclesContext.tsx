import React, { createContext, useContext, useState } from 'react'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

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
  interruptCycle: () => void
  createNewTask: (data: NewCycleFormData) => void
}

export const CyclesContext = createContext({} as ICyclesContext)

export const CyclesProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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

  const createNewTask = (data: NewCycleFormData) => {
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

    // reset()
  }

  const interruptCycle = () => {
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

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setAmountSecondsPassed,
        interruptCycle,
        createNewTask,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export const useCycleContext = () => {
  const context = useContext(CyclesContext)

  if (!context) {
    throw Error('Must be inside a CycleProvider')
  }

  return context
}
