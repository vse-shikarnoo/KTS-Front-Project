import React, { FC, memo } from 'react'
import styles from './styles.module.scss'

interface LoadingOverlayProps {
  message?: string
}

export const LoadingOverlay: FC<LoadingOverlayProps> = memo(({ message = 'Загрузка...' }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}>
        <div className={styles.loader}></div>
        <div className={styles.message}>{message}</div>
      </div>
    </div>
  )
}) 