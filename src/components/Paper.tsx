import React, { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

interface BoxProps {
    children: React.ReactNode;
    className?: string | string[];
}
function Paper({ children, className }: BoxProps) {
    return (
        <Fragment>
            <div
                className={twMerge(`
                bg-default-200
                dark:bg-default-50
                rounded-lg
                h-fit
                w-full
                `, className)}
            >
                {children}
            </div>
        </Fragment>
    )
}

export default Paper