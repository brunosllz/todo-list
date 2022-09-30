import { ReactNode, useState } from 'react'
import { createContext } from 'use-context-selector'
import { v4 as uuuidV4 } from 'uuid'

interface Task {
  id: string
  description: string
  isCompleted: boolean
}

interface CreateNewTaskType {
  taskDescription: string
}

interface TasksContextProps {
  tasks: Task[]
  createNewTask: (data: CreateNewTaskType) => void
  CheckTaskHasCompleted: (taskId: string) => void
  DeleteTask: (taskId: string) => void
}

const TasksContext = createContext({} as TasksContextProps)

interface TasksProviderProps {
  children: ReactNode
}

function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])

  function createNewTask({ taskDescription }: CreateNewTaskType) {
    setTasks((state) => {
      return [
        {
          id: uuuidV4(),
          description: taskDescription,
          isCompleted: false,
        },
        ...state,
      ]
    })
  }

  function CheckTaskHasCompleted(taskId: string) {
    const updatedTask = tasks.map((task) => ({ ...task }))

    const searchTask = updatedTask.find((task) => task.id === taskId)

    if (!searchTask) {
      return
    }

    searchTask.isCompleted = !searchTask.isCompleted
    setTasks(updatedTask)
  }

  function DeleteTask(taskId: string) {
    const deleteTask = tasks.filter((task) => task.id !== taskId)

    setTasks(deleteTask)
  }

  return (
    <TasksContext.Provider
      value={{ tasks, createNewTask, CheckTaskHasCompleted, DeleteTask }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export { TasksContext, TasksProvider }
