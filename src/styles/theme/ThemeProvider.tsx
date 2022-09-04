import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { defaultTheme } from './default'

export const ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <StyledThemeProvider theme={defaultTheme}>{children}</StyledThemeProvider>
  )
}
