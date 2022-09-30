import Logo from '../assets/logo.svg'
import { PlusCircle, Trash } from 'phosphor-react'

export function Home() {
  return (
    <div className="flex flex-col w-full h-screen">
      <header className="flex pt-[4.5rem] pb-20 items-center justify-center bg-gray-700">
        <img src={Logo} alt="" width={126} height={48} />
      </header>

      <main className="flex flex-col max-w-[736px] mx-auto -mt-[27px]">
        <form className="flex gap-2">
          <input
            placeholder="Adicione uma nova tarefa"
            className="flex-1 h-14 rounded-lg p-4 bg-gray-500 b-0 placeholder:text-gray-300"
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
            <li className="flex items-center p-4 bg-gray-500 border-[1px] border-gray-400 rounded-lg gap-4">
              <input type="checkbox" className="" />
              <p className="text-sm flex-1">
                Integer urna interdum massa libero auctor neque turpis turpis
                semper. Duis vel sed fames integer.
              </p>
              <button className="flex mb-auto text-gray-300">
                <Trash size={24} />
              </button>
            </li>

            <li className="flex items-center p-4 bg-gray-500 border-[1px] border-gray-400 rounded-lg gap-4">
              <input type="checkbox" className="" />
              <p className="text-sm flex-1">
                Integer urna interdum massa libero auctor neque turpis turpis
                semper. Duis vel sed fames integer.
              </p>
              <button className="flex mb-auto text-gray-300">
                <Trash size={24} />
              </button>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
