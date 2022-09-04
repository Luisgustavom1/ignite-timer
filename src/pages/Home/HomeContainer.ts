import styled from 'styled-components'

interface IHomeInput {
  isFullScreen?: boolean
}

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
export const FormContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
`
export const HomeInput = styled.input<IHomeInput>`
  background: transparent;
  height: 2.5rem;
  width: ${(props) => (props.isFullScreen ? 'auto' : '4rem')};
  flex: 1;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.colors['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.colors['gray-100']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme.colors['green-500']};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors['gray-500']};
  }

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`
export const CountdownContainer = styled.div`
  font-family: 'Roboto mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme.colors['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme.colors['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  .separator {
    padding: 2rem 0;

    background: none;
    color: ${(props) => props.theme.colors['green-500']};

    width: 4rem;
    overflow: hidden;

    display: flex;
    justify-content: center;
  }
`
export const StartCountdownButton = styled.button`
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

  background: ${(props) => props.theme.colors['green-500']};
  color: ${(props) => props.theme.colors['gray-100']};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme.colors['green-700']};
  }
`
