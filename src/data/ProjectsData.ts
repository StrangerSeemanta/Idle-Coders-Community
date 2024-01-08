import PortFolio1 from "./../contents/thumbs/portfolio website 1.png";
import LoginForm from "./../contents/thumbs/Magic Login Form.jpg";
import HoverCard from "./../contents/thumbs/Hover Card.png";
import Navbar from "./../contents/thumbs/Responsive Navbar.png";
import ReactSinglePage from "./../contents/thumbs/React Single Page Website.png";
export interface ProjectsDataProps {
  title: string;
  thumbnail: string;
  playlist: string;
  ytLink: string;
  uniqueUrl: string;
}
export const ProjectsData = [
  {
    title:
      "Responsive Card Designs With Gradient Border And Glowing Hover Effect HTML CSS Only | Easy Steps",
    thumbnail: HoverCard,
    playlist: "awesome projects with html css",
    ytLink: "https://youtu.be/vApn8KQcjJQ",
    uniqueUrl: "gradient card designs html css",
  },
  {
    title:
      "Make This Magic Login Form using HTML CSS JS | Tutorials for beginners",
    thumbnail: LoginForm,
    playlist: "awesome projects with html css",
    ytLink: "https://youtu.be/IH6jHISbc38",
    uniqueUrl: "Magic Login Form using HTML CSS JS",
  },
  {
    title:
      "Build This Responsive Navbar With HTML, CSS JS | Web Development Tutorial",
    thumbnail: Navbar,
    playlist: "awesome projects with html css",
    ytLink: "https://youtu.be/No3Ys5OsqvU",
    uniqueUrl: "Responsive Navbar With HTML, CSS JS",
  },
  {
    title: "Attractive Portfolio Website with HTML CSS",
    thumbnail: PortFolio1,
    playlist: "awesome projects with html css",
    ytLink: "https://youtu.be/FnluZsEDGQo",
    uniqueUrl: "Attractive Portfolio Website with HTML CSS",
  },
  {
    title: "React Single Page Material UI Website Project for Beginners",
    thumbnail: ReactSinglePage,
    playlist: "awesome projects with html css",
    ytLink: "https://youtu.be/Z-kyeKF4iJI",
    uniqueUrl: "Single Page Material UI Website Project",
  },
];
