import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useRecipes } from '@shared/hooks/useRecipes'
import placeholderImage from '@shared/assets/placeholder.svg'
import styles from './styles.module.scss'

export const ListPage: FC = () => {
  const { recipes, loading, error } = useRecipes()

  console.log('Recipes data:', recipes)

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error.message}</div>
  if (!recipes?.length) return <div>Нет рецептов</div>

  return (
    <div className={styles.container}>
      <h1>Список рецептов</h1>
      <div className={styles.grid}>
        {recipes.map(recipe => {
          const imageUrl = recipe.images?.[0]?.formats?.large?.url || 
                         recipe.images?.[0]?.url || 
                         placeholderImage

          return (
            <Link 
              key={recipe.id} 
              to={`/${recipe.documentId}`}
              className={styles.card}
            >
              <img 
                src={imageUrl}
                alt={recipe.name}
                className={styles.image}
              />
              <h2>{recipe.name}</h2>
            </Link>
          )
        })}
      </div>
    </div>
  )
} 