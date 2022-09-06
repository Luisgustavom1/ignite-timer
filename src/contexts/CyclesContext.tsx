import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducer } from 'src/reducers/cycles/cycles'
import * as CycleActions from 'src/reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

interface ICyclesContext {
  cycles: Array<Cycle>
  activeCycle?: Cycle
  markCurrentCycleAsFinished: React.Dispatch<void>
  amountSecondsPassed: number
  setAmountSecondsPassed: (value: number) => void
  interruptCycle: () => void
  createNewTask: (data: NewCycleFormData) => void
}

export const CyclesContext = createContext({} as ICyclesContext)

export const CyclesProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )

  const { activeCycleId, cycles } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state', stateJSON)
  }, [cyclesState])

  const createNewTask = (data: NewCycleFormData) => {
    const cycleId = String(new Date().getTime())
    const newCycle: Cycle = {
      id: cycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(CycleActions.addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  const markCurrentCycleAsFinished = () => {
    dispatch(CycleActions.markCurrentCycleAsFinished())
  }

  const interruptCycle = () => {
    dispatch(CycleActions.interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
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
