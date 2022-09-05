import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  CountdownContainer,
  FormContainer,
  FormContent,
  HomeContainer,
  HomeInput,
  StartCountdownButton,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa de ser no mínimo 5 minutos')
    .max(60, 'O ciclo precisa de ser no máximo 60 minutos'),
  task: zod.string().min(1, 'Informe a tarefa'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

const Home = () => {
  const { register, watch, handleSubmit, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const handleCreateNewTask = (data: NewCycleFormData) => {
    console.log('data', data)

    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <FormContainer onSubmit={handleSubmit(handleCreateNewTask)} action="">
        <FormContent>
          <label htmlFor="task">Vou trabalhar em</label>
          <HomeInput
            type="text"
            id="task"
            isFullScreen
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
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
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <p>minutos.</p>
        </FormContent>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <span className="separator">:</span>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </FormContainer>
    </HomeContainer>
  )
}
export default Home
