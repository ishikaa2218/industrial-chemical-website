import { MotionConfig } from 'framer-motion'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'
import { lazy, Suspense, type ReactNode } from 'react'

const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const page = (el: ReactNode) => <Suspense fallback={<div className="min-h-[80svh]" />}>{el}</Suspense>

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: page(<About />) },
      { path: '/products', element: page(<Products />) },
      { path: '/contact', element: page(<Contact />) },
      { path: '*', element: page(<NotFound />) },
    ],
  },
])

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  )
}
