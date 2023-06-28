import classNames from 'classnames'
import { forwardRef, ComponentPropsWithoutRef } from 'react'

interface InputUncontrolledProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  name: string
  errorMessage?: string
}

export const Input = forwardRef<HTMLInputElement, InputUncontrolledProps>(
  ({ label, name, errorMessage, ...props }: InputUncontrolledProps, ref) => {
    return (
      <div className="flex flex-1 flex-col gap-2">
        <input
          ref={ref}
          id={name}
          name={name}
          className={classNames(
            'min-h-14 b-0 flex-1 rounded-lg bg-gray-500 p-4 placeholder:text-gray-300',
            {
              'ring-1 ring-red-500 focus:ring-red-500': !!errorMessage,
            },
          )}
          {...props}
        />

        {!!errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
