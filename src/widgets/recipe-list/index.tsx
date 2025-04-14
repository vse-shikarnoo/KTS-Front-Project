import React, { FC, memo, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Recipe } from '@entities/recipe/store/recipe-store'
import { useStore } from '@shared/hooks/useStore'
import { LoadingOverlay } from '@shared/ui/loading-overlay'
import styles from './styles.module.scss'

// Изолированный компонент карточки рецепта
const RecipeCard = memo(({ recipe, onNavigate }: { recipe: Recipe; onNavigate: (id: string) => void }) => {
  console.log('[DEBUG] RENDER: RecipeCard', { recipeId: recipe.id })
  
  // Мемоизируем функции для получения данных рецепта, чтобы избежать перерисовок
  const imageUrl = useMemo(() => recipe.images?.[0]?.url, [recipe.images]);
  const initials = useMemo(() => {
    return recipe.name
      .split(' ')
      .slice(0, 2)
      .map(word => word[0])
      .join('');
  }, [recipe.name]);

  const handleClick = () => {
    onNavigate(recipe.documentId);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={recipe.name}
            className={styles.image}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement?.querySelector(`.${styles.imagePlaceholder}`)?.setAttribute('style', 'display: flex');
            }}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>{initials}</span>
          </div>
        )}
      </div>
      <h2>{recipe.name}</h2>
      <div 
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />
      <div className={styles.meta}>
        <span>{recipe.totalTime} мин</span>
      </div>
    </div>
  );
});

// Индикатор поиска, изолированный от других состояний
const SearchingIndicator = observer(() => {
  console.log('[DEBUG] RENDER: SearchingIndicator')
  const { recipeStore } = useStore();
  const isSearching = recipeStore.isSearching;
  
  console.log('[DEBUG] SearchingIndicator state:', { isSearching })
  
  if (!isSearching) return null;
  
  return (
    <div className={styles.searchingOverlay}>
      <div className={styles.searchingSpinner}>Поиск...</div>
    </div>
  );
});

// Компонент для отображения списка рецептов
const RecipeGrid = memo(({ recipes, onNavigate }: { recipes: Recipe[]; onNavigate: (id: string) => void }) => {
  console.log('[DEBUG] RENDER: RecipeGrid', { recipesCount: recipes.length })
  
  if (!recipes.length) {
    return <div className={styles.empty}>Нет рецептов</div>;
  }
  
  return (
    <div className={styles.grid}>
      {recipes.map(recipe => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
});

// Контейнер для управления данными
const RecipeContent = observer(() => {
  console.log('[DEBUG] RENDER: RecipeContent')
  const navigate = useNavigate();
  const { recipeStore } = useStore();
  const { recipes, loading, isSearching } = recipeStore;
  
  console.log('[DEBUG] RecipeContent state:', { 
    recipesCount: recipes.length,
    loading: recipeStore.loading,
    isSearching: recipeStore.isSearching
  })
  
  const handleNavigate = useMemo(() => {
    return (documentId: string) => {
      navigate(`/recipes/${documentId}`);
    };
  }, [navigate]);
  
  return (
    <div className={styles.container}>
      {(loading || isSearching) && <LoadingOverlay message={isSearching ? "Поиск рецептов..." : "Загрузка рецептов..."} />}
      <RecipeGrid recipes={recipes} onNavigate={handleNavigate} />
    </div>
  );
});

// Корневой компонент, максимально изолированный от изменений
export const RecipeList: FC = memo(() => {
  console.log('[DEBUG] RENDER: RecipeList')
  return <RecipeContent />;
}); 