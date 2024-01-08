import { BreadcrumbItem, Breadcrumbs, } from '@nextui-org/react'
import { Fragment, ReactNode } from 'react'
import Bg from "./../assets/bg_3.png"
import Beam from './Beam';
import HoverCardCode from "./../contents/codes.txt"
interface CodeCard {
    children: ReactNode;
    src: string;
}
export function CodeCard({ children, src }: CodeCard) {
    return (
        <a href={src} download={children?.toString().toUpperCase() + "_from idlecoders"}>
            <div className='px-9 py-4 w-fit max-w-xs h-fit cursor-pointer bg-pink-400 hover:bg-pink-500 dark:bg-pink-600 dark:hover:bg-pink-500 transition backdrop-blur-md shadow-lg mt-3 mx-5'>
                <h1 className='text-medium font-semibold text-white'>{children} </h1>

            </div>
        </a>
    )
}

function CodePage() {

    return (
        <Fragment>
            <Beam imgSrc={Bg} fixed>
                <div className=" p-5  ">
                    <Breadcrumbs>
                        <BreadcrumbItem href="/home">Idle Coders</BreadcrumbItem>
                        <BreadcrumbItem href="/resources">Resources</BreadcrumbItem>
                        <BreadcrumbItem href="/resources/videos">Source Codes</BreadcrumbItem>

                    </Breadcrumbs>
                </div>

                <section className='w-full min-h-[100vh] px-5 py-2 relative '>
                    <h1 className='text-danger text-2xl font-bold px-5'>Get The Codes Now!!</h1>
                    <CodeCard src={HoverCardCode}>
                        Hover Card Design WIth HTML CSS
                    </CodeCard>
                </section>
            </Beam>

        </Fragment >
    )
}

export default CodePage