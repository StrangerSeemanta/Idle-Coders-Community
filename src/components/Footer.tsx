import { Button } from "@nextui-org/react"

function Footer() {
    return (
        <footer className="footer bg-default-100">
            <div className="container mx-auto px-10">
                <div className="flex flex-wrap pb-10 pt-[52px] items-center justify-between">
                    <div className="w-full md:w-5/12 lg:w-1/5 mt-12 md:col-6 lg:col-3">
                        <h1 className="text-3xl font-bold text-purple-600">Idle Coders Community</h1>
                        <p className="mt-6 text-sm text-foreground-500">
                            Making environments for all developers. Idle Away With Us
                        </p>
                    </div>
                    <div className="w-full md:w-5/12 flex flex-col justify-center h-full gap-1 lg:w-1/5 mt-12 md:col-6 lg:col-3">
                        <h6 className="font-bold text-lg">Socials</h6>
                        <p className="text-foreground-500 ">ssworkmail22@gmail.com</p>
                        <ul className="flex w-full items-center justify-start gap-4 md:gap-0 md:justify-evenly mt-4 lg:mt-6">
                            <Button color="default" isIconOnly radius="full" variant="ghost" size="lg">
                                <svg width="19" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.1056 10.4495C19.1056 5.09642 15 0.759277 9.9327 0.759277C4.86539 0.759277 0.759766 5.09642 0.759766 10.4495C0.759766 15.2946 4.08865 19.3191 8.49018 20.0224V13.2627H6.15996V10.4495H8.49018V8.33951C8.49018 5.91696 9.85872 4.54939 11.93 4.54939C12.9657 4.54939 14.0013 4.74476 14.0013 4.74476V7.12823H12.8547C11.7081 7.12823 11.3382 7.87063 11.3382 8.65209V10.4495H13.8904L13.4835 13.2627H11.3382V20.0224C15.7398 19.3191 19.1056 15.2946 19.1056 10.4495Z" fill="currentColor"></path>
                                </svg>
                            </Button>
                            <Button isIconOnly radius="full" variant="ghost" size="lg">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" fill="currentColor" /></svg>

                            </Button>
                            <Button isIconOnly radius="full" variant="ghost" size="lg">
                                <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.56609 15.2704V5.45315H0.948103V15.2704H4.56609ZM2.73764 4.1398C3.90474 4.1398 4.83841 3.31895 4.83841 2.33394C4.83841 1.38176 3.90474 0.59375 2.73764 0.59375C1.60945 0.59375 0.675781 1.38176 0.675781 2.33394C0.675781 3.31895 1.60945 4.1398 2.73764 4.1398ZM18.0654 15.2704H18.1044V9.8857C18.1044 7.259 17.4041 5.22331 13.7472 5.22331C11.9966 5.22331 10.8295 6.04415 10.3237 6.79933H10.2848V5.45315H6.82246V15.2704H10.4404V10.411C10.4404 9.13053 10.7128 7.91568 12.5801 7.91568C14.4475 7.91568 14.4864 9.36036 14.4864 10.5095V15.2704H18.0654Z" fill="currentColor"></path>
                                </svg>
                            </Button>
                            <Button isIconOnly radius="full" variant="ghost" size="lg">
                                <svg width="19" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.3829 10.554C15.4875 10.0381 15.5573 9.48523 15.5573 8.9324C15.5573 4.76772 12.3483 1.37701 8.40687 1.37701C7.88367 1.37701 7.36047 1.45072 6.87215 1.56129C6.20943 1.00846 5.37231 0.676758 4.50031 0.676758C2.33775 0.676758 0.59375 2.55639 0.59375 4.80458C0.59375 5.76282 0.87279 6.64735 1.39599 7.34761C1.29135 7.86359 1.22159 8.41642 1.22159 8.9324C1.22159 13.1339 4.43055 16.5246 8.37199 16.5246C8.89518 16.5246 9.41838 16.4509 9.9067 16.3404C10.5694 16.8932 11.4065 17.188 12.2785 17.188C14.4411 17.188 16.1851 15.3453 16.1851 13.0602C16.22 12.1388 15.9061 11.2543 15.3829 10.554ZM8.61615 13.9447C6.31407 13.9447 4.39567 12.8759 4.39567 11.5491C4.39567 10.9595 4.70959 10.4066 5.44207 10.4066C6.52335 10.4066 6.62799 12.0651 8.51151 12.0651C9.3835 12.0651 9.97646 11.6597 9.97646 11.1069C9.97646 10.4066 9.41838 10.2961 8.51151 10.0749C6.34895 9.48523 4.39567 9.2641 4.39567 6.86849C4.39567 4.65716 6.45359 3.84633 8.19759 3.84633C10.116 3.84633 12.0693 4.65716 12.0693 5.91024C12.0693 6.53679 11.6856 7.08962 11.0229 7.08962C10.0462 7.08962 10.0113 5.83653 8.40687 5.83653C7.49999 5.83653 6.94191 6.09452 6.94191 6.68421C6.94191 7.38446 7.67439 7.45818 9.34862 7.90044C10.7787 8.23214 12.5227 8.85869 12.5227 10.7383C12.5227 12.9128 10.5345 13.9447 8.61615 13.9447Z" fill="currentColor"></path>
                                </svg>
                            </Button>




                        </ul>
                    </div>
                    <div className="w-full md:w-5/12 flex flex-col gap-6 lg:w-1/5 mt-12 md:col-6 lg:col-3">
                        <h6 className="font-bold text-lg">Quick Links</h6>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li className="text-foreground-500 hover:underline">
                                <a href="about.html">Join With Us</a>
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
                        <h3 className="text-lg font-bold">Location &amp; Contact </h3>
                        <p className="text-foreground-500">2118 Thornridge Cir. Syracuse, Connecticut 35624</p>
                        <p className="text-foreground-500">(704) 555-0127</p>
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