
import Nopage from "../components/Nopage";

import Contact from "../pages/Contact";
import Home from "../pages/Home";


const Routing =
{
    "HomePage": {
        title: "Idle Coders Community",
        path: "/",
        element: <Home />
    },

    "ContactPage": {
        title: "Contact With Us ",
        path: 'contact',
        element: <Contact />
    },

    "NoPage": {
        title: "No Page found: 404 -IdleCoders",
        path: "/*",
        element: <Nopage />
    }
}


export default Routing