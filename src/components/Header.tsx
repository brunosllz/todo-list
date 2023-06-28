import { useTasksInfo } from '../store/todo-store'

export function Header() {
  const { hasTasks, completedTasksTotal, totalTasks } = useTasksInfo()

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <strong className="text-sm font-bold text-blue-500">
          Tarefas criadas
        </strong>
        <span className="rounded-full bg-gray-400 px-2 py-[2px] text-xs font-bold leading-none">
          {totalTasks}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <strong className="text-sm font-bold text-purple-500">
          Concluídas
        </strong>
        <span className="rounded-full bg-gray-400 px-2 py-[2px] text-xs font-bold  leading-none">
          {hasTasks ? `${completedTasksTotal} de ${totalTasks}` : 0}
        </span>
      </div>
    </div>
  )
}
