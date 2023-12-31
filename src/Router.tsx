import Nav from './components/Nav'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Routing from './Router/Routing';
import { ReactNode, useEffect } from 'react';
function HeadPolish({ children, title }: { children: ReactNode, title: string }) {

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <>
      {children}
    </>
  )
}
function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        {Routing.map(route => (
          <Route path={route.path} element={
            <HeadPolish title={route.title}>
              {route.element}
            </HeadPolish>
          } key={route.path} />
        ))}
      </Routes>

      <Footer />
    </BrowserRouter>

  )
}

export default Router