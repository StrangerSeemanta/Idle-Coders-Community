import { Fragment, useEffect, useState } from "react"
import ProjectCard from "../components/ProjectCard"
import { ProjectsData, ProjectsDataProps } from "../data/ProjectsData"
import { twMerge } from "tailwind-merge";

interface FilterButtonProps {
    filterName: string;
    onClick?: () => void;
    className?: string;
    isActive?: boolean;
}
const FilterButton = ({ filterName, isActive, onClick, className }: FilterButtonProps) => {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                "py-2 px-3 text-sm  rounded-lg flex items-center gap-x-1 hover:bg-primary-100/60 dark:hover:bg-danger-100 transition-all cursor-pointer select-none",
                isActive ? "bg-primary-100 dark:bg-danger-200 rounded-none" : "bg-default-200/60 ",
                className
            )}>
            <div className="truncate text-xs font-semibold">
                {filterName}
            </div>
        </div>
    )
}

function Projects() {
    const [projectLists, setProjectLists] = useState<ProjectsDataProps[]>(ProjectsData)
    const [selectedFilters, setSelectedFilter] = useState<string | null>(null)
    const filters = ["HTML", "css", "javascript", "react", "typescript", "next js", "Material UI"];
    const handleFilter = (el: string) => {
        if (selectedFilters === el) {
            setSelectedFilter(null);
        } else {
            setSelectedFilter(el)
        }
    }
    useEffect(() => {
        if (selectedFilters) {
            const uniqueProjects = new Set<ProjectsDataProps>();

            const filteredProjects = ProjectsData.filter((project) =>
                project.topics.map((val) => val.toLowerCase()).includes(selectedFilters.toLowerCase())
            );
            filteredProjects.forEach((project) => uniqueProjects.add(project));

            setProjectLists(Array.from(uniqueProjects));
        } else {
            setProjectLists([...ProjectsData]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilters, setProjectLists]);


    return (
        <Fragment>
            <div className="flex items-center px-4 gap-x-2 overflow-x-auto pb-2">
                <FilterButton onClick={() => setSelectedFilter(null)} isActive={selectedFilters === null} filterName="All" />
                {filters.map((filter, idx) => (
                    <FilterButton

                        onClick={() => { handleFilter(filter) }}
                        isActive={selectedFilters ? selectedFilters.toLowerCase() === filter.toLowerCase() : false}
                        key={idx}
                        filterName={filter.toUpperCase()}
                    />
                ))}
            </div>
            <div className="max-w-full py-4 gap-4 grid grid-cols-12 grid-rows-3 px-2">

                {projectLists.length > 0
                    ?
                    projectLists.map((data, index) => (
                        <ProjectCard key={data.title + String(index)} {...data} />
                    ))
                    :
                    <div className="px-2 col-span-12 grid justify-center w-full">
                        <h1 className="text-2xl font-bold text-default-700/70 animate-pulse">Currently, We have no courses on this topic</h1>
                    </div>
                }
            </div>
        </Fragment>
    )
}

export default Projects