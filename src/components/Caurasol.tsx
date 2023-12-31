import { Button } from '@nextui-org/react';
import { CSSProperties, Fragment, ReactNode, useRef, useState } from 'react'
import Toast from './Toast';
interface itemProps {
    children: string | ReactNode;
    width?: string;
    height?: string;
    className?: string;
    sx?: CSSProperties
}
export function CaurasolItem({ children, width, height, className, sx }: itemProps) {
    return (
        <Fragment>
            <div style={{ width: width ? width : "20rem", height: height ? height : "15rem", backgroundColor: "transparent", ...sx }} className={className && className} >{children}</div>

        </Fragment >
    )
}

interface Props {
    children: ReactNode;
    disableSlide?: boolean;
}
function Caurasol({ children, disableSlide }: Props) {
    const slider = useRef<HTMLDivElement>(null)
    const [slide, setSlide] = useState<number>(0);
    const [showToast, setToast] = useState(false);
    const handleSlider = (action: "next" | "prev") => {

        if (slider.current) {
            if (action === "next") {
                console.log(slide + " ");

                if (slide < slider.current.scrollWidth - slider.current.clientWidth) {
                    setSlide(slide + slider.current.clientWidth)
                } else {
                    setToast(true);
                }

            }
            else if (action === "prev") {
                if (slide > 0) {
                    setSlide(slide - slider.current.scrollWidth / 4)
                }
            }
        }
    }
    return (
        <Fragment>
            <div className='flex justify-center items-center'>
                {disableSlide ?
                    <Fragment>
                        <div className={`cscroll w-11/12 mx-auto min-w-[15rem] min-h-[40vh]  bg-transparent relative overflow-x-auto overflow-y-hidden py-3`}>
                            <div ref={slider} className='grid min-w-[15rem] grid-flow-col gap-2 transition-all ease-linear duration-700' style={{ transform: `translate3d(-${slide}px,0px,0px)` }}>
                                {children}
                            </div>
                        </div>
                    </Fragment> :
                    <Fragment>
                        <Button radius='full' color='default' onClick={() => handleSlider('prev')} isIconOnly className="next-btn  w-10  h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>


                        </Button>
                        <div className={`w-11/12 mx-auto min-w-[15rem] min-h-[40vh]  bg-transparent relative overflow-hidden p-3`}>
                            <div ref={slider} className='grid min-w-[15rem] grid-flow-col gap-2 transition-all ease-linear duration-700' style={{ transform: `translate3d(-${slide}px,0px,0px)` }}>
                                {children}
                            </div>
                        </div>
                        <Button radius='full' onClick={() => handleSlider('next')} isIconOnly className="next-btn w-10  h-10 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>

                        </Button>
                    </Fragment>}
            </div>

            <Toast open={showToast} onClose={() => { setToast(false) }}>
                No More Items.
            </Toast>
        </Fragment>
    )
}

export default Caurasol