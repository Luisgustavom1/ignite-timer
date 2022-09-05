import styled from 'styled-components'

export const HomeContainer = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
`

const COUNTDOWN_BUTTON_COLORS = {
  active: 'green',
  interrupt: 'red',
} as const

interface IBaseCountdownButtonProps {
  variant: keyof typeof COUNTDOWN_BUTTON_COLORS
}

export const BaseCountdownButton = styled.button<IBaseCountdownButtonProps>`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  background: ${(props) =>
    props.theme.colors[`${COUNTDOWN_BUTTON_COLORS[props.variant]}-500`]};
  color: ${(props) => props.theme.colors['gray-100']};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:not(:disabled):hover {
    background: ${(props) =>
      props.theme.colors[`${COUNTDOWN_BUTTON_COLORS[props.variant]}-700`]};
  }
`
