import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@app/router'
import '@shared/styles/global.scss'

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App 