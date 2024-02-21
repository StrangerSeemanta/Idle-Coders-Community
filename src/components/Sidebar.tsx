import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ScrollShadow, useDisclosure } from '@nextui-org/react';
import { Fragment, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge';
import { MdExplore } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { CiSearch } from "react-icons/ci";
import { RiSearchEyeLine } from "react-icons/ri";

import SidebarItemButton from './SidebarItemButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProjectsData, ProjectsDataProps } from '../data/ProjectsData';
import { IoArrowForward } from "react-icons/io5";

interface SidebarProps {
    children: ReactNode;
    className?: string | string[];
}
function Sidebar({ children, className }: SidebarProps) {
    const location = useLocation()
    const navigate = useNavigate()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [SearchValue, setSearchValue] = useState("")
    const [SearchResults, SetSearchResult] = useState<ProjectsDataProps[] | null>(null)
    const Routes = useMemo(() => {
        return [
            {
                label: "Browse",
                href: "/resources",
                Icon: MdExplore
            },
            {
                label: "Blogs",
                href: "/resources/blogs",
                Icon: SiGoogledocs
            },
            {
                label: "Account",
                href: "/resources/account",
                Icon: FaUser
            },
        ]
    }, [])
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
    return (
        <Fragment>
            <div className='w-full  h-[89vh] flex bg-default-50/60 '>
                {/* lg: Expanded Side Bar */}
                <div className='bg-background  h-full w-64 hidden lg:block'>
                    <div className="flex flex-col px-4 py-3 w-full gap-y-[6px]">
                        <Button
                            onPress={onOpen}
                            radius='none'
                            fullWidth
                            color='default'
                            className='text-foreground-500 justify-start'
                            size="md"
                            variant='flat'
                            startContent={<CiSearch size={23} />}
                        >
                            Quick search
                        </Button>
                        {
                            Routes.map((route, index) => (

                                <SidebarItemButton

                                    key={route.label + String(index)}
                                    isActive={(location.pathname === route.href) || (location.pathname.includes(`${route.href}/projects`))}
                                    {...route}
                                />
                            ))
                        }
                    </div>
                </div>

                {/* Sm: Collapsed Side Bar */}
                <div className='bg-transparent  h-full w-16 hidden sm:block lg:hidden'>
                    <div className="flex bg-transparent flex-col items-center py-3 w-full gap-y-[6px]">
                        <div onClick={onOpen} className={twMerge("w-10/12 flex cursor-pointer justify-center items-center flex-col gap-y-1 group hover:text-foreground text-foreground-400 transition  h-fit py-3 rounded-none bg-transparent")}>
                            <RiSearchEyeLine size={18} />
                            <span className='text-tiny font-bold'>Search</span>
                        </div>
                        {
                            Routes.map((route, index) => (

                                <Link key={route.label + String(index)} className='no-underline w-full h-full flex items-center justify-end' to={route.href}>
                                    <div className={twMerge("w-10/12 flex justify-center items-center flex-col gap-y-1 group hover:text-foreground text-foreground-400 transition  h-fit py-3 rounded-none bg-transparent", route.href === location.pathname && "text-danger hover:text-danger-300 font-bold")}>
                                        <route.Icon size={18} />
                                        <span className='text-tiny font-medium'>{route.label}</span>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <Divider className='hidden lg:block' orientation='vertical' />
                <div className={twMerge('h-full flex-1 overflow-y-auto py-3 cscroll', className)}>
                    <Button
                        onPress={onOpen}
                        radius='md'
                        isIconOnly
                        color='default'
                        className=' fixed bottom-8 right-8 z-50 shadow-xl sm:hidden'
                        size='lg'
                        variant='solid'

                    >
                        <CiSearch size={26} />
                    </Button>
                    {children}
                </div>
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

export default Sidebar