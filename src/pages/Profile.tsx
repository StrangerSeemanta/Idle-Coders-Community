import { Fragment, useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Spinner } from "@nextui-org/react";
import { deleteUser, getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { IoIosImages } from "react-icons/io";


function Profile() {
    const [user, setUser] = useState<User>(); // Specify the type as User | null
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
                setUser(undefined);
                setIsLoading(false)
            }
        });

        // Clean up subscription
        return () => unsubscribe();
    }, []);
    const handleLogOut = () => {
        const auth = getAuth();
        signOut(auth).
            then(() => {
                setToast(true);
                setToastMsg("Successfully Logged out")

            })
            .catch(er => {
                console.log(er)
            })
    };
    const handleDelete = () => {
        setIsLoading(true)
        if (user) {
            deleteUser(user).then(() => {
                setIsLoading(false)
                setToast(true)
                setToastMsg("Permanently Deleted Your Account ")
            })
        }
    };

    return (
        <Fragment>
            {
                isLoading ?
                    <>
                        <div className="w-full h-screen flex justify-center items-center">
                            <Spinner size="lg" color="danger" />
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
                        <div className="w-full min-h-screen p-10">

                            <div className=" ">
                                <h1 className="text-3xl font-semibold mb-4">User Details</h1>
                                <Card className="max-w-[400px] h-48">
                                    <CardHeader className="justify-between">
                                        <div className="flex gap-5">
                                            <Avatar isBordered radius="full" size="md" src={user && user.photoURL ? user.photoURL : undefined} />
                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                <h4 className="text-small font-semibold leading-none text-default-600">{user.displayName}</h4>
                                                <h5 className="text-small tracking-tight text-default-400">{user.email}</h5>
                                            </div>
                                        </div>
                                        {user && (
                                            <Button
                                                color="default"
                                                radius="full"
                                                size="sm"
                                                variant={"bordered"}
                                                onPress={handleLogOut}
                                            >
                                                Log Out
                                            </Button>
                                        )}

                                    </CardHeader>
                                    <CardBody className="px-3 py-0 text-small text-default-400">
                                        <p>
                                            last Sign In Time: {user.metadata.lastSignInTime}
                                        </p>
                                        <span className="pt-2">
                                            Authorized By:
                                            <span className="py-2 ml-2 uppercase" aria-label="computer" role="img">
                                                {user.providerData[0].providerId}
                                            </span>
                                        </span>
                                    </CardBody>
                                    <CardFooter className="gap-3">

                                        {user && (
                                            <Button
                                                color="danger"
                                                radius="full"
                                                size="sm"
                                                variant={"light"}
                                                onPress={handleDelete}
                                            >
                                                Delete Account
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>

                            </div>

                            <div onClick={() => { return navigate('/user/gallery') }} className="my-10 ">

                                <Card className="max-w-[400px] h-48">

                                    <CardBody className="px-3 group hover:opacity-60 cursor-pointer transition-opacity w-full flex justify-center items-center  py-0 text-small text-success">
                                        <IoIosImages className="mb-4 group-hover:text-default-400" size={50} />
                                        <h1 className="group-hover:text-default-400 text-5xl font-bold text-teal-500">
                                            Gallery
                                        </h1>
                                    </CardBody>

                                </Card>

                            </div>

                        </div>
            }
            <Toast open={showToast} onClose={() => setToast(false)}>
                {toastMsg}
            </Toast>
        </Fragment>
    )
}

export default Profile;
