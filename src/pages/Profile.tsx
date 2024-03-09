import { Fragment, useState, useEffect, useRef, useCallback } from "react";
import { Button, Card, CardBody, CardFooter, CircularProgress, Image, Modal, ModalBody, ModalContent, ModalFooter, Spinner, useDisclosure } from "@nextui-org/react";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import Cover from '../assets/cover-01.png';
import UserSix from '../assets/user-06.png';

import { FaCamera } from "react-icons/fa6";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import GoogleIcon from "../Icons/GoogleIcon";
import { IoAddCircle, IoImage } from "react-icons/io5";
import { deleteObject, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { FirebaseApp } from "./Account";
import { getProfilePicture } from "../modules/getUserDetails";

export interface ProfileData {
    photoSrc: string;
    photoName: string;
}
function Profile() {
    const [user, setUser] = useState<User | null>(null); // Specify the type as User | null
    const [isLoading, setIsLoading] = useState(true);
    const [showToast, setToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure()
    const navigate = useNavigate()
    const [isUploading, setIsUploading] = useState(false);
    const [uploadingValue, setUploadingValue] = useState(0);
    const profileImageRef = useRef<HTMLInputElement>(null);
    const [selectedFileName, setSelectedFileName] = useState<string>("");
    const [photoData, setPhotoData] = useState<ProfileData[] | null>(null)

    const [isFetching, setIsFetching] = useState(false);
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
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFileName(event.target.files[0].name);
        } else {
            setSelectedFileName("");
        }
    };
    async function handleDeletePrevProfilePic() {
        try {
            if (user && photoData) {
                const storage = getStorage(FirebaseApp);
                for (const photo of photoData) {
                    const url = `profileImages/${user.uid}/${photo.photoName}`;
                    const storageRef = ref(storage, url);
                    await deleteObject(storageRef);
                }
            } else {
                throw new Error("User or photo data not found");
            }
        } catch (error) {
            console.error("Error deleting previous profile picture:", error);
            throw new Error("Operation Failed");
        }
    }


    const fetchPhotos = useCallback(async () => {
        setIsFetching(true)
        if (user) {

            const response = await getProfilePicture()
            if (response) {
                setPhotoData(response)
                setIsFetching(false)
            }

        }
    }, [user])

    useEffect(() => {

        fetchPhotos();

    }, [user, fetchPhotos]);
    // Handle file upload
    const handleUploadFile = async () => {
        if (user && profileImageRef.current?.files && profileImageRef.current.files.length > 0 && selectedFileName.length > 0) {
            setIsUploading(true);
            const storage = getStorage(FirebaseApp);
            const file = profileImageRef.current.files[0];
            const url = `profileImages/${user.uid}/${file.name}`;
            const storeRef = ref(storage, url);

            await handleDeletePrevProfilePic()
            // Upload the file
            const uploadTask = uploadBytesResumable(storeRef, file);

            // Listen for state changes and progress
            uploadTask.on("state_changed",
                (snapshot) => {
                    // Get upload progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadingValue(progress);
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error("Error uploading file: ", error);
                    setIsUploading(false);
                    setToast(true);
                    setToastMsg("Upload Failed, Try Again");
                },
                async () => {
                    // Handle successful uploads
                    setIsUploading(false);
                    setToast(true);
                    setToastMsg("Successfully Uploaded");
                    setSelectedFileName("");
                    onClose()
                    // Fetch updated photos
                    await fetchPhotos()
                }
            );
        } else {
            setToast(true);
            setToastMsg("No file selected");
        }
    };
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
                                            <Image isLoading={isFetching} src={photoData ? photoData[0].photoSrc : UserSix} alt="profile" />

                                        </div>
                                        <div
                                            onClick={onOpen}
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className="p-4">
                <ModalContent>

                    <>

                        <ModalBody className="h-full flex justify-center items-center">
                            <div className="w-full hover:bg-foreground-100 dark:hover:bg-default-50 transition-colors group animate-appearance-in  p-4 flex flex-col justify-center items-center gap-5 shadow-lg shadow-black/10 h-[50vh] rounded-medium border-1 border-default">
                                <Card className="w-full bg-background group-hover:bg-foreground-100 dark:group-hover:bg-default-50 border-none shadow-none h-full">
                                    <CardBody className="px-3 py-0 text-small text-default-400">
                                        <input ref={profileImageRef} className="hidden" type="file" id="upload-pic" onChange={handleFileInputChange} />
                                        <label htmlFor="upload-pic" className="group cursor-pointer hover:opacity-80 transition-opacity w-full h-full flex justify-center items-center">
                                            {isUploading ? (
                                                <CircularProgress
                                                    classNames={{
                                                        svg: "w-36 h-36 drop-shadow-md",
                                                        indicator: "stroke-success",
                                                        track: "stroke-default/40",
                                                        value: "text-3xl font-semibold text-success",
                                                    }}
                                                    value={uploadingValue}
                                                    strokeWidth={4}
                                                    showValueLabel={true}
                                                />
                                            ) : selectedFileName ? (
                                                <>
                                                    <div className="w-full">
                                                        <div className="w-full flex items-center justify-center">
                                                            <IoImage size={40} className="text-default-400 group-hover:text-success transition-colors" />
                                                        </div>
                                                        <span className="ml-2 text-sm break-words group-hover:text-success transition-colors text-default-400">{selectedFileName}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <IoAddCircle size={60} className="group-hover:text-success" />
                                            )}
                                        </label>
                                    </CardBody>
                                    <CardFooter>
                                        <span className="text-tiny font-mono font-semibold italic">
                                            If you close this popup or reload this page, your upload will be cancelled
                                        </span>
                                    </CardFooter>
                                </Card>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-center">

                            <div className="flex gap-2 w-full animate-appearance-in">
                                <Button
                                    color="success"
                                    className="bg-foreground text-background"
                                    radius="sm"
                                    fullWidth
                                    size="md"
                                    variant="solid"
                                    onPress={handleUploadFile}
                                >
                                    Upload
                                </Button>
                            </div>
                        </ModalFooter>

                    </>
                </ModalContent>
            </Modal>
        </Fragment >
    )
}

export default Profile;
