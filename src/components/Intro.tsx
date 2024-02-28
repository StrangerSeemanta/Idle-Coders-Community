import { Button, Link, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react"
import Logo from "./../assets/logo.png"
import MailIcon from "../Icons/MailIcon"
import { Fragment, useEffect, useRef } from "react"
function SubscribeForm({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: () => void }) {
    const BrevoFormSource = "https://33e5d9e9.sibforms.com/serve/MUIFADWNf8QbqQ5lLSW5u7_uEzpSZoORR66jvfKgnvWf6xgAdI3V55XcT1uzbQu3Ds87tME6Z6TN_BoiC_NW4CEAlbTIirtKH1IkVDRTSk8W6N7iu9t8FDKVQ6Tgf896bralsvQ5Q3dlErQxFhbaVP7XjmlEnr7ArWZgc3gQCGQqrcJ8eCG0C6SD8_RYMhNYaFqweWGNeGPF1YHx"
    return (
        <Fragment>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' scrollBehavior="outside" placement='bottom-center' size='full'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody >
                                <iframe className="w-full h-full "
                                    src={BrevoFormSource}
                                    allowFullScreen
                                ></iframe>

                            </ModalBody>
                            <ModalFooter className="flex items-center justify-center">
                                <Button variant="light" radius="sm" onPress={onClose}>Dissmiss</Button>
                            </ModalFooter>
                        </>
                    )}

                </ModalContent>
            </Modal>
            <div className="">
            </div>
        </Fragment>
    )
}
function Intro() {
    const logoDiv = useRef<HTMLDivElement>(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                            <Button onPress={onOpen} radius="sm" variant="shadow" color="danger">
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

            <SubscribeForm isOpen={isOpen} onOpenChange={onOpenChange} />

        </>
    )
}

export default Intro