
import Nopage from "../pages/Nopage";

import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import BlogPage from "../pages/BlogPage";
import Account, { LoginPage, SignupPage } from "../pages/Account";
import DynamicProjects from "../pages/DynamicProjects";
import Resources from "../pages/Resources";
import { SubscribeForm } from "../components/Intro";
import UserGallery from "../pages/UserGallery";
import UserDashboard from "../pages/UserDashboard";
import Profile from "../pages/Profile";


const Routing =
{
    "HomePage": {
        title: "Idle Coders - Your Favorite Youtube Channel",
        path: "/",
        element: <Home />
    },
    "Resources": {
        title: "",
        path: "/resources",
        element: <Resources />
    },

    "ProjectLists": {
        title: "Projects -Explore The Stunning Projects ",
        path: "/resources",
        element: <Projects />
    }, "ProjectPage": {
        title: "",
        path: "projects/:projectId",
        element: <DynamicProjects />
    },
    "Blogs": {
        title: "Projects -Explore The Stunning Projects ",
        path: "/resources/blogs",
        element: <BlogPage />
    },
    "Account": {
        title: "Projects -Explore The Stunning Projects ",
        path: "/resources/account",
        element: <Account />,
        "Login": {
            title: "Idlecoders Login - Login In To Idlecoders",
            path: "/resources/account/login",
            element: <LoginPage />
        },
        "Signup": {
            title: "Create New Account - Idlecoders",
            path: "/resources/account/signup",
            element: <SignupPage />
        },
    },
    "UserDashboard": {
        title: "User Dashboard - IdleCoders",
        path: '/user',
        element: <UserDashboard />,
        "Profile": {
            title: "User Dashboard - IdleCoders",
            path: '/user/profile',
            element: <Profile />
        },
        "UserBlogs": {
            title: "My Blogs - IdleCoders",
            path: '/user/blogs',
            element: <Profile />
        },
        "Settings": {
            title: "Update Your Settings - IdleCoders",
            path: '/user/settings',
            element: <Profile />
        }, "Gallery": {
            title: "One Place All You Need To Store -IdleCoders ",
            path: '/user/storage',
            element: <UserGallery />
        },
    },

    "ContactPage": {
        title: "Contact With Us ",
        path: 'contact',
        element: <Contact />
    },
    "Subscribe": {
        title: "Contact With Us ",
        path: 'subscribe',
        element: <SubscribeForm />
    },

    "NoPage": {
        title: "No Page found: 404 -IdleCoders",
        path: "/*",
        element: <Nopage />
    },

}


export default Routing