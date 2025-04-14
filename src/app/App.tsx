import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from '@app/providers/store-provider/StoreProvider'
import { MainLayout } from '@app/layouts/MainLayout'
import { ListPage } from '@pages/list'
import { DetailPage } from '@pages/detail'
import { NotFoundPage } from '@pages/not-found'
import '@shared/styles/global.scss'

const App: FC = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ListPage />} />
            <Route path="recipes/:documentId" element={<DetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  )
}

export default App 