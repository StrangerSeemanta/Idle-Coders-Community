
import Nopage from "../pages/Nopage";

import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import BlogPage from "../pages/BlogPage";
import Account from "../pages/Account";
import DynamicProjects from "../pages/DynamicProjects";
import Resources from "../pages/Resources";
import { SubscribeForm } from "../components/Intro";


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
        element: <Account />
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