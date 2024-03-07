import { Divider, } from '@nextui-org/react';
import { Fragment, ReactNode, useEffect, useMemo, useState, } from 'react'
import { twMerge } from 'tailwind-merge';
import { MdExplore } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { SlDocs } from "react-icons/sl";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import SidebarItemButton from './SidebarItemButton';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    children: ReactNode;
    className?: string | string[];
}
function Sidebar({ children, className }: SidebarProps) {
    const location = useLocation()
    const [user, setUser] = useState<User>(); // Specify the type as User | null
    useEffect(() => {

        const auth = getAuth();
        const update = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // No user is signed in
                setUser(undefined);

            }
        });

        // Clean up subscription
        return () => update();
    }, []);
    const Routes = useMemo(() => {
        return [
            {
                label: "Browse",
                href: "/resources",
                Icon: MdExplore,
                isActive: location.pathname === "/resources" || location.pathname.includes('/resources/projects')
            },
            {
                label: "Blogs",
                href: "/resources/blogs",
                Icon: SlDocs,
                isActive: location.pathname === "/resources/blogs" || location.pathname.includes('/resources/blogs')

            },
            {
                label: "Account",
                href: user ? "/user/profile" : "/resources/account/login",
                Icon: FaUser,
                isActive: location.pathname.includes("/resources/account")

            },
        ]
    }, [location.pathname, user])

    return (
        <Fragment>
            <div className='w-full  h-[89vh] flex bg-default-50/60 '>
                {/* lg: Expanded Side Bar */}
                <div className='bg-background  h-full w-64 hidden lg:block'>
                    <div className="flex flex-col px-4 py-3 w-full gap-y-[6px]">

                        {
                            Routes.map((route, index) => (

                                <SidebarItemButton

                                    key={route.label + String(index)}
                                    isActiveClass={"bg-danger/90 dark:bg-danger/70 text-white"}
                                    {...route}
                                />
                            ))
                        }
                    </div>
                </div>

                {/* Sm: Collapsed Side Bar */}
                <div className='bg-transparent  h-full w-16 hidden sm:block lg:hidden'>
                    <div className="flex bg-transparent flex-col items-center py-3 w-full gap-y-[6px]">

                        {
                            Routes.map((route, index) => (

                                <Link key={route.label + String(index)} className='no-underline w-full h-full flex items-center justify-end' to={route.href}>
                                    <div className={twMerge("w-10/12 flex justify-center items-center flex-col gap-y-1 group hover:text-foreground text-foreground-400 transition  h-fit py-3 rounded-none bg-transparent", route.href === location.pathname && "text-danger hover:text-danger-300 font-bold")}>
                                        <route.Icon size={18} />
                                        <span className='text-tiny font-medium'>{route.label}</span>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <Divider className='hidden lg:block' orientation='vertical' />
                <div className={twMerge('h-full flex-1 overflow-y-auto py-3 cscroll', className)}>

                    {children}
                </div>
            </div>



        </Fragment>
    )
}

export default Sidebar