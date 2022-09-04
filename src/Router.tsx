import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from 'src/layouts/DefaultLayout'
import History from 'src/pages/History'
import Home from 'src/pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
