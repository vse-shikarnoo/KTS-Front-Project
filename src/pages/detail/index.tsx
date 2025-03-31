import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useRecipe } from '@shared/hooks/useRecipe'
import placeholderImage from '@shared/assets/placeholder.svg'
import styles from './styles.module.scss'

export const DetailPage: FC = () => {
  const { documentId } = useParams<{ documentId: string }>()
  const { recipe, loading, error } = useRecipe(documentId || '')

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error.message}</div>
  if (!recipe) return <div>Рецепт не найден</div>

  const imageUrl = recipe.images?.[0]?.formats?.large?.url || 
                  recipe.images?.[0]?.url || 
                  placeholderImage

  return (
    <div className={styles.container}>
      <h1>{recipe.name}</h1>
      <div className={styles.content}>
        <img 
          src={imageUrl} 
          alt={recipe.name}
          className={styles.image}
        />
        <div className={styles.info}>
          <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          <div className={styles.details}>
            <p>Время приготовления: {recipe.totalTime} минут</p>
            {recipe.servings && <p>Порций: {recipe.servings}</p>}
            {recipe.calories && <p>Калорий: {recipe.calories}</p>}
          </div>
        </div>
      </div>
    </div>
  )
} 