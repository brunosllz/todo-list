import { useContext } from 'react'
import { TasksContext } from '../../contexts/TasksContext'
import { TaskCard } from './TaskCard'

export function TaskList() {
  const { tasks } = useContext(TasksContext)
  return (
    <ul className="flex flex-col gap-3 mt-6">
      {tasks.map((task) => {
        return <TaskCard key={task.id} task={task} />
      })}
    </ul>
  )
}
