import { TasksProvider } from './contexts/TasksContext'
import { Home } from './pages/Home'

export function App() {
  return (
    <TasksProvider>
      <Home />
    </TasksProvider>
  )
}
