import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './styles/theme/ThemeProvider'
import { ComposeProviders as Providers } from './components/ComposeProviders'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'

function App() {
  return (
    <Providers with={[ThemeProvider, BrowserRouter]}>
      <Router />
      <GlobalStyle />
    </Providers>
  )
}

export default App
