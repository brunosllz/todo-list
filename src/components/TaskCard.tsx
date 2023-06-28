import classNames from 'classnames'

import * as Checkbox from '@radix-ui/react-checkbox'

import { Trash, Check } from 'phosphor-react'
import { useStore } from '../store/todo-store'

interface taskCardProps {
  task: {
    id: string
    description: string
    isCompleted: boolean
  }
}

export function TaskCard({ task }: taskCardProps) {
  const { deleteTask, checkTaskHasCompleted } = useStore((store) => {
    return {
      deleteTask: store.delete,
      checkTaskHasCompleted: store.checkHasCompleted,
    }
  })

  function handleCheckTaskHasCompleted() {
    checkTaskHasCompleted(task.id)
  }

  function handleDeleteTask() {
    deleteTask(task.id)
  }

  return (
    <li className="flex items-center gap-4 rounded-lg border-[1px] border-gray-400 bg-gray-500 p-4">
      <Checkbox.Root
        value={task.id}
        defaultChecked={task.isCompleted}
        onCheckedChange={handleCheckTaskHasCompleted}
        className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-blue-500 transition-colors hover:border-blue-700 [&[data-state='checked']]:border-purple-700 [&[data-state='checked']]:bg-purple-700 [&[data-state='checked']]:hover:border-purple-500 [&[data-state='checked']]:hover:bg-purple-500"
      >
        <Checkbox.Indicator className="text-gray-100">
          <Check size={12} weight="bold" />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <p
        className={classNames('flex-1 truncate text-sm', {
          'text-gray-300 line-through': task.isCompleted,
        })}
      >
        {task.description}
      </p>
      <button
        onClick={handleDeleteTask}
        className="mb-auto flex items-center justify-center rounded p-1 text-gray-300 transition-colors hover:bg-gray-400 hover:text-red-500"
      >
        <Trash size={24} />
      </button>
    </li>
  )
}
