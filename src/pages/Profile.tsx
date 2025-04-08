import { Fragment, useState, useEffect, useRef, useCallback } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CircularProgress,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Progress,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import Cover from "../assets/cover-01.png";

import { FaCamera } from "react-icons/fa6";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import GoogleIcon from "../Icons/GoogleIcon";
import { IoAddCircle, IoCloseCircleOutline, IoImage } from "react-icons/io5";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FirebaseApp } from "./Account";
import { PhotoProvider, PhotoView } from "react-photo-view";
import formatBytes from "../modules/formatBytes";
import { FiEdit } from "react-icons/fi";

export interface ProfileData {
  photoSrc: string | null;
  photoName: string;
}
function Profile() {
  const [user, setUser] = useState<User | null>(null); // Specify the type as User | null
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [isProfilePicUploading, setIsProfilePicUploading] = useState(false);
  const [isCoverPicUploading, setIsCoverPicUploading] = useState(false);

  const [ProfilePicUploadingValue, setProfilePicUploadingValue] = useState(0);
  const [profilePicUploadingDetails, setProfilePicUploadingDetails] =
    useState<string>("");

  const [CoverPicUploadingValue, setCoverPicUploadingValue] = useState(0);
  const [coverPicUploadingDetails, setCoverPicUploadingDetails] =
    useState<string>("");
  const profileImageRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);

  const [selectedFileNamePP, setSelectedFileNamePP] = useState<string>("");
  const [selectedFileNameCP, setSelectedFileNameCP] = useState<string>("");

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState<string>(Cover);
  const [isCoverImagePopup, setCoverImagePopup] = useState<boolean>(false);

  const [isFetching, setIsFetching] = useState(false);
  const [isCoverFetching, setIsCoverFetching] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
        setIsLoading(false);
      } else {
        // No user is signed in
        setUser(null);
        setIsLoading(false);
        setToast(true);
        setToastMsg("No User Found");
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
  const handleProfilePicInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFileNamePP(event.target.files[0].name);
    } else {
      setSelectedFileNamePP("");
    }
  };
  async function handleDeletePrevProfilePic() {
    try {
      if (user && profileImage) {
        const storage = getStorage(FirebaseApp);
        const url = `profileImage/${user.uid}`;
        const storageRef = ref(storage, url);
        const res = await listAll(storageRef);
        if (res.items.length > 0) {
          res.items.map(async (itemRef) => {
            await deleteObject(itemRef);
          });
        }
      } else {
        throw new Error("User or photo data not found");
      }
    } catch (error) {
      console.error("Error deleting previous profile picture:", error);
      throw new Error("Operation Failed");
    }
  }

  const fetchProfilePhotos = useCallback(async () => {
    setIsFetching(true);

    if (user) {
      try {
        const storage = getStorage(FirebaseApp);
        const storageRef = ref(storage, `profileImage/${user.uid}`);
        const res = await listAll(storageRef);
        const urlsPromises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return url;
        });
        const photoData = await Promise.all(urlsPromises);
        setIsFetching(false);
        photoData[0]
          ? setProfileImage(photoData[0])
          : user.photoURL
          ? setProfileImage(user.photoURL)
          : setProfileImage("");
      } catch (error) {
        throw new Error("Failed To Fetch Profile Picture");
        setIsFetching(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchProfilePhotos();
  }, [user, fetchProfilePhotos]);
  // Handle file upload
  const handleUploadFile = async () => {
    if (
      user &&
      profileImageRef.current?.files &&
      profileImageRef.current.files.length > 0 &&
      selectedFileNamePP.length > 0
    ) {
      setIsProfilePicUploading(true);
      const storage = getStorage(FirebaseApp);
      const file = profileImageRef.current.files[0];
      const url = `profileImage/${user.uid}/${file.name}`;
      const storeRef = ref(storage, url);

      if (file.type.includes("image/")) {
        await handleDeletePrevProfilePic();
        // Upload the file
        const uploadTask = uploadBytesResumable(storeRef, file);

        // Listen for state changes and progress
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get upload progress
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProfilePicUploadingValue(progress);
            setProfilePicUploadingDetails(
              `Uploaded ${formatBytes(
                snapshot.bytesTransferred
              )} of ${formatBytes(snapshot.totalBytes)} `
            );
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error("Error uploading file: ", error);
            setIsProfilePicUploading(false);
            setToast(true);
            setToastMsg("Upload Failed, Try Again");
          },
          async () => {
            // Handle successful uploads
            setIsProfilePicUploading(false);
            setToast(true);
            setToastMsg("Successfully Uploaded");
            setSelectedFileNamePP("");
            onClose();
            // Fetch updated photos
            await fetchProfilePhotos();
          }
        );
      } else {
        setToast(true);
        setToastMsg("You Can Only Upload Image Files");
        setIsProfilePicUploading(false);
        onClose();
        setSelectedFileNamePP("");
      }
    } else {
      setToast(true);
      setToastMsg("No file selected");
    }
  };

  // Handle Cover Images
  const handleCoverPicInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFileNameCP(event.target.files[0].name);
    } else {
      setSelectedFileNameCP("");
    }
  };
  const fetchCoverPhotos = useCallback(async () => {
    setIsCoverFetching(true);

    if (user) {
      try {
        const storage = getStorage(FirebaseApp);
        const storageRef = ref(storage, `coverImage/${user.uid}`);
        const res = await listAll(storageRef);
        const urlsPromises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return url;
        });
        const photoData = await Promise.all(urlsPromises);
        setIsCoverFetching(false);
        photoData[0] ? setCoverImage(photoData[0]) : setCoverImage(Cover);
      } catch (error) {
        throw new Error("Failed To Fetch Profile Picture");
        setIsCoverFetching(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchCoverPhotos();
  }, [user, fetchCoverPhotos]);
  async function handleDeletePrevCoverPic() {
    try {
      if (user && profileImage) {
        const storage = getStorage(FirebaseApp);
        const url = `coverImage/${user.uid}`;
        const storageRef = ref(storage, url);
        const res = await listAll(storageRef);
        if (res.items.length > 0) {
          res.items.map(async (itemRef) => {
            await deleteObject(itemRef);
          });
        }
      } else {
        throw new Error("User or photo data not found");
      }
    } catch (error) {
      console.error("Error deleting previous profile picture:", error);
      throw new Error("Operation Failed");
    }
  }
  const handleCoverImageUpload = async () => {
    if (
      user &&
      coverImageRef.current?.files &&
      coverImageRef.current.files.length > 0 &&
      selectedFileNameCP.length > 0
    ) {
      setIsCoverPicUploading(true);
      const storage = getStorage(FirebaseApp);
      const file = coverImageRef.current.files[0];
      const url = `coverImage/${user.uid}/${file.name}`;
      const storeRef = ref(storage, url);

      if (file.type.includes("image/")) {
        await handleDeletePrevCoverPic();
        // Upload the file
        const uploadTask = uploadBytesResumable(storeRef, file);

        // Listen for state changes and progress
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get upload progress
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setCoverPicUploadingValue(progress);
            setCoverPicUploadingDetails(
              `Uploaded ${formatBytes(
                snapshot.bytesTransferred
              )} of ${formatBytes(snapshot.totalBytes)} `
            );
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error("Error uploading file: ", error);
            setIsCoverPicUploading(false);
            setToast(true);
            setToastMsg("Upload Failed, Try Again");
          },
          async () => {
            // Handle successful uploads
            setIsCoverPicUploading(false);
            setToast(true);
            setToastMsg("Successfully Uploaded");
            setSelectedFileNameCP("");
            setCoverImagePopup(false);
            // Fetch updated photos
            await fetchCoverPhotos();
          }
        );
      } else {
        setToast(true);
        setToastMsg("You Can Only Upload Image Files");
        setIsCoverPicUploading(false);
        setCoverImagePopup(false);
        setSelectedFileNameCP("");
      }
    } else {
      setToast(true);
      setToastMsg("No file selected");
    }
  };
  return (
    <Fragment>
      {isLoading ? (
        <>
          <div className="w-full h-screen flex justify-center items-center">
            <Spinner size="lg" color="success" />
          </div>
        </>
      ) : !user ? (
        <div className="flex h-screen flex-col gap-y-5 justify-center items-center w-full">
          <h1 className="text-4xl font-bold">Join Our Community</h1>

          <Button
            color="danger"
            radius="sm"
            variant="solid"
            disableAnimation
            size="lg"
            onPress={() => navigate("/resources/account/login")}
          >
            Go To Login Page
          </Button>
        </div>
      ) : (
        <div className="w-full min-h-screen py-4 px-5 ">
          <h1 className="text-2xl font-bold ">Profile</h1>
          <div className="border border-default bg-default-100 dark:bg-default-50 rounded-small overflow-hidden shadow-lg shadow-black/20 mt-10 pb-14">
            {/* Cover Pic */}
            <div className="relative overflow-hidden w-full h-56 z-20   ">
              {!isCoverFetching ? (
                <>
                  <PhotoProvider>
                    <PhotoView src={coverImage}>
                      <Image
                        src={coverImage}
                        radius="none"
                        removeWrapper
                        className="cursor-pointer transition-all w-full h-56 object-cover hover:brightness-90"
                      />
                    </PhotoView>
                  </PhotoProvider>
                  <div
                    onClick={() => setCoverImagePopup(true)}
                    className="absolute bottom-48  sm:bottom-5 right-5 z-50 bg-primary text-white p-2 sm:p-3 text-tiny sm:text-sm flex justify-center items-center gap-x-2 shadow-xl cursor-pointer hover:brightness-125 transition-all rounded-full"
                  >
                    <FiEdit size={18} />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex  justify-start bg-default-300 animate-pulse items-center">
                  <Spinner size={"lg"} color={"success"} className="mx-12" />
                </div>
              )}
            </div>

            {/* User Pic */}
            <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
              <div className="relative z-30 mx-auto -mt-24 h-[7.5rem] flex justify-center items-center  w-full max-w-[7.5rem] rounded-full bg-white/20 p-1 backdrop-blur-sm sm:h-[11rem] sm:max-w-[11rem] sm:p-3">
                <div className="drop-shadow-md w-24 h-24 sm:h-36 sm:w-36 rounded-full overflow-hidden object-cover flex justify-center items-center">
                  {!isFetching ? (
                    <PhotoProvider>
                      <PhotoView src={profileImage}>
                        <Image
                          isLoading={isFetching}
                          src={profileImage}
                          radius="full"
                          className="w-full h-full hover:brightness-90  cursor-pointer"
                          alt="profile"
                        />
                      </PhotoView>
                    </PhotoProvider>
                  ) : (
                    <Spinner size="lg" color="success" />
                  )}
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
                  <span className="font-semibold text-foreground">259</span>
                  <span className="text-sm">Posts</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 border-r-2 border-stroke px-4  sm:flex-row">
                  <span className="font-semibold text-foreground">129K</span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1  px-4  sm:flex-row">
                  <span className="font-semibold text-foreground">2K</span>
                  <span className="text-sm">Following</span>
                </div>
              </div>

              <div className="mx-auto max-w-[45rem] my-10">
                <h4 className="font-semibold text-foreground">About Me</h4>
                <p className="mt-7 text-sm text-default-500 tracking-wide">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque posuere fermentum urna, eu condimentum mauris
                  tempus ut. Donec fermentum blandit aliquet. Etiam dictum
                  dapibus ultricies. Sed vel aliquet libero. Nunc a augue
                  fermentum, pharetra ligula sed, aliquam lacus.
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
      )}
      <Toast open={showToast} onClose={() => setToast(false)}>
        {toastMsg}
      </Toast>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        className="p-4"
      >
        <ModalContent>
          <>
            <ModalBody className="h-full flex justify-center items-center">
              <div className="w-full hover:bg-foreground-100 dark:hover:bg-default-50 transition-colors group animate-appearance-in  p-4 flex flex-col justify-center items-center gap-5 shadow-lg shadow-black/10 h-[50vh] rounded-medium border-1 border-default">
                <Card className="w-full bg-background group-hover:bg-foreground-100 dark:group-hover:bg-default-50 border-none shadow-none h-full">
                  <CardBody className="px-3 py-0 text-small text-default-400">
                    <input
                      ref={profileImageRef}
                      className="hidden"
                      type="file"
                      id="upload-pic"
                      onChange={handleProfilePicInputChange}
                    />
                    <label
                      htmlFor="upload-pic"
                      className="group cursor-pointer hover:opacity-80 transition-opacity w-full h-full flex justify-center items-center"
                    >
                      {isProfilePicUploading ? (
                        <CircularProgress
                          classNames={{
                            svg: "w-36 h-36 drop-shadow-md",
                            indicator: "stroke-success",
                            track: "stroke-default/40",
                            value: "text-3xl font-semibold text-success",
                            label: "text-foreground",
                          }}
                          label={profilePicUploadingDetails}
                          value={ProfilePicUploadingValue}
                          strokeWidth={4}
                          showValueLabel={true}
                        />
                      ) : selectedFileNamePP ? (
                        <>
                          <div className="w-full">
                            <div className="w-full  flex items-center justify-center">
                              <IoImage
                                size={40}
                                className="text-default-400 group-hover:text-success transition-colors"
                              />
                            </div>
                            <span className="ml-2 text-sm break-words group-hover:text-success transition-colors text-default-400">
                              {selectedFileNamePP}
                            </span>
                          </div>
                        </>
                      ) : (
                        <IoAddCircle
                          size={60}
                          className="group-hover:text-success"
                        />
                      )}
                    </label>
                  </CardBody>
                  <CardFooter className="flex-col">
                    <span className="text-sm font-mono font-semibold text-danger">
                      Select Only Image File
                    </span>
                    <span className="text-tiny font-mono text-default-600/60  italic">
                      If you close this popup or reload this page, your upload
                      will be cancelled
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
      {/* Change Cover Image Custom Modal */}
      {isCoverImagePopup && (
        <div className="bg-background/30 animate-appearance-in flex justify-center items-center backdrop-blur-md fixed top-0 left-0 w-full h-full z-50">
          <div className="p-5 bg-default-100 max-w-lg w-[80%] shadow-large relative">
            <Button
              onPress={() => setCoverImagePopup(false)}
              variant="light"
              className="absolute right-2 top-2"
              isIconOnly
              radius="full"
            >
              <IoCloseCircleOutline size={27} />
            </Button>
            <h1 className="mb-3 text-sm font-bold text-default-600/60">
              Select Background Image
            </h1>

            <Card className="w-full bg-transparent group-hover:bg-foreground-100 dark:group-hover:bg-default-50  h-full shadow-none  border-none">
              <CardBody className="p-3 text-small text-default-400">
                <input
                  ref={coverImageRef}
                  className="hidden"
                  type="file"
                  id="upload-pic"
                  onChange={handleCoverPicInputChange}
                />
                <label
                  htmlFor="upload-pic"
                  className="group cursor-pointer hover:opacity-80 transition-opacity w-full h-full flex justify-center items-center"
                >
                  {isCoverPicUploading ? (
                    <Progress
                      size="sm"
                      radius="sm"
                      classNames={{
                        base: "w-full",
                        track: "drop-shadow-md border border-default",
                        indicator:
                          "bg-gradient-to-r from-pink-500 to-yellow-500",
                        label:
                          "tracking-wider text-tiny sm:text-medium max-w-sm font-medium text-default-600",
                        value: "text-foreground/60",
                      }}
                      label={coverPicUploadingDetails}
                      value={CoverPicUploadingValue}
                      showValueLabel={true}
                    />
                  ) : selectedFileNameCP ? (
                    <>
                      <div className="w-full">
                        <div className="w-full flex items-center justify-center">
                          <IoImage
                            size={30}
                            className="text-default-400 group-hover:text-success transition-colors"
                          />
                        </div>
                        <span className="ml-2 text-sm break-words group-hover:text-success transition-colors text-default-400">
                          {selectedFileNameCP}
                        </span>
                      </div>
                    </>
                  ) : (
                    <IoAddCircle
                      size={40}
                      className="group-hover:text-success"
                    />
                  )}
                </label>
              </CardBody>
              <CardFooter className="max-w-md mx-auto">
                <Button
                  fullWidth
                  size="sm"
                  variant="flat"
                  onPress={handleCoverImageUpload}
                >
                  Upload
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Profile;
