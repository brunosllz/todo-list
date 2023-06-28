import { useStore, useTasksInfo } from '../store/todo-store'

import { TaskCard } from './TaskCard'
import { Header } from './Header'

import { ClipboardText } from 'phosphor-react'

export function TaskList() {
  const { tasks } = useStore((store) => {
    return {
      tasks: store.tasks,
    }
  })
  const { hasTasks } = useTasksInfo()

  return (
    <div>
      <Header />

      {hasTasks ? (
        <ul className="mt-6 flex flex-col gap-3">
          {tasks.map((task) => {
            return <TaskCard key={task.id} task={task} />
          })}
        </ul>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center gap-4 border-t-[1px] border-gray-400 py-16 text-gray-300">
          <ClipboardText size={56} color="#333333" />
          <div className="flex flex-col items-center justify-center">
            <strong className="text-center text-sm mobile-m:text-base">
              Você ainda não tem tarefas cadastradas
            </strong>
            <p className="text-center text-sm mobile-m:text-base">
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
