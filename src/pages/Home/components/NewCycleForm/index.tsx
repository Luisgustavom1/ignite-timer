import { useFormContext } from 'react-hook-form'
import { useCycleContext } from 'src/contexts/CyclesContext'
import { FormContent, HomeInput } from './styles'

const NewCycleForm = () => {
  const { activeCycle } = useCycleContext()
  const { register } = useFormContext()
  return (
    <FormContent>
      <label htmlFor="task">Vou trabalhar em</label>
      <HomeInput
        type="text"
        id="task"
        isFullScreen
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1"></option>
        <option value="Projeto 2"></option>
        <option value="Projeto 3"></option>
        <option value="Projeto 4"></option>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <HomeInput
        step={5}
        min={5}
        max={60}
        type="number"
        placeholder="05"
        id="minutesAmount"
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <p>minutos.</p>
    </FormContent>
  )
}
export default NewCycleForm
