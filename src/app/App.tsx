import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@app/router'
import '@app/styles/index.scss'

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App 