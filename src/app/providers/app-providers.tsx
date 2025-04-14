import { FC, PropsWithChildren } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@app/router'

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return <RouterProvider router={router} />
} 