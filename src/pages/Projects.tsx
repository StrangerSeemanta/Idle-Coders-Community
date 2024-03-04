import {
    Fragment,
    useCallback,
    useEffect, useState
} from "react"
import ProjectCard from "../components/ProjectCard"
import { ProjectsData, ProjectsDataProps } from "../data/ProjectsData"
import { twMerge } from "tailwind-merge";
import { Button, useDisclosure, Input, Modal, ModalBody, ModalContent, ModalFooter, ScrollShadow, } from "@nextui-org/react";
import { RiSearchEyeLine } from "react-icons/ri";

import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [SearchValue, setSearchValue] = useState("")
    const [SearchResults, SetSearchResult] = useState<ProjectsDataProps[] | null>(null)
    const handleProjectNavigation = useCallback((url: string) => {
        return navigate(url)
    }, [navigate])

    const handleSearch = useCallback((value: string) => {
        setSearchValue(value);
        const matchedResult = ProjectsData.filter(project => {
            return project && project.title && project.title.toLowerCase().includes(value.toLowerCase())
        })
        if (matchedResult.length > 0) {
            SetSearchResult(matchedResult)

        } else {
            SetSearchResult(null)
        }

    }, [])
    useEffect(() => {
        if (isOpen) {
            handleSearch(SearchValue)
        }
    }, [isOpen, handleSearch, SearchValue])

    // Filter Functions
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
            <div className="flex cscroll justify-between items-center gap-10 mx-4 overflow-x-auto ">
                <div className="flex   items-center pb-3 gap-x-2 ">
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
                <div className="pb-3">
                    <Button
                        onPress={onOpen}
                        radius='none'

                        color='default'
                        className='text-foreground-500 w-52 hidden lg:flex justify-start'
                        size="sm"
                        variant='flat'
                        startContent={<RiSearchEyeLine size={18} />}
                    >
                        Quick search
                    </Button>
                </div>
            </div>
            <div className="max-w-full py-4 gap-4 grid relative grid-cols-12 grid-rows-3 px-2">
                <div onClick={onOpen} className="w-14 h-14 flex lg:hidden shadow-lg group cursor-pointer active:shadow-none  shadow-black/30 hover:opacity-80 transition-all text-white justify-center items-center rounded-full fixed bg-danger bottom-28 right-6 z-50">
                    <RiSearchEyeLine size={32} className="group-hover:-rotate-[360deg] ease-soft-springs duration-700" />
                </div>
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

            {/* Modal Here */}
            <Modal placement='center' scrollBehavior={"inside"} isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" closeButton={false}
                classNames={{
                    body: "p-0",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "p-0 border-t-[1px] border-[#292f46]",
                    closeButton: "hidden",
                }}
            >
                <ModalContent  >
                    {
                        (onClose) => (
                            <>
                                <ModalBody >
                                    <div className='w-full h-fit bg-transparent  rounded-md'>
                                        <Input
                                            value={SearchValue}
                                            autoComplete={"off"}
                                            onChange={(e) => handleSearch(e.target.value)}
                                            onClear={() => handleSearch("")}
                                            autoFocus name='search'
                                            type='text'
                                            color='default'
                                            placeholder='Search Projects'
                                            classNames={{ innerWrapper: ["bg-transparent", "hover:bg-transparent",], inputWrapper: ["bg-transparent", "group-hover:bg-transparent", "group-data-[focus=true]:bg-transparent",], input: "text-lg text-danger group-data-[has-value=true]:text-danger font-semibold " }}
                                            radius='none'
                                            isClearable
                                            size='md'
                                            aria-label="Project Name"
                                            startContent={<RiSearchEyeLine className="text-default-700/70" size={26} />} />

                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <div className="w-full h-fit  overflow-y-auto ">
                                        <ScrollShadow hideScrollBar size={80} className='w-full max-h-[300px]'>
                                            {
                                                SearchResults ?
                                                    SearchResults.map((project, index) => (
                                                        <div
                                                            onClick={() => {
                                                                handleProjectNavigation(`projects/${encodeURIComponent(project.uniqueUrl.toLowerCase())}`)
                                                                onClose()
                                                            }}
                                                            key={project.title + String(index)}
                                                            className="w-full mx-auto h-fit bg-default-200/70 dark:bg-default-100/70  py-3 mt-3 px-6 group  hover:bg-danger dark:hover:bg-danger-300  transition-colors capitalize cursor-pointer flex items-center justify-between">

                                                            <span className='w-11/12 text-sm text-default-700/70 font-semibold group-hover:text-white transition-colors'>{project.title}</span>
                                                            <IoArrowForward className={" text-default-700/70 group-hover:text-white transition group-hover:animate-none drift_animation"} size={26} />
                                                        </div>

                                                    ))
                                                    :
                                                    <h1 className='w-full px-6 py-3 text-medium text-default-700/70 font-bold text-center'>No Results Found</h1>
                                            }

                                        </ScrollShadow>
                                    </div>
                                </ModalFooter>


                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </Fragment>
    )
}

export default Projects