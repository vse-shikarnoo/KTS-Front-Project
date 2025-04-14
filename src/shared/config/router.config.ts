import { lazy } from 'react'
import { ROUTES } from './routes'
import { ROUTE_NAMES } from './routes.constants'

// Импорты страниц с ленивой загрузкой
const HomePage = lazy(() => import('@pages/Home'))
const RecipesPage = lazy(() => import('@pages/Recipes'))
const RecipePage = lazy(() => import('@pages/Recipe'))
const AboutPage = lazy(() => import('@pages/About'))
const ContactsPage = lazy(() => import('@pages/Contacts'))
const ProfilePage = lazy(() => import('@pages/Profile'))
const FavoritesPage = lazy(() => import('@pages/Favorites'))
const SettingsPage = lazy(() => import('@pages/Settings'))
const LoginPage = lazy(() => import('@pages/Login'))
const RegisterPage = lazy(() => import('@pages/Register'))
const ForgotPasswordPage = lazy(() => import('@pages/ForgotPassword'))
const ResetPasswordPage = lazy(() => import('@pages/ResetPassword'))

export const routerConfig = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    name: ROUTE_NAMES.HOME,
  },
  {
    path: ROUTES.RECIPES,
    element: <RecipesPage />,
    name: ROUTE_NAMES.RECIPES,
  },
  {
    path: ROUTES.RECIPE(':id'),
    element: <RecipePage />,
    name: ROUTE_NAMES.RECIPE,
  },
  {
    path: ROUTES.ABOUT,
    element: <AboutPage />,
    name: ROUTE_NAMES.ABOUT,
  },
  {
    path: ROUTES.CONTACTS,
    element: <ContactsPage />,
    name: ROUTE_NAMES.CONTACTS,
  },
  {
    path: ROUTES.PROFILE,
    element: <ProfilePage />,
    name: ROUTE_NAMES.PROFILE,
    isPrivate: true,
  },
  {
    path: ROUTES.FAVORITES,
    element: <FavoritesPage />,
    name: ROUTE_NAMES.FAVORITES,
    isPrivate: true,
  },
  {
    path: ROUTES.SETTINGS,
    element: <SettingsPage />,
    name: ROUTE_NAMES.SETTINGS,
    isPrivate: true,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
    name: ROUTE_NAMES.LOGIN,
    isAuth: true,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
    name: ROUTE_NAMES.REGISTER,
    isAuth: true,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
    name: ROUTE_NAMES.FORGOT_PASSWORD,
    isAuth: true,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <ResetPasswordPage />,
    name: ROUTE_NAMES.RESET_PASSWORD,
    isAuth: true,
  },
] as const 