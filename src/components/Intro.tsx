import { Button, Link, Progress, Spinner } from "@nextui-org/react"
import Logo from "./../assets/logo.png"
import MailIcon from "../Icons/MailIcon"
import { Fragment, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
export function SubscribeForm() {
    const [showLoadingFrame, setShowLoadingFrame] = useState(false);
    const BrevoFormSource = "https://33e5d9e9.sibforms.com/serve/MUIFADYldQOpbu-CwXM-DHaw9w-V31a9SbjbqkW0J5Vd8zYB_Y4K_xN-_-rmGZO2680EgKevY_afqLfOlMNjuClh5UGHOkujm3R2ROROx9xByHzsBHdEJuOAmyb3bPUS3nxHxPDwOkPF2_84CkmqmYAKw6JzBODR1v4NzH52zp9sfvh-DxIZxTzRIWfCCvLUhYdpqf1fzi-odaRD"
    return (
        <Fragment>
            <div className="w-full min-h-fit">
                {
                    !navigator.onLine ?
                        <div className="flex flex-col gap-2 justify-center text-default-600/60 items-center text-2xl h-screen">
                            <Spinner color="current" size="lg" className="mb-2" />
                            <span className="font-bold ">                            No Internet. Failed To Load The Content
                            </span>
                            <span className="text-lg text-default-500/50 animate-pulse">Connect your internet & try again</span>
                        </div>
                        :
                        <>
                            <iframe onLoad={() => setShowLoadingFrame(false)} className="w-full min-h-screen h-[120vh] "
                                src={BrevoFormSource}
                                allowFullScreen
                            ></iframe>
                            {showLoadingFrame &&
                                <>
                                    <div className="bg-white h-[90vh] w-full text-lg flex items-center justify-center gap-8 flex-col text-danger">
                                        <Progress className="max-w-lg" size="sm" isIndeterminate color="danger" />
                                    </div>
                                </>}</>
                }



            </div>
        </Fragment>
    )
}
function Intro() {
    const logoDiv = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    useEffect(() => {

        logoDiv.current?.addEventListener('mousemove', (event) => {
            if (logoDiv.current) {
                const x = -(logoDiv.current.clientWidth / 2 - event.pageX) / 25;
                const y = -(logoDiv.current.clientHeight / 2 - event.pageY) / 25;
                logoDiv.current.setAttribute('style', `transform: rotateX(${x / 2}deg) rotateY(${y}deg)`)

            }
        });
        logoDiv.current?.addEventListener('mouseleave', () => {
            if (logoDiv.current) {

                logoDiv.current.setAttribute('style', ` `)

            }
        });

    }, [logoDiv])
    return (
        <>
            <div className="container md:w-10/12 px-5 md:px-0  min-h-[110vh] flex flex-col mx-auto " >
                <div className="grid w-full grid-cols-1 my-auto mt-12 mb-8 lg:grid-cols-3 xl:gap-14 md:gap-5">
                    <div className="flex flex-col justify-center col-span-2 text-center lg:text-start">
                        <div className="flex items-center justify-center mb-4 lg:justify-normal">
                            <h4 className="ml-2 text-sm font-bold tracking-widest text-primary uppercase">Welcome to Idle Coders </h4>
                        </div>
                        <h1 className="mb-8 text-4xl font-extrabold leading-tight lg:text-5xl text-foreground">Your Gateway to <span className="text-danger">Front-End Excellence !</span></h1>
                        <p className="mb-6 text-base font-normal text-justify leading-7 lg:w-3/4 text-foreground">
                            Welcome to Idle Coders, where we turn programming into a laid-back, laughter-filled journey! Join our chill coding community for a blend of idle vibes and tech wizardry. Stay tuned for code-driven relaxation and a dash of humor.

                            <a href="https://www.youtube.com/@idlecoders" className="text-danger font-bold hover:underline cursor-pointer"> Hit subscribe on Youtube.</a> <br /> And idle away with us - because coding should be as fun as taking it easy 💤😴
                            But remember Sleeping Is More Interesting Than Coding....
                        </p>
                        <div className="flex flex-col items-center gap-4 lg:flex-row">
                            <Button onPress={() => navigate("subscribe")} radius="sm" variant="shadow" color="danger">
                                Stay With Us
                            </Button>
                            <Button as={Link} size="md" radius="sm" variant="light" className="text-medium" href="mailto:ssworkmail22@gmail.com" startContent={<MailIcon />}>
                                Send Mail
                            </Button>
                        </div>
                    </div>
                    <div ref={logoDiv} className="items-center justify-end hidden col-span-1 lg:flex ">
                        <img className="w-full rounded-md shadow-lg shadow-danger-50 " src={Logo} alt="header image" />
                    </div>
                </div>
            </div>


        </>
    )
}

export default Intro