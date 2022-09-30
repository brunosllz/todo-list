import * as Checkbox from '@radix-ui/react-checkbox'

import { Trash, Check } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { TasksContext } from '../../contexts/TasksContext'

interface taskCardProps {
  task: {
    id: string
    description: string
    isCompleted: boolean
  }
}

export function TaskCard({ task }: taskCardProps) {
  const { CheckTaskHasCompleted, DeleteTask } = useContextSelector(
    TasksContext,
    (context) => {
      return context
    },
  )

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
        className="w-5 h-5 rounded-full border-2 border-blue-500 hover:border-blue-700 [&[data-state='checked']]:border-purple-700 [&[data-state='checked']]:hover:border-purple-500 flex items-center justify-center [&[data-state='checked']]:bg-purple-700 [&[data-state='checked']]:hover:bg-purple-500 transition-colors"
      >
        <Checkbox.Indicator className="text-gray-100">
          <Check size={12} weight="bold" />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <p className="text-sm flex-1">{task.description}</p>
      <button
        onClick={handleDeleteTask}
        className="flex mb-auto text-gray-300 hover:text-red-500 transition-colors hover:bg-gray-400 items-center justify-center p-1 rounded"
      >
        <Trash size={24} />
      </button>
    </li>
  )
}
