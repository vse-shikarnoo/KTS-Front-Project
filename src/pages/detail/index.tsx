import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useRecipe } from '@shared/hooks/useRecipe'
import styles from './styles.module.scss'

export const DetailPage: FC = () => {
  const { documentId } = useParams<{ documentId: string }>()
  const { recipe, loading, error } = useRecipe(documentId)

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error.message}</div>
  }

  if (!recipe) {
    return <div className={styles.notFound}>Рецепт не найден</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{recipe.name}</h1>
        <div className={styles.meta}>
          <span>Время приготовления: {recipe.totalTime} мин</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          {recipe.images && recipe.images.length > 0 ? (
            <img 
              src={recipe.images[0].url} 
              alt={recipe.name} 
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>{recipe.name && recipe.name.length > 0 ? recipe.name[0] : '?'}</span>
            </div>
          )}
        </div>

        <div className={styles.description}>
          <h2>Описание</h2>
          <div 
            dangerouslySetInnerHTML={{ 
              __html: recipe.summary 
            }} 
          />
        </div>
      </div>
    </div>
  )
} 