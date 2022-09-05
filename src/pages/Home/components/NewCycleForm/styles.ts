import styled from 'styled-components'

interface IHomeInputProps {
  isFullScreen?: boolean
}

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
export const HomeInput = styled.input<IHomeInputProps>`
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
