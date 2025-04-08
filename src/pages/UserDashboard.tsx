import {
  Avatar,
  Button,
  Divider,
  User as UserComponent,
} from "@nextui-org/react";
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { FiUser } from "react-icons/fi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import SidebarItemButton from "../components/SidebarItemButton";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { FaBloggerB } from "react-icons/fa6";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { FirebaseApp } from "./Account";
import { RiDatabase2Line } from "react-icons/ri";
import Toast from "../components/Toast";
import PageLoader from "./PageLoader";
interface SidebarProps {
  children: ReactNode;
  className?: string | string[];
}
function UserSidebar({ className, children }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showToast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);
    const auth = getAuth(FirebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const Routes = useMemo(() => {
    return [
      {
        label: "Profile",
        href: "/user/profile",
        Icon: FiUser,
      },
      {
        label: "Storage",
        href: "/user/storage",
        Icon: RiDatabase2Line,
      },

      {
        label: "Blogs",
        href: "/user/blogs",
        Icon: FaBloggerB,
      },

      {
        label: "Settings",
        href: "/user/settings",
        Icon: IoSettingsOutline,
      },
    ];
  }, []);

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setToast(true);
        setToastMsg("Successfully Logged out");
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <Fragment>
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <PageLoader label="Loading..." />
        </div>
      ) : currentUser ? (
        <>
          <div className="w-full  min-h-[89vh] flex flex-col sm:flex-row bg-default-50/60 ">
            {/* lg: Expanded Side Bar */}
            <div className="bg-background  min-h-full w-64 hidden lg:block">
              <div className="flex flex-col px-4 py-3 w-full gap-y-[6px]">
                <div className="mb-5 flex justify-start w-full  items-center px-3 py-5 gap-x-3  rounded-md transition  group font-medium  bg-default-100 dark:bg-primary-50  text-foreground-500 hover:text-foreground-500 dark:text-foreground">
                  <UserComponent
                    name={currentUser.displayName}
                    description={currentUser.email}
                    classNames={{
                      name: "text-md text-foreground",
                      description: "text-tiny",
                    }}
                    avatarProps={{
                      size: "md",
                      src: (currentUser && currentUser.photoURL) || undefined,
                    }}
                  />
                </div>
                {Routes.map((route, index) => (
                  <SidebarItemButton
                    key={route.label + String(index)}
                    isActiveClass={"bg-success dark:bg-default-200 text-white"}
                    isActive={location.pathname.includes(route.href)}
                    {...route}
                  />
                ))}
                <Button
                  size="lg"
                  variant="flat"
                  onClick={handleLogOut}
                  className={twMerge(
                    "flex justify-start w-full text-sm items-center py-3.5 px-3 gap-x-3  rounded-md transition  group font-medium",
                    "bg-transparent hover:bg-danger text-foreground-500 hover:text-white"
                  )}
                >
                  <IoLogOutOutline size={20} />
                  <span>Logout</span>
                </Button>
              </div>
            </div>

            {/* Sm: Collapsed Side Bar */}
            <div className="bg-background px-3 w-full min-h-fit sm:min-h-full sm:w-24 flex sm:block lg:hidden">
              <div className="flex bg-transparent  sm:flex-col items-center py-3 w-full gap-y-[6px]">
                <div className="no-underline w-full h-full flex items-center justify-end">
                  <div
                    className={twMerge(
                      "w-10/12 flex justify-center items-center flex-col gap-y-1 group hover:text-foreground text-foreground-400 transition  h-fit py-3 rounded-none bg-transparent",
                      "text-danger hover:text-danger-300 font-bold"
                    )}
                  >
                    <Avatar
                      size="sm"
                      src={(currentUser && currentUser.photoURL) || undefined}
                      color="success"
                      isBordered
                    />
                  </div>
                </div>

                {Routes.map((route, index) => (
                  <Link
                    key={route.label + String(index)}
                    className="no-underline w-full h-full flex items-center justify-end"
                    to={route.href}
                  >
                    <div
                      className={twMerge(
                        "w-10/12 flex justify-center items-center flex-col gap-y-1 group hover:text-foreground text-foreground-400 transition  h-fit py-3 rounded-none bg-transparent",
                        route.href === location.pathname &&
                          "text-danger hover:text-danger-300 font-bold"
                      )}
                    >
                      <route.Icon size={18} />
                      <span className="text-tiny font-medium">
                        {route.label}
                      </span>
                    </div>
                  </Link>
                ))}
                <div className="no-underline cursor-pointer w-full h-full flex items-center justify-end">
                  <div
                    onClick={handleLogOut}
                    className={twMerge(
                      " w-10/12 flex justify-center items-center flex-col gap-y-1 group hover:text-foreground text-foreground-400 transition  h-fit py-3 rounded-none bg-transparent",
                      "text-default-500 hover:text-danger-300 font-bold"
                    )}
                  >
                    <IoLogOutOutline size={18} />
                    <span className="text-tiny font-medium">Logout</span>
                  </div>
                </div>
              </div>
            </div>
            <Divider
              className="hidden lg:block bg-default/30"
              orientation="vertical"
            />
            <div
              className={twMerge(
                "h-full flex-1 px-4 overflow-y-auto py-3 cscroll",
                className
              )}
            >
              {children}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
          <h1 className="text-2xl text-danger font-bold">
            You Need To Log in first
          </h1>
          <Button
            onPress={() => navigate("/resources/account/login")}
            color="danger"
            variant="shadow"
            size="lg"
            radius="sm"
          >
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
function UserDashboard() {
  return (
    <Fragment>
      <UserSidebar>
        <div className="bg-transparent w-full h-full">
          <Outlet />
        </div>
      </UserSidebar>
    </Fragment>
  );
}

export default UserDashboard;
