import { useContextSelector } from 'use-context-selector'

import { TasksContext } from '../contexts/TasksContext'
import { useCountTasks } from '../hooks/useCountTasks'

import { TaskList } from '../components/TaskList'
import { NewTaskForm } from '../components/NewTaskForm'

import { ClipboardText } from 'phosphor-react'
import Logo from '../assets/logo.svg'

export function Home() {
  const tasks = useContextSelector(TasksContext, (context) => {
    return context.tasks
  })
  const countTasks = useCountTasks()

  const hasTask = tasks.length > 0

  return (
    <div className="flex flex-col w-full h-screen">
      <header className="flex pt-[4.5rem] pb-20 items-center justify-center bg-gray-700">
        <img src={Logo} alt="" width={126} height={48} />
      </header>

      <main className="flex flex-col w-full max-w-[752px] mx-auto -mt-[27px] px-4 pb-16">
        <NewTaskForm />

        <div className="flex flex-col mt-16">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <strong className="text-blue-500 font-bold text-sm">
                Tarefas criadas
              </strong>
              <span className="bg-gray-400 px-2 rounded-full text-xs font-bold py-[2px] leading-none">
                {countTasks.total}
              </span>
            </div>

            <div className="flex gap-2 items-center">
              <strong className="text-purple-500 font-bold text-sm">
                Concluídas
              </strong>
              <span className="bg-gray-400 px-2 rounded-full text-xs font-bold py-[2px]  leading-none">
                {hasTask
                  ? `${countTasks.completedtasktotal} de ${countTasks.total}`
                  : 0}
              </span>
            </div>
          </div>
          {hasTask ? (
            <TaskList />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 border-t-[1px] border-gray-400 mt-6 py-16 text-gray-300">
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
      </main>
    </div>
  )
}
