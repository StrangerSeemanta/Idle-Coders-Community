import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentDataProps, readUserStorageDocument, updateDocumentField } from "../modules/manageStorageDatabase";
import { DocumentData } from "firebase/firestore";
import Nopage from "./Nopage";
import Player from "../components/Player";
import PageLoader from "./PageLoader";
import { Button, ButtonGroup, Input, Spinner } from "@nextui-org/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { IoIosDownload } from "react-icons/io";
import { PhotoProvider, PhotoView } from "react-photo-view";
import AudioPlayer from 'react-h5-audio-player';

function DynamicVideoPlayerPage() {
    const { fileURL } = useParams();
    const [isPageLoading, setPageLoading] = useState(false);
    const [fileData, setFileData] = useState<DocumentData | DocumentDataProps | null>(null);
    const navigate = useNavigate();
    const [docId, setDocId] = useState<string>()
    const [NewFileName, setNewFileName] = useState<string | null>(null)
    const [editFileName, setEditFileName] = useState(false);
    const [isUpdatingFilename, setIsUpdatingFilename] = useState(false)
    const fetchFileData = useCallback(async () => {
        async function retriveData() {
            try {
                const fileDocuments = await readUserStorageDocument();
                const docId = fileDocuments?.find((document) => {
                    return document.data().tokens.tokenizedString === fileURL
                })
                setDocId(docId?.id)
                const matchedDocument = fileDocuments?.map((docs) => { return docs.data() }).find((data) => {
                    return data.tokens.tokenizedString === fileURL;
                });
                return matchedDocument ? matchedDocument : null;
            } catch (error) {
                throw new Error(`${error}`);
            }
        }

        if (fileURL) {
            retriveData().then((matchedData) => {
                setPageLoading(false);
                if (matchedData) {
                    setFileData(matchedData);
                } else {
                    setFileData(null);
                }
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [fileURL]);

    useEffect(() => {
        setPageLoading(true);

        fetchFileData();
    }, [fileURL, fetchFileData]);
    const handleEditFileName = async () => {
        if (docId && NewFileName) {
            setIsUpdatingFilename(true);
            updateDocumentField(docId, "fileName", NewFileName)
                .then(async () => {
                    await fetchFileData()
                    setIsUpdatingFilename(false);
                    setEditFileName(false);
                })
        }
    }

    const Preview = () => {

        if (!fileData?.fileType) {
            return null; // If file type is not provided, return null
        }

        if (fileData?.fileType.includes("image/")) {
            return (
                <div className="w-full flex justify-center">
                    <PhotoProvider>
                        <PhotoView src={fileData?.fileSrc}>
                            <img className="object-contain cursor-zoom-in h-[50vh]" src={fileData.fileSrc} />
                        </PhotoView>
                    </PhotoProvider>
                </div>
            );
        } else if (fileData?.fileType.includes("video/")) { // Corrected variable name
            return <>
                <Player
                    onLoadedMetadata={() => {
                        console.log("done");
                    }}
                    src={fileData.fileSrc}
                    className="max-w-2xl shadow-lg shadow-black/40 " />

            </>;
        } else if (fileData?.fileType.includes("application/pdf")) {
            return (
                <iframe src={fileData?.fileSrc} width={"100%"} className="h-screen mx-auto" />


            )// If file type is application (e.g., PDF), render document icon
        } else if (fileData?.fileType.includes("audio/")) {
            return (
                <>
                    <AudioPlayer
                        autoPlay={false}

                        className="max-w-xl mt-4 rounded-medium "
                        volume={.5}
                        src={fileData.fileSrc}
                        onPlay={e => console.log("onPlay ", e)}
                    />
                </>

            )// If file type is application (e.g., PDF), render document icon
        }
        else {
            return (
                <>
                    <iframe src={fileData?.fileSrc} className="hidden mx-auto" />
                    <h1 className="w-full h-screen text-3xl flex gap-2 justify-center items-center">
                        <IoIosDownload size={40} />
                        Download This File To Open</h1>
                </>

            ); // If file type is not supported, return null
        }

    };
    return (
        <Fragment>
            {isPageLoading ?
                <div className="h-screen w-full flex justify-center items-center">
                    <PageLoader />
                </div> : (fileData?.fileName ?
                    <div className="flex flex-col  justify-center items-start px-6 py-4 gap-6">
                        <Button onPress={() => navigate(-1)} size="lg" variant="flat" className="shadow-medium" isIconOnly radius="full">
                            <IoArrowBackOutline size={27} />
                        </Button>
                        {/*  */}
                        <Preview />
                        <div>
                            <div className="flex justify-center items-center gap-3">
                                <h1 className="w-full text-left font-semibold text-large ">{fileData.fileName} <Button onPress={() => setEditFileName(true)} size="sm" variant="light" isIconOnly radius="full">
                                    <MdEdit size={17} />
                                </Button></h1>

                            </div>
                            <h3 className="text-small">Uploaded: {fileData.fileUploadTime.split("T")[0]}</h3>
                        </div>
                    </div> :
                    <Nopage />)}

            {editFileName && <div className="fixed animate-appearance-in z-50 top-0 left-0 w-full h-screen bg-transparent backdrop-blur-md flex justify-center items-center">
                <div className="max-w-lg rounded-md bg-background/60 py-6 px-8 shadow-large">
                    {isUpdatingFilename ?
                        <>
                            <div className="flex justify-center items-center">
                                <Spinner size="lg" color="success" />
                            </div>
                        </>
                        :
                        <>
                            <label htmlFor="newfilenameinp" className="text-large">Enter New File Name</label>
                            <Input autoFocus name="newfilenameinp" id="newfilenameinp" color="danger" isClearable variant="bordered" className="mt-3" labelPlacement="outside" aria-label="Enter-File-Name" size="lg" type="text" value={NewFileName ? NewFileName : fileData?.fileName} onValueChange={setNewFileName} radius="sm" />
                        </>}
                    <ButtonGroup className="mt-4" fullWidth variant="solid" size="md" color="default">
                        <Button onPress={() => setEditFileName(false)} color="default">Dissmiss</Button>
                        <Button onPress={handleEditFileName} color="success">Update</Button>
                    </ButtonGroup>
                </div>
            </div>}
        </Fragment>
    );
}

export default DynamicVideoPlayerPage;
