import { Fragment, memo, useEffect, useRef, useState } from "react";
import { Card, CardBody, CardFooter, Input, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure, } from "@nextui-org/react";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { Button, Image, Spinner } from "@nextui-org/react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IoAddCircle, IoImage, IoSearch } from "react-icons/io5";
import { uploadBytes } from "firebase/storage";
import { FirebaseApp } from "./Account";
import Toast from "../components/Toast";
import { getFileType } from "../modules/getUserDetails";
import Player from "../components/Player";
import { IoIosDocument, IoIosDownload } from "react-icons/io";
import { FilterButton } from "./Projects";
import { twMerge } from "tailwind-merge";
interface Photo {
    title: string;
    src: string;
    filename: string;
    ftype: string;
}
const videoFileType = ["video/mp4", "video/webm", "video/avi"];
// Import necessary components and functions

// Define the PhotoCard component
const PhotoCard = memo(({ title, src, filename, ftype }: Photo) => {
    const { isOpen, onOpenChange, onOpen } = useDisclosure()
    // Define the Preview component
    const Preview = () => {
        console.log(ftype);

        if (!ftype) {
            return null; // If file type is not provided, return null
        }

        if (ftype.includes("image/")) {
            return (
                <PhotoProvider>
                    <PhotoView src={src}>
                        <Image className="object-contain cursor-pointer h-[30vh]" src={src} />
                    </PhotoView>
                </PhotoProvider>
            );
        } else if (videoFileType.includes(ftype)) { // Corrected variable name
            return <Player className="cursor-pointer" src={src} />;
        } else if (ftype.includes("application/")) {
            return (
                <div onClick={onOpen} className="w-full h-[30vh] flex cursor-pointer  justify-center items-center">
                    <IoIosDocument size={60} className="text-danger" />
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full" className="p-4">
                        <ModalContent>

                            {(onClose) => (
                                <>
                                    <ModalBody className="h-full">
                                        {
                                            ftype === "application/pdf" ?
                                                <iframe src={src} width={"100%"} className="h-full mx-auto" />
                                                :
                                                <>
                                                    <iframe src={src} className="hidden mx-auto" />
                                                    <h1 className="w-full h-full text-3xl flex gap-2 justify-center items-center">
                                                        <IoIosDownload size={40} />
                                                        Download This File To Open</h1>
                                                </>
                                        }
                                    </ModalBody>
                                    <ModalFooter className="flex justify-evenly ">
                                        <p className="text-medium font-bold">{filename}</p>
                                        <Button onPress={onClose} radius="sm" variant="ghost" color="danger">Close</Button></ModalFooter>

                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>

            )// If file type is application (e.g., PDF), render document icon
        }
        else {
            return null; // If file type is not supported, return null
        }

    };


    // Render the PhotoCard component
    return (
        <>
            <div className="hover:bg-primary-100 dark:hover:bg-default-50 transition-colors animate-appearance-in p-4 flex flex-col justify-center items-center gap-5 shadow-lg shadow-black/10 h-[50vh] rounded-medium border-default border-1">
                <div className="w-full">
                    <h1 className="text-xl w-full">{title}</h1>
                    <h1 className="text-tiny w-full">{filename}</h1>
                </div>
                <Preview />
            </div>


        </>
    );
})

// Define the PhotoGallery component
function UserGallery() {
    // State variables
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const [selectedFileName, setSelectedFileName] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const [showToast, setToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const navigate = useNavigate();
    // State for selected filter option
    const [selectedChips, setSelectedChips] = useState<string>("all"); // Default to "all"
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterKeys, setFilterKeys] = useState<string[]>(["all"])
    // Effect hook to fetch user and photos data
    useEffect(() => {
        const auth = getAuth(FirebaseApp);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (currentUser) {
            const fetchPhotos = async () => {
                try {
                    const storage = getStorage(FirebaseApp);
                    const storageRef = ref(storage, `img/${currentUser.uid}`);
                    const res = await listAll(storageRef);
                    const urlsPromises = res.items.map(async (itemRef, index) => {
                        const url = await getDownloadURL(itemRef);
                        const metadata = await getMetadata(itemRef);
                        const ftype = await getFileType(itemRef.fullPath);
                        const splittedType = metadata.name.split('.')[metadata.name.split('.').length - 1];
                        setFilterKeys((prev) => !prev.includes(splittedType) ? [...prev, splittedType] : [...prev])
                        return { id: index, title: `Item ${index + 1}`, src: url, filename: metadata.name, ftype: ftype };
                    });
                    const photoData = await Promise.all(urlsPromises);
                    setPhotos(photoData);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching photos:", error);
                    setLoading(false);
                }
            };
            fetchPhotos();
        }
    }, [currentUser]);

    // Handle file input change
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFileName(event.target.files[0].name);
        } else {
            setSelectedFileName("");
        }
    };

    // Handle file upload
    const handleUploadFile = () => {
        if (currentUser && imageRef.current?.files && imageRef.current.files.length > 0 && selectedFileName.length > 0) {
            setIsUploading(true);
            const storage = getStorage(FirebaseApp);
            const file = imageRef.current.files[0];
            const url = `img/${currentUser.uid}/${file.name}`;
            const storeRef = ref(storage, url);
            uploadBytes(storeRef, file)
                .then(() => {
                    setIsUploading(false);
                    setToast(true);
                    setToastMsg("Successfully Uploaded");
                    setSelectedFileName("");
                })
                .catch((error) => {
                    console.error("Error uploading file: ", error);
                    setIsUploading(false);
                    setToast(true);
                    setToastMsg("Upload Failed, Try Again");
                });
        } else {
            setToast(true);
            setToastMsg("No file selected");
        }
    };

    // Function to filter photos based on selected filter and search query
    const filterPhotos = (photos: Photo[]): Photo[] => {
        const filteredPhotos = photos.filter((photo) => {
            // Filter by selected chips
            const type = photo.ftype.split("/").length > 0 ? photo.filename.split('.')[photo.filename.split('.').length - 1] : photo.ftype;
            if (selectedChips !== "all" && !selectedChips.includes(type)) {
                return false;
            }
            // Filter by search query
            if (searchQuery && !photo.filename.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            return true;
        });
        return filteredPhotos;
    };

    // Event handler to update selected chips
    const handleChipToggle = (chip: string) => {
        if (selectedChips === chip) {
            setSelectedChips("all")
        } else {
            setSelectedChips(chip)
        }
    };

    // Event handler to update search query

    // Render the PhotoGallery component
    return (
        <Fragment>
            {/* Filter UI */}
            <div className="flex items-center justify-between mb-4 p-3 w-full">
                <div className="relative flex items-center gap-3 overflow-x-auto w-2/3 cscroll pb-3 ">
                    {filterKeys.map((name, index) => (
                        <FilterButton
                            className={
                                twMerge("uppercase text-lg border-2 border-foreground transition-colors  font-bold py-3 px-5 rounded", name === selectedChips ? "bg-foreground text-background dark:hover:bg-foreground-500 hover:bg-foreground-700" : "bg-background dark:hover:bg-foreground-500 text-foreground hover:text-background hover:bg-foreground")}
                            key={name + String(index)}
                            filterName={name}
                            onClick={() => {
                                handleChipToggle(name)
                            }} />
                    ))}
                </div>
                <Input isClearable value={searchQuery} startContent={<IoSearch size={20} className="inline-block mr-2" />
                } type="text" radius="sm"
                    placeholder="Search By File Name..."
                    onValueChange={setSearchQuery} variant="bordered" className="w-60 pb-3 " size="sm" />



            </div>
            {
                loading ? (
                    <div className="h-screen w-full flex justify-center items-center">
                        <Spinner size="lg" color="success" label="Collecting Photos ..." />
                    </div>
                ) : currentUser ? (
                    <div className="grid min-h-screen  items-start justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5 px-4">
                        {filterPhotos(photos).map((photo, index) => (
                            <PhotoCard key={index} ftype={photo.ftype} filename={photo.filename} title={photo.title} src={photo.src} />
                        ))}
                        <div className="hover:bg-primary-100 dark:hover:bg-default-50 transition-colors group animate-appearance-in  p-4 flex flex-col justify-center items-center gap-5 shadow-lg shadow-black/10 h-[50vh] rounded-medium border-1 border-default">
                            <Card className="w-full bg-background group-hover:bg-primary-100 dark:group-hover:bg-default-50 border-none shadow-none h-full">
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <input ref={imageRef} className="hidden" type="file" id="upload-pic" onChange={handleFileInputChange} />
                                    <label htmlFor="upload-pic" className="group cursor-pointer hover:opacity-80 transition-opacity w-full h-full flex justify-center items-center">
                                        {isUploading ? (
                                            <Spinner color="success" size="lg" />
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
                                <CardFooter className="justify-between">
                                    <div className="flex gap-2 w-full">
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
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
                        <h1 className="text-2xl text-danger font-bold">You Need To Log in first</h1>
                        <Button onPress={() => navigate("/resources/account/login")} color="danger" variant="shadow" size="lg" radius="sm">
                            Log In
                        </Button>
                    </div>
                )
            }
            <Toast open={showToast} onClose={() => setToast(false)}>
                {toastMsg}
            </Toast>
        </Fragment >
    );
}

export default UserGallery;
