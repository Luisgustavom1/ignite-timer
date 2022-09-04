import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  FormContent,
  HomeContainer,
  HomeInput,
  StartCountdownButton,
} from './HomeContainer'

const Home = () => {
  return (
    <HomeContainer>
      <FormContainer>
        <FormContent>
          <label htmlFor="task">Vou trabalhar em</label>
          <HomeInput
            type="text"
            id="task"
            isFullScreen
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
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
            id="minutesAmount"
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

        <StartCountdownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </FormContainer>
    </HomeContainer>
  )
}
export default Home
