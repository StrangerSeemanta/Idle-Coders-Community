import Nav from './components/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Routing from './Router/Routing';
import { ReactNode, useEffect } from 'react';
import Nopage from './pages/Nopage';
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
        <Route path={Routing.Resources.path} element={Routing.Resources.element}>
          <Route index element={
            <HeadPolish title={Routing.ProjectLists.title}>
              {Routing.ProjectLists.element}
            </HeadPolish>
          } />
          <Route path={Routing.ProjectPage.path}
            element=
            {
              Routing.ProjectPage.element
            } />
          <Route path={Routing.Blogs.path} element={
            <HeadPolish title={Routing.Blogs.title}>
              {Routing.Blogs.element}
            </HeadPolish>
          } />

          <Route path={Routing.Account.path} element={Routing.Account.element} >
            <Route path={Routing.Account.Login.path} element={
              <HeadPolish title={Routing.Account.Login.title} >
                {Routing.Account.Login.element}
              </HeadPolish>
            } />
            {/* <Route path={"/resources/account/signup"} element={
              <HeadPolish title={Routing.Account.Signup.title} >
                {Routing.Account.Signup.element}
              </HeadPolish>
            } /> */}

          </Route>

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
          path={Routing.Subscribe.path}
          element={
            <HeadPolish title={Routing.Subscribe.title}>
              {Routing.Subscribe.element}
            </HeadPolish>
          } />

        {/* Nested Routing For Profile Navigation */}
        <Route
          path={Routing.UserDashboard.path}
          element={
            Routing.UserDashboard.element
          }
        >
          <Route path={Routing.UserDashboard.Profile.path} element={
            <HeadPolish title={Routing.UserDashboard.Profile.title}>
              {Routing.UserDashboard.Profile.element}
            </HeadPolish>
          } />
          <Route path={Routing.UserDashboard.UserBlogs.path} element={
            <HeadPolish title={Routing.UserDashboard.UserBlogs.title}>
              {Routing.UserDashboard.UserBlogs.element}
            </HeadPolish>
          } />
          <Route path={Routing.UserDashboard.Settings.path} element={
            <HeadPolish title={Routing.UserDashboard.Settings.title}>
              {Routing.UserDashboard.Settings.element}
            </HeadPolish>
          } />
          <Route
            path={Routing.UserDashboard.Gallery.path}
            element={
              <HeadPolish title={Routing.UserDashboard.Gallery.title}>
                {Routing.UserDashboard.Gallery.element}
              </HeadPolish>
            }
          />
        </Route>
        {/* Nested Routing For Profile Navigation End*/}


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