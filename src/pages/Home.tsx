import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { v4 as uuuidV4 } from 'uuid'

import { TaskCard } from '../components/TaskCard'

import Logo from '../assets/logo.svg'
import { PlusCircle } from 'phosphor-react'

const createNewtaskSchemaValidate = z.object({
  task: z.string(),
})

type createNewTaskType = z.infer<typeof createNewtaskSchemaValidate>

export interface task {
  id: string
  description: string
  isCompleted: boolean
}

export function Home() {
  const [tasks, setTasks] = useState<task[]>([])
  const { handleSubmit, register, reset } = useForm<createNewTaskType>({
    resolver: zodResolver(createNewtaskSchemaValidate),
  })

  function handleCreateNewTask(data: createNewTaskType) {
    setTasks((state) => {
      return [
        {
          id: uuuidV4(),
          description: data.task,
          isCompleted: false,
        },
        ...state,
      ]
    })
    reset()
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <header className="flex pt-[4.5rem] pb-20 items-center justify-center bg-gray-700">
        <img src={Logo} alt="" width={126} height={48} />
      </header>

      <main className="flex flex-col w-full max-w-[736px] mx-auto -mt-[27px]">
        <form
          onSubmit={handleSubmit(handleCreateNewTask)}
          className="flex gap-2"
        >
          <input
            placeholder="Adicione uma nova tarefa"
            className="flex-1 h-14 rounded-lg p-4 bg-gray-500 b-0 placeholder:text-gray-300"
            {...register('task')}
          />

          <button className="w-[90px] flex gap-2 items-center justify-center bg-blue-700 rounded-lg b-0 font-bold text-sm">
            Criar
            <PlusCircle size={24} />
          </button>
        </form>

        <div className="flex flex-col mt-16">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <strong className="text-blue-500 font-bold text-sm">
                Tarefas criadas
              </strong>
              <span className="bg-gray-400 px-2 rounded-full text-xs font-bold py-[2px]">
                5
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <strong className="text-purple-500 font-bold text-sm">
                Concluídas
              </strong>
              <span className="bg-gray-400 px-2 rounded-full text-xs font-bold py-[2px]">
                2 de 5
              </span>
            </div>
          </div>

          <ul className="flex flex-col gap-3 mt-6">
            {tasks.map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  description={task.description}
                  isCompleted={task.isCompleted}
                />
              )
            })}
          </ul>
        </div>
      </main>
    </div>
  )
}
