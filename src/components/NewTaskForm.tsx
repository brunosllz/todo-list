import { useContextSelector } from 'use-context-selector'
import { useForm } from 'react-hook-form'
import { TasksContext } from '../contexts/TasksContext'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { PlusCircle } from 'phosphor-react'

const createNewtaskSchemaValidate = z.object({
  taskDescription: z.string(),
})

type createNewTaskType = z.infer<typeof createNewtaskSchemaValidate>

export function NewTaskForm() {
  const createNewTask = useContextSelector(TasksContext, (context) => {
    return context.createNewTask
  })
  const { handleSubmit, register, reset } = useForm<createNewTaskType>({
    resolver: zodResolver(createNewtaskSchemaValidate),
  })

  function handleCreateNewTask(data: createNewTaskType) {
    createNewTask(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(handleCreateNewTask)} className="flex gap-2">
      <input
        placeholder="Adicione uma nova tarefa"
        className="flex-1 h-14 rounded-lg p-4 bg-gray-500 b-0 placeholder:text-gray-300"
        {...register('taskDescription')}
      />

      <button className="w-[90px] flex gap-2 items-center justify-center bg-blue-700 hover:bg-blue-500 rounded-lg b-0 font-bold text-sm transition-colors">
        Criar
        <PlusCircle size={24} />
      </button>
    </form>
  )
}
