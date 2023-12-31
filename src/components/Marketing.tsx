import Collaboration from "./../assets/collab.png"

function Marketing() {
    return (
        <>
            <div className="w-full p-5" >

                <div className="flex flex-wrap mt-12 items-center justify-between lg:mt-0">
                    <div className="w-full lg:w-6/12">
                        <div className="relative w-1/2 lg:w-full mx-auto">
                            <img className="w-full object-contain z-20" src={Collaboration} />
                        </div>
                    </div>
                    <div className="mt-6 lg:w-5/12 lg:mt-0">
                        <div className="text-container">
                            <h2 className="md:text-4xl text-2xl font-semibold">
                                Join With Us and Start Collaboration !!
                            </h2>
                            <p className="mt-4">
                                This will be our pleasure to work with you. Don't Worry, Just keep your eyes on on Collaboration section. And let us know your skills.
                            </p>
                            <ul className="mt-6 flex flex-col text-dark md:-ml-4 gap-5">
                                <li className="mb-2 text-teal-600 flex capitalize gap-3 items-center rounded px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="teal" className="w-6 h-6">
                                        <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                                        <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z" clipRule="evenodd" />
                                    </svg>

                                    You can Join With Us As A Content Creator.
                                </li>
                                <li className="mb-2 text-blue-600 flex capitalize gap-3 items-center rounded px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(37, 99 ,235)" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                    </svg>

                                    We Need Skilled Developers to grow IdleCoders
                                </li>
                                <li className="mb-2 text-pink-600 flex capitalize gap-3 items-center rounded px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(219, 39, 119)" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                    </svg>

                                    Eagerly Waiting For Some Experts on Digital Marketing Field.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Marketing