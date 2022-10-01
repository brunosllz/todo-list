import { useContextSelector } from 'use-context-selector'
import { useForm, useFormState } from 'react-hook-form'
import { TasksContext } from '../../contexts/TasksContext'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { PlusCircle } from 'phosphor-react'
import { Input } from './Input'

const createNewtaskSchemaValidate = z.object({
  taskDescription: z.string().min(1, 'Informe uma tarefa'),
})

type createNewTaskType = z.infer<typeof createNewtaskSchemaValidate>

export function NewTaskForm() {
  const createNewTask = useContextSelector(TasksContext, (context) => {
    return context.createNewTask
  })

  const { handleSubmit, register, reset, control } = useForm<createNewTaskType>(
    {
      resolver: zodResolver(createNewtaskSchemaValidate),
      defaultValues: {
        taskDescription: '',
      },
    },
  )
  const { errors } = useFormState({ control })

  function handleCreateNewTask(data: createNewTaskType) {
    createNewTask(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewTask)}
      className="flex gap-2 flex-col mobile-m:flex-row"
    >
      <Input
        placeholder="Adicione uma nova tarefa"
        errorMesssage={errors.taskDescription?.message}
        {...register('taskDescription')}
      />

      <button className="w-full mobile-m:w-[5.625rem] h-14 flex gap-2 items-center justify-center bg-blue-700 hover:bg-blue-500 rounded-lg b-0 font-bold text-sm transition-colors">
        Criar
        <PlusCircle size={24} />
      </button>
    </form>
  )
}
