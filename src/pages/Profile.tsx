import { Fragment, useState, useEffect, } from "react";
import { Button, Image, Spinner } from "@nextui-org/react";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import Cover from '../assets/cover-01.png';
import userSix from "../assets/user-06.png"
import { FaCamera } from "react-icons/fa6";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import GoogleIcon from "../Icons/GoogleIcon";


export interface ProfileData {
    photoSrc: string | null;
    photoName: string;
}
function Profile() {
    const [user, setUser] = useState<User | null>(null); // Specify the type as User | null
    const [isLoading, setIsLoading] = useState(true);
    const [showToast, setToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const navigate = useNavigate()


    useEffect(() => {

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
                setIsLoading(false)
            } else {
                // No user is signed in
                setUser(null);
                setIsLoading(false);
                setToast(true);
                setToastMsg("No User Found")
            }
        });

        // Clean up subscription
        return () => unsubscribe();
    }, []);

    // const handleDelete = () => {
    //     setIsLoading(true)
    //     if (user) {
    //         deleteUser(user).then(() => {
    //             setIsLoading(false)
    //             setToast(true)
    //             setToastMsg("Permanently Deleted Your Account ")
    //         })
    //     }
    // };
    // Handle file input change




    return (
        <Fragment>
            {
                isLoading ?
                    <>
                        <div className="w-full h-screen flex justify-center items-center">
                            <Spinner size="lg" color="success" />
                        </div>
                    </>
                    : !user ?

                        <div className="flex h-screen flex-col gap-y-5 justify-center items-center w-full">
                            <h1 className='text-4xl font-bold'>
                                Join Our Community
                            </h1>

                            <Button color="danger" radius="sm" variant="solid" disableAnimation size="lg" onPress={() => navigate('/resources/account/login')
                            }>Go To Login Page</Button>
                        </div> :
                        <div className="w-full min-h-screen py-4 px-5 ">
                            <h1 className="text-2xl font-bold ">Profile</h1>
                            <div className="border border-default bg-default-100 rounded-small overflow-hidden shadow-lg shadow-black/20 mt-10 pb-14">

                                {/* Cover Pic */}
                                <div className="relative overflow-hidden z-20   ">
                                    <Image src={Cover} radius="none" />
                                    <label htmlFor="change-cover" className="absolute bottom-5 right-5 z-50 bg-primary text-white sm:py-2 sm:px-3 p-2 text-tiny sm:text-sm flex justify-center items-center gap-x-2 shadow-xl cursor-pointer hover:brightness-125 transition-all">
                                        <FaCamera size={20} />
                                        <span>Edit</span>
                                        <input id="change-cover" type="file" className="hidden" />
                                    </label>
                                </div>

                                {/* User Pic */}
                                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                                    <div className="relative z-30 mx-auto -mt-24 h-[7.5rem] flex justify-center items-center  w-full max-w-[7.5rem] rounded-full bg-white/20 p-1 backdrop-blur-sm sm:h-[11rem] sm:max-w-[11rem] sm:p-3">
                                        <div className="drop-shadow-md w-24 h-24 sm:h-36 sm:w-36 rounded-full overflow-hidden ">
                                            <Image src={userSix} alt="profile" />

                                        </div>
                                        <div
                                            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-4 sm:right-2"
                                        >
                                            <FaCamera size={15} />

                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className=" text-center">
                                    <h3 className="mb-1.5 text-2xl font-semibold text-foreground">
                                        {user.displayName}
                                    </h3>
                                    <p className="font-medium text-default-500">{user.email}</p>
                                    <div className="mx-auto mt-4 mb-5 grid max-w-[23rem] grid-cols-3 rounded-md border-2 border-default-100  py-4 shadow-md  dark:bg-[#37404F]">
                                        <div className="flex flex-col items-center justify-center gap-1 border-r-2 border-stroke px-4  sm:flex-row">
                                            <span className="font-semibold text-foreground">
                                                259
                                            </span>
                                            <span className="text-sm">Posts</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-1 border-r-2 border-stroke px-4  sm:flex-row">
                                            <span className="font-semibold text-foreground">
                                                129K
                                            </span>
                                            <span className="text-sm">Followers</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-1  px-4  sm:flex-row">
                                            <span className="font-semibold text-foreground">
                                                2K
                                            </span>
                                            <span className="text-sm">Following</span>
                                        </div>
                                    </div>

                                    <div className="mx-auto max-w-[45rem] my-10">
                                        <h4 className="font-semibold text-foreground">
                                            About Me
                                        </h4>
                                        <p className="mt-7 text-sm text-default-500 tracking-wide">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Pellentesque posuere fermentum urna, eu condimentum mauris
                                            tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
                                            ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
                                            pharetra ligula sed, aliquam lacus.
                                        </p>
                                    </div>

                                    {/* Follow */}
                                    <div className="mt-8">
                                        <h4 className="mb-3 font-medium text-foreground">
                                            Follow me on
                                        </h4>
                                        <div className="flex items-center justify-between max-w-[11rem] mx-auto gap-3.5">
                                            <Link
                                                to="#"
                                                className="text-primary-500 hover:opacity-70 transition-opacity"
                                                aria-label="social-icon"
                                            >
                                                <FaFacebook size={25} />
                                            </Link>
                                            <Link
                                                to="#"
                                                className="text-default-500 hover:opacity-70 transition-opacity"
                                                aria-label="social-icon"
                                            >
                                                <GoogleIcon size={45} />
                                            </Link>
                                            <Link
                                                to="#"
                                                className="text-danger-500 hover:opacity-70 transition-opacity"
                                                aria-label="social-icon"
                                            >
                                                <FaInstagramSquare size={25} />
                                            </Link>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            }
            <Toast open={showToast} onClose={() => setToast(false)}>
                {toastMsg}
            </Toast>

        </Fragment >
    )
}

export default Profile;
