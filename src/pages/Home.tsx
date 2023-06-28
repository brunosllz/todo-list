import { useEffect } from 'react'
import { useStore } from '../store/todo-store'

import { TaskList } from '../components/TaskList'
import { NewTaskForm } from '../components/NewTaskForm'

import Logo from '../assets/logo.svg'

export function Home() {
  const { load } = useStore((store) => {
    return {
      load: store.load,
    }
  })

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex items-center justify-center bg-gray-700 pt-[4.5rem] pb-20">
        <img src={Logo} alt="" width={126} height={48} />
      </header>

      <main className="mx-auto -mt-[27px] flex w-full max-w-[752px] flex-col px-4 pb-16">
        <NewTaskForm />

        <div className="mt-16 flex flex-col">
          <TaskList />
        </div>
      </main>
    </div>
  )
}
