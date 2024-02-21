import PortFolio1 from "./../contents/thumbs/portfolio website 1.png";
import LoginForm from "./../contents/thumbs/Magic Login Form.jpg";
import HoverCard from "./../contents/thumbs/Hover Card.png";
import Navbar from "./../contents/thumbs/Responsive Navbar.png";
import ReactSinglePage from "./../contents/thumbs/React Single Page Website.png";
export interface ProjectsDataProps {
  title: string;
  thumbnail: string;
  playlist: string;
  uniqueUrl: string;
  topics: string[];
  links: {
    youtube: string;
    github: string;
  };
}
export const ProjectsData = [
  {
    title:
      "Responsive Card Designs With Gradient Border And Glowing Hover Effect HTML CSS Only | Easy Steps",
    thumbnail: HoverCard,
    playlist: "awesome projects with html css",
    uniqueUrl: "gradient card designs html css",
    topics: ["html", "css", "css animation"],
    links: {
      youtube: "https://youtu.be/vApn8KQcjJQ",
      github:
        "https://github.com/StrangerSeemanta/gradient-hover-card-design.git",
    },
  },
  {
    title:
      "Make This Magic Login Form using HTML CSS JS | Tutorials for beginners",
    thumbnail: LoginForm,
    playlist: "awesome projects with html css",
    uniqueUrl: "Magic Login Form using HTML CSS JS",
    topics: ["JavaScript", "css animation", "html", "css"],
    links: {
      youtube: "https://youtu.be/IH6jHISbc38",
      github:
        "https://github.com/StrangerSeemanta/magic-login-form-idlecoders.git",
    },
  },
  {
    title:
      "Build This Responsive Navbar With HTML, CSS JS | Web Development Tutorial",
    thumbnail: Navbar,
    playlist: "awesome projects with html css",
    uniqueUrl: "Responsive Navbar With HTML, CSS JS",
    topics: ["JavaScript", "CSS Media Query", "css animation", "html", "css"],
    links: {
      youtube: "https://youtu.be/No3Ys5OsqvU",
      github:
        "https://github.com/StrangerSeemanta/responsive-navbar-light-idlecoders.git",
    },
  },
  {
    title: "Attractive Portfolio Website with HTML CSS",
    thumbnail: PortFolio1,
    playlist: "awesome projects with html css",
    uniqueUrl: "Attractive Portfolio Website with HTML CSS",
    topics: ["CSS Media Query", "JavaScript", "html", "css"],
    links: {
      youtube: "https://youtu.be/FnluZsEDGQo",
      github:
        "https://github.com/StrangerSeemanta/attractive-portfolio-idlecoders.git",
    },
  },
  {
    title: "React Single Page Material UI Website Project for Beginners",
    thumbnail: ReactSinglePage,
    playlist: "awesome projects with html css",
    uniqueUrl: "Single Page Material UI Website Project",
    topics: [
      "react",
      "TypeScript",

      "Material UI",
      "JavaScript Advanced",
      "vite",
    ],
    links: {
      youtube: "https://youtu.be/Z-kyeKF4iJI",
      github:
        "https://github.com/StrangerSeemanta/react-single-page-idlecoders.git",
    },
  },
];
