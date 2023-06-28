import { useForm, useFormState } from 'react-hook-form'
import { useStore } from '../store/todo-store'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { Input } from './Input'

import { PlusCircle } from 'phosphor-react'

const createNewTaskSchemaValidate = z.object({
  taskDescription: z.string().min(1, 'Informe uma tarefa'),
})

type createNewTaskType = z.infer<typeof createNewTaskSchemaValidate>

export function NewTaskForm() {
  const { createNewTask } = useStore((store) => {
    return {
      createNewTask: store.create,
    }
  })

  const { handleSubmit, register, reset, control } = useForm<createNewTaskType>(
    {
      resolver: zodResolver(createNewTaskSchemaValidate),
      defaultValues: {
        taskDescription: '',
      },
    },
  )
  const { errors } = useFormState({ control })

  function handleCreateNewTask({ taskDescription }: createNewTaskType) {
    createNewTask({
      description: taskDescription,
    })

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewTask)}
      className="flex flex-col gap-2 mobile-m:flex-row"
    >
      <Input
        placeholder="Adicione uma nova tarefa"
        errorMessage={errors.taskDescription?.message}
        {...register('taskDescription')}
      />

      <button className="b-0 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 text-sm font-bold transition-colors hover:bg-blue-500 mobile-m:w-[5.625rem]">
        Criar
        <PlusCircle size={24} />
      </button>
    </form>
  )
}
