
import Nopage from "../components/Nopage";
import BlogPage from "../pages/BlogPage";
import CodePage from "../pages/CodePage";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Resources from "../pages/Resources";
import VideoPage from "../pages/VideoPage";

const Routing =
    [
        {
            title: "Idle Coders Community",
            path: "/",
            element: <Home />
        },
        {
            title: "Idle Coders Community",
            path: "home",
            element: <Home />
        },

        {
            title: "Blogs - IdleCoders Community",
            path: 'blogs',
            element: <BlogPage />
        },
        {
            title: "Contact With Us ",
            path: 'contact',
            element: <Contact />
        },
        {
            title: "Resources- Explore The Unlimited Resources",
            path: 'resources',
            element: <Resources />
        },
        {
            title: "Videos - Resources of Idle Coders",
            path: "/resources/videos",
            element: <VideoPage />
        }, {
            title: "Source Codes - Resources of Idle Coders",
            path: "/resources/codes",
            element: <CodePage />
        },
        {
            title: "No Page found: 404 -IdleCoders",
            path: "/*",
            element: <Nopage />
        }
    ]


export default Routing