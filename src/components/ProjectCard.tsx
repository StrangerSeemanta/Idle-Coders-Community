import { Image } from "@nextui-org/react";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ProjectCardProps {
    thumbnail: string;
    title: string;
    playlist: string;
    uniqueUrl: string;
}
function ProjectCard({ thumbnail, title, playlist, uniqueUrl }: ProjectCardProps) {

    return (
        <div className="col-span-12 sm:col-span-6  md:col-span-4 xl:col-span-3 ">

            <Link to={`projects/${encodeURIComponent(uniqueUrl.toLowerCase())}`} className="no-underline w-full h-full">
                <div className=" group hover:bg-primary-50/60 dark:hover:bg-danger-50/80 transition overflow-hidden rounded-lg p-3  h-full flex flex-col justify-start bg-transparent ">
                    <div >
                        <div className="relative w-full aspect-video rounded-md overflow-hidden">
                            <Image radius="sm" src={thumbnail} alt={title} className="object-cover transition group-hover:scale-125 w-full h-full" />
                        </div>
                    </div>
                    <div className="flex flex-col pt-2 flex-1">
                        <div className="capitalize text-lg md:text-sm font-medium group-hover:text-danger-700 transition line-clamp-2">
                            {title}
                        </div>
                        <p className="text-[10px] mt-1 font-medium text-success">
                            <span className="text-foreground font-medium">Playlist:</span>  {playlist}
                        </p>
                        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                            <div className="flex items-center gap-x-2 ">
                                <div className="rounded-full flex items-center justify-center bg-danger-100 dark:bg-danger-800 p-1">
                                    <FaYoutube className={"text-danger"} size={16} />

                                </div>

                                <span >Watch On Youtube</span>
                            </div>
                        </div>

                    </div>

                    <div className="">

                        <p className="text-md md:text-sm font-medium text-foreground">
                            Free
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProjectCard