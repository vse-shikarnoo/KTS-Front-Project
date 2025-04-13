import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@app/router'
import { WithChildren } from '@shared/types/app'

export const withProviders = (Component: FC) => {
  return function WithProviders({ children }: WithChildren) {
    return <RouterProvider router={router} />
  }
} 