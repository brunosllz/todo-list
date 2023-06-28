import { create } from 'zustand'
import { v4 as uuidV4 } from 'uuid'

type Task = {
  id: string
  description: string
  isCompleted: boolean
}
type CreateNewTaskType = {
  description: string
}

type TodoState = {
  load: () => void
  tasks: Task[]
  create: (data: CreateNewTaskType) => void
  checkHasCompleted: (taskId: string) => void
  delete: (taskId: string) => void
}

export const useStore = create<TodoState>((set, get) => {
  return {
    tasks: [],
    create: ({ description }: CreateNewTaskType) => {
      const newTask = {
        id: uuidV4(),
        description,
        isCompleted: false,
      }

      set({
        tasks: [newTask, ...get().tasks],
      })

      localStorage.setItem(
        '@todo-list:tasks-state-1.0.0',
        JSON.stringify(get().tasks),
      )
    },
    checkHasCompleted: (taskId: string) => {
      const { tasks } = get()

      const updatedTask = tasks.map((task) => ({ ...task }))

      const searchTask = updatedTask.find((task) => task.id === taskId)

      if (!searchTask) {
        return
      }

      Object.assign(searchTask, {
        isCompleted: !searchTask.isCompleted,
      })

      set({
        tasks: updatedTask,
      })

      localStorage.setItem(
        '@todo-list:tasks-state-1.0.0',
        JSON.stringify(get().tasks),
      )
    },
    delete: (taskId: string) => {
      const { tasks } = get()

      const deleteTask = tasks.filter((task) => task.id !== taskId)

      set({
        tasks: deleteTask,
      })

      localStorage.setItem(
        '@todo-list:tasks-state-1.0.0',
        JSON.stringify(get().tasks),
      )
    },
    load: () => {
      const localStorageTasks = localStorage.getItem(
        '@todo-list:tasks-state-1.0.0',
      )

      if (localStorageTasks) {
        const tasksParsed = JSON.parse(localStorageTasks) as Task[]

        return set({
          tasks: tasksParsed,
        })
      }
    },
  }
})

export const useTasksInfo = () => {
  const { tasks } = useStore((store) => {
    return {
      tasks: store.tasks,
    }
  })

  const hasTasks = tasks.length > 0

  const { completedTasksTotal, totalTasks } = tasks.reduce(
    (acc, task) => {
      task && acc.totalTasks++

      if (task.isCompleted === true) {
        acc.completedTasksTotal += 1
      }

      return acc
    },
    {
      totalTasks: 0,
      completedTasksTotal: 0,
    },
  )

  return {
    hasTasks,
    totalTasks,
    completedTasksTotal,
  }
}
