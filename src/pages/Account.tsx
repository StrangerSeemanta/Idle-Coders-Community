import { Button, Checkbox, CheckboxGroup, Divider, Input, Spinner } from '@nextui-org/react'
import { FormEvent, Fragment, useState } from 'react'
import { IoIosEye, IoIosEyeOff, IoIosLock, IoIosLogIn, IoIosMail } from "react-icons/io";
import { FaGithub, FaUserPlus } from "react-icons/fa";
import GoogleIcon from '../Icons/GoogleIcon';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { MdOutlineDone } from "react-icons/md";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";




const firebaseConfig = {
    apiKey: "AIzaSyD6ipY96nfPJcR06KwV_vIpnXJJJ6U2aaU",
    authDomain: "idlecoders-sign-in.firebaseapp.com",
    projectId: "idlecoders-sign-in",
    storageBucket: "idlecoders-sign-in.appspot.com",
    messagingSenderId: "370335361344",
    appId: "1:370335361344:web:ea01e0dbcf2b8edd2772a5",
    measurementId: "G-P893VZTNWJ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export function LoginPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [isLogging, setLogging] = useState(false);
    const [isLoginSuccessful, setLoginSuccessful] = useState(false);
    const [helperText, setHelperText] = useState("")
    const navigate = useNavigate()
    const handleLogIn = (e: FormEvent) => {
        e.preventDefault();
        setLogging(true);
        const auth = getAuth()
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            .then(() => {
                setLogging(false);
                setLoginSuccessful(true);
                navigate("/user/profile")

            }).catch((e) => {
                setLogging(false);
                setLoginSuccessful(false)
                setHelperText("Failed To Log In. Check your mail and password" + e)
            })
    }
    const handleGoogleLogin = () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(() => {

                navigate("/user/profile")

                setLoginSuccessful(true)
                setLogging(false)
            }).catch((error) => {
                console.log(error);
            });
    }
    const githubSignIn = () => {
        signInWithPopup(auth, new GithubAuthProvider())
            .then(() => {

                navigate("/user/profile")


            }).catch((error) => {
                console.log(error);

            });
    }
    return (
        <div className="flex relative justify-center items-center gap-10 flex-col my-20  w-full lg:w-2/3 lg:border-1 p-14 rounded-3xl">
            <h1 className='text-3xl  font-bold'>Log In To Idlecoders</h1>

            <form onSubmit={handleLogIn} className='w-full h-full flex flex-col gap-4'>
                <Input name='account_email' placeholder='Account Username Or Email' startContent={<IoIosMail className='text-default-400' size={26} />} variant='bordered' size='lg' radius='sm' value={loginEmail} onValueChange={setLoginEmail} isClearable
                    isRequired labelPlacement='outside' label="Email" type='Email' />

                <Input name='account_password' autoComplete="current-password" placeholder='Account Password'
                    startContent={<IoIosLock className='text-default-400' size={26} />}
                    endContent={loginPassword.length > 0 &&
                        <Button onPress={() => setShowPassword(!showPassword)} isIconOnly radius='full' size='sm' variant='light'>
                            {showPassword ? <IoIosEye className='text-default-600 ' size={26} /> : <IoIosEyeOff className='text-default-600 ' size={26} />}
                        </Button>}
                    variant='bordered' size='lg' radius='sm' value={loginPassword} onValueChange={setLoginPassword}
                    isRequired labelPlacement='outside' label="Password" type={showPassword ? "text" : "password"} />
                {helperText &&
                    <p className='text-sm text-white p-2 text-center w-full bg-danger'>{helperText}</p>
                }                <Button isDisabled={isLoginSuccessful} type='submit' radius='sm' variant='solid' className={twMerge(isLogging ? "bg-default" : (isLoginSuccessful ? "bg-default" : 'bg-foreground text-background'))} size='lg'>
                    {isLoginSuccessful ? <MdOutlineDone size={24} /> : <>Login<IoIosLogIn size={24} /></>}
                </Button>


            </form>

            <div className='flex justify-between gap-2 w-full'>
                <div onClick={handleGoogleLogin} className='select-none transition-colors w-1/2 rounded-md active:bg-default-200 hover:bg-default-100 cursor-pointer text-tiny border-1 border-divider p-3 flex flex-col items-center justify-between '>
                    <GoogleIcon size={50} />
                    <span>
                        Continue With Google
                    </span>
                </div>
                <Divider orientation='vertical' />
                <div onClick={githubSignIn} className='select-none w-1/2 transition-colors rounded-md  active:bg-default-200  hover:bg-default-100 cursor-pointer text-tiny border-1 border-divider p-3 flex flex-col items-center justify-end gap-3'>
                    <FaGithub size={25} className="text-foreground" />
                    <span>
                        Continue With Github
                    </span>
                </div>
            </div>

            <div className='mt-14 w-full'>

                <h1 className='text-lg mb-4 '>Don't Have An Idlecoders Account?</h1>
                <Button onPress={() => { navigate("/resources/account/signup") }} fullWidth size='lg' radius='sm' color='danger' className='bg-foreground text-background font-bold ' variant='solid'>Create New Account</Button>
            </div>

            {/* Verifying page */}
            {
                isLogging &&
                <div className='animate-appearance-in  absolute w-full gap-5 text-danger rounded-3xl  h-full top-0 left-0 bg-default/20 backdrop-blur-md z-50 flex justify-center items-center flex-col'>
                    <span className='text-3xl font-semibold '>Verifying </span>
                    <Spinner size='lg' color='current' />
                </div>
            }


        </div>
    )
}

export function SignupPage() {
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [userMail, setUserMail] = useState("");
    const [userPassword, setUserPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [countryName, setCountryName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
    const [isSending, setIsSending] = useState(false);
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
    const [helperText, setHelperText] = useState("")

    const navigate = useNavigate()
    const githubSignUp = () => {
        signInWithPopup(auth, new GithubAuthProvider())
            .then(() => {

                navigate("/user/profile")


            }).catch((error) => {
                console.log(error);

            });
    }
    const googleSignup = () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(() => {

                navigate("/user/profile")


            }).catch((error) => {
                console.log(error);
            });
    }

    const handleSignUp = (event: FormEvent) => {
        event.preventDefault();
        setIsSending(true)

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userMail, userPassword)
            .then(() => {
                setIsSending(false)
                setIsSignUpSuccess(true)
                navigate("/user/profile")
            })
            .catch((e) => {
                console.error(e);
                setIsSending(false);
                setIsSignUpSuccess(false);
                setHelperText("Email Already In Use. Try Sign In. \n" + e)
            })



    }


    return (
        <div className="flex justify-center items-center gap-10 flex-col  w-full lg:w-[550px] ">
            <h1 className='text-4xl tracking-wider font-serif font-bold'>Create New Account</h1>
            {/* Auth Links */}
            <div className='flex justify-between gap-2 w-full'>
                <div onClick={googleSignup} className='select-none transition-colors w-1/2 rounded-md active:bg-default-200 hover:bg-default-100 cursor-pointer text-tiny border-1 border-divider p-3 flex flex-col items-center justify-between '>
                    <GoogleIcon size={50} />
                    <span>
                        Continue With Google
                    </span>
                </div>
                <Divider orientation='vertical' />
                <div onClick={githubSignUp} className='select-none w-1/2 transition-colors rounded-md  active:bg-default-200  hover:bg-default-100 cursor-pointer text-tiny border-1 border-divider p-3 flex flex-col items-center justify-end gap-3'>
                    <FaGithub size={25} className="text-foreground" />
                    <span>
                        Continue With Github
                    </span>
                </div>
            </div>
            {/* Form */}
            <Divider className='rounded-full bg-foreground h-[2px]' />
            <form onSubmit={handleSignUp} className='w-full h-full flex flex-col gap-4'>
                <div className='flex gap-4'>
                    <Input name='fname' variant='bordered' size='lg' radius='sm' value={FirstName} onValueChange={setFirstName}
                        isRequired labelPlacement='outside' label="First Name" type='text' />
                    <Input name='lname' variant='bordered' size='lg' radius='sm' value={LastName} onValueChange={setLastName}
                        labelPlacement='outside' label="Last Name" type='text' />
                </div>
                <Input name='newuser_mail' placeholder='Your Active Email Address' startContent={<IoIosMail className='text-default-400' size={26} />} variant='bordered' size='lg' radius='sm' value={userMail} onValueChange={setUserMail} isClearable
                    isRequired labelPlacement='outside' label="Email" type='Email' />

                <Input name='newuser_password' isRequired placeholder='Create New Password'
                    startContent={<IoIosLock className='text-default-400' size={26} />}
                    endContent={userPassword.length > 0 &&
                        <Button onPress={() => setShowPassword(!showPassword)} isIconOnly radius='full' size='sm' variant='light'>
                            {showPassword ? <IoIosEye className='text-default-600 ' size={26} /> : <IoIosEyeOff className='text-default-600 ' size={26} />}
                        </Button>}
                    variant='bordered' size='lg' radius='sm' value={userPassword} onValueChange={setUserPassword}
                    labelPlacement='outside' label="Password" type={showPassword ? "text" : "password"} />

                <Input name='country' isRequired variant='bordered' size='lg' radius='sm' value={countryName} onValueChange={setCountryName}
                    labelPlacement='outside' placeholder='Country' label="Country Name" type='text' />
                <Input name='birthdate' isRequired variant='bordered' size='lg' radius='sm' value={birthDate} onValueChange={setBirthDate}
                    labelPlacement='outside' placeholder='Country' label=" Date Of Birth" type='date' />
                <div>
                    <span className='font-semibold'>  Are you a subscriber of our youtube channel {`(Idlecoders)`}?</span>
                    <br />
                    <CheckboxGroup color='primary' name='isSubscribed' value={isSubscribed ? ["true"] : ["false"]} onValueChange={(val) => { val[val.length - 1] === "true" ? setIsSubscribed(true) : setIsSubscribed(false) }}>
                        <Checkbox value={"true"} >Yes I am a subscriber</Checkbox>
                        <Checkbox value={"false"}>No I am not a subscriber</Checkbox>
                    </CheckboxGroup>
                </div>
                {helperText && <p className='text-sm text-white p-2 text-center w-full bg-danger'>{helperText}</p>
                }                <Button type='submit' isDisabled={isSignUpSuccess} radius='sm' variant='solid' color='default' className={twMerge(isSignUpSuccess ? "bg-default" : 'bg-foreground text-background')} size='lg'>  {isSending ? <Spinner size='md' color='current' /> : isSignUpSuccess ? <>Account Created Successfully <MdOutlineDone size={20} /> </> : <><span>Create Account</span> <FaUserPlus size={18} /></>}</Button>


            </form >

            {/* Already Have an */}

            < div className='mt-14 w-full' >

                <Link to={"/resources/account/login"} className='text-lg mb-4 '>Already Have An Idlecoders Account?<span className='ml-2 text-primary cursor-pointer hover:underline'>Log In</span></Link>
            </div >
        </div >
    )
}

function Account() {

    return (
        <Fragment>
            <div className="flex flex-col p-4 gap-y-5 justify-center items-center w-full">
                <Outlet />
            </div>
        </Fragment >
    )
}

export default Account