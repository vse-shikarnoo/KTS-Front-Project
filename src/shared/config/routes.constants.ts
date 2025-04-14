export const ROUTE_NAMES = {
  HOME: 'home',
  RECIPES: 'recipes',
  RECIPE: 'recipe',
  ABOUT: 'about',
  CONTACTS: 'contacts',
  PROFILE: 'profile',
  FAVORITES: 'favorites',
  SETTINGS: 'settings',
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
} as const

export const ROUTE_TITLES = {
  [ROUTE_NAMES.HOME]: 'Главная',
  [ROUTE_NAMES.RECIPES]: 'Рецепты',
  [ROUTE_NAMES.RECIPE]: 'Рецепт',
  [ROUTE_NAMES.ABOUT]: 'О нас',
  [ROUTE_NAMES.CONTACTS]: 'Контакты',
  [ROUTE_NAMES.PROFILE]: 'Профиль',
  [ROUTE_NAMES.FAVORITES]: 'Избранное',
  [ROUTE_NAMES.SETTINGS]: 'Настройки',
  [ROUTE_NAMES.LOGIN]: 'Вход',
  [ROUTE_NAMES.REGISTER]: 'Регистрация',
  [ROUTE_NAMES.FORGOT_PASSWORD]: 'Восстановление пароля',
  [ROUTE_NAMES.RESET_PASSWORD]: 'Сброс пароля',
} as const 