import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Recipe } from '@entities/recipe/store/recipe-store'
import styles from './styles.module.scss'

interface RecipeGridProps {
  recipes: Recipe[]
}

export const RecipeGrid: FC<RecipeGridProps> = observer(({ recipes }) => {
  const navigate = useNavigate()

  const getInitials = (name: string) => {
    return name.split(' ').slice(0, 2).map(word => word[0]).join('')
  }

  const getImageUrl = (recipe: Recipe) => {
    return recipe.images?.[0]?.url
  }

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipes/${recipe.documentId}`)
  }

  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className={styles.card}
          onClick={() => handleRecipeClick(recipe)}
        >
          <div className={styles.imageWrapper}>
            {getImageUrl(recipe) ? (
              <img 
                src={getImageUrl(recipe)} 
                alt={recipe.name}
                className={styles.image}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.parentElement?.querySelector(`.${styles.imagePlaceholder}`)?.setAttribute('style', 'display: flex')
                }}
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <span>{getInitials(recipe.name)}</span>
              </div>
            )}
          </div>
          <h2>{recipe.name}</h2>
          <p>{recipe.summary}</p>
          <div className={styles.meta}>
            <span>{recipe.totalTime} мин</span>
          </div>
        </div>
      ))}
    </div>
  )
}) 