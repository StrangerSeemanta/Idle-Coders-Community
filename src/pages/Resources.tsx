import { Fragment } from "react"
import { BreadcrumbItem, Breadcrumbs, Card, Divider, Tooltip } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
function Resources() {
    const navigate = useNavigate()
    return (
        <Fragment>
            <div className="container p-5 bg-default-50">
                <Breadcrumbs>
                    <BreadcrumbItem href="/home">Idle Coders</BreadcrumbItem>
                    <BreadcrumbItem href="/resources">Dashboard</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="w-full min-h-[100vh] relative p-5 flex justify-center items-center bg-default-50">

                <h1 className="text-9xl select-none max-sm:text-3xl max-lg:text-6xl font-extrabold absolute z-10 tracking-[1.2rem] max-sm:tracking-[0.8rem] text-foreground/20 dark:text-foreground/10">Resources</h1>
                <div className="w-[30rem] max-sm:w-10/12 absolute z-30 h-[30rem] max-sm:h-[45rem] overflow-hidden bg-transparent grid grid-cols-12 grid-rows-2 max-sm:grid-rows-4 gap-2">
                    <Tooltip content="Get All Videos" color="foreground" showArrow closeDelay={100}>
                        <Card radius="none" isPressable shadow="md" onClick={() => { navigate('videos') }} className="cursor-pointer w-full h-full hover:brightness-90 bg-primary col-span-6 max-sm:col-span-12 relative  transition-all ease-soft-spring duration-250 flex justify-center items-center">
                            <h1 className="text-2xl font-bold text-white flex justify-center items-center gap-3">
                                <div >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                                        <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                    </svg>

                                </div>
                                <Divider orientation="vertical" className="bg-white" />

                                <span>Videos</span>
                            </h1>
                        </Card>
                    </Tooltip>
                    <Tooltip closeDelay={100} content="Source Codes of All Projects" showArrow color="foreground" shadow="lg">
                        <Card onClick={() => { navigate('codes') }} radius="none" isPressable shadow="md" className="cursor-pointer w-full h-full hover:brightness-90 bg-success col-span-6 max-sm:col-span-12 relative  transition-all ease-soft-spring duration-250 flex justify-center items-center">
                            <h1 className="text-2xl font-bold text-white flex justify-center items-center gap-3">
                                <div >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                                    </svg>

                                </div>
                                <Divider orientation="vertical" className="bg-white" />

                                <span>Codes</span>
                            </h1>
                        </Card></Tooltip>
                    <Tooltip closeDelay={100} content="Ready To Use Assets" showArrow color="foreground" shadow="lg">

                        <Card radius="none" isPressable shadow="md" className="cursor-pointer w-full h-full hover:brightness-90 bg-danger col-span-6 max-sm:col-span-12 relative  transition-all ease-soft-spring duration-250 flex justify-center items-center">
                            <h1 className="text-2xl font-bold text-white flex justify-center items-center gap-3">
                                <div >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                    </svg>

                                </div>
                                <Divider orientation="vertical" className="bg-white" />

                                <span>Assets</span></h1>
                        </Card></Tooltip>
                    <Tooltip closeDelay={100} content="See The List Of Our Published Contents" showArrow color="foreground" shadow="lg">

                        <Card radius="none" isPressable shadow="md" className="cursor-pointer w-full h-full hover:brightness-90 bg-warning col-span-6 max-sm:col-span-12 relative  transition-all ease-soft-spring duration-250 flex justify-center items-center">
                            <h1 className="text-xl font-bold text-white flex justify-center items-center gap-3">
                                <div >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
                                        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                                    </svg>

                                </div>
                                <Divider orientation="vertical" className="bg-white" />

                                <span> Content Table</span>
                            </h1>
                        </Card>
                    </Tooltip>
                </div>
            </div>

        </Fragment>
    )
}

export default Resources