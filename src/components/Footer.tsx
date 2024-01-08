import { Button } from "@nextui-org/react"
import { FaYoutube, FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer bg-default-100">


            <div className="footer-copyright mx-auto  pb-10 pt-7 text-center flex flex-col-reverse lg:flex-row gap-y-8 justify-between items-center">
                <div className="w-1/4 hidden lg:block">
                    <h1 className="text-2xl lg:text-4xl font-bold text-danger">Idle Coders</h1>
                    <p className="mt-1 text-tiny lg:text-medium mx-auto text-foreground-500">
                        Idle Away With Us
                    </p>
                </div>
                <div className="w-full lg:w-2/4 flex-1 flex flex-col justify-center items-center gap-2 border-t-1 border-divider py-4 md:border-none lg:py-0">
                    <div className="flex justify-center items-center gap-x-2 text-default-700/70">
                        <FaRegCopyright size={15} />
                        <span className="text-md font-medium">Copyrights</span>
                    </div>
                    <span>All Rights Reserved To <strong className="text-primary">Idle Coders</strong> Youtube Channel</span>
                    <ul className="flex w-[200px] items-center justify-center mt-2 gap-x-4">
                        <Button
                            color="default"
                            isIconOnly
                            radius="full"
                            variant="ghost"
                            size="md"
                            onPress={() =>
                                open('https://www.facebook.com/Stranger.Seemanta/')
                            }
                            className="hover:text-danger transition"
                        >
                            <FaFacebook size={21} />
                        </Button>
                        <Button
                            isIconOnly
                            radius="full"
                            variant="ghost"
                            size="md"
                            onPress={() =>
                                open('https://twitter.com/shuvosarker01')
                            }
                            className="hover:text-danger transition"
                        >
                            <FaXTwitter size={21} />

                        </Button>
                        <Button
                            isIconOnly
                            radius="full"
                            variant="ghost"
                            size="md"
                            className="hover:text-danger transition"
                            onPress={() => open("https://github.com/StrangerSeemanta")}
                        >
                            <FaGithub size={21} />
                        </Button>
                        <Button
                            isIconOnly
                            radius="full"
                            variant="ghost"
                            size="md"
                            className="hover:text-danger transition"
                            onPress={() => open("https://www.youtube.com/@idlecoders")}
                        >
                            <FaYoutube size={21} />
                        </Button>




                    </ul>
                </div>

                <div className="w-full  lg:w-1/4 flex flex-col ">
                    <h3 className="text-lg font-bold">Design &amp; Developed By </h3>
                    <p className="text-foreground-500">Shuvo Sarker</p>
                    <p className="text-foreground-500">Full-Stack Developer & UI Analyst</p>
                </div>
            </div>

        </footer>
    )
}

export default Footer