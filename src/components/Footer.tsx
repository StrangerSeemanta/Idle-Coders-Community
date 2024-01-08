import { Button } from "@nextui-org/react"
import { FaYoutube, FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="footer bg-default-100">
            <div className="container mx-auto px-10">
                <div className="flex flex-wrap pb-10 pt-[52px] items-center justify-between">
                    <div className="w-full md:w-5/12 lg:w-1/5 mt-12 md:col-6 lg:col-3">
                        <h1 className="text-3xl font-bold text-danger">Idle Coders Community</h1>
                        <p className="mt-6 text-sm text-foreground-500">
                            Making environments for all developers. Idle Away With Us
                        </p>
                    </div>
                    <div className="w-full md:w-5/12 flex flex-col justify-center h-full gap-1 lg:w-1/5 mt-12 md:col-6 lg:col-3">
                        <h6 className="font-bold text-lg">Socials</h6>
                        <p className="text-foreground-500 ">ssworkmail22@gmail.com</p>
                        <ul className="flex w-full items-center justify-start gap-4 md:gap-0 md:justify-evenly mt-4 lg:mt-6">
                            <Button
                                color="default"
                                isIconOnly
                                radius="full"
                                variant="ghost"
                                size="lg"
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
                                size="lg"
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
                                size="lg"
                                className="hover:text-danger transition"
                                onPress={() => open("https://github.com/StrangerSeemanta")}
                            >
                                <FaGithub size={21} />
                            </Button>
                            <Button
                                isIconOnly
                                radius="full"
                                variant="ghost"
                                size="lg"
                                className="hover:text-danger transition"
                                onPress={() => open("https://www.youtube.com/@idlecoders")}
                            >
                                <FaYoutube size={21} />
                            </Button>




                        </ul>
                    </div>
                    <div className="w-full md:w-5/12 flex flex-col gap-6 lg:w-1/5 mt-12 md:col-6 lg:col-3">
                        <h6 className="font-bold text-lg">Quick Links</h6>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li className="text-foreground-500 hover:underline">
                                <a href="#">Join With Us</a>
                            </li>
                            <li className="text-foreground-500 hover:underline">
                                <a href="#">Latest Blogs</a>
                            </li>
                            <li className="text-foreground-500 hover:underline">
                                <a href="#">Need Help?</a>
                            </li>

                        </ul>
                    </div>
                    <div className="w-full flex flex-col gap-4 md:w-5/12 lg:w-1/5 mt-12 md:col-6 lg:col-3">
                        <h3 className="text-lg font-bold">Design &amp; Developed By </h3>
                        <p className="text-foreground-500">Shuvo Sarker</p>
                        <p className="text-foreground-500">Full-Stack Developer & UI Analyst</p>
                    </div>
                </div>
            </div>
            <div className="container max-w-[1440px]">
                <div className="footer-copyright mx-auto border-t border-border pb-10 pt-7 text-center">
                    <p className="flex justify-center items-center gap-4">
                        <span><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill="currentColor" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM199.4 312.6c-31.2-31.2-31.2-81.9 0-113.1s81.9-31.2 113.1 0c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9c-50-50-131-50-181 0s-50 131 0 181s131 50 181 0c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0c-31.2 31.2-81.9 31.2-113.1 0z" /></svg></span>
                        <span>All Rights Reserved To <strong className="text-primary">Idle Coders</strong> Youtube Channel</span>
                    </p>

                </div>
            </div>
        </footer>
    )
}

export default Footer