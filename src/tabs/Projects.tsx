import { Fragment } from "react"
import ProjectCard from "../components/ProjectCard"
import { ProjectsData } from "../data/ProjectsData"
function Projects() {
    return (
        <Fragment>
            <div className="max-w-full py-4 gap-4 grid grid-cols-12 grid-rows-3 px-2">
                {ProjectsData.map((data, index) => (
                    <ProjectCard key={data.title + String(index)} {...data} />
                ))}
            </div>
        </Fragment>
    )
}

export default Projects