import { useParams } from "react-router-dom"
import { HeadPolish } from "../Router"
import { ProjectsData } from "../data/ProjectsData"
import { Fragment, useEffect, useState } from "react";
import Nopage from "../components/Nopage";
interface DataProps {
    title: string;
    thumbnail: string;
    playlist: string;
    ytLink: string;
    uniqueUrl: string;
}
function ProjectUniquePage({ data }: { data: DataProps }) {
    return (
        <Fragment>
            <h1>{data.title}</h1>
            <a href={data.ytLink} target="_blank">Youtube Video Link- {data.ytLink}</a>
        </Fragment>
    )
}


function DynamicProjects() {
    const { projectId } = useParams();
    const [projectDetails, setProjectDetails] = useState<DataProps>()
    useEffect(() => {
        if (projectId) {
            const matched = ProjectsData.find((project) => {
                return project.uniqueUrl.toLowerCase() === decodeURIComponent(projectId).toLowerCase()
            })
            setProjectDetails(matched)
        }
    }, [projectId])
    return (
        <Fragment>
            {projectDetails ?
                <HeadPolish title={projectDetails.title}>
                    <ProjectUniquePage data={projectDetails} />
                </HeadPolish> :
                <Nopage />
            }
        </Fragment>
    )
}

export default DynamicProjects