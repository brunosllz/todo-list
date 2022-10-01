import { ReactNode, useCallback, useEffect, useState } from 'react'
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
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasksState = localStorage.getItem(
      '@todo-list:tasks-state-1.0.0',
    )

    if (storedTasksState) {
      return JSON.parse(storedTasksState)
    }

    return []
  })

  const createNewTask = useCallback(
    ({ taskDescription }: CreateNewTaskType) => {
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
    },
    [],
  )

  const CheckTaskHasCompleted = useCallback(
    (taskId: string) => {
      const updatedTask = tasks.map((task) => ({ ...task }))

      const searchTask = updatedTask.find((task) => task.id === taskId)

      if (!searchTask) {
        return
      }

      Object.assign(searchTask, {
        isCompleted: !searchTask.isCompleted,
      })

      setTasks(updatedTask)

      console.log(updatedTask)
    },
    [tasks],
  )

  const DeleteTask = useCallback(
    (taskId: string) => {
      const deleteTask = tasks.filter((task) => task.id !== taskId)

      setTasks(deleteTask)
    },
    [tasks],
  )

  useEffect(() => {
    const tasksJSON = JSON.stringify(tasks)

    localStorage.setItem('@todo-list:tasks-state-1.0.0', tasksJSON)
  }, [tasks])

  return (
    <TasksContext.Provider
      value={{ tasks, createNewTask, CheckTaskHasCompleted, DeleteTask }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export { TasksContext, TasksProvider }
