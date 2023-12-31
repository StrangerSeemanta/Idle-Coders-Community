import { CSSProperties, Fragment } from 'react'
import Banner from "./../assets/IdleCoders.png"
function Polygon({ rotate, styleOverride }: { rotate?: number; styleOverride?: CSSProperties }) {
    return (
        <div className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute" style={{ "height": "80px", transform: rotate ? `rotateY(${rotate}deg)` : "", ...styleOverride }}>
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                <polygon className="text-violet-200 fill-current" points="2560 0 2560 100 0 100">
                </polygon>
            </svg>
        </div>
    )
}
function Services() {
    return (
        <Fragment>
            <section className='mt-40 pb-40 relative bg-violet-200'>

                <Polygon />
                <div className='container mx-auto'>
                    <div className="flex flex-wrap items-center">
                        <div className="w-10/12  lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32 lg:-mt-56">
                            <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded-lg bg-yellow-600">
                                <img alt="..." src={Banner} className="w-full align-middle rounded-t-lg" />
                                <blockquote className="relative p-8 mb-4">
                                    <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="absolute left-0 w-full block " style={{ height: "95px", top: '-94px' }}>
                                        <polygon points="-30,95 583,95 583,65" className="text-yellow-600 fill-current "></polygon>
                                    </svg>
                                    <h4 className="text-xl font-bold text-white">Benefits Of This Community Website</h4>
                                    <p className="text-md font-light mt-2 text-white lowercase">
                                        We are dedicated to remove obstacles from your journey with IdleCoders Youtube Channel. So, We made this website to make your journey more smooth and exciting
                                    </p>
                                </blockquote>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-6/12 px-4">
                                    <div className="relative flex flex-col mt-4">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="purple" className="w-6 h-6">
                                                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                                </svg>

                                            </div>
                                            <h6 className="text-2xl mb-1 font-bold text-purple-600">Videos In One Place</h6>
                                            <p className="mb-4 text-blueGray-500">
                                                you can easily watch our videos from this website and <strong className='text-green-600'> download it for practice</strong>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col min-w-0">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#d60260" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                                                </svg>

                                            </div>
                                            <h6 className="text-2xl mb-1 font-bold text-pink-600">Free Source Codes</h6>
                                            <p className="mb-4 text-blueGray-500">
                                                We proudly feature the source codes of each of our projects, meticulously organized for easy exploration.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-6/12 px-4">
                                    <div className="relative flex flex-col min-w-0 mt-4">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="teal" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                                </svg>

                                            </div>
                                            <h6 className="text-2xl mb-1 font-bold text-teal-600">Assets</h6>
                                            <p className="mb-4 text-blueGray-500">
                                                You will get downloadable assets, we used in our projects. All they are catagorized and ready to use without any copyrights.                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col min-w-0">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="dodgerblue" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
                                                    <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                                                </svg>
                                            </div>
                                            <h6 className="text-2xl mb-1 font-bold text-blue-600">Blogs</h6>
                                            <p className="mb-4 text-blueGray-500">
                                                Our regular and latest blogs will help you to keep your knowledge up-to-date with new Technology, Methods, Trends.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </Fragment>
    )
}

export default Services