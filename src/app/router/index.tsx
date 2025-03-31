import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@app/layouts/MainLayout'
import { ListPage } from '@pages/list'
import { DetailPage } from '@pages/detail'
import { NotFoundPage } from '@pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <ListPage />,
      },
      {
        path: ':documentId',
        element: <DetailPage />,
      },
    ],
  },
]) 