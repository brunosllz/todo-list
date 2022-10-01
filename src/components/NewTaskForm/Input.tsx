import classNames from 'classnames'
import { forwardRef, ComponentPropsWithoutRef } from 'react'

interface InputUncontrollerProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  name: string
  errorMesssage?: string
}

export const Input = forwardRef<HTMLInputElement, InputUncontrollerProps>(
  ({ label, name, errorMesssage, ...props }: InputUncontrollerProps, ref) => {
    return (
      <div className="flex flex-col flex-1 gap-2">
        <input
          ref={ref}
          id={name}
          name={name}
          className={classNames(
            'flex-1 min-h-14 rounded-lg p-4 bg-gray-500 b-0 placeholder:text-gray-300',
            {
              'ring-1 ring-red-500 focus:ring-red-500': !!errorMesssage,
            },
          )}
          {...props}
        />

        {!!errorMesssage && (
          <p className="text-sm text-red-500">{errorMesssage}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
