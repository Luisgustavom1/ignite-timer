import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './styles/theme/ThemeProvider'
import { ComposeProviders as Providers } from './components/ComposeProviders'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { CyclesProvider } from './contexts/CyclesContext'

function App() {
  return (
    <Providers with={[ThemeProvider, BrowserRouter, CyclesProvider]}>
      <Router />
      <GlobalStyle />
    </Providers>
  )
}

export default App
