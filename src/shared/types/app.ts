export type AppProps = {
  children?: React.ReactNode
}

export type WithChildren<T = {}> = T & {
  children?: React.ReactNode
} 