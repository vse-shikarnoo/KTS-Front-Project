import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './styles.module.scss'

export const MainLayout: FC = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>Рецепты</h1>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
} 