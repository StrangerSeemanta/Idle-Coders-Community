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

function DynamicVideoPlayerPage() {
    const { fileURL } = useParams();
    const [isPageLoading, setPageLoading] = useState(false);
    const [fileData, setFileData] = useState<DocumentData | DocumentDataProps | null>(null);
    const navigate = useNavigate();
    const [docId, setDocId] = useState<string>()
    const [NewFileName, setNewFileName] = useState<string>('')
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
        if (docId) {
            setIsUpdatingFilename(true);
            updateDocumentField(docId, "fileName", NewFileName)
                .then(async () => {
                    await fetchFileData()
                    setIsUpdatingFilename(false);
                    setEditFileName(false);
                })
        }
    }

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
                        <Player
                            onLoadedMetadata={() => {
                                console.log("done");
                            }}
                            src={fileData.fileSrc}
                            className="max-w-2xl shadow-lg shadow-black/40 " />

                        <div>
                            <div className="flex justify-center items-center gap-3">
                                <h1 className="w-full text-left font-semibold text-large ">{fileData.fileName}</h1>
                                <Button onPress={() => setEditFileName(true)} size="sm" variant="light" isIconOnly radius="full">
                                    <MdEdit size={17} />
                                </Button>
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
                            <Input autoFocus name="newfilenameinp" id="newfilenameinp" color="danger" variant="bordered" className="mt-3" labelPlacement="outside" aria-label="Enter-File-Name" size="lg" type="text" value={NewFileName} onValueChange={setNewFileName} radius="sm" />
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
