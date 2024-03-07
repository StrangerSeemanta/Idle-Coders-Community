import { Button } from '@nextui-org/react';
import { Fragment } from 'react'
import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface SidebarItemButtonProps {
    label: string;
    Icon: IconType;
    isActive: boolean;
    href: string;
    isActiveClass: string;
    className?: string;
}
function SidebarItemButton({ label, Icon, href, isActive, isActiveClass, className }: SidebarItemButtonProps) {
    const navigate = useNavigate();
    return (
        <Fragment>
            <Button
                size='lg'
                variant='flat'
                onClick={() => navigate(href)}
                className={twMerge("flex justify-start w-full text-sm items-center py-3.5 px-3 gap-x-3  rounded-md transition  group font-medium", isActive ? isActiveClass : "bg-transparent hover:bg-default-200 text-foreground-500 hover:text-foreground-500 dark:text-foreground-400", className)}

            >
                <Icon size={20} />

                <span>{label}</span>
            </Button>
        </Fragment>
    )
}

export default SidebarItemButton