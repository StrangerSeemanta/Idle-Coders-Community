import Nav from './components/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Routing from './Router/Routing';
import { ReactNode, useEffect } from 'react';
import Resources from './pages/Resources';
import Projects from './tabs/Projects';
import BlogPage from './components/BlogPage';
import Nopage from './components/Nopage';
import DynamicProjects from './pages/DynamicProjects';
import Account from './pages/Account';
export function HeadPolish({ children, title }: { children: ReactNode, title: string }) {

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
        <Route
          path={Routing.HomePage.path}
          element={
            <HeadPolish title={Routing.HomePage.title}>
              {Routing.HomePage.element}
            </HeadPolish>
          } />

        {/* Nested Route For Resources */}
        <Route path='/resources' element={<Resources />}>
          <Route index element={
            <HeadPolish title='Resources -From IdleCoders Yt Channel '>
              <Projects />
            </HeadPolish>
          } />
          <Route path='projects/:projectId' element={
            <DynamicProjects />
          } />
          <Route path='blogs' element={
            <HeadPolish title='Blogs - Stay Tuned With Us'>
              <BlogPage />
            </HeadPolish>
          } />

          <Route path='account' element={
            <HeadPolish title='Login Or Create Account On IdleCoders '>
              <Account />
            </HeadPolish>
          } />

          <Route path='*' element={
            <HeadPolish title={Routing.NoPage.title}>
              <Nopage isButtonDisabled />
            </HeadPolish>
          } />

        </Route>
        {/* Nesting Ended */}

        <Route
          path={Routing.ContactPage.path}
          element={
            <HeadPolish title={Routing.ContactPage.title}>
              {Routing.ContactPage.element}
            </HeadPolish>
          } />


        <Route
          path={Routing.NoPage.path}
          element={
            <HeadPolish title={Routing.NoPage.title}>
              {Routing.NoPage.element}
            </HeadPolish>
          } />
      </Routes>

    </BrowserRouter >

  )
}

export default Router