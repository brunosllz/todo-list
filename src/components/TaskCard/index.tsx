import * as Checkbox from '@radix-ui/react-checkbox'

import { Trash, Check } from 'phosphor-react'
import { useContext } from 'react'
import { TasksContext } from '../../contexts/TasksContext'

interface taskCardProps {
  task: {
    id: string
    description: string
    isCompleted: boolean
  }
}

export function TaskCard({ task }: taskCardProps) {
  const { CheckTaskHasCompleted, DeleteTask } = useContext(TasksContext)

  function handleCkeckTaskHasCompleted() {
    CheckTaskHasCompleted(task.id)
  }

  function handleDeleteTask() {
    DeleteTask(task.id)
  }

  return (
    <li className="flex items-center p-4 bg-gray-500 border-[1px] border-gray-400 rounded-lg gap-4">
      <Checkbox.Root
        value={task.id}
        onCheckedChange={handleCkeckTaskHasCompleted}
        className="w-5 h-5 rounded-full border-2 border-blue-500 [&[data-state='checked']]:border-purple-700 flex items-center justify-center [&[data-state='checked']]:bg-purple-700 transition-colors"
      >
        <Checkbox.Indicator className="text-gray-100">
          <Check size={12} weight="bold" />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <p className="text-sm flex-1">{task.description}</p>
      <button onClick={handleDeleteTask} className="flex mb-auto text-gray-300">
        <Trash size={24} />
      </button>
    </li>
  )
}
