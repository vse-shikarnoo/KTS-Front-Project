import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  icon?: ReactNode
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        { [styles['button--disabled']]: disabled },
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className={styles.button__icon}>{icon}</span>}
      <span className={styles.button__text}>{children}</span>
    </button>
  )
} 