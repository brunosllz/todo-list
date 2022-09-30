import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TasksContext } from '../contexts/TasksContext'

export function useCountTasks() {
  const tasks = useContextSelector(TasksContext, (context) => {
    return context.tasks
  })

  const countTasks = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        task && acc.total++

        if (task.isCompleted === true) {
          acc.completedtasktotal += 1
        }

        return acc
      },
      {
        total: 0,
        completedtasktotal: 0,
      },
    )
  }, [tasks])

  return countTasks
}
