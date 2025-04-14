import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useRecipes } from '@shared/hooks/useRecipes'
import placeholderImage from '@shared/assets/placeholder.svg'
import styles from './styles.module.scss'
import { RecipeList } from '@widgets/recipe-list'

export const ListPage: FC = () => {
  const { recipes, loading, error } = useRecipes()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return <RecipeList recipes={recipes} />
} 