import { Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import { Card, CardBody, CardFooter, CircularProgress, Input, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure, } from "@nextui-org/react";
import 'react-photo-view/dist/react-photo-view.css';
import { getStorage, ref, listAll, getDownloadURL, getMetadata, deleteObject, uploadBytesResumable } from "firebase/storage";
import { Button } from "@nextui-org/react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IoAddCircle, IoImage, IoImageSharp, IoSearch } from "react-icons/io5";
import { FirebaseApp } from "./Account";
import Toast from "../components/Toast";
import { getFileType } from "../modules/getUserDetails";
import { IoMdRemoveCircle } from "react-icons/io";
import { FilterButton } from "./Projects";
import { twMerge } from "tailwind-merge";
import { FaFileAudio, FaFilePdf, FaPlay, FaVideo } from "react-icons/fa";
import '../react-h5-audio-player.css';
import formatBytes from "../modules/formatBytes";
import { createUserStorageDocument, deleteUserStorageDocument, readUserStorageDocument } from "../modules/manageStorageDatabase";
import { TokenizingProps, tokenize } from "../modules/tokenize";
import PageLoader from "./PageLoader";
import { LuExternalLink } from "react-icons/lu";
import { TbFileUnknown } from "react-icons/tb";

export interface StorageFileDataProps {
    src: string;
    filename: string;
    originalName: string;
    ftype: string;
    onDelete?: () => void;
    docToken: TokenizingProps;
}
// Import necessary components and functions

// Define the PhotoCard component
const PhotoCard = memo(({ filename, ftype, onDelete, docToken }: StorageFileDataProps) => {
    const navigate = useNavigate()
    // Define the Preview component
    const Preview = () => {

        if (!ftype) {
            return null; // If file type is not provided, return null
        }

        if (ftype.includes("image/")) {
            return (
                <div className="w-full h-[30vh] flex cursor-pointer  justify-center items-center">
                    <IoImageSharp size={55} className="text-success group-hover:hidden animate-appearance-in" />
                    <div className="animate-appearance-in p-3 hover:brightness-110 rounded-full justify-center items-center bg-success shadow-medium shadow-black/30 hidden group-hover:flex">
                        <LuExternalLink size={40} className="text-white" />
                    </div>
                </div>
            );
        } else if (ftype.includes("video/")) { // Corrected variable name
            return <>
                <div className="w-full h-[30vh] flex cursor-pointer  justify-center items-center">
                    <FaVideo size={55} className="text-success group-hover:hidden animate-appearance-in" />
                    <div className="animate-appearance-in p-3 hover:brightness-110 rounded-full justify-center items-center bg-success shadow-medium shadow-black/30 hidden group-hover:flex">
                        <FaPlay size={40} className="text-white" />
                    </div>
                </div>

            </>;
        } else if (ftype.includes("application/pdf")) {
            return (
                <div className="w-full h-[30vh] flex cursor-pointer  justify-center items-center">
                    <FaFilePdf size={55} className="text-success group-hover:hidden animate-appearance-in" />
                    <div className="animate-appearance-in p-3 hover:brightness-110 rounded-full justify-center items-center bg-success shadow-medium shadow-black/30 hidden group-hover:flex">
                        <LuExternalLink size={40} className="text-white" />
                    </div>
                </div>

            )// If file type is application (e.g., PDF), render document icon
        } else if (ftype.includes("audio/")) {
            return (
                <div className="w-full h-[30vh] flex cursor-pointer  justify-center items-center">
                    <FaFileAudio size={55} className="text-success group-hover:hidden animate-appearance-in" />
                    <div className="animate-appearance-in p-3 hover:brightness-110 rounded-full justify-center items-center bg-success shadow-medium shadow-black/30 hidden group-hover:flex">
                        <FaPlay size={40} className="text-white" />
                    </div>
                </div>

            )// If file type is application (e.g., PDF), render document icon
        }
        else {
            return (
                <div className="w-full h-[30vh] flex cursor-pointer  justify-center items-center">
                    <TbFileUnknown size={55} className="text-success group-hover:hidden animate-appearance-in" />
                    <div className="animate-appearance-in p-3 hover:brightness-110 rounded-full justify-center items-center bg-success shadow-medium shadow-black/30 hidden group-hover:flex">
                        <LuExternalLink size={40} className="text-white" />
                    </div>
                </div>

            ); // If file type is not supported, return null
        }

    };


    // Render the PhotoCard component
    return (
        <>
            <div className="group dark:bg-primary-50/60 hover:bg-foreground-100 dark:hover:bg-primary-50 transition-colors animate-appearance-in p-4 flex flex-col justify-center items-center gap-5 shadow-medium mt-3 shadow-black/10 h-[50vh] rounded-medium border-default border-1">
                <div className="w-full flex justify-between">
                    <div className="overflow-hidden">
                        <h1 className="text-sm w-full">{filename}</h1>
                    </div>
                    <Button onPress={onDelete} variant="light" className="invisible group-hover:visible" color="danger" isIconOnly size="sm" radius="full" >
                        <IoMdRemoveCircle className="text-danger" size={20} />
                    </Button>
                </div>
                {Preview
                    &&
                    <div onClick={() => navigate(`play/${docToken.tokenizedString}`)}>
                        <Preview />
                    </div>
                }
            </div>


        </>
    );
})

// Define the PhotoGallery component
function UserGallery() {
    // State variables
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState<StorageFileDataProps[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const [selectedFileName, setSelectedFileName] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadingValue, setUploadingValue] = useState(0);
    const [uploadingDetails, setUploadingDetails] = useState<string>("0");

    const [showToast, setToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const navigate = useNavigate();
    // State for selected filter option
    const [selectedChips, setSelectedChips] = useState<string>("all"); // Default to "all"
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterKeys, setFilterKeys] = useState<string[]>(["all"])
    const { isOpen, onOpenChange, onOpen } = useDisclosure()
    // Effect hook to fetch user and photos data
    useEffect(() => {
        const auth = getAuth(FirebaseApp);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);
    const fetchPhotos = useCallback(async () => {
        if (currentUser) {
            setLoading(true)
            try {
                const storage = getStorage(FirebaseApp);
                const storageRef = ref(storage, `storage/${currentUser.uid}`);
                const res = await listAll(storageRef);
                const urlsPromises = res.items.map(async (itemRef, index) => {
                    const url = await getDownloadURL(itemRef);

                    const metadata = await getMetadata(itemRef);
                    const ftype = await getFileType(itemRef.fullPath);
                    const splittedType = ftype.split('/')[0];
                    const tokens = tokenize(metadata.name);
                    const documents = await readUserStorageDocument();
                    const matchedDocument = documents?.find((doc) => {
                        return doc.id === metadata.name;

                    })

                    const fileNameFromDB = matchedDocument?.data().fileName;

                    // DATABASE> USERS > USERS.UID> Create Collection "storageData"
                    const UserStorageDataFields = {
                        fileName: fileNameFromDB ? fileNameFromDB : metadata.name,
                        originalFileName: metadata.name,
                        fileSrc: url,
                        fileType: ftype,
                        fileSize: metadata.size,
                        fileUploadTime: metadata.timeCreated,
                        tokens: tokens,
                    };
                    await createUserStorageDocument(metadata.name, UserStorageDataFields);

                    setFilterKeys((prev) => !prev.includes(splittedType) ? [...prev, splittedType] : [...prev])
                    return {
                        id: index,
                        title: `Item ${index + 1}`,
                        src: url,
                        filename: fileNameFromDB ? fileNameFromDB : metadata.name,
                        originalName: metadata.name,
                        ftype: ftype,
                        docToken: tokens
                    };
                });
                const photoData = await Promise.all(urlsPromises);
                setPhotos(photoData);
                setLoading(false);






            } catch (error) {
                console.error("Error fetching photos:", error);
                setLoading(false);
            }
        }
    }, [currentUser])
    useEffect(() => {

        fetchPhotos();

    }, [currentUser, fetchPhotos]);

    // Handle file input change
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFileName(event.target.files[0].name);
        } else {
            setSelectedFileName("");
        }
    };

    // Handle file upload
    const handleUploadFile = async () => {
        if (currentUser && imageRef.current?.files && imageRef.current.files.length > 0 && selectedFileName.length > 0) {
            setIsUploading(true);
            const storage = getStorage(FirebaseApp);
            const file = imageRef.current.files[0];
            const url = `storage/${currentUser.uid}/${file.name}`;
            const storeRef = ref(storage, url);

            // Upload the file
            const uploadTask = uploadBytesResumable(storeRef, file);

            // Listen for state changes and progress
            uploadTask.on("state_changed",
                (snapshot) => {
                    // Get upload progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadingValue(progress);
                    setUploadingDetails(`Uploaded ${formatBytes(snapshot.bytesTransferred)} of ${formatBytes(snapshot.totalBytes)} `)
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

                    // Fetch updated photos
                    await fetchPhotos();
                }
            );
        } else {
            setToast(true);
            setToastMsg("No file selected");
        }
    };

    // Handle File Delete
    const deleteFile = async (fileName: string) => {
        if (currentUser) {
            setLoading(true)
            try {
                const storage = getStorage(FirebaseApp)
                const url = `storage/${currentUser.uid}/${fileName}`
                const storageRef = ref(storage, url); // Replace 'storage' with your Firebase Storage instance
                await deleteObject(storageRef);
            } catch (e) {
                setLoading(false)
                throw new Error("Operation Failed");

            }
        } else {
            throw new Error("No User Found")
        }
    };

    const handleDelete = (fileName: string) => {
        deleteFile(fileName).then(async () => {
            await deleteUserStorageDocument(fileName)
            setToast(true);
            setToastMsg("File Removed. ");
            fetchPhotos()
        }).catch(e => {
            setToast(true);
            setToastMsg("Operation Failed ")
            console.log(e);

        })

    }
    // Function to filter photos based on selected filter and search query
    const filterPhotos = (photos: StorageFileDataProps[]): StorageFileDataProps[] => {
        const filteredPhotos = photos.filter((photo) => {
            // Filter by selected chips
            const type = photo.ftype.split("/").length > 0 ? photo.ftype.split('/')[0] : photo.ftype;
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
            {/* Filter UI */}
            <div className="my-4 px-4">
                <h1 className="text-3xl font-bold "><span className="">Storage</span> <span className="text-default-500">- Store Whatever You Want</span></h1>
            </div>
            <div className="bg-default-100 dark:bg-primary-50 shadow-medium backdrop-saturate-150 backdrop-blur-lg z-50 flex flex-col-reverse  lg:flex-row items-start lg:items-center  lg:justify-between mb-4 p-3 w-full">
                <div className="relative flex items-center gap-3 overflow-x-auto w-full lg:w-2/3 cscroll pb-3 mr-4">
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
                <div className="flex flex-col sm:flex-row sm:justify-center
                            sm:items-center pb-3 w-full sm:w-auto gap-2">
                    <Input isClearable fullWidth value={searchQuery} startContent={<IoSearch size={20} className="inline-block mr-2" />
                    } type="text" radius="sm"
                        placeholder="Search By File Name..."
                        onValueChange={setSearchQuery} variant="bordered" className="sm:w-60  " size="sm" />
                    <div onClick={onOpen} className="uppercase text-center text-medium border-2 border-foreground  bg-foreground text-background cursor-pointer hover:opacity-80 transition-opacity font-bold py-2 px-5 rounded">Upload</div>
                </div>

            </div>
            {
                loading ? (
                    <div className="h-[70vh] w-full flex justify-center items-center">
                        <PageLoader label="Processing Your Items ..." />
                    </div>
                ) : currentUser ? (
                    <>
                        <div className="my-3 px-4">
                            <h1 className="text-lg font-bold">Total File : {filterPhotos(photos).length}</h1>
                        </div>
                        {/* Photos Grid */}
                        <div className="grid min-h-screen  items-start justify-between grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5 px-4">
                            {filterPhotos(photos).map((photo, index) => (
                                <PhotoCard
                                    key={index}
                                    onDelete={() => handleDelete(photo.originalName)}
                                    {...photo}
                                />
                            ))}

                        </div>
                    </>
                ) : (
                    <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-8">
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className="p-4">
                <ModalContent>

                    <>

                        <ModalBody className="h-full flex justify-center items-center">
                            <div className="w-full hover:bg-foreground-100 dark:hover:bg-default-50 transition-colors group animate-appearance-in  p-4 flex flex-col justify-center items-center gap-5 shadow-lg shadow-black/10 h-[50vh] rounded-medium border-1 border-default">
                                <Card className="w-full bg-background group-hover:bg-foreground-100 dark:group-hover:bg-default-50 border-none shadow-none h-full">
                                    <CardBody className="px-3 py-0 text-small text-default-400">
                                        <input ref={imageRef} className="hidden" type="file" id="upload-pic" onChange={handleFileInputChange} />
                                        <label htmlFor="upload-pic" className={twMerge("group cursor-pointer hover:opacity-80 transition-opacity w-full h-full flex justify-center items-center", isUploading && "pointer-events-none")}>
                                            {isUploading ? (
                                                <CircularProgress
                                                    classNames={{
                                                        svg: "w-36 h-36 drop-shadow-md",
                                                        indicator: "stroke-success",
                                                        track: "stroke-default/40",
                                                        value: "text-3xl font-semibold text-success",
                                                        label: "text-foreground"
                                                    }}
                                                    value={uploadingValue}
                                                    label={uploadingDetails}
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
                            {!isUploading &&
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
                                </div>}
                        </ModalFooter>

                    </>
                </ModalContent>
            </Modal>
        </Fragment >
    );
}

export default UserGallery;
