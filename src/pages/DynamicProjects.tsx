import { useParams } from "react-router-dom"
import { HeadPolish } from "../Router"
import { ProjectsData, ProjectsDataProps } from "../data/ProjectsData"
import { Fragment, useEffect, useState } from "react";
import Nopage from "../components/Nopage";
import Paper from "../components/Paper";
import { Chip, Image } from "@nextui-org/react";
import { FaYoutube, } from "react-icons/fa";

interface YoutubeLinkCardProps {
    href: string;
}

function YoutubeLinkCard({ href }: YoutubeLinkCardProps) {
    return (
        <div className=" shadow-lg rounded-md p-6 text-white bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-200 via-rose-800 to-black">
            <div className="mb-7">
                <h4 className="font-semibold text-xl mb-4">Only on YouTube for now.</h4>
                <p className="text-sm text-neutral-200">This course is only available on YouTube for now. I'll add it to the platform as soon as possible.</p>
            </div>
            <a href={href} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-slate-900 hover:bg-slate-200 hover:opacity-90 h-10 px-4 py-2 w-full">
                Watch On Yotube
            </a>
        </div>
    )
}
// interface GithubLinkProps {
//     href: string;
// }

// function GithubLinkCard({ href }: GithubLinkProps) {
//     return (
//         <div className=" shadow-lg rounded-md p-6 text-white bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-500 via-slate-800 to-black">
//             <div className="mb-7">
//                 <h4 className="font-semibold text-xl mb-4">Get Source Code From Github</h4>
//                 <p className="text-sm text-neutral-200">Currently, you can get the codes only on Github. I'll find a way to get codes from this platform as soon as possible </p>
//             </div>
//             <a href={href} className="inline-flex items-center justify-center rounded-md text-sm ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-200 text-slate-900 hover:bg-slate-300 font-semibold hover:opacity-90 h-10 px-4 py-2 w-full">
//                 Source Code
//             </a>
//         </div>
//     )
// }


function UniquePage({ data }: { data: ProjectsDataProps }) {
    return (
        <Fragment>
            <div className="w-full h-fit p-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">

                        <Paper nopadding disableBorder rounded="md">
                            <Image src={data.thumbnail} />
                        </Paper>
                        {/* Description Card */}
                        <Paper rounded={"md"}>
                            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                                <div className="flex items-center gap-x-2 ">
                                    <div className="rounded-full flex items-center justify-center bg-danger-100 dark:bg-danger-800 p-1">
                                        <FaYoutube className={"text-danger"} size={16} />

                                    </div>

                                    <span > Youtube</span>
                                </div>
                            </div>
                            <h3 className="font-semibold text-lg md:text-xl my-3 capitalize">{data.title}</h3>
                            <p className="text-sm text-foreground-700/70 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum ratione natus corporis suscipit itaque eligendi minima laboriosam ipsam. Ratione deserunt facere aliquam fugiat dolorem blanditiis vero recusandae natus eveniet?</p>
                            {/* Topics */}
                            <div className="flex gap-2 flex-wrap">
                                {
                                    data.topics.map((topic, index) => (
                                        <Chip
                                            key={data.title + " topics-" + String(index) + "-" + topic}
                                            variant="bordered"
                                            size="sm"

                                            classNames={{
                                                base: "border-1",
                                                content: "font-semibold text-tiny uppercase"
                                            }}
                                        >
                                            {topic}
                                        </Chip>
                                    ))
                                }
                            </div>
                        </Paper>
                        {/* Social Media Cards */}
                        {/* <div className="flex gap-x-2 items-center">
                            <a href={data.links.github} target="_blank" className="w-full">
                                <Paper rounded="md" className="flex flex-col items-center gap-y-2 w-full transition hover:opacity-70  cursor-pointer">
                                    <FaGithub size={37} />
                                    <span className="text-xs text-default-700/80">Github</span>
                                </Paper>
                            </a>
                            <a href={data.links.youtube} className="w-full" target="_blank">
                                <Paper rounded="md" className="flex flex-col items-center gap-y-2 w-full transition  hover:opacity-70 cursor-pointer">
                                    <FaYoutube className={"text-danger"} size={37} />
                                    <span className="text-xs text-default-700/80">Youtube</span>
                                </Paper>
                            </a>
                        </div> */}
                    </div>

                    {/* Right Side */}
                    <div className="order-2 lg:col-span-2 flex flex-col space-y-6">
                        <YoutubeLinkCard href={data.links.youtube} />
                        {/* <GithubLinkCard href={data.links.github} /> */}
                    </div>
                </div>

            </div>
        </Fragment>
    )
}


function DynamicProjects() {
    const { projectId } = useParams();
    const [projectDetails, setProjectDetails] = useState<ProjectsDataProps>()
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
                    <UniquePage data={projectDetails} />
                </HeadPolish> :
                <Nopage />
            }
        </Fragment>
    )
}

export default DynamicProjects