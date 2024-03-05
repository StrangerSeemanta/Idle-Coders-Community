import { Fragment, useEffect, useRef, useState } from "react";
import { Card, CardBody, CardFooter, } from "@nextui-org/react";

import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { Button, Image, Spinner } from "@nextui-org/react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IoAddCircle, IoImage } from "react-icons/io5";
import { uploadBytes } from "firebase/storage";
import { FirebaseApp } from "./Account";
import Toast from "../components/Toast";
interface Photo {
    title: string;
    src: string;
}

function PhotoCard({ title, src }: Photo) {
    return (
        <a target="_blank" href={src} className="w-80 hover:opacity-80 transition-opacity  h-[50vh]">
            <div className="animate-appearance-in w-80 p-4 flex flex-col justify-center items-center gap-5 shadow-lg shadow-black/10 h-[50vh] rounded-medium border-default border-1">
                <h1 className="text-xl w-full">{title}</h1>
                <Image className="object-contain h-[30vh]" src={src} />
            </div>
        </a>
    );
}

function PhotoGallery() {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const imageRef = useRef<HTMLInputElement>(null)
    const [selectedFileName, setSelectedFileName] = useState<string>(""); // State to hold the selected file name
    const [isUploading, setIsUploading] = useState(false);
    const [showToast, setToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(FirebaseApp);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false); // Set loading to false when user state is determined
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (currentUser) {
            const fetchPhotos = async () => {
                const storage = getStorage(FirebaseApp);
                const storageRef = ref(storage, `img/${currentUser.uid}`);
                try {
                    const res = await listAll(storageRef);
                    const urlsPromises = res.items.map((itemRef) => getDownloadURL(itemRef));
                    const urls = await Promise.all(urlsPromises);
                    const photoData = urls.map((url, index) => ({ id: index, title: `Photo ${index + 1}`, src: url }));
                    setPhotos(photoData);
                } catch (error) {
                    console.error("Error fetching photos:", error);
                }
            };

            fetchPhotos();
        }
    }, [currentUser]);

    // Upload

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // When the file input changes, update the state with the selected file name
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFileName(event.target.files[0].name);
        } else {
            setSelectedFileName("");
        }
    }
    const handleUploadFile = () => {

        if (currentUser) {
            if (selectedFileName.length > 0) {
                setIsUploading(true)
                const storage = getStorage(FirebaseApp);
                if (imageRef.current?.files && imageRef.current.files.length > 0) {
                    const file = imageRef.current.files[0];
                    const imgStoreRef = ref(storage, `img/${currentUser.uid}/${file.name}`);
                    uploadBytes(imgStoreRef, file).then(() => {
                        // File uploaded successfully
                        setIsUploading(false)
                        setToast(true);
                        setToastMsg(" Successfully Uploaded")
                        setSelectedFileName('')
                        // You can also display a toast or provide feedback to the user
                    }).catch((error) => {
                        // Handle errors here
                        console.error("Error uploading file: ", error);
                        setToast(true);
                        setToastMsg("Uploaded Failed, Try Again")
                        // You can also display a toast or provide feedback to the user
                    });
                } else {
                    // No file selected, handle this case
                    setToastMsg("No file selected"); setToast(true)
                    // You can also display a toast or provide feedback to the user
                }
            } else {
                setToastMsg("No file selected"); setToast(true)

            }
        } else {
            setToastMsg("Unathorized Action Detected"); setToast(true)
        }
    }

    return (
        <Fragment>
            {loading ? ( // Show loading spinner while loading
                <div className="h-screen w-full flex justify-center items-center">
                    <Spinner size="lg" color="success" />
                </div>
            ) : currentUser ? ( // Show photo gallery if user is logged in
                <div className="grid min-h-screen  items-start justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5 px-6">

                    {/* <h1 className="text-3xl font-semibold mb-4">One Place All You Need</h1> */}

                    {photos.map((photo, index) => (
                        <PhotoCard key={index} title={photo.title} src={photo.src} />
                    ))}
                    <div className="animate-appearance-in w-80 p-4 flex flex-col justify-center items-center gap-5 shadow-lg shadow-black/10 h-[50vh] rounded-medium border-1 border-default">
                        <Card className="w-full border-none shadow-none h-full">

                            <CardBody className="px-3 py-0 text-small text-default-400">
                                <input ref={imageRef} className="hidden" type="file" id="upload-pic" onChange={handleFileInputChange} />
                                <label htmlFor="upload-pic" className="group cursor-pointer hover:opacity-80 transition-opacity w-full h-full flex justify-center items-center">

                                    {/* Display the selected file name if available */}
                                    {isUploading ?
                                        <Spinner color="success" size="lg" />
                                        : selectedFileName ?
                                            <>
                                                <div className="w-full">
                                                    <div className="w-full flex items-center justify-center">
                                                        <IoImage size={40} className="text-success group-hover:text-default-400 transition-colors" />
                                                    </div>
                                                    <span className="ml-2 tec  text-sm  break-words group-hover:text-default-400 transition-colors text-success">{selectedFileName}</span>
                                                </div>
                                            </>

                                            :
                                            <IoAddCircle size={60} />
                                    }
                                </label>
                            </CardBody>
                            <CardFooter className="justify-between">

                                <div className="flex gap-2 w-full ">

                                    <Button
                                        color="success"
                                        className="bg-foreground text-background"
                                        radius="sm"
                                        fullWidth
                                        size="md"
                                        variant={"solid"}
                                        onPress={handleUploadFile}
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            ) : ( // Redirect to login page if user is not logged in
                <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
                    <h1 className="text-2xl text-danger font-bold">You Need To Log in first </h1>
                    <Button onPress={() => navigate("/resources/account/login")} color="danger" variant="shadow" size="lg" radius="sm">
                        Log In
                    </Button>
                </div>
            )}

            <Toast open={showToast} onClose={() => setToast(false)}>
                {toastMsg}
            </Toast>
        </Fragment>
    );
}

export default PhotoGallery;
