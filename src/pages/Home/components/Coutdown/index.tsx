import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { useCycleContext } from 'src/contexts/CyclesContext'
import { CountdownContainer } from './styles'

const Coutdown = () => {
  const {
    activeCycle,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setAmountSecondsPassed,
  } = useCycleContext()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const secondsAmount = currentSeconds % 60
  const minutesAmount = Math.floor(currentSeconds / 60)

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      if (amountSecondsPassed > totalSeconds) {
        markCurrentCycleAsFinished()
        return
      }

      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setAmountSecondsPassed,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Ignite timer'
    }
  }, [minutes, seconds, activeCycle])
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <span className="separator">:</span>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
export default Coutdown
